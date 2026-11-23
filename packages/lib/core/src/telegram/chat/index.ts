import type { HistoryModifier, ImageRequestMode, StreamResultHandler, UserContentPart, UserMessageItem } from '#/agent';
import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import { loadChatLLM, requestChatTurn } from '#/agent';
import { buildImageNotices, createImageDiagCounter } from '#/agent/utils';
import { ENV } from '#/config';
import { debugLog } from '#/utils/debug';
import { createTelegramBotAPI } from '../api';
import { PENDING_TEXT } from '../pending';
import { MessageSender } from '../sender';
import { getMediaGroupImageFileIds, recordMediaGroupImages } from './media-group';
import { collectReplyThread, threadDisplayName } from './reply-thread';
import { saveBotReplyGroup } from './replyGroup';

function isReplyToThisBot(message: Telegram.Message, context: WorkerContext): boolean {
    const author = message.reply_to_message?.from;
    return !!author && `${author.id}` === `${context.SHARE_CONTEXT.botId}`;
}

export async function chatWithMessage(message: Telegram.Message, params: UserMessageItem | null, context: WorkerContext, modifier: HistoryModifier | null, imageMode: ImageRequestMode = 'none', imageExtractFailed: number = 0): Promise<Response> {
    const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
    let pendingIds: number[] = [];
    let replyIds: number[] = [];
    try {
        try {
            const msg = await sender.sendPlainText(PENDING_TEXT).then(r => r.json()) as Telegram.ResponseWithMessage;
            if (msg.ok && msg.result?.message_id)
                sender.update({ message_id: msg.result.message_id });
        } catch (e) {
            console.error(e);
        }
        // 占位仍归 /clear 管理，但只有改成正文或流式内容后才作为问答链的锚点。
        pendingIds = sender.getSentMessageIds();
        const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
        setTimeout(() => api.sendChatAction({
            chat_id: message.chat.id,
            action: 'typing',
            ...(message.message_thread_id ? { message_thread_id: message.message_thread_id } : {}),
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
                    const resp = await sender.sendStreamPreview(text);
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
                        if (respJson.ok && respJson.result?.message_id)
                            sender.update({ message_id: respJson.result.message_id });
                    }
                } catch (e) {
                    console.error(e);
                }
            };
        }

        const agent = loadChatLLM(context.USER_CONFIG);
        if (agent === null) {
            return await sender.sendPlainText('LLM is not enable');
        }
        const imageDiag = createImageDiagCounter();
        const referenced = message.reply_to_message;
        const quote = message.quote?.text;
        const botReply = referenced && isReplyToThisBot(message, context) ? referenced : undefined;
        const fallback = !quote && ENV.EXTRA_MESSAGE_CONTEXT ? botReply?.text || botReply?.caption : undefined;
        const { text: answer, saveHistory } = await requestChatTurn(params, context, agent, modifier, onStream, imageMode, imageDiag, {
            includeSessionHistory: !referenced && !message.external_reply && !quote,
            inputMessageId: message.message_id,
            reply: botReply
                ? {
                        messageId: botReply.message_id,
                        fallback: fallback ? `[回复的机器人消息]\n${fallback}` : undefined,
                    }
                : undefined,
        });
        if (nextEnableTime !== null && nextEnableTime > Date.now()) {
            await new Promise(resolve => setTimeout(resolve, (nextEnableTime ?? 0) - Date.now()));
        }
        // 图片没能真正送到模型时明确告知用户(以前是完全静默的),
        // 避免"模型好像不记得我发过的图片"这种无法自证的体验。
        const notices = buildImageNotices(imageDiag, imageExtractFailed);
        const finalAnswer = notices.length > 0 ? `${answer}\n\n${notices.join('\n')}` : answer;
        // 预览不算最终回答；只有完整正文及独立代码块确认送达后才登记问答和回复锚点。
        const previewIds = sender.getSentMessageIds();
        pendingIds.push(...previewIds);
        sender.resetDelivery();
        const response = await sender.sendRichText(finalAnswer);
        replyIds = sender.getSentMessageIds();
        if (response.ok && sender.wasDelivered())
            await saveHistory(replyIds);
        return response;
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
            return partialText
                ? await sender.sendRichText(errMsg)
                : await sender.sendPlainText(errMsg);
        } catch (sendError) {
            console.error('Failed to send chat error:', sendError);
            return new Response(errMsg, { status: 500 });
        }
    } finally {
        // 即使回复中途失败，/clear 也能清理已经发出去的占位、片段和提示。
        await saveBotReplyGroup(context, [...new Set([...pendingIds, ...replyIds, ...sender.getSentMessageIds()])]);
    }
}

