import type { AgentUserConfig } from '#/config';
import { ENV } from '#/config';
import { getImageFirstTokenTimeoutMs, OpenAI } from './openai';
import { createOpenAIRequest, ImageSupportFormat, renderOpenAIMessages } from './openai_compatibility';
import { getChatCompletionTimeoutBudgetMs, getFirstTokenTimeoutMs } from './request';

describe('openAI image timeout', () => {
    const originalChatTimeout = ENV.CHAT_COMPLETE_API_TIMEOUT;
    const originalRequiredImageTimeout = ENV.IMAGE_FIRST_TOKEN_TIMEOUT;
    const originalOptionalImageTimeout = ENV.OPTIONAL_IMAGE_FIRST_TOKEN_TIMEOUT;
    const originalTransferMode = ENV.TELEGRAM_IMAGE_TRANSFER_MODE;
    const originalFirstTokenTimeout = ENV.CHAT_FIRST_TOKEN_TIMEOUT;
    const originalFetch = globalThis.fetch;

    afterEach(() => {
        ENV.CHAT_COMPLETE_API_TIMEOUT = originalChatTimeout;
        ENV.IMAGE_FIRST_TOKEN_TIMEOUT = originalRequiredImageTimeout;
        ENV.OPTIONAL_IMAGE_FIRST_TOKEN_TIMEOUT = originalOptionalImageTimeout;
        ENV.TELEGRAM_IMAGE_TRANSFER_MODE = originalTransferMode;
        ENV.CHAT_FIRST_TOKEN_TIMEOUT = originalFirstTokenTimeout;
        globalThis.fetch = originalFetch;
        jest.useRealTimers();
    });

    it('uses separate optional and required image timeouts', () => {
        ENV.IMAGE_FIRST_TOKEN_TIMEOUT = 30;
        ENV.OPTIONAL_IMAGE_FIRST_TOKEN_TIMEOUT = 10;

        expect(getImageFirstTokenTimeoutMs('required')).toBe(30_000);
        expect(getImageFirstTokenTimeoutMs('optional')).toBe(10_000);
        expect(getImageFirstTokenTimeoutMs('none')).toBe(0);
    });

    it('caps synchronous LLM work at forty seconds', () => {
        ENV.CHAT_COMPLETE_API_TIMEOUT = 60;

        expect(getChatCompletionTimeoutBudgetMs()).toBe(40_000);
    });

    it('disables the first-content timeout in session mode', () => {
        ENV.CHAT_FIRST_TOKEN_TIMEOUT = 15;
        ENV.IMAGE_FIRST_TOKEN_TIMEOUT = 30;
        ENV.OPTIONAL_IMAGE_FIRST_TOKEN_TIMEOUT = 10;

        // 会话模式下首字延迟不可控(渠道重放服务端会话历史), 统一禁用, 由 deadline 兼底
        expect(getFirstTokenTimeoutMs('none', true)).toBe(0);
        expect(getFirstTokenTimeoutMs('optional', true)).toBe(0);
        expect(getFirstTokenTimeoutMs('required', true)).toBe(0);

        // 非会话模式保持原有保护
        expect(getFirstTokenTimeoutMs('none', false)).toBe(15_000);
        expect(getFirstTokenTimeoutMs('optional', false)).toBe(10_000);
        expect(getFirstTokenTimeoutMs('required', false)).toBe(30_000);
    });

    describe('compatibility agents', () => {
        const imageMessages = [{
            role: 'user' as const,
            content: [
                { type: 'text' as const, text: 'hello' },
                { type: 'image' as const, image: new URL('https://example.com/photo.jpg') },
            ],
        }];

        function hangingThenStreamingFetch(): jest.Mock {
            let calls = 0;
            return jest.fn(async (_url: string | URL | Request, init?: RequestInit) => {
                calls++;
                const body = JSON.parse(init?.body as string);
                const hasImage = body.messages.some((m: any) => Array.isArray(m.content) && m.content.some((c: any) => c.type === 'image_url'));
                if (hasImage) {
                    return new Promise<Response>((_resolve, reject) => {
                        init?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
                    });
                }
                return new Response(new ReadableStream<Uint8Array>({
                    start(controller) {
                        controller.enqueue(new TextEncoder().encode(`data: {"choices":[{"delta":{"content":"text-only ${calls}"},"finish_reason":"stop"}]}\n\n`));
                        controller.close();
                    },
                }), { headers: { 'Content-Type': 'text/event-stream' } });
            });
        }

        function makeRequest() {
            ENV.TELEGRAM_IMAGE_TRANSFER_MODE = 'url';
            return createOpenAIRequest(async (params, _context, stream, supportImageOverride) => ({
                url: 'https://example.com/chat/completions',
                header: {},
                body: {
                    stream,
                    messages: await renderOpenAIMessages(undefined, params.messages, supportImageOverride === undefined ? [ImageSupportFormat.URL] : supportImageOverride),
                },
            }));
        }

        it('retries without the image when an optional image stalls', async () => {
            jest.useFakeTimers();
            ENV.OPTIONAL_IMAGE_FIRST_TOKEN_TIMEOUT = 0.02;
            const fetchMock = hangingThenStreamingFetch();
            globalThis.fetch = fetchMock as typeof fetch;

            const completion = makeRequest()({
                messages: imageMessages,
                imageMode: 'optional',
                deadlineMs: Date.now() + 1_000,
            }, {} as AgentUserConfig, async () => undefined);
            await jest.advanceTimersByTimeAsync(50);

            await expect(completion).resolves.toMatchObject({ text: 'text-only 2' });
            expect(fetchMock).toHaveBeenCalledTimes(2);
        });

        it('does not downgrade a required image', async () => {
            jest.useFakeTimers();
            ENV.IMAGE_FIRST_TOKEN_TIMEOUT = 0.02;
            const fetchMock = hangingThenStreamingFetch();
            globalThis.fetch = fetchMock as typeof fetch;

            const completion = makeRequest()({
                messages: imageMessages,
                imageMode: 'required',
                deadlineMs: Date.now() + 1_000,
            }, {} as AgentUserConfig, async () => undefined);
            const assertion = expect(completion).rejects.toThrow('first content timeout');
            await jest.advanceTimersByTimeAsync(50);

            await assertion;
            expect(fetchMock).toHaveBeenCalledTimes(1);
        });
    });
});

