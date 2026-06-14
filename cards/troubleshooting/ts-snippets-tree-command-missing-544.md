---
id: ts-snippets-tree-command-missing-544
title: "zinit snippets / zinit ls fails — requires tree program not found"
category: troubleshooting
tags: [troubleshooting, command, installation]
source: https://github.com/zdharma-continuum/zinit/issues/544
related: [ts-zinit-ls-command-missing-670]
---

## Summary

`zinit snippets` (and `zinit ls` in older versions) falls back to `ls --tree` when neither `tree` nor `exa` is installed. BSD `ls` (macOS) does not support `--tree`, causing the command to fail with an unrecognized-option error.

## Symptom

```
No `tree' program, it is required by the subcommand `ls'
ls: unrecognized option '--tree'
Try 'ls --help' for more information.
, located at ZINIT[SNIPPETS_DIR], i.e. /home/user/.local/share/zinit/snippets
```

## Cause

The fallback command in `ZINIT[LIST_COMMAND]` defaults to `ls --tree`, which is not a valid flag for either GNU `ls` or BSD `ls`. It was likely intended for `exa --tree` or `eza --tree`.

## Fix / Workaround

Install `tree`:
- macOS: `brew install tree`
- Debian/Ubuntu: `apt-get install tree`
- Arch: `pacman -S tree`

Or override `ZINIT[LIST_COMMAND]` before sourcing zinit:

```zsh
declare -A ZINIT
ZINIT[LIST_COMMAND]="ls -la"  # or: "eza --tree", "find . -maxdepth 2", etc.
source "${ZINIT_HOME}/zinit.zsh"
```

## See Also

- ts-zinit-ls-command-missing-670
