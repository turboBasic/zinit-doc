---
id: ts-zinit-list-snippets-tree-missing-221
title: zinit ls fails or shows plain output because tree is not installed
category: troubleshooting
tags: [command, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/221
related: []
---

## Summary

`zinit ls` (list snippets) requires a tree-listing program. If `tree`, `exa`, or `eza` is not installed, the command may fail or fall back to `ls` with a flat listing. The `ZINIT[LIST_COMMAND]` variable lets you specify a preferred program.

## Symptom

Running `zinit ls` produces no output, an error, or an unhelpful flat directory listing instead of a tree view.

## Cause

`zinit ls` calls `tree` by default to display the snippets directory. If `tree` is not installed, the command fails silently or produces no output. The default fallback order is: `exa` → `tree` → `ls`.

## Fix / Workaround

Install `tree`:

```zsh
# macOS
brew install tree

# Debian/Ubuntu
apt install tree
```

Or configure zinit to use an alternative command before sourcing `zinit.zsh`:

```zsh
typeset -gAH ZINIT
ZINIT[LIST_COMMAND]='eza --tree --icons -L3 --color=always'
# or
ZINIT[LIST_COMMAND]='ls --tree'
# or simply
ZINIT[LIST_COMMAND]='ls -la'
source "${ZINIT_HOME}/zinit.zsh"
```

## Caveats

`ZINIT[LIST_COMMAND]` must be set before `zinit.zsh` is sourced. The default auto-detection order (exa → tree → ls) was added in PR #221.
