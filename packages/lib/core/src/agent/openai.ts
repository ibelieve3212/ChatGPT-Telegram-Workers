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
    ImageRequestMode,
    LLMChatParams,
} from './types';
import { ImageSupportFormat, loadOpenAIModelList, renderOpenAIMessages } from '#/agent/openai_compatibility';
import { debugLog } from '#/utils/debug';
import {
    getChatCompletionDeadlineMs,
    getStreamIdleTimeoutMs,
    getTextFirstContentTimeoutMs,
    requestChatCompletions,
} from './request';
import { bearerHeader, convertStringToResponseMessages, getAgentUserConfigFieldName } from './utils';

function openAIApiKey(context: AgentUserConfig): string {
    const length = context.OPENAI_API_KEY.length;
    return context.OPENAI_API_KEY[Math.floor(Math.random() * length)];
}

/**
 * 判断渲染后的消息数组是否携带图片内容。
 */
function messagesHasImage(renderedMessages: any[]): boolean {
    return renderedMessages.some(m => Array.isArray(m.content) && m.content.some((c: any) => c.type === 'image_url' || c.type === 'image_base64'));
}

export class OpenAI implements ChatAgent {
    readonly name = 'openai';
    readonly modelKey = getAgentUserConfigFieldName('OPENAI_CHAT_MODEL');

    readonly enable: AgentEnable = ctx => ctx.OPENAI_API_KEY.length > 0;
    readonly model: AgentModel = ctx => ctx.OPENAI_CHAT_MODEL;
    readonly modelList: AgentModelList = ctx => loadOpenAIModelList(ctx.OPENAI_CHAT_MODELS_LIST, ctx.OPENAI_API_BASE, bearerHeader(openAIApiKey(ctx)));

    readonly request: ChatAgentRequest = async (params: LLMChatParams, context: AgentUserConfig, onStream: ChatStreamTextHandler | null): Promise<ChatAgentResponse> => {
        const { prompt, messages } = params;
        const deadlineMs = params.deadlineMs || getChatCompletionDeadlineMs();
        if (deadlineMs <= Date.now()) {
            throw new Error('LLM request exceeded the synchronous webhook deadline');
        }
        const url = `${context.OPENAI_API_BASE}/chat/completions`;
        const header = bearerHeader(openAIApiKey(context));
        debugLog('[diag] OpenAI 消息渲染开始:', {
            messageCount: messages.length,
        });
        // 永远发送完整历史，靠 messages 维持多轮上下文（Cherry Studio 模式）
        const renderedMessages = await renderOpenAIMessages(prompt, messages, [ImageSupportFormat.URL, ImageSupportFormat.BASE64]);
        const hasImage = messagesHasImage(renderedMessages);
        if (deadlineMs <= Date.now()) {
            throw new Error('LLM request exceeded the synchronous webhook deadline');
        }
        const imageMode: ImageRequestMode = hasImage ? (params.imageMode || 'image') : 'none';
        // 激进版: 不再区分图片/文字首字超时, 统一 CHAT_FIRST_TOKEN_TIMEOUT
        const firstContentTimeoutMs = getTextFirstContentTimeoutMs();
        debugLog('[diag] OpenAI 请求准备:', {
            imageMode,
            firstContentTimeoutMs,
            remainingBudgetMs: Math.max(0, deadlineMs - Date.now()),
        });
        const body = {
            ...(context.OPENAI_API_EXTRA_PARAMS || {}),
            model: context.OPENAI_CHAT_MODEL,
            stream: onStream != null,
            messages: renderedMessages,
        };
        const requestOptions = {
            deadlineMs,
            firstContentTimeoutMs,
            idleTimeoutMs: getStreamIdleTimeoutMs(),
            retry: !hasImage,
        };
        const text = await requestChatCompletions(url, header, body, onStream, null, requestOptions);
        return convertStringToResponseMessages(text);
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
