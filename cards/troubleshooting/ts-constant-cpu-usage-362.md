---
id: ts-constant-cpu-usage-362
title: Zinit causes constant background CPU usage even with minimal configuration
category: troubleshooting
tags: [troubleshooting, performance, turbo]
source: https://github.com/zdharma-continuum/zinit/issues/362
related: []
---

## Summary

Even with a minimal zinit configuration (just `source zinit.zsh` and a few plugins), each open shell process consumes a small but persistent CPU percentage (~0.7% per shell), increasing with more plugins.

## Symptom

`top` or `htop` shows each `zsh` process with non-zero CPU usage that persists even when the shell is idle. Usage grows with the number of loaded plugins.

## Cause

Zinit's turbo scheduler runs a `precmd` / `zle` hook on a timer interval to check for pending tasks. PR #435 fixed a logic inversion that caused the scheduler to spin instead of exit early when no tasks are pending. If you are on an older version, the scheduler may be checking continuously.

## Fix / Workaround

Update zinit to a version that includes the fix from PR #435:

```zsh
zinit self-update
```

If the issue persists after update, check whether any plugin installs a high-frequency `precmd` or `preexec` hook. Use `zinit report <plugin>` to see what hooks a plugin registers.

Track https://github.com/zdharma-continuum/zinit/issues/362 for ongoing reports.
