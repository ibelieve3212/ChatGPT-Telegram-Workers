import type { WorkerContext } from '#/config';
import { ENV } from '#/config';
import { listBotReplyGroups, removeBotReplyMessages, saveBotReplyGroup } from './replyGroup';

const context = (key = 'history:111:42') => ({ SHARE_CONTEXT: { chatHistoryKey: key } }) as WorkerContext;
let store: Map<string, string>;

beforeEach(() => {
    store = new Map();
    ENV.DATABASE = {
        get: async key => store.get(key) ?? null,
        put: async (key, value) => { store.set(key, value); },
        delete: async (key) => { store.delete(key); },
        listKeys: async prefix => [...store.keys()].filter(key => key.startsWith(prefix)),
    };
});

it('倒序完成的并发回复各存一组，不争写同一快照', async () => {
    await Promise.all(Array.from({ length: 12 }, (_, i) => saveBotReplyGroup(context(), [112 - i])));
    expect(await listBotReplyGroups(context())).toEqual(Array.from({ length: 12 }, (_, i) => [101 + i]));
});

it('迟到的单条登记不能覆盖同最小 ID 的整组，重复登记幂等', async () => {
    await saveBotReplyGroup(context(), [101, 102, 103]);
    await saveBotReplyGroup(context(), [101]);
    await saveBotReplyGroup(context(), [103, 102, 101]);
    expect(await listBotReplyGroups(context())).toEqual([[101, 102, 103]]);
    expect([...store.keys()].filter(key => key.includes('/group/'))).toHaveLength(2);
});

it('清屏期间并发新增的回复保留，迟到保存的已删 ID 被标记过滤', async () => {
    await saveBotReplyGroup(context(), [101, 102]);
    await Promise.all([
        removeBotReplyMessages(context(), [101, 102]),
        saveBotReplyGroup(context(), [103, 104]),
    ]);
    await saveBotReplyGroup(context(), [101, 102, 105]);
    expect(await listBotReplyGroups(context())).toEqual([[103, 104], [105]]);
});

it('两个清屏交错完成仍合并删除结果，不续写旧数组 TTL', async () => {
    const legacy = JSON.stringify([[101, 102], [102, 103], ['104', 104], [0, -1, '坏值']]);
    store.set('bot_reply_group:history:111:42', legacy);
    await Promise.all([
        removeBotReplyMessages(context(), [101, 102]),
        removeBotReplyMessages(context(), [103]),
    ]);
    expect(await listBotReplyGroups(context())).toEqual([[104]]);
    expect(store.get('bot_reply_group:history:111:42')).toBe(legacy);
});

it('会话、群成员和话题前缀互不混入', async () => {
    await saveBotReplyGroup(context(), [101]);
    await saveBotReplyGroup(context('history:111:42:7'), [201]);
    expect(await listBotReplyGroups(context())).toEqual([[101]]);
    expect(await listBotReplyGroups(context('history:111:42:7'))).toEqual([[201]]);
});
