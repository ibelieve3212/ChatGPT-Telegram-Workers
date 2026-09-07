import type { AgentUserConfig } from '#/config';
import type { ChatAgent, ImageAgent } from './types';
import { Dalle, OpenAI } from './openai';

export const CHAT_AGENTS: ChatAgent[] = [
    new OpenAI(),
];

export function loadChatLLM(context: AgentUserConfig): ChatAgent | null {
    for (const llm of CHAT_AGENTS) {
        if (llm.name === context.AI_PROVIDER) {
            return llm;
        }
    }
    // 找不到指定的AI，使用第一个可用的AI
    for (const llm of CHAT_AGENTS) {
        if (llm.enable(context)) {
            return llm;
        }
    }
    return null;
}

export const IMAGE_AGENTS: ImageAgent[] = [
    new Dalle(),
];

export function loadImageGen(context: AgentUserConfig): ImageAgent | null {
    for (const imgGen of IMAGE_AGENTS) {
        if (imgGen.name === context.AI_IMAGE_PROVIDER) {
            return imgGen;
        }
    }
    // 找不到指定的AI，使用第一个可用的AI
    for (const imgGen of IMAGE_AGENTS) {
        if (imgGen.enable(context)) {
            return imgGen;
        }
    }
    return null;
}
