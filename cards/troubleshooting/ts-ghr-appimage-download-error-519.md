---
id: ts-ghr-appimage-download-error-519
title: AppImage binaries fail to download or install via gh-r
category: troubleshooting
tags: [ice, binary, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/519
related: [ts-ghr-appimage-not-selected-228, ts-ghr-neovim-appimage-bpick-385]
---

## Summary

Attempting to install an AppImage from GitHub Releases using `from"gh-r"` results in an error during download or extraction. The asset selection logic may filter out AppImage files or fail during extraction because AppImages are single-file executables, not archives.

## Symptom

An error occurs during download or after download when zinit attempts to process the AppImage:

```
zi id-as'NC' from"gh-r" bpick"*" sbin"*.AppImage -> NC" for psprint/n-commodore
```

The download fails or the resulting file is not executable / not found at the expected path.

## Cause

Two separate issues can occur:

1. The gh-r pre-filter step removes AppImage assets because their filenames contain no recognized OS/arch keywords, so the asset is never downloaded.
2. After download, zinit may attempt to extract the AppImage as an archive (it is an ELF binary with an embedded SquashFS image), which fails. Zinit's `ziextract` does not treat `.AppImage` files as archives to unpack.

## Fix / Workaround

Use `sbin` (from `zinit-annex-bin-gem-node`) or `as"program"` with an explicit `bpick` and skip extraction:

```zsh
# With sbin annex — wraps the AppImage in a shim script
zinit ice from"gh-r" bpick"*.AppImage" sbin"*.AppImage -> myapp"
zinit light user/myapp
```

If the pre-filter drops the AppImage, force selection with a precise `bpick` and use `nocompile`:

```zsh
zinit ice from"gh-r" as"program" bpick"myapp-*.AppImage" \
    nocompile pick"myapp-*.AppImage" \
    atclone"chmod +x myapp-*.AppImage"
zinit light user/myapp
```

For AppImages that require FUSE or want extraction:

```zsh
zinit ice from"gh-r" bpick"*.AppImage" \
    atclone"chmod +x *.AppImage && ./myapp.AppImage --appimage-extract && mv squashfs-root myapp-extracted" \
    pick"myapp-extracted/usr/bin/myapp"
zinit light user/myapp
```

## Caveats

AppImages are self-contained ELF executables, not archives. They require FUSE on Linux to run directly. In containers or environments without FUSE, use `--appimage-extract` to unpack and run the extracted binary instead.
