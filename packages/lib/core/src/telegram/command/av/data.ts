// /av 的取数层。
//
// 和 javranking-bot 的 jr_av.py 一样: 除了 ed2k 表随包内置, 其余数据每条命令现拉。
// 站点是静态站, 没有「按番号查一条」的接口 —— 筛选用的 filter-index.json 是整包,
// 站点自己的 explore 页面也是把它下到浏览器里再过滤。
import type { AvCategory, AvDetail, AvLibrary, AvRankingAppearance, AvVideo } from './types';
import { ENV } from '#/config';

const BASE = 'https://javranking.cc';
const LOCALE = 'zh-hans';
const AIRAV_PAGE = 'https://airav.io/cn/video?jid=';

// 伪装成浏览器: 自报家门的 UA 高频请求很容易被 Cloudflare 盯上
const BROWSER_HEADERS: Record<string, string> = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.9',
};

// 被 Cloudflare 的 JS 挑战拦住 —— 换 UA / 重试都没用
export class CloudflareBlockedError extends Error {
    constructor(detail = '') {
        super(`数据源被 Cloudflare 拦截${detail ? ` (${detail})` : ''}`);
        this.name = 'CloudflareBlockedError';
    }
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 上次请求时间, 用来做最小间隔节流(一条命令五六个请求, 间隔几百毫秒足够客气)
let lastRequestAt = 0;

async function throttle(): Promise<void> {
    const wait = lastRequestAt + ENV.AV_REQUEST_DELAY - Date.now();
    if (wait > 0) {
        await sleep(wait);
    }
    lastRequestAt = Date.now();
}

function isChallenge(body: string): boolean {
    const head = body.slice(0, 2048).toLowerCase();
    return head.includes('just a moment') || head.includes('challenges.cloudflare.com') || head.includes('请稍候');
}

async function request(url: string, tries = 3): Promise<Response> {
    let lastError: unknown = null;
    for (let i = 0; i < tries; i += 1) {
        await throttle();
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), ENV.AV_TIMEOUT * 1000);
        try {
            const resp = await fetch(url, { headers: BROWSER_HEADERS, signal: controller.signal });
            if (resp.ok) {
                return resp;
            }
            if (resp.status === 403 || resp.status === 429 || resp.status === 503) {
                lastError = new CloudflareBlockedError(`HTTP ${resp.status}`);
            } else {
                lastError = new Error(`HTTP ${resp.status}`);
            }
        } catch (e) {
            lastError = e instanceof Error && e.name === 'AbortError' ? new Error('请求超时') : e;
        } finally {
            clearTimeout(timer);
        }
        if (i < tries - 1) {
            await sleep(600 * (i + 1));
        }
    }
    if (lastError instanceof CloudflareBlockedError) {
        throw lastError;
    }
    const detail = lastError instanceof Error ? lastError.message : String(lastError);
    throw new Error(`请求失败: ${url} (${detail})`);
}

export async function getText(url: string, tries = 3): Promise<string> {
    const resp = await request(url, tries);
    const text = await resp.text();
    if (isChallenge(text)) {
        throw new CloudflareBlockedError();
    }
    return text;
}

export async function getJson<T>(url: string, tries = 3): Promise<T> {
    return JSON.parse(await getText(url, tries)) as T;
}

interface RawVideo {
    videoId: number;
    code?: string;
    title?: string;
    score?: number;
    coverUrl?: string;
    releaseDate?: string;
    year?: number;
    rating?: number;
    ratingCount?: number;
    scope?: string;
    categoryIds?: number[];
    actorLinks?: AvVideo['actorLinks'];
}

interface RankingIndex {
    videos: Array<{ videoId: number; rank?: number | null; rankingAppearances?: AvRankingAppearance[] }>;
}

/**
 * 片库索引: filter-index.json(年份/范围/题材/评分) 合并 search-index.json(战力榜名次)。
 * 每条命令现拉, 约 6MB(gzip), 一两秒。榜单名次拉失败不影响选片, 只是不显示战绩。
 */
export async function loadLibrary(): Promise<AvLibrary> {
    const data = await getJson<{ categories: AvCategory[]; videos: RawVideo[] }>(`${BASE}/${LOCALE}/filter-index.json`);
    const categories = new Map<number, AvCategory>();
    const categoryName = new Map<number, string>();
    for (const category of data.categories) {
        categories.set(category.id, category);
        categoryName.set(category.id, category.name);
    }

    const ranks = new Map<number, { rank?: number | null; appearances: AvRankingAppearance[] }>();
    try {
        const search = await getJson<RankingIndex>(`${BASE}/${LOCALE}/search-index.json`);
        for (const video of search.videos) {
            ranks.set(video.videoId, { rank: video.rank, appearances: video.rankingAppearances ?? [] });
        }
    } catch (e) {
        console.error('[av] 榜单名次合并失败, 将不显示战绩:', e);
    }

    const videos: AvVideo[] = [];
    for (const raw of data.videos) {
        if (!raw.coverUrl) {
            continue;
        }
        const meta = ranks.get(raw.videoId);
        videos.push({
            ...raw,
            tags: (raw.categoryIds ?? [])
                .map(id => categoryName.get(id))
                .filter((name): name is string => Boolean(name)),
            rank: meta?.rank ?? null,
            rankingAppearances: meta?.appearances ?? [],
        });
    }

    const years = [...new Set(videos.map(v => v.year).filter((y): y is number => typeof y === 'number'))]
        .sort((a, b) => b - a);

    return { videos, categories, years, luckyIds: new Set(), durations: new Map() };
}

