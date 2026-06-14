---
id: ts-ghr-pkg-archive-selected-617
title: "gh-r selects macOS .pkg file requiring sudo instead of .tar.gz"
category: troubleshooting
tags: [binary, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/617
related: []
---

## Summary

When a GitHub Release includes a `.pkg` file (common for aarch64 macOS releases), zinit's auto-selection can pick the `.pkg` archive, which requires elevated privileges to install, instead of the regular binary archive.

## Symptom

Installation of a `gh-r` plugin fails or produces unexpected results because a `.pkg` file was selected. The `.pkg` format requires running an installer with `sudo` — zinit cannot handle it without special permissions.

## Cause

Auto-selection did not exclude `.pkg` files by default. When a release adds a `.pkg` for macOS aarch64 (as starship v1.17.1 did), the auto-detection may select it over the appropriate `.tar.gz`.

## Fix / Workaround

Update zinit to a version that ignores `.pkg` files by default (fixed in PR #617):

```zsh
zinit self-update
```

If you intentionally want a `.pkg` file, you can still select it explicitly with `bpick`:

```zsh
zinit ice from'gh-r' bpick'*pkg'
zinit light starship/starship
```

Otherwise, use `bpick` to explicitly select the tar archive:

```zsh
zinit ice from'gh-r' bpick'*.tar.gz'
zinit light starship/starship
```
