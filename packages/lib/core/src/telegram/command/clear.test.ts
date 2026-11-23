import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import { openHistorySession } from '#/agent/history';
import { ENV } from '#/config';
import { ClearCommandHandler } from './system';

// /clear 的删除路径必须"能真删掉, 且失败不销毁记录":
// - 优先 deleteMessages 批量删(记录多时逐条删必撞 429);
// - 批量接口不可用/失败 → 逐条回退;
// - 只有确认消失的 id 才从 KV 移除, 失败的要留着下次重试(以前失败也整组写回, 记录直接丢光);
// - 不同存储后端把 id 读成字符串时也能删(归一化成数字)。

const mockSendMessage = jest.fn(async (params: any) => jsonResponse({
    ok: true,
    result: { message_id: 900, text: params?.text ?? '' },
}));
const mockDeleteMessage = jest.fn();
const mockDeleteMessages = jest.fn();

jest.mock('../api', () => ({
    createTelegramBotAPI: () => ({
        sendMessage: mockSendMessage,
        deleteMessage: mockDeleteMessage,
        deleteMessages: mockDeleteMessages,
    }),
}));

function jsonResponse(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
}

const okDelete = () => jsonResponse({ ok: true, result: true });
const failDelete = (description: string, status = 400) => jsonResponse({ ok: false, description }, status);

interface FakeKV {
    get: jest.Mock;
    put: jest.Mock;
    delete: jest.Mock;
    listKeys: jest.Mock;
    store: Map<string, string>;
}

// 按 key 存: /clear 会同时写 bot_reply_group:* 和删 history:*, 共用一格会互相踩
function installKV(initial: string | null): FakeKV {
    const store = new Map<string, string>();
    const kv: FakeKV = {
        store,
        get: jest.fn(async (key: string) => store.get(key) ?? null),
        put: jest.fn(async (key: string, value: string) => {
            store.set(key, value);
        }),
        delete: jest.fn(async (key: string) => {
            store.delete(key);
        }),
        listKeys: jest.fn(async (prefix: string) => [...store.keys()].filter(key => key.startsWith(prefix))),
    };
    if (initial !== null) {
        store.set('bot_reply_group:history:-100:42:7', initial);
    }
    (ENV as any).DATABASE = kv;
    return kv;
}

function storedGroups(kv: FakeKV): unknown {
    const raw = kv.store.get('bot_reply_group:history:-100:42:7');
    return raw === undefined ? null : JSON.parse(raw);
}

function createContext(): WorkerContext {
    return {
        USER_CONFIG: {},
        SHARE_CONTEXT: {
            botToken: '42:token',
            botId: 42,
            chatHistoryKey: 'history:-100:42:7',
            chatType: 'supergroup',
        },
    } as unknown as WorkerContext;
}

function commandMessage(messageId: number, text: string, replyToId?: number): Telegram.Message {
    return {
        message_id: messageId,
        date: 0,
        text,
        chat: { id: -100, type: 'supergroup', title: 'g' },
        from: { id: 7, is_bot: false, first_name: 'admin' },
        reply_to_message: replyToId
            ? { message_id: replyToId, date: 0, chat: { id: -100, type: 'supergroup' }, from: { id: 42, is_bot: true, first_name: 'bot' } }
            : undefined,
    } as unknown as Telegram.Message;
}

const historyKey = 'history:-100:42:7';

