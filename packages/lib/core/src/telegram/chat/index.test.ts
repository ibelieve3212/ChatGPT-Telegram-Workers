import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import { ENV } from '#/config';
import { extractImageFileID, extractUserMessage, extractUserMessageItem, MAX_DOWNLOAD_FILE_SIZE } from './index';

function createContext(): WorkerContext {
    return {
        SHARE_CONTEXT: {
            botId: 42,
        },
    } as WorkerContext;
}

describe('extractUserMessageItem', () => {
    beforeEach(() => {
        ENV.EXTRA_MESSAGE_CONTEXT = false;
    });

    it('uses caption from a replied channel post without from', async () => {
        const message = {
            message_id: 2,
            date: 0,
            chat: { id: -100, type: 'supergroup' },
            text: '',
            reply_to_message: {
                message_id: 1,
                date: 0,
                chat: { id: -100, type: 'supergroup' },
                sender_chat: { id: -200, type: 'channel', title: 'channel' },
                caption: 'referenced channel post',
                photo: [],
            },
        } as Telegram.Message;

        const result = await extractUserMessageItem(message, createContext());

        expect(result).toEqual({ role: 'user', content: 'referenced channel post' });
    });

    it('uses caption without attaching a replied channel photo by default', async () => {
        const message = {
            message_id: 3,
            date: 0,
            chat: { id: -100, type: 'supergroup' },
            text: '',
            reply_to_message: {
                message_id: 2,
                date: 0,
                chat: { id: -100, type: 'supergroup' },
                sender_chat: { id: -200, type: 'channel', title: 'channel' },
                caption: 'referenced channel post',
                photo: [{ file_id: 'photo', file_unique_id: 'photo', width: 100, height: 100 }],
            },
        } as Telegram.Message;

        const result = await extractUserMessageItem(message, createContext());

        expect(result).toEqual({ role: 'user', content: 'referenced channel post' });
    });

    it('attaches a photo with image mode regardless of text intent', async () => {
        const originalFetch = globalThis.fetch;
        globalThis.fetch = jest.fn(async () => new Response(JSON.stringify({
            ok: true,
            result: { file_path: 'photos/photo.jpg' },
        }), { headers: { 'Content-Type': 'application/json' } })) as typeof fetch;
        const message = {
            message_id: 5,
            date: 0,
            chat: { id: -100, type: 'supergroup' },
            caption: '总结这段新闻',
            photo: [{ file_id: 'photo', file_unique_id: 'photo', width: 100, height: 100 }],
        } as Telegram.Message;

        try {
            const result = await extractUserMessage(message, {
                SHARE_CONTEXT: { botId: 42, botToken: '42:test' },
            } as WorkerContext);

            expect(result.imageMode).toBe('image');
            expect(result.params.content).toEqual([
                { type: 'text', text: '总结这段新闻' },
                { type: 'image', image: new URL(`${ENV.TELEGRAM_API_DOMAIN}/file/bot42:test/photos/photo.jpg`) },
            ]);
        } finally {
            globalThis.fetch = originalFetch;
        }
    });

    it('keeps a photo with text explicitly requesting analysis', async () => {
        const originalFetch = globalThis.fetch;
        globalThis.fetch = jest.fn(async () => new Response(JSON.stringify({
            ok: true,
            result: { file_path: 'photos/photo.jpg' },
        }), { headers: { 'Content-Type': 'application/json' } })) as typeof fetch;
        const message = {
            message_id: 6,
            date: 0,
            chat: { id: -100, type: 'supergroup' },
            caption: '请分析这张图',
            photo: [{ file_id: 'photo', file_unique_id: 'photo', width: 100, height: 100 }],
        } as Telegram.Message;

        try {
            const result = await extractUserMessage(message, {
                SHARE_CONTEXT: { botId: 42, botToken: '42:test' },
            } as WorkerContext);

            expect(result.imageMode).toBe('image');
            expect(result.params.content).toEqual([
                { type: 'text', text: '请分析这张图' },
                { type: 'image', image: new URL(`${ENV.TELEGRAM_API_DOMAIN}/file/bot42:test/photos/photo.jpg`) },
            ]);
        } finally {
            globalThis.fetch = originalFetch;
        }
    });

    it('keeps a replied photo when the trigger text mentions the image', async () => {
        const originalFetch = globalThis.fetch;
        globalThis.fetch = jest.fn(async () => new Response(JSON.stringify({
            ok: true,
            result: { file_path: 'photos/photo.jpg' },
        }), { headers: { 'Content-Type': 'application/json' } })) as typeof fetch;
        ENV.EXTRA_MESSAGE_CONTEXT = true;
        const message = {
            message_id: 7,
            date: 0,
            chat: { id: -100, type: 'supergroup' },
            text: '请识图分析',
            reply_to_message: {
                message_id: 2,
                date: 0,
                chat: { id: -100, type: 'supergroup' },
                sender_chat: { id: -200, type: 'channel', title: 'channel' },
                caption: '一张新闻配图',
                photo: [{ file_id: 'photo', file_unique_id: 'photo', width: 100, height: 100 }],
            },
        } as Telegram.Message;

        try {
            const result = await extractUserMessage(message, {
                SHARE_CONTEXT: { botId: 42, botToken: '42:test' },
            } as WorkerContext);

            expect(result.imageMode).toBe('image');
            expect(Array.isArray(result.params.content)).toBe(true);
        } finally {
            globalThis.fetch = originalFetch;
        }
    });

    it('rejects a reply with no supported content', async () => {
        const message = {
            message_id: 4,
            date: 0,
            chat: { id: -100, type: 'supergroup' },
            text: '',
            reply_to_message: {
                message_id: 3,
                date: 0,
                chat: { id: -100, type: 'supergroup' },
                sender_chat: { id: -200, type: 'channel', title: 'channel' },
            },
        } as Telegram.Message;

        await expect(extractUserMessageItem(message, createContext())).rejects.toThrow('Message has no supported text or image content');
    });
});

