---
id: pkg-any-node
title: "Package: any-node"
category: packages
tags: [package, annex, binary, command, installation]
source: https://github.com/zdharma-continuum/zinit-packages
related: [pkg-overview, pkg-any-gem, pkg-doctoc, pkg-remark]
---

## Summary

A parametric package that installs any npm module and exposes its binaries as `sbin` shims, keeping the install isolated under zinit's data directory.

## Syntax / Usage

```zsh
zi pack param'MOD -> <module-name>' for any-node
```

Up to seven modules can be passed via `MOD`, `MOD2`, ... `MOD7`, plus `OTHER` for additional modules without a shim.

## Details

- Provides: `sbin` shims for all executables under `node_modules/.bin/`, via `n:node_modules/.bin/*` glob.
- Profile ices: `git`, `as"null"`, `nocompile`, `lucid`, `id-as"${${:-%IDAS%}:-%MOD%}"`, `node"%MOD%;%MOD2%;...;%OTHER%"`, `sbin"n:node_modules/.bin/*"`, `atpull"%atclone"`.
- The `node` ice (from the `bin-gem-node` annex) runs `npm install` into an isolated directory; no global `node_modules` is touched.
- Default `param-default` is `MOD -> lolcatjs`, so without a `param` ice `lolcatjs` is installed.
- Requires the `bin-gem-node` annex and `npm` in PATH.

## Examples

```zsh
# Install prettier
zi pack param'MOD -> prettier' for any-node

# Install eslint and typescript together
zi pack param'MOD -> eslint  MOD2 -> typescript' for any-node
```

## Caveats / Common Mistakes

- Requires the `bin-gem-node` annex and `npm` (Node.js) to be available.
- Use `IDAS` to set a custom `id-as` when installing multiple different packages to avoid ID collisions.

## See Also

- [pkg-any-gem](pkg-any-gem.md) — same pattern for Ruby gems
- [pkg-doctoc](pkg-doctoc.md) — dedicated doctoc package using the node ice
- [pkg-remark](pkg-remark.md) — dedicated remark package using the node ice
- [pkg-overview](pkg-overview.md) — how `zi pack` works
