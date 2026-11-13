import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import { ENV } from '#/config';
import { GenerateImageCommandHandler, ImgCommandHandler } from './system';

// 验证「回复一张图片 + .生图 指令」= 带图改图(图生图):
// - 有底图走 /images/edits, prompt 为命令后的文字;
// - 不回复图片时保持纯文生图(/images/generations);
// - 命令是明确意图, 不限制图片来源(别人发的图也可以)。

const MINIMAL_JPEG_B64 = Buffer.from([
    0xFF,
    0xD8,
    0xFF,
    0xE0,
    0x00,
    0x10,
    0x4A,
    0x46,
    0x49,
    0x46,
    0x00,
    0x01,
    0xFF,
    0xD9,
]).toString('base64');

const mockSendPhoto = jest.fn(async (_params?: any) => new Response(JSON.stringify({
    ok: true,
    result: { message_id: 500 },
}), { status: 200, headers: { 'content-type': 'application/json' } }));

const mockSendMessage = jest.fn(async (params: any) => new Response(JSON.stringify({
    ok: true,
    result: { message_id: 501, text: params?.text || '' },
}), { status: 200, headers: { 'content-type': 'application/json' } }));

const mockGetFile = jest.fn(async (params: any) => ({
    result: { file_path: `photos/${params.file_id}.jpg` },
}));

jest.mock('../api', () => ({
    createTelegramBotAPI: () => ({
        sendPhoto: mockSendPhoto,
        sendMessage: mockSendMessage,
        sendRichMessage: jest.fn(async () => new Response('{}', { status: 404 })),
        editMessageText: jest.fn(async () => new Response('{}', { status: 404 })),
        deleteMessage: jest.fn(async () => new Response('{}', { status: 200 })),
        getFileWithReturns: mockGetFile,
    }),
}));

const fetchMock = jest.fn();

function createContext(): WorkerContext {
    return {
        USER_CONFIG: {
            IMAGE_API_BASE: 'https://img.example.com/v1',
            IMAGE_API_KEY: 'test-key',
            IMAGE_MODEL: 'gpt-image-2',
            IMAGE_SIZE: '1024x1024',
        },
        SHARE_CONTEXT: { botToken: '42:token', botId: 42, chatHistoryKey: 'history:111:42', chatType: 'private' },
    } as unknown as WorkerContext;
}

function imageMessage(messageId: number, fromId: number, fileIds: string[]): Telegram.Message {
    return {
        message_id: messageId,
        date: 0,
        chat: { id: 111, type: 'private', first_name: 'u' },
        from: { id: fromId, is_bot: fromId === 42, first_name: fromId === 42 ? 'bot' : 'user' },
        photo: fileIds.map((fileId, i) => ({
            file_id: fileId,
            file_unique_id: `u-${fileId}`,
            width: 320 * (i + 1),
            height: 240 * (i + 1),
        })),
    } as unknown as Telegram.Message;
}

// 命令也可以写在图片的 caption 里(带图发 `.生图`), 覆盖率需要和 text 一致
function captionCommandMessage(caption: string): Telegram.Message {
    return {
        message_id: 101,
        date: 0,
        chat: { id: 111, type: 'private', first_name: 'u' },
        from: { id: 111, is_bot: false, first_name: 'me' },
        caption,
        photo: [{ file_id: 'file_caption', file_unique_id: 'u-caption', width: 90, height: 90 }],
    } as unknown as Telegram.Message;
}
function commandMessage(text: string, referenced: Telegram.Message | null): Telegram.Message {
    return {
        message_id: 100,
        date: 0,
        chat: { id: 111, type: 'private', first_name: 'u' },
        from: { id: 111, is_bot: false, first_name: 'me' },
        text,
        ...(referenced ? { reply_to_message: referenced } : {}),
    } as unknown as Telegram.Message;
}

function editCalls(): any[] {
    return fetchMock.mock.calls.filter(([url]: any[]) => String(url).includes('/images/edits'));
}

function generationCalls(): any[] {
    return fetchMock.mock.calls.filter(([url]: any[]) => String(url).includes('/images/generations'));
}

function stickerMessage(messageId: number, fileId: string, opts: { is_animated?: boolean; is_video?: boolean } = {}): Telegram.Message {
    return {
        message_id: messageId,
        date: 0,
        chat: { id: 111, type: 'private', first_name: 'u' },
        from: { id: 999, is_bot: false, first_name: 'user' },
        sticker: {
            file_id: fileId,
            file_unique_id: `u-${fileId}`,
            type: 'regular',
            width: 512,
            height: 512,
            is_animated: !!opts.is_animated,
            is_video: !!opts.is_video,
            emoji: '😀',
        },
    } as unknown as Telegram.Message;
}

