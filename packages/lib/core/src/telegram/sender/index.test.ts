import type * as Telegram from 'telegram-bot-api-types';
import { ENV } from '#/config';
import { MessageSender } from './index';

// 验证"不论字符多少都以富文本(Rich Message)形式发出"。
// 短消息以前走 sendMessage(HTML/markdownToHtml), 现在应优先走 sendRichMessage。

interface RecordedCall {
    method: string;
    params: any;
}

let recorded: RecordedCall[] = [];
// 每个方法的返回状态, 供测试控制降级路径
let statusByMethod: Record<string, number> = {};
let nextMessageId = 100;

function jsonResponse(status: number): Response {
    if (status !== 200) {
        return new Response(JSON.stringify({ ok: false, description: 'fake error' }), {
            status,
            headers: { 'content-type': 'application/json' },
        });
    }
    nextMessageId += 1;
    return new Response(JSON.stringify({ ok: true, result: { message_id: nextMessageId } }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
    });
}

jest.mock('../api', () => ({
    createTelegramBotAPI: () => {
        const make = (method: string) => async (params: any) => {
            recorded.push({ method, params });
            return jsonResponse(statusByMethod[method] ?? 200);
        };
        return {
            sendMessage: make('sendMessage'),
            sendRichMessage: make('sendRichMessage'),
            editMessageText: make('editMessageText'),
            deleteMessage: make('deleteMessage'),
            sendChatAction: make('sendChatAction'),
        };
    },
}));

function makeSender(): MessageSender {
    const message = {
        message_id: 1,
        date: 0,
        chat: { id: 111, type: 'private', first_name: 'u' },
        from: { id: 111, is_bot: false, first_name: 'u' },
        text: 'hi',
    } as unknown as Telegram.Message;
    return MessageSender.fromMessage('42:token', message);
}

function methods(): string[] {
    return recorded.map(c => c.method);
}

beforeEach(() => {
    recorded = [];
    statusByMethod = {};
    nextMessageId = 100;
    ENV.RICH_MESSAGE_MODE = true;
    ENV.DEFAULT_PARSE_MODE = 'HTML';
    ENV.CUSTOM_MESSAGE_RENDER = undefined as any;
    ENV.RICH_MESSAGE_MODE = true;
});

describe('富文本优先: 不论字符多少都走 Rich Message', () => {
    it('短消息(纯文本)也以 Rich Message 发送', async () => {
        const sender = makeSender();
        await sender.sendRichText('你好');

        expect(methods()).toContain('sendRichMessage');
        expect(methods()).not.toContain('sendMessage');
        expect(methods()).not.toContain('editMessageText');
        // Rich 内容为原始 markdown(不做 markdownToHtml 转换)
        const rich = recorded.find(c => c.method === 'sendRichMessage')!;
        expect(rich.params.rich_message).toEqual({ markdown: '你好' });
    });

    it('短消息带 markdown 时, 原样交给客户端渲染(不转 HTML)', async () => {
        const sender = makeSender();
        const md = '| a | b |\n|---|---|\n| 1 | 2 |\n\n**粗体**';
        await sender.sendRichText(md);

        const rich = recorded.find(c => c.method === 'sendRichMessage')!;
        expect(rich.params.rich_message.markdown).toBe(md);
        expect(rich.params.rich_message.markdown).not.toContain('<b>');
    });

    it('超长消息同样走 Rich Message(一条整发不拆分)', async () => {
        const sender = makeSender();
        await sender.sendRichText('x'.repeat(5000));

        expect(methods()).toEqual(['sendRichMessage']);
    });

    it('富文本不可用(服务端 404)时, 短消息降级为普通发送', async () => {
        statusByMethod = { sendRichMessage: 404 };
        const sender = makeSender();
        await sender.sendRichText('你好');

        expect(methods()).toContain('sendRichMessage');
        // 降级到 sendMessage(占位消息存在时实际调用 editMessageText)
        expect(methods().some(m => m === 'sendMessage' || m === 'editMessageText')).toBe(true);
    });

    it('关闭 RICH_MESSAGE_MODE 时保持旧行为(短消息不走 Rich)', async () => {
        ENV.RICH_MESSAGE_MODE = false;
        const sender = makeSender();
        await sender.sendRichText('你好');

        expect(methods()).not.toContain('sendRichMessage');
        expect(methods().some(m => m === 'sendMessage' || m === 'editMessageText')).toBe(true);
    });

    it('所有消息都优先富文本: 提示类纯文本消息(sendPlainText)同样走 Rich', async () => {
        const sender = makeSender();
        await sender.sendPlainText('🤖️正在处理中，请稍后...');

        expect(methods()).toContain('sendRichMessage');
        const rich = recorded.find(c => c.method === 'sendRichMessage')!;
        expect(rich.params.rich_message).toEqual({ markdown: '🤖️正在处理中，请稍后...' });
    });

    it('富文本超限(400)时先尝试拆分多条 Rich', async () => {
        // 首条 400(超限) → 按段落拆分成多条 Rich(单条文本上限 28000 字符)
        statusByMethod = { sendRichMessage: 400 };
        const sender = makeSender();
        const long = Array.from({ length: 3 }, (_, i) => `## 段${i + 1}\n\n${'y'.repeat(15000)}`).join('\n\n');
        await sender.sendRichText(long);

        expect(methods().filter(m => m === 'sendRichMessage').length).toBeGreaterThan(1);
    });

    it('配置了自定义渲染(CUSTOM_MESSAGE_RENDER)时不走富文本, 尊重其渲染结果', async () => {
        ENV.CUSTOM_MESSAGE_RENDER = (_mode, msg) => `custom:${msg}`;
        const sender = makeSender();
        await sender.sendRichText('你好');

        expect(methods()).not.toContain('sendRichMessage');
        const sent = recorded.find(c => c.method === 'sendMessage')!;
        expect(sent.params.text).toBe('custom:你好');
    });

    it('有占位消息时用 edit 改成富文本(不删占位、不新发)', async () => {
        const sender = makeSender();
        // 模拟"正在处理中"占位消息(或流式最后一条片段)
        sender.update({ message_id: 999 });
        await sender.sendRichText('短回复');

        expect(methods()).toEqual(['editMessageText']);
        const edit = recorded[0].params;
        expect(edit.message_id).toBe(999);
        expect(edit.rich_message).toEqual({ markdown: '短回复' });
        expect(methods()).not.toContain('deleteMessage');
    });

    it('edit 改成富文本成功时不再重复记录/不删占位', async () => {
        const sender = makeSender();
        sender.update({ message_id: 999 });
        await sender.sendRichText('短回复');

        expect(methods()).toEqual(['editMessageText']);
    });

    it('edit 失败(服务端不支持编辑为富文本)时回退为新发富文本并删除占位', async () => {
        statusByMethod = { editMessageText: 400 };
        const sender = makeSender();
        sender.update({ message_id: 999 });
        await sender.sendRichText('短回复');

        expect(methods()).toContain('sendRichMessage');
        expect(methods()).toContain('deleteMessage');
        // 新发的那条不复用占位 id
        const rich = recorded.find(c => c.method === 'sendRichMessage')!;
        expect(rich.params.rich_message).toEqual({ markdown: '短回复' });
    });

    it('短消息富文本失败(400)时不尝试拆分, 直接降级', async () => {
        statusByMethod = { sendRichMessage: 400 };
        const sender = makeSender();
        await sender.sendRichText('短消息');

        // 只尝试一次富文本, 随后降级普通发送
        expect(methods().filter(m => m === 'sendRichMessage').length).toBe(1);
        expect(methods()).not.toContain('deleteMessage');
    });
});
