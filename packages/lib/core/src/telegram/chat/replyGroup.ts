import type { WorkerContext } from '#/config';
import { ENV } from '#/config';
import { listStorageKeys, readStorageValues } from '#/config/storage';

const TTL = 48 * 3600;
const MAX_REPLY_GROUPS = 1000;
const prefixOf = (context: WorkerContext) => `bot-replies:${context.SHARE_CONTEXT.chatHistoryKey}/`;
const legacyKeyOf = (context: WorkerContext) => `bot_reply_group:${context.SHARE_CONTEXT.chatHistoryKey}`;

function normalize(raw: unknown): number[][] {
    try {
        const value = typeof raw === 'string' ? JSON.parse(raw) : raw;
        if (!Array.isArray(value))
            return [];
        return value.filter(Array.isArray).map(ids => [...new Set(ids.map(Number).filter(id => Number.isSafeInteger(id) && id > 0))]).filter(ids => ids.length);
    } catch { return []; }
}

export async function saveBotReplyGroup(context: WorkerContext, messageIds: number[]): Promise<void> {
    const ids = normalize([messageIds])[0]?.sort((a, b) => a - b);
    if (!ids?.length)
        return;
    try {
        // 不同分组不可仅用最小 ID 作键，否则迟到的单条登记会覆盖整组分段。
        const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(ids)));
        const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
        const key = `${prefixOf(context)}group/${String(ids[0]).padStart(16, '0')}/${hash}`;
        await ENV.DATABASE.put(key, JSON.stringify([ids]), { expirationTtl: TTL });
    } catch (e) { console.error('[reply-group] 保存失败:', e); }
}

export async function listBotReplyGroups(context: WorkerContext): Promise<number[][]> {
    try {
        const database = ENV.DATABASE;
        const prefix = prefixOf(context);
        const keys = await listStorageKeys(database, prefix);
        const gone = new Set(keys.filter(k => k.startsWith(`${prefix}gone/`)).map(k => Number(k.split('/').at(-1))));
        const records = keys.filter(k => k.startsWith(`${prefix}group/`));
        const raw = await readStorageValues(database, records);
        const groups = [...normalize(await database.get(legacyKeyOf(context))), ...raw.flatMap(normalize)];
        const merged: number[][] = [];
        for (const group of groups) {
            const ids = new Set(group.filter(id => !gone.has(id)));
            if (!ids.size)
                continue;
            // 兼容旧版重复登记、同组分段与占位残留。相交的组必须合并，不能重复计数。
            for (let i = merged.length - 1; i >= 0; i--) {
                if (merged[i].some(id => ids.has(id))) {
                    merged[i].forEach(id => ids.add(id));
                    merged.splice(i, 1);
                }
            }
            merged.push([...ids].sort((a, b) => a - b));
        }
        merged.sort((a, b) => a[0] - b[0]);
        // TTL 是主回收机制，容量外的记录限量清理，不影响新记录和删除标记。
        const obsolete = records.slice(0, Math.max(0, records.length - MAX_REPLY_GROUPS));
        await Promise.allSettled(obsolete.slice(0, 8).map(k => database.delete(k)));
        return merged.slice(-MAX_REPLY_GROUPS);
    } catch (e) {
        console.error('[reply-group] 读取失败:', e);
        return [];
    }
}

// 只标记已确认删除的 ID，不把 /clear 开始时的旧快照覆盖回去，保留期间并发发送的新回复。
export async function removeBotReplyMessages(context: WorkerContext, messageIds: number[]): Promise<void> {
    const ids = normalize([messageIds])[0];
    if (!ids?.length)
        return;
    const database = ENV.DATABASE;
    const prefix = prefixOf(context);
    // 比分组多保留一天，覆盖删除后的在途迟写。旧数组只读且不续 TTL，
    // 避免两个 clear 覆写旧快照，或延长旧数组寿命使已过期的删除标记失效。
    await Promise.all(ids.map(id => database.put(`${prefix}gone/${id}`, '', { expirationTtl: TTL + 24 * 3600 })));
}
