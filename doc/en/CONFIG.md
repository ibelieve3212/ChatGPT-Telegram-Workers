# Configuration

It is recommended to fill in environment variables in the Workers configuration interface instead of directly modifying variables in the JS code.

## KV configuration

| KEY      | Description                                                                                                       |
|:---------|-------------------------------------------------------------------------------------------------------------------|
| DATABASE | First, create a KV. When creating it, the name can be arbitrary, but when binding it, it must be set as DATABASE. |

## System Configuration

The configuration that is common to each user can only be configured and filled in through the Workers configuration interface or toml, and it is not supported to modify it by sending messages through Telegram.

> `array string`:  An empty string in the array indicates that no value has been set. If a value needs to be set, it should be set as `'value1,value2'`, with multiple values separated by commas.

### Basic configuration

| KEY                       | Name                      | Default  | Description                               |
|---------------------------|---------------------------|----------|-------------------------------------------|
| LANGUAGE                  | Language                  | `zh-cn`  | Menu language                             |
| UPDATE_BRANCH             | Update branch             | `master` | Check the branch for updates              |
| CHAT_COMPLETE_API_TIMEOUT | Chat complete API timeout | `60`      | Timeout for AI conversation API (seconds). Default 60s guards against upstream hangs (e.g. model scraping web pages, image vision processing stuck) so messages won't stay on the `...` placeholder forever. |

### Telegram configuration

| KEY                       | Name                           | Default                                    | Description                                                                                                   |
|---------------------------|--------------------------------|--------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| TELEGRAM_API_DOMAIN       | Telegram API Domain            | `https://api.telegram.org/`                | Telegram API domain                                                                                           |
| TELEGRAM_AVAILABLE_TOKENS | Available Telegram tokens.     | `''`(array string)                         | Telegram Tokens allowed to access, separated by commas when setting.                                          |
| DEFAULT_PARSE_MODE        | Default parsing mode.          | `HTML`                                     | Default message parsing mode (LLM markdown is converted to Telegram HTML for rendering).                     |
| I_AM_A_GENEROUS_PERSON    | Allow everyone to use.         | `false`                                    | Is it allowed for everyone to use?                                                                            |
| CHAT_WHITE_LIST           | Chat whitelist                 | `''`(array string)                         | Allowed Chat ID Whitelist                                                                                     |
| ADMIN_USER_IDS            | Admin user IDs                 | `''`(array string)                         | Admin user ID whitelist (comma separated). Only these users can run setting commands (/setenv, /delenv, switch model, etc.) in private chat or groups. When empty, falls back to group administrator check. |
| LOCK_USER_CONFIG_KEYS     | Locked user configuration key. | `OPENAI_API_BASE` | Configuration key to prevent token leakage caused by replacement.                                             |
| TELEGRAM_BOT_NAME         | Telegram bot name              | `''`(array string)                         | The Bot Name corresponding to the Telegram Token that is allowed to access, separated by commas when setting. |
| CHAT_GROUP_WHITE_LIST     | Group whitelist                | `''`(array string)                         | Allowed group ID whitelist.                                                                                   |
| GROUP_CHAT_BOT_ENABLE     | Whether to enable group bots.  | `true`                                     | Whether to enable group robots.                                                                               |
| GROUP_CHAT_BOT_SHARE_MODE | Group robot sharing mode       | `true`                                     | After opening, people in the same group use the same chat context.                                            |
| GROUP_TRIGGER_PREFIX | Group trigger prefix          | `.小助手`                                    | Messages starting with this prefix trigger the bot reply in groups, no @bot needed. A space or content right after the prefix both work; the prefix itself is not sent to the LLM. Set to empty string to disable prefix triggering. |
| TELEGRAM_IMAGE_TRANSFER_MODE | Image transfer mode         | `base64`                                    | How images are sent to the LLM: `base64` (bot downloads and base64-encodes) or `url` (passes the image URL directly). In `base64` mode, large images are encoded in chunks, bypassing the Workers call-stack limit. |
| IMAGE_FIRST_TOKEN_TIMEOUT | Image first-token timeout     | `30`                                        | First-token timeout (seconds) for image-bearing requests: if no valid content is received within this limit, the upstream model is deemed unable to process images (e.g. gpt-free), and the request automatically falls back to a text-only retry. 0 disables the fallback. gpt-free image first-token times fluctuate 3~45s; 30s is a reasonable threshold. |

> IMPORTANT: You must add the group ID to the whitelist `CHAT_GROUP_WHITE_LIST` to use it, otherwise anyone can add your bot to the group and consume your quota.

