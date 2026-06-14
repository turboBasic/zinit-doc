---
id: pattern-turbo-omz-m1-mac
title: "Show & Tell: Full turbo .zshrc with OMZ libs on Apple Silicon"
category: concepts
tags: [turbo, snippet, completion, plugin, performance]
source: https://github.com/zdharma-continuum/zinit/discussions/109
related: [ts-homebrew-completions-fpath, ts-compinit-turbo-mode, ts-light-mode-performance]
---

## Summary

A complete production `.zshrc` combining OMZ library snippets, Homebrew fpath extension, and turbo-mode plugins on an M1 Mac, demonstrating the correct load ordering for performance.

## Details

Key structural decisions:
- Homebrew fpath extended before zinit source (covers tools not managed by zinit)
- Annexes loaded synchronously (required for annex hooks to work)
- OMZ history snippet loaded non-turbo (shell history must be available immediately)
- Everything else in turbo `wait` blocks
- `zicompinit; zicdreplay` in `atinit` of the last turbo block

## Examples

```zsh
### Zinit installer bootstrap (auto-installs zinit if missing)
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
[[ ! -d $ZINIT_HOME ]] && mkdir -p "$(dirname $ZINIT_HOME)"
[[ ! -d $ZINIT_HOME/.git ]] && git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
source "${ZINIT_HOME}/zinit.zsh"
autoload -Uz _zinit
(( ${+_comps} )) && _comps[zinit]=_zinit

# Annexes — must be loaded without turbo
zinit light-mode for \
    zdharma-continuum/zinit-annex-rust \
    zdharma-continuum/zinit-annex-as-monitor \
    zdharma-continuum/zinit-annex-patch-dl \
    zdharma-continuum/zinit-annex-bin-gem-node

# Homebrew completions (covers brew-managed tools)
fpath+=( /usr/local/share/zsh/site-functions /opt/homebrew/share/zsh/site-functions )
path+=( $HOME/go/bin $HOME/.cargo/bin )

# Non-turbo: pure theme + OMZ history (needed before first prompt)
zinit lucid for \
    atinit"HIST_STAMPS=dd.mm.yyyy" \
    OMZL::history.zsh \
    light-mode pick"async.zsh" src"pure.zsh" \
    sindresorhus/pure

# Turbo block 1: OMZ libs and plugins
zinit wait lucid for \
    OMZL::completion.zsh \
    atload"
        alias ..='cd ..'
        alias ...='cd ../..'
        export AWS_DEFAULT_REGION=eu-central-1
        eval \$(fnm env)
    " \
    OMZL::directories.zsh \
    OMZL::git.zsh \
    OMZP::brew \
    OMZP::git \
    OMZL::spectrum.zsh \
    OMZL::termsupport.zsh \
    agkozak/zsh-z

# Turbo block 2: completions and UX plugins
zinit wait lucid for \
    atinit"zicompinit; zicdreplay" \
    zdharma-continuum/fast-syntax-highlighting \
    atload"_zsh_autosuggest_start" \
    zsh-users/zsh-autosuggestions \
    atload'bindkey "^[[A" history-substring-search-up;
        bindkey "^[[B" history-substring-search-down' \
    zsh-users/zsh-history-substring-search \
    zdharma-continuum/history-search-multi-word \
    blockf atpull'zinit creinstall -q .' \
    zsh-users/zsh-completions
```
