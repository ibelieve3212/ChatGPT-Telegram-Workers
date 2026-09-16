// 调试日志工具
// 受 ENV.DEBUG_MODE 开关控制: 默认 false(生产静默), 设 true 打开流程追踪日志。
// 错误日志(console.error)不受此开关影响, 始终输出, 用于真正需要常开的错误追踪。
// 用法: debugLog('[diag] xxx', { ... }) 或 debugLog('消息', arg1, arg2)

import { ENV } from '#/config';

export function debugLog(...args: any[]): void {
    if (ENV.DEBUG_MODE) {
        console.log(...args);
    }
}
