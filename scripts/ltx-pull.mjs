#!/usr/bin/env node
// 手动拉一次 LTX 全量资源索引, 裁剪后写成本地 JSON 给 bot 用。
//
// 为什么要手动: 上游 /api/items 需要人机验证, 验证通过后服务端下发 ltx_pass
// (格式 id.过期时间戳.HMAC, 有效期 7 天, 签名校验过期时间, 无法续期)。
// 所以更新只能在 cookie 有效期内跑一次脚本, 过期了重新点一下验证。
//
// 用法:
//   node scripts/ltx-pull.mjs --cookie "<ltx_pass 的值>"
//   node scripts/ltx-pull.mjs --cookie "..." --out data/jr_ltx.json
//
// 拿 cookie: 浏览器打开 https://ltx.libray.workers.dev/ , 点过人机验证后
//   F12 -> Application -> Cookies -> 复制 ltx_pass
//   或者在 Console 里执行: document.cookie
//
// 只认 ltx_pass, ltx_c 是客户端 ID, 单独用没用。

import fs from 'node:fs';
import path from 'node:path';

const API = 'https://ltx.libray.workers.dev/api/items';
// 站方 UA 黑名单: curl / python-requests / node-fetch 一律 403
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

function arg(name, fallback = '') {
    const i = process.argv.indexOf(`--${name}`);
    return i > 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

/** 番号归一化: 删 - _ 空格, fc2ppv 前缀并成 fc2, 转小写。和 pick.ts 的 normCode 保持一致。 */
function normCode(code) {
    let out = (code || '').replace(/[-_\s]/g, '').toLowerCase();
    if (out.startsWith('fc2ppv')) {
        out = `fc2${out.slice(6)}`;
    }
    return out;
}

/** 接口全量 -> {番号: [ed2k]}, 别的字段一概不留。 */
function prune(data) {
    const out = {};
    for (const item of data?.items || []) {
        const links = (item?.links || []).filter(link => typeof link === 'string' && link.startsWith('ed2k://'));
        const code = normCode(item?.code);
        if (code && links.length) {
            out[code] = links;
        }
    }
    return out;
}

const cookie = arg('cookie') || process.env.LTX_COOKIE || '';
// 默认文件名和 jr_av.py 的 jr_ltx.json 保持一致, 两边可以互相替换
const out = arg('out', 'data/jr_ltx.json');

if (!cookie) {
    console.error('缺少 cookie。用法: node scripts/ltx-pull.mjs --cookie "<ltx_pass>"');
    process.exit(2);
}
if (!cookie.includes('ltx_pass=')) {
    console.error('cookie 里没有 ltx_pass, 只传 ltx_pass 的值即可, 例如: --cookie "b3be...rifE"');
    process.exit(2);
}

console.log('拉取', API);
const resp = await fetch(API, { headers: { Cookie: cookie, 'User-Agent': UA } });

if (resp.status === 403) {
    const body = await resp.text();
    console.error('403 —— cookie 过期或无效, 需要重新过一遍人机验证:');
    console.error('  https://ltx.libray.workers.dev/');
    console.error('  返回:', body.slice(0, 160));
    process.exit(3);
}
if (!resp.ok) {
    console.error(`请求失败 HTTP ${resp.status}: ${(await resp.text()).slice(0, 160)}`);
    process.exit(1);
}

const raw = await resp.text();
const table = prune(JSON.parse(raw));
const codes = Object.keys(table);
const links = codes.reduce((sum, code) => sum + table[code].length, 0);

if (!codes.length) {
    console.error('拉到了数据但一个 ed2k 都没有, 不覆盖旧文件。');
    process.exit(1);
}

// 先写临时文件再改名: 写一半断电不会留下半截 JSON
const target = path.resolve(out);
fs.mkdirSync(path.dirname(target), { recursive: true });
const tmp = `${target}.tmp`;
fs.writeFileSync(tmp, JSON.stringify(table), 'utf-8');
fs.renameSync(tmp, target);

console.log(`上游 ${(Buffer.byteLength(raw) / 1024).toFixed(0)} KB -> 裁剪后 ${(fs.statSync(target).size / 1024).toFixed(0)} KB`);
console.log(`番号 ${codes.length} 个, ed2k ${links} 条`);
console.log('已写入', target);
