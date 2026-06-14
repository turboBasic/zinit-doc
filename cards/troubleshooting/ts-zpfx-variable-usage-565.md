---
id: ts-zpfx-variable-usage-565
title: "ZPFX variable undocumented — what it is and how to use it"
category: troubleshooting
tags: [ice, installation, troubleshooting, binary]
source: https://github.com/zdharma-continuum/zinit/issues/565
related: []
---

## Summary

`$ZPFX` is Zinit's installation prefix variable, defaulting to `~/.local/share/zinit/polaris`. It is automatically used by `configure''` and `make''` ices and its `bin/` subdirectory is prepended to `$PATH`.

## Symptom

Compiled plugins installed via `configure` and `make` ices are not found in `$PATH`, or users do not know how to change the installation prefix.

## Cause

Not a bug — this documents `$ZPFX` usage.

## Fix / Workaround

`$ZPFX` is set automatically by Zinit. To use a custom prefix, set it before sourcing Zinit:

```zsh
export ZPFX=$HOME/.local   # match system prefix
# or
export ZPFX=$HOME/my-tools
```

`$ZPFX/bin` is automatically prepended to `$PATH`. Programs compiled with `configure''` and `make''` install to `$ZPFX` automatically.

Common usage:

```zsh
# Build and install to $ZPFX
zinit configure make for user/source-plugin

# Inspect installed files
ls $ZPFX/bin
ls $ZPFX/share

# Point pkg-config at $ZPFX
export PKG_CONFIG_PATH="$ZPFX/lib/pkgconfig:$PKG_CONFIG_PATH"
```

## Caveats

`$ZPFX/man` is set as `ZINIT[MAN_DIR]` but may not be on `$MANPATH` automatically. Add it manually if needed:

```zsh
export MANPATH="$ZPFX/man:$MANPATH"
```
