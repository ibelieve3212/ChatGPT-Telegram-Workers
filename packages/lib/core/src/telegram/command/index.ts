import type { WorkerContext } from '#/config';
import type { RequestTemplate } from '@chatgpt-telegram-workers/plugins';
import type * as Telegram from 'telegram-bot-api-types';
import type { CommandHandler } from './types';
import { ENV } from '#/config';
import { ADMIN_AUTH_MARK } from '../auth';
import { executeRequest, formatInput } from '@chatgpt-telegram-workers/plugins';
import { MessageSender } from '../sender';
import { loadChatRoleWithContext } from './auth';
import { isAdminUserId, isGroupChat } from '../auth';
import {
    ChatCommandHandler,
    ClearCommandHandler,
    ClearEnvCommandHandler,
    DelEnvCommandHandler,
    EchoCommandHandler,
    HelpCommandHandler,
    ImgCommandHandler,
    ModelsCommandHandler,
    NewCommandHandler,
    RedoCommandHandler,
    SetEnvCommandHandler,
    SetEnvsCommandHandler,
    StartCommandHandler,
    SystemCommandHandler,
    VersionCommandHandler,
} from './system';

const SYSTEM_COMMANDS: CommandHandler[] = [
    new StartCommandHandler(),
    new NewCommandHandler(),
    new RedoCommandHandler(),
    new ChatCommandHandler(),
    new ImgCommandHandler(),
    new SetEnvCommandHandler(),
    new SetEnvsCommandHandler(),
    new DelEnvCommandHandler(),
    new ClearEnvCommandHandler(),
    new VersionCommandHandler(),
    new SystemCommandHandler(),
    new ModelsCommandHandler(),
    new HelpCommandHandler(),
    new ClearCommandHandler(),
];

async function handleSystemCommand(message: Telegram.Message, raw: string, command: CommandHandler, context: WorkerContext): Promise<Response> {
    const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
    try {
        const chatId = message.chat.id;
        const speakerId = message.from?.id || chatId;
        const chatType = message.chat.type;
        // 如果存在权限条件
        if (command.needAuth) {
            const roleList = command.needAuth(chatType);
            if (roleList) {
                let allowed = false;
                // 管理员模式
                if (roleList.includes(ADMIN_AUTH_MARK)) {
                    const isAdmin = isAdminUserId(speakerId);
                    if (isAdmin === true) {
                        allowed = true;
                    } else if (isAdmin === false) {
                        // 已配置白名单但用户不在其中 → 拒绝
                        console.error('[auth] admin check failed', { speakerId, chatId, chatType, isAdmin, adminIds: ENV.ADMIN_USER_IDS });
                        return sender.sendPlainText('ERROR: Permission denied, admin only');
                    } else {
                        // 未配置 ADMIN_USER_IDS → 回退到群聊角色判断
                        if (!isGroupChat(chatType)) {
                            // 私聊回退: 仅本人可管理自己配置(回退现状)
                            // 这里 adminOnly 命令(如 setenv)在未配置白名单时, 私聊仍限群角色不适用,
                            // 保守起见按非管理员处理。如需恢复旧行为请配置 ADMIN_USER_IDS。
                            return sender.sendPlainText('ERROR: Permission denied, admin only');
                        }
                        const chatRole = await loadChatRoleWithContext(chatId, speakerId, context);
                        if (chatRole === null) {
                            return sender.sendPlainText('ERROR: Get chat role failed');
                        }
                        if (chatRole !== 'administrator' && chatRole !== 'creator') {
                            return sender.sendPlainText('ERROR: Permission denied, admin only');
                        }
                        allowed = true;
                    }
                } else {
                    // 普通角色鉴权(如 shareModeGroup)
                    const chatRole = await loadChatRoleWithContext(chatId, speakerId, context);
                    if (chatRole === null) {
                        return sender.sendPlainText('ERROR: Get chat role failed');
                    }
                    if (!roleList.includes(chatRole)) {
                        return sender.sendPlainText(`ERROR: Permission denied, need ${roleList.join(' or ')}`);
                    }
                    allowed = true;
                }
                if (!allowed) {
                    return sender.sendPlainText('ERROR: Permission denied');
                }
            }
        }
    } catch (e) {
        return sender.sendPlainText(`ERROR: ${(e as Error).message}`);
    }
    const subcommand = raw.substring(command.command.length).trim();
    try {
        return await command.handle(message, subcommand, context);
    } catch (e) {
        return sender.sendPlainText(`ERROR: ${(e as Error).message}`);
    }
}

async function handlePluginCommand(message: Telegram.Message, command: string, raw: string, template: RequestTemplate, context: WorkerContext): Promise<Response> {
    const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
    try {
        const subcommand = raw.substring(command.length).trim();
        if (template.input?.required && !subcommand) {
            throw new Error('Missing required input');
        }
        const DATA = formatInput(subcommand, template.input?.type);
        const { type, content } = await executeRequest(template, {
            DATA,
            ENV: ENV.PLUGINS_ENV,
        });
        switch (type) {
            case 'image':
                return sender.sendPhoto(content);
            case 'html':
                return sender.sendRichText(content, 'HTML');
            case 'markdown':
                return sender.sendRichText(content, 'Markdown');
            case 'text':
            default:
                return sender.sendPlainText(content);
        }
    } catch (e) {
        const help = ENV.PLUGINS_COMMAND[command].description;
        return sender.sendPlainText(`ERROR: ${(e as Error).message}${help ? `\n${help}` : ''}`);
    }
}

