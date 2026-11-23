import type * as Telegram from 'telegram-bot-api-types';
import { loadHistory } from '#/agent';
import { ENV, FEATURES } from '#/config';
import { clearMediaGroupCachesForTest } from '../chat/media-group';
import { clearReplyThreadCacheForTest } from '../chat/reply-thread';
import { listBotReplyGroups } from '../chat/replyGroup';
import { PENDING_TEXT } from '../pending';
import { handleUpdate } from './index';

// 从真实入口走到请求和发送器，仅替换外部网络与 KV；相册静默窗缩短以避免测试等待。
jest.mock('../chat/media-group', () => {
    const actual = jest.requireActual('../chat/media-group');
    return { ...actual, collectMediaGroup: (message: Telegram.Message, quietMs = 10, scope?: string) => actual.collectMediaGroup(message, quietMs, scope) };
});

const token = '42:paths';
const originalFetch = globalThis.fetch;
const defaults = structuredClone(ENV.USER_CONFIG);
let store: Map<string, string>;
let calls: { method: string; params: any }[];
let requests: any[];
let images: { url: string; body: any }[];
let visible: Map<number, any>;
let nextId: number;
let failDelete: boolean;
let failEdit: boolean;
let streams: string[] | null;
let model: ((body: any, index: number) => Promise<Response>) | null;
let telegram: ((method: string, params: any) => Promise<Response | null>) | null;

function json(body: any, status = 200): Response {
    return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
}
function answer(text = '模型答复'): Response {
    return json({ choices: [{ message: { content: text }, finish_reason: 'stop' }] });
}
function message(id: number, text?: string, type = 'private', extra: any = {}): Telegram.Message {
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
const context = () => ({ SHARE_CONTEXT: { chatHistoryKey: 'history:111:42' } }) as any;

beforeEach(() => {
    store = new Map();
    calls = [];
    requests = [];
    images = [];
    visible = new Map();
    nextId = 1000;
    failDelete = false;
    failEdit = false;
    streams = null;
    model = null;
    telegram = null;
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
            const body = JSON.parse(init.body);
            requests.push(body);
            if (model)
                return model(body, requests.length);
            if (streams) {
                const events = streams.map(content => `data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`).join('');
                return new Response(`${events}data: {"choices":[{"delta":{},"finish_reason":"stop"}]}\n\ndata: [DONE]\n\n`, { headers: { 'content-type': 'text/event-stream' } });
            }
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
        const override = await telegram?.(method, params);
        if (override)
            return override;
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
            if (failEdit)
                return json({ ok: false, description: 'Forbidden' }, 403);
            const result = { ...visible.get(params.message_id), ...params };
            visible.set(params.message_id, result);
            return json({ ok: true, result });
        }
        if (method === 'deleteMessage') {
            if (failDelete)
                return json({ ok: false, description: 'Too Many Requests', parameters: { retry_after: 30 } }, 429);
            visible.delete(params.message_id);
            return json({ ok: true, result: true });
        }
        if (method === 'deleteMessages') {
            params.message_ids.forEach((id: number) => visible.delete(id));
            return json({ ok: true, result: true });
        }
        return json({ ok: true, result: true });
    }) as typeof fetch;
});
afterEach(async () => {
    await new Promise(resolve => setTimeout(resolve, 5));
    globalThis.fetch = originalFetch;
});

