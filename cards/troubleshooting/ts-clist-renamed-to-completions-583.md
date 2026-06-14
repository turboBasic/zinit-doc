---
id: ts-clist-renamed-to-completions-583
title: "clist subcommand renamed to completions"
category: troubleshooting
tags: [completion, command, migration, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/583
related: []
---

## Summary

The `clist` subcommand was renamed to `completions` to reduce command duplication; configs using `zinit clist` need updating.

## Symptom

Running `zinit clist` produces an "unknown subcommand" error or no output after upgrading Zinit.

## Cause

`clist` was an alias for `completions` and was removed. The canonical subcommand is now `completions`.

## Fix / Workaround

Replace `zinit clist` with `zinit completions` in all configs and scripts:

```zsh
# Old (may not work on newer versions)
zinit clist

# New
zinit completions
zinit completions 5   # 5 completions per line
```

## Caveats

`clist` may still work on some versions via an alias. Check with `zinit help` to see current available subcommands.
