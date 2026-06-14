---
id: pkg-svn
title: "svn"
category: packages
tags: [package, binary, command, installation, snippet]
source: https://github.com/zdharma-continuum/zinit-packages
related: [pkg-overview, pkg-apr]
---

## Summary

Downloads and compiles Apache Subversion from the official Apache distribution mirror and installs it (including the `svn` binary) into `$ZPFX`, linking against the APR library also installed in `$ZPFX`.

## Syntax / Usage

```zsh
zi pack for svn
```

One profile: `default`.

## Details

- Provides: `svn` binary and related Subversion tools installed under `$ZPFX`.
- Profile ices: `is-snippet`, `as"null|monitor"`, `nocompile"!"`, `lucid`, `dlink"https://.*/subversion-%VERSION%.tar.bz2"` (uses the `readurl`/`monitor` annex to resolve the Apache download page), `atclone` (runs `ziextract --move --auto` then `./configure --prefix=$ZPFX --with-apr=$ZPFX && make && make install`), `atpull"%atclone"`.
- `--with-apr=$ZPFX` means the `apr` package must be installed first so APR headers and libraries are present.
- Requires the `readurl`/`monitor` annex and system build tools (`cc`, `make`).

## Examples

```zsh
# Install APR first, then Subversion
zi pack for apr
zi pack for svn
```

## Caveats / Common Mistakes

- Must install the `apr` package before `svn`; the build will fail if APR is not found in `$ZPFX`.

## See Also

- [pkg-apr](pkg-apr.md) — APR build dependency
- [pkg-overview](pkg-overview.md) — how `zi pack` works
