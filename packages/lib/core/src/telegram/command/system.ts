import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import type { TelegramBotAPI } from '../api';
import type { CommandHandler } from './types';
import { loadChatLLM, loadImageGen, resetChatHistory } from '#/agent';
import { ConfigMerger, ENV } from '#/config';
import { debugLog } from '#/utils/debug';
import { createTelegramBotAPI } from '../api';
import { isAdminUserId, isAnonymousAdminMessage, isGroupChat, TELEGRAM_AUTH_CHECKER } from '../auth';
import { chatWithMessage, downloadImageBlob, extractEditImageFileID, extractUserMessage } from '../chat';
import { collectMediaGroup, getMediaGroupImageFileIds } from '../chat/media-group';
import { listBotReplyGroups, updateBotReplyGroups } from '../chat/replyGroup';
import { MessageSender } from '../sender';
import { loadChatRoleWithContext } from './auth';

// 改图一次最多带几张底图(多图时走 /images/edits 的 image[] 多图字段)
const MAX_EDIT_INPUT_IMAGES = 16;

interface EditImageSource {
    fileIds: string[];
    /** 来源里有动态表情包/动图(无法解码成静态图) */
    dynamicMedia: boolean;
}

function isDynamicMedia(message: Telegram.Message): boolean {
    return !!(message.animation || (message.sticker && (message.sticker.is_animated || message.sticker.is_video)));
}

// 生图/改图的底图来源, 按优先级取, 取到即停:
//   1. 命令写在相册 caption 里 → 整组图片(相册在 Bot API 里是多条消息, 需收齐)
//   2. 命令消息自带的图(单图 + caption)
//   3. 回复的图(引用了相册则把整组补齐)
// 都没有 → 纯文生图。
async function collectEditImageSource(message: Telegram.Message): Promise<EditImageSource> {
    const fileIds: string[] = [];
    let dynamicMedia = false;
    const push = (fileId: string | null | undefined) => {
        if (fileId && !fileIds.includes(fileId)) {
            fileIds.push(fileId);
        }
    };
    if (message.media_group_id) {
        const group = await collectMediaGroup(message);
        for (const item of group) {
            if (isDynamicMedia(item)) {
                dynamicMedia = true;
            }
            push(extractEditImageFileID(item));
        }
        // 组内其它消息可能没进到本处理链(群聊里没 @bot 会被 GroupMention 拦掉), 用相册缓存补齐
        const cachedFileIds = getMediaGroupImageFileIds(message.media_group_id);
        if (cachedFileIds) {
            for (const fileId of cachedFileIds) {
                push(fileId);
            }
        }
    }
    if (fileIds.length === 0) {
        if (isDynamicMedia(message)) {
            dynamicMedia = true;
        }
        push(extractEditImageFileID(message));
    }
    const replied = message.reply_to_message;
    if (fileIds.length === 0 && replied) {
        if (isDynamicMedia(replied)) {
            dynamicMedia = true;
        }
        const groupFileIds = replied.media_group_id ? getMediaGroupImageFileIds(replied.media_group_id) : null;
        if (groupFileIds && groupFileIds.length > 0) {
            for (const fileId of groupFileIds) {
                push(fileId);
            }
        } else {
            push(extractEditImageFileID(replied));
        }
    }
    return { fileIds: fileIds.slice(0, MAX_EDIT_INPUT_IMAGES), dynamicMedia };
}

