// /av 的卡片渲染。输出的是 Telegram HTML(命令直接发 HTML, 不经 markdown 转换),
// 所以所有外部字段都要转义 —— 标题/演员名里出现 < & 会直接破坏解析。
import type { AvCardOptions, AvDetail, AvVideo } from './types';
import { LTX_TABLE } from './ltx-data';
import { normCode, SCOPE_LABEL } from './pick';

const BASE = 'https://javranking.cc';
const LOCALE = 'zh-hans';
const STOCK_HOST = 'javranking.cc';

// 图片说明(caption)上限
export const MAX_CAPTION = 1024;
const MAX_SYNOPSIS = 110;

export function escapeHtml(text?: string | null): string {
    return (text ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

/** 单行字段: 转义后压掉换行和多余空白。 */
export function clean(text?: string | null): string {
    return escapeHtml(text).replace(/\s+/g, ' ').trim();
}

/** 剧情只取前面一两句, 整段贴上去卡片就不像卡片了。 */
export function synopsisLine(text: string, limit = MAX_SYNOPSIS): string {
    const flat = clean(text);
    if (flat.length <= limit) {
        return flat;
    }
    let kept = '';
    for (const sentence of flat.match(/[^。！？!?]+[。！？!?]?/g) ?? []) {
        if (kept.length + sentence.length > limit) {
            break;
        }
        kept += sentence;
    }
    return `${(kept.trim() || flat.slice(0, limit - 1)).trim()}…`;
}

function actors(video: AvVideo, maxActors: number): string[] {
    const links = video.actorLinks ?? [];
    const female = links.filter(actor => actor.gender === 'female');
    const picked = female.length > 0 ? female : links;
    return picked.slice(0, maxActors).map(actor => clean(actor.name));
}

export function renderCard(video: AvVideo, detail: AvDetail, durations: Map<number, number>, options: AvCardOptions, note?: string | null): string {
    const minutes = detail.duration ?? durations.get(video.videoId);
    const lines: string[] = [
        `🎬 今天冲哪个 · ${new Date().toISOString().slice(0, 10)}`,
        '',
        `${clean(video.code)}｜${clean(video.title)}`,
    ];
    if (note) {
        lines.push(`⚠️ ${clean(note)}`);
    }
    if (options.synopsis) {
        lines.push('', `📖 ${synopsisLine(options.synopsis)}`);
    }
    const people = actors(video, options.maxActors);
    if (people.length > 0) {
        lines.push('', `👤 ${people.join(' / ')}`);
    }

    const stats: string[] = [];
    if (video.score) {
        stats.push(`💪 战力 ${video.score} 分${video.rank ? `（全站 #${video.rank}）` : ''}`);
    }
    if (video.rating) {
        stats.push(`⭐ ${video.rating} 分${video.ratingCount ? `（${video.ratingCount.toLocaleString('en-US')} 人评价）` : ''}`);
    }
    if (stats.length > 0) {
        lines.push(stats.join(' ｜ '));
    }

    for (const appearance of (video.rankingAppearances ?? []).slice(0, 3)) {
        const year = appearance.year && !String(appearance.name).includes(String(appearance.year)) ? ` ${appearance.year}` : '';
        lines.push(`🏆 ${clean(appearance.name)}${year} #${appearance.position}`);
    }

    const meta: string[] = [];
    if (minutes) {
        meta.push(`⏱ ${minutes} 分钟`);
    }
    const scopeText = SCOPE_LABEL[video.scope ?? ''] || clean(video.scope) || '?';
    meta.push(`🏷 ${scopeText}`);
    if (video.releaseDate) {
        meta.push(`📅 ${clean(video.releaseDate)}`);
    }
    lines.push(meta.join(' ｜ '));

    if (video.tags.length > 0) {
        lines.push(`🔖 ${video.tags.slice(0, options.maxTags).map(tag => clean(tag)).join(' / ')}`);
    }

    const url = `${BASE}/${LOCALE}/videos/${video.videoId}/`;
    lines.push('', `<a href="${url}">🎬 在线观看 / 磁力</a>`);
    return lines.join('\n');
}

/** 光靠索引能拼出的封面地址(不联网)。 */
export function toStaticCover(url: string): string {
    // 裸域名的 /video/cover/ 返回的是 HTML 页而不是图片, 得换成 static CDN;
    // 但已经是 static 的不能再叠一层 —— 'static.javranking.cc/video/cover/'
    // 同样包含 'javranking.cc/video/cover/', 替换后会变成 static.static.xxx 直接 404。
    if (!url.startsWith('http') || url.includes(`//static.${STOCK_HOST}/`)) {
        return url;
    }
    return url.replace(`//${STOCK_HOST}/video/cover/`, `//static.${STOCK_HOST}/video/cover/`);
}

export function coverCandidates(video: AvVideo, detail: AvDetail): string[] {
    const raw = [
        video.coverUrl,
        `https://static.${STOCK_HOST}/video/cover/${video.videoId}.webp`,
        `https://static.${STOCK_HOST}/video/og/${video.videoId}.webp`,
        detail.cover,
        detail.shot,
    ];
    const out: string[] = [];
    for (const url of raw) {
        const fixed = url ? toStaticCover(url) : url;
        if (fixed && fixed.startsWith('http') && !out.includes(fixed)) {
            out.push(fixed);
        }
    }
    return out;
}

/** 这个番号的 ed2k 链接(内置表); 没有就是空数组。 */
export function ltxLinks(code?: string): string[] {
    return LTX_TABLE[normCode(code)] ?? [];
}

/** 卡片末尾的 ed2k 段。每条链接包一层 <code>: 手机上点一下整条就复制了。 */
export function ltxBlock(links: string[]): string {
    if (links.length === 0) {
        return '';
    }
    const body = links.map(link => (link.includes('`') ? link : `<code>${escapeHtml(link)}</code>`)).join('\n');
    return `\n\n📥 LTX 资源（ed2k）\n${body}`;
}

/**
 * 把 ed2k 段接到卡片末尾。
 * 有 ed2k 就一定要发出去:
 *   塞得进 1024 字的说明就接在卡片末尾, 塞不下就返回第二段让调用方单发一条(链接不能被截断)。
 */
export function attachLtx(text: string, links: string[]): { text: string; extra: string } {
    const block = ltxBlock(links);
    if (!block) {
        return { text, extra: '' };
    }
    if (text.length + block.length <= MAX_CAPTION) {
        return { text: text + block, extra: '' };
    }
    return { text, extra: block.trim() };
}
