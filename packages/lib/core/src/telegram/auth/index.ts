import { ENV } from '#/config';

// 管理员鉴权标记: 当 needAuth 返回此列表时, 走管理员(ID 白名单 + 群角色回退)判定
export const ADMIN_AUTH_MARK = 'admin_only';

// Telegram 匿名管理员固定 ID: 群内以「以群组身份发言」匿名发消息时, from.id 恒为此值
// (真实发言人身份由 Telegram 隐藏, 但只有群管理员/群主能启用匿名发言)
const ANONYMOUS_ADMIN_BOT_ID = 1087968824;

// 判断是否为群聊匿名管理员发言(仅群聊有效)
export function isAnonymousAdminMessage(speakerId: number | undefined | null, chatType: string): boolean {
    return speakerId === ANONYMOUS_ADMIN_BOT_ID && isGroupChat(chatType);
}

// 判断是否为管理员(结合 ADMIN_USER_IDS 白名单 + 群聊角色)。
// 返回 true 放行, false 拒绝, null 表示无法判定(应视为无权或回退)。
export function isAdminUserId(speakerId: number | undefined | null): boolean | null {
    const admins = ENV.ADMIN_USER_IDS;
    // 未配置管理员白名单 → 回退(交给群聊角色判断)
    if (!admins || admins.length === 0) {
        return null;
    }
    if (speakerId == null) {
        return false;
    }
    return admins.includes(`${speakerId}`);
}

export const TELEGRAM_AUTH_CHECKER = {
    default(chatType: string): string[] | null {
        if (isGroupChat(chatType)) {
            return ['administrator', 'creator'];
        }
        return null;
    },
    shareModeGroup(chatType: string): string[] | null {
        if (isGroupChat(chatType)) {
            // 每个人在群里有上下文的时候，不限制
            if (!ENV.GROUP_CHAT_BOT_SHARE_MODE) {
                return null;
            }
            return ['administrator', 'creator'];
        }
        return null;
    },
    // 管理员模式: 仅管理员(ID 白名单)可执行。由调用方结合 isAdminUserId / 群角色判定。
    adminOnly(chatType: string): string[] | null {
        return [ADMIN_AUTH_MARK];
    },
};

export function isGroupChat(type: string): boolean {
    return type === 'group' || type === 'supergroup';
}