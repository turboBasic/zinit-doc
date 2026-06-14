---
id: ts-configure-ice-build-systems-351
title: configure ice does not detect CMake, Meson, or SCons projects automatically
category: troubleshooting
tags: [ice, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/351
related: [ts-configure-ice-prefix-zpfx-334]
---

## Summary
Early versions of the `configure''` ice only supported Autotools (`./configure`). Projects using CMake, Meson, or SCons required explicit `atclone`/`atpull` hooks. PR #351 extended the ice to auto-detect and invoke the correct build system.

## Symptom
Using `configure` ice on a CMake-based project (e.g. Neovim) fails with errors because there is no `./configure` script:

```
./configure: No such file or directory
```

## Cause
The original `configure''` ice was Autotools-only. Build systems like CMake (CMakeLists.txt), Meson (meson.build), and SCons (SConstruct) require different invocation.

## Fix / Workaround
Update zinit to a version that includes PR #351, which added multi-build-system support. The `configure''` ice now auto-detects: CMake (`c` flag), SCons (`s` flag), Meson (`m` flag), and Autotools (default).

```zsh
# Auto-detect build system (checked in order: cmake, scons, meson, autotools)
zi configure make"install" for some/cmake-project

# Explicit CMake
zi configure"c" make"install" for some/cmake-project

# Autotools with autogen.sh first (# flag)
zi configure"#" make"install" for some/autotools-project

# Pass extra arguments
zi configure"m --buildtype=release" for some/meson-project
```

The `configure''` ice automatically passes `--prefix=$ZPFX` for Autotools; CMake/Meson/SCons receive equivalent prefix flags.
