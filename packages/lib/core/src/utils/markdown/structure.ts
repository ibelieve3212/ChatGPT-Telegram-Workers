// 通用 markdown 结构检查与修复 (与内容无关)
//
// 模型(尤其免费模型)常输出"结构不合法"的文本: 标记没闭合、标题只有编号没有内容、
// 代码围栏没写完。这里不针对某一种写法做特判, 而是定义四条不变量, 任何违反都修:
//
//   I1 分隔符配对: 成对的行内标记 (** __ ~~ `) 必须在所属块内闭合
//   I2 块非空:     标题/列表项/引用行必须含语义字符(字母或符号), 只有编号算空
//   I3 围栏闭合:   ``` 出现次数为偶数
//   I4 渲染保真:   渲染后不能丢可见文本(见 checkFidelity)
//
// 修复动作同样是通用的: 栈式补闭合、空块与下一行合并(合并不了就删)、围栏补齐。

export type StructureIssueKind = 'unbalanced-markers' | 'empty-block' | 'unclosed-fence';

export interface StructureIssue {
    kind: StructureIssueKind;
    /** 1-based 行号 */
    line: number;
    detail: string;
}

export interface FidelityResult {
    ok: boolean;
    /** 渲染后找不到的源码行(最多 3 条, 便于定位) */
    missing: string[];
    /** 丢失的可见字符数 */
    missingChars: number;
    /** 参与比对的可见字符总数 */
    totalChars: number;
}

// 成对标记。单字符 * / _ 歧义太大(2 * 3 * 4、snake_case), 不作为结构错误处理。
const PAIRED_MARKERS = ['**', '__', '~~', '`'] as const;

const FENCE_RE = /^\s*```/;
const DIVIDER_RE = /^\s*(?:[-*_]\s*){3,}$/;

// 语义字符: 字母(含中日韩)或符号(含 emoji)。数字/编号/标点都不算。
const WORD_RE = /[\p{L}\p{So}]/u;

// 块级标记后面只允许"空"或"空白 + 内容", 避免把 **粗体** / --- 误判成列表
function restAfterMarker(rest: string): string | null {
    if (rest === '') {
        return '';
    }
    return /^[ \t]/.test(rest) ? rest.trim() : null;
}

interface ParsedBlockLine {
    prefix: string;
    content: string;
}

function parseHeadingLine(line: string): ParsedBlockLine | null {
    const match = /^(#{1,6})(.*)$/.exec(line);
    if (!match) {
        return null;
    }
    const content = restAfterMarker(match[2]);
    return content === null ? null : { prefix: `${match[1]} `, content };
}

function parseOrderedLine(line: string): ParsedBlockLine | null {
    const match = /^([ \t]*)(\d+[.、)])(.*)$/.exec(line);
    if (!match) {
        return null;
    }
    const content = restAfterMarker(match[3]);
    return content === null ? null : { prefix: `${match[1]}${match[2]} `, content };
}

function parseUnorderedLine(line: string): ParsedBlockLine | null {
    const match = /^([ \t]*)([-*+])(.*)$/.exec(line);
    if (!match) {
        return null;
    }
    const content = restAfterMarker(match[3]);
    return content === null ? null : { prefix: `${match[1]}${match[2]} `, content };
}

function parseQuoteLine(line: string): ParsedBlockLine | null {
    const match = /^([ \t]*>)(.*)$/.exec(line);
    if (!match) {
        return null;
    }
    const content = restAfterMarker(match[2]);
    return content === null ? null : { prefix: `${match[1]} `, content };
}

/** 拆出块级前缀(### / 1. / - / >)与内容; 不是块级行返回 null */
function parseBlockLine(line: string): ParsedBlockLine | null {
    return parseHeadingLine(line) ?? parseOrderedLine(line) ?? parseUnorderedLine(line) ?? parseQuoteLine(line);
}

function isFence(line: string): boolean {
    return FENCE_RE.test(line);
}

function isTableSeparator(line: string): boolean {
    if (!line.includes('|')) {
        return false;
    }
    const cells = line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|');
    return cells.every(cell => /^:?-{2,}:?$/.test(cell.trim()));
}

/** 该行是否是"块级结构"的起始行(不能被并入上一行的空块) */
function isBlockStarter(line: string): boolean {
    return isFence(line)
        || parseBlockLine(line) !== null
        || DIVIDER_RE.test(line)
        || isTableSeparator(line)
        || line.trim().startsWith('|');
}

/** 去掉行内标记, 只留文字 (用于合并空块时避免嵌套格式) */
function stripInlineMarkers(text: string): string {
    return text
        .replace(/\*\*/g, '')
        .replace(/__/g, '')
        .replace(/~~/g, '')
        .replace(/`/g, '')
        .trim();
}

/** 块内是否含语义字符; 只有编号/标点/空白视为空 */
function hasWordContent(text: string): boolean {
    const withoutMarker = stripInlineMarkers(text)
        .replace(/^\s*(?:\d+[.、)]|[-*+])\s*/, '');
    return WORD_RE.test(withoutMarker);
}

