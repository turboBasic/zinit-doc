---
id: ts-gh-r-binary-install
title: Installing a pre-built binary from GitHub releases with from"gh-r"
category: troubleshooting
tags: [binary, ice, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/174
related: [ts-bpick-compressed-file, ts-sbin-shim, ts-as-null-completions-override]
---

## Summary

Use `from"gh-r"` with `as"program"` (or `as"null"` + `sbin`) to download a pre-built binary from GitHub Releases. Zinit automatically detects your OS and architecture to select the right asset.

## Question / Problem

Users want to install CLI tools distributed as pre-built binaries on GitHub Releases without cloning the full repository.

## Answer / Solution

**Basic — binary added to PATH via `as"program"`:**

```zsh
zinit ice from"gh-r" as"program"
zinit light junegunn/fzf
```

**With automatic OS/arch detection and rename:**

```zsh
# Zinit auto-detects *linux* / *darwin* / *amd64* etc.
zinit ice from"gh-r" as"program" mv"docker* -> docker-compose" bpick"*linux*"
zinit load docker/compose
```

**With sbin shim** (requires `zinit-annex-bin-gem-node`):

```zsh
zinit ice from"gh-r" as"null" sbin"**/nvim -> nvim"
zinit light neovim/neovim
```

**Selecting a specific version:**

```zsh
zinit ice from"gh-r" as"program" ver"v0.10.0"
zinit light user/tool
```

**Archive extraction:**

Zinit automatically extracts `.tar.gz`, `.zip`, and other archives. After extraction, `pick` selects the binary:

```zsh
zinit ice from"gh-r" as"program" \
    bpick"*linux_amd64*" \
    pick"tool"
zinit light user/tool
```

## Examples

Full pattern from README (fzf):

```zsh
# Binary release in archive, from GitHub-releases page.
# After automatic unpacking it provides program "fzf".
zinit ice from"gh-r" as"program"
zinit light junegunn/fzf
```

## Caveats

`from"gh-r"` uses the GitHub Releases API (`api.github.com/repos/.../releases`). For private repos or GitHub Enterprise, use direct URLs with `zinit snippet` or the `dl` ice from `zinit-annex-patch-dl`. When `bpick` is omitted, zinit picks the most likely asset by matching OS name and CPU architecture strings in the asset filename.
