// 轻量 markdown → Telegram HTML 转换器
// 不追求完整 markdown 解析, 只处理 LLM 最常输出的格式:
// 代码块、行内代码、标题、粗体、斜体、删除线、引用、链接、列表符号
// 代码块内只转义 HTML 字符, 不解析 markdown
// 其余文本转义 < > & 三个字符
//
// 设计要点:
// 1. 连续普通段落行先合并再渲染, 支持 **跨行粗体** (LLM 常见输出)
// 2. 粗体内容允许出现单个 * (嵌套斜体), 如 **a *b* c**
// 3. 行内代码内容已在外层转义过一次, 不再二次转义, 避免 < 重复
// 4. 斜体/下划线粗体带边界检查, 避免 2 * 3 * 4、a_b_c、__init__ 误判

// 转义 HTML 特殊字符 (只转义 < > &, 不转义引号等)
function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&' + 'amp;')
        .replace(/</g, '&' + 'lt;')
        .replace(/>/g, '&' + 'gt;');
}

// 转义 HTML 字符, 但保留已转换的 HTML 标签
// 用于代码块内部: 全部转义, 不保留任何标签
function escapeHtmlForCode(text: string): string {
    return escapeHtml(text);
}

// 处理行内格式: 粗体、斜体、行内代码、删除线、链接
// 输入文本已经过 escapeHtml 转义 (非代码块部分)
function renderInline(text: string): string {
    let result = text;

    // 行内代码: `code` → <code>code</code>
    // 必须最先处理, 代码内的内容不再处理其他行内格式
    // 注意: 内容已在外层 escapeHtml 转义过一次, 这里直接使用, 不再二次转义
    const codeSegments: string[] = [];
    result = result.replace(/`([^`\n]+)`/g, (_match, code: string) => {
        const placeholder = `\x00CODE${codeSegments.length}\x00`;
        codeSegments.push(`<code>${code}</code>`);
        return placeholder;
    });

    // 链接: [text](url) → <a href="url">text</a>
    // url 只允许 http/https 协议, 防止 javascript: 等; 转义 url 中的引号避免破坏 HTML 属性
    result = result.replace(/\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)/g,
        (_match, linkText: string, url: string) => {
            return `<a href="${url.replace(/"/g, '&' + 'quot;')}">${linkText}</a>`;
        });

    // 粗斜体: ***text*** → <b><i>text</i></b>
    result = result.replace(/\*\*\*([^*\n]+)\*\*\*/g, '<b><i>$1</i></b>');

    // 粗体: **text** → <b>text</b>
    // - 内容允许出现单个 * (嵌套斜体), 但不允许 ** (避免吞掉相邻粗体)
    // - 内容允许换行 (段落已合并), 支持 **跨行粗体**
    // - 边界检查: 开头 ** 后不能紧跟空白, 结尾 ** 前不能是空白 (与 CommonMark 一致)
    result = result.replace(/\*\*(?!\s)((?:[^*]|\*(?!\*))+?)(?<!\s)\*\*/g,
        (_match, content: string) => `<b>${content}</b>`);

    // 粗体: __text__ → <b>text</b>
    // 边界检查: 前后不能紧邻字母/数字/下划线, 避免 a__b__c、snake__case 误判
    result = result.replace(/(^|[^A-Za-z0-9_])__([^_\n]+?)__(?![A-Za-z0-9_])/g,
        (_match, prefix: string, content: string) => `${prefix}<b>${content}</b>`);

    // 删除线: ~~text~~ → <s>text</s> (不跨行)
    result = result.replace(/~~([^~\n]+)~~/g, '<s>$1</s>');

    // 斜体: *text* → <i>text</i>
    // 边界检查 (避免 2 * 3 * 4、5*x*10 等数学/代码误判):
    // - 开头 * 前不能是字母/数字/下划线, * 后不能紧跟空白
    // - 结尾 * 前不能是空白, 后不能紧跟 *
    // - 内容不跨行
    result = result.replace(/(^|[^*\w])\*(?!\s)([^*\n]+?)(?<!\s)\*(?!\*)/g,
        (_match, prefix: string, content: string) => `${prefix}<i>${content}</i>`);

    // 斜体: _text_ → <i>text</i>
    // 边界检查: 前后不能紧邻字母/数字/下划线, 避免 a_b_c、snake_case 误判
    result = result.replace(/(^|[^A-Za-z0-9_])_(?!\s)([^_\n]+?)(?<!\s)_(?![A-Za-z0-9_])/g,
        (_match, prefix: string, content: string) => `${prefix}<i>${content}</i>`);

    // 还原代码占位符
    result = result.replace(/\x00CODE(\d+)\x00/g, (_match, idx: string) => {
        return codeSegments[Number.parseInt(idx, 10)] || '';
    });

    return result;
}

// 处理一段文本的行内格式, 先转义再渲染
function processInlineLine(text: string): string {
    return renderInline(escapeHtml(text));
}

// 检测 ATX 标题: # ~ ######
function isHeading(line: string): { level: number; text: string } | null {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
        return { level: match[1].length, text: match[2].trim() };
    }
    return null;
}

// 检测无序列表项: - / * / + 开头
function isUnorderedList(line: string): { text: string; indent: number } | null {
    const match = line.match(/^(\s*)([-*+])\s+(.+)$/);
    if (match) {
        return { text: match[3], indent: match[1].length };
    }
    return null;
}

// 检测有序列表项: 1. / 2. 等
function isOrderedList(line: string): { num: string; text: string; indent: number } | null {
    const match = line.match(/^(\s*)(\d+)\.\s+(.+)$/);
    if (match) {
        return { num: match[2], text: match[3], indent: match[1].length };
    }
    return null;
}

