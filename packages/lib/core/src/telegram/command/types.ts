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
     * 等待反馈: 分发器统一负责, 不写就是默认文案。
     * false 表示这个命令自己已经给了反馈(/chat 自己发占位), 分发器不要再发。
     */
    pending?: PendingOptions | false;
}
