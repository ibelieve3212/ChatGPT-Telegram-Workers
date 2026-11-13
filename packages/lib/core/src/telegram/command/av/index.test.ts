import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import { ENV } from '#/config';
import { AvCommandHandler } from './index';

// 验证 /av 命令的骨架行为(不回真的网络: 数据层整体 mock):
// - 帮助/没看懂/找不到 都走纯文本；
// - 卡片优先用封面图 + HTML 说明, 封面全挂时退化为纯文本卡片；
// - ed2k 段塞不进 1024 字说明时单独发一条；
// - AV_DELETE_COMMAND 打开时删掉命令消息。

const mockSendPhoto = jest.fn(async (_params?: any) => new Response(JSON.stringify({ ok: true, result: { message_id: 500 } }), { status: 200 }));
const mockSendMessage = jest.fn(async (_params?: any) => new Response(JSON.stringify({ ok: true, result: { message_id: 501 } }), { status: 200 }));
const mockDeleteMessage = jest.fn(async (_params?: any) => new Response(JSON.stringify({ ok: true, result: true }), { status: 200 }));

jest.mock('../../api', () => ({
    createTelegramBotAPI: () => ({
        sendPhoto: mockSendPhoto,
        sendMessage: mockSendMessage,
        deleteMessage: mockDeleteMessage,
        sendRichMessage: jest.fn(async () => new Response('{}', { status: 404 })),
        editMessageText: jest.fn(async () => new Response('{}', { status: 404 })),
    }),
}));

const mockLoadLibrary = jest.fn((): Promise<any> => Promise.resolve(null as any));
const mockFillLuckyPool = jest.fn((library: any) => library);
const mockFetchDetail = jest.fn((_videoId: number) => Promise.resolve({ duration: 130 }));
const mockFetchSynopsis = jest.fn((_code: string) => Promise.resolve<string | null>('中文剧情一句。'));

jest.mock('./data', () => {
    const actual = jest.requireActual('./data');
    return {
        ...actual,
        loadLibrary: (() => mockLoadLibrary()) as any,
        fillLuckyPool: ((library: any) => mockFillLuckyPool(library)) as any,
        fetchDetail: ((videoId: number) => mockFetchDetail(videoId)) as any,
        fetchSynopsis: ((code: string) => mockFetchSynopsis(code)) as any,
    };
});

function makeVideo(partial: Record<string, any> = {}) {
    return {
        videoId: 22,
        code: 'MIAB-317',
        title: '辍学宅男诱惑',
        score: 812,
        rating: 4.6,
        ratingCount: 1203,
        coverUrl: 'https://javranking.cc/video/cover/22.webp',
        releaseDate: '2024-09-17',
        year: 2024,
        scope: 'uncensored',
        tags: ['巨乳'],
        rankingAppearances: [],
        actorLinks: [{ name: '森日向子', gender: 'female' }],
        ...partial,
    };
}

function makeLibrary(videos: any[]) {
    return {
        videos,
        categories: new Map([[1, { id: 1, name: '巨乳' }]]),
        years: [2024],
        luckyIds: new Set(),
        durations: new Map(),
    };
}

function createContext(): WorkerContext {
    return {
        USER_CONFIG: {},
        SHARE_CONTEXT: { botToken: '42:token', botId: 42, chatHistoryKey: 'history:111:42', chatType: 'private' },
    } as unknown as WorkerContext;
}

function commandMessage(text: string): Telegram.Message {
    return {
        message_id: 100,
        date: 0,
        chat: { id: 111, type: 'private', first_name: 'u' },
        from: { id: 111, is_bot: false, first_name: 'me' },
        text,
    } as unknown as Telegram.Message;
}

beforeEach(() => {
    mockSendPhoto.mockClear();
    mockSendMessage.mockClear();
    mockDeleteMessage.mockClear();
    mockLoadLibrary.mockReset();
    mockFetchDetail.mockClear();
    mockFetchSynopsis.mockClear();
    ENV.AV_DELETE_COMMAND = true;
    ENV.AV_SPOILER = true;
    ENV.AV_SYNOPSIS = true;
});

