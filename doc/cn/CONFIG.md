# 配置

推荐在Workers配置界面填写环境变量， 而不是直接修改js代码中的变量

## KV配置

| KEY      | 特殊说明                                 |
|:---------|--------------------------------------|
| DATABASE | 先新建KV，新建的时候名字随意，然后绑定的时候必须设定为DATABASE |

## 系统配置

为每个用户通用的配置，只能在Workers配置界面或者toml中配置填写，不支持通过Telegram发送消息来修改。

> `array string`: 数组为空字符串，表示没有设置值，如果需要设置值，设置为`'value1,value2'`，多个值用逗号分隔。

### 基础配置

| KEY                       | 名称        | 默认值      | 描述              |
|---------------------------|-----------|----------|-----------------|
| LANGUAGE                  | 语言        | `zh-cn`  | 设置语言            |
| UPDATE_BRANCH             | 更新分支      | `master` | 检查更新的分支         |
| CHAT_COMPLETE_API_TIMEOUT | 聊天完成API超时 | `60`      | 同步 webhook 的配置上限（秒）；实际 LLM 阶段最多使用 40 秒，为 Telegram 发送及返回响应预留时间 |
| CHAT_FIRST_TOKEN_TIMEOUT | 文字首内容超时 | `15`      | 纯文字请求等待首个有效内容的秒数 |
| OPTIONAL_IMAGE_FIRST_TOKEN_TIMEOUT | 可选图片首内容超时 | `10`      | 图片非必需时等待首个有效内容的秒数，超时后去图重试 |
| CHAT_STREAM_IDLE_TIMEOUT | 流式空闲超时 | `15`      | 开始输出后连续无有效活动的秒数；每次有效活动都会重置 |

### Telegram配置

| KEY                       | 名称             | 默认值                         | 描述                                      |
|---------------------------|----------------|-----------------------------|-----------------------------------------|
| TELEGRAM_API_DOMAIN       | Telegram API域名 | `https://api.telegram.org/` | Telegram API的域名                         |
| TELEGRAM_AVAILABLE_TOKENS | 可用的Telegram令牌  | `''`(array string)          | 允许访问的Telegram Token，设置时以逗号分隔            |
| DEFAULT_PARSE_MODE        | 默认解析模式         | `HTML`                      | 默认消息解析模式(LLM 返回的 markdown 转为 Telegram HTML 渲染) |
| I_AM_A_GENEROUS_PERSON    | 允许所有人使用        | `false`                     | 是否允许所有人使用                               |
| CHAT_WHITE_LIST           | 聊天白名单          | `''`(array string)          | 允许使用的聊天ID白名单                            |
| ADMIN_USER_IDS            | 管理员用户ID          | `''`(array string)          | 管理员用户ID白名单(逗号分隔)。仅这些用户可在私聊/群聊中执行设置类命令(/setenv、/delenv、切换模型等)。为空时回退到群管理器判断。 |
| LOCK_USER_CONFIG_KEYS     | 锁定的用户配置键       | 默认值为 `OPENAI_API_BASE`        | 防止被替换导致token泄露的配置键                      |
| TELEGRAM_BOT_NAME         | Telegram机器人名称  | `''`(array string)          | 允许访问的Telegram Token对应的Bot Name，设置时以逗号分隔 |
| CHAT_GROUP_WHITE_LIST     | 群组白名单          | `''`(array string)          | 允许使用的群组ID白名单                            |
| GROUP_CHAT_BOT_ENABLE     | 群组机器人开关        | `true`                      | 是否启用群组机器人                               |
| GROUP_CHAT_BOT_SHARE_MODE | 群组机器人共享模式      | `true`                      | 开启后同个群组的人使用同一个聊天上下文                     |
| GROUP_TRIGGER_PREFIX | 群聊触发前缀          | `.小助手`                     | 群聊中以该前缀开头的消息会触发 bot 回复, 无需 @bot。前缀后跟空格或直接接内容均可, 前缀本身不发给 LLM。设为空字符串关闭前缀触发 |
| TELEGRAM_IMAGE_TRANSFER_MODE | 图片传输模式          | `base64`                    | 向 LLM 传输图片的方式: `base64`(bot 下载图片转 base64 发送) 或 `url`(直接传图片 URL)。`base64` 模式下大图片会自动分块编码, 不受 Workers 调用栈限制 |
| IMAGE_FIRST_TOKEN_TIMEOUT | 必需图片首内容超时    | `30`                        | 用户明确要求识图/OCR 或消息只有图片时，等待视觉模型首个有效内容的秒数；超时后直接报错，不进行纯文字降级 |

> IMPORTANT: 必须把群ID加到白名单`CHAT_GROUP_WHITE_LIST`才能使用, 否则任何人都可以把你的机器人加到群组中，然后消耗你的配额。

