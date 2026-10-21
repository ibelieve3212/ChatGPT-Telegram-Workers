import type { WorkerContext } from '#/config';
import type { ChatAgent, LLMChatParams } from './types';
import { ENV } from '#/config';
import { requestCompletionsFromLLM } from './chat';
import { ImageSupportFormat, renderOpenAIMessages } from './openai_compatibility';

// 验证: 带图片的消息存入历史后, 下一轮请求是否仍然携带该图片。
// 场景复现: 用户发图 → 追问几轮 → 模型"不记得"图, 只剩文本上下文。
// 关键结论依据: 渲染后的请求体里, 历史消息中的图片是否仍是 image_url。

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

const HISTORY_KEY = 'history:111:42';

function createContext(): WorkerContext {
    return {
        USER_CONFIG: { SYSTEM_INIT_MESSAGE: 'system' },
        SHARE_CONTEXT: { botToken: '42:token', chatHistoryKey: HISTORY_KEY, chatType: 'private' },
    } as unknown as WorkerContext;
}

// 采集每次请求发给 LLM 的消息列表
const captured: LLMChatParams[] = [];
const fakeAgent: ChatAgent = {
    name: 'fake',
    modelKey: 'OPENAI_CHAT_MODEL',
    enable: () => true,
    model: () => 'fake-model',
    modelList: async () => ['fake-model'],
    request: async (params: LLMChatParams) => {
        captured.push(params);
        return {
            text: 'ok',
            responses: [{ role: 'assistant', content: 'ok' }],
        };
    },
} as unknown as ChatAgent;

// 伪造 Telegram 图片下载: JPEG 头 0xFF 0xD8 0xFF → base64 以 '/' 开头
const JPEG_BYTES = new Uint8Array([0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46]);
beforeEach(() => {
    captured.length = 0;
    (ENV as any).DATABASE = createMockDatabase();
    ENV.AUTO_TRIM_HISTORY = true;
    ENV.MAX_HISTORY_LENGTH = 20;
    ENV.MAX_TOKEN_LENGTH = -1;
    ENV.SESSION_IDLE_TIMEOUT = 1800;
    ENV.SESSION_IDLE_TIMEOUT_PRIVATE = 0;
    ENV.HISTORY_IMAGE_PLACEHOLDER = null;
    ENV.TELEGRAM_IMAGE_TRANSFER_MODE = 'base64';
    globalThis.fetch = jest.fn(async () => new Response(JPEG_BYTES, { headers: { 'content-type': 'image/jpeg' } })) as any;
});

describe('图片记忆: 历史中的图片是否被重新发送到 LLM', () => {
    it('第二轮请求里仍然带着第一轮的图片', async () => {
        const context = createContext();

        // 第一轮: 用户发图
        await requestCompletionsFromLLM({
            role: 'user',
            content: [
                { type: 'text', text: '这张图是什么?' },
                { type: 'image', image: new URL('https://api.telegram.org/file/bot42/photo.jpg') },
            ],
        } as any, context, fakeAgent, null, null, 'image');

        // 第二轮: 纯文字追问
        await requestCompletionsFromLLM({
            role: 'user',
            content: '再详细说说这张图',
        } as any, context, fakeAgent, null, null, 'none');

        // KV 里存的历史: 图片应是 URL 字符串(不是 base64), 否则会撑爆 KV
        const stored = JSON.parse((ENV.DATABASE as any)._store.get(HISTORY_KEY));
        const imagePart = stored[0].content.find((c: any) => c.type === 'image');
        expect(imagePart).toBeDefined();
        expect(typeof imagePart.image).toBe('string');
        expect(imagePart.image).toContain('https://');

        // 渲染成真实请求体, 检查历史消息里是否仍有 image_url
        const rendered = await renderOpenAIMessages(undefined, captured[1].messages, [ImageSupportFormat.URL, ImageSupportFormat.BASE64]);
        const firstMsg = rendered[0];
        expect(firstMsg.role).toBe('user');
        const imageParts = (firstMsg.content as any[]).filter(c => c.type === 'image_url' || c.type === 'image_base64');
        expect(imageParts.length).toBe(1);
        expect(`${imageParts[0].image_url?.url || imageParts[0].image_base64?.base64}`).toContain('data:image/jpeg;base64,');
    });

    it('历史图片下载失败时, 图片被静默丢弃(只剩文本)', async () => {
        globalThis.fetch = jest.fn(async () => new Response('not found', { status: 404 })) as any;
        const context = createContext();

        await requestCompletionsFromLLM({
            role: 'user',
            content: [
                { type: 'text', text: '这张图是什么?' },
                // 用一个未被进程内图片缓存命中的 URL, 保证真的走网络下载
                { type: 'image', image: new URL('https://api.telegram.org/file/bot42/photo-404.jpg') },
            ],
        } as any, context, fakeAgent, null, null, 'image');

        await requestCompletionsFromLLM({
            role: 'user',
            content: '再详细说说这张图',
        } as any, context, fakeAgent, null, null, 'none');

        const rendered = await renderOpenAIMessages(undefined, captured[1].messages, [ImageSupportFormat.URL, ImageSupportFormat.BASE64]);
        const imageParts = (rendered[0].content as any[]).filter(c => c.type === 'image_url' || c.type === 'image_base64');
        // 下载失败 → 图片被丢弃, 模型只能看到文本
        expect(imageParts.length).toBe(0);
    });
});
