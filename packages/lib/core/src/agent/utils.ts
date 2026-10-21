import type { AgentUserConfig } from '#/config';
import type { ChatAgentResponse, DataItemContent, HistoryItem, ImageDiagCounter, ImageRenderReport } from './types';

export interface ImageRealContent {
    url?: string;
    base64?: string;
}

/** 新建图片加载统计器 */
export function createImageDiagCounter(): ImageDiagCounter {
    return {
        current: { ok: 0, failed: 0 },
        history: { ok: 0, failed: 0 },
    };
}

/** 把单张图片的渲染结果记入统计器 */
export function recordImageRender(counter: ImageDiagCounter, report: ImageRenderReport): void {
    const target = report.source === 'current' ? counter.current : counter.history;
    if (report.ok) {
        target.ok += 1;
    } else {
        target.failed += 1;
    }
}

/**
 * 根据统计结果生成用户可见提示。
 * 以前图片丢失是完全静默的, 用户只能从"模型好像不记得图"去猜, 这里明确告知。
 */
export function buildImageNotices(counter: ImageDiagCounter, extractFailed: number = 0): string[] {
    const notices: string[] = [];
    if (extractFailed > 0) {
        notices.push(`⚠️ 有 ${extractFailed} 张图片未能从 Telegram 取到, 模型没有看到这些图片(可尝试重新发送图片)。`);
    }
    if (counter.current.failed > 0) {
        notices.push(`⚠️ 本条消息中的 ${counter.current.failed} 张图片加载失败, 模型没有看到这些图片(可尝试重新发送图片)。`);
    }
    if (counter.history.failed > 0) {
        notices.push(`⚠️ 历史中的 ${counter.history.failed} 张图片加载失败, 模型可能已经无法查看此前发过的图片。`);
    }
    return notices;
}

export function extractTextContent(history: HistoryItem): string {
    if (typeof history.content === 'string') {
        return history.content;
    }
    if (Array.isArray(history.content)) {
        return history.content.map((item) => {
            if (item.type === 'text') {
                return item.text;
            }
            return '';
        }).join('');
    }
    return '';
}

export function extractImageContent(imageData: DataItemContent | URL): ImageRealContent {
    if (imageData instanceof URL) {
        return { url: imageData.href };
    }
    // 2. 判断 DataContent 的具体类型
    // 检查是否为字符串（包括 base64）
    if (typeof imageData === 'string') {
        if (imageData.startsWith('http')) {
            return { url: imageData };
        } else {
            return { base64: imageData };
        }
    }
    if (typeof Buffer !== 'undefined') {
        if (imageData instanceof Uint8Array) {
            return { base64: Buffer.from(imageData).toString('base64') };
        }
        if (Buffer.isBuffer(imageData)) {
            return { base64: Buffer.from(imageData).toString('base64') };
        }
    }
    return {};
}

export async function convertStringToResponseMessages(input: Promise<string> | string): Promise<ChatAgentResponse> {
    const text = typeof input === 'string' ? input : await input;
    return {
        text,
        responses: [{ role: 'assistant', content: text }],
    };
}

export async function loadModelsList(raw: string, remoteLoader?: (url: string) => Promise<string[]>): Promise<string[]> {
    if (!raw) {
        return [];
    }
    if (raw.startsWith('[') && raw.endsWith(']')) {
        try {
            return JSON.parse(raw);
        } catch (e) {
            console.error(e);
            return [];
        }
    }
    if (raw.startsWith('http') && remoteLoader) {
        return await remoteLoader(raw);
    }
    return [raw];
}

export function bearerHeader(token: string | null, stream?: boolean): Record<string, string> {
    const res: Record<string, string> = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
    if (stream !== undefined) {
        res.Accept = stream ? 'text/event-stream' : 'application/json';
    }
    return res;
}

type WorkersConfigKeys = keyof AgentUserConfig;
export function getAgentUserConfigFieldName<T extends WorkersConfigKeys>(fieldName: T): T {
    return fieldName;
}
