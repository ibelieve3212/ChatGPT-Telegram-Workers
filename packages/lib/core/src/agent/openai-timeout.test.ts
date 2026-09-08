import { ENV } from '#/config';
import { getImageFirstTokenTimeoutMs } from './openai';
import { getChatCompletionTimeoutBudgetMs } from './request';

describe('openAI image timeout', () => {
    const originalChatTimeout = ENV.CHAT_COMPLETE_API_TIMEOUT;
    const originalImageTimeout = ENV.IMAGE_FIRST_TOKEN_TIMEOUT;

    afterEach(() => {
        ENV.CHAT_COMPLETE_API_TIMEOUT = originalChatTimeout;
        ENV.IMAGE_FIRST_TOKEN_TIMEOUT = originalImageTimeout;
    });

    it('reads the image timeout from environment config', () => {
        ENV.IMAGE_FIRST_TOKEN_TIMEOUT = 30;

        expect(getImageFirstTokenTimeoutMs(true, 150_000)).toBe(30_000);
        expect(getImageFirstTokenTimeoutMs(false, 150_000)).toBe(0);
    });

    it('leaves most of the request budget for the text-only fallback', () => {
        ENV.IMAGE_FIRST_TOKEN_TIMEOUT = 30;

        expect(getImageFirstTokenTimeoutMs(true, 40_000)).toBe(8_000);
    });

    it('reserves time to answer the webhook after an LLM timeout', () => {
        ENV.CHAT_COMPLETE_API_TIMEOUT = 60;

        expect(getChatCompletionTimeoutBudgetMs()).toBe(50_000);
    });
});
