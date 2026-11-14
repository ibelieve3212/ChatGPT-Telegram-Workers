import type * as Telegram from 'telegram-bot-api-types';
import { PENDING_TEXT, withPending } from './pending';
import { MessageSender } from './sender';

// 验证通用等待反馈: 慢操作会发一条占位消息并删掉, 快操作不打扰, 任何失败都不影响结果。

interface RecordedCall {
    method: string;
    params: any;
}

let recorded: RecordedCall[] = [];
let nextMessageId = 500;
let failMethod: string | null = null;

function jsonResponse(method: string, status = 200): Response {
    if (failMethod === method) {
        return new Response(JSON.stringify({ ok: false, description: 'fake error' }), { status: 400 });
    }
    if (status !== 200) {
        return new Response(JSON.stringify({ ok: false }), { status });
    }
    nextMessageId += 1;
    return new Response(JSON.stringify({ ok: true, result: { message_id: nextMessageId } }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
    });
}

jest.mock('./api', () => ({
    createTelegramBotAPI: () => {
        const make = (method: string) => async (params: any) => {
            recorded.push({ method, params });
            return jsonResponse(method);
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
        text: '/av',
    } as unknown as Telegram.Message;
    return MessageSender.fromMessage('42:token', message);
}

function makeMessage(): Telegram.Message {
    return {
        message_id: 1,
        date: 0,
        chat: { id: 111, type: 'private', first_name: 'u' },
        from: { id: 111, is_bot: false, first_name: 'u' },
        text: '/av',
    } as unknown as Telegram.Message;
}

/** 直接失败的 Response, 代表命令抛错 */
const result = () => new Response(JSON.stringify({ ok: true, result: { message_id: 1 } }), { status: 200 });

beforeEach(() => {
    recorded = [];
    nextMessageId = 500;
    failMethod = null;
});

describe('通用等待反馈 (withPending)', () => {
    it('收到命令立即发占位消息, 结束后删掉', async () => {
        recorded = [];
        const resp = await withPending(makeSender(), makeMessage(), async () => {
            await new Promise(r => setTimeout(r, 30));
            return result();
        });

        const sent = recorded.filter(c => c.method === 'sendMessage');
        expect(sent.length).toBe(1);
        expect(sent[0].params.text).toBe(PENDING_TEXT);
        // 占位消息发出后立刻被删掉, 对话里不留痕
        const deleted = recorded.filter(c => c.method === 'deleteMessage');
        expect(deleted.length).toBe(1);
        expect(resp.status).toBe(200);
    });

    it('占位消息不等命令返回: 命令还在跑时就已经发出去了', async () => {
        recorded = [];
        let release: (() => void) | null = null;
        const gate = new Promise<void>((resolve) => {
            release = resolve;
        });
        const running = withPending(makeSender(), makeMessage(), async () => {
            await gate;
            return result();
        });
        // 命令还没结束, 占位消息应该已经在路上了
        await new Promise(r => setTimeout(r, 10));
        expect(recorded.filter(c => c.method === 'sendMessage').length).toBe(1);
        expect(recorded.filter(c => c.method === 'deleteMessage').length).toBe(0);
        release!();
        await running;
    });

    it('秒回的命令同样会发占位消息(用户要的就是"收到就有反馈")', async () => {
        recorded = [];
        await withPending(makeSender(), makeMessage(), async () => result());
        expect(recorded.filter(c => c.method === 'sendMessage').length).toBe(1);
        expect(recorded.filter(c => c.method === 'deleteMessage').length).toBe(1);
    });

    it('运行期间持续发送输入状态(typing)', async () => {
        recorded = [];
        await withPending(makeSender(), makeMessage(), async () => {
            await new Promise(r => setTimeout(r, 20));
            return result();
        });
        const actions = recorded.filter(c => c.method === 'sendChatAction');
        expect(actions.length).toBeGreaterThan(0);
        expect(actions[0].params.action).toBe('typing');
    });

    it('出图类命令可以指定 upload_photo 状态', async () => {
        recorded = [];
        await withPending(makeSender(), makeMessage(), async () => {
            await new Promise(r => setTimeout(r, 20));
            return result();
        }, { action: 'upload_photo' });
        expect(recorded.find(c => c.method === 'sendChatAction')!.params.action).toBe('upload_photo');
    });

    it('命令自己会发占位消息时传 false, 分发器不重复发', async () => {
        recorded = [];
        await withPending(makeSender(), makeMessage(), async () => {
            await new Promise(r => setTimeout(r, 20));
            return result();
        }, false);
        expect(recorded.length).toBe(0);
    });

    it('操作抛错时也要把占位消息清掉, 错误照常抛出', async () => {
        recorded = [];
        await expect(withPending(makeSender(), makeMessage(), async () => {
            await new Promise(r => setTimeout(r, 30));
            throw new Error('boom');
        })).rejects.toThrow('boom');
        expect(recorded.filter(c => c.method === 'deleteMessage').length).toBe(1);
    });

    it('占位消息发送失败不影响主流程', async () => {
        failMethod = 'sendMessage';
        recorded = [];
        const resp = await withPending(makeSender(), makeMessage(), async () => {
            await new Promise(r => setTimeout(r, 20));
            return result();
        });
        expect(resp.status).toBe(200);
        expect(recorded.filter(c => c.method === 'deleteMessage').length).toBe(0);
    });
});
