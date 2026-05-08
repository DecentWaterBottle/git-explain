# git-explain

Explain git commit diffs in human-readable, AI-powered summaries.

## Overview

`git-explain` is a TypeScript CLI tool that uses Claude AI to generate clear, concise explanations of what changed between git commits. Instead of manually parsing diffs, just run the tool and get a structured summary of:

- **What files changed** (added, modified, deleted, renamed)
- **How they changed** (specific code modifications)
- **Why it matters** (impact assessment)

Perfect for code reviews, understanding PRs, and auditing commit history without the diff-reading headache.

## Features

- **AI-Powered Explanations** — Uses Claude to generate intelligent summaries
- **Credit-Optimized** — Focuses on meaningful code changes, ignores formatting noise
- **CLI-Native** — Easily integrates into git workflows, pre-commit hooks, CI/CD pipelines
- **Flexible Comparisons** — Compare any two commits, or a commit with its parent
- **Smart Code Parsing** — Uses tree-sitter to understand code structure
- **Change Detection** — Automatically identifies file additions, deletions, modifications, and renames

## Tech Stack

- **TypeScript** — Type-safe development
- **Anthropic SDK** — Claude AI integration
- **simple-git** — Git operations
- **tree-sitter** — Code structure parsing
- **Commander** — CLI argument parsing

## License

ISC
