import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import { ENV } from '#/config';
import { ImageEditHandler } from './image-edit';

// 验证「回复 bot 生成的图片 → 直接二次编辑」:
// - 命中时走 /images/edits 图生图并把结果作为图片发出, 支持链式(编辑结果还能继续被回复编辑);
// - 约束: 只对 bot 自己发送的图片生效, 别人发的图/非图片消息一律不触发(交给后续聊天中间件)。

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

// bot 用 sendPhoto 发送的生成图(photo 多档位, 最大档在最后)
function botPhotoMessage(messageId: number, fileIds: string[]): Telegram.Message {
    return {
        message_id: messageId,
        date: 0,
        chat: { id: 111, type: 'private', first_name: 'u' },
        from: { id: 42, is_bot: true, first_name: 'bot' },
        photo: fileIds.map((fileId, i) => ({
            file_id: fileId,
            file_unique_id: `u-${fileId}`,
            width: 320 * (i + 1),
            height: 240 * (i + 1),
        })),
    } as unknown as Telegram.Message;
}

function textMessage(messageId: number, fromId: number, text: string): Telegram.Message {
    return {
        message_id: messageId,
        date: 0,
        chat: { id: 111, type: 'private', first_name: 'u' },
        from: { id: fromId, is_bot: fromId === 42, first_name: fromId === 42 ? 'bot' : 'user' },
        text,
    } as unknown as Telegram.Message;
}

function replyMessage(text: string, referenced: Telegram.Message): Telegram.Message {
    return {
        message_id: 100,
        date: 0,
        chat: { id: 111, type: 'private', first_name: 'u' },
        from: { id: 111, is_bot: false, first_name: 'me' },
        text,
        reply_to_message: referenced,
    } as unknown as Telegram.Message;
}

function editCalls(): any[] {
    return fetchMock.mock.calls.filter(([url]: any[]) => String(url).includes('/images/edits'));
}

beforeEach(() => {
    mockSendPhoto.mockClear();
    mockSendMessage.mockClear();
    mockGetFile.mockClear();
    fetchMock.mockReset();
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    ENV.IMAGE_EDIT_ON_REPLY = true;
    ENV.TELEGRAM_API_DOMAIN = 'https://api.telegram.org';
    ENV.RICH_MESSAGE_MODE = false;
    (ENV as any).DATABASE = { get: async () => null, put: async () => undefined };
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

describe('imageEditHandler 回复生成图直接编辑', () => {
    it('回复 bot 生成图 + 修改文字 → 命中编辑, 无需命令', async () => {
        const referenced = botPhotoMessage(50, ['file_small', 'file_large']);
        const message = replyMessage('把苹果变成绿色', referenced);
        const result = await new ImageEditHandler().handle(message, createContext());

        expect(result).not.toBeNull();
        // 走图生图接口, prompt = 回复的文字, 底图 = 被回复图片的最大档位
        expect(editCalls().length).toBe(1);
        const form = editCalls()[0][1].body as FormData;
        expect(form.get('prompt')).toBe('把苹果变成绿色');
        expect(form.get('image')).not.toBeNull();
        expect(mockGetFile.mock.calls[0][0].file_id).toBe('file_large');
        // 结果作为图片发送
        expect(mockSendPhoto).toHaveBeenCalledTimes(1);
        expect((mockSendPhoto.mock.calls[0][0] as any).chat_id).toBe(111);
    });

    it('编辑结果可以继续被回复编辑(链式)', async () => {
        const context = createContext();
        const first = replyMessage('换成绿色', botPhotoMessage(50, ['file_a']));
        expect(await new ImageEditHandler().handle(first, context)).not.toBeNull();
        // 模拟 bot 发送的编辑结果成为新的被回复目标
        const second = replyMessage('再加一只猫', botPhotoMessage(51, ['file_b']));
        expect(await new ImageEditHandler().handle(second, context)).not.toBeNull();
        expect(editCalls().length).toBe(2);
        expect(mockSendPhoto).toHaveBeenCalledTimes(2);
    });

    it('约束: 回复别人发的图片不触发编辑', async () => {
        const referenced = botPhotoMessage(50, ['file_x']);
        (referenced as any).from = { id: 999, is_bot: false, first_name: 'someone' };
        const message = replyMessage('这张图真好看', referenced);
        const result = await new ImageEditHandler().handle(message, createContext());

        expect(result).toBeNull();
        expect(editCalls().length).toBe(0);
        expect(mockSendPhoto).not.toHaveBeenCalled();
    });

    it('约束: 回复 bot 的文字消息(非图片)不触发编辑', async () => {
        const message = replyMessage('改成绿色', textMessage(50, 42, 'bot 的文字回复'));
        const result = await new ImageEditHandler().handle(message, createContext());

        expect(result).toBeNull();
        expect(editCalls().length).toBe(0);
    });

    it('非回复消息不触发', async () => {
        const message = textMessage(100, 111, '随便说点什么');
        const result = await new ImageEditHandler().handle(message, createContext());

        expect(result).toBeNull();
        expect(editCalls().length).toBe(0);
    });

    it('回复内容为空(无修改要求)时不拦截', async () => {
        const message = replyMessage('', botPhotoMessage(50, ['file_a']));
        (message as any).text = '';
        const result = await new ImageEditHandler().handle(message, createContext());

        expect(result).toBeNull();
        expect(editCalls().length).toBe(0);
    });

    it('iMAGE_EDIT_ON_REPLY=false 时整体关闭', async () => {
        ENV.IMAGE_EDIT_ON_REPLY = false;
        const message = replyMessage('把苹果变成绿色', botPhotoMessage(50, ['file_a']));
        const result = await new ImageEditHandler().handle(message, createContext());

        expect(result).toBeNull();
        expect(editCalls().length).toBe(0);
    });

    it('未配置生图渠道时不拦截(交给普通聊天)', async () => {
        const context = createContext();
        (context.USER_CONFIG as any).IMAGE_API_KEY = null;
        const message = replyMessage('把苹果变成绿色', botPhotoMessage(50, ['file_a']));
        const result = await new ImageEditHandler().handle(message, context);

        expect(result).toBeNull();
        expect(editCalls().length).toBe(0);
    });

    it('编辑失败时回复 ERROR 文本提示', async () => {
        fetchMock.mockImplementation(async (input: any) => {
            const url = String(typeof input === 'string' ? input : input.url);
            if (url.includes('/images/edits')) {
                return new Response(JSON.stringify({ error: { message: 'upstream busy' } }), {
                    status: 500,
                    headers: { 'content-type': 'application/json' },
                });
            }
            return new Response(new Uint8Array([0xFF, 0xD8, 0xFF, 0xE0]), {
                headers: { 'content-type': 'image/jpeg' },
            });
        });
        const message = replyMessage('把苹果变成绿色', botPhotoMessage(50, ['file_a']));
        const result = await new ImageEditHandler().handle(message, createContext());

        expect(result).not.toBeNull();
        expect(mockSendPhoto).not.toHaveBeenCalled();
        expect(mockSendMessage).toHaveBeenCalledTimes(1);
        expect(JSON.stringify(mockSendMessage.mock.calls[0][0])).toContain('upstream busy');
    });
});
