
import type { AgentUserConfig } from '#/config';
import { Dalle } from './openai';

// 由魔数生成的合法最小图片 base64 (首字符决定 MIME 探测结果)
// JPEG: ff d8 ff e0 → base64 首字符 '/' → image/jpeg
const MINIMAL_JPEG_B64 = Buffer.from([
    0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01, 0xff, 0xd9,
]).toString('base64');
// PNG: 89 50 4e 47 → 'iVBOR' → image/png
const MINIMAL_PNG_B64 = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
]).toString('base64');
// WebP: 52 49 46 46 (RIFF) → 'UklGR' → image/webp
const MINIMAL_WEBP_B64 = Buffer.from([
    0x52, 0x49, 0x46, 0x46, 0x24, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50,
]).toString('base64');

describe('Dalle image agent', () => {
    const originalFetch = global.fetch;
    const fetchMock = jest.fn();

    const mockContext: AgentUserConfig = {
        IMAGE_API_BASE: 'https://api.example.com/v1',
        IMAGE_API_KEY: 'test-key',
        IMAGE_MODEL: 'gpt-image-2',
        IMAGE_SIZE: '1024x1024',
    } as any;

    const dalle = new Dalle();

    const mockResponse = (body: unknown): { json: () => Promise<unknown> } => ({
        json: async () => body,
    });

    beforeAll(() => {
        global.fetch = fetchMock as unknown as typeof fetch;
    });

    afterAll(() => {
        global.fetch = originalFetch;
    });

    beforeEach(() => {
        fetchMock.mockReset();
    });

    describe('generations (b64_json 兼容)', () => {
        it('decodes b64_json to a JPEG Blob (免费中转渠道格式)', async () => {
            fetchMock.mockResolvedValueOnce(mockResponse({ data: [{ b64_json: MINIMAL_JPEG_B64 }] }));
            const result = await dalle.request('a red circle', mockContext);
            const [url, init] = fetchMock.mock.calls[0];
            expect(url).toBe('https://api.example.com/v1/images/generations');
            expect(init.method).toBe('POST');
            expect(JSON.parse(init.body)).toEqual({
                prompt: 'a red circle',
                n: 1,
                size: '1024x1024',
                model: 'gpt-image-2',
            });
            expect(result).toBeInstanceOf(Blob);
            expect((result as Blob).type).toBe('image/jpeg');
            const buffer = await (result as Blob).arrayBuffer();
            expect(new Uint8Array(buffer)[0]).toBe(0xff); // JPEG 魔数
            expect(new Uint8Array(buffer)[1]).toBe(0xd8);
        });

        it('decodes PNG b64_json with auto-detected MIME', async () => {
            fetchMock.mockResolvedValueOnce(mockResponse({ data: [{ b64_json: MINIMAL_PNG_B64 }] }));
            const result = await dalle.request('png', mockContext);
            expect((result as Blob).type).toBe('image/png');
            expect(result).toBeInstanceOf(Blob);
        });

        it('decodes WebP b64_json with auto-detected MIME', async () => {
            fetchMock.mockResolvedValueOnce(mockResponse({ data: [{ b64_json: MINIMAL_WEBP_B64 }] }));
            const result = await dalle.request('webp', mockContext);
            expect((result as Blob).type).toBe('image/webp');
            expect(result).toBeInstanceOf(Blob);
        });

        it('falls back to official url format when b64_json missing (DALL-E 3 官方格式)', async () => {
            fetchMock.mockResolvedValueOnce(mockResponse({ data: [{ url: 'https://example.com/generated.jpg' }] }));
            const result = await dalle.request('blue sky', mockContext);
            expect(result).toBe('https://example.com/generated.jpg');
        });

        it('rejects data URI url (Telegram 不接受 data URI, 诚实报错)', async () => {
            fetchMock.mockResolvedValueOnce(mockResponse({ data: [{ url: 'data:image/jpeg;base64,aaaa' }] }));
            await expect(dalle.request('x', mockContext)).rejects.toThrow('Image API returned neither b64_json nor a usable url');
        });

        it('propagates API error message', async () => {
            fetchMock.mockResolvedValueOnce(mockResponse({ error: { message: 'Invalid model' } }));
            await expect(dalle.request('x', mockContext)).rejects.toThrow('Invalid model');
        });
    });
});
