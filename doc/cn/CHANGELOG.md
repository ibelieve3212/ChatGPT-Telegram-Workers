# 更新日志

- 未发布（本 fork）
  - 新增 `/av` 命令：从 javranking.cc 榜单随机推荐（年份/范围/题材筛选、番号或演员直查、`换一个`、`帮助`），带封面（剧透遮挡）、战力分、榜单战绩、中文剧情，ed2k 链接随包内置
  - 回复整条折叠：包一层 `<blockquote expandable>`，收起只露前 3 行（`EXPANDABLE_REPLY`，阈值 100 字符）
  - 表格转列表：避免 `<pre>` 阻断折叠，手机上更好读（`TABLE_AS_LIST`）
  - 代码块单独成条：正文得以折叠，代码以 reply 挂在下面（`SPLIT_CODE_BLOCK`）
  - 出处内联化：末尾"参考来源"清单改写成句末 `[1](网址)`，并清理重复裸网址、独占一行的角标、残留"来源："标签
  - 默认提示词改为结论先行 + 引用格式规范，四语言同步（`zh-hans`/`zh-hant`/`en`/`pt`）
  - 富文本模式默认关闭（`RICH_MESSAGE_MODE=false`）：群内客户端版本参差时旧客户端渲染不出来且服务端无法感知
  - 长消息按渲染后 HTML 实际长度拆分，避免 markdown→HTML 膨胀导致的 400；HTML 解析失败时先去折叠包裹重试
  - 引用块内实体嵌套审计：`<pre>` 不折叠、内层引用去标签、`<code>`/粗体/斜体/链接正常
- v1.10.7
  - 修复 `Groq` 名称拼写错误
  - 添加 `Xai` 独立Agent支持
  
- v1.10.6
  - 添加`DeepSeek` 和 `Groq`独立Agent支持

- v1.10.5
  - 添加`Telegram MarkdownV2`完整支持

- v1.10.0
  - 使用 InlineKeyboards 切换模型

- v1.9.0
  - 添加插件系统

- v1.8.0
  - 支持Cohere,Anthropic Ai
  - 支持图片输入
  - 适配群组话题模式
  - 移除role功能,使用自定义指令代替
  - 修复超长文本发送失败BUG

- v1.7.0
  - 修改 worker ai 调用方式为 api 调用，需要设置 account_id 和 token, 原有AI绑定方式失效
  - 添加 worker ai 文字对话流模式支持
  - 添加 worker ai 文字生成图片功能
  - 添加添加AI提供商切换功能
  - 添加自定义指令功能，可以实现快速模型切换
  - 添加锁定用户自定义配置功能

- v1.6.0
  - 添加workers ai支持,具体配置查看配置文档
  - 优化openai流模式解析器

- v1.5.0
  - perf: 调整命令顺序
  - perf: openai发送请求前前发送loading消息
  - feat: 添加流式输出支持。默认开启。使用`STREAM_MODE=false`关闭
  - feat: 增加对多个KEY的适配，随机选择KEY使用
  - feat: 增加快捷按钮 `/new`, `/redo`

- v1.4.0
  - 支持多平台部署
  - 添加`/redo`指令，重新发送或者修改上一条提问
  - 添加`/delenv`指令，删除环境变量恢复默认值
  - 添加多语言支持，使用`LANGUAGE`环境变量设置语言，目前支持`zh-CN`，`zh-TW`和`en`。默认为`zh-CN`。
  
- v1.3.1
    - 优化历史记录裁剪逻辑
    - 优化token计算逻辑
    - 修复edit消息的bug
    
- v1.3.0
    - 添加token使用统计指令`/usage`
    - 添加系统信息指令`/system`
    - 添加command菜单显示范围
    - 添加`SYSTEM_INIT_MESSAGE`环境变量
    - 添加`CHAT_MODEL`环境变量
    - 添加`Github Action`自动更新部署脚本
    - 优化`/init`页面 显示更多错误信息
    - 修复历史记录裁剪BUG
    - 修复`USER_CONFIG`加载异常BUG
    - 修复把错误信息存入历史记录BUG

- v1.2.0
    - 修复高危漏洞，必须更新
    
- v1.1.0
    - 由单文件改为多文件，方便维护，提供dist目录，方便复制粘贴。
    - 删除和新增部分配置，提供兼容性代码，方便升级。
    - 修改KV key生成逻辑，可能导致之前的数据丢失，可手动修改key或重新配置。
    - 修复部分bug
    - 自动绑定所有指令
    - BREAKING CHANGE： 重大改动，必须把群ID加到白名单`CHAT_GROUP_WHITE_LIST`才能使用, 否则任何人都可以把你的机器人加到群组中，然后消耗你的配额。

- v1.0.0
    - 初始版本
