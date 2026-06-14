---
id: ts-debug-logging-zinit-debug-key-598
title: "Enabling Zinit debug logging with ZINIT[DEBUG]"
category: troubleshooting
tags: [troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/598
related: []
---

## Summary

Zinit has a built-in debug logging mechanism controlled by the `ZINIT[DEBUG]` hash key. Setting it enables verbose `{dbg}` log lines that help trace plugin loading and build steps.

## Symptom

A plugin fails to load or a build ice doesn't run as expected, and there is no visible error message to diagnose the problem.

## Cause

Not a bug — this documents the debug logging feature.

## Fix / Workaround

Enable debug logging before sourcing Zinit or before the problematic `zinit` call:

```zsh
# Enable debug output
ZINIT[DEBUG]=1

# Then load the plugin you want to trace
zinit ice from"gh-r" as"program"
zinit load user/plugin

# Disable after diagnosis
unset 'ZINIT[DEBUG]'
```

Debug messages appear as `+zi-log "{dbg} ..."` output. They are printed inline with other Zinit messages.

## Caveats

`ZINIT[DEBUG]` must be set before the zinit call that you want to trace. Setting it after Zinit is already sourced is fine for subsequent calls but won't help with the initial load.
