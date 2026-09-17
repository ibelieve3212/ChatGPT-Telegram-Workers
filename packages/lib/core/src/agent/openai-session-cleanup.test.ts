import type { AgentUserConfig } from '#/config';
import { ENV } from '#/config';
import { OpenAI } from './openai';

// 验证清理 X-Session-Id / OPENAI_SESSION_MODE 后:
// 1. 请求头不包含 X-Session-Id
// 2. messages 完整历史被发送(不砍到1条)
// 3. 不再依赖 OPENAI_SESSION_MODE 字段(已删除, 访问应返回 undefined 而非抛错)

describe('openai agent: X-Session-Id / SESSION_MODE 已清理', () => {
    const originalFetch = globalThis.fetch;

    // 构造一个最小 context (AgentUserConfig)
    const ctx: AgentUserConfig = {
        OPENAI_API_BASE: 'https://example.test/v1',
        OPENAI_API_KEY: 'sk-test',
        OPENAI_CHAT_MODEL: 'gpt-free',
    } as any as AgentUserConfig;

    afterEach(() => {
        globalThis.fetch = originalFetch;
    });

    it('请求头不包含 X-Session-Id, messages 完整历史被发送', async () => {
        let capturedHeaders: Record<string, string> = {};
        let capturedBody: any = null;

        globalThis.fetch = ((url: any, init: any) => {
            capturedHeaders = init.headers || {};
            capturedBody = JSON.parse(init.body);
            // 返回一个最小 OpenAI 响应
            return Promise.resolve(new Response(JSON.stringify({
                choices: [{ message: { content: 'ok', role: 'assistant' } }],
            }), { status: 200, headers: { 'content-type': 'application/json' } }));
        }) as any;

        const messages = [
            { role: 'user', content: '记住秘密词:芒果' },
            { role: 'assistant', content: '好的,记住了芒果' },
            { role: 'user', content: '秘密词是什么?' },
        ];

        const openAI = new OpenAI();
        await openAI.request({
            prompt: '你是助手',
            messages,
            imageMode: 'none',
            deadlineMs: Date.now() + 60000,
        } as any, ctx, null);

        // 断言1: 头里没有 X-Session-Id
        expect(capturedHeaders['X-Session-Id']).toBeUndefined();
        expect(capturedHeaders['x-session-id']).toBeUndefined();

        // 断言2: messages 完整发送(3条历史 + 1条system prompt)
        expect(capturedBody.messages).toBeDefined();
        expect(capturedBody.messages.length).toBe(4);
        // 首条是 system prompt
        expect(capturedBody.messages[0].role).toBe('system');
        expect(capturedBody.messages[0].content).toContain('你是助手');
        // 后3条是完整历史(芒果->答->问), 顺序保留
        expect(capturedBody.messages[1].content).toContain('芒果');
        expect(capturedBody.messages[2].role).toBe('assistant');
        expect(capturedBody.messages[3].content).toContain('秘密词是什么');

        // 断言3: OPENAI_SESSION_MODE 字段已从 config 删除, 访问为 undefined
        expect((ENV as any).OPENAI_SESSION_MODE).toBeUndefined();
        expect((ENV as any).OPENAI_SESSION_HEADER).toBeUndefined();
    });
});
