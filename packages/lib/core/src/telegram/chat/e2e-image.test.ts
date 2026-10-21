import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import { loadChatLLM, requestCompletionsFromLLM } from '#/agent';
import { ENV } from '#/config';
import { extractUserMessage } from './index';

// 端到端联调: 用真实代码路径(extractUserMessage → 真实 OpenAI agent → 真实上游)跑两轮,
// 抓取实际发出的请求体, 验证"第二轮(追问)时历史里的图是否还在请求里"。
//
// 这个测试会访问真实上游, 默认跳过。启用方式:
//   IMAGE_E2E_API_BASE=https://your-relay/v1 IMAGE_E2E_API_KEY=sk-xxx npx jest src/telegram/chat/e2e-image.test.ts
// 用途: 排查第三方中转站是否会丢弃历史消息里的图片。

const E2E_BASE = process.env.IMAGE_E2E_API_BASE;
const E2E_KEY = process.env.IMAGE_E2E_API_KEY;
const E2E_MODEL = process.env.IMAGE_E2E_MODEL || 'gpt-free';
const describeE2E = E2E_BASE && E2E_KEY ? describe : describe.skip;

const REAL_FETCH = globalThis.fetch;

// 抓到的上游请求体
const sentBodies: any[] = [];

// 测试图: 上半洋红 / 下半青
const PNG = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAUAAAADwCAIAAAD+Tyo8AAAC10lEQVR4nO3VwQkAMQwDQef679nXQz5hYaYCfRadnR2g6Xs9ALgnYAgTMIQJGMIEDGEChjABQ5iAIUzAECZgCBMwhAkYwgQMYQKGMAFDmIAhTMAQJmAIEzCECRjCBAxhAoYwAUOYgCFMwBAmYAgTMIQJGMIEDGEChjABQ5iAIUzAECZgCBMwhAkYwgQMYQKGMAFDmIAhTMAQJmAIEzCECRjCBAxhAoYwAUOYgCFMwBAmYAgTMIQJGMIEDGEChjABQ5iAIUzAECZgCBMwhAkYwgQMYQKGMAFDmIAhTMAQJmAIEzCECRjCBAxhAoYwAUOYgCFMwBAmYAgTMIQJGMIEDGEChjABQ5iAIUzAECZgCBMwhAkYwgQMYQKGMAFDmIAhTMAQJmAIEzCECRjCBAxhAoYwAUOYgCFMwBAmYAgTMIQJGMIEDGEChjABQ5iAIUzAECZgCBMwhAkYwgQMYQKGMAFDmIAhTMAQJmAIEzCECRjCBAxhAoYwAUPYmd3XG4BLHhjCBAxhAoYwAUOYgCFMwBAmYAgTMIQJGMIEDGEChjABQ5iAIUzAECZgCBMwhAkYwgQMYQKGMAFDmIAhTMAQJmAIEzCECRjCBAxhAoYwAUOYgCFMwBAmYAgTMIQJGMIEDGEChjABQ5iAIUzAECZgCBMwhAkYwgQMYQKGMAFDmIAhTMAQJmAIEzCECRjCBAxhAoYwAUOYgCFMwBAmYAgTMIQJGMIEDGEChjABQ5iAIUzAECZgCBMwhAkYwgQMYQKGMAFDmIAhTMAQJmAIEzCECRjCBAxhAoYwAUOYgCFMwBAmYAgTMIQJGMIEDGEChjABQ5iAIUzAECZgCBMwhAkYwgQMYQKGMAFDmIAhTMAQJmAIEzCECRjCBAxhAoYwAUOYgCFMwBAmYAgTMIQJGMIEDGEChjABQ5iAIUzAECZgCBMwhAkYwgQMYQKGMAFDmIAhTMAQJmCYrh9rDgXb3+UtTQAAAABJRU5ErkJggg==',
    'base64',
);

