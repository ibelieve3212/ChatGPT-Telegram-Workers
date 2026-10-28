import type * as Telegram from 'telegram-bot-api-types';

// 讨论串(回复链)抓取: 用户引用一条消息向 bot 提问时, 把那条消息之上的整条
// "谁回复谁"链(用户之间的讨论 + 最原始的消息)都补给模型。
//
// 限制: Bot API 的 reply_to_message 只带直接被引用的那一条(偶尔嵌套一层),
// 没有任何方法能反查历史消息。因此 bot 收到的每条消息都先记一份轻量缓存,
// 引用时沿"回复的是谁"指针(message_id)回溯拼出整条链。
//
// 已知边界:
// - 缓存是内存的, bot 重启后链上旧消息丢失(仅剩 Telegram 主动嵌套的部分);
// - 群聊中 bot 默认(privacy mode)只收得到 @它/回复它的消息, 要抓全讨论链
//   需在 BotFather /setprivacy 关闭隐私模式, 或将 bot 设为群管理员。

// 每个 chat 最多缓存的消息条数(超出按先进先出淘汰)
export const CHAT_CAPACITY = 300;
// 最多缓存多少个 chat(超出按先进先出淘汰)
export const CHAT_COUNT_MAX = 50;
// 单条讨论串回溯的最大深度(防脏数据成环导致死循环)
export const THREAD_MAX_DEPTH = 30;

interface CachedMessage {
    message: Telegram.Message;
    // 这条消息回复的是谁(message_id), 用于链回溯
    replyToId?: number;
}

// chatKey → (message_id → 消息缓存), Map 迭代顺序即插入顺序, 用作先进先出
const chatCaches = new Map<string, Map<number, CachedMessage>>();

function chatKeyOf(message: Telegram.Message): string {
    return `${message.chat.id}`;
}

// 记录一条收到的消息(含群里没 @bot 的消息), 供之后讨论串回溯。
// 放在消息中间件链的最前面调用, 尽量记录一切能看到的消息。
export function recordChatMessage(message: Telegram.Message): void {
    const chatKey = chatKeyOf(message);
    let msgMap = chatCaches.get(chatKey);
    if (!msgMap) {
        msgMap = new Map<number, CachedMessage>();
        chatCaches.set(chatKey, msgMap);
        // chat 数量超上限: 淘汰最早接入的 chat
        if (chatCaches.size > CHAT_COUNT_MAX) {
            const oldest = chatCaches.keys().next().value;
            if (oldest !== undefined && oldest !== chatKey) {
                chatCaches.delete(oldest);
            }
        }
    }
    // 重复送达的同一 message_id 直接覆盖, 不重复占位
    msgMap.set(message.message_id, {
        message,
        replyToId: message.reply_to_message?.message_id,
    });
    if (msgMap.size > CHAT_CAPACITY) {
        const oldest = msgMap.keys().next().value;
        if (oldest !== undefined) {
            msgMap.delete(oldest);
        }
    }
}

function sameChat(a: Telegram.Message, b: Telegram.Message): boolean {
    return `${a.chat.id}` === `${b.chat.id}`;
}

// 从被引用的消息出发, 收集整条讨论链(含被引用的那条), 按 时间/message_id 升序
// (最早→最新)返回。回溯来源有两个:
// 1. Telegram 在 reply_to_message 里主动嵌套的上游消息(能带多少带多少);
// 2. 本地消息缓存里"回复的是谁"的指针。
// 两者合并后按 message_id 去重。
export function collectReplyThread(referenced: Telegram.Message): Telegram.Message[] {
    const collected = new Map<number, Telegram.Message>();
    let cursor: Telegram.Message | undefined = referenced;
    for (let depth = 0; cursor && depth < THREAD_MAX_DEPTH; depth++) {
        if (collected.has(cursor.message_id)) {
            break;
        }
        if (!sameChat(cursor, referenced)) {
            break;
        }
        collected.set(cursor.message_id, cursor);
        // 优先沿嵌套 reply_to_message 走(Telegram 主动提供的上游)
        if (cursor.reply_to_message && sameChat(cursor.reply_to_message, referenced)) {
            cursor = cursor.reply_to_message;
            continue;
        }
        // 嵌套没了, 查本地缓存沿“回复的是谁”指针继续回溯。
        // (message_id 只在单个 chat 内唯一, 指针只信同 chat 的缓存,
        //  避免把其它 chat 同 id 的消息错拼进来)
        const msgMap: Map<number, CachedMessage> | undefined = chatCaches.get(chatKeyOf(referenced));
        const cached: CachedMessage | undefined = msgMap?.get(cursor.message_id);
        const replyToId: number | undefined = cached?.replyToId;
        if (replyToId === undefined) {
            break;
        }
        const upstream: CachedMessage | undefined = msgMap?.get(replyToId);
        cursor = upstream?.message;
    }
    return [...collected.values()].sort((a, b) => a.message_id - b.message_id);
}

// 讨论串条目的展示名
export function threadDisplayName(message: Telegram.Message): string {
    const from = message.from;
    if (from) {
        return from.first_name || from.last_name || from.username || `用户${from.id}`;
    }
    // 频道/匿名管理员消息只有 sender_chat
    return message.sender_chat?.title || '匿名';
}

export function clearReplyThreadCacheForTest(): void {
    chatCaches.clear();
}
