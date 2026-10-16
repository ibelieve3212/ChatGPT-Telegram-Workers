import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import { ENV } from '#/config';
import { WhiteListFilter } from './handlers';

jest.mock('@chatgpt-telegram-workers/plugins', () => ({
    executeRequest: jest.fn(),
    formatInput: jest.fn(),
}), { virtual: true });

// 屏蔽真实 Telegram API: 拦截 sendMessage, 记录参数供断言
const mockSendMessage = jest.fn(async (_params: any) => new Response('{"ok":true}', { status: 200 }));
jest.mock('../api', () => ({
    createTelegramBotAPI: () => ({ sendMessage: mockSendMessage }),
}));

// 构造私聊 update
function privateUpdate(chatID: number): Telegram.Update {
    return {
        update_id: 1,
        message: {
            message_id: 10,
            date: 0,
            chat: { id: chatID, type: 'private', first_name: 'user' },
            from: { id: chatID, is_bot: false, first_name: 'user' },
        },
    } as unknown as Telegram.Update;
}

// 构造群聊 update(supergroup)
function groupUpdate(chatID: number): Telegram.Update {
    return {
        update_id: 1,
        message: {
            message_id: 10,
            date: 0,
            chat: { id: chatID, type: 'supergroup', title: 'group' },
            from: { id: 111, is_bot: false, first_name: 'user' },
        },
    } as unknown as Telegram.Update;
}

// 构造私聊按钮回调 update
function callbackUpdate(chatID: number): Telegram.Update {
    return {
        update_id: 1,
        callback_query: {
            id: 'cbid',
            from: { id: chatID, is_bot: false, first_name: 'user' },
            message: { message_id: 5, date: 0, chat: { id: chatID, type: 'private', first_name: 'user' } },
            chat_instance: 'x',
            data: 'x',
        },
    } as unknown as Telegram.Update;
}

const context = { SHARE_CONTEXT: { botToken: '123:abc' } } as unknown as WorkerContext;
const handler = new WhiteListFilter();

// 每个 case 显式声明权限相关 ENV, 用例间互不残留
beforeEach(() => {
    mockSendMessage.mockClear();
    ENV.I_AM_A_GENEROUS_PERSON = false;
    ENV.CHAT_WHITE_LIST = [];
    ENV.CHAT_GROUP_WHITE_LIST = [];
    ENV.GROUP_CHAT_BOT_ENABLE = true;
});

describe('whiteListFilter private chat', () => {
    it('allows private chat when user id is in CHAT_WHITE_LIST', async () => {
        ENV.CHAT_WHITE_LIST = ['111'];
        expect(await handler.handle(privateUpdate(111), context)).toBeNull();
    });

    it('rejects private chat when user id is not in CHAT_WHITE_LIST', async () => {
        ENV.CHAT_WHITE_LIST = ['222'];
        const result = await handler.handle(privateUpdate(111), context);
        expect(result).toBeInstanceOf(Response);
        // 拒绝文案携带 chat_id, 方便用户自助加白
        const params = mockSendMessage.mock.calls[0][0];
        expect(params.chat_id).toBe(111);
        expect(`${params.text}`).toContain('111');
    });

    it('rejects every private chat when CHAT_WHITE_LIST is empty (generous off)', async () => {
        // 空列表 ≠ 放行所有人: 未配置即全部拒绝
        const result = await handler.handle(privateUpdate(111), context);
        expect(result).toBeInstanceOf(Response);
    });

    it('bypasses the private whitelist when I_AM_A_GENEROUS_PERSON is on', async () => {
        // 大好人模式: 白名单即使配了也不生效, 所有人放行
        ENV.CHAT_WHITE_LIST = ['222'];
        ENV.I_AM_A_GENEROUS_PERSON = true;
        expect(await handler.handle(privateUpdate(111), context)).toBeNull();
    });

    it('rejects callback queries from non-whitelisted private chats', async () => {
        ENV.CHAT_WHITE_LIST = ['222'];
        const result = await handler.handle(callbackUpdate(111), context);
        expect(result).toBeInstanceOf(Response);
    });
});

describe('whiteListFilter group chat', () => {
    it('allows whitelisted supergroup by full -100-prefixed id', async () => {
        ENV.CHAT_GROUP_WHITE_LIST = ['-1001234567890'];
        expect(await handler.handle(groupUpdate(-1001234567890), context)).toBeNull();
    });

    it('rejects non-whitelisted supergroup', async () => {
        ENV.CHAT_GROUP_WHITE_LIST = ['-100111'];
        const result = await handler.handle(groupUpdate(-1001234567890), context);
        expect(result).toBeInstanceOf(Response);
        const params = mockSendMessage.mock.calls[0][0];
        expect(params.chat_id).toBe(-1001234567890);
        expect(`${params.text}`).toContain('-1001234567890');
    });

    it('rejects supergroup when only the bare id (without -100 prefix) is whitelisted', async () => {
        // 常见踩坑: 把去掉 -100 前缀的裸 id 加白, 匹配不上 → 依旧拒绝
        ENV.CHAT_GROUP_WHITE_LIST = ['1234567890'];
        expect(await handler.handle(groupUpdate(-1001234567890), context)).toBeInstanceOf(Response);
    });

    it('rejects every group when CHAT_GROUP_WHITE_LIST is empty (generous off)', async () => {
        const result = await handler.handle(groupUpdate(-1001234567890), context);
        expect(result).toBeInstanceOf(Response);
    });

    it('silently ignores all groups when GROUP_CHAT_BOT_ENABLE is off', async () => {
        ENV.CHAT_GROUP_WHITE_LIST = ['-1001234567890'];
        ENV.GROUP_CHAT_BOT_ENABLE = false;
        expect(await handler.handle(groupUpdate(-1001234567890), context)).toBeNull();
        expect(mockSendMessage).not.toHaveBeenCalled();
    });

    it('bypasses the group whitelist when I_AM_A_GENEROUS_PERSON is on', async () => {
        ENV.I_AM_A_GENEROUS_PERSON = true;
        expect(await handler.handle(groupUpdate(-1001234567890), context)).toBeNull();
    });
});