export class ImgCommandHandler implements CommandHandler {
    command = '/img';
    // 所有用户可生图, 但仅配了生图渠道(IMAGE_API_BASE+IMAGE_API_KEY)时才启用
    // 未配置生图渠道时不显示在菜单(空 scopes)
    scopes = ['all_private_chats'];
    // 生图要几十秒: 顶栏显示"正在发送图片", 文案沿用统一的"正在处理中"
    pending = { action: 'upload_photo' as const };
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
        // 未配置生图渠道时返回提示
        if (!context.USER_CONFIG.IMAGE_API_BASE || !context.USER_CONFIG.IMAGE_API_KEY) {
            return sender.sendPlainText('ERROR: Image function is disabled, please configure IMAGE_API_BASE and IMAGE_API_KEY');
        }
        if (!subcommand) {
            // 用法提示里的命令名跟随实际输入: 用户打的是 .生图, 就别让他去看 /img
            // 命令也可能写在图片的 caption 里(带图发 .生图), 与分发器取法保持一致
            const used = (message.text || message.caption || '').trim().split(/\s+/)[0] || '/img';
            const hint = used === '/img' ? ENV.I18N.command.help.img : ENV.I18N.command.help.img.split('/img').join(used);
            return sender.sendPlainText(hint);
        }
        try {
            const imageAgent = loadImageGen(context.USER_CONFIG);
            if (!imageAgent) {
                return sender.sendPlainText('ERROR: No available image model');
            }
            // 底图只取命令自带的相册或单图、直接回复的图；没有底图才走文生图。
            const { fileIds, dynamicMedia } = await collectEditImageSource(message);
            // 动态表情包/动图无法解码成静态图: 诚实提示, 不默默当成文生图
            if (dynamicMedia && fileIds.length === 0) {
                return sender.sendPlainText('ERROR: 动态表情包/动图暂不支持直接修改，请截图或转为静态图片后再试');
            }
            const blobs = await Promise.all(fileIds.map(fileId => downloadImageBlob(fileId, context)));
            const inputImage = blobs.length === 0 ? undefined : blobs.length === 1 ? blobs[0] : blobs;
            debugLog('[diag] 生图底图:', { count: blobs.length, dynamicMedia });
            const result = await imageAgent.request(subcommand, context.USER_CONFIG, inputImage);
            return sender.sendPhoto(result);
        } catch (e) {
            return sender.sendPlainText(`ERROR: ${(e as Error).message}`);
        }
    };
}

// .生图命令: /img 的中文别名, 功能完全一致
// scopes=[] 不注册到 Telegram 菜单(Telegram BotCommand 只允许 ^[a-z0-9_]{1,32}$, 中文/点号会被拒)
// 仅靠纯字符串匹配触发(和 GROUP_TRIGGER_PREFIX 的 .小助手 一样), 私聊手打 .生图 xxx 即可执行
export class GenerateImageCommandHandler implements CommandHandler {
    command = '.生图';
    scopes = [];
    // 与 /img 一致: 生图耗时, 需要"正在处理中"反馈
    pending = { action: 'upload_photo' as const };
    handle = new ImgCommandHandler().handle;
}

export class HelpCommandHandler implements CommandHandler {
    command = '/help';
    // 方案B: 群聊不显示任何斜杠命令菜单, 仅私聊显示
    scopes = ['all_private_chats'];
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
        // 普通用户只列出菜单可见的普通命令, 管理员列出全部命令(含管理命令)
        const speakerId = message.from?.id || message.chat.id;
        const isAdmin = isAdminUserId(speakerId) === true;
        // 管理命令集合: 普通用户在 /help 中不可见
        const adminCommands = new Set(['/version', '/system', '/models', '/imgmodels', '/echo']);
        let helpMsg = `${ENV.I18N.command.help.summary}\n`;
        for (const [k, v] of Object.entries(ENV.I18N.command.help)) {
            if (k === 'summary') {
                continue;
            }
            // 普通用户跳过管理命令, 管理员全部列出
            if (!isAdmin && adminCommands.has(`/${k}`)) {
                continue;
            }
            // i18n 的 key 就是命令名: 斜杠命令补 /, 点号别名(.生图)本身就是完整写法,
            // 不能再加 /, 否则帮助里会出现一条根本不存在的 '/生图' 命令
            const name = k.startsWith('.') ? k : `/${k}`;
            helpMsg += `${name}：${v}\n`;
        }
        for (const [k, v] of Object.entries(ENV.CUSTOM_COMMAND)) {
            if (v.description) {
                helpMsg += `${k}：${v.description}\n`;
            }
        }
        for (const [k, v] of Object.entries(ENV.PLUGINS_COMMAND)) {
            if (v.description) {
                helpMsg += `${k}：${v.description}\n`;
            }
        }
        return sender.sendPlainText(helpMsg);
    };
}

