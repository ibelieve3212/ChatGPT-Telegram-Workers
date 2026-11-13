import type { WorkerContext } from '#/config';
import type { I18n } from '#/i18n';
import type * as Telegram from 'telegram-bot-api-types';
import { ENV } from '#/config';
import zhHans from '#/i18n/zh-hans';
import { knownCommands } from './index';
import { HelpCommandHandler } from './system';

// /help 里列出的每一条命令都必须真实存在: i18n 的 key 就是命令名,
// 曾经因为统一加 '/' 前缀, 把点号别名 .生图 显示成不存在的 '/生图'。

const mockSendMessage = jest.fn(async (_params?: any) => new Response(JSON.stringify({ ok: true, result: { message_id: 1 } }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
}));

jest.mock('@chatgpt-telegram-workers/plugins', () => ({
    executeRequest: jest.fn(),
    formatInput: jest.fn(),
}), { virtual: true });

jest.mock('../api', () => ({
    createTelegramBotAPI: () => ({
        sendMessage: (params: any) => mockSendMessage(params),
        sendRichMessage: jest.fn(async () => new Response('{}', { status: 404 })),
        editMessageText: jest.fn(async () => new Response('{}', { status: 404 })),
        deleteMessage: jest.fn(async () => new Response('{}', { status: 200 })),
    }),
}));

function createContext(): WorkerContext {
    return { SHARE_CONTEXT: { botToken: '42:token', botId: '42' } } as unknown as WorkerContext;
}

function helpMessage(): Telegram.Message {
    return {
        message_id: 1,
        date: 0,
        chat: { id: 111, type: 'private', first_name: 'u' },
        from: { id: 111, is_bot: false, first_name: 'me' },
        text: '/help',
    } as unknown as Telegram.Message;
}

async function renderHelp(i18n: I18n): Promise<{ text: string; names: string[] }> {
    ENV.I18N = i18n;
    mockSendMessage.mockClear();
    await new HelpCommandHandler().handle(helpMessage(), '', createContext());
    const text = mockSendMessage.mock.calls[0][0].text as string;
    const names = text.split('\n')
        .filter(line => /^[/.]/.test(line))
        .map(line => line.split('：')[0].split(':')[0]);
    return { text, names };
}

const realENV = ENV.I18N;

afterEach(() => {
    ENV.I18N = realENV;
});

it.each([
    ['中文', zhHans],
])('%s /help 只列出真实存在的命令', async (_label, i18n) => {
    const { text, names } = await renderHelp(i18n as I18n);
    expect(names.length).toBeGreaterThan(0);
    expect(names.filter(name => !knownCommands().has(name))).toEqual([]);
    // 点号别名按原样显示: .生图 存在, /生图 不存在
    expect(names).toContain('.生图');
    expect(names).not.toContain('/生图');
    expect(text).toContain('.生图');
});

it('英文 /help 也列出点号别名 .生图', async () => {
    const { names } = await renderHelp(realENV);
    expect(names.filter(name => !knownCommands().has(name))).toEqual([]);
    expect(names).toContain('.生图');
});

it('两种语言的 /help 列出的命令集合一致(不漏翻译)', async () => {
    const zh = await renderHelp(zhHans as I18n);
    const en = await renderHelp(realENV);
    expect(zh.names.sort()).toEqual(en.names.sort());
});
