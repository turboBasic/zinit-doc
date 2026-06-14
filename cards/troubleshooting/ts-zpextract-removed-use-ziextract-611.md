---
id: ts-zpextract-removed-use-ziextract-611
title: "zpextract function removed; use ziextract instead"
category: troubleshooting
tags: [troubleshooting, installation, migration]
source: https://github.com/zdharma-continuum/zinit/issues/611
related: []
---

## Summary

The `zpextract` function was removed from zinit to eliminate confusion with the canonical `ziextract` function. Any config or annex calling `zpextract` will produce "command not found" after updating.

## Symptom

```
command not found: zpextract
```

Appears in `atclone`, `atpull`, or other hooks that call `zpextract` directly.

## Cause

`zpextract` was a duplicate of `ziextract` and was removed (PR #611) to have a single canonical name.

## Fix / Workaround

Replace all `zpextract` calls with `ziextract`:

```zsh
# Before
zinit ice atclone'zpextract archive.tar.gz'

# After
zinit ice atclone'ziextract archive.tar.gz'
```

The API is identical; it is a drop-in rename.
