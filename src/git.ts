import { execSync } from 'child_process'

/**
 * Gets the list of files that were changed between two commits.
 * @param hash1 The hash of the first commit.
 * @param hash2 The hash of the second commit.
 * @param repoPath Path to the git repository.
 * @returns A list of files that were changed between the two commits.
 */
export function getChangedFilesBetweenCommits(hash1: string, hash2: string, repoPath: string): string[] {
    const output = execSync(`git diff --name-only ${hash1} ${hash2}`, { cwd: repoPath }).toString();
    return output.trim().split("\n");
}

/**
 *  Gets the list of files that were changed in the commit represented by hash1 compared to its parent commit.
 * @param hash1 The hash of the commit to compare against its parent. For example: "3514d1001a76064f6f66300af79d7e0ae6174f01"
 * @param repoPath Path to the git repository. 
 * @returns A list of files that were changed
 */
export function getChangedFiles(hash1: string, repoPath: string): string[] | null {
    try {
        const output = execSync(`git diff --name-only ${hash1}~1 ${hash1}`, { cwd: repoPath, stdio: ['pipe', 'pipe', 'pipe']  }).toString();
        return output.trim().split("\n");
    } catch (error) {
        console.error("Error fetching changed files");
        return null;
    }
}

/**
 * Gets the content of a specific file at a specific commit.
 * @param fileName The name of the file relative to the repository root. For example: "src/index.ts"
 * @param hash1 The hash of the commit. 
 * @param repoPath Path to the git repository.
 * @returns The content of the file at the specified commit.
 */
export function getFileContent(fileName: string, hash: string, repoPath: string): string {
    return execSync(`git show ${hash}:${fileName}`, { cwd: repoPath }).toString();
}

export function getFileContentOfPrevious(fileName: string, hash: string, repoPath: string): string {
    return execSync(`git show ${hash}~1:${fileName}`, { cwd: repoPath }).toString();
}

/**
 * Gets the type of change for a specific file at a specific commit compared to its parent commit.
 * @param hash1 The hash of the commit to compare against its parent. 
 * @param repoPath The path to the git repository.
 * @param fileName The name of the file relative to the repository root.
 * @returns The type of change for the specified file. Possible values are: 'added', 'deleted', 'modified', 'renamed'.
 * @throws If the git status is unknown, an error is thrown.
 */
export function getTypeOfChange(hash1: string, repoPath: string, fileName?: string): 'added' | 'deleted' | 'modified' | 'renamed' {
    const fileArg = fileName ? `-- ${fileName}` : '';
    const output = execSync(`git diff --name-status ${hash1}~1 ${hash1} ${fileArg}`, { cwd: repoPath }).toString();
    const status = output.trim().split("\t")[0];
    if (status === 'A') return 'added';
    if (status === 'D') return 'deleted';
    if (status === 'R') return 'renamed';
    if (status === 'M') return 'modified';
    throw new Error(`Unknown git status: ${status}`);
}