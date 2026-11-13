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

// 同一行里已经作为链接目标出现过的网址, 正文里再裸贴一遍的就删掉
// 例: "[3](https://x.com/a) https://x.com/a" → "[3](https://x.com/a)"
function removeDuplicateBareUrls(line: string): string {
    const linked = new Set<string>();
    for (const match of line.matchAll(/\]\((https?:\/\/[^\s)]+)\)/g)) {
        linked.add(match[1]);
    }
    if (linked.size === 0) {
        return line;
    }
    // 先把链接整体换成占位符, 避免把链接自己的 url 当成裸网址删掉
    const held: string[] = [];
    let work = line.replace(/\]\((https?:\/\/[^\s)]+)\)/g, (whole) => {
        held.push(whole);
        return `\uE000${held.length - 1}\uE000`;
    });
    work = work.replace(/https?:\/\/[^\s<>()]+/g, (url) => {
        // 句末标点会被 URL 正则一起吃进去(如 "https://a.com。"), 比对前先剥掉
        const tailMatch = url.match(/[，。、；：！？,.;:!?]+$/);
        const tail = tailMatch ? tailMatch[0] : '';
        const core = tail ? url.slice(0, -tail.length) : url;
        return linked.has(core) ? tail : url;
    });
    work = work.replace(/\uE000(\d+)\uE000/g, (_whole, index: string) => held[Number(index)]);
    // 删掉重复网址后遗留的多余空格与行尾空白
    return work
        .replace(/[ \t]{2,}/g, ' ')
        .replace(/[ \t]+([，。、；：！？,.;:!?])/g, '$1')
        .replace(/[ \t]+$/, '');
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
        const linked = line.replace(/\[(\d+)\](?!\()/g, (whole, num: string) => {
            const url = refs.get(num);
            return url ? `[${num}](${url})` : whole;
        });
        return removeDuplicateBareUrls(linked);
    });
}

export function inlineCitations(markdown: string): string {
    if (!markdown.trim()) {
        return markdown;
    }
    const lines = markdown.split('\n');
    const parsed = parseTrailingRefs(lines);
    const refs = new Map<string, string>();
    if (parsed !== null) {
        for (const item of parsed.items) {
            if (!refs.has(item.index)) {
                refs.set(item.index, item.url);
            }
        }
    }
    // 没有末尾清单也仍然跑一遍: 用于删掉"[n](url) 后面又贴一遍裸网址"这类重复
    const body = linkifyMarkers(parsed === null ? lines : lines.slice(0, parsed.start), refs);
    if (parsed !== null) {
        // 去掉正文末尾因删除清单而留下的空行/分隔线
        while (body.length > 0 && (body[body.length - 1].trim() === '' || DIVIDER_RE.test(body[body.length - 1]))) {
            body.pop();
        }
    }
    return body.join('\n');
}