/** 把连续非空行切成块(围栏内不切), 返回每块的行下标 */
function splitBlocks(lines: string[]): number[][] {
    const blocks: number[][] = [];
    let current: number[] = [];
    let inFence = false;
    const flush = () => {
        if (current.length > 0) {
            blocks.push(current);
            current = [];
        }
    };
    lines.forEach((line, index) => {
        if (isFence(line)) {
            inFence = !inFence;
            flush();
            return;
        }
        if (inFence) {
            return;
        }
        if (line.trim() === '') {
            flush();
            return;
        }
        current.push(index);
    });
    flush();
    return blocks;
}

/**
 * 栈式补闭合: 遇到标记就入栈, 遇到同种标记就出栈; 跨层关闭时先把内层补上。
 * 未闭合的标记补在"它自己那一行"的行尾, 而不是整块末尾 —— 否则会把
 * 后面的列表/段落整段吞进加粗里。
 * 代码段(反引号内)里的其他标记按字面量处理。
 */
function balanceMarkers(text: string, markers: readonly string[] = PAIRED_MARKERS): { text: string; changed: boolean } {
    const lines = text.split('\n');
    const outLines: string[] = [];
    const stack: Array<{ marker: string; line: number }> = [];

    lines.forEach((line, lineIndex) => {
        let out = '';
        let i = 0;
        const appendCloser = (entry: { marker: string; line: number }) => {
            if (entry.line === lineIndex) {
                out += entry.marker;
            } else {
                outLines[entry.line] += entry.marker;
            }
        };
        while (i < line.length) {
            const inCode = stack.length > 0 && stack[stack.length - 1].marker === '`';
            const marker = markers.find(m => (inCode ? m === '`' : true) && line.startsWith(m, i));
            if (!marker) {
                out += line[i];
                i++;
                continue;
            }
            const depth = stack.map(entry => entry.marker).lastIndexOf(marker);
            if (depth >= 0) {
                while (stack.length - 1 > depth) {
                    appendCloser(stack.pop()!);
                }
                stack.pop();
                out += marker;
            } else if (stack.length === 0 && line.slice(i + marker.length).trim() === '') {
                // 行尾孤立的多余闭合标记: 当作语法噪声丢掉, 否则会越补越多
                i += marker.length;
                continue;
            } else {
                stack.push({ marker, line: lineIndex });
                out += marker;
            }
            i += marker.length;
        }
        outLines.push(out);
    });

    while (stack.length > 0) {
        const open = stack.pop()!;
        outLines[open.line] += open.marker;
    }

    const result = outLines.join('\n');
    return { text: result, changed: result !== text };
}

// 被换行拆开的链接语法: [1] + 换行 + (https://...) -> [1](https://...)
const LINK_TAIL_RE = /\[[^\]\n]*\]$/;
const LINK_HEAD_RE = /^\(https?:\/\/[^\s)]+\)/;

function joinSplitLinks(lines: string[]): string[] {
    const out: string[] = [];
    let inFence = false;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (isFence(line)) {
            inFence = !inFence;
            out.push(line);
            continue;
        }
        let merged = line.trimEnd();
        // 可能连续多段: [1] + (url) + [2] + (url)
        while (i + 1 < lines.length) {
            const next = lines[i + 1].trim();
            if (!LINK_TAIL_RE.test(merged) || !LINK_HEAD_RE.test(next)) {
                break;
            }
            merged += next;
            i++;
        }
        out.push(merged);
    }
    return out;
}

/** I3: 围栏数量为奇数时在文末补齐 */
function closeFences(lines: string[]): string[] {
    const count = lines.filter(isFence).length;
    return count % 2 === 0 ? lines : [...lines, '```'];
}

/**
 * I2: 处理"没有语义内容"的块级行。
 * 有下一行普通内容 -> 合并成一行(去掉行内标记, 避免嵌套);
 * 没有可合并内容 -> 丢弃该行。
 */
function mergeEmptyBlocks(lines: string[]): string[] {
    const out: string[] = [];
    let inFence = false;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (isFence(line)) {
            inFence = !inFence;
            out.push(line);
            continue;
        }
        if (inFence) {
            out.push(line);
            continue;
        }
        if (DIVIDER_RE.test(line)) {
            out.push(line);
            continue;
        }
        const parsed = parseBlockLine(line);
        if (!parsed || hasWordContent(parsed.content)) {
            out.push(line);
            continue;
        }
        const next = lines[i + 1];
        const canMerge = next !== undefined
            && next.trim() !== ''
            && !isBlockStarter(next);
        if (canMerge) {
            const merged = stripInlineMarkers(next);
            if (merged) {
                // 编号等"非语义内容"要保留(如 "1." 不能丢), 只丢掉行内标记
                const keep = parsed.content.trim();
                out.push(`${parsed.prefix}${keep ? `${keep} ` : ''}${merged}`);
                i++;
                continue;
            }
        }
        // 合并不了: 整行丢弃(内容为空, 留着只会渲染出孤零零的编号)
    }
    return out;
}