> IMPORTANT: Due to Telegram's privacy and security policies, if your group is a public group or has more than 2000 members, please set the bot as an `administrator`, otherwise the bot will not respond to chat messages with `@bot`.

> IMPORTANT: You must set `/setprivacy` to `Disable` in `botfather`, otherwise the bot will not respond to chat messages with `@bot`.

#### Lock configuration `LOCK_USER_CONFIG_KEYS`

> IMPORTANT: If you encounter the error "Key XXX is locked", it means that your configuration is locked and needs to be unlocked before modification.

The default value of `LOCK_USER_CONFIG_KEYS` is `OPENAI_API_BASE`. To prevent admins from replacing the API BASE URL via `/setenv` and causing token leakage, `OPENAI_API_BASE` is locked by default. If you want to unlock it, remove it from `LOCK_USER_CONFIG_KEYS`.

### History configuration

| KEY                | Name                                  | Default      | Description                                                                        |
|--------------------|---------------------------------------|--------------|------------------------------------------------------------------------------------|
| AUTO_TRIM_HISTORY  | Automatic trimming of message history | `true`       | Automatically trim messages to avoid the 4096 character limit                      |
| MAX_HISTORY_LENGTH | Maximum length of message history     | `20`         | Maximum number of message history entries to keep                                  |
| MAX_TOKEN_LENGTH   | Maximum token length                  | `-1` (uncut) | At the current model price, it only requires trimming the number of message items. |

### Feature configuration

| KEY                   | Name                    | Default            | Description                                                 |
|-----------------------|-------------------------|--------------------|-------------------------------------------------------------|
| HIDE_COMMAND_BUTTONS  | Hide command buttons    | `''`(array string) | Need to re-initiate after modification                      |
| SHOW_REPLY_BUTTON     | Show quick reply button | `false`            | Whether to display the quick reply button                   |
| EXTRA_MESSAGE_CONTEXT | Extra message context   | `false`            | The referenced message will also be included in the context |
| STREAM_MODE           | Stream mode             | `true`             | Typewriter mode                                             |
| SAFE_MODE             | Safe mode               | `true`             | When enabled, the ID of the latest message will be saved    |
| DEBUG_MODE            | Debug mode              | `false`            | When enabled, the latest message will be saved              |
| DEV_MODE              | Development mode        | `false`            | When enabled, more debugging information will be displayed  |

## Global configuration

Configuration modified by admins via Telegram commands (`/setenv`, `/models`, `/imgmodels`, etc.) is stored in a **global KV key** (`global_config:{bot_id}`) and **shared across all private chats and group chats**. Regular users cannot view or modify these configs.

Environment variables (Workers config UI) serve as defaults; the global KV config has higher priority (overrides defaults). All `xxx_MODELS_LIST` can be a URL or a JSON array string.

### General configuration

| KEY                          | Name                                     | Default  | Description                                                                |
|------------------------------|------------------------------------------|----------|----------------------------------------------------------------------------|
| AI_PROVIDER                  | AI provider                              | `auto`   | Options `auto, openai` (this fork keeps only OpenAI-compatible format)     |
| AI_IMAGE_PROVIDER            | AI image provider                        | `auto`   | Options `auto, openai`                                                    |
| SYSTEM_INIT_MESSAGE          | Default initialization message.          | `null`   | Automatically select default values based on the bound language.           |
| ~~SYSTEM_INIT_MESSAGE_ROLE~~ | ~~Default initialization message role.~~ | `system` | Deprecated                                                                 |

### OpenAI-compatible channel (chat)

| KEY                     | Name                    | Default                     |
|-------------------------|-------------------------|-----------------------------|
| OPENAI_API_KEY          | OpenAI API Key          | `''`(array string)          |
| OPENAI_CHAT_MODEL       | OpenAI Model            | `gpt-4o-mini`               |
| OPENAI_API_BASE         | OpenAI API BASE         | `https://api.openai.com/v1` |
| OPENAI_API_EXTRA_PARAMS | OpenAI API Extra Params | `{}`                        |
| OPENAI_SESSION_HEADER  | Session request header name | `X-Session-Id`            | For session-based context APIs (e.g. some free proxies). When session mode is enabled, the derived session ID is sent as this header |
| OPENAI_SESSION_MODE    | OpenAI session mode switch | `false`                    | When enabled, only the current message is sent; the server maintains context via the session header (messages history is ignored) |
| OPENAI_CHAT_MODELS_LIST | List of OpenAI Models   | `''`                        |

