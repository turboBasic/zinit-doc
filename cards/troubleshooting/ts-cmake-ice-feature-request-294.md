---
id: ts-cmake-ice-feature-request-294
title: No built-in ice for CMake projects — workaround with atclone/atpull
category: troubleshooting
tags: [ice, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/294
related: [ts-configure-ice-build-systems-351, ts-configure-ice-prefix-zpfx-334]
---

## Summary
Zinit had no `cmake''` ice, requiring CMake-based projects (e.g. Neovim) to use verbose `atclone`/`atpull` hooks. The `configure''` ice was later extended (PR #351) to auto-detect and invoke CMake.

## Symptom
Building a CMake-based plugin requires writing long hook chains:

```zsh
zi ice atclone"cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$ZPFX && cmake --build build && cmake --install build" \
       atpull"%atclone"
zi light neovim/neovim
```

## Fix / Workaround
Update zinit to a version that includes PR #351. The `configure''` ice now detects CMake and runs it automatically:

```zsh
# Auto-detect CMake (finds CMakeLists.txt)
zi configure make"install" for neovim/neovim

# Explicit cmake flag with extra args
zi configure"c -DCMAKE_BUILD_TYPE=Release" make"install" for neovim/neovim
```

The `configure''` ice passes `$ZPFX` as the install prefix automatically.

## Caveats
The `configure''` ice with CMake requires CMake 3.x to be installed and available in `$PATH`.
