import type { HistoryItem, HistoryModifierResult, UserMessageItem } from '#/agent';
import type { AgentUserConfigKey, WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import type { CommandHandler } from './types';
import { loadChatLLM, loadImageGen } from '#/agent';
import { ConfigMerger, ENV } from '#/config';
import { createTelegramBotAPI } from '../api';
import { isAdminUserId, isAnonymousAdminMessage, isGroupChat, TELEGRAM_AUTH_CHECKER } from '../auth';
import { chatWithMessage } from '../chat';
import { listBotReplyGroups, updateBotReplyGroups } from '../chat/replyGroup';
import { MessageSender } from '../sender';
import { loadChatRoleWithContext } from './auth';

export class ImgCommandHandler implements CommandHandler {
    command = '/img';
    // 图片功能暂时禁用: 不显示在菜单(空 scopes)
    scopes: string[] = [];
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
        // 图片功能已禁用
        return sender.sendPlainText('ERROR: Image function is disabled');
    };
}

export class HelpCommandHandler implements CommandHandler {
    command = '/help';
    // 方案B: 群聊不显示任何斜杠命令菜单, 仅私聊显示
    scopes = ['all_private_chats'];
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
        let helpMsg = `${ENV.I18N.command.help.summary}\n`;
        for (const [k, v] of Object.entries(ENV.I18N.command.help)) {
            if (k === 'summary') {
                continue;
            }
            helpMsg += `/${k}：${v}\n`;
        }
        for (const [k, v] of Object.entries(ENV.CUSTOM_COMMAND)) {
            if (v.description) {
                helpMsg += `${k}：${v.description}\n`;
            }
        }
        for (const [k, v] of Object.entries(ENV.PLUGINS_COMMAND)) {
            if (v.description) {
                helpMsg += `${k}：${v.description}\n`;
            }
        }
        return sender.sendPlainText(helpMsg);
    };
}

class BaseNewCommandHandler {
    static async handle(showID: boolean, message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> {
        await ENV.DATABASE.delete(context.SHARE_CONTEXT.chatHistoryKey);
        const text = ENV.I18N.command.new.new_chat_start + (showID ? `(${message.chat.id})` : '');
        const params: Telegram.SendMessageParams = {
            chat_id: message.chat.id,
            text,
        };
        if (ENV.SHOW_REPLY_BUTTON && !isGroupChat(message.chat.type)) {
            params.reply_markup = {
                keyboard: [[{ text: '/new' }, { text: '/redo' }]],
                selective: true,
                resize_keyboard: true,
                one_time_keyboard: false,
            };
        } else {
            params.reply_markup = {
                remove_keyboard: true,
                selective: true,
            };
        }
        return createTelegramBotAPI(context.SHARE_CONTEXT.botToken).sendMessage(params);
    }
}

export class NewCommandHandler extends BaseNewCommandHandler implements CommandHandler {
    command = '/new';
    scopes = ['all_private_chats'];
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        return BaseNewCommandHandler.handle(false, message, subcommand, context);
    };
}

export class StartCommandHandler extends BaseNewCommandHandler implements CommandHandler {
    command = '/start';
    scopes = ['all_private_chats'];
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        return BaseNewCommandHandler.handle(true, message, subcommand, context);
    };
}

export class SetEnvCommandHandler implements CommandHandler {
    command = '/setenv';
    scopes = [];
    adminOnly = true;
    needAuth = TELEGRAM_AUTH_CHECKER.adminOnly;
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
        const kv = subcommand.indexOf('=');
        if (kv === -1) {
            return sender.sendPlainText(ENV.I18N.command.help.setenv);
        }
        const key = subcommand.slice(0, kv);
        const value = subcommand.slice(kv + 1);
        try {
            await context.execChangeAndSave({ [key]: value } as Record<AgentUserConfigKey, any>);
            return sender.sendPlainText('Update user config success');
        } catch (e) {
            return sender.sendPlainText(`ERROR: ${(e as Error).message}`);
        }
    };
}

