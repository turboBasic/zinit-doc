---
id: recipe-jq
title: "Recipe: jq"
category: recipes
tags: [recipe, binary, command, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs `jq`, the lightweight command-line JSON processor, either as a pre-built binary from GitHub Releases or compiled from source with a built-in Oniguruma regex library.

## Syntax / Usage

### Binary

```zsh
zi for \
    from'gh-r' \
    sbin'* -> jq' \
    nocompile \
  @jqlang/jq
```

### Compile from source

```zsh
zinit for \
    configure'--with-oniguruma=builtin' \
    make \
  jqlang/jq
```

## Details

### Binary variant

- `from'gh-r'` — downloads the release asset from GitHub Releases.
- `sbin'* -> jq'` — creates a shim named `jq` pointing to the downloaded binary (requires `zinit-annex-bin-gem-node`).
- `nocompile` — skips Zinit's Zsh compilation step (not applicable to a binary).

### Compile-from-source variant

- `configure'--with-oniguruma=builtin'` — runs `./configure --prefix=$ZPFX --with-oniguruma=builtin`, bundling the Oniguruma regex library so no system dependency is needed.
- `make` — builds and installs `jq` into `$ZPFX`.

For the binary variant, `zinit-annex-bin-gem-node` must be loaded first. The compile-from-source variant requires standard build tools (`gcc`/`clang`, `make`, `autoconf`).

## Examples

```zsh
# Binary variant (fast, no compilation)
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zi for \
    from'gh-r' \
    sbin'* -> jq' \
    nocompile \
  @jqlang/jq

# OR: compile from source
zinit for \
    configure'--with-oniguruma=builtin' \
    make \
  jqlang/jq
```
