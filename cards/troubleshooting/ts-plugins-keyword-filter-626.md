---
id: ts-plugins-keyword-filter-626
title: "zinit plugins keyword argument filter not working"
category: troubleshooting
tags: [command, troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/626
related: []
---

## Summary

`zinit plugins <keyword>` (also `zinit list-plugins <keyword>`) did not correctly filter the plugin list by the given keyword, returning either all plugins or nothing.

## Symptom

Running `zinit plugins fzf` returns all loaded plugins instead of only those matching "fzf".

## Cause

A parsing bug in the `plugins` subcommand caused the keyword argument to be ignored when handling the command dispatch.

## Fix / Workaround

Upgrade to a version that includes the fix for issue #626. After the fix, the keyword filter works as documented:

```zsh
zinit plugins fzf       # shows only plugins matching "fzf"
zinit list-plugins git  # shows only plugins matching "git"
```

On older versions, filter manually with `grep`:

```zsh
zinit plugins | grep fzf
```
