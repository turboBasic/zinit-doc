---
id: ts-bpick-uncompressed-binary-174
title: "bpick not matching: release asset is an uncompressed binary, not an archive"
category: troubleshooting
tags: [ice, binary, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/174
related: []
---

## Summary
`bpick` fails to match a release asset when the file is a raw binary without a recognized archive extension, because zinit's `gh-r` downloader expects compressed assets by default.

## Question / Problem
Installing `NerdyPepper/dijo` with `bpick'*x86_64-linux'` produced:

```
Didn't find correct Github release-file to download, try adapting bpick-ICE
(the current bpick is: *x86_64-linux).
```

The release page lists a file named `dijo-x86_64-linux` (no extension).

## Answer / Solution
The issue is that `bpick` globs against the asset filename, and `gh-r` currently expects assets to be archives (`.tar.gz`, `.zip`, etc.) for automatic extraction. An uncompressed binary is a valid asset, but older versions of zinit's downloader may skip it.

Workarounds:
- Use `extract` ice with no value — zinit will fall back to treating the file as a raw binary if no archive is detected.
- Use a direct URL via `zinit snippet` with `as"program"` instead of `from"gh-r"`.

```zsh
zinit ice as"program" mv"dijo-x86_64-linux -> dijo"
zinit snippet "https://github.com/nerdypepper/dijo/releases/latest/download/dijo-x86_64-linux"
```

## Caveats
`from"gh-r"` with `bpick` is best suited for assets that are archives. For single raw binaries, a direct snippet URL is simpler and more reliable.
