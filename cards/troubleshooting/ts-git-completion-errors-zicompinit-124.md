---
id: ts-git-completion-errors-zicompinit-124
title: Git completion errors after calling zicompinit
category: troubleshooting
tags: [completion, troubleshooting, git]
source: https://github.com/zdharma-continuum/zinit/issues/124
related: []
---

## Summary

After calling `zicompinit`, git tab-completion breaks with errors referencing `__git_aliased_command` or missing files in the `_git` completion function. This is typically caused by loading an OMZ git plugin whose completion interferes with the system git completion.

## Symptom

```
% git com<TAB>
_git:.:42: no such file or directory:

% git commit<TAB>
__git_zsh_bash_func:9: command not found: __git_aliased_command
```

## Cause

The OMZ `git` plugin installs its own `_git` completion which clashes with the system-provided `_git` (from zsh or git-contrib). When both are loaded, function references break.

## Fix / Workaround

Clear OMZ compdefs before loading your own completion setup:

```zsh
zinit snippet OMZP::git
zinit cdclear -q   # discard completions registered by the OMZ git plugin
```

Alternatively, use `blockf` when loading the OMZ git plugin to prevent it from adding to `fpath`:

```zsh
zinit ice blockf
zinit snippet OMZP::git
```

Then rely on the system `_git` completion which is already in fpath.

## Caveats

`zicdclear` (usable in hooks) and `zinit cdclear` (interactive) both achieve the same result. After clearing, call `zicompinit` / `compinit` to rebuild with only the completions you want.
