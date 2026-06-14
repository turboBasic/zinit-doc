---
id: pick
title: "Ice: pick''"
category: ices
tags: [ice, command, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [src, multisrc, as, nocompile]
---

## Summary

`pick''` selects which file to source (or, when using `as"program"`, which binary to
expose). It accepts a glob pattern and picks the alphabetically first match.

## Syntax / Usage

```zsh
zi ice pick"*.plugin.zsh"
zi ice pick"async.zsh"
zi ice pick"src/vim"           # specific path, used with as"program"
zi ice pick"$ZPFX/bin/git-*"  # variable expansion is supported
```

## Details

When loading a plugin, Zinit normally auto-detects the main file (`*.plugin.zsh`,
`init.zsh`, `*.zsh-theme`). `pick''` overrides that heuristic with an explicit glob
pattern. The alphabetically first matching file is chosen.

When combined with `as"program"`, `pick''` selects the binary file to add to `$PATH`
(or mark as executable). Without `as"program"`, it selects the file to source.

`pick"/dev/null"` effectively suppresses sourcing — this is what `as"null"` uses
internally.

Zinit will attempt to compile the picked file unless `nocompile` is set.

## Examples

```zsh
# Pure theme: source async.zsh first via pick, then pure.zsh via src
zi ice pick"async.zsh" src"pure.zsh"
zi light sindresorhus/pure

# Vim binary added to PATH after compile
zi ice as"program" atclone"./configure" make pick"src/vim"
zi light vim/vim

# LS_COLORS: source a generated file, skip compilation
zi ice pick"c.zsh" nocompile'!'
zi light trapd00r/LS_COLORS
```

## See Also

- src
- multisrc
- as
- nocompile
