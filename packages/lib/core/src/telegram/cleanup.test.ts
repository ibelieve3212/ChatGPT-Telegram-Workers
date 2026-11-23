import type { TelegramBotAPI } from './api';
import { deleteTransientMessage } from './cleanup';

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });

it('遇到 HTTP 429 按短 retry_after 重试，成功后不残留占位', async () => {
    jest.useFakeTimers();
    try {
        const remove = jest.fn()
            .mockResolvedValueOnce(json({ ok: false, parameters: { retry_after: 1 } }, 429))
            .mockResolvedValueOnce(json({ ok: true, result: true }));
        const pending = deleteTransientMessage({ deleteMessage: remove } as unknown as TelegramBotAPI, 111, 101);
        await jest.advanceTimersByTimeAsync(1000);
        expect(await pending).toBe(true);
        expect(remove).toHaveBeenCalledTimes(2);
    } finally { jest.useRealTimers(); }
});

it.each([
    [json({ ok: false, parameters: { retry_after: 30 } }, 429), false],
    [json({ ok: false, description: 'Forbidden' }, 403), false],
    [json({ ok: false, description: 'Forbidden' }), false],
    [json({ ok: false, description: 'Bad Request: message to delete not found' }, 400), true],
])('只确认 Telegram 真正成功或消息已不存在，失败不谎报删除', async (response, expected) => {
    const remove = jest.fn(async () => response);
    expect(await deleteTransientMessage({ deleteMessage: remove } as unknown as TelegramBotAPI, 111, 101)).toBe(expected);
    expect(remove).toHaveBeenCalledTimes(1);
});
