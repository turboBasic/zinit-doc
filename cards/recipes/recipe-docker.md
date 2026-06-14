---
id: recipe-docker
title: "Recipe: Docker (buildx and credential helpers)"
category: recipes
tags: [recipe, binary, completion, command, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs Docker CLI extensions: `buildx` (extended BuildKit builds with completions) and `docker-credential-helpers` (platform keystore credential storage) from GitHub releases.

## Syntax / Usage

### buildx

```zsh
zi for \
    as'completions' \
    atclone'buildx* completion zsh > _buildx' \
    from"gh-r" \
    sbin'!buildx-* -> buildx' \
  @docker/buildx \
```

### credential helpers

```zsh
zi for \
    from"gh-r" \
    sbin'!* -> docker-credential-desktop' \
  @docker/docker-credential-helpers
```

## Details

### buildx

- `from'gh-r'` — downloads the release binary from GitHub Releases.
- `as'completions'` — marks this as a completions-only plugin.
- `atclone'buildx* completion zsh > _buildx'` — generates the `_buildx` Zsh completion file after download.
- `sbin'!buildx-* -> buildx'` — creates a shim named `buildx` pointing to the versioned binary (requires `zinit-annex-bin-gem-node`). The `!` flag marks it as a lazy shim.

### credential helpers

- `from'gh-r'` — downloads the release binary from GitHub Releases.
- `sbin'!* -> docker-credential-desktop'` — creates a shim named `docker-credential-desktop` for the downloaded binary.

Both recipes require the `zdharma-continuum/zinit-annex-bin-gem-node` annex to be loaded first.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

# buildx
zi for \
    as'completions' \
    atclone'buildx* completion zsh > _buildx' \
    from"gh-r" \
    sbin'!buildx-* -> buildx' \
  @docker/buildx \

# credential helpers
zi for \
    from"gh-r" \
    sbin'!* -> docker-credential-desktop' \
  @docker/docker-credential-helpers
```