class BaseNewCommandHandler {
    static async handle(showID: boolean, message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> {
        await resetChatHistory(context.SHARE_CONTEXT.chatHistoryKey, context.requestStartedAt, message.message_id);
        const text = ENV.I18N.command.new.new_chat_start + (showID ? `(${message.chat.id})` : '');
        const params: Telegram.SendMessageParams = {
            chat_id: message.chat.id,
            text,
        };
        if (ENV.SHOW_REPLY_BUTTON && !isGroupChat(message.chat.type)) {
            params.reply_markup = {
                keyboard: [[{ text: '/new' }, { text: '/clear' }]],
                selective: true,
                resize_keyboard: true,
                one_time_keyboard: false,
            };
        } else {
            params.reply_markup = {
                remove_keyboard: true,
                selective: true,
            };
        }
        return createTelegramBotAPI(context.SHARE_CONTEXT.botToken).sendMessage(params);
    }
}

export class NewCommandHandler extends BaseNewCommandHandler implements CommandHandler {
    command = '/new';
    scopes = ['all_private_chats'];
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        return BaseNewCommandHandler.handle(false, message, subcommand, context);
    };
}

export class StartCommandHandler extends BaseNewCommandHandler implements CommandHandler {
    command = '/start';
    scopes = ['all_private_chats'];
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        return BaseNewCommandHandler.handle(true, message, subcommand, context);
    };
}

export class VersionCommandHandler implements CommandHandler {
    command = '/version';
    scopes = [];
    adminOnly = true;
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
        const current = {
            ts: ENV.BUILD_TIMESTAMP,
            sha: ENV.BUILD_VERSION,
        };
        try {
            const info = `https://raw.githubusercontent.com/TBXark/ChatGPT-Telegram-Workers/${ENV.UPDATE_BRANCH}/dist/buildinfo.json`;
            const online = await fetch(info).then(r => r.json()) as { ts: number; sha: string };
            const timeFormat = (ts: number): string => {
                return new Date(ts * 1000).toLocaleString('en-US', {});
            };
            if (current.ts < online.ts) {
                const text = `New version detected: ${online.sha}(${timeFormat(online.ts)})\nCurrent version: ${current.sha}(${timeFormat(current.ts)})`;
                return sender.sendPlainText(text);
            } else {
                const text = `Current version: ${current.sha}(${timeFormat(current.ts)}) is up to date`;
                return sender.sendPlainText(text);
            }
        } catch (e) {
            return sender.sendPlainText(`ERROR: ${(e as Error).message}`);
        }
    };
}

export class SystemCommandHandler implements CommandHandler {
    command = '/system';
    scopes = [];
    adminOnly = true;
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
        const chatAgent = loadChatLLM(context.USER_CONFIG);
        const imageAgent = loadImageGen(context.USER_CONFIG);
        const agent = {
            AI_PROVIDER: chatAgent?.name,
            [chatAgent?.modelKey || 'AI_PROVIDER_NOT_FOUND']: chatAgent?.model(context.USER_CONFIG),
            AI_IMAGE_PROVIDER: imageAgent?.name,
            [imageAgent?.modelKey || 'AI_IMAGE_PROVIDER_NOT_FOUND']: imageAgent?.model(context.USER_CONFIG),
        };
        let msg = `<strong>AGENT</strong><pre>${JSON.stringify(agent, null, 2)}</pre>`;
        if (ENV.DEV_MODE) {
            const config = ConfigMerger.trim(context.USER_CONFIG, ENV.LOCK_USER_CONFIG_KEYS);
            msg += `\n\n<strong>USER_CONFIG</strong><pre>${JSON.stringify(config, null, 2)}</pre>`;

            const secretsSuffix = ['_API_KEY', '_TOKEN', '_ACCOUNT_ID'];
            for (const key of Object.keys(context.USER_CONFIG)) {
                if (secretsSuffix.some(suffix => key.endsWith(suffix))) {
                    context.USER_CONFIG[key] = '******';
                }
            }
            msg += `\n\n<strong>CHAT_CONTEXT</strong><pre>${JSON.stringify(sender.context || {}, null, 2)}</pre>`;

            const shareCtx = { ...context.SHARE_CONTEXT, botToken: '******' };
            msg += `\n\n<strong>SHARE_CONTEXT</strong><pre>${JSON.stringify(shareCtx, null, 2)}</pre>`;
        }
        return sender.sendRichText(msg, 'HTML');
    };
}

