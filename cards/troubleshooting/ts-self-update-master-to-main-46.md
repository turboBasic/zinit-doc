---
id: ts-self-update-master-to-main-46
title: zinit self-update fails after default branch renamed from master to main
category: troubleshooting
tags: [installation, git, migration, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/46
related: []
---

## Summary

The zinit repository's default branch was renamed from `master` to `main`. Installations cloned from the `master` branch could not self-update until their local tracking branch was switched.

## Symptom

`zinit self-update` exits with a git error, reports the branch is diverged, or says the branch `master` does not exist on the remote:

```
error: pathspec 'master' did not match any file(s) known to git
```

## Cause

The remote's default branch changed from `master` to `main`. Local clones tracking `origin/master` no longer have a valid upstream.

## Fix / Workaround

Switch the local branch to `main`:

```zsh
git -C "${ZINIT[BIN_DIR]:-${HOME}/.local/share/zinit/zinit.git}" \
  checkout -b main --track origin/main
```

Then verify self-update works:

```zsh
zinit self-update
```

If the local clone still has `master` as the checked-out branch, also delete the stale local branch:

```zsh
git -C "${ZINIT[BIN_DIR]:-${HOME}/.local/share/zinit/zinit.git}" \
  branch -D master
```

## Caveats

Zinit's `self-update` was updated to switch branches automatically for users who had not yet migrated. If you are on a very old release that predates this fix, the manual steps above are necessary.
