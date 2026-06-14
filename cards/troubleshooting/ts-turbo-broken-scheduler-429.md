---
id: ts-turbo-broken-scheduler-429
title: Turbo mode / wait ice stops working after zinit update
category: troubleshooting
tags: [turbo, troubleshooting, lazy-loading]
source: https://github.com/zdharma-continuum/zinit/issues/433
related: []
---

## Summary

After updating zinit, plugins using `wait` (Turbo mode) stop loading or load much later than expected. This was caused by a scheduler interval change from 1 second to 10 seconds that broke plugin loading, which was subsequently reverted.

## Symptom

Plugins with `wait` or `wait"0"` ice no longer load after the first prompt. Commands from turbo-loaded plugins are unavailable in the interactive shell.

## Cause

PR #429 changed the Turbo scheduler check interval from 1 second to 10 seconds to reduce CPU usage. This broke the scheduler's ability to fire plugin loads correctly in the expected timeframe. The change was reverted in PR #432.

## Fix / Workaround

Update zinit to a version that includes the revert (PR #432):

```zsh
cd ~/.local/share/zinit/zinit.git
git pull
exec zsh
```

Or:

```zsh
zinit self-update
exec zsh
```

## Caveats

If updating is not possible, a workaround is to replace `wait"0"` with `wait"1"` (1 second delay) which may work with the broken scheduler, though this is not guaranteed. The correct fix is to update zinit.
