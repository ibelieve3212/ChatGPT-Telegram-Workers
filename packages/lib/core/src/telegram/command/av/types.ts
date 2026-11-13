// /av 命令的数据结构。字段名沿用 javranking.cc 的原始命名(去掉没用的), 便于对照上游。

export interface AvRankingAppearance {
    name: string;
    position: number;
    year?: number;
}

export interface AvActorLink {
    name: string;
    gender?: string | null;
}

// filter-index.json 里的单条影片, 加上合并进来的榜单名次
export interface AvVideo {
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
    actorLinks?: AvActorLink[];
    tags: string[];
    rank?: number | null;
    rankingAppearances: AvRankingAppearance[];
}

export interface AvCategory {
    id: number;
    name: string;
    raw?: string;
    aliases?: string[];
}

export interface AvLibrary {
    videos: AvVideo[];
    categories: Map<number, AvCategory>;
    years: number[];
    // 站点「今天冲哪个」精选池的 id 与时长, 拉不到时为空
    luckyIds: Set<number>;
    durations: Map<number, number>;
}

export interface AvArgs {
    scope: string | null;
    year: number | null;
    tags: string[];
    reroll: boolean;
    unknown: string[];
}

// 详情页 JSON-LD 能补的两三样(片长/封面/剧照)
export interface AvDetail {
    duration?: number;
    cover?: string;
    shot?: string;
}

export interface AvCardOptions {
    maxTags: number;
    maxActors: number;
    synopsis: string | null;
}
