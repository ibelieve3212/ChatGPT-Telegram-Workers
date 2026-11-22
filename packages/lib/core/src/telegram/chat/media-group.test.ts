import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import { ENV } from '#/config';
import { GroupMention } from '../handler/group';
import { ChatHandler, CommandHandler } from '../handler/handlers';
import { extractUserMessage } from './index';
import {
    clearMediaGroupCachesForTest,
    collectMediaGroup,
    getMediaGroupImageFileIds,
    MEDIA_GROUP_IMAGE_CACHE_MAX,
    recordMediaGroupImages,
} from './media-group';
import { clearReplyThreadCacheForTest, recordChatMessage } from './reply-thread';

// 验证相册(一条消息带多张图)的两类补齐:
// 1. 直接发送相册: Telegram 拆成多条消息送达, 应收齐整组后只触发一次回复, 模型一次看到全部图片;
// 2. 引用相册中某张图: 客户端只能选中一张, 应从相册缓存把整组图片补给模型。

const mockSendMessage = jest.fn(async (params: any) => new Response(JSON.stringify({
    ok: true,
    result: { message_id: 1, text: params?.text || '' },
}), { status: 200, headers: { 'content-type': 'application/json' } }));

const mockEditMessageText = jest.fn(async (params: any) => new Response(JSON.stringify({
    ok: true,
    result: { message_id: 1, text: params?.text || '' },
}), { status: 200, headers: { 'content-type': 'application/json' } }));

const mockGetFile = jest.fn(async (params: any) => ({
    result: { file_path: `photos/${params.file_id}.jpg` },
}));

jest.mock('@chatgpt-telegram-workers/plugins', () => ({
    executeRequest: jest.fn(),
    formatInput: jest.fn(),
    interpolate: jest.fn(),
}));

jest.mock('../api', () => ({
    createTelegramBotAPI: () => ({
        sendMessage: mockSendMessage,
        editMessageText: mockEditMessageText,
        deleteMessage: jest.fn(async () => new Response('{}', { status: 200 })),
        sendChatAction: jest.fn(async () => new Response('{}', { status: 200 })),
        getFileWithReturns: mockGetFile,
        sendRichMessage: jest.fn(async () => new Response('{}', { status: 404 })),
    }),
}));

function createMockDatabase() {
    const store = new Map<string, string>();
    return {
        get: async (k: string): Promise<string | null> => store.get(k) ?? null,
        put: async (k: string, v: string): Promise<void> => { store.set(k, v); },
        delete: async (k: string): Promise<void> => { store.delete(k); },
        _store: store,
    };
}

function createContext(): WorkerContext {
    return {
        USER_CONFIG: {
            SYSTEM_INIT_MESSAGE: 'system',
            AI_PROVIDER: 'openai',
            OPENAI_API_BASE: 'https://llm.example.com/v1',
            OPENAI_API_KEY: ['sk-test'],
            OPENAI_CHAT_MODEL: 'gpt-test',
        },
        SHARE_CONTEXT: { botToken: '42:token', botId: 42, chatHistoryKey: 'history:111:42', chatType: 'private' },
        requestStartedAt: Date.now(),
    } as unknown as WorkerContext;
}

// 捕获实际发送的请求体，验证图片和文字的范围。
const llmBodies: any[] = [];
const defaultExtraMessageContext = ENV.EXTRA_MESSAGE_CONTEXT;

