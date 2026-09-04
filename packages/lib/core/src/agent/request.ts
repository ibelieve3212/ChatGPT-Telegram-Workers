import type { ChatStreamTextHandler } from './types';
import { ENV } from '#/config';
import { Stream } from './stream';

export interface SseChatCompatibleOptions {
    streamBuilder?: (resp: Response, controller: AbortController) => Stream;
    contentExtractor?: (data: object) => string | null;
    fullContentExtractor?: (data: object) => string | null;
    errorExtractor?: (data: object) => string | null;
}

function fixOpenAICompatibleOptions(options: SseChatCompatibleOptions | null): SseChatCompatibleOptions {
    options = options || {};
    options.streamBuilder = options.streamBuilder || function (r, c) {
        return new Stream(r, c);
    };
    options.contentExtractor = options.contentExtractor || function (d: any) {
        return d?.choices?.at(0)?.delta?.content;
    };
    options.fullContentExtractor = options.fullContentExtractor || function (d: any) {
        return d.choices?.at(0)?.message.content;
    };
    options.errorExtractor = options.errorExtractor || function (d: any) {
        return d.error?.message;
    };
    return options;
}

export function isJsonResponse(resp: Response): boolean {
    const contentType = resp.headers.get('content-type');
    return contentType?.toLowerCase().includes('application/json') ?? false;
}

export function isEventStreamResponse(resp: Response): boolean {
    const types = ['application/stream+json', 'text/event-stream'];
    const content = resp.headers.get('content-type')?.toLowerCase() || '';
    for (const type of types) {
        if (content.includes(type)) {
            return true;
        }
    }
    return false;
}

/** 首内容超时错误: 流式请求已连接但超时未收到任何有效内容(如模型不支持图片处理而卡住) */
export class FirstTokenTimeoutError extends Error {
    constructor(message = 'first token timeout') {
        super(message);
        this.name = 'FirstTokenTimeoutError';
    }
}

export async function streamHandler<T>(stream: AsyncIterable<T>, contentExtractor: (data: T) => string | null, onStream?: (text: string) => Promise<any>): Promise<string> {
    let contentFull = '';
    let lengthDelta = 0;
    let updateStep = 50;
    let lastUpdateTime = Date.now();
    try {
        for await (const part of stream) {
            const textPart = contentExtractor(part);
            if (!textPart) {
                continue;
            }
            lengthDelta += textPart.length;
            contentFull = contentFull + textPart;
            if (lengthDelta > updateStep) {
                if (ENV.TELEGRAM_MIN_STREAM_INTERVAL > 0) {
                    const delta = Date.now() - lastUpdateTime;
                    if (delta < ENV.TELEGRAM_MIN_STREAM_INTERVAL) {
                        continue;
                    }
                    lastUpdateTime = Date.now();
                }
                lengthDelta = 0;
                updateStep += 20;
                await onStream?.(`${contentFull}\n...`);
            }
        }
    } catch (e) {
        contentFull += `\nError: ${(e as Error).message}`;
    }
    return contentFull;
}

export async function mapResponseToAnswer(resp: Response, controller: AbortController, options: SseChatCompatibleOptions | null, onStream: ((text: string) => Promise<any>) | null): Promise<string> {
    options = fixOpenAICompatibleOptions(options || null);
    if (onStream && resp.ok && isEventStreamResponse(resp)) {
        const stream = options.streamBuilder?.(resp, controller || new AbortController());
        if (!stream) {
            throw new Error('Stream builder error');
        }
        return streamHandler<object>(stream, options.contentExtractor!, onStream);
    }
    if (!isJsonResponse(resp)) {
        throw new Error(resp.statusText);
    }

    const result = await resp.json() as any;
    if (!result) {
        throw new Error('Empty response');
    }
    if (options.errorExtractor?.(result)) {
        throw new Error(options.errorExtractor?.(result) || 'Unknown error');
    }

    return options.fullContentExtractor?.(result) || '';
}

