---
id: ts-starship-turbo-mode-715
title: Loading Starship prompt in turbo mode
category: troubleshooting
tags: [turbo, ice, snippet, performance]
source: https://github.com/zdharma-continuum/zinit/discussions/715
related: []
---

## Summary
Prompts like Starship that use `eval "$(starship init zsh)"` cannot be loaded in turbo mode because the prompt must be set before the first prompt is drawn. Use `atclone`/`atpull` to pre-generate the init script and source it synchronously.

## Question / Problem
A user wanted to run `eval "$(starship init zsh)"` in turbo mode to speed up startup, but could not find a working configuration.

## Answer / Solution
Prompts cannot be deferred with `wait` because they must be active before the first prompt is rendered. Instead, pre-generate the init script at install time and source it directly — this avoids the slow `starship init zsh` subprocess on every shell start:

```zsh
zinit ice as"command" from"gh-r" \
          atclone"./starship init zsh > init.zsh; ./starship completions zsh > _starship" \
          atpull"%atclone" src"init.zsh"
zinit light starship/starship
```

This is the official zinit pattern for Starship:
- `atclone` generates `init.zsh` once after the binary is downloaded.
- `atpull"%atclone"` regenerates it on updates.
- `src"init.zsh"` sources the pre-generated script synchronously at startup (no subprocess needed).

The result is faster than `eval "$(starship init zsh)"` because the init script is already on disk.

## Caveats
Prompts that modify the ZLE line editor (like Starship or Powerlevel10k) must be initialized before the first prompt. If loaded with `wait`, the first prompt will use the default PS1 and the custom prompt will only appear after the first keypress.
