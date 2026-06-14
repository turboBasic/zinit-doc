---
id: ts-zinit-own-completion-broken-128
title: Zinit's own tab completion not working after fresh install
category: troubleshooting
tags: [completion, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/128
related: []
---

## Summary

After a fresh zinit install, `zinit <Tab>` produces no completions or falls back to directory suggestions. The `_zinit` completion function needs to be explicitly registered when `compinit` is called before `zinit.zsh` is sourced.

## Symptom

`zinit <Tab>` shows file/directory names instead of zinit subcommands.

## Cause

When `zinit.zsh` is sourced after `compinit` has already run, zinit cannot register `_zinit` through the normal completion setup path. The `_comps` associative array must be populated manually.

## Fix / Workaround

If sourcing `zinit.zsh` after `compinit`, add the following immediately after the `source` line:

```zsh
source "${ZINIT_HOME}/zinit.zsh"
autoload -Uz _zinit
(( ${+_comps} )) && _comps[zinit]=_zinit
```

The recommended approach is to source `zinit.zsh` before calling `compinit`, then call `compinit` followed by `zinit cdreplay -q` at the end of plugin loading.

## Caveats

This is documented in the README's Manual installation section and applies whenever `compinit` is called before `zinit.zsh` is sourced.
