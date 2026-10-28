import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import { ENV } from '#/config';
import { extractUserMessage } from './index';
import {
    CHAT_CAPACITY,
    clearReplyThreadCacheForTest,
    collectReplyThread,
    recordChatMessage,
} from './reply-thread';

// 验证讨论串(回复链)抓取: 用户引用一条消息向 bot 提问时, 把那条消息之上的
// 整条"谁回复谁"链(用户讨论 + 最原始的消息)按时间顺序拼入提问。
// Bot API 的 reply_to_message 只带直接被引用的一条, 链上其余消息靠本地缓存回溯。

const mockGetFile = jest.fn(async (params: any) => ({
    result: { file_path: `photos/${params.file_id}.jpg` },
}));

jest.mock('../api', () => ({
    createTelegramBotAPI: () => ({
        getFileWithReturns: mockGetFile,
    }),
}));

function createContext(): WorkerContext {
    return {
        USER_CONFIG: {},
        SHARE_CONTEXT: { botToken: '42:token', botId: 42, chatHistoryKey: 'history:111:42', chatType: 'private' },
        requestStartedAt: Date.now(),
    } as unknown as WorkerContext;
}

function textMessage(messageId: number, fromId: number, fromName: string, text: string, replyTo?: Telegram.Message): Telegram.Message {
    return {
        message_id: messageId,
        date: 1000 + messageId,
        chat: { id: 111, type: 'private', first_name: 'u' },
        from: { id: fromId, is_bot: false, first_name: fromName },
        text,
        ...(replyTo ? { reply_to_message: replyTo } : {}),
    } as unknown as Telegram.Message;
}

function photoMessage(messageId: number, fromId: number, fromName: string, fileId: string, replyTo?: Telegram.Message): Telegram.Message {
    return {
        message_id: messageId,
        date: 1000 + messageId,
        chat: { id: 111, type: 'private', first_name: 'u' },
        from: { id: fromId, is_bot: false, first_name: fromName },
        photo: [{ file_id: fileId, file_unique_id: `u-${fileId}`, width: 320, height: 240 }],
        ...(replyTo ? { reply_to_message: replyTo } : {}),
    } as unknown as Telegram.Message;
}

// 用户提问消息: 引用 referenced
function questionMessage(messageId: number, referenced: Telegram.Message): Telegram.Message {
    return {
        message_id: messageId,
        date: 2000,
        chat: { id: 111, type: 'private', first_name: 'u' },
        from: { id: 111, is_bot: false, first_name: 'me' },
        text: '总结一下他们聊了什么',
        reply_to_message: referenced,
    } as unknown as Telegram.Message;
}

beforeEach(() => {
    clearReplyThreadCacheForTest();
    mockGetFile.mockClear();
    ENV.EXTRA_MESSAGE_CONTEXT = false;
    ENV.EXTRA_MESSAGE_MEDIA_COMPATIBLE = ['image'];
    ENV.REPLY_THREAD_CONTEXT = true;
    ENV.TELEGRAM_API_DOMAIN = 'https://api.telegram.org';
});

describe('collectReplyThread 链回溯', () => {
    it('沿嵌套 reply_to_message 收集整条链并按时间升序', () => {
        const m1 = textMessage(1, 10, '张三', '原始消息');
        const m2 = textMessage(2, 20, '李四', '回复张三', m1);
        const m3 = textMessage(3, 30, '王五', '回复李四', m2);
        const thread = collectReplyThread(m3);
        expect(thread.map(m => m.message_id)).toEqual([1, 2, 3]);
    });

    it('嵌套断了之后沿本地缓存指针继续回溯', () => {
        // 张三→李四→王五, 但王五的 reply_to_message 只带李四一层(嵌套里没有张三)
        const m1 = textMessage(1, 10, '张三', '原始消息');
        const m2 = textMessage(2, 20, '李四', '回复张三', m1);
        const m3 = textMessage(3, 30, '王五', '回复李四', m2);
        recordChatMessage(m1);
        recordChatMessage(m2);
        recordChatMessage(m3);
        // 模拟 Telegram 只嵌套一层: 王五的 reply_to_message 只有李四, 李四不带张三
        const m3Shallow = { ...m3, reply_to_message: { ...m2, reply_to_message: undefined } } as Telegram.Message;
        const thread = collectReplyThread(m3Shallow);
        expect(thread.map(m => m.message_id)).toEqual([1, 2, 3]);
    });

    it('不同 chat 的同 id 消息不会错拼进链', () => {
        const otherChat = {
            message_id: 1,
            date: 900,
            chat: { id: 999, type: 'private', first_name: 'x' },
            from: { id: 10, is_bot: false, first_name: '张三' },
            text: '另一个 chat 的消息',
        } as unknown as Telegram.Message;
        recordChatMessage(otherChat);
        const m2 = textMessage(2, 20, '李四', '回复张三');
        recordChatMessage(m2);
        // m2 引用的 message_id=1 在本 chat 缓存里不存在, 不应把 otherChat 错拼进来
        const thread = collectReplyThread(m2);
        expect(thread.map(m => m.message_id)).toEqual([2]);
    });

    it('缓存容量超限时按先进先出淘汰, 被淘汰的链上上游断链', async () => {
        const m1 = textMessage(1, 10, '张三', '原始消息');
        const m2 = textMessage(2, 20, '李四', '回复张三', m1);
        const m3 = textMessage(3, 30, '王五', '回复李四', m2);
        recordChatMessage(m1);
        recordChatMessage(m2);
        recordChatMessage(m3);
        // 灌满容量把 id=1(原始消息)挤出缓存
        for (let i = 0; i < CHAT_CAPACITY; i++) {
            recordChatMessage(textMessage(100 + i, 10, '张三', `刷屏消息${i}`));
        }
        // 模拟 Telegram 只嵌套一层: 王五的 reply_to_message 只有李四(浅层, 不带张三),
        // 张三只能靠缓存回溯——但已被淘汰, 链到李四为止
        const m3Shallow = { ...m3, reply_to_message: { ...m2, reply_to_message: undefined } } as Telegram.Message;
        const thread = collectReplyThread(m3Shallow);
        expect(thread.map(m => m.message_id)).toEqual([2, 3]);
    });
});

