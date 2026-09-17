import type { AgentUserConfig } from '#/config';
import { ENV } from '#/config';
import { getChatCompletionTimeoutBudgetMs } from './request';

describe('openAI timeout', () => {
    const originalChatTimeout = ENV.CHAT_COMPLETE_API_TIMEOUT;
    const originalPollingMode = ENV.IS_POLLING_MODE;

    afterEach(() => {
        ENV.CHAT_COMPLETE_API_TIMEOUT = originalChatTimeout;
        ENV.IS_POLLING_MODE = originalPollingMode;
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
});
