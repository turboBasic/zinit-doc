---
id: ts-csearch-lua-false-completions-516
title: "zinit csearch shows Lua files as available completions"
category: troubleshooting
tags: [completion, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/516
related: [ts-yaml-py-installed-as-completions-528]
---

## Summary

`zinit csearch` listed Lua files starting with `_` (e.g. from Neovim plugin directories) as available completions, cluttering the output with false positives.

## Symptom

`zinit csearch` output includes entries like `_plugin.lua` from Lua-based plugins. Running `zinit creinstall` on such a plugin installs the Lua file as a completion, which then breaks tab completion.

## Cause

The completion search logic matched any file starting with `_` in plugin directories without filtering by file extension. Lua plugin files that happen to start with `_` were included.

## Fix / Workaround

Update zinit (fixed in PR #516, which ignores Lua files in completion searches):

```zsh
zinit self-update
```

To remove already-installed incorrect Lua completions:

```zsh
zinit cclear
```
