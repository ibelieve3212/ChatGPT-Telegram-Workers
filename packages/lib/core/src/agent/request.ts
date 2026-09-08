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

const WEBHOOK_RESPONSE_RESERVE_MS = 20_000;

export function getChatCompletionTimeoutBudgetMs(): number {
    if (ENV.CHAT_COMPLETE_API_TIMEOUT <= 0) {
        return 0;
    }
    return Math.max(1_000, ENV.CHAT_COMPLETE_API_TIMEOUT * 1000 - WEBHOOK_RESPONSE_RESERVE_MS);
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

/**
 * 单次 LLM 请求执行(不含重试逻辑)
 * 隔离出此函数以便 requestChatCompletions 包装重试
 */
async function requestChatCompletionsOnce(url: string, header: Record<string, string>, body: any, onStream: ChatStreamTextHandler | null, options: SseChatCompatibleOptions | null, firstTokenTimeout = 0, singleTimeoutMs = 0): Promise<string> {
    const controller = new AbortController();
    const { signal } = controller;

    let timeoutID = null;
    if (singleTimeoutMs > 0) {
        // 单次请求超时(毫秒), 覆盖整个请求生命周期(含流式读取阶段)
        // 不能在 fetch 返回后立即 clear, 否则上游 hang 住不发数据时流会永久卡死(占位符 '...' 不更新)
        timeoutID = setTimeout(() => controller.abort(), singleTimeoutMs);
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
        // 非成功 HTTP 状态码: 5xx 可重试, 4xx 不可重试(鉴权/参数错误)
        if (!resp.ok) {
            const bodyText = await resp.text().catch(() => '');
            const err = new Error(`LLM API ${resp.status}: ${bodyText.slice(0, 200)}`) as any;
            err.statusCode = resp.status;
            throw err;
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
        // 整体超时被 abort 但 stream 静默返回空串(连接已建立但数据迟迟不来):
        // 不算成功, 必须抛错触发上层重试, 否则用户会收到空回复
        if (singleTimeoutMs > 0 && signal.aborted && !answer) {
            throw new Error('LLM request timeout: aborted with empty response');
        }
        if (!answer.trim()) {
            throw new Error('LLM returned an empty response');
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

/**
 * 判断错误是否可重试
 * 可重试: 超时(abort/网络中断)、HTTP 5xx
 * 不可重试: 4xx(鉴权/参数错误)、FirstTokenTimeoutError(上层有专用降级)
 */
function isRetryableError(e: unknown): boolean {
    if (e instanceof FirstTokenTimeoutError) {
        return false;
    }
    if (e instanceof Error) {
        const msg = e.message.toLowerCase();
        // AbortError: 超时被 abort
        if (e.name === 'AbortError' || msg.includes('aborted')) {
            return true;
        }
        // 网络错误(failed to fetch 等)
        if (msg.includes('fetch') || msg.includes('network') || msg.includes('timeout')) {
            return true;
        }
        // HTTP 5xx 可重试
        const statusCode = (e as any).statusCode;
        if (statusCode && statusCode >= 500 && statusCode < 600) {
            return true;
        }
    }
    return false;
}

export async function requestChatCompletions(url: string, header: Record<string, string>, body: any, onStream: ChatStreamTextHandler | null, options: SseChatCompatibleOptions | null, firstTokenTimeout = 0, timeoutOverrideMs?: number): Promise<string> {
    // CHAT_COMPLETE_API_TIMEOUT 是整次调用（含重试）的总预算。
    const maxRetries = 1;
    const configuredTimeoutMs = getChatCompletionTimeoutBudgetMs();
    if (timeoutOverrideMs !== undefined && timeoutOverrideMs <= 0) {
        throw new Error('LLM request timeout');
    }
    const totalTimeoutMs = timeoutOverrideMs ?? configuredTimeoutMs;
    const deadline = totalTimeoutMs > 0 ? Date.now() + totalTimeoutMs : 0;

    let lastError: unknown = null;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        const remainingTimeoutMs = deadline > 0 ? Math.max(0, deadline - Date.now()) : 0;
        if (deadline > 0 && remainingTimeoutMs === 0) {
            throw lastError || new Error('LLM request timeout');
        }
        try {
            const result = await requestChatCompletionsOnce(url, header, body, onStream, options, firstTokenTimeout, remainingTimeoutMs);
            if (attempt > 0) {
                console.log(`[diag] requestChatCompletions: 第${attempt + 1}次成功`);
            }
            return result;
        } catch (e) {
            lastError = e;
            // 最后一次尝试 或 不可重试的错误 → 直接抛出
            if (attempt >= maxRetries || !isRetryableError(e)) {
                if (isRetryableError(e) && attempt >= maxRetries) {
                    console.error(`[diag] requestChatCompletions: 重试${maxRetries}次后仍失败:`, (e as Error).message);
                }
                throw e;
            }
            const retryDelayMs = 1000;
            const remainingBeforeRetry = deadline > 0 ? deadline - Date.now() : retryDelayMs;
            if (deadline > 0 && remainingBeforeRetry <= retryDelayMs) {
                throw e;
            }
            console.log(`[diag] requestChatCompletions: 第${attempt + 1}次失败(可重试): ${(e as Error).message}, 1秒后重试...`);
            await new Promise(resolve => setTimeout(resolve, retryDelayMs));
        }
    }
    throw lastError;
}
