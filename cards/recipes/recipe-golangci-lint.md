---
id: recipe-golangci-lint
title: "golangci-lint"
category: recipes
tags: [recipe, binary, command, completion, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs `golangci-lint`, a fast Go linter runner, from a GitHub release binary and generates its Zsh completion file on clone.

## Syntax / Usage

```zsh
zinit for \
    atclone'golangci-lint completion zsh > _golangci-lint' \
    from'gh-r' \
    sbin'golangci-lint' \
  @golangci/golangci-lint
```

## Details

- `from'gh-r'` — downloads the release archive from GitHub Releases.
- `atclone'golangci-lint completion zsh > _golangci-lint'` — generates the `_golangci-lint` Zsh completion file after initial download; note that `atpull'%atclone'` is not used here, so completions are not automatically regenerated on update.
- `sbin'golangci-lint'` — creates a shim named `golangci-lint` for the binary (requires `zinit-annex-bin-gem-node`).

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zinit for \
    atclone'golangci-lint completion zsh > _golangci-lint' \
    from'gh-r' \
    sbin'golangci-lint' \
  @golangci/golangci-lint
```

## Caveats / Common Mistakes

- The recipe does not include `atpull'%atclone'`, so the completion file is generated only once at clone time. Add `atpull'%atclone'` to keep completions up to date after `zinit update`.
