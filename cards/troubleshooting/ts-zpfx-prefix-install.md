---
id: ts-zpfx-prefix-install
title: Using ZPFX to install compiled programs to a user prefix directory
category: troubleshooting
tags: [binary, ice, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/141
related: [ts-git-extras-zpfx-make, ts-make-ice-order]
---

## Summary

`$ZPFX` is zinit's user-prefix variable, defaulting to `~/.local/share/zinit/polaris`. Programs installed with `make"PREFIX=$ZPFX"` or `configure` ices land there, and `$ZPFX/bin` is automatically prepended to `$PATH`.

## Question / Problem

Users installing compiled tools with zinit need to know where binaries end up and how to use `$ZPFX` correctly with `make` and `configure` ices.

## Answer / Solution

`$ZPFX` behaves like `/usr/local` but inside your home directory. The layout is:

```
$ZPFX/
  bin/       # automatically added to $PATH by zinit
  lib/
  share/
  man/
```

**Using `configure` and `make` ices** (auto-uses `$ZPFX`):

```zsh
zinit configure make for universal-ctags/ctags
```

This runs `./configure --prefix=$ZPFX` + `make` + `make install` automatically.

**Manual `make` with explicit prefix**:

```zsh
zinit ice as"program" pick"$ZPFX/bin/git-*" make"install PREFIX=$ZPFX"
zinit light tj/git-extras
```

**Override `$ZPFX`** before sourcing zinit:

```zsh
export ZPFX=$HOME/.local   # use standard XDG location
```

## Examples

```zsh
# compile and install vim to $ZPFX
zinit ice \
    as"program" \
    atclone"rm -f src/auto/config.cache; ./configure" \
    atpull"%atclone" \
    make \
    pick"src/vim"
zinit light vim/vim

# After install, vim binary is at $ZPFX/bin/vim (or wherever ./configure puts it)
ls $ZPFX/bin
```

## Caveats

`$ZPFX/bin` is prepended to `$PATH` by zinit automatically. If `$ZPFX` is changed to a non-default location (e.g. `$HOME/.local`), zinit still adds `$ZPFX/bin` to PATH but existing system tools at that location may shadow zinit-installed versions or vice versa.
