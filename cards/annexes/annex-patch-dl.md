---
id: annex-patch-dl
title: "patch-dl"
category: annexes
tags: [annex, ice, binary, installation]
source: https://github.com/zdharma-continuum/zinit-annex-patch-dl
related: []
---

## Summary

patch-dl adds two ices — `dl` and `patch` — that download extra files from URLs and apply unified-diff patches during plugin installation, enabling source-build recipes that require external patches.

## Details

- **Problem it solves:** Some plugins or source packages require additional files (patches, config files) that are not part of their repository. Fetching and applying them manually before building breaks reproducibility; `dl` and `patch` embed those steps directly into the Zinit invocation.

- **New ices:**
  - `dl'{URL} [-> {output-filename}];'` — downloads the file at `{URL}` into the plugin/snippet directory; if no output filename is given, the last URL segment is used; multiple downloads can be separated by `;`
  - `patch'{patch-file}; …'` — applies the named patch file (already present in the directory, e.g., downloaded via `dl`) using `patch`; multiple patches separated by `;`

- **Install:**
  ```zsh
  zinit light zdharma-continuum/zinit-annex-patch-dl
  ```

## Examples

```zsh
# Build fbterm from source, downloading and applying two required patches
zinit ice \
    as"command" \
    atclone"./configure --prefix=$ZPFX" \
    atpull"%atclone" \
    dl"https://aur.archlinux.org/cgit/aur.git/plain/0001-Fix-build-with-gcc-6.patch?h=fbterm-git" \
    dl"https://bugs.archlinux.org/task/46860?getfile=13513 -> ins.patch" \
    make"install" \
    patch"ins.patch; 0001-Fix-build-with-gcc-6.patch" \
    pick"$ZPFX/bin/fbterm" \
    reset
zinit load izmntuk/fbterm
```

## Caveats / Common Mistakes

- Patches must be downloaded with `dl` (or otherwise placed in the plugin directory) before referencing them in `patch`; the order of ice evaluation is `dl` then `patch`.
- File download uses the last URL path segment as the default name; use `-> filename` when the URL has a query string or an unhelpful name.
