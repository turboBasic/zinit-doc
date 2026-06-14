---
id: ts-omz-lib-git-zsh-load
title: How to load ohmyzsh lib/*.zsh files (e.g. OMZL::git.zsh)
category: troubleshooting
tags: [snippet, plugin, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/363
related: [ts-omz-migration-snippets, ts-omz-theme-git-errors]
---

## Summary

`OMZL::git.zsh` is the correct shorthand for loading `lib/git.zsh` from oh-my-zsh. The shorthand expands to the file path, not a directory — append `.zsh` explicitly.

## Question / Problem

A user needed `git_current_branch()` (defined in OMZ's `lib/git.zsh`) because OMZP::git depends on it. Trying `zinit snippet OMZL::git` returned a 404 error.

## Answer / Solution

`OMZL::` expands to `https://github.com/ohmyzsh/ohmyzsh/raw/master/lib/`. The shorthand requires the full filename including extension:

```zsh
# Correct — includes .zsh extension
zinit snippet OMZL::git.zsh

# Wrong — missing .zsh, results in 404
zinit snippet OMZL::git
```

Load order matters: lib files must load before plugins that depend on them:

```zsh
zinit snippet OMZL::git.zsh       # load library first
zinit snippet OMZP::git           # then the plugin that uses it
```

## Examples

Common OMZ lib files that plugins depend on:

```zsh
zinit snippet OMZL::git.zsh
zinit snippet OMZL::completion.zsh
zinit snippet OMZL::history.zsh
zinit snippet OMZL::key-bindings.zsh
zinit snippet OMZL::directories.zsh
zinit snippet OMZL::termsupport.zsh
zinit snippet OMZL::spectrum.zsh
```

In turbo mode, load them in the same `wait` block, preserving order:

```zsh
zinit wait lucid for \
    OMZL::git.zsh \
    OMZL::completion.zsh \
    OMZP::git
```

## See Also

- [ts-omz-theme-git-errors](#) — error `command not found: git_prompt_status` when git lib is missing
