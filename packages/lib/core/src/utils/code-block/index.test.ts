import { CODE_MOVED_HINT, splitFencedCodeBlocks } from './index';

describe('splitFencedCodeBlocks 拆分代码块', () => {
    it('无代码块时原样返回', () => {
        const md = '第一段\n\n第二段';
        const r = splitFencedCodeBlocks(md);
        expect(r.hasCode).toBe(false);
        expect(r.prose).toBe(md);
        expect(r.code).toBe('');
    });

    it('抽出一个代码块, 正文留提示', () => {
        const md = '先说明一下:\n\n```js\nconsole.log(1);\n```\n\n后面还有一句。';
        const r = splitFencedCodeBlocks(md);
        expect(r.hasCode).toBe(true);
        expect(r.code).toBe('```js\nconsole.log(1);\n```');
        expect(r.prose).toContain('先说明一下:');
        expect(r.prose).toContain(CODE_MOVED_HINT);
        expect(r.prose).toContain('后面还有一句。');
        expect(r.prose).not.toContain('console.log');
    });

    it('多个代码块合并到 code, 正文各留一处提示', () => {
        const md = 'A\n\n```\nx\n```\n\nB\n\n```py\ny\n```\n\nC';
        const r = splitFencedCodeBlocks(md);
        expect(r.code).toBe('```\nx\n```\n\n```py\ny\n```');
        expect(r.prose.match(/（代码见下一条）/g)).toHaveLength(2);
        expect(r.prose).not.toContain('```');
    });

    it('未闭合的围栏整段当代码(流式中途)', () => {
        const r = splitFencedCodeBlocks('说明:\n\n```js\nconst a = 1;');
        expect(r.hasCode).toBe(true);
        expect(r.code).toBe('```js\nconst a = 1;');
        expect(r.prose).toBe(`说明:\n\n${CODE_MOVED_HINT}`);
    });

    it('波浪号围栏也支持', () => {
        const r = splitFencedCodeBlocks('文字\n\n~~~\ncode\n~~~');
        expect(r.hasCode).toBe(true);
        expect(r.code).toBe('~~~\ncode\n~~~');
    });

    it('代码块内的 ``` 不会提前结束(内层不是闭合)', () => {
        const md = '````md\n```js\nx\n```\n````';
        const r = splitFencedCodeBlocks(md);
        expect(r.hasCode).toBe(true);
        expect(r.code).toContain('```js');
    });

    it('整条只有代码块: prose 为空', () => {
        const r = splitFencedCodeBlocks('```\nonly code\n```');
        expect(r.hasCode).toBe(true);
        expect(r.prose).toBe(CODE_MOVED_HINT);
    });
});
