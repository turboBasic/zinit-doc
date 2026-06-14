---
id: ts-ghr-bpick-asset-filtered-before-bpick-385
title: bpick fails when asset name has no OS/arch token
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/385
related: [ts-ghr-bpick-no-assets-found-476, ts-ghr-bpick-regression-243]
---

## Summary
`bpick` with an asset name that contains no OS or architecture substring (e.g. `nvim.appimage`) fails because zinit's automatic platform filter removes those assets before `bpick` can evaluate them.

## Symptom
```
gh-r: failed to find the correct GitHub release asset to download, modify bpick-ICE (current bpick: nvim.appimage)
```

The asset `nvim.appimage` is visible on the release page but not downloaded.

## Cause
Zinit applies an OS/arch filter to the asset list before applying the `bpick` pattern. Assets without recognizable OS/arch tokens in their filename are dropped at the pre-filter stage. Only assets with strings like `linux`, `darwin`, `amd64`, etc. survive to be matched by `bpick`.

## Fix / Workaround
Use the `ghapi` ice to bypass the automatic platform filter:

```zsh
zi ice from"gh-r" as"program" ghapi bpick"nvim.appimage" mv"nvim.appimage -> nvim"
zi light neovim/neovim
```

Alternatively, include the OS/arch token in the `bpick` pattern even if the asset filename technically matches either way (add a looser glob):

```zsh
zi ice from"gh-r" as"program" bpick"*nvim*appimage*"
zi light neovim/neovim
```

## Caveats
The `ghapi` ice requires network access to the GitHub API and counts against API rate limits.
