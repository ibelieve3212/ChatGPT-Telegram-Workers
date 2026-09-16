import type * as Telegram from 'telegram-bot-api-types';
import type { TelegramBotAPI } from '../api';
import { ENV } from '#/config';
import { markdownToHtml } from '#/utils/markdown';
import { createTelegramBotAPI } from '../api';

class MessageContext implements Record<string, any> {
    chat_id: number;
    message_id: number | null = null; // 当前发生的消息，用于后续编辑
    reply_to_message_id: number | null = null;
    parse_mode: Telegram.ParseMode | null = null;
    allow_sending_without_reply: boolean | null = null;
    disable_web_page_preview: boolean | null = null;

    constructor(chatID: number) {
        this.chat_id = chatID;
    }

    static fromMessage(message: Telegram.Message): MessageContext {
        const ctx = new MessageContext(message.chat.id);
        if (message.chat.type === 'group' || message.chat.type === 'supergroup') {
            ctx.reply_to_message_id = message.message_id;
            ctx.allow_sending_without_reply = true;
        } else {
            ctx.reply_to_message_id = null;
        }
        return ctx;
    }

    static fromCallbackQuery(callbackQuery: Telegram.CallbackQuery): MessageContext {
        const chat = callbackQuery.message?.chat;
        if (!chat) {
            throw new Error('Chat not found');
        }
        const ctx = new MessageContext(chat.id);
        if (chat.type === 'group' || chat.type === 'supergroup') {
            ctx.reply_to_message_id = callbackQuery.message!.message_id;
            ctx.allow_sending_without_reply = true;
        } else {
            ctx.reply_to_message_id = null;
        }
        return ctx;
    }
}

export class MessageSender {
    api: TelegramBotAPI;
    context: MessageContext;
    // 记录最近一次回复发送的所有消息 id, 供 /clear 命令整组清理(拆分长消息时会发送多条)
    private sentMessageIds: number[] = [];

    constructor(token: string, context: MessageContext) {
        this.api = createTelegramBotAPI(token);
        this.context = context;
        this.sendRichText = this.sendRichText.bind(this);
        this.sendPlainText = this.sendPlainText.bind(this);
        this.sendPhoto = this.sendPhoto.bind(this);
    }

    // 获取本次回复已发送的所有消息 id, 并清空缓存
    getSentMessageIds(): number[] {
        const ids = this.sentMessageIds;
        this.sentMessageIds = [];
        return ids;
    }

