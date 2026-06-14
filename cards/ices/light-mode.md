---
id: light-mode
title: "Ice: light-mode''"
category: ices
tags: [ice, plugin, performance]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [trackbinds, bindmap]
---

## Summary

`light-mode` loads a plugin without Zinit's investigating (reporting) subsystem, the
same as using `zinit light` instead of `zinit load`. It is primarily useful in the
`for`-syntax where there is no separate `light` subcommand.

## Syntax / Usage

```zsh
zinit light-mode for \
  zsh-users/zsh-autosuggestions \
  zdharma-continuum/fast-syntax-highlighting
```

## Details

`zinit load` enables full tracking: aliases, functions, bindkeys, variables, PATH/FPATH
entries are all reported. `zinit light` disables this for faster startup. `light-mode`
ice achieves the same effect from within an ice specification, which is necessary in
the `for`-syntax.

`light-mode` has no effect when already using `zinit light`.

## Examples

```zsh
# for-syntax: mix light and normal loads in one declaration
zinit for \
    light-mode \
  zsh-users/zsh-autosuggestions \
    light-mode \
  zdharma-continuum/fast-syntax-highlighting \
  zdharma-continuum/history-search-multi-word \
    light-mode \
    pick"async.zsh" \
    src"pure.zsh" \
  sindresorhus/pure
```

## See Also

- trackbinds
- bindmap