// /chat 命令: 将命令后的内容作为用户消息直接与 bot 对话。群聊中使用(私聊直接发消息即可)
// 方案B: 群聊不显示任何斜杠命令菜单, 但命令本身仍可在群聊中手动输入使用
export class ChatCommandHandler implements CommandHandler {
    command = '/chat';
    scopes = [];
    // chatWithMessage 自己会发"正在处理中"占位消息并流式改写, 分发器不要再发一条
    pending = false as const;
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        if (!subcommand) {
            const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
            return sender.sendPlainText('Usage: /chat <your message>');
        }
        const { params, imageMode, imageExtractFailed } = await extractUserMessage({ ...message, text: subcommand }, context);
        return chatWithMessage(message, params, context, null, imageMode, imageExtractFailed);
    };
}

// Telegram deleteMessages 单次最多 100 条
const DELETE_MESSAGES_BATCH_SIZE = 100;
// 遇到 429 时最多等待的秒数, 避免 webhook 场景被长时间挂住
const DELETE_MESSAGES_MAX_WAIT_S = 5;

interface TelegramErrorBody {
    ok?: boolean;
    description?: string;
    parameters?: { retry_after?: number };
}

// 这些返回说明消息已经不在了(过期/已删除/本来就删不掉),
// 记录里留着只会让每次 /clear 都白试一遍, 直接当作已清理
function isGoneDescription(description: string | undefined): boolean {
    if (!description) {
        return false;
    }
    const text = description.toLowerCase();
    return text.includes('message to delete not found')
        || text.includes('message is not found')
        || text.includes('message can\'t be deleted')
        || text.includes('message cannot be deleted');
}

// 从存储读到的分组统一成"正整数 id 的数组":
// Cloudflare KV 返回字符串, adapter 的 sqlite/redis 实现可能把数字读成字符串,
// 不归一化会让 message_id 变成 "5150835" 这种值, 删除请求被 Telegram 拒绝
function normalizeMessageIdGroups(groups: unknown): number[][] {
    if (!Array.isArray(groups)) {
        return [];
    }
    const result: number[][] = [];
    for (const group of groups) {
        if (!Array.isArray(group)) {
            continue;
        }
        const ids = group.map(value => Number(value)).filter(value => Number.isInteger(value) && value > 0);
        if (ids.length > 0) {
            result.push(ids);
        }
    }
    return result;
}

function sleepSeconds(seconds: number): Promise<void> {
    const wait = Math.min(Math.max(seconds, 0.1), DELETE_MESSAGES_MAX_WAIT_S);
    return new Promise(resolve => setTimeout(resolve, wait * 1000));
}

// 删除单条消息; true = 已经不在了(删除成功或本来就删不掉), false = 失败, 需要留在记录里重试
async function deleteOneMessage(api: TelegramBotAPI, chatId: number, messageId: number): Promise<boolean> {
    try {
        const resp = await api.deleteMessage({ chat_id: chatId, message_id: messageId });
        const body = await resp.clone().json().catch(() => null) as TelegramErrorBody | null;
        if (body?.ok) {
            return true;
        }
        if (isGoneDescription(body?.description)) {
            return true;
        }
        console.error(`[clear] deleteMessage 失败 ${messageId} (${resp.status}): ${body?.description ?? 'no json body'}`);
        return false;
    } catch (e) {
        console.error(`[clear] deleteMessage 异常 ${messageId}:`, e);
        return false;
    }
}

// 删除一批消息, 返回已消失和仍失败的 id。
// 优先 deleteMessages 批量删(1 次请求代替 N 次, 避免记录多时逐条删必然撞上 429 限流);
// 批量接口不可用(旧服务器/中转不支持)或失败时逐条回退, 能删几条是几条。
async function deleteBotMessages(api: TelegramBotAPI, chatId: number, ids: number[]): Promise<{ gone: Set<number>; failed: Set<number> }> {
    const gone = new Set<number>();
    const failed = new Set<number>();
    for (let i = 0; i < ids.length; i += DELETE_MESSAGES_BATCH_SIZE) {
        const chunk = ids.slice(i, i + DELETE_MESSAGES_BATCH_SIZE);
        let batchOK = false;
        try {
            const resp = await api.deleteMessages({ chat_id: chatId, message_ids: chunk });
            const body = await resp.clone().json().catch(() => null) as TelegramErrorBody | null;
            batchOK = body?.ok === true;
            if (!batchOK) {
                console.error(`[clear] deleteMessages 失败 (${resp.status}): ${body?.description ?? 'no json body'}, 回退逐条删除 ${chunk.length} 条`);
                if (resp.status === 429) {
                    await sleepSeconds(body?.parameters?.retry_after ?? 1);
                }
            }
        } catch (e) {
            console.error('[clear] deleteMessages 异常, 回退逐条删除:', e);
        }
        if (batchOK) {
            chunk.forEach(id => gone.add(id));
            continue;
        }
        for (const id of chunk) {
            if (await deleteOneMessage(api, chatId, id)) {
                gone.add(id);
            } else {
                failed.add(id);
            }
        }
    }
    return { gone, failed };
}

