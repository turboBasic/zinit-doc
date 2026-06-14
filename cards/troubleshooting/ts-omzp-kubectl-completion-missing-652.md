---
id: ts-omzp-kubectl-completion-missing-652
title: OMZP::kubectl completion fails — _ZSH_CACHE_DIR/completions missing, _kubectl not found
category: troubleshooting
tags: [troubleshooting, snippet, completion, installation]
source: https://github.com/zdharma-continuum/zinit/issues/652
related: [ts-zsh-cache-dir-completions-missing-707]
---

## Summary

Using `zinit snippet OMZP::kubectl` fails because the kubectl OMZ plugin writes a generated completion to `$ZSH_CACHE_DIR/completions/_kubectl`, but that directory is not created by zinit and the fpath is not configured to include it.

## Symptom

```
(eval):1: command not found: _kubectl
```

Tab completion for `k` or `kubectl` does not work.

## Cause

Two problems: (1) `$ZSH_CACHE_DIR/completions` does not exist; (2) even if the file is written, zinit does not add `$ZSH_CACHE_DIR/completions` to `$fpath` automatically.

## Fix / Workaround

Create the directory and add it to `fpath` before sourcing the snippet:

```zsh
export ZSH_CACHE_DIR="${XDG_CACHE_HOME:-$HOME/.cache}/zinit"
mkdir -p "$ZSH_CACHE_DIR/completions"
fpath=("$ZSH_CACHE_DIR/completions" $fpath)

zinit snippet OMZP::kubectl
```

Then call `compinit` (or ensure your `zicompinit` runs after this point).

## See Also

- ts-zsh-cache-dir-completions-missing-707
