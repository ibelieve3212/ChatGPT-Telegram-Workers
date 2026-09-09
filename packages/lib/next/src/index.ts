import type { ProviderV2 } from '@ai-sdk/provider';
import type { AgentUserConfig, ChatAgent, ChatAgentResponse, ChatStreamTextHandler, HistoryItem, ImageRequestMode, LLMChatParams, ResponseMessage } from '@chatgpt-telegram-workers/core';
import type { AssistantModelMessage, LanguageModel, ModelMessage, ToolModelMessage } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createAzure } from '@ai-sdk/azure';
import { createCohere } from '@ai-sdk/cohere';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createMistral } from '@ai-sdk/mistral';
import { createOpenAI } from '@ai-sdk/openai';
import { appendStreamUpdate, CompletionLengthError, createStreamUpdateState, FirstTokenTimeoutError, getChatCompletionDeadlineMs, getImageFirstContentTimeoutMs, getStreamIdleTimeoutMs, IncompleteStreamError, StreamIdleTimeoutError } from '@chatgpt-telegram-workers/core';
import { generateText, streamText } from 'ai';

function convertResponseToMessages(messages: (AssistantModelMessage | ToolModelMessage)[]): ResponseMessage[] {
    return messages.map((message) => {
        if (message.role && message.content) {
            return {
                role: message.role,
                content: message.content,
            } as ResponseMessage;
        }
        return null;
    }).filter(message => message !== null) as ResponseMessage[];
}

interface RequestV2Params {
    model: LanguageModel;
    system?: string;
    messages: HistoryItem[];
    imageMode?: ImageRequestMode;
    deadlineMs?: number;
}

function messagesHaveImage(messages: HistoryItem[]): boolean {
    return messages.some(message => Array.isArray(message.content) && message.content.some((part: any) => part.type === 'image'));
}

function stripImages(messages: HistoryItem[]): HistoryItem[] {
    return messages.map((message) => {
        if (!Array.isArray(message.content)) {
            return message;
        }
        const content = (message.content as any[]).filter(part => part.type !== 'image');
        return { ...message, content } as HistoryItem;
    });
}

export async function requestChatCompletionsV2(params: RequestV2Params, onStream: ChatStreamTextHandler | null): Promise<ChatAgentResponse> {
    const deadlineMs = params.deadlineMs || getChatCompletionDeadlineMs();
    const hasImage = messagesHaveImage(params.messages);
    const imageMode: ImageRequestMode = hasImage ? (params.imageMode || 'optional') : 'none';
    try {
        return await requestChatCompletionsV2Once({ ...params, imageMode, deadlineMs }, onStream);
    } catch (e) {
        if (imageMode !== 'optional' || !(e instanceof FirstTokenTimeoutError)) {
            throw e;
        }
        console.log('[diag] Next 可选图片首内容超时, 去图重试');
        return requestChatCompletionsV2Once({
            ...params,
            messages: stripImages(params.messages),
            imageMode: 'none',
            deadlineMs,
        }, onStream);
    }
}

async function requestChatCompletionsV2Once(params: RequestV2Params, onStream: ChatStreamTextHandler | null): Promise<ChatAgentResponse> {
    const messages = params.messages as Array<ModelMessage>;
    const controller = new AbortController();
    const deadlineMs = params.deadlineMs || getChatCompletionDeadlineMs();
    const firstContentTimeoutMs = getImageFirstContentTimeoutMs(params.imageMode || 'none');
    const idleTimeoutMs = getStreamIdleTimeoutMs();
    let abortReason: 'deadline' | 'first-content' | 'idle' | null = null;
    let timeoutID: ReturnType<typeof setTimeout> | null = null;
    const resetTimeout = (timeoutMs: number, reason: typeof abortReason) => {
        if (timeoutID) {
            clearTimeout(timeoutID);
            timeoutID = null;
        }
        const remainingMs = deadlineMs - Date.now();
        if (remainingMs <= 0) {
            abortReason = 'deadline';
            controller.abort();
            return;
        }
        if (timeoutMs <= 0) {
            timeoutID = setTimeout(() => {
                abortReason = 'deadline';
                controller.abort();
            }, remainingMs);
            return;
        }
        const effectiveTimeoutMs = Math.min(timeoutMs, remainingMs);
        timeoutID = setTimeout(() => {
            abortReason = effectiveTimeoutMs === remainingMs ? 'deadline' : reason;
            controller.abort();
        }, effectiveTimeoutMs);
    };
    if (onStream !== null) {
        resetTimeout(firstContentTimeoutMs, 'first-content');
    } else {
        resetTimeout(0, 'deadline');
    }
    const baseOptions = {
        model: params.model,
        messages,
        abortSignal: controller.signal,
        ...(params.system ? { system: params.system } : {}),
    };

    try {
        if (onStream !== null) {
            const stream = streamText(baseOptions);
            const updateState = createStreamUpdateState();
            for await (const textPart of stream.textStream) {
                if (!textPart) {
                    continue;
                }
                resetTimeout(idleTimeoutMs, 'idle');
                await appendStreamUpdate(updateState, textPart, onStream);
            }
            const text = updateState.contentFull;
            if (controller.signal.aborted) {
                if (abortReason === 'first-content') {
                    throw new FirstTokenTimeoutError();
                }
                if (abortReason === 'idle') {
                    throw new StreamIdleTimeoutError(text);
                }
                throw new IncompleteStreamError('LLM request exceeded the synchronous webhook deadline', !!text, text);
            }
            const finishReason = await stream.finishReason;
            if (controller.signal.aborted) {
                throw new IncompleteStreamError('LLM request exceeded the synchronous webhook deadline', !!text, text);
            }
            if (finishReason === 'length') {
                throw new CompletionLengthError(text);
            }
            if (finishReason !== 'stop') {
                throw new IncompleteStreamError(`LLM response stopped with finish reason: ${finishReason}`, !!text, text);
            }
            if (!text.trim()) {
                throw new Error('LLM returned an empty response');
            }
            const response = await stream.response;
            if (controller.signal.aborted) {
                throw new IncompleteStreamError('LLM request exceeded the synchronous webhook deadline', true, text);
            }
            return {
                text,
                responses: convertResponseToMessages(response.messages),
            };
        }
        const result = await generateText(baseOptions);
        if (result.finishReason === 'length') {
            throw new CompletionLengthError(result.text);
        }
        if (result.finishReason !== 'stop') {
            throw new IncompleteStreamError(`LLM response stopped with finish reason: ${result.finishReason}`, !!result.text, result.text);
        }
        if (!result.text.trim()) {
            throw new Error('LLM returned an empty response');
        }
        return {
            text: result.text,
            responses: convertResponseToMessages(result.response.messages),
        };
    } catch (e) {
        if (controller.signal.aborted && !(e instanceof FirstTokenTimeoutError) && !(e instanceof IncompleteStreamError) && !(e instanceof StreamIdleTimeoutError)) {
            const partialText = typeof (e as any)?.partialText === 'string' ? (e as any).partialText : '';
            if (abortReason === 'first-content') {
                throw new FirstTokenTimeoutError();
            }
            if (abortReason === 'idle') {
                throw new StreamIdleTimeoutError(partialText);
            }
            throw new IncompleteStreamError('LLM request exceeded the synchronous webhook deadline', !!partialText, partialText);
        }
        throw e;
    } finally {
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
    }
}

