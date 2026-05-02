import { execSync } from 'child_process'

export function getChangedFiles(hash1: string, hash2: string, repoPath: string): string[] {
    const output = execSync(`git diff --name-only ${hash1} ${hash2}`, { cwd: repoPath }).toString();
    return output.trim().split("\n");
}

export function getFileContent(fileName: string, hash1: string, repoPath: string): string {
    return execSync(`git show ${hash1}:${fileName}`, { cwd: repoPath }).toString();
}