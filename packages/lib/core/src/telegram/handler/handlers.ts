import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import type { MessageHandler, UpdateHandler } from './types';
import { ENV } from '#/config';
import { isAdminUserId, isGroupChat } from '../auth';
import { commandsForChatMember } from '../command';
import { handleCallbackQuery } from '../callback_query';
import { chatWithMessage, extractUserMessageItem } from '../chat';
import { handleCommandMessage } from '../command';
import { createTelegramBotAPI } from '../api';
import { MessageSender } from '../sender';

// KV 缓存 key 前缀, 用于去重避免重复调用 setMyCommands
const MENU_SYNC_KEY_PREFIX = 'admin_menu_synced:';
// 缓存有效期 7 天
const MENU_SYNC_TTL_SECONDS = 7 * 24 * 60 * 60;

// 管理员菜单同步: 白名单用户在群聊发消息时, 动态为其设置 chat_member scope 完整菜单
export class AdminMenuSync implements MessageHandler {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        // 仅群聊
        if (!isGroupChat(message.chat.type)) {
            return null;
        }
        const speakerId = message.from?.id;
        if (speakerId == null) {
            return null;
        }
        // 检查是否为白名单用户
        const isAdmin = isAdminUserId(speakerId);
        if (isAdmin !== true) {
            return null;
        }
        try {
            // KV 去重: 同一个 bot 在同一个群、同一个用户, 7 天内只同步一次
            const botToken = context.SHARE_CONTEXT.botToken;
            const botId = botToken.split(':')[0];
            const syncKey = `${MENU_SYNC_KEY_PREFIX}${message.chat.id}:${botId}:${speakerId}`;
            if (await ENV.DATABASE.get(syncKey)) {
                return null;
            }
            // 构建完整命令列表(普通命令 + 管理命令)
            const commands = commandsForChatMember();
            // 调用 setMyCommands, scope = chat_member(指定群 + 指定用户)
            const api = createTelegramBotAPI(botToken);
            const params: Telegram.SetMyCommandsParams = {
                commands,
                scope: {
                    type: 'chat_member',
                    chat_id: message.chat.id,
                    user_id: speakerId,
                },
            };
            await api.setMyCommands(params);
            // 写入 KV 缓存
            await ENV.DATABASE.put(syncKey, '1', { expirationTtl: MENU_SYNC_TTL_SECONDS });
        } catch (e) {
            console.error('AdminMenuSync error:', e);
        }
        // 不阻断消息处理
        return null;
    };
}

export class EnvChecker implements UpdateHandler {
    handle = async (update: Telegram.Update, context: WorkerContext): Promise<Response | null> => {
        if (!ENV.DATABASE) {
            return MessageSender
                .fromUpdate(context.SHARE_CONTEXT.botToken, update)
                .sendPlainText('DATABASE Not Set');
        }
        return null;
    };
}

export class WhiteListFilter implements UpdateHandler {
    handle = async (update: Telegram.Update, context: WorkerContext): Promise<Response | null> => {
        if (ENV.I_AM_A_GENEROUS_PERSON) {
            return null;
        }
        const sender = MessageSender.fromUpdate(context.SHARE_CONTEXT.botToken, update);

        let chatType = '';
        let chatID = 0;

        if (update.message) {
            chatType = update.message.chat.type;
            chatID = update.message.chat.id;
        } else if (update.callback_query?.message) {
            chatType = update.callback_query.message.chat.type;
            chatID = update.callback_query.message.chat.id;
        }

        if (!chatType || !chatID) {
            throw new Error('Invalid chat type or chat id');
        }
        const text = `You are not in the white list, please contact the administrator to add you to the white list. Your chat_id: ${chatID}`;

        // 判断私聊消息
        if (chatType === 'private') {
            // 白名单判断
            if (!ENV.CHAT_WHITE_LIST.includes(`${chatID}`)) {
                return sender.sendPlainText(text);
            }
            return null;
        }

        // 判断群组消息
        if (isGroupChat(chatType)) {
            // 未打开群组机器人开关,直接忽略
            if (!ENV.GROUP_CHAT_BOT_ENABLE) {
                throw new Error('Not support');
            }
            // 白名单判断
            if (!ENV.CHAT_GROUP_WHITE_LIST.includes(`${chatID}`)) {
                return sender.sendPlainText(text);
            }
            return null;
        }

        return sender.sendPlainText(
            `Not support chat type: ${chatType}`,
        );
    };
}

export class Update2MessageHandler implements UpdateHandler {
    messageHandlers: MessageHandler[];
    constructor(messageHandlers: MessageHandler[]) {
        this.messageHandlers = messageHandlers;
    }

    loadMessage(body: Telegram.Update): Telegram.Message {
        if (body.edited_message) {
            throw new Error('Ignore edited message');
        }
        if (body.message) {
            return body?.message;
        } else {
            throw new Error('Invalid message');
        }
    }

    handle = async (update: Telegram.Update, context: WorkerContext): Promise<Response | null> => {
        const message = this.loadMessage(update);
        if (!message) {
            return null;
        }
        for (const handler of this.messageHandlers) {
            const result = await handler.handle(message, context);
            if (result) {
                return result;
            }
        }
        return null;
    };
}

export class CallbackQueryHandler implements UpdateHandler {
    handle = async (update: Telegram.Update, context: WorkerContext): Promise<Response | null> => {
        if (update.callback_query) {
            return handleCallbackQuery(update.callback_query, context);
        }
        return null;
    };
}

export class SaveLastMessage implements MessageHandler {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        if (!ENV.DEBUG_MODE) {
            return null;
        }
        const lastMessageKey = `last_message:${context.SHARE_CONTEXT.chatHistoryKey}`;
        await ENV.DATABASE.put(lastMessageKey, JSON.stringify(message), { expirationTtl: 3600 });
        return null;
    };
}

export class OldMessageFilter implements MessageHandler {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        if (!ENV.SAFE_MODE) {
            return null;
        }
        let idList = [];
        try {
            idList = JSON.parse(await ENV.DATABASE.get(context.SHARE_CONTEXT.lastMessageKey).catch(() => '[]')) || [];
        } catch (e) {
            console.error(e);
        }
        // 保存最近的100条消息，如果存在则忽略，如果不存在则保存
        if (idList.includes(message.message_id)) {
            throw new Error('Ignore old message');
        } else {
            idList.push(message.message_id);
            if (idList.length > 100) {
                idList.shift();
            }
            await ENV.DATABASE.put(context.SHARE_CONTEXT.lastMessageKey, JSON.stringify(idList));
        }
        return null;
    };
}

export class MessageFilter implements MessageHandler {
    // eslint-disable-next-line unused-imports/no-unused-vars
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        if (message.text) {
            return null;// 纯文本消息
        }
        if (message.caption) {
            return null;// 图文消息
        }
        if (message.photo) {
            return null;// 图片消息
        }
        throw new Error('Not supported message type');
    };
}

export class CommandHandler implements MessageHandler {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        if (message.text || message.caption) {
            return await handleCommandMessage(message, context);
        }
        // 非文本消息不作处理
        return null;
    };
}

export class ChatHandler implements MessageHandler {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        const params = await extractUserMessageItem(message, context);
        return chatWithMessage(message, params, context, null);
    };
}
