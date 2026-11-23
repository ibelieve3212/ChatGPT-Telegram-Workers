// 命令边界统一使用任意空白，避免换行/制表符在群触发与分发器之间产生分歧。
export function matchesCommand(text: string, command: string): boolean {
    return text === command || (text.startsWith(command) && /^\s/.test(text.slice(command.length)));
}

export function parseCommand(text: string): { command: string; suffix?: string; args: string } | null {
    const value = text.trim();
    const boundary = value.search(/\s/);
    const head = boundary < 0 ? value : value.slice(0, boundary);
    const match = head.match(/^([/.][^\s@]+)(?:@(\S+))?$/);
    if (!match) {
        return null;
    }
    return { command: match[1], suffix: match[2], args: boundary < 0 ? '' : value.slice(boundary).trim() };
}
