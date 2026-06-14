---
id: ts-dollar-zero-autoload-fpath-460
title: %x prompt expansion returns wrong path in autoloaded functions under zinit fpath management
category: troubleshooting
tags: [troubleshooting, plugin, completion]
source: https://github.com/zdharma-continuum/zinit/issues/460
related: []
---

## Summary
The `%x` prompt expansion — commonly used as `0=${(%):-%x}` to get the path to the currently executing script — returns the wrong path for autoloaded functions defined via zinit's pollution-free fpath management.

## Symptom
Inside an autoloaded function that uses `0=${(%):-%x}` to determine its own file path (a common pattern for plugins that locate their own resources), the variable `$0` resolves to the wrong path on the first call, causing resource files to not be found.

## Cause
Zinit's fpath-pollution-free autoload defines functions using `eval "function funcname { … }"`. When a function is invoked for the first time via this mechanism, `%x` expands to the calling context, not the function's definition file. Fixed in PR #460 by defining functions using `functions[funcname]="…"` (direct assignment to the functions hash), which preserves the correct `%x` expansion.

## Fix / Workaround
Update zinit to include PR #460 (`zinit self-update`).

For affected plugins as a workaround, use the `autoload` ice to explicitly autoload from the correct path:

```zsh
zi ice autoload"the-function"
zi light user/plugin-with-autoload
```

Or load the plugin with `load` (with reporting) instead of `light` to ensure all functions are tracked:

```zsh
zi load user/plugin-with-autoload
```
