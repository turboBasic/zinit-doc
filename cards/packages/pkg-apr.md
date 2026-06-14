---
id: pkg-apr
title: "apr"
category: packages
tags: [package, binary, installation, snippet]
source: https://github.com/zdharma-continuum/zinit-packages
related: [pkg-overview, pkg-svn]
---

## Summary

Downloads and compiles the Apache Portable Runtime (APR) library from the Apache distribution mirror, installing it into `$ZPFX` — a prerequisite for building Subversion from source.

## Syntax / Usage

```zsh
zi pack for apr
```

One profile: `default`.

## Details

- Provides: APR static and shared libraries and headers under `$ZPFX` (no shell binary or completion).
- Profile ices: `is-snippet`, `as"null|readurl"`, `nocompile"!"`, `lucid`, `dlink"https://.*/apr-%VERSION%.tar.bz2"` (uses the `readurl` annex to resolve the latest download link), `atclone` (runs `ziextract --move --auto` then `./configure --prefix=$ZPFX && make && make install`), `atpull"%atclone"`.
- Requires the `readurl` annex (`zdharma-continuum/zinit-annex-readurl`) to resolve the mirror link.
- Intended as a build dependency for the `svn` package, not as a standalone tool.

## Examples

```zsh
# Install APR before building Subversion
zi pack for apr
zi pack for svn
```

## See Also

- [pkg-svn](pkg-svn.md) — Subversion, which links against APR
- [pkg-overview](pkg-overview.md) — how `zi pack` works
