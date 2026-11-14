# 本地部署


## 配置

### 1. 服务器配置`CONFIG_PATH`

```json5
{
  "database": {
    "type": "local",// memory, local, sqlite, redis
    "path": "/app/data.json" // your database path
  },
  "server": { //  server configuration for webhook mode
    "hostname": "0.0.0.0",
    "port": 3000, // must 8787 when using docker
    "baseURL": "https://example.com"
  },
  'proxy': 'http://127.0.0.1:7890', // proxy for telegram api
  "mode": "webhook", // webhook, polling
}
```

> **会话模式 + 慢渠道提示**: 长轮询模式(`mode: polling`)下, LLM 请求不受 webhook 的 40s deadline 钳制(默认放宽到 120s 上限), 适配靠服务端会话重放历史、首字延迟较大的渠道。webhook 模式仍受 40s 钳制(为 Telegram webhook 60s 红线预留发送时间)。可用 `CHAT_COMPLETE_API_TIMEOUT` 环境变量进一步调整(设 0 = 用模式上限)。

### 2. toml 配置`TOML_PATH`
toml 内容与cloudflare workers配置文件兼容


## 本地运行

```shell
pnpm install
pnpm run start:local
```
或者

```shell
pnpm install
pnpm run build:local
CONFIG_PATH=./config.json TOML_PATH=./wrangler.toml pnpm run start:dist
```


## ed2k 索引（可选）

`/av` 卡片末尾的 ed2k 链接来自一个本地 JSON 文件，由 `AV_LTX_FILE` 指定：

```toml
# wrangler.toml
AV_LTX_FILE = "/app/data/jr_ltx.json"
```

文件名和格式与 `jr_av.py` 的 `jr_ltx.json` 一致（`{归一化番号: ["ed2k://..."]}`），两边的文件可以直接互换。

**更新方式**（ltx 站点需要人机验证，无法自动抓取）：

1. 浏览器打开 https://ltx.libray.workers.dev/ ，点一下「验证您是人」
2. F12 → Console 执行 `document.cookie`，复制 `ltx_pass=` 后面那串
3. 在**同一台机器**上运行：

   ```shell
   node scripts/ltx-pull.mjs --cookie "粘贴 ltx_pass 的值"
   ```

   默认输出 `data/jr_ltx.json`，可用 `--out` 指定别处。脚本遇到 403 会提示重新验证，不会覆盖旧文件。

4. 把生成的文件放到 `AV_LTX_FILE` 指向的位置，重启容器

> 验证 cookie 有效期约 7 天，且**不能跨 IP 使用**（多个 IP 共用会被服务端作废）。所以请在点验证的那台机器上抓取，只把生成的 JSON 传到服务器。

Docker 部署时需要把这个目录挂进容器，否则容器重建后文件就没了：

```shell
docker run -d -p 8787:8787 \
  -v $(pwd)/config.json:/app/config.json:ro \
  -v $(pwd)/wrangler.toml:/app/wrangler.toml:ro \
  -v $(pwd)/data:/app/data \
  chatgpt-telegram-workers:latest
```

未配置 `AV_LTX_FILE` 时 `/av` 一切正常，只是不带 ed2k 段。

## Docker 运行

### 1. 编译image

```bash
docker build -t chatgpt-telegram-workers:latest .
```
or
```shell
pnpm run build:docker # 更快(直接使用本地构建的结果创建镜像)
```

### 2. 运行容器

```bash
docker run -d -p 8787:8787 -v $(pwd)/config.json:/app/config.json:ro -v $(pwd)/wrangler.toml:/app/wrangler.toml:ro chatgpt-telegram-workers:latest
```


## docker-compose 运行

自行修改docker-compose.yml中的配置文件路径

```bash
docker-compose up # edit the docker-compose.yml to change the config file path
```


## 使用 GHCR 镜像 (GitHub Actions 构建)

镜像由 GitHub Actions 在每次 push 到 master 时自动构建并推送到 GHCR:

https://github.com/ibelieve3212/ChatGPT-Telegram-Workers/pkgs/container/chatgpt-telegram-workers

```shell
docker pull ghcr.io/ibelieve3212/chatgpt-telegram-workers:latest
docker run -d -p 8787:8787 -v $(pwd)/config.json:/app/config.json:ro -v $(pwd)/wrangler.toml:/app/wrangler.toml:ro ghcr.io/ibelieve3212/chatgpt-telegram-workers:latest
```