describe.each(['private', 'supergroup'])('%s 完整消息路径', (type) => {
    const trigger = (text: string) => type === 'private' ? text : `.小助手 ${text}`;
    it('同消息并发重投只请求和占位一次', async () => {
        const m = message(1, trigger('问题'), type);
        await Promise.all([run(structuredClone(m)), run(structuredClone(m))]);
        expect(requests).toHaveLength(1);
        expect(pending()).toHaveLength(1);
    });
    it('相册在触发过滤和命令分流前合并，/chat 回复 bot 也只有一次请求', async () => {
        await Promise.all([
            run(photo(1, 'a', type, { media_group_id: 'chat', caption: '/chat\n比较两图', reply_to_message: bot(99, type) })),
            run(photo(2, 'b', type, { media_group_id: 'chat', reply_to_message: bot(99, type) })),
        ]);
        expect(requests).toHaveLength(1);
        expect(pending()).toHaveLength(1);
        expect(imageFiles()).toEqual(['a.jpg', 'b.jpg']);
    });
    it('普通带 caption 相册收齐后一次送出全部图片', async () => {
        await Promise.all([
            run(photo(1, 'a', type, { media_group_id: 'normal', caption: trigger('比较两图') })),
            run(photo(2, 'b', type, { media_group_id: 'normal' })),
        ]);
        expect(requests).toHaveLength(1);
        expect(imageFiles()).toEqual(['a.jpg', 'b.jpg']);
    });
    it('同相册迟到成员不重新路由', async () => {
        await run(photo(1, 'a', type, { media_group_id: 'late', caption: trigger('比较'), reply_to_message: bot(99, type) }));
        await run(photo(2, 'b', type, { media_group_id: 'late', reply_to_message: bot(99, type) }));
        expect(requests).toHaveLength(1);
        expect(pending()).toHaveLength(1);
    });
    it.each(['/img@paths_bot\n花', '.生图\t花'])('命令统一识别后缀和空白：%s', async (text) => {
        await run(message(1, text, type, { reply_to_message: bot(99, type) }));
        expect(images).toHaveLength(1);
        expect(requests).toHaveLength(0);
        expect(pending()).toHaveLength(1);
    });
    it('普通 bot 照片不误进生图模型，相册不会混走双路', async () => {
        const ref = photo(99, 'ordinary', type, { from: { id: 42, is_bot: true, first_name: 'bot' } });
        await Promise.all([
            run(photo(1, 'a', type, { media_group_id: 'bot-photo', caption: '分析图片', reply_to_message: ref })),
            run(photo(2, 'b', type, { media_group_id: 'bot-photo', reply_to_message: ref })),
        ]);
        expect(images).toHaveLength(0);
        expect(requests).toHaveLength(1);
        expect(pending()).toHaveLength(1);
    });
    it('生成图回复附带相册时，原图和当前整组一次交给编辑模型', async () => {
        store.set(`generated-image:42:${type === 'private' ? 111 : -100}:99`, '1');
        const ref = photo(99, 'generated', type, { from: { id: 42, is_bot: true, first_name: 'bot' } });
        await Promise.all([
            run(photo(1, 'a', type, { media_group_id: 'edit-group', caption: '合并这些图片', reply_to_message: ref })),
            run(photo(2, 'b', type, { media_group_id: 'edit-group', reply_to_message: ref })),
        ]);
        expect(images).toHaveLength(1);
        expect((images[0].body as FormData).getAll('image[]')).toHaveLength(3);
        expect(requests).toHaveLength(0);
        expect(pending()).toHaveLength(1);
    });
    it('真实生图结果可持久识别，回复编辑有且仅有一条占位', async () => {
        await run(message(1, '.生图 花', type));
        const resultId = calls.find(c => c.method === 'sendPhoto') && [...visible.keys()].at(-1)!;
        calls = [];
        images = [];
        const ref = photo(resultId!, 'generated', type, { from: { id: 42, is_bot: true, first_name: 'bot' } });
        await run(message(2, '改成蓝色', type, { reply_to_message: ref }));
        expect(images).toHaveLength(1);
        expect(images[0].url).toContain('/images/edits');
        expect(pending()).toHaveLength(1);
        expect(requests).toHaveLength(0);
    });
    it('引用文件图片与直接发送无 caption 的文件图片都能识图', async () => {
        const document = { file_id: 'doc', file_unique_id: 'doc', mime_type: 'image/png' };
        await run(message(1, trigger('分析文件图'), type, { reply_to_message: message(90, undefined, type, { document }) }));
        expect(imageFiles()).toEqual(['doc.jpg']);
        await run(message(2, undefined, type, { document, reply_to_message: bot(99, type) }));
        expect(requests).toHaveLength(2);
        expect(imageFiles()).toEqual(['doc.jpg']);
    });
    it('关掉历史后普通续聊不再回放旧图片或问答', async () => {
        await run(photo(1, 'old', type, { caption: trigger('旧问题') }));
        ENV.MAX_HISTORY_LENGTH = 0;
        await run(message(2, trigger('新问题'), type));
        expect(requests[1].messages).toEqual([{ role: 'system', content: 'system' }, { role: 'user', content: '新问题' }]);
    });
    it('发送失败的完整回答不进入下一轮历史', async () => {
        failEdit = true;
        const response = await run(message(1, trigger('未送达问题'), type));
        expect(response?.ok).toBe(false);
        failEdit = false;
        await run(message(2, trigger('新问题'), type));
        expect(requests[1].messages).toEqual([{ role: 'system', content: 'system' }, { role: 'user', content: '新问题' }]);
    });
    it('长流式只更新一条预览，最终正文不重复', async () => {
        ENV.STREAM_MODE = true;
        const text = Array.from({ length: 60 }, (_, i) => `段${i} ${'内容'.repeat(40)}`).join('\n\n');
        streams = [text, '\n末尾'.repeat(50)];
        await run(message(1, trigger('长回复'), type));
        expect(pending()).toHaveLength(1);
        expect([...visible.values()].filter(v => v.text.includes('段0 '))).toHaveLength(1);
        expect([...visible.values()].some(v => v.text === PENDING_TEXT)).toBe(false);
        for (let i = 0; i < 60; i++) expect([...visible.values()].filter(v => v.text.includes(`段${i} `))).toHaveLength(1);
    });
    it('相册 caption 位于第二张时，生图仍接管整组且不请求文字模型', async () => {
        await Promise.all([
            run(photo(1, 'a', type, { media_group_id: 'img', reply_to_message: bot(99, type) })),
            run(photo(2, 'b', type, { media_group_id: 'img', caption: '.生图 合并两图', reply_to_message: bot(99, type) })),
        ]);
        expect(images).toHaveLength(1);
        expect((images[0].body as FormData).getAll('image[]')).toHaveLength(2);
        expect(requests).toHaveLength(0);
        expect(pending()).toHaveLength(1);
    });
    it('命令指向其他 bot 时，即使回复本 bot 也不误进文字模型', async () => {
        await run(message(1, '/img@other_bot 花', type, { reply_to_message: bot(99, type) }));
        expect(requests).toHaveLength(0);
        expect(images).toHaveLength(0);
        expect(pending()).toHaveLength(0);
    });
    it('telegram HTTP 200 但 body.ok=false 仍不能保存幽灵问答', async () => {
        telegram = async method => method === 'editMessageText' ? json({ ok: false, description: 'Forbidden' }) : null;
        await run(message(1, trigger('未送达'), type));
        telegram = null;
        await run(message(2, trigger('新问题'), type));
        expect(requests[1].messages).toHaveLength(2);
    });
    it('正文成功但独立代码块失败时，不把未送达全文写入历史', async () => {
        model = async () => answer('说明文字\n\n```js\nconsole.log(1);\n```');
        telegram = async (method, params) => method === 'sendMessage' && params.text.includes('<pre>') ? json({ ok: false }, 403) : null;
        await run(message(1, trigger('要代码'), type));
        model = null;
        telegram = null;
        await run(message(2, trigger('新问题'), type));
        expect(requests[1].messages).toHaveLength(2);
    });
    it('拆分正文第二段失败时不从头重发，且下一轮不回放未送达全文', async () => {
        model = async () => answer(Array.from({ length: 70 }, (_, i) => `片${i} ${'内容'.repeat(40)}`).join('\n\n'));
        telegram = async (method, params) => method === 'sendMessage' && params.text !== PENDING_TEXT ? json({ ok: false }, 403) : null;
        await run(message(1, trigger('长回复'), type));
        expect([...visible.values()].filter(v => v.text.includes('片0 '))).toHaveLength(1);
        model = null;
        telegram = null;
        await run(message(2, trigger('新问题'), type));
        expect(requests[1].messages).toHaveLength(2);
    });
    it('本轮图片不被占位符替换，下一轮旧纯图片只发占位文字', async () => {
        ENV.HISTORY_IMAGE_PLACEHOLDER = '[旧图]';
        await run(photo(1, 'only', type, { reply_to_message: bot(99, type) }));
        expect(imageFiles()).toEqual(['only.jpg']);
        await run(message(2, trigger('继续'), type));
        expect(imageFiles()).toEqual([]);
        expect(JSON.stringify(requests[1].messages)).toContain('[旧图]');
    });
});