> **Session mode note**: If your API server **ignores the `messages` history and maintains context only via a session ID** (e.g. some free/proxy APIs), set `OPENAI_SESSION_MODE` to `true`. The bot then sends only the current message and passes the session ID (the current chat/session KV key) via the `OPENAI_SESSION_HEADER` request header (default `X-Session-Id`), letting the server remember context.
>
> **Session isolation warning**: Even when `OPENAI_SESSION_MODE` is off, with `AI_PROVIDER=openai` the bot always sends an `X-Session-Id` request header valued `history:chat_id:bot_id` (unique per private chat, shared per group chat). If your API lumps all anonymous requests (those without an `X-Session-Id` header) into one global context, make sure this header is sent — otherwise different users will accidentally see each other's conversation content (i.e. session leakage).
> Keep `GROUP_CHAT_BOT_SHARE_MODE = true` (groups share one context) and personal session isolation so each session's ID stays unique and stable.

### Image generation channel (independent)

The image generation channel is configured **independently** from the chat channel and can point to a different API. The `/img` command is only enabled after `IMAGE_API_BASE` and `IMAGE_API_KEY` are configured; otherwise it reports that image is disabled.

| KEY                | Name           | Default         | Description                                      |
|--------------------|--------------|-------------|-----------------------------------------|
| IMAGE_API_BASE     | Image API Base | `''`        | Base URL of the image channel (e.g. `https://apihub.agnes-ai.com/v1`) |
| IMAGE_API_KEY      | Image API Key  | `null`      | API Key of the image channel                           |
| IMAGE_MODEL        | Image model name        | `''`        | Default image model (e.g. `agnes-image-2.5-flash`)      |
| IMAGE_MODELS_LIST  | Image model list        | `''`        | Model list switchable via `/imgmodels`. When empty, automatically splices `${IMAGE_API_BASE}/models` to fetch all upstream models (unfiltered, you must pick image models yourself); can also be a URL or JSON array |
| IMAGE_SIZE         | Image size         | `1024x1024` | Generated image size                                 |


## Command

| Command    | Description                                                             | Example                                                           |
|:-----------|:------------------------------------------------------------------------|:------------------------------------------------------------------|
| `/help`    | Get command help.                                                       | `/help`                                                           |
| `/new`     | Initiate a new conversation.                                            | `/new`                                                            |
| `/start`   | Get your ID and start a new conversation.                               | `/start`                                                          |
| `/chat`    | Chat directly with the bot (use the rest of the command as the message).| `/chat hello`                                                     |
| `/img`     | Generate an image (all users, auto-enabled after image channel is configured). | `/img image description`                                         |
| `.生图`     | Chinese alias for `/img`, same function (not in menu, type manually to trigger). | `.生图 image description`                                         |
| `/clear`   | Clear bot replies (admin/group admin)                                  | Reply to a bot message and send `/clear` to remove its whole split group; or `/clear N` to clear the last N messages; `/clear all` to clear all. |
| `/version` | Get the current version number and determine if an update is needed (admin menu). | `/version`                                                        |
| `/setenv`  | Set global config (admin only), see `Global configuration` for details.           | `/setenv KEY=VALUE`                               |
| `/setenvs` | Batch set global config (admin only), see `Global configuration`. | `/setenvs {"KEY1": "VALUE1", "KEY2": "VALUE2"}`             |
| `/delenv`  | Delete global config (admin only).                                 | `/delenv KEY`                                                     |
| `/clearenv`| Clear all global config (admin only).                            | `/clearenv`                                                       |
| `/system`  | View some current system information (admin menu).                      | `/system`                                                         |
| `/models`  | View/switch chat model (admin only)             | `/models` After that, select the model through the built-in menu. |
| `/imgmodels`  | View/switch image model (admin only)             | `/imgmodels` After that, select the model through the built-in menu. |
| `/echo`    | Echo message JSON (admin only, for debugging).                       | `/echo`                                                           |

> **Permission note**: When `ADMIN_USER_IDS` is set, setting commands (`/setenv` `/setenvs` `/delenv` `/clearenv`) and `/version` `/system` `/models` `/imgmodels` `/echo` are only allowed for users in the `ADMIN_USER_IDS` whitelist (applies to both private chat and groups, manual input is still auth-checked). When not configured, groups fall back to group admin/owner check, private chat is denied.
>
> **Command menu (Plan B)**: Group chats show no slash-command menus at all (all slash commands need to be typed manually or used via inline buttons). In private chats, regular users see the regular command menu (`/help` `/new` `/start` `/clear` `/img` etc.); after a whitelisted user sends a message in a private chat, the bot automatically sets a complete menu (including admin commands) for that user via `BotCommandScopeChat`, so only whitelisted users see admin commands like `/setenv`, `/system`, `/models`, `/imgmodels`, `/echo`.