beforeEach(() => {
    clearMediaGroupCachesForTest();
    mockSendMessage.mockClear();
    mockEditMessageText.mockClear();
    mockGetFile.mockClear();
    llmBodies.length = 0;
    (ENV as any).DATABASE = createMockDatabase();
    ENV.EXTRA_MESSAGE_CONTEXT = defaultExtraMessageContext;
    ENV.EXTRA_MESSAGE_MEDIA_COMPATIBLE = ['image'];
    ENV.TELEGRAM_API_DOMAIN = 'https://api.telegram.org';
    ENV.TELEGRAM_IMAGE_TRANSFER_MODE = 'base64';
    ENV.TELEGRAM_PHOTO_SIZE_OFFSET = -1;
    ENV.STREAM_MODE = false;
    ENV.DEBUG_MODE = false;
    ENV.DEFAULT_PARSE_MODE = 'HTML';
    ENV.AUTO_TRIM_HISTORY = true;
    ENV.MAX_HISTORY_LENGTH = 20;
    ENV.MAX_TOKEN_LENGTH = -1;
    ENV.SESSION_IDLE_TIMEOUT = 1800;
    ENV.SESSION_IDLE_TIMEOUT_PRIVATE = 0;
    ENV.HISTORY_IMAGE_PLACEHOLDER = null;

    globalThis.fetch = jest.fn(async (input: any, init?: any) => {
        const url = String(typeof input === 'string' ? input : input.url);
        if (url.includes('llm.example.com')) {
            if (init?.body) {
                try {
                    llmBodies.push(JSON.parse(init.body));
                } catch {
                    // 忽略非 JSON 请求体
                }
            }
            return new Response(JSON.stringify({
                choices: [{ message: { content: '模型回答' }, finish_reason: 'stop' }],
            }), { status: 200, headers: { 'content-type': 'application/json' } });
        }
        return new Response(new Uint8Array([0xFF, 0xD8, 0xFF, 0xE0]), { headers: { 'content-type': 'image/jpeg' } });
    }) as any;
});

function albumPhotoMessage(messageId: number, fileId: string, mediaGroupId: string, caption?: string): Telegram.Message {
    return {
        message_id: messageId,
        date: 123,
        media_group_id: mediaGroupId,
        chat: { id: 111, type: 'private', first_name: 'u' },
        from: { id: 111, is_bot: false, first_name: 'u' },
        ...(caption ? { caption } : {}),
        photo: [{ file_id: fileId, file_unique_id: `u-${fileId}`, width: 320, height: 240 }],
    } as unknown as Telegram.Message;
}

function quoteAlbumMessage(replyFileId: string, mediaGroupId: string | null): Telegram.Message {
    return {
        message_id: 10,
        date: 123,
        text: '看看这些图',
        chat: { id: 111, type: 'private', first_name: 'u' },
        from: { id: 111, is_bot: false, first_name: 'u' },
        reply_to_message: {
            message_id: 2,
            date: 120,
            chat: { id: 111, type: 'private' },
            from: { id: 111, is_bot: false, first_name: 'u' },
            photo: [{ file_id: replyFileId, file_unique_id: 'ru', width: 320, height: 240 }],
            ...(mediaGroupId ? { media_group_id: mediaGroupId } : {}),
        },
    } as unknown as Telegram.Message;
}

function imageParts(params: any): any[] {
    return Array.isArray(params.content) ? params.content.filter((item: any) => item.type === 'image') : [];
}

describe('相册收集(collectMediaGroup)', () => {
    it('同组多条消息在静默期后拿到同一份升序数组', async () => {
        const m1 = albumPhotoMessage(2, 'file_2', 'g1');
        const m2 = albumPhotoMessage(1, 'file_1', 'g1');
        const p1 = collectMediaGroup(m1, 20);
        const p2 = collectMediaGroup(m2, 20);
        const [g1, g2] = await Promise.all([p1, p2]);
        expect(g1).toBe(g2);
        expect(g1.map(m => m.message_id)).toEqual([1, 2]);
    });

    it('重复送达的同一条消息按 message_id 去重', async () => {
        const m1 = albumPhotoMessage(1, 'file_1', 'g2');
        const p1 = collectMediaGroup(m1, 20);
        const p2 = collectMediaGroup(m1, 20);
        const [g1, g2] = await Promise.all([p1, p2]);
        expect(g1.length).toBe(1);
        expect(g2.length).toBe(1);
    });
});

