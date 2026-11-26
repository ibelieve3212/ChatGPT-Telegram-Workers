import type * as Telegram from 'telegram-bot-api-types';
import { ENV, FEATURES } from '#/config';
import { clearMediaGroupCachesForTest } from '../chat/media-group';
import { clearReplyThreadCacheForTest } from '../chat/reply-thread';
import { PENDING_TEXT } from '../pending';
import { handleUpdate } from './index';

// 纯图片消息的分流矩阵(群聊与私聊同一套逻辑), 从 handleUpdate 真实入口走:
// 1. 群聊单图、无任何触发       → 静默, 不请求模型
// 2. 群聊回复 bot 的纯图         → 识图 + 文本回复
// 3. 群聊 caption 里 @bot        → 识图 + 文本回复
// 4. 群聊 caption 里 .小助手 前缀 → 识图 + 文本回复
// 5. 群聊 caption 里 .生图/img   → 图片当参考走生图, 不请求文本模型
// 私聊: 没有群触发门槛, 单图直接识图; 回复 bot / 带命令 与群聊一致。
jest.mock('../chat/media-group', () => {
    const actual = jest.requireActual('../chat/media-group');
    return { ...actual, collectMediaGroup: (message: Telegram.Message, quietMs = 10, scope?: string) => actual.collectMediaGroup(message, quietMs, scope) };
});

const token = '42:paths';
const originalFetch = globalThis.fetch;
const defaults = structuredClone(ENV.USER_CONFIG);
let store: Map<string, string>;
let requests: any[];
let images: { url: string; body: any }[];
let calls: { method: string; params: any }[];
let visible: Map<number, any>;
let nextId: number;

function json(body: any, status = 200): Response {
    return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
}
function answer(text = '模型答复'): Response {
    return json({ choices: [{ message: { content: text }, finish_reason: 'stop' }] });
}
function message(id: number, text: string | undefined, type = 'private', extra: any = {}): Telegram.Message {
    return {
        message_id: id,
        date: 1800000000,
        chat: { id: type === 'private' ? 111 : -100, type, first_name: '用户' },
        from: { id: 111, is_bot: false, first_name: '用户' },
        ...(text === undefined ? {} : { text }),
        ...extra,
    } as Telegram.Message;
}
function photo(id: number, file: string, type = 'private', extra: any = {}): Telegram.Message {
    return message(id, undefined, type, { photo: [{ file_id: file, file_unique_id: file, width: 100, height: 100 }], ...extra });
}
function captionPhoto(id: number, file: string, caption: string, type = 'private', extra: any = {}): Telegram.Message {
    return message(id, undefined, type, { caption, photo: [{ file_id: file, file_unique_id: file, width: 100, height: 100 }], ...extra });
}
function bot(id = 99, type = 'private'): Telegram.Message {
    return message(id, '机器人上文', type, { from: { id: 42, is_bot: true, first_name: '机器人' } });
}
const run = (m: Telegram.Message) => handleUpdate(token, { update_id: m.message_id, message: m });
const pending = () => calls.filter(c => c.method === 'sendMessage' && c.params.text === PENDING_TEXT);
function imageFiles(body = requests.at(-1)) {
    return body.messages.flatMap((m: any) => Array.isArray(m.content)
        ? m.content.filter((p: any) => p.type === 'image_url').map((p: any) => p.image_url.url.split('/').at(-1))
        : []);
}
// 生图底图: 单图走 image 字段, 多图走 image[] 字段(openai 兼容渠道的两种写法)。
function referenceImages(body: any): File[] {
    const form = body as FormData;
    return [...form.getAll('image'), ...form.getAll('image[]')] as File[];
}

