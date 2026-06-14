---
id: ts-omz-theme-no-colors-189
title: Oh-My-Zsh theme loads without colors or with raw escape sequences
category: troubleshooting
tags: [snippet, plugin, migration, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/189
related: []
---

## Summary

When loading an OMZ theme via zinit, the prompt appears without colors or shows literal `$(build_prompt)` strings because required OMZ libraries are not loaded or `setopt promptsubst` is missing.

## Symptom

- Terminal prompt shows no colors
- Prompt renders as: `... $(build_prompt) ...` instead of the styled prompt

## Cause

OMZ themes depend on:
1. The `git.zsh` library (for git prompt functions)
2. `setopt promptsubst` being active
3. Optionally: `async_prompt.zsh` for async prompt themes

Without these, prompt expansion fails silently or produces raw text.

## Fix / Workaround

Load the required OMZ libraries before the theme, and set `promptsubst`:

```zsh
# Required libraries
zinit snippet OMZL::git.zsh
zinit snippet OMZL::async_prompt.zsh  # needed by some themes

# Load git plugin (provides current_branch, etc.)
zinit snippet OMZP::git
zinit cdclear -q  # discard git plugin's compdefs if not needed

setopt promptsubst

# Now load the theme
zinit light NicoSantangelo/Alpharized
# or: zinit snippet OMZT::robbyrussell
```

## Caveats

The `git` OMZ plugin adds many aliases. If you only need the git library functions for the prompt, load `OMZL::git.zsh` alone and skip `OMZP::git`.
