---
id: recipe-neofetch
title: "Recipe: neofetch"
category: recipes
tags: [recipe, command, installation]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs `neofetch`, a command-line system information tool, by cloning its repository and running `make install` to put it on `$PATH`.

## Syntax / Usage

```zsh
zinit make for @dylanaraps/neofetch
```

## Details

- `make` — runs the default `make install` target, which installs the `neofetch` script into `$ZPFX/bin` (Zinit's prefix directory).

`$ZPFX/bin` is automatically on `$PATH`, so `neofetch` is immediately available after installation.

## Examples

```zsh
zinit make for @dylanaraps/neofetch
```
