---
id: ts-update-pager-blocking-753
title: "zinit update blocks at interactive pager for every updated plugin"
category: troubleshooting
tags: [troubleshooting, performance]
source: https://github.com/zdharma-continuum/zinit/issues/753
related: []
---

## Summary

By default, `zinit update` pipes each plugin's commit log through `less`, requiring the user to press `q` after every plugin update. This makes bulk updates slow and interactive.

## Symptom

When updating many plugins, `less` opens for each one that has new commits, halting the update process and requiring manual input to continue.

## Fix / Workaround

Use the `--no-pager` flag to disable the interactive pager:

```zsh
zinit update --no-pager
zinit update --all --no-pager
```

Or set `GIT_PAGER` / `PAGER` to a non-interactive command for the duration:

```zsh
GIT_PAGER=cat zinit update --all
```

A configurable non-interactive pager mode was added to zinit in PR #753. After updating zinit, the `--no-pager` flag is available for `self-update` as well:

```zsh
zinit self-update --no-pager
```

## Examples

```zsh
# Parallel update without pager interrupts
zinit update --all --parallel --no-pager
```