describe('avCommandHandler', () => {
    it('命令名与菜单范围', () => {
        const handler = new AvCommandHandler();
        expect(handler.command).toBe('/av');
        expect(handler.scopes).toEqual(['all_private_chats', 'all_group_chats']);
    });

    it('帮助只发文本, 不拉数据', async () => {
        const resp = await new AvCommandHandler().handle(commandMessage('/av 帮助'), '帮助', createContext());
        expect(resp.status).toBe(200);
        expect(mockLoadLibrary).not.toHaveBeenCalled();
        expect(mockSendMessage.mock.calls[0][0].text).toContain('今天冲哪个');
    });

    it('认不出的词提示没看懂', async () => {
        mockLoadLibrary.mockResolvedValue(makeLibrary([makeVideo()]));
        await new AvCommandHandler().handle(commandMessage('/av ZZZZ-999'), 'ZZZZ-999', createContext());
        expect(mockSendPhoto).not.toHaveBeenCalled();
        expect(mockSendMessage.mock.calls[0][0].text).toContain('没看懂');
    });

    it('默认推荐: 封面 + HTML 说明 + 剧透遮挡', async () => {
        mockLoadLibrary.mockResolvedValue(makeLibrary([makeVideo()]));
        await new AvCommandHandler().handle(commandMessage('/av'), '', createContext());
        const params = mockSendPhoto.mock.calls[0][0];
        expect(params.photo).toBe('https://static.javranking.cc/video/cover/22.webp');
        expect(params.parse_mode).toBe('HTML');
        expect(params.has_spoiler).toBe(true);
        expect(params.caption).toContain('MIAB-317');
        expect(params.caption).toContain('⏱ 130 分钟');
        expect(params.caption).toContain('📖 中文剧情一句。');
    });

    it('番号直查走 findVideos', async () => {
        mockLoadLibrary.mockResolvedValue(makeLibrary([makeVideo(), makeVideo({ videoId: 33, code: 'MIAB-400', score: 100 })]));
        await new AvCommandHandler().handle(commandMessage('/av miab-317'), 'miab-317', createContext());
        expect(mockSendPhoto.mock.calls[0][0].caption).toContain('MIAB-317');
    });

    it('封面全挂时退化为纯文本卡片', async () => {
        mockLoadLibrary.mockResolvedValue(makeLibrary([makeVideo()]));
        mockSendPhoto.mockImplementationOnce(async () => new Response('{"ok":false}', { status: 400 }));
        mockSendPhoto.mockImplementationOnce(async () => new Response('{"ok":false}', { status: 400 }));
        mockSendPhoto.mockImplementationOnce(async () => new Response('{"ok":false}', { status: 400 }));
        mockSendPhoto.mockImplementationOnce(async () => new Response('{"ok":false}', { status: 400 }));
        mockSendPhoto.mockImplementationOnce(async () => new Response('{"ok":false}', { status: 400 }));
        await new AvCommandHandler().handle(commandMessage('/av'), '', createContext());
        const text = mockSendMessage.mock.calls[0][0].text;
        expect(text).toContain('MIAB-317');
        expect(text).toContain('<a href=');
    });

    it('ed2k 塞得下就跟着卡片一起发', async () => {
        mockLoadLibrary.mockResolvedValue(makeLibrary([makeVideo({ code: '1KRMV-279' })]));
        await new AvCommandHandler().handle(commandMessage('/av'), '', createContext());
        expect(mockSendMessage).not.toHaveBeenCalled();
        expect(mockSendPhoto.mock.calls[0][0].caption).toContain('📥 LTX 资源');
    });

    it('找不到时给提示而不是报错', async () => {
        mockLoadLibrary.mockResolvedValue(makeLibrary([makeVideo({ scope: 'fc2' })]));
        await new AvCommandHandler().handle(commandMessage('/av 无码'), '无码', createContext());
        expect(mockSendMessage.mock.calls[0][0].text).toContain('没找到');
    });

    it('发完删掉命令消息', async () => {
        mockLoadLibrary.mockResolvedValue(makeLibrary([makeVideo()]));
        await new AvCommandHandler().handle(commandMessage('/av'), '', createContext());
        expect(mockDeleteMessage).toHaveBeenCalledWith({ chat_id: 111, message_id: 100 });
    });

    it('关掉 AV_DELETE_COMMAND 就不删', async () => {
        ENV.AV_DELETE_COMMAND = false;
        mockLoadLibrary.mockResolvedValue(makeLibrary([makeVideo()]));
        await new AvCommandHandler().handle(commandMessage('/av'), '', createContext());
        expect(mockDeleteMessage).not.toHaveBeenCalled();
    });
});
