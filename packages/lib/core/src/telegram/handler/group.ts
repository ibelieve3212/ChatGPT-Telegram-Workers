import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import type { MessageHandler } from './types';
import { createTelegramBotAPI } from '../api';
import { isGroupChat } from '../auth';
import { ENV } from '#/config';

function checkMention(content: string, entities: Telegram.MessageEntity[], botName: string, botId: number): {
    isMention: boolean;
    content: string;
} {
    let isMention = false;
    for (const entity of entities) {
        const entityStr = content.slice(entity.offset, entity.offset + entity.length);
        switch (entity.type) {
            case 'mention': // "mention"适用于有用户名的普通用户
                if (entityStr === `@${botName}`) {
                    isMention = true;
                    content = content.slice(0, entity.offset) + content.slice(entity.offset + entity.length);
                }
                break;
            case 'text_mention': // "text_mention"适用于没有用户名的用户或需要通过ID提及用户的情况
                if (`${entity.user?.id}` === `${botId}`) {
                    isMention = true;
                    content = content.slice(0, entity.offset) + content.slice(entity.offset + entity.length);
                }
                break;
            case 'bot_command': // "bot_command"适用于命令
                if (entityStr.endsWith(`@${botName}`)) {
                    isMention = true;
                    const newEntityStr = entityStr.replace(`@${botName}`, '');
                    content = content.slice(0, entity.offset) + newEntityStr + content.slice(entity.offset + entity.length);
                }
                break;
            default:
                break;
        }
    }
    return {
        isMention,
        content,
    };
}

/**
 * 检测群聊消息是否以触发前缀开头。
 * 前缀后跟空格或直接接内容均可, 去掉前缀和前导空格后返回剩余内容。
 * 若消息只剩前缀无内容, 则不触发(返回 isTrigger=false), 避免空触发。
 */
function checkPrefix(content: string, prefix: string): {
    isTrigger: boolean;
    content: string;
} {
    if (!prefix || !content.startsWith(prefix)) {
        return { isTrigger: false, content };
    }
    // 去掉前缀, 再去前导空白(空格/换行等), 剩余内容作为真正的消息文本
    const rest = content.slice(prefix.length).trimStart();
    if (!rest) {
        // 只有前缀没有正文, 不触发, 避免空消息请求
        return { isTrigger: false, content };
    }
    return { isTrigger: true, content: rest };
}

export class GroupMention implements MessageHandler {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        // 非群组消息不作判断，交给下一个中间件处理
        if (!isGroupChat(message.chat.type)) {
            return null;
        }

        // 处理回复消息, 如果回复的是当前机器人的消息交给下一个中间件处理
        const replyMe = `${message.reply_to_message?.from?.id}` === `${context.SHARE_CONTEXT.botId}`;
        if (replyMe) {
            return null;
        }

        // 处理群组消息，过滤掉AT部分
        let botName = context.SHARE_CONTEXT.botName;
        if (!botName) {
            const res = await createTelegramBotAPI(context.SHARE_CONTEXT.botToken).getMeWithReturns();
            botName = res.result.username || null;
            context.SHARE_CONTEXT.botName = botName;
        }
        if (!botName) {
            throw new Error('Not set bot name');
        }
        let isMention = false;
        // 检查text中是否有机器人的提及
        if (message.text && message.entities) {
            const res = checkMention(message.text, message.entities, botName, context.SHARE_CONTEXT.botId);
            isMention = res.isMention;
            message.text = res.content.trim();
        }
        // 检查caption中是否有机器人的提及
        if (message.caption && message.caption_entities) {
            const res = checkMention(message.caption, message.caption_entities, botName, context.SHARE_CONTEXT.botId);
            isMention = res.isMention || isMention;
            message.caption = res.content.trim();
        }
        // 未被 @bot 触发时, 检测是否以群聊触发前缀开头(如 ".小助手")
        // 前缀触发与 @bot 并存, @bot 优先: 只要已 @ 或前缀命中其一即触发
        if (!isMention && ENV.GROUP_TRIGGER_PREFIX) {
            if (message.text) {
                const res = checkPrefix(message.text, ENV.GROUP_TRIGGER_PREFIX);
                if (res.isTrigger) {
                    isMention = true;
                    message.text = res.content;
                }
            }
            if (!isMention && message.caption) {
                const res = checkPrefix(message.caption, ENV.GROUP_TRIGGER_PREFIX);
                if (res.isTrigger) {
                    isMention = true;
                    message.caption = res.content;
                }
            }
        }
        if (!isMention) {
            throw new Error('Not mention');
        }

        return null;
    };
}