beforeEach(() => {
    mockSendPhoto.mockClear();
    mockSendMessage.mockClear();
    mockGetFile.mockClear();
    fetchMock.mockReset();
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    ENV.TELEGRAM_API_DOMAIN = 'https://api.telegram.org';
    ENV.RICH_MESSAGE_MODE = false;
    fetchMock.mockImplementation(async (input: any) => {
        const url = String(typeof input === 'string' ? input : input.url);
        if (url.includes('/images/edits') || url.includes('/images/generations')) {
            return new Response(JSON.stringify({ data: [{ b64_json: MINIMAL_JPEG_B64 }] }), {
                status: 200,
                headers: { 'content-type': 'application/json' },
            });
        }
        // Telegram 文件下载
        return new Response(new Uint8Array([0xFF, 0xD8, 0xFF, 0xE0]), {
            headers: { 'content-type': 'image/jpeg' },
        });
    });
});

describe('imgCommandHandler 回复图片 + 指令 = 带图改图', () => {
    it('回复用户图片 + ".生图 去掉汽车" → 带图编辑', async () => {
        const message = commandMessage('.生图 去掉汽车', imageMessage(50, 999, ['file_small', 'file_large']));
        const result = await new ImgCommandHandler().handle(message, '去掉汽车', createContext());

        expect(result).not.toBeNull();
        expect(editCalls().length).toBe(1);
        expect(generationCalls().length).toBe(0);
        const form = editCalls()[0][1].body as FormData;
        expect(form.get('prompt')).toBe('去掉汽车');
        expect(form.get('image')).not.toBeNull();
        // 默认取最大档位/原件
        expect(mockGetFile.mock.calls[0][0].file_id).toBe('file_large');
        expect(mockSendPhoto).toHaveBeenCalledTimes(1);
    });

    it('回复 bot 生成的图片 + 指令 → 同样走带图编辑', async () => {
        const message = commandMessage('.生图 改成水彩风格', imageMessage(50, 42, ['file_bot']));
        await new ImgCommandHandler().handle(message, '改成水彩风格', createContext());

        expect(editCalls().length).toBe(1);
        expect((editCalls()[0][1].body as FormData).get('prompt')).toBe('改成水彩风格');
    });

    it('不回复图片时保持纯文生图', async () => {
        const message = commandMessage('.生图 一只猫', null);
        await new ImgCommandHandler().handle(message, '一只猫', createContext());

        expect(generationCalls().length).toBe(1);
        expect(editCalls().length).toBe(0);
        expect(JSON.parse(generationCalls()[0][1].body).prompt).toBe('一只猫');
    });

    it('回复的是非图片消息时走纯文生图', async () => {
        const textMessage = {
            message_id: 50,
            date: 0,
            chat: { id: 111, type: 'private', first_name: 'u' },
            from: { id: 999, is_bot: false, first_name: 'user' },
            text: '一段文字',
        } as unknown as Telegram.Message;
        const message = commandMessage('.生图 一只猫', textMessage);
        await new ImgCommandHandler().handle(message, '一只猫', createContext());

        expect(generationCalls().length).toBe(1);
        expect(editCalls().length).toBe(0);
    });

    it('回复静态表情包(.webp) → 同样走带图编辑', async () => {
        const message = commandMessage('.生图 改成哭泣表情', stickerMessage(60, 'file_sticker'));
        await new ImgCommandHandler().handle(message, '改成哭泣表情', createContext());

        expect(editCalls().length).toBe(1);
        expect((editCalls()[0][1].body as FormData).get('prompt')).toBe('改成哭泣表情');
        expect(mockGetFile.mock.calls[0][0].file_id).toBe('file_sticker');
    });

    it('回复动态表情包 → 明确提示不支持, 不调接口', async () => {
        const message = commandMessage('.生图 改成哭泣表情', stickerMessage(60, 'file_tgs', { is_animated: true }));
        await new ImgCommandHandler().handle(message, '改成哭泣表情', createContext());

        expect(fetchMock).not.toHaveBeenCalled();
        expect(mockSendPhoto).not.toHaveBeenCalled();
        expect(JSON.stringify(mockSendMessage.mock.calls[0][0])).toContain('动态表情包/动图暂不支持');
    });

    it('回复动图(animation) → 同样提示不支持', async () => {
        const animation = {
            message_id: 61,
            date: 0,
            chat: { id: 111, type: 'private', first_name: 'u' },
            from: { id: 999, is_bot: false, first_name: 'user' },
            animation: { file_id: 'file_anim', file_unique_id: 'u-anim', width: 320, height: 320, duration: 2 },
        } as unknown as Telegram.Message;
        const message = commandMessage('.生图 改成哭泣表情', animation);
        await new ImgCommandHandler().handle(message, '改成哭泣表情', createContext());

        expect(fetchMock).not.toHaveBeenCalled();
        expect(JSON.stringify(mockSendMessage.mock.calls[0][0])).toContain('动态表情包/动图暂不支持');
    });

    it('未配置生图渠道时提示 ERROR', async () => {
        const context = createContext();
        (context.USER_CONFIG as any).IMAGE_API_BASE = '';
        const message = commandMessage('.生图 去掉汽车', imageMessage(50, 999, ['file_a']));
        await new ImgCommandHandler().handle(message, '去掉汽车', context);

        expect(fetchMock).not.toHaveBeenCalled();
        expect(mockSendMessage).toHaveBeenCalledTimes(1);
        expect(JSON.stringify(mockSendMessage.mock.calls[0][0])).toContain('Image function is disabled');
    });

    it('底图下载失败时回复 ERROR 文本', async () => {
        fetchMock.mockImplementation(async (input: any) => {
            const url = String(typeof input === 'string' ? input : input.url);
            if (url.includes('/file/bot')) {
                return new Response('not found', { status: 404 });
            }
            return new Response(JSON.stringify({ data: [{ b64_json: MINIMAL_JPEG_B64 }] }), {
                status: 200,
                headers: { 'content-type': 'application/json' },
            });
        });
        const message = commandMessage('.生图 去掉汽车', imageMessage(50, 999, ['file_a']));
        await new ImgCommandHandler().handle(message, '去掉汽车', createContext());

        expect(editCalls().length).toBe(0);
        expect(mockSendPhoto).not.toHaveBeenCalled();
        expect(JSON.stringify(mockSendMessage.mock.calls[0][0])).toContain('下载图片失败');
    });
});