describe('openAI session-mode first token timeout', () => {
    const originalFirstTokenTimeout = ENV.CHAT_FIRST_TOKEN_TIMEOUT;
    const originalFetch = globalThis.fetch;

    afterEach(() => {
        ENV.CHAT_FIRST_TOKEN_TIMEOUT = originalFirstTokenTimeout;
        globalThis.fetch = originalFetch;
        jest.useRealTimers();
    });

    // 模拟伪流式慢渠道: 连接后挂起 delayMs 才一次性吐出全部内容
    function slowPseudoStreamFetch(delayMs: number): jest.Mock {
        return jest.fn(async () => new Response(new ReadableStream<Uint8Array>({
            async start(controller) {
                await new Promise(resolve => setTimeout(resolve, delayMs));
                controller.enqueue(new TextEncoder().encode('data: {"choices":[{"delta":{"content":"late but ok"},"finish_reason":"stop"}]}\n\n'));
                controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
                controller.close();
            },
        }), { headers: { 'Content-Type': 'text/event-stream' } }));
    }

    function makeContext(sessionMode: boolean): AgentUserConfig {
        return {
            OPENAI_API_KEY: ['sk-test'],
            OPENAI_API_BASE: 'https://example.com/v1',
            OPENAI_CHAT_MODEL: 'gpt-test',
            OPENAI_SESSION_HEADER: 'X-Session-Id',
            OPENAI_SESSION_MODE: sessionMode,
        } as unknown as AgentUserConfig;
    }

    it('waits past the first-token timeout for a slow session channel', async () => {
        jest.useFakeTimers();
        ENV.CHAT_FIRST_TOKEN_TIMEOUT = 0.02; // 20ms 首字超时
        const fetchMock = slowPseudoStreamFetch(100); // 100ms 后才出内容
        globalThis.fetch = fetchMock as typeof fetch;

        const completion = new OpenAI().request({
            messages: [{ role: 'user', content: 'hi' }],
            sessionId: 'history:test',
            deadlineMs: Date.now() + 1_000,
        }, makeContext(true), async () => undefined);
        await jest.advanceTimersByTimeAsync(150);

        await expect(completion).resolves.toMatchObject({ text: 'late but ok' });
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('still times out on a stalled stream outside session mode', async () => {
        jest.useFakeTimers();
        ENV.CHAT_FIRST_TOKEN_TIMEOUT = 0.02;
        const fetchMock = slowPseudoStreamFetch(100);
        globalThis.fetch = fetchMock as typeof fetch;

        const completion = new OpenAI().request({
            messages: [{ role: 'user', content: 'hi' }],
            sessionId: 'history:test',
            deadlineMs: Date.now() + 1_000,
        }, makeContext(false), async () => undefined);
        const assertion = expect(completion).rejects.toThrow('first content timeout');
        await jest.advanceTimersByTimeAsync(150);

        await assertion;
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });
});
