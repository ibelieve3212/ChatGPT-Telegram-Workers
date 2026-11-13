// ed2k 资源索引: 只读内存里的一份表, 命令执行时绝不联网。
//
// 数据来源是服务器上的一个 JSON 文件(AV_LTX_FILE), 由 scripts/ltx-pull.mjs 手动更新:
//   手动过一次 ltx 站的人机验证 -> 拿到 ltx_pass cookie -> 跑一次脚本 -> 文件被原子替换。
// 这里刻意不做定时刷新: 上游 cookie 7 天过期, 自动刷新只会静默失败, 不如让更新显式发生。
//
// 文件和 jr_av.py 生成的 jr_ltx.json 同名同格式, 可以直接互相替换:
//   { "1krmv279": ["ed2k://|file|...", ...], ... }
// 键是 normCode() 归一化后的番号。

export type LtxTable = Record<string, string[]>;

let table: LtxTable = {};

/** 注入索引表(local 版在启动时从文件读取后调用; 不注入就是空表)。 */
export function setLtxTable(next: LtxTable | null | undefined): void {
    table = next && typeof next === 'object' ? next : {};
}

/** 当前索引里有多少个番号, 用于启动日志。 */
export function ltxTableSize(): number {
    return Object.keys(table).length;
}

/** 这个番号的 ed2k 链接; 没有就是空数组。 */
export function ltxLinks(normalizedCode?: string): string[] {
    if (!normalizedCode) {
        return [];
    }
    return table[normalizedCode] ?? [];
}