export class SetEnvsCommandHandler implements CommandHandler {
    command = '/setenvs';
    scopes = [];
    adminOnly = true;
    needAuth = TELEGRAM_AUTH_CHECKER.adminOnly;
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
        try {
            const values = JSON.parse(subcommand);
            await context.execChangeAndSave(values);
            return sender.sendPlainText('Update user config success');
        } catch (e) {
            return sender.sendPlainText(`ERROR: ${(e as Error).message}`);
        }
    };
}

export class DelEnvCommandHandler implements CommandHandler {
    command = '/delenv';
    scopes = [];
    adminOnly = true;
    needAuth = TELEGRAM_AUTH_CHECKER.adminOnly;
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
        if (ENV.LOCK_USER_CONFIG_KEYS.includes(subcommand as AgentUserConfigKey)) {
            const msg = `Key ${subcommand} is locked`;
            return sender.sendPlainText(msg);
        }
        try {
            context.USER_CONFIG[subcommand] = null;
            context.USER_CONFIG.DEFINE_KEYS = context.USER_CONFIG.DEFINE_KEYS.filter(key => key !== subcommand);
            await ENV.DATABASE.put(
                context.SHARE_CONTEXT.configStoreKey,
                JSON.stringify(ConfigMerger.trim(context.USER_CONFIG, ENV.LOCK_USER_CONFIG_KEYS)),
            );
            return sender.sendPlainText('Delete user config success');
        } catch (e) {
            return sender.sendPlainText(`ERROR: ${(e as Error).message}`);
        }
    };
}

export class ClearEnvCommandHandler implements CommandHandler {
    command = '/clearenv';
    scopes = [];
    adminOnly = true;
    needAuth = TELEGRAM_AUTH_CHECKER.adminOnly;
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
        try {
            await ENV.DATABASE.put(
                context.SHARE_CONTEXT.configStoreKey,
                JSON.stringify({}),
            );
            return sender.sendPlainText('Clear user config success');
        } catch (e) {
            return sender.sendPlainText(`ERROR: ${(e as Error).message}`);
        }
        ;
    };
}

export class VersionCommandHandler implements CommandHandler {
    command = '/version';
    scopes = [];
    adminOnly = true;
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
        const current = {
            ts: ENV.BUILD_TIMESTAMP,
            sha: ENV.BUILD_VERSION,
        };
        try {
            const info = `https://raw.githubusercontent.com/TBXark/ChatGPT-Telegram-Workers/${ENV.UPDATE_BRANCH}/dist/buildinfo.json`;
            const online = await fetch(info).then(r => r.json()) as { ts: number; sha: string };
            const timeFormat = (ts: number): string => {
                return new Date(ts * 1000).toLocaleString('en-US', {});
            };
            if (current.ts < online.ts) {
                const text = `New version detected: ${online.sha}(${timeFormat(online.ts)})\nCurrent version: ${current.sha}(${timeFormat(current.ts)})`;
                return sender.sendPlainText(text);
            } else {
                const text = `Current version: ${current.sha}(${timeFormat(current.ts)}) is up to date`;
                return sender.sendPlainText(text);
            }
        } catch (e) {
            return sender.sendPlainText(`ERROR: ${(e as Error).message}`);
        }
    };
}

export class SystemCommandHandler implements CommandHandler {
    command = '/system';
    scopes = [];
    adminOnly = true;
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
        const chatAgent = loadChatLLM(context.USER_CONFIG);
        const imageAgent = loadImageGen(context.USER_CONFIG);
        const agent = {
            AI_PROVIDER: chatAgent?.name,
            [chatAgent?.modelKey || 'AI_PROVIDER_NOT_FOUND']: chatAgent?.model(context.USER_CONFIG),
            AI_IMAGE_PROVIDER: imageAgent?.name,
            [imageAgent?.modelKey || 'AI_IMAGE_PROVIDER_NOT_FOUND']: imageAgent?.model(context.USER_CONFIG),
        };
        let msg = `<strong>AGENT</strong><pre>${JSON.stringify(agent, null, 2)}</pre>`;
        if (ENV.DEV_MODE) {
            const config = ConfigMerger.trim(context.USER_CONFIG, ENV.LOCK_USER_CONFIG_KEYS);
            msg += `\n\n<strong>USER_CONFIG</strong><pre>${JSON.stringify(config, null, 2)}</pre>`;

            const secretsSuffix = ['_API_KEY', '_TOKEN', '_ACCOUNT_ID'];
            for (const key of Object.keys(context.USER_CONFIG)) {
                if (secretsSuffix.some(suffix => key.endsWith(suffix))) {
                    context.USER_CONFIG[key] = '******';
                }
            }
            msg += `\n\n<strong>CHAT_CONTEXT</strong><pre>${JSON.stringify(sender.context || {}, null, 2)}</pre>`;

            const shareCtx = { ...context.SHARE_CONTEXT, botToken: '******' };
            msg += `\n\n<strong>SHARE_CONTEXT</strong><pre>${JSON.stringify(shareCtx, null, 2)}</pre>`;
        }
        return sender.sendRichText(msg, 'HTML');
    };
}

