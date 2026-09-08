class AgentShareConfig {
  AI_PROVIDER = "auto";
  AI_IMAGE_PROVIDER = "auto";
  SYSTEM_INIT_MESSAGE = null;
}
class OpenAIConfig {
  OPENAI_API_KEY = [];
  OPENAI_CHAT_MODEL = "gpt-4o-mini";
  OPENAI_API_BASE = "https://api.openai.com/v1";
  OPENAI_API_EXTRA_PARAMS = {};
  OPENAI_CHAT_MODELS_LIST = "";
  OPENAI_SESSION_HEADER = "X-Session-Id";
  OPENAI_SESSION_MODE = false;
}
class ImageGenConfig {
  IMAGE_API_BASE = "";
  IMAGE_API_KEY = null;
  IMAGE_MODEL = "";
  IMAGE_MODELS_LIST = "";
  IMAGE_SIZE = "1024x1024";
}
class DefineKeys {
  DEFINE_KEYS = [];
}
class EnvironmentConfig {
  LANGUAGE = "zh-cn";
  UPDATE_BRANCH = "master";
  CHAT_COMPLETE_API_TIMEOUT = 60;
  TELEGRAM_API_DOMAIN = "https://api.telegram.org";
  TELEGRAM_AVAILABLE_TOKENS = [];
  DEFAULT_PARSE_MODE = "HTML";
  TELEGRAM_MIN_STREAM_INTERVAL = 0;
  TELEGRAM_PHOTO_SIZE_OFFSET = 1;
  TELEGRAM_IMAGE_TRANSFER_MODE = "base64";
  IMAGE_FIRST_TOKEN_TIMEOUT = 30;
  MODEL_LIST_COLUMNS = 1;
  I_AM_A_GENEROUS_PERSON = false;
  CHAT_WHITE_LIST = [];
  ADMIN_USER_IDS = [];
  LOCK_USER_CONFIG_KEYS = [
    "OPENAI_API_BASE"
  ];
  TELEGRAM_BOT_NAME = [];
  CHAT_GROUP_WHITE_LIST = [];
  GROUP_CHAT_BOT_ENABLE = true;
  GROUP_CHAT_BOT_SHARE_MODE = true;
  GROUP_TRIGGER_PREFIX = ".小助手";
  AUTO_TRIM_HISTORY = true;
  MAX_HISTORY_LENGTH = 20;
  MAX_TOKEN_LENGTH = -1;
  HISTORY_IMAGE_PLACEHOLDER = null;
  HIDE_COMMAND_BUTTONS = [];
  SHOW_REPLY_BUTTON = false;
  EXTRA_MESSAGE_CONTEXT = false;
  EXTRA_MESSAGE_MEDIA_COMPATIBLE = ["image"];
  STREAM_MODE = true;
  SAFE_MODE = true;
  DEBUG_MODE = false;
  DEV_MODE = false;
}
const en = { "env": { "system_init_message": "You are a helpful assistant" }, "command": { "help": { "summary": "The following commands are currently supported:\n", "help": "Get command help", "new": "Start a new conversation", "start": "Get your ID and start a new conversation", "chat": "Chat directly with the bot, usage: /chat your message", "img": "Generate an image, the complete command format is `/img image description`, for example `/img beach at moonlight`", "version": "Get the current version number to determine whether to update", "setenv": "Set user configuration, the complete command format is /setenv KEY=VALUE", "setenvs": 'Batch set user configurations, the full format of the command is /setenvs {"KEY1": "VALUE1", "KEY2": "VALUE2"}', "delenv": "Delete user configuration, the complete command format is /delenv KEY", "clearenv": "Clear all user configuration", "system": "View some system information", "echo": "Echo the message", "models": "switch chat model", "imgmodels": "switch image generation model", "clear": "clear bot replies. Reply to a bot message and send /clear, or /clear N / /clear all" }, "new": { "new_chat_start": "A new conversation has started" } }, "callback_query": { "open_model_list": "Open models list", "select_provider": "Select a provider:", "select_model": "Choose model:", "change_model": "Change model to " } };
const pt = { "env": { "system_init_message": "Você é um assistente útil" }, "command": { "help": { "summary": "Os seguintes comandos são suportados atualmente:\n", "help": "Obter ajuda sobre comandos", "new": "Iniciar uma nova conversa", "start": "Obter seu ID e iniciar uma nova conversa", "img": "Gerar uma imagem, o formato completo do comando é `/img descrição da imagem`, por exemplo `/img praia ao luar`", "version": "Obter o número da versão atual para determinar se é necessário atualizar", "setenv": "Definir configuração do usuário, o formato completo do comando é /setenv CHAVE=VALOR", "setenvs": 'Definir configurações do usuário em lote, o formato completo do comando é /setenvs {"CHAVE1": "VALOR1", "CHAVE2": "VALOR2"}', "delenv": "Excluir configuração do usuário, o formato completo do comando é /delenv CHAVE", "clearenv": "Limpar todas as configurações do usuário", "system": "Ver algumas informações do sistema", "echo": "Repetir a mensagem", "models": "Mudar o modelo de diálogo", "imgmodels": "Mudar o modelo de geração de imagem", "clear": "limpar respostas do bot. Responda a uma mensagem do bot e envie /clear, ou /clear N / /clear all", "chat": "Converse diretamente com o bot, uso: /chat sua mensagem" }, "new": { "new_chat_start": "Uma nova conversa foi iniciada" } }, "callback_query": { "open_model_list": "Abra a lista de modelos", "select_provider": "Escolha um fornecedor de modelos.:", "select_model": "Escolha um modelo:", "change_model": "O modelo de diálogo já foi modificado para" } };
const zhHans = { "env": { "system_init_message": "你是一个得力的助手" }, "command": { "help": { "summary": "当前支持以下命令:\n", "help": "获取命令帮助", "new": "发起新的对话", "start": "获取你的ID, 并发起新的对话", "chat": "直接与bot对话, 用法: /chat 你的消息", "img": "生成一张图片, 命令完整格式为 `/img 图片描述`, 例如`/img 月光下的沙滩`", "生图": "生成一张图片, 命令完整格式为 `.生图 图片描述`, 例如`.生图 月光下的沙滩`", "version": "获取当前版本号, 判断是否需要更新", "setenv": "设置用户配置，命令完整格式为 /setenv KEY=VALUE", "setenvs": '批量设置用户配置, 命令完整格式为 /setenvs {"KEY1": "VALUE1", "KEY2": "VALUE2"}', "delenv": "删除用户配置，命令完整格式为 /delenv KEY", "clearenv": "清除所有用户配置", "system": "查看当前一些系统信息", "echo": "回显消息", "models": "切换对话模型", "imgmodels": "切换生图模型", "clear": "清理bot回复, 用法: 回复某条回复后发 /clear, 或 /clear N / /clear all" }, "new": { "new_chat_start": "新的对话已经开始" } }, "callback_query": { "open_model_list": "打开模型列表", "select_provider": "选择一个模型提供商:", "select_model": "选择一个模型:", "change_model": "对话模型已修改至" } };
const zhHant = { "env": { "system_init_message": "你是一個得力的助手" }, "command": { "help": { "summary": "當前支持的命令如下：\n", "help": "獲取命令幫助", "new": "開始一個新對話", "start": "獲取您的ID並開始一個新對話", "chat": "直接與bot對話, 用法: /chat 你的訊息", "img": "生成圖片，完整命令格式為`/img 圖片描述`，例如`/img 海灘月光`", "生图": "生成圖片，完整命令格式為`.生图 圖片描述`，例如`.生图 海灘月光`", "version": "獲取當前版本號確認是否需要更新", "setenv": "設置用戶配置，完整命令格式為/setenv KEY=VALUE", "setenvs": '批量設置用户配置, 命令完整格式為 /setenvs {"KEY1": "VALUE1", "KEY2": "VALUE2"}', "delenv": "刪除用戶配置，完整命令格式為/delenv KEY", "clearenv": "清除所有用戶配置", "system": "查看一些系統信息", "echo": "回显消息", "models": "切換對話模式", "imgmodels": "切換生圖模型", "clear": "清理bot回覆, 用法: 回覆某條回覆後發 /clear, 或 /clear N / /clear all" }, "new": { "new_chat_start": "開始一個新對話" } }, "callback_query": { "open_model_list": "打開模型清單", "select_provider": "選擇一個模型供應商:", "select_model": "選擇一個模型:", "change_model": "對話模型已經修改至" } };
function loadI18n(lang) {
  switch (lang?.toLowerCase()) {
    case "cn":
    case "zh-cn":
    case "zh-hans":
      return zhHans;
    case "zh-tw":
    case "zh-hk":
    case "zh-mo":
    case "zh-hant":
      return zhHant;
    case "pt":
    case "pt-br":
      return pt;
    case "en":
    case "en-us":
      return en;
    default:
      return en;
  }
}
class ConfigMerger {
  static parseArray(raw) {
    raw = raw.trim();
    if (raw === "") {
      return [];
    }
    let list;
    if (raw.startsWith("[") && raw.endsWith("]")) {
      try {
        list = JSON.parse(raw);
      } catch (e) {
        list = raw.slice(1, -1).split(",");
      }
    } else {
      list = raw.split(",");
    }
    return list.map((item) => `${item}`.trim().replace(/^['"]+|['"]+$/g, ""));
  }
  static trim(source, lock) {
    const config = { ...source };
    const keysSet = new Set(source?.DEFINE_KEYS || []);
    for (const key of lock) {
      keysSet.delete(key);
    }
    keysSet.add("DEFINE_KEYS");
    for (const key of Object.keys(config)) {
      if (!keysSet.has(key)) {
        delete config[key];
      }
    }
    return config;
  }
  static merge(target, source, exclude) {
    const sourceKeys = new Set(Object.keys(source));
    for (const key of Object.keys(target)) {
      if (!sourceKeys.has(key)) {
        continue;
      }
      if (exclude && exclude.includes(key)) {
        continue;
      }
      const t = target[key] !== null && target[key] !== void 0 ? typeof target[key] : "string";
      if (typeof source[key] !== "string") {
        target[key] = source[key];
        continue;
      }
      switch (t) {
        case "number":
          target[key] = Number.parseInt(source[key], 10);
          break;
        case "boolean":
          target[key] = (source[key] || "false") === "true";
          break;
        case "string":
          target[key] = source[key];
          break;
        case "object":
          if (Array.isArray(target[key])) {
            target[key] = ConfigMerger.parseArray(source[key]);
          } else {
            try {
              target[key] = JSON.parse(source[key]);
            } catch (e) {
              console.error(e);
            }
          }
          break;
        default:
          target[key] = source[key];
          break;
      }
    }
  }
}
const BUILD_TIMESTAMP = 1788881444;
const BUILD_VERSION = "bdbb4f0";
function createAgentUserConfig() {
  return Object.assign(
    {},
    new DefineKeys(),
    new AgentShareConfig(),
    new OpenAIConfig(),
    new ImageGenConfig()
  );
}
function fixApiBase(base) {
  return base.replace(/\/+$/, "");
}
const ENV_KEY_MAPPER = {
  CHAT_MODEL: "OPENAI_CHAT_MODEL",
  API_KEY: "OPENAI_API_KEY"
};
class Environment extends EnvironmentConfig {
  BUILD_TIMESTAMP = BUILD_TIMESTAMP;
  BUILD_VERSION = BUILD_VERSION;
  I18N = loadI18n();
  PLUGINS_ENV = {};
  USER_CONFIG = createAgentUserConfig();
  CUSTOM_COMMAND = {};
  PLUGINS_COMMAND = {};
  AI_BINDING = null;
  API_GUARD = null;
  DATABASE = null;
  CUSTOM_MESSAGE_RENDER = null;
  constructor() {
    super();
    this.merge = this.merge.bind(this);
  }
  merge(source) {
    this.AI_BINDING = source.AI;
    this.DATABASE = source.DATABASE;
    this.API_GUARD = source.API_GUARD;
    this.mergeCommands(
      "CUSTOM_COMMAND_",
      "COMMAND_DESCRIPTION_",
      "COMMAND_SCOPE_",
      source,
      this.CUSTOM_COMMAND
    );
    this.mergeCommands(
      "PLUGIN_COMMAND_",
      "PLUGIN_DESCRIPTION_",
      "PLUGIN_SCOPE_",
      source,
      this.PLUGINS_COMMAND
    );
    const pluginEnvPrefix = "PLUGIN_ENV_";
    for (const key of Object.keys(source)) {
      if (key.startsWith(pluginEnvPrefix)) {
        const plugin = key.substring(pluginEnvPrefix.length);
        this.PLUGINS_ENV[plugin] = source[key];
      }
    }
    ConfigMerger.merge(this, source, [
      "BUILD_TIMESTAMP",
      "BUILD_VERSION",
      "I18N",
      "PLUGINS_ENV",
      "USER_CONFIG",
      "CUSTOM_COMMAND",
      "PLUGINS_COMMAND",
      "DATABASE",
      "API_GUARD"
    ]);
    ConfigMerger.merge(this.USER_CONFIG, source);
    this.migrateOldEnv(source);
    this.fixAgentUserConfigApiBase();
    this.USER_CONFIG.DEFINE_KEYS = [];
    this.I18N = loadI18n(this.LANGUAGE.toLowerCase());
  }
  mergeCommands(prefix, descriptionPrefix, scopePrefix, source, target) {
    for (const key of Object.keys(source)) {
      if (key.startsWith(prefix)) {
        const cmd = key.substring(prefix.length);
        target[`/${cmd}`] = {
          value: source[key],
          description: source[`${descriptionPrefix}${cmd}`],
          scope: source[`${scopePrefix}${cmd}`]?.split(",").map((s) => s.trim())
        };
      }
    }
  }
  migrateOldEnv(source) {
    if (source.TELEGRAM_TOKEN && !this.TELEGRAM_AVAILABLE_TOKENS.includes(source.TELEGRAM_TOKEN)) {
      if (source.BOT_NAME && this.TELEGRAM_AVAILABLE_TOKENS.length === this.TELEGRAM_BOT_NAME.length) {
        this.TELEGRAM_BOT_NAME.push(source.BOT_NAME);
      }
      this.TELEGRAM_AVAILABLE_TOKENS.push(source.TELEGRAM_TOKEN);
    }
    if (source.OPENAI_API_DOMAIN && !this.USER_CONFIG.OPENAI_API_BASE) {
      this.USER_CONFIG.OPENAI_API_BASE = `${source.OPENAI_API_DOMAIN}/v1`;
    }
    if (source.API_KEY && this.USER_CONFIG.OPENAI_API_KEY.length === 0) {
      this.USER_CONFIG.OPENAI_API_KEY = source.API_KEY.split(",");
    }
    if (source.CHAT_MODEL && !this.USER_CONFIG.OPENAI_CHAT_MODEL) {
      this.USER_CONFIG.OPENAI_CHAT_MODEL = source.CHAT_MODEL;
    }
  }
  fixAgentUserConfigApiBase() {
    const keys = [
      "OPENAI_API_BASE"
    ];
    for (const key of keys) {
      const base = this.USER_CONFIG[key];
      if (this.USER_CONFIG[key] && typeof base === "string") {
        this.USER_CONFIG[key] = fixApiBase(base);
      }
    }
    this.TELEGRAM_API_DOMAIN = fixApiBase(this.TELEGRAM_API_DOMAIN);
  }
}
const ENV = new Environment();
class ShareContext {
  botId;
  botToken;
  botName = null;
  chatHistoryKey;
  lastMessageKey;
  configStoreKey;
  groupAdminsKey;
  constructor(token, update) {
    const botId = Number.parseInt(token.split(":")[0]);
    const telegramIndex = ENV.TELEGRAM_AVAILABLE_TOKENS.indexOf(token);
    if (telegramIndex === -1) {
      throw new Error("Token not allowed");
    }
    if (ENV.TELEGRAM_BOT_NAME.length > telegramIndex) {
      this.botName = ENV.TELEGRAM_BOT_NAME[telegramIndex];
    }
    this.botToken = token;
    this.botId = botId;
    const id = update.chatID;
    if (id === void 0 || id === null) {
      throw new Error("Chat id not found");
    }
    let historyKey = `history:${id}`;
    let configStoreKey = `global_config`;
    if (botId) {
      historyKey += `:${botId}`;
      configStoreKey += `:${botId}`;
    }
    switch (update.chatType) {
      case "group":
      case "supergroup":
        if (!ENV.GROUP_CHAT_BOT_SHARE_MODE && update.fromUserID) {
          historyKey += `:${update.fromUserID}`;
        }
        this.groupAdminsKey = `group_admin:${id}`;
        break;
    }
    if (update.isForum && update.isTopicMessage) {
      if (update.messageThreadID) {
        historyKey += `:${update.messageThreadID}`;
      }
    }
    this.chatHistoryKey = historyKey;
    this.lastMessageKey = `last_message_id:${historyKey}`;
    this.configStoreKey = configStoreKey;
  }
}
class WorkerContext {
  USER_CONFIG;
  SHARE_CONTEXT;
  constructor(USER_CONFIG, SHARE_CONTEXT) {
    this.USER_CONFIG = USER_CONFIG;
    this.SHARE_CONTEXT = SHARE_CONTEXT;
    this.execChangeAndSave = this.execChangeAndSave.bind(this);
  }
  static async from(token, update) {
    const context = new UpdateContext(update);
    if (context.chatID === void 0) {
      return null;
    }
    const SHARE_CONTEXT = new ShareContext(token, context);
    const USER_CONFIG = Object.assign({}, ENV.USER_CONFIG);
    try {
      const userConfig = JSON.parse(await ENV.DATABASE.get(SHARE_CONTEXT.configStoreKey));
      ConfigMerger.merge(USER_CONFIG, ConfigMerger.trim(userConfig, ENV.LOCK_USER_CONFIG_KEYS) || {});
    } catch (e) {
      console.warn(e);
    }
    return new WorkerContext(USER_CONFIG, SHARE_CONTEXT);
  }
  async execChangeAndSave(values) {
    for (const ent of Object.entries(values || {})) {
      let [key, value] = ent;
      key = ENV_KEY_MAPPER[key] || key;
      if (ENV.LOCK_USER_CONFIG_KEYS.includes(key)) {
        throw new Error(`Key ${key} is locked`);
      }
      const configKeys = Object.keys(this.USER_CONFIG || {}) || [];
      if (!configKeys.includes(key)) {
        throw new Error(`Key ${key} is not allowed`);
      }
      this.USER_CONFIG.DEFINE_KEYS.push(key);
      ConfigMerger.merge(this.USER_CONFIG, {
        [key]: value
      });
      console.log("Update user config: ", key, this.USER_CONFIG[key]);
    }
    this.USER_CONFIG.DEFINE_KEYS = Array.from(new Set(this.USER_CONFIG.DEFINE_KEYS));
    await ENV.DATABASE.put(
      this.SHARE_CONTEXT.configStoreKey,
      JSON.stringify(ConfigMerger.trim(this.USER_CONFIG, ENV.LOCK_USER_CONFIG_KEYS))
    );
  }
}
class UpdateContext {
  fromUserID;
  chatID;
  chatType;
  isForum;
  isTopicMessage;
  messageThreadID;
  constructor(update) {
    if (update.message) {
      this.fromUserID = update.message.from?.id;
      this.chatID = update.message.chat.id;
      this.chatType = update.message.chat.type;
      this.isForum = update.message.chat.is_forum;
      this.isTopicMessage = update.message.is_topic_message;
      this.messageThreadID = update.message.message_thread_id;
    } else if (update.callback_query) {
      this.fromUserID = update.callback_query.from.id;
      this.chatID = update.callback_query.message?.chat.id;
      this.chatType = update.callback_query.message?.chat.type;
      this.isForum = update.callback_query.message?.chat.is_forum;
    } else {
      console.log("[diag] UpdateContext: 非消息/回调类型 update, 跳过");
    }
  }
}
class APIClientBase {
  token;
  baseURL = ENV.TELEGRAM_API_DOMAIN;
  constructor(token, baseURL) {
    this.token = token;
    if (baseURL) {
      this.baseURL = baseURL.replace(/\/+$/, "");
    }
    this.request = this.request.bind(this);
    this.requestJSON = this.requestJSON.bind(this);
  }
  uri(method) {
    return `${this.baseURL}/bot${this.token}/${method}`;
  }
  jsonRequest(method, params) {
    return fetch(this.uri(method), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    });
  }
  formDataRequest(method, params) {
    const formData = new FormData();
    for (const key in params) {
      const value = params[key];
      if (value instanceof File) {
        formData.append(key, value, value.name);
      } else if (value instanceof Blob) {
        formData.append(key, value, "blob");
      } else if (typeof value === "string") {
        formData.append(key, value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    }
    return fetch(this.uri(method), {
      method: "POST",
      body: formData
    });
  }
  request(method, params) {
    for (const key in params) {
      if (params[key] instanceof File || params[key] instanceof Blob) {
        return this.formDataRequest(method, params);
      }
    }
    return this.jsonRequest(method, params);
  }
  async requestJSON(method, params) {
    return this.request(method, params).then((res) => res.json());
  }
}
function createTelegramBotAPI(token) {
  const client = new APIClientBase(token);
  return new Proxy(client, {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      }
      return (...args) => {
        if (typeof prop === "string" && prop.endsWith("WithReturns")) {
          const method = prop.slice(0, -11);
          return Reflect.apply(target.requestJSON, target, [method, ...args]);
        }
        return Reflect.apply(target.request, target, [prop, ...args]);
      };
    }
  });
}
const ADMIN_AUTH_MARK = "admin_only";
const ANONYMOUS_ADMIN_BOT_ID = 1087968824;
function isAnonymousAdminMessage(speakerId, chatType) {
  return speakerId === ANONYMOUS_ADMIN_BOT_ID && isGroupChat(chatType);
}
function isAdminUserId(speakerId) {
  const admins = ENV.ADMIN_USER_IDS;
  if (!admins || admins.length === 0) {
    return null;
  }
  if (speakerId == null) {
    return false;
  }
  return admins.includes(`${speakerId}`);
}
const TELEGRAM_AUTH_CHECKER = {
  adminOnly(chatType) {
    return [ADMIN_AUTH_MARK];
  }
};
function isGroupChat(type) {
  return type === "group" || type === "supergroup";
}
function checkMention(content, entities, botName, botId) {
  let isMention = false;
  for (const entity of entities) {
    const entityStr = content.slice(entity.offset, entity.offset + entity.length);
    switch (entity.type) {
      case "mention":
        if (entityStr === `@${botName}`) {
          isMention = true;
          content = content.slice(0, entity.offset) + content.slice(entity.offset + entity.length);
        }
        break;
      case "text_mention":
        if (`${entity.user?.id}` === `${botId}`) {
          isMention = true;
          content = content.slice(0, entity.offset) + content.slice(entity.offset + entity.length);
        }
        break;
      case "bot_command":
        if (entityStr.endsWith(`@${botName}`)) {
          isMention = true;
          const newEntityStr = entityStr.replace(`@${botName}`, "");
          content = content.slice(0, entity.offset) + newEntityStr + content.slice(entity.offset + entity.length);
        }
        break;
    }
  }
  return {
    isMention,
    content
  };
}
function checkPrefix(content, prefix) {
  if (!prefix || !content.startsWith(prefix)) {
    return { isTrigger: false, content };
  }
  const rest = content.slice(prefix.length).trimStart();
  return { isTrigger: true, content: rest };
}
class GroupMention {
  handle = async (message, context) => {
    if (!isGroupChat(message.chat.type)) {
      return null;
    }
    console.log("[diag] GroupMention 进入:", { chatId: message.chat.id, msgId: message.message_id, text: message.text?.slice(0, 50) });
    const replyMe = `${message.reply_to_message?.from?.id}` === `${context.SHARE_CONTEXT.botId}`;
    if (replyMe) {
      console.log("[diag] GroupMention 放行: 回复 bot 消息");
      return null;
    }
    const entities = message.text ? message.entities : message.caption ? message.caption_entities : null;
    if (entities?.some((e) => e.type === "bot_command")) {
      console.log("[diag] GroupMention 放行: bot_command");
      return null;
    }
    if (message.text?.startsWith(".生图") || message.caption?.startsWith(".生图")) {
      console.log("[diag] GroupMention 放行: .生图 命令");
      return null;
    }
    let botName = context.SHARE_CONTEXT.botName;
    console.log("[diag] GroupMention botName(初始):", botName);
    if (!botName) {
      console.log("[diag] GroupMention botName 未初始化, 调 getMe 获取");
      const res = await createTelegramBotAPI(context.SHARE_CONTEXT.botToken).getMeWithReturns();
      botName = res.result.username || null;
      context.SHARE_CONTEXT.botName = botName;
      console.log("[diag] GroupMention botName(getMe 后):", botName);
    }
    if (!botName) {
      throw new Error("Not set bot name");
    }
    let isMention = false;
    if (message.text && message.entities) {
      const res = checkMention(message.text, message.entities, botName, context.SHARE_CONTEXT.botId);
      isMention = res.isMention;
      message.text = res.content.trim();
      console.log("[diag] GroupMention text@检测:", { isMention, text: message.text?.slice(0, 50) });
    }
    if (message.caption && message.caption_entities) {
      const res = checkMention(message.caption, message.caption_entities, botName, context.SHARE_CONTEXT.botId);
      isMention = res.isMention || isMention;
      message.caption = res.content.trim();
      console.log("[diag] GroupMention caption@检测:", { isMention, caption: message.caption?.slice(0, 50) });
    }
    if (!isMention && ENV.GROUP_TRIGGER_PREFIX) {
      if (message.text) {
        const res = checkPrefix(message.text, ENV.GROUP_TRIGGER_PREFIX);
        if (res.isTrigger) {
          if (res.content || message.reply_to_message) {
            isMention = true;
            message.text = res.content;
          }
        }
      }
      if (!isMention && message.caption) {
        const res = checkPrefix(message.caption, ENV.GROUP_TRIGGER_PREFIX);
        if (res.isTrigger) {
          if (res.content || message.reply_to_message) {
            isMention = true;
            message.caption = res.content;
          }
        }
      }
    }
    if (!isMention) {
      console.log("[diag] GroupMention 未命中 @bot, 抛 Not mention");
      throw new Error("Not mention");
    }
    console.log("[diag] GroupMention 命中触发, 放行 -> 下一个");
    return null;
  };
}
const INTERPOLATE_LOOP_REGEXP = /\{\{#each(?::(\w+))?\s+(\w+)\s+in\s+([\w.[\]]+)\}\}([\s\S]*?)\{\{\/each(?::\1)?\}\}/g;
const INTERPOLATE_CONDITION_REGEXP = /\{\{#if(?::(\w+))?\s+([\w.[\]]+)\}\}([\s\S]*?)(?:\{\{#else(?::\1)?\}\}([\s\S]*?))?\{\{\/if(?::\1)?\}\}/g;
const INTERPOLATE_VARIABLE_REGEXP = /\{\{([\w.[\]]+)\}\}/g;
function evaluateExpression(expr, localData) {
  if (expr === ".") {
    return localData["."] ?? localData;
  }
  try {
    return expr.split(".").reduce((value, key) => {
      if (key.includes("[") && key.includes("]")) {
        const [arrayKey, indexStr] = key.split("[");
        const indexExpr = indexStr.slice(0, -1);
        let index = Number.parseInt(indexExpr, 10);
        if (Number.isNaN(index)) {
          index = evaluateExpression(indexExpr, localData);
        }
        return value?.[arrayKey]?.[index];
      }
      return value?.[key];
    }, localData);
  } catch (error) {
    console.error(`Error evaluating expression: ${expr}`, error);
    return void 0;
  }
}
function interpolate(template, data, formatter) {
  const processConditional = (condition, trueBlock, falseBlock, localData) => {
    const result = evaluateExpression(condition, localData);
    return result ? trueBlock : falseBlock || "";
  };
  const processLoop = (itemName, arrayExpr, loopContent, localData) => {
    const array = evaluateExpression(arrayExpr, localData);
    if (!Array.isArray(array)) {
      console.warn(`Expression "${arrayExpr}" did not evaluate to an array`);
      return "";
    }
    return array.map((item) => {
      const itemData = { ...localData, [itemName]: item, ".": item };
      return interpolate(loopContent, itemData);
    }).join("");
  };
  const processTemplate = (tmpl, localData) => {
    tmpl = tmpl.replace(INTERPOLATE_LOOP_REGEXP, (_, alias, itemName, arrayExpr, loopContent) => processLoop(itemName, arrayExpr, loopContent, localData));
    tmpl = tmpl.replace(INTERPOLATE_CONDITION_REGEXP, (_, alias, condition, trueBlock, falseBlock) => processConditional(condition, trueBlock, falseBlock, localData));
    return tmpl.replace(INTERPOLATE_VARIABLE_REGEXP, (_, expr) => {
      const value = evaluateExpression(expr, localData);
      if (value === void 0) {
        return `{{${expr}}}`;
      }
      if (formatter) {
        return formatter(value);
      }
      return String(value);
    });
  };
  return processTemplate(template, data);
}
function interpolateObject(obj, data) {
  if (obj === null || obj === void 0) {
    return null;
  }
  if (typeof obj === "string") {
    return interpolate(obj, data);
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => interpolateObject(item, data));
  }
  if (typeof obj === "object") {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = interpolateObject(value, data);
    }
    return result;
  }
  return obj;
}
async function executeRequest(template, data) {
  const urlRaw = interpolate(template.url, data, encodeURIComponent);
  const url = new URL(urlRaw);
  if (template.query) {
    for (const [key, value] of Object.entries(template.query)) {
      url.searchParams.append(key, interpolate(value, data));
    }
  }
  const method = template.method;
  const headers = Object.fromEntries(
    Object.entries(template.headers || {}).map(([key, value]) => {
      return [key, interpolate(value, data)];
    })
  );
  for (const key of Object.keys(headers)) {
    if (headers[key] === null) {
      delete headers[key];
    }
  }
  let body = null;
  if (template.body) {
    if (template.body.type === "json") {
      body = JSON.stringify(interpolateObject(template.body.content, data));
    } else if (template.body.type === "form") {
      body = new URLSearchParams();
      for (const [key, value] of Object.entries(template.body.content)) {
        body.append(key, interpolate(value, data));
      }
    } else {
      body = interpolate(template.body.content, data);
    }
  }
  const response = await fetch(url, {
    method,
    headers,
    body
  });
  const renderOutput = async (type, temple, response2) => {
    switch (type) {
      case "text":
        return interpolate(temple, await response2.text());
      case "blob":
        throw new Error("Invalid output type");
      case "json":
      default:
        return interpolate(temple, await response2.json());
    }
  };
  if (!response.ok) {
    const content2 = await renderOutput(template.response?.error?.input_type, template.response.error?.output, response);
    return {
      type: template.response.error.output_type,
      content: content2
    };
  }
  if (template.response.content.input_type === "blob") {
    if (template.response.content.output_type !== "image") {
      throw new Error("Invalid output type");
    }
    return {
      type: "image",
      content: await response.blob()
    };
  }
  const content = await renderOutput(template.response.content?.input_type, template.response.content?.output, response);
  return {
    type: template.response.content.output_type,
    content
  };
}
function formatInput(input, type) {
  if (type === "json") {
    return JSON.parse(input);
  } else if (type === "space-separated") {
    return input.trim().split(" ").filter(Boolean);
  } else if (type === "comma-separated") {
    return input.split(",").map((item) => item.trim()).filter(Boolean);
  } else {
    return input;
  }
}
function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeHtmlForCode(text) {
  return escapeHtml(text);
}
function renderInline(text) {
  let result = text;
  const codeSegments = [];
  result = result.replace(/`([^`]+)`/g, (_match, code) => {
    const placeholder = `\0CODE${codeSegments.length}\0`;
    codeSegments.push(`<code>${escapeHtmlForCode(code)}</code>`);
    return placeholder;
  });
  result = result.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    (_match, linkText, url) => {
      return `<a href="${url}">${linkText}</a>`;
    }
  );
  result = result.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
  result = result.replace(/__([^_]+)__/g, "<b>$1</b>");
  result = result.replace(/~~([^~]+)~~/g, "<s>$1</s>");
  result = result.replace(/(^|[^*])\*([^*]+)\*/g, "$1<i>$2</i>");
  result = result.replace(/(^|[^_])_([^_]+)_/g, "$1<i>$2</i>");
  result = result.replace(/\x00CODE(\d+)\x00/g, (_match, idx) => {
    return codeSegments[Number.parseInt(idx, 10)] || "";
  });
  return result;
}
function processInlineLine(line) {
  return renderInline(escapeHtml(line));
}
function isHeading(line) {
  const match = line.match(/^(#{1,6})\s+(.+)$/);
  if (match) {
    return { level: match[1].length, text: match[2].trim() };
  }
  return null;
}
function isUnorderedList(line) {
  const match = line.match(/^(\s*)([-*+])\s+(.+)$/);
  if (match) {
    return { text: match[3], indent: match[1].length };
  }
  return null;
}
function isOrderedList(line) {
  const match = line.match(/^(\s*)(\d+)\.\s+(.+)$/);
  if (match) {
    return { num: match[2], text: match[3], indent: match[1].length };
  }
  return null;
}
function isBlockquote(line) {
  const match = line.match(/^>\s?(.*)$/);
  if (match) {
    return { text: match[1] };
  }
  return null;
}
function isDivider(line) {
  return /^([-*_])\1{2,}\s*$/.test(line);
}
function markdownToHtml(markdown) {
  const lines = markdown.split("\n");
  const output = [];
  let i = 0;
  let inCodeBlock = false;
  let codeBlockLang = "";
  let codeBlockLines = [];
  let inBlockquote = false;
  let blockquoteLines = [];
  const flushBlockquote = () => {
    if (inBlockquote) {
      const content = blockquoteLines.map((l) => processInlineLine(l)).join("\n");
      output.push(`<blockquote>${content}</blockquote>`);
      inBlockquote = false;
      blockquoteLines = [];
    }
  };
  while (i < lines.length) {
    const line = lines[i];
    const codeBlockStart = line.match(/^```(\w*)\s*$/);
    if (codeBlockStart) {
      if (inCodeBlock) {
        const code = codeBlockLines.join("\n");
        if (codeBlockLang) {
          output.push(`<pre><code class="language-${codeBlockLang}">${escapeHtmlForCode(code)}</code></pre>`);
        } else {
          output.push(`<pre><code>${escapeHtmlForCode(code)}</code></pre>`);
        }
        inCodeBlock = false;
        codeBlockLang = "";
        codeBlockLines = [];
        i++;
        continue;
      } else {
        flushBlockquote();
        inCodeBlock = true;
        codeBlockLang = codeBlockStart[1] || "";
        codeBlockLines = [];
        i++;
        continue;
      }
    }
    if (inCodeBlock) {
      codeBlockLines.push(line);
      i++;
      continue;
    }
    if (isDivider(line)) {
      flushBlockquote();
      output.push("");
      i++;
      continue;
    }
    const heading = isHeading(line);
    if (heading) {
      flushBlockquote();
      output.push(`<b>${processInlineLine(heading.text)}</b>`);
      i++;
      continue;
    }
    const blockquote = isBlockquote(line);
    if (blockquote) {
      inBlockquote = true;
      blockquoteLines.push(blockquote.text);
      i++;
      continue;
    } else if (inBlockquote) {
      flushBlockquote();
    }
    const ulItem = isUnorderedList(line);
    if (ulItem) {
      const indent = "  ".repeat(Math.floor(ulItem.indent / 2));
      output.push(`${indent}• ${processInlineLine(ulItem.text)}`);
      i++;
      continue;
    }
    const olItem = isOrderedList(line);
    if (olItem) {
      const indent = "  ".repeat(Math.floor(olItem.indent / 2));
      output.push(`${indent}${olItem.num}. ${processInlineLine(olItem.text)}`);
      i++;
      continue;
    }
    flushBlockquote();
    output.push(processInlineLine(line));
    i++;
  }
  if (inCodeBlock && codeBlockLines.length > 0) {
    const code = codeBlockLines.join("\n");
    if (codeBlockLang) {
      output.push(`<pre><code class="language-${codeBlockLang}">${escapeHtmlForCode(code)}</code></pre>`);
    } else {
      output.push(`<pre><code>${escapeHtmlForCode(code)}</code></pre>`);
    }
  }
  if (inBlockquote) {
    flushBlockquote();
  }
  return output.join("\n");
}
class MessageContext {
  chat_id;
  message_id = null;
  reply_to_message_id = null;
  parse_mode = null;
  allow_sending_without_reply = null;
  disable_web_page_preview = null;
  constructor(chatID) {
    this.chat_id = chatID;
  }
  static fromMessage(message) {
    const ctx = new MessageContext(message.chat.id);
    if (message.chat.type === "group" || message.chat.type === "supergroup") {
      ctx.reply_to_message_id = message.message_id;
      ctx.allow_sending_without_reply = true;
    } else {
      ctx.reply_to_message_id = null;
    }
    return ctx;
  }
  static fromCallbackQuery(callbackQuery) {
    const chat = callbackQuery.message?.chat;
    if (!chat) {
      throw new Error("Chat not found");
    }
    const ctx = new MessageContext(chat.id);
    if (chat.type === "group" || chat.type === "supergroup") {
      ctx.reply_to_message_id = callbackQuery.message.message_id;
      ctx.allow_sending_without_reply = true;
    } else {
      ctx.reply_to_message_id = null;
    }
    return ctx;
  }
}
class MessageSender {
  api;
  context;
  sentMessageIds = [];
  constructor(token, context) {
    this.api = createTelegramBotAPI(token);
    this.context = context;
    this.sendRichText = this.sendRichText.bind(this);
    this.sendPlainText = this.sendPlainText.bind(this);
    this.sendPhoto = this.sendPhoto.bind(this);
  }
  getSentMessageIds() {
    const ids = this.sentMessageIds;
    this.sentMessageIds = [];
    return ids;
  }
  async recordSentMessageId(resp) {
    try {
      const json = await resp.clone().json();
      if (json.ok && json.result?.message_id) {
        const id = json.result.message_id;
        if (!this.sentMessageIds.includes(id)) {
          this.sentMessageIds.push(id);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
  static fromMessage(token, message) {
    return new MessageSender(token, MessageContext.fromMessage(message));
  }
  static fromCallbackQuery(token, callbackQuery) {
    return new MessageSender(token, MessageContext.fromCallbackQuery(callbackQuery));
  }
  static fromUpdate(token, update) {
    if (update.callback_query) {
      return MessageSender.fromCallbackQuery(token, update.callback_query);
    }
    if (update.message) {
      return MessageSender.fromMessage(token, update.message);
    }
    throw new Error("Invalid update");
  }
  update(context) {
    if (!this.context) {
      this.context = context;
      return this;
    }
    for (const key in context) {
      this.context[key] = context[key];
    }
    return this;
  }
  async sendMessage(message, context, fallbackText) {
    const doSend = async (text, parseMode2) => {
      if (context?.message_id) {
        const params = {
          chat_id: context.chat_id,
          message_id: context.message_id,
          parse_mode: parseMode2 || void 0,
          text
        };
        if (context.disable_web_page_preview) {
          params.link_preview_options = {
            is_disabled: true
          };
        }
        return this.api.editMessageText(params);
      } else {
        const params = {
          chat_id: context.chat_id,
          parse_mode: parseMode2 || void 0,
          text
        };
        if (context.reply_to_message_id) {
          params.reply_parameters = {
            message_id: context.reply_to_message_id,
            chat_id: context.chat_id,
            allow_sending_without_reply: context.allow_sending_without_reply || void 0
          };
        }
        if (context.disable_web_page_preview) {
          params.link_preview_options = {
            is_disabled: true
          };
        }
        return this.api.sendMessage(params);
      }
    };
    const parseMode = context.parse_mode;
    let resp = await doSend(message, parseMode);
    if (resp.status === 400 && parseMode) {
      console.error("[sendMessage] HTML parse failed, retrying as plain text");
      resp = await doSend(fallbackText || message, null);
    }
    return resp;
  }
  renderMessage(parse_mode, message) {
    if (ENV.CUSTOM_MESSAGE_RENDER) {
      return ENV.CUSTOM_MESSAGE_RENDER(parse_mode, message);
    }
    if (parse_mode === "HTML") {
      return markdownToHtml(message);
    }
    return message;
  }
  async sendLongMessage(message, context) {
    const chatContext = { ...context };
    const limit = 4096;
    if (message.length <= limit) {
      const resp = await this.sendMessage(this.renderMessage(context.parse_mode, message), chatContext, message);
      if (resp.status === 200) {
        await this.recordSentMessageId(resp);
        return resp;
      }
    }
    chatContext.parse_mode = null;
    let lastMessageResponse = null;
    for (let i = 0; i < message.length; i += limit) {
      const msg = message.slice(i, Math.min(i + limit, message.length));
      if (i > 0) {
        chatContext.message_id = null;
      }
      lastMessageResponse = await this.sendMessage(msg, chatContext);
      if (lastMessageResponse.status !== 200) {
        break;
      }
      await this.recordSentMessageId(lastMessageResponse);
    }
    if (lastMessageResponse === null) {
      throw new Error("Send message failed");
    }
    return lastMessageResponse;
  }
  sendRawMessage(message) {
    return this.api.sendMessage(message);
  }
  editRawMessage(message) {
    return this.api.editMessageText(message);
  }
  sendRichText(message, parseMode = ENV.DEFAULT_PARSE_MODE) {
    if (!this.context) {
      throw new Error("Message context not set");
    }
    return this.sendLongMessage(message, {
      ...this.context,
      parse_mode: parseMode
    });
  }
  sendPlainText(message) {
    if (!this.context) {
      throw new Error("Message context not set");
    }
    return this.sendLongMessage(message, {
      ...this.context,
      parse_mode: null
    });
  }
  sendPhoto(photo) {
    if (!this.context) {
      throw new Error("Message context not set");
    }
    const params = {
      chat_id: this.context.chat_id,
      photo
    };
    if (this.context.reply_to_message_id) {
      params.reply_parameters = {
        message_id: this.context.reply_to_message_id,
        chat_id: this.context.chat_id,
        allow_sending_without_reply: this.context.allow_sending_without_reply || void 0
      };
    }
    const resp = this.api.sendPhoto(params);
    resp.then((r) => this.recordSentMessageId(r)).catch(console.error);
    return resp;
  }
}
const BOT_REPLY_GROUP_KEY_PREFIX = "bot_reply_group:";
const MAX_REPLY_GROUPS = 1e3;
const REPLY_GROUP_TTL = 48 * 3600;
function botReplyGroupKey(historyKey) {
  return `${BOT_REPLY_GROUP_KEY_PREFIX}${historyKey}`;
}
async function saveBotReplyGroup(context, messageIds) {
  if (!messageIds || messageIds.length === 0) {
    return;
  }
  try {
    const key = botReplyGroupKey(context.SHARE_CONTEXT.chatHistoryKey);
    let groups = [];
    try {
      groups = JSON.parse(await ENV.DATABASE.get(key).catch(() => "[]")) || [];
    } catch (e) {
      console.error(e);
    }
    groups.push(messageIds);
    if (groups.length > MAX_REPLY_GROUPS) {
      groups = groups.slice(-MAX_REPLY_GROUPS);
    }
    await ENV.DATABASE.put(key, JSON.stringify(groups), { expirationTtl: REPLY_GROUP_TTL });
  } catch (e) {
    console.error(e);
  }
}
async function listBotReplyGroups(context) {
  try {
    const key = botReplyGroupKey(context.SHARE_CONTEXT.chatHistoryKey);
    const raw = await ENV.DATABASE.get(key).catch(() => null);
    if (!raw) {
      return [];
    }
    const groups = JSON.parse(raw);
    return Array.isArray(groups) ? groups : [];
  } catch (e) {
    console.error(e);
    return [];
  }
}
async function updateBotReplyGroups(context, groups) {
  try {
    const key = botReplyGroupKey(context.SHARE_CONTEXT.chatHistoryKey);
    await ENV.DATABASE.put(key, JSON.stringify(groups), { expirationTtl: REPLY_GROUP_TTL });
  } catch (e) {
    console.error(e);
  }
}
async function loadChatRoleWithContext(chatId, speakerId, context) {
  const { groupAdminsKey } = context.SHARE_CONTEXT;
  if (!groupAdminsKey) {
    return null;
  }
  let groupAdmin = null;
  try {
    groupAdmin = JSON.parse(await ENV.DATABASE.get(groupAdminsKey));
  } catch (e) {
    console.error(e);
  }
  if (groupAdmin === null || !Array.isArray(groupAdmin) || groupAdmin.length === 0) {
    const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
    const result = await api.getChatAdministratorsWithReturns({ chat_id: chatId });
    if (result == null) {
      return null;
    }
    groupAdmin = result.result;
    await ENV.DATABASE.put(
      groupAdminsKey,
      JSON.stringify(groupAdmin),
      { expiration: Date.now() / 1e3 + 120 }
    );
  }
  for (let i = 0; i < groupAdmin.length; i++) {
    const user = groupAdmin[i];
    if (`${user.user?.id}` === `${speakerId}`) {
      return user.status;
    }
  }
  return "member";
}
class Stream {
  response;
  controller;
  decoder;
  parser;
  constructor(response, controller, parser = null) {
    this.response = response;
    this.controller = controller;
    this.decoder = new SSEDecoder();
    this.parser = parser || defaultSSEJsonParser;
  }
  async *iterMessages() {
    if (!this.response.body) {
      this.controller.abort();
      throw new Error("Attempted to iterate over a response with no body");
    }
    const lineDecoder = new LineDecoder();
    const iter = this.response.body;
    for await (const chunk of iter) {
      for (const line of lineDecoder.decode(chunk)) {
        const sse = this.decoder.decode(line);
        if (sse) {
          yield sse;
        }
      }
    }
    for (const line of lineDecoder.flush()) {
      const sse = this.decoder.decode(line);
      if (sse) {
        yield sse;
      }
    }
  }
  async *[Symbol.asyncIterator]() {
    let done = false;
    try {
      for await (const sse of this.iterMessages()) {
        if (done) {
          continue;
        }
        if (!sse) {
          continue;
        }
        const { finish, data } = this.parser(sse);
        if (finish) {
          done = finish;
          continue;
        }
        if (data) {
          yield data;
        }
      }
      done = true;
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") {
        return;
      }
      throw e;
    } finally {
      if (!done) {
        this.controller.abort();
      }
    }
  }
}
class SSEDecoder {
  event;
  data;
  constructor() {
    this.event = null;
    this.data = [];
  }
  decode(line) {
    if (line.endsWith("\r")) {
      line = line.substring(0, line.length - 1);
    }
    if (!line) {
      if (!this.event && !this.data.length) {
        return null;
      }
      const sse = {
        event: this.event,
        data: this.data.join("\n")
      };
      this.event = null;
      this.data = [];
      return sse;
    }
    if (line.startsWith(":")) {
      return null;
    }
    let [fieldName, _, value] = this.partition(line, ":");
    if (value.startsWith(" ")) {
      value = value.substring(1);
    }
    if (fieldName === "event") {
      this.event = value;
    } else if (fieldName === "data") {
      this.data.push(value);
    }
    return null;
  }
  partition(str, delimiter) {
    const index = str.indexOf(delimiter);
    if (index !== -1) {
      return [str.substring(0, index), delimiter, str.substring(index + delimiter.length)];
    }
    return [str, "", ""];
  }
}
function defaultSSEJsonParser(sse) {
  if (sse.data?.startsWith("[DONE]")) {
    return { finish: true };
  }
  if (sse.data) {
    try {
      return { data: JSON.parse(sse.data) };
    } catch (e) {
      console.error(e, sse);
    }
  }
  return {};
}
class LineDecoder {
  buffer;
  trailingCR;
  textDecoder;
  static NEWLINE_CHARS =  new Set(["\n", "\r"]);
  static NEWLINE_REGEXP = /\r\n|[\n\r]/g;
  constructor() {
    this.buffer = [];
    this.trailingCR = false;
  }
  decode(chunk) {
    let text = this.decodeText(chunk);
    if (this.trailingCR) {
      text = `\r${text}`;
      this.trailingCR = false;
    }
    if (text.endsWith("\r")) {
      this.trailingCR = true;
      text = text.slice(0, -1);
    }
    if (!text) {
      return [];
    }
    const trailingNewline = LineDecoder.NEWLINE_CHARS.has(text[text.length - 1] || "");
    let lines = text.split(LineDecoder.NEWLINE_REGEXP);
    if (lines.length === 1 && !trailingNewline) {
      this.buffer.push(lines[0]);
      return [];
    }
    if (this.buffer.length > 0) {
      lines = [this.buffer.join("") + lines[0], ...lines.slice(1)];
      this.buffer = [];
    }
    if (!trailingNewline) {
      this.buffer = [lines.pop() || ""];
    }
    return lines;
  }
  decodeText(bytes) {
    if (bytes == null) {
      return "";
    }
    if (typeof bytes === "string") {
      return bytes;
    }
    if (typeof Buffer !== "undefined") {
      if (bytes instanceof Buffer) {
        return bytes.toString();
      }
      if (bytes instanceof Uint8Array) {
        return Buffer.from(bytes).toString();
      }
      throw new Error(`Unexpected: received non-Uint8Array (${bytes.constructor.name}) stream chunk in an environment with a global "Buffer" defined, which this library assumes to be Node. Please report this error.`);
    }
    if (typeof TextDecoder !== "undefined") {
      if (bytes instanceof Uint8Array || bytes instanceof ArrayBuffer) {
        if (!this.textDecoder) {
          this.textDecoder = new TextDecoder("utf8");
        }
        return this.textDecoder.decode(bytes, { stream: true });
      }
      throw new Error(`Unexpected: received non-Uint8Array/ArrayBuffer in a web platform. Please report this error.`);
    }
    throw new Error("Unexpected: neither Buffer nor TextDecoder are available as globals. Please report this error.");
  }
  flush() {
    if (!this.buffer.length && !this.trailingCR) {
      return [];
    }
    const lines = [this.buffer.join("")];
    this.buffer = [];
    this.trailingCR = false;
    return lines;
  }
}
function fixOpenAICompatibleOptions(options) {
  options = options || {};
  options.streamBuilder = options.streamBuilder || function(r, c) {
    return new Stream(r, c);
  };
  options.contentExtractor = options.contentExtractor || function(d) {
    return d?.choices?.at(0)?.delta?.content;
  };
  options.fullContentExtractor = options.fullContentExtractor || function(d) {
    return d.choices?.at(0)?.message.content;
  };
  options.errorExtractor = options.errorExtractor || function(d) {
    return d.error?.message;
  };
  return options;
}
function isJsonResponse(resp) {
  const contentType = resp.headers.get("content-type");
  return contentType?.toLowerCase().includes("application/json") ?? false;
}
function isEventStreamResponse(resp) {
  const types = ["application/stream+json", "text/event-stream"];
  const content = resp.headers.get("content-type")?.toLowerCase() || "";
  for (const type of types) {
    if (content.includes(type)) {
      return true;
    }
  }
  return false;
}
class FirstTokenTimeoutError extends Error {
  constructor(message = "first token timeout") {
    super(message);
    this.name = "FirstTokenTimeoutError";
  }
}
async function streamHandler(stream, contentExtractor, onStream) {
  let contentFull = "";
  let lengthDelta = 0;
  let updateStep = 50;
  let lastUpdateTime = Date.now();
  try {
    for await (const part of stream) {
      const textPart = contentExtractor(part);
      if (!textPart) {
        continue;
      }
      lengthDelta += textPart.length;
      contentFull = contentFull + textPart;
      if (lengthDelta > updateStep) {
        if (ENV.TELEGRAM_MIN_STREAM_INTERVAL > 0) {
          const delta = Date.now() - lastUpdateTime;
          if (delta < ENV.TELEGRAM_MIN_STREAM_INTERVAL) {
            continue;
          }
          lastUpdateTime = Date.now();
        }
        lengthDelta = 0;
        updateStep += 20;
        await onStream?.(`${contentFull}
...`);
      }
    }
  } catch (e) {
    contentFull += `
Error: ${e.message}`;
  }
  return contentFull;
}
async function mapResponseToAnswer(resp, controller, options, onStream) {
  options = fixOpenAICompatibleOptions(options || null);
  if (onStream && resp.ok && isEventStreamResponse(resp)) {
    const stream = options.streamBuilder?.(resp, controller || new AbortController());
    if (!stream) {
      throw new Error("Stream builder error");
    }
    return streamHandler(stream, options.contentExtractor, onStream);
  }
  if (!isJsonResponse(resp)) {
    throw new Error(resp.statusText);
  }
  const result = await resp.json();
  if (!result) {
    throw new Error("Empty response");
  }
  if (options.errorExtractor?.(result)) {
    throw new Error(options.errorExtractor?.(result) || "Unknown error");
  }
  return options.fullContentExtractor?.(result) || "";
}
async function requestChatCompletionsOnce(url, header, body, onStream, options, firstTokenTimeout = 0, singleTimeoutMs = 0) {
  const controller = new AbortController();
  const { signal } = controller;
  let timeoutID = null;
  if (singleTimeoutMs > 0) {
    timeoutID = setTimeout(() => controller.abort(), singleTimeoutMs);
  }
  let firstTokenTimer = null;
  let firstTokenReceived = false;
  let effectiveOptions = options;
  if (firstTokenTimeout > 0 && onStream) {
    effectiveOptions = {};
    effectiveOptions.contentExtractor = (data) => {
      const text = data?.choices?.at(0)?.delta?.content ?? null;
      if (text && !firstTokenReceived) {
        firstTokenReceived = true;
        if (firstTokenTimer) {
          clearTimeout(firstTokenTimer);
          firstTokenTimer = null;
        }
      }
      return text;
    };
    firstTokenTimer = setTimeout(() => controller.abort(), firstTokenTimeout);
  }
  try {
    let resp;
    try {
      resp = await fetch(url, {
        method: "POST",
        headers: header,
        body: JSON.stringify(body),
        signal
      });
    } catch (e) {
      if (firstTokenTimeout > 0 && !firstTokenReceived && signal.aborted) {
        throw new FirstTokenTimeoutError();
      }
      throw e;
    }
    if (!resp.ok) {
      const bodyText = await resp.text().catch(() => "");
      const err = new Error(`LLM API ${resp.status}: ${bodyText.slice(0, 200)}`);
      err.statusCode = resp.status;
      throw err;
    }
    let answer;
    try {
      answer = await mapResponseToAnswer(resp, controller, effectiveOptions, onStream);
    } catch (e) {
      if (firstTokenTimeout > 0 && !firstTokenReceived && signal.aborted) {
        throw new FirstTokenTimeoutError();
      }
      throw e;
    }
    if (firstTokenTimeout > 0 && !firstTokenReceived && signal.aborted) {
      throw new FirstTokenTimeoutError();
    }
    return answer;
  } finally {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    if (firstTokenTimer) {
      clearTimeout(firstTokenTimer);
    }
  }
}
function isRetryableError(e) {
  if (e instanceof FirstTokenTimeoutError) {
    return false;
  }
  if (e instanceof Error) {
    const msg = e.message.toLowerCase();
    if (e.name === "AbortError" || msg.includes("aborted")) {
      return true;
    }
    if (msg.includes("fetch") || msg.includes("network") || msg.includes("timeout")) {
      return true;
    }
    const statusCode = e.statusCode;
    if (statusCode && statusCode >= 500 && statusCode < 600) {
      return true;
    }
  }
  return false;
}
async function requestChatCompletions(url, header, body, onStream, options, firstTokenTimeout = 0) {
  const maxRetries = 1;
  const singleTimeoutMs = ENV.CHAT_COMPLETE_API_TIMEOUT > 0 ? Math.floor(ENV.CHAT_COMPLETE_API_TIMEOUT * 1e3 / (maxRetries + 1)) : 0;
  let lastError = null;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await requestChatCompletionsOnce(url, header, body, onStream, options, firstTokenTimeout, singleTimeoutMs);
      if (attempt > 0) {
        console.log(`[diag] requestChatCompletions: 第${attempt + 1}次成功`);
      }
      return result;
    } catch (e) {
      lastError = e;
      if (attempt >= maxRetries || !isRetryableError(e)) {
        if (isRetryableError(e) && attempt >= maxRetries) {
          console.error(`[diag] requestChatCompletions: 重试${maxRetries}次后仍失败:`, e.message);
        }
        throw e;
      }
      console.log(`[diag] requestChatCompletions: 第${attempt + 1}次失败(可重试): ${e.message}, 1秒后重试...`);
      await new Promise((resolve) => setTimeout(resolve, 1e3));
    }
  }
  throw lastError;
}
function extractTextContent(history) {
  if (typeof history.content === "string") {
    return history.content;
  }
  if (Array.isArray(history.content)) {
    return history.content.map((item) => {
      if (item.type === "text") {
        return item.text;
      }
      return "";
    }).join("");
  }
  return "";
}
function extractImageContent(imageData) {
  if (imageData instanceof URL) {
    return { url: imageData.href };
  }
  if (typeof imageData === "string") {
    if (imageData.startsWith("http")) {
      return { url: imageData };
    } else {
      return { base64: imageData };
    }
  }
  if (typeof Buffer !== "undefined") {
    if (imageData instanceof Uint8Array) {
      return { base64: Buffer.from(imageData).toString("base64") };
    }
    if (Buffer.isBuffer(imageData)) {
      return { base64: Buffer.from(imageData).toString("base64") };
    }
  }
  return {};
}
async function convertStringToResponseMessages(input) {
  const text = typeof input === "string" ? input : await input;
  return {
    text,
    responses: [{ role: "assistant", content: text }]
  };
}
async function loadModelsList(raw, remoteLoader) {
  if (!raw) {
    return [];
  }
  if (raw.startsWith("[") && raw.endsWith("]")) {
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error(e);
      return [];
    }
  }
  if (raw.startsWith("http") && remoteLoader) {
    return await remoteLoader(raw);
  }
  return [raw];
}
function bearerHeader(token, stream) {
  const res = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };
  return res;
}
function getAgentUserConfigFieldName(fieldName) {
  return fieldName;
}
class Cache {
  maxItems;
  maxAge;
  cache;
  constructor() {
    this.maxItems = 10;
    this.maxAge = 1e3 * 60 * 60;
    this.cache = {};
    this.set = this.set.bind(this);
    this.get = this.get.bind(this);
  }
  set(key, value) {
    this.trim();
    this.cache[key] = {
      value,
      time: Date.now()
    };
  }
  get(key) {
    this.trim();
    return this.cache[key]?.value;
  }
  trim() {
    let keys = Object.keys(this.cache);
    for (const key of keys) {
      if (Date.now() - this.cache[key].time > this.maxAge) {
        delete this.cache[key];
      }
    }
    keys = Object.keys(this.cache);
    if (keys.length > this.maxItems) {
      keys.sort((a, b) => this.cache[a].time - this.cache[b].time);
      for (let i = 0; i < keys.length - this.maxItems; i++) {
        delete this.cache[keys[i]];
      }
    }
  }
}
const IMAGE_CACHE = new Cache();
async function fetchImage(url) {
  const cache = IMAGE_CACHE.get(url);
  if (cache) {
    return cache;
  }
  const IMAGE_FETCH_TIMEOUT = 1e4;
  const resp = await Promise.race([
    fetch(url),
    new Promise((_, reject) => setTimeout(() => reject(new Error("fetch image timeout")), IMAGE_FETCH_TIMEOUT))
  ]);
  if (!resp.ok) {
    throw new Error(`fetch image failed: ${resp.status}`);
  }
  const blob = await resp.blob();
  IMAGE_CACHE.set(url, blob);
  return blob;
}
async function urlToBase64String(url) {
  if (typeof Buffer !== "undefined") {
    return fetchImage(url).then((blob) => blob.arrayBuffer()).then((buffer) => Buffer.from(buffer).toString("base64"));
  } else {
    const buffer = await fetchImage(url).then((blob) => blob.arrayBuffer());
    return base64Encode(new Uint8Array(buffer));
  }
}
function base64Encode(bytes) {
  const CHUNK_SIZE = 32768;
  let binary = "";
  for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
    const chunk = bytes.subarray(i, Math.min(i + CHUNK_SIZE, bytes.length));
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}
function getImageFormatFromBase64(base64String) {
  const firstChar = base64String.charAt(0);
  switch (firstChar) {
    case "/":
      return "jpeg";
    case "i":
      return "png";
    case "U":
      return "webp";
    default:
      throw new Error("Unsupported image format");
  }
}
async function imageToBase64String(url) {
  const base64String = await urlToBase64String(url);
  const format = getImageFormatFromBase64(base64String);
  return {
    data: base64String,
    format: `image/${format}`
  };
}
function renderBase64DataURI(params) {
  return `data:${params.format};base64,${params.data}`;
}
var ImageSupportFormat =  ((ImageSupportFormat2) => {
  ImageSupportFormat2["URL"] = "url";
  ImageSupportFormat2["BASE64"] = "base64";
  return ImageSupportFormat2;
})(ImageSupportFormat || {});
async function renderOpenAIMessage(item, supportImage) {
  const res = {
    role: item.role,
    content: item.content
  };
  if (Array.isArray(item.content)) {
    const contents = [];
    for (const content of item.content) {
      switch (content.type) {
        case "text":
          contents.push({ type: "text", text: content.text });
          break;
        case "image":
          if (supportImage) {
            const isSupportURL = supportImage.includes("url" );
            const isSupportBase64 = supportImage.includes("base64" );
            const data = extractImageContent(content.image);
            if (data.url) {
              if (ENV.TELEGRAM_IMAGE_TRANSFER_MODE === "base64" && isSupportBase64) {
                try {
                  contents.push(await imageToBase64String(data.url).then((data2) => {
                    return { type: "image_url", image_url: { url: renderBase64DataURI(data2) } };
                  }));
                } catch (e) {
                  console.error("renderOpenAIMessage: skip image due to fetch failure", e);
                }
              } else if (isSupportURL) {
                contents.push({ type: "image_url", image_url: { url: data.url } });
              }
            } else if (data.base64 && isSupportBase64) {
              contents.push({ type: "image_base64", image_base64: { base64: data.base64 } });
            }
          }
          break;
      }
    }
    res.content = contents;
  }
  return res;
}
async function renderOpenAIMessages(prompt, items, supportImage) {
  const messages = await Promise.all(items.map((r) => renderOpenAIMessage(r, supportImage)));
  if (prompt) {
    if (messages.length > 0 && messages[0].role === "system") {
      messages.shift();
    }
    messages.unshift({ role: "system", content: prompt });
  }
  return messages;
}
function loadOpenAIModelList(list, base, headers) {
  if (list === "") {
    list = `${base}/models`;
  }
  return loadModelsList(list, async (url) => {
    const data = await fetch(url, { headers }).then((res) => res.json());
    return data.data?.map((model) => model.id) || [];
  });
}
function messagesHasImage(renderedMessages) {
  return renderedMessages.some((m) => Array.isArray(m.content) && m.content.some((c) => c.type === "image_url" || c.type === "image_base64"));
}
function openAIApiKey(context) {
  const length = context.OPENAI_API_KEY.length;
  return context.OPENAI_API_KEY[Math.floor(Math.random() * length)];
}
class OpenAI {
  name = "openai";
  modelKey = getAgentUserConfigFieldName("OPENAI_CHAT_MODEL");
  enable = (ctx) => ctx.OPENAI_API_KEY.length > 0;
  model = (ctx) => ctx.OPENAI_CHAT_MODEL;
  modelList = (ctx) => loadOpenAIModelList(ctx.OPENAI_CHAT_MODELS_LIST, ctx.OPENAI_API_BASE, bearerHeader(openAIApiKey(ctx)));
  request = async (params, context, onStream) => {
    const { prompt, messages, sessionId } = params;
    const url = `${context.OPENAI_API_BASE}/chat/completions`;
    const header = bearerHeader(openAIApiKey(context));
    if (sessionId) {
      header[context.OPENAI_SESSION_HEADER] = sessionId;
    }
    const renderedMessages = context.OPENAI_SESSION_MODE ? await renderOpenAIMessages(void 0, messages.slice(-1), [ImageSupportFormat.URL, ImageSupportFormat.BASE64]) : await renderOpenAIMessages(prompt, messages, [ImageSupportFormat.URL, ImageSupportFormat.BASE64]);
    const hasImage = messagesHasImage(renderedMessages);
    const firstTokenTimeout = hasImage ? context.IMAGE_FIRST_TOKEN_TIMEOUT * 1e3 : 0;
    const body = {
      ...context.OPENAI_API_EXTRA_PARAMS || {},
      model: context.OPENAI_CHAT_MODEL,
      stream: onStream != null,
      messages: renderedMessages
    };
    try {
      const text = await requestChatCompletions(url, header, body, onStream, null, firstTokenTimeout);
      return convertStringToResponseMessages(text);
    } catch (e) {
      if (hasImage && e instanceof FirstTokenTimeoutError) {
        const textOnlyMessages = context.OPENAI_SESSION_MODE ? await renderOpenAIMessages(void 0, messages.slice(-1), null) : await renderOpenAIMessages(prompt, messages, null);
        const textOnlyBody = {
          ...context.OPENAI_API_EXTRA_PARAMS || {},
          model: context.OPENAI_CHAT_MODEL,
          stream: onStream != null,
          messages: textOnlyMessages
        };
        const text = await requestChatCompletions(url, header, textOnlyBody, onStream, null, 0);
        return convertStringToResponseMessages(text);
      }
      throw e;
    }
  };
}
class Dalle {
  name = "openai";
  modelKey = getAgentUserConfigFieldName("IMAGE_MODEL");
  enable = (ctx) => !!ctx.IMAGE_API_BASE && !!ctx.IMAGE_API_KEY;
  model = (ctx) => ctx.IMAGE_MODEL;
  modelList = (ctx) => loadOpenAIModelList(ctx.IMAGE_MODELS_LIST, ctx.IMAGE_API_BASE, bearerHeader(ctx.IMAGE_API_KEY));
  request = async (prompt, context) => {
    const url = `${context.IMAGE_API_BASE}/images/generations`;
    const header = bearerHeader(context.IMAGE_API_KEY);
    const body = {
      prompt,
      n: 1,
      size: context.IMAGE_SIZE,
      model: context.IMAGE_MODEL
    };
    const resp = await fetch(url, {
      method: "POST",
      headers: header,
      body: JSON.stringify(body)
    }).then((res) => res.json());
    if (resp.error?.message) {
      throw new Error(resp.error.message);
    }
    return resp?.data?.at(0)?.url;
  };
}
const CHAT_AGENTS = [
  new OpenAI()
];
function loadChatLLM(context) {
  for (const llm of CHAT_AGENTS) {
    if (llm.name === context.AI_PROVIDER) {
      return llm;
    }
  }
  for (const llm of CHAT_AGENTS) {
    if (llm.enable(context)) {
      return llm;
    }
  }
  return null;
}
const IMAGE_AGENTS = [
  new Dalle()
];
function loadImageGen(context) {
  for (const imgGen of IMAGE_AGENTS) {
    if (imgGen.name === context.AI_IMAGE_PROVIDER) {
      return imgGen;
    }
  }
  for (const imgGen of IMAGE_AGENTS) {
    if (imgGen.enable(context)) {
      return imgGen;
    }
  }
  return null;
}
function tokensCounter() {
  return (text) => {
    return text.length;
  };
}
async function loadHistory(key) {
  let history = [];
  try {
    history = JSON.parse(await ENV.DATABASE.get(key));
  } catch (e) {
    console.error(e);
  }
  if (!history || !Array.isArray(history)) {
    history = [];
  }
  const counter = tokensCounter();
  const trimHistory = (list, initLength, maxLength, maxToken) => {
    if (maxLength >= 0 && list.length > maxLength) {
      list = list.splice(list.length - maxLength);
    }
    if (maxToken > 0) {
      let tokenLength = initLength;
      for (let i = list.length - 1; i >= 0; i--) {
        const historyItem = list[i];
        let length = 0;
        if (historyItem.content) {
          length = counter(extractTextContent(historyItem));
        } else {
          historyItem.content = "";
        }
        tokenLength += length;
        if (tokenLength > maxToken) {
          list = list.splice(i + 1);
          break;
        }
      }
    }
    return list;
  };
  if (ENV.AUTO_TRIM_HISTORY && ENV.MAX_HISTORY_LENGTH > 0) {
    history = trimHistory(history, 0, ENV.MAX_HISTORY_LENGTH, ENV.MAX_TOKEN_LENGTH);
  }
  return history;
}
async function requestCompletionsFromLLM(params, context, agent, modifier, onStream) {
  const historyDisable = ENV.AUTO_TRIM_HISTORY && ENV.MAX_HISTORY_LENGTH <= 0;
  const historyKey = context.SHARE_CONTEXT.chatHistoryKey;
  if (!historyKey) {
    throw new Error("History key not found");
  }
  let history = await loadHistory(historyKey);
  if (!params) {
    throw new Error("Message is empty");
  }
  const llmParams = {
    prompt: context.USER_CONFIG.SYSTEM_INIT_MESSAGE || void 0,
    messages: [...history, params],
    sessionId: historyKey
  };
  const { text, responses } = await agent.request(llmParams, context.USER_CONFIG, onStream);
  if (!historyDisable) {
    const editParams = { ...params };
    if (ENV.HISTORY_IMAGE_PLACEHOLDER) {
      if (Array.isArray(editParams.content)) {
        const imageCount = editParams.content.filter((i) => i.type === "image").length;
        const textContent = editParams.content.findLast((i) => i.type === "text");
        if (textContent) {
          editParams.content = editParams.content.filter((i) => i.type !== "image");
          textContent.text = textContent.text + ` ${ENV.HISTORY_IMAGE_PLACEHOLDER}`.repeat(imageCount);
        }
      }
    }
    await ENV.DATABASE.put(historyKey, JSON.stringify([...history, editParams, ...responses])).catch(console.error);
  }
  return text;
}
async function chatWithMessage(message, params, context, modifier) {
  const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
  try {
    try {
      const msg = await sender.sendPlainText("...").then((r) => r.json());
      sender.update({
        message_id: msg.result.message_id
      });
    } catch (e) {
      console.error(e);
    }
    const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
    setTimeout(() => api.sendChatAction({
      chat_id: message.chat.id,
      action: "typing"
    }).catch(console.error), 0);
    let onStream = null;
    let nextEnableTime = null;
    if (ENV.STREAM_MODE) {
      onStream = async (text) => {
        try {
          if (nextEnableTime && nextEnableTime > Date.now()) {
            return;
          }
          const resp2 = await sender.sendPlainText(text);
          if (resp2.status === 429) {
            const retryAfter = Number.parseInt(resp2.headers.get("Retry-After") || "");
            if (retryAfter) {
              nextEnableTime = Date.now() + retryAfter * 1e3;
              return;
            }
          }
          nextEnableTime = null;
          if (resp2.ok) {
            const respJson = await resp2.json();
            sender.update({
              message_id: respJson.result.message_id
            });
          }
        } catch (e) {
          console.error(e);
        }
      };
    }
    const agent = loadChatLLM(context.USER_CONFIG);
    if (agent === null) {
      const resp2 = await sender.sendPlainText("LLM is not enable");
      await saveBotReplyGroup(context, sender.getSentMessageIds());
      return resp2;
    }
    const answer = await requestCompletionsFromLLM(params, context, agent, modifier, onStream);
    if (nextEnableTime !== null && nextEnableTime > Date.now()) {
      await new Promise((resolve) => setTimeout(resolve, (nextEnableTime ?? 0) - Date.now()));
    }
    const resp = await sender.sendRichText(answer);
    await saveBotReplyGroup(context, sender.getSentMessageIds());
    return resp;
  } catch (e) {
    let errMsg = `Error: ${e.message}`;
    if (errMsg.length > 2048) {
      errMsg = errMsg.substring(0, 2048);
    }
    const resp = await sender.sendPlainText(errMsg);
    await saveBotReplyGroup(context, sender.getSentMessageIds());
    return resp;
  }
}
async function extractImageURL(fileId, context) {
  if (!fileId) {
    return null;
  }
  const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
  const GET_FILE_TIMEOUT = 5e3;
  let file;
  try {
    file = await Promise.race([
      api.getFileWithReturns({ file_id: fileId }),
      new Promise((_, reject) => setTimeout(() => reject(new Error("getFile timeout")), GET_FILE_TIMEOUT))
    ]);
  } catch (e) {
    console.error("extractImageURL failed:", e);
    return null;
  }
  const filePath = file.result.file_path;
  if (filePath) {
    const url = URL.parse(`${ENV.TELEGRAM_API_DOMAIN}/file/bot${context.SHARE_CONTEXT.botToken}/${filePath}`);
    if (url) {
      return url;
    }
  }
  return null;
}
function extractImageFileID(message) {
  if (message.photo && message.photo.length > 0) {
    const offset = ENV.TELEGRAM_PHOTO_SIZE_OFFSET;
    const length = message.photo.length;
    const sizeIndex = Math.max(0, Math.min(offset >= 0 ? offset : length + offset, length - 1));
    return message.photo[sizeIndex]?.file_id;
  } else if (message.document && message.document.thumbnail) {
    return message.document.thumbnail.file_id;
  }
  return null;
}
async function extractUserMessageItem(message, context) {
  let text = message.text || message.caption || "";
  const urls = await extractImageURL(extractImageFileID(message), context).then((u) => u ? [u] : []);
  if (ENV.EXTRA_MESSAGE_CONTEXT && message.reply_to_message && message.reply_to_message.from && `${message.reply_to_message.from.id}` !== `${context.SHARE_CONTEXT.botId}`) {
    const extraText = message.reply_to_message.text || message.reply_to_message.caption || "";
    if (extraText) {
      text = `${text}
The following is the referenced context: ${extraText}`;
    }
    if (ENV.EXTRA_MESSAGE_MEDIA_COMPATIBLE.includes("image") && message.reply_to_message.photo) {
      const url = await extractImageURL(extractImageFileID(message.reply_to_message), context);
      if (url) {
        urls.push(url);
      }
    }
  } else if (
    !text && message.reply_to_message && message.reply_to_message.from && `${message.reply_to_message.from.id}` !== `${context.SHARE_CONTEXT.botId}`
  ) {
    text = message.reply_to_message.text || message.reply_to_message.caption || "";
  }
  const params = {
    role: "user",
    content: text
  };
  if (urls.length > 0) {
    const contents = new Array();
    if (text) {
      contents.push({ type: "text", text });
    }
    for (const url of urls) {
      contents.push({ type: "image", image: url });
    }
    params.content = contents;
  }
  return params;
}
class ImgCommandHandler {
  command = "/img";
  scopes = ["all_private_chats"];
  handle = async (message, subcommand, context) => {
    const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
    if (!context.USER_CONFIG.IMAGE_API_BASE || !context.USER_CONFIG.IMAGE_API_KEY) {
      return sender.sendPlainText("ERROR: Image function is disabled, please configure IMAGE_API_BASE and IMAGE_API_KEY");
    }
    if (!subcommand) {
      return sender.sendPlainText(ENV.I18N.command.help.img);
    }
    try {
      const imageAgent = loadImageGen(context.USER_CONFIG);
      if (!imageAgent) {
        return sender.sendPlainText("ERROR: No available image model");
      }
      const result = await imageAgent.request(subcommand, context.USER_CONFIG);
      return sender.sendPhoto(result);
    } catch (e) {
      return sender.sendPlainText(`ERROR: ${e.message}`);
    }
  };
}
class GenerateImageCommandHandler {
  command = ".生图";
  scopes = [];
  handle = new ImgCommandHandler().handle;
}
class HelpCommandHandler {
  command = "/help";
  scopes = ["all_private_chats"];
  handle = async (message, subcommand, context) => {
    const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
    const speakerId = message.from?.id || message.chat.id;
    const isAdmin = isAdminUserId(speakerId) === true;
    const adminCommands =  new Set(["/setenv", "/setenvs", "/delenv", "/clearenv", "/version", "/system", "/models", "/imgmodels", "/echo"]);
    let helpMsg = `${ENV.I18N.command.help.summary}
`;
    for (const [k, v] of Object.entries(ENV.I18N.command.help)) {
      if (k === "summary") {
        continue;
      }
      if (!isAdmin && adminCommands.has(`/${k}`)) {
        continue;
      }
      helpMsg += `/${k}：${v}
`;
    }
    for (const [k, v] of Object.entries(ENV.CUSTOM_COMMAND)) {
      if (v.description) {
        helpMsg += `${k}：${v.description}
`;
      }
    }
    for (const [k, v] of Object.entries(ENV.PLUGINS_COMMAND)) {
      if (v.description) {
        helpMsg += `${k}：${v.description}
`;
      }
    }
    return sender.sendPlainText(helpMsg);
  };
}
class BaseNewCommandHandler {
  static async handle(showID, message, subcommand, context) {
    await ENV.DATABASE.delete(context.SHARE_CONTEXT.chatHistoryKey);
    const text = ENV.I18N.command.new.new_chat_start + (showID ? `(${message.chat.id})` : "");
    const params = {
      chat_id: message.chat.id,
      text
    };
    if (ENV.SHOW_REPLY_BUTTON && !isGroupChat(message.chat.type)) {
      params.reply_markup = {
        keyboard: [[{ text: "/new" }, { text: "/clear" }]],
        selective: true,
        resize_keyboard: true,
        one_time_keyboard: false
      };
    } else {
      params.reply_markup = {
        remove_keyboard: true,
        selective: true
      };
    }
    return createTelegramBotAPI(context.SHARE_CONTEXT.botToken).sendMessage(params);
  }
}
class NewCommandHandler extends BaseNewCommandHandler {
  command = "/new";
  scopes = ["all_private_chats"];
  handle = async (message, subcommand, context) => {
    return BaseNewCommandHandler.handle(false, message, subcommand, context);
  };
}
class StartCommandHandler extends BaseNewCommandHandler {
  command = "/start";
  scopes = ["all_private_chats"];
  handle = async (message, subcommand, context) => {
    return BaseNewCommandHandler.handle(true, message, subcommand, context);
  };
}
class SetEnvCommandHandler {
  command = "/setenv";
  scopes = [];
  adminOnly = true;
  needAuth = TELEGRAM_AUTH_CHECKER.adminOnly;
  handle = async (message, subcommand, context) => {
    const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
    const kv = subcommand.indexOf("=");
    if (kv === -1) {
      return sender.sendPlainText(ENV.I18N.command.help.setenv);
    }
    const key = subcommand.slice(0, kv);
    const value = subcommand.slice(kv + 1);
    try {
      await context.execChangeAndSave({ [key]: value });
      return sender.sendPlainText("Update user config success");
    } catch (e) {
      return sender.sendPlainText(`ERROR: ${e.message}`);
    }
  };
}
class SetEnvsCommandHandler {
  command = "/setenvs";
  scopes = [];
  adminOnly = true;
  needAuth = TELEGRAM_AUTH_CHECKER.adminOnly;
  handle = async (message, subcommand, context) => {
    const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
    try {
      const values = JSON.parse(subcommand);
      await context.execChangeAndSave(values);
      return sender.sendPlainText("Update user config success");
    } catch (e) {
      return sender.sendPlainText(`ERROR: ${e.message}`);
    }
  };
}
class DelEnvCommandHandler {
  command = "/delenv";
  scopes = [];
  adminOnly = true;
  needAuth = TELEGRAM_AUTH_CHECKER.adminOnly;
  handle = async (message, subcommand, context) => {
    const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
    if (ENV.LOCK_USER_CONFIG_KEYS.includes(subcommand)) {
      const msg = `Key ${subcommand} is locked`;
      return sender.sendPlainText(msg);
    }
    try {
      context.USER_CONFIG[subcommand] = null;
      context.USER_CONFIG.DEFINE_KEYS = context.USER_CONFIG.DEFINE_KEYS.filter((key) => key !== subcommand);
      await ENV.DATABASE.put(
        context.SHARE_CONTEXT.configStoreKey,
        JSON.stringify(ConfigMerger.trim(context.USER_CONFIG, ENV.LOCK_USER_CONFIG_KEYS))
      );
      return sender.sendPlainText("Delete user config success");
    } catch (e) {
      return sender.sendPlainText(`ERROR: ${e.message}`);
    }
  };
}
class ClearEnvCommandHandler {
  command = "/clearenv";
  scopes = [];
  adminOnly = true;
  needAuth = TELEGRAM_AUTH_CHECKER.adminOnly;
  handle = async (message, subcommand, context) => {
    const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
    try {
      await ENV.DATABASE.put(
        context.SHARE_CONTEXT.configStoreKey,
        JSON.stringify({})
      );
      return sender.sendPlainText("Clear user config success");
    } catch (e) {
      return sender.sendPlainText(`ERROR: ${e.message}`);
    }
  };
}
class VersionCommandHandler {
  command = "/version";
  scopes = [];
  adminOnly = true;
  handle = async (message, subcommand, context) => {
    const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
    const current = {
      ts: ENV.BUILD_TIMESTAMP,
      sha: ENV.BUILD_VERSION
    };
    try {
      const info = `https://raw.githubusercontent.com/TBXark/ChatGPT-Telegram-Workers/${ENV.UPDATE_BRANCH}/dist/buildinfo.json`;
      const online = await fetch(info).then((r) => r.json());
      const timeFormat = (ts) => {
        return new Date(ts * 1e3).toLocaleString("en-US", {});
      };
      if (current.ts < online.ts) {
        const text = `New version detected: ${online.sha}(${timeFormat(online.ts)})
Current version: ${current.sha}(${timeFormat(current.ts)})`;
        return sender.sendPlainText(text);
      } else {
        const text = `Current version: ${current.sha}(${timeFormat(current.ts)}) is up to date`;
        return sender.sendPlainText(text);
      }
    } catch (e) {
      return sender.sendPlainText(`ERROR: ${e.message}`);
    }
  };
}
class SystemCommandHandler {
  command = "/system";
  scopes = [];
  adminOnly = true;
  handle = async (message, subcommand, context) => {
    const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
    const chatAgent = loadChatLLM(context.USER_CONFIG);
    const imageAgent = loadImageGen(context.USER_CONFIG);
    const agent = {
      AI_PROVIDER: chatAgent?.name,
      [chatAgent?.modelKey || "AI_PROVIDER_NOT_FOUND"]: chatAgent?.model(context.USER_CONFIG),
      AI_IMAGE_PROVIDER: imageAgent?.name,
      [imageAgent?.modelKey || "AI_IMAGE_PROVIDER_NOT_FOUND"]: imageAgent?.model(context.USER_CONFIG)
    };
    let msg = `<strong>AGENT</strong><pre>${JSON.stringify(agent, null, 2)}</pre>`;
    if (ENV.DEV_MODE) {
      const config = ConfigMerger.trim(context.USER_CONFIG, ENV.LOCK_USER_CONFIG_KEYS);
      msg += `

<strong>USER_CONFIG</strong><pre>${JSON.stringify(config, null, 2)}</pre>`;
      const secretsSuffix = ["_API_KEY", "_TOKEN", "_ACCOUNT_ID"];
      for (const key of Object.keys(context.USER_CONFIG)) {
        if (secretsSuffix.some((suffix) => key.endsWith(suffix))) {
          context.USER_CONFIG[key] = "******";
        }
      }
      msg += `

<strong>CHAT_CONTEXT</strong><pre>${JSON.stringify(sender.context || {}, null, 2)}</pre>`;
      const shareCtx = { ...context.SHARE_CONTEXT, botToken: "******" };
      msg += `

<strong>SHARE_CONTEXT</strong><pre>${JSON.stringify(shareCtx, null, 2)}</pre>`;
    }
    return sender.sendRichText(msg, "HTML");
  };
}
class ChatCommandHandler {
  command = "/chat";
  scopes = [];
  handle = async (message, subcommand, context) => {
    if (!subcommand) {
      const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
      return sender.sendPlainText("Usage: /chat <your message>");
    }
    const params = {
      role: "user",
      content: subcommand
    };
    return chatWithMessage(message, params, context, null);
  };
}
class ClearCommandHandler {
  command = "/clear";
  scopes = ["all_private_chats"];
  handle = async (message, subcommand, context) => {
    const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
    const chatId = message.chat.id;
    const speakerId = message.from?.id;
    const chatType = message.chat.type;
    let allowed = isAdminUserId(speakerId) === true || isAnonymousAdminMessage(speakerId, chatType);
    let role = null;
    if (!allowed && speakerId != null && isGroupChat(chatType)) {
      role = await loadChatRoleWithContext(chatId, speakerId, context);
      allowed = role === "administrator" || role === "creator";
    }
    if (!allowed) {
      console.error("[clear] permission denied", {
        speakerId: speakerId ?? null,
        chatType,
        chatId,
        adminIds: ENV.ADMIN_USER_IDS,
        isAdmin: isAdminUserId(speakerId),
        isAnonymous: isAnonymousAdminMessage(speakerId, chatType),
        role
      });
      return sender.sendPlainText("ERROR: Permission denied, admin only");
    }
    try {
      const groups = await listBotReplyGroups(context);
      if (groups.length === 0) {
        return sender.sendPlainText("No bot messages recorded to clear");
      }
      const toDelete = [];
      const remaining = [];
      if (subcommand.trim() === "all") {
        for (const group of groups) {
          toDelete.push(...group);
        }
      } else if (subcommand.trim()) {
        const n = Number.parseInt(subcommand.trim(), 10);
        if (!Number.isFinite(n) || n <= 0) {
          return sender.sendPlainText("Usage: /clear [N|all], or reply to a bot message to clear it");
        }
        const flat = [];
        for (const group of groups) {
          flat.push(...group);
        }
        const start = Math.max(0, flat.length - n);
        const deleteSet = new Set(flat.slice(start));
        toDelete.push(...deleteSet);
        for (const group of groups) {
          const kept = group.filter((id) => !deleteSet.has(id));
          if (kept.length > 0) {
            remaining.push(kept);
          }
        }
      } else if (message.reply_to_message) {
        const replyId = message.reply_to_message.message_id;
        let found = false;
        for (const group of groups) {
          if (group.includes(replyId)) {
            toDelete.push(...group);
            found = true;
          } else {
            remaining.push(group);
          }
        }
        if (!found) {
          return sender.sendPlainText("Replied message is not a recorded bot reply");
        }
      } else {
        return sender.sendPlainText("Usage: /clear [N|all], or reply to a bot message to clear it");
      }
      const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
      let deleted = 0;
      const uniqueIds = [...new Set(toDelete)];
      for (const id of uniqueIds) {
        try {
          const resp = await api.deleteMessage({ chat_id: chatId, message_id: id });
          const json = await resp.clone().json().catch(() => null);
          if (json?.ok) {
            deleted++;
          }
        } catch (e) {
          console.error(e);
        }
      }
      await updateBotReplyGroups(context, remaining);
      try {
        await api.deleteMessage({ chat_id: chatId, message_id: message.message_id });
      } catch (e) {
        console.error(e);
      }
      return new Response(null, { status: 200 });
    } catch (e) {
      return sender.sendPlainText(`ERROR: ${e.message}`);
    }
  };
}
class ModelsCommandHandler {
  command = "/models";
  scopes = [];
  adminOnly = true;
  needAuth = TELEGRAM_AUTH_CHECKER.adminOnly;
  handle = async (message, subcommand, context) => {
    const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
    const chatAgent = loadChatLLM(context.USER_CONFIG);
    const text = `${chatAgent?.name || "Nan"} | ${chatAgent?.model(context.USER_CONFIG) || "Nan"}`;
    const params = {
      chat_id: message.chat.id,
      text,
      reply_markup: {
        inline_keyboard: [[
          {
            text: ENV.I18N.callback_query.open_model_list,
            callback_data: "al:"
          }
        ]]
      }
    };
    return sender.sendRawMessage(params);
  };
}
class ImgModelsCommandHandler {
  command = "/imgmodels";
  scopes = [];
  adminOnly = true;
  needAuth = TELEGRAM_AUTH_CHECKER.adminOnly;
  handle = async (message, subcommand, context) => {
    const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
    const imageAgent = loadImageGen(context.USER_CONFIG);
    if (!imageAgent) {
      return sender.sendPlainText("ERROR: Image function is disabled, please configure IMAGE_API_BASE and IMAGE_API_KEY");
    }
    const text = `${imageAgent?.name || "Nan"} | ${imageAgent?.model(context.USER_CONFIG) || "Nan"}`;
    const params = {
      chat_id: message.chat.id,
      text,
      reply_markup: {
        inline_keyboard: [[
          {
            text: ENV.I18N.callback_query.open_model_list,
            callback_data: "ial:"
          }
        ]]
      }
    };
    return sender.sendRawMessage(params);
  };
}
class EchoCommandHandler {
  command = "/echo";
  adminOnly = true;
  needAuth = TELEGRAM_AUTH_CHECKER.adminOnly;
  handle = (message, subcommand, context) => {
    let msg = "<pre>";
    msg += JSON.stringify({ message }, null, 2);
    msg += "</pre>";
    return MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message).sendRichText(msg, "HTML");
  };
}
const SYSTEM_COMMANDS = [
  new StartCommandHandler(),
  new NewCommandHandler(),
  new ChatCommandHandler(),
  new ImgCommandHandler(),
  new GenerateImageCommandHandler(),
  new SetEnvCommandHandler(),
  new SetEnvsCommandHandler(),
  new DelEnvCommandHandler(),
  new ClearEnvCommandHandler(),
  new VersionCommandHandler(),
  new SystemCommandHandler(),
  new ModelsCommandHandler(),
  new ImgModelsCommandHandler(),
  new HelpCommandHandler(),
  new ClearCommandHandler()
];
async function handleSystemCommand(message, raw, command, context) {
  const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
  try {
    const chatId = message.chat.id;
    const speakerId = message.from?.id || chatId;
    const chatType = message.chat.type;
    if (command.needAuth) {
      const roleList = command.needAuth(chatType);
      if (roleList) {
        let allowed = false;
        if (roleList.includes(ADMIN_AUTH_MARK)) {
          const isAdmin = isAdminUserId(speakerId);
          if (isAdmin === true || isAnonymousAdminMessage(speakerId, chatType)) {
            allowed = true;
          } else if (isAdmin === false) {
            console.error("[auth] admin check failed", { speakerId, chatId, chatType, isAdmin, adminIds: ENV.ADMIN_USER_IDS });
            return sender.sendPlainText("ERROR: Permission denied, admin only");
          } else {
            if (!isGroupChat(chatType)) {
              return sender.sendPlainText("ERROR: Permission denied, admin only");
            }
            const chatRole = await loadChatRoleWithContext(chatId, speakerId, context);
            if (chatRole === null) {
              return sender.sendPlainText("ERROR: Get chat role failed");
            }
            if (chatRole !== "administrator" && chatRole !== "creator") {
              return sender.sendPlainText("ERROR: Permission denied, admin only");
            }
            allowed = true;
          }
        } else {
          const chatRole = await loadChatRoleWithContext(chatId, speakerId, context);
          if (chatRole === null) {
            return sender.sendPlainText("ERROR: Get chat role failed");
          }
          if (!roleList.includes(chatRole)) {
            return sender.sendPlainText(`ERROR: Permission denied, need ${roleList.join(" or ")}`);
          }
          allowed = true;
        }
        if (!allowed) {
          return sender.sendPlainText("ERROR: Permission denied");
        }
      }
    }
  } catch (e) {
    return sender.sendPlainText(`ERROR: ${e.message}`);
  }
  const subcommand = raw.substring(command.command.length).trim();
  try {
    return await command.handle(message, subcommand, context);
  } catch (e) {
    return sender.sendPlainText(`ERROR: ${e.message}`);
  }
}
async function handlePluginCommand(message, command, raw, template, context) {
  const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
  try {
    const subcommand = raw.substring(command.length).trim();
    if (template.input?.required && !subcommand) {
      throw new Error("Missing required input");
    }
    const DATA = formatInput(subcommand, template.input?.type);
    const { type, content } = await executeRequest(template, {
      DATA,
      ENV: ENV.PLUGINS_ENV
    });
    switch (type) {
      case "image":
        return sender.sendPhoto(content);
      case "html":
        return sender.sendRichText(content, "HTML");
      case "markdown":
        return sender.sendRichText(content, "Markdown");
      case "text":
      default:
        return sender.sendPlainText(content);
    }
  } catch (e) {
    const help = ENV.PLUGINS_COMMAND[command].description;
    return sender.sendPlainText(`ERROR: ${e.message}${help ? `
${help}` : ""}`);
  }
}
async function handleCommandMessage(message, context) {
  let text = (message.text || message.caption || "").trim();
  if (ENV.CUSTOM_COMMAND[text]) {
    text = ENV.CUSTOM_COMMAND[text].value;
  }
  if (ENV.DEV_MODE) {
    SYSTEM_COMMANDS.push(new EchoCommandHandler());
  }
  for (const key in ENV.PLUGINS_COMMAND) {
    if (text === key || text.startsWith(`${key} `)) {
      let template = ENV.PLUGINS_COMMAND[key].value.trim();
      if (template.startsWith("http")) {
        template = await fetch(template).then((r) => r.text());
      }
      const resp = await handlePluginCommand(message, key, text, JSON.parse(template), context);
      await recordCommandReply(resp, context);
      return resp;
    }
  }
  for (const cmd of SYSTEM_COMMANDS) {
    if (text === cmd.command || text.startsWith(`${cmd.command} `)) {
      const resp = await handleSystemCommand(message, text, cmd, context);
      await recordCommandReply(resp, context);
      return resp;
    }
  }
  return null;
}
async function recordCommandReply(resp, context) {
  try {
    const json = await resp.clone().json();
    if (json?.ok && json.result?.message_id) {
      await saveBotReplyGroup(context, [json.result.message_id]);
    }
  } catch (e) {
  }
}
function commandsBindScope() {
  const scopeCommandMap = {
    all_private_chats: [],
    all_group_chats: [],
    all_chat_administrators: []
  };
  for (const cmd of SYSTEM_COMMANDS) {
    if (ENV.HIDE_COMMAND_BUTTONS.includes(cmd.command)) {
      continue;
    }
    if (cmd.scopes) {
      for (const scope of cmd.scopes) {
        if (!scopeCommandMap[scope]) {
          scopeCommandMap[scope] = [];
        }
        const desc = ENV.I18N.command.help[cmd.command.substring(1)] || "";
        if (desc) {
          scopeCommandMap[scope].push({
            command: cmd.command,
            description: desc
          });
        }
      }
    }
  }
  for (const list of [ENV.CUSTOM_COMMAND, ENV.PLUGINS_COMMAND]) {
    for (const [cmd, config] of Object.entries(list)) {
      if (config.scope) {
        for (const scope of config.scope) {
          if (scope !== "all_private_chats") {
            continue;
          }
          if (!scopeCommandMap[scope]) {
            scopeCommandMap[scope] = [];
          }
          scopeCommandMap[scope].push({
            command: cmd,
            description: config.description || ""
          });
        }
      }
    }
  }
  const result = {};
  for (const scope in scopeCommandMap) {
    result[scope] = {
      commands: scopeCommandMap[scope],
      scope: {
        type: scope
      }
    };
  }
  return result;
}
function commandsForChatMember() {
  const list = [];
  for (const cmd of SYSTEM_COMMANDS) {
    if (ENV.HIDE_COMMAND_BUTTONS.includes(cmd.command)) {
      continue;
    }
    if (cmd.scopes && cmd.scopes.length === 0 && !cmd.adminOnly) {
      continue;
    }
    const desc = ENV.I18N.command.help[cmd.command.substring(1)] || "";
    if (desc) {
      list.push({
        command: cmd.command,
        description: desc
      });
    }
  }
  for (const list2 of [ENV.CUSTOM_COMMAND, ENV.PLUGINS_COMMAND]) {
    for (const [cmd, config] of Object.entries(list2)) {
      const scope = config.scope || [];
      if (scope.includes("all_private_chats")) {
        const desc = config.description || "";
        if (desc) {
          list.push({
            command: cmd,
            description: desc
          });
        }
      }
    }
  }
  return list;
}
function commandsDocument() {
  return SYSTEM_COMMANDS.map((command) => {
    return {
      command: command.command,
      description: ENV.I18N.command.help[command.command.substring(1)] || ""
    };
  }).filter((item) => item.description !== "");
}
class AgentListCallbackQueryHandler {
  prefix;
  changeAgentPrefix;
  agentLoader;
  needAuth = TELEGRAM_AUTH_CHECKER.adminOnly;
  constructor(prefix, changeAgentPrefix, agentLoader) {
    this.prefix = prefix;
    this.changeAgentPrefix = changeAgentPrefix;
    this.agentLoader = agentLoader;
    this.createKeyboard = this.createKeyboard.bind(this);
  }
  static Chat() {
    return new AgentListCallbackQueryHandler("al:", "ca:", (context) => {
      return CHAT_AGENTS.filter((agent) => agent.enable(context.USER_CONFIG)).map((agent) => agent.name);
    });
  }
  static Image() {
    return new AgentListCallbackQueryHandler("ial:", "ica:", (context) => {
      return IMAGE_AGENTS.filter((agent) => agent.enable(context.USER_CONFIG)).map((agent) => agent.name);
    });
  }
  handle = async (query, data, context) => {
    const names = this.agentLoader(context);
    const sender = MessageSender.fromCallbackQuery(context.SHARE_CONTEXT.botToken, query);
    const params = {
      chat_id: query.message?.chat.id || 0,
      message_id: query.message?.message_id || 0,
      text: ENV.I18N.callback_query.select_provider,
      reply_markup: {
        inline_keyboard: this.createKeyboard(names)
      }
    };
    return sender.editRawMessage(params);
  };
  createKeyboard(names) {
    const keyboards = [];
    for (let i = 0; i < names.length; i += 2) {
      const row = [];
      for (let j = 0; j < 2; j++) {
        const index = i + j;
        if (index >= names.length) {
          break;
        }
        row.push({
          text: names[index],
          callback_data: `${this.changeAgentPrefix}${JSON.stringify([names[index], 0])}`
        });
      }
      keyboards.push(row);
    }
    return keyboards;
  }
}
function changeChatAgentType(conf, agent) {
  return {
    ...conf,
    AI_PROVIDER: agent
  };
}
function changeImageAgentType(conf, agent) {
  return {
    ...conf,
    AI_IMAGE_PROVIDER: agent
  };
}
function loadAgentContext(query, data, context, prefix, agentLoader, changeAgentType) {
  if (!query.message) {
    throw new Error("no message");
  }
  const sender = MessageSender.fromCallbackQuery(context.SHARE_CONTEXT.botToken, query);
  const params = JSON.parse(data.substring(prefix.length));
  const agent = Array.isArray(params) ? params.at(0) : null;
  if (!agent) {
    throw new Error(`agent not found: ${agent}`);
  }
  const conf = changeAgentType(context.USER_CONFIG, agent);
  const theAgent = agentLoader(conf);
  if (!theAgent?.modelKey) {
    throw new Error(`modelKey not found: ${agent}`);
  }
  return { sender, params, agent: theAgent, conf };
}
class ModelListCallbackQueryHandler {
  prefix;
  agentListPrefix;
  changeModelPrefix;
  agentLoader;
  changeAgentType;
  needAuth = TELEGRAM_AUTH_CHECKER.adminOnly;
  constructor(prefix, agentListPrefix, changeModelPrefix, agentLoader, changeAgentType) {
    this.prefix = prefix;
    this.agentListPrefix = agentListPrefix;
    this.changeModelPrefix = changeModelPrefix;
    this.agentLoader = agentLoader;
    this.changeAgentType = changeAgentType;
    this.createKeyboard = this.createKeyboard.bind(this);
  }
  static Chat() {
    return new ModelListCallbackQueryHandler("ca:", "al:", "cm:", loadChatLLM, changeChatAgentType);
  }
  static Image() {
    return new ModelListCallbackQueryHandler("ica:", "ial:", "icm:", loadImageGen, changeImageAgentType);
  }
  async handle(query, data, context) {
    const { sender, params, agent: theAgent, conf } = loadAgentContext(query, data, context, this.prefix, this.agentLoader, this.changeAgentType);
    const [agent, page] = params;
    const models = await theAgent.modelList(conf);
    const message = {
      chat_id: query.message?.chat.id || 0,
      message_id: query.message?.message_id || 0,
      text: `${agent} | ${ENV.I18N.callback_query.select_model}`,
      reply_markup: {
        inline_keyboard: await this.createKeyboard(models, agent, page)
      }
    };
    return sender.editRawMessage(message);
  }
  async createKeyboard(models, agent, page) {
    const keyboard = [];
    const maxRow = 10;
    const maxCol = Math.max(1, Math.min(5, ENV.MODEL_LIST_COLUMNS));
    const maxPage = Math.ceil(models.length / maxRow / maxCol);
    let currentRow = [];
    for (let i = page * maxRow * maxCol; i < models.length; i++) {
      currentRow.push({
        text: models[i],
        callback_data: `${this.changeModelPrefix}${JSON.stringify([agent, models[i]])}`
      });
      if (i % maxCol === 0) {
        keyboard.push(currentRow);
        currentRow = [];
      }
      if (keyboard.length >= maxRow) {
        break;
      }
    }
    if (currentRow.length > 0) {
      keyboard.push(currentRow);
      currentRow = [];
    }
    keyboard.push([
      {
        text: "<",
        callback_data: `${this.prefix}${JSON.stringify([agent, Math.max(page - 1, 0)])}`
      },
      {
        text: `${page + 1}/${maxPage}`,
        callback_data: `${this.prefix}${JSON.stringify([agent, page])}`
      },
      {
        text: ">",
        callback_data: `${this.prefix}${JSON.stringify([agent, Math.min(page + 1, maxPage - 1)])}`
      },
      {
        text: "⇤",
        callback_data: this.agentListPrefix
      }
    ]);
    if (models.length > (page + 1) * maxRow * maxCol) {
      currentRow.push();
    }
    keyboard.push(currentRow);
    return keyboard;
  }
}
function changeChatAgentModel(agent, modelKey, model) {
  return {
    AI_PROVIDER: agent,
    [modelKey]: model
  };
}
function changeImageAgentModel(agent, modelKey, model) {
  return {
    AI_IMAGE_PROVIDER: agent,
    [modelKey]: model
  };
}
class ModelChangeCallbackQueryHandler {
  prefix;
  agentLoader;
  changeAgentType;
  createAgentChange;
  needAuth = TELEGRAM_AUTH_CHECKER.adminOnly;
  constructor(prefix, agentLoader, changeAgentType, createAgentChange) {
    this.prefix = prefix;
    this.agentLoader = agentLoader;
    this.changeAgentType = changeAgentType;
    this.createAgentChange = createAgentChange;
  }
  static Chat() {
    return new ModelChangeCallbackQueryHandler("cm:", loadChatLLM, changeChatAgentType, changeChatAgentModel);
  }
  static Image() {
    return new ModelChangeCallbackQueryHandler("icm:", loadImageGen, changeImageAgentType, changeImageAgentModel);
  }
  async handle(query, data, context) {
    const { sender, params, agent: theAgent } = loadAgentContext(query, data, context, this.prefix, this.agentLoader, this.changeAgentType);
    const [agent, model] = params;
    await context.execChangeAndSave(this.createAgentChange(agent, theAgent.modelKey, model));
    console.log("Change model:", agent, model);
    const message = {
      chat_id: query.message?.chat.id || 0,
      message_id: query.message?.message_id || 0,
      text: `${ENV.I18N.callback_query.change_model} ${agent} > ${model}`
    };
    return sender.editRawMessage(message);
  }
}
const QUERY_HANDLERS = [
  AgentListCallbackQueryHandler.Chat(),
  AgentListCallbackQueryHandler.Image(),
  ModelListCallbackQueryHandler.Chat(),
  ModelListCallbackQueryHandler.Image(),
  ModelChangeCallbackQueryHandler.Chat(),
  ModelChangeCallbackQueryHandler.Image()
];
async function handleCallbackQuery(callbackQuery, context) {
  const sender = MessageSender.fromCallbackQuery(context.SHARE_CONTEXT.botToken, callbackQuery);
  const answerCallbackQuery = (msg) => {
    return sender.api.answerCallbackQuery({
      callback_query_id: callbackQuery.id,
      text: msg
    });
  };
  try {
    if (!callbackQuery.message) {
      return null;
    }
    const chatId = callbackQuery.message.chat.id;
    const speakerId = callbackQuery.from?.id || chatId;
    const chatType = callbackQuery.message.chat.type;
    for (const handler of QUERY_HANDLERS) {
      if (handler.needAuth) {
        const roleList = handler.needAuth(chatType);
        if (roleList) {
          let allowed = false;
          if (roleList.includes(ADMIN_AUTH_MARK)) {
            const isAdmin = isAdminUserId(speakerId);
            if (isAdmin === true || isAnonymousAdminMessage(speakerId, chatType)) {
              allowed = true;
            } else if (isAdmin === false) {
              return answerCallbackQuery("ERROR: Permission denied, admin only");
            } else {
              if (!isGroupChat(chatType)) {
                return answerCallbackQuery("ERROR: Permission denied, admin only");
              }
              const chatRole = await loadChatRoleWithContext(chatId, speakerId, context);
              if (chatRole === null) {
                return answerCallbackQuery("ERROR: Get chat role failed");
              }
              if (chatRole !== "administrator" && chatRole !== "creator") {
                return answerCallbackQuery("ERROR: Permission denied, admin only");
              }
              allowed = true;
            }
          } else {
            const chatRole = await loadChatRoleWithContext(chatId, speakerId, context);
            if (chatRole === null) {
              return answerCallbackQuery("ERROR: Get chat role failed");
            }
            if (!roleList.includes(chatRole)) {
              return answerCallbackQuery(`ERROR: Permission denied, need ${roleList.join(" or ")}`);
            }
            allowed = true;
          }
          if (!allowed) {
            return answerCallbackQuery("ERROR: Permission denied");
          }
        }
      }
      if (callbackQuery.data) {
        if (callbackQuery.data.startsWith(handler.prefix)) {
          return handler.handle(callbackQuery, callbackQuery.data, context);
        }
      }
    }
  } catch (e) {
    console.error("handleCallbackQuery", e);
    return answerCallbackQuery(`ERROR: ${e.message}`);
  }
  return null;
}
const MENU_SYNC_KEY_PREFIX = "admin_menu_synced:";
const MENU_SYNC_TTL_SECONDS = 7 * 24 * 60 * 60;
class AdminMenuSync {
  handle = async (message, context) => {
    if (isGroupChat(message.chat.type)) {
      return null;
    }
    const speakerId = message.from?.id;
    if (speakerId == null) {
      return null;
    }
    const isAdmin = isAdminUserId(speakerId);
    if (isAdmin !== true) {
      return null;
    }
    const botToken = context.SHARE_CONTEXT.botToken;
    const botId = botToken.split(":")[0];
    void this.syncAdminMenu(botToken, speakerId, botId).catch((e) => console.error("AdminMenuSync error:", e));
    return null;
  };
  async syncAdminMenu(botToken, speakerId, botId) {
    try {
      const syncKey = `${MENU_SYNC_KEY_PREFIX}${speakerId}:${botId}`;
      if (await ENV.DATABASE.get(syncKey)) {
        return;
      }
      const commands = commandsForChatMember();
      const api = createTelegramBotAPI(botToken);
      const params = {
        commands,
        scope: {
          type: "chat",
          chat_id: speakerId
        }
      };
      await api.setMyCommands(params);
      await ENV.DATABASE.put(syncKey, "1", { expirationTtl: MENU_SYNC_TTL_SECONDS });
    } catch (e) {
      console.error("AdminMenuSync error:", e);
    }
  }
}
class EnvChecker {
  handle = async (update, context) => {
    if (!ENV.DATABASE) {
      return MessageSender.fromUpdate(context.SHARE_CONTEXT.botToken, update).sendPlainText("DATABASE Not Set");
    }
    return null;
  };
}
class WhiteListFilter {
  handle = async (update, context) => {
    if (ENV.I_AM_A_GENEROUS_PERSON) {
      return null;
    }
    const sender = MessageSender.fromUpdate(context.SHARE_CONTEXT.botToken, update);
    let chatType = "";
    let chatID = 0;
    if (update.message) {
      chatType = update.message.chat.type;
      chatID = update.message.chat.id;
    } else if (update.callback_query?.message) {
      chatType = update.callback_query.message.chat.type;
      chatID = update.callback_query.message.chat.id;
    }
    if (!chatType || !chatID) {
      throw new Error("Invalid chat type or chat id");
    }
    const text = `You are not in the white list, please contact the administrator to add you to the white list. Your chat_id: ${chatID}`;
    if (chatType === "private") {
      if (!ENV.CHAT_WHITE_LIST.includes(`${chatID}`)) {
        return sender.sendPlainText(text);
      }
      return null;
    }
    if (isGroupChat(chatType)) {
      if (!ENV.GROUP_CHAT_BOT_ENABLE) {
        throw new Error("Not support");
      }
      if (!ENV.CHAT_GROUP_WHITE_LIST.includes(`${chatID}`)) {
        return sender.sendPlainText(text);
      }
      return null;
    }
    return sender.sendPlainText(
      `Not support chat type: ${chatType}`
    );
  };
}
class Update2MessageHandler {
  messageHandlers;
  constructor(messageHandlers) {
    this.messageHandlers = messageHandlers;
  }
  loadMessage(body) {
    if (body.edited_message) {
      throw new Error("Ignore edited message");
    }
    if (body.message) {
      return body?.message;
    } else {
      throw new Error("Invalid message");
    }
  }
  handle = async (update, context) => {
    const message = this.loadMessage(update);
    if (!message) {
      return null;
    }
    for (const handler of this.messageHandlers) {
      const handlerName = handler.constructor.name;
      let result = null;
      try {
        result = await handler.handle(message, context);
      } catch (e) {
        console.error(`[diag] 中间件 ${handlerName} 拋异常:`, e.message);
        throw e;
      }
      if (result) {
        console.log(`[diag] 中间件 ${handlerName} 返回响应, 中断后续链`);
        return result;
      }
      console.log(`[diag] 中间件 ${handlerName} 放行 -> 下一个`);
    }
    return null;
  };
}
class CallbackQueryHandler {
  handle = async (update, context) => {
    if (update.callback_query) {
      return handleCallbackQuery(update.callback_query, context);
    }
    return null;
  };
}
class SaveLastMessage {
  handle = async (message, context) => {
    if (!ENV.DEBUG_MODE) {
      return null;
    }
    const lastMessageKey = `last_message:${context.SHARE_CONTEXT.chatHistoryKey}`;
    await ENV.DATABASE.put(lastMessageKey, JSON.stringify(message), { expirationTtl: 3600 });
    return null;
  };
}
class OldMessageFilter {
  handle = async (message, context) => {
    if (!ENV.SAFE_MODE) {
      return null;
    }
    let idList = [];
    try {
      idList = JSON.parse(await ENV.DATABASE.get(context.SHARE_CONTEXT.lastMessageKey).catch(() => "[]")) || [];
    } catch (e) {
      console.error(e);
    }
    if (idList.includes(message.message_id)) {
      console.log("[diag] OldMessageFilter: 重复消息(Telegram重试), 静默跳过");
      return null;
    } else {
      idList.push(message.message_id);
      if (idList.length > 100) {
        idList.shift();
      }
      await ENV.DATABASE.put(context.SHARE_CONTEXT.lastMessageKey, JSON.stringify(idList));
    }
    return null;
  };
}
class MessageFilter {
  handle = async (message, context) => {
    if (message.text) {
      return null;
    }
    if (message.caption) {
      return null;
    }
    if (message.photo) {
      return null;
    }
    throw new Error("Not supported message type");
  };
}
class CommandHandler {
  handle = async (message, context) => {
    if (message.text || message.caption) {
      return await handleCommandMessage(message, context);
    }
    return null;
  };
}
class ChatHandler {
  handle = async (message, context) => {
    const params = await extractUserMessageItem(message, context);
    return chatWithMessage(message, params, context, null);
  };
}
const SHARE_HANDLER = [
  new EnvChecker(),
  new WhiteListFilter(),
  new CallbackQueryHandler(),
  new Update2MessageHandler([
    new MessageFilter(),
    new AdminMenuSync(),
    new GroupMention(),
    new OldMessageFilter(),
    new SaveLastMessage(),
    new CommandHandler(),
    new ChatHandler()
  ])
];
async function handleUpdate(token, update) {
  let context;
  try {
    context = await WorkerContext.from(token, update);
  } catch (e) {
    console.error("[diag] WorkerContext.from 异常:", e.message, "\nstack:", e.stack);
    return new Response(JSON.stringify({
      message: e.message,
      stack: e.stack
    }), { status: 500 });
  }
  if (context === null) {
    return null;
  }
  for (const handler of SHARE_HANDLER) {
    try {
      const result = await handler.handle(update, context);
      if (result) {
        return result;
      }
    } catch (e) {
      console.error("[diag] handleUpdate 异常:", e.message, "\nstack:", e.stack);
      return new Response(JSON.stringify({
        message: e.message,
        stack: e.stack
      }), { status: 500 });
    }
  }
  return null;
}
function renderHTML(body) {
  return `
<html lang="en">  
  <head>
    <title>ChatGPT-Telegram-Workers</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="ChatGPT-Telegram-Workers">
    <meta name="author" content="TBXark">
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        text-align: left;
        background-color: #fff;
      }
      h1 {
        margin-top: 0;
        margin-bottom: 0.5rem;
      }
      p {
        margin-top: 0;
        margin-bottom: 1rem;
      }
      a {
        color: #007bff;
        text-decoration: none;
        background-color: transparent;
      }
      a:hover {
        color: #0056b3;
        text-decoration: underline;
      }
      strong {
        font-weight: bolder;
      }
    </style>
  </head>
  <body>
    ${body}
  </body>
</html>
  `;
}
function errorToString(e) {
  return JSON.stringify({
    message: e.message,
    stack: e.stack
  });
}
function makeResponse200(resp) {
  if (resp === null) {
    return new Response("NOT HANDLED", { status: 200 });
  }
  if (resp.status === 200) {
    return resp;
  } else {
    return new Response(resp.body, {
      status: 200,
      headers: {
        "Original-Status": `${resp.status}`,
        ...resp.headers
      }
    });
  }
}
class Router {
  routes;
  base;
  errorHandler = async (req, error) => new Response(errorToString(error), { status: 500 });
  constructor({ base = "", routes = [], ...other } = {}) {
    this.routes = routes;
    this.base = base;
    Object.assign(this, other);
    this.fetch = this.fetch.bind(this);
    this.route = this.route.bind(this);
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);
    this.patch = this.patch.bind(this);
    this.head = this.head.bind(this);
    this.options = this.options.bind(this);
    this.all = this.all.bind(this);
  }
  parseQueryParams(searchParams) {
    const query = {};
    searchParams.forEach((v, k) => {
      query[k] = k in query ? [...Array.isArray(query[k]) ? query[k] : [query[k]], v] : v;
    });
    return query;
  }
  normalizePath(path) {
    return path.replace(/\/+(\/|$)/g, "$1");
  }
  createRouteRegex(path) {
    return new RegExp(`^${path.replace(/\\/g, "\\\\").replace(/(\/?\.?):(\w+)\+/g, "($1(?<$2>*))").replace(/(\/?\.?):(\w+)/g, "($1(?<$2>[^$1/]+?))").replace(/\./g, "\\.").replace(/(\/?)\*/g, "($1.*)?")}/*$`);
  }
  async fetch(request, ...args) {
    try {
      const url = new URL(request.url);
      const reqMethod = request.method.toUpperCase();
      request.query = this.parseQueryParams(url.searchParams);
      for (const [method, regex, handlers, path] of this.routes) {
        let match = null;
        if ((method === reqMethod || method === "ALL") && (match = url.pathname.match(regex))) {
          request.params = match?.groups || {};
          request.route = path;
          for (const handler of handlers) {
            const response = await handler(request, ...args);
            if (response != null) {
              return response;
            }
          }
        }
      }
      return new Response("Not Found", { status: 404 });
    } catch (e) {
      return this.errorHandler(request, e);
    }
  }
  route(method, path, ...handlers) {
    const route = this.normalizePath(this.base + path);
    const regex = this.createRouteRegex(route);
    this.routes.push([method.toUpperCase(), regex, handlers, route]);
    return this;
  }
  get(path, ...handlers) {
    return this.route("GET", path, ...handlers);
  }
  post(path, ...handlers) {
    return this.route("POST", path, ...handlers);
  }
  put(path, ...handlers) {
    return this.route("PUT", path, ...handlers);
  }
  delete(path, ...handlers) {
    return this.route("DELETE", path, ...handlers);
  }
  patch(path, ...handlers) {
    return this.route("PATCH", path, ...handlers);
  }
  head(path, ...handlers) {
    return this.route("HEAD", path, ...handlers);
  }
  options(path, ...handlers) {
    return this.route("OPTIONS", path, ...handlers);
  }
  all(path, ...handlers) {
    return this.route("ALL", path, ...handlers);
  }
}
const helpLink = "https://github.com/TBXark/ChatGPT-Telegram-Workers/blob/master/doc/en/DEPLOY.md";
const issueLink = "https://github.com/TBXark/ChatGPT-Telegram-Workers/issues";
const initLink = "./init";
const footer = `
<br/>
<p>For more information, please visit <a href="${helpLink}">${helpLink}</a></p>
<p>If you have any questions, please visit <a href="${issueLink}">${issueLink}</a></p>
`;
async function bindWebHookAction(request) {
  const result = {};
  const domain = new URL(request.url).host;
  const hookMode = ENV.API_GUARD ? "safehook" : "webhook";
  const scope = commandsBindScope();
  for (const token of ENV.TELEGRAM_AVAILABLE_TOKENS) {
    const api = createTelegramBotAPI(token);
    const url = `https://${domain}/telegram/${token.trim()}/${hookMode}`;
    const id = token.split(":")[0];
    result[id] = {};
    result[id].webhook = await api.setWebhook({ url }).then((res) => res.json()).catch((e) => errorToString(e));
    for (const [s, data] of Object.entries(scope)) {
      if (data.commands.length === 0) {
        result[id][s] = await api.deleteMyCommands({ scope: data.scope }).then((res) => res.json()).catch((e) => errorToString(e));
      } else {
        result[id][s] = await api.setMyCommands(data).then((res) => res.json()).catch((e) => errorToString(e));
      }
    }
  }
  let html = `<h1>ChatGPT-Telegram-Workers</h1>`;
  html += `<h2>${domain}</h2>`;
  if (ENV.TELEGRAM_AVAILABLE_TOKENS.length === 0) {
    html += `<p style="color: red">Please set the <strong> TELEGRAM_AVAILABLE_TOKENS </strong> environment variable in Cloudflare Workers.</p> `;
  } else {
    for (const [key, res] of Object.entries(result)) {
      html += `<h3>Bot: ${key}</h3>`;
      for (const [s, data] of Object.entries(res)) {
        html += `<p style="color: ${data.ok ? "green" : "red"}">${s}: ${JSON.stringify(data)}</p>`;
      }
    }
  }
  html += footer;
  const HTML = renderHTML(html);
  return new Response(HTML, { status: 200, headers: { "Content-Type": "text/html" } });
}
async function telegramWebhook(request) {
  try {
    const { token } = request.params;
    const body = await request.json();
    return makeResponse200(await handleUpdate(token, body));
  } catch (e) {
    console.error(e);
    return new Response(errorToString(e), { status: 200 });
  }
}
async function telegramSafeHook(request) {
  try {
    if (ENV.API_GUARD === void 0 || ENV.API_GUARD === null) {
      return telegramWebhook(request);
    }
    console.log("API_GUARD is enabled");
    const url = new URL(request.url);
    url.pathname = url.pathname.replace("/safehook", "/webhook");
    const newRequest = new Request(url, request);
    return makeResponse200(await ENV.API_GUARD.fetch(newRequest));
  } catch (e) {
    console.error(e);
    return new Response(errorToString(e), { status: 200 });
  }
}
async function defaultIndexAction() {
  const HTML = renderHTML(`
    <h1>ChatGPT-Telegram-Workers</h1>
    <br/>
    <p>Deployed Successfully!</p>
    <p> Version (ts:${ENV.BUILD_TIMESTAMP},sha:${ENV.BUILD_VERSION})</p>
    <br/>
    <p>You must <strong><a href="${initLink}"> >>>>> click here <<<<< </a></strong> to bind the webhook.</p>
    <br/>
    <p>After binding the webhook, you can use the following commands to control the bot:</p>
    ${commandsDocument().map((item) => `<p><strong>${item.command}</strong> - ${item.description}</p>`).join("")}
    <br/>
    <p>You can get bot information by visiting the following URL:</p>
    <p><strong>/telegram/:token/bot</strong> - Get bot information</p>
    ${footer}
  `);
  return new Response(HTML, { status: 200, headers: { "Content-Type": "text/html" } });
}
function createRouter() {
  const router = new Router();
  router.get("/", defaultIndexAction);
  router.get("/init", bindWebHookAction);
  router.post("/telegram/:token/webhook", telegramWebhook);
  router.post("/telegram/:token/safehook", telegramSafeHook);
  router.all("*", () => new Response("Not Found", { status: 404 }));
  return router;
}
const Workers = {
  async fetch(request, env) {
    try {
      ENV.merge(env);
      return createRouter().fetch(request);
    } catch (e) {
      console.error(e);
      return new Response(JSON.stringify({
        message: e.message,
        stack: e.stack
      }), { status: 500 });
    }
  }
};

export { Workers as default };
//# sourceMappingURL=index.js.map
