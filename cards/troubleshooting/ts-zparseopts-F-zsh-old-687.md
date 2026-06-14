---
id: ts-zparseopts-F-zsh-old-687
title: "zparseopts: no default array defined: -F on zsh < 5.8"
category: troubleshooting
tags: [troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/687
related: []
---

## Summary

Running `zinit delete`, `zinit debug`, or several other subcommands on zsh versions older than 5.8 produces `zparseopts: no default array defined: -F` because the `-F` flag to `zparseopts` was introduced in zsh 5.8.

## Symptom

```
$ zinit delete -h
.zinit-delete:zparseopts:18: no default array defined: -F
```

Affects any zinit subcommand that calls `zparseopts -F`.

## Cause

The `-F` flag to `zparseopts` (causes the function to fail on unrecognized options) was added in zsh 5.8. Systems like RHEL 8 ship zsh 5.5.1. Zinit began using `-F` without a version guard.

## Fix / Workaround

The minimum supported zsh version was raised to 5.8 (PR #696). On systems locked to zsh < 5.8 without upgrade rights, the only option is to pin to a zinit version before the `-F` usage was introduced.

Check your zsh version:

```zsh
zsh --version
```

If you cannot upgrade zsh, pin zinit to an older commit:

```zsh
git -C "${ZINIT[BIN_DIR]}" checkout <last-working-commit>
```

## Caveats

RHEL 8 ships zsh 5.5.1 and cannot be updated without elevated privileges. This is a known incompatibility with no workaround short of a newer zsh.
