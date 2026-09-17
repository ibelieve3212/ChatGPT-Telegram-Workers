import type { AgentUserConfig } from '#/config';
import { ENV } from '#/config';
import { getImageFirstTokenTimeoutMs } from './openai';
import { createOpenAIRequest, ImageSupportFormat, renderOpenAIMessages } from './openai_compatibility';
import { getChatCompletionTimeoutBudgetMs } from './request';

describe('openAI image timeout', () => {
    const originalChatTimeout = ENV.CHAT_COMPLETE_API_TIMEOUT;
    const originalChatFirstToken = ENV.CHAT_FIRST_TOKEN_TIMEOUT;
    const originalTransferMode = ENV.TELEGRAM_IMAGE_TRANSFER_MODE;
    const originalPollingMode = ENV.IS_POLLING_MODE;
    const originalFetch = globalThis.fetch;

    afterEach(() => {
        ENV.CHAT_COMPLETE_API_TIMEOUT = originalChatTimeout;
        ENV.CHAT_FIRST_TOKEN_TIMEOUT = originalChatFirstToken;
        ENV.TELEGRAM_IMAGE_TRANSFER_MODE = originalTransferMode;
        ENV.IS_POLLING_MODE = originalPollingMode;
        globalThis.fetch = originalFetch;
        jest.useRealTimers();
    });

    it('uses unified CHAT_FIRST_TOKEN_TIMEOUT for all modes (image and text)', () => {
        // 方案B: 删除了 IMAGE_FIRST_TOKEN_TIMEOUT / OPTIONAL_IMAGE_FIRST_TOKEN_TIMEOUT,
        // 图片与文字统一使用 CHAT_FIRST_TOKEN_TIMEOUT, getImageFirstContentTimeoutMs 永远返回同一个值.
        ENV.CHAT_FIRST_TOKEN_TIMEOUT = 25;

        expect(getImageFirstTokenTimeoutMs('required')).toBe(25_000);
        expect(getImageFirstTokenTimeoutMs('optional')).toBe(25_000);
        expect(getImageFirstTokenTimeoutMs('none')).toBe(0);
    });

    it('caps synchronous LLM work at forty seconds in webhook mode', () => {
        ENV.CHAT_COMPLETE_API_TIMEOUT = 60;
        ENV.IS_POLLING_MODE = false;

        expect(getChatCompletionTimeoutBudgetMs()).toBe(40_000);
    });

    it('relaxes the deadline cap to 120s in polling mode', () => {
        ENV.IS_POLLING_MODE = true;
        ENV.CHAT_COMPLETE_API_TIMEOUT = 60;
        expect(getChatCompletionTimeoutBudgetMs()).toBe(60_000);

        ENV.CHAT_COMPLETE_API_TIMEOUT = 200;
        // 超过 120s 上限仍被钳制
        expect(getChatCompletionTimeoutBudgetMs()).toBe(120_000);

        ENV.CHAT_COMPLETE_API_TIMEOUT = 0;
        // 设为 0 走模式上限
        expect(getChatCompletionTimeoutBudgetMs()).toBe(120_000);
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
            // 方案B: 统一超时后, optional 仍能触发去图重试(兜底机制保留)
            jest.useFakeTimers();
            ENV.CHAT_FIRST_TOKEN_TIMEOUT = 0.02;
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
            // 方案B: required 超时仍直接报错(无去图重试)
            jest.useFakeTimers();
            ENV.CHAT_FIRST_TOKEN_TIMEOUT = 0.02;
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
