---
id: pkg-asciidoctor
title: "Package: asciidoctor"
category: packages
tags: [package, annex, binary, command, installation]
source: https://github.com/zdharma-continuum/zinit-packages
related: [pkg-overview, pkg-any-gem]
---

## Summary

Installs the Asciidoctor Ruby gem and exposes the `asciidoctor` binary as an `sbin` shim, keeping the gem isolated under zinit's data directory.

## Syntax / Usage

```zsh
zi pack for asciidoctor
```

One profile: `default`.

## Details

- Provides: `asciidoctor` binary shim at `g:bin/asciidoctor`.
- Profile ices: `git`, `as"null"`, `nocompile`, `lucid`, `gem"!asciidoctor"`, `sbin"g:bin/asciidoctor"`, `atpull"%atclone"`.
- The `!` prefix on the gem name in the `gem` ice marks it as the primary gem whose bin directory is used for shim discovery.
- Requires the `bin-gem-node` annex and `gem` (Ruby) in PATH.

## Examples

```zsh
zi pack for asciidoctor
```

## See Also

- [pkg-any-gem](pkg-any-gem.md) — generic gem installer for other Ruby tools
- [pkg-overview](pkg-overview.md) — how `zi pack` works
