---
id: recipe-cmatrix
title: "Recipe: cmatrix"
category: recipes
tags: [recipe, command, installation, binary]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Compiles and installs `cmatrix` (the Matrix terminal animation) from source into the Zinit prefix directory (`$ZPFX`).

## Syntax / Usage

```zsh
zi for \
    as'program' \
    atclone"./configure --prefix=$ZPFX > /dev/null" \
    atpull'%atclone' \
    make"-j PREFIX=${ZPFX} install > /dev/null" \
    pick"cmatrix" \
  abishekvashok/cmatrix
```

## Details

- `as'program'` — adds the picked file to `$PATH` instead of sourcing it.
- `atclone` — runs `./configure --prefix=$ZPFX` to prepare the build, installing into Zinit's prefix directory.
- `atpull'%atclone'` — repeats `atclone` on every update to reconfigure before re-building.
- `make"-j PREFIX=${ZPFX} install"` — builds and installs using all available CPU cores; output is suppressed.
- `pick"cmatrix"` — selects the compiled `cmatrix` binary as the program to expose on `$PATH`.

`$ZPFX` defaults to `~/.local/share/zinit/polaris`; `$ZPFX/bin` is automatically on `$PATH`.

## Examples

```zsh
zi for \
    as'program' \
    atclone"./configure --prefix=$ZPFX > /dev/null" \
    atpull'%atclone' \
    make"-j PREFIX=${ZPFX} install > /dev/null" \
    pick"cmatrix" \
  abishekvashok/cmatrix
```