describe('相册缓存(recordMediaGroupImages / getMediaGroupImageFileIds)', () => {
    it('逐条补齐并去重', () => {
        recordMediaGroupImages('g3', ['f1']);
        recordMediaGroupImages('g3', ['f2', 'f1']);
        expect(getMediaGroupImageFileIds('g3')).toEqual(['f1', 'f2']);
    });

    it('未命中返回 null', () => {
        expect(getMediaGroupImageFileIds('missing')).toBeNull();
    });

    it('超出容量上限时淘汰最旧条目', () => {
        for (let i = 0; i < MEDIA_GROUP_IMAGE_CACHE_MAX + 5; i++) {
            recordMediaGroupImages(`evict-${i}`, [`f${i}`]);
        }
        expect(getMediaGroupImageFileIds('evict-0')).toBeNull();
        expect(getMediaGroupImageFileIds(`evict-${MEDIA_GROUP_IMAGE_CACHE_MAX + 4}`)).toEqual([`f${MEDIA_GROUP_IMAGE_CACHE_MAX + 4}`]);
    });
});

describe('直接发送相册: 整组图片合并进同一次请求', () => {
    it('extractUserMessage 把整组图片与 caption 合并', async () => {
        const m1 = albumPhotoMessage(1, 'file_1', 'g4', '看看这几张图');
        const m2 = albumPhotoMessage(2, 'file_2', 'g4');
        const m3 = albumPhotoMessage(3, 'file_3', 'g4');
        const { params } = await extractUserMessage(m1, createContext(), [m1, m2, m3]);

        const textPart = (params.content as any[]).find(item => item.type === 'text');
        expect(textPart.text).toContain('看看这几张图');
        expect(imageParts(params).length).toBe(3);
        // 同时记入相册缓存, 供之后引用时补齐
        expect(getMediaGroupImageFileIds('g4')).toEqual(['file_1', 'file_2', 'file_3']);
    });

    it('代表消息没有文字时, 从组内其它消息取 caption', async () => {
        const m1 = albumPhotoMessage(1, 'file_1', 'g5');
        const m2 = albumPhotoMessage(2, 'file_2', 'g5', '组内第二条的文字');
        const { params } = await extractUserMessage(m1, createContext(), [m1, m2]);
        const textPart = (params.content as any[]).find(item => item.type === 'text');
        expect(textPart.text).toContain('组内第二条的文字');
    });

    it('相册只触发一次 LLM 请求(ChatHandler), 模型一次看到全部图片', async () => {
        const context = createContext();
        const m1 = albumPhotoMessage(1, 'file_1', 'g6', '相册提问');
        const m2 = albumPhotoMessage(2, 'file_2', 'g6');
        const handler = new ChatHandler();
        // 模拟轮询端 setImmediate 并发分发两条 update
        const [resp1, resp2] = await Promise.all([
            handler.handle(m1, context),
            handler.handle(m2, context),
        ]);

        // 只有代表消息(第一条)触发回复, 其余消息直接结束
        expect(resp2).toBeNull();
        expect(resp1).not.toBeNull();
        // 只有一次 LLM 请求, 且带上了整组两张图(OpenAI 视觉格式为 image_url)
        expect(llmBodies.length).toBe(1);
        const lastMessage = llmBodies[0].messages[llmBodies[0].messages.length - 1];
        const images = lastMessage.content.filter((item: any) => item.type === 'image_url' || item.type === 'image');
        expect(images.length).toBe(2);
    }, 30000);
});

describe('引用相册: 整组图片补给模型', () => {
    it('缓存命中时带上整组图片(而非只带选中的那张)', async () => {
        recordMediaGroupImages('g7', ['file_1', 'file_2', 'file_3']);
        const message = quoteAlbumMessage('file_2', 'g7');
        const { params } = await extractUserMessage(message, createContext());

        expect(imageParts(params).length).toBe(3);
    });

    it('缓存未命中(bot 重启后引用旧相册)退化为只带选中的那张', async () => {
        const message = quoteAlbumMessage('file_2', 'g8');
        const { params } = await extractUserMessage(message, createContext());

        expect(imageParts(params).length).toBe(1);
        expect(String(imageParts(params)[0].image)).toContain('file_2');
    });

    it('被引用消息不属于相册时保持原行为(单张)', async () => {
        const message = quoteAlbumMessage('file_9', null);
        const { params } = await extractUserMessage(message, createContext());

        expect(imageParts(params).length).toBe(1);
    });
});

