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
or

```shell
pnpm install
pnpm run build:local
CONFIG_PATH=./config.json TOML_PATH=./wrangler.toml pnpm run start:dist
```


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
