import { markdownToHtml, wrapInExpandableBlockquote } from './index';

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
        expect(markdownToHtml('> 引用 **粗体**')).toBe('<blockquote expandable>引用 <b>粗体</b></blockquote>');
    });

    it('引用块内跨行粗体', () => {
        expect(markdownToHtml('> **第一行\n> 第二行**')).toBe('<blockquote expandable><b>第一行\n第二行</b></blockquote>');
    });

    it('引用块内保留出处角标链接([2] 可点)', () => {
        expect(markdownToHtml('> 法定节假日是 4 天 [2](https://www.gov.cn/a.html)')).toBe(
            '<blockquote expandable>法定节假日是 4 天 <a href="https://www.gov.cn/a.html">[2]</a></blockquote>',
        );
    });

    it('普通文字链接不带方括号', () => {
        expect(markdownToHtml('见[官网](https://www.gov.cn/b.html)')).toBe(
            '见<a href="https://www.gov.cn/b.html">官网</a>',
        );
    });

    it('表格降级为 pre 保留对齐(普通消息不支持 table)', () => {
        const out = markdownToHtml('| 部件 | 功耗 |\n|---|---|\n| RTX 5070 | 250W |');
        expect(out).toBe('<pre>| 部件 | 功耗 |\n|---|---|\n| RTX 5070 | 250W |</pre>');
    });

    it('表格内容转义 HTML 字符', () => {
        const out = markdownToHtml('| a | b |\n|---|---|\n| <x> | & |');
        expect(out).toBe(`<pre>| a | b |\n|---|---|\n| ${LT}x${GT} | &amp; |</pre>`);
    });

    it('表格前后段落正常渲染', () => {
        const out = markdownToHtml('前文\n\n| a |\n|---|\n| 1 |\n\n后文');
        expect(out).toBe(`前文\n\n<pre>| a |\n|---|\n| 1 |</pre>\n\n后文`);
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

describe('tableAsList 表格转列表', () => {
    const twoCol = '| 公司 | 可能性分析 |\n|---|---|\n| AMD | 竞争关系复杂 |\n| Intel | 战略重组时可能邀请 |';
    const threeCol = '| 型号 | 功耗 | 价格 |\n|---|---|---|\n| RTX 5070 | 250W | 4999 |';

    it('默认仍渲染为 <pre>', () => {
        expect(markdownToHtml(twoCol)).toContain('<pre>');
        expect(markdownToHtml(twoCol, { tableAsList: false })).toContain('<pre>');
    });

    it('两列: 首列加粗, 次列直接作说明', () => {
        const html = markdownToHtml(twoCol, { tableAsList: true });
        expect(html).toBe('- <b>AMD</b>：竞争关系复杂\n- <b>Intel</b>：战略重组时可能邀请');
        expect(html).not.toContain('<pre>');
    });

    it('多列: 值带表头标签, 分号分隔', () => {
        expect(markdownToHtml(threeCol, { tableAsList: true }))
            .toBe('- <b>RTX 5070</b>：功耗：250W；价格：4999');
    });

    it('转列表后整条可以折叠', () => {
        const md = `开头一段说明文字。\n\n${twoCol}\n\n结尾一段说明文字。`;
        // 这里只验证“能折”(阈值另有用例), 故显式传 0
        const html = wrapInExpandableBlockquote(markdownToHtml(md, { tableAsList: true }), 0);
        expect(html.startsWith('<blockquote expandable>')).toBe(true);
        expect(html).not.toContain('<pre>');
    });

    it('只有表头没有数据行时不输出空内容', () => {
        expect(markdownToHtml('| a | b |\n|---|---|', { tableAsList: true })).toBe('');
    });

    it('单元格里的特殊字符照常转义', () => {
        const html = markdownToHtml('| a | b |\n|---|---|\n| <x> | a & b |', { tableAsList: true });
        expect(html).toBe('- <b>&lt;x&gt;</b>：a &amp; b');
    });
});

describe('wrapInExpandableBlockquote 整条折叠', () => {
    it('短回复不包 (没有折叠价值)', () => {
        expect(wrapInExpandableBlockquote('收到')).toBe('收到');
    });

    it('默认阈值 100 字: 99 字不包, 100 字包', () => {
        const short = '字'.repeat(99);
        const long = '字'.repeat(100);
        expect(wrapInExpandableBlockquote(short)).toBe(short);
        expect(wrapInExpandableBlockquote(long)).toBe(`<blockquote expandable>${long}</blockquote>`);
    });

    it('长回复整条包一层 expandable 引用块', () => {
        const html = `<b>▌各部件功耗</b>\n${'x'.repeat(240)}`;
        const out = wrapInExpandableBlockquote(html);
        expect(out.startsWith('<blockquote expandable>')).toBe(true);
        expect(out.endsWith('</blockquote>')).toBe(true);
        expect(out).toContain('<b>▌各部件功耗</b>');
    });

    it('内部引用降级为非折叠 (避免嵌套引用条)', () => {
        const html = `<blockquote expandable>引用内容</blockquote>\n${'x'.repeat(240)}`;
        const out = wrapInExpandableBlockquote(html);
        expect(out.match(/<blockquote expandable>/g)).toHaveLength(1);
        expect(out).not.toContain('<blockquote>');
        expect(out).toContain('引用内容');
    });

    it('已经是整条引用块时不重复包', () => {
        const html = `<blockquote expandable>${'x'.repeat(240)}</blockquote>`;
        expect(wrapInExpandableBlockquote(html)).toBe(html);
    });

    it('含 pre(代码块/表格) 时不包: pre 不能嵌套在 blockquote 内', () => {
        const html = `<b>标题</b>\n${'x'.repeat(200)}\n<pre>| a | b |\n|---|---|</pre>`;
        expect(wrapInExpandableBlockquote(html)).toBe(html);
    });
});