/** 修复所有可本地修复的结构问题 (幂等) */
export function repairStructure(markdown: string): string {
    const lines = mergeEmptyBlocks(closeFences(joinSplitLinks(markdown.split('\n'))));
    const repaired = [...lines];
    for (const block of splitBlocks(lines)) {
        const text = block.map(index => repaired[index]).join('\n');
        const balanced = balanceMarkers(text);
        if (balanced.changed) {
            balanced.text.split('\n').forEach((line, offset) => {
                repaired[block[offset]] = line;
            });
        }
    }
    return repaired.join('\n');
}

/** 只检查不修复, 供测试/调试/将来做指标用 */
export function inspectStructure(markdown: string): StructureIssue[] {
    const lines = markdown.split('\n');
    const issues: StructureIssue[] = [];

    const fences = lines.map((line, index) => (isFence(line) ? index + 1 : 0)).filter(Boolean);
    if (fences.length % 2 === 1) {
        issues.push({ kind: 'unclosed-fence', line: fences[fences.length - 1], detail: '代码围栏未闭合' });
    }

    lines.forEach((line, index) => {
        if (DIVIDER_RE.test(line)) {
            return;
        }
        const parsed = parseBlockLine(line);
        if (parsed && !hasWordContent(parsed.content)) {
            issues.push({ kind: 'empty-block', line: index + 1, detail: '块级结构没有内容' });
        }
    });

    for (const block of splitBlocks(lines)) {
        const text = block.map(index => lines[index]).join('\n');
        if (balanceMarkers(text).changed) {
            issues.push({ kind: 'unbalanced-markers', line: block[0] + 1, detail: '行内标记未成对' });
        }
    }

    return issues.sort((a, b) => a.line - b.line);
}

const HTML_TAG_RE = /<[^>]*>/g;
const ENTITY_MAP: Record<string, string> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': '\'' };

function decodeEntities(text: string): string {
    return text.replace(/&(?:amp|lt|gt|quot|#39);/g, entity => ENTITY_MAP[entity] ?? entity);
}

/** 去掉语法符号, 只留可见字符 (空白也去掉, 避免换行差异干扰) */
function visibleOf(source: string): string {
    return decodeEntities(source)
        .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
        // 纯数字链接文字在渲染时会补回方括号([1](url) -> <a>[1]</a>), 比对时也要补
        .replace(/\[([^\]]+)\]\([^)]*\)/g, (_match, text: string) => {
            const trimmed = text.trim();
            return /^\d+$/.test(trimmed) ? `[${trimmed}]` : text;
        })
        .replace(/^\s*#{1,6}\s*/, '')
        .replace(/^\s*>\s?/, '')
        .replace(/^\s*(?:\d+[.、)]|[-*+])\s+/, '')
        // 渲染器会把成对的 * _ 当强调符号吃掉, 比对时两边都不算这些字符
        .replace(/\*\*|__|~~|`/g, '')
        .replace(/[*_]/g, '')
        .replace(/\s+/g, '');
}

/**
 * I4 渲染保真: 源码里每一行的可见文本, 在渲染结果里必须还能找到。
 * 这是兜底检查 —— 不管因为什么原因(转换 bug、模型截断)丢了内容都会被抓到。
 * 表格行/代码块行不参与比对(渲染会重排/保序差异大, 误报率高)。
 */
export function checkFidelity(source: string, html: string): FidelityResult {
    const rendered = decodeEntities(html.replace(HTML_TAG_RE, '')).replace(/[*_•\s]/g, '');
    const lines = source.split('\n');
    const missing: string[] = [];
    let missingChars = 0;
    let totalChars = 0;
    let inFence = false;
    let inTable = false;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (isFence(line)) {
            inFence = !inFence;
            continue;
        }
        if (inFence) {
            continue;
        }
        if (isTableSeparator(lines[i + 1] ?? '')) {
            inTable = true;
            continue;
        }
        if (inTable) {
            if (line.trim() === '') {
                inTable = false;
            }
            continue;
        }
        if (DIVIDER_RE.test(line)) {
            continue;
        }
        const visible = visibleOf(line);
        if (visible.length < 2) {
            continue;
        }
        totalChars += visible.length;
        if (!rendered.includes(visible)) {
            missingChars += visible.length;
            missing.push(line.trim().slice(0, 60));
        }
    }
    return { ok: missing.length === 0, missing: missing.slice(0, 3), missingChars, totalChars };
}

/** 丢失超过这个比例才算"真的丢内容"; 少量差异(渲染细节)不值得整条降级 */
export const FIDELITY_LOSS_THRESHOLD = 0.1;

export function needsPlainTextFallback(result: FidelityResult): boolean {
    if (result.ok || result.totalChars === 0) {
        return false;
    }
    return result.missingChars / result.totalChars > FIDELITY_LOSS_THRESHOLD;
}
