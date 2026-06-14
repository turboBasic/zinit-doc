---
id: ts-self-update-non-origin-remote-472
title: zinit self-update fails when git default remote is not named "origin"
category: troubleshooting
tags: [troubleshooting, command, git, installation]
source: https://github.com/zdharma-continuum/zinit/issues/472
related: []
---

## Summary

`zinit self-update` hardcodes `origin` as the remote name. If `clone.defaultRemoteName` is set to anything other than `origin` in `.gitconfig`, zinit's update logic fails with an "ambiguous argument" git error.

## Symptom

```
[self-update] fetching latest changes from main branch
fatal: ambiguous argument '..origin/HEAD': unknown revision or path not in the working tree.
```

## Cause

The `self-update` code uses `origin` as the hardcoded remote name (e.g. in `git log ..origin/HEAD`). When the remote is named differently (e.g. `root`, `upstream`), the ref does not exist.

## Fix / Workaround

No fix available as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/472

Workaround: either override the default remote name back to `origin` just for the zinit repo:

```zsh
cd ~/.local/share/zinit/zinit.git
git remote rename root origin
```

Or unset your global `clone.defaultRemoteName` for the zinit directory:

```zsh
cd ~/.local/share/zinit/zinit.git
git config remote.defaultRemoteName origin
```
