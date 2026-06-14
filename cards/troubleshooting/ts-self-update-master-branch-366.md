---
id: ts-self-update-master-branch-366
title: "zinit self-update fails: fatal: couldn't find remote ref master"
category: troubleshooting
tags: [troubleshooting, installation, git, migration]
source: https://github.com/zdharma-continuum/zinit/discussions/366
related: []
---

## Summary
`zinit self-update` fails with `couldn't find remote ref master` when the local zinit clone is still on the `master` branch after migrating to the zdharma-continuum fork, which uses `main` as its default branch.

## Question / Problem
After migrating a 2+ year old zinit installation, `zinit self-update` and `zinit status` returned:

```
fatal: couldn't find remote ref master
```

`git branch` inside `~/.zinit/bin` showed both `main` and `master` branches, with `master` checked out.

## Answer / Solution
Switch the local zinit clone to the `main` branch:

```zsh
cd ~/.local/share/zinit/zinit.git   # or your ZINIT[BIN_DIR]
git checkout main
git branch -D master                 # optional: remove the stale local branch
```

Then run:
```zsh
zinit self-update
```

## Caveats
`zinit update` (for plugins) may still work even with this issue because it operates on plugin repos, not the zinit source repo itself. Only `self-update` and `status --self` are affected.
