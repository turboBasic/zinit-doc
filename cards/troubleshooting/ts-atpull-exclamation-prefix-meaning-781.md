---
id: ts-atpull-exclamation-prefix-meaning-781
title: "What the ! prefix on atpull means and when to use it"
category: troubleshooting
tags: [ice, troubleshooting, git]
source: https://github.com/zdharma-continuum/zinit/issues/781
related: []
---

## Summary

The `!` prefix on `atpull` (i.e. `atpull'!...'`) controls *when* the hook runs relative to `git pull`. Without `!`, the hook runs after pulling. With `!`, it runs before — specifically before `mv`/`cp` ices and before `git pull` itself.

## Symptom

Confusion about why `atpull'%atclone'` runs in a different order than `atpull'!%atclone'`, or why `reset` ice sometimes conflicts with `atpull` hooks.

## Cause

The internal hook naming scheme uses `e-` (exclamation) and `no-e-` prefixes to distinguish `atpull'!...'` from `atpull'...'` hooks. This was undocumented.

## Fix / Workaround

Use the correct prefix based on when you need the hook to run:

```zsh
# Run AFTER git pull (default)
zinit ice atpull'./configure && make'
zinit light some/plugin

# Run BEFORE git pull (pre-pull hook)
zinit ice atpull'!git stash'
zinit light some/plugin

# Repeat atclone steps on update (most common use)
zinit ice atclone'./install.sh' atpull'%atclone'
zinit light some/plugin
```

The `%atclone` shorthand in `atpull` re-runs the `atclone` command on every update (only when new commits are fetched).

## Caveats

The `reset` ice runs `git reset --hard HEAD` before the update, which can conflict with `atpull'!...'` hooks that expect uncommitted changes to be present. Use `run-atpull` to force `atpull` to execute even when no new commits are downloaded.
