---
id: ts-zinit-installation-manual-451
title: zinit initialization errors on every terminal startup after manual install
category: troubleshooting
tags: [troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/451
related: [ts-reinstall-uninstall-zinit-446]
---

## Summary

When adding zinit's setup code to `.zshrc` using a naive snippet (without conditional guards), every terminal startup after the initial install shows git errors or re-runs `git clone` on an already-existing directory.

## Symptom

Each terminal start shows:

```
fatal: destination path 'zinit.git' already exists and is not an empty directory.
```

Or other errors on the `git clone` line.

## Cause

The setup snippet `git clone ... "$ZINIT_HOME"` is run unconditionally on every shell start. If the directory already exists, git clone fails.

## Fix / Workaround

Add conditional guards around the clone operation:

```zsh
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"

# Only clone if the directory doesn't exist
[ ! -d "$ZINIT_HOME" ] && mkdir -p "$(dirname $ZINIT_HOME)"
[ ! -d "$ZINIT_HOME/.git" ] && git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"

source "${ZINIT_HOME}/zinit.zsh"
```

The official README includes these guards in the manual installation snippet.

## Caveats

The automatic installer (`bash -c "$(curl ...)"`) adds the correct guarded snippet to `.zshrc`. The error only occurs when users copy the `git clone` line directly without the conditional check.
