import type { HistoryItem } from './types';
import { ENV } from '#/config';
import { renderOpenAIMessages } from './openai_compatibility';

// 验证 SYSTEM_INIT_MESSAGE 的两种发送方式:
// - system(默认): 标准 system 角色消息;
// - prepend: 并入最后一条用户消息开头, 仅请求时拼接、不写入历史(部分渠道会丢弃 system 消息)。

describe('renderOpenAIMessages 系统提示词', () => {
    const items: HistoryItem[] = [
        { role: 'user', content: '第一轮' },
        { role: 'assistant', content: '回复' },
        { role: 'user', content: '现在的问题' },
    ];

    let originalMode: typeof ENV.SYSTEM_PROMPT_MODE;

    beforeEach(() => {
        originalMode = ENV.SYSTEM_PROMPT_MODE;
    });

    afterEach(() => {
        ENV.SYSTEM_PROMPT_MODE = originalMode;
    });

    it('默认以 system 角色发送提示词', async () => {
        ENV.SYSTEM_PROMPT_MODE = 'system';
        const messages = await renderOpenAIMessages('系统提示', items);
        expect(messages[0]).toEqual({ role: 'system', content: '系统提示' });
        expect(messages[3]).toEqual({ role: 'user', content: '现在的问题' });
    });

    it('prepend 模式并入最后一条用户消息, 不产生 system 消息', async () => {
        ENV.SYSTEM_PROMPT_MODE = 'prepend';
        const messages = await renderOpenAIMessages('系统提示', items);
        expect(messages.some(m => m.role === 'system')).toBe(false);
        expect(messages[messages.length - 1]).toEqual({ role: 'user', content: '系统提示\n\n现在的问题' });
        // 只影响当前这条消息, 历史保持原样
        expect(messages[0]).toEqual({ role: 'user', content: '第一轮' });
        // 不修改原始历史数据
        expect(items[2].content).toBe('现在的问题');
    });

    it('prepend 模式支持多段内容(把提示拼进 text 段)', async () => {
        ENV.SYSTEM_PROMPT_MODE = 'prepend';
        const itemsWithParts: HistoryItem[] = [{ role: 'user', content: [{ type: 'text', text: '看图说话' }] }];
        const messages = await renderOpenAIMessages('系统提示', itemsWithParts);
        expect(messages[0].content[0]).toEqual({ type: 'text', text: '系统提示\n\n看图说话' });
        // 原始历史不受影响
        expect((itemsWithParts[0].content as any[])[0].text).toBe('看图说话');
    });

    it('没有提示词时不注入任何内容', async () => {
        const messages = await renderOpenAIMessages(undefined, items);
        expect(messages.some(m => m.role === 'system')).toBe(false);
        expect(messages.length).toBe(3);
    });
});
