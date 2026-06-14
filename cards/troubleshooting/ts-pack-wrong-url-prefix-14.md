---
id: ts-pack-wrong-url-prefix-14
title: zinit pack ice fails — package URLs used wrong prefix
category: troubleshooting
tags: [package, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/14
related: []
---

## Summary

After the migration to `zdharma-continuum`, the `pack""` ice failed because `.zinit-get-package` still fetched from `zinit-package-*` repository names, while the actual packages moved to `zsh-package-*` repositories.

## Symptom

```
.zinit-get-package:25: datei oder Verzeichnis nicht gefunden: /tmp/tmp.06wsNmEHUB
Error: the package `fzf` couldn't be
```

Running `zinit pack for fzf` (or any package name) results in an error about a missing temporary file and the package not being found.

## Cause

The `.zinit-get-package` function had the old URL prefix `zinit-package-${PACKAGE_NAME}` hardcoded. After the repository reorganization, packages were hosted under `zdharma-continuum/zsh-package-*`, not `zinit-package-*`.

## Fix / Workaround

Update zinit to a release that contains the URL fix:

```zsh
zinit self-update
```

After updating, verify the pack ice works:

```zsh
zinit pack"bgn-binary+keys" for fzf
```

## Caveats

This issue affected installations cloned shortly after the zdharma-continuum migration before the fix was released. If `self-update` itself fails, update the remote first — see the migration card for zdharma to zdharma-continuum.
