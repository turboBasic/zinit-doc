---
id: ts-cloneopts-blobless-clone-742
title: "How to do a partial/blobless clone to speed up plugin downloads"
category: troubleshooting
tags: [ice, git, performance, installation]
source: https://github.com/zdharma-continuum/zinit/issues/742
related: []
---

## Summary

Zinit supports the `depth` ice for shallow clones, but there is no dedicated ice for partial (blobless) clones. The `cloneopts` ice provides the workaround.

## Symptom

Cloning large plugin repositories takes too long. Shallow clones with `depth'1'` help, but partial blobless clones (which skip unreferenced blob objects entirely) are even more efficient.

## Fix / Workaround

Use `cloneopts` to pass `--filter=blob:none` to `git clone`:

```zsh
zinit ice cloneopts'--filter=blob:none'
zinit light some/large-plugin
```

This performs a partial clone that only downloads referenced blobs, resulting in a smaller and faster initial clone than even `depth'1'`.

## Examples

```zsh
# Combine with depth for maximum savings
zinit ice cloneopts'--filter=blob:none --depth=1'
zinit light zdharma-continuum/fast-syntax-highlighting
```

## Caveats

A dedicated `blobless` shorthand ice was requested (#742) but not yet implemented. Using `cloneopts` directly is the supported approach. Blobless clones require git 2.17+ on both client and server.
