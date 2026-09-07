// -- 通用配置 --
export class AgentShareConfig {
    // AI提供商: auto, openai
    AI_PROVIDER = 'auto';
    // AI图片提供商: auto, openai
    AI_IMAGE_PROVIDER = 'auto';
    // 全局默认初始化消息
    SYSTEM_INIT_MESSAGE: string | null = null;
    // DEPRECATED: 全局默认初始化消息角色, 废弃此选项
    // SYSTEM_INIT_MESSAGE_ROLE = 'system';
}

// -- Open AI 配置 --
export class OpenAIConfig {
    // OpenAI API Key
    OPENAI_API_KEY: string[] = [];
    // OpenAI的模型名称
    OPENAI_CHAT_MODEL = 'gpt-4o-mini';
    // OpenAI API BASE
    OPENAI_API_BASE = 'https://api.openai.com/v1';
    // OpenAI API Extra Params
    OPENAI_API_EXTRA_PARAMS: Record<string, any> = {};
    // OpenAI Chat Models List
    OPENAI_CHAT_MODELS_LIST = '';
    // 会话模式请求头名称，默认 X-Session-Id（针对基于会话维护上下文的 API）
    OPENAI_SESSION_HEADER = 'X-Session-Id';
    // 会话模式开关：开启后仅发送当前消息，靠 X-Session-Id 在服务端记住上下文
    OPENAI_SESSION_MODE = false;
}

// -- DALLE 配置 --
export class DallEConfig {
    // DALL-E的模型名称
    DALL_E_MODEL = 'dall-e-3';
    // DALL-E图片尺寸
    DALL_E_IMAGE_SIZE = '1024x1024';
    // DALL-E图片质量
    DALL_E_IMAGE_QUALITY = 'standard';
    // DALL-E图片风格
    DALL_E_IMAGE_STYLE = 'vivid';
    // DALL-E Models List
    DALL_E_MODELS_LIST = '["dall-e-3"]';
}

type UserConfig = AgentShareConfig & OpenAIConfig & DallEConfig;
export type AgentUserConfigKey = keyof UserConfig;

export class DefineKeys {
    DEFINE_KEYS: AgentUserConfigKey[] = [];
}

export type AgentUserConfig = Record<string, any> & DefineKeys & UserConfig;

// -- 只能通过环境变量覆盖的配置 --
export class EnvironmentConfig {
    // 多语言支持
    LANGUAGE = 'zh-cn';
    // 检查更新的分支
    UPDATE_BRANCH = 'master';
    // Chat Complete API Timeout (秒), 0 表示不限制。
    // 默认 60s 兜底: 上游偶发 hang(如模型抓取网页、图片视觉处理卡住)时避免消息永久停在占位符 '...'
    CHAT_COMPLETE_API_TIMEOUT = 60;

    // -- Telegram 相关 --
    //
    // Telegram API Domain
    TELEGRAM_API_DOMAIN = 'https://api.telegram.org';
    // 允许访问的Telegram Token， 设置时以逗号分隔
    TELEGRAM_AVAILABLE_TOKENS: string[] = [];
    // 默认消息模式 (HTML: LLM 返回的 markdown 转为 Telegram HTML 渲染)
    DEFAULT_PARSE_MODE = 'HTML';
    // 最小stream模式消息间隔，小于等于0则不限制
    TELEGRAM_MIN_STREAM_INTERVAL = 0;
    // 图片尺寸偏移 0为第一位，-1为最后一位, 越靠后的图片越大。PS: 图片过大可能导致token消耗过多，或者workers超时或内存不足
    // 默认选择次低质量的图片
    TELEGRAM_PHOTO_SIZE_OFFSET = 1;
    // 向LLM优先传递图片方式：url, base64
    TELEGRAM_IMAGE_TRANSFER_MODE = 'base64';
    // 带图片请求的首内容超时(秒): 超过此时限仍未收到任何有效内容, 判定上游模型不支持图片(如 gpt-free),
    // 自动降级为纯文字重试。0 表示不启用首内容超时降级。实测 gpt-free 处理图片首内容 3~45s 波动, 30s 为合理阈值。
    IMAGE_FIRST_TOKEN_TIMEOUT = 30;
    // 模型列表列数
    MODEL_LIST_COLUMNS = 1;

    // --  权限相关 --

    //
    // 允许所有人使用
    I_AM_A_GENEROUS_PERSON = false;
    // 白名单
    CHAT_WHITE_LIST: string[] = [];
    // 管理员用户 ID 白名单, 逗号分隔。仅这些用户可以执行设置类命令(/setenv 等, 切换模型)。
    // 为空时回退到群聊角色判断(群管理员/群主)。
    ADMIN_USER_IDS: string[] = [];
    // 用户配置
    LOCK_USER_CONFIG_KEYS: AgentUserConfigKey[] = [
        // 默认为API BASE 防止被替换导致token 泄露
        'OPENAI_API_BASE',
    ];

    // -- 群组相关 --
    //
    // 允许访问的Telegram Token 对应的Bot Name， 设置时以逗号分隔
    TELEGRAM_BOT_NAME: string[] = [];
    // 群组白名单
    CHAT_GROUP_WHITE_LIST: string[] = [];
    // 群组机器人开关
    GROUP_CHAT_BOT_ENABLE = true;
    // 群组机器人共享模式,关闭后，一个群组只有一个会话和配置。开启的话群组的每个人都有自己的会话上下文
    GROUP_CHAT_BOT_SHARE_MODE = true;
    // 群聊触发前缀: 群聊中以该前缀开头的消息会触发 bot 回复, 无需 @bot。
    // 前缀后跟空格或直接接内容均可, 例如 ".小助手 你好" / ".小助手你好" 均触发, 前缀本身不发给 LLM。
    // 设为空字符串则关闭前缀触发, 只保留 @bot / 回复 bot 触发。
    GROUP_TRIGGER_PREFIX = '.小助手';

    // -- 历史记录相关 --
    //
    // 为了避免4096字符限制，将消息删减
    AUTO_TRIM_HISTORY = true;
    // 最大历史记录长度
    MAX_HISTORY_LENGTH = 20;
    // 最大消息长度
    MAX_TOKEN_LENGTH = -1;
    // Image占位符: 当此环境变量存在时，则历史记录中的图片将被替换为此占位符
    HISTORY_IMAGE_PLACEHOLDER: string | null = null;

    // -- 特性开关 --
    //
    // 隐藏部分命令按钮
    HIDE_COMMAND_BUTTONS: string[] = [];
    // 显示快捷回复按钮
    SHOW_REPLY_BUTTON = false;
    // 额外引用消息开关
    EXTRA_MESSAGE_CONTEXT = false;
    // 额外引用多媒体消息特性: image
    EXTRA_MESSAGE_MEDIA_COMPATIBLE = ['image'];

    // -- 模式开关 --


    //
    // 使用流模式
    STREAM_MODE = true;
    // 安全模式
    SAFE_MODE = true;
    // 调试模式
    DEBUG_MODE = false;
    // 开发模式
    DEV_MODE = false;
}
