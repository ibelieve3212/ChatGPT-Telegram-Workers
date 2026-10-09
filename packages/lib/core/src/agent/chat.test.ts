import { ENV } from '#/config';
import { loadHistory } from './chat';

// 会话闲时重置逻辑测试:
// 群聊闲置超过 SESSION_IDLE_TIMEOUT(默认1800s)自动开新会话。
// 关键回归点: 哨兵 key 带 TTL(2×超时), 闲置超过 1 小时后哨兵被 KV 删除,
// 此时也必须重置会话 —— 否则隔天回来时旧历史复活(用户实测踩过的坑)。
// 私聊默认不重置, 可通过 SESSION_IDLE_TIMEOUT_PRIVATE 开启。

const GROUP_KEY = 'history:-100123:42:10001';
const SENTINEL_KEY = `last_active:${GROUP_KEY}`;

function createMockDatabase() {
    const store = new Map<string, string>();
    return {
        get: async (k: string): Promise<string | null> => store.get(k) ?? null,
        put: async (k: string, v: string): Promise<void> => {
            store.set(k, v);
        },
        delete: async (k: string): Promise<void> => {
            store.delete(k);
        },
        _store: store,
    };
}

const OLD_HISTORY = [
    { role: 'user', content: '懂车帝测试尊界汽车刹车踏板支架断裂怎么看' },
    { role: 'assistant', content: '这是昨天的回答' },
];

describe('loadHistory 会话闲时重置', () => {
    beforeEach(() => {
        (ENV as any).DATABASE = createMockDatabase();
        ENV.SESSION_IDLE_TIMEOUT = 1800;
        ENV.SESSION_IDLE_TIMEOUT_PRIVATE = 0;
        ENV.AUTO_TRIM_HISTORY = true;
        ENV.MAX_HISTORY_LENGTH = 20;
        ENV.MAX_TOKEN_LENGTH = -1;
    });

    const seedHistory = async (): Promise<void> => {
        await ENV.DATABASE.put(GROUP_KEY, JSON.stringify(OLD_HISTORY));
    };

    it('群聊: 闲置超过30分钟 → 自动重置会话', async () => {
        await seedHistory();
        const now = Math.floor(Date.now() / 1000);
        await ENV.DATABASE.put(SENTINEL_KEY, String(now - 1900)); // 闲置约31.7分钟
        const history = await loadHistory(GROUP_KEY, 'supergroup');
        expect(history).toEqual([]);
    });

    it('群聊: 闲置未超过30分钟 → 保留历史', async () => {
        await seedHistory();
        const now = Math.floor(Date.now() / 1000);
        await ENV.DATABASE.put(SENTINEL_KEY, String(now - 100)); // 闲置100秒
        const history = await loadHistory(GROUP_KEY, 'supergroup');
        expect(history).toEqual(OLD_HISTORY);
    });

    it('群聊: 哨兵key已过期(隔天回来) → 同样重置 (TTL漏洞修复回归)', async () => {
        // 模拟: 前一天活跃后闲置超过哨兵TTL(1小时), KV已自动删除哨兵, 但历史key仍在
        await seedHistory();
        const history = await loadHistory(GROUP_KEY, 'supergroup');
        expect(history).toEqual([]);
        // 重置后应写入新的哨兵时间戳
        const sentinel = await (ENV.DATABASE as any)._store.get(SENTINEL_KEY);
        expect(sentinel).toBeDefined();
    });

    it('私聊: 默认不做闲时重置, 隔天历史保留 (设计行为)', async () => {
        await seedHistory();
        // 不写哨兵, 也不写活跃时间 → 即使闲置任意久
        const history = await loadHistory(GROUP_KEY, 'private');
        expect(history).toEqual(OLD_HISTORY);
        // 私聊不应写哨兵 key
        expect(await (ENV.DATABASE as any)._store.get(SENTINEL_KEY)).toBeUndefined();
    });

    it('私聊: SESSION_IDLE_TIMEOUT_PRIVATE 开启后闲置超时 → 重置', async () => {
        ENV.SESSION_IDLE_TIMEOUT_PRIVATE = 1800;
        await seedHistory();
        const now = Math.floor(Date.now() / 1000);
        await ENV.DATABASE.put(SENTINEL_KEY, String(now - 1900)); // 闲置约31.7分钟
        const history = await loadHistory(GROUP_KEY, 'private');
        expect(history).toEqual([]);
        // 重置后写入新哨兵
        const sentinel = await (ENV.DATABASE as any)._store.get(SENTINEL_KEY);
        expect(sentinel).toBeDefined();
    });

    it('私聊: SESSION_IDLE_TIMEOUT_PRIVATE 开启但闲置未超时 → 保留历史', async () => {
        ENV.SESSION_IDLE_TIMEOUT_PRIVATE = 1800;
        await seedHistory();
        const now = Math.floor(Date.now() / 1000);
        await ENV.DATABASE.put(SENTINEL_KEY, String(now - 100));
        const history = await loadHistory(GROUP_KEY, 'private');
        expect(history).toEqual(OLD_HISTORY);
    });

    it('私聊: 开启后哨兵过期(隔天回来) → 同样重置', async () => {
        ENV.SESSION_IDLE_TIMEOUT_PRIVATE = 1800;
        await seedHistory();
        // 无哨兵(已过期), 但开关开启 → 必须重置, 不能复活旧历史
        const history = await loadHistory(GROUP_KEY, 'private');
        expect(history).toEqual([]);
    });

    it('全新群聊: 无历史无哨兵 → 空历史不报错', async () => {
        const history = await loadHistory(GROUP_KEY, 'group');
        expect(history).toEqual([]);
    });

    it('SESSION_IDLE_TIMEOUT=0 时禁用重置', async () => {
        ENV.SESSION_IDLE_TIMEOUT = 0;
        await seedHistory();
        const now = Math.floor(Date.now() / 1000);
        await ENV.DATABASE.put(SENTINEL_KEY, String(now - 99999));
        const history = await loadHistory(GROUP_KEY, 'supergroup');
        expect(history).toEqual(OLD_HISTORY);
    });
});
