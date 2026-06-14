---
id: ts-delete-flags-after-positional-args-587
title: "zinit delete flags ignored when placed after plugin name"
category: troubleshooting
tags: [command, troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/587
related: []
---

## Summary

`zinit delete` option flags like `--all` or `--clean` were only recognized when placed before positional arguments; flags after the plugin name were silently ignored.

## Symptom

Running `zinit delete my/plugin --all` does not behave the same as `zinit delete --all my/plugin`. The flag after the name appears to be ignored.

## Cause

The option parsing in the `delete` subcommand stopped processing flags once it encountered a positional argument.

## Fix / Workaround

Upgrade to a version that includes the fix for issue #587. On older versions, always place flags before positional arguments:

```zsh
# Works on all versions
zinit delete --all
zinit delete --clean

# May not work on older versions
zinit delete my/plugin --clean
```