function textOf(params: any): string {
    return typeof params.content === 'string'
        ? params.content
        : params.content.find((item: any) => item.type === 'text').text;
}

describe('extractUserMessage 讨论串拼入提问', () => {
    it('链上多条用户讨论按时间拼入, 图片也附带', async () => {
        const m1 = photoMessage(1, 10, '张三', 'file_1');
        const m2 = textMessage(2, 20, '李四', '这图里的屏幕坏点很明显', m1);
        const m3 = textMessage(3, 30, '王五', '我觉得是排线问题', m2);
        recordChatMessage(m1);
        recordChatMessage(m2);
        recordChatMessage(m3);
        const question = questionMessage(10, m3);
        const { params } = await extractUserMessage(question, createContext());

        const textPart = textOf(params);
        expect(textPart).toContain('[引用讨论串, 按时间从早到晚]');
        expect(textPart).toContain('张三: [图片]');
        expect(textPart).toContain('李四: 这图里的屏幕坏点很明显');
        expect(textPart).toContain('王五: 我觉得是排线问题');
        // 链上图片也带上了
        const images = (params.content as any[]).filter(item => item.type === 'image');
        expect(images.length).toBe(1);
    });

    it('bot 自己的消息被跳过(已在会话历史里)', async () => {
        const m1 = textMessage(1, 10, '张三', '原始消息');
        const botReply = textMessage(2, 42, 'bot', 'bot 的回答', m1);
        const m3 = textMessage(3, 30, '王五', '接着 bot 的话继续问', botReply);
        recordChatMessage(m1);
        recordChatMessage(botReply);
        recordChatMessage(m3);
        const question = questionMessage(10, m3);
        const { params } = await extractUserMessage(question, createContext());

        const textPart = textOf(params);
        expect(textPart).toContain('张三: 原始消息');
        expect(textPart).toContain('王五: 接着 bot 的话继续问');
        expect(textPart).not.toContain('bot 的回答');
    });

    it('引用 bot 的消息但上游有用户讨论时, 讨论仍然拼入', async () => {
        // 张三原始消息 → 李四回复 → bot 回答(被引用) : 上游有两条用户讨论
        const m1 = textMessage(1, 10, '张三', '原始消息');
        const m2 = textMessage(2, 20, '李四', '回复张三', m1);
        const botReply = textMessage(3, 42, 'bot', 'bot 的回答', m2);
        recordChatMessage(m1);
        recordChatMessage(m2);
        recordChatMessage(botReply);
        // 用户引用的是 bot 的回复(bot 的回答本身已在会话历史里, 不重复拼入)
        const question = questionMessage(10, botReply);
        const { params } = await extractUserMessage(question, createContext());

        const textPart = textOf(params);
        expect(textPart).toContain('张三: 原始消息');
        expect(textPart).toContain('李四: 回复张三');
        expect(textPart).not.toContain('bot 的回答');
    });

    it('链上只有一条(无讨论)时保持原有行为: EXTRA_MESSAGE_CONTEXT 关闭则不带', async () => {
        const m1 = textMessage(1, 10, '张三', '一条普通消息');
        const question = questionMessage(10, m1);
        const { params } = await extractUserMessage(question, createContext());

        expect(typeof params.content).toBe('string');
        expect(params.content).not.toContain('张三');
        expect(params.content).not.toContain('一条普通消息');
    });

    it('讨论串开关(REPLY_THREAD_CONTEXT)关闭后不拼讨论串', async () => {
        ENV.REPLY_THREAD_CONTEXT = false;
        const m1 = textMessage(1, 10, '张三', '原始消息');
        const m2 = textMessage(2, 20, '李四', '回复张三', m1);
        recordChatMessage(m1);
        recordChatMessage(m2);
        const question = questionMessage(10, m2);
        const { params } = await extractUserMessage(question, createContext());

        expect(params.content).not.toContain('引用讨论串');
    });

    it('链上图片超过上限时只带前几张, 其余用占位符', async () => {
        const m1 = photoMessage(1, 10, '张三', 'file_1');
        const m2 = photoMessage(2, 20, '李四', 'file_2', m1);
        const m3 = photoMessage(3, 30, '王五', 'file_3', m2);
        const m4 = photoMessage(4, 40, '赵六', 'file_4', m3);
        const m5 = photoMessage(5, 50, '钱七', 'file_5', m4);
        const m6 = photoMessage(6, 60, '孙八', 'file_6', m5);
        for (const m of [m1, m2, m3, m4, m5, m6]) {
            recordChatMessage(m);
        }
        const question = questionMessage(10, m6);
        const { params } = await extractUserMessage(question, createContext());

        const images = (params.content as any[]).filter(item => item.type === 'image');
        expect(images.length).toBe(4);
        expect(textOf(params)).toContain('[图片]');
    });
});
