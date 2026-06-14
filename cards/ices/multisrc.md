---
id: multisrc
title: "multisrc"
category: ices
tags: [ice, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [src, pick]
---

## Summary

`multisrc''` sources multiple files from a plugin or snippet directory in a single
declaration, supporting both space-separated lists and brace-expansion syntax.

## Syntax / Usage

```zsh
zi ice multisrc"file1.zsh file2.zsh"
zi ice multisrc"{misc,grep}.zsh"
zi ice multisrc"*.zsh"   # patterns are supported
```

## Details

Files are sourced in the order specified. Brace expansion is performed, and glob
patterns are accepted.

`multisrc''` runs after `src''` in the load order: `pick` → `src` → `multisrc` →
`atload`.

Works with both plugins and snippets.

## Examples

```zsh
# Source two specific files from a utility plugin
zi ice multisrc"misc.zsh grep.zsh"
zi light user/zsh-utils

# Source all .zsh files with brace expansion
zi ice multisrc"{aliases,functions,completions}.zsh"
zi light user/zsh-config
```

## See Also

- src
- pick
