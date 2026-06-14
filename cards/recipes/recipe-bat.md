---
id: recipe-bat
title: "bat"
category: recipes
tags: [recipe, binary, command, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs the `bat` binary (a `cat` clone with syntax highlighting and Git integration) from a GitHub release, making it available on `$PATH` via an `lbin` shim.

## Syntax / Usage

```zsh
zi for \
    from'gh-r' \
    lbin'!' \
    id-as \
    null \
  @sharkdp/bat
```

## Details

- `from'gh-r'` — downloads the release archive from GitHub Releases.
- `lbin'!'` — installs a lazy binary shim for the extracted `bat` binary (requires `zinit-annex-bin-gem-node`). The `!` flag causes the shim name to be derived automatically from the binary name.
- `id-as` — uses the repository name as the plugin ID (no explicit alias needed).
- `null` — disables sourcing of any `.zsh` script and suppresses completion installation; used when only a binary is needed.

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zi for \
    from'gh-r' \
    lbin'!' \
    id-as \
    null \
  @sharkdp/bat
```