// 把 Telegram 图片下载为 Blob, 供图生图/改图作为底图使用; 失败时抛出可读错误
export async function downloadImageBlob(fileId: string, context: WorkerContext): Promise<Blob> {
    const fileUrl = await extractImageURL(fileId, context);
    if (!fileUrl) {
        throw new Error('无法从 Telegram 获取图片');
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);
    try {
        const res = await fetch(fileUrl.toString(), { signal: controller.signal });
        if (!res.ok)
            throw new Error(`下载图片失败: HTTP ${res.status}`);
        return await res.blob();
    } catch (e) {
        if (controller.signal.aborted)
            throw new Error('下载图片超时');
        throw e;
    } finally { clearTimeout(timer); }
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

// Bot API getFile 下载上限 20MB, 超过的文件无法下载原图, 只能回退缩略图
export const MAX_DOWNLOAD_FILE_SIZE = 20 * 1024 * 1024;
// 讨论串里最多附带几张图片(防止长链多图把 token 撑爆, 超出部分用“[图片]”占位)
const MAX_THREAD_IMAGES = 4;

export function extractImageFileID(message: Telegram.Message): string | null {
    if (message.photo && message.photo.length > 0) {
        const offset = ENV.TELEGRAM_PHOTO_SIZE_OFFSET;
        const length = message.photo.length;
        const sizeIndex = Math.max(0, Math.min(offset >= 0 ? offset : length + offset, length - 1));
        return message.photo[sizeIndex]?.file_id;
    }
    if (message.document) {
        // 以“文件”方式发送的图片(无压缩): 取原件, 获得真正的原始分辨率。
        // (以“照片”方式发送时 Telegram 只提供 ≤1280px 的压缩档位, 任何程序都拿不到原图)
        if (message.document.mime_type?.startsWith('image/')
            && (!message.document.file_size || message.document.file_size <= MAX_DOWNLOAD_FILE_SIZE)) {
            return message.document.file_id;
        }
        // 其他类型文件(如视频封面)或超出下载上限的图片: 用缩略图兜底
        return message.document.thumbnail?.file_id ?? null;
    }
    return null;
}

// 改图底图专用: 在 extractImageFileID 基础上支持静态表情包(.webp)。
// 动态表情包(.tgs 是 Lottie JSON)/视频表情包(.webm)无法在 Worker 内解码成图片，返回 null。
export function extractEditImageFileID(message: Telegram.Message): string | null {
    const fileId = extractImageFileID(message);
    if (fileId) {
        return fileId;
    }
    const sticker = message.sticker;
    if (sticker && !sticker.is_animated && !sticker.is_video) {
        return sticker.file_id;
    }
    return null;
}

export interface ExtractedUserMessage {
    params: UserMessageItem;
    imageMode: ImageRequestMode;
    /** 取图失败(无法从 Telegram 拿到图片地址)的数量, 用于提示用户 */
    imageExtractFailed: number;
}

// 引用的消息属于相册时, 把整组图片都带上。
// 客户端引用相册只能选中其中一张, Bot API 又无法按 media_group_id 反查同组其它图片,
// 只能依靠收到相册时记录的缓存补齐; 缓存未命中(如 bot 重启后引用旧相册)退化为只带选中的那张。
function appendReferencedImageFileIds(referencedMessage: Telegram.Message, imageFileIds: string[], botId: number): void {
    let fileIds: string[] | null = referencedMessage.media_group_id ? getMediaGroupImageFileIds(referencedMessage.media_group_id, referencedMessage.chat.id, botId) : null;
    if (!fileIds || fileIds.length === 0) {
        const single = extractImageFileID(referencedMessage);
        fileIds = single ? [single] : [];
    }
    const direct = extractImageFileID(referencedMessage);
    for (const id of [...(direct ? [direct] : []), ...fileIds]) {
        if (!imageFileIds.includes(id)) {
            imageFileIds.push(id);
        }
    }
}

export async function extractUserMessage(message: Telegram.Message, context: WorkerContext, albumMessages: Telegram.Message[] | null = null): Promise<ExtractedUserMessage> {
    debugLog('[diag] ChatHandler 消息提取开始:', {
        hasText: !!(message.text || message.caption),
        hasPhoto: !!message.photo?.length,
        hasReply: !!message.reply_to_message,
        replyHasText: !!(message.reply_to_message?.text || message.reply_to_message?.caption),
        replyHasPhoto: !!message.reply_to_message?.photo?.length,
    });
    let text = message.text || message.caption || '';
    const imageFileIds = new Array<string>();
    const ownImageFileId = extractImageFileID(message);
    if (ownImageFileId) {
        imageFileIds.push(ownImageFileId);
    }
    // 相册(一条消息带多张图): Telegram 把相册拆成多条消息送达, 由 ChatHandler 收齐整组后传入,
    // 这里把整组图片合并进同一次请求; caption 在第一条上, 代表消息没有文字时从组内找。
    if (albumMessages && albumMessages.length > 0) {
        if (!text) {
            const captioned = albumMessages.find(item => item.caption || item.text);
            if (captioned) {
                text = captioned.caption || captioned.text || '';
            }
        }
        const groupFileIds: string[] = [];
        for (const item of albumMessages) {
            const id = extractImageFileID(item);
            if (id && !groupFileIds.includes(id)) {
                groupFileIds.push(id);
            }
        }
        for (const id of groupFileIds) {
            if (!imageFileIds.includes(id)) {
                imageFileIds.push(id);
            }
        }
        // 记入相册缓存, 供之后“引用其中一张图”时把整组补给模型
        if (message.media_group_id) {
            recordMediaGroupImages(message.media_group_id, groupFileIds, message.chat.id, context.SHARE_CONTEXT.botId);
        }
    } else if (message.media_group_id && ownImageFileId) {
        // 兜底: 未经 ChatHandler 合并的单条相册消息(理论上少见), 至少记下自己这张
        recordMediaGroupImages(message.media_group_id, [ownImageFileId], message.chat.id, context.SHARE_CONTEXT.botId);
    }
    const referencedMessage = message.reply_to_message;
    const isReplyToBot = isReplyToThisBot(message, context);
    const quote = message.quote?.text;
    // 人类讨论沿 Telegram 的回复关系回溯；本 bot 的问答链从会话记录里按消息 ID 查找。
    let threadHandled = false;
    let quoteInThread = false;
    if (ENV.REPLY_THREAD_CONTEXT && referencedMessage && !isReplyToBot) {
        const botIdStr = `${context.SHARE_CONTEXT.botId}`;
        const thread = collectReplyThread(referencedMessage).filter(item => !item.from?.is_bot && `${item.from?.id}` !== botIdStr);
        if (thread.length >= 2) {
            // 先给直接目标及其相册留位置，再取最近祖先；文本仍按真实链从早到晚展示。
            if (ENV.EXTRA_MESSAGE_MEDIA_COMPATIBLE.includes('image')) {
                const candidates: string[] = [];
                appendReferencedImageFileIds(referencedMessage, candidates, context.SHARE_CONTEXT.botId);
                for (const item of [...thread].reverse()) appendReferencedImageFileIds(item, candidates, context.SHARE_CONTEXT.botId);
                let referencedCount = 0;
                for (const id of candidates) {
                    if (imageFileIds.includes(id))
                        continue;
                    if (referencedCount++ >= MAX_THREAD_IMAGES)
                        break;
                    imageFileIds.push(id);
                }
            }
            const lines: string[] = [];
            for (const item of thread) {
                const selected = item.message_id === referencedMessage.message_id ? quote : undefined;
                quoteInThread ||= !!selected;
                const content = selected || item.text || item.caption || '';
                const fileId = extractImageFileID(item);
                lines.push(`${threadDisplayName(item)}${selected ? '（引用原文）' : ''}: ${content || (fileId ? '[图片]' : '[不支持的内容]')}`);
            }
            text = `${text}\n[引用讨论串, 按时间从早到晚]\n${lines.join('\n')}`;
            threadHandled = true;
        }
    }
    if (!threadHandled && ENV.EXTRA_MESSAGE_CONTEXT && referencedMessage) {
        const extraText = quote || isReplyToBot ? '' : referencedMessage.text || referencedMessage.caption || '';
        if (extraText) {
            text = `${text}\nThe following is the referenced context: ${extraText}`;
        }
        if (ENV.EXTRA_MESSAGE_MEDIA_COMPATIBLE.includes('image') && extractImageFileID(referencedMessage)) {
            appendReferencedImageFileIds(referencedMessage, imageFileIds, context.SHARE_CONTEXT.botId);
        }
    } else if (!threadHandled && !text && !quote && referencedMessage && !isReplyToBot) {
        text = referencedMessage.text || referencedMessage.caption || '';
        if (!text && ENV.EXTRA_MESSAGE_MEDIA_COMPATIBLE.includes('image') && extractImageFileID(referencedMessage)) {
            appendReferencedImageFileIds(referencedMessage, imageFileIds, context.SHARE_CONTEXT.botId);
        }
    }
    if (quote && !quoteInThread) {
        text = `${text ? `${text}\n\n` : ''}[引用原文]\n${quote}`;
    }
    const hasImage = imageFileIds.length > 0;
    // 激进版: 不再判断文字是否需要识图, 有图就附图全量发送(gpt-free 默认支持识图)
    const imageMode: ImageRequestMode = hasImage ? 'image' : 'none';
    const shouldAttachImage = imageMode !== 'none';
    // 取图失败(如 getFile 超时)时旧实现会把失败的图片直接过滤掉, 模型完全不知道有图,
    // 这里统计失败数量, 让上层能明确告知用户。
    const extractedUrls = shouldAttachImage
        ? await Promise.all(imageFileIds.map(fileId => extractImageURL(fileId, context)))
        : [];
    const urls = extractedUrls.filter((url): url is URL => url !== null);
    const imageExtractFailed = extractedUrls.length - urls.length;
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
    return { params, imageMode: urls.length > 0 ? imageMode : 'none', imageExtractFailed };
}

export async function extractUserMessageItem(message: Telegram.Message, context: WorkerContext): Promise<UserMessageItem> {
    return (await extractUserMessage(message, context)).params;
}
