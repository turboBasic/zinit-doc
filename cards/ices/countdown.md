---
id: countdown
title: "Ice: countdown''"
category: ices
tags: [ice, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [atclone, atpull, make]
---

## Summary

`countdown` displays an interruptable 5…4…3…2…1…0 countdown before executing the
`atclone''`, `atpull''`, and `make''` hooks. Pressing Ctrl-C aborts the hooks.

## Syntax / Usage

```zsh
zi ice countdown
```

## Details

`countdown` is a flag ice — it takes no value. It is intended as a safety net for hooks
that make system changes (compilation, installation), giving the user a moment to cancel
before the operation starts.

The countdown appears before each of `atclone''`, `atpull''`, and `make''` invocations.

## Examples

```zsh
zi ice countdown make"install PREFIX=$ZPFX"
zi light tj/git-extras
```

## See Also

- atclone
- atpull
- make
