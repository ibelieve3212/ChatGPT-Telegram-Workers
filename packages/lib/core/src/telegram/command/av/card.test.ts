import type { AvVideo } from './types';
import { attachLtx, clean, coverCandidates, escapeHtml, ltxBlock, ltxLinks, MAX_CAPTION, renderCard, synopsisLine } from './card';
import { parseIsoDuration } from './data';

function video(partial: Partial<AvVideo> = {}): AvVideo {
    return {
        videoId: 22,
        code: 'MIAB-317',
        title: '辍学宅男诱惑：无内裤巨臀教师',
        score: 812,
        rating: 4.6,
        ratingCount: 1203,
        coverUrl: 'https://javranking.cc/video/cover/22.webp',
        releaseDate: '2024-09-17',
        year: 2024,
        scope: 'uncensored',
        tags: ['巨乳', '中出', '单体作品'],
        rankingAppearances: [{ name: '2025 上半期', position: 12 }],
        actorLinks: [{ name: '森日向子', gender: 'female' }],
        ...partial,
    };
}

const OPTIONS = { maxTags: 2, maxActors: 3, synopsis: '中文剧情一句。' };

describe('escapeHtml / clean', () => {
    it('转义会破坏 HTML 的字符', () => {
        expect(escapeHtml('<b>&</b>')).toBe('&lt;b&gt;&amp;&lt;/b&gt;');
    });

    it('单行字段压掉换行和空白', () => {
        expect(clean(' a\n b\t c ')).toBe('a b c');
    });

    it('空值安全', () => {
        expect(clean(undefined)).toBe('');
        expect(escapeHtml(null)).toBe('');
    });
});

describe('synopsisLine', () => {
    it('短文本原样返回', () => {
        expect(synopsisLine('很短的一句话。')).toBe('很短的一句话。');
    });

    it('长文本按句子截断并加省略号', () => {
        const text = '第一句话。第二句话。第三句话。第四句话。第五句话。';
        const line = synopsisLine(text, 12);
        expect(line.endsWith('…')).toBe(true);
        expect(line.length).toBeLessThanOrEqual(13);
    });
});

describe('renderCard', () => {
    it('结论信息齐全: 番号 标题 战力 评级 题材 链接', () => {
        const card = renderCard(video(), {}, new Map(), OPTIONS, null);
        expect(card).toContain('MIAB-317');
        expect(card).toContain('💪 战力 812 分');
        expect(card).toContain('人评价');
        expect(card).toContain('🏆 2025 上半期 #12');
        expect(card).toContain('🏷 无码');
        expect(card).toContain('🔖 巨乳 / 中出');
        expect(card).toContain('<a href="https://javranking.cc/zh-hans/videos/22/">');
    });

    it('题材最多显示 maxTags 个', () => {
        const card = renderCard(video(), {}, new Map(), OPTIONS, null);
        expect(card).not.toContain('单体作品');
    });

    it('放宽说明显示在标题下方', () => {
        const card = renderCard(video(), {}, new Map(), OPTIONS, '题材「中出」没货');
        expect(card).toContain('⚠️ 题材「中出」没货');
    });

    it('标题里的尖括号被转义, 不会破坏 HTML', () => {
        const card = renderCard(video({ title: '<script>x</script>' }), {}, new Map(), OPTIONS, null);
        expect(card).not.toContain('<script>');
        expect(card).toContain('&lt;script&gt;');
    });

    it('详情页片长优先于精选池时长', () => {
        const card = renderCard(video(), { duration: 130 }, new Map([[22, 90]]), OPTIONS, null);
        expect(card).toContain('⏱ 130 分钟');
    });

    it('没有剧情就不出现那行', () => {
        const card = renderCard(video(), {}, new Map(), { ...OPTIONS, synopsis: null }, null);
        expect(card).not.toContain('📖');
    });
});

describe('coverCandidates', () => {
    it('裸域名的封面改到 static CDN', () => {
        const urls = coverCandidates(video(), {});
        expect(urls[0]).toBe('https://static.javranking.cc/video/cover/22.webp');
    });

    it('去重且保留详情页兜底', () => {
        const urls = coverCandidates(video(), { cover: 'https://x/cover.webp', shot: 'https://x/shot.jpg' });
        expect(new Set(urls).size).toBe(urls.length);
        expect(urls).toContain('https://x/shot.jpg');
    });

    it('og 图兜底几乎每部都有', () => {
        expect(coverCandidates(video({ coverUrl: undefined }), {})).toContain('https://static.javranking.cc/video/og/22.webp');
    });
});

describe('ed2k', () => {
    it('内置表按归一化番号命中', () => {
        expect(ltxLinks('1KRMV-279').length).toBeGreaterThan(0);
        expect(ltxLinks('1krmv279')[0].startsWith('ed2k://')).toBe(true);
    });

    it('表里没有的番号返回空', () => {
        expect(ltxLinks('ZZZZ-999')).toEqual([]);
        expect(ltxBlock([])).toBe('');
    });

    it('链接包 <code>, 手机上点一下整条复制', () => {
        expect(ltxBlock(['ed2k://a'])).toContain('<code>ed2k://a</code>');
    });

    it('塞得下就接在卡片末尾', () => {
        const { text, extra } = attachLtx('卡片', ['ed2k://a']);
        expect(text).toContain('📥 LTX 资源');
        expect(extra).toBe('');
    });

    it('超过 1024 字就单发一条(链接不能被截断)', () => {
        const { text, extra } = attachLtx('x'.repeat(MAX_CAPTION - 5), ['ed2k://a'.repeat(50)]);
        expect(text).toBe('x'.repeat(MAX_CAPTION - 5));
        expect(extra).toContain('📥 LTX 资源');
    });
});

describe('parseIsoDuration', () => {
    it.each([
        ['PT130M', 130],
        ['PT1H52M', 112],
        ['PT3600S', 60],
        ['PT2H', 120],
    ])('%s -> %i 分钟', (input, expected) => {
        expect(parseIsoDuration(input)).toBe(expected);
    });

    it('无法解析时返回 undefined', () => {
        expect(parseIsoDuration(undefined)).toBeUndefined();
        expect(parseIsoDuration('130分钟')).toBeUndefined();
    });
});
