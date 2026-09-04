import type * as Telegram from 'telegram-bot-api-types';
import type { UpdateHandler } from './types';
import { WorkerContext } from '#/config';
import { GroupMention } from './group';
import {
    AdminMenuSync,
    CallbackQueryHandler,
    ChatHandler,
    CommandHandler,
    EnvChecker,
    MessageFilter,
    OldMessageFilter,
    SaveLastMessage,
    Update2MessageHandler,
    WhiteListFilter,
} from './handlers';

// 消息处理中间件
const SHARE_HANDLER: UpdateHandler[] = [
    // 检查环境是否准备好: DATABASE
    new EnvChecker(),
    // 过滤非白名单用户, 提前过滤减少KV消耗
    new WhiteListFilter(),
    // 回调处理
    new CallbackQueryHandler(),
    // 消息处理
    new Update2MessageHandler([
        // 过滤不支持的消息(抛出异常结束消息处理)
        new MessageFilter(),
        // 管理员菜单同步(方案B): 白名单用户在私聊发消息时, 动态为其设置专属命令菜单
        // (普通用户私聊只显示普通命令, 白名单用户通过 BotCommandScopeChat 显示完整菜单)
        // 放在 GroupMention 之前, 确保白名单用户任何私聊消息都能触发同步
        new AdminMenuSync(),
        // 处理群消息，判断是否需要响应此条消息
        new GroupMention(),
        // 忽略旧消息
        new OldMessageFilter(),
        // DEBUG: 保存最后一条消息,按照需求自行调整此中间件位置
        new SaveLastMessage(),
        // 处理命令消息
        new CommandHandler(),
        // 与llm聊天
        new ChatHandler(),
    ]),
];

export async function handleUpdate(token: string, update: Telegram.Update): Promise<Response | null> {
    const context = await WorkerContext.from(token, update);

    for (const handler of SHARE_HANDLER) {
        try {
            const result = await handler.handle(update, context);
            if (result) {
                return result;
            }
        } catch (e) {
            return new Response(JSON.stringify({
                message: (e as Error).message,
                stack: (e as Error).stack,
            }), { status: 500 });
        }
    }
    return null;
}
