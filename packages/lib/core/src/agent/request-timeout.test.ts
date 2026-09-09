import { requestChatCompletions } from './request';

describe('request chat completions timeout', () => {
    const originalFetch = globalThis.fetch;

    afterEach(() => {
        globalThis.fetch = originalFetch;
        jest.useRealTimers();
    });

    function streamResponse(chunks: string[], close = true): Response {
        const body = new ReadableStream<Uint8Array>({
            start(controller) {
                for (const chunk of chunks) {
                    controller.enqueue(new TextEncoder().encode(chunk));
                }
                if (close) {
                    controller.close();
                }
            },
        });
        return new Response(body, {
            status: 200,
            headers: { 'Content-Type': 'text/event-stream' },
        });
    }

    function jsonResponse(content: string, finishReason: string | null): Response {
        return new Response(JSON.stringify({
            choices: [{
                message: { content },
                finish_reason: finishReason,
            }],
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    it('accepts a stream completed by a DONE marker', async () => {
        globalThis.fetch = jest.fn(async () => streamResponse([
            'data: {"choices":[{"delta":{"content":"complete"},"finish_reason":null}]}\n\n',
            'data: [DONE]\n\n',
        ])) as typeof fetch;

        await expect(requestChatCompletions(
            'https://example.com/chat/completions',
            {},
            {},
            async () => undefined,
            null,
            { deadlineMs: Date.now() + 1_000, retry: false },
        )).resolves.toBe('complete');
    });

    it('stops reading after a terminal finish reason', async () => {
        globalThis.fetch = jest.fn(async () => streamResponse([
            'data: {"choices":[{"delta":{"content":"complete"},"finish_reason":"stop"}]}\n\n',
        ], false)) as typeof fetch;

        await expect(requestChatCompletions(
            'https://example.com/chat/completions',
            {},
            {},
            async () => undefined,
            null,
            { deadlineMs: Date.now() + 1_000, retry: false },
        )).resolves.toBe('complete');
    });

    it('rejects an unexpected EOF after partial output', async () => {
        globalThis.fetch = jest.fn(async () => streamResponse([
            'data: {"choices":[{"delta":{"content":"partial"},"finish_reason":null}]}\n\n',
        ])) as typeof fetch;

        await expect(requestChatCompletions(
            'https://example.com/chat/completions',
            {},
            {},
            async () => undefined,
            null,
            { deadlineMs: Date.now() + 1_000, retry: false },
        )).rejects.toThrow('LLM stream ended before a completion marker');
    });

    it('preserves partial text on an unexpected EOF', async () => {
        globalThis.fetch = jest.fn(async () => streamResponse([
            'data: {"choices":[{"delta":{"content":"partial"},"finish_reason":null}]}\n\n',
        ])) as typeof fetch;

        try {
            await requestChatCompletions(
                'https://example.com/chat/completions',
                {},
                {},
                async () => undefined,
                null,
                { deadlineMs: Date.now() + 1_000, retry: false },
            );
            throw new Error('expected incomplete stream error');
        } catch (e) {
            expect((e as any).partialText).toBe('partial');
            expect((e as any).partialResponse).toBe(true);
        }
    });

    it('rejects a length-limited completion', async () => {
        globalThis.fetch = jest.fn(async () => streamResponse([
            'data: {"choices":[{"delta":{"content":"partial"},"finish_reason":"length"}]}\n\n',
            'data: [DONE]\n\n',
        ])) as typeof fetch;

        await expect(requestChatCompletions(
            'https://example.com/chat/completions',
            {},
            {},
            async () => undefined,
            null,
            { deadlineMs: Date.now() + 1_000, retry: false },
        )).rejects.toThrow('model token limit');
    });

    it('validates completion reasons in non-stream JSON responses', async () => {
        globalThis.fetch = jest.fn(async () => jsonResponse('complete', 'stop')) as typeof fetch;

        await expect(requestChatCompletions(
            'https://example.com/chat/completions',
            {},
            {},
            null,
            null,
            { deadlineMs: Date.now() + 1_000, retry: false },
        )).resolves.toBe('complete');

        globalThis.fetch = jest.fn(async () => jsonResponse('partial', 'length')) as typeof fetch;
        await expect(requestChatCompletions(
            'https://example.com/chat/completions',
            {},
            {},
            null,
            null,
            { deadlineMs: Date.now() + 1_000, retry: false },
        )).rejects.toMatchObject({ partialText: 'partial' });

        globalThis.fetch = jest.fn(async () => jsonResponse('compatible', null)) as typeof fetch;
        await expect(requestChatCompletions(
            'https://example.com/chat/completions',
            {},
            {},
            null,
            null,
            { deadlineMs: Date.now() + 1_000, retry: false },
        )).resolves.toBe('compatible');
    });

    it('does not retry a network failure after partial output', async () => {
        const fetchMock = jest.fn(async () => {
            let emitted = false;
            const body = new ReadableStream<Uint8Array>({
                pull(controller) {
                    if (!emitted) {
                        emitted = true;
                        controller.enqueue(new TextEncoder().encode('data: {"choices":[{"delta":{"content":"partial"}}]}\n\n'));
                        return;
                    }
                    controller.error(new TypeError('network connection lost'));
                },
            });
            return new Response(body, {
                status: 200,
                headers: { 'Content-Type': 'text/event-stream' },
            });
        });
        globalThis.fetch = fetchMock as typeof fetch;

        await expect(requestChatCompletions(
            'https://example.com/chat/completions',
            {},
            {},
            async () => undefined,
            null,
            { deadlineMs: Date.now() + 1_000 },
        )).rejects.toMatchObject({ partialText: 'partial', partialResponse: true });
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('applies the first-content timeout while waiting for response headers', async () => {
        jest.useFakeTimers();
        globalThis.fetch = jest.fn((_url: string | URL | Request, init?: RequestInit) => new Promise<Response>((_resolve, reject) => {
            init?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
        })) as typeof fetch;

        const completion = requestChatCompletions(
            'https://example.com/chat/completions',
            {},
            {},
            async () => undefined,
            null,
            {
                firstContentTimeoutMs: 25,
                deadlineMs: Date.now() + 1_000,
                retry: false,
            },
        );
        const assertion = expect(completion).rejects.toThrow('first content timeout');
        await jest.advanceTimersByTimeAsync(25);

        await assertion;
    });

    it('lets non-stream JSON requests run until the absolute deadline', async () => {
        jest.useFakeTimers();
        globalThis.fetch = jest.fn((_url: string | URL | Request, init?: RequestInit) => new Promise<Response>((resolve, reject) => {
            const timeoutID = setTimeout(() => resolve(jsonResponse('complete', 'stop')), 30);
            init?.signal?.addEventListener('abort', () => {
                clearTimeout(timeoutID);
                reject(new DOMException('Aborted', 'AbortError'));
            });
        })) as typeof fetch;

        const completion = requestChatCompletions(
            'https://example.com/chat/completions',
            {},
            {},
            null,
            null,
            {
                firstContentTimeoutMs: 15,
                deadlineMs: Date.now() + 100,
                retry: false,
            },
        );
        await jest.advanceTimersByTimeAsync(30);

        await expect(completion).resolves.toBe('complete');
    });

    it('resets the idle timer when valid output keeps arriving', async () => {
        jest.useFakeTimers();
        globalThis.fetch = jest.fn(async () => {
            let interval: ReturnType<typeof setInterval>;
            let sent = 0;
            const body = new ReadableStream<Uint8Array>({
                start(controller) {
                    interval = setInterval(() => {
                        sent++;
                        controller.enqueue(new TextEncoder().encode(`data: {"choices":[{"delta":{"content":"${sent}"},"finish_reason":null}]}\n\n`));
                        if (sent === 3) {
                            clearInterval(interval);
                            controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
                            controller.close();
                        }
                    }, 20);
                },
                cancel() {
                    clearInterval(interval);
                },
            });
            return new Response(body, { headers: { 'Content-Type': 'text/event-stream' } });
        }) as typeof fetch;

        const completion = requestChatCompletions(
            'https://example.com/chat/completions',
            {},
            {},
            async () => undefined,
            null,
            {
                firstContentTimeoutMs: 25,
                idleTimeoutMs: 25,
                deadlineMs: Date.now() + 1_000,
                retry: false,
            },
        );
        await jest.advanceTimersByTimeAsync(70);

        await expect(completion).resolves.toBe('123');
    });

    it('rejects a partial stream when the request deadline expires', async () => {
        const fetchMock = jest.fn(async (_url: string | URL | Request, init?: RequestInit) => {
            const signal = init?.signal;
            const body = new ReadableStream<Uint8Array>({
                start(controller) {
                    controller.enqueue(new TextEncoder().encode('data: {"choices":[{"delta":{"content":"partial"}}]}\n\n'));
                    signal?.addEventListener('abort', () => controller.error(new DOMException('Aborted', 'AbortError')));
                },
            });
            return new Response(body, {
                status: 200,
                headers: { 'Content-Type': 'text/event-stream' },
            });
        });
        globalThis.fetch = fetchMock as typeof fetch;

        await expect(requestChatCompletions(
            'https://example.com/chat/completions',
            {},
            {},
            async () => undefined,
            null,
            {
                firstContentTimeoutMs: 0,
                idleTimeoutMs: 0,
                deadlineMs: Date.now() + 25,
                retry: false,
            },
        )).rejects.toThrow('LLM request exceeded the synchronous webhook deadline');
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });
});
