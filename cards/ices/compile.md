---
id: compile
title: "Ice: compile''"
category: ices
tags: [ice, plugin, performance]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [nocompile, pick]
---

## Summary

`compile''` specifies additional files to compile to `.zwc` bytecode beyond the file
selected by `pick''`. It accepts a glob pattern and supports brace expansion.

## Syntax / Usage

```zsh
zi ice compile"*.zsh"
zi ice compile"{lib/*,functions/*}.zsh"
```

## Details

Zinit automatically compiles the `pick''`-selected file. `compile''` extends that to
additional files. Compiled `.zwc` files load faster because Zsh skips parsing.

The pattern supports brace expansion (e.g. `{a/*,b*}`) in addition to standard globs.

## Examples

```zsh
# Compile all .zsh files in the plugin directory
zi ice compile"*.zsh"
zi light user/large-plugin

# Compile specific subdirectories
zi ice compile"{lib,src}/*.zsh"
zi light user/structured-plugin
```

## See Also

- nocompile
- pick
