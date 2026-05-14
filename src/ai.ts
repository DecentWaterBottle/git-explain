import Anthropic from '@anthropic-ai/sdk';
import { promptForSystemMission } from './prompts';
import 'dotenv/config';

const client = new Anthropic;

export async function getAiResponse(prompt: string, maxTokens: number): Promise<string> {
    const response = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: maxTokens,
        system: promptForSystemMission,
        messages: [
            { role: 'user', content: prompt }
        ],
    });
    const block = response.content[0];
    if (!block || block.type !== 'text') throw new Error('Unexpected response from AI');
    return block.text;              
}
