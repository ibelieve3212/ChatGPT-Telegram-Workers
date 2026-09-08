import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import { ENV } from '#/config';
import { extractUserMessageItem } from './index';

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
