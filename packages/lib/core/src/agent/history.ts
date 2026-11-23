import type { KVNamespaceBinding } from '#/config';
import type { HistoryItem } from './types';
import { ENV } from '#/config';
import { listStorageKeys as listKeys, readStorageValues } from '#/config/storage';
import { extractTextContent } from './utils';

// 回复拆成多条时，任一条都能定位到同一轮。
export type StoredHistoryItem = HistoryItem & {
    replyLink?: { messageIds: number[]; parentId?: number };
};

interface HistorySession {
    items: StoredHistoryItem[];
    append: (items: StoredHistoryItem[]) => Promise<void>;
}

const CLEANUP_LIMIT = 8;

function historyPrefix(key: string): string {
    // 末尾的分隔符避免群共享历史匹配到群成员或话题的独立历史。
    return `chat-turns:${key}/`;
}

function orderAt(time: number, messageId = 0): string {
    return `${String(time).padStart(13, '0')}-${String(messageId).padStart(16, '0')}`;
}

function recordOrder(key: string): string {
    return key.split('/').at(-2)!;
}

function recordTime(key: string | undefined, boundary: string): number {
    return key && recordOrder(key) > boundary ? Number(recordOrder(key).split('-', 1)[0]) : 0;
}

function recordKey(prefix: string, order: string): string {
    // 并发请求各写自己的键，不覆盖整段历史，也不争写同一个重置标记。
    return `${prefix}${order}/${crypto.randomUUID()}`;
}

function parseMessages(raw: unknown): StoredHistoryItem[] {
    try {
        const items = typeof raw === 'string' ? JSON.parse(raw) : raw;
        return Array.isArray(items) ? items : [];
    } catch (e) {
        console.error('[history] 无法读取问答记录:', e);
        return [];
    }
}

async function readTurns(database: KVNamespaceBinding, keys: string[]): Promise<StoredHistoryItem[]> {
    return (await readStorageValues(database, keys)).flatMap(parseMessages);
}

function trimHistory(items: StoredHistoryItem[], limit?: number): StoredHistoryItem[] {
    if (!limit) {
        return items;
    }
    const tail = items.slice(-limit);
    if (ENV.MAX_TOKEN_LENGTH > 0) {
        let length = 0;
        for (let i = tail.length - 1; i >= 0; i--) {
            length += extractTextContent(tail[i]).length;
            if (length > ENV.MAX_TOKEN_LENGTH) {
                return tail.slice(i + 1);
            }
        }
    }
    return tail;
}

async function cleanKeys(database: KVNamespaceBinding, keys: string[]): Promise<void> {
    // 单次限量；未删掉的旧记录也不会进入上下文，后续请求继续清理。
    const results = await Promise.allSettled([...new Set(keys)].slice(0, CLEANUP_LIMIT).map(key => database.delete(key)));
    const failed = results.find(result => result.status === 'rejected');
    if (failed) {
        console.error('[history] 清理旧记录失败:', failed.reason);
    }
}

export async function resetChatHistory(key: string, startedAt = Date.now(), messageId?: number): Promise<void> {
    const database = ENV.DATABASE;
    const prefix = historyPrefix(key);
    const boundary = orderAt(startedAt, messageId);
    const marker = recordKey(`${prefix}reset/`, boundary);
    await database.put(marker, '');
    await cleanKeys(database, [key, `last_active:${key}`]);
    try {
        const keys = await listKeys(database, prefix);
        await cleanKeys(database, keys.filter(k => !k.startsWith(`${prefix}reset/`) && recordOrder(k) <= boundary));
    } catch (e) {
        console.error('[history] 清理旧会话失败:', e);
    }
}

function emptySession(): HistorySession {
    return { items: [], append: async () => {} };
}

