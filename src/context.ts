import { getChangedFiles, getFileContent, getTypeOfChange, getFileContentOfPrevious } from './git';
import { ChangedText } from './types';
import { makePromptForCommitSummary } from './prompts';

export function getFileDiffereces(hash: string, repoPath: string): ChangedText[] {
    let changes: ChangedText[] = [];
    let changedFiles = getChangedFiles(hash, repoPath);
    if (!changedFiles) {
        return [];
    }
    
    for (const file of changedFiles) {

        const typeOfChange = getTypeOfChange(hash, repoPath, file);

        let bodyBefore = "<empty>";
        let bodyAfter = "<empty>";

        if (typeOfChange === 'added') {
            bodyAfter = getFileContent(file, hash, repoPath);
        } else if (typeOfChange === 'deleted') {
            bodyBefore = getFileContentOfPrevious(file, hash, repoPath);
        } else {
            bodyBefore = getFileContentOfPrevious(file, hash, repoPath);
            bodyAfter = getFileContent(file, hash, repoPath);
        }

        const change: ChangedText = {
            bodyBefore: bodyBefore,
            bodyAfter: bodyAfter,
            filePath: file,
            contextType: 'file',
            typeOfChange: typeOfChange,
        };
        changes.push(change);
    }
    return changes;
 }

 export function getFileLength(fileName: string, hash: string, repoPath: string): number {
    const content = getFileContent(fileName, hash, repoPath);
    return content.length;
 }

 export function prepareChangesForLLM(changes: ChangedText[]): string {
    let result = "";
    for (const change of changes) {
        result += makePromptForCommitSummary(change);
    }
    return result;
 }