// /clear 命令: 清理 bot 回复消息
// 作用范围: 群聊清屏(不注册菜单, 手动输入 /clear 触发), 也支持私聊
// 用法:
//   1. 回复某条 bot 回复的消息 + /clear → 清除该回复拆分的所有消息(整组)
//   2. /clear N → 清理最近 N 条 bot 回复(按时间倒序, 跨组累计)
//   3. /clear all → 清理本会话记录的全部 bot 回复
// 权限: 配置的管理员(ADMIN_USER_IDS)或群组管理员(administrator/creator)
export class ClearCommandHandler implements CommandHandler {
    command = '/clear';
    // 方案B: 私聊普通用户菜单显示 /clear, 群聊不显示任何命令菜单(方案B)
    scopes = ['all_private_chats'];
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
        const chatId = message.chat.id;
        const speakerId = message.from?.id;
        const chatType = message.chat.type;
        // 权限: 白名单管理员 或 群组管理员(administrator/creator) 或 群聊匿名管理员发言
        let allowed = isAdminUserId(speakerId) === true || isAnonymousAdminMessage(speakerId, chatType);
        let role = null;
        if (!allowed && speakerId != null && isGroupChat(chatType)) {
            role = await loadChatRoleWithContext(chatId, speakerId, context);
            allowed = role === 'administrator' || role === 'creator';
        }
        if (!allowed) {
            // 诊断日志: 输出权限判定所需信息, 便于排查线上管理员识别问题
            console.error('[clear] permission denied', {
                speakerId: speakerId ?? null,
                chatType,
                chatId,
                adminIds: ENV.ADMIN_USER_IDS,
                isAdmin: isAdminUserId(speakerId),
                isAnonymous: isAnonymousAdminMessage(speakerId, chatType),
                role,
            });
            return sender.sendPlainText('ERROR: Permission denied, admin only');
        }
        try {
            // 读取本会话记录的所有 bot 回复分组(统一归一化成数字 id)
            const groups = normalizeMessageIdGroups(await listBotReplyGroups(context));
            const clearAll = subcommand.trim() === 'all';
            if (groups.length === 0 && !(clearAll && ENV.CLEAR_ALSO_RESETS_HISTORY)) {
                return sender.sendPlainText('No bot messages recorded to clear');
            }
            // 确定要删除的消息 id 列表
            const toDelete: number[] = [];
            if (clearAll) {
                // 模式3: /clear all 全清，也可在没有屏幕消息索引时重置会话
                for (const group of groups) {
                    toDelete.push(...group);
                }
            } else if (subcommand.trim()) {
                // 模式2: /clear N —— 取最近 N 条(跨组按时间倒序), N 优先于回复
                const n = Number.parseInt(subcommand.trim(), 10);
                if (!Number.isFinite(n) || n <= 0) {
                    return sender.sendPlainText('Usage: /clear [N|all], or reply to a bot message to clear it');
                }
                // 将分组展平为按时间顺序的消息 id 列表
                const flat: number[] = [];
                for (const group of groups) {
                    flat.push(...group);
                }
                toDelete.push(...new Set(flat.slice(Math.max(0, flat.length - n))));
            } else if (message.reply_to_message) {
                // 模式1: 回复式——无 subcommand 且有回复, 找到包含被回复消息的组整组删除
                const replyId = message.reply_to_message.message_id;
                let found = false;
                for (const group of groups) {
                    if (group.includes(replyId)) {
                        toDelete.push(...group);
                        found = true;
                    }
                }
                if (!found) {
                    return sender.sendPlainText('Replied message is not a recorded bot reply');
                }
            } else {
                return sender.sendPlainText('Usage: /clear [N|all], or reply to a bot message to clear it');
            }
            // 先切断历史，再调用可能因重试而变慢的 Telegram 删除接口。
            if (ENV.CLEAR_ALSO_RESETS_HISTORY) {
                await resetChatHistory(context.SHARE_CONTEXT.chatHistoryKey, context.requestStartedAt, message.message_id)
                    .catch(error => console.error('[clear] 重置历史失败:', error));
            }
            const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
            const uniqueIds = [...new Set(toDelete)];
            const { gone, failed } = await deleteBotMessages(api, chatId, uniqueIds);
            debugLog(`[diag] clear 删除完成: 成功 ${gone.size}/${uniqueIds.length}, 失败 ${failed.size}, key=${context.SHARE_CONTEXT.chatHistoryKey}`);
            // KV 只保留没能删掉的 id: 以前无论删没删成功都整组写回, 一次失败记录就永久丢了
            const remaining: number[][] = [];
            for (const group of groups) {
                const kept = group.filter(id => !gone.has(id));
                if (kept.length > 0) {
                    remaining.push(kept);
                }
            }
            if (gone.size > 0) {
                await updateBotReplyGroups(context, remaining);
            }
            // 删除 /clear 命令自身消息
            await deleteOneMessage(api, chatId, message.message_id);
            // 静默返回: 不发送确认消息, 避免在 Cloudflare stateless 模式下
            // setTimeout 自删不可靠而残留提示消息
            return new Response(null, { status: 200 });
        } catch (e) {
            return sender.sendPlainText(`ERROR: ${(e as Error).message}`);
        }
    };
}

