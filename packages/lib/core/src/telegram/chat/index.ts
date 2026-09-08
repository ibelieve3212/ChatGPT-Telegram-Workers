import type { HistoryModifier, StreamResultHandler, UserContentPart, UserMessageItem } from '#/agent';
import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import { loadChatLLM, requestCompletionsFromLLM } from '#/agent';
import { ENV } from '#/config';
import { createTelegramBotAPI } from '../api';
import { MessageSender } from '../sender';
import { saveBotReplyGroup } from './replyGroup';

export async function chatWithMessage(message: Telegram.Message, params: UserMessageItem | null, context: WorkerContext, modifier: HistoryModifier | null): Promise<Response> {
    const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
    try {
        try {
            const msg = await sender.sendPlainText('...').then(r => r.json()) as Telegram.ResponseWithMessage;
            sender.update({
                message_id: msg.result.message_id,
            });
        } catch (e) {
            console.error(e);
        }
        const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
        setTimeout(() => api.sendChatAction({
            chat_id: message.chat.id,
            action: 'typing',
        }).catch(console.error), 0);
        let onStream: StreamResultHandler | null = null;
        let nextEnableTime: number | null = null;
        if (ENV.STREAM_MODE) {
            onStream = async (text: string): Promise<any> => {
                try {
                    // 判断是否需要等待
                    if (nextEnableTime && nextEnableTime > Date.now()) {
                        return;
                    }
                    const resp = await sender.sendPlainText(text);
                    // 判断429
                    if (resp.status === 429) {
                        // 获取重试时间
                        const retryAfter = Number.parseInt(resp.headers.get('Retry-After') || '');
                        if (retryAfter) {
                            nextEnableTime = Date.now() + retryAfter * 1000;
                            return;
                        }
                    }
                    nextEnableTime = null;
                    if (resp.ok) {
                        const respJson = await resp.json() as Telegram.ResponseWithMessage;
                        sender.update({
                            message_id: respJson.result.message_id,
                        });
                    }
                } catch (e) {
                    console.error(e);
                }
            };
        }

        const agent = loadChatLLM(context.USER_CONFIG);
        if (agent === null) {
            const resp = await sender.sendPlainText('LLM is not enable');
            await saveBotReplyGroup(context, sender.getSentMessageIds());
            return resp;
        }
        const answer = await requestCompletionsFromLLM(params, context, agent, modifier, onStream);
        if (nextEnableTime !== null && nextEnableTime > Date.now()) {
            await new Promise(resolve => setTimeout(resolve, (nextEnableTime ?? 0) - Date.now()));
        }
        const resp = await sender.sendRichText(answer);
        // 记录本次回复的所有消息 id(含长消息拆分), 供 /clear 命令整组清理
        await saveBotReplyGroup(context, sender.getSentMessageIds());
        return resp;
    } catch (e) {
        console.error('[diag] chatWithMessage 处理失败:', (e as Error).message);
        let errMsg = `Error: ${(e as Error).message}`;
        if (errMsg.length > 2048) {
            // 裁剪错误信息 最长2048
            errMsg = errMsg.substring(0, 2048);
        }
        try {
            const resp = await sender.sendPlainText(errMsg);
            await saveBotReplyGroup(context, sender.getSentMessageIds());
            return resp;
        } catch (sendError) {
            console.error('Failed to send chat error:', sendError);
            return new Response(errMsg, { status: 500 });
        }
    }
}

export async function extractImageURL(fileId: string | null, context: WorkerContext): Promise<URL | null> {
    if (!fileId) {
        return null;
    }
    const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
    // getFile 加超时保护: 正常 ~1s, 超过 5s 视为卡死, 放弃图片只发文字, 不阻塞整条消息
    const GET_FILE_TIMEOUT = 5_000;
    try {
        const file = await Promise.race([
            api.getFileWithReturns({ file_id: fileId }),
            new Promise<never>((_, reject) => setTimeout(() => reject(new Error('getFile timeout')), GET_FILE_TIMEOUT)),
        ]);
        const filePath = file.result?.file_path;
        if (!filePath) {
            throw new Error('getFile returned no file path');
        }
        return URL.parse(`${ENV.TELEGRAM_API_DOMAIN}/file/bot${context.SHARE_CONTEXT.botToken}/${filePath}`);
    } catch (e) {
        console.error('extractImageURL failed:', e);
        return null;
    }
}

export function extractImageFileID(message: Telegram.Message): string | null {
    if (message.photo && message.photo.length > 0) {
        const offset = ENV.TELEGRAM_PHOTO_SIZE_OFFSET;
        const length = message.photo.length;
        const sizeIndex = Math.max(0, Math.min(offset >= 0 ? offset : length + offset, length - 1));
        return message.photo[sizeIndex]?.file_id;
    } else if (message.document && message.document.thumbnail) {
        return message.document.thumbnail.file_id;
    }
    return null;
}

export async function extractUserMessageItem(message: Telegram.Message, context: WorkerContext): Promise<UserMessageItem> {
    console.log('[diag] ChatHandler 消息提取开始:', {
        hasText: !!(message.text || message.caption),
        hasPhoto: !!message.photo?.length,
        hasReply: !!message.reply_to_message,
        replyHasText: !!(message.reply_to_message?.text || message.reply_to_message?.caption),
        replyHasPhoto: !!message.reply_to_message?.photo?.length,
    });
    let text = message.text || message.caption || '';
    const urls = await extractImageURL(extractImageFileID(message), context).then(u => u ? [u] : []);
    const referencedMessage = message.reply_to_message;
    const isReplyToBot = `${referencedMessage?.from?.id}` === `${context.SHARE_CONTEXT.botId}`;
    if (
        ENV.EXTRA_MESSAGE_CONTEXT
        && referencedMessage
        && !isReplyToBot
    ) {
        const extraText = referencedMessage.text || referencedMessage.caption || '';
        if (extraText) {
            text = `${text}\nThe following is the referenced context: ${extraText}`;
        }
        if (ENV.EXTRA_MESSAGE_MEDIA_COMPATIBLE.includes('image') && referencedMessage.photo) {
            const url = await extractImageURL(extractImageFileID(referencedMessage), context);
            if (url) {
                urls.push(url);
            }
        }
    } else if (
        // 频道消息可能只有 sender_chat 而没有 from，仍应作为引用上下文。
        !text
        && referencedMessage
        && !isReplyToBot
    ) {
        text = referencedMessage.text || referencedMessage.caption || '';
        if (!text && ENV.EXTRA_MESSAGE_MEDIA_COMPATIBLE.includes('image') && referencedMessage.photo) {
            const url = await extractImageURL(extractImageFileID(referencedMessage), context);
            if (url) {
                urls.push(url);
            }
        }
    }
    if (!text.trim() && urls.length === 0) {
        throw new Error('Message has no supported text or image content');
    }
    const params: UserMessageItem = {
        role: 'user',
        content: text,
    };
    if (urls.length > 0) {
        const contents = new Array<UserContentPart>();
        if (text) {
            contents.push({ type: 'text', text });
        }
        for (const url of urls) {
            contents.push({ type: 'image', image: url });
        }
        params.content = contents;
    }
    return params;
}
