import type * as Telegram from 'telegram-bot-api-types';
import { FEATURES } from '#/config';
import { checkFidelity, escapeTextAsHtml, markdownToHtml, needsPlainTextFallback, repairStructure, wrapInExpandableBlockquote } from '#/utils/markdown';

/**
 * 把 markdown 渲染成最终要发送的文本。
 * HTML 模式: markdown → Telegram HTML; 长回复整条包一层可折叠引用块, 短回复不包。
 */
export function renderMessage(parse_mode: Telegram.ParseMode | null, message: string): string {
    if (parse_mode === 'HTML') {
        // 先做通用结构修复(补闭合/合并空块/补围栏), 再转换
        const repaired = repairStructure(message);
        const html = markdownToHtml(repaired, { tableAsList: FEATURES.tableAsList });
        // 保真兜底: 只有成片内容丢失(超过 10%)才退回纯文本, 少量渲染细节差异不降级
        const fidelity = checkFidelity(repaired, html);
        if (needsPlainTextFallback(fidelity)) {
            console.warn('[render] 保真校验失败, 退回纯文本:', fidelity.missing.join(' | '));
        }
        const body = needsPlainTextFallback(fidelity) ? escapeTextAsHtml(repaired) : html;
        return FEATURES.expandableReply ? wrapInExpandableBlockquote(body) : body;
    }
    return message;
}

/**
 * 按段落边界(双换行)拆分 markdown, 每段不超过 maxChars 字符。
 * 不会切断代码块中间(代码块用围栏包起, 只在块边界外拆分); 不保证 block 数不超, 由调用方重试兜底。
 */
export function splitMarkdownByParagraphs(message: string, maxChars: number): string[] {
    const paragraphs = message.split(/\n\n+/);
    const chunks: string[] = [];
    let current = '';
    for (const para of paragraphs) {
        // 单个段落本身超限时, 按行强制二次切分
        if (para.length > maxChars) {
            if (current) {
                chunks.push(current);
                current = '';
            }
            const lines = para.split('\n');
            let sub = '';
            for (const line of lines) {
                if ((sub + '\n' + line).length > maxChars) {
                    if (sub) chunks.push(sub);
                    // 单行超限直接整行作为一个片段(代码行/长段落)
                    if (line.length > maxChars) {
                        chunks.push(line);
                        sub = '';
                    } else {
                        sub = line;
                    }
                } else {
                    sub = sub ? sub + '\n' + line : line;
                }
            }
            if (sub) chunks.push(sub);
            continue;
        }
        if ((current + '\n\n' + para).length > maxChars) {
            if (current) chunks.push(current);
            current = para;
        } else {
            current = current ? current + '\n\n' + para : para;
        }
    }
    if (current) chunks.push(current);
    return chunks.length > 0 ? chunks : [message];
}

/**
 * 按渲染后长度拆分 HTML(先转换再量长度)。
 * 直接在 markdown 上调 splitMarkdownByParagraphs 不行 —— markdown 转 HTML 会膨胀
 * (**a** → <b>a</b>, [2](url) → <a href>...), 转换后可能超过 4096 被服务端拒收。
 */
export function splitMarkdownForHtml(message: string, maxLen: number): string[] {
    const fits = (md: string): boolean => renderMessage('HTML' as Telegram.ParseMode, md).length <= maxLen;
    const paragraphs = message.split(/\n{2,}/);
    const chunks: string[] = [];
    let current = '';
    for (const para of paragraphs) {
        const candidate = current ? `${current}\n\n${para}` : para;
        if (fits(candidate)) {
            current = candidate;
            continue;
        }
        if (current) {
            chunks.push(current);
            current = '';
        }
        if (fits(para)) {
            current = para;
            continue;
        }
        // 单个段落就超限: 按行再切
        let sub = '';
        for (const line of para.split('\n')) {
            const lineCandidate = sub ? `${sub}\n${line}` : line;
            if (fits(lineCandidate)) {
                sub = lineCandidate;
                continue;
            }
            if (sub) {
                chunks.push(sub);
                sub = '';
            }
            if (fits(line)) {
                sub = line;
            } else {
                // 极个别的超长单行(如超长 URL): 硬切, 不丢内容
                for (let i = 0; i < line.length; i += Math.floor(maxLen / 2)) {
                    chunks.push(line.slice(i, i + Math.floor(maxLen / 2)));
                }
            }
        }
        if (sub) {
            current = sub;
        }
    }
    if (current) {
        chunks.push(current);
    }
    return chunks.length > 0 ? chunks : [message];
}
