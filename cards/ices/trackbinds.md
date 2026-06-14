---
id: trackbinds
title: "trackbinds"
category: ices
tags: [ice, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [bindmap, light-mode]
---

## Summary

`trackbinds` enables tracking of `bindkey` calls even when a plugin is loaded with the
lightweight `zinit light` command (where investigating is normally disabled). It is
required for `bindmap''` to function in light-mode loads.

## Syntax / Usage

```zsh
zi ice trackbinds bindmap"^R -> ^T"
zi light some/plugin
```

## Details

`zinit light` skips Zinit's reporting and tracking for faster loads. `trackbinds` is
an exception: it shadows only `bindkey` calls, leaving all other tracking disabled.
This is the same effect as passing `-b` to the `light` subcommand:

```zsh
zi light -b some/plugin   # equivalent to trackbinds ice
```

Does not work with snippets.

## Examples

```zsh
# Remap Ctrl-R to Ctrl-T in a light-loaded plugin
zi ice trackbinds bindmap"^R -> ^T"
zi light zsh-users/zsh-history-substring-search
```

## See Also

- bindmap
- light-mode
