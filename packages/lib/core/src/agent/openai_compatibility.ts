import type { SseChatCompatibleOptions } from '#/agent/request';
import type {
    AgentEnable,
    AgentModel,
    AgentModelList,
    ChatAgent,
    ChatAgentRequest,
    ChatAgentResponse,
    ChatStreamTextHandler,
    HistoryItem,
    ImageRequestMode,
    LLMChatParams,
} from '#/agent/types';
import type { AgentUserConfig, AgentUserConfigKey } from '#/config';
import { FirstTokenTimeoutError, getImageFirstContentTimeoutMs, getStreamIdleTimeoutMs, getTextFirstContentTimeoutMs, requestChatCompletions } from '#/agent/request';
import {
    bearerHeader,
    convertStringToResponseMessages,
    extractImageContent,
    getAgentUserConfigFieldName,
    loadModelsList,
} from '#/agent/utils';
import { ENV } from '#/config';
import { imageToBase64String, renderBase64DataURI } from '#/utils/image';

export enum ImageSupportFormat {
    URL = 'url',
    BASE64 = 'base64',
}

function messagesHaveImage(messages: any[]): boolean {
    return messages.some(message => Array.isArray(message.content) && message.content.some((content: any) => (
        content.type === 'image_url' || content.type === 'image_base64' || content.type === 'image'
    )));
}