describe('群聊引用与机器人会话历史分离', () => {
    const historyKey = 'history:-100:42';
    const oldHistory = [
        {
            role: 'user',
            content: [
                { type: 'text', text: '上一个话题的提问' },
                { type: 'image', image: 'https://api.telegram.org/file/bot42:token/photos/old-1.jpg' },
                { type: 'image', image: 'https://api.telegram.org/file/bot42:token/photos/old-2.jpg' },
            ],
        },
        { role: 'assistant', content: '上一个话题的回答' },
    ];
    const chat = { id: -100, type: 'supergroup', title: '测试群' } as const;
    const user = { id: 111, is_bot: false, first_name: '用户' };
    const bot = { id: 42, is_bot: true, first_name: '助手' };
    const handler = new ChatHandler();
    let context: WorkerContext;

    function groupMessage(id: number, fields: Partial<Telegram.Message> = {}): Telegram.Message {
        return { message_id: id, date: 123, chat, from: user, ...fields };
    }

    function photo(fileId: string): Telegram.PhotoSize[] {
        return [{ file_id: fileId, file_unique_id: `u-${fileId}`, width: 320, height: 240 }];
    }

    beforeEach(async () => {
        clearReplyThreadCacheForTest();
        ENV.REPLY_THREAD_CONTEXT = true;
        ENV.GROUP_TRIGGER_PREFIX = '.小助手';
        ENV.SYSTEM_PROMPT_MODE = 'system';
        ENV.TELEGRAM_IMAGE_TRANSFER_MODE = 'url';
        context = createContext();
        Object.assign(context.SHARE_CONTEXT, { chatHistoryKey: historyKey, chatType: chat.type, botName: 'test_bot' });
        await ENV.DATABASE.put(historyKey, JSON.stringify(oldHistory));
        await ENV.DATABASE.put(`last_active:${historyKey}`, String(Math.floor(Date.now() / 1000)));
    });

    it('回复单张图只发被引用的图和本轮问题，原会话历史保留且可继续追问', async () => {
        const referenced = groupMessage(20, { photo: [...photo('small'), ...photo('selected')] });
        const question = groupMessage(21, { text: '.小助手 这张图里有什么？', reply_to_message: referenced });
        await expect(new GroupMention().handle(question, context)).resolves.toBeNull();
        await handler.handle(question, context);

        const current = {
            role: 'user',
            content: [
                { type: 'text', text: '这张图里有什么？' },
                { type: 'image_url', image_url: { url: 'https://api.telegram.org/file/bot42:token/photos/selected.jpg' } },
            ],
        };
        expect(llmBodies).toHaveLength(1);
        expect(llmBodies[0].messages).toEqual([{ role: 'system', content: 'system' }, current]);
        expect(mockGetFile.mock.calls.map(([params]) => params.file_id)).toEqual(['selected']);

        const storedHistory = JSON.parse(await ENV.DATABASE.get(historyKey));
        expect(storedHistory.slice(0, oldHistory.length)).toEqual(oldHistory);
        expect(storedHistory.slice(oldHistory.length)).toEqual([
            {
                role: 'user',
                content: [
                    current.content[0],
                    { type: 'image', image: 'https://api.telegram.org/file/bot42:token/photos/selected.jpg' },
                ],
            },
            { role: 'assistant', content: '模型回答' },
        ]);

        const followup = groupMessage(23, {
            text: '再详细一点',
            reply_to_message: groupMessage(22, { from: bot, text: '模型回答' }),
        });
        await expect(new GroupMention().handle(followup, context)).resolves.toBeNull();
        await handler.handle(followup, context);
        expect(llmBodies).toHaveLength(2);
        expect(llmBodies[1].messages).toHaveLength(6);
        expect(llmBodies[1].messages.slice(-4)).toEqual([
            oldHistory[1],
            current,
            { role: 'assistant', content: '模型回答' },
            { role: 'user', content: '再详细一点' },
        ]);
    });

    it('回复相册时仍能带上同组图片，不带会话历史的图片', async () => {
        recordMediaGroupImages('quoted-album', ['album-1', 'album-2']);
        const referenced = groupMessage(20, { media_group_id: 'quoted-album', photo: photo('album-2') });
        await handler.handle(groupMessage(21, { text: '比较这几张图', reply_to_message: referenced }), context);

        expect(llmBodies).toHaveLength(1);
        expect(llmBodies[0].messages).toEqual([
            { role: 'system', content: 'system' },
            {
                role: 'user',
                content: [
                    { type: 'text', text: '比较这几张图' },
                    ...['album-1', 'album-2'].map(id => ({
                        type: 'image_url',
                        image_url: { url: `https://api.telegram.org/file/bot42:token/photos/${id}.jpg` },
                    })),
                ],
            },
        ]);
    });

    it('回复群友的讨论并用 /chat 提问，只带实际回复链，不带会话历史或群里其他消息', async () => {
        ENV.EXTRA_MESSAGE_CONTEXT = false;
        const root = groupMessage(10, { text: '这台机器无法开机' });
        const referenced = groupMessage(11, { text: '电源指示灯不亮', reply_to_message: root });
        recordChatMessage(root);
        recordChatMessage(referenced);
        recordChatMessage(groupMessage(12, { text: '无关的群消息', photo: photo('unrelated') }));
        const question = groupMessage(13, {
            text: '/chat 总结这个故障',
            entities: [{ type: 'bot_command', offset: 0, length: 5 }],
            reply_to_message: { ...referenced, reply_to_message: undefined },
        });
        await expect(new GroupMention().handle(question, context)).resolves.toBeNull();
        await new CommandHandler().handle(question, context);

        expect(llmBodies).toHaveLength(1);
        expect(llmBodies[0].messages).toEqual([
            { role: 'system', content: 'system' },
            {
                role: 'user',
                content: '总结这个故障\n[引用讨论串, 按时间从早到晚]\n用户: 这台机器无法开机\n用户: 电源指示灯不亮',
            },
        ]);
        expect(mockGetFile).not.toHaveBeenCalled();
    });

    it('被引用图片取不到时，不回退到历史图片或旧回答', async () => {
        mockGetFile.mockRejectedValueOnce(new Error('getFile 失败'));
        const referenced = groupMessage(20, { photo: photo('unavailable') });
        await handler.handle(groupMessage(21, { text: '请看这张图', reply_to_message: referenced }), context);

        expect(llmBodies).toHaveLength(1);
        expect(llmBodies[0].messages).toEqual([
            { role: 'system', content: 'system' },
            { role: 'user', content: '请看这张图' },
        ]);
        expect(mockEditMessageText.mock.calls.at(-1)?.[0].text).toContain('未能从 Telegram 取到');
    });

    it('/new 后普通聊天不会再发送旧历史', async () => {
        const response = await new CommandHandler().handle(groupMessage(20, { text: '/new' }), context);
        expect(response?.ok).toBe(true);
        expect(await ENV.DATABASE.get(historyKey)).toBeNull();

        await handler.handle(groupMessage(21, { text: '换一个话题' }), context);
        expect(llmBodies).toHaveLength(1);
        expect(llmBodies[0].messages).toEqual([
            { role: 'system', content: 'system' },
            { role: 'user', content: '换一个话题' },
        ]);
    });
});

