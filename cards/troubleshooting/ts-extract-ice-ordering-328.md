---
id: ts-extract-ice-ordering-328
title: extract ice runs before atclone — archive not available when atclone fires
category: troubleshooting
tags: [ice, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/328
related: []
---

## Summary

Before PR #328, the `extract` ice ran after `atclone`. This meant `atclone` could not reference the unpacked archive contents because extraction happened too late. PR #328 moved `extract` to run before `atclone`, `atpull`, `mv`, and `cp`.

## Symptom

An `atclone` command that runs `./configure` or another build step fails because the source files are still in an archive (e.g. `tool.tar.gz`) and have not been unpacked yet:

```
atclone"./configure --prefix=$ZPFX"
# Fails: no such file or directory: ./configure
```

## Cause

Previously the execution order placed `extract` after `atclone`, so unpacking happened after the build hooks. This made it impossible to run `./configure` in `atclone` for downloaded archives. Fixed by moving `extract` earlier in the ice execution order.

## Fix / Workaround

Update zinit to get the corrected execution order:

```zsh
zinit self-update
```

After updating, the correct pattern for building from a downloaded archive is:

```zsh
zinit ice from"gh-r" extract"!" \
    atclone"./configure --prefix=$ZPFX" \
    atpull"%atclone" \
    make"install"
zinit light some-project/tool
```

The `extract"!"` ice unpacks and flattens one directory level, making the `./configure` script directly accessible to `atclone`.

## Caveats

The current order of execution is: `atinit` → `atpull!` → `make!!` → `mv` → `cp` → `extract` → `atclone`/`atpull` → `make` → (source) → `src` → `multisrc` → `atload`.