export async function handleCommandMessage(message: Telegram.Message, context: WorkerContext): Promise<Response | null> {
    let text = (message.text || message.caption || '').trim();

    if (ENV.CUSTOM_COMMAND[text]) {
        // 替换自定义命令为系统命令
        text = ENV.CUSTOM_COMMAND[text].value;
    }

    if (ENV.DEV_MODE) {
        // 插入调试命令
        SYSTEM_COMMANDS.push(new EchoCommandHandler());
    }

    // 查找插件命令
    for (const key in ENV.PLUGINS_COMMAND) {
        if (text === key || text.startsWith(`${key} `)) {
            let template = ENV.PLUGINS_COMMAND[key].value.trim();
            if (template.startsWith('http')) {
                template = await fetch(template).then(r => r.text());
            }
            return await handlePluginCommand(message, key, text, JSON.parse(template), context);
        }
    }

    // 查找系统命令
    for (const cmd of SYSTEM_COMMANDS) {
        if (text === cmd.command || text.startsWith(`${cmd.command} `)) {
            return await handleSystemCommand(message, text, cmd, context);
        }
    }
    return null;
}

export function commandsBindScope(): Record<string, Telegram.SetMyCommandsParams> {
    const scopeCommandMap: Record<string, Telegram.BotCommand[]> = {
        all_private_chats: [],
        all_group_chats: [],
        all_chat_administrators: [],
    };
    for (const cmd of SYSTEM_COMMANDS) {
        if (ENV.HIDE_COMMAND_BUTTONS.includes(cmd.command)) {
            continue;
        }
        if (cmd.scopes) {
            for (const scope of cmd.scopes) {
                if (!scopeCommandMap[scope]) {
                    scopeCommandMap[scope] = [];
                }
                const desc = ENV.I18N.command.help[cmd.command.substring(1)] || '';
                if (desc) {
                    scopeCommandMap[scope].push({
                        command: cmd.command,
                        description: desc,
                    });
                }
            }
        }
    }
    for (const list of [ENV.CUSTOM_COMMAND, ENV.PLUGINS_COMMAND]) {
        for (const [cmd, config] of Object.entries(list)) {
            if (config.scope) {
                for (const scope of config.scope) {
                    // 方案B: 群聊不显示任何斜杠命令, 自定义命令也只注册到私聊
                    if (scope !== 'all_private_chats') {
                        continue;
                    }
                    if (!scopeCommandMap[scope]) {
                        scopeCommandMap[scope] = [];
                    }
                    scopeCommandMap[scope].push({
                        command: cmd,
                        description: config.description || '',
                    });
                }
            }
        }
    }
    const result: Record<string, Telegram.SetMyCommandsParams> = {};
    for (const scope in scopeCommandMap) {
        result[scope] = {
            commands: scopeCommandMap[scope],
            scope: {
                type: scope,
            },
        };
    }
    return result;
}

// 构建 BotCommandScopeChat(chat_id=user_id) 的完整命令列表(普通命令 + 管理命令)
// 用于白名单用户在私聊中动态同步管理员专属菜单
// (普通命令 + 管理命令 + 注册在私聊 scope 的自定义命令)
export function commandsForChatMember(): Telegram.BotCommand[] {
    const list: Telegram.BotCommand[] = [];
    for (const cmd of SYSTEM_COMMANDS) {
        if (ENV.HIDE_COMMAND_BUTTONS.includes(cmd.command)) {
            continue;
        }
        // 跳过完全禁用的命令(/img)
        if (cmd.scopes && cmd.scopes.length === 0 && !cmd.adminOnly) {
            continue;
        }
        const desc = ENV.I18N.command.help[cmd.command.substring(1)] || '';
        if (desc) {
            list.push({
                command: cmd.command,
                description: desc,
            });
        }
    }
    for (const list2 of [ENV.CUSTOM_COMMAND, ENV.PLUGINS_COMMAND]) {
        for (const [cmd, config] of Object.entries(list2)) {
            // 自定义/插件命令: 仅包含注册在私聊 scope 的
            const scope = config.scope || [];
            if (scope.includes('all_private_chats')) {
                const desc = config.description || '';
                if (desc) {
                    list.push({
                        command: cmd,
                        description: desc,
                    });
                }
            }
        }
    }
    return list;
}

export function commandsDocument(): { description: string; command: string }[] {
    return SYSTEM_COMMANDS.map((command) => {
        return {
            command: command.command,
            description: ENV.I18N.command.help[command.command.substring(1)] || '',
        };
    }).filter(item => item.description !== '');
}
