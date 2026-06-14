---
id: ts-zinit-ls-command-missing-670
title: '"zinit ls" and "zinit clist" — unknown subcommand errors'
category: troubleshooting
tags: [troubleshooting, command]
source: https://github.com/zdharma-continuum/zinit/issues/670
related: []
---

## Summary

`zinit ls` and `zinit clist` are documented in various places but fail with "Unknown subcommand" errors. These commands have been removed or renamed in newer zinit versions.

## Symptom

```
ERROR: Unknown subcommand: `ls` (it should be one of, e.g.: `load`, `snippet`, `update`, `delete`, …)
ERROR: Unknown subcommand: `clist`
```

## Cause

Older documentation and tutorials reference `zinit ls`, `zinit clist`, `zinit list`, and `zinit list-plugins`/`zinit list-snippets`. These were removed or replaced:
- `zinit ls` → replaced by `zinit snippets` and `zinit plugins`
- `zinit clist` → replaced by `zinit completions`

## Fix / Workaround

Use the current equivalents:

| Old command | Current command |
|---|---|
| `zinit ls` | `zinit snippets` |
| `zinit clist` | `zinit completions` |
| `zinit list` / `zinit list-plugins` | `zinit plugins` |
| `zinit list-snippets` | `zinit snippets` |

Note: `zinit snippets` requires `tree` to be installed. If `tree` is not available, set `ZINIT[LIST_COMMAND]` to an alternative:

```zsh
ZINIT[LIST_COMMAND]="ls -la"
```
