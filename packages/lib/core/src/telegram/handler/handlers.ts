import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import type { MessageHandler, UpdateHandler } from './types';
import { ENV } from '#/config';
import { createTelegramBotAPI } from '../api';
import { isAdminUserId, isGroupChat } from '../auth';
import { handleCallbackQuery } from '../callback_query';
import { chatWithMessage, extractUserMessage } from '../chat';
import { commandsForChatMember, handleCommandMessage } from '../command';
import { MessageSender } from '../sender';

import { StopMessageHandling } from './types';

// KV 缓存 key 前缀, 用于去重避免重复调用 setMyCommands
const MENU_SYNC_KEY_PREFIX = 'admin_menu_synced:';
// 缓存有效期 7 天
const MENU_SYNC_TTL_SECONDS = 7 * 24 * 60 * 60;

// 管理员菜单同步(方案B): 白名单用户在私聊发消息时, 动态为其设置专属命令菜单
// 策略: 私聊菜单分两层——所有用户默认看到普通命令(all_private_chats),
// 白名单用户通过 BotCommandScopeChat(chat_id=user_id) 看到普通+管理完整菜单
// 群聊不显示任何斜杠命令菜单(all_group_chats / all_chat_administrators 均不注册)
export class AdminMenuSync implements MessageHandler {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        // 仅私聊
        if (isGroupChat(message.chat.type)) {
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
        // 菜单同步不阻塞消息处理: fire-and-forget 后立即返回
        // (KV 去重读 + setMyCommands + KV 写均不在关键路径上, 异步执行不影响首字延迟)
        const botToken = context.SHARE_CONTEXT.botToken;
        const botId = botToken.split(':')[0];
        void this.syncAdminMenu(botToken, speakerId, botId).catch(e => console.error('AdminMenuSync error:', e));
        // 不阻断消息处理
        return null;
    };

    private async syncAdminMenu(botToken: string, speakerId: number, botId: string): Promise<void> {
        try {
            // KV 去重: 同一个 bot 对同一个用户, 7 天内只同步一次
            const syncKey = `${MENU_SYNC_KEY_PREFIX}${speakerId}:${botId}`;
            if (await ENV.DATABASE.get(syncKey)) {
                return;
            }
            // 构建完整命令列表(普通命令 + 管理命令)
            const commands = commandsForChatMember();
            // 调用 setMyCommands, scope = chat(指定私聊用户, chat_id == user_id)
            const api = createTelegramBotAPI(botToken);
            const params: Telegram.SetMyCommandsParams = {
                commands,
                scope: {
                    type: 'chat',
                    chat_id: speakerId,
                },
            };
            await api.setMyCommands(params);
            // 写入 KV 缓存
            await ENV.DATABASE.put(syncKey, '1', { expirationTtl: MENU_SYNC_TTL_SECONDS });
        } catch (e) {
            console.error('AdminMenuSync error:', e);
        }
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
            return null;
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
                return null;
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

    loadMessage(body: Telegram.Update): Telegram.Message | null {
        if (body.edited_message) {
            return null;
        }
        if (body.message) {
            return body?.message;
        } else {
            return null;
        }
    }

    handle = async (update: Telegram.Update, context: WorkerContext): Promise<Response | null> => {
        const message = this.loadMessage(update);
        if (!message) {
            return null;
        }
        for (const handler of this.messageHandlers) {
            const handlerName = handler.constructor.name;
            let result: Response | null = null;
            try {
                result = await handler.handle(message, context);
            } catch (e) {
                if (!(e instanceof StopMessageHandling)) {
                    throw e;
                }
                console.log(`[diag] 中间件 ${handlerName} 终止处理: ${e.message}`);
                return null;
            }
            if (result) {
                console.log(`[diag] 中间件 ${handlerName} 返回响应, 中断后续链`);
                return result;
            }
            console.log(`[diag] 中间件 ${handlerName} 放行 -> 下一个`);
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
        let idList: number[] = [];
        try {
            const storedIds = JSON.parse(await ENV.DATABASE.get(context.SHARE_CONTEXT.lastMessageKey).catch(() => '[]'));
            if (Array.isArray(storedIds)) {
                idList = storedIds;
            }
        } catch (e) {
            console.error(e);
        }
        // 保存最近的100条消息，如果存在则终止处理，如果不存在则保存
        if (idList.includes(message.message_id)) {
            console.log('[diag] OldMessageFilter: 重复消息(Telegram重试), 终止处理');
            throw new StopMessageHandling('Ignore old message');
        }
        idList.push(message.message_id);
        if (idList.length > 100) {
            idList.shift();
        }
        await ENV.DATABASE.put(context.SHARE_CONTEXT.lastMessageKey, JSON.stringify(idList));
        return null;
    };
}

export class BotSenderFilter implements MessageHandler {
    handle = async (message: Telegram.Message, _context: WorkerContext): Promise<Response | null> => {
        if (message.from?.is_bot) {
            throw new StopMessageHandling('Ignore bot sender');
        }
        return null;
    };
}

export class MessageFilter implements MessageHandler {
    // eslint-disable-next-line unused-imports/no-unused-vars
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        if (message.text) {
            return null;
        }
        if (message.caption) {
            return null;
        }
        if (message.photo) {
            return null;
        }
        // 不支持的消息类型(贴纸/视频/音频等): 终止处理链
        // 注意: 不能 return null, 否则消息会继续到 ChatHandler 导致 bot 胡乱回复
        // throw 会被 Update2MessageHandler 捕获并中断链, 配合 catch 返回 200
        throw new StopMessageHandling('Not supported message type');
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
        const { params, imageMode } = await extractUserMessage(message, context);
        const content = params.content;
        console.log('[diag] ChatHandler 消息提取完成:', {
            textLength: typeof content === 'string' ? content.length : content.filter(item => item.type === 'text').reduce((sum, item) => sum + item.text.length, 0),
            imageCount: Array.isArray(content) ? content.filter(item => item.type === 'image').length : 0,
            imageMode,
            hasReply: !!message.reply_to_message,
        });
        return chatWithMessage(message, params, context, null, imageMode);
    };
}
