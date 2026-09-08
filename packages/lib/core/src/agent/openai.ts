import type { AgentUserConfig } from '#/config';
import type {
    AgentEnable,
    AgentModel,
    AgentModelList,
    ChatAgent,
    ChatAgentRequest,
    ChatAgentResponse,
    ChatStreamTextHandler,
    ImageAgent,
    ImageAgentRequest,
    LLMChatParams,
} from './types';
import { ImageSupportFormat, loadOpenAIModelList, renderOpenAIMessages } from '#/agent/openai_compatibility';
import { ENV } from '#/config';
import { FirstTokenTimeoutError, getChatCompletionTimeoutBudgetMs, requestChatCompletions } from './request';
import { bearerHeader, convertStringToResponseMessages, getAgentUserConfigFieldName } from './utils';

/**
 * 判断渲染后的消息数组是否携带图片内容。
 * 用于首内容超时降级: 带图片的请求才启用首内容超时, 超时后降级为纯文字重试。
 */
function messagesHasImage(renderedMessages: any[]): boolean {
    return renderedMessages.some(m => Array.isArray(m.content) && m.content.some((c: any) => c.type === 'image_url' || c.type === 'image_base64'));
}

export function getImageFirstTokenTimeoutMs(hasImage: boolean, requestBudgetMs?: number): number {
    if (!hasImage || ENV.IMAGE_FIRST_TOKEN_TIMEOUT <= 0 || (requestBudgetMs !== undefined && requestBudgetMs <= 0)) {
        return 0;
    }
    const configuredTimeoutMs = ENV.IMAGE_FIRST_TOKEN_TIMEOUT * 1000;
    if (requestBudgetMs === undefined) {
        return configuredTimeoutMs;
    }
    return Math.min(configuredTimeoutMs, Math.max(1_000, Math.floor(requestBudgetMs / 2)));
}

function openAIApiKey(context: AgentUserConfig): string {
    const length = context.OPENAI_API_KEY.length;
    return context.OPENAI_API_KEY[Math.floor(Math.random() * length)];
}

export class OpenAI implements ChatAgent {
    readonly name = 'openai';
    readonly modelKey = getAgentUserConfigFieldName('OPENAI_CHAT_MODEL');

    readonly enable: AgentEnable = ctx => ctx.OPENAI_API_KEY.length > 0;
    readonly model: AgentModel = ctx => ctx.OPENAI_CHAT_MODEL;
    readonly modelList: AgentModelList = ctx => loadOpenAIModelList(ctx.OPENAI_CHAT_MODELS_LIST, ctx.OPENAI_API_BASE, bearerHeader(openAIApiKey(ctx)));

    readonly request: ChatAgentRequest = async (params: LLMChatParams, context: AgentUserConfig, onStream: ChatStreamTextHandler | null): Promise<ChatAgentResponse> => {
        const { prompt, messages, sessionId } = params;
        const totalTimeoutMs = getChatCompletionTimeoutBudgetMs();
        const deadline = totalTimeoutMs > 0 ? Date.now() + totalTimeoutMs : 0;
        const remainingTimeoutMs = () => deadline > 0 ? Math.max(0, deadline - Date.now()) : undefined;
        const url = `${context.OPENAI_API_BASE}/chat/completions`;
        const header = bearerHeader(openAIApiKey(context));
        // 注入会话请求头，使支持 X-Session-Id 的 API 能维持会话隔离与上下文
        // sessionId 基于 chatHistoryKey 派生（私聊=用户ID, 群聊=群ID, 群聊共享模式=群共享上下文)
        // 若不注入, 某些按会话维护上下文的 API 会把所有请求归入同一全局上下文, 导致用户间互相串场
        if (sessionId) {
            header[context.OPENAI_SESSION_HEADER] = sessionId;
        }
        console.log('[diag] OpenAI 消息渲染开始:', {
            messageCount: context.OPENAI_SESSION_MODE ? 1 : messages.length,
            sessionMode: context.OPENAI_SESSION_MODE,
        });
        // 会话模式下 API 靠 X-Session-Id 记忆上下文, 会忽略 messages 历史, 因此只发当前消息
        const renderedMessages = context.OPENAI_SESSION_MODE
            ? await renderOpenAIMessages(undefined, messages.slice(-1), [ImageSupportFormat.URL, ImageSupportFormat.BASE64])
            : await renderOpenAIMessages(prompt, messages, [ImageSupportFormat.URL, ImageSupportFormat.BASE64]);
        // 检测本次请求是否携带图片(用于首内容超时降级)
        const hasImage = messagesHasImage(renderedMessages);
        const imageRequestBudgetMs = remainingTimeoutMs();
        const firstTokenTimeout = getImageFirstTokenTimeoutMs(hasImage, imageRequestBudgetMs);
        console.log('[diag] OpenAI 请求准备:', {
            hasImage,
            firstTokenTimeoutMs: firstTokenTimeout,
            requestBudgetMs: imageRequestBudgetMs ?? 0,
        });
        const body = {
            ...(context.OPENAI_API_EXTRA_PARAMS || {}),
            model: context.OPENAI_CHAT_MODEL,
            stream: onStream != null,
            messages: renderedMessages,
        };
        try {
            const text = await requestChatCompletions(url, header, body, onStream, null, firstTokenTimeout, imageRequestBudgetMs);
            return convertStringToResponseMessages(text);
        } catch (e) {
            // 带图片请求首内容超时 -> 上游可能不支持图片处理(如 gpt-free), 降级为纯文字重试一次
            if (hasImage && e instanceof FirstTokenTimeoutError) {
                console.log('[diag] OpenAI 图片请求首内容超时, 降级为纯文字重试');
                const textOnlyMessages = context.OPENAI_SESSION_MODE
                    ? await renderOpenAIMessages(undefined, messages.slice(-1), null)
                    : await renderOpenAIMessages(prompt, messages, null);
                const textOnlyBody = {
                    ...(context.OPENAI_API_EXTRA_PARAMS || {}),
                    model: context.OPENAI_CHAT_MODEL,
                    stream: onStream != null,
                    messages: textOnlyMessages,
                };
                const text = await requestChatCompletions(url, header, textOnlyBody, onStream, null, 0, remainingTimeoutMs());
                return convertStringToResponseMessages(text);
            }
            throw e;
        }
    };
}

export class Dalle implements ImageAgent {
    readonly name = 'openai';
    readonly modelKey = getAgentUserConfigFieldName('IMAGE_MODEL');

    readonly enable: AgentEnable = ctx => !!ctx.IMAGE_API_BASE && !!ctx.IMAGE_API_KEY;
    readonly model: AgentModel = ctx => ctx.IMAGE_MODEL;
    readonly modelList: AgentModelList = ctx => loadOpenAIModelList(ctx.IMAGE_MODELS_LIST, ctx.IMAGE_API_BASE!, bearerHeader(ctx.IMAGE_API_KEY!));

    readonly request: ImageAgentRequest = async (prompt: string, context: AgentUserConfig): Promise<string | Blob> => {
        const url = `${context.IMAGE_API_BASE}/images/generations`;
        const header = bearerHeader(context.IMAGE_API_KEY!);
        const body: any = {
            prompt,
            n: 1,
            size: context.IMAGE_SIZE,
            model: context.IMAGE_MODEL,
        };
        const resp = await fetch(url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(body),
        }).then(res => res.json()) as any;

        if (resp.error?.message) {
            throw new Error(resp.error.message);
        }
        return resp?.data?.at(0)?.url;
    };
}
