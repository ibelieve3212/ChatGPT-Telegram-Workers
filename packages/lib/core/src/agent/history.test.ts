import type { KVNamespaceBinding, WorkersKVNamespaceBinding } from '#/config';
import type { StoredHistoryItem } from './history';
import { ENV } from '#/config';
import { openHistorySession, resetChatHistory } from './history';

const KEY = 'history:-100:42';
const PREFIX = `chat-turns:${KEY}/`;
const START = 1800000000000;

function createDatabase() {
    const store = new Map<string, string>();
    return {
        store,
        get: jest.fn(async (key: string) => store.get(key) ?? null),
        put: jest.fn(async (key: string, value: string) => { store.set(key, value); }),
        delete: jest.fn(async (key: string) => { store.delete(key); }),
        listKeys: jest.fn(async (prefix: string) => [...store.keys()].filter(key => key.startsWith(prefix))),
    };
}

function turn(text: string): StoredHistoryItem[] {
    return [{ role: 'user', content: text }, { role: 'assistant', content: `${text}的答复` }];
}

function pauseNextWrite(database: ReturnType<typeof createDatabase>) {
    let reached!: () => void;
    let release!: () => void;
    const started = new Promise<void>((resolve) => {
        reached = resolve;
    });
    const wait = new Promise<void>((resolve) => {
        release = resolve;
    });
    database.put.mockImplementationOnce(async (key, value) => {
        reached();
        await wait;
        database.store.set(key, value);
    });
    return { started, release };
}

let database: ReturnType<typeof createDatabase>;
beforeEach(() => {
    database = createDatabase();
    ENV.DATABASE = database;
    ENV.AUTO_TRIM_HISTORY = true;
    ENV.MAX_HISTORY_LENGTH = 100;
    ENV.MAX_TOKEN_LENGTH = -1;
    ENV.SESSION_IDLE_TIMEOUT = 1800;
    ENV.SESSION_IDLE_TIMEOUT_PRIVATE = 0;
});

