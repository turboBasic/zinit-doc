---
id: ts-omzl-git-completions-756
title: Using OMZ git library and git plugin with zinit after leaving OMZ
category: troubleshooting
tags: [snippet, migration, completion]
source: https://github.com/zdharma-continuum/zinit/discussions/756
related: []
---

## Summary
To keep OMZ git aliases and completions after switching away from OMZ, load the OMZ `git.zsh` library first, then the `OMZP::git` plugin. The library must precede the plugin.

## Question / Problem
A user who migrated from OMZ to oh-my-posh wanted to retain the OMZ `git` and `composer` plugin aliases and completions via zinit.

## Answer / Solution
The working configuration is:

```zsh
zinit snippet OMZL::git.zsh
zinit ice atload"unalias grv"
zinit snippet OMZP::git
zinit snippet OMZP::composer
```

- `OMZL::git.zsh` provides the git helper functions (`git_prompt_info`, `git_current_branch`, etc.) that `OMZP::git` depends on.
- `atload"unalias grv"` removes the `grv` alias that conflicts with the `grv` binary (a terminal git viewer) if you have it installed.
- `OMZP::composer` loads the composer plugin which provides completions and aliases.

After loading, call `compinit` (or let `zicompinit` handle it in turbo mode).

## Caveats
If `git_current_branch` or similar functions are missing at prompt time, it means `OMZL::git.zsh` was loaded after the theme that uses it. Load OMZ library snippets before any theme.
