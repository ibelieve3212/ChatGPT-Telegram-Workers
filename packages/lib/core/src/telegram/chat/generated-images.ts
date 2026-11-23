import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import { ENV } from '#/config';

function keyOf(context: WorkerContext, chatId: number, messageId: number): string {
    // 来源属于 bot+chat+消息，不跟群共享/按人历史开关耦合。
    return `generated-image:${context.SHARE_CONTEXT.botId}:${chatId}:${messageId}`;
}

export async function recordGeneratedImage(response: Response, message: Telegram.Message, context: WorkerContext): Promise<void> {
    try {
        const body = await response.clone().json() as Telegram.ResponseWithMessage;
        if (response.ok && body.ok && body.result?.message_id) {
            await ENV.DATABASE.put(keyOf(context, message.chat.id, body.result.message_id), '1');
        }
    } catch (e) { console.error('[image] 无法登记生成图:', e); }
}

export async function isGeneratedImage(message: Telegram.Message, context: WorkerContext): Promise<boolean> {
    try {
        return await ENV.DATABASE.get(keyOf(context, message.chat.id, message.message_id)) === '1';
    } catch (e) {
        console.error('[image] 无法核对生成图来源:', e);
        return false;
    }
}