// 图片消息不带任何文字时, 没有提示词就没有可回答的问题, 不触发聊天。
// .生图 只使用命令自带或直接回复的图, 不从会话里取最近发的图。
describe('无文字的图片消息不触发聊天', () => {
    it('相册完全没有文字 → 不调 LLM', async () => {
        const context = createContext();
        const m1 = albumPhotoMessage(1, 'file_1', 'g9');
        const m2 = albumPhotoMessage(2, 'file_2', 'g9');
        const handler = new ChatHandler();
        const [r1, r2] = await Promise.all([
            handler.handle(m1, context),
            handler.handle(m2, context),
        ]);

        expect(r1).toBeNull();
        expect(r2).toBeNull();
        expect(llmBodies.length).toBe(0);
    }, 30000);

    it('单张图片没有文字 → 不调 LLM', async () => {
        const context = createContext();
        const message = {
            message_id: 5,
            date: 123,
            chat: { id: 111, type: 'private', first_name: 'u' },
            from: { id: 111, is_bot: false, first_name: 'u' },
            photo: [{ file_id: 'file_single', file_unique_id: 'u-single', width: 320, height: 240 }],
        } as unknown as Telegram.Message;

        const resp = await new ChatHandler().handle(message, context);

        expect(resp).toBeNull();
        expect(llmBodies.length).toBe(0);
    });

    it('图片带文字时照常触发一次回复', async () => {
        const context = createContext();
        const message = {
            message_id: 6,
            date: 123,
            chat: { id: 111, type: 'private', first_name: 'u' },
            from: { id: 111, is_bot: false, first_name: 'u' },
            caption: '这张图里是什么',
            photo: [{ file_id: 'file_caption', file_unique_id: 'u-c', width: 320, height: 240 }],
        } as unknown as Telegram.Message;

        const resp = await new ChatHandler().handle(message, context);

        expect(resp).not.toBeNull();
        expect(llmBodies.length).toBe(1);
    }, 30000);
});

