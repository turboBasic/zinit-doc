---
id: pkg-doctoc
title: "Package: doctoc"
category: packages
tags: [package, annex, binary, command, installation]
source: https://github.com/zdharma-continuum/zinit-packages
related: [pkg-overview, pkg-any-node, pkg-remark]
---

## Summary

Installs the `doctoc` npm package — a Markdown table-of-contents generator for local git repositories — and exposes its binary as an `sbin` shim.

## Syntax / Usage

```zsh
zi pack for doctoc
```

One profile: `default`.

## Details

- Provides: `doctoc` binary shim at `n:node_modules/.bin/doctoc`.
- Profile ices: `git`, `as"null"`, `nocompile`, `lucid`, `node"!doctoc"`, `sbin"n:node_modules/.bin/doctoc"`, `atpull"%atclone"`.
- The `!` prefix on the module name marks it as the primary module.
- Requires the `bin-gem-node` annex, `npm`, and `node` in PATH.

## Examples

```zsh
zi pack for doctoc
```

## See Also

- [pkg-any-node](pkg-any-node.md) — generic npm package installer
- [pkg-remark](pkg-remark.md) — Markdown processor with plugin ecosystem
- [pkg-overview](pkg-overview.md) — how `zi pack` works
