// 出处内联化: 把"正文 [n] 角标 + 末尾来源清单"改写成"正文 [n] 直接是链接"。
//
// 模型常见输出:
//   第一点。
//   第二点。[2]
//
//   参考来源：
//   1. 某文 - https://a.com
//   2. https://b.com
//
// 目标输出:
//   第一点。
//   第二点。[2](https://b.com)
//
// 只处理"末尾连续的一段引用清单"；清单之外的裸 URL 不动。

const URL_RE = /https?:\/\/[^\s<>()]+/;

// 清单项: "1. 标题 - url" / "[1] 标题 url" / "- [1] url"
const ITEM_RE = /^\s*(?:[-*+]\s+)?(?:\[(\d+)\]|(\d+)[.、)])\s*(\S.*)$/;

// 清单标题行关键字: "参考来源：" / "**参考资料**" / "### Sources"
const HEADING_KEYS = /^(?:参考来源|参考资料|参考链接|来源|引用|参考|references?|sources?|citations?)$/i;

const DIVIDER_RE = /^\s*(?:[-*_]\s*){3,}$/;

// 逐层剥掉 markdown 标题/粗体/冒号后比对关键字(避免多重 \s* 造成正则回溯)
function isHeadingLine(line: string): boolean {
    let text = line.trim();
    text = text.replace(/^#{1,6}\s*/, '').trim();
    text = text.replace(/^(?:\*\*|__)/, '').replace(/(?:\*\*|__)$/, '').trim();
    text = text.replace(/[:：]\s*$/, '').trim();
    return HEADING_KEYS.test(text);
}

interface RefItem {
    index: string;
    url: string;
}

// 解析末尾的来源清单; 不是清单结构时返回 null
function parseTrailingRefs(lines: string[]): { start: number; items: RefItem[] } | null {
    let end = lines.length - 1;
    while (end >= 0 && lines[end].trim() === '') {
        end--;
    }
    const items: RefItem[] = [];
    let i = end;
    while (i >= 0) {
        const match = lines[i].match(ITEM_RE);
        if (!match) {
            break;
        }
        const url = match[3].match(URL_RE)?.[0];
        if (!url) {
            break;
        }
        items.unshift({ index: match[1] ?? match[2], url });
        i--;
    }
    if (items.length === 0) {
        return null;
    }
    let start = i + 1;
    // 清单前的标题行/分隔线一并去掉
    while (start - 1 >= 0) {
        const prev = lines[start - 1];
        if (prev.trim() === '' || isHeadingLine(prev) || DIVIDER_RE.test(prev)) {
            start--;
            continue;
        }
        break;
    }
    return { start, items };
}

// 只替换代码块之外的行内角标; 已经是链接的 [n](url) 不再处理
function linkifyMarkers(lines: string[], refs: Map<string, string>): string[] {
    let inCodeBlock = false;
    return lines.map((line) => {
        if (/^\s*```/.test(line)) {
            inCodeBlock = !inCodeBlock;
            return line;
        }
        if (inCodeBlock) {
            return line;
        }
        return line.replace(/\[(\d+)\](?!\()/g, (whole, num: string) => {
            const url = refs.get(num);
            return url ? `[${num}](${url})` : whole;
        });
    });
}

export function inlineCitations(markdown: string): string {
    if (!markdown.trim()) {
        return markdown;
    }
    const lines = markdown.split('\n');
    const parsed = parseTrailingRefs(lines);
    if (parsed === null) {
        return markdown;
    }
    const refs = new Map<string, string>();
    for (const item of parsed.items) {
        if (!refs.has(item.index)) {
            refs.set(item.index, item.url);
        }
    }
    const body = linkifyMarkers(lines.slice(0, parsed.start), refs);
    // 去掉正文末尾因删除清单而留下的空行/分隔线
    while (body.length > 0 && (body[body.length - 1].trim() === '' || DIVIDER_RE.test(body[body.length - 1]))) {
        body.pop();
    }
    return body.join('\n');
}
