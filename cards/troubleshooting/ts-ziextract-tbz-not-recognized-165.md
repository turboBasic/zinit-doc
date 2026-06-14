---
id: ts-ziextract-tbz-not-recognized-165
title: ziextract does not recognise .tbz / .bz2 archive extensions
category: troubleshooting
tags: [binary, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/165
related: []
---

## Summary

`ziextract` fails to extract `.tbz` (bzip2 tar) archives downloaded via `from"gh-r"`, printing a warning about unrecognized archive type. The `bunzip2` utility refuses to operate on files whose extension does not match `bz2` or `bzip2`.

## Symptom

```
ziextract: WARNING: didn't recognize the archive type of `btop-x86_64-macos-bigsur.tbz'  }(no extraction has been done).
Warning: ∞zinit-compile-plugin-hook hook returned with 1
```

## Cause

`ziextract` correctly detects bzip2 content by file magic, but `bunzip2` requires the file to have a `.bz2` or `.bzip2` extension before it will decompress. When the file arrives with a `.tbz` extension, the extraction silently fails.

## Fix / Workaround

Update zinit (`zinit self-update`) — PR #166 added `.tbz` to the list of recognized extensions; PR #107 previously handled the case for files without any matching extension.

On an older version, use a custom `atclone` to rename and extract manually:

```zsh
zinit ice from"gh-r" atclone"mv *.tbz archive.tar.bz2 && tar xjf archive.tar.bz2" atpull"%atclone"
zinit light aristocratos/btop
```

## Caveats

After the fix, `.tbz` files are handled automatically without any extra ices.
