---
id: pkg-null
title: "Package: null"
category: packages
tags: [package, recipe, installation]
source: https://github.com/zdharma-continuum/zinit-packages
related: [pkg-overview]
---

## Summary

A reference/template package from zdharma-continuum/null that demonstrates the package format and the ices available to package authors — not intended for production use.

## Syntax / Usage

```zsh
zi pack for zdharma-continuum/null
```

One profile: `default`.

## Details

- Provides: nothing useful at runtime; the package exists as an up-to-date authoring example.
- Profile ices: `lucid`, `wait`, `null`, `light-mode`, `run-atpull`, `atclone"dostuff; echo ok; random stuff;"`, `atpull"%atclone"`, `!bash`.
- The package source (`zdharma-continuum/null`) is the canonical reference for new package developers — the README links to it as the example to follow when creating a new package.

## Examples

```zsh
# Load the null package (does nothing useful)
zi pack for zdharma-continuum/null
```

## See Also

- [pkg-overview](pkg-overview.md) — how `zi pack` works and the package format