beforeEach(() => {
    store = new Map();
    requests = [];
    images = [];
    calls = [];
    visible = new Map();
    nextId = 1000;
    clearMediaGroupCachesForTest();
    clearReplyThreadCacheForTest();
    Object.assign(ENV, {
        TELEGRAM_AVAILABLE_TOKENS: [token],
        TELEGRAM_BOT_NAME: ['paths_bot'],
        TELEGRAM_API_DOMAIN: 'https://telegram.test',
        TELEGRAM_IMAGE_TRANSFER_MODE: 'url',
        TELEGRAM_PHOTO_SIZE_OFFSET: -1,
        I_AM_A_GENEROUS_PERSON: true,
        ADMIN_USER_IDS: ['111'],
        GROUP_CHAT_BOT_ENABLE: true,
        GROUP_CHAT_BOT_SHARE_MODE: true,
        GROUP_TRIGGER_PREFIX: '.小助手',
        SAFE_MODE: true,
        STREAM_MODE: false,
        DEBUG_MODE: false,
        DEV_MODE: false,
        IMAGE_EDIT_ON_REPLY: true,
        EXTRA_MESSAGE_CONTEXT: true,
        EXTRA_MESSAGE_MEDIA_COMPATIBLE: ['image'],
        REPLY_THREAD_CONTEXT: true,
        AUTO_TRIM_HISTORY: true,
        MAX_HISTORY_LENGTH: 100,
        MAX_TOKEN_LENGTH: -1,
        HISTORY_IMAGE_PLACEHOLDER: null,
        SESSION_IDLE_TIMEOUT: 1800,
        SESSION_IDLE_TIMEOUT_PRIVATE: 0,
        SYSTEM_PROMPT_MODE: 'system',
        DEFAULT_PARSE_MODE: 'HTML',
        TELEGRAM_MIN_STREAM_INTERVAL: 0,
        CLEAR_ALSO_RESETS_HISTORY: true,
    });
    Object.assign(FEATURES, { richMessageMode: false, splitCodeBlock: true, expandableReply: true });
    Object.assign(ENV.USER_CONFIG, structuredClone(defaults), {
        AI_PROVIDER: 'openai',
        OPENAI_API_BASE: 'https://llm.test/v1',
        OPENAI_API_KEY: ['test'],
        OPENAI_CHAT_MODEL: 'test',
        SYSTEM_INIT_MESSAGE: 'system',
        IMAGE_API_BASE: 'https://image.test/v1',
        IMAGE_API_KEY: 'test',
        IMAGE_MODEL: 'test',
    });
    ENV.DATABASE = {
        get: async key => store.get(key) ?? null,
        put: async (key, value) => { store.set(key, value); },
        delete: async (key) => { store.delete(key); },
        listKeys: async prefix => [...store.keys()].filter(k => k.startsWith(prefix)),
    };
    globalThis.fetch = jest.fn(async (input: any, init?: any): Promise<Response> => {
        const url = String(input instanceof URL ? input : typeof input === 'string' ? input : input.url);
        if (url.startsWith('https://llm.test/')) {
            requests.push(JSON.parse(init.body));
            return answer();
        }
        if (url.startsWith('https://image.test/')) {
            images.push({ url, body: init.body });
            return json({ data: [{ url: 'https://result.test/image.png' }] });
        }
        if (url.includes('/file/bot'))
            return new Response(new Uint8Array([255, 216, 255, 224]), { headers: { 'content-type': 'image/jpeg' } });
        if (!url.startsWith('https://telegram.test/bot'))
            throw new Error(`未预期的请求：${url}`);
        const method = url.split('/').at(-1)!;
        const params = init.body instanceof FormData ? Object.fromEntries(init.body.entries()) : JSON.parse(init.body);
        calls.push({ method, params });
        if (method === 'getMe')
            return json({ ok: true, result: { id: 42, username: 'paths_bot', is_bot: true } });
        if (method === 'getChatMember')
            return json({ ok: true, result: { status: 'administrator' } });
        if (method === 'getFile')
            return json({ ok: true, result: { file_path: `photos/${params.file_id}.jpg` } });
        if (method === 'sendMessage' || method === 'sendPhoto') {
            const result = { message_id: ++nextId, ...params };
            visible.set(result.message_id, result);
            return json({ ok: true, result });
        }
        if (method === 'editMessageText') {
            const result = { ...visible.get(params.message_id), ...params };
            visible.set(params.message_id, result);
            return json({ ok: true, result });
        }
        if (method === 'deleteMessage') {
            visible.delete(params.message_id);
            return json({ ok: true, result: true });
        }
        return json({ ok: true, result: true });
    }) as typeof fetch;
});
afterEach(async () => {
    await new Promise(resolve => setTimeout(resolve, 5));
    globalThis.fetch = originalFetch;
});

