---
id: ts-list-commands-renamed-497
title: zinit ls / list / loaded commands renamed to snippets and plugins
category: troubleshooting
tags: [command, troubleshooting, migration]
source: https://github.com/zdharma-continuum/zinit/issues/497
related: []
---

## Summary

The `ls`, `list`, and `loaded` subcommands were removed and replaced by two new commands: `zinit snippets` and `zinit plugins`. Scripts or muscle memory using the old names will receive an "Unknown subcommand" error.

## Symptom

```
ERROR: Unknown subcommand: `ls` (it should be one of, e.g.: `load`, `snippet`, `update`, `delete`, …)
ERROR: Unknown subcommand: `list` …
ERROR: Unknown subcommand: `loaded` …
```

## Cause

PR #497 renamed these commands to use more descriptive and consistent names:

- `ls` (listed snippets) → `zinit snippets`
- `list` and `loaded` (listed plugins) → `zinit plugins`

The old names were removed entirely.

## Fix / Workaround

Replace the old commands with their new equivalents:

```zsh
# Old → New
zinit ls        → zinit snippets
zinit list      → zinit plugins
zinit loaded    → zinit plugins
```

If you have the old commands in scripts or aliases, update them:

```zsh
# In .zshrc or scripts
alias zs='zinit snippets'
alias zp='zinit plugins'
```

To check your zinit version and whether the new commands are available:

```zsh
zinit version
zinit plugins --help
```

## Caveats

`zinit list-plugins` (with hyphen) and `zinit list-snippets` are separate commands that remain available and predate this change. The removed commands (`ls`, `list`, `loaded`) were the short-form aliases introduced in an earlier refactor.
