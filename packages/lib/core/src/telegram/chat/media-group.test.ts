import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import { ENV } from '#/config';
import { ChatHandler } from '../handler/handlers';
import { extractUserMessage } from './index';
import {
    clearMediaGroupCachesForTest,
    collectMediaGroup,
    getMediaGroupImageFileIds,
    MEDIA_GROUP_IMAGE_CACHE_MAX,
    recordMediaGroupImages,
} from './media-group';

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

// 捕获发给 LLM 的请求体, 断言模型实际看到的图片数量
const llmBodies: any[] = [];

beforeEach(() => {
    clearMediaGroupCachesForTest();
    mockSendMessage.mockClear();
    mockEditMessageText.mockClear();
    mockGetFile.mockClear();
    llmBodies.length = 0;
    (ENV as any).DATABASE = createMockDatabase();
    ENV.EXTRA_MESSAGE_CONTEXT = true;
    ENV.EXTRA_MESSAGE_MEDIA_COMPATIBLE = ['image'];
    ENV.TELEGRAM_API_DOMAIN = 'https://api.telegram.org';
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
