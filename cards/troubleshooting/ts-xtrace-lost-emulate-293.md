---
id: ts-xtrace-lost-emulate-293
title: set -x / xtrace stops working inside zinit functions
category: troubleshooting
tags: [troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/293
related: []
---

## Summary

When debugging with `set -x` (xtrace), the trace output stops inside zinit's internal functions because they use `emulate -L zsh` which resets options including `xtrace`. Fixed in PR #293.

## Symptom

After enabling `set -x` for debugging, trace output disappears when execution enters zinit functions like `.zinit-load`:

```
+ .zinit-load user/plugin ...
# (no further trace output inside .zinit-load)
```

## Cause

Zinit uses `emulate -L zsh` at the start of many internal functions to establish a clean zsh environment. This resets `xtrace` (`-x`) along with all other options. The fix adds `-o xtrace` to `emulate -L` calls when xtrace is active at the function's entry point.

## Fix / Workaround

Update zinit to get the xtrace propagation fix:

```zsh
zinit self-update
```

As a workaround before updating, set xtrace after zinit functions are entered by wrapping your specific plugin load:

```zsh
# Trace only the plugin load, not zinit internals
zinit ice atload"set -x"
zinit load user/plugin
```

Or use `zinit report user/plugin` which provides non-trace reporting of what a plugin does.

## Caveats

The xtrace propagation fix ensures `-o xtrace` is passed to `emulate -L` only when already active, not unconditionally. This means you must enable `set -x` before the function call you want to trace.
