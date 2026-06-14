---
id: recipe-stow
title: "Recipe: stow"
category: recipes
tags: [recipe, command, installation]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Builds and installs GNU `stow` (a symlink farm manager) from source using Zinit's `build` ice.

## Syntax / Usage

```zsh
zinit build for @aspiers/stow
```

## Details

- `build` — runs the build process for the cloned repository (equivalent to running `./configure && make && make install` targeting `$ZPFX`), then installs the `stow` script to `$ZPFX/bin`.

`$ZPFX/bin` is automatically on `$PATH`, so `stow` is immediately available after the build.

## Examples

```zsh
zinit build for @aspiers/stow
```
