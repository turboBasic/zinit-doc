---
id: ts-turbo-scheduler-broken-429-433
title: Turbo mode stops loading plugins after scheduler performance change
category: troubleshooting
tags: [turbo, plugin, troubleshooting, performance]
source: https://github.com/zdharma-continuum/zinit/issues/433
related: [ts-turbo-broken-scheduler-429]
---

## Summary
A performance change (PR #429) that increased the scheduler idle interval from 1 second to 10 seconds broke Turbo mode entirely on macOS ARM, causing plugins using `wait` to never load.

## Symptom
Plugins configured with `wait` ice do not load after shell startup. Functions, completions, and key bindings provided by those plugins are missing. No error messages are shown.

## Cause
PR #429 changed the scheduler check interval to 10 seconds when no tasks were queued. The change introduced a regression where the scheduler stopped firing for queued Turbo tasks on macOS ARM (zsh 5.9). PR #432 reverted the change.

## Fix / Workaround
Update zinit to a version that includes the revert (PR #432):

```zsh
zinit self-update
```

If you cannot update, remove the performance patch by reverting the scheduler logic. The revert is included in any zinit version after the `released` tag on PR #432.

## Caveats
This regression only affected macOS ARM (Apple Silicon) systems running zsh 5.9. Linux and Intel Mac users may not have been affected.
