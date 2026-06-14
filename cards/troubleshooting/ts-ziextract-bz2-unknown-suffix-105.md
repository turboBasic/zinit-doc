---
id: ts-ziextract-bz2-unknown-suffix-105
title: ziextract fails on bzip2 files whose extension does not match bz2/bzip2
category: troubleshooting
tags: [ice, binary, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/105
related: []
---

## Summary

`ziextract` correctly detects bzip2 files by magic bytes, but `bunzip2` refuses to decompress them if the file's extension is not `.bz2` or `.bzip2`, producing an "unknown suffix — ignored" error.

## Symptom

```
bunzip2: zinit-package-apr: unknown suffix - ignored
```

A package or plugin download that contains a bzip2-compressed file without the `.bz2` extension fails during extraction.

## Cause

`bunzip2` enforces extension-based dispatch. `ziextract` detects bzip2 format via the `file` command but does not rename the file before passing it to `bunzip2`, so `bunzip2` ignores it.

## Fix / Workaround

Update zinit — the fix adds a pre-extraction rename step for bzip2 files (the same approach already used for `xz` archives):

```zsh
zinit self-update
```

If stuck on an older version, manually rename the downloaded file before extraction in an `atclone` hook:

```zsh
zinit ice atclone"mv <downloaded-file> <downloaded-file>.bz2 && ziextract <downloaded-file>.bz2"
```

## Caveats

This affects any release asset whose filename omits the `.bz2`/`.bzip2` extension. The fix is present in zinit releases after issue #105 was resolved.