it('群聊开关关闭时，即使 generous 开启也停止完整处理链', async () => {
    ENV.GROUP_CHAT_BOT_ENABLE = false;
    await run(message(1, '.小助手 问题', 'supergroup'));
    expect(calls).toHaveLength(0);
    expect(requests).toHaveLength(0);
});
it('群聊未触发相册仍保持静默', async () => {
    await Promise.all([run(photo(1, 'a', 'supergroup', { media_group_id: 'silent', caption: '普通相册' })), run(photo(2, 'b', 'supergroup', { media_group_id: 'silent' }))]);
    expect(requests).toHaveLength(0);
    expect(images).toHaveLength(0);
    expect(pending()).toHaveLength(0);
});
it('链上超过四张图片时优先保留直接引用目标', async () => {
    for (let i = 0; i < 5; i++) await run(photo(i + 1, `chain-${i}`, 'supergroup', i ? { reply_to_message: photo(i, `chain-${i - 1}`, 'supergroup') } : {}));
    await run(message(6, '.小助手 分析这张', 'supergroup', { reply_to_message: photo(5, 'chain-4', 'supergroup') }));
    expect(imageFiles()).toContain('chain-4.jpg');
    expect(imageFiles()).toHaveLength(4);
});
it('有真实上游的相册引用也补齐整组', async () => {
    const ref = message(90, '上游说明');
    await Promise.all([run(photo(1, 'a', 'private', { media_group_id: 'thread', reply_to_message: ref })), run(photo(2, 'b', 'private', { media_group_id: 'thread', reply_to_message: ref }))]);
    await run(message(3, '分析相册', 'private', { reply_to_message: photo(2, 'b', 'private', { media_group_id: 'thread', reply_to_message: ref }) }));
    expect(imageFiles().sort()).toEqual(['a.jpg', 'b.jpg']);
});
it('失败清理的占位可由 /clear 找到，而不是成为孤儿消息', async () => {
    failDelete = true;
    await run(message(1, '.生图 花'));
    const id = [...visible.values()].find(v => v.text === PENDING_TEXT).message_id;
    expect((await listBotReplyGroups(context())).flat()).toContain(id);
    failDelete = false;
    await run(message(2, '/clear all'));
    expect(visible.has(id)).toBe(false);
});
it('/chat 不重复登记，/clear 2 清理两条不同的回答', async () => {
    await run(message(1, '/chat 甲'));
    await run(message(2, '/chat 乙'));
    expect(await listBotReplyGroups(context())).toEqual([[1001], [1002]]);
    await run(message(3, '/clear 2'));
    expect(calls.find(c => c.method === 'deleteMessages')?.params.message_ids).toEqual([1001, 1002]);
});
it('所有发送路径显式带论坛话题 ID', async () => {
    const extra = { chat: { id: -100, type: 'supergroup', is_forum: true }, is_topic_message: true, message_thread_id: 10 };
    await run(message(1, '.小助手 问题', 'supergroup', extra));
    await run(message(2, '/new', 'supergroup', extra));
    await run(message(3, '.生图 花', 'supergroup', extra));
    await run(message(4, '/models', 'supergroup', extra));
    await run(message(5, '/imgmodels', 'supergroup', extra));
    for (const call of calls.filter(c => ['sendMessage', 'sendPhoto'].includes(c.method))) expect(call.params.message_thread_id).toBe(10);
});
it('两轮倒序完成都保留清屏索引，clear 删除期间新增回复不丢失', async () => {
    let release!: () => void;
    let entered!: () => void;
    const gate = new Promise<void>((resolve) => {
        release = resolve;
    });
    const started = new Promise<void>((resolve) => {
        entered = resolve;
    });
    model = async (_, index) => {
        if (index === 1) {
            entered();
            await gate;
        }
        return answer(`回答${index}`);
    };
    const first = run(message(1, '问题甲'));
    await started;
    await run(message(2, '问题乙'));
    release();
    await first;
    expect((await listBotReplyGroups(context())).flat().sort()).toEqual([1001, 1002]);
    telegram = async (method) => {
        if (method === 'deleteMessages')
            await run(message(4, '清屏期间的新问题'));
        return null;
    };
    await run(message(3, '/clear all'));
    expect(await listBotReplyGroups(context())).toEqual([[1003]]);
    expect(visible.has(1003)).toBe(true);
});
it('命令长回复所有分段都归同一组，可回复任一段清屏', async () => {
    // 用 /help 生成长说明，验证非聊天命令内创建的发送器也能完整登记。
    for (let i = 0; i < 100; i++) ENV.CUSTOM_COMMAND[`/help_test_${i}`] = { value: '/help', description: '帮助说明'.repeat(20) };
    try {
        await run(message(1, '/help'));
        expect(visible.size).toBeGreaterThan(1);
        expect(await listBotReplyGroups(context())).toEqual([[...visible.keys()]]);
        const id = [...visible.keys()].at(-1)!;
        await run(message(2, '/clear', 'private', { reply_to_message: bot(id) }));
        expect(visible.size).toBe(0);
    } finally {
        for (let i = 0; i < 100; i++) delete ENV.CUSTOM_COMMAND[`/help_test_${i}`];
    }
});
it('匿名群管理员不会被其他 bot 过滤器提前拦截', async () => {
    await run(message(1, '.小助手 问题', 'supergroup', { from: { id: 1087968824, is_bot: true, first_name: '匿名管理' } }));
    expect(requests).toHaveLength(1);
    await run(message(2, '/clear all', 'supergroup', { from: { id: 1087968824, is_bot: true, first_name: '匿名管理' } }));
    expect(visible.size).toBe(0);
});
it('迟到的 caption 可首次触发此前无字素材相册，但之后不重跑', async () => {
    await run(photo(1, 'a', 'supergroup', { media_group_id: 'late-caption' }));
    expect(requests).toHaveLength(0);
    await run(photo(2, 'b', 'supergroup', { media_group_id: 'late-caption', caption: '.小助手 比较' }));
    expect(requests).toHaveLength(1);
    expect(imageFiles().sort()).toEqual(['a.jpg', 'b.jpg']);
    await run(photo(3, 'c', 'supergroup', { media_group_id: 'late-caption', reply_to_message: bot(99, 'supergroup') }));
    expect(requests).toHaveLength(1);
    expect(pending()).toHaveLength(1);
});
it('生图 caption 比 /chat 更优先，整组不能分流到两个模型', async () => {
    await Promise.all([
        run(photo(1, 'a', 'private', { media_group_id: 'two-commands', caption: '/chat 比较' })),
        run(photo(2, 'b', 'private', { media_group_id: 'two-commands', caption: '.生图 合并' })),
    ]);
    expect(images).toHaveLength(1);
    expect(requests).toHaveLength(0);
    expect((images[0].body as FormData).getAll('image[]')).toHaveLength(2);
});
it('已有图片历史后再启用占位符，也不回放此前真实图片', async () => {
    await run(photo(1, 'old', 'private', { caption: '旧问题' }));
    ENV.HISTORY_IMAGE_PLACEHOLDER = '[旧图]';
    await run(message(2, '继续'));
    expect(imageFiles()).toEqual([]);
    expect(JSON.stringify(requests[1].messages)).toContain('[旧图]');
});
it.each(['2x', '1.5', '0', '9007199254740992'])('clear 拒绝非正安全整数 %s 且不重置历史', async (args) => {
    await run(message(1, '原问题'));
    await run(message(2, `/clear ${args}`));
    expect(calls.some(c => c.method === 'deleteMessages')).toBe(false);
    expect(await loadHistory('history:111:42', 'private')).toHaveLength(2);
});
it('关闭 SAFE_MODE 也不能让正常相册双路执行', async () => {
    ENV.SAFE_MODE = false;
    await Promise.all([
        run(photo(1, 'a', 'private', { media_group_id: 'safe-off', caption: '/chat 比较' })),
        run(photo(2, 'b', 'private', { media_group_id: 'safe-off' })),
    ]);
    expect(requests).toHaveLength(1);
    expect(imageFiles()).toEqual(['a.jpg', 'b.jpg']);
});
it('相册只写一次认领，持久化失败后可重试且不启动模型', async () => {
    const put = ENV.DATABASE.put;
    const writes: string[] = [];
    ENV.DATABASE.put = async (key, value, options) => {
        if (key.startsWith('processed-album:')) {
            writes.push(key);
            if (writes.length === 1) {
                throw new Error('模拟认领写失败');
            }
        }
        return put(key, value, options);
    };
    const input = photo(1, 'a', 'private', { media_group_id: 'claim-retry', caption: '/chat 看图' });
    expect((await run(structuredClone(input)))?.status).toBe(500);
    expect(requests).toHaveLength(0);
    expect(pending()).toHaveLength(0);
    await run(structuredClone(input));
    expect(requests).toHaveLength(1);
    expect(writes).toHaveLength(2);
    expect([...store.keys()].some(key => key.startsWith('processed:'))).toBe(false);
});
it('普通私聊默认仍正常续聊', async () => {
    await run(message(1, '问题甲'));
    await run(message(2, '继续'));
    expect(requests[1].messages).toHaveLength(4);
    expect(await loadHistory('history:111:42', 'private')).toHaveLength(4);
});
