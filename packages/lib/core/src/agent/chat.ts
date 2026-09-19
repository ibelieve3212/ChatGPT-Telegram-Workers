import type { WorkerContext } from '#/config';
import type { ChatAgent, HistoryItem, HistoryModifier, ImageRequestMode, LLMChatParams, UserMessageItem } from './types';
import { ENV } from '#/config';
import { getChatCompletionDeadlineMs } from './request';
import { extractTextContent } from './utils';

function tokensCounter(): (text: string) => number {
    return (text) => {
        return text.length;
    };
}

async function loadHistory(key: string, chatType?: string): Promise<HistoryItem[]> {
    // 会话闲时自动重置: 仅群聊生效, 避免多人长时段后强行耦合旧上下文
    // 私聊 1v1 场景下隔段时间继续之前话题是自然诉求, 不应被清空
    const isGroupChat = chatType === 'group' || chatType === 'supergroup';
    if (isGroupChat && ENV.SESSION_IDLE_TIMEOUT > 0) {
        const lastActiveKey = `last_active:${key}`;
        const now = Math.floor(Date.now() / 1000);
        let lastActive = 0;
        try {
            lastActive = Number.parseInt(await ENV.DATABASE.get(lastActiveKey) || '0', 10);
        } catch (e) {
            console.error(e);
        }
        if (lastActive > 0 && now - lastActive > ENV.SESSION_IDLE_TIMEOUT) {
            await ENV.DATABASE.delete(key).catch(() => null);
        }
        // 更新活跃时间戳, 带过期避免长期不用的会话堆积垃圾 key
        await ENV.DATABASE.put(lastActiveKey, String(now), { expirationTtl: ENV.SESSION_IDLE_TIMEOUT * 2 }).catch(() => null);
    }
    // 加载历史记录
    let history = [];
    try {
        history = JSON.parse(await ENV.DATABASE.get(key));
    } catch (e) {
        console.error(e);
    }
    if (!history || !Array.isArray(history)) {
        history = [];
    }

    const counter = tokensCounter();

    const trimHistory = (list: HistoryItem[], initLength: number, maxLength: number, maxToken: number) => {
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

export async function requestCompletionsFromLLM(params: UserMessageItem | null, context: WorkerContext, agent: ChatAgent, modifier: HistoryModifier | null, onStream: StreamResultHandler | null, imageMode: ImageRequestMode = 'none'): Promise<string> {
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
    const llmParams: LLMChatParams = {
        prompt: context.USER_CONFIG.SYSTEM_INIT_MESSAGE || undefined,
        messages: [...history, params],
        imageMode,
        deadlineMs: getChatCompletionDeadlineMs(context.requestStartedAt),
    };
    const { text, responses } = await agent.request(llmParams, context.USER_CONFIG, onStream);
    if (!historyDisable) {
        const editParams = { ...params };
        if (ENV.HISTORY_IMAGE_PLACEHOLDER) {
            if (Array.isArray(editParams.content)) {
                const imageCount = editParams.content.filter(i => i.type === 'image').length;
                const textContent = editParams.content.findLast(i => i.type === 'text');
                if (textContent) {
                    editParams.content = editParams.content.filter(i => i.type !== 'image');
                    textContent.text = textContent.text + ` ${ENV.HISTORY_IMAGE_PLACEHOLDER}`.repeat(imageCount);
                }
            }
        }
        await ENV.DATABASE.put(historyKey, JSON.stringify([...history, editParams, ...responses])).catch(console.error);
    }
    return text;
}
