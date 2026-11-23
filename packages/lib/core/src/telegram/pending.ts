import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import type { MessageSender } from './sender';
import { saveBotReplyGroup } from './chat/replyGroup';
import { deleteTransientMessage } from './cleanup';

// 慢操作的"已收到"反馈, 统一挂在命令分发器上, 新增命令不用自己写。
//
// 生图、/av、插件命令这类要先联网(几秒到一分钟), 期间原来什么都不发, 用户不知道
// 机器人收没收到。这里的做法是两条腿:
//   1. 收到命令立即发一条占位消息("正在处理中"), 用户马上看得见;
//   2. 同时 sendChatAction, 顶栏一直显示"正在输入/正在上传图片"。
// 结果发出去之后把占位消息删掉(照片类结果没法把文本占位编辑成照片, 只能删)。
//
// 约定: 这里的任何失败都不能影响主流程 —— 发送/删除失败只 warn, 结果照发。

/** 统一的"已收到"文案, 聊天路径和命令路径共用同一句, 用户看到的是同一个提示。 */
export const PENDING_TEXT = '🤖️正在处理中，请稍后...';

export interface PendingOptions {
    /** 占位消息文案, 默认 PENDING_TEXT */
    text?: string;
    /** 输入状态类型, 默认 typing; 出图类用 upload_photo */
    action?: Telegram.ChatAction;
}

// Telegram 的 chat action 只维持约 5 秒, 4 秒续一次
const PING_INTERVAL_MS = 4000;

/**
 * 包住一次慢操作: 运行期间给用户"已收到"的反馈, 结束后自动清理。
 * options 传 false 表示这个命令自己已经有反馈(比如 /chat 自己发占位), 直接跑。
 */
export async function withPending(
    sender: MessageSender,
    message: Telegram.Message,
    run: () => Promise<Response>,
    options: PendingOptions | false = {},
    context?: WorkerContext,
): Promise<Response> {
    if (options === false) {
        return run();
    }
    const status = new PendingStatus(sender, message, options, context);
    status.begin();
    try {
        return await run();
    } finally {
        await status.stop();
    }
}

class PendingStatus {
    private readonly text: string;
    private readonly action: Telegram.ChatAction;
    private messageId: number | null = null;
    private pingTimer: ReturnType<typeof setInterval> | null = null;
    private sending: Promise<void> | null = null;
    private stopped = false;

    constructor(
        private readonly sender: MessageSender,
        private readonly message: Telegram.Message,
        options: PendingOptions,
        private readonly context?: WorkerContext,
    ) {
        this.text = options.text ?? PENDING_TEXT;
        this.action = options.action ?? 'typing';
    }

    begin(): void {
        this.ping();
        this.pingTimer = setInterval(() => this.ping(), PING_INTERVAL_MS);
        // 不 await: 占位消息和命令本身并行发, 不额外增加命令的响应时间
        this.sending = this.sendPlaceholder();
    }

    private ping(): void {
        try {
            this.sender.api.sendChatAction({
                chat_id: this.sender.context.chat_id,
                action: this.action,
                // forum topic 不带上的话输入状态会显示在主话题
                ...(this.message.message_thread_id ? { message_thread_id: this.message.message_thread_id } : {}),
            }).catch(() => undefined);
        } catch (e) {
            console.warn('[pending] 输入状态发送失败:', (e as Error).message);
        }
    }

    /**
     * 占位消息直接走 api, 不走 sender:
     * sender 会把消息 id 记进 context / sentMessageIds, 后面的结果就会去"编辑"这条占位,
     * 删除时又会误删结果。这里只要一个独立的临时消息。
     */
    private async sendPlaceholder(): Promise<void> {
        if (this.stopped) {
            return;
        }
        try {
            const resp = await this.sender.api.sendMessage({
                chat_id: this.sender.context.chat_id,
                text: this.text,
                link_preview_options: { is_disabled: true },
                ...(this.message.message_thread_id ? { message_thread_id: this.message.message_thread_id } : {}),
            });
            if (!resp.ok) {
                console.warn('[pending] 占位消息发送失败:', resp.status);
                return;
            }
            const json = await resp.json() as Telegram.ResponseWithMessage;
            this.messageId = json.ok ? json.result?.message_id ?? null : null;
            // 发送期间操作已经结束: 立刻自己清掉(避免残留一条"正在处理")
            if (this.stopped) {
                await this.removePlaceholder();
            }
        } catch (e) {
            console.warn('[pending] 占位消息发送异常:', (e as Error).message);
        }
    }

    private async removePlaceholder(): Promise<void> {
        const id = this.messageId;
        this.messageId = null;
        if (id === null) {
            return;
        }
        if (!await deleteTransientMessage(this.sender.api, this.sender.context.chat_id, id) && this.context) {
            // 网络失败不能凭空保证删除；保留精确 ID，之后 /clear 仍能重试。
            await saveBotReplyGroup(this.context, [id]);
        }
    }

    /** 结果已发出(或已失败)后调用: 停计时器、等在途占位消息落地、删掉它。 */
    async stop(): Promise<void> {
        this.stopped = true;
        if (this.pingTimer !== null) {
            clearInterval(this.pingTimer);
            this.pingTimer = null;
        }
        if (this.sending !== null) {
            await this.sending;
        }
        await this.removePlaceholder();
    }
}
