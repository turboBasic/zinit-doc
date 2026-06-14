---
id: ts-self-update-stale-always-uptodate-762
title: "zinit self-update always reports Already up-to-date despite new commits"
category: troubleshooting
tags: [troubleshooting, git]
source: https://github.com/zdharma-continuum/zinit/issues/762
related: []
---

## Summary

`zinit self-update` reports "Already up-to-date." even when upstream has new commits because the change-detection function compares against a stale local tracking ref that was never fetched.

## Symptom

Running `zinit self-update` always prints:

```
Already up-to-date.
```

even though `git log origin/main` shows newer commits than the installed version.

## Cause

Three bugs in `.zi-check-for-git-changes()`:

1. The function compared `HEAD` against the local tracking ref (`@{u}`) without fetching first. The `git fetch` lived inside the block guarded by the check — a chicken-and-egg problem.
2. `git --work-tree "$1"` was used instead of `git -C "$1"`, so git could not find the `.git` directory.
3. A missing `--` separator between flags and paths.

## Fix / Workaround

Update zinit to a version containing the fix from PR #762:

```zsh
# Force a manual update by pulling directly
git -C "${ZINIT[BIN_DIR]}" fetch origin
git -C "${ZINIT[BIN_DIR]}" merge --ff-only origin/main
```

Then run `zinit self-update` again to trigger compilation and reload.
