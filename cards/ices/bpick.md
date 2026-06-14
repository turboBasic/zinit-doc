---
id: bpick
title: "bpick"
category: ices
tags: [ice, binary, git, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [from, ver, as, mv]
---

## Summary

`bpick''` selects which asset to download from a GitHub Releases page when using
`from"gh-r"`. It is a glob pattern matched against the asset filenames.

## Syntax / Usage

```zsh
zi ice from"gh-r" bpick"*linux*"
zi ice from"gh-r" bpick"*Darwin*"
zi ice from"gh-r" bpick"*x86_64*"
```

## Details

When `from"gh-r"` is used, a GitHub Release may contain multiple assets for different
platforms (Linux, macOS, Windows, architectures). `bpick''` filters by a glob pattern
so only the matching asset is downloaded.

Without `bpick''`, Zinit attempts to auto-detect the correct asset by matching the OS
name and architecture against asset filenames. Explicit `bpick''` overrides that
heuristic.

Does not work with snippets.

## Examples

```zsh
# Explicitly select Linux asset for docker-compose
zi ice from"gh-r" as"program" mv"docker* -> docker-compose" bpick"*linux*"
zi load docker/compose
```

## See Also

- from
- ver
- mv
- as
