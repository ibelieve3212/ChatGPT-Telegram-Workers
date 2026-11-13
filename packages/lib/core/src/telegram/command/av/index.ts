import type { WorkerContext } from '#/config';
// /av —— 今天冲哪个。数据来自 javranking.cc 的公开索引(每条命令现拉)。
//
// 用法:
//   /av                 默认推荐(站点「今天冲哪个」精选池)
//   /av 2026            指定发行年份
//   /av 无码 2024       有码 / 无码 / FC2 + 年份
//   /av 中出            按题材筛(站点 262 个分类, 支持 Creampie 这类别名)
//   /av 无码 2025 巨乳   可叠加
//   /av MIAB-009        番号 / 演员名直查
//   /av 换一个           重抽
//   /av 帮助            查看帮助
//
// 权限不单独判断: 命令走的是统一中间件链(WhiteListFilter), env 里允许谁用, 谁就能用。
// 唯一不在线的数据是 ed2k 表(随包内置, 见 ltx-data.ts), 其余全部实时拉取。
import type * as Telegram from 'telegram-bot-api-types';
import type { CommandHandler } from '../types';
import type { AvDetail, AvLibrary, AvVideo } from './types';
import { ENV } from '#/config';
import { MessageSender } from '../../sender';
import { attachLtx, coverCandidates, ltxLinks, MAX_CAPTION, renderCard } from './card';
import { CloudflareBlockedError, fetchDetail, fetchSynopsis, fillLuckyPool, loadLibrary } from './data';
import { chooseVideo, findVideos, isHelpWord, LookupError, parseArgs } from './pick';

// 每个会话上次推的是哪部, 「换一个」时避开它
const LAST_PICK = new Map<number, number>();

const HELP_TEXT = `🎬 <b>今天冲哪个</b>

不带后缀就是默认推荐(同一天同一条件结果稳定, 跨天自动换):

<code>/av 2026</code> —— 指定年份
<code>/av 无码 2024</code> —— 有码 / 无码 / FC2 + 年份
<code>/av 中出</code> —— 按题材筛(262 个分类, 支持 Creampie 这类别名)
<code>/av 无码 2025 巨乳</code> —— 可叠加
<code>/av MIAB-009</code> —— 番号 / 演员名直查
<code>/av 换一个</code> —— 重抽

条件太窄时(比如无码 + 年份 + 冷门题材)会自动放宽, 并在卡片上标出放宽了哪一项。

数据来源: javranking.cc(战力分 / 榜单战绩 / 题材标签均为站点原始字段)`;

export class AvCommandHandler implements CommandHandler {
    command = '/av';
    scopes = ['all_private_chats', 'all_group_chats'];

    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
        const parts = subcommand.trim().split(/\s+/).filter(Boolean);

        if (parts.some(part => isHelpWord(part))) {
            return this.sendText(sender, message, HELP_TEXT);
        }

        let library: AvLibrary;
        try {
            library = await fillLuckyPool(await loadLibrary());
        } catch (e) {
            if (e instanceof CloudflareBlockedError) {
                return this.sendText(
                    sender,
                    message,
                    '🚧 数据源被 Cloudflare 拦了（数据每次现拉，没有本地快照可用）。\n等一会儿再试，或换个网络环境。',
                );
            }
            console.error('[av] 索引加载失败:', e);
            return this.sendText(sender, message, '📛 片库索引拉取失败，稍后再试。');
        }

        const args = parseArgs(parts, library);
        let video: AvVideo;
        let note: string | null = null;

        if (args.unknown.length > 0) {
            // 没认出来的词先当番号 / 演员名直查
            const hits = findVideos(library, args.unknown[0]);
            if (hits.length === 0) {
                return this.sendText(sender, message, `🤔 没看懂：${args.unknown.join('、')}\n试试 /av 帮助`);
            }
            video = hits[0];
            if (hits.length > 1) {
                note = `「${args.unknown[0]}」匹配到 ${hits.length} 部，给了战力最高的一部`;
            }
        } else {
            const chatId = message.chat.id;
            const avoid = args.reroll ? LAST_PICK.get(chatId) ?? null : null;
            try {
                const result = chooseVideo(library, args, {
                    avoid,
                    useLuckyPool: ENV.AV_USE_LUCKY_POOL,
                    minScore: ENV.AV_MIN_SCORE,
                });
                video = result.video;
                note = result.note;
            } catch (e) {
                if (e instanceof LookupError) {
                    return this.sendText(sender, message, '🙈 没找到符合条件的影片，换个年份或题材试试。');
                }
                throw e;
            }
        }

        LAST_PICK.set(message.chat.id, video.videoId);

        const detail = await fetchDetail(video.videoId);
        const synopsis = ENV.AV_SYNOPSIS && video.code ? await fetchSynopsis(video.code) : null;
        const card = renderCard(video, detail, library.durations, {
            maxTags: ENV.AV_MAX_TAGS,
            maxActors: ENV.AV_MAX_ACTORS,
            synopsis,
        }, note);
        const { text, extra } = attachLtx(card, ltxLinks(video.code));

        let resp = await this.sendCard(sender, message, video, detail, text);
        if (extra) {
            resp = await this.sendText(sender, message, extra);
        }
        if (ENV.AV_DELETE_COMMAND) {
            await sender.api.deleteMessage({ chat_id: message.chat.id, message_id: message.message_id }).catch(() => null);
        }
        return resp;
    };

    private async sendCard(
        sender: MessageSender,
        message: Telegram.Message,
        video: AvVideo,
        detail: AvDetail,
        text: string,
    ): Promise<Response> {
        const tooLong = text.length > MAX_CAPTION;
        for (const url of coverCandidates(video, detail)) {
            const resp = await sender.sendPhoto(url, {
                // 超过说明上限(1024)时先发图不带说明, 卡片另发一条, 避免截断丢链接
                caption: tooLong ? undefined : text,
                parseMode: 'HTML',
                hasSpoiler: ENV.AV_SPOILER,
            });
            if (resp.ok) {
                return tooLong ? this.sendText(sender, message, text) : resp;
            }
            // 这张封面发不出去(404 / Telegram 抓不到), 换下一张
            await resp.text().catch(() => '');
        }
        // 封面全挂: 发纯文本卡片
        return this.sendText(sender, message, text);
    }

    private sendText(sender: MessageSender, message: Telegram.Message, text: string): Promise<Response> {
        return sender.sendRawMessage({
            chat_id: message.chat.id,
            message_thread_id: message.message_thread_id,
            text,
            parse_mode: 'HTML',
            link_preview_options: { is_disabled: true },
        });
    }
}

// .av: /av 的点号别名, 功能完全一致(和 .生图 对应 /img 同样的处理)。
// scopes=[] 不注册到 Telegram 菜单: BotCommand 名字只允许 ^[a-z0-9_]{1,32}$, 点号会被服务端拒掉。
// 仍会进入 knownCommands(), 所以群聊里不 @bot 也能触发。
// LAST_PICK 是模块级的, 两个命令共享「上一次推的是哪部」, 换一个不会撞车。
export class DotAvCommandHandler implements CommandHandler {
    command = '.av';
    scopes = [];
    handle = new AvCommandHandler().handle;
}
