---
id: ts-omz-theme-git-errors
title: "OMZ theme errors: command not found: git_prompt_status"
category: troubleshooting
tags: [snippet, troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/discussions/363
related: [ts-omz-lib-git-zsh-load, ts-omz-migration-snippets]
---

## Summary

OMZ themes that display git status use functions defined in `lib/git.zsh`. If that library is not loaded before the theme, you get `command not found: git_prompt_status` and similar errors.

## Question / Problem

After loading an OMZ theme via `zinit snippet OMZT::...`, the prompt shows errors like:

```
........:1: command not found: git_prompt_status
........:1: command not found: git_prompt_short_sha
```

## Answer / Solution

Load `OMZL::git.zsh` before the theme. Also load the git plugin if the theme uses `current_branch`:

```zsh
setopt promptsubst

zinit snippet OMZL::git.zsh         # required for git_prompt_* functions
zinit snippet OMZL::async_prompt.zsh  # required by some themes

zinit snippet OMZP::git             # provides current_branch and more
zinit cdclear -q                    # optional: discard git plugin's compdefs

zinit snippet OMZT::robbyrussell    # now the theme can use git functions
```

For external (non-bundled) OMZ-compatible themes, use `zinit light` instead of `snippet`:

```zsh
zinit snippet OMZL::git.zsh
zinit snippet OMZP::git
zinit cdclear -q
setopt promptsubst
zinit light NicoSantangelo/Alpharized
```

## Caveats

`setopt promptsubst` is required for themes that use `$(...)` in prompt strings. Without it, the prompt shows literal `$(build_prompt)` text instead of evaluating it.
