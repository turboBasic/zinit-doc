---
id: nocd
title: "Ice: nocd''"
category: ices
tags: [ice, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [atinit, atload, atclone, atpull]
---

## Summary

`nocd` prevents Zinit from changing the current directory into the plugin's directory
when evaluating hook ices (`atinit''`, `atload''`, `atclone''`, `atpull''`).

## Syntax / Usage

```zsh
zi ice nocd
```

## Details

By default, when any of the `at*` hooks execute, the working directory is the plugin's
local directory. `nocd` disables this `cd` so hooks run from whatever directory the
shell is currently in.

This is useful when hooks reference files by absolute path and a `cd` would be
undesired or when the hook must run relative to `$PWD`.

`nocd` is a flag ice — it takes no value.

## Examples

```zsh
# Run atload without cding into the plugin directory
zi ice wait lucid nocd atload"export MY_VAR=$PWD"
zi light some/plugin
```

## See Also

- atinit
- atload
- atclone
- atpull
