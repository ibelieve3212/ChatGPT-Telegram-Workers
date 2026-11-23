import type { TelegramBotAPI } from './api';

// 占位和流式预览的清理必须检查 Telegram body；fetch 不会因为 HTTP 429 自动抛错。
export async function deleteTransientMessage(api: TelegramBotAPI, chatId: number, messageId: number): Promise<boolean> {
    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            const response = await api.deleteMessage({ chat_id: chatId, message_id: messageId });
            const body = await response.json() as { ok?: boolean; description?: string; parameters?: { retry_after?: number } };
            if (response.ok && body.ok)
                return true;
            if (/message (?:to delete )?(?:not found|is not found|can'?t be deleted|cannot be deleted)/i.test(body.description || ''))
                return true;
            const seconds = body.parameters?.retry_after ?? Number(response.headers.get('Retry-After'));
            if (response.status === 429 && seconds > 0 && seconds <= 5 && attempt < 2) {
                await new Promise(resolve => setTimeout(resolve, seconds * 1000));
                continue;
            }
            console.warn(`[cleanup] 删除 ${messageId} 失败 (${response.status}): ${body.description || ''}`);
            return false;
        } catch (e) {
            console.warn(`[cleanup] 删除 ${messageId} 异常:`, e);
            return false;
        }
    }
    return false;
}