## Custom command

In addition to the commands defined by the system, you can also customize shortcut commands, which can simplify some longer commands into a single word command.

Custom commands use environment variables to set `CUSTOM_COMMAND_XXX`, where XXX is the command name, such as `CUSTOM_COMMAND_gpt4`, and the value is the command content, such as `/setenvs {"OPENAI_CHAT_MODEL": "gpt-4"}`. This allows you to use `/gpt4` instead of `/setenvs {"OPENAI_CHAT_MODEL": "gpt-4"}` to quickly switch models.

Here are some examples of custom commands.

| Command                | Value                                                                                                             |
|------------------------|-------------------------------------------------------------------------------------------------------------------|
| CUSTOM_COMMAND_gpt3    | `/setenvs {"OPENAI_CHAT_MODEL": "gpt-3.5-turbo"}`                                        |
| CUSTOM_COMMAND_gpt4    | `/setenvs {"OPENAI_CHAT_MODEL": "gpt-4"}`                                                |
| CUSTOM_COMMAND_cn2en   | `/setenvs {"SYSTEM_INIT_MESSAGE": "You are a translator. Please translate everything I say below into English."}` |

If you are using TOML for configuration, you can use the following method:

```toml
CUSTOM_COMMAND_gpt3 = '/setenvs {"AI_PROVIDER": "openai", "OPENAI_CHAT_MODEL": "gpt-3.5-turbo"}'
CUSTOM_COMMAND_gpt4 = '/setenvs {"AI_PROVIDER": "openai", "OPENAI_CHAT_MODEL": "gpt-4"}'
CUSTOM_COMMAND_cn2en = '/setenvs {"SYSTEM_INIT_MESSAGE": "You are a translator. Please translate everything I say below into English."}'
```

## Custom commands description

If you want to add help information for a custom command, you can use environment variables to set `COMMAND_DESCRIPTION_XXX`, where `XXX` is the name of the command, such as `COMMAND_DESCRIPTION_gpt4`, and the value is the description of the command, such as `Switch model to GPT-4`. This way, you can use `/help` to view the help information for the custom command.

The following are some examples of custom command help information.

| Command                     | Value                                            |
|-----------------------------|--------------------------------------------------|
| COMMAND_DESCRIPTION_gpt3    | Switch model to OpenAI GPT-3.5 Turbo.      |
| COMMAND_DESCRIPTION_gpt4    | Switch model to OpenAI GPT-4.              |
| COMMAND_DESCRIPTION_cn2en   | Translate the conversation content into English. |

If you are using TOML for configuration, you can use the following method:

```toml
COMMAND_DESCRIPTION_gpt3 = 'Switch model to OpenAI GPT-3.5 Turbo.'
COMMAND_DESCRIPTION_gpt4 = 'Switch model to OpenAI GPT-4.'
COMMAND_DESCRIPTION_cn2en = 'Translate the conversation content into English.'
```

If you want to bind custom commands to the menu of Telegram, you can add the following environment variable `COMMAND_SCOPE_gpt4 = "all_private_chats,all_group_chats,all_chat_administrators"`, so that the plugin will take effect in all private chats, group chats and groups.

### Config generation function
```js
function stringify(obj) {
	const res = {}
	for(const key of Object.keys(obj)) {
		res[key] = JSON.stringify(obj[key])
	}
	return JSON.stringify(res)
}

console.log(`/setenvs ${stringify(
	{
		"AI_PROVIDER": "openai",
		"OPENAI_CHAT_MODELS_LIST": ["gpt4", "gpt3", "gpt2", "gpt1"]
	}
)}`)

// output: /setenvs {"AI_PROVIDER":"\"openai\"","OPENAI_CHAT_MODELS_LIST":"[\"gpt4\",\"gpt3\",\"gpt2\",\"gpt1\"]"}
```

## Model List

Supports using the `/models` (chat models) and `/imgmodels` (image models) commands to get a list of supported models and switching between them via menu selections.
The supported configuration items for the models list are of type URL or json array. If it is a URL, the list of models will be requested automatically, if it is a json array, the array will be used directly.
When the model list configuration is empty, the URL for fetching the model list will be automatically spliced according to its base api by default.

| Type | Configuration Key | Automatically generated value                      |
|------|---------------------|-------------------------------|
| Chat model | OPENAI_CHAT_MODELS_LIST | `${OPENAI_API_BASE}/models`  |
| Image model | IMAGE_MODELS_LIST   | `${IMAGE_API_BASE}/models` (auto-spliced when empty, unfiltered, pick image models yourself)   |
