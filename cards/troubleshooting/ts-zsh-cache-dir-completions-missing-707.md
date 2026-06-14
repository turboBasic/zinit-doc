---
id: ts-zsh-cache-dir-completions-missing-707
title: OMZP snippets fail — $ZSH_CACHE_DIR/completions directory does not exist
category: troubleshooting
tags: [troubleshooting, snippet, completion, installation]
source: https://github.com/zdharma-continuum/zinit/issues/707
related: [ts-omzp-kubectl-completion-missing-652]
---

## Summary

Some OMZ plugins (e.g. `mise`, `kubectl`) write generated completions to `$ZSH_CACHE_DIR/completions/`. When loaded via zinit snippets, this directory does not exist — OMZ normally creates it in `oh-my-zsh.sh`, but zinit does not replicate that setup step.

## Symptom

```
/Users/username/.local/share/zinit/snippets/OMZP::mise/OMZP::mise:26: no such file or directory: /Users/username/.cache/zinit/completions/_mise
```

The error fires every shell open.

## Cause

OMZ's main loader (`oh-my-zsh.sh`) creates `$ZSH_CACHE_DIR/completions` at startup. Zinit does not run this init script, so the directory is missing when plugins try to write to it.

## Fix / Workaround

Create the directory before loading OMZ snippets that need it, and set `$ZSH_CACHE_DIR`:

```zsh
export ZSH_CACHE_DIR="${XDG_CACHE_HOME:-$HOME/.cache}/zinit"
mkdir -p "$ZSH_CACHE_DIR/completions"

zinit snippet OMZP::mise
```

Or use `atinit` ice:

```zsh
zinit ice atinit"mkdir -p ${XDG_CACHE_HOME:-$HOME/.cache}/zinit/completions"
zinit snippet OMZP::mise
```

## See Also

- ts-omzp-kubectl-completion-missing-652
