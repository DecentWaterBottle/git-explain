import Conf from 'conf';
import { KeyConfig } from './types';

const config = new Conf<KeyConfig>();

export function setApiKey(provider: string, apiKey: string): void {
    if (provider === 'anthropic') {
        config.set('anthropic', { apiKey });
    } else if (provider === 'openai') {
        config.set('openai', { apiKey });
    }
}

export function getApiKey(provider: string): string | undefined {
    let key;
    if (provider === 'anthropic') {
        key = config.get('anthropic');
    } else if (provider === 'openai') {
        key = config.get('openai');
    }
    return key ? key.apiKey : undefined;
}