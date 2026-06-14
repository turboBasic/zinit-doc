---
id: ts-pack-zsh-broken-3
title: zinit pack for zsh fails — package repo URL changed after migration
category: troubleshooting
tags: [package, installation, troubleshooting, migration]
source: https://github.com/zdharma-continuum/zinit/issues/3
related: []
---

## Summary

`zinit pack'5.8' for zsh` (and other `pack` commands) failed after the migration to `zdharma-continuum` because the `pack` ice pointed to the old, deleted repository location.

## Symptom

```
zinit pack'5.8' for zsh
```

Exits with an error or installs nothing. No visible download activity occurs.

## Cause

The `pack` ice fetches a `package.json` from a GitHub repository. After the migration, the package repositories were rehomed under `zdharma-continuum/zsh-package-*`. Older zinit versions still fetched from the old `zdharma/zsh-package-*` or `zdharma/zinit-package-*` paths.

## Fix / Workaround

Update zinit so the `pack` ice uses the correct repository URLs:

```zsh
zinit self-update
```

Then retry:

```zsh
zinit pack'5.8' for zsh
```

## Caveats

If `self-update` itself is broken due to a stale remote, fix the remote first — see the migration card for zdharma to zdharma-continuum.
