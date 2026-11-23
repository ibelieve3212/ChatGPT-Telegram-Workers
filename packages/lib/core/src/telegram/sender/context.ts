import type * as Telegram from 'telegram-bot-api-types';
import { FEATURES } from '#/config';

export class MessageContext implements Record<string, any> {
    chat_id: number;
    message_thread_id?: number;
    message_id: number | null = null; // 当前发生的消息，用于后续编辑
    reply_to_message_id: number | null = null;
    parse_mode: Telegram.ParseMode | null = null;
    allow_sending_without_reply: boolean | null = null;
    // 由 FEATURES.enableLinkPreview 统一决定(默认关闭预览), 不再由各命令单独设置
    disable_web_page_preview: boolean | null = null;

    constructor(chatID: number) {
        this.chat_id = chatID;
    }

    static fromMessage(message: Telegram.Message): MessageContext {
        const ctx = new MessageContext(message.chat.id);
        ctx.disable_web_page_preview = !FEATURES.enableLinkPreview;
        ctx.message_thread_id = message.message_thread_id;
        if (message.chat.type === 'group' || message.chat.type === 'supergroup') {
            ctx.reply_to_message_id = message.message_id;
            ctx.allow_sending_without_reply = true;
        } else {
            ctx.reply_to_message_id = null;
        }
        return ctx;
    }

    static fromCallbackQuery(callbackQuery: Telegram.CallbackQuery): MessageContext {
        const chat = callbackQuery.message?.chat;
        if (!chat) {
            throw new Error('Chat not found');
        }
        const ctx = new MessageContext(chat.id);
        ctx.disable_web_page_preview = !FEATURES.enableLinkPreview;
        ctx.message_thread_id = callbackQuery.message && 'message_thread_id' in callbackQuery.message ? callbackQuery.message.message_thread_id : undefined;
        if (chat.type === 'group' || chat.type === 'supergroup') {
            ctx.reply_to_message_id = callbackQuery.message!.message_id;
            ctx.allow_sending_without_reply = true;
        } else {
            ctx.reply_to_message_id = null;
        }
        return ctx;
    }
}
