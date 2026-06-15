#!/usr/bin/env node

const { program } = require('commander');
import { getFileDiffereces, prepareChangesForLLM } from './context';
import { getAiResponse } from './ai';
import ora from "ora";
import { prompt } from 'enquirer';
import { setApiKey } from './config';

program
    .name('git-explain')
    .description("Summarizes the changes made in a specific commit and explains the reasons behind those changes.")
    .version('0.2.0')

program
    .argument("<commitHash>", "The hash of the commit to explain")
    .option("-r, --repo <path>", "Path to the git repository", ".")
    .option("-d, --detailed", "Whether to provide a detailed explanation of the changes", false)
    .option("-m, --max-tokens <number>", "Maximum number of tokens for the AI response", "3000")
    .action(async (commitHash: string, options: { repo: string, detailed: boolean, maxTokens: string }) => {
        const spinner = ora("Analyzing commit and fetching response...").start();
        let repoPath = "";
        options.repo ? repoPath = options.repo : repoPath = ".";        
        const detailed = options.detailed;
        const maxTokens = parseInt(options.maxTokens, 10);
        const changes = getFileDiffereces(commitHash, repoPath);
        if (changes.length === 0) {
            spinner.fail("No changes found for the given commit hash.");
            return;
        }
        const prompt = prepareChangesForLLM(changes);
            getAiResponse(prompt, maxTokens).then(response => {
                spinner.succeed("Response received!");
                console.log(response);
            }).catch(error => {
                spinner.fail("Error getting AI response.");
                console.error("Error getting AI response: ", error);
            });
    });

program.command('configure-api-key')
    .description('Configure the API key')
    .action(async () => {

        const choiceResponse = await prompt<{ provider: string }>({
            type: 'select',
            name: 'provider',
            message: 'Select the AI provider you want to use:',
            choices: ['Anthropic', 'OpenAI'],
        });

         const keyResponse = await prompt<{apiKey: string}>({
            type: 'input',
            name: 'apiKey',
            message: 'Your API key:',
        });

        setApiKey(choiceResponse.provider.toLowerCase(), keyResponse.apiKey);
        //process.env.ANTHROPIC_API_KEY = response.apiKey;
        console.log("Api key: ", keyResponse.apiKey);
        console.log("API key configured successfully!");
    });

program.parse();



