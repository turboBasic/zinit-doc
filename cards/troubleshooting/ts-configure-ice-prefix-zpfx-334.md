---
id: ts-configure-ice-prefix-zpfx-334
title: Simplifying autotools/cmake builds with the configure ice
category: troubleshooting
tags: [ice, binary, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/334
related: []
---

## Summary

Building source-based plugins that use `./configure` + `make` historically required verbose `atclone`/`atpull` ice chains. The `configure` ice is a shorthand that handles the full build lifecycle automatically.

## Symptom

Users writing repetitive boilerplate like:

```zsh
zinit ice atclone"./configure --prefix=$ZPFX" atpull"%atclone" make"install"
zinit light some-project/ctags
```

## Fix / Workaround

Use the `configure` ice instead:

```zsh
# Equivalent to: atclone'./configure --prefix=$ZPFX' atpull'%atclone' make'install'
zinit configure make for universal-ctags/ctags
```

The `configure` ice:
- Runs `./configure --prefix=$ZPFX` automatically
- Runs `./autogen.sh` first if `#` is given in the ice value
- Supports cmake, meson, and scons via flags (`c`, `m`, `s`)
- Works with `build` ice (shorthand for `as'null' configure make'install'`)

```zsh
# Even shorter with build ice
zinit build for universal-ctags/ctags

# Autogen + configure
zinit ice configure'#'
zinit light some-autotools-project/tool
```

## Examples

```zsh
# Build from a GitLab source with custom prefix
zinit id-as from"gitlab.matrix.org" build for matrix-org/olm

# Build with extra configure flags
zinit ice configure'--enable-feature --disable-other'
zinit light some-project/tool
```

## Caveats

The `configure` ice sets `--prefix=$ZPFX` by default. `$ZPFX/bin` is automatically in `$PATH`. To install elsewhere, either set `$ZPFX` before loading zinit, or pass a custom prefix in the ice value: `configure'--prefix=$HOME/.local'`.
