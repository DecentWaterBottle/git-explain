import { ChangedText } from './types';

export const makePromptForCommitSummary = (changedText: ChangedText): string => {
    return "FilePath / Name: " + changedText.filePath + "\n" +
        "Type of change: " + changedText.typeOfChange + "\n" +
        "Body Before: " + changedText.bodyBefore + "\n" +
        "Body After: " + changedText.bodyAfter + "\n\n";
}

export const promptForSystemMission = `You are a helpful assistant that explains code changes. You will be given the content 
of a files before and after a change, the type of change (added, deleted, modified, renamed), and the file path. 
Your task is to analyze the changes and provide a clear and concise explanation of what was changed and why it might have been 
changed. Focus on the most important changes and try to infer the intent behind the changes based on the code context. 
If there are any added or removed functions, explain their purpose and how they fit into the overall codebase. If there are 
modifications to existing code, explain what was modified and why it might have been modified. If there are any renamed files or 
functions, explain what was renamed and why it might have been renamed. Format the respnse in a way that makes it easy to read in 
a console output.`;
