---
id: ts-configure-make-cmake-build-ices-613
title: "Building source-compiled plugins with configure, make, cmake, and build ices"
category: troubleshooting
tags: [ice, installation, troubleshooting, binary]
source: https://github.com/zdharma-continuum/zinit/issues/613
related: []
---

## Summary

Zinit provides dedicated `configure`, `make`, `cmake`, and `build` ices for compiling plugins from source, replacing manual `atclone`/`atpull` commands for standard build systems.

## Symptom

Users who need to compile plugins from source use verbose `atclone"./configure --prefix=$ZPFX && make"` patterns that are hard to maintain and don't integrate with `zinit delete`.

## Cause

Not a bug — this documents the build-system ice feature set.

## Fix / Workaround

Use the dedicated build ices:

```zsh
# autotools project (./configure + make)
zinit configure make for user/plugin

# cmake project
zinit cmake make for user/plugin

# shorthand: null + configure + make with default flags
zinit build for user/plugin

# pass extra flags
zinit ice configure'--with-foo' make'install'
zinit load user/plugin

# cmake with install step
zinit ice cmake make'install'
zinit load user/plugin
```

The `configure` ice automatically passes `--prefix=$ZPFX`. Supported build systems (checked in order): CMake, scons, meson, autotools.

Setting `ZINIT[DEBUG]=1` enables debug logging (`+zi-log "{dbg} ..."`) to trace build steps.

## Caveats

`zinit delete` handles cleanup for plugins built with `make` and `cmake` ices. The `build` ice requires a Zinit version that includes the #613 feature set.
