---
id: mv
title: "mv"
category: ices
tags: [ice, command, binary, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cp, atclone, atpull, from]
---

## Summary

`mv''` renames a file after cloning or after an update (only when new commits were
downloaded). It is primarily used to rename versioned binary release assets to a
consistent short name.

## Syntax / Usage

```zsh
zi ice mv"{from} -> {to}"
# from/to are relative to the plugin/snippet directory
zi ice mv"fzf-linux-amd64 -> fzf"
zi ice mv"docker-compose-Linux-x86_64 -> docker-compose"
```

## Details

The separator is ` -> ` (space, arrow, space). Both sides are filenames or glob patterns
relative to the plugin directory. The operation runs after cloning and after `git pull`
(only if new commits arrived).

`mv''` runs before `cp''` and before `atclone''`/`atpull''` (unless `atpull` starts
with `!`).

Works with both plugins and snippets.

## Examples

```zsh
# Rename the platform-specific docker-compose binary
zi ice from"gh-r" as"program" mv"docker* -> docker-compose" bpick"*linux*"
zi load docker/compose
```

## See Also

- cp
- atclone
- atpull
- from