    // 从响应中提取 message_id 并记录(clone 避免消费原始 body), 自动去重避免多次编辑重复记录
    private async recordSentMessageId(resp: Response): Promise<void> {
        try {
            const json = await resp.clone().json() as Telegram.ResponseWithMessage;
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

    static fromMessage(token: string, message: Telegram.Message): MessageSender {
        return new MessageSender(token, MessageContext.fromMessage(message));
    }

    static fromCallbackQuery(token: string, callbackQuery: Telegram.CallbackQuery): MessageSender {
        return new MessageSender(token, MessageContext.fromCallbackQuery(callbackQuery));
    }

    static fromUpdate(token: string, update: Telegram.Update): MessageSender {
        if (update.callback_query) {
            return MessageSender.fromCallbackQuery(token, update.callback_query);
        }
        if (update.message) {
            return MessageSender.fromMessage(token, update.message);
        }
        throw new Error('Invalid update');
    }

    update(context: MessageContext | Record<string, any>): MessageSender {
        if (!this.context) {
            this.context = context as any;
            return this;
        }
        for (const key in context) {
            (this.context as any)[key] = (context as any)[key];
        }
        return this;
    }

    private async sendMessage(message: string, context: MessageContext, fallbackText?: string): Promise<Response> {
        const doSend = async (text: string, parseMode: Telegram.ParseMode | null) => {
            if (context?.message_id) {
                const params: Telegram.EditMessageTextParams = {
                    chat_id: context.chat_id,
                    message_id: context.message_id,
                    parse_mode: parseMode || undefined,
                    text,
                };
                if (context.disable_web_page_preview) {
                    params.link_preview_options = {
                        is_disabled: true,
                    };
                }
                return this.api.editMessageText(params);
            } else {
                const params: Telegram.SendMessageParams = {
                    chat_id: context.chat_id,
                    parse_mode: parseMode || undefined,
                    text,
                };
                if (context.reply_to_message_id) {
                    params.reply_parameters = {
                        message_id: context.reply_to_message_id,
                        chat_id: context.chat_id,
                        allow_sending_without_reply: context.allow_sending_without_reply || undefined,
                    };
                }
                if (context.disable_web_page_preview) {
                    params.link_preview_options = {
                        is_disabled: true,
                    };
                }
                return this.api.sendMessage(params);
            }
        };

        const parseMode = context.parse_mode;
        let resp = await doSend(message, parseMode);

        if (resp.status === 429) {
            const retryAfter = Number.parseInt(resp.headers.get('Retry-After') || '');
            if (retryAfter > 0 && retryAfter <= 10) {
                await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
                resp = await doSend(message, parseMode);
            }
        }

        // HTML 解析失败 (400) 时降级纯文本重发
        // 降级用原始 markdown 文本, 而非转换后的 HTML 标签字符串
        // 常见原因: markdown 不完整导致转换出无效 HTML
        if (resp.status === 400 && parseMode) {
            console.error('[sendMessage] HTML parse failed, retrying as plain text');
            // 优先用 fallbackText (原始 markdown), 没有则用 message (已是渲染后文本)
            resp = await doSend(fallbackText || message, null);
        }
        return resp;
    }

    private renderMessage(parse_mode: Telegram.ParseMode | null, message: string): string {
        if (ENV.CUSTOM_MESSAGE_RENDER) {
            return ENV.CUSTOM_MESSAGE_RENDER(parse_mode, message);
        }
        // HTML 模式: 将 markdown 转换为 Telegram HTML
        if (parse_mode === 'HTML') {
            return markdownToHtml(message);
        }
        return message;
    }

    // 以 Telegram Rich Message 发送超长消息(Bot API 10.1+):
    // 一条整发不拆分, GFM markdown 由客户端原生渲染。
    // 任何失败(旧版 API server/网络异常/参数错误)返回 null, 由调用方降级。
    private async trySendRichMessage(message: string, context: MessageContext): Promise<Response | null> {
        try {
            const params: Telegram.SendRichMessageParams = {
                chat_id: context.chat_id,
                rich_message: { markdown: message },
            };
            if (context.reply_to_message_id) {
                params.reply_parameters = {
                    message_id: context.reply_to_message_id,
                    chat_id: context.chat_id,
                    allow_sending_without_reply: context.allow_sending_without_reply || undefined,
                };
            }
            return await this.api.sendRichMessage(params);
        } catch (e) {
            console.error('[sendRichMessage] request error:', e);
            return null;
        }
    }

    // 判断错误是否为 Rich Message 结构/体积超限(BLOCKS_TOO_MANY / TOO_LARGE / TEXT_TOO_LONG 等)。
    // 这类错误可通过拆分成多条 Rich Message 解决; 其他错误(404 方法不存在/参数格式错误)拆分无意义。
    private isRichMessageSizeError(resp: Response | null): boolean {
        if (!resp) {
            return false;
        }
        // 不能消费 body 两次, 用 clone; 同步 peek 不 await text() 以保持该方法纯同步判断
        // 这里仅在 resp 非 null 时粗判 status===400 且 body 含已知超限错误码
        return resp.status === 400;
    }

    // 按段落边界(双换行)拆分 markdown, 每段不超过 maxChars 字符, 返回片段数组。
    // 不会切断代码块中间(代码块用 ``` 围起, 在块边界外拆分); 不保证 block 数不超, 由调用方重试兜底。
    private splitMarkdownByParagraphs(message: string, maxChars: number): string[] {
        const paragraphs = message.split(/\n\n+/);
        const chunks: string[] = [];
        let current = '';
        for (const para of paragraphs) {
            // 单个段落本身超限时, 按行强制二次切分
            if (para.length > maxChars) {
                if (current) {
                    chunks.push(current);
                    current = '';
                }
                const lines = para.split('\n');
                let sub = '';
                for (const line of lines) {
                    if ((sub + '\n' + line).length > maxChars) {
                        if (sub) chunks.push(sub);
                        // 单行超限直接整行作为一个片段(代码行/长段落)
                        if (line.length > maxChars) {
                            chunks.push(line);
                            sub = '';
                        } else {
                            sub = line;
                        }
                    } else {
                        sub = sub ? sub + '\n' + line : line;
                    }
                }
                if (sub) chunks.push(sub);
                continue;
            }
            if ((current + '\n\n' + para).length > maxChars) {
                if (current) chunks.push(current);
                current = para;
            } else {
                current = current ? current + '\n\n' + para : para;
            }
        }
        if (current) chunks.push(current);
        return chunks.length > 0 ? chunks : [message];
    }

    // 拆分成多条 Rich Message 逐条发送(用于一条整发遇到 BLOCKS_TOO_MANY 等超限错误时)。
    // 仅第一条带 reply_parameters(保留群聊回复引用); 每条成功都记录 message_id。
    // 返回最后一条 Response(用于流程衔接), 或 null 表示全部失败。
    private async trySendRichMessageChunked(message: string, context: MessageContext): Promise<Response | null> {
        // 单条 Rich Message 文本上限 32768 字符, 留余量用 28000; block 上限 500, 按字符拆通常远低于此
        const chunks = this.splitMarkdownByParagraphs(message, 28000);
        if (chunks.length <= 1) {
            // 拆不动(单段就超限), 不再重试, 由调用方降级纯文本
            return null;
        }
        let lastResp: Response | null = null;
        let successCount = 0;
        for (let i = 0; i < chunks.length; i++) {
            try {
                const params: Telegram.SendRichMessageParams = {
                    chat_id: context.chat_id,
                    rich_message: { markdown: chunks[i] },
                };
                // 仅第一条带回复引用, 后续条不带(避免回复链混乱)
                if (i === 0 && context.reply_to_message_id) {
                    params.reply_parameters = {
                        message_id: context.reply_to_message_id,
                        chat_id: context.chat_id,
                        allow_sending_without_reply: context.allow_sending_without_reply || undefined,
                    };
                }
                const resp = await this.api.sendRichMessage(params);
                if (resp.status === 200) {
                    await this.recordSentMessageId(resp);
                    lastResp = resp;
                    successCount++;
                } else {
                    // 某条失败: 记录错误, 继续尝试后续条(尽量多发几条富文本)
                    const errBody = await resp.clone().text().catch(() => '');
                    console.error(`[sendRichMessage] chunk ${i + 1}/${chunks.length} failed (${resp.status}): ${errBody.slice(0, 200)}`);
                    lastResp = resp;
                }
            } catch (e) {
                console.error(`[sendRichMessage] chunk ${i + 1}/${chunks.length} request error:`, e);
            }
        }
        return successCount > 0 ? lastResp : null;
    }

    private async sendLongMessage(message: string, context: MessageContext): Promise<Response> {
        const chatContext = { ...context };
        const limit = 4096;
        if (message.length <= limit) {
            // 原始消息长度小于限制，直接使用当前parse_mode发送
            // 传入原始 message 作为 fallbackText, 400 降级时发原始 markdown 而非 HTML 标签
            const resp = await this.sendMessage(this.renderMessage(context.parse_mode, message), chatContext, message);
            if (resp.status === 200) {
                // 发送成功，记录消息 id 后返回
                await this.recordSentMessageId(resp);
                return resp;
            }
        }
        // 超长消息(或普通发送失败): 优先尝试 Rich Message 一条整发(不拆分)
        // 注意: 不再用 !chatContext.message_id 作为条件, 因为非流式下 chatWithMessage
        // 会先发一条 '...' 占位消息并把其 id 写入 context.message_id。此处仍走 rich 分支,
        // 成功后单独删除占位消息; 失败按错误类型降级。
        if (ENV.RICH_MESSAGE_MODE) {
            const richResp = await this.trySendRichMessage(message, chatContext);
            if (richResp && richResp.status === 200) {
                // rich message 是一条全新发送, 与占位消息无关; 成功后删除占位消息避免遗留 '...'
                if (chatContext.message_id) {
                    try {
                        await this.api.deleteMessage({ chat_id: chatContext.chat_id, message_id: chatContext.message_id });
                    } catch (e) {
                        console.error('[sendRichMessage] delete placeholder failed:', e);
                    }
                }
                await this.recordSentMessageId(richResp);
                return richResp;
            }
            if (richResp && this.isRichMessageSizeError(richResp)) {
                // 400 超限错误(BLOCKS_TOO_MANY / TEXT_TOO_LONG 等): 拆分成多条 Rich Message 逐条发
                const errBody = await richResp.clone().text().catch(() => '');
                console.error(`[sendRichMessage] one-piece failed (${richResp.status}): ${errBody.slice(0, 200)}, trying chunked`);
                const chunkedResp = await this.trySendRichMessageChunked(message, chatContext);
                if (chunkedResp) {
                    // 分段发送至少有一条成功: 删除占位消息
                    if (chatContext.message_id) {
                        try {
                            await this.api.deleteMessage({ chat_id: chatContext.chat_id, message_id: chatContext.message_id });
                        } catch (e) {
                            console.error('[sendRichMessage] delete placeholder failed:', e);
                        }
                    }
                    return chunkedResp;
                }
            } else if (richResp) {
                const errBody = await richResp.clone().text().catch(() => '');
                console.error(`[sendRichMessage] failed (${richResp.status}): ${errBody.slice(0, 200)}, fallback to split plain text`);
            }
        }
        // 拆分消息后可能导致markdown格式错乱，所以采用纯文本模式发送,不使用任何parse_mode
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
            // 记录拆分后每条消息的 id
            await this.recordSentMessageId(lastMessageResponse);
        }
        if (lastMessageResponse === null) {
            throw new Error('Send message failed');
        }
        if (!lastMessageResponse.ok) {
            const errorBody = await lastMessageResponse.clone().text().catch(() => '');
            throw new Error(`Telegram send failed (${lastMessageResponse.status}): ${errorBody.slice(0, 500)}`);
        }
        return lastMessageResponse;
    }

    sendRawMessage(message: Telegram.SendMessageParams): Promise<Response> {
        return this.api.sendMessage(message);
    }

    editRawMessage(message: Telegram.EditMessageTextParams): Promise<Response> {
        return this.api.editMessageText(message);
    }

    sendRichText(message: string, parseMode: Telegram.ParseMode | null = (ENV.DEFAULT_PARSE_MODE as Telegram.ParseMode)): Promise<Response> {
        if (!this.context) {
            throw new Error('Message context not set');
        }
        return this.sendLongMessage(message, {
            ...this.context,
            parse_mode: parseMode,
        });
    }

    sendPlainText(message: string): Promise<Response> {
        if (!this.context) {
            throw new Error('Message context not set');
        }
        return this.sendLongMessage(message, {
            ...this.context,
            parse_mode: null,
        });
    }

    sendPhoto(photo: string | Blob): Promise<Response> {
        if (!this.context) {
            throw new Error('Message context not set');
        }
        const params: Telegram.SendPhotoParams = {
            chat_id: this.context.chat_id,
            photo,
        };
        if (this.context.reply_to_message_id) {
            params.reply_parameters = {
                message_id: this.context.reply_to_message_id,
                chat_id: this.context.chat_id,
                allow_sending_without_reply: this.context.allow_sending_without_reply || undefined,
            };
        }
        const resp = this.api.sendPhoto(params);
        resp.then(r => this.recordSentMessageId(r)).catch(console.error);
        return resp;
    }
}
