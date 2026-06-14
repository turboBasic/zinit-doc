---
id: ts-ice-order-execution
title: Order of execution for zinit ice modifiers
category: troubleshooting
tags: [ice, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/141
related: [ts-atpull-repeat-atclone, ts-git-extras-zpfx-make]
---

## Summary

Zinit executes ice modifiers in a defined order. Understanding this order is necessary when chaining build steps like `configure`, `make`, `mv`, `cp`, and `atclone`.

## Question / Problem

When multiple ices interact (e.g. `make` runs before files are moved by `mv`, or `atclone` runs before `src` is sourced), the actual sequence can be surprising.

## Answer / Solution

The official execution order from the zinit documentation:

```
atinit
  → atpull! (runs before git pull/svn update when updating)
  → make!!
  → mv
  → cp
  → make!
  → atclone / atpull (runs after git pull/svn update)
  → make
  → (plugin script loading / source)
  → src
  → multisrc
  → atload
```

Key points:

- `make!!` runs **before** `mv`/`cp` and before `atclone`
- `make!` runs **after** `mv`/`cp` but **before** `atclone`
- `atclone` runs **after** `make!` and **before** the plugin is sourced
- `atload` runs **after** the plugin script is sourced
- `src` is sourced **after** the main plugin file

## Examples

Building a program that needs configure + make, then picking the binary:

```zsh
# Order: mv → atclone (runs ./configure) → make → pick (used for $PATH)
zinit ice \
    as"program" \
    atclone"./configure --prefix=$ZPFX" \
    atpull"%atclone" \
    make \
    pick"src/binary"
zinit light some/compiled-tool
```

Using `make'!'` to run make **before** atclone:

```zsh
# make'!' runs first, then atclone
zinit ice as"program" make'!' \
    atclone'./tool hook zsh > hook.zsh' \
    atpull'%atclone' \
    src"hook.zsh"
zinit light some/tool
```

## Caveats

`atpull!` (with `!` suffix) runs **before** `git pull`, allowing you to stash or reset before pulling. Without `!`, `atpull` runs after the pull. The `!` prefix on `wait'!...'` has a different meaning — it resets the prompt after turbo loading.
