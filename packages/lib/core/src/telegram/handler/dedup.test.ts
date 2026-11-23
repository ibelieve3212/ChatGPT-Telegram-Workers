import { ENV } from '#/config';
import { claimMessage } from './dedup';

beforeEach(() => {
    const store = new Map<string, string>();
    ENV.SAFE_MODE = true;
    ENV.DATABASE = {
        get: async key => store.get(key) ?? null,
        put: async (key, value) => { store.set(key, value); },
        delete: async (key) => { store.delete(key); },
    };
});

it('首次异步读未完成时，第二个相同消息已被本进程认领拦截', async () => {
    let release!: () => void;
    const gate = new Promise<void>((resolve) => {
        release = resolve;
    });
    const get = ENV.DATABASE.get;
    ENV.DATABASE.get = async (key) => {
        await gate;
        return get(key);
    };
    const first = claimMessage('processed:1');
    expect(await claimMessage('processed:1')).toBe(false);
    release();
    expect(await first).toBe(true);
});

it('持久记录和旧版数组均能阻止顺序重投', async () => {
    await ENV.DATABASE.put('processed:1', '1');
    await ENV.DATABASE.put('legacy', '[2]');
    expect(await claimMessage('processed:1')).toBe(false);
    expect(await claimMessage('processed:2', 'legacy', 2)).toBe(false);
    expect(await claimMessage('processed:3', 'legacy', 3)).toBe(true);
});

it('存储异常不启动副作用，释放本地认领允许重试', async () => {
    const put = ENV.DATABASE.put;
    ENV.DATABASE.put = async () => {
        throw new Error('暂时故障');
    };
    await expect(claimMessage('processed:1')).rejects.toThrow('暂时故障');
    ENV.DATABASE.put = put;
    expect(await claimMessage('processed:1')).toBe(true);
});

it('关闭普通去重仍维持相册整组单次路由', async () => {
    ENV.SAFE_MODE = false;
    expect(await claimMessage('normal')).toBe(true);
    expect(await claimMessage('normal')).toBe(true);
    expect(await claimMessage('album', undefined, undefined, true)).toBe(true);
    expect(await claimMessage('album', undefined, undefined, true)).toBe(false);
});
