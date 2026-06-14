---
id: ts-branch-completions-omz-757
title: "Git branch completions not working after migrating from OMZ"
category: troubleshooting
tags: [completion, snippet, troubleshooting, migration]
source: https://github.com/zdharma-continuum/zinit/issues/757
related: [ts-omz-async-prompt-missing-727]
---

## Summary

After switching from Oh My Zsh to zinit with `OMZP::git` and `OMZP::composer` snippets, git branch tab completion stops working even though other completions function normally.

## Symptom

Typing `git checkout <TAB>` does not show branch names. Other git completions (subcommands, flags) work fine. The OMZ `git` plugin is loaded via `zinit snippet OMZP::git`.

## Cause

OMZ's `git` plugin (as a snippet) provides aliases and some functions but does not bring the full zsh git completion system. The underlying `_git` zsh completion function depends on `compinit` being called correctly and the git completion file being in `$fpath`. Loading via snippet does not automatically wire up all the pieces.

## Fix / Workaround

Ensure `compinit` is called after all plugins and completions are loaded:

```zsh
zinit snippet OMZL::git.zsh
zinit ice atload"unalias grv"
zinit snippet OMZP::git
zinit snippet OMZP::composer

autoload -Uz compinit && compinit
```

Also verify that the system git completion file is in `$fpath`:

```zsh
print -l $fpath | grep git
```

If using Turbo mode, call `zicompinit; zicdreplay` in an `atload` hook on the last completion-related plugin.