describe('相册里有命令时不进聊天通道', () => {
    it('caption 里写 .生图 的相册 → 整组都不触发聊天', async () => {
        const context = createContext();
        const m1 = albumPhotoMessage(1, 'file_1', 'g10', '.生图 把这两张图合并');
        const m2 = albumPhotoMessage(2, 'file_2', 'g10');
        const handler = new ChatHandler();
        const [r1, r2] = await Promise.all([
            handler.handle(m1, context),
            handler.handle(m2, context),
        ]);

        expect(r1).toBeNull();
        expect(r2).toBeNull();
        expect(llmBodies.length).toBe(0);
    }, 30000);
});

// 群里回复 bot 的消息再补几张图(相册、不写字)属于正常对话, 不能按"无文字=素材"静默掉:
// GroupMention 对"回复 bot 的消息"放行, ChatHandler 应把整组图片一起发给模型。
describe('群聊回复 bot 时发相册', () => {
    it('放行并整组发给模型', async () => {
        const context = createContext();
        const botMessage = {
            message_id: 40,
            date: 120,
            chat: { id: -100, type: 'supergroup' },
            from: { id: 42, is_bot: true, first_name: 'bot' },
            text: 'bot 的上一句话',
        } as unknown as Telegram.Message;
        const album = (messageId: number, fileId: string): Telegram.Message => ({
            message_id: messageId,
            date: 121,
            media_group_id: 'g-reply',
            chat: { id: -100, type: 'supergroup' },
            from: { id: 111, is_bot: false, first_name: 'u' },
            reply_to_message: botMessage,
            photo: [{ file_id: fileId, file_unique_id: `u-${fileId}`, width: 320, height: 240 }],
        } as unknown as Telegram.Message);

        const m1 = album(41, 'file_r1');
        const m2 = album(42, 'file_r2');

        // GroupMention: 回复 bot 的消息 → 放行
        await expect(new GroupMention().handle(m1, context)).resolves.toBeNull();

        const handler = new ChatHandler();
        const [r1, r2] = await Promise.all([
            handler.handle(m1, context),
            handler.handle(m2, context),
        ]);

        expect(r2).toBeNull();
        expect(r1).not.toBeNull();
        expect(llmBodies.length).toBe(1);
        const lastMessage = llmBodies[0].messages[llmBodies[0].messages.length - 1];
        const images = lastMessage.content.filter((item: any) => item.type === 'image_url' || item.type === 'image');
        expect(images.length).toBe(2);
    }, 30000);
});
