---
id: ts-ghr-neovim-appimage-bpick-385
title: bpick fails to select nvim.appimage from neovim releases
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/385
related: [ts-ghr-bpick-regression-243, ts-ghr-html-parsing-broken-373]
---

## Summary

Using `bpick"nvim.appimage"` to download Neovim from GitHub releases fails because zinit's automatic OS/arch pre-filter removes assets whose filenames contain no OS or architecture keywords before `bpick` can evaluate them. This applies to any asset with a non-standard name (e.g. `nvim.appimage`), not just Neovim.

## Symptom

```
Downloading neovim/neovim…
gh-r: failed to find the correct GitHub release asset to download, modify bpick-ICE (current bpick: nvim.appimage).
```

The `nvim.appimage` file is present in the release but zinit cannot find it.

## Cause

Zinit applies an OS/arch filter to the asset list before applying the `bpick` pattern. Assets without recognizable OS/arch tokens (`linux`, `darwin`, `amd64`, etc.) in their filename are dropped at the pre-filter stage — `bpick` never sees them. Fixed in PR #244 but the underlying tension between pre-filtering and non-standard asset names is ongoing.

## Fix / Workaround

Update zinit to get the asset filter fix:

```zsh
zinit self-update
```

If still failing, use the `ghapi` ice to bypass the automatic platform filter entirely:

```zsh
zi ice from"gh-r" as"program" ghapi bpick"nvim.appimage" mv"nvim.appimage -> nvim"
zi light neovim/neovim
```

Note: the `ghapi` ice requires network access to the GitHub API and counts against API rate limits.

Or include a looser glob that still matches:

```zsh
zi ice from"gh-r" as"program" bpick"*nvim*appimage*"
zi light neovim/neovim
```

Or use `bpick` with `mv` + `pick` and an explicit `ver`:

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