describe('按轮保存历史与重置边界', () => {
    it('同一毫秒开始的多轮倒序并发写入，全部保留且按提问消息 ID 排序', async () => {
        const sessions = await Promise.all(Array.from({ length: 12 }, (_, i) => openHistorySession(KEY, 'private', START, i + 1)));
        await Promise.all(sessions.map((session, i) => ({ session, i })).reverse().map(({ session, i }) => session.append(turn(`问题${i}`))));
        const { items } = await openHistorySession(KEY, 'private', START + 1);
        expect(items).toEqual(sessions.flatMap((_, i) => turn(`问题${i}`)));
        expect(await database.listKeys(`${PREFIX}turn/`)).toHaveLength(12);
    });

    it('同一轮保存函数重复调用只写同一个键，不追加重复问答', async () => {
        const session = await openHistorySession(KEY, 'private', START, 1);
        await Promise.all([session.append(turn('问题')), session.append(turn('问题'))]);
        expect((await openHistorySession(KEY, 'private', START + 1)).items).toEqual(turn('问题'));
        expect(await database.listKeys(`${PREFIX}turn/`)).toHaveLength(1);
    });

    it('兼容旧版数组和回复链接，新问答不覆盖旧版键', async () => {
        const legacy = turn('旧问题');
        legacy[0].replyLink = { messageIds: [100, 101] };
        database.store.set(KEY, JSON.stringify(legacy));
        const session = await openHistorySession(KEY, 'private', START, 1);
        expect(session.items).toEqual(legacy);
        await session.append(turn('新问题'));
        expect((await openHistorySession(KEY, 'private', START + 1)).items).toEqual([...legacy, ...turn('新问题')]);
        expect(JSON.parse(database.store.get(KEY)!)).toEqual(legacy);
    });

    it('重置后，已开始的旧轮不写回，新轮不被覆盖', async () => {
        const old = await openHistorySession(KEY, 'private', START, 1);
        await resetChatHistory(KEY, START + 1, 2);
        const fresh = await openHistorySession(KEY, 'private', START + 2, 3);
        await fresh.append(turn('新问题'));
        await old.append(turn('旧问题'));
        expect((await openHistorySession(KEY, 'private', START + 3)).items).toEqual(turn('新问题'));
    });

    it('重置恰好发生在旧轮检查后、落盘前，迟到记录也不能进入新历史', async () => {
        const old = await openHistorySession(KEY, 'private', START, 1);
        const gate = pauseNextWrite(database);
        const saving = old.append(turn('旧问题'));
        await gate.started;
        await resetChatHistory(KEY, START + 1, 2);
        const fresh = await openHistorySession(KEY, 'private', START + 2, 3);
        await fresh.append(turn('新问题'));
        gate.release();
        await saving;
        // 确认测试确实制造了迟到落盘，而不是依赖写入前的那次检查跳过。
        expect([...database.store.values()].some(value => value.includes('旧问题'))).toBe(true);
        expect((await openHistorySession(KEY, 'private', START + 3)).items).toEqual(turn('新问题'));
    });

    it('旧请求暂时漏读重置标记而写入，标记可见后仍按原始顺序排除', async () => {
        const old = await openHistorySession(KEY, 'private', START, 1);
        await resetChatHistory(KEY, START + 1, 2);
        database.listKeys.mockResolvedValueOnce([]);
        await old.append(turn('旧问题'));
        expect([...database.store.values()].some(value => value.includes('旧问题'))).toBe(true);
        expect((await openHistorySession(KEY, 'private', START + 2, 3)).items).toEqual([]);
    });

    it('请求已进入系统但尚未打开历史时被重置，不重新加入会话', async () => {
        await resetChatHistory(KEY, START + 1, 2);
        const delayed = await openHistorySession(KEY, 'private', START, 1);
        expect(delayed.items).toEqual([]);
        await delayed.append(turn('旧问题'));
        expect(await database.listKeys(`${PREFIX}turn/`)).toEqual([]);
    });

    it('两个重置倒序完成，不回退边界，也不误删之后的新轮', async () => {
        const gate = pauseNextWrite(database);
        const earlierReset = resetChatHistory(KEY, START + 1, 2);
        await gate.started;
        await resetChatHistory(KEY, START + 2, 3);
        const fresh = await openHistorySession(KEY, 'private', START + 3, 4);
        await fresh.append(turn('新问题'));
        gate.release();
        await earlierReset;
        expect((await openHistorySession(KEY, 'private', START + 4)).items).toEqual(turn('新问题'));
        expect(await database.listKeys(`${PREFIX}reset/`)).toHaveLength(2);
    });

    it('清理旧键失败仍以已保存的标记为准，不复活旧数组或旧轮', async () => {
        database.store.set(KEY, JSON.stringify(turn('旧版问题')));
        const old = await openHistorySession(KEY, 'private', START, 1);
        await old.append(turn('旧问题'));
        database.delete.mockRejectedValue(new Error('模拟删除失败'));
        await resetChatHistory(KEY, START + 1, 2);
        expect(database.store.has(KEY)).toBe(true);
        expect((await openHistorySession(KEY, 'private', START + 2, 3)).items).toEqual([]);
    });

    it('闲时重置同时迎来两条新问题，不相互抹掉，之后关掉闲时开关也不复活旧轮', async () => {
        const old = await openHistorySession(KEY, 'supergroup', START, 1);
        await old.append(turn('旧问题'));
        const time = START + 1900_000;
        const [first, second] = await Promise.all([
            openHistorySession(KEY, 'supergroup', time, 2),
            openHistorySession(KEY, 'supergroup', time, 3),
        ]);
        expect(first.items).toEqual([]);
        expect(second.items).toEqual([]);
        await Promise.all([second.append(turn('问题乙')), first.append(turn('问题甲'))]);
        ENV.SESSION_IDLE_TIMEOUT = 0;
        expect((await openHistorySession(KEY, 'supergroup', time + 1)).items).toEqual([...turn('问题甲'), ...turn('问题乙')]);
    });

    it('旧版哨兵缺失时丢弃旧数组，但保留同时开启的新轮', async () => {
        database.store.set(KEY, JSON.stringify(turn('旧版问题')));
        const [first, second] = await Promise.all([
            openHistorySession(KEY, 'supergroup', START, 1),
            openHistorySession(KEY, 'supergroup', START, 2),
        ]);
        expect(first.items).toEqual([]);
        expect(second.items).toEqual([]);
        await Promise.all([first.append(turn('问题甲')), second.append(turn('问题乙'))]);
        expect((await openHistorySession(KEY, 'supergroup', START + 1)).items).toEqual([...turn('问题甲'), ...turn('问题乙')]);
    });

    it('闲时边界也排除仍在途的旧轮，包括漏读标记后的迟到落盘', async () => {
        ENV.SESSION_IDLE_TIMEOUT = 1;
        const old = await openHistorySession(KEY, 'supergroup', START, 1);
        const fresh = await openHistorySession(KEY, 'supergroup', START + 2000, 2);
        await fresh.append(turn('新问题'));
        database.listKeys.mockResolvedValueOnce([]);
        await old.append(turn('旧问题'));
        expect((await openHistorySession(KEY, 'supergroup', START + 2001, 3)).items).toEqual(turn('新问题'));
    });

    it('私聊默认隔天仍保留历史，群聊和成员、论坛话题之间的前缀不串读或串删', async () => {
        for (const key of [KEY, `${KEY}:7`, `${KEY}:9:12`]) {
            const session = await openHistorySession(key, 'private', START, 1);
            await session.append(turn(key));
        }
        expect((await openHistorySession(KEY, 'private', START + 86400_000)).items).toEqual(turn(KEY));
        await resetChatHistory(KEY, START + 86400_001, 2);
        expect((await openHistorySession(`${KEY}:7`, 'private', START + 86400_002)).items).toEqual(turn(`${KEY}:7`));
        expect((await openHistorySession(`${KEY}:9:12`, 'private', START + 86400_002)).items).toEqual(turn(`${KEY}:9:12`));
    });

    it('消息条数和文本长度裁剪仍作用于读出的上下文', async () => {
        for (let i = 0; i < 6; i++) {
            const session = await openHistorySession(KEY, 'private', START + i, i + 1);
            await session.append(turn(`问题${i}`));
        }
        ENV.MAX_HISTORY_LENGTH = 3;
        expect((await openHistorySession(KEY, 'private', START + 10)).items).toEqual([...turn('问题4'), ...turn('问题5')].slice(-3));
        ENV.MAX_TOKEN_LENGTH = '问题5的答复'.length;
        expect((await openHistorySession(KEY, 'private', START + 11)).items).toEqual([turn('问题5')[1]]);
        ENV.AUTO_TRIM_HISTORY = false;
        // 关闭后不再额外裁剪，也不能找回已经按旧配置清理的轮次。
        const history = (await openHistorySession(KEY, 'private', START + 12)).items;
        expect(history).toEqual([3, 4, 5].flatMap(i => turn(`问题${i}`)));
    });

    it('历史读取失败时不使用不完整快照写回，错误不会拦住无历史回答', async () => {
        database.get.mockRejectedValueOnce(new Error('模拟读取失败'));
        const session = await openHistorySession(KEY, 'private', START, 1);
        expect(session.items).toEqual([]);
        await session.append(turn('问题'));
        expect(database.put).not.toHaveBeenCalled();
    });

    it('坏掉的旧版 JSON 不影响新轮保存', async () => {
        database.store.set(KEY, '{');
        const session = await openHistorySession(KEY, 'private', START, 1);
        expect(session.items).toEqual([]);
        await session.append(turn('问题'));
        expect((await openHistorySession(KEY, 'private', START + 1)).items).toEqual(turn('问题'));
    });

    it('workers 原生 KV 支持空分页、游标续读和每批不超过 100 个键的批量 get', async () => {
        ENV.AUTO_TRIM_HISTORY = false;
        const sessions = await Promise.all(Array.from({ length: 205 }, (_, i) => openHistorySession(KEY, 'private', START, i + 1)));
        await Promise.all(sessions.map((session, i) => session.append(turn(`问题${i}`))));
        const get = jest.fn(async (keys: string | string[]) => Array.isArray(keys)
            ? new Map(keys.map(key => [key, database.store.get(key) ?? null]))
            : database.store.get(keys) ?? null);
        const list = jest.fn(async ({ prefix, cursor }: { prefix: string; cursor?: string }) => {
            if (cursor === undefined) {
                return { keys: [], list_complete: false, cursor: '0' };
            }
            const keys = [...database.store.keys()].filter(key => key.startsWith(prefix)).sort();
            const offset = Number(cursor);
            const page = keys.slice(offset, offset + 70).map(name => ({ name }));
            return { keys: page, list_complete: offset + 70 >= keys.length, cursor: String(offset + 70) };
        });
        ENV.DATABASE = { get, list, put: database.put, delete: database.delete } as WorkersKVNamespaceBinding;
        expect((await openHistorySession(KEY, 'private', START + 1)).items).toEqual(sessions.flatMap((_, i) => turn(`问题${i}`)));
        expect(get.mock.calls.map(([keys]) => Array.isArray(keys) ? keys.length : 0).filter(Boolean)).toEqual([100, 100, 5]);
        expect(list.mock.calls.map(([options]) => options)).toEqual([
            { prefix: PREFIX, cursor: undefined },
            { prefix: PREFIX, cursor: '0' },
            { prefix: PREFIX, cursor: '70' },
            { prefix: PREFIX, cursor: '140' },
        ]);
        expect((ENV.DATABASE as KVNamespaceBinding).listKeys).toBeUndefined();
    });
});
