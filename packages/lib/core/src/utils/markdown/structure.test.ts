import { checkFidelity, inspectStructure, repairStructure } from './structure';

// 通用结构修复的测试: 只关心"结构是否合法", 与具体内容/领域无关。
// 每个用例都对应一条不变量(I1 配对 / I2 块非空 / I3 围栏 / I4 保真)。

describe('repairStructure (I1 分隔符配对)', () => {
    it('行尾未闭合的粗体补上闭合', () => {
        expect(repairStructure('**性价比推荐- 扫描、复印')).toBe('**性价比推荐- 扫描、复印**');
    });

    it('未闭合粗体不会把后面的列表吞进去', () => {
        const input = '**标题\n- 第一项\n- 第二项';
        expect(repairStructure(input)).toBe('**标题**\n- 第一项\n- 第二项');
    });

    it('正常跨行粗体保持原样', () => {
        const input = '**第一行\n第二行**';
        expect(repairStructure(input)).toBe(input);
    });

    it('未闭合的删除线与行内代码同样补齐', () => {
        expect(repairStructure('~~删除线')).toBe('~~删除线~~');
        expect(repairStructure('`代码')).toBe('`代码`');
    });

    it('行尾孤立的闭合标记直接丢弃', () => {
        expect(repairStructure('普通文字**')).toBe('普通文字');
    });

    it('代码块里的标记不做修复', () => {
        const input = '```\n**未闭合\n代码\n```';
        expect(repairStructure(input)).toBe(input);
    });
});

describe('repairStructure (I2 块非空)', () => {
    it('只有编号的标题与下一行合并', () => {
        expect(repairStructure('### 1. \n**综合推荐：适合普通家庭**'))
            .toBe('### 1. 综合推荐：适合普通家庭');
    });

    it('空标题后面没有内容时整行丢弃', () => {
        expect(repairStructure('### 1.\n\n正文')).toBe('\n正文');
    });

    it('空的列表项与下一行合并', () => {
        expect(repairStructure('- \n打印机推荐')).toBe('- 打印机推荐');
    });

    it('空的引用行与下一行合并', () => {
        expect(repairStructure('> \n一段引用')).toBe('> 一段引用');
    });

    it('空块不会跨空行合并', () => {
        expect(repairStructure('### 1.\n\n后面是独立段落')).toBe('\n后面是独立段落');
    });

    it('分隔线不会被当成空列表项删掉', () => {
        expect(repairStructure('---')).toBe('---');
    });

    it('只有 emoji 的列表项保留', () => {
        expect(repairStructure('- 🖨️')).toBe('- 🖨️');
    });
});

describe('repairStructure (I3 围栏闭合)', () => {
    it('未闭合的代码围栏在文末补齐', () => {
        expect(repairStructure('```js\nconst a = 1;')).toBe('```js\nconst a = 1;\n```');
    });

    it('成对的围栏不动', () => {
        const input = '```js\nconst a = 1;\n```';
        expect(repairStructure(input)).toBe(input);
    });
});

describe('repairStructure (通用性质)', () => {
    it('重复修复结果不变 (幂等)', () => {
        const inputs = [
            '**未闭合\n- a',
            '### 1. \n**推荐**',
            '```\ncode',
            '普通文本',
        ];
        for (const input of inputs) {
            const once = repairStructure(input);
            expect(repairStructure(once)).toBe(once);
        }
    });

    it('不破坏正常文档', () => {
        const input = [
            '## 标题',
            '',
            '**粗体**与`代码`',
            '',
            '- 列表一',
            '- 列表二',
            '',
            '| 列1 | 列2 |',
            '|---|---|',
            '| a | b |',
        ].join('\n');
        expect(repairStructure(input)).toBe(input);
    });
});

describe('inspectStructure', () => {
    it('识别三类结构问题', () => {
        const issues = inspectStructure('### 1. \n**未闭合\n```');
        expect(issues.map(issue => issue.kind)).toEqual([
            'empty-block',
            'unbalanced-markers',
            'unclosed-fence',
        ]);
    });

    it('合法文本没有问题', () => {
        expect(inspectStructure('## 标题\n\n- 列表\n\n**粗体**')).toHaveLength(0);
    });
});

describe('checkFidelity (I4 渲染保真)', () => {
    it('正常渲染通过', () => {
        const md = '- **加粗**\n- `代码`\n- [1](https://a.com)';
        const html = '• <b>加粗</b>\n• <code>代码</code>\n• <a href="https://a.com">[1]</a>';
        expect(checkFidelity(md, html).ok).toBe(true);
    });

    it('渲染后丢了一整行会被抓到', () => {
        const result = checkFidelity('第一行\n第二行', '<b>第一行</b>');
        expect(result.ok).toBe(false);
        expect(result.missing).toContain('第二行');
    });

    it('代码块与表格行不参与比对', () => {
        const md = '| a | b |\n|---|---|\n| 1 | 2 |\n\n```\ncode\n```';
        expect(checkFidelity(md, '<pre>whatever</pre>').ok).toBe(true);
    });

    it('只是多了格式标签不算丢内容', () => {
        expect(checkFidelity('**重点**', '<b>重点</b>').ok).toBe(true);
    });
});
