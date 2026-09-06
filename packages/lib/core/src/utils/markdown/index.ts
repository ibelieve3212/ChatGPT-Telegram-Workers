// 轻量 markdown → Telegram HTML 转换器
// 不追求完整 markdown 解析, 只处理 LLM 最常输出的格式:
// 代码块、行内代码、标题、粗体、斜体、删除线、引用、链接、列表符号
// 代码块内只转义 HTML 字符, 不解析 markdown
// 其余文本转义 < > & 三个字符

// 转义 HTML 特殊字符 (只转义 < > &, 不转义引号等)
function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
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
    const codeSegments: string[] = [];
    result = result.replace(/`([^`]+)`/g, (_match, code: string) => {
        const placeholder = `\x00CODE${codeSegments.length}\x00`;
        codeSegments.push(`<code>${escapeHtmlForCode(code)}</code>`);
        return placeholder;
    });

    // 链接: [text](url) → <a href="url">text</a>
    // url 只允许 http/https 协议, 防止 javascript: 等
    result = result.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
        (_match, linkText: string, url: string) => {
            return `<a href="${url}">${linkText}</a>`;
        });

    // 粗体: **text** 或 __text__ → <b>text</b>
    result = result.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
    result = result.replace(/__([^_]+)__/g, '<b>$1</b>');

    // 删除线: ~~text~~ → <s>text</s>
    result = result.replace(/~~([^~]+)~~/g, '<s>$1</s>');

    // 斜体: *text* 或 _text_ → <i>text</i>
    // 注意: 必须在粗体和删除线之后处理, 避免误匹配
    result = result.replace(/(^|[^*])\*([^*]+)\*/g, '$1<i>$2</i>');
    result = result.replace(/(^|[^_])_([^_]+)_/g, '$1<i>$2</i>');

    // 还原代码占位符
    result = result.replace(/\x00CODE(\d+)\x00/g, (_match, idx: string) => {
        return codeSegments[Number.parseInt(idx, 10)] || '';
    });

    return result;
}

// 处理一行文本的行内格式, 先转义再渲染
function processInlineLine(line: string): string {
    return renderInline(escapeHtml(line));
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

    // 辅助: 结束引用块
    const flushBlockquote = () => {
        if (inBlockquote) {
            const content = blockquoteLines.map(l => processInlineLine(l)).join('\n');
            output.push(`<blockquote>${content}</blockquote>`);
            inBlockquote = false;
            blockquoteLines = [];
        }
    };

    // 辅助: 结束列表
    const flushLists = () => {
        inUnorderedList = false;
        inOrderedList = false;
    };

    while (i < lines.length) {
        const line = lines[i];

        // --- 代码块处理 (最高优先级) ---
        // 检测代码块起始: ```lang
        const codeBlockStart = line.match(/^```(\w*)\s*$/);
        if (codeBlockStart) {
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
                // 先结束之前的块
                flushBlockquote();
                flushLists();
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
            output.push('');
            i++;
            continue;
        }

        // --- 标题 ---
        const heading = isHeading(line);
        if (heading) {
            flushBlockquote();
            flushLists();
            // Telegram 没有标题标签, 用加粗模拟
            output.push(`<b>${processInlineLine(heading.text)}</b>`);
            i++;
            continue;
        }

        // --- 引用块 ---
        const blockquote = isBlockquote(line);
        if (blockquote) {
            flushLists();
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
            inOrderedList = true;
            const indent = '  '.repeat(Math.floor(olItem.indent / 2));
            output.push(`${indent}${olItem.num}. ${processInlineLine(olItem.text)}`);
            i++;
            continue;
        }

        // --- 普通段落 ---
        flushBlockquote();
        flushLists();
        output.push(processInlineLine(line));
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

    return output.join('\n');
}
