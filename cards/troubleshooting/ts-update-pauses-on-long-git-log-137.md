---
id: ts-update-pauses-on-long-git-log-137
title: zinit update pauses on long git log — pager blocks update progress
category: troubleshooting
tags: [troubleshooting, command, git]
source: https://github.com/zdharma-continuum/zinit/issues/137
related: [ts-self-update-pager-blocks-632]
---

## Summary

When updating a plugin that has a long commit history, `zinit update` pauses the entire update process because git invokes a pager for the log output. The user must press `q` to continue.

## Symptom

`zinit update` freezes mid-update waiting for pager input. Only one plugin triggers the pause; all other plugin updates are blocked until the pager is dismissed.

## Cause

The plugin-update code runs `git log` to show new commits without disabling the pager. On a fast terminal or when many commits are pulled, the output exceeds the terminal height and git's pager activates.

## Fix / Workaround

Set `GIT_PAGER=cat` to disable paging for zinit's git operations:

```zsh
export GIT_PAGER=cat
```

Or configure git to not page log output:

```zsh
git config --global pager.log false
```

Note: this affects all git operations in the shell, not only zinit.

## See Also

- ts-self-update-pager-blocks-632
