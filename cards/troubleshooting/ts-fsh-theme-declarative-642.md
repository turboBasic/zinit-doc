---
id: ts-fsh-theme-declarative-642
title: Setting fast-syntax-highlighting theme declaratively in zshrc
category: troubleshooting
tags: [plugin, ice, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/642
related: []
---

## Summary
`fast-syntax-highlighting` stores its theme selection in a binary THEME file inside the plugin directory. Setting it declaratively requires either using `atload` to call `fast-theme` after load, or using `atclone`/`atpull` to write the theme file at install time.

## Question / Problem
The user wanted to specify a `fast-syntax-highlighting` theme in `.zshrc` without manually running `fast-theme` interactively each time.

## Answer / Solution
Use `atload` to set the theme after the plugin loads:

```zsh
zinit ice wait lucid atload"fast-theme XDG:catppuccin-mocha" nocompile'!'
zinit light zdharma-continuum/fast-syntax-highlighting
```

Or use `atclone`/`atpull` to pre-configure the theme at install time:

```zsh
zinit ice wait lucid \
    atclone"fast-theme XDG:catppuccin-mocha" \
    atpull"%atclone" \
    nocompile'!'
zinit light zdharma-continuum/fast-syntax-highlighting
```

Theme names can be checked by running `fast-theme --list` interactively. Custom themes in `~/.config/fsh/` are referenced with the `XDG:` prefix.

## Caveats
`fast-theme` writes a theme file into the plugin directory. If the plugin is deleted and reinstalled, the theme must be re-applied. Using `atclone`/`atpull` ensures the theme is set automatically on reinstall and after updates.