describe('clear 命令', () => {
    beforeEach(() => {
        ENV.ADMIN_USER_IDS = ['7'];
        ENV.CLEAR_ALSO_RESETS_HISTORY = true;
        ENV.AUTO_TRIM_HISTORY = true;
        ENV.MAX_HISTORY_LENGTH = 20;
        ENV.MAX_TOKEN_LENGTH = -1;
        ENV.SESSION_IDLE_TIMEOUT = 1800;
        mockSendMessage.mockClear();
        mockDeleteMessage.mockReset().mockImplementation(async () => okDelete());
        mockDeleteMessages.mockReset().mockImplementation(async () => okDelete());
    });

    it('/clear all 走批量删除, 成功后清空记录与历史', async () => {
        const kv = installKV(JSON.stringify([[101, 102], [103]]));
        const handler = new ClearCommandHandler();

        const resp = await handler.handle(commandMessage(500, '/clear all'), 'all', createContext());

        expect(resp.status).toBe(200);
        expect(mockDeleteMessages).toHaveBeenCalledTimes(1);
        expect(mockDeleteMessages.mock.calls[0][0]).toEqual({ chat_id: -100, message_ids: [101, 102, 103] });
        // 命令消息自身也要删(批量删里不含它)
        expect(mockDeleteMessage).toHaveBeenCalledWith({ chat_id: -100, message_id: 500 });
        expect(storedGroups(kv)).toEqual([]);
        expect(kv.delete).toHaveBeenCalledWith(historyKey);
        // 成功路径不发任何消息
        expect(mockSendMessage).not.toHaveBeenCalled();
    });

    it('批量接口不可用时逐条回退, 仍然删干净', async () => {
        const kv = installKV(JSON.stringify([[101, 102]]));
        mockDeleteMessages.mockImplementation(async () => failDelete('Bad Request: method not found', 404));
        const handler = new ClearCommandHandler();

        await handler.handle(commandMessage(500, '/clear all'), 'all', createContext());

        expect(mockDeleteMessage).toHaveBeenCalledWith({ chat_id: -100, message_id: 101 });
        expect(mockDeleteMessage).toHaveBeenCalledWith({ chat_id: -100, message_id: 102 });
        expect(storedGroups(kv)).toEqual([]);
    });

    it('全部删除失败时保留记录, 不销毁 KV(可供下次重试)', async () => {
        const kv = installKV(JSON.stringify([[101, 102]]));
        mockDeleteMessages.mockImplementation(async () => failDelete('Bad Request: not enough rights to delete a message', 400));
        mockDeleteMessage.mockImplementation(async () => failDelete('Bad Request: not enough rights to delete a message', 400));
        const handler = new ClearCommandHandler();

        await handler.handle(commandMessage(500, '/clear all'), 'all', createContext());

        // 记录原样保留
        expect(storedGroups(kv)).toEqual([[101, 102]]);
    });

    it('消息不存在/不可删除视为已清理, 从记录中移除', async () => {
        const kv = installKV(JSON.stringify([[101], [102]]));
        mockDeleteMessages.mockImplementation(async () => failDelete('Bad Request: message to delete not found', 400));
        mockDeleteMessage.mockImplementation(async (params: { message_id: number }) => params.message_id === 101
            ? failDelete('Bad Request: message to delete not found', 400)
            : failDelete('Bad Request: message can\'t be deleted', 400));
        const handler = new ClearCommandHandler();

        await handler.handle(commandMessage(500, '/clear all'), 'all', createContext());

        expect(storedGroups(kv)).toEqual([]);
    });

    it('存储把 id 读成字符串时归一化成数字再删', async () => {
        const kv = installKV(JSON.stringify([['101', '102']]));
        const handler = new ClearCommandHandler();

        await handler.handle(commandMessage(500, '/clear all'), 'all', createContext());

        expect(mockDeleteMessages.mock.calls[0][0].message_ids).toEqual([101, 102]);
        expect(storedGroups(kv)).toEqual([]);
    });

    it('回复某条 bot 消息只删这一组, 其余保留', async () => {
        const kv = installKV(JSON.stringify([[101, 102], [103]]));
        const handler = new ClearCommandHandler();

        await handler.handle(commandMessage(500, '/clear', 102), '', createContext());

        expect(mockDeleteMessages.mock.calls[0][0].message_ids).toEqual([101, 102]);
        expect(storedGroups(kv)).toEqual([[103]]);
    });

    it('/clear N 只删最近 N 条, 失败的留在记录里', async () => {
        const kv = installKV(JSON.stringify([[101, 102, 103]]));
        mockDeleteMessages.mockImplementation(async () => failDelete('Bad Request: not enough rights', 400));
        mockDeleteMessage.mockImplementation(async (params: { message_id: number }) => params.message_id === 103
            ? okDelete()
            : failDelete('Bad Request: not enough rights', 400));
        const handler = new ClearCommandHandler();

        await handler.handle(commandMessage(500, '/clear 1'), '1', createContext());

        expect(mockDeleteMessages.mock.calls[0][0].message_ids).toEqual([103]);
        expect(storedGroups(kv)).toEqual([[101, 102]]);
    });

    it('联动开启时，先建立重置边界再删屏幕消息，迟到旧轮不恢复历史', async () => {
        installKV(JSON.stringify([[101, 102]]));
        const start = Date.now();
        const context = createContext();
        context.requestStartedAt = start;
        const old = await openHistorySession(historyKey, 'supergroup', start - 1, 499);
        mockDeleteMessages.mockImplementation(async () => {
            await old.append([
                { role: 'user', content: '旧问题' },
                { role: 'assistant', content: '旧答案' },
            ]);
            const next = await openHistorySession(historyKey, 'supergroup', start + 1, 501);
            expect(next.items).toEqual([]);
            await next.append([
                { role: 'user', content: '新问题' },
                { role: 'assistant', content: '新答案' },
            ]);
            return okDelete();
        });
        await new ClearCommandHandler().handle(commandMessage(500, '/clear all'), 'all', context);
        expect((await openHistorySession(historyKey, 'supergroup', start + 2, 502)).items).toEqual([
            { role: 'user', content: '新问题' },
            { role: 'assistant', content: '新答案' },
        ]);
        expect(mockSendMessage).not.toHaveBeenCalled();
    });

    it('没有屏幕索引时 /clear all 仍重置历史，成功保持静默', async () => {
        const kv = installKV(null);
        kv.store.set(historyKey, JSON.stringify([{ role: 'user', content: '旧问题' }]));
        await new ClearCommandHandler().handle(commandMessage(500, '/clear all'), 'all', createContext());
        expect(kv.store.has(historyKey)).toBe(false);
        expect(await kv.listKeys(`chat-turns:${historyKey}/reset/`)).toHaveLength(1);
        expect(mockDeleteMessages).not.toHaveBeenCalled();
        expect(mockDeleteMessage).toHaveBeenCalledWith({ chat_id: -100, message_id: 500 });
        expect(mockSendMessage).not.toHaveBeenCalled();
    });

    it('联动关闭时只清屏，不阻止在途问答保存', async () => {
        const kv = installKV(JSON.stringify([[101]]));
        ENV.CLEAR_ALSO_RESETS_HISTORY = false;
        const start = Date.now();
        const session = await openHistorySession(historyKey, 'supergroup', start, 499);
        await new ClearCommandHandler().handle(commandMessage(500, '/clear all'), 'all', createContext());
        const items = [{ role: 'user' as const, content: '问题' }, { role: 'assistant' as const, content: '答案' }];
        await session.append(items);
        expect(await kv.listKeys(`chat-turns:${historyKey}/reset/`)).toEqual([]);
        expect((await openHistorySession(historyKey, 'supergroup', start + 1, 501)).items).toEqual(items);
        expect(mockSendMessage).not.toHaveBeenCalled();
    });

    it('参数无效时不重置历史', async () => {
        const kv = installKV(JSON.stringify([[101]]));
        await new ClearCommandHandler().handle(commandMessage(500, '/clear nope'), 'nope', createContext());
        expect(await kv.listKeys(`chat-turns:${historyKey}/reset/`)).toEqual([]);
        expect(mockDeleteMessages).not.toHaveBeenCalled();
        expect(mockSendMessage.mock.calls[0][0].text).toContain('Usage: /clear');
    });

    it('超过 100 条时分批删除', async () => {
        const ids = Array.from({ length: 250 }, (_, i) => 1000 + i);
        installKV(JSON.stringify([ids]));
        const handler = new ClearCommandHandler();

        await handler.handle(commandMessage(500, '/clear all'), 'all', createContext());

        expect(mockDeleteMessages).toHaveBeenCalledTimes(3);
        expect(mockDeleteMessages.mock.calls.map(c => c[0].message_ids.length)).toEqual([100, 100, 50]);
    });
});
