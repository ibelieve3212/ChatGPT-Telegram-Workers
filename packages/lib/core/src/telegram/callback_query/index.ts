import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import { loadChatRoleWithContext } from '../command/auth';
import { ADMIN_AUTH_MARK, isAnonymousAdminMessage, isAdminUserId, isGroupChat } from '../auth';
import { MessageSender } from '../sender';
import { AgentListCallbackQueryHandler, ModelChangeCallbackQueryHandler, ModelListCallbackQueryHandler } from './system';

const QUERY_HANDLERS = [
    AgentListCallbackQueryHandler.Chat(),
    AgentListCallbackQueryHandler.Image(),
    ModelListCallbackQueryHandler.Chat(),
    ModelListCallbackQueryHandler.Image(),
    ModelChangeCallbackQueryHandler.Chat(),
    ModelChangeCallbackQueryHandler.Image(),
];

export async function handleCallbackQuery(callbackQuery: Telegram.CallbackQuery, context: WorkerContext): Promise<Response | null> {
    const sender = MessageSender.fromCallbackQuery(context.SHARE_CONTEXT.botToken, callbackQuery);
    const answerCallbackQuery = (msg: string): Promise<Response> => {
        return sender.api.answerCallbackQuery({
            callback_query_id: callbackQuery.id,
            text: msg,
        });
    };
    try {
        if (!callbackQuery.message) {
            return null;
        }
        const chatId = callbackQuery.message.chat.id;
        const speakerId = callbackQuery.from?.id || chatId;
        const chatType = callbackQuery.message.chat.type;
        for (const handler of QUERY_HANDLERS) {
            // 如果存在权限条件
            if (handler.needAuth) {
                const roleList = handler.needAuth(chatType);
                if (roleList) {
                    let allowed = false;
                    if (roleList.includes(ADMIN_AUTH_MARK)) {
                        // 管理员模式
                        const isAdmin = isAdminUserId(speakerId);
                        if (isAdmin === true || isAnonymousAdminMessage(speakerId, chatType)) {
                            allowed = true;
                        } else if (isAdmin === false) {
                            return answerCallbackQuery('ERROR: Permission denied, admin only');
                        } else {
                            // 未配置 ADMIN_USER_IDS → 回退到群聊角色判断
                            if (!isGroupChat(chatType)) {
                                return answerCallbackQuery('ERROR: Permission denied, admin only');
                            }
                            const chatRole = await loadChatRoleWithContext(chatId, speakerId, context);
                            if (chatRole === null) {
                                return answerCallbackQuery('ERROR: Get chat role failed');
                            }
                            if (chatRole !== 'administrator' && chatRole !== 'creator') {
                                return answerCallbackQuery('ERROR: Permission denied, admin only');
                            }
                            allowed = true;
                        }
                    } else {
                        // 普通角色鉴权
                        const chatRole = await loadChatRoleWithContext(chatId, speakerId, context);
                        if (chatRole === null) {
                            return answerCallbackQuery('ERROR: Get chat role failed');
                        }
                        if (!roleList.includes(chatRole)) {
                            return answerCallbackQuery(`ERROR: Permission denied, need ${roleList.join(' or ')}`);
                        }
                        allowed = true;
                    }
                    if (!allowed) {
                        return answerCallbackQuery('ERROR: Permission denied');
                    }
                }
            }
            if (callbackQuery.data) {
                if (callbackQuery.data.startsWith(handler.prefix)) {
                    return handler.handle(callbackQuery, callbackQuery.data, context);
                }
            }
        }
    } catch (e) {
        console.error('handleCallbackQuery', e);
        return answerCallbackQuery(`ERROR: ${(e as Error).message}`);
    }
    return null;
}
