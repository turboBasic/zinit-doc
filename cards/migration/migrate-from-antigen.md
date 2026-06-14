---
id: migrate-from-antigen
title: Migrate from Antigen
category: migration
tags: [migration, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [plugins-vs-snippets, oh-my-zsh-compatibility, prezto-compatibility, load-vs-light]
---

## Summary

Antigen commands map directly to Zinit equivalents: `antigen bundle` becomes `zi light` or `zi snippet`, and `antigen theme` becomes `zi snippet OMZT::` or `zi light`.

## Syntax / Usage

```zsh
# Antigen  →  Zinit
antigen bundle <user/repo>        →  zi light <user/repo>
antigen bundle <user/repo> --branch=<b>  →  zi ice ver"<b>"; zi light <user/repo>
antigen bundle oh-my-zsh          →  zi snippet OMZL::<each lib file>
antigen bundle oh-my-zsh <plugin> →  zi snippet OMZP::<plugin>
antigen theme <theme>             →  zi snippet OMZT::<theme>  (+ setopt promptsubst)
antigen apply                     →  (remove — Zinit applies immediately)
```

## Details

Antigen's model is similar to Zinit's: plugins are Git repos, and OMZ/Prezto content is loaded as snippets. The main differences:

- Antigen's `antigen apply` batches initialization; Zinit does not need this — each `zi` call takes effect immediately (or at the deferred time if `wait` is used).
- `antigen bundle oh-my-zsh` loads the entire OMZ base. In Zinit, load only the specific libraries you need from `OMZL::`.
- Antigen has no equivalent to Zinit's `wait` ice for deferred loading — adding `wait` to migrated calls is an opportunity to improve startup performance.

**Migration steps:**

1. Remove `source ~/path/to/antigen.zsh` and `antigen apply`.
2. Replace each `antigen bundle` with `zi light` (for GitHub plugins) or `zi snippet OMZP::` (for OMZ plugins).
3. Replace `antigen theme` with `zi snippet OMZT::` plus `setopt promptsubst`.
4. Load required OMZ libraries (`OMZL::git.zsh`, etc.) explicitly before themes that depend on them.
5. Optionally add `wait lucid` ices to defer non-critical plugins.

## Examples

```zsh
# Old Antigen .zshrc
source ~/.antigen/antigen.zsh
antigen use oh-my-zsh
antigen bundle git
antigen bundle zsh-users/zsh-autosuggestions
antigen bundle zsh-users/zsh-syntax-highlighting
antigen theme robbyrussell
antigen apply

# New Zinit .zshrc
ZINIT_HOME="${XDG_DATA_HOME:-$HOME/.local/share}/zinit/zinit.git"
[ ! -d $ZINIT_HOME/.git ] && git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
source "${ZINIT_HOME}/zinit.zsh"

zi snippet OMZL::git.zsh
zi snippet OMZP::git
zi cdclear -q

zi light zsh-users/zsh-autosuggestions
zi light zsh-users/zsh-syntax-highlighting

setopt promptsubst
zi snippet OMZT::robbyrussell
```
