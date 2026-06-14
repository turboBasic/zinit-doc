---
id: ts-completion-bat-zsh-pickup-610
title: Loading a non-underscore completion file from a gh-r plugin
category: troubleshooting
tags: [completion, binary, ice, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/610
related: []
---

## Summary
Zinit's auto-completion detection only picks up files named `_<command>`. Completion files with arbitrary names (like `bat.zsh`) must be sourced explicitly with `src` or renamed with `mv`/`cp` to match the `_*` pattern.

## Question / Problem
After installing `sharkdp/bat` from GitHub releases, the file `bat/autocomplete/bat.zsh` was present in the plugin directory but was not installed as a completion. Zinit only detects files named `_bat`.

## Answer / Solution
Option 1 — Rename the file to `_bat` using `mv` ice so zinit detects it:

```zsh
zinit ice as"null" from"gh-r" sbin"**/bat" \
    mv"bat/autocomplete/bat.zsh -> _bat"
zinit light @sharkdp/bat
```

Option 2 — Source the completion file directly with `src`:

```zsh
zinit ice as"null" from"gh-r" sbin"**/bat" \
    src"bat/autocomplete/bat.zsh"
zinit light @sharkdp/bat
```

Option 3 — Use `atclone` to copy it:

```zsh
zinit ice as"null" from"gh-r" sbin"**/bat" \
    atclone"cp bat/autocomplete/bat.zsh _bat" \
    atpull"%atclone"
zinit light @sharkdp/bat
```

## Caveats
`mv` ice renames files permanently in the plugin directory, so on subsequent updates `atpull` will not find the original path. Use `cp` ice or `atclone`/`atpull` with a copy command for more robust behavior.
