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

        // 处理回复消息, 如果回复的是当前机器人的消息交给下一个中间件处理
        const replyMe = `${message.reply_to_message?.from?.id}` === `${context.SHARE_CONTEXT.botId}`;
        if (replyMe) {
            return null;
        }

        // 群聊中手动输入的斜杠命令(如 /clear, /help) 直接放行, 交给 CommandHandler 处理。
        // 方案B下群聊不显示命令菜单, 管理员只能手动打命令; 不带 @botName 后缀时
        // 下面的 checkMention 不会命中, 会导致 'Not mention' 中断整个 handler 链。
        // 权限由各命令的 needAuth 控制, 不会因放行而泄露管理命令。
        const entities = message.text ? message.entities : message.caption ? message.caption_entities : null;
        if (entities?.some(e => e.type === 'bot_command')) {
            return null;
        }
        // .生图 是中文别名命令, Telegram 不会为其生成 bot_command entity,
        // 这里检测到后直接放行(不去前缀), 交给 CommandHandler 的字符串匹配处理。
        // 与 GROUP_TRIGGER_PREFIX(.小助手) 不同: .小助手 是触发前缀(去掉后内容发 LLM),
        // .生图 是完整命令(必须原样保留才能被 CommandHandler 匹配), 故只放行不修改文本。
        if (message.text?.startsWith('.生图') || message.caption?.startsWith('.生图')) {
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
            throw new Error('Not mention');
        }

        return null;
    };
}
