---
id: configure
title: "configure"
category: ices
tags: [ice, plugin, binary]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [make, atclone, atpull]
---

## Summary

`configure''` runs `./configure` (or equivalent build-system script) and passes
`--prefix=$ZPFX` by default. It is the high-level companion to `make''` for source
compilation workflows.

## Syntax / Usage

```zsh
zi ice configure          # runs ./configure --prefix=$ZPFX
zi ice configure"!"       # runs before make'!' (earlier ordering)
zi ice configure"#"       # also runs ./autogen.sh first
```

## Details

`configure''` automatically passes `--prefix=$ZPFX` to `./configure`. When no
`configure` script exists but other build-system files are present, it detects and
invokes the appropriate tool. Currently supported build systems (checked in order):
`configure`, CMake, scons, meson.

Ordering relative to `make''`:
- Default (`configure`): runs before `make''` and after `make'!'`.
- `configure'!'`: runs before `make'!'` and after `make'!!'`.

The `#` modifier additionally executes `./autogen.sh` before `./configure`.

`$ZPFX` defaults to `~/.local/share/zinit/polaris`; `$ZPFX/bin` is automatically
prepended to `$PATH`.

## Examples

```zsh
# Compile and install universal-ctags
zi ice configure make
zi light universal-ctags/ctags

# Full source build: autogen, configure, make install
zi ice configure"#" make"install"
zi light some/autotools-project
```

## See Also

- make
- atclone
- atpull
