---
id: ts-zinit-mute-warnings-plugin-registered
title: "Suppressing 'plugin already registered' warning"
category: troubleshooting
tags: [troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/710
related: [ts-source-zshrc-slows-down-710]
---

## Summary

Re-sourcing `.zshrc` or loading a plugin twice produces a "plugin already registered" warning. This can be suppressed via `ZINIT[MUTE_WARNINGS]`.

## Symptom

```
Warning: plugin already registered: username/plugin
```

Appears when the same plugin is declared more than once, or when `.zshrc` is sourced multiple times in a session.

## Fix / Workaround

Set `ZINIT[MUTE_WARNINGS]=1` before sourcing zinit to suppress the warning:

```zsh
declare -A ZINIT
ZINIT[MUTE_WARNINGS]=1
source "${ZINIT_HOME}/zinit.zsh"
```

The proper fix is to avoid loading the same plugin twice. Use `exec zsh` instead of `source ~/.zshrc` to reload configuration:

```zsh
exec zsh
```

## Examples

```zsh
# Suppress warning for development/testing workflows
declare -A ZINIT
ZINIT[MUTE_WARNINGS]=1
```

## Caveats

Setting `MUTE_WARNINGS=1` hides legitimate warnings too. Only use it when the duplicate registration is intentional (rare).
