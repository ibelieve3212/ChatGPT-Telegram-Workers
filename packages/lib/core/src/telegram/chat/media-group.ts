import type * as Telegram from 'telegram-bot-api-types';

// ==== 相册(media group)补齐 ====
// Telegram 客户端里"一条消息带多张图"(相册), 在 Bot API 中是 N 条独立消息(共享 media_group_id):
// - 直接发送相册: bot 收到 N 次 update, 逐条处理会让模型每次只看到一张图、bot 连续回复 N 次;
// - 引用相册中某张图: reply_to_message 只带那一条, Bot API 又无法按 media_group_id 反查同组其它图片。
// 这里用内存缓存把整组图片记下来, 两类场景都补齐为"整组一起给模型"。
// (进程重启后缓存丢失, 引用旧相册会退化为只带被引用的那一张, 与现状一致)

// --- 场景一: 直接发送的相册, 静默期收集整组, 只触发一次回复 ---
interface PendingMediaGroup {
    messages: Telegram.Message[];
    timer: ReturnType<typeof setTimeout> | null;
    deferred: Promise<Telegram.Message[]>;
    resolve: (messages: Telegram.Message[]) => void;
}

// key: media_group_id, value: 尚未收齐的相册
const pendingMediaGroups = new Map<string, PendingMediaGroup>();

// 相册的每条消息到达时各调用一次; 静默期(默认 1.5s, 相册各条通常在同一秒内连续到达)内
// 没有新消息即认为整组发送完毕, 把整组消息按 message_id 升序返回给所有等待者(同一个数组)。
export function collectMediaGroup(message: Telegram.Message, quietMs = 1500): Promise<Telegram.Message[]> {
    const groupId = message.media_group_id as string;
    let entry = pendingMediaGroups.get(groupId);
    if (!entry) {
        // Promise 构造函数体同步执行, resolveRef 赋值先于 await 发生
        let resolveRef!: (messages: Telegram.Message[]) => void;
        const deferred = new Promise<Telegram.Message[]>((resolve) => {
            resolveRef = resolve;
        });
        entry = { messages: [], timer: null, deferred, resolve: resolveRef };
        pendingMediaGroups.set(groupId, entry);
    }
    // 同一条消息重复送达时按 message_id 去重
    if (!entry.messages.some(item => item.message_id === message.message_id)) {
        entry.messages.push(message);
    }
    entry.messages.sort((a, b) => a.message_id - b.message_id);
    if (entry.timer) {
        clearTimeout(entry.timer);
    }
    entry.timer = setTimeout(() => {
        pendingMediaGroups.delete(groupId);
        entry!.resolve(entry!.messages);
    }, quietMs);
    return entry.deferred;
}

// --- 场景二: 引用相册时按 media_group_id 取回整组图片 ---
interface MediaGroupImages {
    fileIds: string[];
    expires: number;
}

const mediaGroupImageCache = new Map<string, MediaGroupImages>();
// 缓存 24 小时(覆盖"发完相册, 稍后再引用"的常见间隔), 最多保留 200 组防止内存无限增长
export const MEDIA_GROUP_IMAGE_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
export const MEDIA_GROUP_IMAGE_CACHE_MAX = 200;

// 收到相册消息时记录该组图片的 file_id(自动去重, 组内多条消息逐条补齐)
export function recordMediaGroupImages(groupId: string, fileIds: string[]): void {
    const expires = Date.now() + MEDIA_GROUP_IMAGE_CACHE_TTL_MS;
    const entry = mediaGroupImageCache.get(groupId);
    if (entry) {
        for (const id of fileIds) {
            if (!entry.fileIds.includes(id)) {
                entry.fileIds.push(id);
            }
        }
        entry.expires = expires;
        return;
    }
    // 超出容量时按插入顺序淘汰最旧条目(Map 迭代顺序即插入顺序)
    while (mediaGroupImageCache.size >= MEDIA_GROUP_IMAGE_CACHE_MAX) {
        const oldest = mediaGroupImageCache.keys().next();
        if (oldest.done) {
            break;
        }
        mediaGroupImageCache.delete(oldest.value);
    }
    mediaGroupImageCache.set(groupId, { fileIds: [...fileIds], expires });
}

// 取某相册的全部图片 file_id; 缓存未命中/已过期返回 null(调用方退化为只带被引用的那一张)
export function getMediaGroupImageFileIds(groupId: string): string[] | null {
    const entry = mediaGroupImageCache.get(groupId);
    if (!entry) {
        return null;
    }
    if (entry.expires < Date.now()) {
        mediaGroupImageCache.delete(groupId);
        return null;
    }
    return entry.fileIds;
}

// 仅供测试: 清空两块缓存
export function clearMediaGroupCachesForTest(): void {
    pendingMediaGroups.clear();
    mediaGroupImageCache.clear();
}
