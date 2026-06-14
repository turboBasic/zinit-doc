---
id: ts-ghr-appimage-not-selected-228
title: bpick with appimage no longer selects correct asset
category: troubleshooting
tags: [binary, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/228
related: []
---

## Summary

After a change to the gh-r asset-filtering logic, `bpick"*appimage*"` stopped selecting `.appimage` files and instead matched `.appimage.zsync` or other derivative files. AppImage installations silently broke after a `zinit self-update`.

## Symptom

The asset that gets downloaded is `nvim.appimage.zsync` (or similar checksum/sync file) instead of `nvim.appimage`, causing extraction to fail or the binary to be non-executable.

## Cause

A commit changed `zinit-install.zsh` to filter out certain asset suffixes from the gh-r candidate list. The filter inadvertently excluded `.appimage` files or changed the selection priority so derivative files (`.zsync`) matched before the actual AppImage.

## Fix / Workaround

Update zinit (`zinit self-update`) — the regression was corrected in PR #235.

While on an affected version, use a more specific `bpick` pattern that anchors the extension:

```zsh
zinit ice wait lucid from"gh-r" as"null" bpick"nvim.appimage" sbin"nvim* -> nvim" ver"stable"
zinit light neovim/neovim
```

## Caveats

AppImage files need the execute bit set. Zinit's `ziextract` sets `+x` automatically for recognized binary formats, but verify with `ls -l` if the binary still won't run.
