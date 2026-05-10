import { getChangedFiles, getFileContent, getTypeOfChange, getFileContentOfPrevious } from './git';
import { ChangedText } from './types';

export function getFileDiffereces(hash: string, repoPath: string): ChangedText[] {
    const changedFiles = getChangedFiles(hash, repoPath);
    const changes: ChangedText[] = [];
    console.log("Changed files: ", changedFiles);
    for (const file of changedFiles) {
        const change: ChangedText = {
            bodyBefore: getFileContentOfPrevious(file, hash, repoPath),
            bodyAfter: getFileContent(file, hash, repoPath),
            filePath: file,
            contextType: 'file',
            typeOfChange: getTypeOfChange(hash, repoPath, file),
        };
        changes.push(change);
    }
    return changes;
 }

 export function getFileLength(fileName: string, hash: string, repoPath: string): number {
    const content = getFileContent(fileName, hash, repoPath);
    return content.length;
 }

 // Data structre: Map of file names to their content before and after (changedFiles: Map<string, ChangedFile>)
