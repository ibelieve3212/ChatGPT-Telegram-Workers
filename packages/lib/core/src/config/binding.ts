export interface KVNamespaceBinding {
    get: (key: string) => Promise<string | any>;
    put: (key: string, value: string, info?: { expirationTtl?: number; expiration?: number }) => Promise<void>;
    delete: (key: string) => Promise<void>;
    // Docker adapter 统一为按前缀列键；Workers 则直接使用原生分页接口。
    listKeys?: (prefix: string) => Promise<string[]>;
}

export interface WorkersKVNamespaceBinding extends KVNamespaceBinding {
    get: ((key: string) => Promise<string | null>) & ((keys: string[]) => Promise<Map<string, string | null>>);
    list: (options: { prefix: string; cursor?: string }) => Promise<{
        keys: { name: string }[];
        list_complete: boolean;
        cursor?: string;
    }>;
}

export interface APIGuardBinding {
    fetch: (request: Request) => Promise<Response>;
}

export type AiTextGenerationOutput = ReadableStream<Uint8Array> | { response?: string };
export type AiTextToImageOutput = ReadableStream<Uint8Array> | { image?: string };

export abstract class WorkerAIBinding {
    abstract run(model: string, body: { messages: any[]; stream: boolean }): Promise<AiTextGenerationOutput>;
    abstract run(model: string, body: { prompt: string }): Promise<AiTextToImageOutput>;
}
