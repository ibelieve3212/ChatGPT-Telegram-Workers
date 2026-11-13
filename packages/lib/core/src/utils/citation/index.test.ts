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
