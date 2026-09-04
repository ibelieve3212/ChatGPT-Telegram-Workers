import { Cache } from '../cache';

const IMAGE_CACHE = new Cache<Blob>();

async function fetchImage(url: string): Promise<Blob> {
    const cache = IMAGE_CACHE.get(url);
    if (cache) {
        return cache;
    }
    // 加超时保护: 图片下载偶发 hang 会卡死整条消息, 超时则放弃图片只发文字
    const IMAGE_FETCH_TIMEOUT = 10_000;
    const resp = await Promise.race([
        fetch(url),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error('fetch image timeout')), IMAGE_FETCH_TIMEOUT)),
    ]);
    if (!resp.ok) {
        throw new Error(`fetch image failed: ${resp.status}`);
    }
    const blob = await resp.blob();
    IMAGE_CACHE.set(url, blob);
    return blob;
}

async function urlToBase64String(url: string): Promise<string> {
    if (typeof Buffer !== 'undefined') {
        return fetchImage(url)
            .then(blob => blob.arrayBuffer())
            .then(buffer => Buffer.from(buffer).toString('base64'));
    } else {
    // 无 nodejs_compat 时走纯 JS base64 编码。
    // 注意: 不能用 btoa(String.fromCharCode.apply(null, uint8array)) ——
    // fromCharCode.apply 会把图片每个字节作为参数传入, 大图片(>200KB)会栈溢出
    // (Maximum call stack size exceeded, Workers 里表现为 'The operation was aborted')。
    // 改为分块循环拼接字符串, 避免函数调用栈过深。
        const buffer = await fetchImage(url).then(blob => blob.arrayBuffer());
        return base64Encode(new Uint8Array(buffer));
    }
}

// 分块 base64 编码: 逐块处理, 避免 fromCharCode.apply 栈溢出
function base64Encode(bytes: Uint8Array): string {
    const CHUNK_SIZE = 0x8000; // 32KB/块, 远低于调用栈限制
    let binary = '';
    for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
        const chunk = bytes.subarray(i, Math.min(i + CHUNK_SIZE, bytes.length));
        binary += String.fromCharCode(...chunk);
    }
    return btoa(binary);
}

function getImageFormatFromBase64(base64String: string): string {
    const firstChar = base64String.charAt(0);
    switch (firstChar) {
        case '/':
            return 'jpeg';
        case 'i':
            return 'png';
        case 'U':
            return 'webp';
        default:
            throw new Error('Unsupported image format');
    }
}

interface Base64DataWithFormat {
    data: string;
    format: string;
}

export async function imageToBase64String(url: string): Promise<Base64DataWithFormat> {
    const base64String = await urlToBase64String(url);
    const format = getImageFormatFromBase64(base64String);
    return {
        data: base64String,
        format: `image/${format}`,
    };
}

export function renderBase64DataURI(params: Base64DataWithFormat): string {
    return `data:${params.format};base64,${params.data}`;
}

export function extraBase64DataFromBase64URI(dataURI: string): Base64DataWithFormat {
    const [format, data] = dataURI.split(';base64,');
    return {
        format: format.replace('data:', ''),
        data,
    };
}
