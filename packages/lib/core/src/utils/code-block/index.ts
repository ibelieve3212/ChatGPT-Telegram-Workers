// 把 markdown 里的围栏代码块(```)抽出来, 与正文分开。
//
// 用途: Telegram 的 HTML/MarkdownV2 都不允许 <pre> 嵌在 <blockquote> 里,
// 一旦回复里出现代码块, 整条就没法折叠(客户端会在 pre 处强制结束引用块,
// 后面的内容全跑到块外)。所以把代码块单独发一条, 正文照常折叠。
//
// 返回:
//   prose: 去掉代码块的正文, 原位留一行"（代码见下一条）"提示
//   code:  抽出的代码块(保留 ``` 围栏和语言标记), 多个之间空行分隔
//   hasCode: 是否真的抽到了代码块

export const CODE_MOVED_HINT = '（代码见下一条）';

// 只匹配围栏符号本身(不带 .*), 避免与贪婪量词重叠触发回溯告警
const FENCE_RE = /^ {0,3}(`+|~+)/;

/** 是不是围栏行(至少 3 个反引号或波浪号) */
function isFenceLine(line: string): { fence: string; info: string } | null {
    const match = line.match(FENCE_RE);
    if (!match || match[1].length < 3) {
        return null;
    }
    return { fence: match[1], info: line.slice(match[0].length) };
}

/**
 * 拆分 markdown 中的围栏代码块。
 * 未闭合的围栏(流式输出中途)按"剩余全部是代码"处理, 不会把正文误判成代码。
 */
export function splitFencedCodeBlocks(markdown: string): { prose: string; code: string; hasCode: boolean } {
    const lines = markdown.split('\n');
    const proseLines: string[] = [];
    const codeBlocks: string[] = [];

    let i = 0;
    let inCode = false;
    let fence = '';
    let buffer: string[] = [];

    while (i < lines.length) {
        const line = lines[i];
        const fenceLine = isFenceLine(line);

        if (!inCode) {
            if (fenceLine) {
                inCode = true;
                fence = fenceLine.fence;
                buffer = [line];
                i++;
                continue;
            }
            proseLines.push(line);
            i++;
            continue;
        }

        // 在代码块内: 遇到同类型围栏(不短于开阑)且后面无信息串, 才算闭合
        buffer.push(line);
        if (fenceLine && fenceLine.fence[0] === fence[0] && fenceLine.fence.length >= fence.length && fenceLine.info.trim() === '') {
            codeBlocks.push(buffer.join('\n'));
            // 正文里留一行提示, 前后各留一个空行, 避免和相邻段落粘在一起
            proseLines.push('', CODE_MOVED_HINT, '');
            buffer = [];
            inCode = false;
            fence = '';
        }
        i++;
    }

    // 未闭合: 剩余内容整体当代码块(流式输出中途常见)
    if (inCode && buffer.length > 0) {
        codeBlocks.push(buffer.join('\n'));
        proseLines.push('', CODE_MOVED_HINT, '');
    }

    const prose = proseLines
        .join('\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
    const code = codeBlocks.join('\n\n').trim();

    return { prose, code, hasCode: codeBlocks.length > 0 };
}
