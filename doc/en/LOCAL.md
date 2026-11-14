# Local deployment


## Configuration

### 1. Server Configuration`CONFIG_PATH`

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

> **Session-mode + slow-channel note**: In polling mode (`mode: polling`), LLM requests are NOT capped by the webhook 40s deadline (relaxed to a 120s cap by default), suiting channels that replay server-side session history and have large first-token latency. Webhook mode keeps the 40s cap (reserved for Telegram webhook 60s hard limit). Tune via the `CHAT_COMPLETE_API_TIMEOUT` env var (set 0 = use the mode cap).

### 2. TOML configuration`TOML_PATH`
The toml content is compatible with Cloudflare Workers configuration files.


## Local run

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


## ed2k index (optional)

The ed2k links at the bottom of the `/av` card come from a local JSON file pointed to by `AV_LTX_FILE`:

```toml
# wrangler.toml
AV_LTX_FILE = "/app/data/jr_ltx.json"
```

The file name and format match `jr_av.py`'s `jr_ltx.json` (`{normalized-code: ["ed2k://..."]}`), so the two are interchangeable.

**How to refresh** (the ltx site requires a human check, so it cannot be fetched automatically):

1. Open https://ltx.libray.workers.dev/ in a browser and tick "verify you are human"
2. F12 -> Console -> run `document.cookie`, copy the value after `ltx_pass=`
3. On the **same machine**, run:

   ```shell
   node scripts/ltx-pull.mjs --cookie "<paste ltx_pass here>"
   ```

   It writes `data/jr_ltx.json` by default (override with `--out`). On 403 it tells you to re-verify and never overwrites the old file.

4. Copy the generated file to the path in `AV_LTX_FILE` and restart the container

> The verification cookie lasts about 7 days and **must not be shared across IPs** (the server revokes it when several IPs use it). Fetch on the machine where you clicked, then only copy the resulting JSON to the server.

For Docker, mount that directory into the container or the file disappears when the container is recreated:

```shell
docker run -d -p 8787:8787 \
  -v $(pwd)/config.json:/app/config.json:ro \
  -v $(pwd)/wrangler.toml:/app/wrangler.toml:ro \
  -v $(pwd)/data:/app/data \
  chatgpt-telegram-workers:latest
```

With `AV_LTX_FILE` unset, `/av` works fine — the card simply has no ed2k section.

## Docker

### 1. Build image

```bash
docker build -t chatgpt-telegram-workers:latest .
```
or
```shell
pnpm run build:docker # Faster (directly use the locally built results to create the image)
```

### 2. Run container

```bash
docker run -d -p 8787:8787 -v $(pwd)/config.json:/app/config.json:ro -v $(pwd)/wrangler.toml:/app/wrangler.toml:ro chatgpt-telegram-workers:latest
```


## docker-compose

Edit docker-compose.yml to change the config file path

```bash
docker-compose up # edit the docker-compose.yml to change the config file path
```


## Use GHCR image (built by GitHub Actions)

The image is built and pushed to GHCR automatically by GitHub Actions on every push to master:

https://github.com/ibelieve3212/ChatGPT-Telegram-Workers/pkgs/container/chatgpt-telegram-workers

```shell
docker pull ghcr.io/ibelieve3212/chatgpt-telegram-workers:latest
docker run -d -p 8787:8787 -v $(pwd)/config.json:/app/config.json:ro -v $(pwd)/wrangler.toml:/app/wrangler.toml:ro ghcr.io/ibelieve3212/chatgpt-telegram-workers:latest
```
