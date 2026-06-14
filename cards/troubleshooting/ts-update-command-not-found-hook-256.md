---
id: ts-update-command-not-found-hook-256
title: "zi update --all: command not found: .zinit-update-snippet / ∞zinit-reset-hook"
category: troubleshooting
tags: [troubleshooting, installation, migration]
source: https://github.com/zdharma-continuum/zinit/discussions/256
related: []
---

## Summary
Errors like `command not found: .zinit-update-snippet` and `command not found: ∞zinit-reset-hook` during `zi update --all` indicate a stale zinit installation that needs to be recompiled after a self-update.

## Question / Problem
Running `zi update --all --verbose` produced a mix of update output and errors:

```
.zinit-update-or-status-snippet:24: command not found: .zinit-update-snippet
.zinit-update-or-status:241: command not found: ∞zinit-reset-hook
Warning: ∞zinit-reset-hook hook returned with 127
```

## Answer / Solution
These errors occur when the running zinit shell session is using compiled (`.zwc`) bytecode from an older version while the source files have been updated by `self-update`. The fix is to force a recompile and restart the shell:

```zsh
zinit self-update
exec zsh
```

`self-update` fetches the latest source and recompiles zinit. Starting a fresh shell (`exec zsh`) ensures the new bytecode is loaded. Running updates in the same session where `self-update` just ran can trigger these mismatches.

## Caveats
If errors persist after `exec zsh`, delete the compiled files manually and let zinit recompile on next start:

```zsh
zinit uncompile --all
zinit self-update
exec zsh
```