// 检测引用行: > text
function isBlockquote(line: string): { text: string } | null {
    const match = line.match(/^>\s?(.*)$/);
    if (match) {
        return { text: match[1] };
    }
    return null;
}

// 检测分隔线: --- / *** / ___ (三个或更多)
function isDivider(line: string): boolean {
    return /^([-*_])\1{2,}\s*$/.test(line);
}

// 主转换函数: markdown → Telegram HTML
export function markdownToHtml(markdown: string): string {
    const lines = markdown.split('\n');
    const output: string[] = [];

    let i = 0;
    let inCodeBlock = false;
    let codeBlockLang = '';
    let codeBlockLines: string[] = [];

    let inBlockquote = false;
    let blockquoteLines: string[] = [];

    let inUnorderedList = false;
    let inOrderedList = false;

    // 普通段落: 连续普通行先缓存, 遇到特殊块或结束时合并渲染
    // 合并后 **跨行粗体** 等格式才能正确转换
    let paragraphLines: string[] = [];

    // 辅助: 结束引用块
    const flushBlockquote = () => {
        if (inBlockquote) {
            // 引用内容同样合并渲染, 支持跨行粗体
            output.push(`<blockquote>${processInlineLine(blockquoteLines.join('\n'))}</blockquote>`);
            inBlockquote = false;
            blockquoteLines = [];
        }
    };

    // 辅助: 结束列表
    const flushLists = () => {
        inUnorderedList = false;
        inOrderedList = false;
    };

    // 辅助: 结束当前段落 (合并渲染)
    const flushParagraph = () => {
        if (paragraphLines.length > 0) {
            output.push(processInlineLine(paragraphLines.join('\n')));
            paragraphLines = [];
        }
    };

    while (i < lines.length) {
        const line = lines[i];

        // --- 代码块处理 (最高优先级) ---
        // 检测代码块起始: ```lang
        const codeBlockStart = line.match(/^```(\w*)\s*$/);
        if (codeBlockStart) {
            flushBlockquote();
            flushLists();
            flushParagraph();
            if (inCodeBlock) {
                // 嵌套的代码块结束标记 (不常见, 但防御性处理)
                // 实际上 LLM 输出不会嵌套, 这里当作结束处理
                const code = codeBlockLines.join('\n');
                if (codeBlockLang) {
                    output.push(`<pre><code class="language-${codeBlockLang}">${escapeHtmlForCode(code)}</code></pre>`);
                } else {
                    output.push(`<pre><code>${escapeHtmlForCode(code)}</code></pre>`);
                }
                inCodeBlock = false;
                codeBlockLang = '';
                codeBlockLines = [];
                i++;
                continue;
            } else {
                inCodeBlock = true;
                codeBlockLang = codeBlockStart[1] || '';
                codeBlockLines = [];
                i++;
                continue;
            }
        }

        if (inCodeBlock) {
            // 代码块内: 收集内容直到结束标记
            codeBlockLines.push(line);
            i++;
            continue;
        }

        // --- 分隔线 ---
        if (isDivider(line)) {
            flushBlockquote();
            flushLists();
            flushParagraph();
            output.push('');
            i++;
            continue;
        }

        // --- 标题 ---
        const heading = isHeading(line);
        if (heading) {
            flushBlockquote();
            flushLists();
            flushParagraph();
            // Telegram 没有标题标签, 用加粗模拟
            output.push(`<b>${processInlineLine(heading.text)}</b>`);
            i++;
            continue;
        }

        // --- 引用块 ---
        const blockquote = isBlockquote(line);
        if (blockquote) {
            flushLists();
            flushParagraph();
            inBlockquote = true;
            blockquoteLines.push(blockquote.text);
            i++;
            continue;
        } else if (inBlockquote) {
            // 引用结束
            flushBlockquote();
            // 不 continue, 继续处理当前行
        }

        // --- 无序列表 ---
        const ulItem = isUnorderedList(line);
        if (ulItem) {
            if (inOrderedList) {
                flushLists();
            }
            flushParagraph();
            inUnorderedList = true;
            // Telegram 不支持 <li>, 用 bullet 字符模拟
            const indent = '  '.repeat(Math.floor(ulItem.indent / 2));
            output.push(`${indent}• ${processInlineLine(ulItem.text)}`);
            i++;
            continue;
        }

        // --- 有序列表 ---
        const olItem = isOrderedList(line);
        if (olItem) {
            if (inUnorderedList) {
                flushLists();
            }
            flushParagraph();
            inOrderedList = true;
            const indent = '  '.repeat(Math.floor(olItem.indent / 2));
            output.push(`${indent}${olItem.num}. ${processInlineLine(olItem.text)}`);
            i++;
            continue;
        }

        // --- 普通段落: 缓存行, 与前后普通行合并渲染 ---
        flushBlockquote();
        flushLists();
        paragraphLines.push(line);
        i++;
    }

    // 处理未闭合的代码块 (流式中常见)
    if (inCodeBlock && codeBlockLines.length > 0) {
        const code = codeBlockLines.join('\n');
        if (codeBlockLang) {
            output.push(`<pre><code class="language-${codeBlockLang}">${escapeHtmlForCode(code)}</code></pre>`);
        } else {
            output.push(`<pre><code>${escapeHtmlForCode(code)}</code></pre>`);
        }
    }

    // 处理未结束的引用块
    if (inBlockquote) {
        flushBlockquote();
    }

    // 处理未结束的段落
    flushParagraph();

    return output.join('\n');
}
