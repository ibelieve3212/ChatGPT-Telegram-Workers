import type { WorkerContext } from '#/config';
import type { ChatAgent, HistoryItem, HistoryModifier, ImageDiagCounter, ImageRequestMode, LLMChatParams, UserMessageItem } from './types';
import { ENV } from '#/config';
import { debugLog } from '#/utils/debug';
import { getChatCompletionDeadlineMs } from './request';
import { createImageDiagCounter, extractTextContent, recordImageRender } from './utils';

// 只存于该轮的 user 条目。回复拆成多条时，任意一条都能定位到同一轮。
type StoredHistoryItem = HistoryItem & {
    replyLink?: { messageIds: number[]; parentId?: number };
};

function tokensCounter(): (text: string) => number {
    return (text) => {
        return text.length;
    };
}

export async function loadHistory(key: string, chatType?: string): Promise<StoredHistoryItem[]> {
    // 会话闲时自动重置: 群聊默认开启(SESSION_IDLE_TIMEOUT), 避免多人长时段后强行耦合旧上下文;
    // 私聊默认不重置(1v1 场景隔段时间继续之前话题是自然诉求), 可通过 SESSION_IDLE_TIMEOUT_PRIVATE 按需开启
    const isGroupChat = chatType === 'group' || chatType === 'supergroup';
    const idleTimeout = isGroupChat ? ENV.SESSION_IDLE_TIMEOUT : ENV.SESSION_IDLE_TIMEOUT_PRIVATE;
    if (idleTimeout > 0) {
        const lastActiveKey = `last_active:${key}`;
        const now = Math.floor(Date.now() / 1000);
        let lastActive = 0;
        try {
            lastActive = Number.parseInt(await ENV.DATABASE.get(lastActiveKey) || '0', 10);
        } catch (e) {
            console.error(e);
        }
        // 哨兵 key 带 TTL(2×超时时长), 闲置超过 TTL 时会被 KV 自动删除。
        // 读取不到说明闲置至少已超过一个 TTL 周期(必然大于超时阈值), 同样需要重置会话;
        // 否则隔天回来时哨兵已过期消失, 重置被跳过, 前一天的旧历史会复活。
        // 全新会话时历史为空, 删除是无副作用的 no-op。
        if (lastActive === 0 || now - lastActive > idleTimeout) {
            await ENV.DATABASE.delete(key).catch(() => null);
        }
        // 更新活跃时间戳, 带过期避免长期不用的会话堆积垃圾 key
        await ENV.DATABASE.put(lastActiveKey, String(now), { expirationTtl: idleTimeout * 2 }).catch(() => null);
    }
    // 加载历史记录
    let history: StoredHistoryItem[] = [];
    try {
        history = JSON.parse(await ENV.DATABASE.get(key));
    } catch (e) {
        console.error(e);
    }
    if (!history || !Array.isArray(history)) {
        history = [];
    }

    const counter = tokensCounter();

    const trimHistory = (list: StoredHistoryItem[], initLength: number, maxLength: number, maxToken: number) => {
    // 历史记录超出长度需要裁剪, 小于0不裁剪
        if (maxLength >= 0 && list.length > maxLength) {
            list = list.splice(list.length - maxLength);
        }
        // 处理token长度问题, 小于0不裁剪
        if (maxToken > 0) {
            let tokenLength = initLength;
            for (let i = list.length - 1; i >= 0; i--) {
                const historyItem = list[i];
                let length = 0;
                if (historyItem.content) {
                    length = counter(extractTextContent(historyItem));
                } else {
                    historyItem.content = '';
                }
                // 如果最大长度超过maxToken,裁剪history
                tokenLength += length;
                if (tokenLength > maxToken) {
                    list = list.splice(i + 1);
                    break;
                }
            }
        }
        return list;
    };

    // 裁剪
    if (ENV.AUTO_TRIM_HISTORY && ENV.MAX_HISTORY_LENGTH > 0) {
        history = trimHistory(history, 0, ENV.MAX_HISTORY_LENGTH, ENV.MAX_TOKEN_LENGTH);
    }

    return history;
}

export type StreamResultHandler = (text: string) => Promise<any>;

interface ChatTurnOptions {
    includeSessionHistory?: boolean;
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
    { includeSessionHistory = true, reply }: ChatTurnOptions = {},
) {
    const historyDisable = ENV.AUTO_TRIM_HISTORY && ENV.MAX_HISTORY_LENGTH <= 0;
    const historyKey = context.SHARE_CONTEXT.chatHistoryKey;
    if (!historyKey) {
        throw new Error('History key not found');
    }
    let history = await loadHistory(historyKey, context.SHARE_CONTEXT.chatType);
    if (modifier) {
        const modifierData = modifier(history, params || null);
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
        await ENV.DATABASE.put(historyKey, JSON.stringify([...history, editParams, ...responses])).catch(console.error);
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
