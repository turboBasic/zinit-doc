---
id: ts-cp-ice-nonexistent-source-679
title: "cp ice errors when source file does not exist after clone"
category: troubleshooting
tags: [ice, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/679
related: []
---

## Summary

The `cp` ice attempted to copy a file without first checking that the source exists, producing an unhelpful error when the file was absent (e.g. because the filename changed in an upstream release).

## Symptom

A `cp` ice silently fails or produces an error about a non-existent file after cloning or updating a plugin, even though the plugin directory is present.

## Cause

The cp logic did not guard against a missing source file. Related to issues #678 and #418 where release assets rename files between versions.

## Fix / Workaround

Upgrade to a version that includes the fix for issue #679, which adds a file-existence check before the `cp` operation.

As a workaround, use `atclone`/`atpull` with a conditional copy:

```zsh
zinit ice atclone'[[ -f old-name ]] && cp old-name new-name' \
          atpull'%atclone'
zinit load user/plugin
```

Or use `mv` with a glob that only matches if the file exists:

```zsh
zinit ice mv"tool-* -> tool"
zinit load user/plugin
```

## Caveats

Glob patterns in `mv` and `cp` ices are matched against actual files — if no file matches, the operation is skipped without error on fixed versions.
