---
id: ts-clist-unknown-subcommand-569
title: "zinit clist: Unknown subcommand error"
category: troubleshooting
tags: [completion, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/569
related: []
---

## Summary

Running `zinit clist` produces "Unknown subcommand: `clist`" after the command was renamed to `completions` in a recent zinit version.

## Symptom

```
ERROR: Unknown subcommand: `clist` (it should be one of, e.g.: `load`, `snippet`, `update`, `delete`, ...)
```

## Cause

The `clist` subcommand was renamed to `completions` (PR #583) to reduce naming confusion with the separate `cdclear`, `cdlist` commands.

## Fix / Workaround

Use the new command name:

```zsh
# Old (no longer works)
zinit clist

# New
zinit completions
```

To list 5 completions per line:

```zsh
zinit completions 5
```
