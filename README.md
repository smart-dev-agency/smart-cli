[![Node.js Package](https://github.com/smart-dev-agency/smart-cli/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/smart-dev-agency/smart-cli/actions/workflows/npm-publish.yml)

# Smart CLI Tools for developers

Set of development tools for the command line.

## Requirements

- node js 16+

## Installation

```bash
npm i -g @smart-dev-agency/smart-cli
```

## Usage

Once the CLI is installed globally, you can run it with `smart-cli` to get a main view of the application.

## Change Configuration

You can use the update_config command to update some CLI configuration. This is the JSON structure to update config:

```json
{
  "cli_name": "New Name CLI",
  "commits_prefix": {
    "feat": "✨", // string or emoji data
    "fix": "🚑️",
    "chore": "📝",
    "release": "🚀",
    "docs": "📝",
    "test": "🧪",
    "style": "💄",
    "refactor": "♻️",
    "perf": "⚡️",
    "build": "👷",
    "ci": "🏗️",
    "revert": "⏪️"
  }
}
```

## Screenshots

![App Screenshot](https://github.com/user-attachments/assets/4757367a-e5f5-49a4-8a1e-82d8fd1eaaa4)

## Authors

- [@reyesmfabian](https://www.github.com/reyesmfabian)
