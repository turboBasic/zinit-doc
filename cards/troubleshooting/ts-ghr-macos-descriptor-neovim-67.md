---
id: ts-ghr-macos-descriptor-neovim-67
title: gh-r fails to download release when asset uses "macos" descriptor
category: troubleshooting
tags: [ice, binary, git, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/67
related: []
---

## Summary

Some GitHub releases (e.g., Neovim) use `macos` as the OS descriptor in asset filenames rather than the more common `darwin`. Older zinit versions did not recognise `macos` and skipped all assets, causing the download to fail.

## Symptom

`zinit ice from"gh-r" as"program"; zinit light neovim/neovim` (or similar) downloads nothing or errors out on macOS. The release page has assets like `nvim-macos.tar.gz` that zinit ignores.

## Cause

The `gh-r` OS-detection heuristic matched `darwin` but not the `macos` string that some projects use as an alternative macOS identifier.

## Fix / Workaround

Update zinit — the `macos` descriptor was added to the recognition list in a bugfix release:

```zsh
zinit self-update
```

As a workaround on older versions, use `bpick` to select the asset explicitly:

```zsh
zinit ice from"gh-r" as"program" bpick"*macos*"
zinit light neovim/neovim
```

## Caveats

The `bpick` workaround remains useful for any project that uses a non-standard OS descriptor that zinit's heuristic might miss.
