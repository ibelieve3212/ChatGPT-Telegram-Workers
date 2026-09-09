import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import { ENV } from '#/config';
import { extractUserMessage, extractUserMessageItem, requiresImageUnderstanding } from './index';

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

    it('detects explicit image-understanding requests', () => {
        expect(requiresImageUnderstanding('请分析一下这张图')).toBe(true);
        expect(requiresImageUnderstanding('提取截图中的文字')).toBe(true);
        expect(requiresImageUnderstanding('图中写了什么')).toBe(true);
        expect(requiresImageUnderstanding('总结这段新闻')).toBe(false);
        expect(requiresImageUnderstanding('这篇文章提到了很多图片和照片')).toBe(false);
        expect(requiresImageUnderstanding('说说图片格式的发展历史')).toBe(false);
    });

    it('keeps an attached photo as optional when image intent is unclear', async () => {
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

            expect(result.imageMode).toBe('optional');
            expect(result.params.content).toEqual([
                { type: 'text', text: '总结这段新闻' },
                { type: 'image', image: new URL(`${ENV.TELEGRAM_API_DOMAIN}/file/bot42:test/photos/photo.jpg`) },
            ]);
        } finally {
            globalThis.fetch = originalFetch;
        }
    });

    it('keeps a photo when image understanding is explicitly requested', async () => {
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

            expect(result.imageMode).toBe('required');
            expect(result.params.content).toEqual([
                { type: 'text', text: '请分析这张图' },
                { type: 'image', image: new URL(`${ENV.TELEGRAM_API_DOMAIN}/file/bot42:test/photos/photo.jpg`) },
            ]);
        } finally {
            globalThis.fetch = originalFetch;
        }
    });

    it('keeps a replied photo when the trigger explicitly requests image understanding', async () => {
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

            expect(result.imageMode).toBe('required');
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
