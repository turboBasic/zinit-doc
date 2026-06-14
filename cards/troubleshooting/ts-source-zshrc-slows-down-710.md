---
id: ts-source-zshrc-slows-down-710
title: "Repeated source ~/.zshrc gets progressively slower"
category: troubleshooting
tags: [performance, troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/710
related: []
---

## Summary

Running `source ~/.zshrc` repeatedly in the same shell session causes startup time to grow with each invocation; the shell itself is not affected when started fresh with `exec zsh`.

## Symptom

Each `source ~/.zshrc` call takes longer than the previous one. Using `time (source ~/.zshrc)` shows steadily increasing numbers. Starting a new shell with `exec zsh` or `zsh` is fast.

## Cause

Zinit is not designed to be re-sourced in a running shell session. Each `source` call appends more entries to arrays like `$PATH`, `$FPATH`, and internal zinit state without deduplicating or unloading the previous state, causing cumulative overhead and function redefinitions.

## Fix / Workaround

Use `exec zsh` instead of `source ~/.zshrc` to apply zshrc changes. This replaces the current shell process with a fresh one:

```zsh
exec zsh
```

If you need to reload only a specific plugin, use zinit's unload/reload mechanism:

```zsh
zinit unload username/plugin
zinit load username/plugin
```

## Caveats

`source ~/.zshrc` in a live session is inherently unsupported — it accumulates duplicate entries and does not run the zinit unload hooks. Always use `exec zsh` to reload configuration.
