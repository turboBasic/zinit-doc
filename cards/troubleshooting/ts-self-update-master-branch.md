---
id: ts-self-update-master-branch
title: "zinit self-update fails: 'fatal: couldn't find remote ref master'"
category: troubleshooting
tags: [troubleshooting, installation, git]
source: https://github.com/zdharma-continuum/zinit/discussions/366
related: [ts-migration-zdharma-continuum]
---

## Summary

After migrating from the old zdharma organization to zdharma-continuum, `zinit self-update` can fail with `fatal: couldn't find remote ref master` because the local clone is on the `master` branch but the new repo's default branch is `main`.

## Question / Problem

A user migrated their zinit installation. `zinit self-update` and `zinit status` returned:

```
fatal: couldn't find remote ref master
```

`git branch` inside the zinit directory showed both `main` and `master` with `master` as the current branch. The `zinit update` command for plugins worked fine.

## Answer / Solution

The zinit binary directory needs to be on the `main` branch (the default branch of the zdharma-continuum repo). Switch it manually:

```zsh
cd ~/.local/share/zinit/zinit.git   # adjust path if using a custom location
git checkout main
git branch -D master   # optional: remove old local branch (force-delete since it may not be fully merged)
```

Then `zinit self-update` should work again.

If the remote origin still points to the old `zdharma/zinit` URL, update it:

```zsh
cd ~/.local/share/zinit/zinit.git
git remote set-url origin https://github.com/zdharma-continuum/zinit.git
```

## Caveats

The old installation path was `~/.zinit/bin/`. The new canonical path is `~/.local/share/zinit/zinit.git`. If using a custom `ZINIT[BIN_DIR]`, adjust the `cd` path accordingly.
