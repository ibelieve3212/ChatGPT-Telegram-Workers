import { markdownToHtml } from './index';

// HTML 实体常量 (拼接构造, 避免源码中出现字面实体被误处理)
const AMP = '&' + 'amp;';
const LT = '&' + 'lt;';
const GT = '&' + 'gt;';

describe('markdownToHtml 行内格式', () => {
    it('转换单行粗体 (用户反馈回归用例)', () => {
        const input = '如果你说的是**今天（10月8日）江淮汽车 600418 跌停**，我认为这一下不能简单理解成"公司基本面突然崩了"，更像是**前期过热后的高位筹码松动 + 利空/不确定性集中兑现**。';
        const out = markdownToHtml(input);
        expect(out).toContain('<b>今天（10月8日）江淮汽车 600418 跌停</b>');
        expect(out).toContain('<b>前期过热后的高位筹码松动 + 利空/不确定性集中兑现</b>');
        expect(out).not.toContain('**');
    });

    it('一行内多个粗体互不干扰', () => {
        expect(markdownToHtml('**粗体1**中间**粗体2**')).toBe('<b>粗体1</b>中间<b>粗体2</b>');
    });

    it('支持跨行粗体 (连续普通行合并渲染)', () => {
        expect(markdownToHtml('**第一行\n第二行**')).toBe('<b>第一行\n第二行</b>');
    });

    it('支持粗体内嵌套斜体', () => {
        expect(markdownToHtml('**a *b* c**')).toBe('<b>a <i>b</i> c</b>');
    });

    it('支持粗斜体 ***text***', () => {
        expect(markdownToHtml('***粗斜体***')).toBe('<b><i>粗斜体</i></b>');
    });

    it('行内代码只转义一次 (修复双重转义)', () => {
        expect(markdownToHtml('`<div>` 和 `a & b`')).toBe(`<code>${LT}div${GT}</code> 和 <code>a ${AMP} b</code>`);
    });

    it('数学乘号不误判为斜体', () => {
        expect(markdownToHtml('2 * 3 * 4 = 24')).toBe('2 * 3 * 4 = 24');
        expect(markdownToHtml('5*x*10')).toBe('5*x*10');
    });

    it('下划线标识符不误判为斜体', () => {
        expect(markdownToHtml('a_b_c 和 snake_case_name')).toBe('a_b_c 和 snake_case_name');
    });

    it('__text__ 粗体与已知误判边界', () => {
        expect(markdownToHtml('__init__')).toBe('<b>init</b>');
        expect(markdownToHtml('a__b__c')).toBe('a__b__c');
    });

    it('中文斜体仍生效', () => {
        expect(markdownToHtml('中文 *强调* 一下')).toBe('中文 <i>强调</i> 一下');
        expect(markdownToHtml('（*注*）')).toBe('（<i>注</i>）');
    });

    it('链接转换并转义 URL 中的 &', () => {
        expect(markdownToHtml('[点这](https://example.com?a=1&b=2)')).toBe(`<a href="https://example.com?a=1${AMP}b=2">点这</a>`);
    });

    it('未闭合粗体保持原样不崩溃', () => {
        expect(markdownToHtml('**未闭合')).toBe('**未闭合');
    });

    it('删除线', () => {
        expect(markdownToHtml('~~删除~~')).toBe('<s>删除</s>');
    });
});

describe('markdownToHtml 块级结构', () => {
    it('标题用粗体模拟', () => {
        expect(markdownToHtml('## 标题文字')).toBe('<b>标题文字</b>');
    });

    it('无序列表', () => {
        expect(markdownToHtml('- 项目 **粗体**')).toBe('• 项目 <b>粗体</b>');
    });

    it('有序列表', () => {
        expect(markdownToHtml('1. 第一步')).toBe('1. 第一步');
    });

    it('引用块支持粗体', () => {
        expect(markdownToHtml('> 引用 **粗体**')).toBe('<blockquote>引用 <b>粗体</b></blockquote>');
    });

    it('引用块内跨行粗体', () => {
        expect(markdownToHtml('> **第一行\n> 第二行**')).toBe('<blockquote><b>第一行\n第二行</b></blockquote>');
    });

    it('代码块转义 HTML 字符', () => {
        const out = markdownToHtml('```python\nprint(\'<hi>\')\n```');
        expect(out).toBe(`<pre><code class="language-python">print('${LT}hi${GT}')</code></pre>`);
    });

    it('流式未闭合代码块仍渲染', () => {
        const out = markdownToHtml('```js\nconst x = 1;');
        expect(out).toBe('<pre><code class="language-js">const x = 1;</code></pre>');
    });

    it('分隔线输出空行', () => {
        expect(markdownToHtml('上文\n---\n下文')).toBe('上文\n\n下文');
    });

    it('段落合并保留空行结构', () => {
        expect(markdownToHtml('第一段\n\n第二段')).toBe('第一段\n\n第二段');
    });

    it('列表行会结束当前段落 (粗体不跨入列表)', () => {
        const out = markdownToHtml('**开头\n- 列表项**');
        expect(out).toBe('**开头\n• 列表项**');
    });
});
