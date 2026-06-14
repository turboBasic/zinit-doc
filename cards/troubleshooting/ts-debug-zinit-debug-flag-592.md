---
id: ts-debug-zinit-debug-flag-592
title: "How to enable debug logging in zinit"
category: troubleshooting
tags: [troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/592
related: []
---

## Summary

Zinit has a debug logging mechanism gated on `$ZINIT[DEBUG]`. When set, internal `{dbg}`-tagged log messages are printed, helping diagnose plugin load failures, hook execution order, and ice processing.

## Symptom

Plugin loading fails silently or produces unexpected behavior with no visible output explaining what zinit did internally.

## Fix / Workaround

Enable debug output by setting `ZINIT[DEBUG]` before sourcing zinit or before the problem operation:

```zsh
# Enable before sourcing zinit
declare -A ZINIT
ZINIT[DEBUG]=1
source "${ZINIT_HOME}/zinit.zsh"
```

Or enable interactively for a single command:

```zsh
ZINIT[DEBUG]=1 zinit load username/plugin
```

Debug messages use the `{dbg}` format token and appear prefixed in the output.

## Examples

```zsh
# In .zshrc, before sourcing zinit
declare -A ZINIT
ZINIT[DEBUG]=1
source "${ZINIT_HOME}/zinit.zsh"

# Debug a single load
ZINIT[DEBUG]=1 zinit light zsh-users/zsh-autosuggestions
```

## Caveats

Debug output can be very verbose. Disable by unsetting after diagnosis:

```zsh
unset 'ZINIT[DEBUG]'
```
