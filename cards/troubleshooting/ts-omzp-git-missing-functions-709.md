---
id: ts-omzp-git-missing-functions-709
title: OMZP::git snippet — git_current_branch and other helper functions not found
category: troubleshooting
tags: [troubleshooting, snippet, plugin, completion]
source: https://github.com/zdharma-continuum/zinit/issues/709
related: []
---

## Summary

Loading `OMZP::git` as a single-file snippet omits the OMZ `git` library (`OMZL::git.zsh`) which defines helper functions like `git_current_branch`. Aliases such as `gpsup` that call these helpers fail at runtime.

## Symptom

```
zsh: command not found: git_current_branch
fatal: The current branch sample-branch has no upstream branch.
```

Running `gpsup` or other OMZ git aliases that depend on helper functions produces the error.

## Cause

`zinit snippet OMZP::git/git.plugin.zsh` loads only the plugin file. The OMZ git plugin depends on functions from `lib/git.zsh`, which is not loaded when using zinit snippets — unlike full OMZ installation which sources `lib/git.zsh` automatically.

## Fix / Workaround

Load the OMZ git library before the git plugin:

```zsh
zinit snippet OMZL::git.zsh
zinit snippet OMZP::git
```

Or in the `for` syntax:

```zsh
zinit for \
  OMZL::git.zsh \
  OMZP::git
```
