import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import { loadChatLLM, requestCompletionsFromLLM } from '#/agent';
import { createImageDiagCounter } from '#/agent/utils';
import { ENV } from '#/config';
import { chatWithMessage, extractUserMessage } from './index';

// 验证图片加载失败时用户能看到明确提示。
// 背景: 以前图片取图/下载失败是完全静默的, 用户只能从"模型好像不记得我发过的图片"去猜,
// 无法区分"图片根本没发出去"和"图片发出去了但模型读不出来"。

const mockSendMessage = jest.fn(async (params: any) => new Response(JSON.stringify({
    ok: true,
    result: { message_id: 1, text: params?.text || '' },
}), { status: 200, headers: { 'content-type': 'application/json' } }));

// 回复可能走 sendMessage 或 editMessageText(有占位消息时编辑占位), 两者都要捕获
const mockEditMessageText = jest.fn(async (params: any) => new Response(JSON.stringify({
    ok: true,
    result: { message_id: 1, text: params?.text || '' },
}), { status: 200, headers: { 'content-type': 'application/json' } }));

const mockGetFile = jest.fn(async () => ({ result: { file_path: 'photos/file_1.jpg' } }));

jest.mock('../api', () => ({
    createTelegramBotAPI: () => ({
        sendMessage: mockSendMessage,
        editMessageText: mockEditMessageText,
        deleteMessage: jest.fn(async () => new Response('{}', { status: 200 })),
        sendChatAction: jest.fn(async () => new Response('{}', { status: 200 })),
        getFileWithReturns: mockGetFile,
        // 模拟不支持富文本的旧版 API server: 404 → 降级到普通发送
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

const HISTORY_KEY = 'history:111:42';

function createContext(): WorkerContext {
    return {
        USER_CONFIG: {
            SYSTEM_INIT_MESSAGE: 'system',
            AI_PROVIDER: 'openai',
            OPENAI_API_BASE: 'https://llm.example.com/v1',
            OPENAI_API_KEY: ['sk-test'],
            OPENAI_CHAT_MODEL: 'gpt-test',
        },
        SHARE_CONTEXT: { botToken: '42:token', botId: 42, chatHistoryKey: HISTORY_KEY, chatType: 'private' },
        requestStartedAt: Date.now(),
    } as unknown as WorkerContext;
}

// 伪造 JPEG: 首字节 0xFF → base64 以 '/' 开头, 可被识别为 image/jpeg
const JPEG_BYTES = new Uint8Array([0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46]);

function photoMessage(): Telegram.Message {
    return {
        message_id: 1,
        date: 0,
        chat: { id: 111, type: 'private', first_name: 'u' },
        from: { id: 111, is_bot: false, first_name: 'u' },
        caption: '这张图里写了什么?',
        photo: [{ file_id: 'file_1', file_unique_id: 'u1', width: 320, height: 240 }],
    } as unknown as Telegram.Message;
}

function textMessage(text: string): Telegram.Message {
    return {
        message_id: 2,
        date: 0,
        chat: { id: 111, type: 'private', first_name: 'u' },
        from: { id: 111, is_bot: false, first_name: 'u' },
        text,
    } as unknown as Telegram.Message;
}

// 取出发送给用户的最后一条消息文本(sendMessage / editMessageText 都算, 富文本读 markdown)
function lastSentText(): string {
    const calls = [...mockSendMessage.mock.calls, ...mockEditMessageText.mock.calls];
    const last = calls[calls.length - 1]?.[0] as any;
    return String(last?.rich_message?.markdown ?? last?.text ?? '');
}

beforeEach(() => {
    mockSendMessage.mockClear();
    mockEditMessageText.mockClear();
    mockGetFile.mockClear();
    mockGetFile.mockResolvedValue({ result: { file_path: 'photos/file_1.jpg' } } as any);
    (ENV as any).DATABASE = createMockDatabase();
    ENV.AUTO_TRIM_HISTORY = true;
    ENV.MAX_HISTORY_LENGTH = 20;
    ENV.MAX_TOKEN_LENGTH = -1;
    ENV.SESSION_IDLE_TIMEOUT = 1800;
    ENV.SESSION_IDLE_TIMEOUT_PRIVATE = 0;
    ENV.HISTORY_IMAGE_PLACEHOLDER = null;
    ENV.TELEGRAM_IMAGE_TRANSFER_MODE = 'base64';
    ENV.TELEGRAM_API_DOMAIN = 'https://api.telegram.org';
    ENV.STREAM_MODE = false;
    ENV.DEBUG_MODE = false;
    ENV.DEFAULT_PARSE_MODE = 'HTML';

    // fetch 分流: Telegram 图片 → 按 URL 决定成功/404; 其余(LLM) → 返回固定回答
    globalThis.fetch = jest.fn(async (input: any) => {
        const url = String(typeof input === 'string' ? input : input.url);
        if (url.includes('api.telegram.org/file/')) {
            if (url.includes('404')) {
                return new Response('not found', { status: 404 });
            }
            return new Response(JPEG_BYTES, { headers: { 'content-type': 'image/jpeg' } });
        }
        return new Response(JSON.stringify({
            choices: [{ message: { content: '模型回答' }, finish_reason: 'stop' }],
        }), { status: 200, headers: { 'content-type': 'application/json' } });
    }) as any;
});

describe('图片加载失败的用户可见提示', () => {
    it('当前消息的图片下载失败 → 回复里给出明确提示', async () => {
        const context = createContext();
        const message = photoMessage();
        // 让取图地址指向 404, 模拟 Telegram 文件下载失败
        mockGetFile.mockResolvedValue({ result: { file_path: 'photos/404.jpg' } } as any);

        const { params, imageMode, imageExtractFailed } = await extractUserMessage(message, context);
        expect(imageExtractFailed).toBe(0);
        await chatWithMessage(message, params, context, null, imageMode, imageExtractFailed);

        const sent = lastSentText();
        expect(sent).toContain('模型回答');
        expect(sent).toContain('图片加载失败');
        expect(sent).toContain('1 张');
    }, 30000);

    it('历史中的图片下载失败 → 回复里提示模型可能已看不到旧图', async () => {
        const context = createContext();
        // 预置历史: 里面有一张已经失效(404)的图片
        (ENV.DATABASE as any)._store.set(HISTORY_KEY, JSON.stringify([
            {
                role: 'user',
                content: [
                    { type: 'text', text: '这张图里写了什么?' },
                    { type: 'image', image: 'https://api.telegram.org/file/bot42/photos/404.jpg' },
                ],
            },
            { role: 'assistant', content: '模型回答' },
        ]));

        const message = textMessage('再看看那张图');
        const { params, imageMode, imageExtractFailed } = await extractUserMessage(message, context);
        await chatWithMessage(message, params, context, null, imageMode, imageExtractFailed);

        const sent = lastSentText();
        expect(sent).toContain('历史中的 1 张图片加载失败');
    }, 30000);

    it('图片正常时 → 不加任何提示', async () => {
        const context = createContext();
        const message = photoMessage();
        const { params, imageMode, imageExtractFailed } = await extractUserMessage(message, context);
        await chatWithMessage(message, params, context, null, imageMode, imageExtractFailed);

        const sent = lastSentText();
        expect(sent).toContain('模型回答');
        expect(sent).not.toContain('图片');
    }, 30000);

    it('从 Telegram 取图失败(getFile 报错) → 提示图片没取到', async () => {
        const context = createContext();
        const message = photoMessage();
        mockGetFile.mockRejectedValue(new Error('getFile timeout'));

        const { params, imageMode, imageExtractFailed } = await extractUserMessage(message, context);
        expect(imageExtractFailed).toBe(1);
        await chatWithMessage(message, params, context, null, imageMode, imageExtractFailed);

        const sent = lastSentText();
        expect(sent).toContain('未能从 Telegram 取到');
    }, 30000);

    it('图片统计: 当前消息与历史消息的图片分别计数', async () => {
        const context = createContext();
        // 预置历史: 里面有一张已经失效(404)的图片
        (ENV.DATABASE as any)._store.set(HISTORY_KEY, JSON.stringify([
            {
                role: 'user',
                content: [
                    { type: 'text', text: '看图' },
                    { type: 'image', image: 'https://api.telegram.org/file/bot42/photos/404.jpg' },
                ],
            },
            { role: 'assistant', content: '好的' },
        ]));

        const agent = loadChatLLM(context.USER_CONFIG);
        expect(agent).not.toBeNull();
        const diag = createImageDiagCounter();
        const { params, imageMode } = await extractUserMessage(photoMessage(), context);
        await requestCompletionsFromLLM(params, context, agent!, null, null, imageMode, diag);

        // 当前消息的图片下载成功
        expect(diag.current.ok).toBe(1);
        expect(diag.current.failed).toBe(0);
        // 历史里的图片下载失败
        expect(diag.history.failed).toBe(1);
        expect(diag.history.ok).toBe(0);
    }, 30000);
});
