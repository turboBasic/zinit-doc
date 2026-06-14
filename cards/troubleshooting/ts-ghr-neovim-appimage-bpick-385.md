---
id: ts-ghr-neovim-appimage-bpick-385
title: bpick fails to select nvim.appimage from neovim releases
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/385
related: [ts-ghr-bpick-regression-243, ts-ghr-html-parsing-broken-373]
---

## Summary

Using `bpick"nvim.appimage"` to download Neovim from GitHub releases fails after zinit switched from HTML scraping to API-based asset discovery. The asset exists but is filtered out by the asset pre-selection logic.

## Symptom

```
Downloading neovim/neovim…
gh-r: failed to find the correct GitHub release asset to download, modify bpick-ICE (current bpick: nvim.appimage).
```

The `nvim.appimage` file is present in the release but zinit cannot find it.

## Cause

The asset pre-filtering step (which removes assets that don't match OS/arch patterns) was excluding `nvim.appimage` because the filename contains no OS or architecture keywords. `bpick` never gets to evaluate it. Fixed in PR #244 but the underlying tension between pre-filtering and non-standard asset names is ongoing.

## Fix / Workaround

Update zinit to get the asset filter fix:

```zsh
zinit self-update
```

If still failing, work around by using `bpick` with a broader pattern and `mv` + `pick`:

```zsh
zinit ice from"gh-r" as"null" ver"latest" \
    bpick"nvim.appimage" \
    mv"nvim.appimage -> nvim" \
    pick"nvim" \
    atclone"chmod +x nvim"
zinit light neovim/neovim
```

Or use the `lbin` ice from `zinit-annex-bin-gem-node` instead of `as"null"`:

```zsh
zinit ice from"gh-r" ver"latest" lbin"nvim.appimage -> nvim" bpick"nvim.appimage"
zinit light neovim/neovim
```

## Caveats

AppImage files on Linux require the `FUSE` kernel module or `--appimage-extract-and-run` mode. If FUSE is unavailable (e.g. in containers), extract the AppImage instead: `bpick"nvim.appimage" atclone"./nvim.appimage --appimage-extract && mv squashfs-root nvim-extracted" pick"nvim-extracted/usr/bin/nvim"`.
