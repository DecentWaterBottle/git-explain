export interface ChangedFunction {
    name: string;
    filePath: string;
    bodyBefore: string,
    bodyAfter: string,
    classHeader: string,
}

export interface ChangedText {
    bodyBefore: string,
    bodyAfter: string,
    filePath: string,
    contextType: 'class' | 'file',
    typeOfChange?: 'added' | 'deleted' | 'modified' | 'renamed',
}

export interface AppConfig {
    provider: string,
    apiKeys: KeyConfig,
}

interface KeyConfig {
    [provider: string]: string
}
