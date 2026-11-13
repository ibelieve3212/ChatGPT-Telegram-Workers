import type { AvLibrary, AvVideo } from './types';
import { chooseVideo, findVideos, LookupError, matchCategory, normCode, parseArgs, pickVideo } from './pick';

function video(partial: Partial<AvVideo> & { videoId: number }): AvVideo {
    return {
        code: `ABC-${partial.videoId}`,
        title: `标题 ${partial.videoId}`,
        score: 100,
        coverUrl: `https://static.javranking.cc/video/cover/${partial.videoId}.webp`,
        year: 2024,
        scope: 'censored',
        tags: [],
        rankingAppearances: [],
        actorLinks: [],
        ...partial,
    };
}

function library(videos: AvVideo[]): AvLibrary {
    const categories = new Map([
        [1, { id: 1, name: '巨乳' }],
        [2, { id: 2, name: '中出', aliases: ['Creampie'] }],
        [3, { id: 3, name: '单体作品' }],
    ]);
    return { videos, categories, years: [2024, 2025], luckyIds: new Set(), durations: new Map() };
}

describe('normCode', () => {
    it('去掉分隔符并转小写', () => {
        expect(normCode('MIAB-009')).toBe('miab009');
        expect(normCode('miab_009 ')).toBe('miab009');
    });

    it('fC2 的 ppv 前缀归一化', () => {
        expect(normCode('FC2-PPV-2549115')).toBe('fc22549115');
        expect(normCode('FC2-2549115')).toBe('fc22549115');
    });

    it('空值安全', () => {
        expect(normCode(undefined)).toBe('');
        expect(normCode('')).toBe('');
    });
});

describe('matchCategory', () => {
    const lib = library([]);

    it('精确命中', () => {
        expect(matchCategory('巨乳', lib)).toBe('巨乳');
    });

    it('别名命中', () => {
        expect(matchCategory('creampie', lib)).toBe('中出');
    });

    it('子串兜底', () => {
        expect(matchCategory('中出', lib)).toBe('中出');
    });

    it('没命中返回 null', () => {
        expect(matchCategory('不存在的题材', lib)).toBeNull();
    });
});

describe('parseArgs', () => {
    const lib = library([]);

    it('范围 + 年份 + 题材', () => {
        const args = parseArgs(['无码', '2024', '巨乳'], lib);
        expect(args.scope).toBe('uncensored');
        expect(args.year).toBe(2024);
        expect(args.tags).toEqual(['巨乳']);
        expect(args.unknown).toEqual([]);
    });

    it('换一个 只置 reroll', () => {
        expect(parseArgs(['换一个'], lib).reroll).toBe(true);
        expect(parseArgs(['r'], lib).reroll).toBe(true);
    });

    it('全部/随便 忽略', () => {
        const args = parseArgs(['全部'], lib);
        expect(args).toMatchObject({ scope: null, year: null, tags: [], unknown: [] });
    });

    it('认不出的词进 unknown', () => {
        expect(parseArgs(['MIAB-009'], lib).unknown).toEqual(['MIAB-009']);
    });

    it('带 # 前缀也认', () => {
        expect(parseArgs(['#MIAB-009'], lib).unknown).toEqual(['MIAB-009']);
        expect(parseArgs(['#无码'], lib).scope).toBe('uncensored');
    });

    it('题材可叠加', () => {
        expect(parseArgs(['巨乳', '中出'], lib).tags).toEqual(['巨乳', '中出']);
    });
});

describe('findVideos', () => {
    const lib = library([
        video({ videoId: 1, code: 'MIAB-009', score: 500 }),
        video({ videoId: 2, code: 'MIAB-010', score: 900 }),
        video({ videoId: 3, code: 'SSIS-001', actorLinks: [{ name: '三上悠亚', gender: 'female' }] }),
    ]);

    it('番号精确命中, 忽略分隔符大小写', () => {
        expect(findVideos(lib, 'miab_009').map(v => v.videoId)).toEqual([1]);
    });

    it('前缀命中按战力排序', () => {
        expect(findVideos(lib, 'MIAB').map(v => v.videoId)).toEqual([2, 1]);
    });

    it('演员名直查', () => {
        expect(findVideos(lib, '三上').map(v => v.videoId)).toEqual([3]);
    });

    it('查不到返回空', () => {
        expect(findVideos(lib, 'ZZZZ-999')).toEqual([]);
    });
});

