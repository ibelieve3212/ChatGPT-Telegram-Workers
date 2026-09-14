import type { ChatStreamTextHandler, ImageRequestMode } from './types';
import { ENV } from '#/config';
import { Stream } from './stream';

export interface SseChatCompatibleOptions {
    streamBuilder?: (resp: Response, controller: AbortController) => Stream;
    contentExtractor?: (data: object) => string | null;
    activityExtractor?: (data: object) => boolean;
    finishReasonExtractor?: (data: object) => string | null;
    fullContentExtractor?: (data: object) => string | null;
    errorExtractor?: (data: object) => string | null;
}

export interface ChatCompletionRequestOptions {
    firstContentTimeoutMs?: number;
    idleTimeoutMs?: number;
    deadlineMs?: number;
    retry?: boolean;
}

function fixOpenAICompatibleOptions(options: SseChatCompatibleOptions | null): SseChatCompatibleOptions {
    options = options || {};
    options.streamBuilder = options.streamBuilder || function (r, c) {
        return new Stream(r, c);
    };
    options.contentExtractor = options.contentExtractor || function (d: any) {
        return d?.choices?.at(0)?.delta?.content;
    };
    options.activityExtractor = options.activityExtractor || function (d: any) {
        const choice = d?.choices?.at(0);
        return !!(
            choice?.delta?.content
            || choice?.delta?.reasoning_content
            || choice?.delta?.reasoning
            || choice?.finish_reason
        );
    };
    options.finishReasonExtractor = options.finishReasonExtractor || function (d: any) {
        return d?.choices?.at(0)?.finish_reason || null;
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

const WEBHOOK_LLM_DEADLINE_MS = 40_000;

export function getChatCompletionTimeoutBudgetMs(): number {
    if (ENV.CHAT_COMPLETE_API_TIMEOUT <= 0) {
        return WEBHOOK_LLM_DEADLINE_MS;
    }
    return Math.max(1_000, Math.min(ENV.CHAT_COMPLETE_API_TIMEOUT * 1000, WEBHOOK_LLM_DEADLINE_MS));
}

export function getChatCompletionDeadlineMs(requestStartedAt = Date.now()): number {
    return requestStartedAt + getChatCompletionTimeoutBudgetMs();
}

function remainingDeadlineMs(deadlineMs: number): number {
    return Math.max(0, deadlineMs - Date.now());
}

export function getTextFirstContentTimeoutMs(): number {
    return Math.max(0, ENV.CHAT_FIRST_TOKEN_TIMEOUT * 1000);
}

export function getStreamIdleTimeoutMs(): number {
    return Math.max(0, ENV.CHAT_STREAM_IDLE_TIMEOUT * 1000);
}

export function getImageFirstContentTimeoutMs(mode: ImageRequestMode): number {
    if (mode === 'none') {
        return getTextFirstContentTimeoutMs();
    }
    const timeoutSeconds = mode === 'required'
        ? ENV.IMAGE_FIRST_TOKEN_TIMEOUT
        : ENV.OPTIONAL_IMAGE_FIRST_TOKEN_TIMEOUT;
    return Math.max(0, timeoutSeconds * 1000);
}

/** 首内容超时错误: 流式请求已连接但超时未收到任何有效内容(如模型不支持图片处理而卡住) */
export class FirstTokenTimeoutError extends Error {
    constructor(message = 'first content timeout') {
        super(message);
        this.name = 'FirstTokenTimeoutError';
    }
}

export class StreamIdleTimeoutError extends Error {
    readonly partialResponse: boolean;
    readonly partialText: string;

    constructor(partialText = '') {
        super('LLM stream idle timeout');
        this.name = 'StreamIdleTimeoutError';
        this.partialText = partialText;
        this.partialResponse = !!partialText;
    }
}

export class IncompleteStreamError extends Error {
    readonly partialResponse: boolean;
    readonly partialText: string;

    constructor(message: string, partialResponse: boolean, partialText = '') {
        super(message);
        this.name = 'IncompleteStreamError';
        this.partialResponse = partialResponse;
        this.partialText = partialText;
    }
}

export class CompletionLengthError extends Error {
    readonly partialResponse = true;
    readonly partialText: string;

    constructor(partialText: string) {
        super('LLM response reached the model token limit and may be incomplete');
        this.name = 'CompletionLengthError';
        this.partialText = partialText;
    }
}

export interface StreamUpdateState {
    contentFull: string;
    lengthDelta: number;
    updateStep: number;
    lastUpdateTime: number;
}

export function createStreamUpdateState(): StreamUpdateState {
    return {
        contentFull: '',
        lengthDelta: 0,
        updateStep: 50,
        lastUpdateTime: Date.now(),
    };
}

export async function appendStreamUpdate(state: StreamUpdateState, textPart: string, onStream?: (text: string) => Promise<any>): Promise<void> {
    state.lengthDelta += textPart.length;
    state.contentFull += textPart;
    if (state.lengthDelta <= state.updateStep) {
        return;
    }
    if (ENV.TELEGRAM_MIN_STREAM_INTERVAL > 0) {
        const delta = Date.now() - state.lastUpdateTime;
        if (delta < ENV.TELEGRAM_MIN_STREAM_INTERVAL) {
            return;
        }
        state.lastUpdateTime = Date.now();
    }
    state.lengthDelta = 0;
    state.updateStep += 20;
    await onStream?.(`${state.contentFull}\n...`);
}

export async function streamHandler<T>(stream: AsyncIterable<T>, contentExtractor: (data: T) => string | null, onStream?: (text: string) => Promise<any>, onActivity?: (data: T) => void): Promise<string> {
    const updateState = createStreamUpdateState();
    for await (const part of stream) {
        onActivity?.(part);
        const textPart = contentExtractor(part);
        if (!textPart) {
            continue;
        }
        await appendStreamUpdate(updateState, textPart, onStream);
    }
    return updateState.contentFull;
}

export async function mapResponseToAnswer(resp: Response, controller: AbortController, options: SseChatCompatibleOptions | null, onStream: ((text: string) => Promise<any>) | null, onActivity?: (data: object) => void): Promise<string> {
    options = fixOpenAICompatibleOptions(options || null);
    if (onStream && resp.ok && isEventStreamResponse(resp)) {
        const stream = options.streamBuilder?.(resp, controller || new AbortController());
        if (!stream) {
            throw new Error('Stream builder error');
        }
        return streamHandler<object>(stream, options.contentExtractor!, onStream, onActivity);
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

    const answer = options.fullContentExtractor?.(result) || '';
    const finishReason = options.finishReasonExtractor?.(result);
    if (finishReason === 'length') {
        throw new CompletionLengthError(answer);
    }
    if (finishReason && finishReason !== 'stop') {
        throw new IncompleteStreamError(`LLM response stopped with finish reason: ${finishReason}`, !!answer, answer);
    }
    return answer;
}

/**
 * 单次 LLM 请求执行(不含重试逻辑)
 * 隔离出此函数以便 requestChatCompletions 包装重试
 */
async function requestChatCompletionsOnce(url: string, header: Record<string, string>, body: any, onStream: ChatStreamTextHandler | null, options: SseChatCompatibleOptions | null, requestOptions: ChatCompletionRequestOptions): Promise<string> {
    const controller = new AbortController();
    const { signal } = controller;
    const effectiveOptions = fixOpenAICompatibleOptions(options ? { ...options } : {});
    const firstContentTimeoutMs = requestOptions.firstContentTimeoutMs ?? getTextFirstContentTimeoutMs();
    const idleTimeoutMs = requestOptions.idleTimeoutMs ?? getStreamIdleTimeoutMs();
    const deadlineMs = requestOptions.deadlineMs || 0;

    let abortReason: 'deadline' | 'first-content' | 'idle' | null = null;
    let streamStarted = false;
    let finishReason: string | null = null;
    let streamStatus: { done: boolean; finishReason: string | null } | null = null;
    let deadlineTimer: ReturnType<typeof setTimeout> | null = null;
    let activityTimer: ReturnType<typeof setTimeout> | null = null;

    const originalStreamBuilder = effectiveOptions.streamBuilder!;
    effectiveOptions.streamBuilder = (resp, streamController) => {
        const stream = originalStreamBuilder(resp, streamController);
        streamStatus = stream.status;
        return stream;
    };

    const abort = (reason: typeof abortReason) => {
        if (!signal.aborted) {
            abortReason = reason;
            controller.abort();
        }
    };
    const resetActivityTimer = (timeoutMs: number, reason: 'first-content' | 'idle') => {
        if (activityTimer) {
            clearTimeout(activityTimer);
            activityTimer = null;
        }
        const effectiveTimeoutMs = deadlineMs > 0
            ? Math.min(timeoutMs, remainingDeadlineMs(deadlineMs))
            : timeoutMs;
        if (effectiveTimeoutMs > 0) {
            const effectiveReason = deadlineMs > 0 && effectiveTimeoutMs < timeoutMs ? 'deadline' : reason;
            activityTimer = setTimeout(() => abort(effectiveReason), effectiveTimeoutMs);
        }
    };
    if (deadlineMs > 0) {
        const remainingMs = deadlineMs - Date.now();
        if (remainingMs <= 0) {
            throw new Error('LLM request exceeded the synchronous webhook deadline');
        }
        deadlineTimer = setTimeout(() => abort('deadline'), remainingMs);
    }
    if (onStream && firstContentTimeoutMs > 0) {
        resetActivityTimer(firstContentTimeoutMs, 'first-content');
    }

    const onActivity = (data: object) => {
        const reason = effectiveOptions.finishReasonExtractor?.(data);
        if (reason) {
            finishReason = reason;
        }
        if (!effectiveOptions.activityExtractor?.(data)) {
            return;
        }
        streamStarted = true;
        if (reason) {
            resetActivityTimer(0, 'idle');
        } else {
            resetActivityTimer(idleTimeoutMs, 'idle');
        }
    };
    let partialText = '';
    const trackingContentExtractor = (data: object) => {
        const text = effectiveOptions.contentExtractor?.(data) || null;
        if (text) {
            partialText += text;
        }
        return text;
    };
    const mappingOptions = {
        ...effectiveOptions,
        contentExtractor: trackingContentExtractor,
    };

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
            if (abortReason === 'first-content') {
                throw new FirstTokenTimeoutError();
            }
            if (abortReason === 'idle') {
                throw new StreamIdleTimeoutError(partialText);
            }
            if (abortReason === 'deadline') {
                throw new IncompleteStreamError('LLM request exceeded the synchronous webhook deadline', !!partialText, partialText);
            }
            throw e;
        }
        if (!resp.ok) {
            const bodyText = await resp.text().catch(() => '');
            if (abortReason === 'first-content') {
                throw new FirstTokenTimeoutError();
            }
            if (abortReason === 'deadline') {
                throw new IncompleteStreamError('LLM request exceeded the synchronous webhook deadline', false);
            }
            const err = new Error(`LLM API ${resp.status}: ${bodyText.slice(0, 200)}`) as any;
            err.statusCode = resp.status;
            throw err;
        }

        let answer = '';
        try {
            const mappedAnswer = await mapResponseToAnswer(resp, controller, mappingOptions, onStream, onActivity);
            answer = onStream && isEventStreamResponse(resp) ? partialText : mappedAnswer;
        } catch (e) {
            answer = partialText;
            if (abortReason === 'first-content') {
                throw new FirstTokenTimeoutError();
            }
            if (abortReason === 'idle') {
                throw new StreamIdleTimeoutError(answer);
            }
            if (abortReason === 'deadline') {
                throw new IncompleteStreamError('LLM request exceeded the synchronous webhook deadline', !!answer || streamStarted, answer);
            }
            if (answer || streamStarted) {
                const message = e instanceof Error
                    ? `LLM stream interrupted: ${e.message}`
                    : 'LLM stream interrupted';
                throw new IncompleteStreamError(message, true, answer);
            }
            throw e;
        }

        if (abortReason === 'first-content') {
            throw new FirstTokenTimeoutError();
        }
        if (abortReason === 'idle') {
            throw new StreamIdleTimeoutError(answer);
        }
        if (abortReason === 'deadline') {
            throw new IncompleteStreamError('LLM request exceeded the synchronous webhook deadline', !!answer || streamStarted, answer);
        }
        if (onStream && isEventStreamResponse(resp)) {
            const completedStreamStatus = streamStatus as { done: boolean; finishReason: string | null } | null;
            if (completedStreamStatus?.finishReason && !finishReason) {
                finishReason = completedStreamStatus.finishReason;
            }
            if (finishReason === 'length') {
                throw new CompletionLengthError(answer);
            }
            if (finishReason && finishReason !== 'stop') {
                throw new IncompleteStreamError(`LLM response stopped with finish reason: ${finishReason}`, !!answer, answer);
            }
            if (finishReason === 'stop' || completedStreamStatus?.done) {
                if (!answer.trim()) {
                    throw new Error('LLM returned an empty response');
                }
            } else {
                throw new IncompleteStreamError('LLM stream ended before a completion marker', !!answer, answer);
            }
        }
        if (activityTimer) {
            clearTimeout(activityTimer);
            activityTimer = null;
        }
        if (!answer.trim()) {
            throw new Error('LLM returned an empty response');
        }
        return answer;
    } finally {
        if (deadlineTimer) {
            clearTimeout(deadlineTimer);
        }
        if (activityTimer) {
            clearTimeout(activityTimer);
        }
    }
}

/**
 * 判断错误是否可重试
 * 可重试: 超时(abort/网络中断)、HTTP 5xx
 * 不可重试: 4xx(鉴权/参数错误)、FirstTokenTimeoutError(上层有专用降级)
 */
function isRetryableError(e: unknown): boolean {
    if (
        e instanceof FirstTokenTimeoutError
        || e instanceof StreamIdleTimeoutError
        || e instanceof IncompleteStreamError
        || e instanceof CompletionLengthError
        || (e as any)?.partialResponse
    ) {
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

export async function requestChatCompletions(url: string, header: Record<string, string>, body: any, onStream: ChatStreamTextHandler | null, options: SseChatCompatibleOptions | null, requestOptions: ChatCompletionRequestOptions = {}): Promise<string> {
    const maxRetries = requestOptions.retry === false ? 0 : 1;
    const deadlineMs = requestOptions.deadlineMs || (Date.now() + getChatCompletionTimeoutBudgetMs());

    let lastError: unknown = null;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        const remainingTimeoutMs = deadlineMs - Date.now();
        if (remainingTimeoutMs <= 0) {
            throw lastError || new Error('LLM request exceeded the synchronous webhook deadline');
        }
        try {
            const result = await requestChatCompletionsOnce(url, header, body, onStream, options, {
                ...requestOptions,
                deadlineMs,
                firstContentTimeoutMs: Math.min(requestOptions.firstContentTimeoutMs ?? getTextFirstContentTimeoutMs(), remainingTimeoutMs),
            });
            if (attempt > 0) {
                console.log(`[diag] requestChatCompletions: 第${attempt + 1}次成功`);
            }
            return result;
        } catch (e) {
            lastError = e;
            if (attempt >= maxRetries || !isRetryableError(e)) {
                if (isRetryableError(e) && attempt >= maxRetries) {
                    console.error(`[diag] requestChatCompletions: 重试${maxRetries}次后仍失败:`, (e as Error).message);
                }
                throw e;
            }
            const retryDelayMs = 1_000;
            const remainingBeforeRetry = deadlineMs - Date.now();
            const minimumAttemptWindowMs = Math.min(requestOptions.firstContentTimeoutMs ?? getTextFirstContentTimeoutMs(), 5_000);
            if (remainingBeforeRetry <= retryDelayMs + minimumAttemptWindowMs) {
                throw e;
            }
            console.log(`[diag] requestChatCompletions: 第${attempt + 1}次失败(可重试): ${(e as Error).message}, 1秒后重试...`);
            await new Promise(resolve => setTimeout(resolve, retryDelayMs));
        }
    }
    throw lastError;
}