export class ModelsCommandHandler implements CommandHandler {
    command = '/models';
    // 管理员专属: 不注册到私聊公共菜单, 普通用户私聊看不到 /models
    // 管理员通过 AdminMenuSync (BotCommandScopeChat) 动态同步完整菜单
    scopes = [];
    adminOnly = true;
    needAuth = TELEGRAM_AUTH_CHECKER.adminOnly;
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
        const chatAgent = loadChatLLM(context.USER_CONFIG);
        const text = `${chatAgent?.name || 'Nan'} | ${chatAgent?.model(context.USER_CONFIG) || 'Nan'}`;
        const params: Telegram.SendMessageParams = {
            chat_id: message.chat.id,
            text,
            reply_markup: {
                inline_keyboard: [[
                    {
                        text: ENV.I18N.callback_query.open_model_list,
                        callback_data: 'al:',
                    },
                ]],
            },
        };
        return sender.sendRawMessage(params);
    };
}

export class ImgModelsCommandHandler implements CommandHandler {
    command = '/imgmodels';
    // 管理员专属: 切换生图模型, 与 /models 权限一致
    scopes = [];
    adminOnly = true;
    needAuth = TELEGRAM_AUTH_CHECKER.adminOnly;
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
        const imageAgent = loadImageGen(context.USER_CONFIG);
        if (!imageAgent) {
            return sender.sendPlainText('ERROR: Image function is disabled, please configure IMAGE_API_BASE and IMAGE_API_KEY');
        }
        const text = `${imageAgent?.name || 'Nan'} | ${imageAgent?.model(context.USER_CONFIG) || 'Nan'}`;
        const params: Telegram.SendMessageParams = {
            chat_id: message.chat.id,
            text,
            reply_markup: {
                inline_keyboard: [[
                    {
                        text: ENV.I18N.callback_query.open_model_list,
                        callback_data: 'ial:',
                    },
                ]],
            },
        };
        return sender.sendRawMessage(params);
    };
}

export class EchoCommandHandler implements CommandHandler {
    command = '/echo';
    // 调试命令: 回显原始 message JSON, 仅管理员可用, 避免泄露 message 结构
    adminOnly = true;
    needAuth = TELEGRAM_AUTH_CHECKER.adminOnly;
    handle = (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        let msg = '<pre>';
        msg += JSON.stringify({ message }, null, 2);
        msg += '</pre>';
        return MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message).sendRichText(msg, 'HTML');
    };
}
