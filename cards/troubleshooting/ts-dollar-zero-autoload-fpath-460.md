---
id: ts-dollar-zero-autoload-fpath-460
title: "$0 / %x expansion returns wrong path in zinit-autoloaded functions"
category: troubleshooting
tags: [troubleshooting, plugin, completion]
source: https://github.com/zdharma-continuum/zinit/issues/460
related: []
---

## Summary

The common idiom `0=${(%):-%x}` for getting the current script path does not return the correct value inside functions autoloaded via zinit's fpath-pollution-free mechanism. Fixed in PR #460.

## Symptom

Inside a function autoloaded by zinit, `0=${(%):-%x}` returns an empty string or the wrong path, breaking plugins that rely on `$0` to locate sibling files. On the first call via zinit's autoload mechanism, `%x` expands to the calling context rather than the function's definition file, causing resource files to not be found.

## Cause

Zinit's fpath-pollution-free autoload defines functions using `eval "function funcname { … }"`. This syntax does not populate the `functions` hash in a way that the `%x` prompt expansion can inspect to find the source file path. Fixed in PR #460 by using `functions[funcname]="…"` (direct assignment to the functions hash), which preserves the correct `%x` expansion.

## Fix / Workaround

Update zinit to include PR #460:

```zsh
zinit self-update
exec zsh
```

For affected plugins as a workaround before updating, use the `autoload` ice to explicitly autoload from the correct path:

```zsh
zi ice autoload"the-function"
zi light user/plugin-with-autoload
```

Or load the plugin with `load` (with reporting) instead of `light` to ensure all functions are tracked:

```zsh
zi load user/plugin-with-autoload
```

## Examples

```zsh
# This pattern now works correctly in zinit-autoloaded functions
0=${(%):-%x}
local script_dir="${0:h}"
source "${script_dir}/helper.zsh"
```

## Caveats

This only affects functions loaded via zinit's built-in autoload mechanism (i.e. functions placed in `$fpath` directories managed by zinit). Functions loaded via standard `autoload -Uz` are not affected.
