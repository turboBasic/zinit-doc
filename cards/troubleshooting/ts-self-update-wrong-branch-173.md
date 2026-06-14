---
id: ts-self-update-wrong-branch-173
title: zinit self-update always pulls from main regardless of current branch
category: troubleshooting
tags: [installation, troubleshooting, git]
source: https://github.com/zdharma-continuum/zinit/issues/173
related: []
---

## Summary

Before PR #173, `zinit self-update` was hardcoded to fetch and reset to the `main` branch, even if the zinit installation was on a different branch (e.g. a development or feature branch). This silently switched branches on update.

## Symptom

After `zinit self-update`, the zinit source is on `main` regardless of which branch was previously checked out.

## Cause

The self-update logic used `git fetch origin main && git reset --hard origin/main` unconditionally rather than determining and using the current branch.

## Fix / Workaround

Update zinit (`zinit self-update`) — PR #173 fixed this to use the current branch rather than hardcoding `main`.

If you are on a non-main branch and want to stay there, verify after updating:

```zsh
cd "${ZINIT[BIN_DIR]:-${HOME}/.local/share/zinit/zinit.git}"
git branch  # confirm you are on the expected branch
```

## Caveats

For standard users on the `main` branch, this bug had no visible effect. It only mattered for contributors or testers using other branches.
