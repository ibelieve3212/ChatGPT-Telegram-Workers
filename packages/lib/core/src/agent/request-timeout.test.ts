import { requestChatCompletions } from './request';

describe('request chat completions timeout', () => {
    it('rejects a partial stream when the request deadline expires', async () => {
        const originalFetch = globalThis.fetch;
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

        try {
            await expect(requestChatCompletions(
                'https://example.com/chat/completions',
                {},
                {},
                async () => undefined,
                null,
                0,
                25,
            )).rejects.toThrow('LLM request timeout after partial response');
            expect(fetchMock).toHaveBeenCalledTimes(1);
        } finally {
            globalThis.fetch = originalFetch;
        }
    });
});
