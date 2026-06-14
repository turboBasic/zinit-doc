---
id: recipe-fnm
title: "Recipe: fnm"
category: recipes
tags: [recipe, binary, command, completion, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs `fnm` (Fast Node Manager) from a GitHub release binary, generates its Zsh completion, and activates the fnm environment on shell startup.

## Syntax / Usage

```zsh
zinit for \
    as'completion' \
    atclone"./fnm completions --shell zsh > _fnm.zsh" \
    atload'eval $(fnm env --shell zsh)' \
    atpull'%atclone' \
    blockf \
    from'gh-r' \
    nocompile \
    sbin'fnm' \
  @Schniz/fnm
```

## Details

- `from'gh-r'` — downloads the release binary from GitHub Releases.
- `as'completion'` — marks the plugin as providing a completion file.
- `atclone"./fnm completions --shell zsh > _fnm.zsh"` — generates the Zsh completion file after initial download.
- `atpull'%atclone'` — regenerates the completion file on every update.
- `atload'eval $(fnm env --shell zsh)'` — runs `fnm env` to configure the Node.js environment (sets `PATH`, `FNM_DIR`, etc.) after the plugin loads.
- `blockf` — prevents fnm from adding its own entries to `$fpath`; Zinit manages completions.
- `nocompile` — skips compilation of the completion file.
- `sbin'fnm'` — creates a shim for the `fnm` binary (requires `zinit-annex-bin-gem-node`).

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zinit for \
    as'completion' \
    atclone"./fnm completions --shell zsh > _fnm.zsh" \
    atload'eval $(fnm env --shell zsh)' \
    atpull'%atclone' \
    blockf \
    from'gh-r' \
    nocompile \
    sbin'fnm' \
  @Schniz/fnm
```
