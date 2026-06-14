---
id: ts-appimage-no-extraction-done-775
title: AppImage downloaded but not made executable — "no extraction has been done" error
category: troubleshooting
tags: [troubleshooting, binary, installation, git]
source: https://github.com/zdharma-continuum/zinit/issues/775
related: []
---

## Summary

When using `from"gh-r" bpick="*AppImage"`, zinit downloads the file correctly but `ziextract` does not recognize the `.appimage` extension as an archive and fails to set the executable bit, producing "no extraction has been done".

## Symptom

```
[ziextract] Error: didn't recognize archive type of ghostty-1.3.1-x86_64.appimage  } (no extraction has been done)
```

The file is downloaded but is not executable and is not placed on `$PATH`.

## Cause

`ziextract` identifies files by extension; `.appimage` (case-insensitive) is not in its recognized-extension list. AppImages are self-contained executables that require no extraction — they only need `chmod +x`.

## Fix / Workaround

No fix available as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/775

Workaround: use `atclone` / `atpull` to set the executable bit manually after download, and use `mv` to rename if needed:

```zsh
zinit ice as"program" from"gh-r" bpick"*AppImage" \
    mv"ghostty*.appimage -> ghostty" \
    atclone"chmod +x ghostty" atpull"%atclone"
zinit light pkgforge-dev/ghostty-appimage
```
