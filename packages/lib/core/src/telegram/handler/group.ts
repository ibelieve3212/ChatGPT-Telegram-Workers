import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import type { MessageHandler } from './types';
import { ENV } from '#/config';
import { createTelegramBotAPI } from '../api';
import { isGroupChat } from '../auth';
import { StopMessageHandling } from './types';

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
                    // 命令显式指向本 bot (如 /clear@mybot), 去掉后缀
                    isMention = true;
                    const newEntityStr = entityStr.replace(`@${botName}`, '');
                    content = content.slice(0, entity.offset) + newEntityStr + content.slice(entity.offset + entity.length);
                } else if (!entityStr.includes('@')) {
                    // 无 @botName 后缀的命令(如 /clear), 视为本 bot 的命令
                    isMention = true;
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
 * 剩余内容为空时仍返回 isTrigger=true, 由调用方结合是否有 reply_to_message 决定是否触发
 * (回复某消息 + 只有前缀, 应该用被回复消息作为上下文)。
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
    return { isTrigger: true, content: rest };
}

export class GroupMention implements MessageHandler {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        // 非群组消息不作判断，交给下一个中间件处理
        if (!isGroupChat(message.chat.type)) {
            return null;
        }
        console.log('[diag] GroupMention 进入:', { chatId: message.chat.id, msgId: message.message_id, text: message.text?.slice(0, 50) });

        // 处理回复消息, 如果回复的是当前机器人的消息交给下一个中间件处理
        const replyMe = `${message.reply_to_message?.from?.id}` === `${context.SHARE_CONTEXT.botId}`;
        if (replyMe) {
            console.log('[diag] GroupMention 放行: 回复 bot 消息');
            return null;
        }

        // 处理群组消息，过滤掉AT部分
        let botName = context.SHARE_CONTEXT.botName;
        console.log('[diag] GroupMention botName(初始):', botName);
        if (!botName) {
            console.log('[diag] GroupMention botName 未初始化, 调 getMe 获取');
            const res = await createTelegramBotAPI(context.SHARE_CONTEXT.botToken).getMeWithReturns();
            botName = res.result.username || null;
            context.SHARE_CONTEXT.botName = botName;
            console.log('[diag] GroupMention botName(getMe 后):', botName);
        }
        if (!botName) {
            throw new Error('Not set bot name');
        }

        // 群聊中本 bot 的斜杠命令(如 /clear@mybot 或不带后缀的 /clear)直接放行,
        // 交给 CommandHandler 处理。指向其他 bot 的命令(/start@otherbot)不放行,
        // 直接拦截, 避免 bot 间互相触发。
        const entities = message.text ? message.entities : message.caption ? message.caption_entities : null;
        const botCommandEntity = entities?.find(e => e.type === 'bot_command');
        if (botCommandEntity) {
            const rawText = message.text || message.caption || '';
            const cmdStr = rawText.slice(botCommandEntity.offset, botCommandEntity.offset + botCommandEntity.length);
            const atIdx = cmdStr.lastIndexOf('@');
            if (atIdx === -1 || cmdStr.slice(atIdx + 1) === botName) {
                console.log('[diag] GroupMention 放行: 本 bot 命令', cmdStr);
                return null;
            }
            console.log('[diag] GroupMention 拦截: 其他 bot 命令', cmdStr);
            throw new StopMessageHandling('Ignore command for other bot');
        }
        // .生图 是中文别名命令, Telegram 不会为其生成 bot_command entity,
        // 这里检测到后直接放行(不去前缀), 交给 CommandHandler 的字符串匹配处理。
        // 与 GROUP_TRIGGER_PREFIX(.小助手) 不同: .小助手 是触发前缀(去掉后内容发 LLM),
        // .生图 是完整命令(必须原样保留才能被 CommandHandler 匹配), 故只放行不修改文本。
        if (message.text?.startsWith('.生图') || message.caption?.startsWith('.生图')) {
            console.log('[diag] GroupMention 放行: .生图 命令');
            return null;
        }

        let isMention = false;
        // 检查text中是否有机器人的提及
        if (message.text && message.entities) {
            const res = checkMention(message.text, message.entities, botName, context.SHARE_CONTEXT.botId);
            isMention = res.isMention;
            message.text = res.content.trim();
            console.log('[diag] GroupMention text@检测:', { isMention, text: message.text?.slice(0, 50) });
        }
        // 检查caption中是否有机器人的提及
        if (message.caption && message.caption_entities) {
            const res = checkMention(message.caption, message.caption_entities, botName, context.SHARE_CONTEXT.botId);
            isMention = res.isMention || isMention;
            message.caption = res.content.trim();
            console.log('[diag] GroupMention caption@检测:', { isMention, caption: message.caption?.slice(0, 50) });
        }
        // 未被 @bot 触发时, 检测是否以群聊触发前缀开头(如 ".小助手")
        // 前缀触发与 @bot 并存, @bot 优先: 只要已 @ 或前缀命中其一即触发
        if (!isMention && ENV.GROUP_TRIGGER_PREFIX) {
            if (message.text) {
                const res = checkPrefix(message.text, ENV.GROUP_TRIGGER_PREFIX);
                if (res.isTrigger) {
                    // 只有前缀无正文时, 需有被回复消息才能触发(用其作为上下文), 否则不触发避免空请求
                    if (res.content || message.reply_to_message) {
                        isMention = true;
                        message.text = res.content;
                    }
                }
            }
            if (!isMention && message.caption) {
                const res = checkPrefix(message.caption, ENV.GROUP_TRIGGER_PREFIX);
                if (res.isTrigger) {
                    if (res.content || message.reply_to_message) {
                        isMention = true;
                        message.caption = res.content;
                    }
                }
            }
        }
        if (!isMention) {
            console.log('[diag] GroupMention 未命中 @bot, 抛 Not mention');
            throw new StopMessageHandling('Not mention');
        }
        console.log('[diag] GroupMention 命中触发, 放行 -> 下一个');

        return null;
    };
}