export async function openHistorySession(key: string, chatType?: string, startedAt = Date.now(), messageId?: number): Promise<HistorySession> {
    const database = ENV.DATABASE;
    const prefix = historyPrefix(key);
    const resetPrefix = `${prefix}reset/`;
    const activityPrefix = `${prefix}active/`;
    const turnPrefix = `${prefix}turn/`;
    const position = orderAt(startedAt, messageId);
    const isGroup = chatType === 'group' || chatType === 'supergroup';
    const idleMs = (isGroup ? ENV.SESSION_IDLE_TIMEOUT : ENV.SESSION_IDLE_TIMEOUT_PRIVATE) * 1000;
    const limit = ENV.AUTO_TRIM_HISTORY && ENV.MAX_HISTORY_LENGTH > 0 ? ENV.MAX_HISTORY_LENGTH : undefined;
    const legacyActiveKey = `last_active:${key}`;
    try {
        const keys = await listKeys(database, prefix);
        const newestReset = keys.findLast(k => k.startsWith(resetPrefix));
        let boundary = newestReset ? recordOrder(newestReset) : '';
        if (position <= boundary) {
            return emptySession();
        }

        const turns = keys.filter(k => k.startsWith(turnPrefix));
        const activity = keys.filter(k => k.startsWith(activityPrefix));
        const [legacyRaw, legacyActive] = boundary
            ? [null, null]
            : await Promise.all([
                    database.get(key),
                    idleMs > 0 ? database.get(legacyActiveKey) : null,
                ]);
        const legacy = parseMessages(legacyRaw);
        const lastActive = Math.max(Number(legacyActive) * 1000 || 0, recordTime(turns.at(-1), boundary), recordTime(activity.at(-1), boundary));
        const obsolete: string[] = [];
        if (idleMs > 0 && (lastActive ? startedAt - lastActive > idleMs : legacy.length > 0)) {
            // 以旧会话过期时刻为界；同时回来的人不会互相清掉新一轮。
            // 旧版哨兵已过期且没有新记录时，只排除旧版快照。
            boundary = orderAt(lastActive ? Math.ceil(lastActive + idleMs) : 0, Number.MAX_SAFE_INTEGER);
            await database.put(recordKey(resetPrefix, boundary), '');
            if (legacyRaw != null) {
                obsolete.push(key, legacyActiveKey);
            }
        }

        const activeTurns = turns.filter(k => recordOrder(k) > boundary);
        const skip = limit ? Math.max(0, activeTurns.length - limit) : 0;
        const recent = activeTurns.slice(skip);
        // 保留空的重置标记，避免各地 KV 先看见旧标记删除、却还看不见新标记。
        obsolete.push(...keys.filter(k => !k.startsWith(resetPrefix) && recordOrder(k) <= boundary), ...activeTurns.slice(0, skip));
        if (idleMs > 0) {
            const activeKey = recordKey(activityPrefix, position);
            try {
                await database.put(activeKey, '');
                obsolete.push(...[...activity.filter(k => recordOrder(k) > boundary), activeKey].sort().slice(0, -1));
            } catch (e) {
                console.error('[history] 记录会话活动失败:', e);
            }
        }
        const [items] = await Promise.all([
            readTurns(database, recent),
            cleanKeys(database, obsolete),
        ]);
        const turnKey = recordKey(turnPrefix, position);
        return {
            items: trimHistory([...(boundary ? [] : legacy), ...items], limit),
            append: async (messages) => {
                // 这里只是避免留下明显过期的记录，不依赖这次读取作为锁。
                // 即便漏读标记，迟到的轮次仍带原始顺序，之后也过不了重置边界。
                const latestReset = (await listKeys(database, resetPrefix)).at(-1);
                if (!latestReset || position > recordOrder(latestReset)) {
                    await database.put(turnKey, JSON.stringify(messages));
                }
            },
        };
    } catch (e) {
        // 读失败时允许本轮无历史回答，不用猜测的历史数据继续写入。
        console.error('[history] 打开会话失败:', e);
        return emptySession();
    }
}

export async function loadHistory(key: string, chatType?: string): Promise<StoredHistoryItem[]> {
    return (await openHistorySession(key, chatType)).items;
}
