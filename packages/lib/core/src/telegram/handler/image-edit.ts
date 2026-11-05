import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import type { MessageHandler } from './types';
import { loadImageGen } from '#/agent';
import { ENV } from '#/config';
import { debugLog } from '#/utils/debug';
import { downloadImageBlob } from '../chat';
import { saveBotReplyGroup } from '../chat/replyGroup';
import { MessageSender } from '../sender';

// 回复 bot 生成的图片 → 二次编辑(图生图), 无需再带 /img、.生图 命令。
//
// 约束: 只对 bot 自己发送的图片生效(bot 用 sendPhoto 发出的生成图, 即 /img、.生图
// 的结果, 以及此前编辑的结果)。回复别人发的图片不触发编辑, 继续走普通聊天流程。
// 因为编辑结果同样是 bot 发送的图片, 所以可以一直「回复上一张 → 继续改」链式编辑。
// 可用 IMAGE_EDIT_ON_REPLY=false 整体关闭该行为。
export class ImageEditHandler implements MessageHandler {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        if (!ENV.IMAGE_EDIT_ON_REPLY) {
            return null;
        }
        const referenced = message.reply_to_message;
        if (!referenced) {
            return null;
        }
        // 约束: 被回复的消息必须是 bot 自己发的(别人发的图不触发编辑)
        if (`${referenced.from?.id}` !== `${context.SHARE_CONTEXT.botId}`) {
            return null;
        }
        // 被回复的消息必须是图片。取最大档位: bot 通过 sendPhoto 发送, 编辑底图用最大档保证质量。
        const fileId = referenced.photo?.at(-1)?.file_id;
        if (!fileId) {
            return null;
        }
        // 修改指令 = 本条回复的文字/图片说明; 没写文字就不拦截, 交给后续中间件
        const prompt = (message.text || message.caption || '').trim();
        if (!prompt) {
            return null;
        }
        // 未配置生图渠道: 不拦截(无法编辑), 交给普通聊天
        if (!context.USER_CONFIG.IMAGE_API_BASE || !context.USER_CONFIG.IMAGE_API_KEY) {
            return null;
        }
        const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
        try {
            // 从 Telegram 下载被回复的图片作为编辑底图
            const source = await downloadImageBlob(fileId, context);
            const imageAgent = loadImageGen(context.USER_CONFIG);
            if (!imageAgent) {
                throw new Error('No available image model');
            }
            debugLog('[diag] ImageEditHandler 二次编辑:', { prompt: prompt.slice(0, 50), bytes: source.size });
            const result = await imageAgent.request(prompt, context.USER_CONFIG, source);
            const resp = await sender.sendPhoto(result);
            await recordReply(resp, context);
            return resp;
        } catch (e) {
            return sender.sendPlainText(`ERROR: ${(e as Error).message}`);
        }
    };
}

// 把发送结果记入 bot 回复分组, 供 /clear 命令一并清理(与命令回复的记录方式一致)
async function recordReply(resp: Response, context: WorkerContext): Promise<void> {
    try {
        const json = await resp.clone().json() as Telegram.ResponseWithMessage;
        if (json?.ok && json.result?.message_id) {
            await saveBotReplyGroup(context, [json.result.message_id]);
        }
    } catch (e) {
        console.error(e);
    }
}
