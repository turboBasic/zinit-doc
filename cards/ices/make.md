---
id: make
title: "make"
category: ices
tags: [ice, plugin, binary]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [configure, atclone, atpull, pick]
---

## Summary

`make''` runs `make` after cloning or updating a plugin. It supports passing arguments
to make and can be ordered before or after `atclone''`/`atpull''` using the `!` prefix.

## Syntax / Usage

```zsh
zi ice make                              # run make with no args (default target)
zi ice make"install PREFIX=$ZPFX"        # pass arguments
zi ice make"!"                           # run make BEFORE atclone/atpull
zi ice make"!!"                          # run make before make! and before atclone/atpull
```

## Details

Without a value, `make` runs the default target. Any string value is passed as
arguments to the `make` command.

Ordering variants:
- `make''` (no prefix): runs after `mv''`, `cp''`, and `atclone''`/`atpull''`.
- `make'!'`: runs before `atclone''`/`atpull''` but after `mv''`/`cp''`.
- `make'!!'`: runs before `make'!'`, i.e. the earliest possible stage.

`$ZPFX` is automatically available and points to the Zinit polaris prefix
(`~/.local/share/zinit/polaris` by default). Use it to install into the user prefix
without root.

## Examples

```zsh
# Build and install git-extras into $ZPFX
zi ice as"program" pick"$ZPFX/bin/git-*" make"PREFIX=$ZPFX"
zi light tj/git-extras

# Run ./configure before make (using !)
zi ice as"program" atclone"./configure" atpull"%atclone" make pick"src/vim"
zi light vim/vim

# Direnv: run make! to build before atclone generates hook
zi ice as"program" make'!' atclone'./direnv hook zsh > zhook.zsh' atpull'%atclone' src"zhook.zsh"
zi light direnv/direnv
```

## See Also

- configure
- atclone
- atpull
- pick
