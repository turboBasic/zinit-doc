---
id: ts-packages-monorepo-migration-69
title: zinit-packages merged into monorepo — individual package repos deprecated
category: troubleshooting
tags: [package, installation, migration, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/69
related: []
---

## Summary

All individual `zinit-package-*` repositories were merged into a single monorepo at `zdharma-continuum/zinit-packages`. References to the old individual repos will eventually stop working.

## Symptom

`zinit pack for <package>` works, but custom scripts or configurations that reference individual package repositories (e.g., `zdharma-continuum/zinit-package-fzf`) may fail after those repos are archived or removed.

## Cause

The package system was redesigned so that all `package.json` files live in one monorepo. The individual repos hosted a single file each, making updates and discovery difficult.

## Fix / Workaround

Use `zinit pack` which automatically fetches from the monorepo:

```zsh
zinit pack for fzf
zinit pack"bgn-binary+keys" for fzf
```

Do not reference individual package repositories directly. The monorepo is at:
`https://github.com/zdharma-continuum/zinit-packages`

To list available packages, browse that repository.

## Caveats

Custom packages can be hosted in a fork of `zinit-packages` or in a separate repo. Override the source with `ZINIT[PACKAGE_REPO]` — see the alternative-source card for details.
