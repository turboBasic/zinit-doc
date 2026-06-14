---
id: ts-self-update-git-ref-conflict-609
title: zinit self-update fails with git ref locking error — conflicting branch names
category: troubleshooting
tags: [troubleshooting, command, git, installation]
source: https://github.com/zdharma-continuum/zinit/issues/609
related: []
---

## Summary

`zinit self-update` prints git ref-locking errors when the zinit repository has stale remote-tracking refs that conflict with new branch name paths (e.g. a ref `ci` that conflicts with a new `ci/speedup-zunit` branch).

## Symptom

```
error: cannot lock ref 'refs/remotes/origin/ci/speedup-zunit': 'refs/remotes/origin/ci' exists; cannot create 'refs/remotes/origin/ci/speedup-zunit'
error: some local refs could not be updated; try running
 'git remote prune origin' to remove any old, conflicting branches
```

The self-update continues and completes but with errors.

## Cause

Old remote-tracking refs in the zinit git repo conflict with newly created branch name hierarchies. This is a standard git issue when a flat branch name (e.g. `ci`) is later replaced by a namespaced branch (`ci/speedup-zunit`).

## Fix / Workaround

Run the command git itself suggests to prune stale refs:

```zsh
cd ~/.local/share/zinit/zinit.git
git remote prune origin
```

Then retry `zinit self-update`. This is a one-time cleanup.
