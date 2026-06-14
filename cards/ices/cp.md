---
id: cp
title: "cp"
category: ices
tags: [ice, command, binary, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [mv, atclone, atpull]
---

## Summary

`cp''` copies a file after cloning or after an update (only when new commits were
downloaded). It is like `mv''` but preserves the original file.

## Syntax / Usage

```zsh
zi ice cp"{from} -> {to}"
zi ice cp"docker-c* -> dcompose"
```

## Details

The separator is ` -> ` (space, arrow, space). Both sides are filenames or glob patterns
relative to the plugin directory.

`cp''` runs after `mv''` and before `atclone''`/`atpull''` (unless those start with
`!`). Unlike `mv''`, the source file is retained.

Works with both plugins and snippets.

## Examples

```zsh
# Copy a config template to a working copy without destroying the original
zi ice cp"config.example -> config.zsh" atload"source config.zsh"
zi light user/some-plugin
```

## See Also

- mv
- atclone
- atpull
