---
id: src
title: "Ice: src''"
category: ices
tags: [ice, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [pick, multisrc, atload]
---

## Summary

`src''` specifies an additional file to source after the main plugin file (or after
setting up a command with `as"program"`). Unlike `pick''`, it takes a plain filename,
not a glob pattern.

## Syntax / Usage

```zsh
zi ice src"additional-file.zsh"
zi ice pick"main.zsh" src"extras.zsh"
```

## Details

`src''` is sourced after the file selected by `pick''` (or after the auto-detected main
file). It is executed in the plugin's directory. Unlike `pick''`, it does not support
glob patterns — the value must be an exact filename or path relative to the plugin
directory.

It is also used after `as"program"` setup: you can install a binary with `as"program"`
and then source an init script with `src''`.

Order of execution: `pick''` (sourced) → `src''` → `multisrc''` → `atload''`.

## Examples

```zsh
# Source async.zsh then pure.zsh from the same repository
zi ice pick"async.zsh" src"pure.zsh"
zi light sindresorhus/pure

# starship: install binary via as"program", then source the generated init script
zi ice as"command" from"gh-r" \
      atclone"./starship init zsh > init.zsh; ./starship completions zsh > _starship" \
      atpull"%atclone" src"init.zsh"
zi light starship/starship
```

## See Also

- pick
- multisrc
- atload
