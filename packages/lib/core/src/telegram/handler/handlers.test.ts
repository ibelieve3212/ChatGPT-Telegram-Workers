import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import type { MessageHandler } from './types';
import { ENV } from '#/config';
import { OldMessageFilter, Update2MessageHandler } from './handlers';
import { StopMessageHandling } from './types';

jest.mock('@chatgpt-telegram-workers/plugins', () => ({
    executeRequest: jest.fn(),
    formatInput: jest.fn(),
}), { virtual: true });

function createContext(): WorkerContext {
    return {} as WorkerContext;
}

function createMessage(messageId: number): Telegram.Message {
    return {
        message_id: messageId,
        date: 0,
        chat: { id: -100, type: 'supergroup' },
    } as Telegram.Message;
}

describe('update2MessageHandler', () => {
    it('stops the chain when a message handler throws', async () => {
        const nextHandler = { handle: jest.fn(async () => null) } as MessageHandler;
        const handler = new Update2MessageHandler([
            { handle: async () => { throw new StopMessageHandling('Ignore old message'); } },
            nextHandler,
        ]);

        const result = await handler.handle({
            update_id: 1,
            message: createMessage(7),
        } as Telegram.Update, createContext());

        expect(result).toBeNull();
        expect(nextHandler.handle).not.toHaveBeenCalled();
    });

    it('continues the chain when a message handler returns null', async () => {
        const nextHandler = { handle: jest.fn(async () => new Response('ok')) } as MessageHandler;
        const handler = new Update2MessageHandler([
            { handle: async () => null },
            nextHandler,
        ]);

        const result = await handler.handle({
            update_id: 2,
            message: createMessage(8),
        } as Telegram.Update, createContext());

        expect(await result?.text()).toBe('ok');
        expect(nextHandler.handle).toHaveBeenCalledTimes(1);
    });

    it('propagates unexpected handler errors', async () => {
        const handler = new Update2MessageHandler([
            { handle: async () => { throw new Error('database failed'); } },
        ]);

        await expect(handler.handle({
            update_id: 3,
            message: createMessage(9),
        } as Telegram.Update, createContext())).rejects.toThrow('database failed');
    });

    it('throws for a stored duplicate message id', async () => {
        const safeMode = ENV.SAFE_MODE;
        const database = ENV.DATABASE;
        ENV.SAFE_MODE = true;
        ENV.DATABASE = {
            get: jest.fn(async () => '[7]'),
            put: jest.fn(async () => undefined),
            delete: jest.fn(async () => undefined),
        };
        const context = {
            SHARE_CONTEXT: { lastMessageKey: 'last_message_id:test' },
        } as WorkerContext;

        try {
            await expect(new OldMessageFilter().handle(createMessage(7), context)).rejects.toThrow('Ignore old message');
            expect(ENV.DATABASE.put).not.toHaveBeenCalled();
        } finally {
            ENV.SAFE_MODE = safeMode;
            ENV.DATABASE = database;
        }
    });
});
