---
id: pkg-fzy
title: "Package: fzy"
category: packages
tags: [package, binary, command, annex, installation]
source: https://github.com/zdharma-continuum/zinit-packages
related: [pkg-overview, pkg-fzf]
---

## Summary

Installs fzy (jhawthorn/fzy), a fast fuzzy text selector for the terminal, by compiling from source and placing the binary and helper scripts into `$ZPFX`.

## Syntax / Usage

```zsh
zi pack for jhawthorn/fzy
zi pack"bgn" for jhawthorn/fzy
```

Available profiles: `default`, `bgn`.

## Details

- Provides: `fzy` binary and `contrib/fzy-*` helper scripts (e.g. `fzy-tmux`, `fzy-cd`) in `$ZPFX/bin`; man page in `$ZPFX/man/man1`.
- `default` profile ices: `as"null"`, `nocompile`, `lucid`, `make"PREFIX=$ZPFX install"`, `atclone"cp -vf contrib/fzy-* $ZPFX/bin/"`, `atpull"%atclone"`. Requires `cc`, `make`, `cp`.
- `bgn` profile ices: `as"null"`, `sbin"fzy;contrib/fzy-*"`, `nocompile`, `lucid`, `make""`, `atclone"cp -vf fzy.1 $ZPFX/man/man1"`, `atpull"%atclone"`. Requires `cc`, `make`, and the `bin-gem-node` annex.
- The `bgn` profile uses `sbin` shims instead of copying binaries, and skips the `make install` target.

## Examples

```zsh
# Build and install to $ZPFX
zi pack for jhawthorn/fzy

# Build with bin-gem-node shims
zi pack"bgn" for jhawthorn/fzy
```

## Caveats / Common Mistakes

- Requires a C compiler (`cc`) and `make` at install time.
- The `bgn` profile requires `zdharma-continuum/zinit-annex-bin-gem-node`.

## See Also

- [pkg-fzf](pkg-fzf.md) — the more feature-rich fuzzy finder alternative
- [pkg-overview](pkg-overview.md) — how `zi pack` works
