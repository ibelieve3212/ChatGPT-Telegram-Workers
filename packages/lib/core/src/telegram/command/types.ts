import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import type { PendingOptions } from '../pending';

export interface CommandHandler {
    command: string;
    scopes?: string[];
    handle: (message: Telegram.Message, subcommand: string, context: WorkerContext) => Promise<Response>;
    needAuth?: (chatType: string) => string[] | null;
    // 标记为管理命令: 菜单中不在全局 scope(all_chat_administrators) 显示,
    // 而是在白名单用户发消息时通过 chat_member scope 动态设置
    adminOnly?: boolean;
    /**
     * 等待反馈: 只有明确声明了才发占位消息, 不写就什么都不发。
     * 慢命令(生图/AV/插件)自己声明; 瞬时命令(/new /help /version 等)不要声明,
     * 否则占位消息刚发出去就要删, 用户会看到一下闪烁。
     */
    pending?: PendingOptions | false;
}
