---
id: ts-omzl-git-snippet-load-363
title: Loading OMZ library files (OMZL) with zinit
category: troubleshooting
tags: [snippet, migration, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/363
related: []
---

## Summary
`OMZL::git` is not a valid shorthand because `OMZL::` maps to `ohmyzsh/raw/master/lib/` and requires the full filename including extension.

## Question / Problem
The user loaded `OMZP::git` successfully but needed `git_current_branch()` from `ohmyzsh/lib/git.zsh`. Using `zinit snippet OMZL::git` returned a 404.

## Answer / Solution
The `OMZL::` shorthand requires the full filename with extension, not just the basename:

```zsh
zinit snippet OMZL::git.zsh
```

This fetches `https://github.com/ohmyzsh/ohmyzsh/raw/master/lib/git.zsh`.

Many OMZ plugins depend on library files. Load the required library before the plugin:

```zsh
zinit snippet OMZL::git.zsh
zinit snippet OMZP::git
```

## Caveats
`OMZL::` is for individual files in `ohmyzsh/lib/`. If a library file itself sources other files or uses relative paths, those dependencies will not be resolved automatically. For multi-file OMZ libraries, loading the whole `OMZP` plugin (which bundles its dependencies) is often simpler.