> IMPORTANT: 受限TG的隐私安全策略，如果你的群组是公开群组或超过2000人，请将机器人设置为`管理员`，否则机器人无法响应`@机器人`的聊天消息。

> IMPORTANT: 必须在botfather中设置`/setprivacy`为`Disable`，否则机器人无法响应`@机器人`的聊天消息。

#### 锁定配置 `LOCK_USER_CONFIG_KEYS`

> IMPORTANT: 如果你遇到`Key XXX is locked`的错误，说明你的配置被锁定了，需要解锁才能修改。

`LOCK_USER_CONFIG_KEYS`的默认值为 `OPENAI_API_BASE`。为了防止管理员通过 `/setenv` 替换 API BASE URL 导致 token 泄露，默认锁定 `OPENAI_API_BASE`。如果你想解锁，可以将其从`LOCK_USER_CONFIG_KEYS`中删除。

### 历史记录配置

| KEY                | 名称       | 默认值       | 描述                  |
|--------------------|----------|-----------|---------------------|
| AUTO_TRIM_HISTORY  | 自动裁剪历史记录 | `true`    | 为避免4096字符限制，自动裁剪消息  |
| MAX_HISTORY_LENGTH | 最大历史记录长度 | `20`      | 保留的最大历史记录条数         |
| MAX_TOKEN_LENGTH   | 最大令牌长度   | `-1`（不裁剪） | 以现在模型的价格只需要裁剪消息条数即可 |

### 特性开关

| KEY                   | 名称       | 默认值                | 描述              |
|-----------------------|----------|--------------------|-----------------|
| HIDE_COMMAND_BUTTONS  | 隐藏命令按钮   | `''`(array string) | 修改后需要重新init     |
| SHOW_REPLY_BUTTON     | 显示快捷回复按钮 | `false`            | 是否显示快捷回复按钮      |
| EXTRA_MESSAGE_CONTEXT | 额外消息上下文  | `false`            | 引用的消息也会假如上下文    |
| STREAM_MODE           | 流模式      | `true`             | 打字机模式           |
| SAFE_MODE             | 安全模式     | `true`             | 开启后会保存最新一条消息的ID |
| DEBUG_MODE            | 调试模式     | `false`            | 开启后会保存最新一条消息    |
| DEV_MODE              | 开发模式     | `false`            | 开启后会展示更多调试信息    |

## 全局配置

管理员通过 Telegram 命令(`/setenv`、`/models`、`/imgmodels` 等)修改的配置，存储在**全局 KV key**(`global_config:{bot_id}`)中，**所有私聊和群聊共享同一份配置**。普通用户无法查看或修改这些配置。

环境变量(Workers 配置界面)作为默认值，全局 KV 的配置优先级更高(覆盖默认值)。所有 `xxx_MODELS_LIST` 可以是一个 URL 或一个 JSON 数组字符串。

### 通用配置

| KEY                          | 名称              | 默认值      | 描述                                                                     |
|------------------------------|-----------------|----------|------------------------------------------------------------------------|
| AI_PROVIDER                  | AI提供商           | `auto`   | 可选值 `auto, openai`（本 fork 仅保留 OpenAI 兼容格式） |
| AI_IMAGE_PROVIDER            | AI图片提供商         | `auto`   | 可选值 `auto, openai` |
| SYSTEM_INIT_MESSAGE          | 全局默认初始化消息       | `null`   | 根据绑定的语言自动选择默认值                                                         |
| ~~SYSTEM_INIT_MESSAGE_ROLE~~ | ~~全局默认初始化消息角色~~ | `system` | 废弃                                                                     |

### OpenAI 兼容渠道(聊天)

| KEY                     | 名称                      | 默认值                         |
|-------------------------|-------------------------|-----------------------------|
| OPENAI_API_KEY          | OpenAI API Key          | `''`(array string)          |
| OPENAI_CHAT_MODEL       | OpenAI的模型名称             | `gpt-4o-mini`               |
| OPENAI_API_BASE         | OpenAI API BASE         | `https://api.openai.com/v1` |
| OPENAI_API_EXTRA_PARAMS | OpenAI API Extra Params | `{}`                        |
| OPENAI_SESSION_HEADER  | 会话模式请求头名称  | `X-Session-Id`                  | 针对基于会话维护上下文的 API（如某些免费代理），开启会话模式后会把派生出的会话 ID 放入此作为请求头 |
| OPENAI_SESSION_MODE    | OpenAI 会话模式开关  | `false`                        | 开启后仅发送当前一条消息，靠上述请求头在服务端维护上下文（会忽略 messages 历史） |
| OPENAI_CHAT_MODELS_LIST | OpenAI 模型列表             | `''`                        |

