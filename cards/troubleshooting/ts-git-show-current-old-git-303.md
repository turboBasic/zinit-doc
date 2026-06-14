---
id: ts-git-show-current-old-git-303
title: "zinit self-update fails with: error: unknown option 'show-current'"
category: troubleshooting
tags: [git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/303
related: []
---

## Summary

Running `zinit self-update` fails with `error: unknown option 'show-current'` on systems where git is older than 2.22. The `git branch --show-current` subcommand was introduced in git 2.22.

## Symptom

```
zinit self-update
error: unknown option `show-current'
usage: git branch [options] [-r | -a] [--merged | --no-merged]
   or: git branch [options] [-l] [-f] <branchname> [<start-point>]
```

Seen on systems running git 1.8.3.1 (e.g. RHEL/CentOS 7).

## Cause

Zinit used `git branch --show-current` to detect the current branch. This flag is only available in git ≥ 2.22. Fixed in PR #307.

## Fix / Workaround

Update zinit (the fix uses a backwards-compatible alternative):

```zsh
zinit self-update
```

If zinit itself cannot be updated due to the broken self-update, apply the fix manually by pulling:

```zsh
cd ~/.local/share/zinit/zinit.git
git pull
```

Or upgrade git to ≥ 2.22 on the system.

## Caveats

Enterprise Linux distributions (RHEL 7, CentOS 7) ship git 1.8.3 and require a separate `git` package from the Software Collections repository or IUS to get a modern version.
