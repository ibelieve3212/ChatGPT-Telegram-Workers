import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import type { MessageHandler } from './types';
import { ENV } from '#/config';
import { BotSenderFilter, OldMessageFilter, Update2MessageHandler } from './handlers';
import { GroupMention } from './group';
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

    it('stops the chain for messages from other bots', async () => {
        const nextHandler = { handle: jest.fn(async () => null) } as MessageHandler;
        const handler = new Update2MessageHandler([
            new BotSenderFilter(),
            nextHandler,
        ]);

        const botMessage = createMessage(10);
        botMessage.from = { id: 999, is_bot: true, first_name: 'OtherBot' } as Telegram.User;

        const result = await handler.handle({
            update_id: 4,
            message: botMessage,
        } as Telegram.Update, createContext());

        expect(result).toBeNull();
        expect(nextHandler.handle).not.toHaveBeenCalled();
    });

    it('continues the chain for messages from real users', async () => {
        const nextHandler = { handle: jest.fn(async () => new Response('ok')) } as MessageHandler;
        const handler = new Update2MessageHandler([
            new BotSenderFilter(),
            nextHandler,
        ]);

        const userMessage = createMessage(11);
        userMessage.from = { id: 123, is_bot: false, first_name: 'User' } as Telegram.User;

        const result = await handler.handle({
            update_id: 5,
            message: userMessage,
        } as Telegram.Update, createContext());

        expect(await result?.text()).toBe('ok');
        expect(nextHandler.handle).toHaveBeenCalledTimes(1);
    });
});

describe('groupMention command suffix handling', () => {
    function createGroupContext(): WorkerContext {
        return {
            SHARE_CONTEXT: {
                botId: '123',
                botName: 'my_helper_bot',
                botToken: 'test-token',
            },
        } as unknown as WorkerContext;
    }

    it('strips the current bot suffix before passing a text command downstream', async () => {
        const command = '/clear@my_helper_bot';
        const message = {
            ...createMessage(20),
            text: `${command} extra`,
            entities: [{
                type: 'bot_command',
                offset: 0,
                length: command.length,
            }],
        } as Telegram.Message;

        const result = await new GroupMention().handle(message, createGroupContext());

        expect(result).toBeNull();
        expect(message.text).toBe('/clear extra');
    });

    it('strips the current bot suffix from caption commands', async () => {
        const command = '/clear@my_helper_bot';
        const message = {
            ...createMessage(21),
            caption: command,
            caption_entities: [{
                type: 'bot_command',
                offset: 0,
                length: command.length,
            }],
        } as Telegram.Message;

        const result = await new GroupMention().handle(message, createGroupContext());

        expect(result).toBeNull();
        expect(message.caption).toBe('/clear');
    });

    // 回归: 群里转贴的公告/教程正文里出现"/start"时, Telegram 仍会给它打 bot_command
    // 实体。这类命令不在句首, 不能当作命令调用放行整条消息, 否则会绕过 @bot 过滤,
    // 让 bot 对整段无关文字接话。
    it('消息正文中间的 /start 不当作命令, 不触发 bot', async () => {
        const text = '欢迎来到 Clash 的万兆隧道时代。申请加入测试：入群满 3 天后私聊 @clash_group_bot 发送 /start';
        const mentionAt = text.indexOf('@clash_group_bot');
        const commandAt = text.indexOf('/start');
        const message = {
            ...createMessage(22),
            text,
            entities: [
                { type: 'mention', offset: mentionAt, length: '@clash_group_bot'.length },
                { type: 'bot_command', offset: commandAt, length: '/start'.length },
            ],
        } as Telegram.Message;

        await expect(new GroupMention().handle(message, createGroupContext())).rejects.toThrow(StopMessageHandling);
    });

    it('句首的已知命令仍然正常放行', async () => {
        const message = {
            ...createMessage(23),
            text: '/start',
            entities: [{ type: 'bot_command', offset: 0, length: '/start'.length }],
        } as Telegram.Message;

        const result = await new GroupMention().handle(message, createGroupContext());

        expect(result).toBeNull();
    });

    it('句首命令前带空白也仍然放行', async () => {
        const message = {
            ...createMessage(24),
            text: '  /clear',
            entities: [{ type: 'bot_command', offset: 2, length: '/clear'.length }],
        } as Telegram.Message;

        const result = await new GroupMention().handle(message, createGroupContext());

        expect(result).toBeNull();
    });
});
