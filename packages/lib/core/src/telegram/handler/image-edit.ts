import type { WorkerContext } from '#/config';
import type * as Telegram from 'telegram-bot-api-types';
import type { MessageHandler } from './types';
import { loadImageGen } from '#/agent';
import { ENV } from '#/config';
import { debugLog } from '#/utils/debug';
import { downloadImageBlob, extractImageFileID } from '../chat';
import { isGeneratedImage, recordGeneratedImage } from '../chat/generated-images';
import { saveBotReplyGroup } from '../chat/replyGroup';
import { withPending } from '../pending';
import { MessageSender } from '../sender';

// 回复 bot 生成的图片 → 二次编辑(图生图), 无需再带 /img、.生图 命令。
//
// 约束: 只对已登记生成来源的本 bot 图片生效(/img、.生图及此前编辑的结果)。
// 普通插件照片、别人发的图、升级前无记录的旧图继续走普通聊天；可显式命令改图。
// 编辑结果也登记来源，因此可以一直「回复上一张 → 继续改」链式编辑。
// 可用 IMAGE_EDIT_ON_REPLY=false 整体关闭该行为。
export class ImageEditHandler implements MessageHandler {
    handle = async (message: Telegram.Message, context: WorkerContext): Promise<Response | null> => {
        if (!ENV.IMAGE_EDIT_ON_REPLY) {
            return null;
        }
        const referenced = message.reply_to_message;
        if (!referenced) {
            return null;
        }
        // 约束: 被回复的消息必须是 bot 自己发的(别人发的图不触发编辑)
        if (`${referenced.from?.id}` !== `${context.SHARE_CONTEXT.botId}`) {
            return null;
        }
        // 被回复的消息必须是图片。取最大档位: bot 通过 sendPhoto 发送, 编辑底图用最大档保证质量。
        const fileId = referenced.photo?.at(-1)?.file_id;
        if (!fileId || !await isGeneratedImage(referenced, context)) {
            return null;
        }
        // 修改指令 = 本条回复的文字/图片说明; 没写文字就不拦截, 交给后续中间件
        const prompt = (message.text || message.caption || '').trim();
        if (!prompt) {
            return null;
        }
        // 未配置生图渠道: 不拦截(无法编辑), 交给普通聊天
        if (!context.USER_CONFIG.IMAGE_API_BASE || !context.USER_CONFIG.IMAGE_API_KEY) {
            return null;
        }
        const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
        return withPending(sender, message, async () => {
            try {
                // 被回复生成图优先，本轮明确附带的单图/相册也属于编辑输入；不扫会话旧图。
                const ids = [...new Set([fileId, ...(context.albumMessages ?? [message]).map(extractImageFileID).filter((id): id is string => !!id)])].slice(0, 16);
                const sources = await Promise.all(ids.map(id => downloadImageBlob(id, context)));
                const source = sources.length === 1 ? sources[0] : sources;
                const imageAgent = loadImageGen(context.USER_CONFIG);
                if (!imageAgent) {
                    throw new Error('No available image model');
                }
                debugLog('[diag] ImageEditHandler 二次编辑:', { prompt: prompt.slice(0, 50), count: sources.length, bytes: sources.reduce((sum, item) => sum + item.size, 0) });
                const result = await imageAgent.request(prompt, context.USER_CONFIG, source);
                const resp = await sender.sendPhoto(result);
                await recordGeneratedImage(resp, message, context);
                return resp;
            } catch (e) {
                return await sender.sendPlainText(`ERROR: ${(e as Error).message}`);
            } finally {
                await saveBotReplyGroup(context, sender.getSentMessageIds());
            }
        }, { action: 'upload_photo' }, context);
    };
}
