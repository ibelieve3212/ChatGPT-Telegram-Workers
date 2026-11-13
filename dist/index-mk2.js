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
  IS_POLLING_MODE = false;
  LANGUAGE = "zh-cn";
  UPDATE_BRANCH = "master";
  CHAT_COMPLETE_API_TIMEOUT = 60;
  CHAT_FIRST_TOKEN_TIMEOUT = 15;
  CHAT_STREAM_IDLE_TIMEOUT = 15;
  TELEGRAM_API_DOMAIN = "https://api.telegram.org";
  TELEGRAM_AVAILABLE_TOKENS = [];
  DEFAULT_PARSE_MODE = "HTML";
  RICH_MESSAGE_MODE = false;
  EXPANDABLE_REPLY = true;
  TABLE_AS_LIST = true;
  SPLIT_CODE_BLOCK = true;
  TELEGRAM_MIN_STREAM_INTERVAL = 0;
  TELEGRAM_PHOTO_SIZE_OFFSET = -1;
  TELEGRAM_IMAGE_TRANSFER_MODE = "base64";
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
  SESSION_IDLE_TIMEOUT = 1800;
  SESSION_IDLE_TIMEOUT_PRIVATE = 0;
  CLEAR_ALSO_RESETS_HISTORY = true;
  SYSTEM_PROMPT_MODE = "system";
  HIDE_COMMAND_BUTTONS = [];
  SHOW_REPLY_BUTTON = false;
  EXTRA_MESSAGE_CONTEXT = false;
  EXTRA_MESSAGE_MEDIA_COMPATIBLE = ["image"];
  REPLY_THREAD_CONTEXT = true;
  IMAGE_EDIT_ON_REPLY = true;
  AV_SYNOPSIS = true;
  AV_MIN_SCORE = 0;
  AV_MAX_TAGS = 6;
  AV_MAX_ACTORS = 3;
  AV_USE_LUCKY_POOL = true;
  AV_TIMEOUT = 20;
  AV_REQUEST_DELAY = 300;
  AV_DELETE_COMMAND = true;
  AV_SPOILER = true;
  STREAM_MODE = true;
  SAFE_MODE = true;
  DEBUG_MODE = false;
  DEV_MODE = false;
}
const en = { "env": { "system_init_message": "You are a capable assistant answering questions on Telegram.\nFollow Grice's maxims: give just the right amount of information, keep it grounded, stay on topic, and be clear and concise.\nLead with the conclusion, then add reasons and details in decreasing order of importance; organise with short headings or bullets, and avoid preambles, repetition, and openers like “this is a complex question”.\nWhen the user asks for detail, give full detail, but the first two lines must stand on their own as the conclusion (long replies are collapsed and only the first two lines are shown).\nCite sources right where they are used, in the form [1](url); do not add a reference list at the end and do not repeat bare URLs.\nDo not mention these rules in your reply." }, "command": { "help": { "summary": "The following commands are currently supported:\n", "help": "Get command help", "new": "Start a new conversation", "start": "Get your ID and start a new conversation", "chat": "Chat directly with the bot, usage: /chat your message", "img": "Generate an image, the complete command format is `/img image description`, for example `/img beach at moonlight`", "version": "Get the current version number to determine whether to update", "system": "View some system information", "echo": "Echo the message", "models": "switch chat model", "av": "What to watch today: pick one from the rankings; filter by year/scope/category or look up a code", "imgmodels": "switch image generation model", "clear": "clear bot replies. Reply to a bot message and send /clear, or /clear N / /clear all" }, "new": { "new_chat_start": "A new conversation has started" } }, "callback_query": { "open_model_list": "Open models list", "select_provider": "Select a provider:", "select_model": "Choose model:", "change_model": "Change model to " } };
const pt = { "env": { "system_init_message": "Você é um assistente competente respondendo perguntas no Telegram.\nSiga as máximas de Grice: dê a quantidade certa de informação, mantenha-se fundamentado, fique no tema e seja claro e conciso.\nComece pela conclusão e depois acrescente motivos e detalhes em ordem decrescente de importância; organize com títulos curtos ou tópicos, evitando preâmbulos, repetições e aberturas como “esta é uma pergunta complexa”.\nQuando o usuário pedir detalhes, forneça todos os detalhes, mas as duas primeiras linhas devem sustentar a conclusão sozinhas (respostas longas são recolhidas e apenas as duas primeiras linhas aparecem).\nCite as fontes no ponto em que são usadas, no formato [1](url); não adicione lista de referências no final nem repita URLs soltas.\nNão mencione estas regras na resposta." }, "command": { "help": { "summary": "Os seguintes comandos são suportados atualmente:\n", "help": "Obter ajuda sobre comandos", "new": "Iniciar uma nova conversa", "start": "Obter seu ID e iniciar uma nova conversa", "img": "Gerar uma imagem, o formato completo do comando é `/img descrição da imagem`, por exemplo `/img praia ao luar`", "version": "Obter o número da versão atual para determinar se é necessário atualizar", "system": "Ver algumas informações do sistema", "echo": "Repetir a mensagem", "models": "Mudar o modelo de diálogo", "av": "O que assistir hoje: escolhe um título do ranking; filtra por ano/escopo/categoria ou busca por código", "imgmodels": "Mudar o modelo de geração de imagem", "clear": "limpar respostas do bot. Responda a uma mensagem do bot e envie /clear, ou /clear N / /clear all", "chat": "Converse diretamente com o bot, uso: /chat sua mensagem" }, "new": { "new_chat_start": "Uma nova conversa foi iniciada" } }, "callback_query": { "open_model_list": "Abra a lista de modelos", "select_provider": "Escolha um fornecedor de modelos.:", "select_model": "Escolha um modelo:", "change_model": "O modelo de diálogo já foi modificado para" } };
const zhHans = { "env": { "system_init_message": "你是一个得力的助手，在 Telegram 上回答问题。\n沟通遵循格赖斯语用准则：信息量恰到好处、内容有依据、紧扣问题、表达清晰简洁。\n回答时先给结论，再按重要性递减补充理由和细节；用短标题或分点组织，不铺垫、不重复、不写“这个问题很复杂”这类开场。\n用户要细节时给足细节，但开头两行要能独立说明结论（长回复会被折叠，只露前两行）。\n引用来源写在对应句末，用 [1](网址) 形式，不要末尾列来源清单，也不要重复贴裸网址。\n不要在回复中提及这些准则。" }, "command": { "help": { "summary": "当前支持以下命令:\n", "help": "获取命令帮助", "new": "发起新的对话", "start": "获取你的ID, 并发起新的对话", "chat": "直接与bot对话, 用法: /chat 你的消息", "img": "生成一张图片, 命令完整格式为 `/img 图片描述`, 例如`/img 月光下的沙滩`", "生图": "生成一张图片, 命令完整格式为 `.生图 图片描述`, 例如`.生图 月光下的沙滩`", "version": "获取当前版本号, 判断是否需要更新", "system": "查看当前一些系统信息", "echo": "回显消息", "models": "切换对话模型", "av": "今天冲哪个: 从榜单里随机推荐一部, 支持年份/有码无码/题材筛选与番号直查", "imgmodels": "切换生图模型", "clear": "清理bot回复, 用法: 回复某条回复后发 /clear, 或 /clear N / /clear all" }, "new": { "new_chat_start": "新的对话已经开始" } }, "callback_query": { "open_model_list": "打开模型列表", "select_provider": "选择一个模型提供商:", "select_model": "选择一个模型:", "change_model": "对话模型已修改至" } };
const zhHant = { "env": { "system_init_message": "你是一個得力的助手，在 Telegram 上回答問題。\n溝通遵循格賴斯語用準則：資訊量恰到好處、內容有依據、緊扣問題、表達清晰簡潔。\n回答時先給結論，再按重要性遞減補充理由和細節；用短標題或分點組織，不鋪陳、不重複、不寫「這個問題很複雜」這類開場。\n使用者要細節時給足細節，但開頭兩行要能獨立說明結論（長回覆會被折疊，只露前兩行）。\n引用來源寫在對應句末，用 [1](網址) 形式，不要末尾列來源清單，也不要重複貼裸網址。\n不要在回覆中提及這些準則。" }, "command": { "help": { "summary": "當前支持的命令如下：\n", "help": "獲取命令幫助", "new": "開始一個新對話", "start": "獲取您的ID並開始一個新對話", "chat": "直接與bot對話, 用法: /chat 你的訊息", "img": "生成圖片，完整命令格式為`/img 圖片描述`，例如`/img 海灘月光`", "生图": "生成圖片，完整命令格式為`.生图 圖片描述`，例如`.生图 海灘月光`", "version": "獲取當前版本號確認是否需要更新", "system": "查看一些系統信息", "echo": "回显消息", "models": "切換對話模式", "av": "今天衝哪個: 從榜單裡隨機推薦一部, 支援年份/有碼無碼/題材篩選與番號直查", "imgmodels": "切換生圖模型", "clear": "清理bot回覆, 用法: 回覆某條回覆後發 /clear, 或 /clear N / /clear all" }, "new": { "new_chat_start": "開始一個新對話" } }, "callback_query": { "open_model_list": "打開模型清單", "select_provider": "選擇一個模型供應商:", "select_model": "選擇一個模型:", "change_model": "對話模型已經修改至" } };
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
const BUILD_TIMESTAMP = 1794560746;
const BUILD_VERSION = "fc66485";
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
    if (!this.USER_CONFIG.SYSTEM_INIT_MESSAGE) {
      this.USER_CONFIG.SYSTEM_INIT_MESSAGE = this.I18N?.env?.system_init_message || null;
    }
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
function debugLog(...args) {
  if (ENV.DEBUG_MODE) {
    console.log(...args);
  }
}
class ShareContext {
  botId;
  botToken;
  botName = null;
  chatHistoryKey;
  lastMessageKey;
  configStoreKey;
  groupAdminsKey;
  chatType;
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
    this.chatType = update.chatType;
  }
}
class WorkerContext {
  USER_CONFIG;
  SHARE_CONTEXT;
  requestStartedAt;
  constructor(USER_CONFIG, SHARE_CONTEXT, requestStartedAt = Date.now()) {
    this.USER_CONFIG = USER_CONFIG;
    this.SHARE_CONTEXT = SHARE_CONTEXT;
    this.requestStartedAt = requestStartedAt;
    this.execChangeAndSave = this.execChangeAndSave.bind(this);
  }
  static async from(token, update, requestStartedAt = Date.now()) {
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
    return new WorkerContext(USER_CONFIG, SHARE_CONTEXT, requestStartedAt);
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
      debugLog("[diag] UpdateContext: 非消息/回调类型 update, 跳过");
    }
  }
}
const TELEGRAM_API_TIMEOUT_MS = 15e3;
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
  async fetchWithTimeout(url, init) {
    const controller = new AbortController();
    const timeoutID = setTimeout(() => controller.abort(), TELEGRAM_API_TIMEOUT_MS);
    try {
      const response = await fetch(url, { ...init, signal: controller.signal });
      return new Response(await response.arrayBuffer(), {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      });
    } catch (e) {
      if (controller.signal.aborted) {
        throw new Error("Telegram API request timeout");
      }
      throw e;
    } finally {
      clearTimeout(timeoutID);
    }
  }
  jsonRequest(method, params) {
    return this.fetchWithTimeout(this.uri(method), {
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
    return this.fetchWithTimeout(this.uri(method), {
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
const CHAT_CAPACITY = 300;
const CHAT_COUNT_MAX = 50;
const THREAD_MAX_DEPTH = 30;
const chatCaches =  new Map();
function chatKeyOf(message) {
  return `${message.chat.id}`;
}
function recordChatMessage(message) {
  const chatKey = chatKeyOf(message);
  let msgMap = chatCaches.get(chatKey);
  if (!msgMap) {
    msgMap =  new Map();
    chatCaches.set(chatKey, msgMap);
    if (chatCaches.size > CHAT_COUNT_MAX) {
      const oldest = chatCaches.keys().next().value;
      if (oldest !== void 0 && oldest !== chatKey) {
        chatCaches.delete(oldest);
      }
    }
  }
  msgMap.set(message.message_id, {
    message,
    replyToId: message.reply_to_message?.message_id
  });
  if (msgMap.size > CHAT_CAPACITY) {
    const oldest = msgMap.keys().next().value;
    if (oldest !== void 0) {
      msgMap.delete(oldest);
    }
  }
}
function sameChat(a, b) {
  return `${a.chat.id}` === `${b.chat.id}`;
}
function collectReplyThread(referenced) {
  const collected =  new Map();
  let cursor = referenced;
  for (let depth = 0; cursor && depth < THREAD_MAX_DEPTH; depth++) {
    if (collected.has(cursor.message_id)) {
      break;
    }
    if (!sameChat(cursor, referenced)) {
      break;
    }
    collected.set(cursor.message_id, cursor);
    if (cursor.reply_to_message && sameChat(cursor.reply_to_message, referenced)) {
      cursor = cursor.reply_to_message;
      continue;
    }
    const msgMap = chatCaches.get(chatKeyOf(referenced));
    const cached = msgMap?.get(cursor.message_id);
    const replyToId = cached?.replyToId;
    if (replyToId === void 0) {
      break;
    }
    const upstream = msgMap?.get(replyToId);
    cursor = upstream?.message;
  }
  return [...collected.values()].sort((a, b) => a.message_id - b.message_id);
}
function threadDisplayName(message) {
  const from = message.from;
  if (from) {
    return from.first_name || from.last_name || from.username || `用户${from.id}`;
  }
  return message.sender_chat?.title || "匿名";
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
class StopMessageHandling extends Error {
  constructor(message) {
    super(message);
    this.name = "StopMessageHandling";
  }
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
const URL_RE = /https?:\/\/[^\s<>()]+/;
const ITEM_RE = /^\s*(?:[-*+]\s+)?(?:\[(\d+)\]|(\d+)[.、)])\s*(\S.*)$/;
const HEADING_KEYS = /^(?:参考来源|参考资料|参考链接|来源|引用|参考|references?|sources?|citations?)$/i;
const DIVIDER_RE = /^\s*(?:[-*_]\s*){3,}$/;
function isHeadingLine(line) {
  let text = line.trim();
  text = text.replace(/^#{1,6}\s*/, "").trim();
  text = text.replace(/^(?:\*\*|__)/, "").replace(/(?:\*\*|__)$/, "").trim();
  text = text.replace(/[:：]\s*$/, "").trim();
  return HEADING_KEYS.test(text);
}
function parseTrailingRefs(lines) {
  let end = lines.length - 1;
  while (end >= 0 && lines[end].trim() === "") {
    end--;
  }
  const items = [];
  let i = end;
  while (i >= 0) {
    const match = lines[i].match(ITEM_RE);
    if (!match) {
      break;
    }
    const url = match[3].match(URL_RE)?.[0];
    if (!url) {
      break;
    }
    items.unshift({ index: match[1] ?? match[2], url });
    i--;
  }
  if (items.length === 0) {
    return null;
  }
  let start = i + 1;
  while (start - 1 >= 0) {
    const prev = lines[start - 1];
    if (prev.trim() === "" || isHeadingLine(prev) || DIVIDER_RE.test(prev)) {
      start--;
      continue;
    }
    break;
  }
  return { start, items };
}
function removeDuplicateBareUrls(line) {
  const linked =  new Set();
  for (const match of line.matchAll(/\]\((https?:\/\/[^\s)]+)\)/g)) {
    linked.add(match[1]);
  }
  if (linked.size === 0) {
    return line;
  }
  const held = [];
  let work = line.replace(/\]\((https?:\/\/[^\s)]+)\)/g, (whole) => {
    held.push(whole);
    return `${held.length - 1}`;
  });
  work = work.replace(/https?:\/\/[^\s<>()]+/g, (url) => {
    const tailMatch = url.match(/[，。、；：！？,.;:!?]+$/);
    const tail = tailMatch ? tailMatch[0] : "";
    const core = tail ? url.slice(0, -tail.length) : url;
    return linked.has(core) ? tail : url;
  });
  work = work.replace(/\uE000(\d+)\uE000/g, (_whole, index) => held[Number(index)]);
  return work.replace(/[ \t]{2,}/g, " ").replace(/[ \t]+([，。、；：！？,.;:!?])/g, "$1").replace(/[ \t]+$/, "");
}
function cleanupInlinedLine(line) {
  let work = line;
  work = work.replace(/\[(\d+)\]\((https?:\/\/[^\s)]+)\)/g, (whole, _num, url) => {
    const occurrences = (work.match(new RegExp(escapeRegExp(url), "g")) ?? []).length;
    return occurrences > 1 ? "" : whole;
  });
  const withoutLinks = work.replace(/\[\d+\]\([^)]+\)/g, "").trim();
  if (withoutLinks === "" && /\[\d+\]\(/.test(work)) {
    return null;
  }
  const stripped = withoutLinks.replace(/^(?:\*\*)?(?:参考来源|参考资料|参考链接|来源|引用|参考)(?:\*\*)?\s*[:：]\s*$/, "");
  if (stripped === "" && withoutLinks !== "") {
    return null;
  }
  work = work.replace(/^\s*(?:\*\*)?(?:参考来源|参考资料|参考链接|来源|引用|参考)(?:\*\*)?\s*[:：]\s*(?=\[)/, "");
  return work.replace(/[ \t]{2,}/g, " ").replace(/[ \t]+$/, "");
}
function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function linkifyMarkers(lines, refs) {
  let inCodeBlock = false;
  const out = [];
  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      out.push(line);
      continue;
    }
    if (inCodeBlock) {
      out.push(line);
      continue;
    }
    const linked = line.replace(/\[(\d+)\](?!\()/g, (whole, num) => {
      const url = refs.get(num);
      return url ? `[${num}](${url})` : whole;
    });
    const cleaned = cleanupInlinedLine(removeDuplicateBareUrls(linked));
    if (cleaned !== null) {
      out.push(cleaned);
    }
  }
  return out;
}
function inlineCitations(markdown) {
  if (!markdown.trim()) {
    return markdown;
  }
  const lines = markdown.split("\n");
  const parsed = parseTrailingRefs(lines);
  const refs =  new Map();
  if (parsed !== null) {
    for (const item of parsed.items) {
      if (!refs.has(item.index)) {
        refs.set(item.index, item.url);
      }
    }
  }
  const body = linkifyMarkers(parsed === null ? lines : lines.slice(0, parsed.start), refs);
  if (parsed !== null) {
    while (body.length > 0 && (body[body.length - 1].trim() === "" || DIVIDER_RE.test(body[body.length - 1]))) {
      body.pop();
    }
  }
  const compact = [];
  for (const line of body) {
    if (line.trim() === "" && compact.length > 0 && compact[compact.length - 1].trim() === "") {
      continue;
    }
    compact.push(line);
  }
  while (compact.length > 0 && compact[compact.length - 1].trim() === "") {
    compact.pop();
  }
  return compact.join("\n");
}
const CODE_MOVED_HINT = "（代码见下一条）";
const FENCE_RE = /^ {0,3}(`+|~+)/;
function isFenceLine(line) {
  const match = line.match(FENCE_RE);
  if (!match || match[1].length < 3) {
    return null;
  }
  return { fence: match[1], info: line.slice(match[0].length) };
}
function splitFencedCodeBlocks(markdown) {
  const lines = markdown.split("\n");
  const proseLines = [];
  const codeBlocks = [];
  let i = 0;
  let inCode = false;
  let fence = "";
  let buffer = [];
  while (i < lines.length) {
    const line = lines[i];
    const fenceLine = isFenceLine(line);
    if (!inCode) {
      if (fenceLine) {
        inCode = true;
        fence = fenceLine.fence;
        buffer = [line];
        i++;
        continue;
      }
      proseLines.push(line);
      i++;
      continue;
    }
    buffer.push(line);
    if (fenceLine && fenceLine.fence[0] === fence[0] && fenceLine.fence.length >= fence.length && fenceLine.info.trim() === "") {
      codeBlocks.push(buffer.join("\n"));
      proseLines.push("", CODE_MOVED_HINT, "");
      buffer = [];
      inCode = false;
      fence = "";
    }
    i++;
  }
  if (inCode && buffer.length > 0) {
    codeBlocks.push(buffer.join("\n"));
    proseLines.push("", CODE_MOVED_HINT, "");
  }
  const prose = proseLines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  const code = codeBlocks.join("\n\n").trim();
  return { prose, code, hasCode: codeBlocks.length > 0 };
}
function escapeHtml$1(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeHtmlForCode(text) {
  return escapeHtml$1(text);
}
function renderInline(text) {
  let result = text;
  const codeSegments = [];
  result = result.replace(/`([^`\n]+)`/g, (_match, code) => {
    const placeholder = `\0CODE${codeSegments.length}\0`;
    codeSegments.push(`<code>${code}</code>`);
    return placeholder;
  });
  result = result.replace(
    /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)/g,
    (_match, linkText, url) => {
      const trimmed = linkText.trim();
      const text2 = /^\d+$/.test(trimmed) ? `[${trimmed}]` : linkText;
      return `<a href="${url.replace(/"/g, "&quot;")}">${text2}</a>`;
    }
  );
  result = result.replace(/\*\*\*([^*\n]+)\*\*\*/g, "<b><i>$1</i></b>");
  result = result.replace(
    /\*\*(?!\s)((?:[^*]|\*(?!\*))+?)(?<!\s)\*\*/g,
    (_match, content) => `<b>${content}</b>`
  );
  result = result.replace(
    /(^|[^A-Za-z0-9_])__([^_\n]+?)__(?![A-Za-z0-9_])/g,
    (_match, prefix, content) => `${prefix}<b>${content}</b>`
  );
  result = result.replace(/~~([^~\n]+)~~/g, "<s>$1</s>");
  result = result.replace(
    /(^|[^*\w])\*(?!\s)([^*\n]+?)(?<!\s)\*(?!\*)/g,
    (_match, prefix, content) => `${prefix}<i>${content}</i>`
  );
  result = result.replace(
    /(^|[^A-Za-z0-9_])_(?!\s)([^_\n]+?)(?<!\s)_(?![A-Za-z0-9_])/g,
    (_match, prefix, content) => `${prefix}<i>${content}</i>`
  );
  result = result.replace(/\x00CODE(\d+)\x00/g, (_match, idx) => {
    return codeSegments[Number.parseInt(idx, 10)] || "";
  });
  return result;
}
function processInlineLine(text) {
  return renderInline(escapeHtml$1(text));
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
function isTableSeparator(line) {
  const cells = line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|");
  return cells.length > 0 && cells.every((cell) => /^\s*:?-{2,}:?\s*$/.test(cell));
}
function splitTableRow(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}
function tableToList(rows, format = (text) => text) {
  const header = rows.length > 0 ? splitTableRow(rows[0]) : [];
  const body = rows.slice(2).filter((row) => row.trim() !== "");
  const items = body.map((row) => {
    const cells = splitTableRow(row);
    const key = format(cells[0] || "");
    const rest = cells.slice(1);
    const detail = rest.map((cell, index) => {
      const label = header[index + 1];
      return label && rest.length > 1 ? `${label}：${cell}` : cell;
    }).filter((cell) => cell !== "").map((cell) => format(cell)).join("；");
    if (!key) {
      return `- ${detail}`;
    }
    const boldKey = `<b>${key}</b>`;
    return detail ? `- ${boldKey}：${detail}` : `- ${boldKey}`;
  });
  return items.join("\n");
}
function markdownToHtml(markdown, options = {}) {
  const lines = markdown.split("\n");
  const output = [];
  let i = 0;
  let inCodeBlock = false;
  let codeBlockLang = "";
  let codeBlockLines = [];
  let inBlockquote = false;
  let blockquoteLines = [];
  let paragraphLines = [];
  const flushBlockquote = () => {
    if (inBlockquote) {
      output.push(`<blockquote expandable>${processInlineLine(blockquoteLines.join("\n"))}</blockquote>`);
      inBlockquote = false;
      blockquoteLines = [];
    }
  };
  const flushParagraph = () => {
    if (paragraphLines.length > 0) {
      output.push(processInlineLine(paragraphLines.join("\n")));
      paragraphLines = [];
    }
  };
  while (i < lines.length) {
    const line = lines[i];
    const codeBlockStart = line.match(/^```(\w*)\s*$/);
    if (codeBlockStart) {
      flushBlockquote();
      flushParagraph();
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
    if (line.includes("|") && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      flushBlockquote();
      flushParagraph();
      const tableLines = [line, lines[i + 1]];
      i += 2;
      while (i < lines.length && lines[i].trim() !== "" && lines[i].includes("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      if (options.tableAsList) {
        const list = tableToList(tableLines, processInlineLine);
        if (list) {
          output.push(list);
        }
      } else {
        output.push(`<pre>${escapeHtmlForCode(tableLines.join("\n"))}</pre>`);
      }
      continue;
    }
    if (isDivider(line)) {
      flushBlockquote();
      flushParagraph();
      output.push("");
      i++;
      continue;
    }
    const heading = isHeading(line);
    if (heading) {
      flushBlockquote();
      flushParagraph();
      output.push(`<b>${processInlineLine(heading.text)}</b>`);
      i++;
      continue;
    }
    const blockquote = isBlockquote(line);
    if (blockquote) {
      flushParagraph();
      inBlockquote = true;
      blockquoteLines.push(blockquote.text);
      i++;
      continue;
    } else if (inBlockquote) {
      flushBlockquote();
    }
    const ulItem = isUnorderedList(line);
    if (ulItem) {
      flushParagraph();
      const indent = "  ".repeat(Math.floor(ulItem.indent / 2));
      output.push(`${indent}• ${processInlineLine(ulItem.text)}`);
      i++;
      continue;
    }
    const olItem = isOrderedList(line);
    if (olItem) {
      flushParagraph();
      const indent = "  ".repeat(Math.floor(olItem.indent / 2));
      output.push(`${indent}${olItem.num}. ${processInlineLine(olItem.text)}`);
      i++;
      continue;
    }
    flushBlockquote();
    paragraphLines.push(line);
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
  flushParagraph();
  return output.join("\n");
}
const EXPANDABLE_REPLY_MIN_LENGTH = 100;
function wrapInExpandableBlockquote(html, minLength = EXPANDABLE_REPLY_MIN_LENGTH) {
  const trimmed = html.trim();
  if (!trimmed || trimmed.length < minLength) {
    return html;
  }
  if (/^<blockquote expandable>[\s\S]*<\/blockquote>$/.test(trimmed)) {
    return html;
  }
  if (/<pre[\s>]/i.test(trimmed)) {
    return html;
  }
  const inner = trimmed.replace(/<blockquote expandable>/g, "").replace(/<\/?blockquote>/g, "");
  return `<blockquote expandable>${inner}</blockquote>`;
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
    if (resp.status === 429) {
      const retryAfter = Number.parseInt(resp.headers.get("Retry-After") || "");
      if (retryAfter > 0 && retryAfter <= 10) {
        await new Promise((resolve) => setTimeout(resolve, retryAfter * 1e3));
        resp = await doSend(message, parseMode);
      }
    }
    if (resp.status === 400 && parseMode) {
      const unwrapped = message.replace(/^<blockquote expandable>([\s\S]*)<\/blockquote>$/, "$1");
      if (unwrapped !== message) {
        console.error("[sendMessage] HTML parse failed with expandable blockquote, retry without wrap");
        resp = await doSend(unwrapped, parseMode);
      }
    }
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
      const html = markdownToHtml(message, { tableAsList: ENV.TABLE_AS_LIST });
      return ENV.EXPANDABLE_REPLY ? wrapInExpandableBlockquote(html) : html;
    }
    return message;
  }
  async trySendRichMessage(message, context) {
    try {
      const richMessage = { markdown: message };
      if (context.message_id) {
        const editParams = {
          chat_id: context.chat_id,
          message_id: context.message_id,
          rich_message: richMessage
        };
        return await this.api.editMessageText(editParams);
      }
      const params = {
        chat_id: context.chat_id,
        rich_message: richMessage
      };
      if (context.reply_to_message_id) {
        params.reply_parameters = {
          message_id: context.reply_to_message_id,
          chat_id: context.chat_id,
          allow_sending_without_reply: context.allow_sending_without_reply || void 0
        };
      }
      return await this.api.sendRichMessage(params);
    } catch (e) {
      console.error("[sendRichMessage] request error:", e);
      return null;
    }
  }
  isRichMessageSizeError(resp) {
    if (!resp) {
      return false;
    }
    return resp.status === 400;
  }
  splitMarkdownByParagraphs(message, maxChars) {
    const paragraphs = message.split(/\n\n+/);
    const chunks = [];
    let current = "";
    for (const para of paragraphs) {
      if (para.length > maxChars) {
        if (current) {
          chunks.push(current);
          current = "";
        }
        const lines = para.split("\n");
        let sub = "";
        for (const line of lines) {
          if ((sub + "\n" + line).length > maxChars) {
            if (sub) chunks.push(sub);
            if (line.length > maxChars) {
              chunks.push(line);
              sub = "";
            } else {
              sub = line;
            }
          } else {
            sub = sub ? sub + "\n" + line : line;
          }
        }
        if (sub) chunks.push(sub);
        continue;
      }
      if ((current + "\n\n" + para).length > maxChars) {
        if (current) chunks.push(current);
        current = para;
      } else {
        current = current ? current + "\n\n" + para : para;
      }
    }
    if (current) chunks.push(current);
    return chunks.length > 0 ? chunks : [message];
  }
  async trySendRichMessageChunked(message, context) {
    const chunks = this.splitMarkdownByParagraphs(message, 28e3);
    if (chunks.length <= 1) {
      return null;
    }
    let lastResp = null;
    let successCount = 0;
    for (let i = 0; i < chunks.length; i++) {
      try {
        const params = {
          chat_id: context.chat_id,
          rich_message: { markdown: chunks[i] }
        };
        if (i === 0 && context.reply_to_message_id) {
          params.reply_parameters = {
            message_id: context.reply_to_message_id,
            chat_id: context.chat_id,
            allow_sending_without_reply: context.allow_sending_without_reply || void 0
          };
        }
        const resp = await this.api.sendRichMessage(params);
        if (resp.status === 200) {
          await this.recordSentMessageId(resp);
          lastResp = resp;
          successCount++;
        } else {
          const errBody = await resp.clone().text().catch(() => "");
          console.error(`[sendRichMessage] chunk ${i + 1}/${chunks.length} failed (${resp.status}): ${errBody.slice(0, 200)}`);
          lastResp = resp;
        }
      } catch (e) {
        console.error(`[sendRichMessage] chunk ${i + 1}/${chunks.length} request error:`, e);
      }
    }
    return successCount > 0 ? lastResp : null;
  }
  splitMarkdownForHtml(message, maxLen) {
    const fits = (md) => this.renderMessage("HTML", md).length <= maxLen;
    const paragraphs = message.split(/\n{2,}/);
    const chunks = [];
    let current = "";
    for (const para of paragraphs) {
      const candidate = current ? `${current}

${para}` : para;
      if (fits(candidate)) {
        current = candidate;
        continue;
      }
      if (current) {
        chunks.push(current);
        current = "";
      }
      if (fits(para)) {
        current = para;
        continue;
      }
      let sub = "";
      for (const line of para.split("\n")) {
        const lineCandidate = sub ? `${sub}
${line}` : line;
        if (fits(lineCandidate)) {
          sub = lineCandidate;
          continue;
        }
        if (sub) {
          chunks.push(sub);
          sub = "";
        }
        if (fits(line)) {
          sub = line;
        } else {
          for (let i = 0; i < line.length; i += Math.floor(maxLen / 2)) {
            chunks.push(line.slice(i, i + Math.floor(maxLen / 2)));
          }
        }
      }
      if (sub) {
        current = sub;
      }
    }
    if (current) {
      chunks.push(current);
    }
    return chunks.length > 0 ? chunks : [message];
  }
  async sendSplitHtmlMessage(message, context) {
    const chatContext = { ...context };
    chatContext.parse_mode = "HTML";
    const limit = 4096;
    const chunks = this.splitMarkdownForHtml(message, limit);
    let lastResp = null;
    for (let i = 0; i < chunks.length; i++) {
      if (i > 0) {
        chatContext.message_id = null;
      }
      const resp = await this.sendMessage(this.renderMessage(chatContext.parse_mode, chunks[i]), chatContext, chunks[i]);
      if (resp.status === 200) {
        await this.recordSentMessageId(resp);
        lastResp = resp;
      } else {
        console.error(`[sendSplitHtml] chunk ${i + 1}/${chunks.length} failed (${resp.status}), stop`);
        lastResp = resp;
        break;
      }
    }
    if (lastResp === null) {
      throw new Error("Send message failed");
    }
    return lastResp;
  }
  async sendSplitPlainTextMessage(message, context) {
    const chatContext = { ...context };
    chatContext.parse_mode = null;
    const limit = 4096;
    let lastResp = null;
    for (let i = 0; i < message.length; i += limit) {
      const msg = message.slice(i, Math.min(i + limit, message.length));
      if (i > 0) {
        chatContext.message_id = null;
      }
      lastResp = await this.sendMessage(msg, chatContext);
      if (lastResp.status !== 200) {
        break;
      }
      await this.recordSentMessageId(lastResp);
    }
    if (lastResp === null) {
      throw new Error("Send message failed");
    }
    return lastResp;
  }
  async sendLongMessage(message, context) {
    message = inlineCitations(message);
    const willUseRich = ENV.RICH_MESSAGE_MODE && !ENV.CUSTOM_MESSAGE_RENDER;
    if (ENV.SPLIT_CODE_BLOCK && !willUseRich && context.parse_mode) {
      const { prose, code, hasCode } = splitFencedCodeBlocks(message);
      if (hasCode && prose) {
        const resp = await this.sendLongMessageCore(prose, context);
        await this.sendFollowUpMessage(code, resp, context);
        return resp;
      }
      if (hasCode) {
        message = code;
      }
    }
    return this.sendLongMessageCore(message, context);
  }
  async sendFollowUpMessage(code, firstResp, context) {
    try {
      const json = await firstResp.clone().json();
      const replyTo = json?.result?.message_id;
      if (!replyTo) {
        console.error("[sendFollowUpMessage] no message_id from previous response, skip code message");
        return;
      }
      const codeContext = {
        ...context,
        message_id: null,
        reply_to_message_id: replyTo,
        allow_sending_without_reply: true
      };
      await this.sendLongMessageCore(code, codeContext);
    } catch (e) {
      console.error("[sendFollowUpMessage] failed to send code message:", e);
    }
  }
  async sendLongMessageCore(message, context) {
    const chatContext = { ...context };
    const limit = 4096;
    if (ENV.RICH_MESSAGE_MODE && !ENV.CUSTOM_MESSAGE_RENDER) {
      let richResp = await this.trySendRichMessage(message, chatContext);
      if (richResp && richResp.status !== 200 && chatContext.message_id) {
        const errBody = await richResp.clone().text().catch(() => "");
        console.error(`[sendLongMessage] Rich edit failed (${richResp.status}): ${errBody.slice(0, 200)}, retry as new rich message`);
        richResp = await this.trySendRichMessage(message, { ...chatContext, message_id: null });
        if (richResp && richResp.status === 200) {
          await this.deletePlaceholderIfExists(chatContext);
          await this.recordSentMessageId(richResp);
          return richResp;
        }
      }
      if (richResp && richResp.status === 200) {
        await this.recordSentMessageId(richResp);
        return richResp;
      }
      if (richResp && this.isRichMessageSizeError(richResp) && message.length > limit) {
        const errBody = await richResp.clone().text().catch(() => "");
        console.error(`[sendLongMessage] Rich one-piece failed (${richResp.status}): ${errBody.slice(0, 200)}, trying chunked Rich`);
        const chunkedResp = await this.trySendRichMessageChunked(message, chatContext);
        if (chunkedResp) {
          await this.deletePlaceholderIfExists(chatContext);
          return chunkedResp;
        }
        console.error("[sendLongMessage] Rich chunked also failed, fallback to HTML split");
      } else if (richResp) {
        const errBody = await richResp.clone().text().catch(() => "");
        console.error(`[sendLongMessage] Rich failed (${richResp.status}): ${errBody.slice(0, 200)}, fallback to HTML/plain`);
      }
    }
    if (message.length <= limit) {
      const resp = await this.sendMessage(this.renderMessage(context.parse_mode, message), chatContext, message);
      if (resp.status === 200) {
        await this.recordSentMessageId(resp);
        return resp;
      }
    }
    if (chatContext.parse_mode) {
      try {
        const htmlResp = await this.sendSplitHtmlMessage(message, chatContext);
        if (htmlResp.status === 200) {
          return htmlResp;
        }
        console.error(`[sendLongMessage] HTML split failed (${htmlResp.status}), fallback to plain text`);
      } catch (e) {
        console.error("[sendLongMessage] HTML split threw, fallback to plain text:", e);
      }
    }
    return await this.sendSplitPlainTextMessage(message, chatContext);
  }
  async deletePlaceholderIfExists(chatContext) {
    if (chatContext.message_id) {
      try {
        await this.api.deleteMessage({ chat_id: chatContext.chat_id, message_id: chatContext.message_id });
      } catch (e) {
        console.error("[sendRichMessage] delete placeholder failed:", e);
      }
    }
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
  sendPhoto(photo, options = {}) {
    if (!this.context) {
      throw new Error("Message context not set");
    }
    const params = {
      chat_id: this.context.chat_id,
      photo
    };
    if (options.caption) {
      params.caption = options.caption;
      params.parse_mode = options.parseMode ?? void 0;
    }
    if (options.hasSpoiler) {
      params.has_spoiler = true;
    }
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
const LTX_TABLE = {
  "1krmv279": ["ed2k://|file|www.98T.la@1KRMV-279_restored.mp4|5489046366|D6EF430219A17747D9B69CB27C389D0B|/"],
  "200gana1131": ["ed2k://|file|www.98T.200GANA-1131_restored.mp4|4401282181|C3172EBAC0426953092E6CD1FDD34366|/"],
  "259luxu1006": ["ed2k://|file|www.98T.la@259LUXU-1006_restored.mp4|4456205195|07425F13E6BB074A999C4AA1EC65DD91|/"],
  "259luxu1475": ["ed2k://|file|www.98T.la@259LUXU-1475_5restored.mp4|4753717590|9B7FE682580042DC33F4F0A58EAA7B72|/"],
  "259luxu1484": ["ed2k://|file|www.98T.la@259LUXU-1484_jasna-0.11.3_ltx_wm.mp4|5017613738|0FCF37AE3C3F54667765B92EE1E38D0B|/"],
  "259luxu1491": ["ed2k://|file|www.98T.la@259LUXU-1491_jasna-0.11.3_ltx_wm.mp4|4547367206|63FF21717CB8B0FA156C9E6D2AD31FD3|/"],
  "259luxu1520": ["ed2k://|file|www.98T.la@259LUXU-1520 _jasna-0.11.3_ltx_wm.mp4|4757317256|B0160A91F6146C8E68742D4A0C2B3F56|/"],
  "259luxu1573": ["ed2k://|file|www.98T.la@259LUXU-1573_jasna-0.11.3_ltx_wm.mp4|3951545237|ADA103E82C28CCC7E0CF5A75C9DAF93C|/"],
  "259luxu1795": ["ed2k://|file|www.98T.la@259LUXU-1795_jasna-0.11.3_ltx_wm.mp4|4561059169|60039086D2827B9FD42BDC5EEA6856F9|/"],
  "259luxu1824": ["ed2k://|file|www.98T.la@259LUXU-1824_restored_wm.mp4|3954674141|AB180F22591137A6D49B9C48DE754ACA|/"],
  "259luxu1835": ["ed2k://|file|www.98T.la@259LUXU-1835_restored.mp4|4196792082|66484044A727DD905AB947B5CF11E456|/"],
  "259luxu1839": ["ed2k://|file|www.98T.la@259LUXU-1839_restored.mp4|3728666748|15624B5DABED8AD06DC2D9F8152D65F4|/"],
  "259luxu1882": ["ed2k://|file|www.98T.la@259LUXU-1882_restored_wm.mp4|4439851078|8CCA01E0F2DF50620C26FD82A24839A6|/"],
  "259luxu1886": ["ed2k://|file|4k2.me@259LUXU-1886_restored.mp4|1896903790|190EC46FDCCE8B55B0412927672FBFD9|h=URAB7FEANT57FLHNLPLURXGJK2EGB4KB|/", "ed2k://|file|259LUXU-1886_restored.mp4|1896903805|F0F9F1C5FFCE0E28EC418C246572F5EA|/"],
  "259luxu1899": ["ed2k://|file|www.98T.la@259LUXU-1899_restored_wm.mp4|4212307491|B39E3D543CD5329CB67FF7EC237BE15A|/"],
  "259luxu1903": ["ed2k://|file|www.98T.la@259LUXU-1903_restored.mp4|4126244150|AFEED5E711D823F467758BE51C20C1F2|/"],
  "259luxu593": ["ed2k://|file|（带98水印，但98没帖子，验证过也确实是LTX资源）259LUXU-0593✈️立花瑠莉_restored_LTX_水印.mp4|2988569272|FBA69D12F9628ABE15465568E740CF66|/"],
  "259luxu800": ["ed2k://|file|www.98T.la@259LUXU-800_restored.mp4|4661995981|CD6CF9AEB83A5257E3CCBD60A0407F8A|/"],
  "300mium1457": ["ed2k://|file|www.98T.la@300MIUM-1457_restored.mp4|5080043638|5285C12B24139BCB89B45FF3ACC46AFF|/"],
  "300ntk670": ["ed2k://|file|www.98T.la@300NTK-670-LTX.mp4|3073081533|F0987A6914FFBFE82EF0DA3BB31E55A4|/"],
  "336tnb011": ["ed2k://|file|336TNB-011_LTX.mp4|2660894754|A66710B9A15E6DCB0088FB37A307781C|h=UUK3FKQOPWHQKZXOIFUK2KQSIMLU3TME|/"],
  "390jac052": ["ed2k://|file|390JAC-052_LTX.mp4|10597845472|D3DE0215AEA63C92B5CA30D4AB354F9E|h=VM2RFRG5MJG6GOYTWUBYLIQPXRLHXDTQ|/"],
  "390jac068": ["ed2k://|file|www.98T.la@390JAC-068_LTX.mp4|9099769089|4C311FEAE0C0EEE66F770C5A49B94F35|/"],
  "390jnt073": ["ed2k://|file|www.98T.la@390JNT-073_restored.mp4|6001117432|F87591986F52B9386AC01D2E6252F912|/"],
  "406ftht146": ["ed2k://|file|406FTHT-146_LTX.mp4|2720817605|2BF841B1979455A8CFA3699B967566B1|/"],
  "abf017": ["ed2k://|file|www.98T.la@ABF-017_restored.mp4|11074741232|EF996AC08E506B24F289F10CD78E5CB0|/"],
  "abf029": ["ed2k://|file|www.98T.la@ABF-029_restored.mp4|12357911609|8243D33336CE51342B56D2601304893F|/"],
  "abf042": ["ed2k://|file|www.98T.la@ABF-042-hack-LTX.mp4|5649036715|CA396D5E63695D9F139B31EC51B090B7|/"],
  "abf057": ["ed2k://|file|www.98T.la@ABF-057_restored.mp4|10091565249|988624F897C6AC758EA82E2B920C7CE6|h=JO6K7NGRRVSJETSVTFGCUXI72ZDVSEBO|/"],
  "abf087": ["ed2k://|file|www.98T.la@ABF-087_LTX.mp4|9555562371|93AEF81B48F92A2FFD78E96008522F69|/"],
  "abf125": ["ed2k://|file|www.98T.la@ABF-125-U-LTX.mp4|7126338684|6C1606447072D6B7CC39B4ADCDA0E202|/"],
  "abf195": ["ed2k://|file|www.98T.la@ABF-195_LTX.mp4|7681943901|0E0C486691196D1B29F37DFD8039A815|/"],
  "abf213": ["ed2k://|file|ABF-213_ltx.mp4|6569408835|5793DDE43B5B930D0DBCF5A62A30A5A5|/"],
  "abf246": ["ed2k://|file|www.98T.la@ABF-246_restored.mp4|9210338835|A5A2C43B404731437CCAB13DEB8655BC|/", "ed2k://|file|abf-246-LTX.mp4|4192497277|9d5197cad29388823be2485bd7d7b1bf|/"],
  "abf264": ["ed2k://|file|www.98T.la@ABF-264_restored_wm.mp4|8600515222|B7F9A3B5C5205ABCD6B51714313AE82C|/"],
  "abf284": ["ed2k://|file|www.98T.la@ABF-284_restored_wm.mp4|10859324716|7E80AE46C206ADBD4E10D7CCB787A708|/"],
  "abf306": ["ed2k://|file|www.98T.la@ABF-306_restored_LTX.mp4|9131915375|04ECEB2F75BCAD9E4B82080776A3B617|/"],
  "abf314": ["ed2k://|file|www.98T.la@ABF-314_restored.mp4|9092769601|917CFFA1445B04E412D23DA23E7B072B|/"],
  "abf363": ["ed2k://|file|www.98T.la@ABF-363_restored.mp4|7688341785|1CF5FF6FA9A20F0E4C3B6CFF884A58CC|/"],
  "abf381": ["ed2k://|file|LTX@ABF-381_七嶋舞.mp4|4580096750|12c8861235e75087911d43d64aca7452|/"],
  "abf395": ["ed2k://|file|www.98T.la@ABF-395_restored.mp4|7812317711|0C7854B9D88EA7AB7455F9ED0AEE1AC9|/"],
  "abp001": ["ed2k://|file|www.98T.la@ABP-001_restored_wm.mp4|8487590766|81AEA2552D87598A31D4FF6537A5417A|/"],
  "abp013": ["ed2k://|file|www.98T.la@ABP-013_restored_wm.mp4|7635248827|0BB682136FC61CA223C228D7046AACA9|/"],
  "abp041": ["ed2k://|file|www.98T.la@ABP-041_restored_wm.mp4|8174154962|6218C499C2E8F95B1D1F52E08BE2F735|/"],
  "abp058": ["ed2k://|file|www.98T.la@ABP-058_restored_wm.mp4|10220901505|573AFF5607361B47F401DAA34A6EDEDC|/"],
  "abp073": ["ed2k://|file|www.98T.la@ABP-073_restored_wm.mp4|8714407646|58696B43D7336C2A9C9E5C08951EBD41|/"],
  "abp108": ["ed2k://|file|www.98T.la@ ABP-108_restored_LTX.mp4|6645182125|FF9FC9E89F8592BB26F73B2DB33D9E0A|/"],
  "abp119": ["ed2k://|file|ABP-119-LTX.mp4|7694174171|DA052B59A232F05C9859847BD05069F2|/"],
  "abp129": ["ed2k://|file|www.98T.la@ABP-129_restored_wm.mp4|7429626826|CC53102C36197669EFB62FDF7CE0321C|/"],
  "abp138": ["ed2k://|file|www.98T.la@ABP-138 奉仕超最新-桃谷_restored_wm.mp4|9731231406|337A1402B400E0B10FC7BD9B67B0BAB5|/"],
  "abp145": ["ed2k://|file|ABP-145-LTX.mp4|8274770740|E3D80B9F528E380347A6EB0A1F7705C4|/"],
  "abp147": ["ed2k://|file|ABP-147_LTX.mp4|5143020486|58212A2A5814A798E6B5303B6229CA7C|/"],
  "abp159": ["ed2k://|file|www.98T.la@ABP-159_restored_wm.mp4|8774137802|1E362C0F715EB6ADF344A04145138AD0|/"],
  "abp171": ["ed2k://|file|ABP-171-LTX.mp4|7739700795|8A34CDB9EE1153DDDAAB72E09A4D504B|/"],
  "abp178": ["ed2k://|file|www.98T.la@ ABP-178_restored_LTX_wm.mp4|9317393103|02520F4FFFAD655C060F33FA3C1D3B88|/"],
  "abp222": ["ed2k://|file|ABP-222(abp00222)[Prestige]插到恍神爽翻天超嗨幹砲夏希南夏希みなみ_LTX.mp4|2938848887|76CA92AC2921BEE58E629B1E516367C7|/"],
  "abp290": ["ed2k://|file|www.98T.la@ABP-290 風俗性感3時間SPECIAL-上原瑞穂_restored_wm.mp4|10350407152|18BB41DBB00687CA23346CA70B762AB7|/"],
  "abp340": ["ed2k://|file|www.98T.la@ABP-340 冬月-絕頂性感內衣_restored_wm.mp4|9091239554|23CCE16CCD3BAA2DF736C6864D87B36E|/"],
  "abp361": ["ed2k://|file|www.98T.la@ABP-361 工作的痴女系小妹-上原瑞穗_restored_wm.mp4|9245737231|C56F7C3FA8ECF4DC67E10D6CC1D0C202|/"],
  "abp376": ["ed2k://|file|www.98T.la@ABP-376 耐久巨根连续怒干48小时-上原瑞穂_restored_wm.mp4|7775052258|F4B4C409A990EBD67007A842A67FC054|/"],
  "abp425": ["ed2k://|file|www.98T.la@ABP-425 天然成分由来-上原瑞穂_restored_wm.mp4|7005595749|8F7F79F4885061502AA6F987FB3E5F62|/"],
  "abp454": ["ed2k://|file|www.98T.la@ABP-454 僕瑞穂甘過社内戀愛SEX-上原瑞穂.restored_apo8_prob4.mp4|46323233236|DC3EC70663AF2B35F3FE87E7AC99047E|/"],
  "abp517": ["ed2k://|file|www.98T.la@abp517hhb_restored.mp4|14596087607|EEAAEA9982D7E97953F79C1E6323AD33|/"],
  "abp525": ["ed2k://|file|ABP-525_LTX_restored.mp4|6864882228|E2F41494DB90A0A7E6714BCBBAECCD12|/"],
  "abp536": ["ed2k://|file|ABP-536-流出.mp4|3298446358|8C4B02564F1C75DFF20826B90D8D36D2|/"],
  "abp551": ["ed2k://|file|www.98T.la@ABP-551@BVPP1Xdf+BVPP4X(STD)_iris2_watermusk.mp4|32130553795|43DE2E5B9C297DF15AF23A643A318810|/"],
  "abp598": ["ed2k://|file|www.98T.la@ABP-598_restored.mp4|8579807470|B428AFACEA9546DD7D151BF02E369612|/"],
  "abp645": ["ed2k://|file|www.98T.la@ ABP-645-U 工作的痴女系姐姐vol.08 園田みおん.restored.mp4|10273679346|D95C186E5D6852DDEB02BC5C6F6AAD7A|/"],
  "abp733": ["ed2k://|file|www.98T.la@abp-733_restored_wm.mp4|8282212541|AA36011AB4F99AB300906FEE6E01677A|/"],
  "abp780": ["ed2k://|file|www.98T.la@abp-780_restored水印.mp4|6047959133|01CEDD455CE4FA33DE167732F977E35C|/"],
  "abp816": ["ed2k://|file|www.98T.la@ABP-816.restored.mp4|7380055503|1DB3387FA31F1B1ECC90D1712B68D0CE|/"],
  "abp838": ["ed2k://|file|www.98T.la@ABP-838_LTX.mp4|8906601077|4FE00F3B174A4A3495A0D0BC5B8225AD|/"],
  "abp843": ["ed2k://|file|ABP-843.園田みおん_LTX无水印.mp4|6122394504|F0FE84EDCAACA29F1E7D3BC5A446CF1A|/"],
  "abp883": ["ed2k://|file|ABP-883園田みおんの極上筆おろし2nd27ファンの童貞を自ら筆下ろしする奇跡のセックス収録_LTX.mp4|11781991385|ae10bb06a438ef856dbc23cfcb9ecb5a|/"],
  "abp905": ["ed2k://|file|www.98T.la@ABP-905-U_wm.mp4|10210679262|EB41B4130DD297BE6B7EBAB4731972D9|/"],
  "abp933": ["ed2k://|file|www.98T.la@ABP-933-U-LTX.mp4|8317115018|F5A50812A0A6141EF795A1809089891B|/"],
  "abp936": ["ed2k://|file|www.98T.la@ABP-936_restored_wm.mp4|9543287378|2974C97A2BB537522B04139BD317BFA2|/"],
  "abp950": ["ed2k://|file|www.98T.la@ABP-950-U-LTX.mp4|10027012978|D5C24BF2CA7601150E354914ABA1FF68|/"],
  "abp960": ["ed2k://|file|www.98T.La@ABP-960-U-LTX.mp4|12284642416|D0293123A9CAE7F4541743C3C78882A4|/"],
  "abp968": ["ed2k://|file|www.98T.la@ABP-968_restored_wm.mp4|9409508042|D5C6FBEC72F3E86B2B41FF3E1A9C914D|/"],
  "abp975": ["ed2k://|file|www.98T.la@ABP-975-U-LTX.mp4|9211430568|2FF405C22171184185998B2165911206|/"],
  "abp984": ["ed2k://|file|www.98T.la@ABP-984-U-LTX.mp4|10382611826|8ECF55663B2FEE1EFF2E77FF389C8EC1|/"],
  "abs100": ["ed2k://|file|www.98T.la@ABS-100_restored_.mp4|7010765321|688E45DF50C484EBAFE5281108B69785|/"],
  "abs130": ["ed2k://|file|www.98T.la@ABS-130_restored_wm.mp4|10230517230|D63FEDD451F079DA93E0FA9460F9A424|/"],
  "abs139": ["ed2k://|file|abs-139！！！-LTX.mp4|314358120|1C092CCB6866B5BA5113C4CDE8210CD3|/"],
  "abs170": ["ed2k://|file|www.98T.la@ABS-170_restored_wm.mp4|7833004524|87871FDE0AF4F72DE51DC0ED2CD038D0|/"],
  "abs212": ["ed2k://|file|www.98T.la@ABS-212_restored_wm.mp4|8463191553|BA8C6209714E9F06AE5BB18B2C4A692F|/"],
  "abs223": ["ed2k://|file|www.98T.la@ABS-223_restored_wm.mp4|10021451588|21752D6E29A2771A58C56DF17C582DCA|/"],
  "abw006": ["ed2k://|file|ABW-006_LTX.mp4|7941670865|DF8B9A8B23EFABF7D792181CD326763C|/"],
  "abw015": ["ed2k://|file|www.98t.la@ABW-015(蓝光Remux)_restored.mp4|35772976198|f1bda56dccc92cc937bdca0894a10211|/"],
  "abw023": ["ed2k://|file|ABW-023_LTX.mp4|7759297629|9A591F6C5C91FDC5C839B9D698D376F0|/"],
  "abw032": ["ed2k://|file|www.98T.la@ABW-032_restored.mp4|12532441578|FB87D850279A11CA56374D97063B7BC2|/"],
  "abw054": ["ed2k://|file|www.98T.la@ABW-054@BVPP4X(STD)_apo8_iris2_watermusk.mp4|36088162991|07DCE7872F7E4EEA5C9AA28C4B9DF000|/"],
  "abw088": ["ed2k://|file|abw-088.mp4|10959787163|1CCAF8D4C08941A5102C471DBB857272|/"],
  "abw096": ["ed2k://|file|www.98T.la@ABW-096_restored_LTX.mp4|8903585341|F6D533B7B7CBBC8F527C5F72F6D4DFC1|/"],
  "abw108": ["ed2k://|file|www.98T.la@ABW-108_restored.mp4|12968554268|31752E091E6EA3F1CC03295C26E5C2C9|/"],
  "abw187": ["ed2k://|file|www.98T.la@ABW-187-U-LTX.mp4|10045311882|44F3E0C357A546713DADD09C6737CC6C|/"],
  "abw232": ["ed2k://|file|www.98T.la@ABW-232_restored.mp4|9040124201|18615DC3D80E02D45C7509FD071F14A9|/"],
  "abw244": ["ed2k://|file|www.98T.la@ABW-244_restored_wm.mp4|12803883388|7A4896231D38FDC5F4D719E6428AB845|/"],
  "abw276": ["ed2k://|file|www.98T.la@ABW-276-U-LTX.mp4|5265709723|B5D073236D795F722D5F48D019E2607B|/"],
  "abw293": ["ed2k://|file|www.98T.la@ABW-293_restored.mp4|12117531899|7A5C78C522E42C947EBD7560C7D67263|h=S4VSIKEQRUVYWFMYA6NM5ECRG6KNSPCN|/"],
  "abw324": ["ed2k://|file|www.98T.la@ABW-324_restored.mp4|12668760654|F0FAD6A020019918B1EB52A4B0F9858D|/"],
  "abw339": ["ed2k://|file|www.98T.la@ABW-339_restored_wm.mp4|8461353474|7CB406D4D40338748057C992932B5A8C|/"],
  "abw340": ["ed2k://|file|www.98T.la@ABW-340_restored_wm.mp4|6131282867|C39C5F41F9FD2D59AB92A72DE76C989D|h=FHSV5XO2UUZHGYDQ45GM3S57RIIU4GUE|/"],
  "achj005": ["ed2k://|file|hhd800.com@achj00005hhb_restored.mp4|6636825736|5CE8F418117AA510DA4D95E73C9A52CB|h=2TFEIBGIWM5FT3U7HAEVDUIH4I4KGUZZ|/"],
  "achj012": ["ed2k://|file|www.98T.la@achj00012_restored.mp4|11640509127|BCDD2DA6E93AC7A4F810288D07702BA7|/"],
  "achj026": ["ed2k://|file|ACHJ-026-LTX【2023-10-20】（三浦歩美,椎名由奈）“即使成年，我也想再次体验青春。” Madonna W 的专属已婚女性在高级套房过夜，进行无保护性行为.mp4|4985812111|434640D53AFDBD69DFC76BD045BF0702|/"],
  "achj051": ["ed2k://|file|achj00051hhb(1)_restored.mp4|11023319897|902EC07952D42E97354FFF216F210CFF|h=TM7KELEFDHVA6T7MVUNACPEH5IFEC3XM|/"],
  "achj060": ["ed2k://|file|achj-060_restored.mp4|8646547929|06E04297C838D9B30249C65F78B38A96|h=5SJUJM5QHXKJRO7L4X5WVHEXCTMN4KGJ|/"],
  "achj075": ["ed2k://|file|hhd800.com@ACHJ-075_restored.mp4|8419298232|DFADA75C5FD12F60CF315B3C573580CC|h=LKQM566ISDFZVPOWMUGVM6O3WJZNYJR7|/"],
  "achj094": ["ed2k://|file|www.98T.la@ACHJ-094-LTX.mp4|10638722376|254FB6699DBF8DBD8FA735115C47B061|/"],
  "aczd226": ["ed2k://|file|www.98T.la@ACZD-226_restored.mp4|9671809011|85325B3678EC8B1F7E4BE73AA6EF8AA1|/"],
  "adn017": ["ed2k://|file|www.98T.la@www.98T.la@ADN-017.restored.mp4|7073806401|B5C6C8A2E19229E1C06A67BF5F676CD0|h=TCA3WNMDEXOCZHSNPQZVDRKZ4BGIGEYK|/"],
  "adn041": ["ed2k://|file|www.98T.la@ADN-041.restored_wm.mp4|6888623044|610A44B3ACBC65D7B1A6895638573272|h=RSRA2CLAXIIFCZRKMRYIUKA4PCFFJQCM|/"],
  "adn047": ["ed2k://|file|www.98T.la@ADN-047.restored_wm.mp4|5789236145|9E9B49C732A368D7200DAD7C81E7CF36|h=T2OUWJBKAVTUCJZQNCBQWDCIDZ74K2N2|/"],
  "adn093": ["ed2k://|file|www.98T.la@ADN-093_[LTX]restored_wm.mp4|7924709387|4B5D48AA563AB719E2416158FF4A69EE|/"],
  "adn106": ["ed2k://|file|www.98T.la@ADN-106 逐渐沉沦在变态上司巨大肉棒下的巨乳人妻 松下纱荣子_restored_wm.mp4|7130428541|C8F50032175303E41A174C068CDED0AE|/"],
  "adn115": ["ed2k://|file|www.98T.la@ADN-115.restored_wm.mp4|6385270998|2BB3DB31B35116A9A7D1E83A2DE060C2|h=OG4XGTKKFMABJ4F5QOVDTRCP4DRRHDP2|/"],
  "adn144": ["ed2k://|file|www.98T.la@ADN-144_restored_wm.mp4|6468314452|267D7883AC591912E69632A597C0CB1A|/"],
  "adn151": ["ed2k://|file|www.98T.la@www.98T.la@ADN-151.restored_wm.mp4|6647769058|5529A77FADACCDDD30791E63B69DFEA7|h=NPLBXYK5GGW3T7QS6DLGJBWGBDAGDIP6|/"],
  "adn162": ["ed2k://|file|www.98T.la@ADN-162 性奴役：家庭主妇兼管家，被随意强奸 - 松下纱荣子_restored_wm.mp4|6851020247|7C919A1B6E9AD259E9E7B64E5F020DFE|/"],
  "adn165": ["ed2k://|file|www.98T.la@ADN-165 侵犯熟睡中的巨乳继母松下纱荣子从此变成我的内射性伴侣 松下纱荣子_restored_wm.mp4|7006008801|AA85FC35360AA3070A8699C8A49EC6C1|/"],
  "adn187": ["ed2k://|file|www.98T.la@ADN-187_restored.mp4|4741797533|37A1B0C066AFCD2E1E1A44C847B96336|/"],
  "adn206": ["ed2k://|file|www.98T.la@www.98T.la@ADN-206_restored_wm.mp4|7274577800|24E603A7DBCC0B9E5E9C46A88080FA27|/"],
  "adn216": ["ed2k://|file|www.98T.la@ADN-216_restored_wm.mp4|6554671821|6105150CC7A2FA4766397AAC0DCC6083|/"],
  "adn219": ["ed2k://|file|www.98T.la@ADN-219_restored_wm.mp4|7103447663|AB3E4631BC279C620D5C429705CF1A9F|/"],
  "adn341": ["ed2k://|file|www.98T.la@ADN-341_restored.mp4|6630593643|077E2118115BE4C5E80B71EC4A5389CC|/"],
  "adn396": ["ed2k://|file|www.98T.la@ADN-396_restored_wm.mp4|7189253963|4DB24F6B8D063B5A90BD6E396E206A3D|/"],
  "adn414": ["ed2k://|file|ADN-414_LTX.mp4|4414691607|74DB6C2AF1B48543117F091FC19E0B86|/"],
  "adn425": ["ed2k://|file|ADN-425_LTX.mp4|4214569354|078E92D78CE65BBBAC7BD186BCD1981F|/"],
  "adn426": ["ed2k://|file|www.98T.la@ADN-426_restored_wm.mp4|7215576416|8BF9E813E3905028FF5E549FE0CFEABF|/"],
  "adn431": ["ed2k://|file|ADN-431_LTX.mp4|4143894437|54BEAA0F576674729FE6AB2E944AB7A6|/"],
  "adn445": ["ed2k://|file|ADN-445_LTX.mp4|4048561397|5671E7C4731B0EE5A61CB66C86F60884|/"],
  "adn451": ["ed2k://|file|ADN-451_LTX.mp4|4750246950|B8EEF21124C90A8FE9C8E2AC2C464AFA|/"],
  "adn462": ["ed2k://|file|ADN-462-LTX.mp4|4762334825|14EB2B3022C7971E3E9DC4643AD1CEA5|/"],
  "adn491": ["ed2k://|file|ADN-491_LTX.mp4|4426812678|CB5856BBCE20AC13F5DB31D9457BFCFC|/"],
  "adn498": ["ed2k://|file|www.98T.la@adn-498_restored-水印.mp4|8885852886|024030B452A95F6C21EB91365DD16063|/"],
  "adn499": ["ed2k://|file|www.98T.la@adn-499_restored_wm.mp4|7279607755|4BB4A49DAB6EF501A6D7E755026FEDFF|/"],
  "adn507": ["ed2k://|file|ADN-507_LTX.mp4|4781009165|5B9F7ECB45E4190BC0DB8D82D52F6197|/"],
  "adn510": ["ed2k://|file|WWW.98T.LA@-adn-510_JASNA~.mp4|6642909142|F6EFE9F9F7BE69059AE46CC814DE1622|/"],
  "adn529": ["ed2k://|file|www.98T.la@ADN-529_restored_wm.mp4|7060445415|9D1F10EA6B6A3D273C932313C20B3353|/"],
  "adn641": ["ed2k://|file|www.98T.la@ADN-641_restored_wm.mp4|7175899543|0F4FFDC7547426699EEE575898F75131|/"],
  "adn709": ["ed2k://|file|www.98T.la@adn-709_restored.mp4|7157066539|070EE1B3DAF3F37C98C637C2FA331280|/"],
  "adn716": ["ed2k://|file|www.98T.la@adn-716_restored_wm.mp4|7561939231|31C526427C4AA90B79D24BCDAB030038|/"],
  "adn732": ["ed2k://|file|www.98T.la@ADN-732_restored_LTX.mp4|7476392293|F5672C187365B9B9D4B4BE0DF7A772A1|/"],
  "adn753": ["ed2k://|file|www.98T.la@adn-753_restored.mp4|7393796476|EFA7912FC14EEC684B81D16C6DD98598|/"],
  "adn764": ["ed2k://|file|www.98T.la@ ADN-764 「僕のことなんて好きになるはずない…」 女性不信の僕を全肯定で認めてくれる美女に情けなさ丸出しで射精した日。 白峰ミウ_restored_wm.mp4|7519071609|ED439D0036207F9F568C0F787D2410FC|/"],
  "adn789": ["ed2k://|file|www.98T.la@ADN-789_restored_wm.mp4|7360091542|0ABE065FBE0C2A2B09DADAFA61335F4D|/"],
  "adn804": ["ed2k://|file|www.98T.la@ADN-804_restored_wm.mp4|7331238545|E777CB6113C2AA0A6962B52B104DB8E0|/"],
  "aege006": ["ed2k://|file|www.98T.la@aege-006_restored_ja_ltx.mp4|6242957253|34FD434F0B26DF452AB734B51E2D0063|/"],
  "alb192": ["ed2k://|file|ALB-192-LTX【2012-11-01】(青山菜々)Iカップボイン素人生ハメ ナナ.mp4|3129604621|3950A2B167A613F28EFC3CAF95C506F6|/"],
  "aldn622": ["ed2k://|file|ALDN-622-LTX_restored.mp4|3314819831|ED75E5989D8D8943B31555BFFA602C69|/"],
  "ankk009": ["ed2k://|file|ANKK-009瀬名ひかり_LTX.mp4|4553457862|D27EE99EB9683FF94FBB67CFDA678F89|/"],
  "apkh070": ["ed2k://|file|apkh-070_restored.mp4|7092286512|0E28CCC270E30F842DA672F82852770F|/"],
  "aqsh022": ["ed2k://|file|www.98T.la@AQSH-022 森澤佳奈 LTX_restored.mp4|7440467847|1E2061B6A2DA67FB05AC8E45C135917B|/"],
  "arm738": ["ed2k://|file|ARM-738-LTX.mp4|4592532062|AAC8AA0BE2693B774249A74876F7A459|/"],
  "atid167": ["ed2k://|file|ATID-167 (atid00167) [Attackers] 女拳法家レ●プ 犯●れたプライド 凌●遊戯 若葉くるみ_LTX.mp4|5200390342|4E5BE6805E0507E3727708377520F0E5|/"],
  "atid176": ["ed2k://|file|www.98T.la@ATID-176.restored_wm.mp4|7300583251|B1B48B4DF13BA83B039940977CF1B098|h=OQV3VOHIUZSERSYEHANCKZMJZLUZAJXU|/"],
  "atid198": ["ed2k://|file|www.98T.la@[LTX]ATID-198_restored（有水印）.mp4|5994318400|E5B12DA27ED7667603173006473063E7|/"],
  "atid315": ["ed2k://|file|www.98T.la@ATID-315_restored-LTX.mp4|8879990594|4283B85FA5D95FBD457BE89FC9FAB148|/"],
  "atid327": ["ed2k://|file|www.98T.la@ATID-327_restored.mp4|5986179715|F3562656B2CE929C75DA60D062B407F1|/"],
  "atid344": ["ed2k://|file|www.98T.la@ATID-344_restored_LTX.mp4|6367813890|8E3B3ED2B6EF4796B86618098A9B3805|/"],
  "atid397": ["ed2k://|file|WWW.98T.LA@ATID-397_restored.mp4|7713104781|98E0A694B37325BE5B5C09D50162C687|/"],
  "atid401": ["ed2k://|file|www.98T.la@ATID-401 性欲得不到满足的家庭主妇每晚被邻居拥抱3小时。松下纱荣子_restored_wm.mp4|9765221692|5F6D3FE99322F1B44201F39019085951|/"],
  "atid471": ["ed2k://|file|www.98T.la@ATID-471_restored_LTX.mp4|7560499287|9E9B3C879838DBA0C38CA9B89D94520E|/"],
  "atid539": ["ed2k://|file|www.98T.la@ATID-539_restored_LTX.mp4|7568974941|E0316AA29945E05F443B168C5C9F5DE1|/"],
  "atid566": ["ed2k://|file|www.98T.la@ATID-566_restored_wm.mp4|7361292255|E9C38183F2F6987AC0E21A159483EACF|/"],
  "atid637": ["ed2k://|file|www.98T.la@atid-637_restored_wm.mp4|9913455334|5BFF6BCF996C348C1E60409D75E1F089|/"],
  "atid698": ["ed2k://|file|www.98T.la@ATID-698_restored_wm.mp4|7723533035|F2E47CEB30E75AE382A193E21BF9109B|/"],
  "avop004": ["ed2k://|file|www.98T.la@AVOP-004_LTX.mp4|11600403742|A7832E76F650510200BD33D130BC7054|/"],
  "avop011": ["ed2k://|file|AVOP-011_restored.mp4|10357204564|A5F547CC28F86B1C67BB59FE2FFE3915|/"],
  "avop125": ["ed2k://|file| www.98T.la@AVOP-125-U-LTX.mp4 |7980105137|79C2AA0B12D056E647AFBE0EDC5EC2C7|h=JFBYEDEINXWXFZEK543PDHEHUYLDZTAX|/", "ed2k://|file|AVOP-125-LTX 无水印【2015-09-01】SSS-BODY解禁真正中出し美竹すず.mkv|8833663912|5EBFACBFB680CAECF41C3FF3D09EB757|/"],
  "avop127": ["ed2k://|file|www.98T.la@AVOP-127_rfdertr-v6LTXpro.mp4|12072474263|EDC382DEC90DAFBD3C626A322B1A4E95|/"],
  "avop201": ["ed2k://|file|www.98T.la@AVOP-201-U-LTX.mp4|9670615003|F13C820BB003DA357D9EB6D95E8F5246|h=TFS5E3IDGCZJP32WKL5IVOEBYPGAIHL4|/"],
  "avop210": ["ed2k://|file|www.98T.la@AVOP-210 水印_restored.mp4|6800147260|4EC73D0FDDBA9BB8B6A91EFB78FEB5FF|/"],
  "avop258": ["ed2k://|file|avop-258_LTX.mp4|5888230848|2FCCEE9BF76AB015454C1E66EFDF5AD6|h=XXLAI2MVF5FS2WQB6MGJWI5VOHLKZKZ2|/"],
  "avop260": ["ed2k://|file|www.98T.la@AVOP-260_restored.mp4|14909464203|4223A17F73AA40DBEE4809E82897D28F|/"],
  "avop333": ["ed2k://|file|AVOP-333_LTX_restored.mp4|4826904116|0C9857769BB0B5153CA88CED3AB54AFE|/"],
  "avop381": ["ed2k://|file|AVOP-381.1080p_LTX_restored_remuxed.mp4|2149426322|1B2D67069702C6847F77D2DA3019FB67|/"],
  "bat033": ["ed2k://|file|www.98T.la@BAT-033-LTX.mp4|2884233853|3BFF3686E20117AC1FD7CEAA28509AD3|/"],
  "bbi076": ["ed2k://|file|www.98T.la@BBI-076.mp4|2951056811|B00C7C649CB2B230FF593642BCA6AD2C|/"],
  "bbi166": ["ed2k://|file|www.98T.la@www.98T.la@BBI-166.restored_wm.mp4|9897457553|F966B18E73C11492635AFA33B977857F|h=6BVDR2MNDHICNTRQFJ2IUYO6KX7JOXXV|/"],
  "bdd038": ["ed2k://|file|www.98T.la@bdd-038_restored_ja_ltx.mp4|6163597829|9226240EB478544FD7E3A8DB5626F564|/"],
  "bf287": ["ed2k://|file|www.98T.la@BF-287_U-LTX.mp4|7226875713|34B4CFE7B78E1E61098E352E936429A1|/"],
  "bf354": ["ed2k://|file|BF-354【2014-12-07】(青山菜々)緊身衣女孩 超絶I罩杯痙攣性愛 青山菜菜.mp4|3490530206|1CD0C7333022FCB1C2837C62751777F5|/"],
  "bf461": ["ed2k://|file|www.98T.la@BF-461_U-LTX.mp4|7399440223|002C27D62E685A4399D4F28787B9ECE8|/"],
  "bf528": ["ed2k://|file|www.98T.la@BF-528_BD_LTX.mp4|11680766411|C971A7539FE6BB13F2AEC516A3416989|/"],
  "bf534": ["ed2k://|file|www.98T.la@BF-534_BD_LTX.mp4|10408349938|E9CDD1395F2844ADA912BAC3F3767597|/"],
  "bf542": ["ed2k://|file|www.98T.la@BF-542_LTX.mp4|11208137679|936622FCA8AA7256D3F9039D55F2C9E1|/"],
  "bf549": ["ed2k://|file|www.98T.la@BF-549_BD_LTX.mp4|11029981815|23E4862111B16DD3EF41FF29922940FD|/"],
  "bf557": ["ed2k://|file|www.98T.la@BF-557_BD_LTX.mp4|10957853957|A9AC19F5C560286B231A8604BEF06A0D|/"],
  "bf567": ["ed2k://|file|www.98T.la@BF-567_LTX.mp4|10948107366|D30FC8EA8252788D7E33AA9035CF1726|/"],
  "bgn040": ["ed2k://|file|BGN-040-LTX.mp4|5432040175|B2F5C5113DD34105A3F951B9154DA89D|/"],
  "bhsp004": ["ed2k://|file|BHSP-004_restored.mp4|630200205|89655C803643211EAD2F8EA49FEC0920|/"],
  "bijn140": ["ed2k://|file|www.98T.la@BIJN-140_restored_wm.mp4|7336944745|E1883A538B3B7A3A4F69397FFB9524D5|/"],
  "bkd268": ["ed2k://|file|BKD-268-LTX【2021-07-31】（羽生亚里沙）母子交尾.mp4|4545164782|2C4F0A22709BE1E96F54CDBE29ACC296|/"],
  "bmnp009": ["ed2k://|file|www.98T.la@BMNP-009 (bmnp00009) [西日暮里人妻同好会] あきサン  佐々木あき.mp4|3575063030|4FD30C0E62B806581A36B8E0968ABFC5|/"],
  "bonu019": ["ed2k://|file|www.98T.la%40BONU-019.restored%20Jasna0.11.3-LTX.mp4|5827443223|9186BA5C49BDF9F038E622031C1E540C|/"],
  "cawb001": ["ed2k://|file|www.98T.la@CAWB-001_restored_LTX.mp4|8786833513|059704E21B452A56CC1C1469F4F22AF2|/"],
  "cawb012": ["ed2k://|file|www.98T.la@cawb00012hhb_rfdertr-v6LTXmax.mp4|8049029662|60412B5DFA69DCE7517B4DC8180216FE|/"],
  "cawb035": ["ed2k://|file|www.98T.la@cawb00035hhb_rfdertr-v6ltx.mp4|11076347859|5F05DEEFD44884B018846EB40228B104|/"],
  "cawb040": ["ed2k://|file|www.98T.la@CAWB-040_水印.mp4|6251136124|08B8BE88D652AAB303BCB9D1C329AFA1|/"],
  "cawb044": ["ed2k://|file|www.98T.la@CAWB-044_restored.mp4|5524052589|B7E903EB95E72063E10B7E30ADE08B26|/"],
  "cawd041": ["ed2k://|file|CAWD-041-LTX-C.mp4|5034530176|6327C8C4C58F8AA131CCB129D014B366|/"],
  "cawd222": ["ed2k://|file|CAWD-222-LTX_restored.mp4|3888892823|B8D169AB228D782F795EC308DDE0CD6C|/"],
  "cawd365": ["ed2k://|file|CAWD-365-LTX.mp4|7263905987|4EBFAAA688D6589A9960C2128D68D7E9|/"],
  "cawd368": ["ed2k://|file|www.98T.la@CAWD-368(cawd00368)[kawaii]100kgを越えた巨漢教師の肉塊ピストンでポルチオ快楽に堕ちた僕の彼女。日向なつ_restored_wm.mp4|6604414208|CAA879304A5CE2553E648F66A7115CE1|/"],
  "cawd386": ["ed2k://|file|www.98T.la@CAWD-386_restored_LTX.mp4|11244460664|43061331E573B3CC8841E4A6FD602599|/"],
  "cawd404": ["ed2k://|file|www.98T.la@CAWD-404-LTX.mp4|6944706110|707CCB3283CC27EE3CEFFAA7C3254BC5|/", "ed2k://|file|CAWD-404_ltx__%E6%97%A0%E6%B0%B4%E5%8D%B0%E5%8E%9F%E7%89%88%E5%8B%BF%E5%88%A0.mp4|5118236170|ED5F71FF1E165E4DFD407811AA06CCED|/"],
  "cawd589": ["ed2k://|file|www.98t.la@CAWD-589✈️_restored_wm.mp4|9184092248|41D2D9E32C3B23F36A87BB265CDE822F|/"],
  "cawd594": ["ed2k://|file|www.98T.la@CAWD-594_restored_LTX.mp4|7397174157|D55B30413EA2DE7DDA05383E8F529667|/"],
  "cawd628": ["ed2k://|file|www.98T.la@CAWD-628 伊藤舞雪 LTX_restored.mp4|7384281667|4E844E4B1D507F286EBA0CB30BA413EF|/"],
  "cawd658": ["ed2k://|file|www.98T.la@CAWD-658_restored_wm.mp4|8980743328|29780591F7F5108120213EC349CEC1CD|/"],
  "cawd676": ["ed2k://|file|www.98T.la@CAWD-676_restored_LTX.mp4|12561140535|2BFAFFF9EB85D627A4C132F5C86AF9CA|/"],
  "cawd721": ["ed2k://|file|www.98T.la@ CAWD-721 出張先の相部屋で絶倫上司に何度も中出しされて… 大嫌いな課長の粘着質な愛撫と濃厚SEXに溺れた華奢美乳OL 小坂七香_restored_wm.mp4|7538940911|AF2C1F2C0CE7B3D106C9371231E2EEB7|/"],
  "cawd741": ["ed2k://|file|CAWD-741-U.mp4|5827785613|120CCF05AD72E5C79699B8CF4B1F461F|/"],
  "cawd835": ["ed2k://|file|CAWD-835_restored_ltx.mp4|4101324038|1054C8C2B61EB4DDDE639A93E9953569|/"],
  "cawd881": ["ed2k://|file|CAWD-881-LTX.mp4|7361771181|266a17cdf4c9daea3ebac825d77339e3|/"],
  "cawd900": ["ed2k://|file|www.98T.la@CAWD-900_jasna-0.11.3_ltx_wm.mp4|10152083312|942FF11603D8A0DD25AD120B352B35EA|/"],
  "cawd906": ["ed2k://|file|www.98T.la@cawd-906hhb_rfdertr-v6ltx.mp4|8810253111|4F48AD47DE537F9E268B92C6C36BEFFA|/"],
  "cawd931": ["ed2k://|file|www.98T.la@cawd00931hhb_rfdertr-v6LTXpro.mp4|13705057499|1E39856140628B81DCC518853BD98355|/"],
  "cawd980": ["ed2k://|file|www.98T.la@cawd-980hhb_rfdertr-v6LTX.mp4|9509050461|D71796E3619BC1A32619C0204E90E2BC|/", "ed2k://|file|cawd-980-LTX.mp4|6597917145|7615E1BAB59EB852E0F7A67A8FD885B4|/"],
  "cawd992": ["ed2k://|file|www.98T.la@cawd-992hhb_rfdertr-v6LTX.mp4|7694238181|E4D54366CD482FA4E7B48C9B45DF4B67|/"],
  "cemd783": ["ed2k://|file|www.98T.la@CEMD-783.restored.mp4|10841853568|33B800558A58A7F45B293129A4321EDA|/"],
  "cemd905": ["ed2k://|file|www.98T.la@CEMD-905_restored_wm.mp4|8105839661|08990365FE47C1BD9C9CB8BC50033D31|/"],
  "cemd908": ["ed2k://|file|www.98T.la@CEMD-908_restored.mp4|9392113934|B21F004D7157171A02C1999D616EFB6A|/"],
  "chn037": ["ed2k://|file|www.98T.la@ CHN-037_restored_LTX_wm.mp4|9874092073|8279BE4C97120D988E31097DA4B2A539|/"],
  "cjod027": ["ed2k://|file|www.98T.la@CJOD-027_restored_wm.mp4|7316982572|EB54843631419128FEB0551D94E32C6B|/"],
  "cjod029": ["ed2k://|file|www.98T.la@CJOD-029_restored_wm.mp4|9031645875|36D90075E894468146523DF89BFC5C3B|/"],
  "cjod053": ["ed2k://|file|www.98T.la@CJOD-053_restored_wm.mp4|7304727247|B808AC9C2E0EBBB20B2E289AF4E3960B|/"],
  "cjod165": ["ed2k://|file|www.98T.la@CJOD-165_restored_wm.mp4|7029451055|83019474DE6C3A6C85C5E5275F748ECA|/"],
  "cjod305": ["ed2k://|file|cjod-305-LTX.mp4|6382907694|EB6C3D2A98DA1C16FCF2B0351B196A25|/"],
  "cjod310": ["ed2k://|file|www.98T.la@ CJOD-310 地味メガネ巨乳 肉感ムチムチ豊満ボディに密着挟まれ16発もイカされる無制限射精ソープ 佐山愛 吉根ゆりあ restored_prob4.mp4|23019340049|E9A8ADFFE3185EB1B7580BB860A8AC57|/"],
  "cjod369": ["ed2k://|file|www.98T.la@CJOD-369_restored_wm.mp4|9116593524|10ACADA127E846A84D2A8BF09E57C4E0|/"],
  "cjod427": ["ed2k://|file|CJOD-427【2024-06-25】(西條るり・吉根ゆりあ)ドスケベ愛人二人の奪い合い中出し不倫。ジェラシー淫語と暴走杭打ち騎乗位で朝まで射精され続けたボク… 西條るり 吉根ゆりあ.mp4|4336023362|0E4EDCA177502F1DD793AA814FA35546|/"],
  "cjod433": ["ed2k://|file|www.98T.la@CJOD-433✈️_restored_LTX.mp4|10384801291|0FA9A88E2D687370C771A590BB0158C3|/"],
  "cjod439": ["ed2k://|file|www.98T.la@CJOD-439_restored.mp4|11935485350|d0f1316ec46c518cfb9a3e356bdcfcf1|/"],
  "cjod479": ["ed2k://|file|www.98T.la@CJOD-479_restored.mp4|8051716397|8E228C7A4AA98C166729E4D3DDDB3478|/"],
  "cjod535": ["ed2k://|file|www.98T.la@CJOD-535_restored_wm.mp4|9154001255|E7D749E5A03913C61547D07CA8CDB9DE|/", "ed2k://|file|www.98T.la@CJOD-535_restored.mp4|7025990060|91FC9C26DD04728B95682A305017BD46|/"],
  "cjod539": ["ed2k://|file|4k688.com@CJOD-539_restored.mp4|5142608421|F9B8FA4FF7A8273C2BBD311FADC09FD9|h=ZA37LUDJR5PGUUER4MLBS3OFSXXIPA3F|/"],
  "club816": ["ed2k://|file|www.98T.la@CLUB-816_restored.mp4|13935329034|577F0D0D4C032CF2E06E3B7293343496|/"],
  "club828": ["ed2k://|file|www.98T.la@CLUB-828_restored.mp4|14223510656|93E3675FE7D64ABD1C4D1778711D0661|/"],
  "club843": ["ed2k://|file|www.98T.la@CLUB-843_restored.mp4|14301368777|8F330C881F620AD8A25603FB438E9689|/"],
  "cnd072": ["ed2k://|file|www.98T.la@[LTX]CND-072_restored（新水印）.mp4|5981912471|F94855D6240B78845882068F47DA8A98|/"],
  "cosh250": ["ed2k://|file|COSH-250-4K_LTX.mp4|13174691436|C298A340D9906D4F1205AE44C4221FEE|/"],
  "csct010": ["ed2k://|file|CSCT-010【铃音字幕组】_LTX.mp4|3519752372|58813CD538FAC286F34C2463E281A0AA|/"],
  "dandy414": ["ed2k://|file|www.98T.la@dandy-414_restored_ja_ltx.mp4|7745700022|5225BE47E13E23486087C30DA9ACCBAE|/"],
  "dandy443": ["ed2k://|file|www.98t.la@DANDY-443_restored_ja_ltx.mp4|9502351575|B5B24E87C1DE8F787B1B9562F5A7FE13|/"],
  "dandy625": ["ed2k://|file|DANDY-625(1DANDY00625)[DANDY]「停電中の3分間に近親接吻！暗闇で無理やり唇を奪われた興奮が忘れられず接吻セックスを求める息子の嫁」VOL.1_LTX.mp4|7710079466|9F67D861CD0520C900B42BF1EB6B46B2|/"],
  "dandy733": ["ed2k://|file|DANDY-733【2020-10-08】(羽生アリサ・吉根ゆりあ)混浴溫泉被母親與巨乳媽媽朋友二人夾擊當成玩具的我 VOL.2.mp4|5897749090|AB09493CABF6D7E99BF4C66B0EFE1570|/"],
  "dandy792": ["ed2k://|file|DANDY-792_restored.mp4|821519691|5E377A1A626D8501781EBB9650C91C7E|/"],
  "dandy931": ["ed2k://|file|www.98T.la@DANDY-931.restored.mp4|12593252375|F1F98661110F6477AC4B9170FA2E367F|/"],
  "dasd276": ["ed2k://|file|DASD-276-破解-1080P.mkv|5153647484|5459a8405681872e1760d2ec54ee12d5|/"],
  "dasd321": ["ed2k://|file|www.98T.la@DASD-321_restored_wm.mp4|6718435723|756163EA06252C851A7444FFD70B936E|/"],
  "dasd399": ["ed2k://|file|www.98T.la@[LTX]dasd-399_restored（有水印）.mp4|5945639353|CA7247835822B720D52B0BC4F60282DF|/"],
  "dasd539": ["ed2k://|file|www.98T.la@dasd-539_restored_ja_ltx.mp4|5118108860|EE6364F32C1A2AB1F398B2897620148A|/"],
  "dasd572": ["ed2k://|file|DASD-572.mp4|8922782556|29160943EF8F7E88B07F4FE9AFA2832C|/"],
  "dasd606": ["ed2k://|file|www.98T.la@DASD-606-hack-LTX.mp4|4765551038|04A6792278A9DF4230E5CAE7CF34F1CB|/"],
  "dasd651": ["ed2k://|file|www.98T.la@DASD-651_restored_ja_ltx.mp4|5663296566|094CEB8AF47DF5651CC28F80A4B12EB6|/"],
  "dasd697": ["ed2k://|file|www.98T.la@dasd-697_restored_ja_ltx.mp4|5300367016|4C51BB5C782AA98A434D5E22F738A0F1|/"],
  "dasd719": ["ed2k://|file|www.98T.la@DASD-719_restored_wm.mp4|8416643790|A603D0494C877EDE38BEC6818341FCAC|/"],
  "dasd825": ["ed2k://|file|www.98T.la@dasd-825_restored_wm.mp4|10969938104|06E6B810564E78D49C648AFEEEB39345|/"],
  "dasd866": ["ed2k://|file|www.98T.la@dasd-866_restored_wm.mp4|9364104634|A8AEDE8542BBB6ACD050A26CFBA57475|/"],
  "dass090": ["ed2k://|file|www.98T.la@dass-090_restored_ja_ltx.mp4|7979695798|709FEB358576156B2516718B4C557FB7|/"],
  "dass092": ["ed2k://|file|www.98T.la@DASS-092-hack-LTX.mp4|6644631583|A68EB93AE072E2AA600057BE76059956|/"],
  "dass151": ["ed2k://|file|www.98T.la@www.98T.la@DASS-151_restored_wm.mp4|7090466231|E4066A94F6C5248E59ADD3D4B3C21D8A|/"],
  "dass187": ["ed2k://|file|www.98T.la@DASS-187_restored_LTX.mp4|7142044564|1A792B7FAF768943A20A893D05E39CFB|/"],
  "dass204": ["ed2k://|file|dass-204-restored LTX.mp4|3398579918|0A1D4FC4EE7B165494C3B1F1CBA45DA9|/"],
  "dass215": ["ed2k://|file|www.98T.la@DASS-215_restored_wm.mp4|7539779859|82B88801EDA2C133F01875AD24986919|/"],
  "dass374": ["ed2k://|file|www.98T.la@DASS-374_restored_wm.mp4|8306569602|67C4AA5C7C02B8EE249A25DFD5D5C068|/"],
  "dass482": ["ed2k://|file|www.98T.la@DASS-482_restored_wm.mp4|10880391563|B6E9D8A28CE787F4FE868C3E0CD209E9|h=4O2CKE4VBA2WUAGKWDGGTQXGAGU6U66E|/"],
  "dass485": ["ed2k://|file|DASS-485七瀬アリス予約の取れない誘い受け専門のマゾ風俗嬢、七瀬アリス。_LTX_restored.mp4|6395305923|68017DFC647A103C2327AC557DEA64C2|/"],
  "dass654": ["ed2k://|file|www.98T.la@DASS-654_restored.mp4|6420652884|D88483A1BB979AAE7AFE08D1BC5FBAE1|/"],
  "dass777": ["ed2k://|file|www.98T.la@DASS-777_restored.mp4|8032960352|9A85DC969CA1CBA16C6CB843DA5AEB4F|/"],
  "dass787": ["ed2k://|file|www.98T.la@ DASS-787 無防備に黒パンストを見せつける姉ちゃんのデカ尻を揉み倒して中出ししてしまった僕。 橘メアリー_restored_wm.mp4|8172368958|84750E026CAEAA11FEC374A7308FF091|/"],
  "dass926": ["ed2k://|file|www.98T.la@DASS-926✈️_restored.mp4|7811920780|EA02251975D007E0EC70DACD9B379EF5|/"],
  "dass977": ["ed2k://|file|www.98T.la@DASS-977_水印.mp4|7416031641|236F42381A20AD5A314B23354FCD9A47|/", "ed2k://|file|www.98T.la@DASS-977.restored_prob4.mp4|26723834388|51AF42CC521DE79FF5F1E57184A1CFFD|/"],
  "dber108": ["ed2k://|file|www.98T.la@DBER-108_restored_wm.mp4|8650830245|F6CE1F596F217C16EC5DCEF6CFBCCC9B|/"],
  "dcol017": ["ed2k://|file|www.98T.la@DCOL-017_restored_wm.mp4|7942389963|CF1AD6DC192CF7D72F289BA0E6278FAE|/"],
  "ddhz007": ["ed2k://|file|DDHZ-007_-ltx-AV1.mkv|2272569999|FEB2DA7292A4D6DA697451B21AB17B5B|/"],
  "ddt227": ["ed2k://|file|DDT-227增强_restored.mp4|11239624174|E5CC111C811CFDDD651D25CB5011ECD5|/"],
  "dgl031": ["ed2k://|file|www.98T.la@DGL-031_restored.mp4|10611068762|B1FF60963A838FD1700717D3BAC552C7|/"],
  "dgl071": ["ed2k://|file|www.98T.la@DGL-071_restored_wm.mp4|8330299671|47752497C68B5CE8D996C53B0D44D0FC|/"],
  "dje024": ["ed2k://|file|（外站搬运带作者水印）DJE-024  受虐·精液·恍惚--长泽梓-.mp4|5398366765|CB8005A4417D7EFA411C77494853DCA5|/"],
  "dldss041": ["ed2k://|file|WWW.98T.LA@DLDSS-041_restored.mp4|7616197701|EF9FD75EF256B17D771A65C02CE3AF3D|/"],
  "dldss162": ["ed2k://|file|www.98T.la@DLDSS-162_restored.mp4|8923312153|2E24B49A365E082D09972B333581D481|/"],
  "dldss234": ["ed2k://|file|www.98T.la@DLDSS-234_restored.mp4|7555385526|D58D5257A08343DF733C2F6CA0477367|/"],
  "dldss289": ["ed2k://|file|www.98T.la@DLDSS-289✈️_restored_LTX.mp4|10147525027|39CAF7401438BEF6DCF1BA2ABE5C5A82|/"],
  "dldss325": ["ed2k://|file|WWW.98T.LA@DLDSS-325_restored.mp4|7670438988|AE96B803075CD335114D2C4C49D528D8|/"],
  "dldss375": ["ed2k://|file|www.98T.la@DLDSS-375-U-LTX.mp4|6138640454|0C3D172FEF1E35AD8FE94C6CDB3AF0C9|h=424AXP2EVMUHSM2YEYVCUVFBEUYQBW7B|/"],
  "dldss493": ["ed2k://|file|www.98Tang.la@dldss-493.mp4|5413444404|89CD36A62C53452C1EFCC6CE06207342|/"],
  "dldss538": ["ed2k://|file|www.98T.la@DLDSS-538_restored_wm.mp4|7824864140|792C2646F3B9F596C42CBDFF4851EF38|/"],
  "dmdg034": ["ed2k://|file|DMDG-034【2016-09-25】(吉川あいみ)M乳生中出 吉川愛美.mp4|3049118565|FD4D7D2E61A6F468010A93FDE9F18270|/"],
  "dpmi015": ["ed2k://|file|dpmi00015hhb-ltxU.mp4|6771235848|32831f2d48c84f32c3d45332b9883707|h=q5dgfa6yltnwrtrtijrgs6ikljb5auws|/"],
  "dpmi020": ["ed2k://|file|www.98T.la@DPMI-020_restored.mp4|7433726705|F61E56B46BE2959CACB73E4F2F3700F7|/"],
  "dpmi080": ["ed2k://|file|www.98T.la@2023-04-18【DPMI-080】パンスト妄想脚-LTX_wm.mp4|8662777421|FCD066B2504A9E67AEACD7AC8FFF5990|/"],
  "drpt008": ["ed2k://|file|DRPT-008_restored.mp4|4989681224|DF9D4DF584458036308FEFB5BF125015|/"],
  "dsod060": ["ed2k://|file|DSOD-060-U.mp4|4212371019|A8B8D59F09BADDE732DFED7C189FF238|/"],
  "dsod062": ["ed2k://|file|www.98T.la@DSOD-062_LTX.mp4|9884454468|4380CBBDC4F44D1581EA96E334DD72AB|/"],
  "dsod068": ["ed2k://|file|www.98T.la@DSOD-068_restored_wm.mp4|7740879357|D0B95BEF6DAE7A97224CFB1CA58A8A37|/"],
  "dsod094": ["ed2k://|file|www.98T.la@DSOD-094_restored_wm.mp4|7394441453|B61D12635690C94FFA30D9EE21D34FFA|/"],
  "dsod096": ["ed2k://|file|www.98T.la@DSOD-096_restored_wm.mp4|6711130639|9D4D18A019739904095105B9B8206654|/"],
  "dsod105": ["ed2k://|file|www.98T.la@DSOD-105_restored.mp4|7502812362|8711973315006DBD77FC4B3CC158E4F5|/"],
  "dss192": ["ed2k://|file|DSS-192【2018-01-07】（二宫和香，铃木明那）素人把來插！！再肏京都巨乳姊妹花 番外篇.mp4|8074083539|94487C07F4F9F0DD3558714D64CA63B1|/", "ed2k://|file|DSS-192-LTX【2018-01-07】（二宫和香，铃木明那）素人把來插！！再肏京都巨乳姊妹花 番外篇.mp4|2925943870|1A4F0019783796E4C69A7C858A6BC337|/"],
  "dv1110": ["ed2k://|file|www.98T.la@DV-1110.(53dv01110).[Alice.Japan]希志あいの_水印.mp4|7167834905|ECD8D8D212B3DF1EBEDB916306EB1173|/"],
  "dv1142": ["ed2k://|file|www.98T.la@DV-1142_restored.mp4|7419339820|50809CFB05174E7005FD6A5EC0DFD52B|/"],
  "dv1149": ["ed2k://|file|www.98T.la@DV-1149_restored.mp4|7451693228|03D91842FD63897E715B2DD963761856|/"],
  "dv1327": ["ed2k://|file|DV-1327-LTX【2011-11-11】(奥田咲)終わらないお掃除フェラ 奥田咲.mp4|2235370008|0E04EC4116BEF663D4634B35DEE40D16|/"],
  "dv1348": ["ed2k://|file|DV-1348-LTX【2012-01-13】(奥田咲)相遇4秒馬上幹 奧田咲.mp4|2790053150|EEB48836C11704CFD361E7A67E70DFDF|/"],
  "dv1363": ["ed2k://|file|www.98T.la@[LTX]DV-1363_restored（有水印）.mp4|6101156774|C57E448E608881E56DACD8238BB54F77|/"],
  "dv1452": ["ed2k://|file|www.98T.la@DV-1452_LTX restored.mp4|5621015662|6CA1FB3D9F20204F0892EF89200562ED|/"],
  "dv1682": ["ed2k://|file|DV-1682.mp4|4278979887|1C8C59AFD98D2EBE90EFA9C0D2770C87|/"],
  "dvaj011": ["ed2k://|file|www.98T.la@DVAJ-0011_restored_LTX_wm.mp4|7284287292|0A0F48B5D2D4FC616D2545B673845637|/"],
  "dvaj025": ["ed2k://|file|www.98T.la@dvaj-025_restored.mp4|6704434995|68FF32DDD2373F571C10D3A6D0763888|/"],
  "dvaj292": ["ed2k://|file|www.98T.la@[LTX]dvaj292.hd_restored（新水印）.mp4|6426827501|65FC45F9B6820AD885B33D3AB5A93505|/"],
  "dvaj301": ["ed2k://|file|DVAJ-301(dvaj00301)[AliceJapan]課外性奴麻里梨夏_restored.mp4|6573862896|8372F78F98425C8F81D09903189E3662|/"],
  "dvaj587": ["ed2k://|file|www.98T.la@DVAJ-587_restored.mp4|6733304344|1226054B8AC25FC3D86AF3148009810A|/"],
  "dvaj604": ["ed2k://|file|www.98T.la@DVAJ-604_restored.mp4|6727114731|8258E95CDC379AF776DAC8AE9F4E6D3D|/"],
  "dvaj708": ["ed2k://|file|www.98T.la@DVAJ-708.restored.mp4|8158060342|A4E5B83C58C22C3A484CE0BC3EE5CC9E|/"],
  "dvaj724": ["ed2k://|file|www.98T.la@dvaj-724_restored_wm.mp4|7819362519|93C869B540AEB97F4553804849B08A09|/"],
  "dxan001": ["ed2k://|file|DXAN-001-1080P-破解.mp4|3414737426|AB40A9CBBE120127709622C5C00777B3|/"],
  "ebod282": ["ed2k://|file|www.98T.la@EBOD-282_U-LTX.mp4|7313088129|59AEA70A175F4ED12461698AD358082F|/"],
  "ebod285": ["ed2k://|file|www.98T.la@EBOD-285_restored_wm.mp4|7293409464|B46622D4E5C3329EAA8B7E4ECDEF0C20|/"],
  "ebod339": ["ed2k://|file|EBOD-339-LTX【2014-01-13】（赤井美月）褲襪與臀部 .mp4|3252522523|576B0A4BE49CAB6EFD59438518FB8353|/"],
  "ebod383": ["ed2k://|file|EBOD-383【2014-08-13】(吉川あいみ)SSS-BODY 117分不間斷4本番 吉川愛美.mp4|2670458618|3BF2B6E84739F40B0A13631970F35DCB|/"],
  "ebod493": ["ed2k://|file|EBOD-493 濡れテカコーティング Hcup爆乳BODY 美竹すず.美竹铃.乳液.泡姬.4k.x265.无码破解-LTX.mp4|10470814310|cdf4f7442c9c6919cbdf686af0fdbfa7|/"],
  "ebod531": ["ed2k://|file|www.98T.la@EBOD-531_LTX.mp4|10337601764|6A54D8F56D341E0314B6A622069A14CB|/"],
  "ebod545": ["ed2k://|file|www.98T.la@ebod00545_restored_wm.mp4|9015654900|FF399EC2388CE1EB186BA9145CB41163|/"],
  "ebod998": ["ed2k://|file|EBOD-998_restored.mp4|4711184082|B34E74F5ED71AF598EAF2789112EA3A2|/"],
  "ebwh063": ["ed2k://|file|www.98T.la@EBWH-063_restored.mp4|9540364395|3E6C0173A68C030217E6D308F9BC37BC|/"],
  "ebwh090": ["ed2k://|file|www.98T.la@EBWH-090_restored-LTX.mp4|7339151590|898487BF1321EC1B0D2802EB91006513|/"],
  "ebwh146": ["ed2k://|file|www.98T.la@EBWH-146_restored_LTX.mp4|11408748965|1F0D2F43F5C1D61627316EFF87A18A07|/"],
  "ebwh156": ["ed2k://|file|www.98T.la@EBWH-156_restored_LTX.mp4|7891778420|902D10D02D16C1D512779C497C7DAABB|/"],
  "ebwh247": ["ed2k://|file|www.98T.la@EBWH-247_restored_LTX.mp4|7343399677|B973A6382E942CAECDD4512DB9E5EC98|/"],
  "ebwh294": ["ed2k://|file|EBWH-294-ltx.mp4|6103880604|A5C58038A53755F3B12E6E1E6ABCCE50|/", "ed2k://|file|EBWH-294-C-破解-LTX.mkv|6106118065|D387DDACDE485B20D2A0856E4B8CA945|/"],
  "ebwh319": ["ed2k://|file|www.98T.la@EBWH-319_restored_wm.mp4|10289761563|F2CD3D20CA5F184556CBD84136A0E6D4|/"],
  "ebwh365": ["ed2k://|file|www.98T.la@EBWH-365_restored_wm.mp4|7163277734|02D6FD781BED5512DCCC660AA45152FD|/"],
  "ebwh374": ["ed2k://|file|www.98T.la@EBWH-374_LTX.mp4|10130571173|424AAD6C4FC232DF4849436990245493|/"],
  "eikr002": ["ed2k://|file|www.98T.la@www.98T.la@EIKR-002_restored_wm.mp4|5131055046|C88EF20D8793E85B41D6E9C06F1BB2C3|/"],
  "eyan030": ["ed2k://|file|www.98t.la@EYAN-030_LTX.mp4|7560740394|F04630B98D5795AF6906F449D26823F9|/"],
  "eyan036": ["ed2k://|file|www.98t.la@EYAN-036_LTX.mp4|7683345726|4AA90BFBC9D0EB94AD46DF12F6A4854F|/"],
  "eyan040": ["ed2k://|file|www.98t.la@EYAN-040_LTX.mp4|9722458050|E5AF4CBB9CA422296F27136C10073ED6|/"],
  "eyan047": ["ed2k://|file|www.98t.la@EYAN-047_LTX.mp4|9660190911|5A64A606BB754396691F140487C97574|/"],
  "eyan067": ["ed2k://|file|www.98T.la@EYAN-067_restored_wm.mp4|9058230622|9A8CF972D9A6666027DF869C7DAFAF86|/"],
  "fjin143": ["ed2k://|file|www.98T.la@FJIN-143_u_wm.mp4|7825266588|A66F52D589D2B654A4B22119B36A76E2|/"],
  "fjin148": ["ed2k://|file|www.98T.la@FJIN-148_restored_wm.mp4|7743108575|971F5E0D016FE01D096CC6CC654E8E4D|/"],
  "fns009": ["ed2k://|file|www.98T.la@FNS-009_.mp4|13338949771|65CD3EA74F9CED5FAE802965ABE7FF86|/"],
  "fns036": ["ed2k://|file|www.98T.la@www.98T.la@fns-036_restored_wm.mp4|9228726011|75211B33040BEB74FC3CC79827CF0715|/"],
  "fns098": ["ed2k://|file|FNS-098-U-LTX.mp4|5330391870|EED74302D8E5B37A162197685200A16D|/"],
  "fns156": ["ed2k://|file|FNS-156-ltx.mp4|4684926752|4E2B21B2C150A349DD85F080963191B0|/"],
  "fns258": ["ed2k://|file|www.98T.la@1fns00258hhb_restored (2).mp4|8875686978|741238DBF65FD08E22C1BE1B4E88BB97|/"],
  "fpre163": ["ed2k://|file|FPRE-163__LTX_restored_remuxed.mp4|4617056564|63DDAE2B9534B6616C63FC21C85B8008|/"],
  "fsbk011": ["ed2k://|file|FSBK-011_restored.mp4|9377362942|9DEC2D114821BB658DB9EE6EE5C982B7|/"],
  "fsdss077": ["ed2k://|file|www.98T.la@FSDSS-077_restored_wm.mp4|8248245885|996CA1E09895C2D3AD9D316C9BD24A63|/"],
  "fsdss096": ["ed2k://|file|www.98T.la@FSDSS-096_restored_wm.mp4|6649882806|ADFE24B88703F6025DD7DB3E95E9C8F1|/"],
  "fsdss111": ["ed2k://|file|www.98T.la@FSDSS-111 完全不需要动躺着享受超可爱女优的泡泡浴服务-桥本有菜_restored_wm.mp4|6867507100|8A7D70C064B5F5FBAEE1D08AFC1C094F|/"],
  "fsdss158": ["ed2k://|file|fsdss-158_LTX.mp4|5561157432|888E5FDE4D3CFAC4EAFAE54613A43FB8|/"],
  "fsdss242": ["ed2k://|file|www.98T.la@fsdss-242_restored.mp4|9848571212|309C093D14C38C74ADD5779DCCD9C551|/"],
  "fsdss257": ["ed2k://|file|www.98T.la@FSDSS-257_restored_LTX.mp4|7281944660|4E91494F2A80F75B99D04C25BBA70BF0|/"],
  "fsdss259": ["ed2k://|file|www.98T.la@FSDSS-259_restored_LTX.mp4|7635250817|D87B01E8AFD879892C5E99369AEB7CF6|/", "ed2k://|file|fsdss-259_LTX restored.mp4|6909532674|1105240FE71183EB6C0F20E614B962C0|/"],
  "fsdss272": ["ed2k://|file|www.98T.la@FSDSS-272_restored.mp4|7455266852|B13671F0CBB590DBC9E62BB723BEEAA7|/"],
  "fsdss289": ["ed2k://|file|www.98T.la@FSDSS-289_restored_LTX.mp4|7558396984|AA55E1D36650D7920C9964B79BD2B4E0|/"],
  "fsdss304": ["ed2k://|file|FSDSS-304-LTX.mp4|6276689642|AFF175B5268F52D15FB9515AF62662D1|/"],
  "fsdss320": ["ed2k://|file|www.98T.la@ FSDSS-320 腰が砕けても逃がさない！ひたすら膣奥を貫く強●立ちバックハンドル 橋本ありな_restored_wm.mp4|7518707982|E75484178703B82F8403946EBB8CF215|/"],
  "fsdss351": ["ed2k://|file|www.98T.la@FSDSS-351_restored.mp4|9370032713|7B72E41668892BD633DAF3CD9E7457E6|/"],
  "fsdss365": ["ed2k://|file|www.98T.la@FSDSS-365 新有菜 LTX_restored.mp4|7615007725|DC81DBB19DD99452A72A2CF7625A3FDC|/"],
  "fsdss374": ["ed2k://|file|www.98T.la@FSDSS-374_restored_LTX.mp4|7649250007|5DFB70040BF576338EB492C82F8F4ED5|/"],
  "fsdss376": ["ed2k://|file|www.98T.la@FSDSS-376_restored.mp4|9483965842|B63966E66AC2794E9BC748CDF4A4139F|/"],
  "fsdss393": ["ed2k://|file|www.98T.la@FSDSS-393_restored_LTX.mp4|7452069373|D6A67EA116C0B1D37745439963056D3F|/"],
  "fsdss408": ["ed2k://|file|www.98T.la@ FSDSS-408 家庭教師のありな先生が勉強中に耳もとで淫語を囁きながら乳首をいじくり回してくるのでもっとバカになりそうです… 橋本ありな _restored_wm.mp4|7484159970|4C98E99928757AE8C5786AE21806FCBF|/"],
  "fsdss418": ["ed2k://|file|www.98T.la@fsdss-418-LTX.mp4|8181039039|87E9F7ACCAA9CA8C427E496D41E4D366|/"],
  "fsdss421": ["ed2k://|file|www.98T.la@FSDSS-421 新有菜_restored.mp4|7697480059|CE0E02BEE436F0A9F4F647A27BC85B60|/"],
  "fsdss434": ["ed2k://|file|www.98T.la@fsdss-434_restored_wm.mp4|7434731144|17EC58A18ABEBEF8CBE47DF12842C2E3|/"],
  "fsdss435": ["ed2k://|file|www.98T.la@FSDSS-435 被性格恶劣的变态公公强奸：眼神充满蔑视与恨意、肉体却被操到不断绝顶高潮崩坏的爆乳人妻 小野夕子_restored_wm.mp4|7620799846|7577495FF570A9AECF23B73FCACC7C5E|/"],
  "fsdss437": ["ed2k://|file|www.98T.la@FSDSS-437_restored_wm.mp4|7731471328|D87513C1B4163F256398D05A88F1507F|/"],
  "fsdss513": ["ed2k://|file|www.98T.la@FSDSS-513_restored_LTX.mp4|9231932382|BA91A5FDA0CBF6993A64BAA3A8380110|/"],
  "fsdss525": ["ed2k://|file|WWW.98T.LA@fsdss-525_PJ.mp4|5767170610|F0A0C13791A89A6BB5A6B49C04663668|/"],
  "fsdss530": ["ed2k://|file|www.98T.la@FSDSS-530_restored_LTX.mp4|7383058566|DE734CF5BAF92298661A634A0F96B191|/"],
  "fsdss582": ["ed2k://|file|www.98T.la@FSDSS-582_restored_LTX.mp4|7622517784|15FAB0656C00C4421AE5122C02380B81|/"],
  "fsdss586": ["ed2k://|file|www.98T.la@ FSDSS-586 誰もが羨む美人巨乳秘書からの逆パワハラで無様射精を繰り返している社長の俺 小野夕子_restored_wm.mp4|7477498279|06814688FECDA8E514BB00AE7FD4960F|/"],
  "fsdss636": ["ed2k://|file|www.98T.la@FSDSS-636_restored_LTX.mp4|7420671703|3E2391CD21549023AEE78E5022A14FD1|/"],
  "fsdss638": ["ed2k://|file|www.98T.la@FSDSS-638_restored_LTX.mp4|7410363949|CA34A2B93DE00207F0EDB5004832CDD5|/"],
  "fsdss640": ["ed2k://|file|www.98t.la@FSDSS-640_restored.mp4|6809249889|D7CCBD76576845591150B1CE1C2478B0|/"],
  "fsdss789": ["ed2k://|file|FSDSS-789_LTX.mp4|4451930340|5F3D41071A702D27BF89642E173690A8|/"],
  "fsdss807": ["ed2k://|file|www.98T.la@FSDSS-807_restored.mp4|8989434094|90F26C9E376FCDB67C5AFE3A74C3CF3E|/"],
  "fset410": ["ed2k://|file|fset-410-C_LTX.mp4|10628401272|82A370FBD7B893979BC698E457F3D52B|/"],
  "fset472": ["ed2k://|file|FSET-472(1fset00472)[AKNR]近くに彼氏が居るのに僕を痴女ってくる見知らぬお姉さん_LTX.mp4|5547951369|29304DE52C2AD0E4817259E8ACB9ECCA|/"],
  "ftav006": ["ed2k://|file|FTAV-006_h264.mp4|6850009190|5FF0F8982BDA29E5E81A7C429E316F67|/"],
  "gana3166": ["ed2k://|file|www.98T.la@GANA-3166_restored_wm.mp4|3777436196|4CF78410BB1AA377F34AA9B68191DC0B|/"],
  "garea162": ["ed2k://|file|www.98T.la@ GAREA-162_restored_LTX_wm.mp4|7033133095|93B0B18FA1F4429AB3CC3EF95D3D0690|/"],
  "gdrd043": ["ed2k://|file|GDRD-043.LTX.mp4|5712718985|D1FEAA0CBC96A74E67BCBF5429561797|/"],
  "gmem019": ["ed2k://|file|www.98T.la@gmem-019_restored_wm.mp4|8026452014|EE4097E4D2EE4648097FC3A658B64AF1|/"],
  "gnab022": ["ed2k://|file|GNAB-022-LTX.mp4|4490601654|937DE4D7695C7FAF22E0A81822452239|/"],
  "gqn007": ["ed2k://|file|www.98T.la@GQN-007_restored.mp4|6919953094|F9B6F0859AB435D5FCE8BE76A9ACFCB0|/"],
  "gtal021": ["ed2k://|file|www.98T.la@GTAL-021_restored_wm.mp4|11315321587|39BC564739431E4CB0E165FC964D2B4F|/"],
  "gtte002": ["ed2k://|file|gtte-002_60fps-LTX-ZL.mp4|6300377569|BF80A095F909092894C55979727E21C8|/"],
  "gvg145": ["ed2k://|file|GVG-145_restored.mp4|6977828743|3254FD0504640E19F52B2D4A708F772E|/"],
  "gvg626": ["ed2k://|file|www.98T.la@GVG-626_restored_wm.mp4|7644571110|6AADFEA914796F6D7D91CA0BE38731DC|/"],
  "hawa350": ["ed2k://|file| www.98T.la@www.98t.la @hawa-350_ltx_wm.mp4|9287695040|3D120BE0686157B9417A0EDD94162AB3|h=4VQAT64F3JWRM7HKTQJO3LSMZ4MST6ZW|/"],
  "hbad247": ["ed2k://|file|www.98T.la@HBAD-247_restored.mp4|4840614214|FF1018B9045AE65B707628A15C175861|/"],
  "hbad392": ["ed2k://|file|HBAD-392【2017-11-16】(吉川あいみ)巨乳未亡人 襟元を露わにされて沈黙の昇天.mp4|1997391321|DD98663774F1DCA532A1C4F3FA78FB31|/"],
  "hmn033": ["ed2k://|file|www.98T.la@HMN-033C带水印(新破解版).mp4|9680019295|57F3D1319A8FFBAEF95DAADF9DD7E2DA|/"],
  "hmn338": ["ed2k://|file|www.98T.la@HMN-338.mp4|8580681134|BEA2F897E1CB563ED0A19D1A0DCCA0F1|/"],
  "hmn459": ["ed2k://|file|www.98T.la@HMN-459_restored_LTX.mp4|10458206626|889C2F6D9AE650A2DFEAF07E5E303164|/"],
  "hmn566": ["ed2k://|file|hmn-566_-ltx-AV1.mp4|2221147786|58246DC350F9F6CB9CD7552864862657|/"],
  "hmn586": ["ed2k://|file|www.98T.la@HMN-586_restored_LTX.mp4|7596018054|E6C19CFBC704628B76FAED021AC4653A|/"],
  "hmn632": ["ed2k://|file|www.98T.la@HMN-632_restored.mp4|14991566098|2D0BB56FAA4F46D3D5F99FF493E7F9B6|h=4HE2TH7IE6I7GXP7JQTJEAOHQNB5TTNX|/"],
  "hmn637": ["ed2k://|file|www.98T.la@hmn-637_restored_wm.mp4|7108526171|51B123ECCE94DFADFC6C203C3ED208D2|/"],
  "hmn639": ["ed2k://|file|www.98T.la@HMN-639-LTX.mp4|14831732225|9245FBC02856BC4B6C793E8413F44F2B|/"],
  "hmn663": ["ed2k://|file|www.98t.la@HMN-663_restored.mp4|8706258813|03744FFB9D6B5135A077DB237455C8B1|/"],
  "hmn690": ["ed2k://|file|www.98T.la@HMN-690_restored.mp4|9085208052|7F6A95E45493B5AC43A34330AD051A5D|h=3TZKWIHY7OBU7FW5VUBPGZRCRM6IJRL2|/"],
  "hmn701": ["ed2k://|file|www.98T.la@HMN-701_restored_LTX.mp4|7379764848|D2B6DBD7863A565417DC7D0616F85444|/"],
  "hmn711": ["ed2k://|file|www.98T.la@hmn-711_restored_wm.mp4|7375292769|E3FB3D959C42B0A09AAF9A7340121009|/"],
  "hmn733": ["ed2k://|file|www.98T.la@HMN-733_restored_wm.mp4|6617035529|75333E85E9DC9A505C3CC38C9D670347|/"],
  "hmn751": ["ed2k://|file|HMN-751-LTX.mp4|8755423546|A1BAF644DD2EDA29068B9417343480F3|/"],
  "hmn869": ["ed2k://|file|www.98T.la@HMN-869_restored_wm.mp4|8699051266|D48F5E46BEF696FF8A8BD499DA5AC360|/"],
  "hmn876": ["ed2k://|file|www.98T.la@HMN-876_restored_wm.mp4|9196518853|DE8C1B0C6E89B9CF42609809A9F9851B|/"],
  "hmn880": ["ed2k://|file|www.98T.la@ HMN-880 彼女のお姉さんとまさかのM性感で遭遇…超ドSプレイのくせに悪魔的笑顔と飴ムチ淫語で頭バグるほど痴女られ、射精我慢後のご褒美中出しにハマってしまった俺… 五日市芽依_restored_wm.mp4|7220846384|4888502F0A52632B42F40C61EAEB0CCD|/"],
  "hmn896": ["ed2k://|file|www.98T.la@HMN-896_restored_wm.mp4|9099203425|6CE3BBED52D0CD19489CFEB001E76E33|/"],
  "hmn898": ["ed2k://|file|www.98T.la@HMN-898_restored.mp4|11260777319|A4C4C082522D127645B5CDD501A04754|h=2GH34KZNS4U2GCW6FTOVTVXCI3FLYZNM|/"],
  "hmn904": ["ed2k://|file|www.98T.la@HMN-904_水印.mp4|5928732512|9FD4B9E2CE94B1F51C5E8FBD0DC8D3E7|/"],
  "hmn910": ["ed2k://|file|www.98T.la@HMN-910_restored_wm.mp4|7466411946|EBF67EBF99FC63BEFCF70ADAD5C4683B|/"],
  "hmn911": ["ed2k://|file|www.98T.la@HMN-911_restored.mp4|9504133854|5AE4461937883945557948BDFAF6543E|h=XVF4WGBUVH63R7OTY2APIYEZBEO6FQKR|/"],
  "hmn919": ["ed2k://|file|www.98T.la@HMN-919_restored.mp4|9093179289|35A09DE2BCC42ADB01C8B3C296982646|/"],
  "hmn921": ["ed2k://|file|HMN-921.restored.LTX.mp4|8516271968|F6F0E7409411DFE74B9A13418D84D2AD|/"],
  "hmrk015": ["ed2k://|file|hhd800.com@HMRK-015_LTX.mp4|4880772530|78F79561D7887F039CBDC9B2C18433DC|/"],
  "hmrk033": ["ed2k://|file|www.98t.la@HMRK-033_restored.mp4|4828884721|653FCA32D0B6B04CFBF2BAA6F924CB3F|/"],
  "hnamh027": ["ed2k://|file|HNAMH-027.mp4|1880055048|EBF83C1297B05DE37CF646549C52FF4D|/"],
  "hnamh028": ["ed2k://|file|HNAMH-028.mp4|1783242739|1D6C397CC9784CA57BFE976893FA6B18|/"],
  "hnd128": ["ed2k://|file|HND-128-LTX【2014-09-25】(沖田杏梨)教導中出的肉食巨乳女教師 沖田杏梨.mp4|2904324744|D86B41C3A122630676A1C419CDD2D782|/"],
  "hnd136": ["ed2k://|file|www.98T.la@HND-136_restored_wm.mp4|9427091709|C46EA4BBBA0B517706BAED0AFFC6E64D|/"],
  "hnd275": ["ed2k://|file|www.98T.la@HND-275_restored_wm.mp4|9092191515|35F03FA87F82E934DB56E6A4C655ED3A|/"],
  "hnd292": ["ed2k://|file|www.98T.la@HND-292-U-LTX.mp4|5982245704|AB99171AFA8A8159B403501543BA49B7|h=EKDETG2SKNOBIPBUN7MLJ2XXK7WFYZBO|/"],
  "hnd312": ["ed2k://|file|www.98T.la@HND-312-U-LTX.mp4|5987423100|BC81734790252978F0B09ED35D30377D|h=ESIU5HEPN5ZANTNIX7ZJ7FEMYYXMDUGB|/"],
  "hnd317": ["ed2k://|file|www.98T.la@HND-317_restored_wm.mp4|9605421292|61CA58E51EFFB608879D7A0850DE47EB|/"],
  "hnd354": ["ed2k://|file|www.98T.la@www.98T.la@HND-354_restored_wm.mp4|9677106799|BFB96547071E0D7928A846CCBD2DE264|/"],
  "hnd406": ["ed2k://|file|www.98T.la@HND-406 (hnd00406) [本中] 挿入とフェラを繰り返す生しゃぶり中出しお姉さん 佐々木あき(2)_restored.mp4|6519384024|F0B5E3A4F5143E2A29803535E88E3C57|/"],
  "hnd755": ["ed2k://|file|www.98T.la@HND-755_restored_wm.mp4|7144826914|E38A5574776E09291F06653C843230FD|/"],
  "hnd766": ["ed2k://|file|www.98T.la@HND-766_restored_wm.mp4|7306947093|7AC65C3472E6EF281208905BD00E67B8|/"],
  "hnd966": ["ed2k://|file|HND-966_ltx.mp4|7575660704|A84F4E2F20B7B601AC642E7F5E886608|/", "ed2k://|file|www.98T.la@HND-966-瀬名ひかり_restored_LTX_水印.mp4|6879093493|8C6F98A55E31F9C6B6E2FE370AB4990B|/"],
  "hodv20552": ["ed2k://|file|www.98T.la@HODV-20552水印.mp4|6425916825|FCABCF0D5C5287E026CDE80C6DCC0561|/"],
  "hodv21119": ["ed2k://|file|www.98T.la@HODV-21119_LTX.mp4|11953491149|D91FC1801BBA25F5EED303D1B20B9E8D|/"],
  "hodv22052": ["ed2k://|file|www.98T.la@www.98T.la@hodv-22052_restored_wm.mp4|8956617775|1052BEB81C312F6B27A5D7CAD22BB2B7|/"],
  "hrm009": ["ed2k://|file|HRM-009_LTX.mp4|4881698089|B40AC964A41E7EC86F5A2456308724B9|/"],
  "hsoda003": ["ed2k://|file|www.98T.la@HSODA-003_restored_LTX.mp4|9897378588|5D0B62EADCA346FD4C4F06055D112B18|/"],
  "hsoda053": ["ed2k://|file|HSODA-053_restored.mp4|4917052171|AA6F2DAE97BFE8F884979CC9516D1890|/"],
  "huntc572": ["ed2k://|file|489155.com@HUNTC-572_U.mp4|6010728343|696E9397C8AA79BEA0DE8489FA115EC9|/"],
  "hxad015": ["ed2k://|file|HXAD-015.鈴原エミリ_LTX无水印.mkv|4553870985|E4045F434DCC075D8668CEDE10C22FAF|/"],
  "ienf110": ["ed2k://|file|IENF-110！！！！-LTX.mp4|3545465249|D034EB3D1644A2D34A3A7117B1FA0DF7|/"],
  "imgn040": ["ed2k://|file|www.98T.la@IMGN-040_restored_wm.mp4|5538250379|23FF0E5BD24957D1CD157D7F093C7AF5|/"],
  "indi034": ["ed2k://|file|WWW.98T.LA@INDI-034.mp4|4621709707|8F43BB691C3007C9BED3650FC844CEC3|/"],
  "inu050": ["ed2k://|file|inu-050_restored.mp4|5199233258|B092A9C5559A1892ED73D271AD8467AD|/"],
  "ipit026": ["ed2k://|file|IPIT-026.上坂めい_LTX无水印.mp4|5336401281|F1F0BE84E952614A250E7F6D537DBA94|/"],
  "iptd500": ["ed2k://|file|www.98T.la@IPTD-500_restored.mp4|8354077164|e98d708fc7ba8ecab69fdbda8b74020b|/"],
  "iptd593": ["ed2k://|file|www.98T.la@IPTD-593_restored_wm.mp4|10630650331|74D2B218583919B12210991CD6F03539|/"],
  "iptd884": ["ed2k://|file|iptd00884hhb_LTX.mp4|12053499554|938DBECAE51DEB0CB3B50C1D1C6EBE4C|/"],
  "iptd904": ["ed2k://|file|IPTD-904.LTX.mp4|9459049179|F227499CC8BE6E1F0D1869A95894A992|/"],
  "iptd999": ["ed2k://|file|www.98T.la@IPTD-999_LTX.mp4|10721161792|19653FD08F24281B453E1D10316D3114|/"],
  "ipx002": ["ed2k://|file|www.98T.la@IPX-002_restored_wm.mp4|9081432056|671E5ADAC62C5D0DF1E7343088C4F773|/"],
  "ipx018": ["ed2k://|file|www.98T.la@IPX-018_restored_wm.mp4|10079824384|F205DB4DE54ED9A68E6EE5FDE396FA92|/"],
  "ipx019": ["ed2k://|file|www.98T.la@IPX-019_wm.mp4|12251658572|13AE8A57A33D0D6FDE88CAF972975AC0|/"],
  "ipx034": ["ed2k://|file|www.98T.la@IPX-034 相泽南 LTX_restored.mp4|7326736091|AF5B509534547080D3FD260C018C60F7|/"],
  "ipx039": ["ed2k://|file|www.98T.la@IPX-039-LTX.mp4|7492101835|73EA6DE3AC27221BE77F74435E594563|/"],
  "ipx043": ["ed2k://|file|www.98T.la@IPX-043_restored_wm.mp4|7305168563|C056847373006D77660B605FFB026623|/"],
  "ipx061": ["ed2k://|file|www.98T.la@IPX-061_restored.mp4|10099925132|22C9CAE1ED7BEE29A39E248EFF97A97D|/"],
  "ipx104": ["ed2k://|file|www.98T.la@IPX-104_restored_wm.mp4|9083154215|8B57DCFB06EAF3D58F080D5847C85343|/"],
  "ipx118": ["ed2k://|file|www.98T.la@IPX-118 相澤-見習失禁女僕_restored_wm.mp4|8929895239|FDDF3CB3345C93DA37C429DB26D6EBDA|/"],
  "ipx134": ["ed2k://|file|www.98T.la@IPX-134_restored.mp4|7468323997|87F431F441106275512BD51F3532C616|/"],
  "ipx143": ["ed2k://|file|www.98T.la@IPX-143-LTX_wm.mp4|7406380459|93B3FBC309C29C254CD03DFDB9316944|/"],
  "ipx149": ["ed2k://|file|www.98T.la@IPX-149_restored_wm.mp4|7254936395|037EB6CEEE5366D3A7DDED7DEB935FEC|/"],
  "ipx159": ["ed2k://|file|www.98T.la@IPX-159_restored_wm.mp4|7177741230|AAEFBBFAF06A1E3484EDFB5D526B735F|/"],
  "ipx177": ["ed2k://|file|www.98T.la@IPX-177_restored.mp4|10363694392|454B59541A6DC2F6A1AE114304D73F3C|/"],
  "ipx184": ["ed2k://|file|www.98T.la@IPX-184-LTX.mp4|10504613708|89C81FBCE90D08236EF9E5254F4A271E|/"],
  "ipx193": ["ed2k://|file|www.@IPX-193_restored_wm.mp4|9019498091|83D14A09DF9014F35E2630733F04B36F|/"],
  "ipx201": ["ed2k://|file|IPX-201-U-I LTX櫻空桃, 桜空もも.mp4|6590188938|6382A47EEB6347A60827527EB125BB12|/"],
  "ipx216": ["ed2k://|file|www.98t.la@IPX-216_restored_wm.mp4|7224152982|27C607B3714E83B12F30CA0D2A650568|/"],
  "ipx217": ["ed2k://|file|ipx-217(搬运).mp4|8269652784|434D8442CC4491C6B019637C869713CE|/"],
  "ipx219": ["ed2k://|file|www.98T.la@IPX-219_restored_wm.mp4|14988144505|FC42CBE77BEB9982BEF4CF3AE878C19F|/"],
  "ipx232": ["ed2k://|file|www.98T.la@IPX-232_restored_wm.mp4|9503014923|82B0AFC97ED3D58B2AEEB5B35533FA2F|/"],
  "ipx246": ["ed2k://|file|www.98T.la@IPX-246 欺骗相泽南的狂暴抽插企划-相泽南_restored_wm.mp4|6723064036|AC14769D9305CC2406AF2B23278A29AF|/"],
  "ipx247": ["ed2k://|file|www.98T.la@IPX-247_LTX.mp4|8669269636|9D3944F0C663409FB42F3D604D3ED7D8|/"],
  "ipx258": ["ed2k://|file|www.98T.la@IPX-258 相泽南 LTX_restored.mp4|7386615758|98D683251204AC803CBA3D2D4A1FBD89|/"],
  "ipx278": ["ed2k://|file|www.98T.la@IPX-278.restored.mp4|9223651737|C6D9F2997542D4915177049E1EC69A15|/"],
  "ipx293": ["ed2k://|file|www.98t.la@IPX-293(蓝光Remux)_restored.mp4|20564665575|56f751b7818a4ad9abc0e6459293010c|/"],
  "ipx305": ["ed2k://|file|www.98T.la@IPX-305_restored.mp4|13493020378|65138920554A7918410FF7F75DC8D6E2|/"],
  "ipx328": ["ed2k://|file|www.98T.la@ipx-328_restored.mp4|8363188000|F5CCB523FDF25BB5BD718ED59551E1C5|/"],
  "ipx342": ["ed2k://|file|www.98T.la@IPX-342_restored_wm.mp4|10481560701|6A44AA659559D837D8445C49C1B366D3|/"],
  "ipx352": ["ed2k://|file|www.98T.la@IPX-352.restored.mp4|9794572140|7F4E2C38EF2DA0D2DF8685861DA4F85D|/"],
  "ipx358": ["ed2k://|file|www.98T.la@IPX-358_restored_LTX.mp4|7115888778|C95243626B36FA8D0988EB488F2BE370|/"],
  "ipx368": ["ed2k://|file|www.98t.la@IPX-368(蓝光Remux)_restored.mp4|26161709963|d77ad00b5da912756b6e6237c3fa863a|/"],
  "ipx372": ["ed2k://|file|www.98T.la@IPX-372_restored.mp4|7306948939|D3E444BB41B6BE853BA4982ABEC64C34|/"],
  "ipx387": ["ed2k://|file|www.98T.la@IPX-387 超喜欢肉棒的痴女美少女-相泽南_restored_wm.mp4|8677370254|7E7A01B98E5FE191377D1A47F1BED277|/"],
  "ipx398": ["ed2k://|file|www.98T.la@IPX-398.restored.mp4|11070311461|0CAC1E8D0668DE00B944F48C658B12EF|/"],
  "ipx402": ["ed2k://|file|www.98T.la@IPX-402_restored.mp4|7195582114|5E716BF7B5284785CACD5D43AD7387BD|/"],
  "ipx416": ["ed2k://|file|www.98t.la@IPX-416_restored.mp4|27334137870|e0d0cf9bc84527d086610ca675f2c3b8|/"],
  "ipx451": ["ed2k://|file|www.98T.la@IPX-451_restored_wm.mp4|10058990349|18C09B48E8F8FCF592C21ECD645A9FC4|/"],
  "ipx461": ["ed2k://|file|www.98T.la@IPX-461.restored.mp4|9313102965|4367C15D65C56DE915D66998B8F28D45|/"],
  "ipx466": ["ed2k://|file|www.98T.la@ipx-466_restored_wm.mp4|7296041824|35DF575DEC8445EC5897B4E71656BCD4|/"],
  "ipx484": ["ed2k://|file|IPX-484-LTX.mp4|9137818464|F3BA1B50CE0803849B86C3305E325671|/"],
  "ipx486": ["ed2k://|file|www.98t.la@IPX-486(蓝光Remux)_restored.mp4|27127847488|77ce7f3db2f508ac50c60d95c4dded27|/"],
  "ipx493": ["ed2k://|file|www.98T.la@IPX-493_restored_wm.mp4|9823748400|F395F59579B3EB832DAB9E6002202C94|/"],
  "ipx494": ["ed2k://|file|www.98T.la@IPX-494 被学生们轮奸的女教师-相泽南_restored_wm.mp4|6742567102|3DC6E501AADE59D4FBA1D989CA693229|/"],
  "ipx520": ["ed2k://|file|www.98T.la@IPX-520_restored_wm.mp4|7295948486|AAB5292223547844ADEA179E468058AA|h=VOZOBVRSRQXJFWV2SF6V46QLCXJLEOAM|/"],
  "ipx528": ["ed2k://|file|www.98T.la@IPX-528_restored_wm.mp4|7301197327|3092EFEE48226ED8D620B3938A252D2E|/"],
  "ipx534": ["ed2k://|file|www.98T.la@IPX-534_restored_LTX.mp4|8658306945|F24C875A9E0C62C01C270191C3210015|/"],
  "ipx536": ["ed2k://|file|www.98T.la@IPX-536-LTX.mp4|11525449215|1367ECAFE8E80CFE9307EB44C4753683|/"],
  "ipx540": ["ed2k://|file|www.98T.la@ipx-540_LTX.mp4|8408223371|9AE15DF8D2BDFEA973A53D06C03E9FD7|/"],
  "ipx543": ["ed2k://|file|www.98T.la@IPX-543 相泽南 LTX_restored.mp4|10380376949|BE019413A7229153B27CEE5D7000C4AF|/"],
  "ipx545": ["ed2k://|file|ipx-545_restored.mp4|5248634474|2F6B061FCEA2BC0C5C91333A5BEA2EC4|/"],
  "ipx557": ["ed2k://|file|IPX-557_restored.mp4|8948270553|8886C3F0D6845782010806A7F465A6BB|/"],
  "ipx564": ["ed2k://|file|IPX-564-U-C.mp4|4847862096|302E6205F8AFE7B05FD0B8780028329A|/", "ed2k://|file|IPX-564-U-C.mp4|4847862112|927B727389F3F7EB3885B2BA1EC95EE0|/"],
  "ipx565": ["ed2k://|file|www.98T.la@IPX-565_restored_wm.mp4|7286104603|9346669F86F43140299F038ABEF3F9BB|h=I7J4RORI76XNCCCVPT2VIWG2FLR2WNI7|/"],
  "ipx571": ["ed2k://|file|www.98T.la@IPX-571 黑絲極品風俗娘-相澤_restored_wm.mp4|6835327187|73ADB71FDC9CCF419ECBD1D73F4BFC63|/"],
  "ipx573": ["ed2k://|file|IPX-573.mp4|12677400558|123A7599480B6086BD74EAF874E9C703|/"],
  "ipx580": ["ed2k://|file|www.98T.la@IPX-580_restored.mp4|12812369806|d0434348edff7d1b32006be6ffdfd471|/"],
  "ipx586": ["ed2k://|file|www.98T.la@IPX-586_restored.mp4|7484812003|8963E888A372EFA8F675DD97C3C35B3D|/"],
  "ipx588": ["ed2k://|file|IPX-588 女神的超强口交技巧把眼前的每一根肉棒都舔射-相泽南_restored.mp4|5277209865|736EED42289EF7E15B2F15E13945328A|/"],
  "ipx590": ["ed2k://|file|IPX-590-LTX.mp4|9481518369|8A9FDA92426544D0B9C685B9710839A5|/", "ed2k://|file|www.98T.la@IPX-590_restored.mp4|9534971132|A984ED6D8A9D4350A6548C9726EE95F3|/"],
  "ipx596": ["ed2k://|file|www.98T.la@IPX-596_restored_LTX.mp4|7245155448|F9E06738D360642E4F36CB8ABA44E354|/"],
  "ipx604": ["ed2k://|file|www.98T.la@IPX-604_restored_LTX.mp4|7711717917|CD5F6DE24FD80EB3F1B07576886BFE0E|/"],
  "ipx607": ["ed2k://|file|www.98t.la@ipx-607_restored.mp4|7982810899|38783C67A6B5828627D670F61660F2B7|/"],
  "ipx620": ["ed2k://|file|www.98T.la@IPX-620_restored.mp4|11386538456|373271E46FD9625DD14D9F27519063DF|/"],
  "ipx621": ["ed2k://|file|www.98T.la@IPX-621_restored.mp4|7399825543|71E47E755AA32E0DFFE4EA204B5E1248|/"],
  "ipx627": ["ed2k://|file|www.98T.la@IPX-627_restored_LTX.mp4|7216441067|BFDC050BBBA67C5BD3EAAC57671E7714|/"],
  "ipx633": ["ed2k://|file|www.98T.la@IPX-633_restored-LTX.mp4|7299813834|FD9E725A39406B5E4E361CA9E4EB8E39|/"],
  "ipx641": ["ed2k://|file|www.98T.la@IPX-641 旦那への罪悪感を覚えつつ今日も義父の濃密レ●プに繰り返し絶頂を… 楓カレン_restored.mp4|6820737016|C12BA6AC708CABF0D1524AF88660E0B7|/"],
  "ipx643": ["ed2k://|file|www.98T.la@IPX-643_restored_wm.mp4|9185469942|39FE1A9D3ECD0E8A3ACF109711D4A8EF|/"],
  "ipx649": ["ed2k://|file|www.98T.la@IPX-649_restored_LTX.mp4|6948026808|30E9838B06D66DFA80907EEAD029A98A|/"],
  "ipx660": ["ed2k://|file|IPX-660_LTX_restored.mp4|6231036446|24A7E13182311D391F5D539E8154DBE7|/"],
  "ipx666": ["ed2k://|file|www.98T.la@IPX-666_restored.mp4|6120432722|6188198D2602BD9B4D24DF08741B9B5B|/"],
  "ipx668": ["ed2k://|file|www.98T.la@IPX-668_restored_LTX.mp4|7151634423|0759621247B3BC9E190057D91777803E|/"],
  "ipx674": ["ed2k://|file|www.98T.la@IPX-674_restored_LTX.mp4|7163321830|39EE942EC006CA8870F47D71C051F48D|/"],
  "ipx680": ["ed2k://|file|www.98T.la@IPX-680_restored_wm.mp4|9074406708|909FA8D826F9F7620C5CB43C94AFED4F|/"],
  "ipx689": ["ed2k://|file|www.98T.la@ipx-689_restored.mp4|9592525763|c8492618a7eba1a4895a436efcb974c3|/"],
  "ipx690": ["ed2k://|file|www.98t.la@IPX-690_restored_wm.mp4|8940230818|4D8C55B74EE4F0CE89BB96C91571B191|/"],
  "ipx691": ["ed2k://|file|www.98T.la@IPX-691.restored.mp4|9140050401|565A915A6642F984E77095BB78995906|/"],
  "ipx697": ["ed2k://|file|IPX-697相沢みなみ禁欲の果て、汗と絶頂汁まみれで交わりまくった3日間 相沢みなみ （ブルーレイディスク）_LTX_restored.mp4|7852038366|F65F92A81EA2A14AB1D7F6EEC8EF12B4|/", "ed2k://|file|ipx-6974K_restored.mp4|40965602216|C543F8BAEE858339E372F52A1DDD16D9|/"],
  "ipx700": ["ed2k://|file|www.98T.la@IPX-700_restored_wm.mp4|9547028618|4810302EC50D618FF6E919F50D5EA665|/"],
  "ipx706": ["ed2k://|file|www.98T.la@www.98T.la@IPX-706_restored_wm.mp4|9240388344|82D00DE8874FF6319A0D807FEB50195B|/"],
  "ipx714": ["ed2k://|file|www.98T.la@IPX-714.restored_wm.mp4|7379000443|EF2CCBFFA00FE2A7EB75B0C43C2C25D3|/"],
  "ipx724": ["ed2k://|file|www.98T.laipx-724_LXT.mp4|9990472955|1FB090B120294D4CDAEC0403B8C30EA3|/", "ed2k://|file|www.98T.la@ipx-724_restored.mp4|9785506196|1e949c13ac76ce26b06fb92c77e6f87d|/"],
  "ipx725": ["ed2k://|file|ipx-725-LTX.mkv|8122080734|22D4CEF3DF5266C3B1C2ED4FBF08F3CD|/"],
  "ipx726": ["ed2k://|file|www.98T.la@IPX-726_restored_LTX.mp4|10264357856|17220DD3E1617F1687D5CCF0943D0112|/"],
  "ipx732": ["ed2k://|file|www.98T.la@IPX-732_restored_wm.mp4|9543370488|4F35D51E39A6F7DCE592ADFC2A54ECDD|/"],
  "ipx742": ["ed2k://|file|www.98T.la@IPX-742_restored_LTX.mp4|9678414601|E96862226EF7EC97B0D34F61F4A4412D|/"],
  "ipx743": ["ed2k://|file|www.98T.la@IPX-743_60fps-LTX.mp4|14338523210|B644D8D9A15B3390C060BE765F185BD7|/", "ed2k://|file|IPX-743_60fps_ltx__%E6%97%A0%E6%B0%B4%E5%8D%B0%E5%8E%9F%E7%89%88%E5%8B%BF%E5%88%A0.mp4|9343087283|D1154F89674E03CD137B3DF5C1E518A2|/"],
  "ipx750": ["ed2k://|file|WWW.98T.LA@IPX-750_PJ.mp4|5590983735|BCB2D29566204275455B03E1D55142B9|/"],
  "ipx758": ["ed2k://|file|ww.98t.la@IPX-758_restored.mp4|6714084740|B6AC13D8C01DFE49111C62CB3CD57354|/"],
  "ipx766": ["ed2k://|file|www.98T.la@IPX-766 与百年难遇美少女激情热吻激烈肏屄-相泽南_restored_wm.mp4|8964165414|1EE71FDC5DF7E0C77381BF1BDBA91805|/"],
  "ipx770": ["ed2k://|file|IPX-770-U-LTX.mp4|6050205028|6DB72BA4B841F24C67A5FA79DE11C6FC|/"],
  "ipx776": ["ed2k://|file|www.98T.la@IPX-776 [IDEA POCKET] 身代わり肉便器 射精しても射精しても終わらない絶倫極道オヤジとの10日間監禁生活 楓カレン_LTX.mp4|10726594359|CED2D57B796122DCD31BC5D6B9183317|/"],
  "ipx777": ["ed2k://|file|www.98T.la@IPX-777_restored_wm.mp4|7276709995|F2E9C49D82B965E3E0CC4BA43B4F9B77|/"],
  "ipx778": ["ed2k://|file|www.98T.la@IPX-778 restored_11.2 LTX.mp4|7050529738|3C83B5BB78AE4364254D01021583CFD3|/"],
  "ipx783": ["ed2k://|file|www.98T.la@IPX-783_restored_wm.mp4|9307880785|D57595466A756F3D03FEDE68273E7639|/"],
  "ipx784": ["ed2k://|file|WWW.98T.LA@IPX-784_PJ-LTX.mp4|5568041956|C347D67597D721551FAE8A7E822032BF|/"],
  "ipx801": ["ed2k://|file|www.98T.la@IPX-801_restored_wm.mp4|10522517889|34783A74FF2074B27F4719200156C767|/"],
  "ipx811": ["ed2k://|file|www.98T.la@IPX-811_LTX_restored.mp4|5410066009|6B7ADFE58CF3492F4316A8F5BE53F1D6|/", "ed2k://|file|IPX-811_restored_Jasna_0.11.3.mp4|3771540434|7121E2132EE4E03FDCC6BFE8B4A0DC11|h=PGB5QL4RUMXIXCUBHULHCSHSC6L32V7N|/"],
  "ipx831": ["ed2k://|file|www.98T.la@IPX-831_restored_wm.mp4|7287173631|3499B22A22ABA00AD5BEE2065E662DF3|/"],
  "ipx832": ["ed2k://|file|www.98T.la@IPX-832_restored.mp4|7327264715|9E7C04FACF921920DB584E7AEB0605F3|/"],
  "ipx838": ["ed2k://|file|www.98T.la@IPX-838_restored_wm.mp4|9181012560|93474FF0084F83F7CE8E7321B4B09634|/"],
  "ipx850": ["ed2k://|file|www.98T.la@IPX-850_restored.mp4|9397795643|33FF46BEB7890373A8BD795DF60578A8|/"],
  "ipx851": ["ed2k://|file|www.98T.la@[LTX]ipx-851_restored（新水印）.mp4|6061287006|06205CD372E39B15F8DC57CDACE2F07A|/"],
  "ipx857": ["ed2k://|file|www.98T.la@IPX-857_restored_wm.mp4|9093291075|28D21E7FC61979EBD5CBF95B1A4277D1|/"],
  "ipx867": ["ed2k://|file|IPX-867_restored.mp4|6258379380|F6601573F9D2445B68FFF30430E05F65|/"],
  "ipx868": ["ed2k://|file|www.98t.la@IPX-868_restored_wm.mp4|8983891511|BA11DDB68A723DEED890BF02527A0D08|/"],
  "ipx873": ["ed2k://|file|WWW.98T.LA@IPX-873_PJ.mp4|4069406250|B6019B81DDBC5206122A21659802F26A|/"],
  "ipx889": ["ed2k://|file|www.98T.la@IPX-889_restored_LTX.mp4|6999927385|C8BA7C1ECC2ED2193571741D90637385|/"],
  "ipx904": ["ed2k://|file|www.98T.la@IPX-904_restored_LTX.mp4|6841766030|6E67EBFA8E18A329F376C6ED7C5CBFCB|/"],
  "ipx906": ["ed2k://|file|www.98T.la@IPX-906-U-LTX.mp4|9441727581|3B7A9A3B6323E08AB2DFF523E7A55EB8|h=C5AXSPGHA4RWCP4BRYFGKX3Y2PDMZLG6|/"],
  "ipx916": ["ed2k://|file|www.98T.la@ IPX-916 「ホテル行こっか？」 新入社員歓迎会で酔いつぶれた僕が会社の受付嬢に逆お持ち帰りされ朝まで精子搾り抜かれた一夜。 桜空もも_restored_wm.mp4|7156484017|1DACBC8507C8C2FD4C8C806E3EECAA13|/"],
  "ipx922": ["ed2k://|file|www.98T.la@IPX-922_restored_LTX.mp4|7377641846|59A6020AC2A7352E289B5E860A2C92BC|/"],
  "ipx939": ["ed2k://|file|www.98T.la@IPX-939_restored_LTX.mp4|6969833177|E82824CC1915AB43D4589D924FFCA7C0|/"],
  "ipx954": ["ed2k://|file|www.98T.la IPX-954 パンスト美脚でシャイなチ○ポを誘惑する美人女教師のわいせつ個人授業 明里つむぎ_restored_wm.mp4|7409273499|C5177AE6AE87C7E877DAFAB52AA54FE7|/"],
  "ipx962": ["ed2k://|file|www.98T.la@IPX-962-LTX.mp4|11274781127|7EA7CE8DE6DA7CE4CF3A6696BC543B6A|/"],
  "ipx973": ["ed2k://|file|www.98T.la@IPX-973_restored_wm.mp4|7349571565|4B4BECD05F531C10B77793F120896A48|/"],
  "ipx998": ["ed2k://|file|www.98T.la@IPX-998_restored.mp4|7354918501|F76AF87B7F48C957CA3BB0AD7E741887|/"],
  "ipz048": ["ed2k://|file|www.98T.la@ipz-048.mp4|9964388631|5059FE239619DCDEE5D86A1EF70AE3B5|h=TUOHOL2XWKYCTXFOMUHVKDZJKXLVCJWN|/"],
  "ipz105": ["ed2k://|file|IPZ-105_LTX.mp4|8637836518|B465A6B9D40FEBDA777B50C73F0F2DB3|/"],
  "ipz127": ["ed2k://|file|www.98T.la@IPZ-127-U.mp4|14707794287|020281409DF3A8FCBA47C93B85D20BDC|/"],
  "ipz253": ["ed2k://|file|www.98T.la@IPZ-253_restored.mp4|9601591118|BB6FFF7765DF87524EE55C521FCA658A|/"],
  "ipz261": ["ed2k://|file|www.98T.la@IPZ-261_restored_wm.mp4|10100303266|E57D75B1E3888AE4FD2D787677548C0F|/"],
  "ipz275": ["ed2k://|file|www.98T.la@ IPZ-275_restored_LTX_wm.mp4|11233819851|6D701D993614E2D1D9C6047C683141E7|/"],
  "ipz287": ["ed2k://|file|www.98T.la@IPZ-287_restored_wm.mp4|11113362576|9BE40083CC433314982D855BF15BD5F1|/"],
  "ipz293": ["ed2k://|file|www.98T.la@IPZ-293_restored.mp4|9579102579|90127F7461FDD614E1ADD7D67A9C5A56|/"],
  "ipz319": ["ed2k://|file|www.98T.la@IPZ-319_restored_wm.mp4|9669931775|21479C850DA19B9A50A3CC2584E40DB8|/"],
  "ipz339": ["ed2k://|file|www.98T.la@IPZ-339_restored_wm.mp4|7267947257|7D527A35BF9BE10C01A805ED7705A816|/"],
  "ipz343": ["ed2k://|file|ipz343-restored.mp4|7623134030|302BB204B459927209770CBFCB7A1C9E|/"],
  "ipz377": ["ed2k://|file|IPZ-377_ltx__%E6%97%A0%E6%B0%B4%E5%8D%B0%E5%8E%9F%E7%89%88%E5%8B%BF%E5%88%A0.mp4|4839998411|73FD130C709ACAE0544CF6C2B8926F34|/"],
  "ipz385": ["ed2k://|file|www.98T.la@IPZ-385_restored_wm.mp4|8969495839|7D751E5F5269E12BF61492161E96D81A|/"],
  "ipz405": ["ed2k://|file|IPZ-405.1080P.mp4|9269411840|abcdef0123456789abcdef0123456789|/", "ed2k://|file|www.98T.la@IPZ-405_restored_wm.mp4|8870872113|66FAD53289265568AA2B5B89D83105AC|/"],
  "ipz451": ["ed2k://|file|www.98T.la@IPZ-451_PJ-LTX.mp4|6981181307|B1996ADF9C80713773E1CCC727844B88|/"],
  "ipz456": ["ed2k://|file|www.98T.la@IPZ-456_restored.mp4|9651405287|692972A66EDFD1AAF7387A0CB692BFAE|/"],
  "ipz476": ["ed2k://|file|www.98T.la@ipz-476-LTX.mp4|9042264209|63080051ABC013587F9EEA547D766871|h=TASXILUXVPA7UXK6T4ZBSALLGJ4JUJPO|/"],
  "ipz490": ["ed2k://|file|www.98T.la@IPZ-490_restored-LTX.mp4|10959688821|A2853B5B053D2F0B83EA7EC668D05E48|/"],
  "ipz546": ["ed2k://|file|www.98T.la@IPZ-546メられた新人美女RQ断り切れず枕営業を虐げられる美裸体希島あいり_restored.mp4|9348145230|3BAF73619AF5900A02E7850A251D6514|/"],
  "ipz559": ["ed2k://|file|www.98T.la@IPZ-559_restored-LTX.mp4|11021559679|9D6131452DF3B975965FD0F927F99EAF|/"],
  "ipz612": ["ed2k://|file|IPZ-612【 2015-08-19】（木南日菜）一位身材火辣、胸部丰满的美女教师在一次淫秽的课外辅导中引诱天真的学生.mp4|3465357979|A433FA2BB9BF7A262F693F241A6A7D38|/"],
  "ipz634": ["ed2k://|file|www.98T.la@IPZ-634[IDEAPOCKET]タイトスカート女教師の魅惑なお誘い希志あいの_restored.mp4|11060935632|625BFEB9E4F46F9F01647A6E04672A44|/"],
  "ipz676": ["ed2k://|file|www.98T.la@IPZ-676-C_restored~1.mp4|5499773572|260F5E7EF6E0A6B779EDD0BBF4CD1876|/"],
  "ipz687": ["ed2k://|file|www.98T.la@IPZ-687[IDEAPOCKET]ハメられた新人美女RQ断り切れず枕営業を虐げられる美裸体輝月あんり_restored.mp4|7331275199|2D1C6CF744F591CA58CC84354A4CBA46|/"],
  "ipz722": ["ed2k://|file|www.98T.la@IPZ-722_restored.mp4|5169445082|AE93CDC7CCBBD3E28F4B5A6F73822EB1|/", "ed2k://|file|IPZ-722希崎杰西卡LTX无水印.mp4|6310285278|B8981D69B4E2E3770AD896DC65134C58|/"],
  "ipz746": ["ed2k://|file|www.98T.la@IPZ-746-LTX.mp4|8231470405|6D215B0B7CC7343C4F4B0FCE593C638C|/"],
  "ipz809": ["ed2k://|file|www.98T.la@IPZ-809 restored_11.2 LTX.mp4|9661279277|49EFF96A7A9C78601E535269C3C89B88|/"],
  "ipz820": ["ed2k://|file|IPZ-820FHD_LTX.mp4|5036311862|86028415131BBB3A335024AC04469F7C|/"],
  "ipz824": ["ed2k://|file|ltx_IPZ-824_restored.mp4|6208718795|c8ef16bc39da117d09700d776e380cea|/"],
  "ipz828": ["ed2k://|file|www.98T.la@IPZ-828-U-LTX.mp4|9404699781|40EDE1229640106975D12B55BC0D8B1A|h=6ZMWJ22TXWJRGAZZGS4VHG6WHMKXB6GN|/"],
  "ipz875": ["ed2k://|file|www.98T.la@IPZ-875_restored_LTX.mp4|9011352369|590AF82D75CF63CCD7C4C16785A39F7E|/"],
  "ipz910": ["ed2k://|file|www.98T.la@IPZ-910_restored.mp4|7214711404|489C61F2C3F87D47848322808C996B36|/"],
  "ipz918": ["ed2k://|file|www.98T.la@IPZ-918_restored.mp4|10174562190|12002AEC19A55208154D2683A8585483|/"],
  "ipz921": ["ed2k://|file|www.98T.la@IPZ-921 restored 11.2 LTX.mp4|9511152100|9D6B208504E23CB6F3808DA9CC1C5DF6|/"],
  "ipz922": ["ed2k://|file|www.98T.la@IPZ-922_restored.mp4|8766011046|59281CC1FC9C6211528760EE214D47EE|h=U5K53QHI6HC2AW5A4HPPKWGC2H2EDQT7|/"],
  "ipz950": ["ed2k://|file|www.98t.la@IPZ-950(蓝光Remux)_restored.mp4|20379260170|8ed2d594424e5627173772c65a18cb64|/"],
  "ipz986": ["ed2k://|file|www.98T.la@IPZ-986.restored.mp4|8140925106|04A6D0144327F2E9487B785D461F2E39|/", "ed2k://|file|www.98T.la@IPZ-986 restored_11.2 LTX.mp4|9130129408|E034373D43FF36FDA7A8868DDFD1966C|/"],
  "ipz998": ["ed2k://|file|www.98T.la@IPZ-998_restored.mp4|9349992693|3EBB5A5473B6AD31DCAB6216EDC51355|/"],
  "ipzz003": ["ed2k://|file|www.98T.la@IPZZ-003_restored_wm.mp4|8759473124|A68E850907431C440885ED805BD3FA2D|/"],
  "ipzz024": ["ed2k://|file|www.98T.la@IPZZ-024_restored.mp4|9840826092|AD5EFDFC17298DD73FFED7A0963527AE|/"],
  "ipzz037": ["ed2k://|file|www.98T.la@ipzz-037_restored_wm.mp4|7269350054|4FEEF479584DF781C8D9BDDEA12A1A98|/"],
  "ipzz039": ["ed2k://|file|www.98T.la@IPZZ-039_restored.mp4|7314485129|D4576DE2CEBC7EF6E0BF58274A829057|/"],
  "ipzz046": ["ed2k://|file|www.98T.la@IPZZ-046_restored_LTX.mp4|8903069101|F98A4070C848A5D43DAB751F74E6F819|/"],
  "ipzz054": ["ed2k://|file|www.98T.la@IPZZ-054_restored_LTX.mp4|7027722023|02B2F74ED8F2F487677182E165B14C19|/"],
  "ipzz061": ["ed2k://|file|www.98T.la@IPZZ-061 11.2 LTX.mp4|7521581882|8BBBC3ABFDA10C806FB9B90827E6B227|/"],
  "ipzz077": ["ed2k://|file|www.98T.la@IPZZ-077 顶级AV女优三上悠亚，大量的唾液与肉棒和打手枪交织在一起,沾满口水的鸡巴被挤进汁液的阴户,多次激烈的活塞运动 三上悠亚_restored_wm.mp4|7296800212|45D8072A538A414581A2160643AFBCCE|/"],
  "ipzz079": ["ed2k://|file|www.98T.la@IPZZ-079有水印版.mp4|22724340723|15BA0BB9045F221395CA47D0DA7A3A42|/"],
  "ipzz081": ["ed2k://|file|IPZZ-081C(破解版)-有水印.mp4|22019014841|0318D1DEC061750B3204E6177BE86BDB|/"],
  "ipzz088": ["ed2k://|file|www.98T.la@IPZZ-088-WS_wm.mp4|11043926016|AAE4E5AB7FC66B6E2AA44F226FBE5FED|/"],
  "ipzz090": ["ed2k://|file|IPZZ-090-LTX.mp4|7610873103|D8677382FDCA078290101C8389F80825|/"],
  "ipzz102": ["ed2k://|file|www.98T.la@IPZZ-102_restored_wm.mp4|7597996745|08CDE87A5090B11084B70B39D45123F7|h=WKWJB42E55BMF75ILDJKCGN4BK7HEMDU|/"],
  "ipzz112": ["ed2k://|file|www.98T.la@IPZZ-112_restored_wm.mp4|8665222298|FFF803C629743BEDD5DC21BBBE3A5BC2|/"],
  "ipzz151": ["ed2k://|file|www.98T.la@IPZZ-151_restored-LTX.mp4|7753193552|E431E34041CDBE6B628F2209A8DB784A|/"],
  "ipzz178": ["ed2k://|file|www.98T.la@IPZZ-178_restored_wm.mp4|7297660037|718D3BE60ECFCDD21DEFF60B1CE5DAEA|/"],
  "ipzz236": ["ed2k://|file|www.98T.la@IPZZ-236_restored_LTX.mp4|7328668458|3D48F2906924AC95B831A23B5882FF48|/"],
  "ipzz242": ["ed2k://|file|www.98T.la@IPZZ-242_restored_LTX.mp4|7353647687|93ED498E5180BE3902480C1C42FF62A8|/"],
  "ipzz253": ["ed2k://|file|www.98T.la@ipzz-253_restored.mp4|9185489427|4CB218CD68E14DB49774D7B139E5BCDB|/"],
  "ipzz261": ["ed2k://|file|www.98T.la@IPZZ-261.restored.mp4|10326248974|92041B5D28774D18C23EE8F52EE1E826|/"],
  "ipzz269": ["ed2k://|file|www.98T.la@IPZZ-269_LTX.mp4|9557338158|975F9DB1329E67EA53318C8910CE336C|/"],
  "ipzz281": ["ed2k://|file|@IPZZ-281_restored.mp4|7128347135|0ADD776E072B7626227172CD92FBEBF7|/"],
  "ipzz376": ["ed2k://|file|www.98T.la@IPZZ-376_restored_LTX.mp4|7589003540|8B66C0E8EA8D38C0AF5ECF7B07127A55|/"],
  "ipzz415": ["ed2k://|file|www.98T.la@IPZZ-415-U-LTX.mp4|6158309968|CA1F902279BAA071C362B1EEE1628696|h=N3XYLF2BXZVO6YJIRL234BRQ2DZ5AWAW|/"],
  "ipzz424": ["ed2k://|file|LTX@IPZZ-424_西宮ゆめ.mp4|4463490966|48e08519dbb75a0e44516981f1b05ac7|/"],
  "ipzz435": ["ed2k://|file|www.98t.la@IPZZ-435(蓝光Remux)_restored.mp4|24265049759|7cb9f92395147d6b1fde95578c6ea2fd|/"],
  "ipzz451": ["ed2k://|file|www.98T.la@ IPZZ-451 【完全主観】予約1年待ち！神美脚スレンダー美女が金玉がカラになるまでヌイてくれる超高級メンズエステ 明里つむぎ_restored_wm.mp4|8437967534|7C6AC82C1DDCB4FCCEE75C2F7664D712|/"],
  "ipzz456": ["ed2k://|file|www.98t.la@IPZZ-456(蓝光Remux)_restored.mp4|19082297722|fe863ae39aaec650ec96793b5301de5d|/"],
  "ipzz457": ["ed2k://|file|www.98T.la@IPZZ-457_restored_LTX.mp4|9309801167|C32B288DDEB1B077C0AA408985A09C3D|/"],
  "ipzz463": ["ed2k://|file|www.98T.la@IPZZ-463_restored.mp4|7983896878|0F71E0DD655016A5A73A1D5CE64F940A|/"],
  "ipzz475": ["ed2k://|file|www.98T.la@IPZZ-475_restored.mp4|7519447955|7280894831B8C9B9E1B34552F8956DD0|/"],
  "ipzz477": ["ed2k://|file|www.98T.la@ipzz-477_restored_wm.mp4|7407580295|017168E23A72BAB1A7423B54B3BA751E|/"],
  "ipzz479": ["ed2k://|file|www.98t.la@IPZZ-479_restored.mp4|8089112102|964D9FC6FF9B5BCF7CBCEC9546EF3843|/"],
  "ipzz484": ["ed2k://|file|www.98T.la@ IPZZ-484 童貞専用メイドカレンさんのSEXレクチャー個人レッスン ハートとチ〇ポを優しく包み込んでくれる最高の筆おろしご奉仕セックス 楓カレン_restored_wm.mp4|7683369938|279FEF8E1AD3C8C790224DABAAB7272C|/"],
  "ipzz501": ["ed2k://|file|IPZZ-501-U-LTX.mp4|3731891273|6698fba0663102878c9e16f542c92321|/"],
  "ipzz508": ["ed2k://|file|IPZZ-508-LTX.mp4|7231001976|9698F1C20262CADB1A2BDDD356F3E000|/"],
  "ipzz547": ["ed2k://|file|ww.98T.la@IPZZ-547_restored.mp4|6513438319|158C1699FE96A7AA38A252E092C974C2|/"],
  "ipzz574": ["ed2k://|file|www.98T.la@IPZZ-574_restored_LTX.mp4|7735979717|CFC454B4405E385800FC3D040BF99CBF|/"],
  "ipzz597": ["ed2k://|file|IPZZ-597_4K_restored.mp4|10452449385|923CCC8235B40514C91938B0CF1AE31D|/"],
  "ipzz630": ["ed2k://|file|www.98T.la@IPZZ-630_restored_LTX.mp4|6980842341|920439B544A9B78B2DFFF478DA870F85|/"],
  "ipzz652": ["ed2k://|file|www.98T.la@IPZZ-652_restored_wm.mp4|7257200417|787EEE8AC459E9B3C9CFA71BE8DBAAB1|/"],
  "ipzz655": ["ed2k://|file|www.98T.la@IPZZ-655 チート級媚薬を盛り込まれキメセクマッサージにイキ狂わされた美人妻 楓カレン_restored.mp4|6477970243|4372EC74FE73997AF29A78AE93EEE724|/"],
  "ipzz669": ["ed2k://|file|www.98T.la@ipzz-669_restored_wm.mp4|8676626372|DC1AD89C01D624776FF6343C7758CE37|/"],
  "ipzz673": ["ed2k://|file|www.98T.la@IPZZ-673_restored_LTX.mp4|7046702243|768D50659192C5FAB2FEF5882B330E6E|/"],
  "ipzz694": ["ed2k://|file|IPZZ-694-C_restored_LTX.mp4|3043690497|B21F663FDB51B5890E6191A5C8770BC6|/"],
  "ipzz703": ["ed2k://|file|www.98T.la@IPZZ-703-U-LTX.mp4|5941938238|A78B19B94867FD0B2B1768A7EA259383|h=IFEQDIXHS7NJRPV7FZQDIAM4GWICOPEN|/"],
  "ipzz767": ["ed2k://|file|www.98T.la@IPZZ-767_LTX.mp4|8054916027|D4E74B7866B7B59279DCDFFE730C16C2|/"],
  "ipzz777": ["ed2k://|file|www.98T.la@IPZZ-777_restored_LTX.mp4|7253342591|F90C39B3D2E217161A5E0700566ECB4D|/"],
  "ipzz778": ["ed2k://|file|www.98T.la@IPZZ-778 圧倒的美人な家庭教師に調教され身も心も依存してしまう罵倒オナサポ 楓カレン （ブルーレイディスク）_restored.mp4|6469676281|DB95D926CAAB8B19726632AE50E75697|/"],
  "ipzz802": ["ed2k://|file|www.98T.la@IPZZ-802 DIGITAL CHANNEL DC144 楓カレン 美しき女神 初ぶっかけ解禁_restored（枫可怜、枫花恋）.mp4|8549216875|BF95E559215E35AB7D632480672DF1DF|/"],
  "ipzz859": ["ed2k://|file|www.98T.la@IPZZ-859_restored_ltx_wm.mp4|7569493281|5BDABCC5FA6CAC75E17BBB975CE8ED3B|/"],
  "ipzz898": ["ed2k://|file|www.98T.la@IPZZ-898_restored.mp4|6514342892|BD3B8820AACB1871D6B717B13A30B48D|/"],
  "ipzz912": ["ed2k://|file|IPZZ-912_restored.mp4|3377286199|DC7D70B654910277EACF315BE57C4CAE|h=AAQRQQNUY74WBRPVGJVBFLFBKSQKBXHM|/"],
  "ipzz916": ["ed2k://|file|IPZZ-916.三澄寧々_LTX无水印.mp4|7504214815|194E88DEF885E82A34294C8C596DE9D0|/"],
  "ipzz918": ["ed2k://|file|www.98T.la@IPZZ-918_restored.mp4|6680060864|25781071095FE68CC221487D40D558A2|/"],
  "ipzz922": ["ed2k://|file|www.98T.la@IPZZ-922_restored.mp4|13566619514|761D8DD66CB76344DE87E50B682972FB|h=ZOLEU4EQL7KHDXXNZRBR4OO23XXN6XFN|/"],
  "ipzz932": ["ed2k://|file|www.98T.la@IPZZ-932_rfdetr-v6LTXpro.mp4|8438018254|0AA77FEF9BF7117E60AA236A0A23E3FA|/"],
  "ipzz934": ["ed2k://|file|WWW.98T.la@IPZZ-934_restored.mp4|10060648737|04a4071c286321d74b110302e8a2be40|/", "ed2k://|file|masex.tv@ipzz-934_restored.mp4|6510363064|431FA0A19CD394B874CBC942CBCD1E4B|h=ZPKAT4REXZRC2JD65MCYCCYUX4E3JCY5|/"],
  "ipzz942": ["ed2k://|file|www.98T.la@IPZZ-942_restored (2).mp4|7445260683|C18865BC2ABEAD9AAF4946CA829063BF|/"],
  "ipzz958": ["ed2k://|file|（内嵌字幕）IPZZ-958✈️ 【FANZA限定】高嶺のJcupボディ ひなの花音 中出し解禁大乱交 ノーカットSP 総勢16名20発オーバーの大ザーメン祭り！！！ 生写真3枚セット.mp4|7132515859|6478798C50A46451B229D0CCCD7197B4|/"],
  "ipzz961": ["ed2k://|file|www.98T.la@IPZZ-961_restored_ltx_wm.mp4|7526292032|B0F9F8235EFA10E37D1279F7448A13EB|/"],
  "ipzz962": ["ed2k://|file|www.98T.la@IPZZ-962_LTX.mp4|7234265624|F552E8F7EF0E41D5112959467143D6BA|/"],
  "ipzz973": ["ed2k://|file|www.98T.la@IPZZ-973_restored (2).mp4|7502023082|AB7FAC2276F753666EDEC54713045C17|/"],
  "ipzz991": ["ed2k://|file|www.98T.la@IPZZ-991.restored.mp4|9449542501|19F06D0BDB1205BCD655A98E5E5FDF3D|/"],
  "iqqq034": ["ed2k://|file|IQQQ-034【2022-07-28】（筱田优） 声が出せない絶頂授業で10倍濡れる人妻教師.mp4|4092188377|047D7F3D12E8CE1C7071599E782D0CC7|/"],
  "jac135": ["ed2k://|file|JAC-135 及川うみ_restored.mp4|4431415333|0371657AD49F00DCEDA5C649CB0EFBEB|/"],
  "jbd240": ["ed2k://|file|www.98T.la@JBD-240_restored_wm.mp4|7077913739|5C5191296C36B9FF33124C643623D80D|/"],
  "jnt076": ["ed2k://|file|JNT-076-LTX.mkv|4238592215|80C1E4CF457CB136D34038FB19C5000B|/", "ed2k://|file|JNT-076-LTX.mp4|4238027491|91D813274F1D230CC4D4EE3B5652EB86|/"],
  "juc397": ["ed2k://|file|www.98T.la@JUC-397 _restored_wm.mp4|7339430325|16C5F50E78C65E56279D2168B231E320|/"],
  "jufd171": ["ed2k://|file|www.98T.la@JUFD-171_restored-LTX.mp4|10841578869|3BC2D1C269B88489D4CF82BA79C30A10|/"],
  "jufd305": ["ed2k://|file|www.98T.la@JUFD-305_restored.mp4|12930139003|FE502ADE96C09122C949FDC1C87384CA|/"],
  "jufd311": ["ed2k://|file|www.98T.la@JUFD-311_restored-LTX.mp4|10608967468|0D15F16B9E4475CEFE110072CC4E6EB2|/"],
  "jufd388": ["ed2k://|file|www.98T.la@JUFD-388_restored-LTX.mp4|9380726589|F0C3E5D9736C98ABFF6E413DBF6C12CA|/"],
  "jufd542": ["ed2k://|file|www.98T.la@JUFD-542_U-LTX.mp4|10420728130|6A7373551368F9BBED6D9612A823B7B4|/"],
  "jufd634": ["ed2k://|file|JUFD-634【2016-09-01】(吉川あいみ)無毛全裸奴隷 被老公部下剃毛調教的爆乳妻 吉川愛美.mp4|4245473697|005B44D07DAD29A34B01B0627346E820|/"],
  "jufd670": ["ed2k://|file|www.98T.la@JUFD-670_restored_wm.mp4|9706380719|F7A821E4CA8000CDFBE5CB948AD4C777|/"],
  "jufd677": ["ed2k://|file|www.98T.la@JUFD-677_U-LTX.mp4|11083095195|AC73D8AF473103A9316C0EA45516F9D0|/"],
  "jufe047": ["ed2k://|file|[url]www.98T.la[/url]@ JUFE-047_restored_LTX_wm.mp4|8991240436|BD20B4D8046F157DBB16E349F319360C|/"],
  "jufe148": ["ed2k://|file|www.98t.la@JUFE-148_restored水印.mp4|8396071514|B39E2A0F39B584E230C6AEF4AFACA6F8|/"],
  "jufe512": ["ed2k://|file|hhd800.com@JUFE-512_LTX_restored_remuxed.mp4|5109680055|6CA008385C327E6B4E1D154C6F25BE3A|/"],
  "jufe537": ["ed2k://|file|jufe-537_LTX_restored_remuxed.mp4|3904565232|7430D019997C79E5F0B6400216F536AD|/"],
  "jufe588": ["ed2k://|file|www.98T.la@JUFE-588_re.mp4|6607524650|73A1C1929CC4F312ABEFB1D43C952FA8|/"],
  "jufe589": ["ed2k://|file|www.98T.la@JUFE-589_restored_ja_ltx.mp4|5124020029|58F7090819F51FC242494595AA2021B8|/"],
  "jufe613": ["ed2k://|file|www.98t.la@JUFE-613_restored.mp4|8070169597|2EF0CB7FDC14F7603D2A629B5A06950A|/"],
  "jufe622": ["ed2k://|file|www.98T.la@JUFE-622.restored.mp4|10669938543|A1245602CECC5C91BE1C93E80D9DC36E|/"],
  "jul185": ["ed2k://|file|www.98t.la@JUL-185_restored_wm.mp4|7185291364|E203AEDB7433026345017812A5F94F62|/"],
  "jul208": ["ed2k://|file|www.98T.la@JUL-208_restored-LTX.mp4|7336834729|D8FB2F4411249750EEC05433E21D85FE|/"],
  "jul359": ["ed2k://|file|www.98T.la@JUL-359_restored.mp4|7397632602|8E4F064F4448D2874172173294F9ADDB|/"],
  "jul388": ["ed2k://|file|www.98t.la@JUL-388_restored_wm.mp4|7280917897|0D742BB4B7E7B224581BE69D6A4DE488|/"],
  "jul631": ["ed2k://|file|www.98T.la@JUL-631_restored-LTX.mp4|11059133802|F2A539D8CE3CA7DFDD33A5C97F5AFC90|/"],
  "jul802": ["ed2k://|file|www.98T.la@jul-802_restored_ja_ltx.mp4|8442666644|E95A2E5E6DC88A18EACFAE3362EF7D78|/"],
  "jul894": ["ed2k://|file|JUL-894_restored.mp4|2821498951|CC2C9E6812431749AB79DF70A76B0C32|/"],
  "jul902": ["ed2k://|file|www.98T.la@JUL-902_000^WM.mp4|16478531791|0A8A63B272653F1C14BC1BE7046EABD1|/"],
  "jul947": ["ed2k://|file|jul-947-C_restored.mp4|7408076265|3C3B8089DEF51CCFBDF6B90DFD195B3B|/"],
  "juq014": ["ed2k://|file|www.98T.la@juq-014_restored_ja_ltx.mp4|5144712143|7E8B1C507BFC607151283EDA259920D0|/"],
  "juq030": ["ed2k://|file|www.98T.la@JUQ-030_restored-LTX.mp4|7462677939|A9A9994F043B4053346CF78A37D69672|/"],
  "juq048": ["ed2k://|file|www.98T.la@JUQ-048_restored.mp4|7191547871|3B4CCB260CC9962D587083C94E46D91F|/"],
  "juq071": ["ed2k://|file|www.98T.la@juq-071_restored_ja_ltx.mp4|4985717623|3398E06BEC40E45EFEA6D1846189A0D3|/"],
  "juq090": ["ed2k://|file|www.98T.la@JUQ-090_restored_LTX.mp4|7320809047|2C712F438AFE0650FCFFA4BA089ED334|/"],
  "juq162": ["ed2k://|file|WWW.98T.LA@JUQ-162_restored.mp4|7874385648|F2F0426CDAFEB2130B0000E1DF8E78F3|/"],
  "juq241": ["ed2k://|file|www.98T.la@JUQ-241_restored-LTX.mp4|7378390987|783AD49928C01917074E21245EC4CA16|/"],
  "juq250": ["ed2k://|file|JUQ-250【2023-05-19】（筱田优） 妻には口が裂けても言えません、義母さんを孕ませてしまったなんて…。-1泊2日の温泉旅行で、我を忘れて中出ししまくった僕。- 篠田ゆう.mp4|5829868644|B52FE97C54304027AC9221FC8E600599|/", "ed2k://|file|JUQ-250-LTX_音频修复版.mp4|5339111971|773BD3D35C6566B033BC59B387E9F6B5|/"],
  "juq321": ["ed2k://|file|www.98T.la@JUQ-321_restored_LTX.mp4|7351588123|7FA8190CE742E46C45304B5A81A593B8|/"],
  "juq357": ["ed2k://|file|www.98T.la@juq00357_restored.mp4|9316812592|C718E16C12E19CCF539EC4CE42E914CC|/"],
  "juq358": ["ed2k://|file|www.98T.la@sJUQ-358_LTX.mp4|8987534923|48EDCD0B5F9D8E91403C9BE9790BA4D9|/"],
  "juq372": ["ed2k://|file|www.98T.la@JUQ-372.restored.mp4|9402281878|BAFA0DBAA81B522F8AAA5724F0919CAA|/"],
  "juq378": ["ed2k://|file|WWW.98T.LA@JUQ-378_restored.mp4|7922914803|ED43DC900A5D98B9E938D6E542EE319C|/"],
  "juq402": ["ed2k://|file|www.98T.la@JUQ-402_restored_wm.mp4|7148362471|6E5E5CCF5DE0BF015A66A5ED3CC93EFB|/"],
  "juq407": ["ed2k://|file|www.98T.la@JUQ-407_LTX restored.mp4|7229464707|1929A375B7D26646324F3D5B8DE83479|/"],
  "juq426": ["ed2k://|file|www.98T.la@JUQ-426_restored_LTX.mp4|8308360707|199EC101DB0811B28BE56DF110672816|/"],
  "juq471": ["ed2k://|file|www.98T.la@juq-471_LTX.mp4|3642247687|93261978D7172B52040ADE6351761DD9|/"],
  "juq505": ["ed2k://|file|JUQ-505-LTX【2023-12-22】 （筱田优） 上司の妻は…無制限ナマ中出しOKのアナル丸見え神尻ソープ嬢 (1).mp4|3938457098|5FECE7932F4AAC768C8C43B265E811C9|/"],
  "juq532": ["ed2k://|file|www.98T.la@JUQ-532_restored-LTX.mp4|10896824966|0E8F415DC8C4A096C04A5BD5C1ECC89C|/"],
  "juq553": ["ed2k://|file|JUQ-553-外站搬运带作者水印.mp4|6787229278|0B49506B75C195E97EC52CC32C5F78AC|/"],
  "juq671": ["ed2k://|file|JUQ-671 充满气质的存·在·感！！希岛爱里专属再临——沉溺于甜言蜜语，我直到大学留级，都沉溺于与人妻的巢居性爱中….mp4|7848001933|953E39C736F329D5B6FAA79EDA83648C|/"],
  "juq679": ["ed2k://|file|JUQ-679 夫よりも義父を愛して…。 小花のん_restored.mp4|3727120670|736EB4CDB64027F2CACA229F2BD8C7D8|/"],
  "juq688": ["ed2k://|file|www.98T.la@JUQ-688_restored_wm.mp4|7109745724|8D389E91C04C81490FE56BB7784ED40C|/"],
  "juq714": ["ed2k://|file|www.98T.la@JUQ-714_LTX.mp4|4994814706|03309299AA245696359112A898F8F067|/"],
  "juq773": ["ed2k://|file|www.98T.la@JUQ-773_restored_wm.mp4|9044995314|EBBE0CB238EFD374FFBFEC19A7B1BDD6|/"],
  "juq775": ["ed2k://|file|www.98t.la@JUQ-775_restored.mp4|6600039063|02FD9E44F681DB5DE598B70AA48D40D7|/"],
  "juq958": ["ed2k://|file|JUQ-958 #在配对软件上遇到的人妻，1小时后变成了这样—。橘玛丽.mp4|10816685301|3F7F6EC7A86474AA8C2021D7184E0F96|/"],
  "jur020": ["ed2k://|file|www.98T.la@JUR-020_restored_wm.mp4|8335423229|A844DB2FAE419F952448911044BDB675|/"],
  "jur063": ["ed2k://|file|JUR-063_restored.mp4|8941886850|DD72FA6969FA41DF47726C3E3C221174|/"],
  "jur070": ["ed2k://|file|JUR-070_restored.mp4|3549382525|F1A64DE23C54ED976D2713B0C6D4ABFF|/"],
  "jur072": ["ed2k://|file|JUR-072-LTX.mp4|7103836817|38B3C44D47920214BF46B2B262A0D3B2|/"],
  "jur081": ["ed2k://|file|JUR-081_restored.mp4|2951834342|C216A3BBA21D105A3EE18C71FD96F08B|/"],
  "jur091": ["ed2k://|file|JUR-091_restored.mp4|8152479187|42B86DA3B957F340EA09CBC57C6738E7|/"],
  "jur213": ["ed2k://|file|www.98T.la@JUR-213_restored.mp4|8629515746|D7255328209AA8BE25F7CC576C991CC7|/"],
  "jur351": ["ed2k://|file|www.98T.la@JUR-351_restored_wm.mp4|11519840533|5E6EA9AB7EEEAB41FBB6ADDCB879D4CE|/"],
  "jur354": ["ed2k://|file|www.98T.la@JUR-354_restored-LTX.mp4|9893677271|DDE998197A012F03F84907CED4F858D1|/"],
  "jur408": ["ed2k://|file|JUR-408白石茉莉奈LTX.mp4|6668892678|C231D349EB87BADA1BA9E83206F18831|/"],
  "jur422": ["ed2k://|file|www.98T.la@JUR-422-60fps_restored_LTX.mp4|13514591796|070A0ABBA0CA60CDFDA390EB9C52CC8D|/"],
  "jur448": ["ed2k://|file|WWW.98T.LA@JUR-448_restored.mp4|8495706087|CEFFDDFE9B5DD872A454CF1D6ED6DD6C|/"],
  "jur466": ["ed2k://|file|www.98T.la@JUR-466-60fps_restored_LTX.mp4|11661478195|61B6FE1623877F2E064AD5160FD2161A|/"],
  "jur494": ["ed2k://|file|www.98T.la@JUR-494.restored.mp4|12210463496|73E294C6B9DE872A5BA596F727481331|/"],
  "jur615": ["ed2k://|file|www.98T.la@jur-615_restored_wm.mp4|6782581323|130045EA941304C6F23293E33FF432B6|/"],
  "jur659": ["ed2k://|file|WWW.98T.LA@JUR-659_restored.mp4|7368270823|1C076175CA29A8DFF2FE0492F60C4523|/"],
  "jur673": ["ed2k://|file|www.98T.la@JUR-673有水印版破解.mp4|10183528502|55816104BD48B0A15E38E7936104FC47|/"],
  "jur754": ["ed2k://|file|www.98T.la@JUR-754.restored.mp4|8690463676|7F3DF9D5F5F8C44C6A8EEA0CED767321|/"],
  "jur767": ["ed2k://|file|4K688.com@jur00767hhb_restored.mp4|5998801644|1EFB48D6DD90A8D44C956AE2798963B8|h=FRPEMT676XARH6UFZAMG5YO4QVQNFXYE|/"],
  "jur772": ["ed2k://|file|www.98T.la@JUR-772_restored-LTX.mp4|9025790944|9CA52A586EB3DE6C45E74DCAD447BCCD|/"],
  "jur787": ["ed2k://|file|www.98T.la@JUR-787.restored.mp4|8921160821|17237A2EECD691FC4D845AF2AE397278|/"],
  "jur791": ["ed2k://|file|JUR-791_restored.mp4|2273652714|5C21A4E01FA01196690742B972606267|/"],
  "jur822": ["ed2k://|file|JUR-822_restored.mp4|3198251394|C73B4BA38F590F86EA1AD883CFCFAE69|/"],
  "jur846": ["ed2k://|file|www.98T.la@JUR-846_restored_wm.mp4|7630546054|EC5DD66C28FBEDB3AB1C734CD1C821DE|/"],
  "jur857": ["ed2k://|file|JUR-857_restored.mp4|3821727070|E24F66A9A73D1A425B12BBA207D68C8B|/"],
  "jur889": ["ed2k://|file|www.98T.la@JUR-889_restored.mp4|6070502418|ADE21D6CC1C0634063554F27BEA8B1CC|/"],
  "jur890": ["ed2k://|file|www.98T.la@JUR-890 七海蒂娜 LTX_restored.mp4|7708397628|A3A0C10669347894F9C0E94217835241|/"],
  "jur897": ["ed2k://|file|www.98T.la@JUR-897_restored_wm.mp4|8752954688|3487E44676A6C1DEF0F40FC87C2A59A3|/"],
  "jux066": ["ed2k://|file|www.98T.la@JUX-066_restored.mp4|7232420766|B0597C6068346FD551B2F76D01633FED|/"],
  "jux298": ["ed2k://|file|www.98T.la@www.98T.la@JUX-298_restored_wm.mp4|7260712449|2A3398C7531DAAF1F2B01B5FFF88F400|/"],
  "jux888": ["ed2k://|file|www.98Tang.COM@JUX-888人妻母乳女上司 本庄優花.mp4|7284489402|8417638D70A6F9AC93888FF097002015|/"],
  "jux933": ["ed2k://|file|www.98T.la@JUX-933 (jux00933) [Madonna] 生本番中！！中出し美人アナウンサーCMの後は本物ザーメンをたっぷり膣内射精！！ 佐々木あき_restored (2).mp4|8248021879|35778639D11CBDF232ADB36AA3D35709|/"],
  "juy169": ["ed2k://|file|www.98T.la@JUY-169_restored_wm.mp4|8770839105|A8CB5DFCB3A13CDDF304716C9B1D74B8|/"],
  "juy618": ["ed2k://|file|JUY-618-LTX-破解-中文.mkv|4891806651|BA387A6052459DB5CA93A068ABD02D64|/"],
  "katu100": ["ed2k://|file|katu00100hhb_restored.mp4|6332928834|0A142106C713386F393FB8959CC8B37B|h=KUX6MFBZTGZE2TOYCJZVYJUSPIJHNXAY|/"],
  "katu118": ["ed2k://|file|katu00118hhb_restored.mp4|7204096959|210B6BC3FA6B16DBD519F90CD96D9978|h=547IXXIUKDXU33EOXA3DHB4ARCNT75KJ|/"],
  "kawd653": ["ed2k://|file|KAWD-653-C_restored-ltx.mp4|6984913365|8DD3CC4773263772E87D4076CC1B36C0|/", "ed2k://|file|KAWD-653-C_restored.mp4|6984913293|94B653E80E7D83856B1AA2B8251BDAD5|/"],
  "kawd659": ["ed2k://|file|KAWD-659-C_restored.mp4|6325917365|A01652608AC4A7BCCB12463E2DF5811F|/"],
  "kawd692": ["ed2k://|file|KAWD-692_restored.mp4|6704857132|C309ECE8D4E9B413BF24330E4268C7D2|/"],
  "kawd696": ["ed2k://|file|www.98T.la@KAWD-696_LTX.mp4|10568025973|5BC7331C633361E0D6A021126952C156|/"],
  "kawd722": ["ed2k://|file|www.98T.la@KAWD-722_restored_wm.mp4|7665009458|05FDD4551FED6A3F722A5E7754AD1DDB|h=HH5XRBHNU7BN2CLQ6CSA7LXFCWNR3R6B|/"],
  "kawd744": ["ed2k://|file|www.98T.la@KAWD-744_restored_LTX.mp4|7197718050|EE174712D5A21FF50C26121B7CC4BD49|/"],
  "kawd796": ["ed2k://|file|www.98T.la@KAWD-796-hack-LTX.mp4|4765540510|D6D68E6F9F4EFE552DEECBD436755FA4|/"],
  "kawd807": ["ed2k://|file|KAWD807.FHD_restored.mp4|7095637080|7B6C31C2000B591723F2714B7B919985|/"],
  "kawd863": ["ed2k://|file|www.98T.la@KAWD-863_LTX.mp4|8247650299|DE36A956723BF8E4A87F1A51711C632A|/"],
  "kawd913": ["ed2k://|file|www.98T.la@KAWD-913_restored_LTX.mp4|7372537203|D7A45D3E1430F98DA888CB71807FE3C5|/"],
  "kawd921": ["ed2k://|file|www.98T.la@KAWD-921_restored_wm.mp4|7277330942|76C1A03DC353E38125D69231EA3227D3|/"],
  "kbi019": ["ed2k://|file|【米倉穂香】KBI-019 - [有码][1080P]-U-LTX.mp4|6013363853|AA575D2F73C88ED9548E6D33B4FD4CD2|/"],
  "kbi022": ["ed2k://|file|【米倉穂香】KBI-022 - [有码][1080P]-U-LTX.mp4|4597477920|D72367980DE8E69F280571292CFD9E4E|/"],
  "kbi025": ["ed2k://|file|【米倉穂香】KBI-025 - [有码][1080P]-U-LTX.mp4|4474071502|533BC750258EFD081525A9C39F814742|/"],
  "kbi028": ["ed2k://|file|【米倉穂香】KBI-028 - [有码][1080P]-U-LTX.mp4|6665048201|A2AC04C0ADF0D1F833DBC2824B8F53CF|/"],
  "kbi089": ["ed2k://|file|KBI-089-LTX-破解-中文.mkv|7019993290|72C0C92B16FA2BF50287ED181559284E|/"],
  "kbr026": ["ed2k://|file|www.98t.la@KBR-026_restored_wm.mp4|10280985976|BC2F765A36007FCF70F50AD338430905|/"],
  "khip004": ["ed2k://|file|KHIP-004-LTX.mp4|19521312704|BC9B4F165F21DB3C5DF4B723F8A3A0B7|/"],
  "kire050": ["ed2k://|file|KIRE-050_LTX.mp4|6480556786|888E99AEEE53CAE5587525492CDB41CF|h=ML7HVKJ7UABGKRSOZ3HE5VJ5JQDFVSHJ|/"],
  "ktb043": ["ed2k://|file|KTB-043_restored.mp4|11519051065|B9956316F237EE8A005F63F3F29BB9EB|/"],
  "kv179": ["ed2k://|file|www.98T.la@KV-179_Jasna-LTX.mp4|10920468192|75CE46A21AC366474EC543E5B66D040F|/"],
  "kv189": ["ed2k://|file|kv-189-fhd_LTX.mp4|4770101629|390778D872A78784020806B882D19595|h=OEO5JXPK4ADHZ57VMEP5D5IS54QIWMAP|/"],
  "kv239": ["ed2k://|file|kv-239-fhd_LTX.mp4|7642901049|7DEF820FF84FB97A4410A58EAF97314D|h=GAU5RJ2ISYT5H5GFDK2PTV5NHDG6IXCE|/"],
  "kv309": ["ed2k://|file|www.98T.la@KV-309_restored.mp4|13056591655|E07E73F9B1E960B5654D7EB98170F6EA|h=6IAWEVFEK5M4TWDLFS6M5A4Z74A2C2UX|/"],
  "kvdd123": ["ed2k://|file|KVDD-123-LTX【2023-06-12】 （筱田优）受胁迫的接线员.mp4|12441495937|3BB1CEC55EB0A6EF0F0C900B79E2CE2E|/"],
  "kymi055": ["ed2k://|file|www.98T.la@KYMI-055 情色歌舞厅服装诱惑男人的淫语痴女-二阶堂丽_restored_wm.mp4|7331719009|B0B210294EDD97847184C3713C2DAC9E|/"],
  "kymi058": ["ed2k://|file|KYMI-058-LTX.mp4|8208295593|8AAFB8A9C44253E6428263A6C0CBF573|/"],
  "lulu212": ["ed2k://|file|www.98T.la@lulu-212_restored.mp4|10036106012|8EAA2B1934E5E44C51E8E3CF14B7DD23|/"],
  "lulu234": ["ed2k://|file|www.98T.la@LULU-234_restored_wm.mp4|9777856923|B355864F55AC4EDD5F32038BA71A839C|/"],
  "lulu249": ["ed2k://|file|www.98T.la@LULU-249_Jasna-LTX.mp4|11021328909|DB704FA0DF92E65C7CFEB388CD608929|/"],
  "luxu1456": ["ed2k://|file|LUXU-1456.水沢美心_LTX无水印.mp4|2782693443|D8D629ABF3DD6B004A85A8E4E1417777|/"],
  "luxu963": ["ed2k://|file|www.98T.la@LUXU-963_restored.mp4|4378168386|A9EBDD4593C8CDF49850D90089C5D003|/", "ed2k://|file|LUXU-963-LTX-无水印珍藏版.mp4|4141275094|E710420E8613D2CAD1FE7E400700327C|/"],
  "lzdq006": ["ed2k://|file|www.98T.la@LZDQ-006_restored_wm.mp4|10490982133|FE072851AD0EAB1D2310913E3CDA9367|/"],
  "maan1051": ["ed2k://|file|MAAN-1051-LTX.mp4|4164389519|58F520C8E4B1AE593B47C0B618F845A9|/"],
  "madv642": ["ed2k://|file|MADV-642_restored.mp4|9123081434|CCA9D50B01517AC00BCA50F9C397C93C|/"],
  "mbrk012": ["ed2k://|file|www.98T.la@MBRK-012✈️_restored.mp4|7413251577|11D9AA98471CDE11EBD93ECC207CA77B|/"],
  "mdg166": ["ed2k://|file|www.98T.la@ MDG-166_restored_LTX_wm.mp4|3660856622|B5B498C4A670E451B2B5A96025D1CA86|/"],
  "mdhr001": ["ed2k://|file|www.98T.la@MDHR-001_PJ-LTX.mp4|9726358819|E958B02224BBA77232B9F8C0A4FBFA18|/"],
  "mdon040": ["ed2k://|file|www.98T.la@MDON-040_restored_wm.mp4|4236428335|DC30953A720C1DD5B0E81FB5A87CAA19|/"],
  "mdon065": ["ed2k://|file|www.98T.la@mdon-065_restored_wm.mp4|5375569050|8CC5794FAFB3D3A7195C4E5F3006730B|/"],
  "mek008": ["ed2k://|file|www.98T.la@ MEK-008_restored_LTX_wm.mp4|7442200697|8807465EF6DF844F901CFC0FE378F697|/"],
  "meyd226": ["ed2k://|file|www.98T.la@MEYD-226_restored_LTX.mp4|7156830343|0509583F43B7A94AC463F50EFF524A29|/"],
  "meyd263": ["ed2k://|file|MEYD-263-LTX-破解-中文.mkv|3408696450|A676E092E7C14407E62501499CDFF851|/"],
  "meyd280": ["ed2k://|file|www.98T.la@MEYD-280.restored.mp4|6992234188|E6539B05D4BEE3D1480C36FB6A31435C|/"],
  "meyd286": ["ed2k://|file|www.98T.la@MEYD-286-LTX.mp4|8983323967|736FA4B54F040D4B774210751ABC6303|/"],
  "meyd325": ["ed2k://|file|www.98T.la@MEYD-325_restored_wm.mp4|7200488385|C38810DF5CE471C61CCAB70217A9FB76|/"],
  "meyd367": ["ed2k://|file|MEYD-367 本番なしのマットヘルスに行って出てきたのは隣家の高慢な美人妻。弱みを握った僕は本番も中出しも強要！店外でも言いなりの性奴隷にした 希島あいり.mkv|4574931724|5FF73B1B30E8A683B0FC387028688CE5|/"],
  "meyd568": ["ed2k://|file|www.98T.la@meyd-568_restored.mp4|5019696376|07BB8A3A56DF8806838FFB0FF097EA44|/"],
  "meyd605": ["ed2k://|file|www.98T.la@MEYD-605_restored_wm.mp4|7265460479|953CC27241DF9E9289A6D4A901FA9874|/"],
  "meyd664": ["ed2k://|file|www.98t.la@MEYD-664_restored.mp4|6546540569|18B5602ED829EF84DE8C411212FCB01D|/"],
  "meyd698": ["ed2k://|file|www.98T.la@MEYD-698 伊藤舞雪_restored.mp4|7346378010|0541ED44066FF3FAF8BD0958B04A2EA7|/"],
  "meyd830": ["ed2k://|file|MEYD-830-LTX【2023-08-15】（佐山爱）結婚10年、妻とはじめてのカップル喫茶…。 ～愛を再確認した夫婦の人生最高に気持ちいい中出しSEX～ 佐山愛 (1).mp4|3965620078|AEAD3AFD18C7B9A13397C9609E013445|/"],
  "meyd831": ["ed2k://|file|www.98T.la@MEYD-831✈️_restored_LTX.mp4|7400906091|23730EEF0B01339AFA6871DBC123FE67|/"],
  "meyd836": ["ed2k://|file|MEYD-836-LTX【2023-09-19】（佐山爱）空き家に住み着いた絶倫男とのベロキスSEXにドハマりする人妻 佐山愛 (1).mp4|4831859967|0EDA358F27287362A6EAE6F345740C80|/"],
  "meyd844": ["ed2k://|file|www.98T.la@MEYD-844_restored-LTX.mp4|7250991099|303603DF56D115D5F0312380F3D09B89|/"],
  "meyd880": ["ed2k://|file|MEYD-880宫西光LTX.mp4|10365946012|4EB2463DE4339074241CBD82C41B7E83|/"],
  "meyd951": ["ed2k://|file|www.98t.la@meyd-951.mp4|7621227360|8481F8BBC19D14100968E2251B0000E3|/"],
  "meyd998": ["ed2k://|file|www.98T.la@MEYD-998_restored-LTX.mp4|8953856563|C9AD3084C0E650D95DED5D56935333D8|/"],
  "mfyd090": ["ed2k://|file|www.98T.la@MFYD-090_restored_ltx_wm.mp4|9185369495|5FB5E2537CFDF983CFE621B7CD5C32A8|/"],
  "mfyd196": ["ed2k://|file|www.98T.la@MFYD-196_restored_wm.mp4|8636769482|CF1FF8CC902BFA9EB8201A0283D12563|/"],
  "mfyd203": ["ed2k://|file|www.98T.la@MFYD-203_restored_wm.mp4|8244617700|556CD66F7B3C27380B5F37A97AC163F5|/"],
  "mgsmpl001": ["ed2k://|file|www.98T.la@ MGSMPL-001_restored_LTX_wm.mp4|3623062085|22FDDBEC1EF3464194500D30735EEC1A|/"],
  "miaa005": ["ed2k://|file|MIAA-005-U W痴女チ○ポとアナルしゃぶり舐めハーレム追撃ジュボレロ連射！！ 佐々木あき 波多野結衣_restored.mp4|6418373757|E329C41215079D5937FC67F5097B65CB|/", "ed2k://|file|www.98T.la@miaa-005_restored_ltx_wm.mp4|7338629376|012FB5F3A8EF25A988E5EFA459C31FD9|/"],
  "miaa369": ["ed2k://|file|www.98T.la@MIAA-369_restored-LTX.mp4|7292087613|CCFF4F4A4A69A12ED6308C5281239EF7|/"],
  "miaa395": ["ed2k://|file|www.98T.la@MIAA-395_restored_wm.mp4|7324460089|472FD505C86932A5ED17469C9168CAD3|/"],
  "miaa454": ["ed2k://|file|miaa-454-LTX.mp4|7702813184|C5340C2733B949CA798138B6CDEF686D|/"],
  "miaa525": ["ed2k://|file|MIAA-525LTX.mp4|3917710370|73FDCE084EB89DB92AD93396BF27FE99|/", "ed2k://|file|MIAA-525_restored-LTX.mp4|6347512515|6B9500DE7F22B8747B5C9C03C0B4A9EA|h=IWP5EOTLS5NTSSJ3UGYJEB5DMPJMYIGR|/"],
  "miaa548": ["ed2k://|file|www.98T.la@MIAA-548_Jasna-LTX.mp4|8303123012|8C0566B3B0B896B07604122D6FDB8616|/"],
  "miaa715": ["ed2k://|file|MIAA-715-LTX.mkv|5217477761|85866FC3CE7148A0F574C2E2ACA5FF8F|/"],
  "miaa794": ["ed2k://|file|www.98T.la@MIAA-794_restored_LTX.mp4|9576986074|3074BD321CFFA85DE3B27D474CE59A34|/"],
  "miaa797": ["ed2k://|file|www.98T.la@MIAA-797_LTX.mp4|7279593772|9617BBF1C14BCB318104D5AF88C45C86|/"],
  "miaa968": ["ed2k://|file|www.98T.la@MIAA-968_restored_LTX.mp4|7870155948|7568D391FF008D65AB4B26A19142D7DE|/"],
  "miab043": ["ed2k://|file|www.98T.la MIAB-043_restored.mp4|9546765174|8246830C813EDC26FF89371FC15F4A4D|/"],
  "miab072": ["ed2k://|file|www.98T.la@ MIAB-072 飛（ト）べるようになった美人CAのご当地肉棒中出し29発トリップ フライト後の湿ったパンスト脚腰ガクブルキメセク交尾 森日向子_restored_wm.mp4|7390886431|F4ED498C92A78B684C8174060AC79EB9|/"],
  "miab086": ["ed2k://|file|MIAB-086-LTX.mp4|10080534573|D741C625910B12797FAA687450961B67|/"],
  "miab142": ["ed2k://|file|www.98T.la@MIAB-142_restored.mp4|7018852722|455918CB0D8D0BD7E07D680DDA8C9807|/"],
  "miab146": ["ed2k://|file|MIAB-146-LTX-破解-中文.mkv|5143969370|C8145A0B222C18442AB7C6C423EDB9E7|/"],
  "miab173": ["ed2k://|file|www.98T.la@MIAB-173_restored_wm.mp4|7508411639|6E490FFFE1D9D46BD86C2662B3A54348|/"],
  "miab187": ["ed2k://|file|www.98T.la@MIAB-187_restored_LTX.mp4|9888925047|8C49366B4F2D3F5386F4149BE7F7EF44|/"],
  "miab201": ["ed2k://|file|www.98T.la@MIAB-201.restored.mp4|9586371716|BF97C09C76F31E58FE9F224A2D080E0F|/"],
  "miab221": ["ed2k://|file|www.98T.la@MIAB-221_restored_wm.mp4|8358337647|86B236D0A83C9E25E20E27FA24E593E4|/"],
  "miab259": ["ed2k://|file|www.98T.la@MIAB-259_restored-LTX.mp4|7378890454|E2713B1A6DBC5C0D39ACE341715F2C88|/"],
  "miab317": ["ed2k://|file|www.98T.la@MIAB-317_restored_LTX.mp4|8018902443|CAE02545A32CA23B869F0841F5AE81AB|/"],
  "miab360": ["ed2k://|file|www.98T.la@MIAB-360_LTX restored.mp4|6904874946|EAE33D4757F288D815BB14A9B230D570|/"],
  "miab418": ["ed2k://|file|www.98T.la@MIAB-418_LTX restored.mp4|7490761548|F9D1D715E9A3A92110908401705EC97E|/"],
  "miab462": ["ed2k://|file|www.98T.la@MIAB-462_restored.mp4|9566026284|35AF6D3B4CC13AF74D85907B8C915D4E|/"],
  "miab473": ["ed2k://|file|www.98t.la@MIAB-473_restored_wm.mp4|8581083248|C7951FD45D864EE4D374B031836CB8A5|/"],
  "miab488": ["ed2k://|file|www.98T.la@MIAB-488_LTX restored.mp4|6214493666|92CAB1350C45E2207C9390B27A247975|/"],
  "miab678": ["ed2k://|file|MIAB-678_ltx.mp4|8456815713|F055E7902D55BFC2DB5E6D332B89E81E|/"],
  "miab679": ["ed2k://|file|www.98T.la@MIAB-679_restored.mp4|8621214875|D80CFF087841E804795AFFFE7F160600|/"],
  "miad527": ["ed2k://|file|www.98T.la@[LTX]MIAD-527_restored（有水印）.mp4|7533325478|9D724FC82E85098E57911D2485C629DD|/"],
  "miad632": ["ed2k://|file|www.98T.la@MIAD-632-hack-LTX.mp4|4830856845|607B5466F1DF6798F633D604E11DF86E|/"],
  "miad657": ["ed2k://|file|www.98T.la@MIAD-657_Jasna-LTX.mp4|8250366637|B7655ECEE184F78F214C90AD1013A0FC|/"],
  "miad681": ["ed2k://|file|www.98T.la@[LTX]MIAD-681_restored（新水印）.mp4|7448030999|6DC8FBC99EDF62631E3B635A542092D2|/"],
  "miad690": ["ed2k://|file|www.98T.la@[LTX]MIAD-690_restored（有水印）.mp4|5945794029|3B2546B880B23ACAEA0D10A73D05B202|/"],
  "miae071": ["ed2k://|file|www.98T.la@miae-0071_restored.mp4|7464147050|1DAB812B502749C5EB436CFE5F1463A3|/"],
  "miae122": ["ed2k://|file|www.98T.la@MIAE-122 (miae00122) [MOODYZ] 欲求不満の佐々木あきが、終日ホテルの1室に男を呼び出し即キス・即フェラ、即生ハメ、アナル中出し＆10連続射精！ 子宮と直腸の快楽に目覚め、汗、潮、精液、マン汁を垂らしながら四六時中狂ったように性交し続 佐々木あき(2)_restored.mp4|6487754578|A02A18E19DDD353999CDC8C1B7FDAD12|/"],
  "miae329": ["ed2k://|file|MIAE-329-LTX-破解-中文.mkv|7351333238|25E8E517DFF53B618B404DEF5FA7F2C1|/"],
  "miae353": ["ed2k://|file|miae-353.mp4|4783018149|82338CE926CFF003C82190B9E2AEC9E3|/"],
  "mida008": ["ed2k://|file|www.98T.la@MIDA-008_restored_wm.mp4|8323537107|759ECDC7B994067514C79B6EB61824FD|/"],
  "mida024": ["ed2k://|file|www.98T.la@MIDA-024-U-LTX-搬运司马.mp4|9408899656|B4E67203A69855F27F7B12FB60790890|h=CTRZ4XUADSNZMUMVXRUMFWVBE2UZ54PG|/"],
  "mida037": ["ed2k://|file|www.98T.la@MIDA-037-LTX.mp4|7181209695|9CCF966DDA1E43905CE8FB17C7468466|/"],
  "mida039": ["ed2k://|file|www.98T.la@mida-039_rfdertr-v6LTXmax.mp4|24479461197|0413748E00F9BB854EF9636617BDA732|/"],
  "mida040": ["ed2k://|file|www.98T.la@MIDA-040 新有菜 LTX_restored.mp4|7733219392|897038645A9720928290D3FED55C2690|/"],
  "mida079": ["ed2k://|file|www.98T.la@MIDA-079_restored_LTX.mp4|7344275505|70516C9AFC58A680DCAED2E31531BA72|/"],
  "mida101": ["ed2k://|file|www.98T.la@MIDA-101  要试着练习一下做爱吗虽然是早泄体质.青梅竹马的澪还是愿意帮助我-石川澪_restored_wm.mp4|9539094017|58B8F46450A3AF71D97845013E4E7A11|/"],
  "mida117": ["ed2k://|file|www.98T.la@MIDA-117.restored.mp4|9003866889|E1C71C48AF1F0D9A243828A080748FCC|/"],
  "mida139": ["ed2k://|file|MIDA-139_restored.mp4|7880426204|B6C9BDC4C9FC958CF9834F1DA2B5E64B|/"],
  "mida154": ["ed2k://|file|www.98T.la@MIDA-154_restored_LTX.mp4|7317308171|E3E8454E03E4E0AE560591E5FAE6D76C|/"],
  "mida176": ["ed2k://|file|www.98T.la@MIDA-176_restored_wm.mp4|7607690517|5E9E16B4B2CC303CC0E8E16F2EDB21C5|/"],
  "mida192": ["ed2k://|file|www.98T.la@MIDA-192_restored_LTX.mp4|7349245861|669920166D36701EA70515778627A01A|/"],
  "mida200": ["ed2k://|file|www.98T.la@MIDA-200_restored_LTX.mp4|7175353556|53BFA95DF9081944C8DE16C79D1F2063|/"],
  "mida234": ["ed2k://|file|www.98T.la@MIDA-234新有菜LTX_restored.mp4|7411155359|1DCD69C1D2C89F0224821526BADE532C|/"],
  "mida240": ["ed2k://|file|www.98T.la@www.98T.la@MIDA-240_restored_wm.mp4|8653248770|100348CA020FF898A02FC49AF1B08EF2|/"],
  "mida241": ["ed2k://|file|MIDA-241-LTX.mp4|10391434808|FE41345866110E71DA3220F7059D51F0|/"],
  "mida319": ["ed2k://|file|www.98T.la@ MIDA-319 男を悩殺する長身美脚ハイレグ競泳水着の誘惑。商品開発部ありな部長の食い込み卑猥Vラインの挑発に乗せられて…着衣のまま生挿入！！中出しFUCK 新ありな_restored_wm.mp4|7703396548|9B66E1036CA22AC10D0060CFA960108B|/"],
  "mida356": ["ed2k://|file|www.98T.la@MIDA-356_restored_wm.mp4|7252617538|919E5E50B90C3FA3DA56EB698F92F39C|/"],
  "mida361": ["ed2k://|file|www.98T.la@MIDA-361 校花学妹的性爱中出-新有菜_restored_wm.mp4|10164190159|98862F789B7A4178F56889B45E821E85|/"],
  "mida385": ["ed2k://|file|MIDA-385-ltx.mp4|7102495286|288A776488A83FB03CAB890B54D782FB|/"],
  "mida387": ["ed2k://|file|www.98T.la@MIDA-387-U-LTX.mp4|6925899603|D422BC2D50984CB440FF9BF6106F32BE|h=HRZEPXHVXUNTRBDL67HICAK62EM6NHSK|/"],
  "mida440": ["ed2k://|file|MIDA-440_-ltx-AV1.mp4|2201588769|B2B3E4CDBDB4EEAF180F81D938FEF6C0|/"],
  "mida457": ["ed2k://|file|www.98T.la@MIDA-457_restored_wm.mp4|7266972678|E8EA6807FF81167FD3C6DC49957A5BCE|/"],
  "mida458": ["ed2k://|file|mida00458_4K60fps_ltx.mp4|20311956610|2742E8C08086EF347C85DFA2847CDC42|/"],
  "mida459": ["ed2k://|file|www.98T.la@MIDA-459_restored.mp4|7429161678|2C0C140F827733DEC3109437F12CD172|/", "ed2k://|file|mida00459_4K60fps_restored.mp4|19323478811|886A6F373705ACBB9AB783AD4A042C3D|/"],
  "mida517": ["ed2k://|file|www.98T.la@MIDA-517_restored_wm.mp4|7349993645|7A5457A6901F93E372DBAB9DDF01D5D8|/"],
  "mida533": ["ed2k://|file|www.98T.la@MIDA-533-U-LTX.mp4|7954630454|DEC6720AD2732B95ED4C77137EC4C01F|h=5XH4LEBIIMOPJ57CBWGQGH663N7QJNP5|/"],
  "mida574": ["ed2k://|file|www.98T.la@MIDA-574.restored.mp4|9338970176|96CF461E84BA71E701F6F79FD67C8400|/"],
  "mida590": ["ed2k://|file|hhd800.com@mida00590hhb_60fps_restored.mp4|5842523184|038436EA18F78D94CE96551E17E7B260|/"],
  "mida636": ["ed2k://|file|www.98T.la@MIDA-636 白丝护士舔精用舌头疯狂扫荡的实习护士-泉ももか_restored_wm.mp4|6801713149|44E0AB950CB12C4BD8157810A2FEACE9|/"],
  "mida649": ["ed2k://|file|www.98T.la@MIDA-649_restored_wm.mp4|9271173275|BE74DABECB85E4EFEB9AC7200DE290B6|/"],
  "mida683": ["ed2k://|file|www.98T.la@MIDA-683_restored_wm.mp4|9275836777|8090999C8E9977F31254CD4430FD84DC|/"],
  "mida686": ["ed2k://|file|MIDA-686_LTX_restored.mp4|3452005703|B43595AF95556DA48C416C48E5B2B685|/"],
  "mida726": ["ed2k://|file|www.98T.la@MIDA-726-U-LTX-搬运司马.mp4|8293124561|200BD6C549AE8A778DA1C34E49FDE2A9|h=7NHOBYQ5RFKKMBXS46GNGISEREK4HKWP|/"],
  "mida732": ["ed2k://|file|www.98T.la@MIDA-732_restored_wm.mp4|10100613903|7C29CF9BC22547124BF5B661B18F3055|/"],
  "mida762": ["ed2k://|file|hhd800.com@MIDA-762_restored_LTX2.mp4|4719371596|B7981DF2F86E68C543BCB2A8B75853B3|/", "ed2k://|file|www.98T.la@MIDA-762 巨型阴茎活塞高潮.第一次无限阴道扩张快感-石川澪_restored_wm.mp4|6575858501|BFFD676DC809A4F6A01431398CEAF627|/"],
  "mida783": ["ed2k://|file|www.98T.la@MIDA-783_restored_.mp4|9085940079|9627D90DE71457094DB5DC08927E165B|/"],
  "mida812": ["ed2k://|file|4K688.com@mida00812hhbLTX_restored.mp4|5944279881|574B3A1D934F8DC1598AD2DF7B79567F|h=F5LEWUFU5WF5YDQGCSOKZU3GGNGIGFBW|/"],
  "mida822": ["ed2k://|file|MIDA-822-U.mp4|4094674923|6A092CB19563378D8D5ABFC976B4BCE1|/"],
  "mida823": ["ed2k://|file|MIDA-823_0.11.3_LTX.mp4|9738553493|8E8B4E929839DD94AD2EC0896EE2A7B3|/"],
  "mida824": ["ed2k://|file|MIDA-824-U.mp4|3363392223|EC5939C2D3373ADD621849BFD80970DA|/"],
  "mida829": ["ed2k://|file|489155.com@MIDA-829_restored.mp4|7674579802|2D52233519F73495AECF57AF2AD9C5F4|/"],
  "mida837": ["ed2k://|file|www.98T.la@MIDA-837-U-LTX.mp4|7418417758|4214FE4E5B36D9B6AE4D7B6B9059FB58|h=57CVJC63KAZVVUR6SESYOK5D7K7CG24L|/"],
  "mida849": ["ed2k://|file|www.98T.la@MIDA-849_restored_wm.mp4|9382326094|40227BC2CBEEC0D424A9EFAA7B7FED30|/", "ed2k://|file|MIDA-849-LTX-破解-中文.mkv|6430636304|ED32782CA1850D82CD9E96838F6310C1|/"],
  "midd271": ["ed2k://|file|あいだゆあ.Yua.Aida.[MIDD-271].超絶品ボディ_restored.mp4|1652295718|6fb82b515bd59758c9946251e242bf53|/"],
  "midd652": ["ed2k://|file|MIDD-652-1080p_restored.LTX.mp4|8210415111|EDDC800C3C996237013C129E11A361CB|/"],
  "midd767": ["ed2k://|file|www.98T.la@MIDD-767-hack-LTX.mp4|4762827030|DF0E1B4EE438BCCB0C5240CAFF15855E|/"],
  "midd775": ["ed2k://|file|www.98T.la@MIDD-775[MOODYZ]突然発情セックス西野翔_restored.mp4|7070648794|39F54490687264FD1AA50896455B22E4|/"],
  "midd791": ["ed2k://|file|www.98T.la@MIDD-791_restored.mp4|10500500912|169ceb31131f41a03e71cb5ad44e6351|/"],
  "midd867": ["ed2k://|file|MIDD-867-_-ltx-AV1.mp4|2305838575|6E138DE51C56572B85E8DAD7F8B4FB61|/"],
  "midd972": ["ed2k://|file|www.98T.la@ MIDD-972_restored.LTX_wm.mp4|10360893984|BBF23976DE1C31E0CF525E521E204B02|/"],
  "mide007": ["ed2k://|file|www.98T.la@MIDE-007_restored.mp4|13395425535|876F1AA32D688E16CA6E607309B706DE|/"],
  "mide020": ["ed2k://|file|www.98T.la@ MIDE-020 タイトスカート女教師 大橋未久_restored_wm.mp4|7285310800|E9AA77A8B8628B8CFF3E4EDB5EB6292E|/"],
  "mide128": ["ed2k://|file|www.98T.la@MIDE-128_Jasna-LTX.mp4|8179405783|D0BED0EAE0EC14843153E09E607E931E|/"],
  "mide151": ["ed2k://|file|MIDE-151-R.mp4|5040852278|C3BF1FF1DADC10D39C6168FC4BDC5930|/"],
  "mide233": ["ed2k://|file|MIDE-233-R.mp4|6641026875|DBE472C2A3147440A8EC9273325AA1B4|/"],
  "mide301": ["ed2k://|file|www.98T.la@MIDE-301_restored_ja_ltx.mp4|6516610826|C6C603AD285240032B3C705F35400EEA|/"],
  "mide307": ["ed2k://|file|www.98T.la@mide307_restored.mp4|8754846010|BA2E92C0F1F9719532448EED72DF6DF2|h=SHBW3R4QRRYL6HPCA34FISIUEHMO57A3|/"],
  "mide369": ["ed2k://|file|MIDE-369_LTX.mp4|6322872561|010a6b8291433771db5a69eba034fe9e|/"],
  "mide442": ["ed2k://|file|MIDE-442-1080p_restored-TXL.mp4|3029443532|923795BBA6E0738BCA5BA633D62574B5|h=VWYIFICVMLAKVVZJEWUKIROI3B3TKON7|/"],
  "mide592": ["ed2k://|file|www.98T.la@mide-592_restored (1).mp4|10706327836|6024196DFA2A1ABFFD25C84D964453A4|/"],
  "mide594": ["ed2k://|file|MIDE-594-restored.mp4|8042333113|DF3089FE4B48588D9FD3C0578470EC02|/"],
  "mide619": ["ed2k://|file|www.98T.la@mide-619_restored_wm.mp4|9125206518|CF9DBECF188C5FDF9443E13DA8E2446C|/"],
  "mide636": ["ed2k://|file|www.98T.la@mide-636_restored_wm.mp4|14502981597|F9E09A610CE4716B7AA3F98914D70443|/"],
  "mide642": ["ed2k://|file|MIDE-642-LTX.mp4|7013133953|5C5FF108F137AC9944154BCD140A2D61|/"],
  "mide725": ["ed2k://|file|www.98T.la@mide-725_restored_wm.mp4|7308983395|603737F7DF2C7D10550E7A02B35A5FD0|/"],
  "mide730": ["ed2k://|file|www.98T.la@mide-730_restored_wm.mp4|8936554126|ADB170DEE0BB70AA6EE19FF336EF4464|/"],
  "mide735": ["ed2k://|file|www.98T.la@MIDE-735_restored_wm.mp4|5506543366|6F2518E11E281591C59E3D140CD2C38B|h=WNMRJYJKH37RAIDK4CDVZY43FMJRQE6J|/"],
  "mide736": ["ed2k://|file|www.98T.la@MIDE-736_restored_LTX.mp4|9198900805|7C9834E520F008825C085AEF8D92CB2A|/"],
  "mide767": ["ed2k://|file|www.98T.la@MIDE-767_restored.mp4|9306892841|F9ABBFBA263A2D77034FB7EA0DB40A87|h=YE4362MM4ZAOTUM6ZF3KZUMCMPOX7IDT|/"],
  "mide776": ["ed2k://|file|www.98T.la@MIDE-776 _restored-水印.mp4|8886400055|73BBE009D63249A3256EDFE2DD669747|/"],
  "mide777": ["ed2k://|file|www.98T.la@mide-777.mp4|6514214978|BAE78F031F3B8C09AE9E4BFCE34AE26A|/"],
  "mide779": ["ed2k://|file|www.98T.la@mide-779_restored_wm.mp4|7332476471|02EE32E63A6CFDB6C465879DE89C7795|h=GFH3PQEVJ7L4WPZSCI6SDUJ2WKHXFMGS|/"],
  "mide837": ["ed2k://|file|www.98T.la@MIDE-837_restored_LTX.mp4|7409806243|0564CCF345FBA0F3807309360ABC7895|/"],
  "mide875": ["ed2k://|file|www.98T.la@MIDE-875_restored_LTX.mp4|9089828810|4D0F6337402125CBAFDDADC7C55C22F7|/"],
  "mide890": ["ed2k://|file|LTX@MIDE-890_藍芽みずき.mp4|4597520362|dfe4e9b9b30d7c72f6e135270fba407a|/"],
  "mide906": ["ed2k://|file|www.98T.la@MIDE-906-ltx.mp4|7640863281|58B0099EF23609EA652EC1CA3F2A28A1|/"],
  "mide934": ["ed2k://|file|www.98T.la@MIDE-934_Jasna-LTX.mp4|8099583624|48453FC5F825F70D1E314B64402EC002|/"],
  "mide949": ["ed2k://|file|www.98T.la@MIDE-949_restoredm.mp4|8546423542|F21CA7A47E978C1C2AD97374848C50E9|/"],
  "midv036": ["ed2k://|file|www.98T.la@midv-036-LTX.mp4|10591465440|37C9A572224F1318CBD526D333578BFE|/", "ed2k://|file|midv-036-LTX__%E6%97%A0%E6%B0%B4%E5%8D%B0%E5%8E%9F%E7%89%88%E5%8B%BF%E5%88%A0.mp4|6187880700|C8D57F0E9DCE4ED605674ED509ACC87F|/"],
  "midv039": ["ed2k://|file|MIDV-039_restored_ltx.mp4|4047234031|70E4635DA3EABF4B5E4A390FA8BFE140|/"],
  "midv040": ["ed2k://|file|www.98T.la@MIDV-040.mp4|9788122926|2A31FFC4C0C0D0373085D245C06D12F9|/"],
  "midv077": ["ed2k://|file|www.98T.la@MIDV-077_restored_LTX.mp4|8907712867|9BC4BB4424E8F81965E944C5B309E66D|/"],
  "midv087": ["ed2k://|file|www.98T.la@midv-087_restored_wm.mp4|8851062724|E3F7962ABAFFC7761E2093DA2D1E07AB|/"],
  "midv114": ["ed2k://|file|www.98T.la@MIDV-114_restored.mp4|6485467353|A5C7404CB278A9175345BE07B62786C7|/"],
  "midv186": ["ed2k://|file|www.98T.la@MIDV-186-U.mp4|5672579560|AAF5883EE05E602B7B2BDE616690A66E|h=ZFKF5E5OPGSTZA2Y6ROS3P5M3TLTGYC5|/"],
  "midv229": ["ed2k://|file|www.98T.la@MIDV-229_restored.mp4|20884827719|6a8609d104303642c41263ccc9709ca1|/"],
  "midv234": ["ed2k://|file|www.98T.la@MIDV-234 新有菜 LTX_restored.mp4|9273297610|A7690B71080035D4ACB41C48BC3488D8|/"],
  "midv236": ["ed2k://|file|www.98T.la@midv-236-LTX.mp4|7850197531|CFA3E9E2CFFEEA7F4D908CDB598A7B33|/"],
  "midv248": ["ed2k://|file|www.98T.la@MIDV-248_restored_LTX.mp4|10562300081|523F30BCA7FDFE1CE7F9B891863E33A6|/"],
  "midv250": ["ed2k://|file|midv-250_restored.mp4|5025809079|18AD13BF5B6137502A8140E6332D203B|/"],
  "midv252": ["ed2k://|file|www.98T.la@MIDV-252 新有菜 LTX_restored.mp4|9370620226|2539F516DD30FDB5225BADC9C2C99106|/"],
  "midv267": ["ed2k://|file|www.98T.la@MIDV-267_restored_LTX.mp4|9142102147|819B3DAC2EEBAB2D4153EEB5372458D4|/"],
  "midv296": ["ed2k://|file|midv-296_-ltx-AV1.mkv|2634348669|54E66218C05E4DB11F1A3CDF0C3A21DD|/"],
  "midv354": ["ed2k://|file|www.98T.la@MIDV-354_restored_LTX.mp4|7403178391|4FAF5026896F7D44841950986A6D86E0|/"],
  "midv383": ["ed2k://|file|www.98T.la@MIDV-383 新有菜 LTX_restored.mp4|9936800901|5E851E95722EA48A8724F5EF8AFB4888|/"],
  "midv400": ["ed2k://|file|www.98T.la@midv-400_restored.mp4|17500818363|8F125CD4C5D4715AE4726EEFE4B3CBAD|/", "ed2k://|file|MIDV-400 三上悠亜×MOODYZ 一回限りの限定復活！？ひとりバコバコバスツアー2023 引退直前！最後の大感謝スペシャル！！.三上悠亚.4k.x265.无码破解-LTX.mp4|11806030413|8FC88120FDED91D832D802861499B0CA|/"],
  "midv432": ["ed2k://|file|www.98T.la@MIDV-432_restored_LTX.mp4|7448709597|EF9F5F10BE7626DA6972EAEB44287DC1|/"],
  "midv433": ["ed2k://|file|www.98T.la@MIDV-433_restored_LTX.mp4|9539710033|E2F0E9390D8A277C4F9BE58C83086333|/"],
  "midv464": ["ed2k://|file|www.98t.la@MIDV-464(蓝光Remux)_restored.mp4|24572423597|64a0fb4d5e376ce0fe56951a7c3445c9|/"],
  "midv472": ["ed2k://|file|www.98T.la@MIDV-472 新有菜 LTX_restored.mp4|7462308923|35C858766A0E8E6CE6B75C2594AEA49E|/"],
  "midv488": ["ed2k://|file|www.98T.la@MIDV-488-U-LTX.mp4|6370430416|3E2441EE24B858E83453DE3E67944174|h=I7EAQ6EB7QQPUGAB7UKLLJI2EXZKPOUU|/"],
  "midv502": ["ed2k://|file|www.98T.la@MIDV-502✈️ 新有菜 LTX_restored.mp4|9137122220|D0C0C6FAFA9B5CC234BCD400467625C7|/"],
  "midv506": ["ed2k://|file|www.98T.la@MIDV-506_restored_LTX.mp4|7819361270|1A3A2BE0BA75257BF32E46FC4A132F26|/"],
  "midv530": ["ed2k://|file|www.98T.la@MIDV-530_restored_LTX.mp4|8865981052|C99CAE52C3BE23E9B5697A69DD047728|/"],
  "midv592": ["ed2k://|file|www.98T.la@MIDV-592.restored.mp4|7328329453|8D75A0054390712539743E49D149D308|/"],
  "midv611": ["ed2k://|file|www.98T.la@MIDV-611_restored_LTX.mp4|7048752475|A35F447702356E19E7445F8501F6DB0E|/"],
  "midv623": ["ed2k://|file|WWW.98T.LA@MIDV-623_restored.mp4|9398063258|EBB25ADCA589568747ED9776F1F3053F|/"],
  "midv639": ["ed2k://|file|www.98T.la@MIDV-639-U-LTX.mp4|9167883309|4BCD07CC9FD392B21407CCA541FF4ADA|h=DWXDQ7U62ELBJL5Z7XMVOAWZQJVCTMZF|/"],
  "midv640": ["ed2k://|file|www.98T.la@MIDV-640_restored_LTX.mp4|7567850926|E190AC042D6CD65955051063539D8651|/"],
  "midv653": ["ed2k://|file|www.98T.la@midv-653_restored.mp4|9145404613|45F6AB27F0BABF9C998532BCE10CED9E|/"],
  "midv682": ["ed2k://|file|MIDV-682-LTX.mp4|7386161618|92F3F82F0C98A30338C42C3BCD45CFE1|/"],
  "midv751": ["ed2k://|file|www.98T.la@MIDV-751 新有菜 LTX_restored.mp4|7464168929|81AED85A579C43DD5A25C715ED2335A6|/"],
  "midv770": ["ed2k://|file|www.98T.la@MIDV-770-U-LTX.mp4|8646772634|DE3C05668730EC8ECA12D5D26DC43C33|h=H7MHYJIURQ3UX7ILCZNIJ6CAX3NGIIDO|/"],
  "midv786": ["ed2k://|file|www.98T.la@MIDV-786_restored.mp4|8327622577|FCCCB90E3803ABB10E68766511420D0C|/"],
  "midv818": ["ed2k://|file|WWW.98T.LA@MIDV-818_restored.mp4|9329449967|80345CC28308A2931086AE0472776763|/"],
  "midv850": ["ed2k://|file|www.98T.la@MIDV-850 新有菜 LTX_restored.mp4|10234798332|8EF7B328033DCC3CDA6C92E7F00BDAC0|/"],
  "midv872": ["ed2k://|file|www.98T.la@MIDV-872-U-LTX.mp4|7582430534|5FF0FDF3C74A147EB16E39C058B990AB|h=TOFFJN3UO3OWJFLDIXSX5H6JXUX4PDXK|/"],
  "midv887": ["ed2k://|file|www.98T.la@midv-887_restore.mp4|5631195028|7516B02FCE20E9CFB3E82F75CBB00F02|/"],
  "midv890": ["ed2k://|file|www.98t.la@MIDV-890(蓝光Remux)_restored.mp4|23699082739|319509ee1d6a8eac6c91fdf98214335c|/"],
  "midv908": ["ed2k://|file|www.98T.la@MIDV-908-U-LTX-.mp4|7883869429|147CBD98C96F819F4D27CAFE7E3AE4F4|h=HBQVET7IDEL6OOINHZ3SZ4RLOD7GAQDC|/"],
  "midv959": ["ed2k://|file| www.98T.la@MIDV-959新youcaiLTX_restored.mp4|9192262291|DBD52340F2DED8CA640D66F34FA16293|/"],
  "midv999": ["ed2k://|file|www.98T.la@MIDV-999 新有菜 LXT_restored.mp4|8452063324|BFAFE4B37B63883EAF1CE02EE273A595|/"],
  "mifd062": ["ed2k://|file|www.98T.la@MIFD-062 _restored.mp4|12007610253|688AA333BD85395F7827F337E3B99620|/"],
  "mifd235": ["ed2k://|file|hhd800.com@MIFD-235_restored.mp4|5609964608|7B842F7599B3788B77C9623134BB21C7|/"],
  "mifd252": ["ed2k://|file|www.98t.la@MIFD-252小鸟游萌-restored.mp4|10473166214|BC7315739E56483963443DCF83FFE82F|/"],
  "migd545": ["ed2k://|file|www.98T.la@MIGD-545✈️-U-LTX.mp4|6017325705|5891A224D19892E59F3A4CF60C208962|h=ZJOQVZBEPVY67A6WH7GRUBJXFDJQK5NN|/"],
  "migd584": ["ed2k://|file|www.98T.la@MIGD-584✈️_restored_wm.mp4|9308893058|BE834A1F54D65C7FFF9AB49DF726A7A9|/"],
  "migd691": ["ed2k://|file|www.98T.la@MIGD-691-U-LTX.mp4|5987837236|1EC20875A0E6173E95DF156D111D9F5D|h=IMYTQ2F7MOVF7AMHMOWVEFRKVRM4ADV4|/"],
  "migd719": ["ed2k://|file|www.98T.la@MIGD-719-U-LTX.mp4|7514200290|9EDE770C2BF641329413A3B080E3C012|h=6I7DHYRY6ZGVK24X5I3RPNFYQ57NWMFC|/"],
  "migd724": ["ed2k://|file|www.98T.la@MIGD-724_restored_wm.mp4|7285262345|145A4FA9C192CFA59AD5CAAAD1731BAB|/"],
  "mihd002": ["ed2k://|file|MIHD-002_0.11.3_LTX.mp4|4866568570|DCF2A0945C90CDD1A9DBA94D026D611E|/"],
  "mikr023": ["ed2k://|file|www.98T.la@MIKR-023✈️_restored-LTX.mp4|7373571456|D70EB6CA92128C0F4A7671BF829D91E7|/"],
  "mikr031": ["ed2k://|file|MIKR-031-LTX.mp4|7308375606|7BC10B28F208314CE68A6767C4761DF1|/"],
  "mikr074": ["ed2k://|file|www.98T.la@MIKR-074_restored.mp4|9884562405|E3541F56CA65A35193389DB710EA8FED|/"],
  "mikr076": ["ed2k://|file|www.98t.la@MIKR-076_restored.mp4|6956518625|47E7AA251EC609BAE4A5EE86FADFF2CA|/"],
  "mikr082": ["ed2k://|file|www.98T.la@MIKR-082.restored.mp4|7682227936|490720AEB4B4DB610A00CAF0D7F29F78|/"],
  "mikr089": ["ed2k://|file|www.98T.la@MIKR-089_restored_wm.mp4|7335335952|A43000B8E67D058B6CED258269071F69|/"],
  "mikr096": ["ed2k://|file|www.98T.la@MIKR-096_LTX.mp4|6460180436|832201ECAF5D19B33DF1A8CFA42F359E|/"],
  "mikr103": ["ed2k://|file|www.98T.la@MIKR-103_restored_wm.mp4|10495463395|46EB0C41D29275EE0D4A39532150926E|/"],
  "mikr109": ["ed2k://|file|www.98T.la@MIKR-109「先生が上手いSEX教えてアゲル」SEXに失敗したボクに5日間のHowtoSEXで中イキ＆中出し出来るまでレクチャーしてくれた美人家庭教師森日向子_restored_wm.mp4|7789341340|23A151AE4B4C3F83976E58F1C6C3B995|/"],
  "mikr122": ["ed2k://|file|www.98T.la@MIKR-122_restored_wm.mp4|10579667166|7F006C0E2F01FEB89F3CD2AED0956B28|/"],
  "mimk020": ["ed2k://|file|MIMK-020-LTX【2014-08-01】(あかぎ碧・沖田杏梨)母姉W相姦 木下和津實 沖田杏梨.mp4|5853936865|52D89C0A3AF06CF819667ECA8448A29F|/"],
  "mimk056": ["ed2k://|file|www.98T.la@MIMK-056_restored.mp4|7195722962|86188C41C9344EE93E8B83433917F9F5|/"],
  "mimk082": ["ed2k://|file|www.98T.la@MIMK-082_restored_wm.mp4|7146490566|E098F7E3539A7AB55F484EEC0381BB03|/"],
  "mimk093": ["ed2k://|file|MIMK-093-LTX.mp4|3038019637|FBB43D0351DD2A2DD03403ECFE61DEC4|/"],
  "mimk105": ["ed2k://|file|MIMK-105-LTX_restored_remuxed.mp4|4431295935|EA139663D6D6A92E62FA87CA6F209C2B|/"],
  "mimk138": ["ed2k://|file|www.98t.la@MIMK-138_restored.mp4|6430890207|C0FBBA6EDB4231F0A4403742009AD5AF|/"],
  "mimk217": ["ed2k://|file|WWW.98T.LA@MIMK-217_restored.mp4|7417620864|4B1B594071C21FABA4EAE6257AF7C444|/"],
  "mimk288": ["ed2k://|file|MIMK-288_0.11.3_LTX.mp4|5825645277|712D68AD8FF25D85270CEEC618D0B7DF|/"],
  "mird071": ["ed2k://|file|MIRD-071-U-C.mp4|16733596605|82cf52d8df86a16ebce612753bf834b1|/"],
  "mird081": ["ed2k://|file|www.98T.la@mird-081-LTX.mp4|9800967828|D74EA702AA387BD5ED246222856316FB|h=UJG7CNAV4674GOXJAM3FFAHZ5M7V7QLN|/"],
  "mird152": ["ed2k://|file|www.98T.la@MIRD-152_Jasna-LTX.mp4|11046501924|2E67B132FEDDC8AADFEB116957B19BA2|/"],
  "mism150": ["ed2k://|file|www.98T.la@MISM-150_restored (2).mp4|9141184216|70B5703459B081D86BD3614D4EFE871D|/"],
  "mism160": ["ed2k://|file|MISM-160-破解.mp4|3665466823|A8F0552CEB4703422CA5B6333E761BB0|/"],
  "mism305": ["ed2k://|file|www.98T.la@MISM-305_LTX.mp4|8452178012|D4D9C80A464FDD873C68ACE4C89EA930|/"],
  "mium1415": ["ed2k://|file|www.98T.la@MIUM-1415_jasna-0.11.3_ltx_wm.mp4|4173231485|336B0BF86F0175B65FDC6937FD0AC356|/"],
  "mmkz162": ["ed2k://|file|MMKZ-162_LTX.mp4|6692123645|6B175E85D9D06FF4A05265524DAC87E8|/"],
  "mngs015": ["ed2k://|file|MNGS-015-UC.mp4|3429225910|43EC1646E06BCEBB4ED4D361CD86A3DD|/"],
  "mngs060": ["ed2k://|file|www.98T.la@MNGS-060_restored_wm.mp4|10914545168|ECB7AB2D2255E1B81512F467249A3A82|/"],
  "mngs067": ["ed2k://|file|MNGS-067_LTX.mp4|8450524750|1af0b6fa8bb090fafcea130b891c5a4d|/"],
  "mngs070": ["ed2k://|file|www.98T.la@MNGS-070_水印.mp4|6024416066|8FE80FF1B5573A4A5D75D181FC3A696C|/"],
  "mngs072": ["ed2k://|file|www.98T.la@MNGS-072_水印.mp4|5810341261|2AC7D7100503718D6B21C3E936C44F1D|/"],
  "mngs083": ["ed2k://|file|www.98T.la@MNGS-083_restored_wm.mp4|7288589918|876BF17315BFEB2B551DD99B7F566F5C|/"],
  "mnse012": ["ed2k://|file|MNSE-012-LTX.mp4|1732579819|116BDC87A23ED2912E26FE388A141A30|/"],
  "moc036": ["ed2k://|file|MOC-036-破解.mp4|4787882963|6F67961DA8D13F4DE67E3BDE2C70F940|/"],
  "mrec013": ["ed2k://|file|www.98T.la@MREC-013_restored_wm.mp4|4022858203|227F157112CB78E854CC96F6EA95D018|/"],
  "mtall061": ["ed2k://|file|www.98T.la%40MTALL-061_Jasna0.11.1-LTX.mp4|7912775998|4004025801C17A6216E91FD8FF65BE17|/"],
  "mudr278": ["ed2k://|file|MUDR-278枫与铃_LTX.mp4|5051140878|4256E4A5269B7C13280D7F273DE12D71|/"],
  "mvsd316": ["ed2k://|file|www.98T.la@mvsd-316_restored.mp4|10275487413|8F3013A5B50B5F7C2553A5D748B243D5|/"],
  "mvsd338": ["ed2k://|file|MVSD-338-破解-1080P.mp4|6967786054|3ef674d2ae5d272421eefdde4090bb86|/"],
  "mvsd416": ["ed2k://|file|www.98T.la@MVSD416.mp4|8989950882|5D2812C4EA495D8A20C22923FC71ACE8|/"],
  "mvsd696": ["ed2k://|file|www.98T.la@MVSD-696_水印版.mp4|6091553619|5B72A06001ECEC66132D2F3D363205A9|/"],
  "mxbd022": ["ed2k://|file|MXBD-022 萩原舞 the BEST 萩原舞_LTX-restored.mp4|9467181968|AC0D3FABBAA4DEEEF841951F20C02B19|/"],
  "myba099": ["ed2k://|file|www.98T.la@MYBA-099【持野蓬】_restored.mp4|7639560593|DCB7F9180B241E160352E4745246D861|/"],
  "myfans01": ["ed2k://|file|www.98T.la@www.98t.la@[myfans] ユニハロ帰りにコスプレ着衣お泊まり[マイファンズ]_jasna-ltx_wm.mp4|3992200382|21FE982BD14154C39122D8951EF7E02B|/"],
  "namh001": ["ed2k://|file|www.98T.la@NAMH-001_restored.LTX.mp4|7568806604|3CA20CA5F1D6153A6A3894FE3D73F6BE|/"],
  "namh007": ["ed2k://|file|NAMH-007_restored(1).mp4|8026348695|721C3E878E06A9A6F08C6F694E26B723|/"],
  "namh028": ["ed2k://|file|www.98T.la@NAMH-028_Jasna-LTX.mp4|6926969548|AFCBA89FDDC521775FBD9BC388E53167|/"],
  "namh051": ["ed2k://|file|www.98T.la@NAMH-051_Jasna-LTX.mp4|7952963484|FACC24A5E2C98FDA8D3CA566EECB1DE6|/"],
  "namh052": ["ed2k://|file|www.98T.la@NAMH-052_Jasna-LTX.mp4|7405737403|5272346AF41D6EF499803ED74C4B5261|/"],
  "namh060": ["ed2k://|file|www.98T.la@NAMH-060_LTX.mp4|3425629934|C8B6327F26700A2FF7EF4C19716D8BFC|/"],
  "namh076": ["ed2k://|file|NAMH-076-UC.mp4|5612583308|2812624736F01CA27D8840CC48FDC8A3|h=62GNGGINBERAHNPNRBVCD6H2354CADH4|/", "ed2k://|file|www.98T.la@NAMH-076_Jasna-LTX.mp4|8420225245|E1363FDB7D40015C223383018573F9B5|/"],
  "namhvr005": ["ed2k://|file|NAMHVR-005_LTX.mp4|11407230350|7BEB30F3FE77F1DF0434F27E86CCA48E|/"],
  "namhvr006": ["ed2k://|file|NAMHVR-006_LTX.mp4|9828906584|1CE1FAD85BDF549B1F0DCF0EBCBA9D13|/"],
  "ngod128": ["ed2k://|file|NGOD-128-LTX【2020-06-07】(吉根ゆりあ)OB訪問NTR 吉根柚莉愛.mp4|3359151826|A169FCF6E5B8E54A038FC0E39B8502B9|/"],
  "ngod243": ["ed2k://|file|www.98T.la@NGOD-243.restored.mp4|7659691255|FD0BBC3C86AAE8455AC560AC50C40801|/"],
  "nhdta569": ["ed2k://|file|www.98T.la@NHDTA-569_restored水印.mp4|9677570809|EA5A6716BD00D9DE1F05C327C255886E|/"],
  "nhdta687": ["ed2k://|file|NHDTA-687(1nhdta00687)[NATURALHIGH]仕事中に痴●されても拒み続けるバスガイドは性感帯がバレた瞬間に我を失い本気汁を垂らし感じまくる_LTX.mp4|7278701349|0F423AD7AD1B41CE64AD92869AA6626A|/"],
  "nhdtb213": ["ed2k://|file|nhdtb-213_LTX.mp4|7004257866|396B855A6DFFD6CC1A7AE5297D421B9C|/"],
  "nhdtb506": ["ed2k://|file|www.98T.la@NHDTB-506_水印.mp4|9478375716|F5D5A504E6854C721BD5B5026E89AE00|/"],
  "nhdtb760": ["ed2k://|file|www998Tla@nhdtb-760_res水印.mp4|6808731392|1E9E8F395D7716448FCB11E9F63A603D|/"],
  "nhdtc074": ["ed2k://|file|www.98T.la@NHDTC-074_水印.mp4|6595991042|FAA6E6A18201F2059AF2F58FA08CFA7A|/"],
  "nhdtc257": ["ed2k://|file|NHDTC-257_U.mp4|8858598813|AD87580FF757E0409A7E23CDD8FC0AE5|h=HABCEBAHCU2BBWRAOQPABH3BSYU6LIUA|/"],
  "nitr139": ["ed2k://|file|NITR-139_restored.mp4|6985696915|5617C21C763D8BD6F24228747355E618|/"],
  "nitr541": ["ed2k://|file|www.98T.la@NITR-541_restored_wm.mp4|7741065156|60CE785188B3533397982AA200054BF5|/"],
  "nmsl001": ["ed2k://|file|NMSL-001_ltx restored.mp4|4972630689|79A55E3CC2BF0BFBDBEFDFE9DB8317C8|/"],
  "nmsl022": ["ed2k://|file|www.98T.la@NMSL-022_restored_LTX.mp4|10989454263|7B2A14E2698EA88A818CE57D13B8F85C|/"],
  "nmsl030": ["ed2k://|file|www.98t.la@NMSL-030_restored_wm.mp4|7836694820|E7437E04A0E2804D8B88301969FA9B67|/"],
  "nmsl031": ["ed2k://|file|NMSL-031_restored.mp4|8800262268|6C193B5E7154F5BE0365BA7C235B7EC7|h=LXWN5IEF3BWTOIQNAEDJORVBMAX5QIDE|/"],
  "nnpj318": ["ed2k://|file|www.98T.la@NNPJ-318✈️ _restored.mp4|11581252026|35414F8D956DA9EEAFC1D21E505F4B8F|/"],
  "noskn082": ["ed2k://|file|NOSKN-082_LTX restored.mp4|3841551516|388135BF7D6B76213A9C4B7156B03BD0|/"],
  "noskn095": ["ed2k://|file|NOSKN-095_LTX restored.mp4|3650323757|2A92743B81CB2692AEA6A0E17F351DA2|/"],
  "nsfs064": ["ed2k://|file|hhd800.com@NSFS-064_restored.mp4|4802740636|42B4EBE4375D3096107E0CE5E2B7CC65|/"],
  "nsfs160": ["ed2k://|file|www.98T.la@NSFS-160_restored.mp4|5453708846|900B832EDF351C43D2DEF04068F05BB4|/"],
  "nsfs361": ["ed2k://|file|www.98T.la@NSFS-361_restored.mp4|5484261268|F4B131BF3A787574C4688AFA7D8252DA|/"],
  "nsfs449": ["ed2k://|file|www.98T.la@NSFS-449_restored_wm.mp4|7448017808|5142BD859395E5E6626EE72F482825AC|/"],
  "nsfs453": ["ed2k://|file|www.98T.la@NSFS-453_restored_wm.mp4|7268615088|5D448D082C28487A52AC029DC8AFD60F|/", "ed2k://|file|NSFS-453-U 元女優の妻 ～親族たちにまわされてしまったあの日～ 後編 紗々原ゆり.srt|60404|1D1228C2875D45A9D4639111FAE47EEC|/"],
  "ofje041": ["ed2k://|file|www.98T.la@OFJE-041_LTX.mp4|15502404608|51D984D1741E006FEA191B00447B85AA|/"],
  "oksn188": ["ed2k://|file|OKSN-188【2014-03-01】(青山菜々)對著母親色色的勃起乳頭在意著… 青山菜菜_iris2 (2).mp4|3067308314|1F10B1957ACF25D657AEAEC133B7E23F|/"],
  "oned730": ["ed2k://|file|ONED-730-破解 ギリギリモザイク おっきいチンポでバコバコ！ 蒼井そら.mp4|2825144160|266256B128DECCBAB6D0B84C8CD45F7B|/"],
  "pfes012": ["ed2k://|file|www.98T.la@PFES-012_restored.mp4|7378584354|B0430A430395C7B0C26DD9AE2CECB905|/"],
  "pfes065": ["ed2k://|file|www.98T.la@PFES-00065_rfdetr-v6LTX.mp4|8054168856|140801F97A890DDEFDA76FB8AFECAE2E|/"],
  "pfes076": ["ed2k://|file|www.98T.la@PFES-076_LTX restored.mp4|5628503993|715362E0D3A436149A20FB8FE749F1F2|/"],
  "pfes107": ["ed2k://|file|www.98T.la@PFES-107_restored_LTX.mp4|10336269632|B2B714516B97EB0A2AB66833897F62F9|/"],
  "pft004": ["ed2k://|file|PFT-004_LTX.mp4|4156356503|2D1AD276B22F844202AC3F5A25F6FE80|/"],
  "pgd476": ["ed2k://|file|www.98T.la@ PGD-476_restored_LTX_wm.mp4|10480402027|0E97119273B0AD663285C557E347F93A|/"],
  "pgd526": ["ed2k://|file|www.98T.la@PGD-526_restored.mp4|6518065961|D3ABB23185E5CE41EA71388D784FD2B5|/"],
  "pgd599": ["ed2k://|file|pgd-599_restored-LTX.mp4|16420498535|FEE60DB5A3D8C5E35A998C6A389D6ECC|h=XTTWIW7PAWACWNMB7RGQTUZFCBT3BVDV|/"],
  "pgd655": ["ed2k://|file|www.98T.la@pgd-655_restored水印.mp4|4800100682|DCC3C8528B13E5EB6DAB0E9998077427|/"],
  "pgd661": ["ed2k://|file|www.98T.la@PGD-661_restoreded2水印.mp4|4844929265|74535DE2F99AD0D42C047AC60BBFC814|/"],
  "pgd671": ["ed2k://|file|www.98T.la@pgd-671_restored水印.mp4|5955552283|55B956E3A5601C6C2C055A0A4EE81B62|/"],
  "pgd736": ["ed2k://|file|www.98T.la@PGD-736_restored-LTX.mp4|7325410457|71089866347C55F3434E1EE4C01CD5D0|/", "ed2k://|file|PGD-736-LTX-无水印珍藏版.mp4|5157624043|348E199AFB5FBD5245F2AFE2D8DE30FB|/"],
  "pgd766": ["ed2k://|file|www.98T.la@PGD-766_restored-LTX.mp4|7293660161|518C708EFADF99ABFB63EF7BBC49D81D|/"],
  "pgd775": ["ed2k://|file|www.98T.la@PGD-775-U-LTX.mp4|8931232216|8C162D21862C330702DD54DF1E4FECE8|h=HDRZ33SHBLWXPXRSOR4SFN57QIAJ6COL|/"],
  "pgd864": ["ed2k://|file|www.98T.la@PGD-864_restored_LTX.mp4|10745207372|2320345709210EEA5BC128F248DA6D15|/"],
  "pppd111": ["ed2k://|file|PPPD-111【 2010-10-19】（青山菜々）对不起，我的胸部太大了.mp4|3582613331|4CAD20213423C9B443660CFBA1EDD4C0|/"],
  "pppd288": ["ed2k://|file|www.98t.la@PPPD-288 巨乳女教師の誘惑 沖田杏梨_LTX.mp4|8949726647|8A0E11D91201DC1D9A57D8DF73425245|/"],
  "pppd451": ["ed2k://|file|www.98T.la@PPPD-451_restored.mp4|6995459427|496e1e9cb68f1581b01192fa1c906ec8|/"],
  "pppd481": ["ed2k://|file|www.98T.la@PPPD-481_restored.mp4|8667362314|4D56257AB5E8C5059875BB368A9AB0FA|/"],
  "pppe150": ["ed2k://|file|www.98T.la@PPPE-150_restored_LTX.mp4|11477367279|AEB24124DF5A4CF6248F6A143CCD9BC9|/"],
  "pppe435": ["ed2k://|file|www.98T.la@PPPE-435_水印.mp4|6095786192|272591C7B9C3D6D3C8E45D1C919BEEB5|/"],
  "pppe447": ["ed2k://|file|www.98T.la@PPPE-447_restored_wm.mp4|7835265880|9F901CA7E57D53C9D3AD4E0AD9E6B115|/"],
  "pppe449": ["ed2k://|file|www.98T.la@PPPE-449-U.mp4|5509566386|9E56E5AEBD965D810CD7BE8BA856E27D|h=WIMJ4JUIOWQ4TQ6CGMWVGXXXYDCFE4QI|/"],
  "pppe455": ["ed2k://|file|www.98T.la@※PPPE-455_restored.mp4|8008701094|5B0E76247078CE2A9FD3C93C2E637C1D|/"],
  "pred099": ["ed2k://|file|www.98T.la@ PRED-099✈️ 誘惑いじわる大好き！美尻スゴすぎ逢花先生 山岸逢花_restored_wm.mp4|9032337214|754BF9C117217466271C3D9C8897AD17|/"],
  "pred110": ["ed2k://|file|www.98T.la@pred-110_restored.mp4|9294141158|FB59AF51E2A2CE621B6CC2E1F5D146F2|/"],
  "pred137": ["ed2k://|file|www.98T.la@[LTX]PRED-137_restored v2（有水印）.mp4|5983600110|2FE3A6BC7A32070EE286226C9B878486|/"],
  "pred140": ["ed2k://|file|WWW.98T.LA@-PRED-140_JASNA.mp4|6465781613|76D75F1996319940FC173D190AA263DD|/"],
  "pred193": ["ed2k://|file|www.98T.la@PRED-193-LTX.mp4|9057993574|2CD119ADFF40AD68F7EDDD2B70C8DADD|/"],
  "pred198": ["ed2k://|file|www.98T.la@PRED-198_restored-LTX.mp4|7460901586|04C2B9443547D91731D7DF0A65797871|/"],
  "pred233": ["ed2k://|file|www.98T.la@PRED-233-LTX_wm.mp4|7211734361|842D61B709A5C0052F3DFA44776BD9DE|/"],
  "pred277": ["ed2k://|file|www.98T.la@pred277_restored.mp4|5246143846|8690E33C402A47DEFA7AAA48B87B3C12|/"],
  "pred305": ["ed2k://|file|WWW.98T.LA@-pred-305_JASNA~.mp4|13355749347|98DC2EA0D4C8BE14FCDD18FAC1E7B6AF|/"],
  "pred365": ["ed2k://|file|pred-365-C_ltx_restored.mp4|5837655525|DA8445FD99FE7363D44E4656C8015F7E|/"],
  "pred468": ["ed2k://|file|www.98T.la@PRED-468 倦怠期 重回激情 楪カレン_restored.mp4|5374290645|7DD849AA374A7F189F3D3CF65E34C9CB|/"],
  "pred483": ["ed2k://|file|www.98T.la@PRED-483_restored_wm.mp4|7186862116|202A2D7937093A9A03F22EDD1C459537|/"],
  "pred539": ["ed2k://|file|www.98T.la@pred-539.restored_wm.mp4|10844463941|28AD583664452C3D93E0B92D2116472A|/"],
  "pred557": ["ed2k://|file|www.98T.la@PRED-557_restored.mp4|5523265052|26BF3D3F9B0732344FD278534F2BF710|/"],
  "pred672": ["ed2k://|file|www.98T.la@PRED-672_restored_wm.mp4|7535778958|598EC7EEBA8362B06ECBC7432675DD5A|/"],
  "pred690": ["ed2k://|file|WWW.98T.LA@pred-690_PJ-LTX.mp4|7036705027|36102174EE4827D21DE8883737AA6219|/"],
  "pred715": ["ed2k://|file|www.98T.la@PRED-715_restored_LTX.mp4|9181349830|D938A17E88EEEFAA3B9F2536A65A581C|/"],
  "pred731": ["ed2k://|file|www.98T.la@PRED-731_restored_LTX.mp4|10750605999|10B350C1685E15C7A9029164E588EF73|/"],
  "pred732": ["ed2k://|file|www.98T.la@www.98T.la@PRED-732_restored_wm.mp4|7395600277|179FB0F6A03751DD23DD1153B245D079|/"],
  "pred733": ["ed2k://|file|www.98T.la@PRED-733-LTX.mp4|10296637030|16A5ECEE50501D5ADD7E58DE003910B5|/"],
  "pred743": ["ed2k://|file|www.98T.la@PRED-743_restored.mp4|8068868936|EE5BAE6198C1C4CD28B0D54D0E013A9B|/"],
  "pred757": ["ed2k://|file|www.98T.la@PRED-757_restored_LTX.mp4|7295298334|3E521841C0C1105E81F2E8EFBCE9743E|/"],
  "pred768": ["ed2k://|file|www.98T.la@ PRED-768 脚フェチデリヘルを呼んだらムカつく女上司が！？いつも俺を叱ってる美脚をベロ舐めまわして完全服従中出し！ 白峰ミウ_restored_wm.mp4|7387810996|A974CE42F7E76E070617DEAB13809BAE|/"],
  "pred772": ["ed2k://|file|www.98T.la@PRED-772_restored-LTX.mp4|10854171474|76A6CE282AD8A86B6F067677F769A0C2|/"],
  "pred785": ["ed2k://|file|www.98T.la@PRED-785_restored.mp4|7557706909|680751491F9CA354DF4E713387B5ADAB|/"],
  "pred787": ["ed2k://|file|www.98T.la@PRED-787_restored_wm.mp4|7201678650|1E55BD783639FEAE6ED7D516F7372A75|/"],
  "pred797": ["ed2k://|file|www.98T.la@PRED-797-LTX.mp4|5581526829|9F9FEAB59E47FCB72429B2E6709EEA88|/"],
  "pred886": ["ed2k://|file|www.98T.la@PRED-886_restored_wm.mp4|9121216177|94C7EEE84120214A3B98232712DFE18C|/"],
  "pred900": ["ed2k://|file|www.98T.la@PRED-900_restored.mp4|5770531687|3C99A2DD02AC79C88A9843F4F2331AAC|/"],
  "prtd029": ["ed2k://|file|www.98T.la@PRTD-029_restored_ja_ltx.mp4|5202033522|AD910A697C05AC0D7915396A9767A5EB|/"],
  "prwf010": ["ed2k://|file|www.98T.la@PRWF-010_restored_wm.mp4|11534923467|F9920129482A8AE7D4A2DBCD09B5E917|/"],
  "prwf011": ["ed2k://|file|www.98T.la@PRWF-011_restored_wm.mp4|9203439519|2D5FFB039FCF2C066342DA5816341F63|/"],
  "prwf012": ["ed2k://|file|www.98T.la@PRWF-012_restored.mp4|11393762382|fc9c08525aff7a7c4ce65a746e45f47a|/"],
  "prwf014": ["ed2k://|file|www.98Tla@PRWF-014_restored_wm.mp4|8329847601|D61909C08DF2D3149D7DAAFBE5E5DD17|/"],
  "prwf017": ["ed2k://|file|www.98T.la@PRWF-017_restored.mp4|10386185950|fda5ff6df60eadadc551a96922d64fc4|/"],
  "rbd240": ["ed2k://|file|RBD-240【 2011-02-07】（青山菜々）老公，請原諒我。邪惡戀情- 青山菜菜.mp4|3444212253|BE670CF5593D19FDA27187FE6935C0FF|/"],
  "rbd772": ["ed2k://|file|www.98T.la@RBD-772_restored-LTX.mp4|7304273112|E9BD851C86049E75FF8E34C12B92BD32|/"],
  "rbd776": ["ed2k://|file|www.98T.la@RBD-776_restored_wm.mp4|7311211387|009860E133908C48B54781BF99B12226|/"],
  "rbd805": ["ed2k://|file|www.98T.la@RBD-805_restored_wm.mp4|12144520067|BB7E3A4F7D6BDDFA84F0323DD2DC1B10|/"],
  "rbd826": ["ed2k://|file|www.98T.la@RBD-826_restored-LTX.mp4|8487663430|64E576DAF130AAEFFA83CB9003BFAB56|/"],
  "rbd867": ["ed2k://|file|www.98T.la@RBD-867_restored_wm.mp4|6573569891|EFBFEA148EB4D990CFD48575F8894A44|/"],
  "rbd916": ["ed2k://|file|www.98T.la@RBD-916 新奴隷捜査官6 松下紗栄子_restored_wm.mp4|7215815552|E14672B3D0811D45A482A544D66409C4|/"],
  "rctd708": ["ed2k://|file|www.98T.la@RCTD-708_restored.mp4|10651383921|AEDAAE218CADC078BC60485A75A5C871|/"],
  "rctd765": ["ed2k://|file|www.98T.la@RCTD-765-ltx.mp4|3112090327|75683000086271EBF7248BF60463A2A9|/"],
  "real545": ["ed2k://|file|www.98T.la@real-545_restored_ja_ltx.mp4|13061939481|139F878E4478F613FEBD9BB832668A26|/"],
  "rki413": ["ed2k://|file|RKI413.FHD_restored.mp4|14556548090|26FF8AB8D7A793B629F91781004CD6F3|/"],
  "rki728": ["ed2k://|file|www.98T.la@RKI-728_jasna-0.11.3_ltx_wm.mp4|6860485381|7C0C64EA1E45BBB2032ED250B3177BF0|/"],
  "roe103": ["ed2k://|file|ROE-103-C_restored.mp4|8597392217|A1A56793D53655C0280B2AA528AEDAFA|/"],
  "roe153": ["ed2k://|file|roe-153_restored_60fps.mp4|4317695974|A36FCAEC9637D6504C67FEF7FF0A19BC|/"],
  "roe191": ["ed2k://|file|www.98T.la@ROE-191_restored_wm.mp4|9257584402|82C7772E2EF05A3C709765ABF090C813|/"],
  "royd110": ["ed2k://|file|www.98T.la@royd-110_restored_wm.mp4|7424036206|95676EE0628FE4E089E9728D77C9C302|/"],
  "royd208": ["ed2k://|file|www.98T.la@ROYD-208_restored(水印).mp4|6725820740|7EB98ABF0E1C3AAD592A7C94071028CE|/"],
  "royd358": ["ed2k://|file|www.98T.la@ROYD-358_restored_wm.mp4|10203772779|AD6A8619B33E99A36024B8A200ED0AD7|/"],
  "same091": ["ed2k://|file|www.98T.la@SAME-091_restored_LTX.mp4|7211356068|EB08ACAB9AE36B49CAC69A61596603A3|/"],
  "same166": ["ed2k://|file|www.98t.la@SAME-166_restored.mp4|7590021181|7ADB2E91D922120DFAFBF7ADAA4291A9|/"],
  "savr217": ["ed2k://|file|www.98T.la@SAVR-217.restored.mp4|22343844406|AB54EE62B0C176BB210839396DC6A63A|/"],
  "sbnr328": ["ed2k://|file|www.98T.la@_SBNR-328_LTX.mp4|2793699295|704A7F95770B0680203FD1A7F4DC1697|/"],
  "scmf003": ["ed2k://|file|SCMF-003_ltx-restored.mp4|3833730774|28B8C4992F5D5CEEBDF7812412FB9067|/"],
  "scoh094": ["ed2k://|file|SCOH-094_LTX.mp4|6322499510|7801A18D8D3ED6ADBA85E8FE4D0DAE7B|/"],
  "scop926": ["ed2k://|file|SCOP-926_ltx.mp4|8495100539|4DD67FDB1D6C67427CB7ADE83933C18F|/"],
  "sdab245": ["ed2k://|file|SDAB-245小岛美子LTX.mp4|8193240716|3D75B29255BF5580926B38D175C0F14F|/"],
  "sdam8302": ["ed2k://|file|www.98T.la@sdam-8302_LTX.mp4|1370641130|F5E4F4985AF7E6216D248B661D752506|/"],
  "sdde468": ["ed2k://|file|www.98T.la@www.98T.la@SDDE-468_restored_wm.mp4|9670629066|D6927824F410CB92215CD989E006DB7B|/"],
  "sdde592": ["ed2k://|file|www.98T.la@[LTX]sdde592.HD_restored（有水印）.mp4|6658794300|1F8BFE4044589EA9B9A79F7012E0C19E|/"],
  "sdde638": ["ed2k://|file|www.98T.la@SDDE-638_restored.mp4|7558373792|E3BBC5FA2423C96ADDD3133DB2A5C3FE|/"],
  "sdde643": ["ed2k://|file|SDDE-643-LTX.mp4|9672968431|373E034DCEF1315B2257C26E555B99E1|/"],
  "sdde755": ["ed2k://|file|www.98T.la@SDDE-755_restored（有水印）.mp4|7025729929|878213CDEE18F6FB8CDC824F849BF46B|/"],
  "sdde767": ["ed2k://|file|www.98T.la@[LTX]]SDDE-767_restored（有水印）.mp4|8330164901|119F79021A5F2257CA191F84E80479F3|/"],
  "sden001": ["ed2k://|file|www.98T.la@www.98T.la@SDEN-001_restored_wm.mp4|16759830069|9B977528995D83AE5FBADE8C142D4470|/"],
  "sdjs307": ["ed2k://|file|SDJS-307 【特典版】秘書 守屋よしの 初AV出演.mp4|10977494309|A17E1A64E66C479134F318EE168C297A|/"],
  "sdmu074": ["ed2k://|file|www.98T.la@SDMU-074_LTX水印.mp4|17668153785|B2125DB0D62B864D23349A70286A5AEF|/"],
  "sdmu192": ["ed2k://|file|www.98T.la@www.98T.la@SDMU-192_restored_wm.mp4|7526524373|16B2298E715FC955F0EC5FB6E22CD9E6|/"],
  "sdmu613": ["ed2k://|file|www.98T.la@SDMU-613_restored.mp4|6455829308|311AA3F7012A6E93CAB666971C001D1B|/"],
  "sdnm015": ["ed2k://|file|sdnm-015_jasna5-unet4_4K__无水印原版勿删.mp4|49629320230|9AC838A80C01F3FC8B8878EE87474CBA|/"],
  "sdnm034": ["ed2k://|file|www.98T.la@www.98T.la@SDNM-034_restored_wm.mp4|8452818784|F1B4F66B0307D9E42873146BF914F212|/"],
  "sdnm038": ["ed2k://|file|WWW.98T.LA@SDNM-038.mp4|6663979339|DB23FBDE3ABDFB977D4DABD96EBA817C|/"],
  "sdnm040": ["ed2k://|file|www.98T.la@www.98T.la@sdnm-040_restored_wm.mp4|9276642191|F667BC74FB87FE00C342E0356DDEF3BA|/"],
  "sdnm061": ["ed2k://|file|SDNM-061(1sdnm00061)_LTX.mp4|11978285026|c9c0cf1bbe75a44f1f588b532d0ca4e8|/"],
  "sdnm256": ["ed2k://|file|www.98T.la@SDNM-256_LTX.mp4|16077627238|4AFE7562867F8EB551846DF3A9E94907|/"],
  "sdnm312": ["ed2k://|file|www.98T.la@sdnm-312restored.mp4|6089507388|546BDE933F99ABE2B51CFF41F5C829DF|/"],
  "sdnm330": ["ed2k://|file|www.98T.la@SDNM-330restored.mp4|4756120750|C87A78B288A63D1F60900446521634A6|/"],
  "sdsi002": ["ed2k://|file|www.98T.la@SDSI-002_wm.mp4|8117955527|44DCD700644CC77D42457864DC62C590|/"],
  "sdsi004": ["ed2k://|file|www.98T.la@SDSI-004_restored.mp4|6798486078|73A902C1547602DC8254C0D3B5EAF31C|/"],
  "sdsi008": ["ed2k://|file|www.98T.la@SDSI-008_restored_wm.mp4|8151693817|795DDACF54B3F18C9B4D0E16AB8DAFA0|/"],
  "sdsi031": ["ed2k://|file|SDSI-031_restored.mp4|11529747357|D9B411C0F69276FD0AB06A78661A6A45|/"],
  "sdsi040": ["ed2k://|file|sdsi-040_jasna5-unet4_4K__无水印原版勿删.mp4|39251724895|C3841B2085D1D56BB9DAAA1CC8E253DA|/", "ed2k://|file|www.98T.la@SDSI-040_restored_wm.mp4|8205951072|78F6FD3C1CF9C5A7E76AFAC06926595B|/"],
  "sga001": ["ed2k://|file|www.98T.la@SGA-001_restored.mp4|7434749274|A6E647B039ABC0C362A62E03596C90BD|/"],
  "sga002": ["ed2k://|file|www.98T.la@SGA-002_restored.mp4|6611055242|00E8447342F11E46FAFA7FBA54507CFD|/"],
  "sga004": ["ed2k://|file|www.98T.la@SGA-004_restored.mp4|6876778087|734E8BF8837687D096B997CEDC7ED1DE|/"],
  "sga109": ["ed2k://|file|sga-109-restored.mp4|4633896957|75CF8AD00FE73F59A2627C59AC45E009|/"],
  "sgki010": ["ed2k://|file|www.98T.la@SGKI-010_restored_wm.mp4|7062126920|3DEA2C216A74E5B78F9E074DA52CEB81|/"],
  "sgki044": ["ed2k://|file|SGKI-044_restored.mp4|4422030652|D1F5F6A4FBCB28DB7A3FE3EC48705576|/"],
  "shc301": ["ed2k://|file|www.98T.la@ SHC-301_restored_LTX_wm.mp4|6882042169|EA062F90AFC78AB683E6B912C395061C|/"],
  "shkd546": ["ed2k://|file|www.98t.la@SHKD-546_restored_wm.mp4|6662844310|2849F8AD8C5B73C4FC5992A315BDB386|/"],
  "shkd583": ["ed2k://|file|www.98T.la@SHKD-583_LTX.mp4|2622377482|28B3F0BC2DB0BB3D180D56EE08614BCD|/"],
  "shkd682": ["ed2k://|file|www.98t.la@SHKD-682_restored.mp4|7241706740|424cf23c5308a55123c1a419f6b58518|/"],
  "shkd713": ["ed2k://|file|www.98T.la@SHKD-713_restored-LTX.mp4|5877581171|EDD59B1E73B0438421DCCB5DE498F72A|/"],
  "shkd724": ["ed2k://|file|www.98t.la@SHKD-724_restored.mp4|9342739769|b30f66cb2a14e0d2dbc34cd3fbabe0d3|/"],
  "shkd744": ["ed2k://|file|www.98T.la@SHKD-744_restored-LTX.mp4|5892242078|42B9C166563AF06617B01EE986064354|/"],
  "shkd752": ["ed2k://|file|WWW.98T.LA@SHKD-752.mp4|7117736994|020B2E8F3B8E20E4528570548E7BAEE6|/"],
  "shkd808": ["ed2k://|file|www.98T.la@SHKD-808_restored.mp4|7245514601|D86FD2FEA9C22A5829FE58EA515E79C7|/"],
  "siro1690": ["ed2k://|file|www.98T.la@SIRO-1690_restored_wm.mp4|2458411086|4E5A6E1D63D418CB1B6BA75272D830B7|/"],
  "siro1736": ["ed2k://|file|www.98T.la@SIRO-1736_restored_wm.mp4|3689449814|2E1C74A85926BAD49A5DB2580E8CE07D|/"],
  "siro2411": ["ed2k://|file|SIRO-2411-ltx.mp4|1770690054|81E488D07C9DF326746FD7606E3617A6|/"],
  "snis016": ["ed2k://|file|www.98T.la@SNIS-016_restored_wm.mp4|7324970549|A9B6939E94724A76B33B00E1B8E825F6|/"],
  "snis027": ["ed2k://|file|www.98T.la@SNIS-027-Restored_wm.mp4|11016858165|36733B77A6FBB59B2538620A3287F217|/"],
  "snis036": ["ed2k://|file|SNIS-036-LTX【2013-11-19】(夢乃あいか・奥田咲)被巨人家族侵犯的嬌小姊妹 夢乃愛華 奧田咲 -下.mp4|6598258178|DC32EAE1A56D3E7D337876A9466F20BC|/"],
  "snis063": ["ed2k://|file|www.98T.la@SNIS-063_jasna-0.11.3_ltx.mp4|7147277475|77AD0AB6BBFA5268AE9CB3B1A6622C9D|/"],
  "snis070": ["ed2k://|file|www.98T.la@SNIS-070_LTX.mp4|8389471964|AF5ABC950AD92D209D5174B20D79CC60|/"],
  "snis079": ["ed2k://|file|www.98T.la@[LTX]snis-079_restored（有水印）.mp4|7368302158|62360009B8AC26AA4075E3CFEBE46A2C|/"],
  "snis091": ["ed2k://|file|www.98T.la@SNIS-091-Restored_wm.mp4|8999462714|A277AA1F152B6FF21EE7E0FBC2E64C03|/"],
  "snis110": ["ed2k://|file|www.98T.la@SNIS-110-Restored_wm.mp4|7395319071|2224BE452410E5DCD744E00B009554C5|/"],
  "snis166": ["ed2k://|file|www.98T.la@SNIS-166-U-LTX.mp4|6394982580|AC04F1FCFE69DCC8DF8684A8818CC062|h=IWD3AU4K2DDAU5MD3TQ46NENBQT3HW5I|/"],
  "snis205": ["ed2k://|file|www.98T.la@SNIS-205_LTX.mp4|7712606941|B710C2194B2465AC8061DCD4D7B0B2EF|/"],
  "snis268": ["ed2k://|file|SNIS-268.藍沢潤_LTX无水印.mkv|6247662118|AC203BE84CF86EF865D9B8B4C63B776F|/"],
  "snis281": ["ed2k://|file|SNIS-281.奥田咲_LTX无水印.mp4|6472737196|8D5DCC5D3DB887D435E658CD5E65132D|/"],
  "snis338": ["ed2k://|file|www.98T.la@SNIS-338_restored_LTX.mp4|9856888119|35BBDF9364B372D207E74030E7D7F168|/"],
  "snis360": ["ed2k://|file|www.98T.la@SNIS-360_restored_wm.mp4|7292043831|3548611E17575AAB1B0A773CAE4EC0CF|/"],
  "snis398": ["ed2k://|file|www.98T.la@SNIS-398_restored_LTX.mp4|7241464866|3E0421691AED4D314064D45E15013FCD|/"],
  "snis420": ["ed2k://|file|SNIS-420.小野夕子 奶葵_LTX无水印.mp4|5173333207|50744900657650B57AF21D8CC10DE754|/"],
  "snis440": ["ed2k://|file|www.98T.la@snis-440_restored.mp4|8902924867|D18C8A532F66EAC76F2AD82DE282C457|h=L7CEWTOUSVHVDXERNIFZG2EIWISZI65U|/"],
  "snis484": ["ed2k://|file|www.98T.la@SNIS-484-U-LTX.mp4|12957684141|F891E8E3A7CB957837CFB690F61E4C4A|h=6M4IR57FR3COMH5NQYLBX5GY5TOY2KBC|/"],
  "snis539": ["ed2k://|file|www.98T.la@SNIS-539-U.mp4|5421776360|8676C354936A04DD5AF92036A83BE036|h=5I4K6JE6CPY3A7VMQADTX7XP36AS5DT7|/"],
  "snis542": ["ed2k://|file|www.98T.la@SNIS-542 从湿漉漉的小穴里流出来的白浊淫汁-葵司_restored_wm.mp4|8686968014|7EC5FCB1416F7FF3931C55C40259A942|/"],
  "snis557": ["ed2k://|file|www.98T.la@SNIS-557-U.mp4|6057665520|1BF015E84014BF5E9822AC07D81F01F8|h=BBBOWE3SUT4GYUW63NJC27VPM3JP2GTF|/"],
  "snis561": ["ed2k://|file|www.98T.la@SNIS-561-Restored_wm.mp4|7288478223|D9114F16D0F8F3717371177B2BB15A7B|/"],
  "snis576": ["ed2k://|file|www.98T.la@SNIS-576.restored.mp4|8931431458|87246B0CD9A69B76ED68E78268823EB0|/"],
  "snis605": ["ed2k://|file|www.98T.la@SNIS-605-U-LTX.mp4|6444593329|62A3905F61154742DCEACAA108EFF1BE|h=4MH6D4UTE6O36HX5F4ZCV4WIRJXVKGJM|/"],
  "snis623": ["ed2k://|file|www.98T.la@SNIS-623-Restored_wm.mp4|7310920947|93A2D7D6E530659BBD152C8C9F0E253B|/"],
  "snis632": ["ed2k://|file|www.98T.la@SNIS-632-U-LTX-搬运司马.mp4|8867913841|83AB6ED17098681B18E128E2663EE65C|h=R3FCSUSEW3W2SZWXIY7KONX5I2WCT64R|/"],
  "snis645": ["ed2k://|file|www.98T.la@SNIS-645-U_wm.mp4|8091873896|3360E2FCE6E3AA0E12B01CA343DFC435|h=ZY7GRYHCTK2KEE2WEO3M22UPPXJOJ7P7|/"],
  "snis662": ["ed2k://|file|www.98T.la@SNIS-662-U-LTX.mp4|6405009955|FAB95858AD66656C70EECF0222DDB4B0|h=N6A4NUYXPZBGBSI5HN2PBRS2OLTGNATX|/"],
  "snis666": ["ed2k://|file|www.98T.la@SNIS-666-LTX_wm.mp4|9009149940|515156FD5758BEC00610BDF6D158E2FB|/"],
  "snis669": ["ed2k://|file|www.98T.la@SNIS-669-U-LTX-搬运司马.mp4|7606389587|61298DC5D55B1CA5DE552DD61F027F8A|h=2VBRIECTOB7YFLH6SDMSZRQ2HDXPCV5X|/"],
  "snis679": ["ed2k://|file|www.98T.la@SNIS-679-U-LTX.mp4|6422472098|C399F59EEA548A44D43B8E8176E8CDEC|h=GGSIGUZASCTXG4FMQHDGSXIM66OI5KNN|/"],
  "snis692": ["ed2k://|file|www.98T.la@SNIS-692-U-LTX.mp4|7749945747|1B9E071BB32510A5383FEB29DA4FA395|h=7IUSADE3KFQYQB6FE6BPLERO76TSFPHK|/"],
  "snis710": ["ed2k://|file|www.98T.la@SNIS-710_restored_wm.mp4|7193102884|56A07CDE258EF704D8F371FCC2C94CE9|/"],
  "snis731": ["ed2k://|file|www.98T.la@SNIS-731-U-LTX.mp4|5980507969|B92D7C6C7D24EABE2E4A81B7ED5D7699|h=BEWVBLU3DPHQSRZVHSGNITMCVJBWGFAW|/"],
  "snis752": ["ed2k://|file|www.98T.la@SNIS-752-Restored_wm.mp4|7288980533|3E981105958C4B735AF8F61BCAEB4180|/"],
  "snis800": ["ed2k://|file|SNIS-800-LTX.mp4|10542285816|DA499665CD6AAC1AEB15EBDB534A6391|/"],
  "snis854": ["ed2k://|file|www.98T.la@snis-854.restored.mp4|7284286622|CF532ED8D89D25C2C0DF469C6CF7B04E|/", "ed2k://|file|www.98T.la@SNIS-854_restored_LTX.mp4|7229818573|B9D6CE9B9EEA72C1E7E093339C21AB70|/"],
  "snis872": ["ed2k://|file|www.98T.la@snis00872hhb_restored.mp4|5879615799|F10EF4457560889DAF9A7239F95338BA|/"],
  "snis885": ["ed2k://|file|www.98T.la@SNIS-885_restored_LTX.mp4|7225562899|34B6ABF6E207AD30689B369B4C31A45A|/"],
  "snis896": ["ed2k://|file|SNIS-896-LTX.mp4|9209816113|91D4730C20364B9596523AD8C9C722C9|/"],
  "snis918": ["ed2k://|file|WWW.98T.LA@SNIS-918_restored.mp4|9502623822|F66B2054D0B98AC7DFA96079E1A92702|/"],
  "snis933": ["ed2k://|file|SNIS-933-LTX.mp4|9764847758|9530F0A5EA8B5BC347BC1DAC287D4C55|/"],
  "snis939": ["ed2k://|file|WWW.98T.LA@SNIS-939_restored.mp4|9437696056|D4413405FF64944675C169F52B20FB45|/"],
  "snis951": ["ed2k://|file|www.98T.la@zigousnis-951_restored_wm.mp4|7057155077|396DA4DDAC07BB49DE6EC64747DFAC86|/"],
  "snos003": ["ed2k://|file|www.98T.la@SNOS-003.restored.mp4|9923948297|9C68FC730E952DA23BD210555C4FC92E|/"],
  "snos038": ["ed2k://|file|www.98t.la@SNOS-038.mp4|6975639429|148F6E394C1722F68E69DB9CCD4B732D|/"],
  "snos049": ["ed2k://|file|www.98T.la@SNOS-049_restored_wm.mp4|9261125809|AD786D69D22E09312DA5834B12E6BD9E|/"],
  "snos065": ["ed2k://|file|snos-065_restored.mp4|5461493874|BCDE72BE246CDC028060CAAD3074E40C|/"],
  "snos074": ["ed2k://|file|www.98T.la@SNOS-074_restored_wm.mp4|8784486344|03F13C55BF09AC11C5EAE5B99CE91C0F|h=WXBDYYZ24TNXPAMCF6MPOT2JPN6PWOC7|/"],
  "snos079": ["ed2k://|file|www.98T.la@SNOS-079_restored_LTX.mp4|7234726252|30968EC4D52CC8B599D6FFB6D411FE1E|/"],
  "snos093": ["ed2k://|file|www.98T.la@SNOS-093_restored.mp4|11095649988|dae49cf2af752dbc21d22a1dee5263bc|/"],
  "snos094": ["ed2k://|file|SNOS-094-C_restored.mp4|3725004924|8ED312E7BF18235267C0E2CBFC3C9BED|/"],
  "snos106": ["ed2k://|file|www.98T.la@SNOS-106-LTX.mp4|14720881838|A2AADCAD38E93034CA3869B882BF55B7|/"],
  "snos141": ["ed2k://|file|www.98T.la@SNOS-141美脚女捜查官-枫芙爱_restored_wm.mp4|6800928646|A549B3E090C89D60D45FECD957EBCA27|/"],
  "snos161": ["ed2k://|file|www.98T.laSNOS-161_LTX.mp4|6460106618|0D2ACD0E0948D039D523A2545DB75FE4|/"],
  "snos177": ["ed2k://|file|www.98T.la@snos-177_restored_wm.mp4|7147807632|A48ABB13EA1D6AFE9641062D922AC1B0|/"],
  "snos192": ["ed2k://|file|www.98T.la@SNOS-192_[4K60F].restored.mp4|26048290153|B4D9B7BC102DC25A50F6280C4468A13C|/"],
  "snos209": ["ed2k://|file|SNOS-209 最強ヒロインが アナタのちんちん100％支配… 24時間犯してあげる 瀬戸環奈.4k.x265.无码破解-LTX.mp4|16894739607|7087216F97EAAF56C48ECDB10E6482DB|/"],
  "snos213": ["ed2k://|file|hhd800.com@snos00213hhb_60fps_restored.mp4|7227714459|A871AD60A53E4A2A0EA5B90856F77655|/"],
  "snos218": ["ed2k://|file|www.98T.la@SNOS-218_restored_wm.mp4|9179020838|271A3C5D2097ABE2E47A4EFC229B0D2C|/"],
  "snos222": ["ed2k://|file|www.98T.la@SNOS-222 腿控丝袜公司.黑丝魔性美腿-枫芙爱_60fps_restored_wm.mp4|7430593892|713AD8E9E798C9BB3431B3F65D0116C6|/"],
  "snos239": ["ed2k://|file|SNOS-239-LTX.mp4|8422801853|602B5855080001B65B100AB5D0543A45|/"],
  "snos246": ["ed2k://|file|www.98T.la@SNOS-246.restored.mp4|10010235975|06C0629E6531251F3A7D09E259BA055D|/"],
  "snos250": ["ed2k://|file|www.98T.la@SNOS-250_4K_LTX.mp4|19081022407|EE4E909C4D84E57102F98612F874C53A|/"],
  "snos258": ["ed2k://|file|www.98T.la@snos-258_restored.mp4|17928839293|9F80FF2BC26C5037B56969A3F6DA2EEF|/"],
  "snos275": ["ed2k://|file|www.98T.la@SNOS-275_restored_wm.mp4|9282566696|54BCCB9328EE33AB9C83017DE336367A|/"],
  "snos318": ["ed2k://|file|SNOS-318_restored.mp4|10768834081|D9FF5215E8D439493F7E5B1AEAE71ED0|/"],
  "snos326": ["ed2k://|file|www.98T.la@SNOS-326.mp4|6294968054|104AABDF5001AE30E6371E738C68F5FF|/"],
  "snos331": ["ed2k://|file|SNOS-331_restored.mp4.mp4|4399463945|C52BE3AE21E23DF20056756C8AA75CAB|/"],
  "snos334": ["ed2k://|file|www.98T.la@SNOS-334_LTX.mp4|11067777486|dc4b9e457b16511d06bec3b54b6dc2cf|/"],
  "snos347": ["ed2k://|file|www.98T.la@SNOS-347_restored_wm.mp4|7508265069|6360354F5BA12427EDD638A499B69829|/"],
  "snos359": ["ed2k://|file|www.98T.la@SNOS-359_restored_wm.mp4|7494651977|B4C352BB636DCA70D42147DD443B9093|/"],
  "snos377": ["ed2k://|file|www.98T.la@SNOS-377_wm.mp4|10056045083|030FC92413CD918EE5C5ADF98E01C1E1|h=O6ZN53AKTAWBQRJJV3NO2QHUXDNA6JMG|/", "ed2k://|file|SNOS-377_restored_Jasna_0.11.3.mp4|6705769762|94C4032BCD960A094F3FE1C7A94BE4D0|h=5KKERTIHDN4IEDST2M77NEGG7I66FIZ3|/"],
  "snos384": ["ed2k://|file|SNOS-384-U.mp4|8511150661|43B39B57498531948D96D1E6A510EAAE|/"],
  "snos387": ["ed2k://|file|SNOS-387_restored.mp4|7212460080|2E8613B2E7EE287215CCA5A28A89148F|/"],
  "snos392": ["ed2k://|file|www.98T.la@SNOS-392_restored_wm.mp4|9148062549|4F3973D3842E2B1BB732BF06D1BB4804|/"],
  "snos413": ["ed2k://|file|www.98T.la@SNOS-413.restored.mp4|9707431363|567A407E6593E99C17819DAC9B6D5379|/"],
  "snos420": ["ed2k://|file|www.98T.la@SNOS-420_LTX.mp4|8519982269|19CF0D7B6E1D534B5479B52B743CA2A3|/"],
  "snos424": ["ed2k://|file|www.98T.la@SNOS-424_restored_wm.mp4|7497683179|20F568637D26768EB9C34521B60C70C1|/"],
  "snos435": ["ed2k://|file|www.98T.la@SNOS-435_restored.mp4|7847470968|F1E61BEB3FB7282AB24EE717247800FF|/"],
  "snos437": ["ed2k://|file|www.98T.la@SNOS-437_restored_wm.mp4|9533972249|C544741CB6F4FE64EA40A0EF2BF2FD38|/"],
  "snos438": ["ed2k://|file|www.98T.la@SNOS-438_restored_wm.mp4|10640090905|FB308FA53974C364F2E097D9BCD24E4D|/"],
  "snos439": ["ed2k://|file|4k688.com@SNOS-439_restored.mp4|5111040012|9B475868964E9843EAA70ADFB987CACE|h=JMGMAI4ZMDQWS3IUWKYJF3UC5YTT6SNF|/"],
  "snos449": ["ed2k://|file|4k688.com@SNOS-449_restored.mp4|5471086773|6928606A6EDCAE8325F82FC08ADD7AE5|/"],
  "soe110": ["ed2k://|file|soe-110_jasna5-unet4_4K无水印.mp4|31537519807|8080C23D149AB1E626BB9E31DF2BFBDB|/"],
  "soe339": ["ed2k://|file|www.98T.la@SOE-339.restored_wm.mp4|9603312248|C13FBF8FA1871D0D536C8403E0486684|/"],
  "soe523": ["ed2k://|file|www.98T.la@SOE-523_restored.mp4|8714996977|A70A96563129A51B0EEAB4A87CE2F267|/"],
  "soe616": ["ed2k://|file|www.98Tang.COM@SOE-616 超大量颜射祭 蒼井そら(苍井空).mp4|7210122294|F04517795C24F9807CDEB7BE1FEA4ECC|/"],
  "soe691": ["ed2k://|file|SOE-691-R.mp4|7776963622|8DAC597BF0DAC34A2696E4A71535BE96|/"],
  "soe735": ["ed2k://|file|SOE-735.麻美ゆま_LTX无水印.mp4|5091158513|94258CD48E4E938F0DDC9ADC7087EE2C|/"],
  "sone012": ["ed2k://|file|SONE-012-U-I LTX有栖花緋, 有栖花あか.mp4|5454622325|C9C4DDC7C08C84D472A6D8845B18ECAB|/"],
  "sone049": ["ed2k://|file|hhd800.com@SONE-049_restored.mp4|4943725927|823D103E24FAF3BD5FD82F624BC43501|/"],
  "sone054": ["ed2k://|file|www.98T.la@SONE-054_LTX.mp4|8535412222|4226CC63CED6D73ADBA562AFFF671FC6|/"],
  "sone067": ["ed2k://|file|www.98T.la@SONE-067 美腿如虾般向后反弓.剧烈强力弹跳高潮-枫芙爱_restored_wm.mp4|6948676357|F4DCB03E9D9F5567626A072859175C0D|/"],
  "sone081": ["ed2k://|file|www.98T.la@SONE-081_u_wm.mp4|7090700978|FDFBBC5DF776AD032DEB68240F1504A0|/"],
  "sone097": ["ed2k://|file|www.98T.la@sone-097_restored.mp4|13008255798|64792D0F5BF1A9590F1C732C824CD9D1|/"],
  "sone114": ["ed2k://|file|www.98T.la@SONE-114 粉絲感謝祭.如果能十分钟不射.就能享受世界最强美腿性爱-楓芙愛_restored_wm.mp4|6794045739|32C0AB11A5291C5BB471F0335500A9D8|/"],
  "sone164": ["ed2k://|file|www.98T.la@SONE-164_wm.mp4|7368231925|C0DBC9CB04BD857852978A778F7669D6|/"],
  "sone180": ["ed2k://|file|www.98T.la@sone-180_restored.mp4|13992599359|C202375063E579407D87764504D0B18E|/"],
  "sone200": ["ed2k://|file|www.98T.la@ SONE-200 1発の射精では満足できないくらい 官能的で貪欲なセックスをー。 河北彩花_restored_wm.mp4|10370067506|61348E5EFF8AB8C847CFF9A57B8F88C8|/"],
  "sone201": ["ed2k://|file|SONE-201[4K]_LTX_restored.mp4|16799402321|B497D33A5347501796BEE80CE9436720|/"],
  "sone228": ["ed2k://|file|www.98T.la@SONE-228.restored.mp4|9244790264|478237AC36629F6A421F4659C02F09C9|/"],
  "sone235": ["ed2k://|file|www.98T.la@SONE-235_restored_LTX.mp4|11781759905|0CA700E81301CC4A978EEE2E189CF285|/"],
  "sone248": ["ed2k://|file|WWW.98T.LA@SONE-248✈️_LTX.mp4|7223394366|F4CD398A65C601D2F1D6C76433065FFA|/"],
  "sone263": ["ed2k://|file|www.98T.la@SONE-263_U-LTX.mp4|8439186037|42267A0796176F6BC795BA2123858D53|/"],
  "sone267": ["ed2k://|file|www.98T.la@SONE-267_restored_wm.mp4|8538675402|335E7C175A0F9A603FA101D50E0120C7|/"],
  "sone290": ["ed2k://|file|hhd800.com@sone00290_4K60fps_restored.mp4|33331734396|43678908DD4514E8B6C91CA1CCB5AC6F|h=W5IOQRPPT34GODNHHAQHFHVAJAVMRUCZ|/", "ed2k://|file|www.98T.la@SONE-290_restored_LTX.mp4|17598116509|9493246B691813AF84AD1EA4241FD00D|/"],
  "sone308": ["ed2k://|file|www.98T.la@SONE-308-LTX.mp4|11074771385|1F526108D4C501F2CBB2EBEBBFED814D|/"],
  "sone312": ["ed2k://|file|WWW.98T.LA@SONE-312_restored.mp4|7575462660|5CD4A11EF46C69D27D67F92BFA44972D|/"],
  "sone319": ["ed2k://|file|hhd800.com@SONE-319_restored.mp4|7055489311|69E9CB40CF33E6BFCF91A34A4D4D40B2|/"],
  "sone357": ["ed2k://|file|www.98T.la@SONE-357 把不听话的黑丝女店员调教成性爱母狗-枫芙爱_restored_wm.mp4|7191190219|6EF25772560D0CDEC0FB37B35770918C|/"],
  "sone360": ["ed2k://|file|www.98T.la@SONE-360.restored.mp4|9883717799|AB2AC2999E03DD8AB2BA0538CAE412A1|/"],
  "sone385": ["ed2k://|file|WWW.98T.LA@SONE-385✈️_restored.mp4|7379348591|84ED17AA90F1A653D06A94C89F600DD5|/"],
  "sone405": ["ed2k://|file|www.98T.la@SONE-405_restored_LTX.mp4|10083984920|50B6118EB347A2D351E679611004DA83|/"],
  "sone454": ["ed2k://|file|www.98T.la@sone-454_60fps_restored_wm.mp4|9900124234|8D2246A6C024E08F61B9F0D1A3C5E1AA|/"],
  "sone479": ["ed2k://|file|SONE-479_h264.mp4.mp4|9245711456|42BAAFBB87800C79DE642A3A958DB4DE|/"],
  "sone483": ["ed2k://|file|hhd800.com@SONE-483_restored.mp4|3916427573|8F40003BA17927241B8765C9F0AC2D0C|/"],
  "sone499": ["ed2k://|file|www.98T.la@SONE-499.restored.mp4|7487591363|9A065FB77C5706B803391C9162345053|/"],
  "sone521": ["ed2k://|file|www.98T.la@ SONE-521_restored.LTX_wm.mp4|8817866433|3CFAA7AE85B47B492454301D04359621|/"],
  "sone524": ["ed2k://|file|www.98T.la@sone-524-LTX.mp4|10201468146|152452C504D6F0FB12CC9738B93E96DF|/", "ed2k://|file|sone-524_ltx__%E6%97%A0%E6%B0%B4%E5%8D%B0%E5%8E%9F%E7%89%88%E5%8B%BF%E5%88%A0.mp4|6082754745|2C5506D041AADB3337082BE7EB1B5BB1|/"],
  "sone525": ["ed2k://|file|sone00525hhb_60fps_restored.mp4|8471158899|A81FDC866A765CFC87BC7106CB9F1A7F|h=JSDWN44MAX6XJ63HYS7QSK46I6NGZTPB|/"],
  "sone543": ["ed2k://|file|www.98T.la@SONE-543.restored.mp4|11131862275|7FFD27C9564203D486D044E4C351EA2B|/"],
  "sone556": ["ed2k://|file|SONE-556-ltx.mkv|6008125876|F67018F4156BFAE9D931136860BC029E|/", "ed2k://|file|sone-556-LTX.mp4|6008813752|D5B9040F706ACCA19DD50961AEEDB675|/"],
  "sone573": ["ed2k://|file|hhd800.com@SONE-573_ltx.mp4|4446932989|BD755EA2D04C91E2305D86EBFF28E0C6|/", "ed2k://|file|www.98T.la@SONE-573_restored_wm.mp4|7341615069|35979A7F4BDA98238D9E01DE312F92BD|/"],
  "sone574": ["ed2k://|file|www.98T.la@SONE-574_restored_wm.mp4|7591350316|BC9129CD1C550ACF63AC5869DC15F002|/"],
  "sone575": ["ed2k://|file|www.98T.la@SONE-575_restored_wm_65.mp4|7576716020|45FDA3B7F7BC926F1F07FCCA75496FF9|/"],
  "sone576": ["ed2k://|file|www.98T.la@www.98T.la@SONE-576_restored_wm.mp4|8498410750|4393F4530C86F74BB09B11FA14F8C0F5|/"],
  "sone604": ["ed2k://|file|www.98T.la@SONE-604_restored_LTX.mp4|7200361010|6D7C8708E9F9477F647AECA57991293F|/"],
  "sone614": ["ed2k://|file|www.98T.la@sone-614_LTX_restored_wm.mp4|9073727380|2411129192CBF53AB2A28D7266C27249|/"],
  "sone638": ["ed2k://|file|www.98T.la@sone-638_restored.mp4|10961469541|375ffe5379d143fcf170cf7a37506d1c|/"],
  "sone666": ["ed2k://|file|www.98T.la@SONE-666_LTX.mp4|6807018129|E1B42471E73C9CF4A660C097D3F1C234|/"],
  "sone682": ["ed2k://|file|www.98T.la@sone-682_restored.mp4|13865460390|1F871E2E6FC21B6E7B25D465F5BB753A|/"],
  "sone705": ["ed2k://|file|www.98T.la@SONE-705_restored.mp4|7629339787|A396AD584FAE8F4A2C39AF8F13C51752|/"],
  "sone737": ["ed2k://|file|SONE-737_[4K]_restored.mp4|38390681479|79D9FF2077BC4416C0A8423A9CE8AF0F|/"],
  "sone738": ["ed2k://|file|www.98T.la@SONE-738_restored_wm.mp4|9456679755|5361056205ABAFE56EF70233D2C64FC8|/"],
  "sone760": ["ed2k://|file|www.98T.la@SONE-760.restored.mp4|7534674763|4658799473C48355B03CAA980CE3D69E|/"],
  "sone763": ["ed2k://|file|www.98T.la@SONE-763_restored_wm.mp4|9471792388|372CD4807826B02F491DA5BD0F317542|/"],
  "sone770": ["ed2k://|file|WWW.98T.LA@SONE-770_restored.mp4|7295859628|1728A79AFC5CAB61C85C1CBB54E92050|/"],
  "sone786": ["ed2k://|file|www.98T.la@sone-786_LTX.mp4|9623771163|AAD3182A4DB4407E06B00C4218761A87|/"],
  "sone811": ["ed2k://|file|www.98T.la@SONE-811_restored_LTX.mp4|9800872146|E1B5804EAE944E1F10477235E1F6C3A1|/"],
  "sone817": ["ed2k://|file|www.98T.la@SONE-817.restored.mp4|7555844366|291B9CB4C0ED16F44342F261D49F216A|/"],
  "sone840": ["ed2k://|file|SONE-840_restored.mp4|7783831337|A1EA9E8EC69781A15282DD53F6A0F195|/"],
  "sone846": ["ed2k://|file|www.98T.la@SONE-846.mp4|18910503413|39B2DE149693539737753DA696E91F96|/"],
  "sone852": ["ed2k://|file|www.98T.la@SONE-852_[4K].restored.mp4|22439702213|6F90F3367D6AF463015E4452B8E59838|/"],
  "sone853": ["ed2k://|file|www.98T.la@SONE-853_restored_wm.mp4|8656822581|83A9172CBEC4E159D4006BD8DD663D82|/"],
  "sone855": ["ed2k://|file|www.98T.la@sone-855_60fps_restored_wm.mp4|8913727792|3FFA9378F00718357053CCFB032C39F2|/"],
  "sone940": ["ed2k://|file|www.98T.la@SONE-940_rfdertr-v6LTXmax.mp4|10217101998|7F0AC942F0561A79EE39C33F2969923D|/"],
  "sone968": ["ed2k://|file|www.98T.la@sone-968_4K60fps.restored.mp4|25392746224|84587FEE16D3EA6D1E8996F043B89F7E|/"],
  "sone974": ["ed2k://|file|www.98T.la@sone-974_restored.mp4|17079569006|26ED8DDC2110F2E81418D879F7CB27E8|/"],
  "sora029": ["ed2k://|file|www.98T.la@SORA-029水印.mp4|11424936754|3461F0A882340D6D1FB33D1EE132D295|/"],
  "sora645": ["ed2k://|file|www.98T.la@SORA645_restored.mp4|6306354528|7BCAEB6A826DA4B5DFD13E99FFE2B66A|/"],
  "spsa091": ["ed2k://|file|SPSA-91_LTX.mp4|4395482197|94FBC3671B9C19ED59D99C4DC8EA117F|/"],
  "spsc011": ["ed2k://|file|SPSC-11_LTX.mp4|3871403945|554B5F25CFCCE4705E6ED805B258CA5D|/"],
  "srs022": ["ed2k://|file|www.98T.la@ SRS-022_restored_LTX_wm.mp4|7319461389|7E871487AB2C8F4922BC0EA8ACA08DD1|/"],
  "ssis037": ["ed2k://|file|www.98T.la@SSIS-037_restored_wm.mp4|9202451965|AE3E2146EA3643A32646B143BB347510|/"],
  "ssis045": ["ed2k://|file|www.98T.la@ssis-045_restored.mp4|5614375947|C4D4964CCFF869088146840DC6C3513D|/"],
  "ssis082": ["ed2k://|file|SSIS-082-LTX.mp4|6894080657|7B8A5F9685F1C898735B0194CBEF43E2|/"],
  "ssis088": ["ed2k://|file|www.98T.la@SSIS-088_Jasna-LTX.mp4|11782302661|029BE5DC442447C46F1499C43B6E3EB2|/"],
  "ssis124": ["ed2k://|file|www.98T.la@ssis-124_restored.mp4|5767365745|C4A85200A1B07494E91BE57DB35F2DAD|/"],
  "ssis157": ["ed2k://|file|SSIS-157-LTX【2021-08-19】（小宵虎南）出差和一直蔑视的中年性骚扰上司共处一室…直到早晨的绝伦性交 H CUP新入社员.mp4|3607826070|83A32EFC9A2BF300892768FA1720E708|/"],
  "ssis158": ["ed2k://|file|www.98T.la@ SSIS-158 河北彩花 ReStart！ 第2章 本気絶頂 3本番 4K超画質で大人になった彩花の恥ずかしい姿たっぷりじっくり見せますスペシャル_restored_wm.mp4|9032054775|F78CDEFE6AFD1BF82AB70805C1E1E6EA|/"],
  "ssis181": ["ed2k://|file|www.98T.la@ssis-181_restored.mp4|16328314446|3BC8472BF65DE4A1478BCE34880176A6|/"],
  "ssis194": ["ed2k://|file|www.98T.la@SSIS-194 河北彩花 Restart！第3章 Deep Impact 彩花のディープKISS＆DEEPフェラチオ_restored_wm.mp4|9177349894|5F1942C454E7B4101A9472B1CBAE786A|/"],
  "ssis241": ["ed2k://|file|www.98T.la@SSIS-241-60fps_restored_LTX.mp4|12983465346|D31F7A55679380D262206A175B3B0902|/"],
  "ssis280": ["ed2k://|file|www.98T.la@SSIS-280_restored_LTX.mp4|10251608021|49F6E82CB4BCB9A868117CF881611257|/"],
  "ssis282": ["ed2k://|file|www.98T.la@SSIS-282_restored_LTX.mp4|9171693162|730E771D1082873A0DA92D0B202136C4|/"],
  "ssis298": ["ed2k://|file|SSIS-298_restored.mp4|6620829212|7506B28D70558170A03EBD5501E60A0C|/"],
  "ssis308": ["ed2k://|file|ssis-308-4k-LTX.mp4|27236137986|921F5D6EE3464B7B1FA49987243A72E2|/"],
  "ssis313": ["ed2k://|file|www.98T.la@ssis-313_restored.mp4|17179862712|E482240BA80A7425BFE0BDDB84E776CC|/"],
  "ssis323": ["ed2k://|file|SSIS-323_restored.mp4|4128398741|F03EE0E6E24D4D0E5776C6B657D72D60|/"],
  "ssis338": ["ed2k://|file|www.98T.la@ SSIS-338 最高の愛人沼 仕事にも家庭にも干渉してこない、セックスだけの理想関係を三上悠亜と…。 _restored_wm.mp4|8873520722|D4226F9F905EC91B69358FBE2D678CDA|/"],
  "ssis361": ["ed2k://|file|SSIS-361_restored LTX.mp4|5627437525|CF830436BC21E1C0D56338583355B552|/"],
  "ssis386": ["ed2k://|file|www.98T.la@SSIS-386-hack-LTX.mp4|4795439090|49C39297D9B0D9951D5001619B3CE8ED|/"],
  "ssis387": ["ed2k://|file|www.98T.la@SSIS-387-U-LTX.mp4|7435406995|B822058D6E2CBC65074DCAC1B3EC8A51|h=AUUQOCIIPZGRPUHJN6I7CFNL4LO4TLNZ|/"],
  "ssis392": ["ed2k://|file|www.98T.la@ssis-392_restored.mp4|13794012481|D2E8CC8B348F98C3D45E97CA8B62E1D9|/"],
  "ssis400": ["ed2k://|file|www.98T.la@SSIS-400_restored_LTX.mp4|7186086214|405278CD2F1A694F8442EAB9E86047FD|/"],
  "ssis402": ["ed2k://|file|www.98T.la@SSIS-402-LTX.mp4|9189278066|69BB8C59A914475AF2971322B5F2F630|/"],
  "ssis413": ["ed2k://|file|SSIS-413_restored.mp4|10222146817|A39ADDD85BCE033798F2FAB46A64CA85|/"],
  "ssis423": ["ed2k://|file|SSIS-423-LTX.mp4|10156893192|D4D693BD558D2A42A5A6422BA10605EB|/"],
  "ssis437": ["ed2k://|file|www.98T.la@www.98T.la@SSIS-437_restored_wm.mp4|7234942674|3714F8717F05D7594CE54A45F2873AF0|/"],
  "ssis440": ["ed2k://|file|www.98T.la@SSIS-440_restored-LTX.mp4|11443734211|CCD0FA85E2EBBDD6FDBEFE3CA9D057B3|/"],
  "ssis448": ["ed2k://|file|www.98T.la@ssis-448_restored.mp4|11643304786|84eade237c1340d03ff6c14fe6f9c6b1|/"],
  "ssis465": ["ed2k://|file|www.98T.la@SSIS-465_restored_wm.mp4|9105925811|607FAF6A978E3AB10B97448354E33E65|/"],
  "ssis469": ["ed2k://|file|SSIS-469_60fps-LTX_无水印.mp4|7091960750|32C74C1260ACC14201084E06A900A9E9|/"],
  "ssis477": ["ed2k://|file|www.98T.la@SSIS-477 黑丝！网袜！JK！制服！10种变化最好的手淫性爱 三上悠亜_restored_wm.mp4|9613818786|2636C2BA7FC900A09048745EF99193FE|/"],
  "ssis491": ["ed2k://|file|www.98T.la@SSIS-491_restored_LTX.mp4|7365661480|883A754406D8CED710EB681208526CFF|/"],
  "ssis492": ["ed2k://|file|SSIS-492-U-LTX.mp4|6099534621|7E1F6EB42822FFFE053A44EB85B9CAAD|/"],
  "ssis509": ["ed2k://|file|www.98T.la@ssis-509_restored.mp4|16979551066|3246DD67A945047039956B34FF7A37D6|/"],
  "ssis531": ["ed2k://|file|www.98T.la@SSIS-531-60fps_restored_LTX.mp4|14541345163|92E194E838D66E38CB75648B11ECCCE6|/"],
  "ssis541": ["ed2k://|file|www.98T.la@ssis-541_restored.mp4|15460044920|1E43304240ABD92825B03CB0077A7444|/"],
  "ssis549": ["ed2k://|file|www.98T.la@SSIS-549-LTX.mp4|6699189220|DB93569088B4038D9A0B2354FE82CF02|/"],
  "ssis561": ["ed2k://|file|www.98T.la@SSIS-561_restored_wm.mp4|10458964393|1EEE038D378912C9D07432FDF25B4871|/"],
  "ssis562": ["ed2k://|file|www.98T.la@SSIS-562_restored.mp4|8792367425|13F8F348EE1D68FEAA2AE9D0688C6D1E|h=24GH477WIVE5B5NL6MXRDQBVSSJW74BT|/"],
  "ssis570": ["ed2k://|file|www.98T.la@ssis-570_restored.mp4|9273305156|299E1BCCB0A0A9A50D401971866E8182|/"],
  "ssis573": ["ed2k://|file|www.98t.la@SSIS-573_restored_wm.mp4|9187992147|7A4A0D957E789CFA6EF48E86E76F514D|/"],
  "ssis586": ["ed2k://|file|www.98T.la@SSIS-586.restored.mp4|10517393719|F22B82F7C98F070783CA58E830CEFDD9|/"],
  "ssis588": ["ed2k://|file|www.98T.la@SSIS-588_restored.mp4|8328545897|10F4B39D45D12BAC55F9D6148AF5ACBD|/"],
  "ssis595": ["ed2k://|file|www.98T.la@ SSIS-595_restored.LTX_wm.mp4|11073616880|82087D74A8417D07A6C017E4B2D133D5|/"],
  "ssis622": ["ed2k://|file|www.98T.la@SSIS-622✈️_restored_wm.mp4|8954180359|E9594536DACC936453A76952F5653FF6|/"],
  "ssis646": ["ed2k://|file|www.98T.la@SSIS-646.restored.mp4|8954817141|152482079C5B53B27ACE3C847AFD673A|/"],
  "ssis668": ["ed2k://|file|www.98T.la@SSIS-668_LTX.mp4|9468763004|44ADC6B5A6BF9A7AFE10323059F23B18|/"],
  "ssis673": ["ed2k://|file|SSIS-673-LTX.mp4|8101761474|1AA2722EBA7CD775DD40C83744E8AE6C|/"],
  "ssis687": ["ed2k://|file|www.98t.la@SSIS-687✈️_restored.mp4|8207970705|D0943B04E1E81BEBA71938F7242D3A19|/"],
  "ssis698": ["ed2k://|file|www.98T.la@SSIS-698_restored.mp4|11500071124|9B799286AB780AA387D153966F50C613|/", "ed2k://|file|SSIS-698 三上悠亚、新有菜与相泽南.mp4|19728720385|74F2853944B86DA0F9D84AF6C0023441|/"],
  "ssis706": ["ed2k://|file|www.98T.la@SSIS-706_restored_wm.mp4|7172925439|404963C7B53505BBC46B42CA6043D2D7|/"],
  "ssis724": ["ed2k://|file|SSIS-724-LTX-60fps_无水印.mkv|7585279734|81BFBA2E7D2F9BF8DCEA2F0D2A3DD0B1|/", "ed2k://|file|www.98T.la@SSIS-724_restored_LTX.mp4|14243284534|0C0FFECCC590B10814629B6A82F78009|/"],
  "ssis737": ["ed2k://|file|www.98T.la@ssis-737_restored.mp4|8510854410|5086335a990e833769575796eafa4a26|/"],
  "ssis740": ["ed2k://|file|www.98T.la@SSIS-740.restored.mp4|27870525537|A4C6A1DE6FC89A6A94973E291E72EAED|/"],
  "ssis743": ["ed2k://|file|www.98T.la@SSIS-743✈️_restored_wm.mp4|8942825369|D764AEB04D043F3E0E54387C27802C35|/"],
  "ssis766": ["ed2k://|file|www.98T.la@SSIS-766_60fps-LTX.mp4|18589590672|66CA99B3543E45CD1B32C0249CD432AF|/"],
  "ssis776": ["ed2k://|file|www.98t.la@SSIS-776_restored_wm.mp4|9369478251|AEA23A19944EB0FDC393754F0755AE5D|/"],
  "ssis781": ["ed2k://|file|www.98T.la@www.98T.la@SSIS-781_restored_wm.mp4|9250283488|6E47C408BFFA65FF07ECD59959E44AFD|/"],
  "ssis795": ["ed2k://|file|www.98T.la@SSIS-795_restored.mp4|10867725133|38CB3FA0E449060FB905BE41E31D3975|/"],
  "ssis798": ["ed2k://|file|www.98T.la@ssis-798_60fps_restored_wm.mp4|7292335207|0BF3A72AA32CC5585578CD9094B0C414|/"],
  "ssis804": ["ed2k://|file|www.98T.la@SSIS-804✈️_restored_LTX.mp4|15850108830|E8518BCD5308B42B7BC8617135412F30|/"],
  "ssis822": ["ed2k://|file|www.98T.la@www.98T.la@SSIS-822_restored_wm.mp4|9081588476|E5DC4ADEAB94BD144C6258DBBBC5EE74|/"],
  "ssis826": ["ed2k://|file|ssis-826_restored.mp4|5031009142|BA749DDE116637CC1EFB4C3C6456A6F4|/", "ed2k://|file|www.98T.la@SSIS-826-LTX.mp4|8352271447|8A4389F4EBA542F40002E2D666081ED2|/"],
  "ssis839": ["ed2k://|file|www.98T.la@SSIS-839-U-LTX.mp4|9149538782|34C3217F23EC0A26770EE1980562F4CF|h=BT5VDXAEF3OTSAWQOGURCJJPS65VRDMT|/"],
  "ssis858": ["ed2k://|file|www.98T.la@ SSIS-858 教師のくせにクソデカなエロ乳してんだから俺らに犯●れて当然って、分かるよね？ 凪ひかる _restored.mp4|5788143195|6CF612A5D8C121882A54399DAE8F43A1|/"],
  "ssis876": ["ed2k://|file|www.98T.la@SSIS-876-LTX.mp4|13382977577|D28F8D55F7DF5AA8229E7966FBFDFC95|/", "ed2k://|file|SSIS-876_ltx__%E6%97%A0%E6%B0%B4%E5%8D%B0%E5%8E%9F%E7%89%88%E5%8B%BF%E5%88%A0.mp4|7891593158|E57F3365D70ED77CC2228D543C41C4D8|/"],
  "ssis899": ["ed2k://|file|www.98T.la@SSIS-899_wm.mp4|7277790288|3D7FB15E74F491181CE46B664CD4FC17|/"],
  "ssis950": ["ed2k://|file|www.98T.la@SSIS-950_restored.mp4|11265586860|E1A5628C9A0A44BD5156D1548BB90A07|/"],
  "ssis951": ["ed2k://|file|www.98T.la@SSIS-951_restored.mp4|11538230804|0AE6FABE27EEFF0B53FBB2FABF9EB6CD|/"],
  "ssis969": ["ed2k://|file|ssis-969_restored.mp4|5320777767|4873AA53CED629CCF73EB44730235376|/"],
  "ssis971": ["ed2k://|file|www.98T.la@SSIS-971_wm.mp4|7398406724|5265144582703A963B76D9A2EF780DB1|/"],
  "ssni036": ["ed2k://|file|www.98T.la@SSNI-036.restored_wm.mp4|12063218753|2667D66804F7432E823442B185E5D2B3|/"],
  "ssni056": ["ed2k://|file|www.98T.la@[LTX]ssni056.HD_restored（有水印）.mp4|12065700667|D60CDB57828B836A3E632DA17E3D7970|/"],
  "ssni103": ["ed2k://|file|ssni-103(搬运).mp4|8791435302|5D6264CA86F219E3685F11ADD31FC0D2|/"],
  "ssni150": ["ed2k://|file|www.98T.la@ssni-150_restored_wm.mp4|9439745899|96324785D97FDABC197981F83583450A|/"],
  "ssni152": ["ed2k://|file|www.98T.la@SSNI-152.restored.mp4|9649132343|AD470C7C18E9DB6233EB16EA2CA9DAAC|/"],
  "ssni166": ["ed2k://|file|www.98T.la@SSNI-166_restored_wm.mp4|9855101213|C19843D270176F7ADEB00C230506C072|/"],
  "ssni192": ["ed2k://|file|www.98T.la@SSNI-192_restored_wm.mp4|10157452391|751F904B9EB549F5A4C96128F474BB2A|/"],
  "ssni221": ["ed2k://|file|www.98T.la@SSNI-221.restored_wm.mp4|9169361698|1887F0D1283303251F9E577367857EE3|/"],
  "ssni233": ["ed2k://|file|www.98T.la@SSNI-233 新有菜 LTX_restored.mp4|7463973102|BDCDDFB840DF81DCEB1A202EECB74D9D|/"],
  "ssni254": ["ed2k://|file|www.98T.la@SSNI-254_restored.mp4|9055025265|EE6668BCE358771E77B07A47E18DA36E|/"],
  "ssni258": ["ed2k://|file|www.98T.la@SSNI-258 高中学生妹桥本有菜超浓厚的口交技巧-桥本有菜_restored_wm.mp4|8427019106|34EC0BF03AA02E3265D5FDB600FB208D|/"],
  "ssni279": ["ed2k://|file|www.98T.la@SSNI-279_restored.mp4|9263164018|7D589BE501EDEDEFB3616D4999D020EE|/"],
  "ssni322": ["ed2k://|file|www.98T.la@SSNI-322_LTX.mp4|7583418021|32F668D50CF4B902B12442866F1CC98E|/"],
  "ssni344": ["ed2k://|file|www.98T.la@ssni-344_restored.mp4|9778005014|6a52e64912e64fa9734231ff7ff8fa6b|/"],
  "ssni348": ["ed2k://|file|www.98T.la@SSNI-348 小恶魔桥本有菜连续射精攻击-新有菜_restored_wm.mp4|8848080036|6883B759036C4452533B857A3AA9C1D5|/"],
  "ssni369": ["ed2k://|file|www.98T.la@SSNI-369 新有菜 LTX_restored.mp4|10062516886|A074CE1EAB1DB65E57DB71FCDC107985|/"],
  "ssni380": ["ed2k://|file|www.98T.la@SSNI-380_restored.mp4|11444503308|242CC0136D11702C400315F7D0205C04|/"],
  "ssni385": ["ed2k://|file|www.98T.la@ssni-385_restored.mp4|12672700532|C1A00F360BDCAE66AB860D72A125B7C5|/"],
  "ssni392": ["ed2k://|file|www.98T.la@SSNI-392_LTX_restored.mp4|5503328430|DCDE6772436E3920783C5E907CA936B1|/"],
  "ssni409": ["ed2k://|file|www.98T.la@SSNI-409.restored_wm.mp4|8070971577|C63FEEC188178545CC72E58753FFC144|/"],
  "ssni413": ["ed2k://|file|www.98T.la@SSNI-413_restored_LTX.mp4|9178018984|B83C8BB626DE9F0537D6ED63DA14E403|/"],
  "ssni417": ["ed2k://|file|www.98T.la@[LTX]SSNI-417_restored（有水印）.mp4|9141647026|169FF035E051E4D4C68C89BA80FFCAB1|/"],
  "ssni424": ["ed2k://|file|www.98T.la@SSNI-424_restored_wm.mp4|11229538632|F20D56389EEA3A774286004A0F28B573|/"],
  "ssni436": ["ed2k://|file|www.98T.la@SSNI-436 新有菜 LTX_restored.mp4|10157326477|6677D0EEA6638AAAE0FE767FF4152009|/"],
  "ssni441": ["ed2k://|file|SSNI-441-LTX.mp4|6505031360|ED01EFE09EA863E51C0AF2A49681FBB1|/"],
  "ssni444": ["ed2k://|file|www.98T.la@SSNI-444_restored_LTX.mp4|9092495841|CE4F7361BB3BB82E38FE71901608328E|/"],
  "ssni452": ["ed2k://|file|www.98T.la@SSNI-452_restored.mp4|14529188162|7b5c4231acc1ccc4ad98038937db7274|/"],
  "ssni454": ["ed2k://|file|www.98T.la@SSNI454.FHD_restored.mp4|6529770488|6247716E933F201CE5EED3C2A22A26DC|/"],
  "ssni473": ["ed2k://|file|www.98T.la@SSNI-473.restored_prob4.mp4|21009728368|3E4B37BDD1C86FC67A4B2F4F7D5C3CEB|/"],
  "ssni476": ["ed2k://|file|www.98T.la@SSNI-476_restored_LTX.mp4|7310646429|8FE55B28D71CCE399A4F3E1FC29EE43F|/"],
  "ssni497": ["ed2k://|file|www.98T.la@SSNI-497_restored.mp4|10574603852|4C97481F61C9D46BEE3A0393895639C4|/"],
  "ssni520": ["ed2k://|file|www.98T.la@SSNI-520 新有菜 LTX_restored.mp4|9681492960|70ED1A4AA2A147E390FDC89E5A898650|/"],
  "ssni542": ["ed2k://|file|WWW.98T.LA@SSNI-542_restored.mp4|9315611974|971FA8BBE4B2B54D44465B09F9410731|/"],
  "ssni546": ["ed2k://|file|www.98T.la@ SSNI-546 ずっと憧れていた1個上のマドンナ先輩と部活の遠征で相部屋になった3日間。 橋本ありな_restored_wm.mp4|7316703773|F51B7EDAE35530DF2866C9196CB5C694|/"],
  "ssni589": ["ed2k://|file|www.98T.la@ SSNI-589_restored_LTX_wm.mp4|9162376993|BF03ED052A190FF4414B4334FA99B124|/"],
  "ssni618": ["ed2k://|file|www.98T.la@SSNI-618_restored_LTX.mp4|13471465670|D8D0D86BED4B498DB2429123C4E7A7B3|/"],
  "ssni621": ["ed2k://|file|www.98T.la@SSNI-621_restored_LTX.mp4|7354201995|558E3FC89F46CB7348F3C13D90329ECD|/"],
  "ssni644": ["ed2k://|file|www.98T.la@ SSNI-644_restored_LTX_wm.mp4|10726012437|1D9F6DE87FF1F18DD3CAB7D004FCB550|/"],
  "ssni647": ["ed2k://|file|www.98T.la@SSNI-647_restored_LTX.mp4|7298380910|416FBB871DEE89B7455B87ACEBAABE9B|/"],
  "ssni674": ["ed2k://|file|www.98T.la@SSNI-674_restored.mp4|8866928055|EC0147B7E45882AA08041CC4A7E985C5|/"],
  "ssni700": ["ed2k://|file|WWW.98T.LA@SSNI-700_restored.mp4|9388209644|8945C65A39D4CF8A7650D8355B521DD2|/"],
  "ssni703": ["ed2k://|file|www.98T.la@ssni-703_restored.mp4|11305856142|dcf63b99073494bce95adb30f575c9d5|/"],
  "ssni727": ["ed2k://|file|www.98T.la@SSNI-727_restored.mp4|9156049258|2AE260E58255F9BF1F829A7C55553306|/"],
  "ssni730": ["ed2k://|file|www.98T.la@SSNI-730.restored_wm.mp4|12061085607|5805B55918B45BFA518BE1068BF5C1D6|/"],
  "ssni780": ["ed2k://|file|www.98T.la@ SSNI-780_restored.LTX_wm.mp4|10129192010|0C5749AEF809E291C8069B7C750E8217|/"],
  "ssni782": ["ed2k://|file|www.98T.la@SSNI-782-hack-LTX.mp4|4854955027|04D7252262B5E8D14036366BE633DC1F|/"],
  "ssni795": ["ed2k://|file|ssni-795_LTX.mp4|6597349940|6CF6DFC19C5B1C7FD8B0B428703D56CF|/"],
  "ssni802": ["ed2k://|file|www.98T.la@SSNI-802 暴风雨无法回家被学生强上并拍下影片不断高潮教师失格的黑丝人妻女教师 三上悠亚 -丝袜佳作_restored_wm.mp4|7001525042|E988533DB2CC5810970CE4169BE0FA7F|/"],
  "ssni830": ["ed2k://|file|www.98T.la@ SSNI-830_restored_LTX_wm.mp4|9582453926|DC3F7E2606C25716CF458036BC359DE6|/"],
  "ssni863": ["ed2k://|file|SSNI-863-restored.mp4|6610009143|687F57C3AA116DE581FD67106B648CD6|/"],
  "ssni865": ["ed2k://|file|www.98T.la@SSNI-865_restored.mp4|12556594282|71B77CC4E6A84903D4747E2CF0908273|/"],
  "ssni888": ["ed2k://|file|www.98T.la@ssni-888_rfdertr-v6LTXmax.mp4|10251685086|A6F532403DF35C33618569EF2B04456A|/"],
  "ssni916": ["ed2k://|file|www.98T.la@SSNI-916_restored水印版.mp4|11302983989|696678B67FA40877B22A0EBE7415CD53|/"],
  "ssni939": ["ed2k://|file|www.98T.la@SSNI-939_restored.mp4|11824015490|5F9C89B15075F8CFE8D94396B5589751|/"],
  "ssni942": ["ed2k://|file|ssni-942_restored.mp4|5221457090|5C131B03BE0DAE4105F50EF1AB0C3859|/"],
  "ssni963": ["ed2k://|file|www.98T.la@SSNI-963.restored_wm.mp4|8951670045|9C25B5BC7FC7C970532E10618C22430D|/"],
  "sspd142": ["ed2k://|file|www.98T.la@SSPD-142 全心全意照顾住院丈夫的人妻被囚禁轮奸内射沦为笼中的奴隶母狗 松下纱荣子_restored_wm.mp4|8547238230|D63609E7772FCEC7753F3B874A39AE59|/"],
  "sspd144": ["ed2k://|file|www.98T.la@SSPD-144 秘籍：蜜糖溢出 - 某位淑女的觉醒 松下紗栄子_restored_wm.mp4|8378732923|C9FAC7989CBC57616ED5DF7C18A530F3|/"],
  "sspd149": ["ed2k://|file|www.98T.la@SSPD-149_restored-LTX.mp4|6286404776|3953A2AAA78F5857A405711F80AE4DF6|/"],
  "sspd152": ["ed2k://|file|www.98T.la@SSPD-152_restored_wm.mp4|6667815940|6DF6CC11AA33322B3AF9E58B6A4A8BB3|/"],
  "sspd157": ["ed2k://|file|www.98T.la@SSPD-157_restored_wm.mp4|6725935299|5B59D5E34A82E233179580BB02BBA993|/"],
  "star409": ["ed2k://|file|www.98T.la@STAR-409 橘梨紗 AV debut_restored_wm.mp4|9222509329|72132E5BF128FE4480EFB8F676E837E2|/"],
  "star424": ["ed2k://|file|www.98T.la@STAR-424 橘梨紗-角色扮演連續激烈高潮_restored_wm.mp4|8787304049|ED47596096D31858ECF21043BD8A36BE|/"],
  "star433": ["ed2k://|file|www.98T.la@STAR-433 橘梨纱-超高级嬢_restored_wm.mp4|10312793879|A20602B8C4197208C2FDE3036BD9F5B4|/"],
  "star447": ["ed2k://|file|STAR-447-LTX.mp4|7452384958|57BD692C62D65F3F37E70DEF0795418E|/"],
  "star471": ["ed2k://|file|www.98T.la@www.98T.la@star-471A_restored_wm.mp4|6555709668|1AB7A99D366B0FECF4D07ABCC8E0A06D|/"],
  "star624": ["ed2k://|file|STAR-624-QTGMC_jasna5-unet4_4K__无水印原版勿删.mkv|48713551109|8B5CD7F0DF36F146008BCBD9BA13AFF7|/"],
  "star813": ["ed2k://|file|www.98T.la@www.98T.la@STAR-813_restored_wm.mp4|8104615541|26FBC6BAF16F5AA2B6E5171DF901B45C|/"],
  "star820": ["ed2k://|file|www.98T.la@star-820✈️_restored_wm.mp4|7482157982|6D2C1E0558B1905DF8994E85DE1A6E51|/"],
  "star855": ["ed2k://|file|STAR-855  破解带水印.mp4|11039111416|027CBFBCE4A8F6C6ED35F2A072631EFF|/"],
  "stars127": ["ed2k://|file|www.98T.la@STARS-127-LTX_wm.mp4|8611248620|FC398CB4AA13A27EA41AF3D3C663D8BC|/"],
  "stars147": ["ed2k://|file|STARS-147-restored.mp4|7971297806|762343DFA35530B009A860C3BFB4D0DB|/"],
  "stars187": ["ed2k://|file|www.98T.la@stars-187_restored_wm.mp4|7259780639|655523D83165BA01D322AF5ABE192B08|/"],
  "stars256": ["ed2k://|file|www.98T.la@STARS-256_restored_wm.mp4|7204214615|0A6ED6008B19816697FA102444DD83AD|/"],
  "stars286": ["ed2k://|file|www.98T.la@[LTX]stars-286_restored（有水印）.mp4|6025176116|ADA07BF9EA6CEC34E2FDE0F1B3A17833|/"],
  "stars323": ["ed2k://|file|www.98T.la@[LTX]stars-323_restored（有水印）.mp4|7014246503|1BAACBD23A8614FEEC0FF38A0E8F0C2F|/"],
  "stars368": ["ed2k://|file|WWW.98T.LA@-STARS-368.mp4|7009933130|9FCB28BC94CBF07562F97BFD768423DB|/"],
  "stars409": ["ed2k://|file|www.98T.la@STARS-409_restored水印.mp4|7152460042|9F8D4E9F53F4CBB3472DD2501F151023|/"],
  "stars423": ["ed2k://|file|www.98T.la@[LTX]stars-423_restored（有水印）.mp4|6162867354|E13C9A3CD88DBD76F5930F5EAFBDC648|/"],
  "stars425": ["ed2k://|file|STARS-425LTX_restored.mp4|7537455333|7CB4857F07BD4106973718A99FAB9AD7|h=3JZ7E6ZTALKHE7ZCLDRWZIJOOBKBFDB2|/"],
  "stars430": ["ed2k://|file|www.98t.la@STARS-430_restored.mp4|7594154403|3078DFE929A34FEECD88C553C4D75E49|/"],
  "stars515": ["ed2k://|file|STARS-515LTX_restored.mp4|6310528167|976834BFDC1B4CCAB7D6D72103BC8811|h=OTGYCNQN2JTTPUX4SRJO27R2CYRZF5YW|/"],
  "stars566": ["ed2k://|file|www.98T.la@STARS-566_restored.mp4|8973083936|659149DCD714B09531B37BCA1E09B6AE|/"],
  "stars595": ["ed2k://|file|www.98T.la@stars-595_restored.mp4|9903733413|0E2A02BAEA5A3AE98D628450BD283099|/"],
  "stars636": ["ed2k://|file|www.98T.la@[LTX]stars-636_restored（新水印）.mp4|7041504080|F7ED732963F3330AB1C2EBF47E7F335C|/"],
  "stars641": ["ed2k://|file|www.98T.la@[LTX]stars-641_restored（有水印）.mp4|6756900037|4209479873CFBD5096118B8809660A98|/"],
  "stars678": ["ed2k://|file|www.98T.la@STARS-678_restored_wm.mp4|12972507571|264682616ADE5478D606B0FE44792ACF|/"],
  "stars734": ["ed2k://|file|www.98T.la@STARS-734.restored.mp4|10435576750|A596E9F9CBA27C8493606597E30B52B4|/"],
  "stars766": ["ed2k://|file|www.98t.la@STARS-766_restored.mp4|7642961466|D1A0B674423F89CBE6D946AF1B2AC2CA|/"],
  "stars804": ["ed2k://|file|www.98T.la@STARS-804_Jasna-LTX.mp4|9859887891|47056FF77DF032C2A5DF3355F4E9D0F3|/"],
  "stars818": ["ed2k://|file|www.98T.la@ STARS-818 美巨乳で無自覚に男子生徒を挑発してしまう天然な神木先生は成績が全然上がらない僕を心配して勉強だけじゃなくチ○ポの面倒も見てくれる女神様だった…！ 神木麗_restored_wm.mp4|8024416971|903F1F88400721D4566B247ACA4A7347|/"],
  "stars896": ["ed2k://|file|www.98T.la@STARS-896.restored.mp4|11191751001|9F8D0D4437F3A9125A15A216CA4FF492|/"],
  "stars923": ["ed2k://|file|www.98T.la@stars-923_restored_wm.mp4|9654993191|D457D34826DAE7834ADB73D18186C37D|/"],
  "stars927": ["ed2k://|file|STARS-927-4K-破解.mp4|8567039801|B57D58875D114CFB142D5D9168AC4984|/"],
  "stars947": ["ed2k://|file|www.98T.la@STARS-947_restored_LTX.mp4|8621493793|50A91F37B6657017E941E880E0AD61A5|/", "ed2k://|file|STARS-947-LTX 无水印【2024-01-23】经营民宿的美丽人妻被欲求不满的住客挑逗陷入NTR性爱 瞒着丈夫沉溺其中疯狂交欢的3天4夜 神木丽.mkv|10309400590|26780064E37259178AD3CDCA105EC379|/"],
  "stars964": ["ed2k://|file|www.98T.la@STARS-964.restored.mp4|7225028774|5F4FB4A611C6F32D3DB04494FDD34B66|/"],
  "stars969": ["ed2k://|file|www.98T.la@[LTX]stars-969_restored（新水印）.mp4|6997918960|A2C42EF602132BE1BF67F6DCD531902A|/"],
  "stars979": ["ed2k://|file|www.98T.la@stars-979_restored .mp4|5428438964|26287F425F80526A083275DB1A74D551|/"],
  "stars993": ["ed2k://|file|STARS-993.H265_restored_wm.mp4|2530850324|1A4964DB7E4DB1640D32047BDA4CE2D1|/"],
  "start006": ["ed2k://|file|www.98T.la@start-006.restored_apo8_prob3.mp4|26096203886|C061BDE8C2D7616285F5E931C606DA63|/"],
  "start070": ["ed2k://|file|www.98T.la@START-070_restored_LTX.mp4|8641252054|7DA9358D489A94F456754302F583A614|/"],
  "start164": ["ed2k://|file|START-164-C_restored.mp4|4149508084|600F84149BAEE450D732C0D9DF1410E1|/"],
  "start169": ["ed2k://|file|www.98T.la@START-169 身体被体液浸透而愉悦至极的绝妙身躯 品味汗水、爱液、唾液等所有神木汁液的 神木丽_restored_wm.mp4|8413213752|293E2F594B0860050859BC6BE6570669|/"],
  "start255": ["ed2k://|file|www.98T.la@START-255.restored.mp4|9594171588|7FB8A54BC2D4B29D30ED468B3F85F05D|/"],
  "start267": ["ed2k://|file|START-267_restored.mp4|6327472155|F965346D99E29DBB0ECBCD2F822C1C82|/"],
  "start315": ["ed2k://|file|【彩月七緒】START-315-U-LTX.mp4|3477265685|9B6793340D804FF7C993302E4C4DE620|/", "ed2k://|file|START-315_[4K]_LTXrestored.mp4|17595902166|05BD73F98F01C6CC1D9AD0A07DCC97D6|/"],
  "start326": ["ed2k://|file|www.98T.la@START-326_restored_LTX.mp4|8318849925|B9F675EF9311530438EFC3EE7582EECC|/", "ed2k://|file|www.98T.la@START-326_4K.restored.mp4|23580076720|831074A3D00D0B70ED536228BFD5FD79|/"],
  "start339": ["ed2k://|file|start-339-U-LTX.mp4|6758183520|05A165571702EE4AB99FF783D4D0A8C4|/"],
  "start404": ["ed2k://|file|www.98T.la@START-404_restored_LTX.mp4|6378290258|F15F4E650E31C3A041D77C8A7ECE1D62|/"],
  "start442": ["ed2k://|file|START-442_LTX.mp4|10442612618|2D9859C308C223099C3CECD339AF8312|/"],
  "start447": ["ed2k://|file|START-447 Spasm Hypnosis. Mutation. Breakdown. Awakening. Hyper-Sensitive Cervix - Aozora Hikari.restored.mp4|8862315041|6EB64656247D874CB94B5E47EE1401FA|/"],
  "start463": ["ed2k://|file|www.98t.la@START-463_restored_wm.mp4|9298877897|7FA0ABD580476DCCDAE4CA0190826DD5|/"],
  "start473": ["ed2k://|file|www.98T.la@START-473_restored_wm.mp4|8548235394|E1DEE3243885386D81BD9169ED6F0D5B|/"],
  "start477": ["ed2k://|file|hhd800.com@1start00477hhb_restored.mp4|8161038360|A14F826B6BAFF9D805010D8C07422BA3|h=K443SPK32B6Z2NQIIYX5Q2NBBDN6OSZU|/"],
  "start498": ["ed2k://|file|www.98T.la@START-498-U-LTX.mp4|14758971579|4104B5C4478A137626E37CC0A6737F6B|h=G7L3DREHYBH6VKKOKF3BOMJRN6G544ZG|/"],
  "start536": ["ed2k://|file|www.98T.la@START-536_restored_wm.mp4|8801244925|9705A13B506B172AEBA4C60ADCDD9975|h=674DA7Y7DYLALBXCC7VV4CNEJRBLMVOA|/"],
  "start542": ["ed2k://|file|www.98T.la@START-542_restored_wm.mp4|7920885174|6FB2232C7425905CFEB937367490A9F2|/"],
  "start596": ["ed2k://|file|www.98T.la@START-596_restored_wm.mp4|8196784904|9122E40740912DF66ABF7DEB19049395|/"],
  "start636": ["ed2k://|file|www.98T.la@START-636-U-LTX.mp4|7078858752|69017821BDF62C1303A2FC925FC74E1B|h=MC4LQYN5VLGP5PPXZUGEHSJDP7KT44DK|/"],
  "start640": ["ed2k://|file|START-640.mp4|3092539780|498824EE631F7742CA792A0CB8E17F74|/"],
  "start649": ["ed2k://|file|www.98T.la@START-649_restored_apo8_iris2.mp4|22632174288|0A967654F09EDF4DE2CED2F7CBB3B6C8|/"],
  "start651": ["ed2k://|file|www.98T.la@START-651_restored_wm.mp4|7250256488|0CC708E840718C38B75753C1C3BBD03E|/"],
  "start658": ["ed2k://|file|www.98T.la@START-658_restored_wm.mp4|9862470467|36E480618AE9101A067AEDD4F0B62B6E|/"],
  "start660": ["ed2k://|file|www.98T.la@START-660_LTX.mp4|7657610172|C5EE82547903963C57B65AE9FC637A5D|/"],
  "suji252": ["ed2k://|file|www.98T.la@SUJI-252_restored_wm.mp4|6743433588|98072B0C47F90BE977D1139CEDAF3AE8|/"],
  "supd115": ["ed2k://|file|www.98T.la@SUPD-115_restored_wm.mp4|13482683340|007851780305BD0C5582FC6EEAD73128|/"],
  "svdvd391": ["ed2k://|file|www.98T.la@SVDVD-391_restored水印.mp4|7376492197|93EE27A17863EC5FF6E0D99B18A0AE11|/"],
  "sw1007": ["ed2k://|file|www.98T.la@SW-1007_restored.mp4|12561537037|51E8C6AB901F653817F7E158C4F6F0C6|/"],
  "sw1072": ["ed2k://|file|SW-1072-ltx.mp4|5063534451|FA955C29058EA77DB921EFE121572E6E|/"],
  "sybi001": ["ed2k://|file|SYBI-001(1sybi00001)[SOD]寝ている隙にコッソリと…白川ゆず（18）_LTX.mp4|2708102047|932BE7CB7998A7A54E93E910204E9736|/"],
  "taak010": ["ed2k://|file|www.98T.la@TAAK-010_restored.mp4|8394868575|66F73BE939CF691DCD3757D5114F3BA0|/"],
  "taak017": ["ed2k://|file|www.98T.la@TAAK-017_restored.mp4|9462250598|C0FBEB1FF93A3EC9FC786B7A8CFB0630|/"],
  "taak021": ["ed2k://|file|www.98T.la@TAAK-021_restored.mp4|8775312590|50A854175C5BF56397D88A4A9A95BDFF|/"],
  "team058": ["ed2k://|file|www.98T.la@TEAM-058.mp4|4768059060|517484A26B158D4001E9115337ADAD15|/"],
  "tek077": ["ed2k://|file|www.98T.la@TEK-077-U-LTX.mp4|5969550770|65DCC033DD5DC603F1CE64B48BC476A8|h=L77FHUQO5J6QEGSGW7HAUGKJW2XYCRGS|/"],
  "tek083": ["ed2k://|file|www.98T.la@TEK-083-U-LTX.mp4|7695788270|8365DAD0213CF47E5A0A10B2A3A2D809|h=IGSL2JVZOSYR6L6XIMHEPPOKZSXJPEK6|/"],
  "tek089": ["ed2k://|file|www.98T.la@TEK-089_wm.mp4|10693283853|7E9324A1CA6AD6499FB5FCE4E6E0D602|/"],
  "tek097": ["ed2k://|file|www.98T.la@TEK-097_LTX.mp4|15507558956|873B346B1D0D38A32347EFED0E882F95|/"],
  "tek102": ["ed2k://|file|www.98T.la@TEK-102-U_prob4.mp4|25369029267|BD022554002212598E658E5562ED70DC|/"],
  "tem009": ["ed2k://|file|TEM-009_LTX.mp4|4158537583|A599E73ED2C24908E3FAD133561D7842|/"],
  "tikb203": ["ed2k://|file|TIKB-203-LTX.mp4|7015756204|D4184DB57D8EACF6535088981AAF7BF6|/"],
  "tppn031": ["ed2k://|file|TPPN-031_jasna5-unet4_4K__无水印原版勿删.mp4|27872824686|E1C01BA4226937BE5EF08EABF2774E7B|/"],
  "tue130": ["ed2k://|file|TUE-130_restored.mp4|7978706348|40B8A87E2260A22F8963F4C6A540FA20|/"],
  "ufd068": ["ed2k://|file|www.98T.la@UFD-068_restored_wm.mp4|7625051339|3ABFB3C7C024CA62F903A1C23697677A|/"],
  "vdd069": ["ed2k://|file|www.98T.la@vdd-069-1K-ltx.mp4|5530953563|B5BF2EE1D01D0EBF57B0007309FA0AE3|/", "ed2k://|file|vdd-069-720p__无水印原版勿删.mp4|9069789005|64DFB244302AFF829E0A8A8D05EC7175|/"],
  "vdd123": ["ed2k://|file|WWW.98T.LA@VDD-123_restored.mp4|7379340548|DD2301B750F41A0F9703FB4337DBC622|/"],
  "vdd164": ["ed2k://|file|www.98T.la@VDD-164_restored.mp4|5139140608|CE8B809A76D97F72E6566ED32F740115|/"],
  "vdd167": ["ed2k://|file|www.98T.la@VDD-167_LTX.mp4|7510595760|F61ED7692F07DB2BE83B31759BDEEE4B|/"],
  "vdd183": ["ed2k://|file|VDD-183_LTX.mp4|5434278280|C53315B0763FB738526366109C38584B|h=W76JTZX67N2OVHW2OGLJNGMAVDDYWW5G|/"],
  "venu348": ["ed2k://|file|www.98t.la@VENU-348 幻母 禁忌母子交换 ～贞淑母子对淫乱母子，色情狂热的双内射交合～ 三浦恵理子 佐藤美紀_LTX.mp4|5778705740|CFDC282A9D577F0CADF85399CC62458E|/"],
  "vicd346": ["ed2k://|file|www.98T.la@vicd346._restored.mp4|8727421122|E3C1471A12BE4D8092264B9F308B2929|/"],
  "voss090": ["ed2k://|file|www.98T.la@VOSS-090_restored_wm.mp4|5911139390|7D84F978875D0CDD394199FC51D1C4D5|/"],
  "voss173": ["ed2k://|file|WWW.98T.LA@VOSS-173.mp4|10775487871|1A6DB3C7C729EEF5204844E347E395D3|/"],
  "vrtm091": ["ed2k://|file|www.98T.la@VRTM-091_restored_wm.mp4|8019707684|9ADDC744F96322996B0243A85A8FDD3A|/"],
  "wa597": ["ed2k://|file|WA-597_jasna5-unet4__无水印原版勿删.mp4|14170358137|28ED7A3843F193579437018D83237407|/"],
  "waaa031": ["ed2k://|file|WAAA-031_restored.mp4|3257073254|B13E379245D62A448F1B6E23B837DAB2|/"],
  "waaa067": ["ed2k://|file|www.98T.la@WAAA-067_restored_LTX.mp4|8058955176|E0F235F64178F5B3F1392178BB75A1FB|/"],
  "waaa087": ["ed2k://|file|www.98T.la@WAAA-087_restored.mp4|9656802366|CB2577402C0547C225D22FE8EBC8ED6A|/"],
  "waaa112": ["ed2k://|file|www.98T.la@waaa-112_restored_wm.mp4|7338382965|383F5894D7D0E43C069E8599F92DABDF|/"],
  "waaa135": ["ed2k://|file|www.98T.la@waaa-135_restored_ja_ltx.mp4|4961628359|685EFA9F16A83660A891F748CFF9D0F3|/"],
  "waaa192": ["ed2k://|file|WAAA-192-LTX.mp4|8266212382|6BBC5B2475993EA025FBCF07F68AA9D7|/", "ed2k://|file|WAAA-192-A.mp4|6645771763|3352841526F5C4A196081EB91FDE158C|/"],
  "waaa215": ["ed2k://|file|www.98T.la@WAAA-215_restored-LTX.mp4|9337949226|D5EB19B286A69A26139BC2C560DD9CA7|/"],
  "waaa252": ["ed2k://|file|WAAA-252-LTX【2023-04-04】（佐山爱）アナル鬼クンニで屈辱アクメ！！ デカ尻肉便器 ケツ穴が敏感すぎて舐められただけでイキ狂うメス教師 佐山愛.mp4|3015770472|77623BB74F72DB1E0E3CF293C998BAF9|/", "ed2k://|file|www.98T.la@waaa-252-LTX.mp4|7456827233|D4A6F47F88F1DB2FFDB1F65FA1E6C63A|/"],
  "waaa288": ["ed2k://|file|www.98T.la@ WAAA-288 無防備な爆弾パンスト尻に我慢できず、女上司に暴走バック中出ししてしまった僕 佐山愛_restored_wm.mp4|7660346530|D65892DC9F8D0B3918DE7F3E1592C1AB|/"],
  "waaa317": ["ed2k://|file|WAAA-317_restored.mp4|7281792176|09846FB2CA3922C45FE1CEFC00236EAA|h=D4J33IUBTO5FT27T6NBVQRIRUQDKWA7H|/"],
  "waaa374": ["ed2k://|file|WAAA-374✈️ 無防備な爆弾パンスト尻に我慢できず、女上司に暴走バック中出ししてしまった僕 橘メアリー.mp4|5392991627|2258036DBC53A92DF14C76E02FB46DB7|/"],
  "waaa405": ["ed2k://|file|www.98T.la@waaa-405_restored_wm.mp4|7429303680|3F5445F7746C3FBE2241D535E0F5EA85|/"],
  "waaa407": ["ed2k://|file|www.98T.la@WAAA-407 极致性感的丝袜美腿-森日向子_restored_wm.mp4|8697936748|27B98D0CA35F595A1E7571E0E1D2FB74|/"],
  "waaa440": ["ed2k://|file|WWW.98T.LA@WAAA-440_restored.mp4|7287375515|87EB9CF03F812119802C6224E307DCA0|/"],
  "waaa484": ["ed2k://|file|www.98t.la@waaa-484.mp4|12386498614|0955D58F6CDA9AE49219075DB82620A4|/"],
  "waaa528": ["ed2k://|file|www.98T.la@ WAAA-528 悩殺パンスト美脚で甘サド爆ヌキ！ 五日市芽依_restored_wm.mp4|7308866739|A064510FC736CB2B8E053CAA64CC1217|/"],
  "waaa576": ["ed2k://|file|www.98T.la@waaa-576-U_wm.mp4|7585227306|A825101B659AC6B44AD3DF75BB75201A|/"],
  "waaa596": ["ed2k://|file|WAAA-596_restored.mp4|7161894743|5C77390BDFF3FBA74E7194E0DFADC15C|/"],
  "waaa599": ["ed2k://|file|www.98t.la@waaa-599_restored_wm.mp4|6434237024|720051D00055E5A08E6AAE29CB5DB169|/"],
  "waaa634": ["ed2k://|file|www.98T.la@waaa-634_restored_wm.mp4|7576896588|D17A72F9BBF7908AA1F8F7F47978E5EC|/"],
  "waaa636": ["ed2k://|file|WAAA-636_restored.mp4|5548206529|A606A687389F2B6435B468CAAEA5C09E|/"],
  "waaa653": ["ed2k://|file|WAAA-653-C-wz_pj.mp4|4432031747|ED0411F32DF632AEC744E701E3949EBE|/"],
  "waaa661": ["ed2k://|file|www.98T.la@WAAA-661_restored.mp4|8588649242|6c35e9173d433334de57b09beb8f66f1|/"],
  "waaa682": ["ed2k://|file|www.98T.la@WAAA-682_restored.mp4|5991683436|5D1DE1834566EBA6C2EAD9FFF95C8F31|/"],
  "waaa696": ["ed2k://|file|www.98T.la@WAAA-696_restored_wm.mp4|7463171472|5D268C192A25E02D3986B0671FB696AC|/"],
  "waaa697": ["ed2k://|file|www.98T.la@WAAA-697_restored.mp4|7392861080|D5D73B89E79D5F846A709986021FBF3D|/"],
  "wanz059": ["ed2k://|file|www.98T.la@WANZ-059-LTX_wm..mp4|7289967406|EE2C2D9F1582AC341DFEAB25B531175C|/"],
  "wanz161": ["ed2k://|file|www.98T.la@WANZ-161_restored水印.mp4|4455430258|72396EFB5CFD103A916B8194F8B42D54|/"],
  "wanz265": ["ed2k://|file|WANZ-265-LTX【2014-12-01】(沖田杏梨)性感內衣 沖田杏梨.mp4|2917465181|3943CA4212FD90A171ED6D7809FF2819|/"],
  "wanz314": ["ed2k://|file|www.98T.la@WANZ-314_LTX restored.mp4|7098415350|F28713DD7AE87F7A45424A22837698EE|/"],
  "wanz361": ["ed2k://|file|WANZ-361-R.mp4|4800541685|FD9B7F268C701D117C333CB2F089DF7A|/"],
  "wanz417": ["ed2k://|file|www.98T.la@WANZ-417_restored.mp4|8766248676|553F8C7B283E27320308B84E9C170AB7|h=R6EGS2RHKXFIYVJKWAFQK7VPRG6INHN7|/"],
  "wanz458": ["ed2k://|file|www.98T.la@WANZ-458_U-LTX.mp4|7338030054|2AD28E3A191FD5910D1A840B706F90BE|/"],
  "wanz796": ["ed2k://|file|www.98T.la@wanz-796-u_wm.mp4|7267887887|9A0D3AC2F747AB6D0CBC5C23B6310F0F|/"],
  "wanz940": ["ed2k://|file|www.98T.la@WANZ-940_restored_wm.mp4|7110739838|981A13C38DB80E5E4F7571B0F57C350D|/"],
  "wfr002": ["ed2k://|file|www.98T.la@WFR-002 (wfr00002) [Waap] 涎ダッラダラ喉奥クチ便器佐々木あき_restored.mp4|3357086855|24697DCDEA70DC77E3425978800F00C1|/"],
  "wsa001": ["ed2k://|file|www.98T.la@WSA-001_wm.mp4|8498631285|7827587C0A3A6911E5B69255BF8D51A8|/"],
  "wss229": ["ed2k://|file|WSS-229【2013-04-05】（ 青山菜々）对不起，我真的很喜欢你的女朋友.mp4|4684634336|EAFD5AC76BBCC40CF7B8118C81FF7E46|/"],
  "xrw139": ["ed2k://|file|XRW-139 金粉女神 上原亜衣.mp4|6965311554|BFF786103AFD353D450B4DC347B81DE6|/"],
  "xrw609": ["ed2k://|file|XRW-609-LTX【2018-12-14】(羽生アリサ)一同出張巨乳人妻上司泡進溫泉就變淫亂女 羽生亞里沙.mp4|4568489604|8C82D4A793D984D1A9493118D0303915|/"],
  "xv1093": ["ed2k://|file|www.98T.la@XV-1093_restored_wm.mp4|7410393325|BE2196E9B7F2748C17AEB73A688CDE6E|/"],
  "xv1196": ["ed2k://|file|XV-1196.restored.mp4|7107561452|99505C40A9D483D2BE60254351BC4854|/"],
  "xv1220": ["ed2k://|file|XV-1220A.restored.mp4|6706091613|487855593CBC51E1F0AB1244B71CA2CD|/"],
  "xv141": ["ed2k://|file|www.98t.la@XV-141 Lovers 高樹マリア(高树玛丽亚)_LTX.mp4|3621953610|A5A94821791B56A38B5E11C46A4974E5|/"],
  "xv463": ["ed2k://|file|XV-463_restored.mp4|2159289889|01FEE0ADEEFB246E76799F569EE793B3|/"],
  "xv569": ["ed2k://|file|【長瀬茜】XV-569 - [有码][480P]-U-LTX.mp4|2421847775|E207B792909ACEAC195DC3FEF8D5F0DB|/"],
  "xvsr066": ["ed2k://|file|www.98T.la@ XVSR-066_restored_LTX_wm.mp4|7269109097|B11C642E771A4727F5F31CBFE604C7BA|/"],
  "xvsr077": ["ed2k://|file|XVSR-077_LTX.mp4|5576202796|148BCE77BDD3655ED5C198DFD905DC61|/"],
  "xvsr329": ["ed2k://|file|XVSR-329 アナタの自宅がソープランドに早変わり！！美少女限定 宅配中出しソープ 三原ほのか.三原穗花.泡姬.4k.x265.无码破解-LTX.mp4|9188211396|6C44C7428E0FBD89FDE751E644F3E707|/"],
  "xvsr807": ["ed2k://|file|www.98T.la@XVSR-807-ltx.mp4|6562406867|7DFF7BF0FA81133C7B6D264DACC0548E|/"],
  "ymds150": ["ed2k://|file|YMDS-150-LTX【2024-03-05】(吉根ゆりあ)いちゃラブ密着特濃せっくちゅ 憧れの吉根ゆりあを独占した一夜。.mp4|3533049132|41222A3B9883B98828588AF6EBE1C507|/"],
  "yyds001": ["ed2k://|file|YYDS-001_ltx restored.mp4|1848622491|825FD874172F640BFD230A3E6D8D8466|/"]
};
const SCOPE_WORDS = {
  有码: "censored",
  有碼: "censored",
  骑兵: "censored",
  騎兵: "censored",
  censored: "censored",
  马赛克: "censored",
  馬賽克: "censored",
  无码: "uncensored",
  無碼: "uncensored",
  步兵: "uncensored",
  无修正: "uncensored",
  無修正: "uncensored",
  uncensored: "uncensored",
  fc2: "fc2"
};
const SCOPE_LABEL = {
  censored: "有码",
  uncensored: "无码",
  fc2: "FC2"
};
const REROLL_WORDS =  new Set(["换一个", "换", "再来", "重来", "reroll", "r"]);
const HELP_WORDS =  new Set(["帮助", "help", "?", "？", "-h", "--help"]);
const IGNORED_WORDS =  new Set(["全部", "all", "随便", "随机"]);
function isHelpWord(word) {
  return HELP_WORDS.has(word.trim().replace(/^#+/, "").toLowerCase());
}
function normCode(code) {
  let out = (code ?? "").replace(/[-_\s]/g, "").toLowerCase();
  if (out.startsWith("fc2ppv")) {
    out = `fc2${out.slice(6)}`;
  }
  return out;
}
function matchCategory(word, library) {
  const target = word.toLowerCase();
  let fallback = null;
  for (const category of library.categories.values()) {
    const names = [category.name, category.raw, ...category.aliases ?? []];
    for (const name of names) {
      if (!name) {
        continue;
      }
      const low = name.toLowerCase();
      if (target === low) {
        return category.name;
      }
      if (fallback === null && (low.includes(target) || target.includes(low))) {
        fallback = category.name;
      }
    }
  }
  return fallback;
}
function parseArgs(parts, library) {
  const args = { scope: null, year: null, tags: [], reroll: false, unknown: [] };
  for (const raw of parts) {
    const word = raw.trim().replace(/^#+/, "").toLowerCase();
    if (!word) {
      continue;
    }
    if (REROLL_WORDS.has(word)) {
      args.reroll = true;
      continue;
    }
    if (/^(?:19|20)\d{2}$/.test(word)) {
      args.year = Number.parseInt(word, 10);
      continue;
    }
    if (SCOPE_WORDS[word]) {
      args.scope = SCOPE_WORDS[word];
      continue;
    }
    if (IGNORED_WORDS.has(word)) {
      continue;
    }
    const category = matchCategory(word, library);
    if (category) {
      args.tags.push(category);
    } else {
      args.unknown.push(raw.trim().replace(/^#+/, ""));
    }
  }
  return args;
}
function findVideos(library, word, limit = 5) {
  const target = normCode(word);
  let hits = library.videos.filter((video) => normCode(video.code) === target);
  if (hits.length === 0) {
    hits = library.videos.filter((video) => target !== "" && normCode(video.code).includes(target));
  }
  if (hits.length === 0 && target.length >= 2) {
    hits = library.videos.filter((video) => (video.actorLinks ?? []).some((actor) => (actor.name ?? "").toLowerCase().includes(target)));
  }
  return hits.sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).slice(0, limit);
}
function hashSeed(text) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}
function createRandom(seed) {
  let state = seed || 1;
  return () => {
    state ^= state << 13;
    state >>>= 0;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    return state / 4294967296;
  };
}
function weightedPick(pool, random) {
  const low = Math.min(...pool.map((video) => video.score ?? 0));
  const weights = pool.map((video) => Math.max(1, (video.score ?? 0) - low + 60));
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let ticket = random() * total;
  for (let i = 0; i < pool.length; i += 1) {
    ticket -= weights[i];
    if (ticket <= 0) {
      return pool[i];
    }
  }
  return pool[pool.length - 1];
}
function pickVideo(library, options) {
  const { scope, year, tags, reroll, avoid = null, onlyIds = null } = options;
  const minScore = options.minScore ?? 0;
  const pool = library.videos.filter((video) => {
    if (onlyIds && !onlyIds.has(video.videoId)) {
      return false;
    }
    if (scope && video.scope !== scope) {
      return false;
    }
    if (year && video.year !== year) {
      return false;
    }
    if (tags.length > 0 && !tags.every((tag) => video.tags.includes(tag))) {
      return false;
    }
    return (video.score ?? 0) >= minScore;
  });
  if (pool.length === 0) {
    throw new LookupError("没有符合条件的影片");
  }
  const random = options.random ?? (reroll ? Math.random : createRandom(hashSeed([
    options.today ?? ( new Date()).toISOString().slice(0, 10),
    scope ?? "",
    String(year ?? ""),
    [...tags].sort().join(","),
    onlyIds ? "lucky" : "all"
  ].join("|"))));
  let chosen = weightedPick(pool, random);
  if (avoid !== null) {
    for (let i = 0; i < 30 && chosen.videoId === avoid; i += 1) {
      chosen = weightedPick(pool, random);
    }
  }
  return chosen;
}
class LookupError extends Error {
  constructor(message) {
    super(message);
    this.name = "LookupError";
  }
}
function chooseVideo(library, args, options = { useLuckyPool: true }) {
  const { scope, year } = args;
  const tags = [...args.tags];
  const useLucky = options.useLuckyPool && !scope && !year && tags.length === 0;
  const onlyIds = useLucky && library.luckyIds.size > 0 ? library.luckyIds : null;
  const ladder = [
    { tags, year, note: null }
  ];
  const dropped = [];
  const remaining = [...tags];
  while (remaining.length > 0) {
    dropped.unshift(remaining.pop());
    if (remaining.length > 0) {
      ladder.push({
        tags: [...remaining],
        year,
        note: `加上「${dropped.join("、")}」就没货了，只按「${remaining.join("、")}」筛`
      });
    } else {
      ladder.push({
        tags: [],
        year,
        note: `题材「${dropped.join("、")}」没货，已去掉题材条件`
      });
    }
  }
  if (year) {
    ladder.push({ tags: [], year: null, note: `${year} 年的没货，已放宽到全部年份` });
  }
  for (const step of ladder) {
    try {
      const video = pickVideo(library, {
        scope,
        year: step.year,
        tags: step.tags,
        reroll: args.reroll,
        avoid: options.avoid ?? null,
        onlyIds,
        minScore: options.minScore,
        today: options.today
      });
      return { video, note: step.note };
    } catch (e) {
      if (!(e instanceof LookupError)) {
        throw e;
      }
    }
  }
  throw new LookupError("没有符合条件的影片");
}
const BASE$1 = "https://javranking.cc";
const LOCALE$1 = "zh-hans";
const STOCK_HOST = "javranking.cc";
const MAX_CAPTION = 1024;
const MAX_SYNOPSIS = 110;
function escapeHtml(text) {
  return (text ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function clean(text) {
  return escapeHtml(text).replace(/\s+/g, " ").trim();
}
function synopsisLine(text, limit = MAX_SYNOPSIS) {
  const flat = clean(text);
  if (flat.length <= limit) {
    return flat;
  }
  let kept = "";
  for (const sentence of flat.match(/[^。！？!?]+[。！？!?]?/g) ?? []) {
    if (kept.length + sentence.length > limit) {
      break;
    }
    kept += sentence;
  }
  return `${(kept.trim() || flat.slice(0, limit - 1)).trim()}…`;
}
function actors(video, maxActors) {
  const links = video.actorLinks ?? [];
  const female = links.filter((actor) => actor.gender === "female");
  const picked = female.length > 0 ? female : links;
  return picked.slice(0, maxActors).map((actor) => clean(actor.name));
}
function renderCard(video, detail, durations, options, note) {
  const minutes = detail.duration ?? durations.get(video.videoId);
  const lines = [
    `🎬 今天冲哪个 · ${( new Date()).toISOString().slice(0, 10)}`,
    "",
    `${clean(video.code)}｜${clean(video.title)}`
  ];
  if (note) {
    lines.push(`⚠️ ${clean(note)}`);
  }
  if (options.synopsis) {
    lines.push("", `📖 ${synopsisLine(options.synopsis)}`);
  }
  const people = actors(video, options.maxActors);
  if (people.length > 0) {
    lines.push("", `👤 ${people.join(" / ")}`);
  }
  const stats = [];
  if (video.score) {
    stats.push(`💪 战力 ${video.score} 分${video.rank ? `（全站 #${video.rank}）` : ""}`);
  }
  if (video.rating) {
    stats.push(`⭐ ${video.rating} 分${video.ratingCount ? `（${video.ratingCount.toLocaleString("en-US")} 人评价）` : ""}`);
  }
  if (stats.length > 0) {
    lines.push(stats.join(" ｜ "));
  }
  for (const appearance of (video.rankingAppearances ?? []).slice(0, 3)) {
    const year = appearance.year && !String(appearance.name).includes(String(appearance.year)) ? ` ${appearance.year}` : "";
    lines.push(`🏆 ${clean(appearance.name)}${year} #${appearance.position}`);
  }
  const meta = [];
  if (minutes) {
    meta.push(`⏱ ${minutes} 分钟`);
  }
  const scopeText = SCOPE_LABEL[video.scope ?? ""] || clean(video.scope) || "?";
  meta.push(`🏷 ${scopeText}`);
  if (video.releaseDate) {
    meta.push(`📅 ${clean(video.releaseDate)}`);
  }
  lines.push(meta.join(" ｜ "));
  if (video.tags.length > 0) {
    lines.push(`🔖 ${video.tags.slice(0, options.maxTags).map((tag) => clean(tag)).join(" / ")}`);
  }
  const url = `${BASE$1}/${LOCALE$1}/videos/${video.videoId}/`;
  lines.push("", `<a href="${url}">🎬 在线观看 / 磁力</a>`);
  return lines.join("\n");
}
function coverCandidates(video, detail) {
  const raw = [
    video.coverUrl,
    `https://static.${STOCK_HOST}/video/cover/${video.videoId}.webp`,
    `https://static.${STOCK_HOST}/video/og/${video.videoId}.webp`,
    detail.cover,
    detail.shot
  ];
  const out = [];
  for (const url of raw) {
    const fixed = url && url.startsWith("http") && url.includes(`${STOCK_HOST}/video/cover/`) ? url.replace(`${STOCK_HOST}/video/cover/`, `static.${STOCK_HOST}/video/cover/`) : url;
    if (fixed && fixed.startsWith("http") && !out.includes(fixed)) {
      out.push(fixed);
    }
  }
  return out;
}
function ltxLinks(code) {
  return LTX_TABLE[normCode(code)] ?? [];
}
function ltxBlock(links) {
  if (links.length === 0) {
    return "";
  }
  const body = links.map((link) => link.includes("`") ? link : `<code>${escapeHtml(link)}</code>`).join("\n");
  return `

📥 LTX 资源（ed2k）
${body}`;
}
function attachLtx(text, links) {
  const block = ltxBlock(links);
  if (!block) {
    return { text, extra: "" };
  }
  if (text.length + block.length <= MAX_CAPTION) {
    return { text: text + block, extra: "" };
  }
  return { text, extra: block.trim() };
}
const BASE = "https://javranking.cc";
const LOCALE = "zh-hans";
const AIRAV_PAGE = "https://airav.io/cn/video?jid=";
const BROWSER_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "zh-CN,zh;q=0.9"
};
class CloudflareBlockedError extends Error {
  constructor(detail = "") {
    super(`数据源被 Cloudflare 拦截${detail ? ` (${detail})` : ""}`);
    this.name = "CloudflareBlockedError";
  }
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
let lastRequestAt = 0;
async function throttle() {
  const wait = lastRequestAt + ENV.AV_REQUEST_DELAY - Date.now();
  if (wait > 0) {
    await sleep(wait);
  }
  lastRequestAt = Date.now();
}
function isChallenge(body) {
  const head = body.slice(0, 2048).toLowerCase();
  return head.includes("just a moment") || head.includes("challenges.cloudflare.com") || head.includes("请稍候");
}
async function request(url, tries = 3) {
  let lastError = null;
  for (let i = 0; i < tries; i += 1) {
    await throttle();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ENV.AV_TIMEOUT * 1e3);
    try {
      const resp = await fetch(url, { headers: BROWSER_HEADERS, signal: controller.signal });
      if (resp.ok) {
        return resp;
      }
      if (resp.status === 403 || resp.status === 429 || resp.status === 503) {
        lastError = new CloudflareBlockedError(`HTTP ${resp.status}`);
      } else {
        lastError = new Error(`HTTP ${resp.status}`);
      }
    } catch (e) {
      lastError = e instanceof Error && e.name === "AbortError" ? new Error("请求超时") : e;
    } finally {
      clearTimeout(timer);
    }
    if (i < tries - 1) {
      await sleep(600 * (i + 1));
    }
  }
  if (lastError instanceof CloudflareBlockedError) {
    throw lastError;
  }
  const detail = lastError instanceof Error ? lastError.message : String(lastError);
  throw new Error(`请求失败: ${url} (${detail})`);
}
async function getText(url, tries = 3) {
  const resp = await request(url, tries);
  const text = await resp.text();
  if (isChallenge(text)) {
    throw new CloudflareBlockedError();
  }
  return text;
}
async function getJson(url, tries = 3) {
  return JSON.parse(await getText(url, tries));
}
async function loadLibrary() {
  const data = await getJson(`${BASE}/${LOCALE}/filter-index.json`);
  const categories =  new Map();
  const categoryName =  new Map();
  for (const category of data.categories) {
    categories.set(category.id, category);
    categoryName.set(category.id, category.name);
  }
  const ranks =  new Map();
  try {
    const search = await getJson(`${BASE}/${LOCALE}/search-index.json`);
    for (const video of search.videos) {
      ranks.set(video.videoId, { rank: video.rank, appearances: video.rankingAppearances ?? [] });
    }
  } catch (e) {
    console.error("[av] 榜单名次合并失败, 将不显示战绩:", e);
  }
  const videos = [];
  for (const raw of data.videos) {
    if (!raw.coverUrl) {
      continue;
    }
    const meta = ranks.get(raw.videoId);
    videos.push({
      ...raw,
      tags: (raw.categoryIds ?? []).map((id) => categoryName.get(id)).filter((name) => Boolean(name)),
      rank: meta?.rank ?? null,
      rankingAppearances: meta?.appearances ?? []
    });
  }
  const years = [...new Set(videos.map((v) => v.year).filter((y) => typeof y === "number"))].sort((a, b) => b - a);
  return { videos, categories, years, luckyIds:  new Set(), durations:  new Map() };
}
async function fillLuckyPool(library) {
  try {
    const html = await getText(`${BASE}/${LOCALE}/pick/`);
    const matched = html.match(/<script type="application\/json" id="lucky-data">([\s\S]*?)<\/script>/);
    if (!matched) {
      return library;
    }
    const data = JSON.parse(matched[1]);
    const ids =  new Set();
    const durations =  new Map();
    for (const [key, value] of Object.entries(data.videos ?? {})) {
      const id = Number.parseInt(key, 10);
      if (!Number.isFinite(id)) {
        continue;
      }
      ids.add(id);
      if (value?.durationMinutes) {
        durations.set(id, value.durationMinutes);
      }
    }
    library.luckyIds = ids;
    library.durations = durations;
  } catch (e) {
    console.error("[av] 精选池拉取失败, 默认推荐退化为全库:", e);
  }
  return library;
}
function parseIsoDuration(value) {
  if (!value) {
    return void 0;
  }
  const matched = value.match(/^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!matched) {
    return void 0;
  }
  const [, day, hour, minute, second] = matched;
  const total = Number(day ?? 0) * 1440 + Number(hour ?? 0) * 60 + Number(minute ?? 0) + Math.round(Number(second ?? 0) / 60);
  return total > 0 ? total : void 0;
}
async function fetchDetail(videoId) {
  try {
    const html = await getText(`${BASE}/${LOCALE}/videos/${videoId}/`);
    const detail = {};
    const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    if (ld) {
      try {
        const json = JSON.parse(ld[1]);
        detail.duration = parseIsoDuration(json.duration);
        detail.cover = Array.isArray(json.image) ? json.image[0] : json.image;
      } catch (e) {
        console.error("[av] 详情页 JSON-LD 解析失败:", e);
      }
    }
    const shots = html.match(/https?:\/\/[^"'\s]+\/samples\/[^"'\s]+\.jpg/g);
    detail.shot = shots?.[0];
    return detail;
  } catch (e) {
    console.error(`[av] 详情页 ${videoId} 没拉到, 这张卡片少几行字:`, e);
    return {};
  }
}
function textOf(fragment) {
  return fragment.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, " ").trim();
}
async function fetchSynopsis(code) {
  try {
    const html = await getText(`${AIRAV_PAGE}${encodeURIComponent(code)}`);
    const titleMatched = html.match(/<h1>([\s\S]*?)<\/h1>/);
    const bodyMatched = html.match(/<p class="my-3">([\s\S]*?)<\/p>/);
    if (!bodyMatched) {
      return null;
    }
    const title = titleMatched ? textOf(titleMatched[1]) : "";
    const text = textOf(bodyMatched[1]);
    return synopsisUsable(title, text) ? text : null;
  } catch (e) {
    console.error(`[av] ${code} 剧情没抓到:`, e);
    return null;
  }
}
function synopsisUsable(title, text, minLength = 40) {
  if (text.length < minLength || title && text.includes(title)) {
    return false;
  }
  return !["破坏版", "破壞版", "破解"].some((word) => title.includes(word));
}
const LAST_PICK =  new Map();
const HELP_TEXT = `🎬 <b>今天冲哪个</b>

不带后缀就是默认推荐(同一天同一条件结果稳定, 跨天自动换):

<code>/av 2026</code> —— 指定年份
<code>/av 无码 2024</code> —— 有码 / 无码 / FC2 + 年份
<code>/av 中出</code> —— 按题材筛(262 个分类, 支持 Creampie 这类别名)
<code>/av 无码 2025 巨乳</code> —— 可叠加
<code>/av MIAB-009</code> —— 番号 / 演员名直查
<code>/av 换一个</code> —— 重抽

条件太窄时(比如无码 + 年份 + 冷门题材)会自动放宽, 并在卡片上标出放宽了哪一项。

数据来源: javranking.cc(战力分 / 榜单战绩 / 题材标签均为站点原始字段)`;
class AvCommandHandler {
  command = "/av";
  scopes = ["all_private_chats", "all_group_chats"];
  handle = async (message, subcommand, context) => {
    const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
    const parts = subcommand.trim().split(/\s+/).filter(Boolean);
    if (parts.some((part) => isHelpWord(part))) {
      return this.sendText(sender, message, HELP_TEXT);
    }
    let library;
    try {
      library = await fillLuckyPool(await loadLibrary());
    } catch (e) {
      if (e instanceof CloudflareBlockedError) {
        return this.sendText(
          sender,
          message,
          "🚧 数据源被 Cloudflare 拦了（数据每次现拉，没有本地快照可用）。\n等一会儿再试，或换个网络环境。"
        );
      }
      console.error("[av] 索引加载失败:", e);
      return this.sendText(sender, message, "📛 片库索引拉取失败，稍后再试。");
    }
    const args = parseArgs(parts, library);
    let video;
    let note = null;
    if (args.unknown.length > 0) {
      const hits = findVideos(library, args.unknown[0]);
      if (hits.length === 0) {
        return this.sendText(sender, message, `🤔 没看懂：${args.unknown.join("、")}
试试 /av 帮助`);
      }
      video = hits[0];
      if (hits.length > 1) {
        note = `「${args.unknown[0]}」匹配到 ${hits.length} 部，给了战力最高的一部`;
      }
    } else {
      const chatId = message.chat.id;
      const avoid = args.reroll ? LAST_PICK.get(chatId) ?? null : null;
      try {
        const result = chooseVideo(library, args, {
          avoid,
          useLuckyPool: ENV.AV_USE_LUCKY_POOL,
          minScore: ENV.AV_MIN_SCORE
        });
        video = result.video;
        note = result.note;
      } catch (e) {
        if (e instanceof LookupError) {
          return this.sendText(sender, message, "🙈 没找到符合条件的影片，换个年份或题材试试。");
        }
        throw e;
      }
    }
    LAST_PICK.set(message.chat.id, video.videoId);
    const detail = await fetchDetail(video.videoId);
    const synopsis = ENV.AV_SYNOPSIS && video.code ? await fetchSynopsis(video.code) : null;
    const card = renderCard(video, detail, library.durations, {
      maxTags: ENV.AV_MAX_TAGS,
      maxActors: ENV.AV_MAX_ACTORS,
      synopsis
    }, note);
    const { text, extra } = attachLtx(card, ltxLinks(video.code));
    let resp = await this.sendCard(sender, message, video, detail, text);
    if (extra) {
      resp = await this.sendText(sender, message, extra);
    }
    if (ENV.AV_DELETE_COMMAND) {
      await sender.api.deleteMessage({ chat_id: message.chat.id, message_id: message.message_id }).catch(() => null);
    }
    return resp;
  };
  async sendCard(sender, message, video, detail, text) {
    const tooLong = text.length > MAX_CAPTION;
    for (const url of coverCandidates(video, detail)) {
      const resp = await sender.sendPhoto(url, {
        caption: tooLong ? void 0 : text,
        parseMode: "HTML",
        hasSpoiler: ENV.AV_SPOILER
      });
      if (resp.ok) {
        return tooLong ? this.sendText(sender, message, text) : resp;
      }
      await resp.text().catch(() => "");
    }
    return this.sendText(sender, message, text);
  }
  sendText(sender, message, text) {
    return sender.sendRawMessage({
      chat_id: message.chat.id,
      message_thread_id: message.message_thread_id,
      text,
      parse_mode: "HTML",
      link_preview_options: { is_disabled: true }
    });
  }
}
class DotAvCommandHandler {
  command = ".av";
  scopes = [];
  handle = new AvCommandHandler().handle;
}
class Stream {
  response;
  controller;
  decoder;
  parser;
  status = {
    done: false,
    finishReason: null
  };
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
    try {
      for await (const sse of this.iterMessages()) {
        if (!sse) {
          continue;
        }
        if (this.status.done) {
          continue;
        }
        const { finish, data } = this.parser(sse);
        if (finish) {
          this.status.done = true;
          return;
        }
        if (data) {
          const finishReason = data?.choices?.at?.(0)?.finish_reason;
          if (typeof finishReason === "string" && finishReason) {
            this.status.finishReason = finishReason;
          }
          yield data;
          if (this.status.finishReason) {
            return;
          }
        }
      }
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError" && this.controller.signal.aborted) {
        return;
      }
      throw e;
    } finally {
      if (!this.status.done && !this.status.finishReason) {
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
    if (typeof TextDecoder !== "undefined") {
      const view = bytes instanceof ArrayBuffer ? new Uint8Array(bytes) : bytes;
      if (!this.textDecoder) {
        this.textDecoder = new TextDecoder("utf8");
      }
      return this.textDecoder.decode(view, { stream: true });
    }
    if (typeof Buffer !== "undefined") {
      return Buffer.from(bytes).toString();
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
  options.activityExtractor = options.activityExtractor || function(d) {
    const choice = d?.choices?.at(0);
    return !!(choice?.delta?.content || choice?.delta?.reasoning_content || choice?.delta?.reasoning || choice?.finish_reason);
  };
  options.finishReasonExtractor = options.finishReasonExtractor || function(d) {
    return d?.choices?.at(0)?.finish_reason || null;
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
const WEBHOOK_LLM_DEADLINE_MS = 4e4;
const POLLING_LLM_DEADLINE_MS = 12e4;
function getChatCompletionTimeoutBudgetMs() {
  const deadlineCap = ENV.IS_POLLING_MODE ? POLLING_LLM_DEADLINE_MS : WEBHOOK_LLM_DEADLINE_MS;
  if (ENV.CHAT_COMPLETE_API_TIMEOUT <= 0) {
    return deadlineCap;
  }
  return Math.max(1e3, Math.min(ENV.CHAT_COMPLETE_API_TIMEOUT * 1e3, deadlineCap));
}
function getChatCompletionDeadlineMs(requestStartedAt = Date.now()) {
  return requestStartedAt + getChatCompletionTimeoutBudgetMs();
}
function remainingDeadlineMs(deadlineMs) {
  return Math.max(0, deadlineMs - Date.now());
}
function getTextFirstContentTimeoutMs() {
  return Math.max(0, ENV.CHAT_FIRST_TOKEN_TIMEOUT * 1e3);
}
function getStreamIdleTimeoutMs() {
  return Math.max(0, ENV.CHAT_STREAM_IDLE_TIMEOUT * 1e3);
}
class FirstTokenTimeoutError extends Error {
  constructor(message = "first content timeout") {
    super(message);
    this.name = "FirstTokenTimeoutError";
  }
}
class StreamIdleTimeoutError extends Error {
  partialResponse;
  partialText;
  constructor(partialText = "") {
    super("LLM stream idle timeout");
    this.name = "StreamIdleTimeoutError";
    this.partialText = partialText;
    this.partialResponse = !!partialText;
  }
}
class IncompleteStreamError extends Error {
  partialResponse;
  partialText;
  constructor(message, partialResponse, partialText = "") {
    super(message);
    this.name = "IncompleteStreamError";
    this.partialResponse = partialResponse;
    this.partialText = partialText;
  }
}
class CompletionLengthError extends Error {
  partialResponse = true;
  partialText;
  constructor(partialText) {
    super("LLM response reached the model token limit and may be incomplete");
    this.name = "CompletionLengthError";
    this.partialText = partialText;
  }
}
function createStreamUpdateState() {
  return {
    contentFull: "",
    lengthDelta: 0,
    updateStep: 50,
    lastUpdateTime: Date.now()
  };
}
async function appendStreamUpdate(state, textPart, onStream) {
  state.lengthDelta += textPart.length;
  state.contentFull += textPart;
  if (state.lengthDelta <= state.updateStep) {
    return;
  }
  if (ENV.TELEGRAM_MIN_STREAM_INTERVAL > 0) {
    const delta = Date.now() - state.lastUpdateTime;
    if (delta < ENV.TELEGRAM_MIN_STREAM_INTERVAL) {
      return;
    }
    state.lastUpdateTime = Date.now();
  }
  state.lengthDelta = 0;
  state.updateStep += 20;
  await onStream?.(`${state.contentFull}
...`);
}
async function streamHandler(stream, contentExtractor, onStream, onActivity) {
  const updateState = createStreamUpdateState();
  for await (const part of stream) {
    onActivity?.(part);
    const textPart = contentExtractor(part);
    if (!textPart) {
      continue;
    }
    await appendStreamUpdate(updateState, textPart, onStream);
  }
  return updateState.contentFull;
}
async function mapResponseToAnswer(resp, controller, options, onStream, onActivity) {
  options = fixOpenAICompatibleOptions(options || null);
  if (onStream && resp.ok && isEventStreamResponse(resp)) {
    const stream = options.streamBuilder?.(resp, controller || new AbortController());
    if (!stream) {
      throw new Error("Stream builder error");
    }
    return streamHandler(stream, options.contentExtractor, onStream, onActivity);
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
  const answer = options.fullContentExtractor?.(result) || "";
  const finishReason = options.finishReasonExtractor?.(result);
  if (finishReason === "length") {
    throw new CompletionLengthError(answer);
  }
  if (finishReason && finishReason !== "stop") {
    throw new IncompleteStreamError(`LLM response stopped with finish reason: ${finishReason}`, !!answer, answer);
  }
  return answer;
}
async function requestChatCompletionsOnce(url, header, body, onStream, options, requestOptions) {
  const controller = new AbortController();
  const { signal } = controller;
  const effectiveOptions = fixOpenAICompatibleOptions({});
  const firstContentTimeoutMs = requestOptions.firstContentTimeoutMs ?? getTextFirstContentTimeoutMs();
  const idleTimeoutMs = requestOptions.idleTimeoutMs ?? getStreamIdleTimeoutMs();
  const deadlineMs = requestOptions.deadlineMs || 0;
  let abortReason = null;
  let streamStarted = false;
  let finishReason = null;
  let streamStatus = null;
  let deadlineTimer = null;
  let activityTimer = null;
  const originalStreamBuilder = effectiveOptions.streamBuilder;
  effectiveOptions.streamBuilder = (resp, streamController) => {
    const stream = originalStreamBuilder(resp, streamController);
    streamStatus = stream.status;
    return stream;
  };
  const abort = (reason) => {
    if (!signal.aborted) {
      abortReason = reason;
      controller.abort();
    }
  };
  const resetActivityTimer = (timeoutMs, reason) => {
    if (activityTimer) {
      clearTimeout(activityTimer);
      activityTimer = null;
    }
    const effectiveTimeoutMs = deadlineMs > 0 ? Math.min(timeoutMs, remainingDeadlineMs(deadlineMs)) : timeoutMs;
    if (effectiveTimeoutMs > 0) {
      const effectiveReason = deadlineMs > 0 && effectiveTimeoutMs < timeoutMs ? "deadline" : reason;
      activityTimer = setTimeout(() => abort(effectiveReason), effectiveTimeoutMs);
    }
  };
  if (deadlineMs > 0) {
    const remainingMs = deadlineMs - Date.now();
    if (remainingMs <= 0) {
      throw new Error("LLM request exceeded the synchronous webhook deadline");
    }
    deadlineTimer = setTimeout(() => abort("deadline"), remainingMs);
  }
  if (onStream && firstContentTimeoutMs > 0) {
    resetActivityTimer(firstContentTimeoutMs, "first-content");
  }
  const onActivity = (data) => {
    const reason = effectiveOptions.finishReasonExtractor?.(data);
    if (reason) {
      finishReason = reason;
    }
    if (!effectiveOptions.activityExtractor?.(data)) {
      return;
    }
    streamStarted = true;
    if (reason) {
      resetActivityTimer(0, "idle");
    } else {
      resetActivityTimer(idleTimeoutMs, "idle");
    }
  };
  let partialText = "";
  const trackingContentExtractor = (data) => {
    const text = effectiveOptions.contentExtractor?.(data) || null;
    if (text) {
      partialText += text;
    }
    return text;
  };
  const mappingOptions = {
    ...effectiveOptions,
    contentExtractor: trackingContentExtractor
  };
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
      if (abortReason === "first-content") {
        throw new FirstTokenTimeoutError();
      }
      if (abortReason === "idle") {
        throw new StreamIdleTimeoutError(partialText);
      }
      if (abortReason === "deadline") {
        throw new IncompleteStreamError("LLM request exceeded the synchronous webhook deadline", !!partialText, partialText);
      }
      throw e;
    }
    if (!resp.ok) {
      const bodyText = await resp.text().catch(() => "");
      if (abortReason === "first-content") {
        throw new FirstTokenTimeoutError();
      }
      if (abortReason === "deadline") {
        throw new IncompleteStreamError("LLM request exceeded the synchronous webhook deadline", false);
      }
      const err = new Error(`LLM API ${resp.status}: ${bodyText.slice(0, 200)}`);
      err.statusCode = resp.status;
      throw err;
    }
    let answer = "";
    try {
      const mappedAnswer = await mapResponseToAnswer(resp, controller, mappingOptions, onStream, onActivity);
      answer = onStream && isEventStreamResponse(resp) ? partialText : mappedAnswer;
    } catch (e) {
      answer = partialText;
      if (abortReason === "first-content") {
        throw new FirstTokenTimeoutError();
      }
      if (abortReason === "idle") {
        throw new StreamIdleTimeoutError(answer);
      }
      if (abortReason === "deadline") {
        throw new IncompleteStreamError("LLM request exceeded the synchronous webhook deadline", !!answer || streamStarted, answer);
      }
      if (answer || streamStarted) {
        const message = e instanceof Error ? `LLM stream interrupted: ${e.message}` : "LLM stream interrupted";
        throw new IncompleteStreamError(message, true, answer);
      }
      throw e;
    }
    if (abortReason === "first-content") {
      throw new FirstTokenTimeoutError();
    }
    if (abortReason === "idle") {
      throw new StreamIdleTimeoutError(answer);
    }
    if (abortReason === "deadline") {
      throw new IncompleteStreamError("LLM request exceeded the synchronous webhook deadline", !!answer || streamStarted, answer);
    }
    if (onStream && isEventStreamResponse(resp)) {
      const completedStreamStatus = streamStatus;
      if (completedStreamStatus?.finishReason && !finishReason) {
        finishReason = completedStreamStatus.finishReason;
      }
      if (finishReason === "length") {
        throw new CompletionLengthError(answer);
      }
      if (finishReason && finishReason !== "stop") {
        throw new IncompleteStreamError(`LLM response stopped with finish reason: ${finishReason}`, !!answer, answer);
      }
      if (finishReason === "stop" || completedStreamStatus?.done) {
        if (!answer.trim()) {
          throw new Error("LLM returned an empty response");
        }
      } else {
        throw new IncompleteStreamError("LLM stream ended before a completion marker", !!answer, answer);
      }
    }
    if (activityTimer) {
      clearTimeout(activityTimer);
      activityTimer = null;
    }
    if (!answer.trim()) {
      throw new Error("LLM returned an empty response");
    }
    return answer;
  } finally {
    if (deadlineTimer) {
      clearTimeout(deadlineTimer);
    }
    if (activityTimer) {
      clearTimeout(activityTimer);
    }
  }
}
function isRetryableError(e) {
  if (e instanceof FirstTokenTimeoutError || e instanceof StreamIdleTimeoutError || e instanceof IncompleteStreamError || e instanceof CompletionLengthError || e?.partialResponse) {
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
async function requestChatCompletions(url, header, body, onStream, options, requestOptions = {}) {
  const maxRetries = requestOptions.retry === false ? 0 : 1;
  const deadlineMs = requestOptions.deadlineMs || Date.now() + getChatCompletionTimeoutBudgetMs();
  let lastError = null;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const remainingTimeoutMs = deadlineMs - Date.now();
    if (remainingTimeoutMs <= 0) {
      throw lastError || new Error("LLM request exceeded the synchronous webhook deadline");
    }
    try {
      const result = await requestChatCompletionsOnce(url, header, body, onStream, options, {
        ...requestOptions,
        deadlineMs,
        firstContentTimeoutMs: Math.min(requestOptions.firstContentTimeoutMs ?? getTextFirstContentTimeoutMs(), remainingTimeoutMs)
      });
      if (attempt > 0) {
        debugLog(`[diag] requestChatCompletions: 第${attempt + 1}次成功`);
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
      const retryDelayMs = 1e3;
      const remainingBeforeRetry = deadlineMs - Date.now();
      const minimumAttemptWindowMs = Math.min(requestOptions.firstContentTimeoutMs ?? getTextFirstContentTimeoutMs(), 5e3);
      if (remainingBeforeRetry <= retryDelayMs + minimumAttemptWindowMs) {
        throw e;
      }
      debugLog(`[diag] requestChatCompletions: 第${attempt + 1}次失败(可重试): ${e.message}, 1秒后重试...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
    }
  }
  throw lastError;
}
function createImageDiagCounter() {
  return {
    current: { ok: 0, failed: 0 },
    history: { ok: 0, failed: 0 }
  };
}
function recordImageRender(counter, report) {
  const target = report.source === "current" ? counter.current : counter.history;
  if (report.ok) {
    target.ok += 1;
  } else {
    target.failed += 1;
  }
}
function buildImageNotices(counter, extractFailed = 0) {
  const notices = [];
  if (extractFailed > 0) {
    notices.push(`⚠️ 有 ${extractFailed} 张图片未能从 Telegram 取到, 模型没有看到这些图片(可尝试重新发送图片)。`);
  }
  if (counter.current.failed > 0) {
    notices.push(`⚠️ 本条消息中的 ${counter.current.failed} 张图片加载失败, 模型没有看到这些图片(可尝试重新发送图片)。`);
  }
  if (counter.history.failed > 0) {
    notices.push(`⚠️ 历史中的 ${counter.history.failed} 张图片加载失败, 模型可能已经无法查看此前发过的图片。`);
  }
  return notices;
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
  const controller = new AbortController();
  const timeoutID = setTimeout(() => controller.abort(), IMAGE_FETCH_TIMEOUT);
  try {
    const resp = await fetch(url, { signal: controller.signal });
    if (!resp.ok) {
      throw new Error(`fetch image failed: ${resp.status}`);
    }
    const blob = await resp.blob();
    IMAGE_CACHE.set(url, blob);
    return blob;
  } catch (e) {
    if (controller.signal.aborted) {
      throw new Error("fetch image timeout");
    }
    throw e;
  } finally {
    clearTimeout(timeoutID);
  }
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
async function renderOpenAIMessage(item, supportImage, onImageRender, isCurrent = false) {
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
                  onImageRender?.({ source: isCurrent ? "current" : "history", ok: true, url: shortImageUrl(data.url) });
                } catch (e) {
                  console.error("renderOpenAIMessage: skip image due to fetch failure", e);
                  onImageRender?.({
                    source: isCurrent ? "current" : "history",
                    ok: false,
                    error: e instanceof Error ? e.message : String(e),
                    url: shortImageUrl(data.url)
                  });
                }
              } else if (isSupportURL) {
                contents.push({ type: "image_url", image_url: { url: data.url } });
                onImageRender?.({ source: isCurrent ? "current" : "history", ok: true, url: shortImageUrl(data.url) });
              }
            } else if (data.base64 && isSupportBase64) {
              contents.push({ type: "image_base64", image_base64: { base64: data.base64 } });
              onImageRender?.({ source: isCurrent ? "current" : "history", ok: true });
            }
          }
          break;
      }
    }
    res.content = contents;
  }
  return res;
}
function shortImageUrl(url) {
  return url.replace(/(bot)[^/]+/, "$1***");
}
async function renderOpenAIMessages(prompt, items, supportImage, onImageRender, currentMessageCount = 1) {
  const currentStart = Math.max(0, items.length - currentMessageCount);
  const messages = await Promise.all(items.map((item, index) => renderOpenAIMessage(item, supportImage, onImageRender, index >= currentStart)));
  if (prompt) {
    if (ENV.SYSTEM_PROMPT_MODE === "prepend") {
      prependPromptToLastUserMessage(messages, prompt);
    } else {
      if (messages.length > 0 && messages[0].role === "system") {
        messages.shift();
      }
      messages.unshift({ role: "system", content: prompt });
    }
  }
  return messages;
}
function prependPromptToLastUserMessage(messages, prompt) {
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];
    if (message.role !== "user") {
      continue;
    }
    if (typeof message.content === "string") {
      message.content = `${prompt}

${message.content}`;
    } else if (Array.isArray(message.content)) {
      const textPart = message.content.find((part) => part.type === "text");
      if (textPart) {
        textPart.text = `${prompt}

${textPart.text}`;
      } else {
        message.content.unshift({ type: "text", text: prompt });
      }
    }
    return;
  }
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
function openAIApiKey(context) {
  const length = context.OPENAI_API_KEY.length;
  return context.OPENAI_API_KEY[Math.floor(Math.random() * length)];
}
function messagesHasImage(renderedMessages) {
  return renderedMessages.some((m) => Array.isArray(m.content) && m.content.some((c) => c.type === "image_url" || c.type === "image_base64"));
}
function detectImageMime(base64) {
  switch (base64.charAt(0)) {
    case "/":
      return "image/jpeg";
    case "i":
      return "image/png";
    case "U":
      return "image/webp";
    default:
      return "image/jpeg";
  }
}
function imageResultFromResponse(resp) {
  const item = resp?.data?.at(0);
  if (typeof item?.b64_json === "string" && item.b64_json.length > 0) {
    const binary = atob(item.b64_json);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new Blob([bytes], { type: detectImageMime(item.b64_json) });
  }
  if (typeof item?.url === "string" && item.url.length > 0 && !item.url.startsWith("data:")) {
    return item.url;
  }
  throw new Error("Image API returned neither b64_json nor a usable url");
}
class OpenAI {
  name = "openai";
  modelKey = getAgentUserConfigFieldName("OPENAI_CHAT_MODEL");
  enable = (ctx) => ctx.OPENAI_API_KEY.length > 0;
  model = (ctx) => ctx.OPENAI_CHAT_MODEL;
  modelList = (ctx) => loadOpenAIModelList(ctx.OPENAI_CHAT_MODELS_LIST, ctx.OPENAI_API_BASE, bearerHeader(openAIApiKey(ctx)));
  request = async (params, context, onStream) => {
    const { prompt, messages } = params;
    const deadlineMs = params.deadlineMs || getChatCompletionDeadlineMs();
    if (deadlineMs <= Date.now()) {
      throw new Error("LLM request exceeded the synchronous webhook deadline");
    }
    const url = `${context.OPENAI_API_BASE}/chat/completions`;
    const header = bearerHeader(openAIApiKey(context));
    debugLog("[diag] OpenAI 消息渲染开始:", {
      messageCount: messages.length
    });
    const renderedMessages = await renderOpenAIMessages(prompt, messages, [ImageSupportFormat.URL, ImageSupportFormat.BASE64], params.onImageRender, params.currentMessageCount);
    const hasImage = messagesHasImage(renderedMessages);
    if (deadlineMs <= Date.now()) {
      throw new Error("LLM request exceeded the synchronous webhook deadline");
    }
    const imageMode = hasImage ? params.imageMode || "image" : "none";
    const firstContentTimeoutMs = getTextFirstContentTimeoutMs();
    debugLog("[diag] OpenAI 请求准备:", {
      imageMode,
      firstContentTimeoutMs,
      remainingBudgetMs: Math.max(0, deadlineMs - Date.now())
    });
    const body = {
      ...context.OPENAI_API_EXTRA_PARAMS || {},
      model: context.OPENAI_CHAT_MODEL,
      stream: onStream != null,
      messages: renderedMessages
    };
    const requestOptions = {
      deadlineMs,
      firstContentTimeoutMs,
      idleTimeoutMs: getStreamIdleTimeoutMs(),
      retry: !hasImage
    };
    const text = await requestChatCompletions(url, header, body, onStream, null, requestOptions);
    return convertStringToResponseMessages(text);
  };
}
class Dalle {
  name = "openai";
  modelKey = getAgentUserConfigFieldName("IMAGE_MODEL");
  enable = (ctx) => !!ctx.IMAGE_API_BASE && !!ctx.IMAGE_API_KEY;
  model = (ctx) => ctx.IMAGE_MODEL;
  modelList = (ctx) => loadOpenAIModelList(ctx.IMAGE_MODELS_LIST, ctx.IMAGE_API_BASE, bearerHeader(ctx.IMAGE_API_KEY));
  request = async (prompt, context, inputImage) => {
    const baseUrl = context.IMAGE_API_BASE.replace(/\/+$/, "");
    const header = bearerHeader(context.IMAGE_API_KEY);
    let url;
    let body;
    if (inputImage) {
      url = `${baseUrl}/images/edits`;
      delete header["Content-Type"];
      const ext = { "image/png": "png", "image/webp": "webp" }[inputImage.type] || "jpg";
      const form = new FormData();
      form.append("image", inputImage, `image.${ext}`);
      form.append("prompt", prompt);
      form.append("n", "1");
      if (context.IMAGE_MODEL) {
        form.append("model", context.IMAGE_MODEL);
      }
      if (context.IMAGE_SIZE) {
        form.append("size", context.IMAGE_SIZE);
      }
      body = form;
    } else {
      url = `${baseUrl}/images/generations`;
      body = JSON.stringify({
        prompt,
        n: 1,
        size: context.IMAGE_SIZE,
        model: context.IMAGE_MODEL
      });
    }
    const response = await fetch(url, {
      method: "POST",
      headers: header,
      body
    });
    const responseText = await response.text();
    let resp;
    try {
      resp = JSON.parse(responseText);
    } catch {
      throw new Error(`Image API error: HTTP ${response.status} (non-JSON response)`);
    }
    if (!response.ok) {
      throw new Error(resp.error?.message || `Image API error: HTTP ${response.status}`);
    }
    if (resp.error?.message) {
      throw new Error(resp.error.message);
    }
    return imageResultFromResponse(resp);
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
async function loadHistory(key, chatType) {
  const isGroupChat = chatType === "group" || chatType === "supergroup";
  const idleTimeout = isGroupChat ? ENV.SESSION_IDLE_TIMEOUT : ENV.SESSION_IDLE_TIMEOUT_PRIVATE;
  if (idleTimeout > 0) {
    const lastActiveKey = `last_active:${key}`;
    const now = Math.floor(Date.now() / 1e3);
    let lastActive = 0;
    try {
      lastActive = Number.parseInt(await ENV.DATABASE.get(lastActiveKey) || "0", 10);
    } catch (e) {
      console.error(e);
    }
    if (lastActive === 0 || now - lastActive > idleTimeout) {
      await ENV.DATABASE.delete(key).catch(() => null);
    }
    await ENV.DATABASE.put(lastActiveKey, String(now), { expirationTtl: idleTimeout * 2 }).catch(() => null);
  }
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
async function requestCompletionsFromLLM(params, context, agent, modifier, onStream, imageMode = "none", imageDiag) {
  const historyDisable = ENV.AUTO_TRIM_HISTORY && ENV.MAX_HISTORY_LENGTH <= 0;
  const historyKey = context.SHARE_CONTEXT.chatHistoryKey;
  if (!historyKey) {
    throw new Error("History key not found");
  }
  let history = await loadHistory(historyKey, context.SHARE_CONTEXT.chatType);
  if (!params) {
    throw new Error("Message is empty");
  }
  const diag = imageDiag ?? createImageDiagCounter();
  const llmParams = {
    prompt: context.USER_CONFIG.SYSTEM_INIT_MESSAGE || void 0,
    messages: [...history, params],
    imageMode,
    deadlineMs: getChatCompletionDeadlineMs(context.requestStartedAt),
    onImageRender: (report) => recordImageRender(diag, report),
    currentMessageCount: 1
  };
  const { text, responses } = await agent.request(llmParams, context.USER_CONFIG, onStream);
  debugLog("[image] 本轮请求图片统计:", {
    当前消息: diag.current,
    历史消息: diag.history
  });
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
const pendingMediaGroups =  new Map();
function collectMediaGroup(message, quietMs = 1500) {
  const groupId = message.media_group_id;
  let entry = pendingMediaGroups.get(groupId);
  if (!entry) {
    let resolveRef;
    const deferred = new Promise((resolve) => {
      resolveRef = resolve;
    });
    entry = { messages: [], timer: null, deferred, resolve: resolveRef };
    pendingMediaGroups.set(groupId, entry);
  }
  if (!entry.messages.some((item) => item.message_id === message.message_id)) {
    entry.messages.push(message);
  }
  entry.messages.sort((a, b) => a.message_id - b.message_id);
  if (entry.timer) {
    clearTimeout(entry.timer);
  }
  entry.timer = setTimeout(() => {
    pendingMediaGroups.delete(groupId);
    entry.resolve(entry.messages);
  }, quietMs);
  return entry.deferred;
}
const mediaGroupImageCache =  new Map();
const MEDIA_GROUP_IMAGE_CACHE_TTL_MS = 24 * 60 * 60 * 1e3;
const MEDIA_GROUP_IMAGE_CACHE_MAX = 200;
function recordMediaGroupImages(groupId, fileIds) {
  const expires = Date.now() + MEDIA_GROUP_IMAGE_CACHE_TTL_MS;
  const entry = mediaGroupImageCache.get(groupId);
  if (entry) {
    for (const id of fileIds) {
      if (!entry.fileIds.includes(id)) {
        entry.fileIds.push(id);
      }
    }
    entry.expires = expires;
    return;
  }
  while (mediaGroupImageCache.size >= MEDIA_GROUP_IMAGE_CACHE_MAX) {
    const oldest = mediaGroupImageCache.keys().next();
    if (oldest.done) {
      break;
    }
    mediaGroupImageCache.delete(oldest.value);
  }
  mediaGroupImageCache.set(groupId, { fileIds: [...fileIds], expires });
}
function getMediaGroupImageFileIds(groupId) {
  const entry = mediaGroupImageCache.get(groupId);
  if (!entry) {
    return null;
  }
  if (entry.expires < Date.now()) {
    mediaGroupImageCache.delete(groupId);
    return null;
  }
  return entry.fileIds;
}
async function chatWithMessage(message, params, context, modifier, imageMode = "none", imageExtractFailed = 0) {
  const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
  try {
    try {
      const msg = await sender.sendPlainText("🤖️正在处理中，请稍后...").then((r) => r.json());
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
    const imageDiag = createImageDiagCounter();
    const answer = await requestCompletionsFromLLM(params, context, agent, modifier, onStream, imageMode, imageDiag);
    if (nextEnableTime !== null && nextEnableTime > Date.now()) {
      await new Promise((resolve) => setTimeout(resolve, (nextEnableTime ?? 0) - Date.now()));
    }
    const notices = buildImageNotices(imageDiag, imageExtractFailed);
    const finalAnswer = notices.length > 0 ? `${answer}

${notices.join("\n")}` : answer;
    const resp = await sender.sendRichText(finalAnswer);
    await saveBotReplyGroup(context, sender.getSentMessageIds());
    return resp;
  } catch (e) {
    console.error("[diag] chatWithMessage 处理失败:", e.message);
    const partialText = typeof e?.partialText === "string" ? e.partialText.trim() : "";
    let errMsg = partialText ? `${partialText}

[生成中断] ${e.message}` : `Error: ${e.message}`;
    if (errMsg.length > 2048 && !partialText) {
      errMsg = errMsg.substring(0, 2048);
    }
    try {
      const resp = partialText ? await sender.sendRichText(errMsg) : await sender.sendPlainText(errMsg);
      await saveBotReplyGroup(context, sender.getSentMessageIds());
      return resp;
    } catch (sendError) {
      console.error("Failed to send chat error:", sendError);
      await saveBotReplyGroup(context, sender.getSentMessageIds()).catch(() => void 0);
      return new Response(errMsg, { status: 500 });
    }
  }
}
async function downloadImageBlob(fileId, context) {
  const fileUrl = await extractImageURL(fileId, context);
  if (!fileUrl) {
    throw new Error("无法从 Telegram 获取图片");
  }
  const res = await fetch(fileUrl.toString());
  if (!res.ok) {
    throw new Error(`下载图片失败: HTTP ${res.status}`);
  }
  return res.blob();
}
async function extractImageURL(fileId, context) {
  if (!fileId) {
    return null;
  }
  const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
  const GET_FILE_TIMEOUT = 5e3;
  let timeoutID = null;
  try {
    const file = await Promise.race([
      api.getFileWithReturns({ file_id: fileId }),
      new Promise((_, reject) => {
        timeoutID = setTimeout(() => reject(new Error("getFile timeout")), GET_FILE_TIMEOUT);
      })
    ]);
    const filePath = file.result?.file_path;
    if (!filePath) {
      throw new Error("getFile returned no file path");
    }
    return URL.parse(`${ENV.TELEGRAM_API_DOMAIN}/file/bot${context.SHARE_CONTEXT.botToken}/${filePath}`);
  } catch (e) {
    console.error("extractImageURL failed:", e);
    return null;
  } finally {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  }
}
const MAX_DOWNLOAD_FILE_SIZE = 20 * 1024 * 1024;
const MAX_THREAD_IMAGES = 4;
function extractImageFileID(message) {
  if (message.photo && message.photo.length > 0) {
    const offset = ENV.TELEGRAM_PHOTO_SIZE_OFFSET;
    const length = message.photo.length;
    const sizeIndex = Math.max(0, Math.min(offset >= 0 ? offset : length + offset, length - 1));
    return message.photo[sizeIndex]?.file_id;
  }
  if (message.document) {
    if (message.document.mime_type?.startsWith("image/") && (!message.document.file_size || message.document.file_size <= MAX_DOWNLOAD_FILE_SIZE)) {
      return message.document.file_id;
    }
    return message.document.thumbnail?.file_id ?? null;
  }
  return null;
}
function extractEditImageFileID(message) {
  const fileId = extractImageFileID(message);
  if (fileId) {
    return fileId;
  }
  const sticker = message.sticker;
  if (sticker && !sticker.is_animated && !sticker.is_video) {
    return sticker.file_id;
  }
  return null;
}
function appendReferencedImageFileIds(referencedMessage, imageFileIds) {
  let fileIds = referencedMessage.media_group_id ? getMediaGroupImageFileIds(referencedMessage.media_group_id) : null;
  if (!fileIds || fileIds.length === 0) {
    const single = extractImageFileID(referencedMessage);
    fileIds = single ? [single] : [];
  }
  for (const id of fileIds) {
    if (!imageFileIds.includes(id)) {
      imageFileIds.push(id);
    }
  }
}
async function extractUserMessage(message, context, albumMessages = null) {
  debugLog("[diag] ChatHandler 消息提取开始:", {
    hasText: !!(message.text || message.caption),
    hasPhoto: !!message.photo?.length,
    hasReply: !!message.reply_to_message,
    replyHasText: !!(message.reply_to_message?.text || message.reply_to_message?.caption),
    replyHasPhoto: !!message.reply_to_message?.photo?.length
  });
  let text = message.text || message.caption || "";
  const imageFileIds = new Array();
  const ownImageFileId = extractImageFileID(message);
  if (ownImageFileId) {
    imageFileIds.push(ownImageFileId);
  }
  if (albumMessages && albumMessages.length > 0) {
    if (!text) {
      const captioned = albumMessages.find((item) => item.caption || item.text);
      if (captioned) {
        text = captioned.caption || captioned.text || "";
      }
    }
    const groupFileIds = [];
    for (const item of albumMessages) {
      const id = extractImageFileID(item);
      if (id && !groupFileIds.includes(id)) {
        groupFileIds.push(id);
      }
    }
    for (const id of groupFileIds) {
      if (!imageFileIds.includes(id)) {
        imageFileIds.push(id);
      }
    }
    if (message.media_group_id) {
      recordMediaGroupImages(message.media_group_id, groupFileIds);
    }
  } else if (message.media_group_id && ownImageFileId) {
    recordMediaGroupImages(message.media_group_id, [ownImageFileId]);
  }
  const referencedMessage = message.reply_to_message;
  const isReplyToBot = `${referencedMessage?.from?.id}` === `${context.SHARE_CONTEXT.botId}`;
  let threadHandled = false;
  if (ENV.REPLY_THREAD_CONTEXT && referencedMessage) {
    const botIdStr = `${context.SHARE_CONTEXT.botId}`;
    const thread = collectReplyThread(referencedMessage).filter((item) => {
      if (item.from?.is_bot) {
        return false;
      }
      return `${item.from?.id}` !== botIdStr;
    });
    if (thread.length >= 2) {
      const lines = [];
      for (const item of thread) {
        const content = item.text || item.caption || "";
        const fileId = extractImageFileID(item);
        const attachImage = !!fileId && ENV.EXTRA_MESSAGE_MEDIA_COMPATIBLE.includes("image") && imageFileIds.length < MAX_THREAD_IMAGES;
        if (attachImage && fileId && !imageFileIds.includes(fileId)) {
          imageFileIds.push(fileId);
        }
        lines.push(`${threadDisplayName(item)}: ${content || (fileId ? "[图片]" : "[不支持的内容]")}`);
      }
      text = `${text}
[引用讨论串, 按时间从早到晚]
${lines.join("\n")}`;
      threadHandled = true;
    }
  }
  if (!threadHandled && ENV.EXTRA_MESSAGE_CONTEXT && referencedMessage && !isReplyToBot) {
    const extraText = referencedMessage.text || referencedMessage.caption || "";
    if (extraText) {
      text = `${text}
The following is the referenced context: ${extraText}`;
    }
    if (ENV.EXTRA_MESSAGE_MEDIA_COMPATIBLE.includes("image") && referencedMessage.photo) {
      appendReferencedImageFileIds(referencedMessage, imageFileIds);
    }
  } else if (!threadHandled && !text && referencedMessage && !isReplyToBot) {
    text = referencedMessage.text || referencedMessage.caption || "";
    if (!text && ENV.EXTRA_MESSAGE_MEDIA_COMPATIBLE.includes("image") && referencedMessage.photo) {
      appendReferencedImageFileIds(referencedMessage, imageFileIds);
    }
  }
  const hasImage = imageFileIds.length > 0;
  const imageMode = hasImage ? "image" : "none";
  const shouldAttachImage = imageMode !== "none";
  const extractedUrls = shouldAttachImage ? await Promise.all(imageFileIds.map((fileId) => extractImageURL(fileId, context))) : [];
  const urls = extractedUrls.filter((url) => url !== null);
  const imageExtractFailed = extractedUrls.length - urls.length;
  if (!text.trim() && urls.length === 0) {
    throw new Error("Message has no supported text or image content");
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
  return { params, imageMode: urls.length > 0 ? imageMode : "none", imageExtractFailed };
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
      const replied = message.reply_to_message;
      const repliedFileId = replied ? extractEditImageFileID(replied) : null;
      if (replied && !repliedFileId && (replied.sticker || replied.animation)) {
        return sender.sendPlainText("ERROR: 动态表情包/动图暂不支持直接修改，请截图或转为静态图片后再试");
      }
      const inputImage = repliedFileId ? await downloadImageBlob(repliedFileId, context) : void 0;
      const result = await imageAgent.request(subcommand, context.USER_CONFIG, inputImage);
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
    const adminCommands =  new Set(["/version", "/system", "/models", "/imgmodels", "/echo"]);
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
      if (ENV.CLEAR_ALSO_RESETS_HISTORY) {
        await ENV.DATABASE.delete(context.SHARE_CONTEXT.chatHistoryKey).catch(() => null);
      }
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
  new VersionCommandHandler(),
  new SystemCommandHandler(),
  new ModelsCommandHandler(),
  new ImgModelsCommandHandler(),
  new AvCommandHandler(),
  new DotAvCommandHandler(),
  new HelpCommandHandler(),
  new ClearCommandHandler()
];
function knownCommands() {
  const set =  new Set();
  for (const cmd of SYSTEM_COMMANDS) {
    set.add(cmd.command);
  }
  for (const key in ENV.CUSTOM_COMMAND) {
    set.add(key);
  }
  for (const key in ENV.PLUGINS_COMMAND) {
    set.add(key);
  }
  return set;
}
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
        if (content.slice(0, entity.offset).trim() !== "") {
          break;
        }
        if (entityStr.endsWith(`@${botName}`)) {
          isMention = true;
          const newEntityStr = entityStr.replace(`@${botName}`, "");
          content = content.slice(0, entity.offset) + newEntityStr + content.slice(entity.offset + entity.length);
        } else if (!entityStr.includes("@")) {
          isMention = true;
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
    debugLog("[diag] GroupMention 进入:", { chatId: message.chat.id, msgId: message.message_id, text: message.text?.slice(0, 50) });
    const replyMe = `${message.reply_to_message?.from?.id}` === `${context.SHARE_CONTEXT.botId}`;
    if (replyMe) {
      debugLog("[diag] GroupMention 放行: 回复 bot 消息");
      return null;
    }
    let botName = context.SHARE_CONTEXT.botName;
    debugLog("[diag] GroupMention botName(初始):", botName);
    if (!botName) {
      debugLog("[diag] GroupMention botName 未初始化, 调 getMe 获取");
      const res = await createTelegramBotAPI(context.SHARE_CONTEXT.botToken).getMeWithReturns();
      botName = res.result.username || null;
      context.SHARE_CONTEXT.botName = botName;
      debugLog("[diag] GroupMention botName(getMe 后):", botName);
    }
    if (!botName) {
      throw new Error("Not set bot name");
    }
    const entities = message.text ? message.entities : message.caption ? message.caption_entities : null;
    const rawText = message.text || message.caption || "";
    const botCommandEntity = entities?.find((e) => e.type === "bot_command" && rawText.slice(0, e.offset).trim() === "");
    if (botCommandEntity) {
      const cmdStr = rawText.slice(botCommandEntity.offset, botCommandEntity.offset + botCommandEntity.length);
      const atIdx = cmdStr.lastIndexOf("@");
      const cmdName = atIdx === -1 ? cmdStr : cmdStr.slice(0, atIdx);
      const cmdSuffix = atIdx === -1 ? "" : cmdStr.slice(atIdx + 1);
      const known = knownCommands();
      if (known.has(cmdName)) {
        if (cmdSuffix === "" || cmdSuffix === botName) {
          debugLog("[diag] GroupMention 放行: 本 bot 命令", cmdStr);
          if (atIdx !== -1) {
            const prefix = rawText.slice(0, botCommandEntity.offset);
            const suffix = rawText.slice(botCommandEntity.offset + botCommandEntity.length);
            const cleanText = prefix + cmdName + suffix;
            if (message.text) {
              message.text = cleanText;
            } else if (message.caption) {
              message.caption = cleanText;
            }
            debugLog("[diag] GroupMention 剥离后缀:", cmdStr, "→", cmdName);
          }
          return null;
        }
        debugLog("[diag] GroupMention 拦截: 已知命令但 @ 了其他 bot", cmdStr);
        throw new StopMessageHandling("Ignore command for other bot");
      }
      debugLog("[diag] GroupMention 拦截: 未知命令", cmdStr);
      throw new StopMessageHandling("Ignore unknown command");
    }
    if (message.text?.startsWith(".生图") || message.caption?.startsWith(".生图")) {
      debugLog("[diag] GroupMention 放行: .生图 命令");
      return null;
    }
    let isMention = false;
    if (message.text && message.entities) {
      const res = checkMention(message.text, message.entities, botName, context.SHARE_CONTEXT.botId);
      isMention = res.isMention;
      message.text = res.content.trim();
      debugLog("[diag] GroupMention text@检测:", { isMention, text: message.text?.slice(0, 50) });
    }
    if (message.caption && message.caption_entities) {
      const res = checkMention(message.caption, message.caption_entities, botName, context.SHARE_CONTEXT.botId);
      isMention = res.isMention || isMention;
      message.caption = res.content.trim();
      debugLog("[diag] GroupMention caption@检测:", { isMention, caption: message.caption?.slice(0, 50) });
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
      debugLog("[diag] GroupMention 未命中 @bot, 抛 Not mention");
      throw new StopMessageHandling("Not mention");
    }
    debugLog("[diag] GroupMention 命中触发, 放行 -> 下一个");
    return null;
  };
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
      const commands = commandsForChatMember();
      const fingerprint = JSON.stringify(commands);
      const syncKey = `${MENU_SYNC_KEY_PREFIX}${speakerId}:${botId}`;
      if (await ENV.DATABASE.get(syncKey) === fingerprint) {
        return;
      }
      const api = createTelegramBotAPI(botToken);
      const params = {
        commands,
        scope: {
          type: "chat",
          chat_id: speakerId
        }
      };
      await api.setMyCommands(params);
      await ENV.DATABASE.put(syncKey, fingerprint, { expirationTtl: MENU_SYNC_TTL_SECONDS });
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
      return null;
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
        return null;
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
      return null;
    }
    if (body.message) {
      return body?.message;
    } else {
      return null;
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
        if (!(e instanceof StopMessageHandling)) {
          throw e;
        }
        debugLog(`[diag] 中间件 ${handlerName} 终止处理: ${e.message}`);
        return null;
      }
      if (result) {
        debugLog(`[diag] 中间件 ${handlerName} 返回响应, 中断后续链`);
        return result;
      }
      debugLog(`[diag] 中间件 ${handlerName} 放行 -> 下一个`);
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
      const storedIds = JSON.parse(await ENV.DATABASE.get(context.SHARE_CONTEXT.lastMessageKey).catch(() => "[]"));
      if (Array.isArray(storedIds)) {
        idList = storedIds;
      }
    } catch (e) {
      console.error(e);
    }
    if (idList.includes(message.message_id)) {
      debugLog("[diag] OldMessageFilter: 重复消息(Telegram重试), 终止处理");
      throw new StopMessageHandling("Ignore old message");
    }
    idList.push(message.message_id);
    if (idList.length > 100) {
      idList.shift();
    }
    await ENV.DATABASE.put(context.SHARE_CONTEXT.lastMessageKey, JSON.stringify(idList));
    return null;
  };
}
class BotSenderFilter {
  handle = async (message, _context) => {
    if (message.from?.is_bot) {
      throw new StopMessageHandling("Ignore bot sender");
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
    throw new StopMessageHandling("Not supported message type");
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
    let albumMessages = null;
    if (message.media_group_id) {
      const group = await collectMediaGroup(message);
      const representativeId = Math.min(...group.map((item) => item.message_id));
      if (message.message_id !== representativeId) {
        return null;
      }
      albumMessages = group;
    }
    const { params, imageMode, imageExtractFailed } = await extractUserMessage(message, context, albumMessages);
    const content = params.content;
    debugLog("[diag] ChatHandler 消息提取完成:", {
      textLength: typeof content === "string" ? content.length : content.filter((item) => item.type === "text").reduce((sum, item) => sum + item.text.length, 0),
      imageCount: Array.isArray(content) ? content.filter((item) => item.type === "image").length : 0,
      imageMode,
      imageExtractFailed,
      hasReply: !!message.reply_to_message,
      albumSize: albumMessages?.length ?? 0
    });
    return chatWithMessage(message, params, context, null, imageMode, imageExtractFailed);
  };
}
class ImageEditHandler {
  handle = async (message, context) => {
    if (!ENV.IMAGE_EDIT_ON_REPLY) {
      return null;
    }
    const referenced = message.reply_to_message;
    if (!referenced) {
      return null;
    }
    if (`${referenced.from?.id}` !== `${context.SHARE_CONTEXT.botId}`) {
      return null;
    }
    const fileId = referenced.photo?.at(-1)?.file_id;
    if (!fileId) {
      return null;
    }
    const prompt = (message.text || message.caption || "").trim();
    if (!prompt) {
      return null;
    }
    if (!context.USER_CONFIG.IMAGE_API_BASE || !context.USER_CONFIG.IMAGE_API_KEY) {
      return null;
    }
    const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
    try {
      const source = await downloadImageBlob(fileId, context);
      const imageAgent = loadImageGen(context.USER_CONFIG);
      if (!imageAgent) {
        throw new Error("No available image model");
      }
      debugLog("[diag] ImageEditHandler 二次编辑:", { prompt: prompt.slice(0, 50), bytes: source.size });
      const result = await imageAgent.request(prompt, context.USER_CONFIG, source);
      const resp = await sender.sendPhoto(result);
      await recordReply(resp, context);
      return resp;
    } catch (e) {
      return sender.sendPlainText(`ERROR: ${e.message}`);
    }
  };
}
async function recordReply(resp, context) {
  try {
    const json = await resp.clone().json();
    if (json?.ok && json.result?.message_id) {
      await saveBotReplyGroup(context, [json.result.message_id]);
    }
  } catch (e) {
    console.error(e);
  }
}
const SHARE_HANDLER = [
  new EnvChecker(),
  new WhiteListFilter(),
  new CallbackQueryHandler(),
  new Update2MessageHandler([
    new BotSenderFilter(),
    new MessageFilter(),
    new AdminMenuSync(),
    new GroupMention(),
    new OldMessageFilter(),
    new SaveLastMessage(),
    new CommandHandler(),
    new ImageEditHandler(),
    new ChatHandler()
  ])
];
async function handleUpdate(token, update, requestStartedAt = Date.now()) {
  let context;
  try {
    context = await WorkerContext.from(token, update, requestStartedAt);
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
  const rawMessage = update.message ?? update.channel_post;
  if (rawMessage) {
    recordChatMessage(rawMessage);
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
const INGRESS_TIMESTAMP_HEADER = "x-webhook-received-at";
function resolveRequestStartedAt(request) {
  const now = Date.now();
  const forwarded = Number.parseInt(request.headers.get(INGRESS_TIMESTAMP_HEADER) || "");
  if (Number.isFinite(forwarded) && forwarded > 0 && forwarded <= now && now - forwarded < 6e4) {
    return forwarded;
  }
  return now;
}
async function telegramWebhook(request) {
  const requestStartedAt = resolveRequestStartedAt(request);
  try {
    const { token } = request.params;
    const body = await request.json();
    return makeResponse200(await handleUpdate(token, body, requestStartedAt));
  } catch (e) {
    console.error(e);
    return new Response(errorToString(e), { status: 200 });
  }
}
async function telegramSafeHook(request) {
  const requestStartedAt = resolveRequestStartedAt(request);
  try {
    if (ENV.API_GUARD === void 0 || ENV.API_GUARD === null) {
      return telegramWebhook(request);
    }
    console.log("API_GUARD is enabled");
    const url = new URL(request.url);
    url.pathname = url.pathname.replace("/safehook", "/webhook");
    const newRequest = new Request(url, request);
    newRequest.headers.set(INGRESS_TIMESTAMP_HEADER, `${requestStartedAt}`);
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

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getAugmentedNamespace(n) {
  if (Object.prototype.hasOwnProperty.call(n, '__esModule')) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			var isInstance = false;
      try {
        isInstance = this instanceof a;
      } catch {}
			if (isInstance) {
        return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var hasOwnProperty;
var hasRequiredHasOwnProperty;

function requireHasOwnProperty () {
	if (hasRequiredHasOwnProperty) return hasOwnProperty;
	hasRequiredHasOwnProperty = 1;
	var own = {}.hasOwnProperty;
	hasOwnProperty = own;
	return hasOwnProperty;
}

var splice_1;
var hasRequiredSplice;

function requireSplice () {
	if (hasRequiredSplice) return splice_1;
	hasRequiredSplice = 1;
	var splice = [].splice;
	splice_1 = splice;
	return splice_1;
}

var chunkedSplice_1;
var hasRequiredChunkedSplice;

function requireChunkedSplice () {
	if (hasRequiredChunkedSplice) return chunkedSplice_1;
	hasRequiredChunkedSplice = 1;
	var splice = requireSplice();
	function chunkedSplice(list, start, remove, items) {
	  var end = list.length;
	  var chunkStart = 0;
	  var parameters;
	  if (start < 0) {
	    start = -start > end ? 0 : end + start;
	  } else {
	    start = start > end ? end : start;
	  }
	  remove = remove > 0 ? remove : 0;
	  if (items.length < 10000) {
	    parameters = Array.from(items);
	    parameters.unshift(start, remove);
	    splice.apply(list, parameters);
	  } else {
	    if (remove) splice.apply(list, [start, remove]);
	    while (chunkStart < items.length) {
	      parameters = items.slice(chunkStart, chunkStart + 10000);
	      parameters.unshift(start, 0);
	      splice.apply(list, parameters);
	      chunkStart += 10000;
	      start += 10000;
	    }
	  }
	}
	chunkedSplice_1 = chunkedSplice;
	return chunkedSplice_1;
}

var miniflat_1;
var hasRequiredMiniflat;

function requireMiniflat () {
	if (hasRequiredMiniflat) return miniflat_1;
	hasRequiredMiniflat = 1;
	function miniflat(value) {
	  return value === null || value === undefined
	    ? []
	    : 'length' in value
	    ? value
	    : [value]
	}
	miniflat_1 = miniflat;
	return miniflat_1;
}

var combineExtensions_1;
var hasRequiredCombineExtensions;

function requireCombineExtensions () {
	if (hasRequiredCombineExtensions) return combineExtensions_1;
	hasRequiredCombineExtensions = 1;
	var hasOwnProperty = requireHasOwnProperty();
	var chunkedSplice = requireChunkedSplice();
	var miniflat = requireMiniflat();
	function combineExtensions(extensions) {
	  var all = {};
	  var index = -1;
	  while (++index < extensions.length) {
	    extension(all, extensions[index]);
	  }
	  return all
	}
	function extension(all, extension) {
	  var hook;
	  var left;
	  var right;
	  var code;
	  for (hook in extension) {
	    left = hasOwnProperty.call(all, hook) ? all[hook] : (all[hook] = {});
	    right = extension[hook];
	    for (code in right) {
	      left[code] = constructs(
	        miniflat(right[code]),
	        hasOwnProperty.call(left, code) ? left[code] : []
	      );
	    }
	  }
	}
	function constructs(list, existing) {
	  var index = -1;
	  var before = [];
	  while (++index < list.length) {
(list[index].add === 'after' ? existing : before).push(list[index]);
	  }
	  chunkedSplice(existing, 0, 0, before);
	  return existing
	}
	combineExtensions_1 = combineExtensions;
	return combineExtensions_1;
}

var syntax$3 = {};

var fromCharCode_1;
var hasRequiredFromCharCode;

function requireFromCharCode () {
	if (hasRequiredFromCharCode) return fromCharCode_1;
	hasRequiredFromCharCode = 1;
	var fromCharCode = String.fromCharCode;
	fromCharCode_1 = fromCharCode;
	return fromCharCode_1;
}

var regexCheck_1;
var hasRequiredRegexCheck;

function requireRegexCheck () {
	if (hasRequiredRegexCheck) return regexCheck_1;
	hasRequiredRegexCheck = 1;
	var fromCharCode = requireFromCharCode();
	function regexCheck(regex) {
	  return check
	  function check(code) {
	    return regex.test(fromCharCode(code))
	  }
	}
	regexCheck_1 = regexCheck;
	return regexCheck_1;
}

var asciiAlpha_1;
var hasRequiredAsciiAlpha;

function requireAsciiAlpha () {
	if (hasRequiredAsciiAlpha) return asciiAlpha_1;
	hasRequiredAsciiAlpha = 1;
	var regexCheck = requireRegexCheck();
	var asciiAlpha = regexCheck(/[A-Za-z]/);
	asciiAlpha_1 = asciiAlpha;
	return asciiAlpha_1;
}

var asciiAlphanumeric_1;
var hasRequiredAsciiAlphanumeric;

function requireAsciiAlphanumeric () {
	if (hasRequiredAsciiAlphanumeric) return asciiAlphanumeric_1;
	hasRequiredAsciiAlphanumeric = 1;
	var regexCheck = requireRegexCheck();
	var asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
	asciiAlphanumeric_1 = asciiAlphanumeric;
	return asciiAlphanumeric_1;
}

var asciiControl_1;
var hasRequiredAsciiControl;

function requireAsciiControl () {
	if (hasRequiredAsciiControl) return asciiControl_1;
	hasRequiredAsciiControl = 1;
	function asciiControl(code) {
	  return (
	    code < 32 || code === 127
	  )
	}
	asciiControl_1 = asciiControl;
	return asciiControl_1;
}

var markdownLineEnding_1;
var hasRequiredMarkdownLineEnding;

function requireMarkdownLineEnding () {
	if (hasRequiredMarkdownLineEnding) return markdownLineEnding_1;
	hasRequiredMarkdownLineEnding = 1;
	function markdownLineEnding(code) {
	  return code < -2
	}
	markdownLineEnding_1 = markdownLineEnding;
	return markdownLineEnding_1;
}

var unicodePunctuationRegex;
var hasRequiredUnicodePunctuationRegex;

function requireUnicodePunctuationRegex () {
	if (hasRequiredUnicodePunctuationRegex) return unicodePunctuationRegex;
	hasRequiredUnicodePunctuationRegex = 1;
	var unicodePunctuation = /[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;
	unicodePunctuationRegex = unicodePunctuation;
	return unicodePunctuationRegex;
}

var unicodePunctuation_1;
var hasRequiredUnicodePunctuation;

function requireUnicodePunctuation () {
	if (hasRequiredUnicodePunctuation) return unicodePunctuation_1;
	hasRequiredUnicodePunctuation = 1;
	var unicodePunctuationRegex = requireUnicodePunctuationRegex();
	var regexCheck = requireRegexCheck();
	var unicodePunctuation = regexCheck(unicodePunctuationRegex);
	unicodePunctuation_1 = unicodePunctuation;
	return unicodePunctuation_1;
}

var unicodeWhitespace_1;
var hasRequiredUnicodeWhitespace;

function requireUnicodeWhitespace () {
	if (hasRequiredUnicodeWhitespace) return unicodeWhitespace_1;
	hasRequiredUnicodeWhitespace = 1;
	var regexCheck = requireRegexCheck();
	var unicodeWhitespace = regexCheck(/\s/);
	unicodeWhitespace_1 = unicodeWhitespace;
	return unicodeWhitespace_1;
}

var hasRequiredSyntax$3;

function requireSyntax$3 () {
	if (hasRequiredSyntax$3) return syntax$3;
	hasRequiredSyntax$3 = 1;
	var asciiAlpha = requireAsciiAlpha();
	var asciiAlphanumeric = requireAsciiAlphanumeric();
	var asciiControl = requireAsciiControl();
	var markdownLineEnding = requireMarkdownLineEnding();
	var unicodePunctuation = requireUnicodePunctuation();
	var unicodeWhitespace = requireUnicodeWhitespace();
	var www = {tokenize: tokenizeWww, partial: true};
	var domain = {tokenize: tokenizeDomain, partial: true};
	var path = {tokenize: tokenizePath, partial: true};
	var punctuation = {tokenize: tokenizePunctuation, partial: true};
	var namedCharacterReference = {
	  tokenize: tokenizeNamedCharacterReference,
	  partial: true
	};
	var wwwAutolink = {tokenize: tokenizeWwwAutolink, previous: previousWww};
	var httpAutolink = {tokenize: tokenizeHttpAutolink, previous: previousHttp};
	var emailAutolink = {tokenize: tokenizeEmailAutolink, previous: previousEmail};
	var text = {};
	syntax$3.text = text;
	var code = 48;
	while (code < 123) {
	  text[code] = emailAutolink;
	  code++;
	  if (code === 58) code = 65;
	  else if (code === 91) code = 97;
	}
	text[43] = emailAutolink;
	text[45] = emailAutolink;
	text[46] = emailAutolink;
	text[95] = emailAutolink;
	text[72] = [emailAutolink, httpAutolink];
	text[104] = [emailAutolink, httpAutolink];
	text[87] = [emailAutolink, wwwAutolink];
	text[119] = [emailAutolink, wwwAutolink];
	function tokenizeEmailAutolink(effects, ok, nok) {
	  var self = this;
	  var hasDot;
	  return start
	  function start(code) {
	    if (
	      !gfmAtext(code) ||
	      !previousEmail(self.previous) ||
	      previous(self.events)
	    ) {
	      return nok(code)
	    }
	    effects.enter('literalAutolink');
	    effects.enter('literalAutolinkEmail');
	    return atext(code)
	  }
	  function atext(code) {
	    if (gfmAtext(code)) {
	      effects.consume(code);
	      return atext
	    }
	    if (code === 64) {
	      effects.consume(code);
	      return label
	    }
	    return nok(code)
	  }
	  function label(code) {
	    if (code === 46) {
	      return effects.check(punctuation, done, dotContinuation)(code)
	    }
	    if (
	      code === 45 ||
	      code === 95
	    ) {
	      return effects.check(punctuation, nok, dashOrUnderscoreContinuation)(code)
	    }
	    if (asciiAlphanumeric(code)) {
	      effects.consume(code);
	      return label
	    }
	    return done(code)
	  }
	  function dotContinuation(code) {
	    effects.consume(code);
	    hasDot = true;
	    return label
	  }
	  function dashOrUnderscoreContinuation(code) {
	    effects.consume(code);
	    return afterDashOrUnderscore
	  }
	  function afterDashOrUnderscore(code) {
	    if (code === 46) {
	      return effects.check(punctuation, nok, dotContinuation)(code)
	    }
	    return label(code)
	  }
	  function done(code) {
	    if (hasDot) {
	      effects.exit('literalAutolinkEmail');
	      effects.exit('literalAutolink');
	      return ok(code)
	    }
	    return nok(code)
	  }
	}
	function tokenizeWwwAutolink(effects, ok, nok) {
	  var self = this;
	  return start
	  function start(code) {
	    if (
	      (code !== 87 && code - 32 !== 87) ||
	      !previousWww(self.previous) ||
	      previous(self.events)
	    ) {
	      return nok(code)
	    }
	    effects.enter('literalAutolink');
	    effects.enter('literalAutolinkWww');
	    return effects.check(
	      www,
	      effects.attempt(domain, effects.attempt(path, done), nok),
	      nok
	    )(code)
	  }
	  function done(code) {
	    effects.exit('literalAutolinkWww');
	    effects.exit('literalAutolink');
	    return ok(code)
	  }
	}
	function tokenizeHttpAutolink(effects, ok, nok) {
	  var self = this;
	  return start
	  function start(code) {
	    if (
	      (code !== 72 && code - 32 !== 72) ||
	      !previousHttp(self.previous) ||
	      previous(self.events)
	    ) {
	      return nok(code)
	    }
	    effects.enter('literalAutolink');
	    effects.enter('literalAutolinkHttp');
	    effects.consume(code);
	    return t1
	  }
	  function t1(code) {
	    if (code === 84 || code - 32 === 84) {
	      effects.consume(code);
	      return t2
	    }
	    return nok(code)
	  }
	  function t2(code) {
	    if (code === 84 || code - 32 === 84) {
	      effects.consume(code);
	      return p
	    }
	    return nok(code)
	  }
	  function p(code) {
	    if (code === 80 || code - 32 === 80) {
	      effects.consume(code);
	      return s
	    }
	    return nok(code)
	  }
	  function s(code) {
	    if (code === 83 || code - 32 === 83) {
	      effects.consume(code);
	      return colon
	    }
	    return colon(code)
	  }
	  function colon(code) {
	    if (code === 58) {
	      effects.consume(code);
	      return slash1
	    }
	    return nok(code)
	  }
	  function slash1(code) {
	    if (code === 47) {
	      effects.consume(code);
	      return slash2
	    }
	    return nok(code)
	  }
	  function slash2(code) {
	    if (code === 47) {
	      effects.consume(code);
	      return after
	    }
	    return nok(code)
	  }
	  function after(code) {
	    return asciiControl(code) ||
	      unicodeWhitespace(code) ||
	      unicodePunctuation(code)
	      ? nok(code)
	      : effects.attempt(domain, effects.attempt(path, done), nok)(code)
	  }
	  function done(code) {
	    effects.exit('literalAutolinkHttp');
	    effects.exit('literalAutolink');
	    return ok(code)
	  }
	}
	function tokenizeWww(effects, ok, nok) {
	  return start
	  function start(code) {
	    effects.consume(code);
	    return w2
	  }
	  function w2(code) {
	    if (code === 87 || code - 32 === 87) {
	      effects.consume(code);
	      return w3
	    }
	    return nok(code)
	  }
	  function w3(code) {
	    if (code === 87 || code - 32 === 87) {
	      effects.consume(code);
	      return dot
	    }
	    return nok(code)
	  }
	  function dot(code) {
	    if (code === 46) {
	      effects.consume(code);
	      return after
	    }
	    return nok(code)
	  }
	  function after(code) {
	    return code === null || markdownLineEnding(code) ? nok(code) : ok(code)
	  }
	}
	function tokenizeDomain(effects, ok, nok) {
	  var hasUnderscoreInLastSegment;
	  var hasUnderscoreInLastLastSegment;
	  return domain
	  function domain(code) {
	    if (code === 38) {
	      return effects.check(
	        namedCharacterReference,
	        done,
	        punctuationContinuation
	      )(code)
	    }
	    if (code === 46  || code === 95 ) {
	      return effects.check(punctuation, done, punctuationContinuation)(code)
	    }
	    if (
	      asciiControl(code) ||
	      unicodeWhitespace(code) ||
	      (code !== 45  && unicodePunctuation(code))
	    ) {
	      return done(code)
	    }
	    effects.consume(code);
	    return domain
	  }
	  function punctuationContinuation(code) {
	    if (code === 46) {
	      hasUnderscoreInLastLastSegment = hasUnderscoreInLastSegment;
	      hasUnderscoreInLastSegment = undefined;
	      effects.consume(code);
	      return domain
	    }
	    if (code === 95) hasUnderscoreInLastSegment = true;
	    effects.consume(code);
	    return domain
	  }
	  function done(code) {
	    if (!hasUnderscoreInLastLastSegment && !hasUnderscoreInLastSegment) {
	      return ok(code)
	    }
	    return nok(code)
	  }
	}
	function tokenizePath(effects, ok) {
	  var balance = 0;
	  return inPath
	  function inPath(code) {
	    if (code === 38) {
	      return effects.check(
	        namedCharacterReference,
	        ok,
	        continuedPunctuation
	      )(code)
	    }
	    if (code === 40) {
	      balance++;
	    }
	    if (code === 41) {
	      return effects.check(
	        punctuation,
	        parenAtPathEnd,
	        continuedPunctuation
	      )(code)
	    }
	    if (pathEnd(code)) {
	      return ok(code)
	    }
	    if (trailingPunctuation(code)) {
	      return effects.check(punctuation, ok, continuedPunctuation)(code)
	    }
	    effects.consume(code);
	    return inPath
	  }
	  function continuedPunctuation(code) {
	    effects.consume(code);
	    return inPath
	  }
	  function parenAtPathEnd(code) {
	    balance--;
	    return balance < 0 ? ok(code) : continuedPunctuation(code)
	  }
	}
	function tokenizeNamedCharacterReference(effects, ok, nok) {
	  return start
	  function start(code) {
	    effects.consume(code);
	    return inside
	  }
	  function inside(code) {
	    if (asciiAlpha(code)) {
	      effects.consume(code);
	      return inside
	    }
	    if (code === 59) {
	      effects.consume(code);
	      return after
	    }
	    return nok(code)
	  }
	  function after(code) {
	    return pathEnd(code) ? ok(code) : nok(code)
	  }
	}
	function tokenizePunctuation(effects, ok, nok) {
	  return start
	  function start(code) {
	    effects.consume(code);
	    return after
	  }
	  function after(code) {
	    if (trailingPunctuation(code)) {
	      effects.consume(code);
	      return after
	    }
	    return pathEnd(code) ? ok(code) : nok(code)
	  }
	}
	function trailingPunctuation(code) {
	  return (
	    code === 33 ||
	    code === 34 ||
	    code === 39 ||
	    code === 41 ||
	    code === 42 ||
	    code === 44 ||
	    code === 46 ||
	    code === 58 ||
	    code === 59 ||
	    code === 60 ||
	    code === 63 ||
	    code === 95 ||
	    code === 126
	  )
	}
	function pathEnd(code) {
	  return (
	    code === null ||
	    code < 0 ||
	    code === 32 ||
	    code === 60
	  )
	}
	function gfmAtext(code) {
	  return (
	    code === 43  ||
	    code === 45  ||
	    code === 46  ||
	    code === 95  ||
	    asciiAlphanumeric(code)
	  )
	}
	function previousWww(code) {
	  return (
	    code === null ||
	    code < 0 ||
	    code === 32  ||
	    code === 40  ||
	    code === 42  ||
	    code === 95  ||
	    code === 126
	  )
	}
	function previousHttp(code) {
	  return code === null || !asciiAlpha(code)
	}
	function previousEmail(code) {
	  return code !== 47  && previousHttp(code)
	}
	function previous(events) {
	  var index = events.length;
	  while (index--) {
	    if (
	      (events[index][1].type === 'labelLink' ||
	        events[index][1].type === 'labelImage') &&
	      !events[index][1]._balanced
	    ) {
	      return true
	    }
	  }
	}
	return syntax$3;
}

var micromarkExtensionGfmAutolinkLiteral;
var hasRequiredMicromarkExtensionGfmAutolinkLiteral;

function requireMicromarkExtensionGfmAutolinkLiteral () {
	if (hasRequiredMicromarkExtensionGfmAutolinkLiteral) return micromarkExtensionGfmAutolinkLiteral;
	hasRequiredMicromarkExtensionGfmAutolinkLiteral = 1;
	micromarkExtensionGfmAutolinkLiteral = requireSyntax$3();
	return micromarkExtensionGfmAutolinkLiteral;
}

var markdownLineEndingOrSpace_1;
var hasRequiredMarkdownLineEndingOrSpace;

function requireMarkdownLineEndingOrSpace () {
	if (hasRequiredMarkdownLineEndingOrSpace) return markdownLineEndingOrSpace_1;
	hasRequiredMarkdownLineEndingOrSpace = 1;
	function markdownLineEndingOrSpace(code) {
	  return code < 0 || code === 32
	}
	markdownLineEndingOrSpace_1 = markdownLineEndingOrSpace;
	return markdownLineEndingOrSpace_1;
}

var classifyCharacter_1;
var hasRequiredClassifyCharacter;

function requireClassifyCharacter () {
	if (hasRequiredClassifyCharacter) return classifyCharacter_1;
	hasRequiredClassifyCharacter = 1;
	var markdownLineEndingOrSpace = requireMarkdownLineEndingOrSpace();
	var unicodePunctuation = requireUnicodePunctuation();
	var unicodeWhitespace = requireUnicodeWhitespace();
	function classifyCharacter(code) {
	  if (
	    code === null ||
	    markdownLineEndingOrSpace(code) ||
	    unicodeWhitespace(code)
	  ) {
	    return 1
	  }
	  if (unicodePunctuation(code)) {
	    return 2
	  }
	}
	classifyCharacter_1 = classifyCharacter;
	return classifyCharacter_1;
}

var resolveAll_1;
var hasRequiredResolveAll;

function requireResolveAll () {
	if (hasRequiredResolveAll) return resolveAll_1;
	hasRequiredResolveAll = 1;
	function resolveAll(constructs, events, context) {
	  var called = [];
	  var index = -1;
	  var resolve;
	  while (++index < constructs.length) {
	    resolve = constructs[index].resolveAll;
	    if (resolve && called.indexOf(resolve) < 0) {
	      events = resolve(events, context);
	      called.push(resolve);
	    }
	  }
	  return events
	}
	resolveAll_1 = resolveAll;
	return resolveAll_1;
}

var assign_1;
var hasRequiredAssign;

function requireAssign () {
	if (hasRequiredAssign) return assign_1;
	hasRequiredAssign = 1;
	var assign = Object.assign;
	assign_1 = assign;
	return assign_1;
}

var shallow_1;
var hasRequiredShallow;

function requireShallow () {
	if (hasRequiredShallow) return shallow_1;
	hasRequiredShallow = 1;
	var assign = requireAssign();
	function shallow(object) {
	  return assign({}, object)
	}
	shallow_1 = shallow;
	return shallow_1;
}

var micromarkExtensionGfmStrikethrough;
var hasRequiredMicromarkExtensionGfmStrikethrough;

function requireMicromarkExtensionGfmStrikethrough () {
	if (hasRequiredMicromarkExtensionGfmStrikethrough) return micromarkExtensionGfmStrikethrough;
	hasRequiredMicromarkExtensionGfmStrikethrough = 1;
	micromarkExtensionGfmStrikethrough = create;
	var classifyCharacter = requireClassifyCharacter();
	var chunkedSplice = requireChunkedSplice();
	var resolveAll = requireResolveAll();
	var shallow = requireShallow();
	function create(options) {
	  var settings = options || {};
	  var single = settings.singleTilde;
	  var tokenizer = {
	    tokenize: tokenizeStrikethrough,
	    resolveAll: resolveAllStrikethrough
	  };
	  if (single === null || single === undefined) {
	    single = true;
	  }
	  return {text: {126: tokenizer}, insideSpan: {null: tokenizer}}
	  function resolveAllStrikethrough(events, context) {
	    var index = -1;
	    var strikethrough;
	    var text;
	    var open;
	    var nextEvents;
	    while (++index < events.length) {
	      if (
	        events[index][0] === 'enter' &&
	        events[index][1].type === 'strikethroughSequenceTemporary' &&
	        events[index][1]._close
	      ) {
	        open = index;
	        while (open--) {
	          if (
	            events[open][0] === 'exit' &&
	            events[open][1].type === 'strikethroughSequenceTemporary' &&
	            events[open][1]._open &&
	            events[index][1].end.offset - events[index][1].start.offset ===
	              events[open][1].end.offset - events[open][1].start.offset
	          ) {
	            events[index][1].type = 'strikethroughSequence';
	            events[open][1].type = 'strikethroughSequence';
	            strikethrough = {
	              type: 'strikethrough',
	              start: shallow(events[open][1].start),
	              end: shallow(events[index][1].end)
	            };
	            text = {
	              type: 'strikethroughText',
	              start: shallow(events[open][1].end),
	              end: shallow(events[index][1].start)
	            };
	            nextEvents = [
	              ['enter', strikethrough, context],
	              ['enter', events[open][1], context],
	              ['exit', events[open][1], context],
	              ['enter', text, context]
	            ];
	            chunkedSplice(
	              nextEvents,
	              nextEvents.length,
	              0,
	              resolveAll(
	                context.parser.constructs.insideSpan.null,
	                events.slice(open + 1, index),
	                context
	              )
	            );
	            chunkedSplice(nextEvents, nextEvents.length, 0, [
	              ['exit', text, context],
	              ['enter', events[index][1], context],
	              ['exit', events[index][1], context],
	              ['exit', strikethrough, context]
	            ]);
	            chunkedSplice(events, open - 1, index - open + 3, nextEvents);
	            index = open + nextEvents.length - 2;
	            break
	          }
	        }
	      }
	    }
	    return removeRemainingSequences(events)
	  }
	  function removeRemainingSequences(events) {
	    var index = -1;
	    var length = events.length;
	    while (++index < length) {
	      if (events[index][1].type === 'strikethroughSequenceTemporary') {
	        events[index][1].type = 'data';
	      }
	    }
	    return events
	  }
	  function tokenizeStrikethrough(effects, ok, nok) {
	    var previous = this.previous;
	    var events = this.events;
	    var size = 0;
	    return start
	    function start(code) {
	      if (
	        code !== 126 ||
	        (previous === 126 &&
	          events[events.length - 1][1].type !== 'characterEscape')
	      ) {
	        return nok(code)
	      }
	      effects.enter('strikethroughSequenceTemporary');
	      return more(code)
	    }
	    function more(code) {
	      var before = classifyCharacter(previous);
	      var token;
	      var after;
	      if (code === 126) {
	        if (size > 1) return nok(code)
	        effects.consume(code);
	        size++;
	        return more
	      }
	      if (size < 2 && !single) return nok(code)
	      token = effects.exit('strikethroughSequenceTemporary');
	      after = classifyCharacter(code);
	      token._open = !after || (after === 2 && before);
	      token._close = !before || (before === 2 && after);
	      return ok(code)
	    }
	  }
	}
	return micromarkExtensionGfmStrikethrough;
}

var syntax$2 = {};

var markdownSpace_1;
var hasRequiredMarkdownSpace;

function requireMarkdownSpace () {
	if (hasRequiredMarkdownSpace) return markdownSpace_1;
	hasRequiredMarkdownSpace = 1;
	function markdownSpace(code) {
	  return code === -2 || code === -1 || code === 32
	}
	markdownSpace_1 = markdownSpace;
	return markdownSpace_1;
}

var factorySpace;
var hasRequiredFactorySpace;

function requireFactorySpace () {
	if (hasRequiredFactorySpace) return factorySpace;
	hasRequiredFactorySpace = 1;
	var markdownSpace = requireMarkdownSpace();
	function spaceFactory(effects, ok, type, max) {
	  var limit = max ? max - 1 : Infinity;
	  var size = 0;
	  return start
	  function start(code) {
	    if (markdownSpace(code)) {
	      effects.enter(type);
	      return prefix(code)
	    }
	    return ok(code)
	  }
	  function prefix(code) {
	    if (markdownSpace(code) && size++ < limit) {
	      effects.consume(code);
	      return prefix
	    }
	    effects.exit(type);
	    return ok(code)
	  }
	}
	factorySpace = spaceFactory;
	return factorySpace;
}

var hasRequiredSyntax$2;

function requireSyntax$2 () {
	if (hasRequiredSyntax$2) return syntax$2;
	hasRequiredSyntax$2 = 1;
	syntax$2.flow = {
	  null: {tokenize: tokenizeTable, resolve: resolveTable, interruptible: true}
	};
	var createSpace = requireFactorySpace();
	var setextUnderlineMini = {tokenize: tokenizeSetextUnderlineMini, partial: true};
	var nextPrefixedOrBlank = {tokenize: tokenizeNextPrefixedOrBlank, partial: true};
	function resolveTable(events, context) {
	  var length = events.length;
	  var index = -1;
	  var token;
	  var inHead;
	  var inDelimiterRow;
	  var inRow;
	  var cell;
	  var content;
	  var text;
	  var contentStart;
	  var contentEnd;
	  var cellStart;
	  while (++index < length) {
	    token = events[index][1];
	    if (inRow) {
	      if (token.type === 'temporaryTableCellContent') {
	        contentStart = contentStart || index;
	        contentEnd = index;
	      }
	      if (
	        (token.type === 'tableCellDivider' || token.type === 'tableRow') &&
	        contentEnd
	      ) {
	        content = {
	          type: 'tableContent',
	          start: events[contentStart][1].start,
	          end: events[contentEnd][1].end
	        };
	        text = {
	          type: 'chunkText',
	          start: content.start,
	          end: content.end,
	          contentType: 'text'
	        };
	        events.splice(
	          contentStart,
	          contentEnd - contentStart + 1,
	          ['enter', content, context],
	          ['enter', text, context],
	          ['exit', text, context],
	          ['exit', content, context]
	        );
	        index -= contentEnd - contentStart - 3;
	        length = events.length;
	        contentStart = undefined;
	        contentEnd = undefined;
	      }
	    }
	    if (
	      events[index][0] === 'exit' &&
	      cellStart &&
	      cellStart + 1 < index &&
	      (token.type === 'tableCellDivider' ||
	        (token.type === 'tableRow' &&
	          (cellStart + 3 < index ||
	            events[cellStart][1].type !== 'whitespace')))
	    ) {
	      cell = {
	        type: inDelimiterRow
	          ? 'tableDelimiter'
	          : inHead
	          ? 'tableHeader'
	          : 'tableData',
	        start: events[cellStart][1].start,
	        end: events[index][1].end
	      };
	      events.splice(index + (token.type === 'tableCellDivider' ? 1 : 0), 0, [
	        'exit',
	        cell,
	        context
	      ]);
	      events.splice(cellStart, 0, ['enter', cell, context]);
	      index += 2;
	      length = events.length;
	      cellStart = index + 1;
	    }
	    if (token.type === 'tableRow') {
	      inRow = events[index][0] === 'enter';
	      if (inRow) {
	        cellStart = index + 1;
	      }
	    }
	    if (token.type === 'tableDelimiterRow') {
	      inDelimiterRow = events[index][0] === 'enter';
	      if (inDelimiterRow) {
	        cellStart = index + 1;
	      }
	    }
	    if (token.type === 'tableHead') {
	      inHead = events[index][0] === 'enter';
	    }
	  }
	  return events
	}
	function tokenizeTable(effects, ok, nok) {
	  var align = [];
	  var tableHeaderCount = 0;
	  var seenDelimiter;
	  var hasDash;
	  return start
	  function start(code) {
	    if (code === null || code === -5 || code === -4 || code === -3) {
	      return nok(code)
	    }
	    effects.enter('table')._align = align;
	    effects.enter('tableHead');
	    effects.enter('tableRow');
	    if (code === 124) {
	      return cellDividerHead(code)
	    }
	    tableHeaderCount++;
	    effects.enter('temporaryTableCellContent');
	    return inCellContentHead(code)
	  }
	  function cellDividerHead(code) {
	    effects.enter('tableCellDivider');
	    effects.consume(code);
	    effects.exit('tableCellDivider');
	    seenDelimiter = true;
	    return cellBreakHead
	  }
	  function cellBreakHead(code) {
	    if (code === null || code === -5 || code === -4 || code === -3) {
	      return atRowEndHead(code)
	    }
	    if (code === -2 || code === -1 || code === 32) {
	      effects.enter('whitespace');
	      effects.consume(code);
	      return inWhitespaceHead
	    }
	    if (seenDelimiter) {
	      seenDelimiter = undefined;
	      tableHeaderCount++;
	    }
	    if (code === 124) {
	      return cellDividerHead(code)
	    }
	    effects.enter('temporaryTableCellContent');
	    return inCellContentHead(code)
	  }
	  function inWhitespaceHead(code) {
	    if (code === -2 || code === -1 || code === 32) {
	      effects.consume(code);
	      return inWhitespaceHead
	    }
	    effects.exit('whitespace');
	    return cellBreakHead(code)
	  }
	  function inCellContentHead(code) {
	    if (code === null || code < 0 || code === 32 || code === 124) {
	      effects.exit('temporaryTableCellContent');
	      return cellBreakHead(code)
	    }
	    effects.consume(code);
	    return code === 92 ? inCellContentEscapeHead : inCellContentHead
	  }
	  function inCellContentEscapeHead(code) {
	    if (code === 92 || code === 124) {
	      effects.consume(code);
	      return inCellContentHead
	    }
	    return inCellContentHead(code)
	  }
	  function atRowEndHead(code) {
	    if (code === null) {
	      return nok(code)
	    }
	    effects.exit('tableRow');
	    effects.exit('tableHead');
	    effects.enter('lineEnding');
	    effects.consume(code);
	    effects.exit('lineEnding');
	    return effects.check(
	      setextUnderlineMini,
	      nok,
	      createSpace(effects, rowStartDelimiter, 'linePrefix', 4)
	    )
	  }
	  function rowStartDelimiter(code) {
	    if (code === null || code < 0 || code === 32) {
	      return nok(code)
	    }
	    effects.enter('tableDelimiterRow');
	    return atDelimiterRowBreak(code)
	  }
	  function atDelimiterRowBreak(code) {
	    if (code === null || code === -5 || code === -4 || code === -3) {
	      return rowEndDelimiter(code)
	    }
	    if (code === -2 || code === -1 || code === 32) {
	      effects.enter('whitespace');
	      effects.consume(code);
	      return inWhitespaceDelimiter
	    }
	    if (code === 45) {
	      effects.enter('tableDelimiterFiller');
	      effects.consume(code);
	      hasDash = true;
	      align.push(null);
	      return inFillerDelimiter
	    }
	    if (code === 58) {
	      effects.enter('tableDelimiterAlignment');
	      effects.consume(code);
	      effects.exit('tableDelimiterAlignment');
	      align.push('left');
	      return afterLeftAlignment
	    }
	    if (code === 124) {
	      effects.enter('tableCellDivider');
	      effects.consume(code);
	      effects.exit('tableCellDivider');
	      return atDelimiterRowBreak
	    }
	    return nok(code)
	  }
	  function inWhitespaceDelimiter(code) {
	    if (code === -2 || code === -1 || code === 32) {
	      effects.consume(code);
	      return inWhitespaceDelimiter
	    }
	    effects.exit('whitespace');
	    return atDelimiterRowBreak(code)
	  }
	  function inFillerDelimiter(code) {
	    if (code === 45) {
	      effects.consume(code);
	      return inFillerDelimiter
	    }
	    effects.exit('tableDelimiterFiller');
	    if (code === 58) {
	      effects.enter('tableDelimiterAlignment');
	      effects.consume(code);
	      effects.exit('tableDelimiterAlignment');
	      align[align.length - 1] =
	        align[align.length - 1] === 'left' ? 'center' : 'right';
	      return afterRightAlignment
	    }
	    return atDelimiterRowBreak(code)
	  }
	  function afterLeftAlignment(code) {
	    if (code === 45) {
	      effects.enter('tableDelimiterFiller');
	      effects.consume(code);
	      hasDash = true;
	      return inFillerDelimiter
	    }
	    return nok(code)
	  }
	  function afterRightAlignment(code) {
	    if (code === null || code === -5 || code === -4 || code === -3) {
	      return rowEndDelimiter(code)
	    }
	    if (code === -2 || code === -1 || code === 32) {
	      effects.enter('whitespace');
	      effects.consume(code);
	      return inWhitespaceDelimiter
	    }
	    if (code === 124) {
	      effects.enter('tableCellDivider');
	      effects.consume(code);
	      effects.exit('tableCellDivider');
	      return atDelimiterRowBreak
	    }
	    return nok(code)
	  }
	  function rowEndDelimiter(code) {
	    effects.exit('tableDelimiterRow');
	    if (!hasDash || tableHeaderCount !== align.length) {
	      return nok(code)
	    }
	    if (code === null) {
	      return tableClose(code)
	    }
	    return effects.check(nextPrefixedOrBlank, tableClose, tableContinue)(code)
	  }
	  function tableClose(code) {
	    effects.exit('table');
	    return ok(code)
	  }
	  function tableContinue(code) {
	    effects.enter('lineEnding');
	    effects.consume(code);
	    effects.exit('lineEnding');
	    return createSpace(effects, bodyStart, 'linePrefix', 4)
	  }
	  function bodyStart(code) {
	    effects.enter('tableBody');
	    return rowStartBody(code)
	  }
	  function rowStartBody(code) {
	    effects.enter('tableRow');
	    if (code === 124) {
	      return cellDividerBody(code)
	    }
	    effects.enter('temporaryTableCellContent');
	    return inCellContentBody(code)
	  }
	  function cellDividerBody(code) {
	    effects.enter('tableCellDivider');
	    effects.consume(code);
	    effects.exit('tableCellDivider');
	    return cellBreakBody
	  }
	  function cellBreakBody(code) {
	    if (code === null || code === -5 || code === -4 || code === -3) {
	      return atRowEndBody(code)
	    }
	    if (code === -2 || code === -1 || code === 32) {
	      effects.enter('whitespace');
	      effects.consume(code);
	      return inWhitespaceBody
	    }
	    if (code === 124) {
	      return cellDividerBody(code)
	    }
	    effects.enter('temporaryTableCellContent');
	    return inCellContentBody(code)
	  }
	  function inWhitespaceBody(code) {
	    if (code === -2 || code === -1 || code === 32) {
	      effects.consume(code);
	      return inWhitespaceBody
	    }
	    effects.exit('whitespace');
	    return cellBreakBody(code)
	  }
	  function inCellContentBody(code) {
	    if (code === null || code < 0 || code === 32 || code === 124) {
	      effects.exit('temporaryTableCellContent');
	      return cellBreakBody(code)
	    }
	    effects.consume(code);
	    return code === 92 ? inCellContentEscapeBody : inCellContentBody
	  }
	  function inCellContentEscapeBody(code) {
	    if (code === 92 || code === 124) {
	      effects.consume(code);
	      return inCellContentBody
	    }
	    return inCellContentBody(code)
	  }
	  function atRowEndBody(code) {
	    effects.exit('tableRow');
	    if (code === null) {
	      return tableBodyClose(code)
	    }
	    return effects.check(
	      nextPrefixedOrBlank,
	      tableBodyClose,
	      tableBodyContinue
	    )(code)
	  }
	  function tableBodyClose(code) {
	    effects.exit('tableBody');
	    return tableClose(code)
	  }
	  function tableBodyContinue(code) {
	    effects.enter('lineEnding');
	    effects.consume(code);
	    effects.exit('lineEnding');
	    return createSpace(effects, rowStartBody, 'linePrefix', 4)
	  }
	}
	function tokenizeSetextUnderlineMini(effects, ok, nok) {
	  return start
	  function start(code) {
	    if (code !== 45) {
	      return nok(code)
	    }
	    effects.enter('setextUnderline');
	    return sequence(code)
	  }
	  function sequence(code) {
	    if (code === 45) {
	      effects.consume(code);
	      return sequence
	    }
	    return whitespace(code)
	  }
	  function whitespace(code) {
	    if (code === -2 || code === -1 || code === 32) {
	      effects.consume(code);
	      return whitespace
	    }
	    if (code === null || code === -5 || code === -4 || code === -3) {
	      return ok(code)
	    }
	    return nok(code)
	  }
	}
	function tokenizeNextPrefixedOrBlank(effects, ok, nok) {
	  var size = 0;
	  return start
	  function start(code) {
	    effects.enter('check');
	    effects.consume(code);
	    return whitespace
	  }
	  function whitespace(code) {
	    if (code === -1 || code === 32) {
	      effects.consume(code);
	      size++;
	      return size === 4 ? ok : whitespace
	    }
	    if (code === null || code < 0) {
	      return ok(code)
	    }
	    return nok(code)
	  }
	}
	return syntax$2;
}

var micromarkExtensionGfmTable;
var hasRequiredMicromarkExtensionGfmTable;

function requireMicromarkExtensionGfmTable () {
	if (hasRequiredMicromarkExtensionGfmTable) return micromarkExtensionGfmTable;
	hasRequiredMicromarkExtensionGfmTable = 1;
	micromarkExtensionGfmTable = requireSyntax$2();
	return micromarkExtensionGfmTable;
}

var syntax$1 = {};

var sizeChunks_1;
var hasRequiredSizeChunks;

function requireSizeChunks () {
	if (hasRequiredSizeChunks) return sizeChunks_1;
	hasRequiredSizeChunks = 1;
	function sizeChunks(chunks) {
	  var index = -1;
	  var size = 0;
	  while (++index < chunks.length) {
	    size += typeof chunks[index] === 'string' ? chunks[index].length : 1;
	  }
	  return size
	}
	sizeChunks_1 = sizeChunks;
	return sizeChunks_1;
}

var prefixSize_1;
var hasRequiredPrefixSize;

function requirePrefixSize () {
	if (hasRequiredPrefixSize) return prefixSize_1;
	hasRequiredPrefixSize = 1;
	var sizeChunks = requireSizeChunks();
	function prefixSize(events, type) {
	  var tail = events[events.length - 1];
	  if (!tail || tail[1].type !== type) return 0
	  return sizeChunks(tail[2].sliceStream(tail[1]))
	}
	prefixSize_1 = prefixSize;
	return prefixSize_1;
}

var hasRequiredSyntax$1;

function requireSyntax$1 () {
	if (hasRequiredSyntax$1) return syntax$1;
	hasRequiredSyntax$1 = 1;
	var markdownLineEndingOrSpace = requireMarkdownLineEndingOrSpace();
	var spaceFactory = requireFactorySpace();
	var prefixSize = requirePrefixSize();
	var tasklistCheck = {tokenize: tokenizeTasklistCheck};
	syntax$1.text = {91: tasklistCheck};
	function tokenizeTasklistCheck(effects, ok, nok) {
	  var self = this;
	  return open
	  function open(code) {
	    if (
	      code !== 91 ||
	      self.previous !== null ||
	      !self._gfmTasklistFirstContentOfListItem
	    ) {
	      return nok(code)
	    }
	    effects.enter('taskListCheck');
	    effects.enter('taskListCheckMarker');
	    effects.consume(code);
	    effects.exit('taskListCheckMarker');
	    return inside
	  }
	  function inside(code) {
	    if (code === -2 || code === 32) {
	      effects.enter('taskListCheckValueUnchecked');
	      effects.consume(code);
	      effects.exit('taskListCheckValueUnchecked');
	      return close
	    }
	    if (code === 88 || code === 120) {
	      effects.enter('taskListCheckValueChecked');
	      effects.consume(code);
	      effects.exit('taskListCheckValueChecked');
	      return close
	    }
	    return nok(code)
	  }
	  function close(code) {
	    if (code === 93) {
	      effects.enter('taskListCheckMarker');
	      effects.consume(code);
	      effects.exit('taskListCheckMarker');
	      effects.exit('taskListCheck');
	      return effects.check({tokenize: spaceThenNonSpace}, ok, nok)
	    }
	    return nok(code)
	  }
	}
	function spaceThenNonSpace(effects, ok, nok) {
	  var self = this;
	  return spaceFactory(effects, after, 'whitespace')
	  function after(code) {
	    return prefixSize(self.events, 'whitespace') &&
	      code !== null &&
	      !markdownLineEndingOrSpace(code)
	      ? ok(code)
	      : nok(code)
	  }
	}
	return syntax$1;
}

var micromarkExtensionGfmTaskListItem;
var hasRequiredMicromarkExtensionGfmTaskListItem;

function requireMicromarkExtensionGfmTaskListItem () {
	if (hasRequiredMicromarkExtensionGfmTaskListItem) return micromarkExtensionGfmTaskListItem;
	hasRequiredMicromarkExtensionGfmTaskListItem = 1;
	micromarkExtensionGfmTaskListItem = requireSyntax$1();
	return micromarkExtensionGfmTaskListItem;
}

var syntax;
var hasRequiredSyntax;

function requireSyntax () {
	if (hasRequiredSyntax) return syntax;
	hasRequiredSyntax = 1;
	var combine = requireCombineExtensions();
	var autolink = requireMicromarkExtensionGfmAutolinkLiteral();
	var strikethrough = requireMicromarkExtensionGfmStrikethrough();
	var table = requireMicromarkExtensionGfmTable();
	var tasklist = requireMicromarkExtensionGfmTaskListItem();
	syntax = create;
	function create(options) {
	  return combine([autolink, strikethrough(options), table, tasklist])
	}
	return syntax;
}

var micromarkExtensionGfm;
var hasRequiredMicromarkExtensionGfm;

function requireMicromarkExtensionGfm () {
	if (hasRequiredMicromarkExtensionGfm) return micromarkExtensionGfm;
	hasRequiredMicromarkExtensionGfm = 1;
	micromarkExtensionGfm = requireSyntax();
	return micromarkExtensionGfm;
}

var fromMarkdown$4 = {};

var ccount_1;
var hasRequiredCcount;

function requireCcount () {
	if (hasRequiredCcount) return ccount_1;
	hasRequiredCcount = 1;
	ccount_1 = ccount;
	function ccount(source, character) {
	  var value = String(source);
	  var count = 0;
	  var index;
	  if (typeof character !== 'string') {
	    throw new Error('Expected character')
	  }
	  index = value.indexOf(character);
	  while (index !== -1) {
	    count++;
	    index = value.indexOf(character, index + character.length);
	  }
	  return count
	}
	return ccount_1;
}

var convert_1;
var hasRequiredConvert$1;

function requireConvert$1 () {
	if (hasRequiredConvert$1) return convert_1;
	hasRequiredConvert$1 = 1;
	convert_1 = convert;
	function convert(test) {
	  if (test == null) {
	    return ok
	  }
	  if (typeof test === 'string') {
	    return typeFactory(test)
	  }
	  if (typeof test === 'object') {
	    return 'length' in test ? anyFactory(test) : allFactory(test)
	  }
	  if (typeof test === 'function') {
	    return test
	  }
	  throw new Error('Expected function, string, or object as test')
	}
	function allFactory(test) {
	  return all
	  function all(node) {
	    var key;
	    for (key in test) {
	      if (node[key] !== test[key]) return false
	    }
	    return true
	  }
	}
	function anyFactory(tests) {
	  var checks = [];
	  var index = -1;
	  while (++index < tests.length) {
	    checks[index] = convert(tests[index]);
	  }
	  return any
	  function any() {
	    var index = -1;
	    while (++index < checks.length) {
	      if (checks[index].apply(this, arguments)) {
	        return true
	      }
	    }
	    return false
	  }
	}
	function typeFactory(test) {
	  return type
	  function type(node) {
	    return Boolean(node && node.type === test)
	  }
	}
	function ok() {
	  return true
	}
	return convert_1;
}

var color_browser;
var hasRequiredColor_browser;

function requireColor_browser () {
	if (hasRequiredColor_browser) return color_browser;
	hasRequiredColor_browser = 1;
	color_browser = identity;
	function identity(d) {
	  return d
	}
	return color_browser;
}

var unistUtilVisitParents;
var hasRequiredUnistUtilVisitParents;

function requireUnistUtilVisitParents () {
	if (hasRequiredUnistUtilVisitParents) return unistUtilVisitParents;
	hasRequiredUnistUtilVisitParents = 1;
	unistUtilVisitParents = visitParents;
	var convert = requireConvert$1();
	var color = requireColor_browser();
	var CONTINUE = true;
	var SKIP = 'skip';
	var EXIT = false;
	visitParents.CONTINUE = CONTINUE;
	visitParents.SKIP = SKIP;
	visitParents.EXIT = EXIT;
	function visitParents(tree, test, visitor, reverse) {
	  var step;
	  var is;
	  if (typeof test === 'function' && typeof visitor !== 'function') {
	    reverse = visitor;
	    visitor = test;
	    test = null;
	  }
	  is = convert(test);
	  step = reverse ? -1 : 1;
	  factory(tree, null, [])();
	  function factory(node, index, parents) {
	    var value = typeof node === 'object' && node !== null ? node : {};
	    var name;
	    if (typeof value.type === 'string') {
	      name =
	        typeof value.tagName === 'string'
	          ? value.tagName
	          : typeof value.name === 'string'
	          ? value.name
	          : undefined;
	      visit.displayName =
	        'node (' + color(value.type + (name ? '<' + name + '>' : '')) + ')';
	    }
	    return visit
	    function visit() {
	      var grandparents = parents.concat(node);
	      var result = [];
	      var subresult;
	      var offset;
	      if (!test || is(node, index, parents[parents.length - 1] || null)) {
	        result = toResult(visitor(node, parents));
	        if (result[0] === EXIT) {
	          return result
	        }
	      }
	      if (node.children && result[0] !== SKIP) {
	        offset = (reverse ? node.children.length : -1) + step;
	        while (offset > -1 && offset < node.children.length) {
	          subresult = factory(node.children[offset], offset, grandparents)();
	          if (subresult[0] === EXIT) {
	            return subresult
	          }
	          offset =
	            typeof subresult[1] === 'number' ? subresult[1] : offset + step;
	        }
	      }
	      return result
	    }
	  }
	}
	function toResult(value) {
	  if (value !== null && typeof value === 'object' && 'length' in value) {
	    return value
	  }
	  if (typeof value === 'number') {
	    return [CONTINUE, value]
	  }
	  return [value]
	}
	return unistUtilVisitParents;
}

var escapeStringRegexp;
var hasRequiredEscapeStringRegexp;

function requireEscapeStringRegexp () {
	if (hasRequiredEscapeStringRegexp) return escapeStringRegexp;
	hasRequiredEscapeStringRegexp = 1;
	escapeStringRegexp = string => {
		if (typeof string !== 'string') {
			throw new TypeError('Expected a string');
		}
		return string
			.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
			.replace(/-/g, '\\x2d');
	};
	return escapeStringRegexp;
}

var mdastUtilFindAndReplace;
var hasRequiredMdastUtilFindAndReplace;

function requireMdastUtilFindAndReplace () {
	if (hasRequiredMdastUtilFindAndReplace) return mdastUtilFindAndReplace;
	hasRequiredMdastUtilFindAndReplace = 1;
	mdastUtilFindAndReplace = findAndReplace;
	var visit = requireUnistUtilVisitParents();
	var convert = requireConvert$1();
	var escape = requireEscapeStringRegexp();
	var splice = [].splice;
	function findAndReplace(tree, find, replace, options) {
	  var settings;
	  var schema;
	  if (typeof find === 'string' || (find && typeof find.exec === 'function')) {
	    schema = [[find, replace]];
	  } else {
	    schema = find;
	    options = replace;
	  }
	  settings = options || {};
	  search(tree, settings, handlerFactory(toPairs(schema)));
	  return tree
	  function handlerFactory(pairs) {
	    var pair = pairs[0];
	    return handler
	    function handler(node, parent) {
	      var find = pair[0];
	      var replace = pair[1];
	      var nodes = [];
	      var start = 0;
	      var index = parent.children.indexOf(node);
	      var position;
	      var match;
	      var subhandler;
	      var value;
	      find.lastIndex = 0;
	      match = find.exec(node.value);
	      while (match) {
	        position = match.index;
	        value = replace.apply(
	          null,
	          [].concat(match, {index: match.index, input: match.input})
	        );
	        if (value !== false) {
	          if (start !== position) {
	            nodes.push({type: 'text', value: node.value.slice(start, position)});
	          }
	          if (typeof value === 'string' && value.length > 0) {
	            value = {type: 'text', value: value};
	          }
	          if (value) {
	            nodes = [].concat(nodes, value);
	          }
	          start = position + match[0].length;
	        }
	        if (!find.global) {
	          break
	        }
	        match = find.exec(node.value);
	      }
	      if (position === undefined) {
	        nodes = [node];
	        index--;
	      } else {
	        if (start < node.value.length) {
	          nodes.push({type: 'text', value: node.value.slice(start)});
	        }
	        nodes.unshift(index, 1);
	        splice.apply(parent.children, nodes);
	      }
	      if (pairs.length > 1) {
	        subhandler = handlerFactory(pairs.slice(1));
	        position = -1;
	        while (++position < nodes.length) {
	          node = nodes[position];
	          if (node.type === 'text') {
	            subhandler(node, parent);
	          } else {
	            search(node, settings, subhandler);
	          }
	        }
	      }
	      return index + nodes.length + 1
	    }
	  }
	}
	function search(tree, settings, handler) {
	  var ignored = convert(settings.ignore || []);
	  var result = [];
	  visit(tree, 'text', visitor);
	  return result
	  function visitor(node, parents) {
	    var index = -1;
	    var parent;
	    var grandparent;
	    while (++index < parents.length) {
	      parent = parents[index];
	      if (
	        ignored(
	          parent,
	          grandparent ? grandparent.children.indexOf(parent) : undefined,
	          grandparent
	        )
	      ) {
	        return
	      }
	      grandparent = parent;
	    }
	    return handler(node, grandparent)
	  }
	}
	function toPairs(schema) {
	  var result = [];
	  var key;
	  var index;
	  if (typeof schema !== 'object') {
	    throw new Error('Expected array or object as schema')
	  }
	  if ('length' in schema) {
	    index = -1;
	    while (++index < schema.length) {
	      result.push([
	        toExpression(schema[index][0]),
	        toFunction(schema[index][1])
	      ]);
	    }
	  } else {
	    for (key in schema) {
	      result.push([toExpression(key), toFunction(schema[key])]);
	    }
	  }
	  return result
	}
	function toExpression(find) {
	  return typeof find === 'string' ? new RegExp(escape(find), 'g') : find
	}
	function toFunction(replace) {
	  return typeof replace === 'function' ? replace : returner
	  function returner() {
	    return replace
	  }
	}
	return mdastUtilFindAndReplace;
}

var hasRequiredFromMarkdown$4;

function requireFromMarkdown$4 () {
	if (hasRequiredFromMarkdown$4) return fromMarkdown$4;
	hasRequiredFromMarkdown$4 = 1;
	var ccount = requireCcount();
	var findAndReplace = requireMdastUtilFindAndReplace();
	var unicodePunctuation = requireUnicodePunctuation();
	var unicodeWhitespace = requireUnicodeWhitespace();
	fromMarkdown$4.transforms = [transformGfmAutolinkLiterals];
	fromMarkdown$4.enter = {
	  literalAutolink: enterLiteralAutolink,
	  literalAutolinkEmail: enterLiteralAutolinkValue,
	  literalAutolinkHttp: enterLiteralAutolinkValue,
	  literalAutolinkWww: enterLiteralAutolinkValue
	};
	fromMarkdown$4.exit = {
	  literalAutolink: exitLiteralAutolink,
	  literalAutolinkEmail: exitLiteralAutolinkEmail,
	  literalAutolinkHttp: exitLiteralAutolinkHttp,
	  literalAutolinkWww: exitLiteralAutolinkWww
	};
	function enterLiteralAutolink(token) {
	  this.enter({type: 'link', title: null, url: '', children: []}, token);
	}
	function enterLiteralAutolinkValue(token) {
	  this.config.enter.autolinkProtocol.call(this, token);
	}
	function exitLiteralAutolinkHttp(token) {
	  this.config.exit.autolinkProtocol.call(this, token);
	}
	function exitLiteralAutolinkWww(token) {
	  this.config.exit.data.call(this, token);
	  this.stack[this.stack.length - 1].url = 'http://' + this.sliceSerialize(token);
	}
	function exitLiteralAutolinkEmail(token) {
	  this.config.exit.autolinkEmail.call(this, token);
	}
	function exitLiteralAutolink(token) {
	  this.exit(token);
	}
	function transformGfmAutolinkLiterals(tree) {
	  findAndReplace(
	    tree,
	    [
	      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/i, findUrl],
	      [/([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/, findEmail]
	    ],
	    {ignore: ['link', 'linkReference']}
	  );
	}
	function findUrl($0, protocol, domain, path, match) {
	  var prefix = '';
	  var parts;
	  var result;
	  if (!previous(match)) {
	    return false
	  }
	  if (/^w/i.test(protocol)) {
	    domain = protocol + domain;
	    protocol = '';
	    prefix = 'http://';
	  }
	  if (!isCorrectDomain(domain)) {
	    return false
	  }
	  parts = splitUrl(domain + path);
	  if (!parts[0]) return false
	  result = {
	    type: 'link',
	    title: null,
	    url: prefix + protocol + parts[0],
	    children: [{type: 'text', value: protocol + parts[0]}]
	  };
	  if (parts[1]) {
	    result = [result, {type: 'text', value: parts[1]}];
	  }
	  return result
	}
	function findEmail($0, atext, label, match) {
	  if (!previous(match, true) || /[_-]$/.test(label)) {
	    return false
	  }
	  return {
	    type: 'link',
	    title: null,
	    url: 'mailto:' + atext + '@' + label,
	    children: [{type: 'text', value: atext + '@' + label}]
	  }
	}
	function isCorrectDomain(domain) {
	  var parts = domain.split('.');
	  if (
	    parts.length < 2 ||
	    (parts[parts.length - 1] &&
	      (/_/.test(parts[parts.length - 1]) ||
	        !/[a-zA-Z\d]/.test(parts[parts.length - 1]))) ||
	    (parts[parts.length - 2] &&
	      (/_/.test(parts[parts.length - 2]) ||
	        !/[a-zA-Z\d]/.test(parts[parts.length - 2])))
	  ) {
	    return false
	  }
	  return true
	}
	function splitUrl(url) {
	  var trail = /[!"&'),.:;<>?\]}]+$/.exec(url);
	  var closingParenIndex;
	  var openingParens;
	  var closingParens;
	  if (trail) {
	    url = url.slice(0, trail.index);
	    trail = trail[0];
	    closingParenIndex = trail.indexOf(')');
	    openingParens = ccount(url, '(');
	    closingParens = ccount(url, ')');
	    while (closingParenIndex !== -1 && openingParens > closingParens) {
	      url += trail.slice(0, closingParenIndex + 1);
	      trail = trail.slice(closingParenIndex + 1);
	      closingParenIndex = trail.indexOf(')');
	      closingParens++;
	    }
	  }
	  return [url, trail]
	}
	function previous(match, email) {
	  var code = match.input.charCodeAt(match.index - 1);
	  return (
	    (code !== code || unicodeWhitespace(code) || unicodePunctuation(code)) &&
	    (!email || code !== 47)
	  )
	}
	return fromMarkdown$4;
}

var fromMarkdown$3 = {};

var hasRequiredFromMarkdown$3;

function requireFromMarkdown$3 () {
	if (hasRequiredFromMarkdown$3) return fromMarkdown$3;
	hasRequiredFromMarkdown$3 = 1;
	fromMarkdown$3.canContainEols = ['delete'];
	fromMarkdown$3.enter = {strikethrough: enterStrikethrough};
	fromMarkdown$3.exit = {strikethrough: exitStrikethrough};
	function enterStrikethrough(token) {
	  this.enter({type: 'delete', children: []}, token);
	}
	function exitStrikethrough(token) {
	  this.exit(token);
	}
	return fromMarkdown$3;
}

var fromMarkdown$2 = {};

var hasRequiredFromMarkdown$2;

function requireFromMarkdown$2 () {
	if (hasRequiredFromMarkdown$2) return fromMarkdown$2;
	hasRequiredFromMarkdown$2 = 1;
	fromMarkdown$2.enter = {
	  table: enterTable,
	  tableData: enterCell,
	  tableHeader: enterCell,
	  tableRow: enterRow
	};
	fromMarkdown$2.exit = {
	  codeText: exitCodeText,
	  table: exitTable,
	  tableData: exit,
	  tableHeader: exit,
	  tableRow: exit
	};
	function enterTable(token) {
	  this.enter({type: 'table', align: token._align, children: []}, token);
	  this.setData('inTable', true);
	}
	function exitTable(token) {
	  this.exit(token);
	  this.setData('inTable');
	}
	function enterRow(token) {
	  this.enter({type: 'tableRow', children: []}, token);
	}
	function exit(token) {
	  this.exit(token);
	}
	function enterCell(token) {
	  this.enter({type: 'tableCell', children: []}, token);
	}
	function exitCodeText(token) {
	  var value = this.resume();
	  if (this.getData('inTable')) {
	    value = value.replace(/\\([\\|])/g, replace);
	  }
	  this.stack[this.stack.length - 1].value = value;
	  this.exit(token);
	}
	function replace($0, $1) {
	  return $1 === '|' ? $1 : $0
	}
	return fromMarkdown$2;
}

var fromMarkdown$1 = {};

var hasRequiredFromMarkdown$1;

function requireFromMarkdown$1 () {
	if (hasRequiredFromMarkdown$1) return fromMarkdown$1;
	hasRequiredFromMarkdown$1 = 1;
	fromMarkdown$1.exit = {
	  taskListCheckValueChecked: exitCheck,
	  taskListCheckValueUnchecked: exitCheck,
	  paragraph: exitParagraphWithTaskListItem
	};
	function exitCheck(token) {
	  this.stack[this.stack.length - 2].checked =
	    token.type === 'taskListCheckValueChecked';
	}
	function exitParagraphWithTaskListItem(token) {
	  var parent = this.stack[this.stack.length - 2];
	  var node = this.stack[this.stack.length - 1];
	  var siblings = parent.children;
	  var head = node.children[0];
	  var index = -1;
	  var firstParaghraph;
	  if (
	    parent &&
	    parent.type === 'listItem' &&
	    typeof parent.checked === 'boolean' &&
	    head &&
	    head.type === 'text'
	  ) {
	    while (++index < siblings.length) {
	      if (siblings[index].type === 'paragraph') {
	        firstParaghraph = siblings[index];
	        break
	      }
	    }
	    if (firstParaghraph === node) {
	      head.value = head.value.slice(1);
	      if (head.value.length === 0) {
	        node.children.shift();
	      } else {
	        head.position.start.column++;
	        head.position.start.offset++;
	        node.position.start = Object.assign({}, head.position.start);
	      }
	    }
	  }
	  this.exit(token);
	}
	return fromMarkdown$1;
}

var fromMarkdown;
var hasRequiredFromMarkdown;

function requireFromMarkdown () {
	if (hasRequiredFromMarkdown) return fromMarkdown;
	hasRequiredFromMarkdown = 1;
	var autolinkLiteral = requireFromMarkdown$4();
	var strikethrough = requireFromMarkdown$3();
	var table = requireFromMarkdown$2();
	var taskListItem = requireFromMarkdown$1();
	var own = {}.hasOwnProperty;
	fromMarkdown = configure([
	  autolinkLiteral,
	  strikethrough,
	  table,
	  taskListItem
	]);
	function configure(extensions) {
	  var config = {transforms: [], canContainEols: []};
	  var length = extensions.length;
	  var index = -1;
	  while (++index < length) {
	    extension(config, extensions[index]);
	  }
	  return config
	}
	function extension(config, extension) {
	  var key;
	  var left;
	  var right;
	  for (key in extension) {
	    left = own.call(config, key) ? config[key] : (config[key] = {});
	    right = extension[key];
	    if (key === 'canContainEols' || key === 'transforms') {
	      config[key] = [].concat(left, right);
	    } else {
	      Object.assign(left, right);
	    }
	  }
	}
	return fromMarkdown;
}

var toMarkdown$2 = {};

var hasRequiredToMarkdown$4;

function requireToMarkdown$4 () {
	if (hasRequiredToMarkdown$4) return toMarkdown$2;
	hasRequiredToMarkdown$4 = 1;
	var inConstruct = 'phrasing';
	var notInConstruct = ['autolink', 'link', 'image', 'label'];
	toMarkdown$2.unsafe = [
	  {
	    character: '@',
	    before: '[+\\-.\\w]',
	    after: '[\\-.\\w]',
	    inConstruct: inConstruct,
	    notInConstruct: notInConstruct
	  },
	  {
	    character: '.',
	    before: '[Ww]',
	    after: '[\\-.\\w]',
	    inConstruct: inConstruct,
	    notInConstruct: notInConstruct
	  },
	  {
	    character: ':',
	    before: '[ps]',
	    after: '\\/',
	    inConstruct: inConstruct,
	    notInConstruct: notInConstruct
	  }
	];
	return toMarkdown$2;
}

var toMarkdown$1 = {};

var containerPhrasing;
var hasRequiredContainerPhrasing;

function requireContainerPhrasing () {
	if (hasRequiredContainerPhrasing) return containerPhrasing;
	hasRequiredContainerPhrasing = 1;
	containerPhrasing = phrasing;
	function phrasing(parent, context, safeOptions) {
	  var children = parent.children || [];
	  var results = [];
	  var index = -1;
	  var before = safeOptions.before;
	  var after;
	  var handle;
	  var child;
	  while (++index < children.length) {
	    child = children[index];
	    if (index + 1 < children.length) {
	      handle = context.handle.handlers[children[index + 1].type];
	      if (handle && handle.peek) handle = handle.peek;
	      after = handle
	        ? handle(children[index + 1], parent, context, {
	            before: '',
	            after: ''
	          }).charAt(0)
	        : '';
	    } else {
	      after = safeOptions.after;
	    }
	    if (
	      results.length > 0 &&
	      (before === '\r' || before === '\n') &&
	      child.type === 'html'
	    ) {
	      results[results.length - 1] = results[results.length - 1].replace(
	        /(\r?\n|\r)$/,
	        ' '
	      );
	      before = ' ';
	    }
	    results.push(
	      context.handle(child, parent, context, {
	        before: before,
	        after: after
	      })
	    );
	    before = results[results.length - 1].slice(-1);
	  }
	  return results.join('')
	}
	return containerPhrasing;
}

var hasRequiredToMarkdown$3;

function requireToMarkdown$3 () {
	if (hasRequiredToMarkdown$3) return toMarkdown$1;
	hasRequiredToMarkdown$3 = 1;
	var phrasing = requireContainerPhrasing();
	toMarkdown$1.unsafe = [{character: '~', inConstruct: 'phrasing'}];
	toMarkdown$1.handlers = {delete: handleDelete};
	handleDelete.peek = peekDelete;
	function handleDelete(node, _, context) {
	  var exit = context.enter('emphasis');
	  var value = phrasing(node, context, {before: '~', after: '~'});
	  exit();
	  return '~~' + value + '~~'
	}
	function peekDelete() {
	  return '~'
	}
	return toMarkdown$1;
}

var patternCompile_1;
var hasRequiredPatternCompile;

function requirePatternCompile () {
	if (hasRequiredPatternCompile) return patternCompile_1;
	hasRequiredPatternCompile = 1;
	patternCompile_1 = patternCompile;
	function patternCompile(pattern) {
	  var before;
	  var after;
	  if (!pattern._compiled) {
	    before = pattern.before ? '(?:' + pattern.before + ')' : '';
	    after = pattern.after ? '(?:' + pattern.after + ')' : '';
	    if (pattern.atBreak) {
	      before = '[\\r\\n][\\t ]*' + before;
	    }
	    pattern._compiled = new RegExp(
	      (before ? '(' + before + ')' : '') +
	        (/[|\\{}()[\]^$+*?.-]/.test(pattern.character) ? '\\' : '') +
	        pattern.character +
	        (after || ''),
	      'g'
	    );
	  }
	  return pattern._compiled
	}
	return patternCompile_1;
}

var inlineCode_1;
var hasRequiredInlineCode;

function requireInlineCode () {
	if (hasRequiredInlineCode) return inlineCode_1;
	hasRequiredInlineCode = 1;
	inlineCode_1 = inlineCode;
	inlineCode.peek = inlineCodePeek;
	var patternCompile = requirePatternCompile();
	function inlineCode(node, parent, context) {
	  var value = node.value || '';
	  var sequence = '`';
	  var index = -1;
	  var pattern;
	  var expression;
	  var match;
	  var position;
	  while (new RegExp('(^|[^`])' + sequence + '([^`]|$)').test(value)) {
	    sequence += '`';
	  }
	  if (
	    /[^ \r\n]/.test(value) &&
	    (/[ \r\n`]/.test(value.charAt(0)) ||
	      /[ \r\n`]/.test(value.charAt(value.length - 1)))
	  ) {
	    value = ' ' + value + ' ';
	  }
	  while (++index < context.unsafe.length) {
	    pattern = context.unsafe[index];
	    if (!pattern.atBreak) continue
	    expression = patternCompile(pattern);
	    while ((match = expression.exec(value))) {
	      position = match.index;
	      if (
	        value.charCodeAt(position) === 10  &&
	        value.charCodeAt(position - 1) === 13
	      ) {
	        position--;
	      }
	      value = value.slice(0, position) + ' ' + value.slice(match.index + 1);
	    }
	  }
	  return sequence + value + sequence
	}
	function inlineCodePeek() {
	  return '`'
	}
	return inlineCode_1;
}

var repeatString;
var hasRequiredRepeatString;

function requireRepeatString () {
	if (hasRequiredRepeatString) return repeatString;
	hasRequiredRepeatString = 1;
	var res = '';
	var cache;
	repeatString = repeat;
	function repeat(str, num) {
	  if (typeof str !== 'string') {
	    throw new TypeError('expected a string');
	  }
	  if (num === 1) return str;
	  if (num === 2) return str + str;
	  var max = str.length * num;
	  if (cache !== str || typeof cache === 'undefined') {
	    cache = str;
	    res = '';
	  } else if (res.length >= max) {
	    return res.substr(0, max);
	  }
	  while (max > res.length && num > 1) {
	    if (num & 1) {
	      res += str;
	    }
	    num >>= 1;
	    str += str;
	  }
	  res += str;
	  res = res.substr(0, max);
	  return res;
	}
	return repeatString;
}

var markdownTable_1;
var hasRequiredMarkdownTable;

function requireMarkdownTable () {
	if (hasRequiredMarkdownTable) return markdownTable_1;
	hasRequiredMarkdownTable = 1;
	var repeat = requireRepeatString();
	markdownTable_1 = markdownTable;
	var trailingWhitespace = / +$/;
	var space = ' ';
	var lineFeed = '\n';
	var dash = '-';
	var colon = ':';
	var verticalBar = '|';
	var x = 0;
	var C = 67;
	var L = 76;
	var R = 82;
	var c = 99;
	var l = 108;
	var r = 114;
	function markdownTable(table, options) {
	  var settings = options || {};
	  var padding = settings.padding !== false;
	  var start = settings.delimiterStart !== false;
	  var end = settings.delimiterEnd !== false;
	  var align = (settings.align || []).concat();
	  var alignDelimiters = settings.alignDelimiters !== false;
	  var alignments = [];
	  var stringLength = settings.stringLength || defaultStringLength;
	  var rowIndex = -1;
	  var rowLength = table.length;
	  var cellMatrix = [];
	  var sizeMatrix = [];
	  var row = [];
	  var sizes = [];
	  var longestCellByColumn = [];
	  var mostCellsPerRow = 0;
	  var cells;
	  var columnIndex;
	  var columnLength;
	  var largest;
	  var size;
	  var cell;
	  var lines;
	  var line;
	  var before;
	  var after;
	  var code;
	  while (++rowIndex < rowLength) {
	    cells = table[rowIndex];
	    columnIndex = -1;
	    columnLength = cells.length;
	    row = [];
	    sizes = [];
	    if (columnLength > mostCellsPerRow) {
	      mostCellsPerRow = columnLength;
	    }
	    while (++columnIndex < columnLength) {
	      cell = serialize(cells[columnIndex]);
	      if (alignDelimiters === true) {
	        size = stringLength(cell);
	        sizes[columnIndex] = size;
	        largest = longestCellByColumn[columnIndex];
	        if (largest === undefined || size > largest) {
	          longestCellByColumn[columnIndex] = size;
	        }
	      }
	      row.push(cell);
	    }
	    cellMatrix[rowIndex] = row;
	    sizeMatrix[rowIndex] = sizes;
	  }
	  columnIndex = -1;
	  columnLength = mostCellsPerRow;
	  if (typeof align === 'object' && 'length' in align) {
	    while (++columnIndex < columnLength) {
	      alignments[columnIndex] = toAlignment(align[columnIndex]);
	    }
	  } else {
	    code = toAlignment(align);
	    while (++columnIndex < columnLength) {
	      alignments[columnIndex] = code;
	    }
	  }
	  columnIndex = -1;
	  columnLength = mostCellsPerRow;
	  row = [];
	  sizes = [];
	  while (++columnIndex < columnLength) {
	    code = alignments[columnIndex];
	    before = '';
	    after = '';
	    if (code === l) {
	      before = colon;
	    } else if (code === r) {
	      after = colon;
	    } else if (code === c) {
	      before = colon;
	      after = colon;
	    }
	    size = alignDelimiters
	      ? Math.max(
	          1,
	          longestCellByColumn[columnIndex] - before.length - after.length
	        )
	      : 1;
	    cell = before + repeat(dash, size) + after;
	    if (alignDelimiters === true) {
	      size = before.length + size + after.length;
	      if (size > longestCellByColumn[columnIndex]) {
	        longestCellByColumn[columnIndex] = size;
	      }
	      sizes[columnIndex] = size;
	    }
	    row[columnIndex] = cell;
	  }
	  cellMatrix.splice(1, 0, row);
	  sizeMatrix.splice(1, 0, sizes);
	  rowIndex = -1;
	  rowLength = cellMatrix.length;
	  lines = [];
	  while (++rowIndex < rowLength) {
	    row = cellMatrix[rowIndex];
	    sizes = sizeMatrix[rowIndex];
	    columnIndex = -1;
	    columnLength = mostCellsPerRow;
	    line = [];
	    while (++columnIndex < columnLength) {
	      cell = row[columnIndex] || '';
	      before = '';
	      after = '';
	      if (alignDelimiters === true) {
	        size = longestCellByColumn[columnIndex] - (sizes[columnIndex] || 0);
	        code = alignments[columnIndex];
	        if (code === r) {
	          before = repeat(space, size);
	        } else if (code === c) {
	          if (size % 2 === 0) {
	            before = repeat(space, size / 2);
	            after = before;
	          } else {
	            before = repeat(space, size / 2 + 0.5);
	            after = repeat(space, size / 2 - 0.5);
	          }
	        } else {
	          after = repeat(space, size);
	        }
	      }
	      if (start === true && columnIndex === 0) {
	        line.push(verticalBar);
	      }
	      if (
	        padding === true &&
	        !(alignDelimiters === false && cell === '') &&
	        (start === true || columnIndex !== 0)
	      ) {
	        line.push(space);
	      }
	      if (alignDelimiters === true) {
	        line.push(before);
	      }
	      line.push(cell);
	      if (alignDelimiters === true) {
	        line.push(after);
	      }
	      if (padding === true) {
	        line.push(space);
	      }
	      if (end === true || columnIndex !== columnLength - 1) {
	        line.push(verticalBar);
	      }
	    }
	    line = line.join('');
	    if (end === false) {
	      line = line.replace(trailingWhitespace, '');
	    }
	    lines.push(line);
	  }
	  return lines.join(lineFeed)
	}
	function serialize(value) {
	  return value === null || value === undefined ? '' : String(value)
	}
	function defaultStringLength(value) {
	  return value.length
	}
	function toAlignment(value) {
	  var code = typeof value === 'string' ? value.charCodeAt(0) : x;
	  return code === L || code === l
	    ? l
	    : code === R || code === r
	    ? r
	    : code === C || code === c
	    ? c
	    : x
	}
	return markdownTable_1;
}

var toMarkdown_1$1;
var hasRequiredToMarkdown$2;

function requireToMarkdown$2 () {
	if (hasRequiredToMarkdown$2) return toMarkdown_1$1;
	hasRequiredToMarkdown$2 = 1;
	var phrasing = requireContainerPhrasing();
	var defaultInlineCode = requireInlineCode();
	var markdownTable = requireMarkdownTable();
	toMarkdown_1$1 = toMarkdown;
	function toMarkdown(options) {
	  var settings = options || {};
	  var padding = settings.tableCellPadding;
	  var alignDelimiters = settings.tablePipeAlign;
	  var stringLength = settings.stringLength;
	  var around = padding ? ' ' : '|';
	  return {
	    unsafe: [
	      {character: '\r', inConstruct: 'tableCell'},
	      {character: '\n', inConstruct: 'tableCell'},
	      {atBreak: true, character: '|', after: '[\t :-]'},
	      {character: '|', inConstruct: 'tableCell'},
	      {atBreak: true, character: ':', after: '-'},
	      {atBreak: true, character: '-', after: '[:|-]'}
	    ],
	    handlers: {
	      table: handleTable,
	      tableRow: handleTableRow,
	      tableCell: handleTableCell,
	      inlineCode: inlineCodeWithTable
	    }
	  }
	  function handleTable(node, _, context) {
	    return serializeData(handleTableAsData(node, context), node.align)
	  }
	  function handleTableRow(node, _, context) {
	    var row = handleTableRowAsData(node, context);
	    var value = serializeData([row]);
	    return value.slice(0, value.indexOf('\n'))
	  }
	  function handleTableCell(node, _, context) {
	    var exit = context.enter('tableCell');
	    var value = phrasing(node, context, {before: around, after: around});
	    exit();
	    return value
	  }
	  function serializeData(matrix, align) {
	    return markdownTable(matrix, {
	      align: align,
	      alignDelimiters: alignDelimiters,
	      padding: padding,
	      stringLength: stringLength
	    })
	  }
	  function handleTableAsData(node, context) {
	    var children = node.children;
	    var index = -1;
	    var length = children.length;
	    var result = [];
	    var subexit = context.enter('table');
	    while (++index < length) {
	      result[index] = handleTableRowAsData(children[index], context);
	    }
	    subexit();
	    return result
	  }
	  function handleTableRowAsData(node, context) {
	    var children = node.children;
	    var index = -1;
	    var length = children.length;
	    var result = [];
	    var subexit = context.enter('tableRow');
	    while (++index < length) {
	      result[index] = handleTableCell(children[index], node, context);
	    }
	    subexit();
	    return result
	  }
	  function inlineCodeWithTable(node, parent, context) {
	    var value = defaultInlineCode(node, parent, context);
	    if (context.stack.indexOf('tableCell') !== -1) {
	      value = value.replace(/\|/g, '\\$&');
	    }
	    return value
	  }
	}
	return toMarkdown_1$1;
}

var toMarkdown = {};

var checkBullet_1;
var hasRequiredCheckBullet;

function requireCheckBullet () {
	if (hasRequiredCheckBullet) return checkBullet_1;
	hasRequiredCheckBullet = 1;
	checkBullet_1 = checkBullet;
	function checkBullet(context) {
	  var marker = context.options.bullet || '*';
	  if (marker !== '*' && marker !== '+' && marker !== '-') {
	    throw new Error(
	      'Cannot serialize items with `' +
	        marker +
	        '` for `options.bullet`, expected `*`, `+`, or `-`'
	    )
	  }
	  return marker
	}
	return checkBullet_1;
}

var checkListItemIndent_1;
var hasRequiredCheckListItemIndent;

function requireCheckListItemIndent () {
	if (hasRequiredCheckListItemIndent) return checkListItemIndent_1;
	hasRequiredCheckListItemIndent = 1;
	checkListItemIndent_1 = checkListItemIndent;
	function checkListItemIndent(context) {
	  var style = context.options.listItemIndent || 'tab';
	  if (style === 1 || style === '1') {
	    return 'one'
	  }
	  if (style !== 'tab' && style !== 'one' && style !== 'mixed') {
	    throw new Error(
	      'Cannot serialize items with `' +
	        style +
	        '` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`'
	    )
	  }
	  return style
	}
	return checkListItemIndent_1;
}

var containerFlow;
var hasRequiredContainerFlow;

function requireContainerFlow () {
	if (hasRequiredContainerFlow) return containerFlow;
	hasRequiredContainerFlow = 1;
	containerFlow = flow;
	var repeat = requireRepeatString();
	function flow(parent, context) {
	  var children = parent.children || [];
	  var results = [];
	  var index = -1;
	  var child;
	  while (++index < children.length) {
	    child = children[index];
	    results.push(
	      context.handle(child, parent, context, {before: '\n', after: '\n'})
	    );
	    if (index + 1 < children.length) {
	      results.push(between(child, children[index + 1]));
	    }
	  }
	  return results.join('')
	  function between(left, right) {
	    var index = -1;
	    var result;
	    while (++index < context.join.length) {
	      result = context.join[index](left, right, parent, context);
	      if (result === true || result === 1) {
	        break
	      }
	      if (typeof result === 'number') {
	        return repeat('\n', 1 + Number(result))
	      }
	      if (result === false) {
	        return '\n\n<!---->\n\n'
	      }
	    }
	    return '\n\n'
	  }
	}
	return containerFlow;
}

var indentLines_1;
var hasRequiredIndentLines;

function requireIndentLines () {
	if (hasRequiredIndentLines) return indentLines_1;
	hasRequiredIndentLines = 1;
	indentLines_1 = indentLines;
	var eol = /\r?\n|\r/g;
	function indentLines(value, map) {
	  var result = [];
	  var start = 0;
	  var line = 0;
	  var match;
	  while ((match = eol.exec(value))) {
	    one(value.slice(start, match.index));
	    result.push(match[0]);
	    start = match.index + match[0].length;
	    line++;
	  }
	  one(value.slice(start));
	  return result.join('')
	  function one(value) {
	    result.push(map(value, line, !value));
	  }
	}
	return indentLines_1;
}

var listItem_1;
var hasRequiredListItem;

function requireListItem () {
	if (hasRequiredListItem) return listItem_1;
	hasRequiredListItem = 1;
	listItem_1 = listItem;
	var repeat = requireRepeatString();
	var checkBullet = requireCheckBullet();
	var checkListItemIndent = requireCheckListItemIndent();
	var flow = requireContainerFlow();
	var indentLines = requireIndentLines();
	function listItem(node, parent, context) {
	  var bullet = checkBullet(context);
	  var listItemIndent = checkListItemIndent(context);
	  var size;
	  var value;
	  var exit;
	  if (parent && parent.ordered) {
	    bullet =
	      (parent.start > -1 ? parent.start : 1) +
	      (context.options.incrementListMarker === false
	        ? 0
	        : parent.children.indexOf(node)) +
	      '.';
	  }
	  size = bullet.length + 1;
	  if (
	    listItemIndent === 'tab' ||
	    (listItemIndent === 'mixed' && ((parent && parent.spread) || node.spread))
	  ) {
	    size = Math.ceil(size / 4) * 4;
	  }
	  exit = context.enter('listItem');
	  value = indentLines(flow(node, context), map);
	  exit();
	  return value
	  function map(line, index, blank) {
	    if (index) {
	      return (blank ? '' : repeat(' ', size)) + line
	    }
	    return (blank ? bullet : bullet + repeat(' ', size - bullet.length)) + line
	  }
	}
	return listItem_1;
}

var hasRequiredToMarkdown$1;

function requireToMarkdown$1 () {
	if (hasRequiredToMarkdown$1) return toMarkdown;
	hasRequiredToMarkdown$1 = 1;
	var defaultListItem = requireListItem();
	toMarkdown.unsafe = [{atBreak: true, character: '-', after: '[:|-]'}];
	toMarkdown.handlers = {
	  listItem: listItemWithTaskListItem
	};
	function listItemWithTaskListItem(node, parent, context) {
	  var value = defaultListItem(node, parent, context);
	  var head = node.children[0];
	  if (typeof node.checked === 'boolean' && head && head.type === 'paragraph') {
	    value = value.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check);
	  }
	  return value
	  function check($0) {
	    return $0 + '[' + (node.checked ? 'x' : ' ') + '] '
	  }
	}
	return toMarkdown;
}

var configure_1;
var hasRequiredConfigure;

function requireConfigure () {
	if (hasRequiredConfigure) return configure_1;
	hasRequiredConfigure = 1;
	configure_1 = configure;
	function configure(base, extension) {
	  var index = -1;
	  var key;
	  if (extension.extensions) {
	    while (++index < extension.extensions.length) {
	      configure(base, extension.extensions[index]);
	    }
	  }
	  for (key in extension) {
	    if (key === 'extensions') ; else if (key === 'unsafe' || key === 'join') {
	      base[key] = base[key].concat(extension[key] || []);
	    } else if (key === 'handlers') {
	      base[key] = Object.assign(base[key], extension[key] || {});
	    } else {
	      base.options[key] = extension[key];
	    }
	  }
	  return base
	}
	return configure_1;
}

var toMarkdown_1;
var hasRequiredToMarkdown;

function requireToMarkdown () {
	if (hasRequiredToMarkdown) return toMarkdown_1;
	hasRequiredToMarkdown = 1;
	var autolinkLiteral = requireToMarkdown$4();
	var strikethrough = requireToMarkdown$3();
	var table = requireToMarkdown$2();
	var taskListItem = requireToMarkdown$1();
	var configure = requireConfigure();
	toMarkdown_1 = toMarkdown;
	function toMarkdown(options) {
	  var config = configure(
	    {handlers: {}, join: [], unsafe: [], options: {}},
	    {
	      extensions: [autolinkLiteral, strikethrough, table(options), taskListItem]
	    }
	  );
	  return Object.assign(config.options, {
	    handlers: config.handlers,
	    join: config.join,
	    unsafe: config.unsafe
	  })
	}
	return toMarkdown_1;
}

var remarkGfm;
var hasRequiredRemarkGfm;

function requireRemarkGfm () {
	if (hasRequiredRemarkGfm) return remarkGfm;
	hasRequiredRemarkGfm = 1;
	var syntax = requireMicromarkExtensionGfm();
	var fromMarkdown = requireFromMarkdown();
	var toMarkdown = requireToMarkdown();
	var warningIssued;
	remarkGfm = gfm;
	function gfm(options) {
	  var data = this.data();
	  if (
	    !warningIssued &&
	    ((this.Parser &&
	      this.Parser.prototype &&
	      this.Parser.prototype.blockTokenizers) ||
	      (this.Compiler &&
	        this.Compiler.prototype &&
	        this.Compiler.prototype.visitors))
	  ) {
	    warningIssued = true;
	    console.warn(
	      '[remark-gfm] Warning: please upgrade to remark 13 to use this plugin'
	    );
	  }
	  add('micromarkExtensions', syntax(options));
	  add('fromMarkdownExtensions', fromMarkdown);
	  add('toMarkdownExtensions', toMarkdown(options));
	  function add(field, value) {
	    if (data[field]) data[field].push(value);
	    else data[field] = [value];
	  }
	}
	return remarkGfm;
}

var mdastUtilToString;
var hasRequiredMdastUtilToString;

function requireMdastUtilToString () {
	if (hasRequiredMdastUtilToString) return mdastUtilToString;
	hasRequiredMdastUtilToString = 1;
	mdastUtilToString = toString;
	function toString(node) {
	  return (
	    (node &&
	      (node.value ||
	        node.alt ||
	        node.title ||
	        ('children' in node && all(node.children)) ||
	        ('length' in node && all(node)))) ||
	    ''
	  )
	}
	function all(values) {
	  var result = [];
	  var index = -1;
	  while (++index < values.length) {
	    result[index] = toString(values[index]);
	  }
	  return result.join('')
	}
	return mdastUtilToString;
}

var normalizeIdentifier_1;
var hasRequiredNormalizeIdentifier;

function requireNormalizeIdentifier () {
	if (hasRequiredNormalizeIdentifier) return normalizeIdentifier_1;
	hasRequiredNormalizeIdentifier = 1;
	function normalizeIdentifier(value) {
	  return (
	    value
	      .replace(/[\t\n\r ]+/g, ' ')
	      .replace(/^ | $/g, '')
	      .toLowerCase()
	      .toUpperCase()
	  )
	}
	normalizeIdentifier_1 = normalizeIdentifier;
	return normalizeIdentifier_1;
}

var safeFromInt_1;
var hasRequiredSafeFromInt;

function requireSafeFromInt () {
	if (hasRequiredSafeFromInt) return safeFromInt_1;
	hasRequiredSafeFromInt = 1;
	var fromCharCode = requireFromCharCode();
	function safeFromInt(value, base) {
	  var code = parseInt(value, base);
	  if (
	    code < 9 ||
	    code === 11 ||
	    (code > 13 && code < 32) ||
	    (code > 126 && code < 160) ||
	    (code > 55295 && code < 57344) ||
	    (code > 64975 && code < 65008) ||
	    (code & 65535) === 65535 ||
	    (code & 65535) === 65534 ||
	    code > 1114111
	  ) {
	    return '\uFFFD'
	  }
	  return fromCharCode(code)
	}
	safeFromInt_1 = safeFromInt;
	return safeFromInt_1;
}

var content = {};

var hasRequiredContent$1;

function requireContent$1 () {
	if (hasRequiredContent$1) return content;
	hasRequiredContent$1 = 1;
	Object.defineProperty(content, '__esModule', {value: true});
	var markdownLineEnding = requireMarkdownLineEnding();
	var factorySpace = requireFactorySpace();
	var tokenize = initializeContent;
	function initializeContent(effects) {
	  var contentStart = effects.attempt(
	    this.parser.constructs.contentInitial,
	    afterContentStartConstruct,
	    paragraphInitial
	  );
	  var previous;
	  return contentStart
	  function afterContentStartConstruct(code) {
	    if (code === null) {
	      effects.consume(code);
	      return
	    }
	    effects.enter('lineEnding');
	    effects.consume(code);
	    effects.exit('lineEnding');
	    return factorySpace(effects, contentStart, 'linePrefix')
	  }
	  function paragraphInitial(code) {
	    effects.enter('paragraph');
	    return lineStart(code)
	  }
	  function lineStart(code) {
	    var token = effects.enter('chunkText', {
	      contentType: 'text',
	      previous: previous
	    });
	    if (previous) {
	      previous.next = token;
	    }
	    previous = token;
	    return data(code)
	  }
	  function data(code) {
	    if (code === null) {
	      effects.exit('chunkText');
	      effects.exit('paragraph');
	      effects.consume(code);
	      return
	    }
	    if (markdownLineEnding(code)) {
	      effects.consume(code);
	      effects.exit('chunkText');
	      return lineStart
	    }
	    effects.consume(code);
	    return data
	  }
	}
	content.tokenize = tokenize;
	return content;
}

var document$1 = {};

var partialBlankLine_1;
var hasRequiredPartialBlankLine;

function requirePartialBlankLine () {
	if (hasRequiredPartialBlankLine) return partialBlankLine_1;
	hasRequiredPartialBlankLine = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var factorySpace = requireFactorySpace();
	var partialBlankLine = {
	  tokenize: tokenizePartialBlankLine,
	  partial: true
	};
	function tokenizePartialBlankLine(effects, ok, nok) {
	  return factorySpace(effects, afterWhitespace, 'linePrefix')
	  function afterWhitespace(code) {
	    return code === null || markdownLineEnding(code) ? ok(code) : nok(code)
	  }
	}
	partialBlankLine_1 = partialBlankLine;
	return partialBlankLine_1;
}

var hasRequiredDocument;

function requireDocument () {
	if (hasRequiredDocument) return document$1;
	hasRequiredDocument = 1;
	Object.defineProperty(document$1, '__esModule', {value: true});
	var markdownLineEnding = requireMarkdownLineEnding();
	var factorySpace = requireFactorySpace();
	var partialBlankLine = requirePartialBlankLine();
	var tokenize = initializeDocument;
	var containerConstruct = {
	  tokenize: tokenizeContainer
	};
	var lazyFlowConstruct = {
	  tokenize: tokenizeLazyFlow
	};
	function initializeDocument(effects) {
	  var self = this;
	  var stack = [];
	  var continued = 0;
	  var inspectConstruct = {
	    tokenize: tokenizeInspect,
	    partial: true
	  };
	  var inspectResult;
	  var childFlow;
	  var childToken;
	  return start
	  function start(code) {
	    if (continued < stack.length) {
	      self.containerState = stack[continued][1];
	      return effects.attempt(
	        stack[continued][0].continuation,
	        documentContinue,
	        documentContinued
	      )(code)
	    }
	    return documentContinued(code)
	  }
	  function documentContinue(code) {
	    continued++;
	    return start(code)
	  }
	  function documentContinued(code) {
	    if (inspectResult && inspectResult.flowContinue) {
	      return flowStart(code)
	    }
	    self.interrupt =
	      childFlow &&
	      childFlow.currentConstruct &&
	      childFlow.currentConstruct.interruptible;
	    self.containerState = {};
	    return effects.attempt(
	      containerConstruct,
	      containerContinue,
	      flowStart
	    )(code)
	  }
	  function containerContinue(code) {
	    stack.push([self.currentConstruct, self.containerState]);
	    self.containerState = undefined;
	    return documentContinued(code)
	  }
	  function flowStart(code) {
	    if (code === null) {
	      exitContainers(0, true);
	      effects.consume(code);
	      return
	    }
	    childFlow = childFlow || self.parser.flow(self.now());
	    effects.enter('chunkFlow', {
	      contentType: 'flow',
	      previous: childToken,
	      _tokenizer: childFlow
	    });
	    return flowContinue(code)
	  }
	  function flowContinue(code) {
	    if (code === null) {
	      continueFlow(effects.exit('chunkFlow'));
	      return flowStart(code)
	    }
	    if (markdownLineEnding(code)) {
	      effects.consume(code);
	      continueFlow(effects.exit('chunkFlow'));
	      return effects.check(inspectConstruct, documentAfterPeek)
	    }
	    effects.consume(code);
	    return flowContinue
	  }
	  function documentAfterPeek(code) {
	    exitContainers(
	      inspectResult.continued,
	      inspectResult && inspectResult.flowEnd
	    );
	    continued = 0;
	    return start(code)
	  }
	  function continueFlow(token) {
	    if (childToken) childToken.next = token;
	    childToken = token;
	    childFlow.lazy = inspectResult && inspectResult.lazy;
	    childFlow.defineSkip(token.start);
	    childFlow.write(self.sliceStream(token));
	  }
	  function exitContainers(size, end) {
	    var index = stack.length;
	    if (childFlow && end) {
	      childFlow.write([null]);
	      childToken = childFlow = undefined;
	    }
	    while (index-- > size) {
	      self.containerState = stack[index][1];
	      stack[index][0].exit.call(self, effects);
	    }
	    stack.length = size;
	  }
	  function tokenizeInspect(effects, ok) {
	    var subcontinued = 0;
	    inspectResult = {};
	    return inspectStart
	    function inspectStart(code) {
	      if (subcontinued < stack.length) {
	        self.containerState = stack[subcontinued][1];
	        return effects.attempt(
	          stack[subcontinued][0].continuation,
	          inspectContinue,
	          inspectLess
	        )(code)
	      }
	      if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
	        inspectResult.flowContinue = true;
	        return inspectDone(code)
	      }
	      self.interrupt =
	        childFlow.currentConstruct && childFlow.currentConstruct.interruptible;
	      self.containerState = {};
	      return effects.attempt(
	        containerConstruct,
	        inspectFlowEnd,
	        inspectDone
	      )(code)
	    }
	    function inspectContinue(code) {
	      subcontinued++;
	      return self.containerState._closeFlow
	        ? inspectFlowEnd(code)
	        : inspectStart(code)
	    }
	    function inspectLess(code) {
	      if (childFlow.currentConstruct && childFlow.currentConstruct.lazy) {
	        self.containerState = {};
	        return effects.attempt(
	          containerConstruct,
	          inspectFlowEnd,
	          effects.attempt(
	            lazyFlowConstruct,
	            inspectFlowEnd,
	            effects.check(partialBlankLine, inspectFlowEnd, inspectLazy)
	          )
	        )(code)
	      }
	      return inspectFlowEnd(code)
	    }
	    function inspectLazy(code) {
	      subcontinued = stack.length;
	      inspectResult.lazy = true;
	      inspectResult.flowContinue = true;
	      return inspectDone(code)
	    }
	    function inspectFlowEnd(code) {
	      inspectResult.flowEnd = true;
	      return inspectDone(code)
	    }
	    function inspectDone(code) {
	      inspectResult.continued = subcontinued;
	      self.interrupt = self.containerState = undefined;
	      return ok(code)
	    }
	  }
	}
	function tokenizeContainer(effects, ok, nok) {
	  return factorySpace(
	    effects,
	    effects.attempt(this.parser.constructs.document, ok, nok),
	    'linePrefix',
	    this.parser.constructs.disable.null.indexOf('codeIndented') > -1
	      ? undefined
	      : 4
	  )
	}
	function tokenizeLazyFlow(effects, ok, nok) {
	  return factorySpace(
	    effects,
	    effects.lazy(this.parser.constructs.flow, ok, nok),
	    'linePrefix',
	    this.parser.constructs.disable.null.indexOf('codeIndented') > -1
	      ? undefined
	      : 4
	  )
	}
	document$1.tokenize = tokenize;
	return document$1;
}

var flow = {};

var subtokenize_1;
var hasRequiredSubtokenize;

function requireSubtokenize () {
	if (hasRequiredSubtokenize) return subtokenize_1;
	hasRequiredSubtokenize = 1;
	var assign = requireAssign();
	var chunkedSplice = requireChunkedSplice();
	var shallow = requireShallow();
	function subtokenize(events) {
	  var jumps = {};
	  var index = -1;
	  var event;
	  var lineIndex;
	  var otherIndex;
	  var otherEvent;
	  var parameters;
	  var subevents;
	  var more;
	  while (++index < events.length) {
	    while (index in jumps) {
	      index = jumps[index];
	    }
	    event = events[index];
	    if (
	      index &&
	      event[1].type === 'chunkFlow' &&
	      events[index - 1][1].type === 'listItemPrefix'
	    ) {
	      subevents = event[1]._tokenizer.events;
	      otherIndex = 0;
	      if (
	        otherIndex < subevents.length &&
	        subevents[otherIndex][1].type === 'lineEndingBlank'
	      ) {
	        otherIndex += 2;
	      }
	      if (
	        otherIndex < subevents.length &&
	        subevents[otherIndex][1].type === 'content'
	      ) {
	        while (++otherIndex < subevents.length) {
	          if (subevents[otherIndex][1].type === 'content') {
	            break
	          }
	          if (subevents[otherIndex][1].type === 'chunkText') {
	            subevents[otherIndex][1].isInFirstContentOfListItem = true;
	            otherIndex++;
	          }
	        }
	      }
	    }
	    if (event[0] === 'enter') {
	      if (event[1].contentType) {
	        assign(jumps, subcontent(events, index));
	        index = jumps[index];
	        more = true;
	      }
	    }
	    else if (event[1]._container || event[1]._movePreviousLineEndings) {
	      otherIndex = index;
	      lineIndex = undefined;
	      while (otherIndex--) {
	        otherEvent = events[otherIndex];
	        if (
	          otherEvent[1].type === 'lineEnding' ||
	          otherEvent[1].type === 'lineEndingBlank'
	        ) {
	          if (otherEvent[0] === 'enter') {
	            if (lineIndex) {
	              events[lineIndex][1].type = 'lineEndingBlank';
	            }
	            otherEvent[1].type = 'lineEnding';
	            lineIndex = otherIndex;
	          }
	        } else {
	          break
	        }
	      }
	      if (lineIndex) {
	        event[1].end = shallow(events[lineIndex][1].start);
	        parameters = events.slice(lineIndex, index);
	        parameters.unshift(event);
	        chunkedSplice(events, lineIndex, index - lineIndex + 1, parameters);
	      }
	    }
	  }
	  return !more
	}
	function subcontent(events, eventIndex) {
	  var token = events[eventIndex][1];
	  var context = events[eventIndex][2];
	  var startPosition = eventIndex - 1;
	  var startPositions = [];
	  var tokenizer =
	    token._tokenizer || context.parser[token.contentType](token.start);
	  var childEvents = tokenizer.events;
	  var jumps = [];
	  var gaps = {};
	  var stream;
	  var previous;
	  var index;
	  var entered;
	  var end;
	  var adjust;
	  while (token) {
	    while (events[++startPosition][1] !== token) {
	    }
	    startPositions.push(startPosition);
	    if (!token._tokenizer) {
	      stream = context.sliceStream(token);
	      if (!token.next) {
	        stream.push(null);
	      }
	      if (previous) {
	        tokenizer.defineSkip(token.start);
	      }
	      if (token.isInFirstContentOfListItem) {
	        tokenizer._gfmTasklistFirstContentOfListItem = true;
	      }
	      tokenizer.write(stream);
	      if (token.isInFirstContentOfListItem) {
	        tokenizer._gfmTasklistFirstContentOfListItem = undefined;
	      }
	    }
	    previous = token;
	    token = token.next;
	  }
	  token = previous;
	  index = childEvents.length;
	  while (index--) {
	    if (childEvents[index][0] === 'enter') {
	      entered = true;
	    } else if (
	      entered &&
	      childEvents[index][1].type === childEvents[index - 1][1].type &&
	      childEvents[index][1].start.line !== childEvents[index][1].end.line
	    ) {
	      add(childEvents.slice(index + 1, end));
	      token._tokenizer = token.next = undefined;
	      token = token.previous;
	      end = index + 1;
	    }
	  }
	  tokenizer.events = token._tokenizer = token.next = undefined;
	  add(childEvents.slice(0, end));
	  index = -1;
	  adjust = 0;
	  while (++index < jumps.length) {
	    gaps[adjust + jumps[index][0]] = adjust + jumps[index][1];
	    adjust += jumps[index][1] - jumps[index][0] - 1;
	  }
	  return gaps
	  function add(slice) {
	    var start = startPositions.pop();
	    jumps.unshift([start, start + slice.length - 1]);
	    chunkedSplice(events, start, 2, slice);
	  }
	}
	subtokenize_1 = subtokenize;
	return subtokenize_1;
}

var content_1;
var hasRequiredContent;

function requireContent () {
	if (hasRequiredContent) return content_1;
	hasRequiredContent = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var prefixSize = requirePrefixSize();
	var subtokenize = requireSubtokenize();
	var factorySpace = requireFactorySpace();
	var content = {
	  tokenize: tokenizeContent,
	  resolve: resolveContent,
	  interruptible: true,
	  lazy: true
	};
	var continuationConstruct = {
	  tokenize: tokenizeContinuation,
	  partial: true
	};
	function resolveContent(events) {
	  subtokenize(events);
	  return events
	}
	function tokenizeContent(effects, ok) {
	  var previous;
	  return start
	  function start(code) {
	    effects.enter('content');
	    previous = effects.enter('chunkContent', {
	      contentType: 'content'
	    });
	    return data(code)
	  }
	  function data(code) {
	    if (code === null) {
	      return contentEnd(code)
	    }
	    if (markdownLineEnding(code)) {
	      return effects.check(
	        continuationConstruct,
	        contentContinue,
	        contentEnd
	      )(code)
	    }
	    effects.consume(code);
	    return data
	  }
	  function contentEnd(code) {
	    effects.exit('chunkContent');
	    effects.exit('content');
	    return ok(code)
	  }
	  function contentContinue(code) {
	    effects.consume(code);
	    effects.exit('chunkContent');
	    previous = previous.next = effects.enter('chunkContent', {
	      contentType: 'content',
	      previous: previous
	    });
	    return data
	  }
	}
	function tokenizeContinuation(effects, ok, nok) {
	  var self = this;
	  return startLookahead
	  function startLookahead(code) {
	    effects.enter('lineEnding');
	    effects.consume(code);
	    effects.exit('lineEnding');
	    return factorySpace(effects, prefixed, 'linePrefix')
	  }
	  function prefixed(code) {
	    if (code === null || markdownLineEnding(code)) {
	      return nok(code)
	    }
	    if (
	      self.parser.constructs.disable.null.indexOf('codeIndented') > -1 ||
	      prefixSize(self.events, 'linePrefix') < 4
	    ) {
	      return effects.interrupt(self.parser.constructs.flow, nok, ok)(code)
	    }
	    return ok(code)
	  }
	}
	content_1 = content;
	return content_1;
}

var hasRequiredFlow;

function requireFlow () {
	if (hasRequiredFlow) return flow;
	hasRequiredFlow = 1;
	Object.defineProperty(flow, '__esModule', {value: true});
	var content = requireContent();
	var factorySpace = requireFactorySpace();
	var partialBlankLine = requirePartialBlankLine();
	var tokenize = initializeFlow;
	function initializeFlow(effects) {
	  var self = this;
	  var initial = effects.attempt(
	    partialBlankLine,
	    atBlankEnding,
	    effects.attempt(
	      this.parser.constructs.flowInitial,
	      afterConstruct,
	      factorySpace(
	        effects,
	        effects.attempt(
	          this.parser.constructs.flow,
	          afterConstruct,
	          effects.attempt(content, afterConstruct)
	        ),
	        'linePrefix'
	      )
	    )
	  );
	  return initial
	  function atBlankEnding(code) {
	    if (code === null) {
	      effects.consume(code);
	      return
	    }
	    effects.enter('lineEndingBlank');
	    effects.consume(code);
	    effects.exit('lineEndingBlank');
	    self.currentConstruct = undefined;
	    return initial
	  }
	  function afterConstruct(code) {
	    if (code === null) {
	      effects.consume(code);
	      return
	    }
	    effects.enter('lineEnding');
	    effects.consume(code);
	    effects.exit('lineEnding');
	    self.currentConstruct = undefined;
	    return initial
	  }
	}
	flow.tokenize = tokenize;
	return flow;
}

var text = {};

var hasRequiredText$1;

function requireText$1 () {
	if (hasRequiredText$1) return text;
	hasRequiredText$1 = 1;
	Object.defineProperty(text, '__esModule', {value: true});
	var assign = requireAssign();
	var shallow = requireShallow();
	var text$1 = initializeFactory('text');
	var string = initializeFactory('string');
	var resolver = {
	  resolveAll: createResolver()
	};
	function initializeFactory(field) {
	  return {
	    tokenize: initializeText,
	    resolveAll: createResolver(
	      field === 'text' ? resolveAllLineSuffixes : undefined
	    )
	  }
	  function initializeText(effects) {
	    var self = this;
	    var constructs = this.parser.constructs[field];
	    var text = effects.attempt(constructs, start, notText);
	    return start
	    function start(code) {
	      return atBreak(code) ? text(code) : notText(code)
	    }
	    function notText(code) {
	      if (code === null) {
	        effects.consume(code);
	        return
	      }
	      effects.enter('data');
	      effects.consume(code);
	      return data
	    }
	    function data(code) {
	      if (atBreak(code)) {
	        effects.exit('data');
	        return text(code)
	      }
	      effects.consume(code);
	      return data
	    }
	    function atBreak(code) {
	      var list = constructs[code];
	      var index = -1;
	      if (code === null) {
	        return true
	      }
	      if (list) {
	        while (++index < list.length) {
	          if (
	            !list[index].previous ||
	            list[index].previous.call(self, self.previous)
	          ) {
	            return true
	          }
	        }
	      }
	    }
	  }
	}
	function createResolver(extraResolver) {
	  return resolveAllText
	  function resolveAllText(events, context) {
	    var index = -1;
	    var enter;
	    while (++index <= events.length) {
	      if (enter === undefined) {
	        if (events[index] && events[index][1].type === 'data') {
	          enter = index;
	          index++;
	        }
	      } else if (!events[index] || events[index][1].type !== 'data') {
	        if (index !== enter + 2) {
	          events[enter][1].end = events[index - 1][1].end;
	          events.splice(enter + 2, index - enter - 2);
	          index = enter + 2;
	        }
	        enter = undefined;
	      }
	    }
	    return extraResolver ? extraResolver(events, context) : events
	  }
	}
	function resolveAllLineSuffixes(events, context) {
	  var eventIndex = -1;
	  var chunks;
	  var data;
	  var chunk;
	  var index;
	  var bufferIndex;
	  var size;
	  var tabs;
	  var token;
	  while (++eventIndex <= events.length) {
	    if (
	      (eventIndex === events.length ||
	        events[eventIndex][1].type === 'lineEnding') &&
	      events[eventIndex - 1][1].type === 'data'
	    ) {
	      data = events[eventIndex - 1][1];
	      chunks = context.sliceStream(data);
	      index = chunks.length;
	      bufferIndex = -1;
	      size = 0;
	      tabs = undefined;
	      while (index--) {
	        chunk = chunks[index];
	        if (typeof chunk === 'string') {
	          bufferIndex = chunk.length;
	          while (chunk.charCodeAt(bufferIndex - 1) === 32) {
	            size++;
	            bufferIndex--;
	          }
	          if (bufferIndex) break
	          bufferIndex = -1;
	        }
	        else if (chunk === -2) {
	          tabs = true;
	          size++;
	        } else if (chunk === -1);
	        else {
	          index++;
	          break
	        }
	      }
	      if (size) {
	        token = {
	          type:
	            eventIndex === events.length || tabs || size < 2
	              ? 'lineSuffix'
	              : 'hardBreakTrailing',
	          start: {
	            line: data.end.line,
	            column: data.end.column - size,
	            offset: data.end.offset - size,
	            _index: data.start._index + index,
	            _bufferIndex: index
	              ? bufferIndex
	              : data.start._bufferIndex + bufferIndex
	          },
	          end: shallow(data.end)
	        };
	        data.end = shallow(token.start);
	        if (data.start.offset === data.end.offset) {
	          assign(data, token);
	        } else {
	          events.splice(
	            eventIndex,
	            0,
	            ['enter', token, context],
	            ['exit', token, context]
	          );
	          eventIndex += 2;
	        }
	      }
	      eventIndex++;
	    }
	  }
	  return events
	}
	text.resolver = resolver;
	text.string = string;
	text.text = text$1;
	return text;
}

var chunkedPush_1;
var hasRequiredChunkedPush;

function requireChunkedPush () {
	if (hasRequiredChunkedPush) return chunkedPush_1;
	hasRequiredChunkedPush = 1;
	var chunkedSplice = requireChunkedSplice();
	function chunkedPush(list, items) {
	  if (list.length) {
	    chunkedSplice(list, list.length, 0, items);
	    return list
	  }
	  return items
	}
	chunkedPush_1 = chunkedPush;
	return chunkedPush_1;
}

var serializeChunks_1;
var hasRequiredSerializeChunks;

function requireSerializeChunks () {
	if (hasRequiredSerializeChunks) return serializeChunks_1;
	hasRequiredSerializeChunks = 1;
	var fromCharCode = requireFromCharCode();
	function serializeChunks(chunks) {
	  var index = -1;
	  var result = [];
	  var chunk;
	  var value;
	  var atTab;
	  while (++index < chunks.length) {
	    chunk = chunks[index];
	    if (typeof chunk === 'string') {
	      value = chunk;
	    } else if (chunk === -5) {
	      value = '\r';
	    } else if (chunk === -4) {
	      value = '\n';
	    } else if (chunk === -3) {
	      value = '\r' + '\n';
	    } else if (chunk === -2) {
	      value = '\t';
	    } else if (chunk === -1) {
	      if (atTab) continue
	      value = ' ';
	    } else {
	      value = fromCharCode(chunk);
	    }
	    atTab = chunk === -2;
	    result.push(value);
	  }
	  return result.join('')
	}
	serializeChunks_1 = serializeChunks;
	return serializeChunks_1;
}

var sliceChunks_1;
var hasRequiredSliceChunks;

function requireSliceChunks () {
	if (hasRequiredSliceChunks) return sliceChunks_1;
	hasRequiredSliceChunks = 1;
	function sliceChunks(chunks, token) {
	  var startIndex = token.start._index;
	  var startBufferIndex = token.start._bufferIndex;
	  var endIndex = token.end._index;
	  var endBufferIndex = token.end._bufferIndex;
	  var view;
	  if (startIndex === endIndex) {
	    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
	  } else {
	    view = chunks.slice(startIndex, endIndex);
	    if (startBufferIndex > -1) {
	      view[0] = view[0].slice(startBufferIndex);
	    }
	    if (endBufferIndex > 0) {
	      view.push(chunks[endIndex].slice(0, endBufferIndex));
	    }
	  }
	  return view
	}
	sliceChunks_1 = sliceChunks;
	return sliceChunks_1;
}

var createTokenizer_1;
var hasRequiredCreateTokenizer;

function requireCreateTokenizer () {
	if (hasRequiredCreateTokenizer) return createTokenizer_1;
	hasRequiredCreateTokenizer = 1;
	var assign = requireAssign();
	var markdownLineEnding = requireMarkdownLineEnding();
	var chunkedPush = requireChunkedPush();
	var chunkedSplice = requireChunkedSplice();
	var miniflat = requireMiniflat();
	var resolveAll = requireResolveAll();
	var serializeChunks = requireSerializeChunks();
	var shallow = requireShallow();
	var sliceChunks = requireSliceChunks();
	function createTokenizer(parser, initialize, from) {
	  var point = from
	    ? shallow(from)
	    : {
	        line: 1,
	        column: 1,
	        offset: 0
	      };
	  var columnStart = {};
	  var resolveAllConstructs = [];
	  var chunks = [];
	  var stack = [];
	  var effects = {
	    consume: consume,
	    enter: enter,
	    exit: exit,
	    attempt: constructFactory(onsuccessfulconstruct),
	    check: constructFactory(onsuccessfulcheck),
	    interrupt: constructFactory(onsuccessfulcheck, {
	      interrupt: true
	    }),
	    lazy: constructFactory(onsuccessfulcheck, {
	      lazy: true
	    })
	  };
	  var context = {
	    previous: null,
	    events: [],
	    parser: parser,
	    sliceStream: sliceStream,
	    sliceSerialize: sliceSerialize,
	    now: now,
	    defineSkip: skip,
	    write: write
	  };
	  var state = initialize.tokenize.call(context, effects);
	  if (initialize.resolveAll) {
	    resolveAllConstructs.push(initialize);
	  }
	  point._index = 0;
	  point._bufferIndex = -1;
	  return context
	  function write(slice) {
	    chunks = chunkedPush(chunks, slice);
	    main();
	    if (chunks[chunks.length - 1] !== null) {
	      return []
	    }
	    addResult(initialize, 0);
	    context.events = resolveAll(resolveAllConstructs, context.events, context);
	    return context.events
	  }
	  function sliceSerialize(token) {
	    return serializeChunks(sliceStream(token))
	  }
	  function sliceStream(token) {
	    return sliceChunks(chunks, token)
	  }
	  function now() {
	    return shallow(point)
	  }
	  function skip(value) {
	    columnStart[value.line] = value.column;
	    accountForPotentialSkip();
	  }
	  function main() {
	    var chunkIndex;
	    var chunk;
	    while (point._index < chunks.length) {
	      chunk = chunks[point._index];
	      if (typeof chunk === 'string') {
	        chunkIndex = point._index;
	        if (point._bufferIndex < 0) {
	          point._bufferIndex = 0;
	        }
	        while (
	          point._index === chunkIndex &&
	          point._bufferIndex < chunk.length
	        ) {
	          go(chunk.charCodeAt(point._bufferIndex));
	        }
	      } else {
	        go(chunk);
	      }
	    }
	  }
	  function go(code) {
	    state = state(code);
	  }
	  function consume(code) {
	    if (markdownLineEnding(code)) {
	      point.line++;
	      point.column = 1;
	      point.offset += code === -3 ? 2 : 1;
	      accountForPotentialSkip();
	    } else if (code !== -1) {
	      point.column++;
	      point.offset++;
	    }
	    if (point._bufferIndex < 0) {
	      point._index++;
	    } else {
	      point._bufferIndex++;
	      if (point._bufferIndex === chunks[point._index].length) {
	        point._bufferIndex = -1;
	        point._index++;
	      }
	    }
	    context.previous = code;
	  }
	  function enter(type, fields) {
	    var token = fields || {};
	    token.type = type;
	    token.start = now();
	    context.events.push(['enter', token, context]);
	    stack.push(token);
	    return token
	  }
	  function exit(type) {
	    var token = stack.pop();
	    token.end = now();
	    context.events.push(['exit', token, context]);
	    return token
	  }
	  function onsuccessfulconstruct(construct, info) {
	    addResult(construct, info.from);
	  }
	  function onsuccessfulcheck(construct, info) {
	    info.restore();
	  }
	  function constructFactory(onreturn, fields) {
	    return hook
	    function hook(constructs, returnState, bogusState) {
	      var listOfConstructs;
	      var constructIndex;
	      var currentConstruct;
	      var info;
	      return constructs.tokenize || 'length' in constructs
	        ? handleListOfConstructs(miniflat(constructs))
	        : handleMapOfConstructs
	      function handleMapOfConstructs(code) {
	        if (code in constructs || null in constructs) {
	          return handleListOfConstructs(
	            constructs.null
	              ?
	                miniflat(constructs[code]).concat(miniflat(constructs.null))
	              : constructs[code]
	          )(code)
	        }
	        return bogusState(code)
	      }
	      function handleListOfConstructs(list) {
	        listOfConstructs = list;
	        constructIndex = 0;
	        return handleConstruct(list[constructIndex])
	      }
	      function handleConstruct(construct) {
	        return start
	        function start(code) {
	          info = store();
	          currentConstruct = construct;
	          if (!construct.partial) {
	            context.currentConstruct = construct;
	          }
	          if (
	            construct.name &&
	            context.parser.constructs.disable.null.indexOf(construct.name) > -1
	          ) {
	            return nok()
	          }
	          return construct.tokenize.call(
	            fields ? assign({}, context, fields) : context,
	            effects,
	            ok,
	            nok
	          )(code)
	        }
	      }
	      function ok(code) {
	        onreturn(currentConstruct, info);
	        return returnState
	      }
	      function nok(code) {
	        info.restore();
	        if (++constructIndex < listOfConstructs.length) {
	          return handleConstruct(listOfConstructs[constructIndex])
	        }
	        return bogusState
	      }
	    }
	  }
	  function addResult(construct, from) {
	    if (construct.resolveAll && resolveAllConstructs.indexOf(construct) < 0) {
	      resolveAllConstructs.push(construct);
	    }
	    if (construct.resolve) {
	      chunkedSplice(
	        context.events,
	        from,
	        context.events.length - from,
	        construct.resolve(context.events.slice(from), context)
	      );
	    }
	    if (construct.resolveTo) {
	      context.events = construct.resolveTo(context.events, context);
	    }
	  }
	  function store() {
	    var startPoint = now();
	    var startPrevious = context.previous;
	    var startCurrentConstruct = context.currentConstruct;
	    var startEventsIndex = context.events.length;
	    var startStack = Array.from(stack);
	    return {
	      restore: restore,
	      from: startEventsIndex
	    }
	    function restore() {
	      point = startPoint;
	      context.previous = startPrevious;
	      context.currentConstruct = startCurrentConstruct;
	      context.events.length = startEventsIndex;
	      stack = startStack;
	      accountForPotentialSkip();
	    }
	  }
	  function accountForPotentialSkip() {
	    if (point.line in columnStart && point.column < 2) {
	      point.column = columnStart[point.line];
	      point.offset += columnStart[point.line] - 1;
	    }
	  }
	}
	createTokenizer_1 = createTokenizer;
	return createTokenizer_1;
}

var constructs = {};

var movePoint_1;
var hasRequiredMovePoint;

function requireMovePoint () {
	if (hasRequiredMovePoint) return movePoint_1;
	hasRequiredMovePoint = 1;
	function movePoint(point, offset) {
	  point.column += offset;
	  point.offset += offset;
	  point._bufferIndex += offset;
	  return point
	}
	movePoint_1 = movePoint;
	return movePoint_1;
}

var attention_1;
var hasRequiredAttention;

function requireAttention () {
	if (hasRequiredAttention) return attention_1;
	hasRequiredAttention = 1;
	var chunkedPush = requireChunkedPush();
	var chunkedSplice = requireChunkedSplice();
	var classifyCharacter = requireClassifyCharacter();
	var movePoint = requireMovePoint();
	var resolveAll = requireResolveAll();
	var shallow = requireShallow();
	var attention = {
	  name: 'attention',
	  tokenize: tokenizeAttention,
	  resolveAll: resolveAllAttention
	};
	function resolveAllAttention(events, context) {
	  var index = -1;
	  var open;
	  var group;
	  var text;
	  var openingSequence;
	  var closingSequence;
	  var use;
	  var nextEvents;
	  var offset;
	  while (++index < events.length) {
	    if (
	      events[index][0] === 'enter' &&
	      events[index][1].type === 'attentionSequence' &&
	      events[index][1]._close
	    ) {
	      open = index;
	      while (open--) {
	        if (
	          events[open][0] === 'exit' &&
	          events[open][1].type === 'attentionSequence' &&
	          events[open][1]._open &&
	          context.sliceSerialize(events[open][1]).charCodeAt(0) ===
	            context.sliceSerialize(events[index][1]).charCodeAt(0)
	        ) {
	          if (
	            (events[open][1]._close || events[index][1]._open) &&
	            (events[index][1].end.offset - events[index][1].start.offset) % 3 &&
	            !(
	              (events[open][1].end.offset -
	                events[open][1].start.offset +
	                events[index][1].end.offset -
	                events[index][1].start.offset) %
	              3
	            )
	          ) {
	            continue
	          }
	          use =
	            events[open][1].end.offset - events[open][1].start.offset > 1 &&
	            events[index][1].end.offset - events[index][1].start.offset > 1
	              ? 2
	              : 1;
	          openingSequence = {
	            type: use > 1 ? 'strongSequence' : 'emphasisSequence',
	            start: movePoint(shallow(events[open][1].end), -use),
	            end: shallow(events[open][1].end)
	          };
	          closingSequence = {
	            type: use > 1 ? 'strongSequence' : 'emphasisSequence',
	            start: shallow(events[index][1].start),
	            end: movePoint(shallow(events[index][1].start), use)
	          };
	          text = {
	            type: use > 1 ? 'strongText' : 'emphasisText',
	            start: shallow(events[open][1].end),
	            end: shallow(events[index][1].start)
	          };
	          group = {
	            type: use > 1 ? 'strong' : 'emphasis',
	            start: shallow(openingSequence.start),
	            end: shallow(closingSequence.end)
	          };
	          events[open][1].end = shallow(openingSequence.start);
	          events[index][1].start = shallow(closingSequence.end);
	          nextEvents = [];
	          if (events[open][1].end.offset - events[open][1].start.offset) {
	            nextEvents = chunkedPush(nextEvents, [
	              ['enter', events[open][1], context],
	              ['exit', events[open][1], context]
	            ]);
	          }
	          nextEvents = chunkedPush(nextEvents, [
	            ['enter', group, context],
	            ['enter', openingSequence, context],
	            ['exit', openingSequence, context],
	            ['enter', text, context]
	          ]);
	          nextEvents = chunkedPush(
	            nextEvents,
	            resolveAll(
	              context.parser.constructs.insideSpan.null,
	              events.slice(open + 1, index),
	              context
	            )
	          );
	          nextEvents = chunkedPush(nextEvents, [
	            ['exit', text, context],
	            ['enter', closingSequence, context],
	            ['exit', closingSequence, context],
	            ['exit', group, context]
	          ]);
	          if (events[index][1].end.offset - events[index][1].start.offset) {
	            offset = 2;
	            nextEvents = chunkedPush(nextEvents, [
	              ['enter', events[index][1], context],
	              ['exit', events[index][1], context]
	            ]);
	          } else {
	            offset = 0;
	          }
	          chunkedSplice(events, open - 1, index - open + 3, nextEvents);
	          index = open + nextEvents.length - offset - 2;
	          break
	        }
	      }
	    }
	  }
	  index = -1;
	  while (++index < events.length) {
	    if (events[index][1].type === 'attentionSequence') {
	      events[index][1].type = 'data';
	    }
	  }
	  return events
	}
	function tokenizeAttention(effects, ok) {
	  var before = classifyCharacter(this.previous);
	  var marker;
	  return start
	  function start(code) {
	    effects.enter('attentionSequence');
	    marker = code;
	    return sequence(code)
	  }
	  function sequence(code) {
	    var token;
	    var after;
	    var open;
	    var close;
	    if (code === marker) {
	      effects.consume(code);
	      return sequence
	    }
	    token = effects.exit('attentionSequence');
	    after = classifyCharacter(code);
	    open = !after || (after === 2 && before);
	    close = !before || (before === 2 && after);
	    token._open = marker === 42 ? open : open && (before || !close);
	    token._close = marker === 42 ? close : close && (after || !open);
	    return ok(code)
	  }
	}
	attention_1 = attention;
	return attention_1;
}

var asciiAtext_1;
var hasRequiredAsciiAtext;

function requireAsciiAtext () {
	if (hasRequiredAsciiAtext) return asciiAtext_1;
	hasRequiredAsciiAtext = 1;
	var regexCheck = requireRegexCheck();
	var asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
	asciiAtext_1 = asciiAtext;
	return asciiAtext_1;
}

var autolink_1;
var hasRequiredAutolink;

function requireAutolink () {
	if (hasRequiredAutolink) return autolink_1;
	hasRequiredAutolink = 1;
	var asciiAlpha = requireAsciiAlpha();
	var asciiAlphanumeric = requireAsciiAlphanumeric();
	var asciiAtext = requireAsciiAtext();
	var asciiControl = requireAsciiControl();
	var autolink = {
	  name: 'autolink',
	  tokenize: tokenizeAutolink
	};
	function tokenizeAutolink(effects, ok, nok) {
	  var size = 1;
	  return start
	  function start(code) {
	    effects.enter('autolink');
	    effects.enter('autolinkMarker');
	    effects.consume(code);
	    effects.exit('autolinkMarker');
	    effects.enter('autolinkProtocol');
	    return open
	  }
	  function open(code) {
	    if (asciiAlpha(code)) {
	      effects.consume(code);
	      return schemeOrEmailAtext
	    }
	    return asciiAtext(code) ? emailAtext(code) : nok(code)
	  }
	  function schemeOrEmailAtext(code) {
	    return code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)
	      ? schemeInsideOrEmailAtext(code)
	      : emailAtext(code)
	  }
	  function schemeInsideOrEmailAtext(code) {
	    if (code === 58) {
	      effects.consume(code);
	      return urlInside
	    }
	    if (
	      (code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) &&
	      size++ < 32
	    ) {
	      effects.consume(code);
	      return schemeInsideOrEmailAtext
	    }
	    return emailAtext(code)
	  }
	  function urlInside(code) {
	    if (code === 62) {
	      effects.exit('autolinkProtocol');
	      return end(code)
	    }
	    if (code === 32 || code === 60 || asciiControl(code)) {
	      return nok(code)
	    }
	    effects.consume(code);
	    return urlInside
	  }
	  function emailAtext(code) {
	    if (code === 64) {
	      effects.consume(code);
	      size = 0;
	      return emailAtSignOrDot
	    }
	    if (asciiAtext(code)) {
	      effects.consume(code);
	      return emailAtext
	    }
	    return nok(code)
	  }
	  function emailAtSignOrDot(code) {
	    return asciiAlphanumeric(code) ? emailLabel(code) : nok(code)
	  }
	  function emailLabel(code) {
	    if (code === 46) {
	      effects.consume(code);
	      size = 0;
	      return emailAtSignOrDot
	    }
	    if (code === 62) {
	      effects.exit('autolinkProtocol').type = 'autolinkEmail';
	      return end(code)
	    }
	    return emailValue(code)
	  }
	  function emailValue(code) {
	    if ((code === 45 || asciiAlphanumeric(code)) && size++ < 63) {
	      effects.consume(code);
	      return code === 45 ? emailValue : emailLabel
	    }
	    return nok(code)
	  }
	  function end(code) {
	    effects.enter('autolinkMarker');
	    effects.consume(code);
	    effects.exit('autolinkMarker');
	    effects.exit('autolink');
	    return ok
	  }
	}
	autolink_1 = autolink;
	return autolink_1;
}

var blockQuote_1;
var hasRequiredBlockQuote;

function requireBlockQuote () {
	if (hasRequiredBlockQuote) return blockQuote_1;
	hasRequiredBlockQuote = 1;
	var markdownSpace = requireMarkdownSpace();
	var factorySpace = requireFactorySpace();
	var blockQuote = {
	  name: 'blockQuote',
	  tokenize: tokenizeBlockQuoteStart,
	  continuation: {
	    tokenize: tokenizeBlockQuoteContinuation
	  },
	  exit: exit
	};
	function tokenizeBlockQuoteStart(effects, ok, nok) {
	  var self = this;
	  return start
	  function start(code) {
	    if (code === 62) {
	      if (!self.containerState.open) {
	        effects.enter('blockQuote', {
	          _container: true
	        });
	        self.containerState.open = true;
	      }
	      effects.enter('blockQuotePrefix');
	      effects.enter('blockQuoteMarker');
	      effects.consume(code);
	      effects.exit('blockQuoteMarker');
	      return after
	    }
	    return nok(code)
	  }
	  function after(code) {
	    if (markdownSpace(code)) {
	      effects.enter('blockQuotePrefixWhitespace');
	      effects.consume(code);
	      effects.exit('blockQuotePrefixWhitespace');
	      effects.exit('blockQuotePrefix');
	      return ok
	    }
	    effects.exit('blockQuotePrefix');
	    return ok(code)
	  }
	}
	function tokenizeBlockQuoteContinuation(effects, ok, nok) {
	  return factorySpace(
	    effects,
	    effects.attempt(blockQuote, ok, nok),
	    'linePrefix',
	    this.parser.constructs.disable.null.indexOf('codeIndented') > -1
	      ? undefined
	      : 4
	  )
	}
	function exit(effects) {
	  effects.exit('blockQuote');
	}
	blockQuote_1 = blockQuote;
	return blockQuote_1;
}

var asciiPunctuation_1;
var hasRequiredAsciiPunctuation;

function requireAsciiPunctuation () {
	if (hasRequiredAsciiPunctuation) return asciiPunctuation_1;
	hasRequiredAsciiPunctuation = 1;
	var regexCheck = requireRegexCheck();
	var asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
	asciiPunctuation_1 = asciiPunctuation;
	return asciiPunctuation_1;
}

var characterEscape_1;
var hasRequiredCharacterEscape;

function requireCharacterEscape () {
	if (hasRequiredCharacterEscape) return characterEscape_1;
	hasRequiredCharacterEscape = 1;
	var asciiPunctuation = requireAsciiPunctuation();
	var characterEscape = {
	  name: 'characterEscape',
	  tokenize: tokenizeCharacterEscape
	};
	function tokenizeCharacterEscape(effects, ok, nok) {
	  return start
	  function start(code) {
	    effects.enter('characterEscape');
	    effects.enter('escapeMarker');
	    effects.consume(code);
	    effects.exit('escapeMarker');
	    return open
	  }
	  function open(code) {
	    if (asciiPunctuation(code)) {
	      effects.enter('characterEscapeValue');
	      effects.consume(code);
	      effects.exit('characterEscapeValue');
	      effects.exit('characterEscape');
	      return ok
	    }
	    return nok(code)
	  }
	}
	characterEscape_1 = characterEscape;
	return characterEscape_1;
}

var decodeEntity_browser;
var hasRequiredDecodeEntity_browser;

function requireDecodeEntity_browser () {
	if (hasRequiredDecodeEntity_browser) return decodeEntity_browser;
	hasRequiredDecodeEntity_browser = 1;
	var el;
	var semicolon = 59;
	decodeEntity_browser = decodeEntity;
	function decodeEntity(characters) {
	  var entity = '&' + characters + ';';
	  var char;
	  el = el || document.createElement('i');
	  el.innerHTML = entity;
	  char = el.textContent;
	  if (char.charCodeAt(char.length - 1) === semicolon && characters !== 'semi') {
	    return false
	  }
	  return char === entity ? false : char
	}
	return decodeEntity_browser;
}

var asciiDigit_1;
var hasRequiredAsciiDigit;

function requireAsciiDigit () {
	if (hasRequiredAsciiDigit) return asciiDigit_1;
	hasRequiredAsciiDigit = 1;
	var regexCheck = requireRegexCheck();
	var asciiDigit = regexCheck(/\d/);
	asciiDigit_1 = asciiDigit;
	return asciiDigit_1;
}

var asciiHexDigit_1;
var hasRequiredAsciiHexDigit;

function requireAsciiHexDigit () {
	if (hasRequiredAsciiHexDigit) return asciiHexDigit_1;
	hasRequiredAsciiHexDigit = 1;
	var regexCheck = requireRegexCheck();
	var asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
	asciiHexDigit_1 = asciiHexDigit;
	return asciiHexDigit_1;
}

var characterReference_1;
var hasRequiredCharacterReference;

function requireCharacterReference () {
	if (hasRequiredCharacterReference) return characterReference_1;
	hasRequiredCharacterReference = 1;
	var decodeEntity = requireDecodeEntity_browser();
	var asciiAlphanumeric = requireAsciiAlphanumeric();
	var asciiDigit = requireAsciiDigit();
	var asciiHexDigit = requireAsciiHexDigit();
	function _interopDefaultLegacy(e) {
	  return e && typeof e === 'object' && 'default' in e ? e : {default: e}
	}
	var decodeEntity__default =  _interopDefaultLegacy(decodeEntity);
	var characterReference = {
	  name: 'characterReference',
	  tokenize: tokenizeCharacterReference
	};
	function tokenizeCharacterReference(effects, ok, nok) {
	  var self = this;
	  var size = 0;
	  var max;
	  var test;
	  return start
	  function start(code) {
	    effects.enter('characterReference');
	    effects.enter('characterReferenceMarker');
	    effects.consume(code);
	    effects.exit('characterReferenceMarker');
	    return open
	  }
	  function open(code) {
	    if (code === 35) {
	      effects.enter('characterReferenceMarkerNumeric');
	      effects.consume(code);
	      effects.exit('characterReferenceMarkerNumeric');
	      return numeric
	    }
	    effects.enter('characterReferenceValue');
	    max = 31;
	    test = asciiAlphanumeric;
	    return value(code)
	  }
	  function numeric(code) {
	    if (code === 88 || code === 120) {
	      effects.enter('characterReferenceMarkerHexadecimal');
	      effects.consume(code);
	      effects.exit('characterReferenceMarkerHexadecimal');
	      effects.enter('characterReferenceValue');
	      max = 6;
	      test = asciiHexDigit;
	      return value
	    }
	    effects.enter('characterReferenceValue');
	    max = 7;
	    test = asciiDigit;
	    return value(code)
	  }
	  function value(code) {
	    var token;
	    if (code === 59 && size) {
	      token = effects.exit('characterReferenceValue');
	      if (
	        test === asciiAlphanumeric &&
	        !decodeEntity__default['default'](self.sliceSerialize(token))
	      ) {
	        return nok(code)
	      }
	      effects.enter('characterReferenceMarker');
	      effects.consume(code);
	      effects.exit('characterReferenceMarker');
	      effects.exit('characterReference');
	      return ok
	    }
	    if (test(code) && size++ < max) {
	      effects.consume(code);
	      return value
	    }
	    return nok(code)
	  }
	}
	characterReference_1 = characterReference;
	return characterReference_1;
}

var codeFenced_1;
var hasRequiredCodeFenced;

function requireCodeFenced () {
	if (hasRequiredCodeFenced) return codeFenced_1;
	hasRequiredCodeFenced = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var markdownLineEndingOrSpace = requireMarkdownLineEndingOrSpace();
	var prefixSize = requirePrefixSize();
	var factorySpace = requireFactorySpace();
	var codeFenced = {
	  name: 'codeFenced',
	  tokenize: tokenizeCodeFenced,
	  concrete: true
	};
	function tokenizeCodeFenced(effects, ok, nok) {
	  var self = this;
	  var closingFenceConstruct = {
	    tokenize: tokenizeClosingFence,
	    partial: true
	  };
	  var initialPrefix = prefixSize(this.events, 'linePrefix');
	  var sizeOpen = 0;
	  var marker;
	  return start
	  function start(code) {
	    effects.enter('codeFenced');
	    effects.enter('codeFencedFence');
	    effects.enter('codeFencedFenceSequence');
	    marker = code;
	    return sequenceOpen(code)
	  }
	  function sequenceOpen(code) {
	    if (code === marker) {
	      effects.consume(code);
	      sizeOpen++;
	      return sequenceOpen
	    }
	    effects.exit('codeFencedFenceSequence');
	    return sizeOpen < 3
	      ? nok(code)
	      : factorySpace(effects, infoOpen, 'whitespace')(code)
	  }
	  function infoOpen(code) {
	    if (code === null || markdownLineEnding(code)) {
	      return openAfter(code)
	    }
	    effects.enter('codeFencedFenceInfo');
	    effects.enter('chunkString', {
	      contentType: 'string'
	    });
	    return info(code)
	  }
	  function info(code) {
	    if (code === null || markdownLineEndingOrSpace(code)) {
	      effects.exit('chunkString');
	      effects.exit('codeFencedFenceInfo');
	      return factorySpace(effects, infoAfter, 'whitespace')(code)
	    }
	    if (code === 96 && code === marker) return nok(code)
	    effects.consume(code);
	    return info
	  }
	  function infoAfter(code) {
	    if (code === null || markdownLineEnding(code)) {
	      return openAfter(code)
	    }
	    effects.enter('codeFencedFenceMeta');
	    effects.enter('chunkString', {
	      contentType: 'string'
	    });
	    return meta(code)
	  }
	  function meta(code) {
	    if (code === null || markdownLineEnding(code)) {
	      effects.exit('chunkString');
	      effects.exit('codeFencedFenceMeta');
	      return openAfter(code)
	    }
	    if (code === 96 && code === marker) return nok(code)
	    effects.consume(code);
	    return meta
	  }
	  function openAfter(code) {
	    effects.exit('codeFencedFence');
	    return self.interrupt ? ok(code) : content(code)
	  }
	  function content(code) {
	    if (code === null) {
	      return after(code)
	    }
	    if (markdownLineEnding(code)) {
	      effects.enter('lineEnding');
	      effects.consume(code);
	      effects.exit('lineEnding');
	      return effects.attempt(
	        closingFenceConstruct,
	        after,
	        initialPrefix
	          ? factorySpace(effects, content, 'linePrefix', initialPrefix + 1)
	          : content
	      )
	    }
	    effects.enter('codeFlowValue');
	    return contentContinue(code)
	  }
	  function contentContinue(code) {
	    if (code === null || markdownLineEnding(code)) {
	      effects.exit('codeFlowValue');
	      return content(code)
	    }
	    effects.consume(code);
	    return contentContinue
	  }
	  function after(code) {
	    effects.exit('codeFenced');
	    return ok(code)
	  }
	  function tokenizeClosingFence(effects, ok, nok) {
	    var size = 0;
	    return factorySpace(
	      effects,
	      closingSequenceStart,
	      'linePrefix',
	      this.parser.constructs.disable.null.indexOf('codeIndented') > -1
	        ? undefined
	        : 4
	    )
	    function closingSequenceStart(code) {
	      effects.enter('codeFencedFence');
	      effects.enter('codeFencedFenceSequence');
	      return closingSequence(code)
	    }
	    function closingSequence(code) {
	      if (code === marker) {
	        effects.consume(code);
	        size++;
	        return closingSequence
	      }
	      if (size < sizeOpen) return nok(code)
	      effects.exit('codeFencedFenceSequence');
	      return factorySpace(effects, closingSequenceEnd, 'whitespace')(code)
	    }
	    function closingSequenceEnd(code) {
	      if (code === null || markdownLineEnding(code)) {
	        effects.exit('codeFencedFence');
	        return ok(code)
	      }
	      return nok(code)
	    }
	  }
	}
	codeFenced_1 = codeFenced;
	return codeFenced_1;
}

var codeIndented_1;
var hasRequiredCodeIndented;

function requireCodeIndented () {
	if (hasRequiredCodeIndented) return codeIndented_1;
	hasRequiredCodeIndented = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var chunkedSplice = requireChunkedSplice();
	var prefixSize = requirePrefixSize();
	var factorySpace = requireFactorySpace();
	var codeIndented = {
	  name: 'codeIndented',
	  tokenize: tokenizeCodeIndented,
	  resolve: resolveCodeIndented
	};
	var indentedContentConstruct = {
	  tokenize: tokenizeIndentedContent,
	  partial: true
	};
	function resolveCodeIndented(events, context) {
	  var code = {
	    type: 'codeIndented',
	    start: events[0][1].start,
	    end: events[events.length - 1][1].end
	  };
	  chunkedSplice(events, 0, 0, [['enter', code, context]]);
	  chunkedSplice(events, events.length, 0, [['exit', code, context]]);
	  return events
	}
	function tokenizeCodeIndented(effects, ok, nok) {
	  return effects.attempt(indentedContentConstruct, afterPrefix, nok)
	  function afterPrefix(code) {
	    if (code === null) {
	      return ok(code)
	    }
	    if (markdownLineEnding(code)) {
	      return effects.attempt(indentedContentConstruct, afterPrefix, ok)(code)
	    }
	    effects.enter('codeFlowValue');
	    return content(code)
	  }
	  function content(code) {
	    if (code === null || markdownLineEnding(code)) {
	      effects.exit('codeFlowValue');
	      return afterPrefix(code)
	    }
	    effects.consume(code);
	    return content
	  }
	}
	function tokenizeIndentedContent(effects, ok, nok) {
	  var self = this;
	  return factorySpace(effects, afterPrefix, 'linePrefix', 4 + 1)
	  function afterPrefix(code) {
	    if (markdownLineEnding(code)) {
	      effects.enter('lineEnding');
	      effects.consume(code);
	      effects.exit('lineEnding');
	      return factorySpace(effects, afterPrefix, 'linePrefix', 4 + 1)
	    }
	    return prefixSize(self.events, 'linePrefix') < 4 ? nok(code) : ok(code)
	  }
	}
	codeIndented_1 = codeIndented;
	return codeIndented_1;
}

var codeText_1;
var hasRequiredCodeText;

function requireCodeText () {
	if (hasRequiredCodeText) return codeText_1;
	hasRequiredCodeText = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var codeText = {
	  name: 'codeText',
	  tokenize: tokenizeCodeText,
	  resolve: resolveCodeText,
	  previous: previous
	};
	function resolveCodeText(events) {
	  var tailExitIndex = events.length - 4;
	  var headEnterIndex = 3;
	  var index;
	  var enter;
	  if (
	    (events[headEnterIndex][1].type === 'lineEnding' ||
	      events[headEnterIndex][1].type === 'space') &&
	    (events[tailExitIndex][1].type === 'lineEnding' ||
	      events[tailExitIndex][1].type === 'space')
	  ) {
	    index = headEnterIndex;
	    while (++index < tailExitIndex) {
	      if (events[index][1].type === 'codeTextData') {
	        events[tailExitIndex][1].type = events[headEnterIndex][1].type =
	          'codeTextPadding';
	        headEnterIndex += 2;
	        tailExitIndex -= 2;
	        break
	      }
	    }
	  }
	  index = headEnterIndex - 1;
	  tailExitIndex++;
	  while (++index <= tailExitIndex) {
	    if (enter === undefined) {
	      if (index !== tailExitIndex && events[index][1].type !== 'lineEnding') {
	        enter = index;
	      }
	    } else if (
	      index === tailExitIndex ||
	      events[index][1].type === 'lineEnding'
	    ) {
	      events[enter][1].type = 'codeTextData';
	      if (index !== enter + 2) {
	        events[enter][1].end = events[index - 1][1].end;
	        events.splice(enter + 2, index - enter - 2);
	        tailExitIndex -= index - enter - 2;
	        index = enter + 2;
	      }
	      enter = undefined;
	    }
	  }
	  return events
	}
	function previous(code) {
	  return (
	    code !== 96 ||
	    this.events[this.events.length - 1][1].type === 'characterEscape'
	  )
	}
	function tokenizeCodeText(effects, ok, nok) {
	  var sizeOpen = 0;
	  var size;
	  var token;
	  return start
	  function start(code) {
	    effects.enter('codeText');
	    effects.enter('codeTextSequence');
	    return openingSequence(code)
	  }
	  function openingSequence(code) {
	    if (code === 96) {
	      effects.consume(code);
	      sizeOpen++;
	      return openingSequence
	    }
	    effects.exit('codeTextSequence');
	    return gap(code)
	  }
	  function gap(code) {
	    if (code === null) {
	      return nok(code)
	    }
	    if (code === 96) {
	      token = effects.enter('codeTextSequence');
	      size = 0;
	      return closingSequence(code)
	    }
	    if (code === 32) {
	      effects.enter('space');
	      effects.consume(code);
	      effects.exit('space');
	      return gap
	    }
	    if (markdownLineEnding(code)) {
	      effects.enter('lineEnding');
	      effects.consume(code);
	      effects.exit('lineEnding');
	      return gap
	    }
	    effects.enter('codeTextData');
	    return data(code)
	  }
	  function data(code) {
	    if (
	      code === null ||
	      code === 32 ||
	      code === 96 ||
	      markdownLineEnding(code)
	    ) {
	      effects.exit('codeTextData');
	      return gap(code)
	    }
	    effects.consume(code);
	    return data
	  }
	  function closingSequence(code) {
	    if (code === 96) {
	      effects.consume(code);
	      size++;
	      return closingSequence
	    }
	    if (size === sizeOpen) {
	      effects.exit('codeTextSequence');
	      effects.exit('codeText');
	      return ok(code)
	    }
	    token.type = 'codeTextData';
	    return data(code)
	  }
	}
	codeText_1 = codeText;
	return codeText_1;
}

var factoryDestination;
var hasRequiredFactoryDestination;

function requireFactoryDestination () {
	if (hasRequiredFactoryDestination) return factoryDestination;
	hasRequiredFactoryDestination = 1;
	var asciiControl = requireAsciiControl();
	var markdownLineEndingOrSpace = requireMarkdownLineEndingOrSpace();
	var markdownLineEnding = requireMarkdownLineEnding();
	function destinationFactory(
	  effects,
	  ok,
	  nok,
	  type,
	  literalType,
	  literalMarkerType,
	  rawType,
	  stringType,
	  max
	) {
	  var limit = max || Infinity;
	  var balance = 0;
	  return start
	  function start(code) {
	    if (code === 60) {
	      effects.enter(type);
	      effects.enter(literalType);
	      effects.enter(literalMarkerType);
	      effects.consume(code);
	      effects.exit(literalMarkerType);
	      return destinationEnclosedBefore
	    }
	    if (asciiControl(code) || code === 41) {
	      return nok(code)
	    }
	    effects.enter(type);
	    effects.enter(rawType);
	    effects.enter(stringType);
	    effects.enter('chunkString', {
	      contentType: 'string'
	    });
	    return destinationRaw(code)
	  }
	  function destinationEnclosedBefore(code) {
	    if (code === 62) {
	      effects.enter(literalMarkerType);
	      effects.consume(code);
	      effects.exit(literalMarkerType);
	      effects.exit(literalType);
	      effects.exit(type);
	      return ok
	    }
	    effects.enter(stringType);
	    effects.enter('chunkString', {
	      contentType: 'string'
	    });
	    return destinationEnclosed(code)
	  }
	  function destinationEnclosed(code) {
	    if (code === 62) {
	      effects.exit('chunkString');
	      effects.exit(stringType);
	      return destinationEnclosedBefore(code)
	    }
	    if (code === null || code === 60 || markdownLineEnding(code)) {
	      return nok(code)
	    }
	    effects.consume(code);
	    return code === 92 ? destinationEnclosedEscape : destinationEnclosed
	  }
	  function destinationEnclosedEscape(code) {
	    if (code === 60 || code === 62 || code === 92) {
	      effects.consume(code);
	      return destinationEnclosed
	    }
	    return destinationEnclosed(code)
	  }
	  function destinationRaw(code) {
	    if (code === 40) {
	      if (++balance > limit) return nok(code)
	      effects.consume(code);
	      return destinationRaw
	    }
	    if (code === 41) {
	      if (!balance--) {
	        effects.exit('chunkString');
	        effects.exit(stringType);
	        effects.exit(rawType);
	        effects.exit(type);
	        return ok(code)
	      }
	      effects.consume(code);
	      return destinationRaw
	    }
	    if (code === null || markdownLineEndingOrSpace(code)) {
	      if (balance) return nok(code)
	      effects.exit('chunkString');
	      effects.exit(stringType);
	      effects.exit(rawType);
	      effects.exit(type);
	      return ok(code)
	    }
	    if (asciiControl(code)) return nok(code)
	    effects.consume(code);
	    return code === 92 ? destinationRawEscape : destinationRaw
	  }
	  function destinationRawEscape(code) {
	    if (code === 40 || code === 41 || code === 92) {
	      effects.consume(code);
	      return destinationRaw
	    }
	    return destinationRaw(code)
	  }
	}
	factoryDestination = destinationFactory;
	return factoryDestination;
}

var factoryLabel;
var hasRequiredFactoryLabel;

function requireFactoryLabel () {
	if (hasRequiredFactoryLabel) return factoryLabel;
	hasRequiredFactoryLabel = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var markdownSpace = requireMarkdownSpace();
	function labelFactory(effects, ok, nok, type, markerType, stringType) {
	  var self = this;
	  var size = 0;
	  var data;
	  return start
	  function start(code) {
	    effects.enter(type);
	    effects.enter(markerType);
	    effects.consume(code);
	    effects.exit(markerType);
	    effects.enter(stringType);
	    return atBreak
	  }
	  function atBreak(code) {
	    if (
	      code === null ||
	      code === 91 ||
	      (code === 93 && !data) ||
	      (code === 94 &&
	        !size &&
	        '_hiddenFootnoteSupport' in self.parser.constructs) ||
	      size > 999
	    ) {
	      return nok(code)
	    }
	    if (code === 93) {
	      effects.exit(stringType);
	      effects.enter(markerType);
	      effects.consume(code);
	      effects.exit(markerType);
	      effects.exit(type);
	      return ok
	    }
	    if (markdownLineEnding(code)) {
	      effects.enter('lineEnding');
	      effects.consume(code);
	      effects.exit('lineEnding');
	      return atBreak
	    }
	    effects.enter('chunkString', {
	      contentType: 'string'
	    });
	    return label(code)
	  }
	  function label(code) {
	    if (
	      code === null ||
	      code === 91 ||
	      code === 93 ||
	      markdownLineEnding(code) ||
	      size++ > 999
	    ) {
	      effects.exit('chunkString');
	      return atBreak(code)
	    }
	    effects.consume(code);
	    data = data || !markdownSpace(code);
	    return code === 92 ? labelEscape : label
	  }
	  function labelEscape(code) {
	    if (code === 91 || code === 92 || code === 93) {
	      effects.consume(code);
	      size++;
	      return label
	    }
	    return label(code)
	  }
	}
	factoryLabel = labelFactory;
	return factoryLabel;
}

var factoryWhitespace;
var hasRequiredFactoryWhitespace;

function requireFactoryWhitespace () {
	if (hasRequiredFactoryWhitespace) return factoryWhitespace;
	hasRequiredFactoryWhitespace = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var markdownSpace = requireMarkdownSpace();
	var factorySpace = requireFactorySpace();
	function whitespaceFactory(effects, ok) {
	  var seen;
	  return start
	  function start(code) {
	    if (markdownLineEnding(code)) {
	      effects.enter('lineEnding');
	      effects.consume(code);
	      effects.exit('lineEnding');
	      seen = true;
	      return start
	    }
	    if (markdownSpace(code)) {
	      return factorySpace(
	        effects,
	        start,
	        seen ? 'linePrefix' : 'lineSuffix'
	      )(code)
	    }
	    return ok(code)
	  }
	}
	factoryWhitespace = whitespaceFactory;
	return factoryWhitespace;
}

var factoryTitle;
var hasRequiredFactoryTitle;

function requireFactoryTitle () {
	if (hasRequiredFactoryTitle) return factoryTitle;
	hasRequiredFactoryTitle = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var factorySpace = requireFactorySpace();
	function titleFactory(effects, ok, nok, type, markerType, stringType) {
	  var marker;
	  return start
	  function start(code) {
	    effects.enter(type);
	    effects.enter(markerType);
	    effects.consume(code);
	    effects.exit(markerType);
	    marker = code === 40 ? 41 : code;
	    return atFirstTitleBreak
	  }
	  function atFirstTitleBreak(code) {
	    if (code === marker) {
	      effects.enter(markerType);
	      effects.consume(code);
	      effects.exit(markerType);
	      effects.exit(type);
	      return ok
	    }
	    effects.enter(stringType);
	    return atTitleBreak(code)
	  }
	  function atTitleBreak(code) {
	    if (code === marker) {
	      effects.exit(stringType);
	      return atFirstTitleBreak(marker)
	    }
	    if (code === null) {
	      return nok(code)
	    }
	    if (markdownLineEnding(code)) {
	      effects.enter('lineEnding');
	      effects.consume(code);
	      effects.exit('lineEnding');
	      return factorySpace(effects, atTitleBreak, 'linePrefix')
	    }
	    effects.enter('chunkString', {
	      contentType: 'string'
	    });
	    return title(code)
	  }
	  function title(code) {
	    if (code === marker || code === null || markdownLineEnding(code)) {
	      effects.exit('chunkString');
	      return atTitleBreak(code)
	    }
	    effects.consume(code);
	    return code === 92 ? titleEscape : title
	  }
	  function titleEscape(code) {
	    if (code === marker || code === 92) {
	      effects.consume(code);
	      return title
	    }
	    return title(code)
	  }
	}
	factoryTitle = titleFactory;
	return factoryTitle;
}

var definition_1$1;
var hasRequiredDefinition$1;

function requireDefinition$1 () {
	if (hasRequiredDefinition$1) return definition_1$1;
	hasRequiredDefinition$1 = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var markdownLineEndingOrSpace = requireMarkdownLineEndingOrSpace();
	var normalizeIdentifier = requireNormalizeIdentifier();
	var factoryDestination = requireFactoryDestination();
	var factoryLabel = requireFactoryLabel();
	var factorySpace = requireFactorySpace();
	var factoryWhitespace = requireFactoryWhitespace();
	var factoryTitle = requireFactoryTitle();
	var definition = {
	  name: 'definition',
	  tokenize: tokenizeDefinition
	};
	var titleConstruct = {
	  tokenize: tokenizeTitle,
	  partial: true
	};
	function tokenizeDefinition(effects, ok, nok) {
	  var self = this;
	  var identifier;
	  return start
	  function start(code) {
	    effects.enter('definition');
	    return factoryLabel.call(
	      self,
	      effects,
	      labelAfter,
	      nok,
	      'definitionLabel',
	      'definitionLabelMarker',
	      'definitionLabelString'
	    )(code)
	  }
	  function labelAfter(code) {
	    identifier = normalizeIdentifier(
	      self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1)
	    );
	    if (code === 58) {
	      effects.enter('definitionMarker');
	      effects.consume(code);
	      effects.exit('definitionMarker');
	      return factoryWhitespace(
	        effects,
	        factoryDestination(
	          effects,
	          effects.attempt(
	            titleConstruct,
	            factorySpace(effects, after, 'whitespace'),
	            factorySpace(effects, after, 'whitespace')
	          ),
	          nok,
	          'definitionDestination',
	          'definitionDestinationLiteral',
	          'definitionDestinationLiteralMarker',
	          'definitionDestinationRaw',
	          'definitionDestinationString'
	        )
	      )
	    }
	    return nok(code)
	  }
	  function after(code) {
	    if (code === null || markdownLineEnding(code)) {
	      effects.exit('definition');
	      if (self.parser.defined.indexOf(identifier) < 0) {
	        self.parser.defined.push(identifier);
	      }
	      return ok(code)
	    }
	    return nok(code)
	  }
	}
	function tokenizeTitle(effects, ok, nok) {
	  return start
	  function start(code) {
	    return markdownLineEndingOrSpace(code)
	      ? factoryWhitespace(effects, before)(code)
	      : nok(code)
	  }
	  function before(code) {
	    if (code === 34 || code === 39 || code === 40) {
	      return factoryTitle(
	        effects,
	        factorySpace(effects, after, 'whitespace'),
	        nok,
	        'definitionTitle',
	        'definitionTitleMarker',
	        'definitionTitleString'
	      )(code)
	    }
	    return nok(code)
	  }
	  function after(code) {
	    return code === null || markdownLineEnding(code) ? ok(code) : nok(code)
	  }
	}
	definition_1$1 = definition;
	return definition_1$1;
}

var hardBreakEscape_1;
var hasRequiredHardBreakEscape;

function requireHardBreakEscape () {
	if (hasRequiredHardBreakEscape) return hardBreakEscape_1;
	hasRequiredHardBreakEscape = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var hardBreakEscape = {
	  name: 'hardBreakEscape',
	  tokenize: tokenizeHardBreakEscape
	};
	function tokenizeHardBreakEscape(effects, ok, nok) {
	  return start
	  function start(code) {
	    effects.enter('hardBreakEscape');
	    effects.enter('escapeMarker');
	    effects.consume(code);
	    return open
	  }
	  function open(code) {
	    if (markdownLineEnding(code)) {
	      effects.exit('escapeMarker');
	      effects.exit('hardBreakEscape');
	      return ok(code)
	    }
	    return nok(code)
	  }
	}
	hardBreakEscape_1 = hardBreakEscape;
	return hardBreakEscape_1;
}

var headingAtx_1;
var hasRequiredHeadingAtx;

function requireHeadingAtx () {
	if (hasRequiredHeadingAtx) return headingAtx_1;
	hasRequiredHeadingAtx = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var markdownLineEndingOrSpace = requireMarkdownLineEndingOrSpace();
	var markdownSpace = requireMarkdownSpace();
	var chunkedSplice = requireChunkedSplice();
	var factorySpace = requireFactorySpace();
	var headingAtx = {
	  name: 'headingAtx',
	  tokenize: tokenizeHeadingAtx,
	  resolve: resolveHeadingAtx
	};
	function resolveHeadingAtx(events, context) {
	  var contentEnd = events.length - 2;
	  var contentStart = 3;
	  var content;
	  var text;
	  if (events[contentStart][1].type === 'whitespace') {
	    contentStart += 2;
	  }
	  if (
	    contentEnd - 2 > contentStart &&
	    events[contentEnd][1].type === 'whitespace'
	  ) {
	    contentEnd -= 2;
	  }
	  if (
	    events[contentEnd][1].type === 'atxHeadingSequence' &&
	    (contentStart === contentEnd - 1 ||
	      (contentEnd - 4 > contentStart &&
	        events[contentEnd - 2][1].type === 'whitespace'))
	  ) {
	    contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
	  }
	  if (contentEnd > contentStart) {
	    content = {
	      type: 'atxHeadingText',
	      start: events[contentStart][1].start,
	      end: events[contentEnd][1].end
	    };
	    text = {
	      type: 'chunkText',
	      start: events[contentStart][1].start,
	      end: events[contentEnd][1].end,
	      contentType: 'text'
	    };
	    chunkedSplice(events, contentStart, contentEnd - contentStart + 1, [
	      ['enter', content, context],
	      ['enter', text, context],
	      ['exit', text, context],
	      ['exit', content, context]
	    ]);
	  }
	  return events
	}
	function tokenizeHeadingAtx(effects, ok, nok) {
	  var self = this;
	  var size = 0;
	  return start
	  function start(code) {
	    effects.enter('atxHeading');
	    effects.enter('atxHeadingSequence');
	    return fenceOpenInside(code)
	  }
	  function fenceOpenInside(code) {
	    if (code === 35 && size++ < 6) {
	      effects.consume(code);
	      return fenceOpenInside
	    }
	    if (code === null || markdownLineEndingOrSpace(code)) {
	      effects.exit('atxHeadingSequence');
	      return self.interrupt ? ok(code) : headingBreak(code)
	    }
	    return nok(code)
	  }
	  function headingBreak(code) {
	    if (code === 35) {
	      effects.enter('atxHeadingSequence');
	      return sequence(code)
	    }
	    if (code === null || markdownLineEnding(code)) {
	      effects.exit('atxHeading');
	      return ok(code)
	    }
	    if (markdownSpace(code)) {
	      return factorySpace(effects, headingBreak, 'whitespace')(code)
	    }
	    effects.enter('atxHeadingText');
	    return data(code)
	  }
	  function sequence(code) {
	    if (code === 35) {
	      effects.consume(code);
	      return sequence
	    }
	    effects.exit('atxHeadingSequence');
	    return headingBreak(code)
	  }
	  function data(code) {
	    if (code === null || code === 35 || markdownLineEndingOrSpace(code)) {
	      effects.exit('atxHeadingText');
	      return headingBreak(code)
	    }
	    effects.consume(code);
	    return data
	  }
	}
	headingAtx_1 = headingAtx;
	return headingAtx_1;
}

var htmlBlockNames;
var hasRequiredHtmlBlockNames;

function requireHtmlBlockNames () {
	if (hasRequiredHtmlBlockNames) return htmlBlockNames;
	hasRequiredHtmlBlockNames = 1;
	var basics = [
	  'address',
	  'article',
	  'aside',
	  'base',
	  'basefont',
	  'blockquote',
	  'body',
	  'caption',
	  'center',
	  'col',
	  'colgroup',
	  'dd',
	  'details',
	  'dialog',
	  'dir',
	  'div',
	  'dl',
	  'dt',
	  'fieldset',
	  'figcaption',
	  'figure',
	  'footer',
	  'form',
	  'frame',
	  'frameset',
	  'h1',
	  'h2',
	  'h3',
	  'h4',
	  'h5',
	  'h6',
	  'head',
	  'header',
	  'hr',
	  'html',
	  'iframe',
	  'legend',
	  'li',
	  'link',
	  'main',
	  'menu',
	  'menuitem',
	  'nav',
	  'noframes',
	  'ol',
	  'optgroup',
	  'option',
	  'p',
	  'param',
	  'section',
	  'source',
	  'summary',
	  'table',
	  'tbody',
	  'td',
	  'tfoot',
	  'th',
	  'thead',
	  'title',
	  'tr',
	  'track',
	  'ul'
	];
	htmlBlockNames = basics;
	return htmlBlockNames;
}

var htmlRawNames;
var hasRequiredHtmlRawNames;

function requireHtmlRawNames () {
	if (hasRequiredHtmlRawNames) return htmlRawNames;
	hasRequiredHtmlRawNames = 1;
	var raws = ['pre', 'script', 'style', 'textarea'];
	htmlRawNames = raws;
	return htmlRawNames;
}

var htmlFlow_1;
var hasRequiredHtmlFlow;

function requireHtmlFlow () {
	if (hasRequiredHtmlFlow) return htmlFlow_1;
	hasRequiredHtmlFlow = 1;
	var asciiAlpha = requireAsciiAlpha();
	var asciiAlphanumeric = requireAsciiAlphanumeric();
	var markdownLineEnding = requireMarkdownLineEnding();
	var markdownLineEndingOrSpace = requireMarkdownLineEndingOrSpace();
	var markdownSpace = requireMarkdownSpace();
	var fromCharCode = requireFromCharCode();
	var htmlBlockNames = requireHtmlBlockNames();
	var htmlRawNames = requireHtmlRawNames();
	var partialBlankLine = requirePartialBlankLine();
	var htmlFlow = {
	  name: 'htmlFlow',
	  tokenize: tokenizeHtmlFlow,
	  resolveTo: resolveToHtmlFlow,
	  concrete: true
	};
	var nextBlankConstruct = {
	  tokenize: tokenizeNextBlank,
	  partial: true
	};
	function resolveToHtmlFlow(events) {
	  var index = events.length;
	  while (index--) {
	    if (events[index][0] === 'enter' && events[index][1].type === 'htmlFlow') {
	      break
	    }
	  }
	  if (index > 1 && events[index - 2][1].type === 'linePrefix') {
	    events[index][1].start = events[index - 2][1].start;
	    events[index + 1][1].start = events[index - 2][1].start;
	    events.splice(index - 2, 2);
	  }
	  return events
	}
	function tokenizeHtmlFlow(effects, ok, nok) {
	  var self = this;
	  var kind;
	  var startTag;
	  var buffer;
	  var index;
	  var marker;
	  return start
	  function start(code) {
	    effects.enter('htmlFlow');
	    effects.enter('htmlFlowData');
	    effects.consume(code);
	    return open
	  }
	  function open(code) {
	    if (code === 33) {
	      effects.consume(code);
	      return declarationStart
	    }
	    if (code === 47) {
	      effects.consume(code);
	      return tagCloseStart
	    }
	    if (code === 63) {
	      effects.consume(code);
	      kind = 3;
	      return self.interrupt ? ok : continuationDeclarationInside
	    }
	    if (asciiAlpha(code)) {
	      effects.consume(code);
	      buffer = fromCharCode(code);
	      startTag = true;
	      return tagName
	    }
	    return nok(code)
	  }
	  function declarationStart(code) {
	    if (code === 45) {
	      effects.consume(code);
	      kind = 2;
	      return commentOpenInside
	    }
	    if (code === 91) {
	      effects.consume(code);
	      kind = 5;
	      buffer = 'CDATA[';
	      index = 0;
	      return cdataOpenInside
	    }
	    if (asciiAlpha(code)) {
	      effects.consume(code);
	      kind = 4;
	      return self.interrupt ? ok : continuationDeclarationInside
	    }
	    return nok(code)
	  }
	  function commentOpenInside(code) {
	    if (code === 45) {
	      effects.consume(code);
	      return self.interrupt ? ok : continuationDeclarationInside
	    }
	    return nok(code)
	  }
	  function cdataOpenInside(code) {
	    if (code === buffer.charCodeAt(index++)) {
	      effects.consume(code);
	      return index === buffer.length
	        ? self.interrupt
	          ? ok
	          : continuation
	        : cdataOpenInside
	    }
	    return nok(code)
	  }
	  function tagCloseStart(code) {
	    if (asciiAlpha(code)) {
	      effects.consume(code);
	      buffer = fromCharCode(code);
	      return tagName
	    }
	    return nok(code)
	  }
	  function tagName(code) {
	    if (
	      code === null ||
	      code === 47 ||
	      code === 62 ||
	      markdownLineEndingOrSpace(code)
	    ) {
	      if (
	        code !== 47 &&
	        startTag &&
	        htmlRawNames.indexOf(buffer.toLowerCase()) > -1
	      ) {
	        kind = 1;
	        return self.interrupt ? ok(code) : continuation(code)
	      }
	      if (htmlBlockNames.indexOf(buffer.toLowerCase()) > -1) {
	        kind = 6;
	        if (code === 47) {
	          effects.consume(code);
	          return basicSelfClosing
	        }
	        return self.interrupt ? ok(code) : continuation(code)
	      }
	      kind = 7;
	      return self.interrupt
	        ? nok(code)
	        : startTag
	        ? completeAttributeNameBefore(code)
	        : completeClosingTagAfter(code)
	    }
	    if (code === 45 || asciiAlphanumeric(code)) {
	      effects.consume(code);
	      buffer += fromCharCode(code);
	      return tagName
	    }
	    return nok(code)
	  }
	  function basicSelfClosing(code) {
	    if (code === 62) {
	      effects.consume(code);
	      return self.interrupt ? ok : continuation
	    }
	    return nok(code)
	  }
	  function completeClosingTagAfter(code) {
	    if (markdownSpace(code)) {
	      effects.consume(code);
	      return completeClosingTagAfter
	    }
	    return completeEnd(code)
	  }
	  function completeAttributeNameBefore(code) {
	    if (code === 47) {
	      effects.consume(code);
	      return completeEnd
	    }
	    if (code === 58 || code === 95 || asciiAlpha(code)) {
	      effects.consume(code);
	      return completeAttributeName
	    }
	    if (markdownSpace(code)) {
	      effects.consume(code);
	      return completeAttributeNameBefore
	    }
	    return completeEnd(code)
	  }
	  function completeAttributeName(code) {
	    if (
	      code === 45 ||
	      code === 46 ||
	      code === 58 ||
	      code === 95 ||
	      asciiAlphanumeric(code)
	    ) {
	      effects.consume(code);
	      return completeAttributeName
	    }
	    return completeAttributeNameAfter(code)
	  }
	  function completeAttributeNameAfter(code) {
	    if (code === 61) {
	      effects.consume(code);
	      return completeAttributeValueBefore
	    }
	    if (markdownSpace(code)) {
	      effects.consume(code);
	      return completeAttributeNameAfter
	    }
	    return completeAttributeNameBefore(code)
	  }
	  function completeAttributeValueBefore(code) {
	    if (
	      code === null ||
	      code === 60 ||
	      code === 61 ||
	      code === 62 ||
	      code === 96
	    ) {
	      return nok(code)
	    }
	    if (code === 34 || code === 39) {
	      effects.consume(code);
	      marker = code;
	      return completeAttributeValueQuoted
	    }
	    if (markdownSpace(code)) {
	      effects.consume(code);
	      return completeAttributeValueBefore
	    }
	    marker = undefined;
	    return completeAttributeValueUnquoted(code)
	  }
	  function completeAttributeValueQuoted(code) {
	    if (code === marker) {
	      effects.consume(code);
	      return completeAttributeValueQuotedAfter
	    }
	    if (code === null || markdownLineEnding(code)) {
	      return nok(code)
	    }
	    effects.consume(code);
	    return completeAttributeValueQuoted
	  }
	  function completeAttributeValueUnquoted(code) {
	    if (
	      code === null ||
	      code === 34 ||
	      code === 39 ||
	      code === 60 ||
	      code === 61 ||
	      code === 62 ||
	      code === 96 ||
	      markdownLineEndingOrSpace(code)
	    ) {
	      return completeAttributeNameAfter(code)
	    }
	    effects.consume(code);
	    return completeAttributeValueUnquoted
	  }
	  function completeAttributeValueQuotedAfter(code) {
	    if (code === 47 || code === 62 || markdownSpace(code)) {
	      return completeAttributeNameBefore(code)
	    }
	    return nok(code)
	  }
	  function completeEnd(code) {
	    if (code === 62) {
	      effects.consume(code);
	      return completeAfter
	    }
	    return nok(code)
	  }
	  function completeAfter(code) {
	    if (markdownSpace(code)) {
	      effects.consume(code);
	      return completeAfter
	    }
	    return code === null || markdownLineEnding(code)
	      ? continuation(code)
	      : nok(code)
	  }
	  function continuation(code) {
	    if (code === 45 && kind === 2) {
	      effects.consume(code);
	      return continuationCommentInside
	    }
	    if (code === 60 && kind === 1) {
	      effects.consume(code);
	      return continuationRawTagOpen
	    }
	    if (code === 62 && kind === 4) {
	      effects.consume(code);
	      return continuationClose
	    }
	    if (code === 63 && kind === 3) {
	      effects.consume(code);
	      return continuationDeclarationInside
	    }
	    if (code === 93 && kind === 5) {
	      effects.consume(code);
	      return continuationCharacterDataInside
	    }
	    if (markdownLineEnding(code) && (kind === 6 || kind === 7)) {
	      return effects.check(
	        nextBlankConstruct,
	        continuationClose,
	        continuationAtLineEnding
	      )(code)
	    }
	    if (code === null || markdownLineEnding(code)) {
	      return continuationAtLineEnding(code)
	    }
	    effects.consume(code);
	    return continuation
	  }
	  function continuationAtLineEnding(code) {
	    effects.exit('htmlFlowData');
	    return htmlContinueStart(code)
	  }
	  function htmlContinueStart(code) {
	    if (code === null) {
	      return done(code)
	    }
	    if (markdownLineEnding(code)) {
	      effects.enter('lineEnding');
	      effects.consume(code);
	      effects.exit('lineEnding');
	      return htmlContinueStart
	    }
	    effects.enter('htmlFlowData');
	    return continuation(code)
	  }
	  function continuationCommentInside(code) {
	    if (code === 45) {
	      effects.consume(code);
	      return continuationDeclarationInside
	    }
	    return continuation(code)
	  }
	  function continuationRawTagOpen(code) {
	    if (code === 47) {
	      effects.consume(code);
	      buffer = '';
	      return continuationRawEndTag
	    }
	    return continuation(code)
	  }
	  function continuationRawEndTag(code) {
	    if (code === 62 && htmlRawNames.indexOf(buffer.toLowerCase()) > -1) {
	      effects.consume(code);
	      return continuationClose
	    }
	    if (asciiAlpha(code) && buffer.length < 8) {
	      effects.consume(code);
	      buffer += fromCharCode(code);
	      return continuationRawEndTag
	    }
	    return continuation(code)
	  }
	  function continuationCharacterDataInside(code) {
	    if (code === 93) {
	      effects.consume(code);
	      return continuationDeclarationInside
	    }
	    return continuation(code)
	  }
	  function continuationDeclarationInside(code) {
	    if (code === 62) {
	      effects.consume(code);
	      return continuationClose
	    }
	    return continuation(code)
	  }
	  function continuationClose(code) {
	    if (code === null || markdownLineEnding(code)) {
	      effects.exit('htmlFlowData');
	      return done(code)
	    }
	    effects.consume(code);
	    return continuationClose
	  }
	  function done(code) {
	    effects.exit('htmlFlow');
	    return ok(code)
	  }
	}
	function tokenizeNextBlank(effects, ok, nok) {
	  return start
	  function start(code) {
	    effects.exit('htmlFlowData');
	    effects.enter('lineEndingBlank');
	    effects.consume(code);
	    effects.exit('lineEndingBlank');
	    return effects.attempt(partialBlankLine, ok, nok)
	  }
	}
	htmlFlow_1 = htmlFlow;
	return htmlFlow_1;
}

var htmlText_1;
var hasRequiredHtmlText;

function requireHtmlText () {
	if (hasRequiredHtmlText) return htmlText_1;
	hasRequiredHtmlText = 1;
	var asciiAlpha = requireAsciiAlpha();
	var asciiAlphanumeric = requireAsciiAlphanumeric();
	var markdownLineEnding = requireMarkdownLineEnding();
	var markdownLineEndingOrSpace = requireMarkdownLineEndingOrSpace();
	var markdownSpace = requireMarkdownSpace();
	var factorySpace = requireFactorySpace();
	var htmlText = {
	  name: 'htmlText',
	  tokenize: tokenizeHtmlText
	};
	function tokenizeHtmlText(effects, ok, nok) {
	  var self = this;
	  var marker;
	  var buffer;
	  var index;
	  var returnState;
	  return start
	  function start(code) {
	    effects.enter('htmlText');
	    effects.enter('htmlTextData');
	    effects.consume(code);
	    return open
	  }
	  function open(code) {
	    if (code === 33) {
	      effects.consume(code);
	      return declarationOpen
	    }
	    if (code === 47) {
	      effects.consume(code);
	      return tagCloseStart
	    }
	    if (code === 63) {
	      effects.consume(code);
	      return instruction
	    }
	    if (asciiAlpha(code)) {
	      effects.consume(code);
	      return tagOpen
	    }
	    return nok(code)
	  }
	  function declarationOpen(code) {
	    if (code === 45) {
	      effects.consume(code);
	      return commentOpen
	    }
	    if (code === 91) {
	      effects.consume(code);
	      buffer = 'CDATA[';
	      index = 0;
	      return cdataOpen
	    }
	    if (asciiAlpha(code)) {
	      effects.consume(code);
	      return declaration
	    }
	    return nok(code)
	  }
	  function commentOpen(code) {
	    if (code === 45) {
	      effects.consume(code);
	      return commentStart
	    }
	    return nok(code)
	  }
	  function commentStart(code) {
	    if (code === null || code === 62) {
	      return nok(code)
	    }
	    if (code === 45) {
	      effects.consume(code);
	      return commentStartDash
	    }
	    return comment(code)
	  }
	  function commentStartDash(code) {
	    if (code === null || code === 62) {
	      return nok(code)
	    }
	    return comment(code)
	  }
	  function comment(code) {
	    if (code === null) {
	      return nok(code)
	    }
	    if (code === 45) {
	      effects.consume(code);
	      return commentClose
	    }
	    if (markdownLineEnding(code)) {
	      returnState = comment;
	      return atLineEnding(code)
	    }
	    effects.consume(code);
	    return comment
	  }
	  function commentClose(code) {
	    if (code === 45) {
	      effects.consume(code);
	      return end
	    }
	    return comment(code)
	  }
	  function cdataOpen(code) {
	    if (code === buffer.charCodeAt(index++)) {
	      effects.consume(code);
	      return index === buffer.length ? cdata : cdataOpen
	    }
	    return nok(code)
	  }
	  function cdata(code) {
	    if (code === null) {
	      return nok(code)
	    }
	    if (code === 93) {
	      effects.consume(code);
	      return cdataClose
	    }
	    if (markdownLineEnding(code)) {
	      returnState = cdata;
	      return atLineEnding(code)
	    }
	    effects.consume(code);
	    return cdata
	  }
	  function cdataClose(code) {
	    if (code === 93) {
	      effects.consume(code);
	      return cdataEnd
	    }
	    return cdata(code)
	  }
	  function cdataEnd(code) {
	    if (code === 62) {
	      return end(code)
	    }
	    if (code === 93) {
	      effects.consume(code);
	      return cdataEnd
	    }
	    return cdata(code)
	  }
	  function declaration(code) {
	    if (code === null || code === 62) {
	      return end(code)
	    }
	    if (markdownLineEnding(code)) {
	      returnState = declaration;
	      return atLineEnding(code)
	    }
	    effects.consume(code);
	    return declaration
	  }
	  function instruction(code) {
	    if (code === null) {
	      return nok(code)
	    }
	    if (code === 63) {
	      effects.consume(code);
	      return instructionClose
	    }
	    if (markdownLineEnding(code)) {
	      returnState = instruction;
	      return atLineEnding(code)
	    }
	    effects.consume(code);
	    return instruction
	  }
	  function instructionClose(code) {
	    return code === 62 ? end(code) : instruction(code)
	  }
	  function tagCloseStart(code) {
	    if (asciiAlpha(code)) {
	      effects.consume(code);
	      return tagClose
	    }
	    return nok(code)
	  }
	  function tagClose(code) {
	    if (code === 45 || asciiAlphanumeric(code)) {
	      effects.consume(code);
	      return tagClose
	    }
	    return tagCloseBetween(code)
	  }
	  function tagCloseBetween(code) {
	    if (markdownLineEnding(code)) {
	      returnState = tagCloseBetween;
	      return atLineEnding(code)
	    }
	    if (markdownSpace(code)) {
	      effects.consume(code);
	      return tagCloseBetween
	    }
	    return end(code)
	  }
	  function tagOpen(code) {
	    if (code === 45 || asciiAlphanumeric(code)) {
	      effects.consume(code);
	      return tagOpen
	    }
	    if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
	      return tagOpenBetween(code)
	    }
	    return nok(code)
	  }
	  function tagOpenBetween(code) {
	    if (code === 47) {
	      effects.consume(code);
	      return end
	    }
	    if (code === 58 || code === 95 || asciiAlpha(code)) {
	      effects.consume(code);
	      return tagOpenAttributeName
	    }
	    if (markdownLineEnding(code)) {
	      returnState = tagOpenBetween;
	      return atLineEnding(code)
	    }
	    if (markdownSpace(code)) {
	      effects.consume(code);
	      return tagOpenBetween
	    }
	    return end(code)
	  }
	  function tagOpenAttributeName(code) {
	    if (
	      code === 45 ||
	      code === 46 ||
	      code === 58 ||
	      code === 95 ||
	      asciiAlphanumeric(code)
	    ) {
	      effects.consume(code);
	      return tagOpenAttributeName
	    }
	    return tagOpenAttributeNameAfter(code)
	  }
	  function tagOpenAttributeNameAfter(code) {
	    if (code === 61) {
	      effects.consume(code);
	      return tagOpenAttributeValueBefore
	    }
	    if (markdownLineEnding(code)) {
	      returnState = tagOpenAttributeNameAfter;
	      return atLineEnding(code)
	    }
	    if (markdownSpace(code)) {
	      effects.consume(code);
	      return tagOpenAttributeNameAfter
	    }
	    return tagOpenBetween(code)
	  }
	  function tagOpenAttributeValueBefore(code) {
	    if (
	      code === null ||
	      code === 60 ||
	      code === 61 ||
	      code === 62 ||
	      code === 96
	    ) {
	      return nok(code)
	    }
	    if (code === 34 || code === 39) {
	      effects.consume(code);
	      marker = code;
	      return tagOpenAttributeValueQuoted
	    }
	    if (markdownLineEnding(code)) {
	      returnState = tagOpenAttributeValueBefore;
	      return atLineEnding(code)
	    }
	    if (markdownSpace(code)) {
	      effects.consume(code);
	      return tagOpenAttributeValueBefore
	    }
	    effects.consume(code);
	    marker = undefined;
	    return tagOpenAttributeValueUnquoted
	  }
	  function tagOpenAttributeValueQuoted(code) {
	    if (code === marker) {
	      effects.consume(code);
	      return tagOpenAttributeValueQuotedAfter
	    }
	    if (code === null) {
	      return nok(code)
	    }
	    if (markdownLineEnding(code)) {
	      returnState = tagOpenAttributeValueQuoted;
	      return atLineEnding(code)
	    }
	    effects.consume(code);
	    return tagOpenAttributeValueQuoted
	  }
	  function tagOpenAttributeValueQuotedAfter(code) {
	    if (code === 62 || code === 47 || markdownLineEndingOrSpace(code)) {
	      return tagOpenBetween(code)
	    }
	    return nok(code)
	  }
	  function tagOpenAttributeValueUnquoted(code) {
	    if (
	      code === null ||
	      code === 34 ||
	      code === 39 ||
	      code === 60 ||
	      code === 61 ||
	      code === 96
	    ) {
	      return nok(code)
	    }
	    if (code === 62 || markdownLineEndingOrSpace(code)) {
	      return tagOpenBetween(code)
	    }
	    effects.consume(code);
	    return tagOpenAttributeValueUnquoted
	  }
	  function atLineEnding(code) {
	    effects.exit('htmlTextData');
	    effects.enter('lineEnding');
	    effects.consume(code);
	    effects.exit('lineEnding');
	    return factorySpace(
	      effects,
	      afterPrefix,
	      'linePrefix',
	      self.parser.constructs.disable.null.indexOf('codeIndented') > -1
	        ? undefined
	        : 4
	    )
	  }
	  function afterPrefix(code) {
	    effects.enter('htmlTextData');
	    return returnState(code)
	  }
	  function end(code) {
	    if (code === 62) {
	      effects.consume(code);
	      effects.exit('htmlTextData');
	      effects.exit('htmlText');
	      return ok
	    }
	    return nok(code)
	  }
	}
	htmlText_1 = htmlText;
	return htmlText_1;
}

var labelEnd_1;
var hasRequiredLabelEnd;

function requireLabelEnd () {
	if (hasRequiredLabelEnd) return labelEnd_1;
	hasRequiredLabelEnd = 1;
	var markdownLineEndingOrSpace = requireMarkdownLineEndingOrSpace();
	var chunkedPush = requireChunkedPush();
	var chunkedSplice = requireChunkedSplice();
	var normalizeIdentifier = requireNormalizeIdentifier();
	var resolveAll = requireResolveAll();
	var shallow = requireShallow();
	var factoryDestination = requireFactoryDestination();
	var factoryLabel = requireFactoryLabel();
	var factoryTitle = requireFactoryTitle();
	var factoryWhitespace = requireFactoryWhitespace();
	var labelEnd = {
	  name: 'labelEnd',
	  tokenize: tokenizeLabelEnd,
	  resolveTo: resolveToLabelEnd,
	  resolveAll: resolveAllLabelEnd
	};
	var resourceConstruct = {
	  tokenize: tokenizeResource
	};
	var fullReferenceConstruct = {
	  tokenize: tokenizeFullReference
	};
	var collapsedReferenceConstruct = {
	  tokenize: tokenizeCollapsedReference
	};
	function resolveAllLabelEnd(events) {
	  var index = -1;
	  var token;
	  while (++index < events.length) {
	    token = events[index][1];
	    if (
	      !token._used &&
	      (token.type === 'labelImage' ||
	        token.type === 'labelLink' ||
	        token.type === 'labelEnd')
	    ) {
	      events.splice(index + 1, token.type === 'labelImage' ? 4 : 2);
	      token.type = 'data';
	      index++;
	    }
	  }
	  return events
	}
	function resolveToLabelEnd(events, context) {
	  var index = events.length;
	  var offset = 0;
	  var group;
	  var label;
	  var text;
	  var token;
	  var open;
	  var close;
	  var media;
	  while (index--) {
	    token = events[index][1];
	    if (open) {
	      if (
	        token.type === 'link' ||
	        (token.type === 'labelLink' && token._inactive)
	      ) {
	        break
	      }
	      if (events[index][0] === 'enter' && token.type === 'labelLink') {
	        token._inactive = true;
	      }
	    } else if (close) {
	      if (
	        events[index][0] === 'enter' &&
	        (token.type === 'labelImage' || token.type === 'labelLink') &&
	        !token._balanced
	      ) {
	        open = index;
	        if (token.type !== 'labelLink') {
	          offset = 2;
	          break
	        }
	      }
	    } else if (token.type === 'labelEnd') {
	      close = index;
	    }
	  }
	  group = {
	    type: events[open][1].type === 'labelLink' ? 'link' : 'image',
	    start: shallow(events[open][1].start),
	    end: shallow(events[events.length - 1][1].end)
	  };
	  label = {
	    type: 'label',
	    start: shallow(events[open][1].start),
	    end: shallow(events[close][1].end)
	  };
	  text = {
	    type: 'labelText',
	    start: shallow(events[open + offset + 2][1].end),
	    end: shallow(events[close - 2][1].start)
	  };
	  media = [
	    ['enter', group, context],
	    ['enter', label, context]
	  ];
	  media = chunkedPush(media, events.slice(open + 1, open + offset + 3));
	  media = chunkedPush(media, [['enter', text, context]]);
	  media = chunkedPush(
	    media,
	    resolveAll(
	      context.parser.constructs.insideSpan.null,
	      events.slice(open + offset + 4, close - 3),
	      context
	    )
	  );
	  media = chunkedPush(media, [
	    ['exit', text, context],
	    events[close - 2],
	    events[close - 1],
	    ['exit', label, context]
	  ]);
	  media = chunkedPush(media, events.slice(close + 1));
	  media = chunkedPush(media, [['exit', group, context]]);
	  chunkedSplice(events, open, events.length, media);
	  return events
	}
	function tokenizeLabelEnd(effects, ok, nok) {
	  var self = this;
	  var index = self.events.length;
	  var labelStart;
	  var defined;
	  while (index--) {
	    if (
	      (self.events[index][1].type === 'labelImage' ||
	        self.events[index][1].type === 'labelLink') &&
	      !self.events[index][1]._balanced
	    ) {
	      labelStart = self.events[index][1];
	      break
	    }
	  }
	  return start
	  function start(code) {
	    if (!labelStart) {
	      return nok(code)
	    }
	    if (labelStart._inactive) return balanced(code)
	    defined =
	      self.parser.defined.indexOf(
	        normalizeIdentifier(
	          self.sliceSerialize({
	            start: labelStart.end,
	            end: self.now()
	          })
	        )
	      ) > -1;
	    effects.enter('labelEnd');
	    effects.enter('labelMarker');
	    effects.consume(code);
	    effects.exit('labelMarker');
	    effects.exit('labelEnd');
	    return afterLabelEnd
	  }
	  function afterLabelEnd(code) {
	    if (code === 40) {
	      return effects.attempt(
	        resourceConstruct,
	        ok,
	        defined ? ok : balanced
	      )(code)
	    }
	    if (code === 91) {
	      return effects.attempt(
	        fullReferenceConstruct,
	        ok,
	        defined
	          ? effects.attempt(collapsedReferenceConstruct, ok, balanced)
	          : balanced
	      )(code)
	    }
	    return defined ? ok(code) : balanced(code)
	  }
	  function balanced(code) {
	    labelStart._balanced = true;
	    return nok(code)
	  }
	}
	function tokenizeResource(effects, ok, nok) {
	  return start
	  function start(code) {
	    effects.enter('resource');
	    effects.enter('resourceMarker');
	    effects.consume(code);
	    effects.exit('resourceMarker');
	    return factoryWhitespace(effects, open)
	  }
	  function open(code) {
	    if (code === 41) {
	      return end(code)
	    }
	    return factoryDestination(
	      effects,
	      destinationAfter,
	      nok,
	      'resourceDestination',
	      'resourceDestinationLiteral',
	      'resourceDestinationLiteralMarker',
	      'resourceDestinationRaw',
	      'resourceDestinationString',
	      3
	    )(code)
	  }
	  function destinationAfter(code) {
	    return markdownLineEndingOrSpace(code)
	      ? factoryWhitespace(effects, between)(code)
	      : end(code)
	  }
	  function between(code) {
	    if (code === 34 || code === 39 || code === 40) {
	      return factoryTitle(
	        effects,
	        factoryWhitespace(effects, end),
	        nok,
	        'resourceTitle',
	        'resourceTitleMarker',
	        'resourceTitleString'
	      )(code)
	    }
	    return end(code)
	  }
	  function end(code) {
	    if (code === 41) {
	      effects.enter('resourceMarker');
	      effects.consume(code);
	      effects.exit('resourceMarker');
	      effects.exit('resource');
	      return ok
	    }
	    return nok(code)
	  }
	}
	function tokenizeFullReference(effects, ok, nok) {
	  var self = this;
	  return start
	  function start(code) {
	    return factoryLabel.call(
	      self,
	      effects,
	      afterLabel,
	      nok,
	      'reference',
	      'referenceMarker',
	      'referenceString'
	    )(code)
	  }
	  function afterLabel(code) {
	    return self.parser.defined.indexOf(
	      normalizeIdentifier(
	        self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1)
	      )
	    ) < 0
	      ? nok(code)
	      : ok(code)
	  }
	}
	function tokenizeCollapsedReference(effects, ok, nok) {
	  return start
	  function start(code) {
	    effects.enter('reference');
	    effects.enter('referenceMarker');
	    effects.consume(code);
	    effects.exit('referenceMarker');
	    return open
	  }
	  function open(code) {
	    if (code === 93) {
	      effects.enter('referenceMarker');
	      effects.consume(code);
	      effects.exit('referenceMarker');
	      effects.exit('reference');
	      return ok
	    }
	    return nok(code)
	  }
	}
	labelEnd_1 = labelEnd;
	return labelEnd_1;
}

var labelStartImage_1;
var hasRequiredLabelStartImage;

function requireLabelStartImage () {
	if (hasRequiredLabelStartImage) return labelStartImage_1;
	hasRequiredLabelStartImage = 1;
	var labelEnd = requireLabelEnd();
	var labelStartImage = {
	  name: 'labelStartImage',
	  tokenize: tokenizeLabelStartImage,
	  resolveAll: labelEnd.resolveAll
	};
	function tokenizeLabelStartImage(effects, ok, nok) {
	  var self = this;
	  return start
	  function start(code) {
	    effects.enter('labelImage');
	    effects.enter('labelImageMarker');
	    effects.consume(code);
	    effects.exit('labelImageMarker');
	    return open
	  }
	  function open(code) {
	    if (code === 91) {
	      effects.enter('labelMarker');
	      effects.consume(code);
	      effects.exit('labelMarker');
	      effects.exit('labelImage');
	      return after
	    }
	    return nok(code)
	  }
	  function after(code) {
	    return code === 94 &&
	      '_hiddenFootnoteSupport' in self.parser.constructs
	      ?
	        nok(code)
	      : ok(code)
	  }
	}
	labelStartImage_1 = labelStartImage;
	return labelStartImage_1;
}

var labelStartLink_1;
var hasRequiredLabelStartLink;

function requireLabelStartLink () {
	if (hasRequiredLabelStartLink) return labelStartLink_1;
	hasRequiredLabelStartLink = 1;
	var labelEnd = requireLabelEnd();
	var labelStartLink = {
	  name: 'labelStartLink',
	  tokenize: tokenizeLabelStartLink,
	  resolveAll: labelEnd.resolveAll
	};
	function tokenizeLabelStartLink(effects, ok, nok) {
	  var self = this;
	  return start
	  function start(code) {
	    effects.enter('labelLink');
	    effects.enter('labelMarker');
	    effects.consume(code);
	    effects.exit('labelMarker');
	    effects.exit('labelLink');
	    return after
	  }
	  function after(code) {
	    return code === 94 &&
	      '_hiddenFootnoteSupport' in self.parser.constructs
	      ?
	        nok(code)
	      : ok(code)
	  }
	}
	labelStartLink_1 = labelStartLink;
	return labelStartLink_1;
}

var lineEnding_1;
var hasRequiredLineEnding;

function requireLineEnding () {
	if (hasRequiredLineEnding) return lineEnding_1;
	hasRequiredLineEnding = 1;
	var factorySpace = requireFactorySpace();
	var lineEnding = {
	  name: 'lineEnding',
	  tokenize: tokenizeLineEnding
	};
	function tokenizeLineEnding(effects, ok) {
	  return start
	  function start(code) {
	    effects.enter('lineEnding');
	    effects.consume(code);
	    effects.exit('lineEnding');
	    return factorySpace(effects, ok, 'linePrefix')
	  }
	}
	lineEnding_1 = lineEnding;
	return lineEnding_1;
}

var thematicBreak_1$1;
var hasRequiredThematicBreak$1;

function requireThematicBreak$1 () {
	if (hasRequiredThematicBreak$1) return thematicBreak_1$1;
	hasRequiredThematicBreak$1 = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var markdownSpace = requireMarkdownSpace();
	var factorySpace = requireFactorySpace();
	var thematicBreak = {
	  name: 'thematicBreak',
	  tokenize: tokenizeThematicBreak
	};
	function tokenizeThematicBreak(effects, ok, nok) {
	  var size = 0;
	  var marker;
	  return start
	  function start(code) {
	    effects.enter('thematicBreak');
	    marker = code;
	    return atBreak(code)
	  }
	  function atBreak(code) {
	    if (code === marker) {
	      effects.enter('thematicBreakSequence');
	      return sequence(code)
	    }
	    if (markdownSpace(code)) {
	      return factorySpace(effects, atBreak, 'whitespace')(code)
	    }
	    if (size < 3 || (code !== null && !markdownLineEnding(code))) {
	      return nok(code)
	    }
	    effects.exit('thematicBreak');
	    return ok(code)
	  }
	  function sequence(code) {
	    if (code === marker) {
	      effects.consume(code);
	      size++;
	      return sequence
	    }
	    effects.exit('thematicBreakSequence');
	    return atBreak(code)
	  }
	}
	thematicBreak_1$1 = thematicBreak;
	return thematicBreak_1$1;
}

var list_1$1;
var hasRequiredList$1;

function requireList$1 () {
	if (hasRequiredList$1) return list_1$1;
	hasRequiredList$1 = 1;
	var asciiDigit = requireAsciiDigit();
	var markdownSpace = requireMarkdownSpace();
	var prefixSize = requirePrefixSize();
	var sizeChunks = requireSizeChunks();
	var factorySpace = requireFactorySpace();
	var partialBlankLine = requirePartialBlankLine();
	var thematicBreak = requireThematicBreak$1();
	var list = {
	  name: 'list',
	  tokenize: tokenizeListStart,
	  continuation: {
	    tokenize: tokenizeListContinuation
	  },
	  exit: tokenizeListEnd
	};
	var listItemPrefixWhitespaceConstruct = {
	  tokenize: tokenizeListItemPrefixWhitespace,
	  partial: true
	};
	var indentConstruct = {
	  tokenize: tokenizeIndent,
	  partial: true
	};
	function tokenizeListStart(effects, ok, nok) {
	  var self = this;
	  var initialSize = prefixSize(self.events, 'linePrefix');
	  var size = 0;
	  return start
	  function start(code) {
	    var kind =
	      self.containerState.type ||
	      (code === 42 || code === 43 || code === 45
	        ? 'listUnordered'
	        : 'listOrdered');
	    if (
	      kind === 'listUnordered'
	        ? !self.containerState.marker || code === self.containerState.marker
	        : asciiDigit(code)
	    ) {
	      if (!self.containerState.type) {
	        self.containerState.type = kind;
	        effects.enter(kind, {
	          _container: true
	        });
	      }
	      if (kind === 'listUnordered') {
	        effects.enter('listItemPrefix');
	        return code === 42 || code === 45
	          ? effects.check(thematicBreak, nok, atMarker)(code)
	          : atMarker(code)
	      }
	      if (!self.interrupt || code === 49) {
	        effects.enter('listItemPrefix');
	        effects.enter('listItemValue');
	        return inside(code)
	      }
	    }
	    return nok(code)
	  }
	  function inside(code) {
	    if (asciiDigit(code) && ++size < 10) {
	      effects.consume(code);
	      return inside
	    }
	    if (
	      (!self.interrupt || size < 2) &&
	      (self.containerState.marker
	        ? code === self.containerState.marker
	        : code === 41 || code === 46)
	    ) {
	      effects.exit('listItemValue');
	      return atMarker(code)
	    }
	    return nok(code)
	  }
	  function atMarker(code) {
	    effects.enter('listItemMarker');
	    effects.consume(code);
	    effects.exit('listItemMarker');
	    self.containerState.marker = self.containerState.marker || code;
	    return effects.check(
	      partialBlankLine,
	      self.interrupt ? nok : onBlank,
	      effects.attempt(
	        listItemPrefixWhitespaceConstruct,
	        endOfPrefix,
	        otherPrefix
	      )
	    )
	  }
	  function onBlank(code) {
	    self.containerState.initialBlankLine = true;
	    initialSize++;
	    return endOfPrefix(code)
	  }
	  function otherPrefix(code) {
	    if (markdownSpace(code)) {
	      effects.enter('listItemPrefixWhitespace');
	      effects.consume(code);
	      effects.exit('listItemPrefixWhitespace');
	      return endOfPrefix
	    }
	    return nok(code)
	  }
	  function endOfPrefix(code) {
	    self.containerState.size =
	      initialSize + sizeChunks(self.sliceStream(effects.exit('listItemPrefix')));
	    return ok(code)
	  }
	}
	function tokenizeListContinuation(effects, ok, nok) {
	  var self = this;
	  self.containerState._closeFlow = undefined;
	  return effects.check(partialBlankLine, onBlank, notBlank)
	  function onBlank(code) {
	    self.containerState.furtherBlankLines =
	      self.containerState.furtherBlankLines ||
	      self.containerState.initialBlankLine;
	    return factorySpace(
	      effects,
	      ok,
	      'listItemIndent',
	      self.containerState.size + 1
	    )(code)
	  }
	  function notBlank(code) {
	    if (self.containerState.furtherBlankLines || !markdownSpace(code)) {
	      self.containerState.furtherBlankLines = self.containerState.initialBlankLine = undefined;
	      return notInCurrentItem(code)
	    }
	    self.containerState.furtherBlankLines = self.containerState.initialBlankLine = undefined;
	    return effects.attempt(indentConstruct, ok, notInCurrentItem)(code)
	  }
	  function notInCurrentItem(code) {
	    self.containerState._closeFlow = true;
	    self.interrupt = undefined;
	    return factorySpace(
	      effects,
	      effects.attempt(list, ok, nok),
	      'linePrefix',
	      self.parser.constructs.disable.null.indexOf('codeIndented') > -1
	        ? undefined
	        : 4
	    )(code)
	  }
	}
	function tokenizeIndent(effects, ok, nok) {
	  var self = this;
	  return factorySpace(
	    effects,
	    afterPrefix,
	    'listItemIndent',
	    self.containerState.size + 1
	  )
	  function afterPrefix(code) {
	    return prefixSize(self.events, 'listItemIndent') ===
	      self.containerState.size
	      ? ok(code)
	      : nok(code)
	  }
	}
	function tokenizeListEnd(effects) {
	  effects.exit(this.containerState.type);
	}
	function tokenizeListItemPrefixWhitespace(effects, ok, nok) {
	  var self = this;
	  return factorySpace(
	    effects,
	    afterPrefix,
	    'listItemPrefixWhitespace',
	    self.parser.constructs.disable.null.indexOf('codeIndented') > -1
	      ? undefined
	      : 4 + 1
	  )
	  function afterPrefix(code) {
	    return markdownSpace(code) ||
	      !prefixSize(self.events, 'listItemPrefixWhitespace')
	      ? nok(code)
	      : ok(code)
	  }
	}
	list_1$1 = list;
	return list_1$1;
}

var setextUnderline_1;
var hasRequiredSetextUnderline;

function requireSetextUnderline () {
	if (hasRequiredSetextUnderline) return setextUnderline_1;
	hasRequiredSetextUnderline = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var shallow = requireShallow();
	var factorySpace = requireFactorySpace();
	var setextUnderline = {
	  name: 'setextUnderline',
	  tokenize: tokenizeSetextUnderline,
	  resolveTo: resolveToSetextUnderline
	};
	function resolveToSetextUnderline(events, context) {
	  var index = events.length;
	  var content;
	  var text;
	  var definition;
	  var heading;
	  while (index--) {
	    if (events[index][0] === 'enter') {
	      if (events[index][1].type === 'content') {
	        content = index;
	        break
	      }
	      if (events[index][1].type === 'paragraph') {
	        text = index;
	      }
	    }
	    else {
	      if (events[index][1].type === 'content') {
	        events.splice(index, 1);
	      }
	      if (!definition && events[index][1].type === 'definition') {
	        definition = index;
	      }
	    }
	  }
	  heading = {
	    type: 'setextHeading',
	    start: shallow(events[text][1].start),
	    end: shallow(events[events.length - 1][1].end)
	  };
	  events[text][1].type = 'setextHeadingText';
	  if (definition) {
	    events.splice(text, 0, ['enter', heading, context]);
	    events.splice(definition + 1, 0, ['exit', events[content][1], context]);
	    events[content][1].end = shallow(events[definition][1].end);
	  } else {
	    events[content][1] = heading;
	  }
	  events.push(['exit', heading, context]);
	  return events
	}
	function tokenizeSetextUnderline(effects, ok, nok) {
	  var self = this;
	  var index = self.events.length;
	  var marker;
	  var paragraph;
	  while (index--) {
	    if (
	      self.events[index][1].type !== 'lineEnding' &&
	      self.events[index][1].type !== 'linePrefix' &&
	      self.events[index][1].type !== 'content'
	    ) {
	      paragraph = self.events[index][1].type === 'paragraph';
	      break
	    }
	  }
	  return start
	  function start(code) {
	    if (!self.lazy && (self.interrupt || paragraph)) {
	      effects.enter('setextHeadingLine');
	      effects.enter('setextHeadingLineSequence');
	      marker = code;
	      return closingSequence(code)
	    }
	    return nok(code)
	  }
	  function closingSequence(code) {
	    if (code === marker) {
	      effects.consume(code);
	      return closingSequence
	    }
	    effects.exit('setextHeadingLineSequence');
	    return factorySpace(effects, closingSequenceEnd, 'lineSuffix')(code)
	  }
	  function closingSequenceEnd(code) {
	    if (code === null || markdownLineEnding(code)) {
	      effects.exit('setextHeadingLine');
	      return ok(code)
	    }
	    return nok(code)
	  }
	}
	setextUnderline_1 = setextUnderline;
	return setextUnderline_1;
}

var hasRequiredConstructs;

function requireConstructs () {
	if (hasRequiredConstructs) return constructs;
	hasRequiredConstructs = 1;
	Object.defineProperty(constructs, '__esModule', {value: true});
	var text$1 = requireText$1();
	var attention = requireAttention();
	var autolink = requireAutolink();
	var blockQuote = requireBlockQuote();
	var characterEscape = requireCharacterEscape();
	var characterReference = requireCharacterReference();
	var codeFenced = requireCodeFenced();
	var codeIndented = requireCodeIndented();
	var codeText = requireCodeText();
	var definition = requireDefinition$1();
	var hardBreakEscape = requireHardBreakEscape();
	var headingAtx = requireHeadingAtx();
	var htmlFlow = requireHtmlFlow();
	var htmlText = requireHtmlText();
	var labelEnd = requireLabelEnd();
	var labelStartImage = requireLabelStartImage();
	var labelStartLink = requireLabelStartLink();
	var lineEnding = requireLineEnding();
	var list = requireList$1();
	var setextUnderline = requireSetextUnderline();
	var thematicBreak = requireThematicBreak$1();
	var document = {
	  42: list,
	  43: list,
	  45: list,
	  48: list,
	  49: list,
	  50: list,
	  51: list,
	  52: list,
	  53: list,
	  54: list,
	  55: list,
	  56: list,
	  57: list,
	  62: blockQuote
	};
	var contentInitial = {
	  91: definition
	};
	var flowInitial = {
	  '-2': codeIndented,
	  '-1': codeIndented,
	  32: codeIndented
	};
	var flow = {
	  35: headingAtx,
	  42: thematicBreak,
	  45: [setextUnderline, thematicBreak],
	  60: htmlFlow,
	  61: setextUnderline,
	  95: thematicBreak,
	  96: codeFenced,
	  126: codeFenced
	};
	var string = {
	  38: characterReference,
	  92: characterEscape
	};
	var text = {
	  '-5': lineEnding,
	  '-4': lineEnding,
	  '-3': lineEnding,
	  33: labelStartImage,
	  38: characterReference,
	  42: attention,
	  60: [autolink, htmlText],
	  91: labelStartLink,
	  92: [hardBreakEscape, characterEscape],
	  93: labelEnd,
	  95: attention,
	  96: codeText
	};
	var insideSpan = {
	  null: [attention, text$1.resolver]
	};
	var disable = {
	  null: []
	};
	constructs.contentInitial = contentInitial;
	constructs.disable = disable;
	constructs.document = document;
	constructs.flow = flow;
	constructs.flowInitial = flowInitial;
	constructs.insideSpan = insideSpan;
	constructs.string = string;
	constructs.text = text;
	return constructs;
}

var parse_1;
var hasRequiredParse;

function requireParse () {
	if (hasRequiredParse) return parse_1;
	hasRequiredParse = 1;
	var content = requireContent$1();
	var document = requireDocument();
	var flow = requireFlow();
	var text = requireText$1();
	var combineExtensions = requireCombineExtensions();
	var createTokenizer = requireCreateTokenizer();
	var miniflat = requireMiniflat();
	var constructs = requireConstructs();
	function parse(options) {
	  var settings = options || {};
	  var parser = {
	    defined: [],
	    constructs: combineExtensions(
	      [constructs].concat(miniflat(settings.extensions))
	    ),
	    content: create(content),
	    document: create(document),
	    flow: create(flow),
	    string: create(text.string),
	    text: create(text.text)
	  };
	  return parser
	  function create(initializer) {
	    return creator
	    function creator(from) {
	      return createTokenizer(parser, initializer, from)
	    }
	  }
	}
	parse_1 = parse;
	return parse_1;
}

var preprocess_1;
var hasRequiredPreprocess;

function requirePreprocess () {
	if (hasRequiredPreprocess) return preprocess_1;
	hasRequiredPreprocess = 1;
	var search = /[\0\t\n\r]/g;
	function preprocess() {
	  var start = true;
	  var column = 1;
	  var buffer = '';
	  var atCarriageReturn;
	  return preprocessor
	  function preprocessor(value, encoding, end) {
	    var chunks = [];
	    var match;
	    var next;
	    var startPosition;
	    var endPosition;
	    var code;
	    value = buffer + value.toString(encoding);
	    startPosition = 0;
	    buffer = '';
	    if (start) {
	      if (value.charCodeAt(0) === 65279) {
	        startPosition++;
	      }
	      start = undefined;
	    }
	    while (startPosition < value.length) {
	      search.lastIndex = startPosition;
	      match = search.exec(value);
	      endPosition = match ? match.index : value.length;
	      code = value.charCodeAt(endPosition);
	      if (!match) {
	        buffer = value.slice(startPosition);
	        break
	      }
	      if (code === 10 && startPosition === endPosition && atCarriageReturn) {
	        chunks.push(-3);
	        atCarriageReturn = undefined;
	      } else {
	        if (atCarriageReturn) {
	          chunks.push(-5);
	          atCarriageReturn = undefined;
	        }
	        if (startPosition < endPosition) {
	          chunks.push(value.slice(startPosition, endPosition));
	          column += endPosition - startPosition;
	        }
	        if (code === 0) {
	          chunks.push(65533);
	          column++;
	        } else if (code === 9) {
	          next = Math.ceil(column / 4) * 4;
	          chunks.push(-2);
	          while (column++ < next) chunks.push(-1);
	        } else if (code === 10) {
	          chunks.push(-4);
	          column = 1;
	        }
	        else {
	          atCarriageReturn = true;
	          column = 1;
	        }
	      }
	      startPosition = endPosition + 1;
	    }
	    if (end) {
	      if (atCarriageReturn) chunks.push(-5);
	      if (buffer) chunks.push(buffer);
	      chunks.push(null);
	    }
	    return chunks
	  }
	}
	preprocess_1 = preprocess;
	return preprocess_1;
}

var postprocess_1;
var hasRequiredPostprocess;

function requirePostprocess () {
	if (hasRequiredPostprocess) return postprocess_1;
	hasRequiredPostprocess = 1;
	var subtokenize = requireSubtokenize();
	function postprocess(events) {
	  while (!subtokenize(events)) {
	  }
	  return events
	}
	postprocess_1 = postprocess;
	return postprocess_1;
}

var unistUtilStringifyPosition;
var hasRequiredUnistUtilStringifyPosition;

function requireUnistUtilStringifyPosition () {
	if (hasRequiredUnistUtilStringifyPosition) return unistUtilStringifyPosition;
	hasRequiredUnistUtilStringifyPosition = 1;
	var own = {}.hasOwnProperty;
	unistUtilStringifyPosition = stringify;
	function stringify(value) {
	  if (!value || typeof value !== 'object') {
	    return ''
	  }
	  if (own.call(value, 'position') || own.call(value, 'type')) {
	    return position(value.position)
	  }
	  if (own.call(value, 'start') || own.call(value, 'end')) {
	    return position(value)
	  }
	  if (own.call(value, 'line') || own.call(value, 'column')) {
	    return point(value)
	  }
	  return ''
	}
	function point(point) {
	  if (!point || typeof point !== 'object') {
	    point = {};
	  }
	  return index(point.line) + ':' + index(point.column)
	}
	function position(pos) {
	  if (!pos || typeof pos !== 'object') {
	    pos = {};
	  }
	  return point(pos.start) + '-' + point(pos.end)
	}
	function index(value) {
	  return value && typeof value === 'number' ? value : 1
	}
	return unistUtilStringifyPosition;
}

var dist;
var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;
	dist = fromMarkdown;
	var toString = requireMdastUtilToString();
	var assign = requireAssign();
	var own = requireHasOwnProperty();
	var normalizeIdentifier = requireNormalizeIdentifier();
	var safeFromInt = requireSafeFromInt();
	var parser = requireParse();
	var preprocessor = requirePreprocess();
	var postprocess = requirePostprocess();
	var decode = requireDecodeEntity_browser();
	var stringifyPosition = requireUnistUtilStringifyPosition();
	function fromMarkdown(value, encoding, options) {
	  if (typeof encoding !== 'string') {
	    options = encoding;
	    encoding = undefined;
	  }
	  return compiler(options)(
	    postprocess(
	      parser(options).document().write(preprocessor()(value, encoding, true))
	    )
	  )
	}
	function compiler(options) {
	  var settings = options || {};
	  var config = configure(
	    {
	      transforms: [],
	      canContainEols: [
	        'emphasis',
	        'fragment',
	        'heading',
	        'paragraph',
	        'strong'
	      ],
	      enter: {
	        autolink: opener(link),
	        autolinkProtocol: onenterdata,
	        autolinkEmail: onenterdata,
	        atxHeading: opener(heading),
	        blockQuote: opener(blockQuote),
	        characterEscape: onenterdata,
	        characterReference: onenterdata,
	        codeFenced: opener(codeFlow),
	        codeFencedFenceInfo: buffer,
	        codeFencedFenceMeta: buffer,
	        codeIndented: opener(codeFlow, buffer),
	        codeText: opener(codeText, buffer),
	        codeTextData: onenterdata,
	        data: onenterdata,
	        codeFlowValue: onenterdata,
	        definition: opener(definition),
	        definitionDestinationString: buffer,
	        definitionLabelString: buffer,
	        definitionTitleString: buffer,
	        emphasis: opener(emphasis),
	        hardBreakEscape: opener(hardBreak),
	        hardBreakTrailing: opener(hardBreak),
	        htmlFlow: opener(html, buffer),
	        htmlFlowData: onenterdata,
	        htmlText: opener(html, buffer),
	        htmlTextData: onenterdata,
	        image: opener(image),
	        label: buffer,
	        link: opener(link),
	        listItem: opener(listItem),
	        listItemValue: onenterlistitemvalue,
	        listOrdered: opener(list, onenterlistordered),
	        listUnordered: opener(list),
	        paragraph: opener(paragraph),
	        reference: onenterreference,
	        referenceString: buffer,
	        resourceDestinationString: buffer,
	        resourceTitleString: buffer,
	        setextHeading: opener(heading),
	        strong: opener(strong),
	        thematicBreak: opener(thematicBreak)
	      },
	      exit: {
	        atxHeading: closer(),
	        atxHeadingSequence: onexitatxheadingsequence,
	        autolink: closer(),
	        autolinkEmail: onexitautolinkemail,
	        autolinkProtocol: onexitautolinkprotocol,
	        blockQuote: closer(),
	        characterEscapeValue: onexitdata,
	        characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
	        characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
	        characterReferenceValue: onexitcharacterreferencevalue,
	        codeFenced: closer(onexitcodefenced),
	        codeFencedFence: onexitcodefencedfence,
	        codeFencedFenceInfo: onexitcodefencedfenceinfo,
	        codeFencedFenceMeta: onexitcodefencedfencemeta,
	        codeFlowValue: onexitdata,
	        codeIndented: closer(onexitcodeindented),
	        codeText: closer(onexitcodetext),
	        codeTextData: onexitdata,
	        data: onexitdata,
	        definition: closer(),
	        definitionDestinationString: onexitdefinitiondestinationstring,
	        definitionLabelString: onexitdefinitionlabelstring,
	        definitionTitleString: onexitdefinitiontitlestring,
	        emphasis: closer(),
	        hardBreakEscape: closer(onexithardbreak),
	        hardBreakTrailing: closer(onexithardbreak),
	        htmlFlow: closer(onexithtmlflow),
	        htmlFlowData: onexitdata,
	        htmlText: closer(onexithtmltext),
	        htmlTextData: onexitdata,
	        image: closer(onexitimage),
	        label: onexitlabel,
	        labelText: onexitlabeltext,
	        lineEnding: onexitlineending,
	        link: closer(onexitlink),
	        listItem: closer(),
	        listOrdered: closer(),
	        listUnordered: closer(),
	        paragraph: closer(),
	        referenceString: onexitreferencestring,
	        resourceDestinationString: onexitresourcedestinationstring,
	        resourceTitleString: onexitresourcetitlestring,
	        resource: onexitresource,
	        setextHeading: closer(onexitsetextheading),
	        setextHeadingLineSequence: onexitsetextheadinglinesequence,
	        setextHeadingText: onexitsetextheadingtext,
	        strong: closer(),
	        thematicBreak: closer()
	      }
	    },
	    settings.mdastExtensions || []
	  );
	  var data = {};
	  return compile
	  function compile(events) {
	    var tree = {type: 'root', children: []};
	    var stack = [tree];
	    var tokenStack = [];
	    var listStack = [];
	    var index = -1;
	    var handler;
	    var listStart;
	    var context = {
	      stack: stack,
	      tokenStack: tokenStack,
	      config: config,
	      enter: enter,
	      exit: exit,
	      buffer: buffer,
	      resume: resume,
	      setData: setData,
	      getData: getData
	    };
	    while (++index < events.length) {
	      if (
	        events[index][1].type === 'listOrdered' ||
	        events[index][1].type === 'listUnordered'
	      ) {
	        if (events[index][0] === 'enter') {
	          listStack.push(index);
	        } else {
	          listStart = listStack.pop(index);
	          index = prepareList(events, listStart, index);
	        }
	      }
	    }
	    index = -1;
	    while (++index < events.length) {
	      handler = config[events[index][0]];
	      if (own.call(handler, events[index][1].type)) {
	        handler[events[index][1].type].call(
	          assign({sliceSerialize: events[index][2].sliceSerialize}, context),
	          events[index][1]
	        );
	      }
	    }
	    if (tokenStack.length) {
	      throw new Error(
	        'Cannot close document, a token (`' +
	          tokenStack[tokenStack.length - 1].type +
	          '`, ' +
	          stringifyPosition({
	            start: tokenStack[tokenStack.length - 1].start,
	            end: tokenStack[tokenStack.length - 1].end
	          }) +
	          ') is still open'
	      )
	    }
	    tree.position = {
	      start: point(
	        events.length ? events[0][1].start : {line: 1, column: 1, offset: 0}
	      ),
	      end: point(
	        events.length
	          ? events[events.length - 2][1].end
	          : {line: 1, column: 1, offset: 0}
	      )
	    };
	    index = -1;
	    while (++index < config.transforms.length) {
	      tree = config.transforms[index](tree) || tree;
	    }
	    return tree
	  }
	  function prepareList(events, start, length) {
	    var index = start - 1;
	    var containerBalance = -1;
	    var listSpread = false;
	    var listItem;
	    var tailIndex;
	    var lineIndex;
	    var tailEvent;
	    var event;
	    var firstBlankLineIndex;
	    var atMarker;
	    while (++index <= length) {
	      event = events[index];
	      if (
	        event[1].type === 'listUnordered' ||
	        event[1].type === 'listOrdered' ||
	        event[1].type === 'blockQuote'
	      ) {
	        if (event[0] === 'enter') {
	          containerBalance++;
	        } else {
	          containerBalance--;
	        }
	        atMarker = undefined;
	      } else if (event[1].type === 'lineEndingBlank') {
	        if (event[0] === 'enter') {
	          if (
	            listItem &&
	            !atMarker &&
	            !containerBalance &&
	            !firstBlankLineIndex
	          ) {
	            firstBlankLineIndex = index;
	          }
	          atMarker = undefined;
	        }
	      } else if (
	        event[1].type === 'linePrefix' ||
	        event[1].type === 'listItemValue' ||
	        event[1].type === 'listItemMarker' ||
	        event[1].type === 'listItemPrefix' ||
	        event[1].type === 'listItemPrefixWhitespace'
	      ) ; else {
	        atMarker = undefined;
	      }
	      if (
	        (!containerBalance &&
	          event[0] === 'enter' &&
	          event[1].type === 'listItemPrefix') ||
	        (containerBalance === -1 &&
	          event[0] === 'exit' &&
	          (event[1].type === 'listUnordered' ||
	            event[1].type === 'listOrdered'))
	      ) {
	        if (listItem) {
	          tailIndex = index;
	          lineIndex = undefined;
	          while (tailIndex--) {
	            tailEvent = events[tailIndex];
	            if (
	              tailEvent[1].type === 'lineEnding' ||
	              tailEvent[1].type === 'lineEndingBlank'
	            ) {
	              if (tailEvent[0] === 'exit') continue
	              if (lineIndex) {
	                events[lineIndex][1].type = 'lineEndingBlank';
	                listSpread = true;
	              }
	              tailEvent[1].type = 'lineEnding';
	              lineIndex = tailIndex;
	            } else if (
	              tailEvent[1].type === 'linePrefix' ||
	              tailEvent[1].type === 'blockQuotePrefix' ||
	              tailEvent[1].type === 'blockQuotePrefixWhitespace' ||
	              tailEvent[1].type === 'blockQuoteMarker' ||
	              tailEvent[1].type === 'listItemIndent'
	            ) ; else {
	              break
	            }
	          }
	          if (
	            firstBlankLineIndex &&
	            (!lineIndex || firstBlankLineIndex < lineIndex)
	          ) {
	            listItem._spread = true;
	          }
	          listItem.end = point(
	            lineIndex ? events[lineIndex][1].start : event[1].end
	          );
	          events.splice(lineIndex || index, 0, ['exit', listItem, event[2]]);
	          index++;
	          length++;
	        }
	        if (event[1].type === 'listItemPrefix') {
	          listItem = {
	            type: 'listItem',
	            _spread: false,
	            start: point(event[1].start)
	          };
	          events.splice(index, 0, ['enter', listItem, event[2]]);
	          index++;
	          length++;
	          firstBlankLineIndex = undefined;
	          atMarker = true;
	        }
	      }
	    }
	    events[start][1]._spread = listSpread;
	    return length
	  }
	  function setData(key, value) {
	    data[key] = value;
	  }
	  function getData(key) {
	    return data[key]
	  }
	  function point(d) {
	    return {line: d.line, column: d.column, offset: d.offset}
	  }
	  function opener(create, and) {
	    return open
	    function open(token) {
	      enter.call(this, create(token), token);
	      if (and) and.call(this, token);
	    }
	  }
	  function buffer() {
	    this.stack.push({type: 'fragment', children: []});
	  }
	  function enter(node, token) {
	    this.stack[this.stack.length - 1].children.push(node);
	    this.stack.push(node);
	    this.tokenStack.push(token);
	    node.position = {start: point(token.start)};
	    return node
	  }
	  function closer(and) {
	    return close
	    function close(token) {
	      if (and) and.call(this, token);
	      exit.call(this, token);
	    }
	  }
	  function exit(token) {
	    var node = this.stack.pop();
	    var open = this.tokenStack.pop();
	    if (!open) {
	      throw new Error(
	        'Cannot close `' +
	          token.type +
	          '` (' +
	          stringifyPosition({start: token.start, end: token.end}) +
	          '): it’s not open'
	      )
	    } else if (open.type !== token.type) {
	      throw new Error(
	        'Cannot close `' +
	          token.type +
	          '` (' +
	          stringifyPosition({start: token.start, end: token.end}) +
	          '): a different token (`' +
	          open.type +
	          '`, ' +
	          stringifyPosition({start: open.start, end: open.end}) +
	          ') is open'
	      )
	    }
	    node.position.end = point(token.end);
	    return node
	  }
	  function resume() {
	    return toString(this.stack.pop())
	  }
	  function onenterlistordered() {
	    setData('expectingFirstListItemValue', true);
	  }
	  function onenterlistitemvalue(token) {
	    if (getData('expectingFirstListItemValue')) {
	      this.stack[this.stack.length - 2].start = parseInt(
	        this.sliceSerialize(token),
	        10
	      );
	      setData('expectingFirstListItemValue');
	    }
	  }
	  function onexitcodefencedfenceinfo() {
	    var data = this.resume();
	    this.stack[this.stack.length - 1].lang = data;
	  }
	  function onexitcodefencedfencemeta() {
	    var data = this.resume();
	    this.stack[this.stack.length - 1].meta = data;
	  }
	  function onexitcodefencedfence() {
	    if (getData('flowCodeInside')) return
	    this.buffer();
	    setData('flowCodeInside', true);
	  }
	  function onexitcodefenced() {
	    var data = this.resume();
	    this.stack[this.stack.length - 1].value = data.replace(
	      /^(\r?\n|\r)|(\r?\n|\r)$/g,
	      ''
	    );
	    setData('flowCodeInside');
	  }
	  function onexitcodeindented() {
	    var data = this.resume();
	    this.stack[this.stack.length - 1].value = data;
	  }
	  function onexitdefinitionlabelstring(token) {
	    var label = this.resume();
	    this.stack[this.stack.length - 1].label = label;
	    this.stack[this.stack.length - 1].identifier = normalizeIdentifier(
	      this.sliceSerialize(token)
	    ).toLowerCase();
	  }
	  function onexitdefinitiontitlestring() {
	    var data = this.resume();
	    this.stack[this.stack.length - 1].title = data;
	  }
	  function onexitdefinitiondestinationstring() {
	    var data = this.resume();
	    this.stack[this.stack.length - 1].url = data;
	  }
	  function onexitatxheadingsequence(token) {
	    if (!this.stack[this.stack.length - 1].depth) {
	      this.stack[this.stack.length - 1].depth = this.sliceSerialize(
	        token
	      ).length;
	    }
	  }
	  function onexitsetextheadingtext() {
	    setData('setextHeadingSlurpLineEnding', true);
	  }
	  function onexitsetextheadinglinesequence(token) {
	    this.stack[this.stack.length - 1].depth =
	      this.sliceSerialize(token).charCodeAt(0) === 61 ? 1 : 2;
	  }
	  function onexitsetextheading() {
	    setData('setextHeadingSlurpLineEnding');
	  }
	  function onenterdata(token) {
	    var siblings = this.stack[this.stack.length - 1].children;
	    var tail = siblings[siblings.length - 1];
	    if (!tail || tail.type !== 'text') {
	      tail = text();
	      tail.position = {start: point(token.start)};
	      this.stack[this.stack.length - 1].children.push(tail);
	    }
	    this.stack.push(tail);
	  }
	  function onexitdata(token) {
	    var tail = this.stack.pop();
	    tail.value += this.sliceSerialize(token);
	    tail.position.end = point(token.end);
	  }
	  function onexitlineending(token) {
	    var context = this.stack[this.stack.length - 1];
	    if (getData('atHardBreak')) {
	      context.children[context.children.length - 1].position.end = point(
	        token.end
	      );
	      setData('atHardBreak');
	      return
	    }
	    if (
	      !getData('setextHeadingSlurpLineEnding') &&
	      config.canContainEols.indexOf(context.type) > -1
	    ) {
	      onenterdata.call(this, token);
	      onexitdata.call(this, token);
	    }
	  }
	  function onexithardbreak() {
	    setData('atHardBreak', true);
	  }
	  function onexithtmlflow() {
	    var data = this.resume();
	    this.stack[this.stack.length - 1].value = data;
	  }
	  function onexithtmltext() {
	    var data = this.resume();
	    this.stack[this.stack.length - 1].value = data;
	  }
	  function onexitcodetext() {
	    var data = this.resume();
	    this.stack[this.stack.length - 1].value = data;
	  }
	  function onexitlink() {
	    var context = this.stack[this.stack.length - 1];
	    if (getData('inReference')) {
	      context.type += 'Reference';
	      context.referenceType = getData('referenceType') || 'shortcut';
	      delete context.url;
	      delete context.title;
	    } else {
	      delete context.identifier;
	      delete context.label;
	      delete context.referenceType;
	    }
	    setData('referenceType');
	  }
	  function onexitimage() {
	    var context = this.stack[this.stack.length - 1];
	    if (getData('inReference')) {
	      context.type += 'Reference';
	      context.referenceType = getData('referenceType') || 'shortcut';
	      delete context.url;
	      delete context.title;
	    } else {
	      delete context.identifier;
	      delete context.label;
	      delete context.referenceType;
	    }
	    setData('referenceType');
	  }
	  function onexitlabeltext(token) {
	    this.stack[this.stack.length - 2].identifier = normalizeIdentifier(
	      this.sliceSerialize(token)
	    ).toLowerCase();
	  }
	  function onexitlabel() {
	    var fragment = this.stack[this.stack.length - 1];
	    var value = this.resume();
	    this.stack[this.stack.length - 1].label = value;
	    setData('inReference', true);
	    if (this.stack[this.stack.length - 1].type === 'link') {
	      this.stack[this.stack.length - 1].children = fragment.children;
	    } else {
	      this.stack[this.stack.length - 1].alt = value;
	    }
	  }
	  function onexitresourcedestinationstring() {
	    var data = this.resume();
	    this.stack[this.stack.length - 1].url = data;
	  }
	  function onexitresourcetitlestring() {
	    var data = this.resume();
	    this.stack[this.stack.length - 1].title = data;
	  }
	  function onexitresource() {
	    setData('inReference');
	  }
	  function onenterreference() {
	    setData('referenceType', 'collapsed');
	  }
	  function onexitreferencestring(token) {
	    var label = this.resume();
	    this.stack[this.stack.length - 1].label = label;
	    this.stack[this.stack.length - 1].identifier = normalizeIdentifier(
	      this.sliceSerialize(token)
	    ).toLowerCase();
	    setData('referenceType', 'full');
	  }
	  function onexitcharacterreferencemarker(token) {
	    setData('characterReferenceType', token.type);
	  }
	  function onexitcharacterreferencevalue(token) {
	    var data = this.sliceSerialize(token);
	    var type = getData('characterReferenceType');
	    var value;
	    var tail;
	    if (type) {
	      value = safeFromInt(
	        data,
	        type === 'characterReferenceMarkerNumeric' ? 10 : 16
	      );
	      setData('characterReferenceType');
	    } else {
	      value = decode(data);
	    }
	    tail = this.stack.pop();
	    tail.value += value;
	    tail.position.end = point(token.end);
	  }
	  function onexitautolinkprotocol(token) {
	    onexitdata.call(this, token);
	    this.stack[this.stack.length - 1].url = this.sliceSerialize(token);
	  }
	  function onexitautolinkemail(token) {
	    onexitdata.call(this, token);
	    this.stack[this.stack.length - 1].url =
	      'mailto:' + this.sliceSerialize(token);
	  }
	  function blockQuote() {
	    return {type: 'blockquote', children: []}
	  }
	  function codeFlow() {
	    return {type: 'code', lang: null, meta: null, value: ''}
	  }
	  function codeText() {
	    return {type: 'inlineCode', value: ''}
	  }
	  function definition() {
	    return {
	      type: 'definition',
	      identifier: '',
	      label: null,
	      title: null,
	      url: ''
	    }
	  }
	  function emphasis() {
	    return {type: 'emphasis', children: []}
	  }
	  function heading() {
	    return {type: 'heading', depth: undefined, children: []}
	  }
	  function hardBreak() {
	    return {type: 'break'}
	  }
	  function html() {
	    return {type: 'html', value: ''}
	  }
	  function image() {
	    return {type: 'image', title: null, url: '', alt: null}
	  }
	  function link() {
	    return {type: 'link', title: null, url: '', children: []}
	  }
	  function list(token) {
	    return {
	      type: 'list',
	      ordered: token.type === 'listOrdered',
	      start: null,
	      spread: token._spread,
	      children: []
	    }
	  }
	  function listItem(token) {
	    return {
	      type: 'listItem',
	      spread: token._spread,
	      checked: null,
	      children: []
	    }
	  }
	  function paragraph() {
	    return {type: 'paragraph', children: []}
	  }
	  function strong() {
	    return {type: 'strong', children: []}
	  }
	  function text() {
	    return {type: 'text', value: ''}
	  }
	  function thematicBreak() {
	    return {type: 'thematicBreak'}
	  }
	}
	function configure(config, extensions) {
	  var index = -1;
	  while (++index < extensions.length) {
	    extension(config, extensions[index]);
	  }
	  return config
	}
	function extension(config, extension) {
	  var key;
	  var left;
	  for (key in extension) {
	    left = own.call(config, key) ? config[key] : (config[key] = {});
	    if (key === 'canContainEols' || key === 'transforms') {
	      config[key] = [].concat(left, extension[key]);
	    } else {
	      Object.assign(left, extension[key]);
	    }
	  }
	}
	return dist;
}

var mdastUtilFromMarkdown;
var hasRequiredMdastUtilFromMarkdown;

function requireMdastUtilFromMarkdown () {
	if (hasRequiredMdastUtilFromMarkdown) return mdastUtilFromMarkdown;
	hasRequiredMdastUtilFromMarkdown = 1;
	mdastUtilFromMarkdown = requireDist();
	return mdastUtilFromMarkdown;
}

var remarkParse;
var hasRequiredRemarkParse;

function requireRemarkParse () {
	if (hasRequiredRemarkParse) return remarkParse;
	hasRequiredRemarkParse = 1;
	remarkParse = parse;
	var fromMarkdown = requireMdastUtilFromMarkdown();
	function parse(options) {
	  var self = this;
	  this.Parser = parse;
	  function parse(doc) {
	    return fromMarkdown(
	      doc,
	      Object.assign({}, self.data('settings'), options, {
	        extensions: self.data('micromarkExtensions') || [],
	        mdastExtensions: self.data('fromMarkdownExtensions') || []
	      })
	    )
	  }
	}
	return remarkParse;
}

var zwitch;
var hasRequiredZwitch;

function requireZwitch () {
	if (hasRequiredZwitch) return zwitch;
	hasRequiredZwitch = 1;
	zwitch = factory;
	var noop = Function.prototype;
	var own = {}.hasOwnProperty;
	function factory(key, options) {
	  var settings = options || {};
	  function one(value) {
	    var fn = one.invalid;
	    var handlers = one.handlers;
	    if (value && own.call(value, key)) {
	      fn = own.call(handlers, value[key]) ? handlers[value[key]] : one.unknown;
	    }
	    return (fn || noop).apply(this, arguments)
	  }
	  one.handlers = settings.handlers || {};
	  one.invalid = settings.invalid;
	  one.unknown = settings.unknown;
	  return one
	}
	return zwitch;
}

var handle = {};

var blockquote_1;
var hasRequiredBlockquote;

function requireBlockquote () {
	if (hasRequiredBlockquote) return blockquote_1;
	hasRequiredBlockquote = 1;
	blockquote_1 = blockquote;
	var flow = requireContainerFlow();
	var indentLines = requireIndentLines();
	function blockquote(node, _, context) {
	  var exit = context.enter('blockquote');
	  var value = indentLines(flow(node, context), map);
	  exit();
	  return value
	}
	function map(line, index, blank) {
	  return '>' + (blank ? '' : ' ') + line
	}
	return blockquote_1;
}

var patternInScope_1;
var hasRequiredPatternInScope;

function requirePatternInScope () {
	if (hasRequiredPatternInScope) return patternInScope_1;
	hasRequiredPatternInScope = 1;
	patternInScope_1 = patternInScope;
	function patternInScope(stack, pattern) {
	  return (
	    listInScope(stack, pattern.inConstruct, true) &&
	    !listInScope(stack, pattern.notInConstruct)
	  )
	}
	function listInScope(stack, list, none) {
	  var index;
	  if (!list) {
	    return none
	  }
	  if (typeof list === 'string') {
	    list = [list];
	  }
	  index = -1;
	  while (++index < list.length) {
	    if (stack.indexOf(list[index]) !== -1) {
	      return true
	    }
	  }
	  return false
	}
	return patternInScope_1;
}

var _break;
var hasRequired_break;

function require_break () {
	if (hasRequired_break) return _break;
	hasRequired_break = 1;
	_break = hardBreak;
	var patternInScope = requirePatternInScope();
	function hardBreak(node, _, context, safe) {
	  var index = -1;
	  while (++index < context.unsafe.length) {
	    if (
	      context.unsafe[index].character === '\n' &&
	      patternInScope(context.stack, context.unsafe[index])
	    ) {
	      return /[ \t]/.test(safe.before) ? '' : ' '
	    }
	  }
	  return '\\\n'
	}
	return _break;
}

var longestStreak_1;
var hasRequiredLongestStreak;

function requireLongestStreak () {
	if (hasRequiredLongestStreak) return longestStreak_1;
	hasRequiredLongestStreak = 1;
	longestStreak_1 = longestStreak;
	function longestStreak(value, character) {
	  var count = 0;
	  var maximum = 0;
	  var expected;
	  var index;
	  if (typeof character !== 'string' || character.length !== 1) {
	    throw new Error('Expected character')
	  }
	  value = String(value);
	  index = value.indexOf(character);
	  expected = index;
	  while (index !== -1) {
	    count++;
	    if (index === expected) {
	      if (count > maximum) {
	        maximum = count;
	      }
	    } else {
	      count = 1;
	    }
	    expected = index + 1;
	    index = value.indexOf(character, expected);
	  }
	  return maximum
	}
	return longestStreak_1;
}

var formatCodeAsIndented_1;
var hasRequiredFormatCodeAsIndented;

function requireFormatCodeAsIndented () {
	if (hasRequiredFormatCodeAsIndented) return formatCodeAsIndented_1;
	hasRequiredFormatCodeAsIndented = 1;
	formatCodeAsIndented_1 = formatCodeAsIndented;
	function formatCodeAsIndented(node, context) {
	  return (
	    !context.options.fences &&
	    node.value &&
	    !node.lang &&
	    /[^ \r\n]/.test(node.value) &&
	    !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(node.value)
	  )
	}
	return formatCodeAsIndented_1;
}

var checkFence_1;
var hasRequiredCheckFence;

function requireCheckFence () {
	if (hasRequiredCheckFence) return checkFence_1;
	hasRequiredCheckFence = 1;
	checkFence_1 = checkFence;
	function checkFence(context) {
	  var marker = context.options.fence || '`';
	  if (marker !== '`' && marker !== '~') {
	    throw new Error(
	      'Cannot serialize code with `' +
	        marker +
	        '` for `options.fence`, expected `` ` `` or `~`'
	    )
	  }
	  return marker
	}
	return checkFence_1;
}

var safe_1;
var hasRequiredSafe;

function requireSafe () {
	if (hasRequiredSafe) return safe_1;
	hasRequiredSafe = 1;
	safe_1 = safe;
	var patternCompile = requirePatternCompile();
	var patternInScope = requirePatternInScope();
	function safe(context, input, config) {
	  var value = (config.before || '') + (input || '') + (config.after || '');
	  var positions = [];
	  var result = [];
	  var infos = {};
	  var index = -1;
	  var before;
	  var after;
	  var position;
	  var pattern;
	  var expression;
	  var match;
	  var start;
	  var end;
	  while (++index < context.unsafe.length) {
	    pattern = context.unsafe[index];
	    if (!patternInScope(context.stack, pattern)) {
	      continue
	    }
	    expression = patternCompile(pattern);
	    while ((match = expression.exec(value))) {
	      before = 'before' in pattern || pattern.atBreak;
	      after = 'after' in pattern;
	      position = match.index + (before ? match[1].length : 0);
	      if (positions.indexOf(position) === -1) {
	        positions.push(position);
	        infos[position] = {before: before, after: after};
	      } else {
	        if (infos[position].before && !before) {
	          infos[position].before = false;
	        }
	        if (infos[position].after && !after) {
	          infos[position].after = false;
	        }
	      }
	    }
	  }
	  positions.sort(numerical);
	  start = config.before ? config.before.length : 0;
	  end = value.length - (config.after ? config.after.length : 0);
	  index = -1;
	  while (++index < positions.length) {
	    position = positions[index];
	    if (
	      position < start ||
	      position >= end
	    ) {
	      continue
	    }
	    if (
	      position + 1 < end &&
	      positions[index + 1] === position + 1 &&
	      infos[position].after &&
	      !infos[position + 1].before &&
	      !infos[position + 1].after
	    ) {
	      continue
	    }
	    if (start !== position) {
	      result.push(escapeBackslashes(value.slice(start, position), '\\'));
	    }
	    start = position;
	    if (
	      /[!-/:-@[-`{-~]/.test(value.charAt(position)) &&
	      (!config.encode || config.encode.indexOf(value.charAt(position)) === -1)
	    ) {
	      result.push('\\');
	    } else {
	      result.push(
	        '&#x' + value.charCodeAt(position).toString(16).toUpperCase() + ';'
	      );
	      start++;
	    }
	  }
	  result.push(escapeBackslashes(value.slice(start, end), config.after));
	  return result.join('')
	}
	function numerical(a, b) {
	  return a - b
	}
	function escapeBackslashes(value, after) {
	  var expression = /\\(?=[!-/:-@[-`{-~])/g;
	  var positions = [];
	  var results = [];
	  var index = -1;
	  var start = 0;
	  var whole = value + after;
	  var match;
	  while ((match = expression.exec(whole))) {
	    positions.push(match.index);
	  }
	  while (++index < positions.length) {
	    if (start !== positions[index]) {
	      results.push(value.slice(start, positions[index]));
	    }
	    results.push('\\');
	    start = positions[index];
	  }
	  results.push(value.slice(start));
	  return results.join('')
	}
	return safe_1;
}

var code_1;
var hasRequiredCode;

function requireCode () {
	if (hasRequiredCode) return code_1;
	hasRequiredCode = 1;
	code_1 = code;
	var repeat = requireRepeatString();
	var streak = requireLongestStreak();
	var formatCodeAsIndented = requireFormatCodeAsIndented();
	var checkFence = requireCheckFence();
	var indentLines = requireIndentLines();
	var safe = requireSafe();
	function code(node, _, context) {
	  var marker = checkFence(context);
	  var raw = node.value || '';
	  var suffix = marker === '`' ? 'GraveAccent' : 'Tilde';
	  var value;
	  var sequence;
	  var exit;
	  var subexit;
	  if (formatCodeAsIndented(node, context)) {
	    exit = context.enter('codeIndented');
	    value = indentLines(raw, map);
	  } else {
	    sequence = repeat(marker, Math.max(streak(raw, marker) + 1, 3));
	    exit = context.enter('codeFenced');
	    value = sequence;
	    if (node.lang) {
	      subexit = context.enter('codeFencedLang' + suffix);
	      value += safe(context, node.lang, {
	        before: '`',
	        after: ' ',
	        encode: ['`']
	      });
	      subexit();
	    }
	    if (node.lang && node.meta) {
	      subexit = context.enter('codeFencedMeta' + suffix);
	      value +=
	        ' ' +
	        safe(context, node.meta, {
	          before: ' ',
	          after: '\n',
	          encode: ['`']
	        });
	      subexit();
	    }
	    value += '\n';
	    if (raw) {
	      value += raw + '\n';
	    }
	    value += sequence;
	  }
	  exit();
	  return value
	}
	function map(line, _, blank) {
	  return (blank ? '' : '    ') + line
	}
	return code_1;
}

var association_1;
var hasRequiredAssociation;

function requireAssociation () {
	if (hasRequiredAssociation) return association_1;
	hasRequiredAssociation = 1;
	association_1 = association;
	var decode = requireDecodeEntity_browser();
	var characterEscape = /\\([!-/:-@[-`{-~])/g;
	var characterReference = /&(#(\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
	function association(node) {
	  if (node.label || !node.identifier) {
	    return node.label || ''
	  }
	  return node.identifier
	    .replace(characterEscape, '$1')
	    .replace(characterReference, decodeIfPossible)
	}
	function decodeIfPossible($0, $1) {
	  return decode($1) || $0
	}
	return association_1;
}

var checkQuote_1;
var hasRequiredCheckQuote;

function requireCheckQuote () {
	if (hasRequiredCheckQuote) return checkQuote_1;
	hasRequiredCheckQuote = 1;
	checkQuote_1 = checkQuote;
	function checkQuote(context) {
	  var marker = context.options.quote || '"';
	  if (marker !== '"' && marker !== "'") {
	    throw new Error(
	      'Cannot serialize title with `' +
	        marker +
	        '` for `options.quote`, expected `"`, or `\'`'
	    )
	  }
	  return marker
	}
	return checkQuote_1;
}

var definition_1;
var hasRequiredDefinition;

function requireDefinition () {
	if (hasRequiredDefinition) return definition_1;
	hasRequiredDefinition = 1;
	definition_1 = definition;
	var association = requireAssociation();
	var checkQuote = requireCheckQuote();
	var safe = requireSafe();
	function definition(node, _, context) {
	  var marker = checkQuote(context);
	  var suffix = marker === '"' ? 'Quote' : 'Apostrophe';
	  var exit = context.enter('definition');
	  var subexit = context.enter('label');
	  var value =
	    '[' + safe(context, association(node), {before: '[', after: ']'}) + ']: ';
	  subexit();
	  if (
	    !node.url ||
	    /[ \t\r\n]/.test(node.url)
	  ) {
	    subexit = context.enter('destinationLiteral');
	    value += '<' + safe(context, node.url, {before: '<', after: '>'}) + '>';
	  } else {
	    subexit = context.enter('destinationRaw');
	    value += safe(context, node.url, {before: ' ', after: ' '});
	  }
	  subexit();
	  if (node.title) {
	    subexit = context.enter('title' + suffix);
	    value +=
	      ' ' +
	      marker +
	      safe(context, node.title, {before: marker, after: marker}) +
	      marker;
	    subexit();
	  }
	  exit();
	  return value
	}
	return definition_1;
}

var checkEmphasis_1;
var hasRequiredCheckEmphasis;

function requireCheckEmphasis () {
	if (hasRequiredCheckEmphasis) return checkEmphasis_1;
	hasRequiredCheckEmphasis = 1;
	checkEmphasis_1 = checkEmphasis;
	function checkEmphasis(context) {
	  var marker = context.options.emphasis || '*';
	  if (marker !== '*' && marker !== '_') {
	    throw new Error(
	      'Cannot serialize emphasis with `' +
	        marker +
	        '` for `options.emphasis`, expected `*`, or `_`'
	    )
	  }
	  return marker
	}
	return checkEmphasis_1;
}

var emphasis_1;
var hasRequiredEmphasis;

function requireEmphasis () {
	if (hasRequiredEmphasis) return emphasis_1;
	hasRequiredEmphasis = 1;
	emphasis_1 = emphasis;
	emphasis.peek = emphasisPeek;
	var checkEmphasis = requireCheckEmphasis();
	var phrasing = requireContainerPhrasing();
	function emphasis(node, _, context) {
	  var marker = checkEmphasis(context);
	  var exit = context.enter('emphasis');
	  var value = phrasing(node, context, {before: marker, after: marker});
	  exit();
	  return marker + value + marker
	}
	function emphasisPeek(node, _, context) {
	  return context.options.emphasis || '*'
	}
	return emphasis_1;
}

var formatHeadingAsSetext_1;
var hasRequiredFormatHeadingAsSetext;

function requireFormatHeadingAsSetext () {
	if (hasRequiredFormatHeadingAsSetext) return formatHeadingAsSetext_1;
	hasRequiredFormatHeadingAsSetext = 1;
	formatHeadingAsSetext_1 = formatHeadingAsSetext;
	var toString = requireMdastUtilToString();
	function formatHeadingAsSetext(node, context) {
	  return (
	    context.options.setext && (!node.depth || node.depth < 3) && toString(node)
	  )
	}
	return formatHeadingAsSetext_1;
}

var heading_1;
var hasRequiredHeading;

function requireHeading () {
	if (hasRequiredHeading) return heading_1;
	hasRequiredHeading = 1;
	heading_1 = heading;
	var repeat = requireRepeatString();
	var formatHeadingAsSetext = requireFormatHeadingAsSetext();
	var phrasing = requireContainerPhrasing();
	function heading(node, _, context) {
	  var rank = Math.max(Math.min(6, node.depth || 1), 1);
	  var exit;
	  var subexit;
	  var value;
	  var sequence;
	  if (formatHeadingAsSetext(node, context)) {
	    exit = context.enter('headingSetext');
	    subexit = context.enter('phrasing');
	    value = phrasing(node, context, {before: '\n', after: '\n'});
	    subexit();
	    exit();
	    return (
	      value +
	      '\n' +
	      repeat(
	        rank === 1 ? '=' : '-',
	        value.length -
	          (Math.max(value.lastIndexOf('\r'), value.lastIndexOf('\n')) + 1)
	      )
	    )
	  }
	  sequence = repeat('#', rank);
	  exit = context.enter('headingAtx');
	  subexit = context.enter('phrasing');
	  value = phrasing(node, context, {before: '# ', after: '\n'});
	  value = value ? sequence + ' ' + value : sequence;
	  if (context.options.closeAtx) {
	    value += ' ' + sequence;
	  }
	  subexit();
	  exit();
	  return value
	}
	return heading_1;
}

var html_1;
var hasRequiredHtml;

function requireHtml () {
	if (hasRequiredHtml) return html_1;
	hasRequiredHtml = 1;
	html_1 = html;
	html.peek = htmlPeek;
	function html(node) {
	  return node.value || ''
	}
	function htmlPeek() {
	  return '<'
	}
	return html_1;
}

var image_1;
var hasRequiredImage;

function requireImage () {
	if (hasRequiredImage) return image_1;
	hasRequiredImage = 1;
	image_1 = image;
	image.peek = imagePeek;
	var checkQuote = requireCheckQuote();
	var safe = requireSafe();
	function image(node, _, context) {
	  var quote = checkQuote(context);
	  var suffix = quote === '"' ? 'Quote' : 'Apostrophe';
	  var exit = context.enter('image');
	  var subexit = context.enter('label');
	  var value = '![' + safe(context, node.alt, {before: '[', after: ']'}) + '](';
	  subexit();
	  if (
	    (!node.url && node.title) ||
	    /[ \t\r\n]/.test(node.url)
	  ) {
	    subexit = context.enter('destinationLiteral');
	    value += '<' + safe(context, node.url, {before: '<', after: '>'}) + '>';
	  } else {
	    subexit = context.enter('destinationRaw');
	    value += safe(context, node.url, {
	      before: '(',
	      after: node.title ? ' ' : ')'
	    });
	  }
	  subexit();
	  if (node.title) {
	    subexit = context.enter('title' + suffix);
	    value +=
	      ' ' +
	      quote +
	      safe(context, node.title, {before: quote, after: quote}) +
	      quote;
	    subexit();
	  }
	  value += ')';
	  exit();
	  return value
	}
	function imagePeek() {
	  return '!'
	}
	return image_1;
}

var imageReference_1;
var hasRequiredImageReference;

function requireImageReference () {
	if (hasRequiredImageReference) return imageReference_1;
	hasRequiredImageReference = 1;
	imageReference_1 = imageReference;
	imageReference.peek = imageReferencePeek;
	var association = requireAssociation();
	var safe = requireSafe();
	function imageReference(node, _, context) {
	  var type = node.referenceType;
	  var exit = context.enter('imageReference');
	  var subexit = context.enter('label');
	  var alt = safe(context, node.alt, {before: '[', after: ']'});
	  var value = '![' + alt + ']';
	  var reference;
	  var stack;
	  subexit();
	  stack = context.stack;
	  context.stack = [];
	  subexit = context.enter('reference');
	  reference = safe(context, association(node), {before: '[', after: ']'});
	  subexit();
	  context.stack = stack;
	  exit();
	  if (type === 'full' || !alt || alt !== reference) {
	    value += '[' + reference + ']';
	  } else if (type !== 'shortcut') {
	    value += '[]';
	  }
	  return value
	}
	function imageReferencePeek() {
	  return '!'
	}
	return imageReference_1;
}

var formatLinkAsAutolink_1;
var hasRequiredFormatLinkAsAutolink;

function requireFormatLinkAsAutolink () {
	if (hasRequiredFormatLinkAsAutolink) return formatLinkAsAutolink_1;
	hasRequiredFormatLinkAsAutolink = 1;
	formatLinkAsAutolink_1 = formatLinkAsAutolink;
	var toString = requireMdastUtilToString();
	function formatLinkAsAutolink(node, context) {
	  var raw = toString(node);
	  return (
	    !context.options.resourceLink &&
	    node.url &&
	    !node.title &&
	    node.children &&
	    node.children.length === 1 &&
	    node.children[0].type === 'text' &&
	    (raw === node.url || 'mailto:' + raw === node.url) &&
	    /^[a-z][a-z+.-]+:/i.test(node.url) &&
	    !/[\0- <>\u007F]/.test(node.url)
	  )
	}
	return formatLinkAsAutolink_1;
}

var link_1;
var hasRequiredLink;

function requireLink () {
	if (hasRequiredLink) return link_1;
	hasRequiredLink = 1;
	link_1 = link;
	link.peek = linkPeek;
	var checkQuote = requireCheckQuote();
	var formatLinkAsAutolink = requireFormatLinkAsAutolink();
	var phrasing = requireContainerPhrasing();
	var safe = requireSafe();
	function link(node, _, context) {
	  var quote = checkQuote(context);
	  var suffix = quote === '"' ? 'Quote' : 'Apostrophe';
	  var exit;
	  var subexit;
	  var value;
	  var stack;
	  if (formatLinkAsAutolink(node, context)) {
	    stack = context.stack;
	    context.stack = [];
	    exit = context.enter('autolink');
	    value = '<' + phrasing(node, context, {before: '<', after: '>'}) + '>';
	    exit();
	    context.stack = stack;
	    return value
	  }
	  exit = context.enter('link');
	  subexit = context.enter('label');
	  value = '[' + phrasing(node, context, {before: '[', after: ']'}) + '](';
	  subexit();
	  if (
	    (!node.url && node.title) ||
	    /[ \t\r\n]/.test(node.url)
	  ) {
	    subexit = context.enter('destinationLiteral');
	    value += '<' + safe(context, node.url, {before: '<', after: '>'}) + '>';
	  } else {
	    subexit = context.enter('destinationRaw');
	    value += safe(context, node.url, {
	      before: '(',
	      after: node.title ? ' ' : ')'
	    });
	  }
	  subexit();
	  if (node.title) {
	    subexit = context.enter('title' + suffix);
	    value +=
	      ' ' +
	      quote +
	      safe(context, node.title, {before: quote, after: quote}) +
	      quote;
	    subexit();
	  }
	  value += ')';
	  exit();
	  return value
	}
	function linkPeek(node, _, context) {
	  return formatLinkAsAutolink(node, context) ? '<' : '['
	}
	return link_1;
}

var linkReference_1;
var hasRequiredLinkReference;

function requireLinkReference () {
	if (hasRequiredLinkReference) return linkReference_1;
	hasRequiredLinkReference = 1;
	linkReference_1 = linkReference;
	linkReference.peek = linkReferencePeek;
	var association = requireAssociation();
	var phrasing = requireContainerPhrasing();
	var safe = requireSafe();
	function linkReference(node, _, context) {
	  var type = node.referenceType;
	  var exit = context.enter('linkReference');
	  var subexit = context.enter('label');
	  var text = phrasing(node, context, {before: '[', after: ']'});
	  var value = '[' + text + ']';
	  var reference;
	  var stack;
	  subexit();
	  stack = context.stack;
	  context.stack = [];
	  subexit = context.enter('reference');
	  reference = safe(context, association(node), {before: '[', after: ']'});
	  subexit();
	  context.stack = stack;
	  exit();
	  if (type === 'full' || !text || text !== reference) {
	    value += '[' + reference + ']';
	  } else if (type !== 'shortcut') {
	    value += '[]';
	  }
	  return value
	}
	function linkReferencePeek() {
	  return '['
	}
	return linkReference_1;
}

var list_1;
var hasRequiredList;

function requireList () {
	if (hasRequiredList) return list_1;
	hasRequiredList = 1;
	list_1 = list;
	var flow = requireContainerFlow();
	function list(node, _, context) {
	  var exit = context.enter('list');
	  var value = flow(node, context);
	  exit();
	  return value
	}
	return list_1;
}

var paragraph_1;
var hasRequiredParagraph;

function requireParagraph () {
	if (hasRequiredParagraph) return paragraph_1;
	hasRequiredParagraph = 1;
	paragraph_1 = paragraph;
	var phrasing = requireContainerPhrasing();
	function paragraph(node, _, context) {
	  var exit = context.enter('paragraph');
	  var subexit = context.enter('phrasing');
	  var value = phrasing(node, context, {before: '\n', after: '\n'});
	  subexit();
	  exit();
	  return value
	}
	return paragraph_1;
}

var root_1;
var hasRequiredRoot;

function requireRoot () {
	if (hasRequiredRoot) return root_1;
	hasRequiredRoot = 1;
	root_1 = root;
	var flow = requireContainerFlow();
	function root(node, _, context) {
	  return flow(node, context)
	}
	return root_1;
}

var checkStrong_1;
var hasRequiredCheckStrong;

function requireCheckStrong () {
	if (hasRequiredCheckStrong) return checkStrong_1;
	hasRequiredCheckStrong = 1;
	checkStrong_1 = checkStrong;
	function checkStrong(context) {
	  var marker = context.options.strong || '*';
	  if (marker !== '*' && marker !== '_') {
	    throw new Error(
	      'Cannot serialize strong with `' +
	        marker +
	        '` for `options.strong`, expected `*`, or `_`'
	    )
	  }
	  return marker
	}
	return checkStrong_1;
}

var strong_1;
var hasRequiredStrong;

function requireStrong () {
	if (hasRequiredStrong) return strong_1;
	hasRequiredStrong = 1;
	strong_1 = strong;
	strong.peek = strongPeek;
	var checkStrong = requireCheckStrong();
	var phrasing = requireContainerPhrasing();
	function strong(node, _, context) {
	  var marker = checkStrong(context);
	  var exit = context.enter('strong');
	  var value = phrasing(node, context, {before: marker, after: marker});
	  exit();
	  return marker + marker + value + marker + marker
	}
	function strongPeek(node, _, context) {
	  return context.options.strong || '*'
	}
	return strong_1;
}

var text_1;
var hasRequiredText;

function requireText () {
	if (hasRequiredText) return text_1;
	hasRequiredText = 1;
	text_1 = text;
	var safe = requireSafe();
	function text(node, parent, context, safeOptions) {
	  return safe(context, node.value, safeOptions)
	}
	return text_1;
}

var checkRuleRepeat;
var hasRequiredCheckRuleRepeat;

function requireCheckRuleRepeat () {
	if (hasRequiredCheckRuleRepeat) return checkRuleRepeat;
	hasRequiredCheckRuleRepeat = 1;
	checkRuleRepeat = checkRule;
	function checkRule(context) {
	  var repetition = context.options.ruleRepetition || 3;
	  if (repetition < 3) {
	    throw new Error(
	      'Cannot serialize rules with repetition `' +
	        repetition +
	        '` for `options.ruleRepetition`, expected `3` or more'
	    )
	  }
	  return repetition
	}
	return checkRuleRepeat;
}

var checkRule_1;
var hasRequiredCheckRule;

function requireCheckRule () {
	if (hasRequiredCheckRule) return checkRule_1;
	hasRequiredCheckRule = 1;
	checkRule_1 = checkRule;
	function checkRule(context) {
	  var marker = context.options.rule || '*';
	  if (marker !== '*' && marker !== '-' && marker !== '_') {
	    throw new Error(
	      'Cannot serialize rules with `' +
	        marker +
	        '` for `options.rule`, expected `*`, `-`, or `_`'
	    )
	  }
	  return marker
	}
	return checkRule_1;
}

var thematicBreak_1;
var hasRequiredThematicBreak;

function requireThematicBreak () {
	if (hasRequiredThematicBreak) return thematicBreak_1;
	hasRequiredThematicBreak = 1;
	thematicBreak_1 = thematicBreak;
	var repeat = requireRepeatString();
	var checkRepeat = requireCheckRuleRepeat();
	var checkRule = requireCheckRule();
	function thematicBreak(node, parent, context) {
	  var value = repeat(
	    checkRule(context) + (context.options.ruleSpaces ? ' ' : ''),
	    checkRepeat(context)
	  );
	  return context.options.ruleSpaces ? value.slice(0, -1) : value
	}
	return thematicBreak_1;
}

var hasRequiredHandle;

function requireHandle () {
	if (hasRequiredHandle) return handle;
	hasRequiredHandle = 1;
	handle.blockquote = requireBlockquote();
	handle.break = require_break();
	handle.code = requireCode();
	handle.definition = requireDefinition();
	handle.emphasis = requireEmphasis();
	handle.hardBreak = require_break();
	handle.heading = requireHeading();
	handle.html = requireHtml();
	handle.image = requireImage();
	handle.imageReference = requireImageReference();
	handle.inlineCode = requireInlineCode();
	handle.link = requireLink();
	handle.linkReference = requireLinkReference();
	handle.list = requireList();
	handle.listItem = requireListItem();
	handle.paragraph = requireParagraph();
	handle.root = requireRoot();
	handle.strong = requireStrong();
	handle.text = requireText();
	handle.thematicBreak = requireThematicBreak();
	return handle;
}

var join;
var hasRequiredJoin;

function requireJoin () {
	if (hasRequiredJoin) return join;
	hasRequiredJoin = 1;
	join = [joinDefaults];
	var formatCodeAsIndented = requireFormatCodeAsIndented();
	var formatHeadingAsSetext = requireFormatHeadingAsSetext();
	function joinDefaults(left, right, parent, context) {
	  if (
	    (right.type === 'list' &&
	      right.type === left.type &&
	      Boolean(left.ordered) === Boolean(right.ordered)) ||
	    (right.type === 'code' &&
	      formatCodeAsIndented(right, context) &&
	      (left.type === 'list' ||
	        (left.type === right.type && formatCodeAsIndented(left, context))))
	  ) {
	    return false
	  }
	  if (typeof parent.spread === 'boolean') {
	    if (
	      left.type === 'paragraph' &&
	      (left.type === right.type ||
	        right.type === 'definition' ||
	        (right.type === 'heading' && formatHeadingAsSetext(right, context)))
	    ) {
	      return
	    }
	    return parent.spread ? 1 : 0
	  }
	}
	return join;
}

var unsafe;
var hasRequiredUnsafe;

function requireUnsafe () {
	if (hasRequiredUnsafe) return unsafe;
	hasRequiredUnsafe = 1;
	unsafe = [
	  {
	    character: '\t',
	    inConstruct: ['codeFencedLangGraveAccent', 'codeFencedLangTilde']
	  },
	  {
	    character: '\r',
	    inConstruct: [
	      'codeFencedLangGraveAccent',
	      'codeFencedLangTilde',
	      'codeFencedMetaGraveAccent',
	      'codeFencedMetaTilde',
	      'destinationLiteral',
	      'headingAtx'
	    ]
	  },
	  {
	    character: '\n',
	    inConstruct: [
	      'codeFencedLangGraveAccent',
	      'codeFencedLangTilde',
	      'codeFencedMetaGraveAccent',
	      'codeFencedMetaTilde',
	      'destinationLiteral',
	      'headingAtx'
	    ]
	  },
	  {
	    character: ' ',
	    inConstruct: ['codeFencedLangGraveAccent', 'codeFencedLangTilde']
	  },
	  {character: '!', after: '\\[', inConstruct: 'phrasing'},
	  {character: '"', inConstruct: 'titleQuote'},
	  {atBreak: true, character: '#'},
	  {character: '#', inConstruct: 'headingAtx', after: '(?:[\r\n]|$)'},
	  {character: '&', after: '[#A-Za-z]', inConstruct: 'phrasing'},
	  {character: "'", inConstruct: 'titleApostrophe'},
	  {character: '(', inConstruct: 'destinationRaw'},
	  {before: '\\]', character: '(', inConstruct: 'phrasing'},
	  {atBreak: true, before: '\\d+', character: ')'},
	  {character: ')', inConstruct: 'destinationRaw'},
	  {atBreak: true, character: '*'},
	  {character: '*', inConstruct: 'phrasing'},
	  {atBreak: true, character: '+'},
	  {atBreak: true, character: '-'},
	  {atBreak: true, before: '\\d+', character: '.', after: '(?:[ \t\r\n]|$)'},
	  {atBreak: true, character: '<', after: '[!/?A-Za-z]'},
	  {character: '<', after: '[!/?A-Za-z]', inConstruct: 'phrasing'},
	  {character: '<', inConstruct: 'destinationLiteral'},
	  {atBreak: true, character: '='},
	  {atBreak: true, character: '>'},
	  {character: '>', inConstruct: 'destinationLiteral'},
	  {atBreak: true, character: '['},
	  {character: '[', inConstruct: ['phrasing', 'label', 'reference']},
	  {character: '\\', after: '[\\r\\n]', inConstruct: 'phrasing'},
	  {
	    character: ']',
	    inConstruct: ['label', 'reference']
	  },
	  {atBreak: true, character: '_'},
	  {before: '[^A-Za-z]', character: '_', inConstruct: 'phrasing'},
	  {character: '_', after: '[^A-Za-z]', inConstruct: 'phrasing'},
	  {atBreak: true, character: '`'},
	  {
	    character: '`',
	    inConstruct: [
	      'codeFencedLangGraveAccent',
	      'codeFencedMetaGraveAccent',
	      'phrasing'
	    ]
	  },
	  {atBreak: true, character: '~'}
	];
	return unsafe;
}

var lib$1;
var hasRequiredLib$1;

function requireLib$1 () {
	if (hasRequiredLib$1) return lib$1;
	hasRequiredLib$1 = 1;
	lib$1 = toMarkdown;
	var zwitch = requireZwitch();
	var configure = requireConfigure();
	var defaultHandlers = requireHandle();
	var defaultJoin = requireJoin();
	var defaultUnsafe = requireUnsafe();
	function toMarkdown(tree, options) {
	  var settings = options || {};
	  var context = {
	    enter: enter,
	    stack: [],
	    unsafe: [],
	    join: [],
	    handlers: {},
	    options: {}
	  };
	  var result;
	  configure(context, {
	    unsafe: defaultUnsafe,
	    join: defaultJoin,
	    handlers: defaultHandlers
	  });
	  configure(context, settings);
	  if (context.options.tightDefinitions) {
	    context.join = [joinDefinition].concat(context.join);
	  }
	  context.handle = zwitch('type', {
	    invalid: invalid,
	    unknown: unknown,
	    handlers: context.handlers
	  });
	  result = context.handle(tree, null, context, {before: '\n', after: '\n'});
	  if (
	    result &&
	    result.charCodeAt(result.length - 1) !== 10 &&
	    result.charCodeAt(result.length - 1) !== 13
	  ) {
	    result += '\n';
	  }
	  return result
	  function enter(name) {
	    context.stack.push(name);
	    return exit
	    function exit() {
	      context.stack.pop();
	    }
	  }
	}
	function invalid(value) {
	  throw new Error('Cannot handle value `' + value + '`, expected node')
	}
	function unknown(node) {
	  throw new Error('Cannot handle unknown node `' + node.type + '`')
	}
	function joinDefinition(left, right) {
	  if (left.type === 'definition' && left.type === right.type) {
	    return 0
	  }
	}
	return lib$1;
}

var mdastUtilToMarkdown;
var hasRequiredMdastUtilToMarkdown;

function requireMdastUtilToMarkdown () {
	if (hasRequiredMdastUtilToMarkdown) return mdastUtilToMarkdown;
	hasRequiredMdastUtilToMarkdown = 1;
	mdastUtilToMarkdown = requireLib$1();
	return mdastUtilToMarkdown;
}

var remarkStringify;
var hasRequiredRemarkStringify;

function requireRemarkStringify () {
	if (hasRequiredRemarkStringify) return remarkStringify;
	hasRequiredRemarkStringify = 1;
	remarkStringify = stringify;
	var toMarkdown = requireMdastUtilToMarkdown();
	function stringify(options) {
	  var self = this;
	  this.Compiler = compile;
	  function compile(tree) {
	    return toMarkdown(
	      tree,
	      Object.assign({}, self.data('settings'), options, {
	        extensions: self.data('toMarkdownExtensions') || []
	      })
	    )
	  }
	}
	return remarkStringify;
}

var unistUtilVisit;
var hasRequiredUnistUtilVisit;

function requireUnistUtilVisit () {
	if (hasRequiredUnistUtilVisit) return unistUtilVisit;
	hasRequiredUnistUtilVisit = 1;
	unistUtilVisit = visit;
	var visitParents = requireUnistUtilVisitParents();
	var CONTINUE = visitParents.CONTINUE;
	var SKIP = visitParents.SKIP;
	var EXIT = visitParents.EXIT;
	visit.CONTINUE = CONTINUE;
	visit.SKIP = SKIP;
	visit.EXIT = EXIT;
	function visit(tree, test, visitor, reverse) {
	  if (typeof test === 'function' && typeof visitor !== 'function') {
	    reverse = visitor;
	    visitor = test;
	    test = null;
	  }
	  visitParents(tree, test, overload, reverse);
	  function overload(node, parents) {
	    var parent = parents[parents.length - 1];
	    var index = parent ? parent.children.indexOf(node) : null;
	    return visitor(node, index, parent)
	  }
	}
	return unistUtilVisit;
}

var htmlCommentRegex;
var hasRequiredHtmlCommentRegex;

function requireHtmlCommentRegex () {
	if (hasRequiredHtmlCommentRegex) return htmlCommentRegex;
	hasRequiredHtmlCommentRegex = 1;
	htmlCommentRegex = /<!--([\s\S]*?)-->/g;
	return htmlCommentRegex;
}

var transformer;
var hasRequiredTransformer;

function requireTransformer () {
	if (hasRequiredTransformer) return transformer;
	hasRequiredTransformer = 1;
	const visit = requireUnistUtilVisit();
	const htmlCommentRegex = requireHtmlCommentRegex();
	const removeComments = (tree, file) => {
	  const handler = (node, index, parent) => {
	    const isComment = node.value.match(htmlCommentRegex);
	    if (isComment) {
	      parent.children.splice(index, 1);
	      return [visit.SKIP, index];
	    }
	  };
	  visit(tree, 'html', handler);
	  visit(tree, 'jsx', handler);
	};
	transformer = removeComments;
	return transformer;
}

var remarkRemoveComments;
var hasRequiredRemarkRemoveComments;

function requireRemarkRemoveComments () {
	if (hasRequiredRemarkRemoveComments) return remarkRemoveComments;
	hasRequiredRemarkRemoveComments = 1;
	const transformer = requireTransformer();
	function attacher() {
	  return transformer;
	}
	remarkRemoveComments = attacher;
	return remarkRemoveComments;
}

var bail_1;
var hasRequiredBail;

function requireBail () {
	if (hasRequiredBail) return bail_1;
	hasRequiredBail = 1;
	bail_1 = bail;
	function bail(err) {
	  if (err) {
	    throw err
	  }
	}
	return bail_1;
}

var isBuffer;
var hasRequiredIsBuffer;

function requireIsBuffer () {
	if (hasRequiredIsBuffer) return isBuffer;
	hasRequiredIsBuffer = 1;
	isBuffer = function isBuffer (obj) {
	  return obj != null && obj.constructor != null &&
	    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	};
	return isBuffer;
}

var extend;
var hasRequiredExtend;

function requireExtend () {
	if (hasRequiredExtend) return extend;
	hasRequiredExtend = 1;
	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var defineProperty = Object.defineProperty;
	var gOPD = Object.getOwnPropertyDescriptor;
	var isArray = function isArray(arr) {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(arr);
		}
		return toStr.call(arr) === '[object Array]';
	};
	var isPlainObject = function isPlainObject(obj) {
		if (!obj || toStr.call(obj) !== '[object Object]') {
			return false;
		}
		var hasOwnConstructor = hasOwn.call(obj, 'constructor');
		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
			return false;
		}
		var key;
		for (key in obj) {  }
		return typeof key === 'undefined' || hasOwn.call(obj, key);
	};
	var setProperty = function setProperty(target, options) {
		if (defineProperty && options.name === '__proto__') {
			defineProperty(target, options.name, {
				enumerable: true,
				configurable: true,
				value: options.newValue,
				writable: true
			});
		} else {
			target[options.name] = options.newValue;
		}
	};
	var getProperty = function getProperty(obj, name) {
		if (name === '__proto__') {
			if (!hasOwn.call(obj, name)) {
				return void 0;
			} else if (gOPD) {
				return gOPD(obj, name).value;
			}
		}
		return obj[name];
	};
	extend = function extend() {
		var options, name, src, copy, copyIsArray, clone;
		var target = arguments[0];
		var i = 1;
		var length = arguments.length;
		var deep = false;
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			i = 2;
		}
		if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
			target = {};
		}
		for (; i < length; ++i) {
			options = arguments[i];
			if (options != null) {
				for (name in options) {
					src = getProperty(target, name);
					copy = getProperty(options, name);
					if (target !== copy) {
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && isArray(src) ? src : [];
							} else {
								clone = src && isPlainObject(src) ? src : {};
							}
							setProperty(target, { name: name, newValue: extend(deep, clone, copy) });
						} else if (typeof copy !== 'undefined') {
							setProperty(target, { name: name, newValue: copy });
						}
					}
				}
			}
		}
		return target;
	};
	return extend;
}

var isPlainObj;
var hasRequiredIsPlainObj;

function requireIsPlainObj () {
	if (hasRequiredIsPlainObj) return isPlainObj;
	hasRequiredIsPlainObj = 1;
	isPlainObj = value => {
		if (Object.prototype.toString.call(value) !== '[object Object]') {
			return false;
		}
		const prototype = Object.getPrototypeOf(value);
		return prototype === null || prototype === Object.prototype;
	};
	return isPlainObj;
}

var wrap_1;
var hasRequiredWrap;

function requireWrap () {
	if (hasRequiredWrap) return wrap_1;
	hasRequiredWrap = 1;
	var slice = [].slice;
	wrap_1 = wrap;
	function wrap(fn, callback) {
	  var invoked;
	  return wrapped
	  function wrapped() {
	    var params = slice.call(arguments, 0);
	    var callback = fn.length > params.length;
	    var result;
	    if (callback) {
	      params.push(done);
	    }
	    try {
	      result = fn.apply(null, params);
	    } catch (error) {
	      if (callback && invoked) {
	        throw error
	      }
	      return done(error)
	    }
	    if (!callback) {
	      if (result && typeof result.then === 'function') {
	        result.then(then, done);
	      } else if (result instanceof Error) {
	        done(result);
	      } else {
	        then(result);
	      }
	    }
	  }
	  function done() {
	    if (!invoked) {
	      invoked = true;
	      callback.apply(null, arguments);
	    }
	  }
	  function then(value) {
	    done(null, value);
	  }
	}
	return wrap_1;
}

var trough_1;
var hasRequiredTrough;

function requireTrough () {
	if (hasRequiredTrough) return trough_1;
	hasRequiredTrough = 1;
	var wrap = requireWrap();
	trough_1 = trough;
	trough.wrap = wrap;
	var slice = [].slice;
	function trough() {
	  var fns = [];
	  var middleware = {};
	  middleware.run = run;
	  middleware.use = use;
	  return middleware
	  function run() {
	    var index = -1;
	    var input = slice.call(arguments, 0, -1);
	    var done = arguments[arguments.length - 1];
	    if (typeof done !== 'function') {
	      throw new Error('Expected function as last argument, not ' + done)
	    }
	    next.apply(null, [null].concat(input));
	    function next(err) {
	      var fn = fns[++index];
	      var params = slice.call(arguments, 0);
	      var values = params.slice(1);
	      var length = input.length;
	      var pos = -1;
	      if (err) {
	        done(err);
	        return
	      }
	      while (++pos < length) {
	        if (values[pos] === null || values[pos] === undefined) {
	          values[pos] = input[pos];
	        }
	      }
	      input = values;
	      if (fn) {
	        wrap(fn, next).apply(null, input);
	      } else {
	        done.apply(null, [null].concat(input));
	      }
	    }
	  }
	  function use(fn) {
	    if (typeof fn !== 'function') {
	      throw new Error('Expected `fn` to be a function, not ' + fn)
	    }
	    fns.push(fn);
	    return middleware
	  }
	}
	return trough_1;
}

var vfileMessage;
var hasRequiredVfileMessage;

function requireVfileMessage () {
	if (hasRequiredVfileMessage) return vfileMessage;
	hasRequiredVfileMessage = 1;
	var stringify = requireUnistUtilStringifyPosition();
	vfileMessage = VMessage;
	function VMessagePrototype() {}
	VMessagePrototype.prototype = Error.prototype;
	VMessage.prototype = new VMessagePrototype();
	var proto = VMessage.prototype;
	proto.file = '';
	proto.name = '';
	proto.reason = '';
	proto.message = '';
	proto.stack = '';
	proto.fatal = null;
	proto.column = null;
	proto.line = null;
	function VMessage(reason, position, origin) {
	  var parts;
	  var range;
	  var location;
	  if (typeof position === 'string') {
	    origin = position;
	    position = null;
	  }
	  parts = parseOrigin(origin);
	  range = stringify(position) || '1:1';
	  location = {
	    start: {line: null, column: null},
	    end: {line: null, column: null}
	  };
	  if (position && position.position) {
	    position = position.position;
	  }
	  if (position) {
	    if (position.start) {
	      location = position;
	      position = position.start;
	    } else {
	      location.start = position;
	    }
	  }
	  if (reason.stack) {
	    this.stack = reason.stack;
	    reason = reason.message;
	  }
	  this.message = reason;
	  this.name = range;
	  this.reason = reason;
	  this.line = position ? position.line : null;
	  this.column = position ? position.column : null;
	  this.location = location;
	  this.source = parts[0];
	  this.ruleId = parts[1];
	}
	function parseOrigin(origin) {
	  var result = [null, null];
	  var index;
	  if (typeof origin === 'string') {
	    index = origin.indexOf(':');
	    if (index === -1) {
	      result[1] = origin;
	    } else {
	      result[0] = origin.slice(0, index);
	      result[1] = origin.slice(index + 1);
	    }
	  }
	  return result
	}
	return vfileMessage;
}

var minpath_browser = {};

var hasRequiredMinpath_browser;

function requireMinpath_browser () {
	if (hasRequiredMinpath_browser) return minpath_browser;
	hasRequiredMinpath_browser = 1;
	minpath_browser.basename = basename;
	minpath_browser.dirname = dirname;
	minpath_browser.extname = extname;
	minpath_browser.join = join;
	minpath_browser.sep = '/';
	function basename(path, ext) {
	  var start = 0;
	  var end = -1;
	  var index;
	  var firstNonSlashEnd;
	  var seenNonSlash;
	  var extIndex;
	  if (ext !== undefined && typeof ext !== 'string') {
	    throw new TypeError('"ext" argument must be a string')
	  }
	  assertPath(path);
	  index = path.length;
	  if (ext === undefined || !ext.length || ext.length > path.length) {
	    while (index--) {
	      if (path.charCodeAt(index) === 47 ) {
	        if (seenNonSlash) {
	          start = index + 1;
	          break
	        }
	      } else if (end < 0) {
	        seenNonSlash = true;
	        end = index + 1;
	      }
	    }
	    return end < 0 ? '' : path.slice(start, end)
	  }
	  if (ext === path) {
	    return ''
	  }
	  firstNonSlashEnd = -1;
	  extIndex = ext.length - 1;
	  while (index--) {
	    if (path.charCodeAt(index) === 47 ) {
	      if (seenNonSlash) {
	        start = index + 1;
	        break
	      }
	    } else {
	      if (firstNonSlashEnd < 0) {
	        seenNonSlash = true;
	        firstNonSlashEnd = index + 1;
	      }
	      if (extIndex > -1) {
	        if (path.charCodeAt(index) === ext.charCodeAt(extIndex--)) {
	          if (extIndex < 0) {
	            end = index;
	          }
	        } else {
	          extIndex = -1;
	          end = firstNonSlashEnd;
	        }
	      }
	    }
	  }
	  if (start === end) {
	    end = firstNonSlashEnd;
	  } else if (end < 0) {
	    end = path.length;
	  }
	  return path.slice(start, end)
	}
	function dirname(path) {
	  var end;
	  var unmatchedSlash;
	  var index;
	  assertPath(path);
	  if (!path.length) {
	    return '.'
	  }
	  end = -1;
	  index = path.length;
	  while (--index) {
	    if (path.charCodeAt(index) === 47 ) {
	      if (unmatchedSlash) {
	        end = index;
	        break
	      }
	    } else if (!unmatchedSlash) {
	      unmatchedSlash = true;
	    }
	  }
	  return end < 0
	    ? path.charCodeAt(0) === 47
	      ? '/'
	      : '.'
	    : end === 1 && path.charCodeAt(0) === 47
	    ? '//'
	    : path.slice(0, end)
	}
	function extname(path) {
	  var startDot = -1;
	  var startPart = 0;
	  var end = -1;
	  var preDotState = 0;
	  var unmatchedSlash;
	  var code;
	  var index;
	  assertPath(path);
	  index = path.length;
	  while (index--) {
	    code = path.charCodeAt(index);
	    if (code === 47 ) {
	      if (unmatchedSlash) {
	        startPart = index + 1;
	        break
	      }
	      continue
	    }
	    if (end < 0) {
	      unmatchedSlash = true;
	      end = index + 1;
	    }
	    if (code === 46 ) {
	      if (startDot < 0) {
	        startDot = index;
	      } else if (preDotState !== 1) {
	        preDotState = 1;
	      }
	    } else if (startDot > -1) {
	      preDotState = -1;
	    }
	  }
	  if (
	    startDot < 0 ||
	    end < 0 ||
	    preDotState === 0 ||
	    (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)
	  ) {
	    return ''
	  }
	  return path.slice(startDot, end)
	}
	function join() {
	  var index = -1;
	  var joined;
	  while (++index < arguments.length) {
	    assertPath(arguments[index]);
	    if (arguments[index]) {
	      joined =
	        joined === undefined
	          ? arguments[index]
	          : joined + '/' + arguments[index];
	    }
	  }
	  return joined === undefined ? '.' : normalize(joined)
	}
	function normalize(path) {
	  var absolute;
	  var value;
	  assertPath(path);
	  absolute = path.charCodeAt(0) === 47;
	  value = normalizeString(path, !absolute);
	  if (!value.length && !absolute) {
	    value = '.';
	  }
	  if (value.length && path.charCodeAt(path.length - 1) === 47 ) {
	    value += '/';
	  }
	  return absolute ? '/' + value : value
	}
	function normalizeString(path, allowAboveRoot) {
	  var result = '';
	  var lastSegmentLength = 0;
	  var lastSlash = -1;
	  var dots = 0;
	  var index = -1;
	  var code;
	  var lastSlashIndex;
	  while (++index <= path.length) {
	    if (index < path.length) {
	      code = path.charCodeAt(index);
	    } else if (code === 47 ) {
	      break
	    } else {
	      code = 47;
	    }
	    if (code === 47 ) {
	      if (lastSlash === index - 1 || dots === 1) ; else if (lastSlash !== index - 1 && dots === 2) {
	        if (
	          result.length < 2 ||
	          lastSegmentLength !== 2 ||
	          result.charCodeAt(result.length - 1) !== 46  ||
	          result.charCodeAt(result.length - 2) !== 46
	        ) {
	          if (result.length > 2) {
	            lastSlashIndex = result.lastIndexOf('/');
	            if (lastSlashIndex !== result.length - 1) {
	              if (lastSlashIndex < 0) {
	                result = '';
	                lastSegmentLength = 0;
	              } else {
	                result = result.slice(0, lastSlashIndex);
	                lastSegmentLength = result.length - 1 - result.lastIndexOf('/');
	              }
	              lastSlash = index;
	              dots = 0;
	              continue
	            }
	          } else if (result.length) {
	            result = '';
	            lastSegmentLength = 0;
	            lastSlash = index;
	            dots = 0;
	            continue
	          }
	        }
	        if (allowAboveRoot) {
	          result = result.length ? result + '/..' : '..';
	          lastSegmentLength = 2;
	        }
	      } else {
	        if (result.length) {
	          result += '/' + path.slice(lastSlash + 1, index);
	        } else {
	          result = path.slice(lastSlash + 1, index);
	        }
	        lastSegmentLength = index - lastSlash - 1;
	      }
	      lastSlash = index;
	      dots = 0;
	    } else if (code === 46  && dots > -1) {
	      dots++;
	    } else {
	      dots = -1;
	    }
	  }
	  return result
	}
	function assertPath(path) {
	  if (typeof path !== 'string') {
	    throw new TypeError(
	      'Path must be a string. Received ' + JSON.stringify(path)
	    )
	  }
	}
	return minpath_browser;
}

var minproc_browser = {};

var hasRequiredMinproc_browser;

function requireMinproc_browser () {
	if (hasRequiredMinproc_browser) return minproc_browser;
	hasRequiredMinproc_browser = 1;
	minproc_browser.cwd = cwd;
	function cwd() {
	  return '/'
	}
	return minproc_browser;
}

var core;
var hasRequiredCore;

function requireCore () {
	if (hasRequiredCore) return core;
	hasRequiredCore = 1;
	var p = requireMinpath_browser();
	var proc = requireMinproc_browser();
	var buffer = requireIsBuffer();
	core = VFile;
	var own = {}.hasOwnProperty;
	var order = ['history', 'path', 'basename', 'stem', 'extname', 'dirname'];
	VFile.prototype.toString = toString;
	Object.defineProperty(VFile.prototype, 'path', {get: getPath, set: setPath});
	Object.defineProperty(VFile.prototype, 'dirname', {
	  get: getDirname,
	  set: setDirname
	});
	Object.defineProperty(VFile.prototype, 'basename', {
	  get: getBasename,
	  set: setBasename
	});
	Object.defineProperty(VFile.prototype, 'extname', {
	  get: getExtname,
	  set: setExtname
	});
	Object.defineProperty(VFile.prototype, 'stem', {get: getStem, set: setStem});
	function VFile(options) {
	  var prop;
	  var index;
	  if (!options) {
	    options = {};
	  } else if (typeof options === 'string' || buffer(options)) {
	    options = {contents: options};
	  } else if ('message' in options && 'messages' in options) {
	    return options
	  }
	  if (!(this instanceof VFile)) {
	    return new VFile(options)
	  }
	  this.data = {};
	  this.messages = [];
	  this.history = [];
	  this.cwd = proc.cwd();
	  index = -1;
	  while (++index < order.length) {
	    prop = order[index];
	    if (own.call(options, prop)) {
	      this[prop] = options[prop];
	    }
	  }
	  for (prop in options) {
	    if (order.indexOf(prop) < 0) {
	      this[prop] = options[prop];
	    }
	  }
	}
	function getPath() {
	  return this.history[this.history.length - 1]
	}
	function setPath(path) {
	  assertNonEmpty(path, 'path');
	  if (this.path !== path) {
	    this.history.push(path);
	  }
	}
	function getDirname() {
	  return typeof this.path === 'string' ? p.dirname(this.path) : undefined
	}
	function setDirname(dirname) {
	  assertPath(this.path, 'dirname');
	  this.path = p.join(dirname || '', this.basename);
	}
	function getBasename() {
	  return typeof this.path === 'string' ? p.basename(this.path) : undefined
	}
	function setBasename(basename) {
	  assertNonEmpty(basename, 'basename');
	  assertPart(basename, 'basename');
	  this.path = p.join(this.dirname || '', basename);
	}
	function getExtname() {
	  return typeof this.path === 'string' ? p.extname(this.path) : undefined
	}
	function setExtname(extname) {
	  assertPart(extname, 'extname');
	  assertPath(this.path, 'extname');
	  if (extname) {
	    if (extname.charCodeAt(0) !== 46 ) {
	      throw new Error('`extname` must start with `.`')
	    }
	    if (extname.indexOf('.', 1) > -1) {
	      throw new Error('`extname` cannot contain multiple dots')
	    }
	  }
	  this.path = p.join(this.dirname, this.stem + (extname || ''));
	}
	function getStem() {
	  return typeof this.path === 'string'
	    ? p.basename(this.path, this.extname)
	    : undefined
	}
	function setStem(stem) {
	  assertNonEmpty(stem, 'stem');
	  assertPart(stem, 'stem');
	  this.path = p.join(this.dirname || '', stem + (this.extname || ''));
	}
	function toString(encoding) {
	  return (this.contents || '').toString(encoding)
	}
	function assertPart(part, name) {
	  if (part && part.indexOf(p.sep) > -1) {
	    throw new Error(
	      '`' + name + '` cannot be a path: did not expect `' + p.sep + '`'
	    )
	  }
	}
	function assertNonEmpty(part, name) {
	  if (!part) {
	    throw new Error('`' + name + '` cannot be empty')
	  }
	}
	function assertPath(path, name) {
	  if (!path) {
	    throw new Error('Setting `' + name + '` requires `path` to be set too')
	  }
	}
	return core;
}

var lib;
var hasRequiredLib;

function requireLib () {
	if (hasRequiredLib) return lib;
	hasRequiredLib = 1;
	var VMessage = requireVfileMessage();
	var VFile = requireCore();
	lib = VFile;
	VFile.prototype.message = message;
	VFile.prototype.info = info;
	VFile.prototype.fail = fail;
	function message(reason, position, origin) {
	  var message = new VMessage(reason, position, origin);
	  if (this.path) {
	    message.name = this.path + ':' + message.name;
	    message.file = this.path;
	  }
	  message.fatal = false;
	  this.messages.push(message);
	  return message
	}
	function fail() {
	  var message = this.message.apply(this, arguments);
	  message.fatal = true;
	  throw message
	}
	function info() {
	  var message = this.message.apply(this, arguments);
	  message.fatal = null;
	  return message
	}
	return lib;
}

var vfile;
var hasRequiredVfile;

function requireVfile () {
	if (hasRequiredVfile) return vfile;
	hasRequiredVfile = 1;
	vfile = requireLib();
	return vfile;
}

var unified_1;
var hasRequiredUnified;

function requireUnified () {
	if (hasRequiredUnified) return unified_1;
	hasRequiredUnified = 1;
	var bail = requireBail();
	var buffer = requireIsBuffer();
	var extend = requireExtend();
	var plain = requireIsPlainObj();
	var trough = requireTrough();
	var vfile = requireVfile();
	unified_1 = unified().freeze();
	var slice = [].slice;
	var own = {}.hasOwnProperty;
	var pipeline = trough()
	  .use(pipelineParse)
	  .use(pipelineRun)
	  .use(pipelineStringify);
	function pipelineParse(p, ctx) {
	  ctx.tree = p.parse(ctx.file);
	}
	function pipelineRun(p, ctx, next) {
	  p.run(ctx.tree, ctx.file, done);
	  function done(error, tree, file) {
	    if (error) {
	      next(error);
	    } else {
	      ctx.tree = tree;
	      ctx.file = file;
	      next();
	    }
	  }
	}
	function pipelineStringify(p, ctx) {
	  var result = p.stringify(ctx.tree, ctx.file);
	  if (result === undefined || result === null) ; else if (typeof result === 'string' || buffer(result)) {
	    if ('value' in ctx.file) {
	      ctx.file.value = result;
	    }
	    ctx.file.contents = result;
	  } else {
	    ctx.file.result = result;
	  }
	}
	function unified() {
	  var attachers = [];
	  var transformers = trough();
	  var namespace = {};
	  var freezeIndex = -1;
	  var frozen;
	  processor.data = data;
	  processor.freeze = freeze;
	  processor.attachers = attachers;
	  processor.use = use;
	  processor.parse = parse;
	  processor.stringify = stringify;
	  processor.run = run;
	  processor.runSync = runSync;
	  processor.process = process;
	  processor.processSync = processSync;
	  return processor
	  function processor() {
	    var destination = unified();
	    var index = -1;
	    while (++index < attachers.length) {
	      destination.use.apply(null, attachers[index]);
	    }
	    destination.data(extend(true, {}, namespace));
	    return destination
	  }
	  function freeze() {
	    var values;
	    var transformer;
	    if (frozen) {
	      return processor
	    }
	    while (++freezeIndex < attachers.length) {
	      values = attachers[freezeIndex];
	      if (values[1] === false) {
	        continue
	      }
	      if (values[1] === true) {
	        values[1] = undefined;
	      }
	      transformer = values[0].apply(processor, values.slice(1));
	      if (typeof transformer === 'function') {
	        transformers.use(transformer);
	      }
	    }
	    frozen = true;
	    freezeIndex = Infinity;
	    return processor
	  }
	  function data(key, value) {
	    if (typeof key === 'string') {
	      if (arguments.length === 2) {
	        assertUnfrozen('data', frozen);
	        namespace[key] = value;
	        return processor
	      }
	      return (own.call(namespace, key) && namespace[key]) || null
	    }
	    if (key) {
	      assertUnfrozen('data', frozen);
	      namespace = key;
	      return processor
	    }
	    return namespace
	  }
	  function use(value) {
	    var settings;
	    assertUnfrozen('use', frozen);
	    if (value === null || value === undefined) ; else if (typeof value === 'function') {
	      addPlugin.apply(null, arguments);
	    } else if (typeof value === 'object') {
	      if ('length' in value) {
	        addList(value);
	      } else {
	        addPreset(value);
	      }
	    } else {
	      throw new Error('Expected usable value, not `' + value + '`')
	    }
	    if (settings) {
	      namespace.settings = extend(namespace.settings || {}, settings);
	    }
	    return processor
	    function addPreset(result) {
	      addList(result.plugins);
	      if (result.settings) {
	        settings = extend(settings || {}, result.settings);
	      }
	    }
	    function add(value) {
	      if (typeof value === 'function') {
	        addPlugin(value);
	      } else if (typeof value === 'object') {
	        if ('length' in value) {
	          addPlugin.apply(null, value);
	        } else {
	          addPreset(value);
	        }
	      } else {
	        throw new Error('Expected usable value, not `' + value + '`')
	      }
	    }
	    function addList(plugins) {
	      var index = -1;
	      if (plugins === null || plugins === undefined) ; else if (typeof plugins === 'object' && 'length' in plugins) {
	        while (++index < plugins.length) {
	          add(plugins[index]);
	        }
	      } else {
	        throw new Error('Expected a list of plugins, not `' + plugins + '`')
	      }
	    }
	    function addPlugin(plugin, value) {
	      var entry = find(plugin);
	      if (entry) {
	        if (plain(entry[1]) && plain(value)) {
	          value = extend(true, entry[1], value);
	        }
	        entry[1] = value;
	      } else {
	        attachers.push(slice.call(arguments));
	      }
	    }
	  }
	  function find(plugin) {
	    var index = -1;
	    while (++index < attachers.length) {
	      if (attachers[index][0] === plugin) {
	        return attachers[index]
	      }
	    }
	  }
	  function parse(doc) {
	    var file = vfile(doc);
	    var Parser;
	    freeze();
	    Parser = processor.Parser;
	    assertParser('parse', Parser);
	    if (newable(Parser, 'parse')) {
	      return new Parser(String(file), file).parse()
	    }
	    return Parser(String(file), file)
	  }
	  function run(node, file, cb) {
	    assertNode(node);
	    freeze();
	    if (!cb && typeof file === 'function') {
	      cb = file;
	      file = null;
	    }
	    if (!cb) {
	      return new Promise(executor)
	    }
	    executor(null, cb);
	    function executor(resolve, reject) {
	      transformers.run(node, vfile(file), done);
	      function done(error, tree, file) {
	        tree = tree || node;
	        if (error) {
	          reject(error);
	        } else if (resolve) {
	          resolve(tree);
	        } else {
	          cb(null, tree, file);
	        }
	      }
	    }
	  }
	  function runSync(node, file) {
	    var result;
	    var complete;
	    run(node, file, done);
	    assertDone('runSync', 'run', complete);
	    return result
	    function done(error, tree) {
	      complete = true;
	      result = tree;
	      bail(error);
	    }
	  }
	  function stringify(node, doc) {
	    var file = vfile(doc);
	    var Compiler;
	    freeze();
	    Compiler = processor.Compiler;
	    assertCompiler('stringify', Compiler);
	    assertNode(node);
	    if (newable(Compiler, 'compile')) {
	      return new Compiler(node, file).compile()
	    }
	    return Compiler(node, file)
	  }
	  function process(doc, cb) {
	    freeze();
	    assertParser('process', processor.Parser);
	    assertCompiler('process', processor.Compiler);
	    if (!cb) {
	      return new Promise(executor)
	    }
	    executor(null, cb);
	    function executor(resolve, reject) {
	      var file = vfile(doc);
	      pipeline.run(processor, {file: file}, done);
	      function done(error) {
	        if (error) {
	          reject(error);
	        } else if (resolve) {
	          resolve(file);
	        } else {
	          cb(null, file);
	        }
	      }
	    }
	  }
	  function processSync(doc) {
	    var file;
	    var complete;
	    freeze();
	    assertParser('processSync', processor.Parser);
	    assertCompiler('processSync', processor.Compiler);
	    file = vfile(doc);
	    process(file, done);
	    assertDone('processSync', 'process', complete);
	    return file
	    function done(error) {
	      complete = true;
	      bail(error);
	    }
	  }
	}
	function newable(value, name) {
	  return (
	    typeof value === 'function' &&
	    value.prototype &&
	    (keys(value.prototype) || name in value.prototype)
	  )
	}
	function keys(value) {
	  var key;
	  for (key in value) {
	    return true
	  }
	  return false
	}
	function assertParser(name, Parser) {
	  if (typeof Parser !== 'function') {
	    throw new Error('Cannot `' + name + '` without `Parser`')
	  }
	}
	function assertCompiler(name, Compiler) {
	  if (typeof Compiler !== 'function') {
	    throw new Error('Cannot `' + name + '` without `Compiler`')
	  }
	}
	function assertUnfrozen(name, frozen) {
	  if (frozen) {
	    throw new Error(
	      'Cannot invoke `' +
	        name +
	        '` on a frozen processor.\nCreate a new processor first, by invoking it: use `processor()` instead of `processor`.'
	    )
	  }
	}
	function assertNode(node) {
	  if (!node || typeof node.type !== 'string') {
	    throw new Error('Expected node, got `' + node + '`')
	  }
	}
	function assertDone(name, asyncName, complete) {
	  if (!complete) {
	    throw new Error(
	      '`' + name + '` finished async. Use `' + asyncName + '` instead'
	    )
	  }
	}
	return unified_1;
}

var unistUtilRemove;
var hasRequiredUnistUtilRemove;

function requireUnistUtilRemove () {
	if (hasRequiredUnistUtilRemove) return unistUtilRemove;
	hasRequiredUnistUtilRemove = 1;
	var convert = requireConvert$1();
	unistUtilRemove = remove;
	function remove(tree, options, test) {
	  var is = convert(test || options);
	  var cascade = options.cascade == null ? true : options.cascade;
	  return preorder(tree, null, null)
	  function preorder(node, index, parent) {
	    var children = node.children;
	    var childIndex = -1;
	    var position = 0;
	    if (is(node, index, parent)) {
	      return null
	    }
	    if (children && children.length) {
	      while (++childIndex < children.length) {
	        if (preorder(children[childIndex], childIndex, node)) {
	          children[position++] = children[childIndex];
	        }
	      }
	      if (cascade && !position) {
	        return null
	      }
	      children.length = position;
	    }
	    return node
	  }
	}
	return unistUtilRemove;
}

var definitions;
var hasRequiredDefinitions;

function requireDefinitions () {
	if (hasRequiredDefinitions) return definitions;
	hasRequiredDefinitions = 1;
	const remove = requireUnistUtilRemove();
	const visit = requireUnistUtilVisit();
	const collectDefinitions = definitions => tree => {
		visit(tree, 'definition', node => {
			definitions[node.identifier] = {
				title: node.title,
				url: node.url,
			};
		});
	};
	const removeDefinitions = () => tree => {
		remove(tree, { cascade: true }, 'definition');
	};
	definitions = {
		collectDefinitions,
		removeDefinitions,
	};
	return definitions;
}

var mdastUtilGfmTable = {};

var hasRequiredMdastUtilGfmTable;

function requireMdastUtilGfmTable () {
	if (hasRequiredMdastUtilGfmTable) return mdastUtilGfmTable;
	hasRequiredMdastUtilGfmTable = 1;
	mdastUtilGfmTable.fromMarkdown = requireFromMarkdown$2();
	mdastUtilGfmTable.toMarkdown = requireToMarkdown$2();
	return mdastUtilGfmTable;
}

const __viteBrowserExternal = {};

const __viteBrowserExternal$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: 'Module' }));

const require$$0 = /*@__PURE__*/getAugmentedNamespace(__viteBrowserExternal$1);

var utils;
var hasRequiredUtils;

function requireUtils () {
	if (hasRequiredUtils) return utils;
	hasRequiredUtils = 1;
	const { URL } = require$$0;
	function wrap(string, ...wrappers) {
		return [
			...wrappers,
			string,
			...wrappers.reverse(),
		].join('');
	}
	function isURL(string) {
		try {
			return Boolean(new URL(string));
		} catch (error) {
			return false;
		}
	}
	function escapeSymbols(text, textType = 'text') {
		if (!text) {
			return text;
		}
		switch (textType) {
			case 'code':
				return text
					.replace(/\\/g, '\\\\')
					.replace(/`/g, '\\`')
			case 'link':
				return text
					.replace(/\\/g, '\\\\')
					.replace(/\(/g, '\\(')
					.replace(/\)/g, '\\)')
			default:
				return text
					.replace(/_/g, '\\_')
					.replace(/\*/g, '\\*')
					.replace(/\[/g, '\\[')
					.replace(/]/g, '\\]')
					.replace(/\(/g, '\\(')
					.replace(/\)/g, '\\)')
					.replace(/~/g, '\\~')
					.replace(/`/g, '\\`')
					.replace(/>/g, '\\>')
					.replace(/#/g, '\\#')
					.replace(/\+/g, '\\+')
					.replace(/-/g, '\\-')
					.replace(/=/g, '\\=')
					.replace(/\|/g, '\\|')
					.replace(/{/g, '\\{')
					.replace(/}/g, '\\}')
					.replace(/\./g, '\\.')
					.replace(/!/g, '\\!');
		}
	}
	function processUnsupportedTags(content, strategy) {
		switch (strategy) {
			case 'escape':
				return escapeSymbols(content);
			case 'remove':
				return '';
			case 'keep':
			default:
				return content;
		}
	}
	utils = {
		wrap,
		isURL,
		escapeSymbols,
		processUnsupportedTags,
	};
	return utils;
}

var telegramify;
var hasRequiredTelegramify;

function requireTelegramify () {
	if (hasRequiredTelegramify) return telegramify;
	hasRequiredTelegramify = 1;
	const defaultHandlers = requireHandle();
	const phrasing = requireContainerPhrasing();
	const {toMarkdown: gfmTableToMarkdown} = requireMdastUtilGfmTable();
	const {wrap, isURL, escapeSymbols, processUnsupportedTags} = requireUtils();
	const createHandlers = (definitions, unsupportedTagsStrategy) => ({
		heading: (node, _parent, context) => {
			const marker = '*';
			const exit = context.enter('heading');
			const value = phrasing(node, context, {before: marker, after: marker});
			exit();
			return wrap(value, marker);
		},
		strong: (node, _parent, context) => {
			const marker = '*';
			const exit = context.enter('strong');
			const value = phrasing(node, context, {before: marker, after: marker});
			exit();
			return wrap(value, marker);
		},
		delete(node, _parent, context) {
			const marker = '~';
			const exit = context.enter('delete');
			const value = phrasing(node, context, {before: marker, after: marker});
			exit();
			return wrap(value, marker);
		},
		emphasis: (node, _parent, context) => {
			const marker = '_';
			const exit = context.enter('emphasis');
			const value = phrasing(node, context, {before: marker, after: marker});
			exit();
			return wrap(value, marker);
		},
		list: (...args) => defaultHandlers.list(...args).replace(/^(\d+)./gm, '$1\\.'),
		listItem: (...args) => defaultHandlers.listItem(...args).replace(/^\*/, '•'),
		code(node, _parent, context) {
			const exit = context.enter('code');
			const content = node.value.replace(/^#![a-z]+\n/, '');
			exit();
			return wrap(escapeSymbols(content, 'code'), '```', '\n')
		},
		link: (node, _parent, context) => {
			const exit = context.enter('link');
			const text = phrasing(node, context, {before: '|', after: '>'}) || escapeSymbols(node.title);
			const isUrlEncoded = decodeURI(node.url) !== node.url;
			const url = isUrlEncoded ? node.url : encodeURI(node.url);
			exit();
			if (!isURL(url)) return escapeSymbols(text) || escapeSymbols(url);
			return text
				? `[${text}](${escapeSymbols(url, 'link')})`
				: `[${escapeSymbols(url)}](${escapeSymbols(url, 'link')})`;
		},
		linkReference: (node, _parent, context) => {
			const exit = context.enter('linkReference');
			const definition = definitions[node.identifier];
			const text = phrasing(node, context, {before: '|', after: '>'}) || (definition ? definition.title : null);
			exit();
			if (!definition || !isURL(definition.url)) return escapeSymbols(text);
			return text
				? `[${text}](${escapeSymbols(definition.url, 'link')})`
				: `[${escapeSymbols(definition.url)}](${escapeSymbols(definition.url, 'link')})`;
		},
		image: (node, _parent, context) => {
			const exit = context.enter('image');
			const text = node.alt || node.title;
			const url = node.url;
			exit();
			if (!isURL(url)) return escapeSymbols(text) || escapeSymbols(url);
			return text
				? `[${escapeSymbols(text)}](${escapeSymbols(url, 'link')})`
				: `[${escapeSymbols(url)}](${escapeSymbols(url, 'link')})`;
		},
		imageReference: (node, _parent, context) => {
			const exit = context.enter('imageReference');
			const definition = definitions[node.identifier];
			const text = node.alt || (definition ? definition.title : null);
			exit();
			if (!definition || !isURL(definition.url)) return escapeSymbols(text);
			return text
				? `[${escapeSymbols(text)}](${escapeSymbols(definition.url, 'link')})`
				: `[${escapeSymbols(definition.url)}](${escapeSymbols(definition.url, 'link')})`;
		},
		text: (node, _parent, context) => {
			const exit = context.enter('text');
			const text = node.value;
			exit();
			return escapeSymbols(text);
		},
		blockquote: (node, _parent, context) =>
			processUnsupportedTags(defaultHandlers.blockquote(node, _parent, context), unsupportedTagsStrategy),
		html: (node, _parent, context) =>
			processUnsupportedTags(defaultHandlers.html(node, _parent, context), unsupportedTagsStrategy),
		table: (node, _parent, context) =>
			processUnsupportedTags(gfmTableToMarkdown().handlers.table(node, _parent, context), unsupportedTagsStrategy),
	});
	const createOptions = (definitions, unsupportedTagsStrategy) => ({
		bullet: '*',
		tightDefinitions: true,
		handlers: createHandlers(definitions, unsupportedTagsStrategy),
	});
	telegramify = createOptions;
	return telegramify;
}

var convert$1;
var hasRequiredConvert;

function requireConvert () {
	if (hasRequiredConvert) return convert$1;
	hasRequiredConvert = 1;
	const gfm = requireRemarkGfm();
	const parse = requireRemarkParse();
	const stringify = requireRemarkStringify();
	const removeComments = requireRemarkRemoveComments();
	const unified = requireUnified();
	const { collectDefinitions, removeDefinitions } = requireDefinitions();
	const createTelegramifyOptions = requireTelegramify();
	convert$1 = (markdown, unsupportedTagsStrategy) => {
		const definitions = {};
		const telegramifyOptions = createTelegramifyOptions(definitions, unsupportedTagsStrategy);
		return unified()
			.use(parse)
			.use(gfm)
			.use(removeComments)
			.use(collectDefinitions, definitions)
			.use(removeDefinitions)
			.use(stringify, telegramifyOptions)
			.processSync(markdown)
			.toString()
			.replace(/<!---->\n/gi, '');
	};
	return convert$1;
}

var telegramifyMarkdown;
var hasRequiredTelegramifyMarkdown;

function requireTelegramifyMarkdown () {
	if (hasRequiredTelegramifyMarkdown) return telegramifyMarkdown;
	hasRequiredTelegramifyMarkdown = 1;
	telegramifyMarkdown = requireConvert();
	return telegramifyMarkdown;
}

var telegramifyMarkdownExports = requireTelegramifyMarkdown();
const convert = /*@__PURE__*/getDefaultExportFromCjs(telegramifyMarkdownExports);

ENV.DEFAULT_PARSE_MODE = "MarkdownV2";
ENV.CUSTOM_MESSAGE_RENDER = (parse_mode, message) => {
  if (parse_mode === "MarkdownV2") {
    return convert(message, "remove");
  }
  return message;
};

export { Workers as default };
//# sourceMappingURL=index.js.map