> **会话模式说明**: 如果你使用的 API 服务端**忽略 `messages` 历史、只靠会话 ID 维护上下文**（例如某些免费/代理 API），请将 `OPENAI_SESSION_MODE` 设为 `true`。此时 bot 只发送当前一条消息，并通过 `OPENAI_SESSION_HEADER`（默认 `X-Session-Id`）请求头把会话 ID（即当前聊天/会话的 KV key）传给服务端，由服务端记住上下文。
>
> **会话隔离警告**: 即使不开启 `OPENAI_SESSION_MODE`，使用 `AI_PROVIDER=openai` 时 bot 也总会发送 `X-Session-Id` 请求头（值为 `history:chat_id:bot_id`，私聊每用户唯一、群聊共享上下文）。**如果你的 API 在未收到 `X-Session-Id` 请求头时会把所有匿名请求归入同一个全局上下文，那么务必保持该请求头被发送**——否则不同用户之间会互相看到对方的对话内容（即会话泄漏）。
> 对应地请保持 `GROUP_CHAT_BOT_SHARE_MODE = true`（群聊共享一个上下文）与个人会话隔离设置，确保每个会话的 ID 唯一稳定。

### 生图渠道(独立配置)

生图渠道与聊天渠道**独立配置**，可以指向不同的 API。仅配置了 `IMAGE_API_BASE` 和 `IMAGE_API_KEY` 后 `/img` 命令才会自动启用，否则提示未配置。

| KEY                | 名称           | 默认值         | 描述                                      |
|--------------------|--------------|-------------|-----------------------------------------|
| IMAGE_API_BASE     | 生图渠道 API Base | `''`        | 生图渠道的基础 URL（如 `https://apihub.agnes-ai.com/v1`） |
| IMAGE_API_KEY      | 生图渠道 API Key  | `null`      | 生图渠道的 API Key                           |
| IMAGE_MODEL        | 生图模型名称        | `''`        | 默认生图模型（如 `agnes-image-2.5-flash`）      |
| IMAGE_MODELS_LIST  | 生图模型列表        | `''`        | 管理员可通过 `/imgmodels` 切换的模型列表。留空时自动拼接 `${IMAGE_API_BASE}/models` 拉取上游全部模型（不过滤，需自行选择生图模型）；也可填 URL 或 JSON 数组 |
| IMAGE_SIZE         | 图片尺寸         | `1024x1024` | 生成图片的尺寸                                 |


## 支持命令

| 命令         | 说明                  | 示例                                              |
|:-----------|:--------------------|:------------------------------------------------|
| `/help`    | 获取命令帮助              | `/help`                                         |
| `/new`     | 发起新的对话              | `/new`                                          |
| `/start`   | 获取你的ID，并发起新的对话      | `/start`                                        |
| `/chat`    | 直接与bot对话(把命令后的内容当聊天内容) | `/chat 你好`                             |
| `/img`     | 生成一张图片(所有用户可用, 配置生图渠道后自动启用)   | `/img 图片描述`                                |
| `.生图`     | `/img` 的中文别名, 功能一致(不进菜单, 私聊手打触发)  | `.生图 图片描述`                                     |
| `/clear`   | 清理 bot 回复(管理员/群管理员)   | 回复某条 bot 回复后发 `/clear` 删除整组拆分消息; 或 `/clear N` 清理最近 N 条; `/clear all` 全部清理 |
| `/version` | 获取当前版本号，判断是否需要更新(管理员菜单)    | `/version`                                      |
| `/setenv`  | 设置全局配置(仅管理员), 详情见`全局配置`   | `/setenv KEY=VALUE`                    |
| `/setenvs` | 批量设置全局配置(仅管理员), 详情见`全局配置` | `/setenvs {"KEY1": "VALUE1", "KEY2": "VALUE2"}` |
| `/delenv`  | 删除全局配置(仅管理员)              | `/delenv KEY`                                   |
| `/clearenv`| 清除所有全局配置(仅管理员)            | `/clearenv`                                     |
| `/system`  | 查看当前一些系统信息(管理员菜单)          | `/system`                                       |
| `/models`  | 查看/切换聊天模型(仅管理员)              | `/models` 后通过内置菜单选择模型                           |
| `/imgmodels`  | 查看/切换生图模型(仅管理员)              | `/imgmodels` 后通过内置菜单选择模型                           |
| `/echo`    | 回显消息 JSON(仅管理员, 调试用)        | `/echo`                                         |

