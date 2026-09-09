import type { HistoryModifier, ImageRequestMode, StreamResultHandler, UserContentPart, UserMessageItem } from '#/agent';
import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import { loadChatLLM, requestCompletionsFromLLM } from '#/agent';
import { ENV } from '#/config';
import { createTelegramBotAPI } from '../api';
import { MessageSender } from '../sender';
import { saveBotReplyGroup } from './replyGroup';

export async function chatWithMessage(message: Telegram.Message, params: UserMessageItem | null, context: WorkerContext, modifier: HistoryModifier | null, imageMode: ImageRequestMode = 'none'): Promise<Response> {
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
        const answer = await requestCompletionsFromLLM(params, context, agent, modifier, onStream, imageMode);
        if (nextEnableTime !== null && nextEnableTime > Date.now()) {
            await new Promise(resolve => setTimeout(resolve, (nextEnableTime ?? 0) - Date.now()));
        }
        const resp = await sender.sendRichText(answer);
        // 记录本次回复的所有消息 id(含长消息拆分), 供 /clear 命令整组清理
        await saveBotReplyGroup(context, sender.getSentMessageIds());
        return resp;
    } catch (e) {
        console.error('[diag] chatWithMessage 处理失败:', (e as Error).message);
        const partialText = typeof (e as any)?.partialText === 'string' ? (e as any).partialText.trim() : '';
        let errMsg = partialText
            ? `${partialText}\n\n[生成中断] ${(e as Error).message}`
            : `Error: ${(e as Error).message}`;
        if (errMsg.length > 2048 && !partialText) {
            // 裁剪错误信息 最长2048
            errMsg = errMsg.substring(0, 2048);
        }
        try {
            const resp = partialText
                ? await sender.sendRichText(errMsg)
                : await sender.sendPlainText(errMsg);
            await saveBotReplyGroup(context, sender.getSentMessageIds());
            return resp;
        } catch (sendError) {
            console.error('Failed to send chat error:', sendError);
            // 补发 [生成中断] 消息也失败时, 已通过流式发送的分段消息 id 仍在 sender 里,
            // 必须持久化到 KV, 否则这些截断消息会成为 /clear 永远清不掉的孤儿。
            await saveBotReplyGroup(context, sender.getSentMessageIds()).catch(() => undefined);
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
    let timeoutID: ReturnType<typeof setTimeout> | null = null;
    try {
        const file = await Promise.race([
            api.getFileWithReturns({ file_id: fileId }),
            new Promise<never>((_, reject) => {
                timeoutID = setTimeout(() => reject(new Error('getFile timeout')), GET_FILE_TIMEOUT);
            }),
        ]);
        const filePath = file.result?.file_path;
        if (!filePath) {
            throw new Error('getFile returned no file path');
        }
        return URL.parse(`${ENV.TELEGRAM_API_DOMAIN}/file/bot${context.SHARE_CONTEXT.botToken}/${filePath}`);
    } catch (e) {
        console.error('extractImageURL failed:', e);
        return null;
    } finally {
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
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

export interface ExtractedUserMessage {
    params: UserMessageItem;
    imageMode: ImageRequestMode;
}

const REQUIRED_IMAGE_PATTERNS = [
    /识图|看图|读图|ocr/i,
    /(?:图片?|照片|截图|画面)[中里上].{0,12}(?:是什么|有什么|写了|显示|内容)/,
    /(?:分析|描述|识别|解读|查看|阅读|读取|提取).{0,8}(?:[这该附]|上面)?张?(?:图片?|照片|截图|画面)/,
    /what(?:'s| is) (?:in|shown in) (?:this|the|attached) (?:image|photo|picture|screenshot)/i,
    /(?:describe|analy[sz]e|read|extract|transcribe|inspect).{0,20}(?:this|the|attached)?\s*(?:image|photo|picture|screenshot)/i,
    /(?:extract|read|transcribe).{0,20}text.{0,20}(?:from|in).{0,10}(?:this|the|attached)?\s*(?:image|photo|picture|screenshot)/i,
];

export function requiresImageUnderstanding(text: string): boolean {
    return REQUIRED_IMAGE_PATTERNS.some(pattern => pattern.test(text));
}

export async function extractUserMessage(message: Telegram.Message, context: WorkerContext): Promise<ExtractedUserMessage> {
    console.log('[diag] ChatHandler 消息提取开始:', {
        hasText: !!(message.text || message.caption),
        hasPhoto: !!message.photo?.length,
        hasReply: !!message.reply_to_message,
        replyHasText: !!(message.reply_to_message?.text || message.reply_to_message?.caption),
        replyHasPhoto: !!message.reply_to_message?.photo?.length,
    });
    let text = message.text || message.caption || '';
    const instructionText = text;
    const imageFileIds = new Array<string>();
    const ownImageFileId = extractImageFileID(message);
    if (ownImageFileId) {
        imageFileIds.push(ownImageFileId);
    }
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
            const fileId = extractImageFileID(referencedMessage);
            if (fileId) {
                imageFileIds.push(fileId);
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
            const fileId = extractImageFileID(referencedMessage);
            if (fileId) {
                imageFileIds.push(fileId);
            }
        }
    }
    const hasImage = imageFileIds.length > 0;
    const imageMode: ImageRequestMode = !hasImage
        ? 'none'
        : !text.trim() || requiresImageUnderstanding(instructionText)
                ? 'required'
                : 'optional';
    const shouldAttachImage = imageMode !== 'none';
    const urls = shouldAttachImage
        ? (await Promise.all(imageFileIds.map(fileId => extractImageURL(fileId, context)))).filter((url): url is URL => url !== null)
        : [];
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
    return { params, imageMode: urls.length > 0 ? imageMode : 'none' };
}

export async function extractUserMessageItem(message: Telegram.Message, context: WorkerContext): Promise<UserMessageItem> {
    return (await extractUserMessage(message, context)).params;
}