// /chat 命令: 将命令后的内容作为用户消息直接与 bot 对话。群聊中使用(私聊直接发消息即可)
// 方案B: 群聊不显示任何斜杠命令菜单, 但命令本身仍可在群聊中手动输入使用
export class ChatCommandHandler implements CommandHandler {
    command = '/chat';
    scopes = [];
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        if (!subcommand) {
            const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
            return sender.sendPlainText('Usage: /chat <your message>');
        }
        const params: UserMessageItem = {
            role: 'user',
            content: subcommand,
        };
        return chatWithMessage(message, params, context, null);
    };
}

// /clear 命令: 清理 bot 回复消息
// 作用范围: 群聊清屏(不注册菜单, 手动输入 /clear 触发), 也支持私聊
// 用法: 
//   1. 回复某条 bot 回复的消息 + /clear → 清除该回复拆分的所有消息(整组)
//   2. /clear N → 清理最近 N 条 bot 回复(按时间倒序, 跨组累计)
//   3. /clear all → 清理本会话记录的全部 bot 回复
// 权限: 配置的管理员(ADMIN_USER_IDS)或群组管理员(administrator/creator)
export class ClearCommandHandler implements CommandHandler {
    command = '/clear';
    scopes: string[] = [];
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
        const chatId = message.chat.id;
        const speakerId = message.from?.id;
        const chatType = message.chat.type;
        // 权限: 白名单管理员 或 群组管理员(administrator/creator) 或 群聊匿名管理员发言
        let allowed = isAdminUserId(speakerId) === true || isAnonymousAdminMessage(speakerId, chatType);
        let role = null;
        if (!allowed && speakerId != null && isGroupChat(chatType)) {
            role = await loadChatRoleWithContext(chatId, speakerId, context);
            allowed = role === 'administrator' || role === 'creator';
        }
        if (!allowed) {
            // 诊断日志: 输出权限判定所需信息, 便于排查线上管理员识别问题
            console.error('[clear] permission denied', {
                speakerId: speakerId ?? null,
                chatType,
                chatId,
                adminIds: ENV.ADMIN_USER_IDS,
                isAdmin: isAdminUserId(speakerId),
                isAnonymous: isAnonymousAdminMessage(speakerId, chatType),
                role,
            });
            return sender.sendPlainText('ERROR: Permission denied, admin only');
        }
        try {
            // 读取本会话记录的所有 bot 回复分组
            const groups = await listBotReplyGroups(context);
            if (groups.length === 0) {
                return sender.sendPlainText('No bot messages recorded to clear');
            }
            // 确定要删除的消息 id 列表
            const toDelete: number[] = [];
            const remaining: number[][] = [];
            if (message.reply_to_message) {
                // 模式1: 回复式——找到包含被回复消息的组, 整组删除
                const replyId = message.reply_to_message.message_id;
                let found = false;
                for (const group of groups) {
                    if (group.includes(replyId)) {
                        toDelete.push(...group);
                        found = true;
                    } else {
                        remaining.push(group);
                    }
                }
                if (!found) {
                    return sender.sendPlainText('Replied message is not a recorded bot reply');
                }
            } else if (subcommand.trim() === 'all') {
                // 模式3: 全清
                for (const group of groups) {
                    toDelete.push(...group);
                }
            } else if (subcommand.trim()) {
                // 模式2: /clear N —— 取最近 N 条(跨组按时间倒序)
                const n = Number.parseInt(subcommand.trim(), 10);
                if (!Number.isFinite(n) || n <= 0) {
                    return sender.sendPlainText('Usage: /clear [N|all], or reply to a bot message to clear it');
                }
                // 将分组展平为按时间顺序的消息 id 列表
                const flat: number[] = [];
                for (const group of groups) {
                    flat.push(...group);
                }
                const start = Math.max(0, flat.length - n);
                const deleteSet = new Set(flat.slice(start));
                toDelete.push(...deleteSet);
                // 剩余分组: 仅保留未被删除的消息 id
                for (const group of groups) {
                    const kept = group.filter(id => !deleteSet.has(id));
                    if (kept.length > 0) {
                        remaining.push(kept);
                    }
                }
            } else {
                return sender.sendPlainText('Usage: /clear [N|all], or reply to a bot message to clear it');
            }
            // 去重后逐条删除(忽略失败)
            const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
            let deleted = 0;
            const uniqueIds = [...new Set(toDelete)];
            for (const id of uniqueIds) {
                try {
                    const resp = await api.deleteMessage({ chat_id: chatId, message_id: id });
                    const json = await resp.clone().json().catch(() => null);
                    if (json?.ok) {
                        deleted++;
                    }
                } catch (e) {
                    console.error(e);
                }
            }
            // 更新 KV: 写入剩余分组
            await updateBotReplyGroups(context, remaining);
            // 删除 /clear 命令自身消息
            try {
                await api.deleteMessage({ chat_id: chatId, message_id: message.message_id });
            } catch (e) {
                console.error(e);
            }
            // 发送确认消息, 3 秒后自动删除
            const confirm = await sender.sendPlainText(`Cleared ${deleted} bot message(s)`);
            const confirmJson = await confirm.clone().json().catch(() => null) as Telegram.ResponseWithMessage | null;
            const confirmId = confirmJson?.result?.message_id;
            if (confirmId) {
                setTimeout(async () => {
                    try {
                        await api.deleteMessage({ chat_id: chatId, message_id: confirmId });
                    } catch (e) {
                        console.error(e);
                    }
                }, 3000);
            }
            return confirm;
        } catch (e) {
            return sender.sendPlainText(`ERROR: ${(e as Error).message}`);
        }
    };
}

