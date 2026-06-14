---
id: atload
title: "atload"
category: ices
tags: [ice, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [atinit, atclone, atpull, nocd, wait]
---

## Summary

`atload''` runs a shell command after the plugin is fully loaded (sourced). It is the
last hook to fire in the load sequence and works with both plugins and snippets.

## Syntax / Usage

```zsh
zi ice atload"<shell-code>"

# Precede with ! to enable reporting/investigation of the code (load mode only)
zi ice atload"!<shell-code>"
```

## Details

The code runs after the plugin script is sourced, within the plugin's directory (unless
`nocd''` is set).

When the value starts with `!`, the hook is executed with Zinit's investigating
(reporting) enabled — i.e. the code is tracked as if loaded with `zi load` rather than
`zi light`. This is useful for auditing what the hook changes.

Order of execution: `atinit` -> `atpull!` -> `make'!!'` -> `mv` -> `cp` -> `make!` ->
`atclone`/`atpull` -> `make` -> `(plugin script loading)` -> `src` -> `multisrc` ->
`atload`.

## Examples

```zsh
# Re-bind a key after zsh-autosuggestions loads in turbo mode
zi ice wait lucid atload"bindkey '^P' autosuggest-accept"
zi light zsh-users/zsh-autosuggestions

# Run compinit after loading the last completion plugin
zi ice wait lucid atload"zicompinit; zicdreplay" blockf
zi light zsh-users/zsh-completions

# Set a theme variable after loading a git plugin
zi ice atload'export _MENU_THEME=legacy'
zi light arzzen/git-quick-stats
```

## See Also

- atinit
- atclone
- atpull
- nocd
- wait
