import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import { loadHistory } from '#/agent';
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

let nextMessageId = 1000;
const mockSendMessage = jest.fn(async (params: any) => new Response(JSON.stringify({
    ok: true,
    result: { message_id: ++nextMessageId, text: params?.text || '' },
}), { status: 200, headers: { 'content-type': 'application/json' } }));

const mockEditMessageText = jest.fn(async (params: any) => new Response(JSON.stringify({
    ok: true,
    result: { message_id: params.message_id, text: params?.text || '' },
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
        listKeys: async (prefix: string): Promise<string[]> => [...store.keys()].filter(key => key.startsWith(prefix)),
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
const mockAnswers: string[] = [];
const defaultExtraMessageContext = ENV.EXTRA_MESSAGE_CONTEXT;

beforeEach(() => {
    clearMediaGroupCachesForTest();
    nextMessageId = 1000;
    mockAnswers.length = 0;
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
                choices: [{ message: { content: mockAnswers.shift() ?? '模型回答' }, finish_reason: 'stop' }],
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

    it('同名相册按 bot 和 chat 隔离，不回退到其他作用域', () => {
        recordMediaGroupImages('same', ['unscoped']);
        recordMediaGroupImages('same', ['bot42-chat111'], 111, 42);
        recordMediaGroupImages('same', ['bot43-chat111'], 111, 43);
        recordMediaGroupImages('same', ['bot42-chat222'], 222, 42);
        expect(getMediaGroupImageFileIds('same', 111, 42)).toEqual(['bot42-chat111']);
        expect(getMediaGroupImageFileIds('same', 111, 43)).toEqual(['bot43-chat111']);
        expect(getMediaGroupImageFileIds('same', 222, 42)).toEqual(['bot42-chat222']);
        expect(getMediaGroupImageFileIds('same', 333, 42)).toBeNull();
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
        expect(getMediaGroupImageFileIds('g4', 111, 42)).toEqual(['file_1', 'file_2', 'file_3']);
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
        recordMediaGroupImages('g7', ['file_1', 'file_2', 'file_3'], 111, 42);
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

    async function ask(message: Telegram.Message): Promise<Telegram.Message> {
        await expect(new GroupMention().handle(message, context)).resolves.toBeNull();
        const response = await handler.handle(message, context);
        const { result } = await response!.json() as Telegram.ResponseWithMessage;
        return groupMessage(result.message_id, { from: bot, text: result.text });
    }

    it('回复单张图只发被引用的图和本轮问题，追问也不回放旧图', async () => {
        const referenced = groupMessage(20, { photo: [...photo('small'), ...photo('selected')] });
        const answer = await ask(groupMessage(21, { text: '.小助手 这张图里有什么？', reply_to_message: referenced }));

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

        const storedHistory = await loadHistory(historyKey, context.SHARE_CONTEXT.chatType);
        expect(storedHistory.slice(0, oldHistory.length)).toEqual(oldHistory);
        expect(storedHistory.slice(oldHistory.length)).toEqual([
            expect.objectContaining({
                role: 'user',
                content: [
                    current.content[0],
                    { type: 'image', image: 'https://api.telegram.org/file/bot42:token/photos/selected.jpg' },
                ],
            }),
            { role: 'assistant', content: '模型回答' },
        ]);

        await ask(groupMessage(23, { text: '再详细一点', reply_to_message: answer }));
        expect(llmBodies).toHaveLength(2);
        expect(llmBodies[1].messages).toEqual([
            { role: 'system', content: 'system' },
            current,
            { role: 'assistant', content: '模型回答' },
            { role: 'user', content: '再详细一点' },
        ]);
    });

    it('同一会话不清历史，引用 CAD 回答时只沿 CAD 分支续聊', async () => {
        const cadText = 'Linux 可用 CAD 替代品。\nAutoCAD 原生体验有差距。';
        mockAnswers.push('sing-box 和 Mihomo 各有优缺点。', cadText, '另一个话题的回答', '解释 CAD 的兼容性');
        await ask(groupMessage(10, { text: '.小助手 sing-box 和 Mihomo 的区别？' }));
        const root = groupMessage(20, { text: 'Linux 有 CAD 和 Office 吗？' });
        const cadQuestion = groupMessage(21, { text: '主要想了解 AutoCAD 和 SolidWorks', reply_to_message: root });
        recordChatMessage(root);
        recordChatMessage(cadQuestion);
        const cadAnswer = await ask(groupMessage(22, {
            text: '.小助手',
            reply_to_message: { ...cadQuestion, reply_to_message: undefined },
        }));
        const cadTurn = [llmBodies[1].messages[1], { role: 'assistant', content: cadText }];
        expect(llmBodies[1].messages).toHaveLength(2);
        expect(cadTurn[0].content).toContain(root.text);
        expect(cadTurn[0].content).toContain(cadQuestion.text);

        await ask(groupMessage(30, { text: '.小助手 换个话题，推荐一台显示器' }));
        // 没有引用仍按会话历史续聊；测试不靠 /new、闲时重置或清掉旧问答来过关。
        expect(llmBodies[2].messages).toContainEqual({ role: 'assistant', content: 'sing-box 和 Mihomo 各有优缺点。' });
        const quote = 'AutoCAD 原生体验有差距。';
        const followup = await ask(groupMessage(31, {
            text: '🤔',
            quote: { text: quote, position: cadText.indexOf(quote), is_manual: true },
            reply_to_message: cadAnswer,
        }));
        const followupText = { role: 'user', content: `🤔\n\n[引用原文]\n${quote}` };
        expect(llmBodies[3].messages).toEqual([{ role: 'system', content: 'system' }, ...cadTurn, followupText]);
        // 另一个回复分支不能插进这条链。
        await ask(groupMessage(32, { text: 'Office 呢？', reply_to_message: cadAnswer }));
        await ask(groupMessage(33, { text: '再举个例子', reply_to_message: followup }));
        expect(llmBodies[5].messages).toEqual([
            { role: 'system', content: 'system' }, ...cadTurn, followupText,
            { role: 'assistant', content: '解释 CAD 的兼容性' },
            { role: 'user', content: '再举个例子' },
        ]);
        expect(await loadHistory(historyKey, context.SHARE_CONTEXT.chatType)).toContainEqual({
            role: 'assistant',
            content: 'sing-box 和 Mihomo 各有优缺点。',
        });
    });

    it('找不到旧版回复对应的历史时，只用 Telegram 的原文', async () => {
        const oldReply = groupMessage(20, { from: bot, text: '这里是 Telegram 还看得到的旧回复' });
        await ask(groupMessage(21, { text: '这句是什么意思？', reply_to_message: oldReply }));
        expect(llmBodies[0].messages).toEqual([
            { role: 'system', content: 'system' },
            { role: 'user', content: `这句是什么意思？\n\n[回复的机器人消息]\n${oldReply.text}` },
        ]);
    });

    it('/chat 带选中引文时，不用未选中的整条回答兜底', async () => {
        ENV.EXTRA_MESSAGE_CONTEXT = false;
        const quote = '用户选中的段落';
        const oldReply = groupMessage(20, { from: bot, text: `未选中的段落\n${quote}` });
        const message = groupMessage(21, {
            text: '/chat 这句呢？',
            reply_to_message: oldReply,
            quote: { text: quote, position: oldReply.text!.indexOf(quote), is_manual: true },
        });
        await new CommandHandler().handle(message, context);
        expect(llmBodies[0].messages).toEqual([
            { role: 'system', content: 'system' },
            { role: 'user', content: `这句呢？\n\n[引用原文]\n${quote}` },
        ]);
    });

    it('已裁剪的问答只用 Telegram 的回复原文，不借用最近一轮', async () => {
        ENV.MAX_HISTORY_LENGTH = 2;
        mockAnswers.push('已裁剪的答复', '最近一轮的答复');
        const oldReply = await ask(groupMessage(20, { text: '.小助手 旧问题' }));
        await ask(groupMessage(21, { text: '.小助手 新问题' }));
        await ask(groupMessage(22, { text: '详细解释', reply_to_message: oldReply }));
        expect(llmBodies[2].messages).toEqual([
            { role: 'system', content: 'system' },
            { role: 'user', content: '详细解释\n\n[回复的机器人消息]\n已裁剪的答复' },
        ]);
    });

    it('回复被拆出来的代码块时，仍定位到原来那轮问答', async () => {
        const answerText = '示例正文\n\n```sh\necho hello\n```';
        mockAnswers.push(answerText);
        await ask(groupMessage(20, { text: '.小助手 给个示例' }));
        const codeCall = mockSendMessage.mock.calls.findIndex(([params]) => params.text.includes('<pre>'));
        expect(codeCall).toBeGreaterThanOrEqual(0);
        const { result } = await (await mockSendMessage.mock.results[codeCall].value).clone().json() as Telegram.ResponseWithMessage;
        expect(result.text).toContain('echo hello');
        await ask(groupMessage(21, {
            text: '这段能怎么改？',
            reply_to_message: groupMessage(result.message_id, { from: bot, text: 'echo hello' }),
        }));
        expect(llmBodies[1].messages).toEqual([
            { role: 'system', content: 'system' },
            { role: 'user', content: '给个示例' },
            { role: 'assistant', content: answerText },
            { role: 'user', content: '这段能怎么改？' },
        ]);
    });

    it('回复相册时仍能带上同组图片，不带会话历史的图片', async () => {
        recordMediaGroupImages('quoted-album', ['album-1', 'album-2'], -100, 42);
        const referenced = groupMessage(20, { media_group_id: 'quoted-album', photo: photo('album-2') });
        await handler.handle(groupMessage(21, { text: '比较这几张图', reply_to_message: referenced }), context);

        expect(llmBodies).toHaveLength(1);
        expect(llmBodies[0].messages).toEqual([
            { role: 'system', content: 'system' },
            {
                role: 'user',
                content: [
                    { type: 'text', text: '比较这几张图' },
                    ...['album-2', 'album-1'].map(id => ({
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

    it('引用群友讨论中选中的一段，保留上游发言但不替换成整条原文', async () => {
        const root = groupMessage(10, { text: '电脑开不了机' });
        const quote = '电源指示灯不亮';
        const referenced = groupMessage(11, { text: `${quote}，显示器是新的`, reply_to_message: root });
        await ask(groupMessage(12, {
            text: '.小助手 这说明什么？',
            reply_to_message: referenced,
            quote: { text: quote, position: 0, is_manual: true },
        }));
        expect(llmBodies[0].messages).toEqual([
            { role: 'system', content: 'system' },
            {
                role: 'user',
                content: `这说明什么？\n[引用讨论串, 按时间从早到晚]\n用户: ${root.text}\n用户（引用原文）: ${quote}`,
            },
        ]);
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

    function pauseNextModelRequest() {
        let reached!: () => void;
        let release!: () => void;
        const started = new Promise<void>((resolve) => {
            reached = resolve;
        });
        const wait = new Promise<void>((resolve) => {
            release = resolve;
        });
        const fetchMock = jest.mocked(globalThis.fetch);
        const fetchImpl = fetchMock.getMockImplementation()!;
        fetchMock.mockImplementationOnce(async (...args) => {
            const result = await fetchImpl(...args);
            reached();
            await wait;
            return result;
        });
        return { started, release };
    }

    it('两条问答并发且倒序完成时，历史和两个回复链接都保留', async () => {
        mockAnswers.push('第一轮的答复', '第二轮的答复');
        const gate = pauseNextModelRequest();
        const first = ask(groupMessage(20, { text: '.小助手 第一个问题' }));
        await gate.started;
        const secondAnswer = await ask(groupMessage(21, { text: '.小助手 第二个问题' }));
        gate.release();
        const firstAnswer = await first;

        await ask(groupMessage(22, { text: '.小助手 继续聊' }));
        expect(llmBodies[2].messages.slice(-5)).toEqual([
            { role: 'user', content: '第一个问题' },
            { role: 'assistant', content: '第一轮的答复' },
            { role: 'user', content: '第二个问题' },
            { role: 'assistant', content: '第二轮的答复' },
            { role: 'user', content: '继续聊' },
        ]);
        for (const [id, answer, prompt, response] of [
            [23, firstAnswer, '第一个问题', '第一轮的答复'],
            [24, secondAnswer, '第二个问题', '第二轮的答复'],
        ] as const) {
            await ask(groupMessage(id, { text: '展开说说', reply_to_message: answer }));
            expect(llmBodies.at(-1).messages).toEqual([
                { role: 'system', content: 'system' },
                { role: 'user', content: prompt },
                { role: 'assistant', content: response },
                { role: 'user', content: '展开说说' },
            ]);
        }
    });

    it('/new 之后旧请求迟到也不会恢复旧历史或覆盖新问答', async () => {
        mockAnswers.push('旧请求迟到的答复', '新会话的答复');
        const gate = pauseNextModelRequest();
        const pending = ask(groupMessage(20, { text: '.小助手 重置前的提问' }));
        await gate.started;
        await new CommandHandler().handle(groupMessage(21, { text: '/new' }), context);
        await ask(groupMessage(22, { text: '.小助手 重置后的提问' }));
        gate.release();
        await pending;

        await ask(groupMessage(23, { text: '.小助手 继续聊' }));
        expect(llmBodies.at(-1).messages).toEqual([
            { role: 'system', content: 'system' },
            { role: 'user', content: '重置后的提问' },
            { role: 'assistant', content: '新会话的答复' },
            { role: 'user', content: '继续聊' },
        ]);
    });

    it('/clear all 没有回复索引时也能重置，不让在途问答复活历史', async () => {
        ENV.ADMIN_USER_IDS = [String(user.id)];
        ENV.CLEAR_ALSO_RESETS_HISTORY = true;
        mockAnswers.push('屏幕清理前的答复');
        const gate = pauseNextModelRequest();
        const pending = ask(groupMessage(20, { text: '.小助手 清理前的问题' }));
        await gate.started;
        expect(await ENV.DATABASE.get(`bot_reply_group:${historyKey}`)).toBeNull();
        const response = await new CommandHandler().handle(groupMessage(21, { text: '/clear all' }), context);
        expect(response?.ok).toBe(true);
        expect(mockSendMessage).toHaveBeenCalledTimes(1); // 只有原问题的占位，清理成功不额外发消息
        gate.release();
        await pending;

        await ask(groupMessage(22, { text: '.小助手 新话题' }));
        expect(llmBodies.at(-1).messages).toEqual([
            { role: 'system', content: 'system' },
            { role: 'user', content: '新话题' },
        ]);
    });

    it('/new 清除历史和问答链接，仍可引用聊天里看得见的旧答复', async () => {
        mockAnswers.push('重置前的答复');
        const oldReply = await ask(groupMessage(19, { text: '.小助手 重置前的问题' }));
        const response = await new CommandHandler().handle(groupMessage(20, { text: '/new' }), context);
        expect(response?.ok).toBe(true);
        expect(await ENV.DATABASE.get(historyKey)).toBeNull();

        await ask(groupMessage(21, { text: '.小助手 换一个话题' }));
        await ask(groupMessage(22, { text: '解释这段', reply_to_message: oldReply }));
        expect(llmBodies.map(body => body.messages).slice(1)).toEqual([
            [
                { role: 'system', content: 'system' },
                { role: 'user', content: '换一个话题' },
            ],
            [
                { role: 'system', content: 'system' },
                { role: 'user', content: '解释这段\n\n[回复的机器人消息]\n重置前的答复' },
            ],
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