export class RedoCommandHandler implements CommandHandler {
    command = '/redo';
    scopes = ['all_private_chats'];
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        const mf = (history: HistoryItem[], message: UserMessageItem | null): HistoryModifierResult => {
            let nextMessage = message;
            if (!(history && Array.isArray(history) && history.length > 0)) {
                throw new Error('History not found');
            }
            const historyCopy = structuredClone(history);
            while (true) {
                const data = historyCopy.pop();
                if (data === undefined || data === null) {
                    break;
                } else if (data.role === 'user') {
                    nextMessage = data;
                    break;
                }
            }
            if (subcommand) {
                nextMessage = {
                    role: 'user',
                    content: subcommand,
                };
            }
            if (nextMessage === null) {
                throw new Error('Redo message not found');
            }
            return { history: historyCopy, message: nextMessage };
        };
        return chatWithMessage(message, null, context, mf);
    };
}

export class ModelsCommandHandler implements CommandHandler {
    command = '/models';
    scopes = ['all_private_chats'];
    handle = async (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
        const chatAgent = loadChatLLM(context.USER_CONFIG);
        const text = `${chatAgent?.name || 'Nan'} | ${chatAgent?.model(context.USER_CONFIG) || 'Nan'}`;
        const params: Telegram.SendMessageParams = {
            chat_id: message.chat.id,
            text,
            reply_markup: {
                inline_keyboard: [[
                    {
                        text: ENV.I18N.callback_query.open_model_list,
                        callback_data: 'al:',
                    },
                ]],
            },
        };
        return sender.sendRawMessage(params);
    };
}

export class EchoCommandHandler implements CommandHandler {
    command = '/echo';
    handle = (message: Telegram.Message, subcommand: string, context: WorkerContext): Promise<Response> => {
        let msg = '<pre>';
        msg += JSON.stringify({ message }, null, 2);
        msg += '</pre>';
        return MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message).sendRichText(msg, 'HTML');
    };
}
