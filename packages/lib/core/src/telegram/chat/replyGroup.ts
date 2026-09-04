import type { WorkerContext } from '#/config';
import { ENV } from '#/config';

// KV 中记录 bot 回复消息分组的 key 前缀
// chatHistoryKey 在群聊共享模式(GROUP_CHAT_BOT_SHARE_MODE)下为群 id, 私聊为用户 id
// 因此 /clear 命令按会话(群/用户)粒度清理 bot 回复
const BOT_REPLY_GROUP_KEY_PREFIX = 'bot_reply_group:';
// 最多保留的回复分组数(每组可能对应一次回复拆分的多条消息)
// 1000 组远超 48h 内正常积果量, 同时防止异常异常场景撑爆 KV
const MAX_REPLY_GROUPS = 1000;
// KV TTL: 48 小时(Telegram 仅允许删除 48 小时内的消息)
const REPLY_GROUP_TTL = 48 * 3600;

function botReplyGroupKey(historyKey: string): string {
    return `${BOT_REPLY_GROUP_KEY_PREFIX}${historyKey}`;
}

// 保存一组 bot 回复的消息 id(每次回复可能拆分成多条消息, 记录为同一组)
export async function saveBotReplyGroup(context: WorkerContext, messageIds: number[]): Promise<void> {
    if (!messageIds || messageIds.length === 0) {
        return;
    }
    try {
        const key = botReplyGroupKey(context.SHARE_CONTEXT.chatHistoryKey);
        let groups: number[][] = [];
        try {
            groups = JSON.parse(await ENV.DATABASE.get(key).catch(() => '[]')) || [];
        } catch (e) {
            console.error(e);
        }
        groups.push(messageIds);
        // 控制 KV 体积, 只保留最近 MAX_REPLY_GROUPS 组
        if (groups.length > MAX_REPLY_GROUPS) {
            groups = groups.slice(-MAX_REPLY_GROUPS);
        }
        await ENV.DATABASE.put(key, JSON.stringify(groups), { expirationTtl: REPLY_GROUP_TTL });
    } catch (e) {
        console.error(e);
    }
}

// 获取本会话记录的所有 bot 回复分组(按发送时间顺序排列)
export async function listBotReplyGroups(context: WorkerContext): Promise<number[][]> {
    try {
        const key = botReplyGroupKey(context.SHARE_CONTEXT.chatHistoryKey);
        const raw = await ENV.DATABASE.get(key).catch(() => null);
        if (!raw) {
            return [];
        }
        const groups = JSON.parse(raw);
        return Array.isArray(groups) ? groups as number[][] : [];
    } catch (e) {
        console.error(e);
        return [];
    }
}

// 更新本会话的 bot 回复分组列表
export async function updateBotReplyGroups(context: WorkerContext, groups: number[][]): Promise<void> {
    try {
        const key = botReplyGroupKey(context.SHARE_CONTEXT.chatHistoryKey);
        await ENV.DATABASE.put(key, JSON.stringify(groups), { expirationTtl: REPLY_GROUP_TTL });
    } catch (e) {
        console.error(e);
    }
}