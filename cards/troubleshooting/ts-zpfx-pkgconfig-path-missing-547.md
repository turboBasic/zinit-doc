---
id: ts-zpfx-pkgconfig-path-missing-547
title: "pkg-config cannot find libraries installed to $ZPFX"
category: troubleshooting
tags: [troubleshooting, ice, binary]
source: https://github.com/zdharma-continuum/zinit/issues/547
related: []
---

## Summary

When compiling programs via `configure''` and `make''` ices, libraries previously installed to `$ZPFX` are not found by `pkg-config` because `$ZPFX/lib/pkg-config` is not in `$PKG_CONFIG_PATH`.

## Symptom

Compiling a program that depends on a library also installed to `$ZPFX` fails with errors like:

```
configure: error: Library requirements (libpcre2-8) not met
```

Even though the library is present at `$ZPFX/lib/`.

## Cause

`$ZPFX/lib/pkg-config` (where pkg-config metadata files for ZPFX-installed libraries reside) was not appended to `$PKG_CONFIG_PATH`. Build systems that use `pkg-config` to locate libraries could not find them.

## Fix / Workaround

Add `$ZPFX/lib/pkgconfig` to `$PKG_CONFIG_PATH` in `.zshrc` before zinit is sourced:

```zsh
export PKG_CONFIG_PATH="${ZPFX:-$HOME/.local/share/zinit/polaris}/lib/pkgconfig:${PKG_CONFIG_PATH}"
```

Or set it after sourcing zinit (since `$ZPFX` is defined by zinit):

```zsh
source "${ZINIT_HOME}/zinit.zsh"
export PKG_CONFIG_PATH="${ZPFX}/lib/pkgconfig:${PKG_CONFIG_PATH}"
```

A PR (#478 / #547) to have zinit set this automatically was proposed.

## Caveats

Also consider adding `$ZPFX/include` to `$CPATH` and `$ZPFX/lib` to `$LIBRARY_PATH` / `$LD_LIBRARY_PATH` for full build-system compatibility.
