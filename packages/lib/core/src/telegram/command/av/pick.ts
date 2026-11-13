// /av 的参数解析与选片。纯函数, 不碰网络, 便于单测。
import type { AvArgs, AvLibrary, AvVideo } from './types';

// 有码 / 无码 / FC2 的各种叫法
const SCOPE_WORDS: Record<string, string> = {
    有码: 'censored',
    有碼: 'censored',
    骑兵: 'censored',
    騎兵: 'censored',
    censored: 'censored',
    马赛克: 'censored',
    馬賽克: 'censored',
    无码: 'uncensored',
    無碼: 'uncensored',
    步兵: 'uncensored',
    无修正: 'uncensored',
    無修正: 'uncensored',
    uncensored: 'uncensored',
    fc2: 'fc2',
};

export const SCOPE_LABEL: Record<string, string> = {
    censored: '有码',
    uncensored: '无码',
    fc2: 'FC2',
};

const REROLL_WORDS = new Set(['换一个', '换', '再来', '重来', 'reroll', 'r']);
const HELP_WORDS = new Set(['帮助', 'help', '?', '？', '-h', '--help']);
const IGNORED_WORDS = new Set(['全部', 'all', '随便', '随机']);

export function isHelpWord(word: string): boolean {
    return HELP_WORDS.has(word.trim().replace(/^#+/, '').toLowerCase());
}

/**
 * 番号归一化: 删 - _ 空格, 去掉 FC2 的 ppv 前缀, 转小写。
 * FC2 官方售卖页叫 FC2-PPV-2549115, 站点写 FC2-2549115, 同一个编号。
 */
export function normCode(code?: string): string {
    let out = (code ?? '').replace(/[-_\s]/g, '').toLowerCase();
    if (out.startsWith('fc2ppv')) {
        out = `fc2${out.slice(6)}`;
    }
    return out;
}

// 题材名匹配: 先精确, 再子串(记录第一个命中作为兜底)
export function matchCategory(word: string, library: AvLibrary): string | null {
    const target = word.toLowerCase();
    let fallback: string | null = null;
    for (const category of library.categories.values()) {
        const names = [category.name, category.raw, ...(category.aliases ?? [])];
        for (const name of names) {
            if (!name) {
                continue;
            }
            const low = name.toLowerCase();
            if (target === low) {
                return category.name;
            }
            if (fallback === null && (low.includes(target) || target.includes(low))) {
                fallback = category.name;
            }
        }
    }
    return fallback;
}

export function parseArgs(parts: string[], library: AvLibrary): AvArgs {
    const args: AvArgs = { scope: null, year: null, tags: [], reroll: false, unknown: [] };
    for (const raw of parts) {
        const word = raw.trim().replace(/^#+/, '').toLowerCase();
        if (!word) {
            continue;
        }
        if (REROLL_WORDS.has(word)) {
            args.reroll = true;
            continue;
        }
        if (/^(?:19|20)\d{2}$/.test(word)) {
            args.year = Number.parseInt(word, 10);
            continue;
        }
        if (SCOPE_WORDS[word]) {
            args.scope = SCOPE_WORDS[word];
            continue;
        }
        if (IGNORED_WORDS.has(word)) {
            continue;
        }
        const category = matchCategory(word, library);
        if (category) {
            args.tags.push(category);
        } else {
            // 存去掉 # 的原词(保留大小写), 后面拿来当番号/演员名直查
            args.unknown.push(raw.trim().replace(/^#+/, ''));
        }
    }
    return args;
}

/** 按番号或演员名直查。番号会忽略 - _ 空格, 两种 FC2 写法都认。 */
export function findVideos(library: AvLibrary, word: string, limit = 5): AvVideo[] {
    const target = normCode(word);
    let hits = library.videos.filter(video => normCode(video.code) === target);
    if (hits.length === 0) {
        hits = library.videos.filter(video => target !== '' && normCode(video.code).includes(target));
    }
    if (hits.length === 0 && target.length >= 2) {
        hits = library.videos.filter(video =>
            (video.actorLinks ?? []).some(actor => (actor.name ?? '').toLowerCase().includes(target)));
    }
    return hits.sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).slice(0, limit);
}

function hashSeed(text: string): number {
    let hash = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
        hash ^= text.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
}

// xorshift32: 同一个种子出同一串随机数, 跨天/跨进程稳定
function createRandom(seed: number): () => number {
    let state = seed || 1;
    return () => {
        state ^= state << 13;
        state >>>= 0;
        state ^= state >>> 17;
        state ^= state << 5;
        state >>>= 0;
        return state / 4294967296;
    };
}

function weightedPick(pool: AvVideo[], random: () => number): AvVideo {
    const low = Math.min(...pool.map(video => video.score ?? 0));
    const weights = pool.map(video => Math.max(1, (video.score ?? 0) - low + 60));
    const total = weights.reduce((sum, weight) => sum + weight, 0);
    let ticket = random() * total;
    for (let i = 0; i < pool.length; i += 1) {
        ticket -= weights[i];
        if (ticket <= 0) {
            return pool[i];
        }
    }
    return pool[pool.length - 1];
}

export interface PickOptions {
    scope: string | null;
    year: number | null;
    tags: string[];
    reroll: boolean;
    avoid?: number | null;
    onlyIds?: Set<number> | null;
    today?: string;
    minScore?: number;
    random?: () => number;
}

/**
 * 按战力分加权随机。
 * 种子 = 日期 + 筛选条件: 同一天同一条件结果稳定, 条件一变就重新摇;
 * reroll(换一个) 用真随机并避开上一次那部。
 */
export function pickVideo(library: AvLibrary, options: PickOptions): AvVideo {
    const { scope, year, tags, reroll, avoid = null, onlyIds = null } = options;
    const minScore = options.minScore ?? 0;
    const pool = library.videos.filter((video) => {
        if (onlyIds && !onlyIds.has(video.videoId)) {
            return false;
        }
        if (scope && video.scope !== scope) {
            return false;
        }
        if (year && video.year !== year) {
            return false;
        }
        if (tags.length > 0 && !tags.every(tag => video.tags.includes(tag))) {
            return false;
        }
        return (video.score ?? 0) >= minScore;
    });
    if (pool.length === 0) {
        throw new LookupError('没有符合条件的影片');
    }

    const random = options.random ?? (reroll
        ? Math.random
        : createRandom(hashSeed([
                options.today ?? new Date().toISOString().slice(0, 10),
                scope ?? '',
                String(year ?? ''),
                [...tags].sort().join(','),
                onlyIds ? 'lucky' : 'all',
            ].join('|'))));

    let chosen = weightedPick(pool, random);
    if (avoid !== null) {
        for (let i = 0; i < 30 && chosen.videoId === avoid; i += 1) {
            chosen = weightedPick(pool, random);
        }
    }
    return chosen;
}

export class LookupError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'LookupError';
    }
}

export interface ChooseResult {
    video: AvVideo;
    note: string | null;
}

/**
 * 带逐级放宽的选片: 先按全部题材, 没货就逐个去掉题材, 再没货放宽年份。
 * 范围(有码/无码/FC2)是硬条件, 永不放宽 —— 要的是无码却给有码就是错。
 */
export function chooseVideo(
    library: AvLibrary,
    args: AvArgs,
    options: { avoid?: number | null; useLuckyPool: boolean; minScore?: number; today?: string } = { useLuckyPool: true },
): ChooseResult {
    const { scope, year } = args;
    const tags = [...args.tags];
    const useLucky = options.useLuckyPool && !scope && !year && tags.length === 0;
    const onlyIds = useLucky && library.luckyIds.size > 0 ? library.luckyIds : null;

    const ladder: Array<{ tags: string[]; year: number | null; note: string | null }> = [
        { tags, year, note: null },
    ];
    const dropped: string[] = [];
    const remaining = [...tags];
    while (remaining.length > 0) {
        dropped.unshift(remaining.pop() as string);
        if (remaining.length > 0) {
            ladder.push({
                tags: [...remaining],
                year,
                note: `加上「${dropped.join('、')}」就没货了，只按「${remaining.join('、')}」筛`,
            });
        } else {
            ladder.push({
                tags: [],
                year,
                note: `题材「${dropped.join('、')}」没货，已去掉题材条件`,
            });
        }
    }
    if (year) {
        ladder.push({ tags: [], year: null, note: `${year} 年的没货，已放宽到全部年份` });
    }

    for (const step of ladder) {
        try {
            const video = pickVideo(library, {
                scope,
                year: step.year,
                tags: step.tags,
                reroll: args.reroll,
                avoid: options.avoid ?? null,
                onlyIds,
                minScore: options.minScore,
                today: options.today,
            });
            return { video, note: step.note };
        } catch (e) {
            if (!(e instanceof LookupError)) {
                throw e;
            }
        }
    }
    throw new LookupError('没有符合条件的影片');
}
