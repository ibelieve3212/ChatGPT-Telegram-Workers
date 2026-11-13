import { ENV } from '#/config';
import { getText, loadLibrary, parseIsoDuration, synopsisUsable } from './data';
import { ltxLinks } from './ltx-store';
import { chooseVideo, parseArgs, pickVideo } from './pick';

// 真实链路冒烟: 打真接口, 验证选片 -> 卡片 -> ed2k 全流程能跑通。
// 默认跳过(CI 不该依赖外网站点), 需要时手动跑:
//   AV_LIVE=1 npx jest src/telegram/command/av/live.test.ts --testTimeout=90000
const liveTest = process.env.AV_LIVE ? test : test.skip;

jest.setTimeout(90_000);

liveTest('真实拉取片库 + 选片 + 卡片数据', async () => {
    const started = Date.now();
    const library = await loadLibrary();
    const loadMs = Date.now() - started;
    const searchMs = 0;

    const result = chooseVideo(library, { scope: 'uncensored', year: null, tags: [], reroll: false, unknown: [] }, { useLuckyPool: false });
    const videos = library.videos.length;
    const random = pickVideo(library, { scope: null, year: null, tags: [], reroll: true });
    const args = parseArgs(['无码', '2024', '巨乳'], library);

    console.log(JSON.stringify({
        loadMs,
        searchMs,
        videos,
        categories: library.categories.size,
        years: library.years.slice(0, 5),
        pickedCode: result.video.code,
        pickedScope: result.video.scope,
        pickedTags: result.video.tags.slice(0, 3),
        pickedScore: result.video.score,
        rank: result.video.rank,
        appearances: result.video.rankingAppearances.length,
        rerollHasCode: Boolean(random.code),
        args: { scope: args.scope, year: args.year, tags: args.tags, unknown: args.unknown },
        ltxCount: ltxLinks(result.video.code).length,
    }, null, 0));

    expect(videos).toBeGreaterThan(1000);
    expect(result.video.code).toBeTruthy();
    expect(result.video.scope).toBe('uncensored');
    expect(args.scope).toBe('uncensored');
    expect(args.year).toBe(2024);
}, 90_000);

liveTest('详情页 + 精选池', async () => {
    const library = await loadLibrary();
    const detail = await getText(`https://javranking.cc/zh-hans/videos/22/`);
    expect(detail).toContain('ld+json');
    expect(parseIsoDuration('PT130M')).toBe(130);
    expect(synopsisUsable('某片名', '很短')).toBe(false);
    expect(ENV.AV_TIMEOUT).toBeGreaterThan(0);
    expect(library.videos.length).toBeGreaterThan(0);
}, 90_000);
