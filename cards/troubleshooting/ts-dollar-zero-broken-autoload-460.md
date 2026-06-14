---
id: ts-dollar-zero-broken-autoload-460
title: "$0 / %x expansion returns wrong path in zinit-autoloaded functions"
category: troubleshooting
tags: [troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/460
related: []
---

## Summary

The common idiom `0=${(%):-%x}` for getting the current script path does not return the correct value inside functions autoloaded via zinit's fpath-pollution-free mechanism. Fixed in PR #460.

## Symptom

Inside a function autoloaded by zinit, `0=${(%):-%x}` returns an empty string or the wrong path, breaking plugins that rely on `$0` to locate sibling files.

## Cause

Zinit's custom autoload implementation used `eval "function func { … }"` to define autoloaded functions. This syntax does not populate the `functions` hash in a way that the `%x` prompt expansion can inspect to find the source file path. Fixed by using `functions[func]="…"` instead.

## Fix / Workaround

Update zinit to get the fix:

```zsh
zinit self-update
exec zsh
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
