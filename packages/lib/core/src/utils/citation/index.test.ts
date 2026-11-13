import { inlineCitations } from './index';

describe('inlineCitations 出处内联化', () => {
    it('把正文 [n] 角标改写成内联链接, 并删掉末尾清单', () => {
        const input = [
            '第一点：黄仁勋目前面临什么情况。',
            '第二点：他会不会加入 AMD。[2]',
            '',
            '### 参考来源',
            '[1] NVIDIA 新闻稿 - https://nvidianews.nvidia.com/a',
            '[2] AMD 战略 - https://www.reuters.com/b/b.html',
        ].join('\n');
        const out = inlineCitations(input);
        expect(out).toBe([
            '第一点：黄仁勋目前面临什么情况。',
            '第二点：他会不会加入 AMD。[2](https://www.reuters.com/b/b.html)',
        ].join('\n'));
    });

    it('支持 "1. url" 形式的清单', () => {
        const input = [
            '结论。[1]',
            '',
            '参考资料：',
            '1. https://a.com/x',
        ].join('\n');
        expect(inlineCitations(input)).toBe('结论。[1](https://a.com/x)');
    });

    it('支持 "- [1] 标题 url" 形式且保留标题不影响解析', () => {
        const input = '正文[1]\n\n**参考来源**\n- [1] Bloomberg: NVIDIA weighs CEO future https://bloomberg.com/x';
        expect(inlineCitations(input)).toBe('正文[1](https://bloomberg.com/x)');
    });

    it('清单里多个来源按编号映射', () => {
        const input = [
            '甲[1]乙[2]',
            '',
            '来源：',
            '[1] https://a.com',
            '[2] https://b.com',
        ].join('\n');
        expect(inlineCitations(input)).toBe('甲[1](https://a.com)乙[2](https://b.com)');
    });

    it('已有内联链接不重复改写, 仅删掉末尾清单', () => {
        const input = '正文[1](https://a.com)\n\n来源：\n[1] https://a.com';
        expect(inlineCitations(input)).toBe('正文[1](https://a.com)');
    });

    it('代码块内的角标不改写', () => {
        const input = [
            '```js',
            'const a = arr[1];',
            '```',
            '正文[1]',
            '',
            '来源：',
            '[1] https://a.com',
        ].join('\n');
        const out = inlineCitations(input);
        expect(out).toContain('const a = arr[1];');
        expect(out).toContain('正文[1](https://a.com)');
    });

    it('没有末尾清单时原样返回', () => {
        const input = '随手一句 [1] 说明, 但没有来源清单。';
        expect(inlineCitations(input)).toBe(input);
    });

    it('编号对不上时保留原角标', () => {
        const input = '正文[3]没有对应来源\n\n来源：\n[1] https://a.com';
        expect(inlineCitations(input)).toBe('正文[3]没有对应来源');
    });

    it('清单前有分隔线时一并清理', () => {
        const input = '结论文本。[1]\n\n---\n\n来源：\n[1] https://a.com';
        expect(inlineCitations(input)).toBe('结论文本。[1](https://a.com)');
    });
});

describe('inlineCitations 重复裸网址清理', () => {
    it('删掉紧跟在内联链接后的同一网址', () => {
        const input = '正文[3](https://a.com/x) https://a.com/x。';
        expect(inlineCitations(input)).toBe('正文[3](https://a.com/x)。');
    });

    it('删掉以 " - " 分隔的重复网址并清理空格', () => {
        const input = '结论[1](https://b.com/y) - https://b.com/y';
        expect(inlineCitations(input)).toBe('结论[1](https://b.com/y) -');
    });

    it('清单内联化后残留的重复网址也被删掉', () => {
        const input = [
            '第一点[1] https://c.com/z',
            '',
            '来源：',
            '[1] https://c.com/z',
        ].join('\n');
        expect(inlineCitations(input)).toBe('第一点[1](https://c.com/z)');
    });

    it('不同网址不会被误删', () => {
        const input = '见[1](https://a.com) 另见 https://d.com/other';
        expect(inlineCitations(input)).toBe('见[1](https://a.com) 另见 https://d.com/other');
    });

    it('代码块内的网址不动', () => {
        const input = '```\n见 https://a.com\n```\n正文[1](https://a.com) https://a.com';
        const out = inlineCitations(input);
        expect(out).toContain('见 https://a.com');
        expect(out.endsWith('正文[1](https://a.com)')).toBe(true);
    });
});

describe('内联后的清理', () => {
    it('独占一行的角标被删掉', () => {
        const md = '正文一段。[1]\n\n[1][2]\n\n后文。\n\n来源：\n[1] A https://a.com\n[2] B https://b.com';
        const out = inlineCitations(md);
        expect(out).toBe('正文一段。[1](https://a.com)\n\n后文。');
    });

    it('同一行已有命名链接时不再重复贴角标链接', () => {
        const md = '消息。[官方公告](https://a.com) [1][2]\n\n- [1] A https://a.com\n- [2] B https://b.com';
        const out = inlineCitations(md);
        expect(out).toContain('](https://a.com) [2](https://b.com)');
        expect(out).not.toContain('[1](https://a.com)');
    });

    it('残留的来源标签被去掉, 只留链接', () => {
        const md = '正文。\n\n来源：[官网](https://a.com) [1]\n\n- [1] A https://a.com';
        expect(inlineCitations(md)).toBe('正文。\n\n[官网](https://a.com)');
    });

    it('正文里的正常角标不受影响', () => {
        const md = '第一点。[1]\n\n第二点。[2]\n\n- [1] A https://a.com\n- [2] B https://b.com';
        expect(inlineCitations(md)).toBe('第一点。[1](https://a.com)\n\n第二点。[2](https://b.com)');
    });
});
