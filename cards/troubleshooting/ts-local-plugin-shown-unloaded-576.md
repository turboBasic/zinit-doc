---
id: ts-local-plugin-shown-unloaded-576
title: _local prefixed plugins always shown as unloaded in "zinit plugins"
category: troubleshooting
tags: [troubleshooting, plugin, command]
source: https://github.com/zdharma-continuum/zinit/issues/576
related: []
---

## Summary

The `zinit plugins` command incorrectly reports `_local/plugin-name` plugins as unloaded even when they are actively loaded. Free-style named local plugins (without the `_local` prefix) display correctly.

## Symptom

```zsh
zinit wait lucid depth"1" for blockf completions "_local---eza"
```

After loading, `zinit plugins` shows `_local---eza` as unloaded.

## Cause

The loaded-plugin lookup in the `zinit plugins` command does not handle the `_local` prefix correctly when comparing stored plugin identifiers against the loaded-plugins registry.

## Fix / Workaround

No fix available as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/576

Workaround: use `zinit report _local/eza` or `zinit status _local/eza` to confirm the plugin is actually loaded — the report commands use a different lookup path that correctly handles `_local`.