// .生图 是 /img 的点号别名(共用同一个 handle)。命令名不同, 行为必须一致:
// - 不带参数时, 用法提示里的命令名跟随实际输入(打 .生图 就别提示去看 /img);
// - 同样描述发出同样的生图请求。
describe('.生图 是 /img 的点号别名', () => {
    it('不带参数时用法提示用实际输入的命令名', async () => {
        await new ImgCommandHandler().handle(commandMessage('/img', null), '', createContext());
        const imgHint = mockSendMessage.mock.calls[0][0].text as string;
        expect(imgHint).toContain('/img');

        mockSendMessage.mockClear();
        await new GenerateImageCommandHandler().handle(commandMessage('.生图', null), '', createContext());
        const dotHint = mockSendMessage.mock.calls[0][0].text as string;
        expect(dotHint).toContain('.生图');
        expect(dotHint).not.toContain('/img');
    });

    // 带图发 `.生图` 时, 命令在 caption 里: 提示语同样要跟随实际命令名
    it('命令写在 caption 里时提示语也跟随命令名', async () => {
        await new ImgCommandHandler().handle(captionCommandMessage('/img'), '', createContext());
        const slashHint = mockSendMessage.mock.calls[0][0].text as string;
        expect(slashHint).toContain('/img');

        mockSendMessage.mockClear();
        await new GenerateImageCommandHandler().handle(captionCommandMessage('.生图'), '', createContext());
        const dotHint = mockSendMessage.mock.calls[0][0].text as string;
        expect(dotHint).toContain('.生图');
        expect(dotHint).not.toContain('/img');
    });

    it('同样的描述发出同样的生图请求', async () => {
        await new ImgCommandHandler().handle(commandMessage('/img 一只猫', null), '一只猫', createContext());
        const slashPrompt = JSON.parse(generationCalls()[0][1].body).prompt;

        fetchMock.mockClear();
        await new GenerateImageCommandHandler().handle(commandMessage('.生图 一只猫', null), '一只猫', createContext());
        const dotPrompt = JSON.parse(generationCalls()[0][1].body).prompt;

        expect(dotPrompt).toBe(slashPrompt);
        expect(dotPrompt).toBe('一只猫');
        expect(mockSendPhoto).toHaveBeenCalledTimes(2);
    });
});