describe('群聊纯图片分流', () => {
    it('单发一张图、没有任何操作 → 静默, 不请求模型', async () => {
        await run(photo(1, 'a', 'supergroup'));
        expect(requests).toHaveLength(0);
        expect(images).toHaveLength(0);
        expect(pending()).toHaveLength(0);
    });

    it('回复 bot 的纯图 → 识图并文本回复', async () => {
        await run(photo(1, 'a', 'supergroup', { reply_to_message: bot(99, 'supergroup') }));
        expect(requests).toHaveLength(1);
        expect(imageFiles()).toEqual(['a.jpg']);
        expect(pending()).toHaveLength(1);
    });

    it('caption 里 @bot 的纯图 → 识图并文本回复', async () => {
        const mention = '@paths_bot';
        await run(captionPhoto(1, 'a', mention, 'supergroup', {
            caption_entities: [{ type: 'mention', offset: 0, length: mention.length }],
        }));
        expect(requests).toHaveLength(1);
        expect(imageFiles()).toEqual(['a.jpg']);
        expect(pending()).toHaveLength(1);
    });

    it('caption 里 .小助手 前缀 + 纯图 → 识图并文本回复', async () => {
        await run(captionPhoto(1, 'a', '.小助手 描述这张图', 'supergroup'));
        expect(requests).toHaveLength(1);
        expect(imageFiles()).toEqual(['a.jpg']);
        expect(pending()).toHaveLength(1);
    });

    it('caption 只有 .小助手、没有正文但带图 → 也算明确触发', async () => {
        await run(captionPhoto(1, 'a', '.小助手', 'supergroup'));
        expect(requests).toHaveLength(1);
        expect(imageFiles()).toEqual(['a.jpg']);
        expect(pending()).toHaveLength(1);
    });

    it('caption 里 /chat + 纯图 → 识图并文本回复', async () => {
        await run(captionPhoto(1, 'a', '/chat 比较这张图', 'supergroup'));
        expect(requests).toHaveLength(1);
        expect(imageFiles()).toEqual(['a.jpg']);
        expect(pending()).toHaveLength(1);
    });

    it('caption 里带 .生图 命令 → 图片当参考图走生图, 不请求文本模型', async () => {
        await run(captionPhoto(1, 'a', '.生图 换成水彩风格', 'supergroup'));
        expect(images).toHaveLength(1);
        expect(referenceImages(images[0].body)).toHaveLength(1);
        expect(requests).toHaveLength(0);
    });

    it('caption 里带 /img 命令 → 同样走生图', async () => {
        await run(captionPhoto(1, 'a', '/img 换成水彩风格', 'supergroup'));
        expect(images).toHaveLength(1);
        expect(referenceImages(images[0].body)).toHaveLength(1);
        expect(requests).toHaveLength(0);
    });
});

describe('私聊纯图片分流', () => {
    it('单发一张图、没有任何操作 → 识图并文本回复', async () => {
        await run(photo(1, 'a', 'private'));
        expect(requests).toHaveLength(1);
        expect(imageFiles()).toEqual(['a.jpg']);
        expect(pending()).toHaveLength(1);
    });

    it('回复 bot 的纯图 → 识图并文本回复', async () => {
        await run(photo(1, 'a', 'private', { reply_to_message: bot(99, 'private') }));
        expect(requests).toHaveLength(1);
        expect(imageFiles()).toEqual(['a.jpg']);
        expect(pending()).toHaveLength(1);
    });

    it('带普通 caption 的纯图 → 识图并文本回复', async () => {
        await run(captionPhoto(1, 'a', '描述这张图', 'private'));
        expect(requests).toHaveLength(1);
        expect(imageFiles()).toEqual(['a.jpg']);
        expect(pending()).toHaveLength(1);
    });

    it('caption 里 /chat + 纯图 → 识图并文本回复', async () => {
        await run(captionPhoto(1, 'a', '/chat 比较这张图', 'private'));
        expect(requests).toHaveLength(1);
        expect(imageFiles()).toEqual(['a.jpg']);
        expect(pending()).toHaveLength(1);
    });

    it('caption 里带 .生图 命令 → 图片当参考图走生图, 不请求文本模型', async () => {
        await run(captionPhoto(1, 'a', '.生图 换成水彩风格', 'private'));
        expect(images).toHaveLength(1);
        expect(referenceImages(images[0].body)).toHaveLength(1);
        expect(requests).toHaveLength(0);
    });

    it('caption 里带 /img 命令 → 同样走生图', async () => {
        await run(captionPhoto(1, 'a', '/img 换成水彩风格', 'private'));
        expect(images).toHaveLength(1);
        expect(referenceImages(images[0].body)).toHaveLength(1);
        expect(requests).toHaveLength(0);
    });
});