/**
 * 站点「今天冲哪个」精选池: 页面里内嵌的 lucky-data(约 240KB), 带时长。
 * 拉不到就是空池, 默认推荐退化为全库随机。
 */
export async function fillLuckyPool(library: AvLibrary): Promise<AvLibrary> {
    try {
        const html = await getText(`${BASE}/${LOCALE}/pick/`);
        const matched = html.match(/<script type="application\/json" id="lucky-data">([\s\S]*?)<\/script>/);
        if (!matched) {
            return library;
        }
        const data = JSON.parse(matched[1]) as { videos?: Record<string, { durationMinutes?: number }> };
        const ids = new Set<number>();
        const durations = new Map<number, number>();
        for (const [key, value] of Object.entries(data.videos ?? {})) {
            const id = Number.parseInt(key, 10);
            if (!Number.isFinite(id)) {
                continue;
            }
            ids.add(id);
            if (value?.durationMinutes) {
                durations.set(id, value.durationMinutes);
            }
        }
        library.luckyIds = ids;
        library.durations = durations;
    } catch (e) {
        console.error('[av] 精选池拉取失败, 默认推荐退化为全库:', e);
    }
    return library;
}

// ISO 8601 时长 -> 分钟(Python 侧是 "PT130M" / "PT1H52M")
export function parseIsoDuration(value?: string): number | undefined {
    if (!value) {
        return undefined;
    }
    const matched = value.match(/^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
    if (!matched) {
        return undefined;
    }
    const [, day, hour, minute, second] = matched;
    const total = Number(day ?? 0) * 1440 + Number(hour ?? 0) * 60 + Number(minute ?? 0) + Math.round(Number(second ?? 0) / 60);
    return total > 0 ? total : undefined;
}

/**
 * 详情页 JSON-LD: 补片长 / 封面 / 剧照兜底。每条命令最多这一次, 失败就降级(少一行片长)。
 */
export async function fetchDetail(videoId: number): Promise<AvDetail> {
    try {
        const html = await getText(`${BASE}/${LOCALE}/videos/${videoId}/`);
        const detail: AvDetail = {};
        const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
        if (ld) {
            try {
                const json = JSON.parse(ld[1]) as { duration?: string; image?: string | string[] };
                detail.duration = parseIsoDuration(json.duration);
                detail.cover = Array.isArray(json.image) ? json.image[0] : json.image;
            } catch (e) {
                console.error('[av] 详情页 JSON-LD 解析失败:', e);
            }
        }
        // 极少数片的 cover 和 og 图都不存在, 拿详情页的剧照当最后一张牌
        const shots = html.match(/https?:\/\/[^"'\s]+\/samples\/[^"'\s]+\.jpg/g);
        detail.shot = shots?.[0];
        return detail;
    } catch (e) {
        console.error(`[av] 详情页 ${videoId} 没拉到, 这张卡片少几行字:`, e);
        return {};
    }
}

function textOf(fragment: string): string {
    return fragment
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, '\'')
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * 中文剧情(airav)。
 * /cn/ 页的 meta description 还是繁体, 只有正文那个 <p class="my-3"> 是简体, 直接取。
 * 抓不到(404 / 撞 Cloudflare / 本来就没剧情)一律当没有。
 */
export async function fetchSynopsis(code: string): Promise<string | null> {
    try {
        const html = await getText(`${AIRAV_PAGE}${encodeURIComponent(code)}`);
        const titleMatched = html.match(/<h1>([\s\S]*?)<\/h1>/);
        const bodyMatched = html.match(/<p class="my-3">([\s\S]*?)<\/p>/);
        if (!bodyMatched) {
            return null;
        }
        const title = titleMatched ? textOf(titleMatched[1]) : '';
        const text = textOf(bodyMatched[1]);
        return synopsisUsable(title, text) ? text : null;
    } catch (e) {
        console.error(`[av] ${code} 剧情没抓到:`, e);
        return null;
    }
}

// 拦掉假「剧情」: 残版条目的正文就是把片名抄一遍
export function synopsisUsable(title: string, text: string, minLength = 40): boolean {
    if (text.length < minLength || (title && text.includes(title))) {
        return false;
    }
    return !['破坏版', '破壞版', '破解'].some(word => title.includes(word));
}