export type ProviderCreator = (context: AgentUserConfig) => ProviderV2;

export class NextChatAgent implements ChatAgent {
    readonly name: string;
    readonly modelKey: string;
    readonly adapter: ChatAgent;
    readonly providerCreator: ProviderCreator;

    constructor(adapter: ChatAgent, providerCreator: ProviderCreator) {
        this.name = adapter.name;
        this.modelKey = adapter.modelKey;
        this.adapter = adapter;
        this.providerCreator = providerCreator;
    }

    static from(agent: ChatAgent): NextChatAgent | null {
        if (agent instanceof NextChatAgent) {
            return agent;
        }
        const provider = this.newProviderCreator(agent.name);
        if (!provider) {
            return null;
        }
        return new NextChatAgent(agent, provider);
    }

    readonly enable = (context: AgentUserConfig): boolean => {
        return this.adapter.enable(context);
    };

    readonly model = (ctx: AgentUserConfig): string | null => {
        return this.adapter.model(ctx);
    };

    static newProviderCreator = (provider: string): ProviderCreator | null => {
        switch (provider) {
            case 'anthropic':
                return (context: AgentUserConfig) => createAnthropic({
                    baseURL: context.ANTHROPIC_API_BASE,
                    apiKey: context.ANTHROPIC_API_KEY || undefined,
                });
            case 'azure':
                return (context: AgentUserConfig) => createAzure({
                    resourceName: context.AZURE_RESOURCE_NAME || undefined,
                    apiKey: context.AZURE_API_KEY || undefined,
                });
            case 'cohere':
                return (context: AgentUserConfig) => createCohere({
                    baseURL: context.COHERE_API_BASE,
                    apiKey: context.COHERE_API_KEY || undefined,
                });
            case 'gemini':
                return (context: AgentUserConfig) => createGoogleGenerativeAI({
                    baseURL: context.GOOGLE_API_BASE,
                    apiKey: context.GOOGLE_API_KEY || undefined,
                });
            case 'mistral':
                return (context: AgentUserConfig) => createMistral({
                    baseURL: context.MISTRAL_API_BASE,
                    apiKey: context.MISTRAL_API_KEY || undefined,
                });
            case 'openai':
                return (context: AgentUserConfig) => createOpenAI({
                    baseURL: context.OPENAI_API_BASE,
                    apiKey: context.OPENAI_API_KEY.at(0) || undefined,
                });
            default:
                return null;
        }
    };

    readonly request = async (params: LLMChatParams, context: AgentUserConfig, onStream: ChatStreamTextHandler | null): Promise<ChatAgentResponse> => {
        const model = this.model(context);
        if (!model) {
            throw new Error('Model not found');
        }
        return requestChatCompletionsV2({
            model: this.providerCreator(context).languageModel(model),
            messages: params.messages,
            system: params.prompt,
            imageMode: params.imageMode,
            deadlineMs: params.deadlineMs,
        }, onStream);
    };

    readonly modelList = async (context: AgentUserConfig): Promise<string[]> => {
        return this.adapter.modelList(context);
    };
}

export function injectNextChatAgent(agents: ChatAgent[]) {
    for (let i = 0; i < agents.length; i++) {
        const next = NextChatAgent.from(agents[i]);
        if (next) {
            agents[i] = next;
        }
    }
}
