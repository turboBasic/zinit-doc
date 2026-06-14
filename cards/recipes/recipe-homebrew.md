---
id: recipe-homebrew
title: "Recipe: homebrew"
category: recipes
tags: [recipe, binary, command, completion, installation]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs Homebrew itself (macOS/Linux package manager) via Zinit, keeps it updated, links its Zsh completion, generates and sources the shell environment script.

## Syntax / Usage

```zsh
zi for \
    as'null' \
    atclone'%atpull' \
    atpull'
         ./bin/brew update --preinstall \
      && ln -sf $PWD/completions/zsh/_brew $ZINIT[COMPLETIONS_DIR] \
      && rm -f brew.zsh \
      && ./bin/brew shellenv --dummy-arg > brew.zsh \
      && zcompile brew.zsh' \
    depth'3' \
    nocompletions \
    sbin'bin/brew' \
    src'brew.zsh' \
  homebrew/brew
```

## Details

- `as'null'` — disables the default script-sourcing and completion installation.
- `atclone'%atpull'` — runs the `atpull` hook at initial clone time as well as on updates.
- `atpull` — on each update: runs `brew update --preinstall`, symlinks the Zsh completion into Zinit's completions directory, regenerates `brew.zsh` with `brew shellenv`, and compiles it for faster loading.
- `depth'3'` — performs a shallow clone with 3 levels of history to speed up the initial clone.
- `nocompletions` — suppresses Zinit's default completion detection since the completion is managed manually via the symlink in `atpull`.
- `sbin'bin/brew'` — creates a shim for the `brew` binary (requires `zinit-annex-bin-gem-node`).
- `src'brew.zsh'` — sources the generated shell environment script (sets `HOMEBREW_PREFIX`, `PATH`, `MANPATH`, etc.) on shell startup.

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zi for \
    as'null' \
    atclone'%atpull' \
    atpull'
         ./bin/brew update --preinstall \
      && ln -sf $PWD/completions/zsh/_brew $ZINIT[COMPLETIONS_DIR] \
      && rm -f brew.zsh \
      && ./bin/brew shellenv --dummy-arg > brew.zsh \
      && zcompile brew.zsh' \
    depth'3' \
    nocompletions \
    sbin'bin/brew' \
    src'brew.zsh' \
  homebrew/brew
```

## Caveats / Common Mistakes

- This recipe manages Homebrew itself through Zinit. It is not required if Homebrew is already installed via its official installer; in that case, simply source the output of `brew shellenv` directly in `.zshrc`.
- The `atpull` hook runs `brew update --preinstall` on every `zinit update`, which performs a network call. This may slow down `zinit update --all`.