export async function requestChatCompletions(url: string, header: Record<string, string>, body: any, onStream: ChatStreamTextHandler | null, options: SseChatCompatibleOptions | null, firstTokenTimeout = 0): Promise<string> {
    const controller = new AbortController();
    const { signal } = controller;

    let timeoutID = null;
    if (ENV.CHAT_COMPLETE_API_TIMEOUT > 0) {
        // CHAT_COMPLETE_API_TIMEOUT 单位为秒, setTimeout 需要毫秒, 乘 1000
        // 注意: 此定时器覆盖整个请求生命周期(含流式读取阶段), 不能在 fetch 返回后立即 clear,
        // 否则上游 hang 住不发数据时流会永久卡死(占位符 '...' 不更新)
        timeoutID = setTimeout(() => controller.abort(), ENV.CHAT_COMPLETE_API_TIMEOUT * 1000);
    }

    // 首内容超时: 仅对带图片等可能被上游拒处理的请求启用(由调用方传入毫秒数)。
    // 超过时限仍没收到任何有效内容 -> 判定上游不支持/卡住, 抛 FirstTokenTimeoutError 供上层降级。
    let firstTokenTimer: ReturnType<typeof setTimeout> | null = null;
    let firstTokenReceived = false;
    // 当启用首内容超时时, 创建/包装 options, 注入首内容检测逻辑到 contentExtractor
    let effectiveOptions = options;
    if (firstTokenTimeout > 0 && onStream) {
        // fixOpenAICompatibleOptions 仅在 contentExtractor 为 falsy 时填默认值, 这里预存原始 extractor
        const originalExtractor = options?.contentExtractor;
        effectiveOptions = options ? { ...options } : {};
        effectiveOptions.contentExtractor = (data: object) => {
            // 原始 extractor 可能为空, mapResponseToAnswer 内部 fixOpenAICompatibleOptions 会补默认;
            // 但我们这里直接用“默认逻辑 + 原始逻辑”取值
            const text = (originalExtractor ? originalExtractor(data) : null)
                ?? (data as any)?.choices?.at(0)?.delta?.content
                ?? null;
            if (text && !firstTokenReceived) {
                firstTokenReceived = true;
                if (firstTokenTimer) {
                    clearTimeout(firstTokenTimer);
                    firstTokenTimer = null;
                }
            }
            return text;
        };
        firstTokenTimer = setTimeout(() => controller.abort(), firstTokenTimeout);
    }

    try {
        let resp: Response;
        try {
            resp = await fetch(url, {
                method: 'POST',
                headers: header,
                body: JSON.stringify(body),
                signal,
            });
        } catch (e) {
            // fetch 阶段被首内容超时 abort (连响应头都没返回) -> 判定首内容超时
            if (firstTokenTimeout > 0 && !firstTokenReceived && signal.aborted) {
                throw new FirstTokenTimeoutError();
            }
            throw e;
        }
        let answer;
        try {
            answer = await mapResponseToAnswer(resp, controller, effectiveOptions, onStream);
        } catch (e) {
            // 首内容超时: abort 后 stream 可能静默结束(无内容) 也可能抛错, 统一在此判定
            if (firstTokenTimeout > 0 && !firstTokenReceived && signal.aborted) {
                throw new FirstTokenTimeoutError();
            }
            throw e;
        }
        // stream.ts 对 AbortError 会静默 return, 导致 mapResponseToAnswer 返回空字符串而不抛错。
        // 这里补检: 启用了首内容超时, 且因超时被 abort, 但没收到任何有效内容 -> 判定首内容超时
        if (firstTokenTimeout > 0 && !firstTokenReceived && signal.aborted) {
            throw new FirstTokenTimeoutError();
        }
        return answer;
    } finally {
        // 整个请求(含流式读取)完成后才清理定时器
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
        if (firstTokenTimer) {
            clearTimeout(firstTokenTimer);
        }
    }
}
