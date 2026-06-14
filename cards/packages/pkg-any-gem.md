---
id: pkg-any-gem
title: "Package: any-gem"
category: packages
tags: [package, annex, binary, command, installation]
source: https://github.com/zdharma-continuum/zinit-packages
related: [pkg-overview, pkg-any-node, pkg-asciidoctor]
---

## Summary

A parametric package that installs any Ruby Gem and exposes its binaries as `sbin` shims, without requiring a system-wide Ruby or gem install.

## Syntax / Usage

```zsh
zi pack param'GEM -> <gemname>' for any-gem
```

Multiple gems can be passed via `GEM2`, `GEM3`, ... `GEM7`, and `OTHER` for extra gems without a shim.

## Details

- Provides: `sbin` shims for all executables under the gem's `bin/` directory, via `g:bin/*` glob.
- Profile ices: `git`, `as"null"`, `nocompile`, `lucid`, `id-as"${${:-%IDAS%}:-%GEM%}"`, `gem"%GEM%;%GEM2%;...;%OTHER%"`, `sbin"g:bin/*"`, `atpull"%atclone"`.
- The `gem` ice (from the `bin-gem-node` annex) installs gems into an isolated directory under zinit's data dir; no system gem directory is touched.
- Default `param-default` is `GEM -> lolcat`, so without a `param` ice `lolcat` is installed.
- Requires the `bin-gem-node` annex and a working `gem` binary in PATH.

## Examples

```zsh
# Install colorls
zi pack param'GEM -> colorls' for any-gem

# Install asciidoctor and rouge together
zi pack param'GEM -> asciidoctor  GEM2 -> rouge' for any-gem
```

## Caveats / Common Mistakes

- Requires the `bin-gem-node` annex and `gem` (Ruby) to be available.
- The `id-as` ice defaults to the gem name; if you install two different gems, use `IDAS -> <custom-id>` to avoid ID collisions.

## See Also

- [pkg-any-node](pkg-any-node.md) — same pattern for npm packages
- [pkg-asciidoctor](pkg-asciidoctor.md) — dedicated asciidoctor package using the gem ice
- [pkg-overview](pkg-overview.md) — how `zi pack` works
