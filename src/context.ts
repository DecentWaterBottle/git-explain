import { getChangedFiles, getFileContent, getTypeOfChange } from '../src/index';


export function getFileDiffereces(hash1: string, repoPath: string): string {
    const changedFiles = getChangedFiles(hash1, repoPath);
    let differences = "";
    console.log("Changed files: ", changedFiles);
    for (const file of changedFiles) {
        const changeType = getTypeOfChange(hash1, repoPath, file)
        if (changeType === 'added') {
            const content1 = getFileContent(file, hash1, repoPath);
            differences += `File ${file} was added:\n`;
            differences += `Content:\n${content1}\n`;
            differences += "-------------------------\n";
            continue;
        }
        const contentBefore = getFileContent(file, `${hash1}~1`, repoPath);
        const contentAfter = getFileContent(file, hash1, repoPath);
        console.log("AFTER CONT.");
        differences += `Differences in ${file}:\n`;
        differences += `Before:\n${contentBefore}\n`;
        differences += `After:\n${contentAfter}\n`;
        differences += "Change Type: " + changeType + "\n";
        differences += "-------------------------\n";
    }
    return differences;
 }
