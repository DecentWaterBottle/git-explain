import { execSync } from 'child_process'

export function getChangedFilesBetweenCommits(hash1: string, hash2: string, repoPath: string): string[] {
    const output = execSync(`git diff --name-only ${hash1} ${hash2}`, { cwd: repoPath }).toString();
    return output.trim().split("\n");
}

export function getChangedFiles(hash1: string, repoPath: string): string[] {
    const output = execSync(`git diff --name-only ${hash1}~1 ${hash1}`, { cwd: repoPath }).toString();
    return output.trim().split("\n");
}

export function getFileContent(fileName: string, hash1: string, repoPath: string): string {
    return execSync(`git show ${hash1}:${fileName}`, { cwd: repoPath }).toString();
}

export function getTypeOfChange(hash1: string, repoPath: string, fileName?: string): 'added' | 'deleted' | 'modified' | 'renamed' {
    const fileArg = fileName ? `-- ${fileName}` : '';
    const output = execSync(`git diff --name-status ${hash1}~1 ${hash1} ${fileArg}`, { cwd: repoPath }).toString();
    console.log(output);
    const status = output.trim().split("\t")[0];
    console.log("Git status for file: ", fileName,  " ",  status);
    if (status === 'A') return 'added';
    if (status === 'D') return 'deleted';
    if (status === 'R') return 'renamed';
    if (status === 'M') return 'modified';
    throw new Error(`Unknown git status: ${status}`);
}