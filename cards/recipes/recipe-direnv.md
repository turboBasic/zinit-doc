---
id: recipe-direnv
title: "Recipe: direnv"
category: recipes
tags: [recipe, binary, command, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs `direnv` from a GitHub release binary and hooks it into Zsh by generating and sourcing its shell integration script on clone and update.

## Syntax / Usage

```zsh
zi for \
    as"program" \
    atclone'./direnv hook zsh > zhook.zsh' \
    from"gh-r" \
    light-mode \
    mv"direnv* -> direnv" \
    src'zhook.zsh' \
  direnv/direnv
```

## Details

- `from'gh-r'` — downloads the release binary from GitHub Releases.
- `as'program'` — registers the binary on `$PATH` instead of sourcing it as a plugin.
- `mv"direnv* -> direnv"` — renames the downloaded binary (which may include version/platform suffix) to plain `direnv`.
- `atclone'./direnv hook zsh > zhook.zsh'` — generates the Zsh hook script after the initial download.
- `src'zhook.zsh'` — sources the generated hook file so that direnv activates in every new shell.
- `light-mode` — loads without reporting/investigating for faster startup.

Note: unlike the README example which uses `make'!'` before `atclone`, this recipe generates the hook via `atclone` only; the renamed binary must be executable at that point.

## Examples

```zsh
zi for \
    as"program" \
    atclone'./direnv hook zsh > zhook.zsh' \
    from"gh-r" \
    light-mode \
    mv"direnv* -> direnv" \
    src'zhook.zsh' \
  direnv/direnv
```
