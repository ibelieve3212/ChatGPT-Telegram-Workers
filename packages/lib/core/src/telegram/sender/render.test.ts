import { FEATURES } from '#/config';
import { renderMessage, splitMarkdownByParagraphs, splitMarkdownForHtml } from './render';

// render.ts 里的三个函数都是纯函数(除 FEATURES 全局开关), 这里直接断言输出,
// 不经过 MessageSender, 这样渲染/拆分规则出问题时能一眼定位到具体规则。

const FEATURE_DEFAULTS = { ...FEATURES };

beforeEach(() => {
    Object.assign(FEATURES, FEATURE_DEFAULTS);
});

afterEach(() => {
    Object.assign(FEATURES, FEATURE_DEFAULTS);
});

describe('renderMessage', () => {
    it('把 markdown 转成 Telegram HTML (HTML 模式)', () => {
        expect(renderMessage('HTML', '**bold**')).toBe('<b>bold</b>');
    });

    it('parse_mode 非 HTML 时原样返回', () => {
        expect(renderMessage(null, '**bold**')).toBe('**bold**');
    });

    it('短回复不包折叠引用块', () => {
        const out = renderMessage('HTML', '短回复');
        expect(out).not.toContain('<blockquote');
        expect(out).toBe('短回复');
        expect(out.length).toBeLessThan(100);
    });

    it('超过 100 字符的回复整条包一层 expandable 引用块', () => {
        const out = renderMessage('HTML', '中'.repeat(150));
        expect(out.startsWith('<blockquote expandable>')).toBe(true);
        expect(out.endsWith('</blockquote>')).toBe(true);
        expect(out).toContain('中'.repeat(150));
    });

    it('折叠包裹的是转换后的 HTML, 不是原始 markdown', () => {
        const out = renderMessage('HTML', `${'**粗体**'.repeat(30)}`);
        expect(out).toContain('<b>粗体</b>');
        expect(out).not.toContain('**');
    });

    it('表格默认转成列表(FEATURES.tableAsList=true)', () => {
        const out = renderMessage('HTML', '| a | b |\n|---|---|\n| 1 | 2 |');
        expect(out).toContain('- <b>1</b>：2');
        expect(out).not.toContain('<pre>');
    });

    it('关闭 tableAsList 时保留 <pre> 表格', () => {
        FEATURES.tableAsList = false;
        const out = renderMessage('HTML', '| a | b |\n|---|---|\n| 1 | 2 |');
        expect(out).toContain('<pre>');
    });

    it('关闭 expandableReply 时不折叠, 但 HTML 仍然转换', () => {
        FEATURES.expandableReply = false;
        const out = renderMessage('HTML', '中'.repeat(150));
        expect(out).not.toContain('<blockquote');
        expect(out).toBe('中'.repeat(150));
    });
});

describe('splitMarkdownByParagraphs', () => {
    it('内容不超限时整条返回', () => {
        expect(splitMarkdownByParagraphs('hello world', 100)).toEqual(['hello world']);
    });

    it('按空行分组, 每组不超过上限', () => {
        const md = ['a'.repeat(10), 'b'.repeat(10), 'c'.repeat(10)].join('\n\n');
        const chunks = splitMarkdownByParagraphs(md, 25);
        expect(chunks).toEqual(['aaaaaaaaaa\n\nbbbbbbbbbb', 'cccccccccc']);
        for (const c of chunks) {
            expect(c.length).toBeLessThanOrEqual(25);
        }
    });

    it('单个段落超限时按行二次切分', () => {
        const md = ['x'.repeat(20), 'y'.repeat(20), 'z'.repeat(20)].join('\n');
        const chunks = splitMarkdownByParagraphs(md, 25);
        expect(chunks).toEqual(['xxxxxxxxxxxxxxxxxxxx', 'yyyyyyyyyyyyyyyyyyyy', 'zzzzzzzzzzzzzzzzzzzz']);
    });

    it('单行本身超限时整行作为一段(不切断)', () => {
        const line = 'q'.repeat(60);
        expect(splitMarkdownByParagraphs(line, 25)).toEqual([line]);
    });

    it('空字符串返回一个空片段, 不抛错', () => {
        expect(splitMarkdownByParagraphs('', 100)).toEqual(['']);
    });

    it('拆分后内容不丢失', () => {
        const paras = Array.from({ length: 6 }, (_, i) => `第${i}段${'z'.repeat(20)}`);
        const md = paras.join('\n\n');
        const chunks = splitMarkdownByParagraphs(md, 60);
        expect(chunks.join('\n\n')).toBe(md);
    });
});

describe('splitMarkdownForHtml', () => {
    it('内容不超限时整条返回', () => {
        expect(splitMarkdownForHtml('短内容', 4096)).toEqual(['短内容']);
    });

    it('按"渲染后"长度切分, 每段渲染结果都不超过上限', () => {
        // 12 段各 600 字, markdown 源文本已超过 4096, 渲染后也超
        const md = Array.from({ length: 12 }, () => `**${'w'.repeat(600)}**`).join('\n\n');
        const chunks = splitMarkdownForHtml(md, 4096);
        expect(chunks.length).toBeGreaterThan(1);
        for (const c of chunks) {
            expect(renderMessage('HTML', c).length).toBeLessThanOrEqual(4096);
        }
    });

    it('markdown 膨胀后仍按渲染长度切(不是按源文本长度)', () => {
        // 源文本 4000 字, 但每段 **x** 渲染后只多 7 个字符; 关键是不能超 4096
        const md = Array.from({ length: 8 }, () => `**${'x'.repeat(500)}**`).join('\n\n');
        const chunks = splitMarkdownForHtml(md, 4096);
        for (const c of chunks) {
            expect(renderMessage('HTML', c).length).toBeLessThanOrEqual(4096);
        }
    });

    it('超长单行(如超长 URL)按 maxLen/2 硬切, 不丢内容', () => {
        const line = `https://example.com/${'a'.repeat(5000)}`;
        const chunks = splitMarkdownForHtml(line, 4096);
        expect(chunks.length).toBe(3);
        expect(chunks.map(c => c.length)).toEqual([2048, 2048, 924]);
        expect(chunks.join('')).toBe(line);
    });

    it('拆分后内容不丢失', () => {
        const paras = Array.from({ length: 10 }, (_, i) => `第${i}段 ${'y'.repeat(400)}`);
        const md = paras.join('\n\n');
        const chunks = splitMarkdownForHtml(md, 4096);
        expect(chunks.join('\n\n')).toBe(md);
    });
});
