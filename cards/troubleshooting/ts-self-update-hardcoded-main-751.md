---
id: ts-self-update-hardcoded-main-751
title: "zinit self-update fails on non-main branch or custom fork"
category: troubleshooting
tags: [troubleshooting, git, installation]
source: https://github.com/zdharma-continuum/zinit/issues/751
related: []
---

## Summary

`zinit self-update` fails with git errors when zinit is installed from a fork or checked out on a non-`main` branch because the update logic hardcoded the `main` branch and `origin/HEAD`.

## Symptom

```
fatal: ambiguous argument '..origin/HEAD': unknown revision or path not in the working tree.
...
fatal: Not possible to fast-forward, aborting.
```

## Cause

`.zinit-self-update` used hardcoded `main` and `origin/HEAD` references in git commands. Users with zinit cloned from a feature branch (e.g. `integrated`) or from a fork hit these failures because the references do not match.

## Fix / Workaround

Update zinit to a version containing the branch-agnostic fix from PR #751:

```zsh
# Force a manual update if self-update is broken
git -C "${ZINIT[BIN_DIR]}" fetch origin
git -C "${ZINIT[BIN_DIR]}" merge --ff-only FETCH_HEAD
```

After updating, `zinit self-update` will detect the current tracking branch automatically.
