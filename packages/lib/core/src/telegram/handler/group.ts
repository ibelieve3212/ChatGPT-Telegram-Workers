import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import type { MessageHandler } from './types';
import { ENV } from '#/config';
import { createTelegramBotAPI } from '../api';
import { isGroupChat } from '../auth';
import { debugLog } from '#/utils/debug';
import { StopMessageHandling } from './types';
import { commandsDocument, knownCommands } from '../command';

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
        debugLog('[diag] GroupMention 进入:', { chatId: message.chat.id, msgId: message.message_id, text: message.text?.slice(0, 50) });

        // 处理回复消息, 如果回复的是当前机器人的消息交给下一个中间件处理
        const replyMe = `${message.reply_to_message?.from?.id}` === `${context.SHARE_CONTEXT.botId}`;
        if (replyMe) {
            debugLog('[diag] GroupMention 放行: 回复 bot 消息');
            return null;
        }

        // 处理群组消息，过滤掉AT部分
        let botName = context.SHARE_CONTEXT.botName;
        debugLog('[diag] GroupMention botName(初始):', botName);
        if (!botName) {
            debugLog('[diag] GroupMention botName 未初始化, 调 getMe 获取');
            const res = await createTelegramBotAPI(context.SHARE_CONTEXT.botToken).getMeWithReturns();
            botName = res.result.username || null;
            context.SHARE_CONTEXT.botName = botName;
            debugLog('[diag] GroupMention botName(getMe 后):', botName);
        }
        if (!botName) {
            throw new Error('Not set bot name');
        }

        // 群聊斜杠命令拦截规则(只放行本 bot 已知命令, 其余一律拦截):
        //   放行: /clear        (已知命令 + 无 @ 后缀)
        //   放行: /clear@mybot  (已知命令 + @ 本 bot)
        //   拦截: /clear@other  (已知命令但 @ 了其他 bot, 避免互触发)
        //   拦截: /gugugaga     (未知命令, 可能是群里其他 bot 的命令)
        //   拦截: /gugugaga@my  (未知命令, 哪怕 @ 的是本 bot)
        // 非命令消息(@/前缀触发)不受此规则影响, 继续走下面的逻辑。
        const entities = message.text ? message.entities : message.caption ? message.caption_entities : null;
        const botCommandEntity = entities?.find(e => e.type === 'bot_command');
        if (botCommandEntity) {
            const rawText = message.text || message.caption || '';
            const cmdStr = rawText.slice(botCommandEntity.offset, botCommandEntity.offset + botCommandEntity.length);
            // 拆出命令名和 @后缀 (cmdStr 形如 "/clear" 或 "/clear@mybot")
            const atIdx = cmdStr.lastIndexOf('@');
            const cmdName = atIdx === -1 ? cmdStr : cmdStr.slice(0, atIdx);
            const cmdSuffix = atIdx === -1 ? '' : cmdStr.slice(atIdx + 1);
            const known = knownCommands();
            if (known.has(cmdName)) {
                // 已知命令: 无后缀或后缀指向本 bot 才放行
                if (cmdSuffix === '' || cmdSuffix === botName) {
                    debugLog('[diag] GroupMention 放行: 本 bot 命令', cmdStr);
                    // 有 @后缀时, 按 entity offset 剥离后缀, 避免 CommandHandler 匹配失败
                    // (checkMention 里的剥离逻辑被本拦截提前 return 跳过, 已成死代码)
                    if (atIdx !== -1) {
                        const prefix = rawText.slice(0, botCommandEntity.offset);
                        const suffix = rawText.slice(botCommandEntity.offset + botCommandEntity.length);
                        const cleanText = prefix + cmdName + suffix;
                        if (message.text) {
                            message.text = cleanText;
                        } else if (message.caption) {
                            message.caption = cleanText;
                        }
                        debugLog('[diag] GroupMention 剥离后缀:', cmdStr, '→', cmdName);
                    }
                    return null;
                }
                debugLog('[diag] GroupMention 拦截: 已知命令但 @ 了其他 bot', cmdStr);
                throw new StopMessageHandling('Ignore command for other bot');
            }
            // 未知命令: 无论 @ 谁, 一律拦截(包括 @ 本 bot)
            debugLog('[diag] GroupMention 拦截: 未知命令', cmdStr);
            throw new StopMessageHandling('Ignore unknown command');
        }
        // .生图 是中文别名命令, Telegram 不会为其生成 bot_command entity,
        // 这里检测到后直接放行(不去前缀), 交给 CommandHandler 的字符串匹配处理。
        // 与 GROUP_TRIGGER_PREFIX(.小助手) 不同: .小助手 是触发前缀(去掉后内容发 LLM),
        // .生图 是完整命令(必须原样保留才能被 CommandHandler 匹配), 故只放行不修改文本。
        if (message.text?.startsWith('.生图') || message.caption?.startsWith('.生图')) {
            debugLog('[diag] GroupMention 放行: .生图 命令');
            return null;
        }

        let isMention = false;
        // 检查text中是否有机器人的提及
        if (message.text && message.entities) {
            const res = checkMention(message.text, message.entities, botName, context.SHARE_CONTEXT.botId);
            isMention = res.isMention;
            message.text = res.content.trim();
            debugLog('[diag] GroupMention text@检测:', { isMention, text: message.text?.slice(0, 50) });
        }
        // 检查caption中是否有机器人的提及
        if (message.caption && message.caption_entities) {
            const res = checkMention(message.caption, message.caption_entities, botName, context.SHARE_CONTEXT.botId);
            isMention = res.isMention || isMention;
            message.caption = res.content.trim();
            debugLog('[diag] GroupMention caption@检测:', { isMention, caption: message.caption?.slice(0, 50) });
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
            debugLog('[diag] GroupMention 未命中 @bot, 抛 Not mention');
            throw new StopMessageHandling('Not mention');
        }
        debugLog('[diag] GroupMention 命中触发, 放行 -> 下一个');

        return null;
    };
}
