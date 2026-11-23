import type { KVNamespaceBinding } from '#/config';
import { ENV } from '#/config';

const seenByStore = new WeakMap<KVNamespaceBinding, Map<string, number>>();
const TTL_SECONDS = 48 * 3600;
const LOCAL_LIMIT = 10000;

// await 之前先占住本进程位置；持久化每条消息，避免并发追加一个 ID 数组时互相覆盖。
// KV 没有 compare-and-set：独立 Worker/进程首次同时收到同一消息仍不是强一致抢锁。
export async function claimMessage(key: string, legacyKey?: string, messageId?: number, force = false): Promise<boolean> {
    if (!force && !ENV.SAFE_MODE)
        return true;
    const database = ENV.DATABASE;
    let seen = seenByStore.get(database);
    if (!seen) {
        seen = new Map();
        seenByStore.set(database, seen);
    }
    const now = Date.now();
    if ((seen.get(key) ?? 0) > now)
        return false;
    seen.set(key, now + TTL_SECONDS * 1000);
    while (seen.size > LOCAL_LIMIT) seen.delete(seen.keys().next().value!);
    try {
        if (await database.get(key) != null)
            return false;
        if (legacyKey && messageId !== undefined) {
            const raw = await database.get(legacyKey);
            let ids: unknown;
            try {
                ids = typeof raw === 'string' ? JSON.parse(raw) : raw;
            } catch {
                ids = [];
            }
            if (Array.isArray(ids) && ids.includes(messageId))
                return false;
        }
        await database.put(key, '1', { expirationTtl: TTL_SECONDS });
        return true;
    } catch (e) {
        // 无法可靠去重时不启动有副作用的模型请求；下一次投递仍能重试。
        seen.delete(key);
        throw e;
    }
}
