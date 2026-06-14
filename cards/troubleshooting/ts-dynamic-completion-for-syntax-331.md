---
id: ts-dynamic-completion-for-syntax-331
title: Tab completion does not work for zinit for-syntax at arbitrary cursor positions
category: troubleshooting
tags: [completion, troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/331
related: []
---

## Summary
Standard Zsh tab completion (`_zinit`) does not complete plugin IDs or ice names when the cursor is at a non-final position in a `zinit for` command, because the completion function requires a fixed command structure.

## Symptom
Pressing Tab after typing `zi for june/` produces no completion, or completes incorrectly. Tab completion only works for the canonical single-argument forms like `zi load <tab>` or `zi snippet <tab>`.

## Cause
The `_zinit` completion function is context-sensitive and matches specific argument positions. The `for`-syntax allows ices and plugin IDs in any order, which breaks position-based completion.

## Fix / Workaround
Use the action-complete widgets added in PR #406. After updating zinit, press Alt-Shift-A anywhere in the command line to trigger fzf-based plugin ID completion, and Alt-Shift-C for ice completion:

```zsh
# Keys are unbound by default — bind them:
zstyle ":zinit:action-complete:plugin-id" key '^[A'   # Alt-Shift-A
zstyle ":zinit:action-complete:ice"       key '^[C'   # Alt-Shift-C
```

These widgets work at any cursor position in any zinit command, not just the `for`-syntax.

## Examples

```zsh
# Type partial plugin ID, then press Alt-Shift-A to get fzf completion:
zi for june/  # press Alt-Shift-A → fzf shows matching plugins

# Type partial ice, press Alt-Shift-C:
zi ice wa  # press Alt-Shift-C → fzf shows wait, wrap-track, etc.
```
