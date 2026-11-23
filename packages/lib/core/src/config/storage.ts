import type { KVNamespaceBinding, WorkersKVNamespaceBinding } from './binding';

export function isWorkersKV(database: KVNamespaceBinding): database is WorkersKVNamespaceBinding {
    return !database.listKeys && typeof (database as Partial<WorkersKVNamespaceBinding>).list === 'function';
}

// 两个运行时共用完整分页，不能因为某页为空就提前结束。
export async function listStorageKeys(database: KVNamespaceBinding, prefix: string): Promise<string[]> {
    if (database.listKeys) {
        return (await database.listKeys(prefix)).filter(key => key.startsWith(prefix)).sort();
    }
    if (!isWorkersKV(database)) {
        throw new Error('The store does not support listing keys');
    }
    const keys: string[] = [];
    let cursor: string | undefined;
    while (true) {
        const page = await database.list({ prefix, cursor });
        keys.push(...page.keys.map(key => key.name));
        if (page.list_complete)
            return keys.sort();
        if (!page.cursor || page.cursor === cursor)
            throw new Error('Invalid storage list cursor');
        cursor = page.cursor;
    }
}

export async function readStorageValues(database: KVNamespaceBinding, keys: string[]): Promise<unknown[]> {
    const values: unknown[] = [];
    for (let i = 0; i < keys.length; i += 100) {
        const batch = keys.slice(i, i + 100);
        values.push(...(isWorkersKV(database)
            ? await database.get(batch).then(result => batch.map(key => result.get(key)))
            : await Promise.all(batch.map(key => database.get(key)))));
    }
    return values;
}
