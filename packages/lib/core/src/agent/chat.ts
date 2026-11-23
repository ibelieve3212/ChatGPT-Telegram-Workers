import type { WorkerContext } from '#/config';
import type { StoredHistoryItem } from './history';
import type { ChatAgent, HistoryModifier, ImageDiagCounter, ImageRequestMode, LLMChatParams, UserMessageItem } from './types';
import { ENV } from '#/config';
import { debugLog } from '#/utils/debug';
import { openHistorySession } from './history';
import { getChatCompletionDeadlineMs } from './request';
import { createImageDiagCounter, recordImageRender } from './utils';

export { loadHistory, resetChatHistory } from './history';

export type StreamResultHandler = (text: string) => Promise<any>;

interface ChatTurnOptions {
    includeSessionHistory?: boolean;
    inputMessageId?: number;
    reply?: { messageId: number; fallback?: string };
}

// 只沿明确的回复关系回溯。旧版历史没有链接、或父轮已被裁剪时就停止，不用相邻轮次凑上下文。
function selectReplyHistory(history: StoredHistoryItem[], messageId: number): StoredHistoryItem[] {
    const turns: StoredHistoryItem[][] = [];
    let targetId: number | undefined = messageId;
    let limit = history.length;
    while (targetId !== undefined) {
        let start = limit - 1;
        for (; start >= 0; start--) {
            const item = history[start];
            if (item?.role === 'user' && Array.isArray(item.replyLink?.messageIds) && item.replyLink.messageIds.includes(targetId)) {
                break;
            }
        }
        if (start < 0) {
            break;
        }
        let end = start + 1;
        while (end < limit && (history[end]?.role === 'assistant' || history[end]?.role === 'tool')) {
            end++;
        }
        if (end === start + 1) {
            break;
        }
        turns.push(history.slice(start, end));
        targetId = history[start].replyLink?.parentId;
        limit = start;
    }
    return turns.reverse().flat();
}

function appendContext(message: UserMessageItem, text: string): UserMessageItem {
    if (typeof message.content === 'string') {
        return { ...message, content: message.content ? `${message.content}\n\n${text}` : text };
    }
    return { ...message, content: [...message.content, { type: 'text', text }] };
}

// 生成与写入分开：Telegram 发完回复才知道所有分段的消息 ID，届时一并保存问答和链接。
export async function requestChatTurn(
    params: UserMessageItem | null,
    context: WorkerContext,
    agent: ChatAgent,
    modifier: HistoryModifier | null,
    onStream: StreamResultHandler | null,
    imageMode: ImageRequestMode = 'none',
    imageDiag?: ImageDiagCounter,
    { includeSessionHistory = true, inputMessageId, reply }: ChatTurnOptions = {},
) {
    const historyDisable = ENV.AUTO_TRIM_HISTORY && ENV.MAX_HISTORY_LENGTH <= 0;
    const historyKey = context.SHARE_CONTEXT.chatHistoryKey;
    if (!historyKey) {
        throw new Error('History key not found');
    }
    const session = await openHistorySession(historyKey, context.SHARE_CONTEXT.chatType, context.requestStartedAt, inputMessageId);
    let history = session.items;
    if (modifier) {
        // 修饰本轮请求的上下文，不重写已经保存的问答。
        const modifierData = modifier(history, params);
        history = modifierData.history;
        params = modifierData.message;
    }
    if (!params) {
        throw new Error('Message is empty');
    }
    const replyHistory = reply && !historyDisable ? selectReplyHistory(history, reply.messageId) : [];
    const requestHistory = reply ? replyHistory : (includeSessionHistory ? history : []);
    const fallback = replyHistory.length === 0 ? reply?.fallback : undefined;
    const userMessage = fallback ? appendContext(params, fallback) : params;
    debugLog('[diag] 聊天上下文:', {
        scope: reply ? 'bot_reply' : (includeSessionHistory ? 'session' : 'reference'),
        replyMessageId: reply?.messageId,
        historyMessages: requestHistory.length,
    });
    // 图片加载统计: 图片取图/下载失败时以前是静默丢弃, 这里显式统计,
    // 用于给用户明确提示(否则只能靠"模型好像不记得图"去猜)以及 DEBUG 排查。
    const diag = imageDiag ?? createImageDiagCounter();
    const llmParams: LLMChatParams = {
        prompt: context.USER_CONFIG.SYSTEM_INIT_MESSAGE || undefined,
        // 分支筛选只影响出站请求，原会话历史仍保留。链接也不发送给模型。
        messages: [...requestHistory.map(({ role, content }) => ({ role, content })), userMessage],
        imageMode,
        deadlineMs: getChatCompletionDeadlineMs(context.requestStartedAt),
        onImageRender: report => recordImageRender(diag, report),
        // 当前消息固定为末尾一条(上面已保证 params 非空)
        currentMessageCount: 1,
    };
    const { text, responses } = await agent.request(llmParams, context.USER_CONFIG, onStream);
    debugLog('[image] 本轮请求图片统计:', {
        当前消息: diag.current,
        历史消息: diag.history,
    });
    const saveHistory = async (messageIds: number[] = []) => {
        if (historyDisable) {
            return;
        }
        const editParams: StoredHistoryItem = { ...userMessage };
        if (messageIds.length > 0) {
            editParams.replyLink = { messageIds, parentId: replyHistory.length > 0 ? reply?.messageId : undefined };
        }
        if (ENV.HISTORY_IMAGE_PLACEHOLDER && Array.isArray(editParams.content)) {
            const textContent = editParams.content.findLast(part => part.type === 'text');
            if (textContent) {
                const imageCount = editParams.content.filter(part => part.type === 'image').length;
                editParams.content = editParams.content.filter(part => part.type !== 'image').map(part => (
                    part === textContent
                        ? { ...textContent, text: textContent.text + ` ${ENV.HISTORY_IMAGE_PLACEHOLDER}`.repeat(imageCount) }
                        : part
                ));
            }
        }
        await session.append([editParams, ...responses]).catch(error => console.error('[history] 保存问答失败:', error));
    };
    return { text, saveHistory };
}

export async function requestCompletionsFromLLM(
    params: UserMessageItem | null,
    context: WorkerContext,
    agent: ChatAgent,
    modifier: HistoryModifier | null,
    onStream: StreamResultHandler | null,
    imageMode: ImageRequestMode = 'none',
    imageDiag?: ImageDiagCounter,
    options?: ChatTurnOptions,
): Promise<string> {
    const { text, saveHistory } = await requestChatTurn(params, context, agent, modifier, onStream, imageMode, imageDiag, options);
    await saveHistory();
    return text;
}
