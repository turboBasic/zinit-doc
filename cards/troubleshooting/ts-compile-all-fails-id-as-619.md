---
id: ts-compile-all-fails-id-as-619
title: "zinit compile --all skips plugins loaded with id-as ice"
category: troubleshooting
tags: [ice, troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/619
related: []
---

## Summary

Plugins loaded with the `id-as` ice modifier are silently skipped when running `zinit compile --all`; compiling a single named plugin works correctly.

## Symptom

`zinit compile --all` runs without error but does not compile plugins that use `id-as`. Running `zinit compiled` shows those plugins are uncompiled.

## Cause

The logic for compiling all plugins used a different key to look up plugin state than the logic for compiling a single plugin. Plugins registered under an `id-as` nickname were not found by the all-plugins enumeration.

## Fix / Workaround

Update zinit (fixed in PR #619):

```zsh
zinit self-update
```

As a workaround, compile each `id-as` plugin individually:

```zsh
zinit compile my-nickname
```

## Examples

```zsh
# Plugin loaded with id-as
zinit ice id-as'my-nickname' wait lucid
zinit light username/repo

# Workaround: compile by nickname
zinit compile my-nickname
```
