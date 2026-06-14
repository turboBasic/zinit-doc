---
id: pkg-remark
title: "remark"
category: packages
tags: [package, annex, binary, command, installation]
source: https://github.com/zdharma-continuum/zinit-packages
related: [pkg-overview, pkg-any-node, pkg-doctoc]
---

## Summary

Installs the `remark` Markdown processor (with `remark-cli`, `remark-man`, and `remark-html` plugins) via npm and exposes the `remark` binary as an `sbin` shim.

## Syntax / Usage

```zsh
zi pack for remark
zi pack"<profile>" for remark
```

Available profiles: `default`, `man-only`, `html-only`.

## Details

- Provides: `remark` binary shim at `n:node_modules/.bin/remark`.
- `default` profile ices: `git`, `as"null"`, `nocompile`, `lucid`, `node"remark <- !remark-cli; remark-man; remark-html"`, `sbin"n:node_modules/.bin/remark"`, `atpull"%atclone"`. Installs `remark-cli` (main binary), `remark-man` (man page output), and `remark-html` (HTML output).
- `man-only` profile: installs `remark-cli` and `remark-man` only; no `atpull`.
- `html-only` profile: installs `remark-cli` and `remark-html` only.
- The `<-` syntax in the `node` ice sets the primary module whose bin is used; `;`-separated names are additional modules.
- Requires the `bin-gem-node` annex, `npm`, and `node` in PATH.

## Examples

```zsh
# Full install (man + html plugins)
zi pack for remark

# Only man-page conversion support
zi pack"man-only" for remark
```

## See Also

- [pkg-any-node](pkg-any-node.md) — generic npm package installer
- [pkg-doctoc](pkg-doctoc.md) — Markdown TOC generator
- [pkg-overview](pkg-overview.md) — how `zi pack` works
