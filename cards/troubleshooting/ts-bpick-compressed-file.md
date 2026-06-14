---
id: ts-bpick-compressed-file
title: bpick ice does not match uncompressed GitHub release files
category: troubleshooting
tags: [ice, binary, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/174
related: [ts-gh-r-binary-install, ts-sbin-shim]
---

## Summary

`bpick` matches against release asset filenames. If the release only provides uncompressed binaries (no `.tar.gz` or `.zip`), zinit may still fail to download them because it expects archives by default when using `from"gh-r"`.

## Question / Problem

A user tried to install `NerdyPepper/dijo` from GitHub releases:

```zsh
zinit wait'0rb' lucid light-mode for \
    sbin'dijo* -> dijo' from'gh-r' bpick'*x86_64-linux' \
    @NerdyPepper/dijo
```

and got:

```
Didn't find correct Github release-file to download, try adapting bpick-ICE (the current bpick is: *x86_64-linux).
```

The same error occurred with the exact filename `bpick'dijo-x86_64-linux'`.

## Answer / Solution

`bpick` matches against release asset filenames exactly as they appear on the GitHub Releases page. The dijo releases provide files named like `dijo-x86_64-linux` (no archive extension). Zinit's `gh-r` downloader looks for archives to extract by default.

For bare binaries (no archive), use `extract` without a value (zinit will detect non-archive files via the `file` command) or ensure the binary filename matches exactly:

```zsh
zinit wait lucid from"gh-r" as"program" \
    bpick"dijo-x86_64-linux" \
    mv"dijo-x86_64-linux -> dijo" \
    pick"dijo" \
    for @NerdyPepper/dijo
```

If the release provides a tarball variant, prefer matching the archive:

```zsh
bpick"*x86_64-linux*.tar.gz"
```

For single raw binaries where `from"gh-r"` is unreliable, a direct snippet URL is simpler:

```zsh
zinit ice as"program" mv"dijo-x86_64-linux -> dijo"
zinit snippet "https://github.com/nerdypepper/dijo/releases/latest/download/dijo-x86_64-linux"
```

## Caveats

- Zinit auto-detects the OS and architecture when there is no `bpick`, selecting the most likely asset. If auto-detection fails, inspect the exact asset filenames on the GitHub Releases page and match them literally. Globs in `bpick` are standard zsh glob patterns.
- `from"gh-r"` with `bpick` is best suited for assets that are archives. For single raw binaries, a direct snippet URL is simpler and more reliable.