describe('extractImageFileID', () => {
    const photoSizes = [
        { file_id: 'p90', file_unique_id: 'p90', width: 90, height: 45 },
        { file_id: 'p180', file_unique_id: 'p180', width: 180, height: 90 },
        { file_id: 'p320', file_unique_id: 'p320', width: 320, height: 160 },
        { file_id: 'p640', file_unique_id: 'p640', width: 640, height: 320 },
        { file_id: 'p1024', file_unique_id: 'p1024', width: 1024, height: 512 },
    ];
    const photoMessage = {
        message_id: 1,
        date: 0,
        chat: { id: 1, type: 'private' },
        photo: photoSizes,
    } as Telegram.Message;

    beforeEach(() => {
        ENV.TELEGRAM_PHOTO_SIZE_OFFSET = -1;
    });

    it('默认(-1)取最大档照片', () => {
        expect(extractImageFileID(photoMessage)).toBe('p1024');
    });

    it('offset=0 取最小档, offset=1 取次小档(旧行为)', () => {
        ENV.TELEGRAM_PHOTO_SIZE_OFFSET = 0;
        expect(extractImageFileID(photoMessage)).toBe('p90');
        ENV.TELEGRAM_PHOTO_SIZE_OFFSET = 1;
        expect(extractImageFileID(photoMessage)).toBe('p180');
    });

    it('offset 越界时钳制到有效范围', () => {
        ENV.TELEGRAM_PHOTO_SIZE_OFFSET = 99;
        expect(extractImageFileID(photoMessage)).toBe('p1024');
        ENV.TELEGRAM_PHOTO_SIZE_OFFSET = -99;
        expect(extractImageFileID(photoMessage)).toBe('p90');
    });

    it('图片类型的文件消息取原件 file_id (无压缩原图)', () => {
        const message = {
            message_id: 2,
            date: 0,
            chat: { id: 1, type: 'private' },
            document: {
                file_id: 'docOriginal',
                file_unique_id: 'docOriginal',
                mime_type: 'image/png',
                file_size: 1024 * 1024,
                thumbnail: { file_id: 'docThumb', file_unique_id: 'docThumb', width: 320, height: 160 },
            },
        } as Telegram.Message;
        expect(extractImageFileID(message)).toBe('docOriginal');
    });

    it('图片文件超过 Bot API 20MB 下载上限时回退缩略图', () => {
        const message = {
            message_id: 3,
            date: 0,
            chat: { id: 1, type: 'private' },
            document: {
                file_id: 'docOriginal',
                file_unique_id: 'docOriginal',
                mime_type: 'image/png',
                file_size: MAX_DOWNLOAD_FILE_SIZE + 1,
                thumbnail: { file_id: 'docThumb', file_unique_id: 'docThumb', width: 320, height: 160 },
            },
        } as Telegram.Message;
        expect(extractImageFileID(message)).toBe('docThumb');
    });

    it('非图片文件(如视频)取缩略图', () => {
        const message = {
            message_id: 4,
            date: 0,
            chat: { id: 1, type: 'private' },
            document: {
                file_id: 'videoFile',
                file_unique_id: 'videoFile',
                mime_type: 'video/mp4',
                thumbnail: { file_id: 'videoThumb', file_unique_id: 'videoThumb', width: 320, height: 320 },
            },
        } as Telegram.Message;
        expect(extractImageFileID(message)).toBe('videoThumb');
    });

    it('无图片内容返回 null', () => {
        expect(extractImageFileID({} as Telegram.Message)).toBeNull();
        const pdfMessage = {
            message_id: 5,
            date: 0,
            chat: { id: 1, type: 'private' },
            document: { file_id: 'pdf', file_unique_id: 'pdf', mime_type: 'application/pdf' },
        } as Telegram.Message;
        expect(extractImageFileID(pdfMessage)).toBeNull();
    });
});
