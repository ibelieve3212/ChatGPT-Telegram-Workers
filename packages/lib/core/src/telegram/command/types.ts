import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';

export interface CommandHandler {
    command: string;
    scopes?: string[];
    handle: (message: Telegram.Message, subcommand: string, context: WorkerContext) => Promise<Response>;
    needAuth?: (chatType: string) => string[] | null;
    // 标记为管理命令: 菜单中不在全局 scope(all_chat_administrators) 显示,
    // 而是在白名单用户发消息时通过 chat_member scope 动态设置
    adminOnly?: boolean;
}
