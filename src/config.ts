import Conf from 'conf';
import { AppConfig } from './types';

const config = new Conf<AppConfig>({ projectName: "git-explain"});

export function setApiKey(provider: string, apiKey: string): void {
    const keys = config.get("apiKeys") ?? {}
    config.set("apiKeys", { ...keys, [provider]: apiKey});
}

export function getApiKey(provider: string): string | undefined {
    return config.get("apiKeys")?.[provider];
}

export function setActiveProvider(provider: string): void {
    config.set('activeProvider', provider);
}

export function getActiveProvider(): string | undefined {
    return config.get('activeProvider');
}