async function renderOpenAIMessage(item: HistoryItem, supportImage?: ImageSupportFormat[] | null): Promise<any> {
    const res: any = {
        role: item.role,
        content: item.content,
    };
    if (Array.isArray(item.content)) {
        const contents = [];
        for (const content of item.content) {
            switch (content.type) {
                case 'text':
                    contents.push({ type: 'text', text: content.text });
                    break;
                case 'image':
                    if (supportImage) {
                        const isSupportURL = supportImage.includes(ImageSupportFormat.URL);
                        const isSupportBase64 = supportImage.includes(ImageSupportFormat.BASE64);
                        const data = extractImageContent(content.image);
                        if (data.url) {
                            if (ENV.TELEGRAM_IMAGE_TRANSFER_MODE === 'base64' && isSupportBase64) {
                                // 图片下载/编码失败时跳过单张图, 不阻断整条消息。
                                // 常见场景: 历史中存有 Telegram file URL, 过期后返回 404。
                                try {
                                    contents.push(await imageToBase64String(data.url).then((data) => {
                                        return { type: 'image_url', image_url: { url: renderBase64DataURI(data) } };
                                    }));
                                } catch (e) {
                                    console.error('renderOpenAIMessage: skip image due to fetch failure', e);
                                }
                            } else if (isSupportURL) {
                                contents.push({ type: 'image_url', image_url: { url: data.url } });
                            }
                        } else if (data.base64 && isSupportBase64) {
                            contents.push({ type: 'image_base64', image_base64: { base64: data.base64 } });
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        res.content = contents;
    }
    return res;
}

export async function renderOpenAIMessages(prompt: string | undefined, items: HistoryItem[], supportImage?: ImageSupportFormat[] | null): Promise<any[]> {
    const messages = await Promise.all(items.map(r => renderOpenAIMessage(r, supportImage)));
    if (prompt) {
        if (messages.length > 0 && messages[0].role === 'system') {
            messages.shift();
        }
        messages.unshift({ role: 'system', content: prompt });
    }
    return messages;
}

export function loadOpenAIModelList(list: string, base: string, headers: Record<string, string>): Promise<string[]> {
    if (list === '') {
        list = `${base}/models`;
    }
    return loadModelsList(list, async (url): Promise<string[]> => {
        const data = await fetch(url, { headers }).then(res => res.json()) as any;
        return data.data?.map((model: any) => model.id) || [];
    });
}

type OpenAIRequestBuilder = (params: LLMChatParams, context: AgentUserConfig, stream: boolean, supportImageOverride?: ImageSupportFormat[] | null) => Promise<{ url: string; header: Record<string, string>; body: any }>;
type AgentConfigFieldGetter = (ctx: AgentUserConfig) => { base: string; key: string | null; model: string; modelsList: string; extraParams?: Record<string, any> };

interface AgentConfigFields {
    base: AgentUserConfigKey;
    key: AgentUserConfigKey;
    model: AgentUserConfigKey;
    modelsList: AgentUserConfigKey;
    extraParams: AgentUserConfigKey;
}

export function agentConfigFieldGetter(fields: AgentConfigFields): AgentConfigFieldGetter {
    return (ctx: AgentUserConfig) => ({
        base: ctx[fields.base] as string,
        key: ctx[fields.key] as string || null,
        model: ctx[fields.model] as string,
        modelsList: ctx[fields.modelsList] as string,
        extraParams: ctx[fields.extraParams] as Record<string, any> || undefined,
    });
}

export interface OpenAIRequestHook {
    stream?: (text: string) => string;
    finish?: (text: string) => string;
}

export function createOpenAIRequest(builder: OpenAIRequestBuilder, options?: SseChatCompatibleOptions, hooks?: OpenAIRequestHook): ChatAgentRequest {
    return async (params: LLMChatParams, context: AgentUserConfig, onStream: ChatStreamTextHandler | null): Promise<ChatAgentResponse> => {
        const { url, header, body } = await builder(params, context, onStream !== null);
        if (onStream && hooks?.stream) {
            const onStreamOriginal = onStream;
            onStream = (text: string) => {
                return onStreamOriginal(hooks.stream!(text));
            };
        }
        const hasImage = messagesHaveImage(body.messages || []);
        const imageMode: ImageRequestMode = hasImage ? (params.imageMode || 'optional') : 'none';
        const requestOptions = {
            deadlineMs: params.deadlineMs,
            firstContentTimeoutMs: getImageFirstContentTimeoutMs(imageMode),
            idleTimeoutMs: getStreamIdleTimeoutMs(),
            retry: !hasImage,
        };
        let output: string;
        try {
            output = await requestChatCompletions(url, header, body, onStream, options || null, requestOptions);
        } catch (e) {
            if (!hasImage || imageMode !== 'optional' || !(e instanceof FirstTokenTimeoutError)) {
                throw e;
            }
            const textOnlyRequest = await builder({ ...params, imageMode: 'none' }, context, onStream !== null, null);
            output = await requestChatCompletions(
                textOnlyRequest.url,
                textOnlyRequest.header,
                textOnlyRequest.body,
                onStream,
                options || null,
                {
                    deadlineMs: params.deadlineMs,
                    firstContentTimeoutMs: getTextFirstContentTimeoutMs(),
                    idleTimeoutMs: getStreamIdleTimeoutMs(),
                    retry: true,
                },
            );
        }
        if (hooks?.finish) {
            output = hooks.finish(output);
        }
        return convertStringToResponseMessages(output);
    };
}

export function createAgentEnable(valueGetter: AgentConfigFieldGetter): AgentEnable {
    return (ctx: AgentUserConfig) => !!(valueGetter(ctx).key);
}

export function createAgentModel(valueGetter: AgentConfigFieldGetter): AgentModel {
    return (ctx: AgentUserConfig) => valueGetter(ctx).model;
}

export function createAgentModelList(valueGetter: AgentConfigFieldGetter): AgentModelList {
    return (ctx: AgentUserConfig): Promise<string[]> => {
        const { base, key, modelsList } = valueGetter(ctx);
        return loadOpenAIModelList(modelsList, base, bearerHeader(key));
    };
}

export function defaultOpenAIRequestBuilder(valueGetter: AgentConfigFieldGetter, completionsEndpoint: string = '/chat/completions', supportImage: ImageSupportFormat[] = [ImageSupportFormat.URL]): OpenAIRequestBuilder {
    return async (params: LLMChatParams, context: AgentUserConfig, stream: boolean, supportImageOverride?: ImageSupportFormat[] | null) => {
        const { prompt, messages, sessionId } = params;
        const { base, key, model, extraParams } = valueGetter(context);
        const url = `${base}${completionsEndpoint}`;
        const header = bearerHeader(key, stream);
        // 注入会话请求头，使支持 X-Session-Id 的 API 能维持上下文
        // sessionId 基于 chatHistoryKey 派生（私聊=用户ID，群聊=群ID，群聊共享模式=群上下文），天然符合需求
        if (sessionId) {
            header[context.OPENAI_SESSION_HEADER] = sessionId;
        }

        // 当开启会话模式时，API 靠 X-Session-Id 在服务端记住上下文，会忽略 messages 里的历史
        // 因此只发送当前这条消息，避免历史被忽略但仍占用 token，或与 API 自身记忆冲突
        const effectiveSupportImage = supportImageOverride === undefined ? supportImage : supportImageOverride;
        const renderedMessages = context.OPENAI_SESSION_MODE
            ? await renderOpenAIMessages(undefined, messages.slice(-1), effectiveSupportImage)
            : await renderOpenAIMessages(prompt, messages, effectiveSupportImage);

        const body = {
            ...(extraParams || {}),
            model,
            stream,
            messages: renderedMessages,
        };

        return { url, header, body };
    };
}

export class OpenAICompatibilityAgent implements ChatAgent {
    readonly name: string;
    readonly modelKey: string;
    readonly enable: AgentEnable;
    readonly model: AgentModel;
    readonly modelList: AgentModelList;
    readonly request: ChatAgentRequest;

    constructor(name: string, fields: AgentConfigFields, options?: SseChatCompatibleOptions, hooks?: OpenAIRequestHook) {
        this.name = name;
        this.modelKey = getAgentUserConfigFieldName(fields.model);
        const valueGetter = agentConfigFieldGetter(fields);
        this.enable = createAgentEnable(valueGetter);
        this.model = createAgentModel(valueGetter);
        this.modelList = createAgentModelList(valueGetter);
        this.request = createOpenAIRequest(defaultOpenAIRequestBuilder(valueGetter), options, hooks);
    }
}