jest.mock('../api', () => ({
    createTelegramBotAPI: () => ({
        getFileWithReturns: async () => ({ result: { file_path: 'photos/file_1.jpg' } }),
        sendMessage: async () => ({ ok: true, result: { message_id: 1 } }),
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
            ...ENV.USER_CONFIG,
            AI_PROVIDER: 'openai',
            OPENAI_API_BASE: `${E2E_BASE}`,
            OPENAI_API_KEY: [`${E2E_KEY}`],
            OPENAI_CHAT_MODEL: E2E_MODEL,
            SYSTEM_INIT_MESSAGE: '你是一个助手',
        },
        SHARE_CONTEXT: { botToken: '42:token', botId: 42, chatHistoryKey: HISTORY_KEY, chatType: 'private' },
    } as unknown as WorkerContext;
}

// 图片消息(带 caption)
function photoMessage(caption: string): Telegram.Message {
    return {
        message_id: 1,
        date: 0,
        chat: { id: 111, type: 'private', first_name: 'u' },
        from: { id: 111, is_bot: false, first_name: 'u' },
        caption,
        photo: [{ file_id: 'file_1', file_unique_id: 'u1', width: 64, height: 48 }],
    } as unknown as Telegram.Message;
}

// 纯文本消息
function textMessage(text: string): Telegram.Message {
    return {
        message_id: 2,
        date: 0,
        chat: { id: 111, type: 'private', first_name: 'u' },
        from: { id: 111, is_bot: false, first_name: 'u' },
        text,
    } as unknown as Telegram.Message;
}

beforeEach(() => {
    sentBodies.length = 0;
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

    // fetch 分流: Telegram 图片域名 → 返回测试图字节; 其他 → 真实请求(上游)
    globalThis.fetch = (async (input: any, init?: any) => {
        const url = typeof input === 'string' ? input : input.url;
        if (String(url).includes('api.telegram.org')) {
            return new Response(PNG, { headers: { 'content-type': 'image/png' } });
        }
        try {
            const body = init?.body ? JSON.parse(init.body) : null;
            if (body) {
                sentBodies.push(body);
            }
        } catch {
            // 忽略非 JSON 请求体
        }
        return REAL_FETCH(input as any, init as any);
    }) as any;
});

function countImages(body: any): number {
    return (body.messages || []).reduce((n: number, m: any) => {
        if (!Array.isArray(m.content)) {
            return n;
        }
        return n + m.content.filter((c: any) => c.type === 'image_url' || c.type === 'image_base64').length;
    }, 0);
}

describeE2E('端到端: 发图 → 追问, 图片是否仍在请求里', () => {
    it('真实上游, 追问轮的请求体仍带图', async () => {
        const context = createContext();
        const agent = loadChatLLM(context.USER_CONFIG);
        expect(agent).not.toBeNull();

        // 第 1 轮: 发图
        const { params, imageMode } = await extractUserMessage(photoMessage('这张图片的上半部分和下半部分分别是什么颜色？只回答颜色名。'), context);
        const answer1 = await requestCompletionsFromLLM(params, context, agent!, null, null, imageMode);
        console.log('[第1轮] 请求图片数 =', countImages(sentBodies[0]), '| 回答:', answer1.trim().slice(0, 120));

        // 第 2 轮: 纯文字追问
        const r2 = await extractUserMessage(textMessage('再确认一次：这张图片的上半部分和下半部分分别是什么颜色？只回答颜色名。'), context);
        const answer2 = await requestCompletionsFromLLM(r2.params, context, agent!, null, null, r2.imageMode);
        console.log('[第2轮] 请求图片数 =', countImages(sentBodies[1]), '| 消息条数 =', sentBodies[1].messages.length, '| 回答:', answer2.trim().slice(0, 120));

        expect(countImages(sentBodies[0])).toBe(1);
        expect(countImages(sentBodies[1])).toBe(1); // 追问轮仍带图
    }, 120000);

    it('对照组: 开启 HISTORY_IMAGE_PLACEHOLDER 后, 追问轮请求里图片消失(只剩文本)', async () => {
        ENV.HISTORY_IMAGE_PLACEHOLDER = '[图片]';
        const context = createContext();
        const agent = loadChatLLM(context.USER_CONFIG);

        const { params, imageMode } = await extractUserMessage(photoMessage('这张图片的上半部分和下半部分分别是什么颜色？只回答颜色名。'), context);
        await requestCompletionsFromLLM(params, context, agent!, null, null, imageMode);

        const r2 = await extractUserMessage(textMessage('再确认一次：这张图片的上半部分和下半部分分别是什么颜色？只回答颜色名。'), context);
        await requestCompletionsFromLLM(r2.params, context, agent!, null, null, r2.imageMode);

        expect(countImages(sentBodies[0])).toBe(1);
        expect(countImages(sentBodies[1])).toBe(0); // 图被占位符替换
    }, 120000);
});