describe('pickVideo', () => {
    const lib = library([
        video({ videoId: 1, year: 2024, scope: 'censored', tags: ['巨乳'], score: 100 }),
        video({ videoId: 2, year: 2024, scope: 'uncensored', tags: ['中出'], score: 200 }),
        video({ videoId: 3, year: 2025, scope: 'censored', tags: ['巨乳', '中出'], score: 300 }),
    ]);

    it('同一天同条件结果稳定', () => {
        const first = pickVideo(lib, { scope: null, year: null, tags: [], reroll: false, today: '2026-02-14' });
        const second = pickVideo(lib, { scope: null, year: null, tags: [], reroll: false, today: '2026-02-14' });
        expect(second.videoId).toBe(first.videoId);
    });

    it('换条件/换天就重新摇(种子含条件与日期)', () => {
        const big = library(Array.from({ length: 30 }, (_, index) => video({
            videoId: index + 1,
            tags: index % 2 === 0 ? ['巨乳'] : ['中出'],
        })));
        const seen = new Set<number>();
        for (const day of ['2026-02-14', '2026-02-15', '2026-02-16', '2026-02-17']) {
            seen.add(pickVideo(big, { scope: null, year: null, tags: [], reroll: false, today: day }).videoId);
            seen.add(pickVideo(big, { scope: null, year: null, tags: ['巨乳'], reroll: false, today: day }).videoId);
        }
        expect(seen.size).toBeGreaterThan(1);
    });

    it('范围和年份是硬过滤', () => {
        const picked = pickVideo(lib, { scope: 'uncensored', year: 2024, tags: [], reroll: false, today: 'x' });
        expect(picked.videoId).toBe(2);
    });

    it('战力门槛过滤', () => {
        const picked = pickVideo(lib, { scope: null, year: null, tags: [], reroll: false, today: 'x', minScore: 250 });
        expect(picked.videoId).toBe(3);
    });

    it('空池抛 LookupError', () => {
        expect(() => pickVideo(lib, { scope: 'fc2', year: null, tags: [], reroll: false })).toThrow(LookupError);
    });

    it('换一个避开上一次那部', () => {
        for (let i = 0; i < 20; i += 1) {
            const picked = pickVideo(lib, { scope: null, year: 2024, tags: [], reroll: true, avoid: 1 });
            expect(picked.videoId).toBe(2);
        }
    });

    it('onlyIds 限定精选池', () => {
        const picked = pickVideo(lib, { scope: null, year: null, tags: [], reroll: false, onlyIds: new Set([3]) });
        expect(picked.videoId).toBe(3);
    });
});

describe('chooseVideo', () => {
    const lib = library([
        video({ videoId: 1, year: 2024, scope: 'censored', tags: ['巨乳'], score: 100 }),
        video({ videoId: 2, year: 2025, scope: 'censored', tags: ['中出'], score: 100 }),
    ]);

    it('条件都满足时不放宽', () => {
        const result = chooseVideo(lib, { scope: null, year: 2024, tags: ['巨乳'], reroll: false, unknown: [] }, { useLuckyPool: false });
        expect(result.video.videoId).toBe(1);
        expect(result.note).toBeNull();
    });

    it('题材太窄时逐个去掉并给出说明', () => {
        const result = chooseVideo(lib, { scope: null, year: 2024, tags: ['巨乳', '中出'], reroll: false, unknown: [] }, { useLuckyPool: false });
        expect(result.video.videoId).toBe(1);
        expect(result.note).toContain('中出');
        expect(result.note).toContain('没货');
    });

    it('年份没货时放宽到全部年份', () => {
        const result = chooseVideo(lib, { scope: null, year: 2023, tags: [], reroll: false, unknown: [] }, { useLuckyPool: false });
        expect(result.note).toContain('放宽到全部年份');
    });

    it('范围永不放宽', () => {
        expect(() => chooseVideo(lib, { scope: 'fc2', year: null, tags: [], reroll: false, unknown: [] }, { useLuckyPool: false }))
            .toThrow(LookupError);
    });

    it('默认只从精选池挑', () => {
        lib.luckyIds = new Set([2]);
        const result = chooseVideo(lib, { scope: null, year: null, tags: [], reroll: false, unknown: [] }, { useLuckyPool: true });
        expect(result.video.videoId).toBe(2);
        lib.luckyIds = new Set();
    });
});
