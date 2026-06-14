---
id: ts-ver-nightly-not-found-483
title: "ver'nightly' fails to select nightly release from gh-r"
category: troubleshooting
tags: [ice, binary, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/483
related: []
---

## Summary

Using `ver'nightly'` with `from'gh-r'` fails with "failed to find the correct GitHub release asset to download" because `ver` selects by tag name and "nightly" is treated as a version tag, not a release type alias.

## Symptom

```
gh-r: failed to find the correct GitHub release asset to download.
```

Occurs when trying to install a nightly or pre-release version of a tool (e.g. Neovim nightly).

## Cause

`ver` passes the string literally as a git tag reference. "nightly" is a valid tag on some repos (e.g. neovim/neovim), but the asset selection logic may not match it because version parsing strips or transforms the string. The exact failure depends on how the release is structured.

## Fix / Workaround

For Neovim nightly specifically, use `bpick` to select the correct asset and specify the full tag:

```zsh
zinit ice from'gh-r' ver'nightly' \
    bpick'nvim-linux-x86_64.tar.gz' \
    as'command' \
    pick'nvim-linux-x86_64/bin/nvim'
zinit light neovim/neovim
```

If `ver'nightly'` still fails, try using the full release URL directly via `atclone`:

```zsh
zinit ice as'command' \
    atclone'curl -LO https://github.com/neovim/neovim/releases/download/nightly/nvim-linux-x86_64.tar.gz && tar xzf nvim-linux-x86_64.tar.gz' \
    atpull'%atclone' \
    pick'nvim-linux-x86_64/bin/nvim'
zinit light neovim/neovim
```

## Caveats

Nightly releases may use a pre-release flag rather than a stable tag, which the version-detection heuristics may not follow.
