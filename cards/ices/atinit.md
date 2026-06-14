---
id: atinit
title: "Ice: atinit''"
category: ices
tags: [ice, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [atload, atclone, atpull, nocd]
---

## Summary

`atinit''` runs a shell command after the plugin directory is set up (cloned/verified)
but before the plugin is sourced. It is the first user hook to execute in the load
sequence.

## Syntax / Usage

```zsh
zi ice atinit"<shell-code>"
zi ice atinit"zicompinit; zicdreplay"
```

## Details

The code is evaluated in the context of the plugin's directory (unless `nocd''` is
set). It runs on every load, not only on first clone.

Common uses:
- Initialize completions before a syntax-highlighting plugin is sourced
  (the recommended pattern for turbo mode).
- Set environment variables that the plugin reads during sourcing.

Order of execution: `atinit` -> `atpull!` -> `make'!!'` -> `mv` -> `cp` -> `make!` ->
`atclone`/`atpull` -> `make` -> `(plugin script loading)` -> `src` -> `multisrc` ->
`atload`.

## Examples

```zsh
# Initialize completions before the last completion-related plugin loads
zi ice wait lucid atinit"zicompinit; zicdreplay" blockf
zi light zsh-users/zsh-completions
```

## See Also

- atload
- atclone
- atpull
- nocd