> **权限说明**: 启用 `ADMIN_USER_IDS` 后, 设置类命令(`/setenv` `/setenvs` `/delenv` `/clearenv`)和 `/version` `/system` `/models` `/imgmodels` `/echo` 仅 `ADMIN_USER_IDS` 白名单内的用户可执行(私聊/群聊均生效, 手动输入仍受鉴权)。未配置 `ADMIN_USER_IDS` 时, 群聊回退到群管理员/群主判断, 私聊禁止。
>
> **命令菜单(方案B)**: 群聊中不显示任何斜杠命令菜单(所有斜杠命令均需手动输入或通过内联按钮使用)。私聊中普通用户可见普通命令菜单(`/help` `/new` `/start` `/clear` `/img` 等); 当白名单用户在私聊发送消息后, bot 会自动通过 `BotCommandScopeChat` 为该用户设置包含管理命令的完整菜单, 因此只有白名单用户能看到 `/setenv`、`/system`、`/models`、`/imgmodels`、`/echo` 等管理命令。

## 自定义命令

除了上述系统定义的指令，你也可以自定义快捷指令， 可以将某些较长的指令简化为一个单词的指令。

自定义指令使用环境变量设置 `CUSTOM_COMMAND_XXX`，其中XXX为指令名，比如`CUSTOM_COMMAND_gpt4`，值为指令内容，比如`/setenvs {"OPENAI_CHAT_MODEL": "gpt-4"}`。 这样就可以使用`/gpt4`来代替`/setenvs {"OPENAI_CHAT_MODEL": "gpt-4"}`实现快速切换模型。

下面是一些自定义指令例子

| 指令                     | 值                                                                          |
|------------------------|----------------------------------------------------------------------------|
| CUSTOM_COMMAND_gpt3    | `/setenvs {"OPENAI_CHAT_MODEL": "gpt-3.5-turbo"}` |
| CUSTOM_COMMAND_gpt4    | `/setenvs {"OPENAI_CHAT_MODEL": "gpt-4"}`         |
| CUSTOM_COMMAND_cn2en   | `/setenvs {"SYSTEM_INIT_MESSAGE": "你是一个翻译下面将我说的话都翻译成英文"}`                  |

如果你是用toml进行配置，可以使用下面的方式：

```toml
CUSTOM_COMMAND_gpt3 = '/setenvs {"AI_PROVIDER": "openai", "OPENAI_CHAT_MODEL": "gpt-3.5-turbo"}'
CUSTOM_COMMAND_gpt4 = '/setenvs {"AI_PROVIDER": "openai", "OPENAI_CHAT_MODEL": "gpt-4"}'
CUSTOM_COMMAND_cn2en = '/setenvs {"SYSTEM_INIT_MESSAGE": "你是一个翻译下面将我说的话都翻译成英文"}'
```

## 自定义指令帮助信息

如果你想为自定义指令添加帮助信息，可以使用环境变量设置 `COMMAND_DESCRIPTION_XXX`，其中`XXX`为指令名，比如`COMMAND_DESCRIPTION_gpt4`，值为指令描述，比如`切换模型为GPT-4`。 这样就可以使用`/help`查看到自定义指令的帮助信息。

下面是一些自定义指令帮助信息例子

| 指令描述                        | 描述                           |
|-----------------------------|------------------------------|
| COMMAND_DESCRIPTION_gpt3    | 切换模型为GPT-3.5 Turbo |
| COMMAND_DESCRIPTION_gpt4    | 切换模型为GPT-4         |
| COMMAND_DESCRIPTION_cn2en   | 将对话内容翻译成英文                   |

如果你是用toml进行配置，可以使用下面的方式：

```toml
COMMAND_DESCRIPTION_gpt3 = '切换模型为GPT-3.5 Turbo'
COMMAND_DESCRIPTION_gpt4 = '切换模型为GPT-4'
COMMAND_DESCRIPTION_cn2en = '将对话内容翻译成英文'
```

如果你想将自定义命令绑定到telegram的菜单中，你可以添加如下环境变量`COMMAND_SCOPE_azure = "all_private_chats,all_group_chats,all_chat_administrators"`，这样插件就会在所有的私聊，群聊和群组中生效。

### 生成辅助函数
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

## 模型列表

支持使用 `/models`（聊天模型）和 `/imgmodels`（生图模型）命令获取支持的模型列表，并通过菜单选择切换。
模型列表配置项可以是 URL 或 json 数组。 如果是 URL，会自动请求获取模型列表，如果是 json 数组，会直接使用该数组。
当配置项为空时，会自动根据其 base api 拼接获取模型列表的 URL。

| 类型   | 配置项                 | 自动拼接生成的值                      |
|------|---------------------|-------------------------------|
| 聊天模型 | OPENAI_CHAT_MODELS_LIST | `${OPENAI_API_BASE}/models`  |
| 生图模型 | IMAGE_MODELS_LIST   | `${IMAGE_API_BASE}/models`（留空时自动拼接，不过滤，需自行选择生图模型）   |
