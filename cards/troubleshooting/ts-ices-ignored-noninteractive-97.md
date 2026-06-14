---
id: ts-ices-ignored-noninteractive-97
title: Ices (make, atclone, etc.) silently ignored when run non-interactively
category: troubleshooting
tags: [ice, installation, troubleshooting, turbo]
source: https://github.com/zdharma-continuum/zinit/issues/97
related: []
---

## Summary

When zinit is invoked in a non-interactive context (Ansible, scripts, `zsh -sli`, `@zinit-scheduler burst`), some ices — particularly `make` and hook-based ices using `!` prefixes — are silently skipped rather than executed. This makes automated provisioning unreliable.

## Symptom

Running `@zinit-scheduler burst` or `zsh -c "source ~/.zshrc && zinit ..."` in a pipeline installs plugins but does not execute the `make`, `atclone`, or `atpull` ices. No error is shown — the build step simply does not happen.

```zsh
# make does not execute when run without a TTY:
zinit light-mode as"program" make for @direnv/direnv
```

## Cause

Certain ices rely on `add-zsh-hook` callbacks that are only triggered in interactive sessions. When running non-interactively, the hook mechanism is never fired, so the ice action is dropped without error.

Additionally, exclamation-mark hook syntax (`atclone'!...'`, etc.) is subject to history expansion in interactive mode but not in non-interactive mode, so the `!` is treated differently between the two contexts.

## Fix / Workaround

This was fixed in PR #227: zinit now detects the non-interactive context and adjusts hook handling so that ices are executed regardless of interactivity.

Update zinit:

```zsh
zinit self-update
```

If pinned to an older version, work around automated provisioning by sourcing the config and forcing the scheduler explicitly, or by deleting plugin directories so zinit reinstalls them fresh on next interactive start.

## Caveats

After the fix, ices that previously silently failed in non-interactive mode will now actually run and may surface build errors that were previously hidden.
