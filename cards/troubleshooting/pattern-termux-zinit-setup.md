---
id: pattern-termux-zinit-setup
title: "Show & Tell: zinit setup for Termux on Android"
category: troubleshooting
tags: [installation, snippet, completion, turbo, plugin]
source: https://github.com/zdharma-continuum/zinit/discussions/466
related: [ts-fzf-binary-keybindings-completion, ts-compinit-turbo-mode]
---

## Summary

Zinit works on Termux. FZF key-bindings and completions are loaded as local snippets from `$PREFIX/share/fzf/` (where Termux's fzf package installs them), not from GitHub.

## Details

Termux-specific notes:
- `$PREFIX` is `/data/data/com.termux/files/usr` — package-managed files live there
- `is-snippet` ice is used to load local files as zinit snippets
- FZF ships its shell scripts in `$PREFIX/share/fzf/`
- `zpcompinit` and `zpcdreplay` are aliases for `zicompinit` and `zicdreplay` (both forms work)
- `ZINIT[COMPINIT_OPTS]=-C` skips the insecure-directory check on compinit (speeds up startup)

## Examples

```zsh
# OMZ libs (non-turbo, needed before first prompt)
zinit lucid light-mode for \
    OMZL::history.zsh \
    OMZL::completion.zsh \
    OMZL::key-bindings.zsh

# Completions + UX plugins in turbo
zinit wait lucid light-mode for \
    atinit"ZINIT[COMPINIT_OPTS]=-C; zpcompinit; zpcdreplay" \
    zdharma-continuum/fast-syntax-highlighting \
    OMZP::colored-man-pages \
    OMZP::git \
    atload"!_zsh_autosuggest_start" \
    zsh-users/zsh-autosuggestions \
    blockf atpull'zinit creinstall -q .' \
    zsh-users/zsh-completions

# FZF from Termux package (not GitHub)
zinit wait lucid is-snippet for \
    $PREFIX/share/fzf/key-bindings.zsh \
    $PREFIX/share/fzf/completion.zsh

export FZF_DEFAULT_OPTS='--color 16'
```

## Caveats

`ZINIT[COMPINIT_OPTS]=-C` passes `-C` to compinit, which skips the security check for completion files. This is needed on Termux because the prefix path is world-writable. Do not use `-C` on standard Linux/macOS systems where the security check is meaningful.
