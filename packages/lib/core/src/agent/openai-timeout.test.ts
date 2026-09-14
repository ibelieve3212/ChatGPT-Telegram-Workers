import type { AgentUserConfig } from '#/config';
import { ENV } from '#/config';
import { getImageFirstTokenTimeoutMs } from './openai';
import { createOpenAIRequest, ImageSupportFormat, renderOpenAIMessages } from './openai_compatibility';
import { getChatCompletionTimeoutBudgetMs } from './request';

describe('openAI image timeout', () => {
    const originalChatTimeout = ENV.CHAT_COMPLETE_API_TIMEOUT;
    const originalRequiredImageTimeout = ENV.IMAGE_FIRST_TOKEN_TIMEOUT;
    const originalOptionalImageTimeout = ENV.OPTIONAL_IMAGE_FIRST_TOKEN_TIMEOUT;
    const originalTransferMode = ENV.TELEGRAM_IMAGE_TRANSFER_MODE;
    const originalFetch = globalThis.fetch;

    afterEach(() => {
        ENV.CHAT_COMPLETE_API_TIMEOUT = originalChatTimeout;
        ENV.IMAGE_FIRST_TOKEN_TIMEOUT = originalRequiredImageTimeout;
        ENV.OPTIONAL_IMAGE_FIRST_TOKEN_TIMEOUT = originalOptionalImageTimeout;
        ENV.TELEGRAM_IMAGE_TRANSFER_MODE = originalTransferMode;
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
