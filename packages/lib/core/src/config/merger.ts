import type { AgentUserConfig } from '#/config/config';

export class ConfigMerger {
    // 将环境变量字符串解析为字符串数组。
    // 兼容多种写法: 逗号分隔 "a,b,c"、JSON 数组 "[a,b]"、元素带引号 "'a','b'"、数字 "123" 等。
    // 统一返回元素为字符串(去首尾引号并 trim)的数组。
    private static parseArray(raw: string): string[] {
        raw = raw.trim();
        if (raw === '') {
            return [];
        }
        let list: unknown[];
        if (raw.startsWith('[') && raw.endsWith(']')) {
            try {
                list = JSON.parse(raw);
            } catch (e) {
                // JSON 解析失败(如元素用单引号), 退化为按逗号拆分
                list = raw.slice(1, -1).split(',');
            }
        } else {
            list = raw.split(',');
        }
        return list.map(item => `${item}`.trim().replace(/^['"]+|['"]+$/g, ''));
    }

    static trim(source: AgentUserConfig, lock: string[]): Record<string, any> {
        const config: Record<string, any> = { ...source };
        const keysSet = new Set<string>(source?.DEFINE_KEYS || []);
        for (const key of lock) {
            keysSet.delete(key);
        }
        keysSet.add('DEFINE_KEYS');
        for (const key of Object.keys(config)) {
            if (!keysSet.has(key)) {
                delete config[key];
            }
        }
        return config;
    };

    static merge(target: Record<string, any>, source: Record<string, any>, exclude?: string[]) {
        const sourceKeys = new Set(Object.keys(source));
        for (const key of Object.keys(target)) {
            // 不存在的key直接跳过
            if (!sourceKeys.has(key)) {
                continue;
            }
            if (exclude && exclude.includes(key)) {
                continue;
            }
            // 默认为字符串类型
            const t = (target[key] !== null && target[key] !== undefined) ? typeof target[key] : 'string';
            // 不是字符串直接赋值
            if (typeof source[key] !== 'string') {
                target[key] = source[key];
                continue;
            }
            switch (t) {
                case 'number':
                    target[key] = Number.parseInt(source[key], 10);
                    break;
                case 'boolean':
                    target[key] = (source[key] || 'false') === 'true';
                    break;
                case 'string':
                    target[key] = source[key];
                    break;
                case 'object':
                    if (Array.isArray(target[key])) {
                        target[key] = ConfigMerger.parseArray(source[key]);
                    } else {
                        try {
                            target[key] = JSON.parse(source[key]);
                        } catch (e) {
                            console.error(e);
                        }
                    }
                    break;
                default:
                    target[key] = source[key];
                    break;
            }
        }
    }
}
