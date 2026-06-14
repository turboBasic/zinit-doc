---
id: ts-module-build-fails-second-call-86
title: zinit module build fails on second run with "destination path already exists"
category: troubleshooting
tags: [installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/86
related: []
---

## Summary

Running `zinit module build` a second time fails because the module repository directory already exists from the first build, and the code attempted to `git clone` into it again instead of updating the existing checkout.

## Symptom

```
$ zinit module build
fatal: destination path '/home/user/.local/share/zinit/module' already exists and is not an empty directory.
Failed to clone module repo
```

## Cause

The `zinit module build` command unconditionally ran `git clone` without first checking whether the module directory already contained a valid repository. On any subsequent build (e.g. after a zinit update), the clone fails.

## Fix / Workaround

Update zinit (`zinit self-update`) — PR #86 fixed this by detecting an existing module repository and doing a `git pull` instead of `git clone`.

On an older version, manually reset the module directory before rebuilding:

```zsh
rm -rf "${ZINIT[HOME_DIR]:-${HOME}/.local/share/zinit}/module"
zinit module build
```

## Caveats

The zinit module is now hosted in a separate repository: `https://github.com/zdharma-continuum/zinit-module`. The `zinit module build` command clones from there.
