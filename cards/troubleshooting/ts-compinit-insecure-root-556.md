---
id: ts-compinit-insecure-root-556
title: "compinit insecure files warning when installing completions as root"
category: troubleshooting
tags: [completion, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/556
related: []
---

## Summary

When running zinit as root (e.g. in a container), `gh-r` installs completions owned by archive users rather than root, causing `compinit` to warn "insecure files, run compaudit for list."

## Symptom

```
zsh compinit: insecure files, run compaudit for list.
```

Appears during shell startup after installing a plugin with completions as the root user.

## Cause

By default, `tar` run as root extracts files preserving the original archive ownership (`--same-owner` is the default for superuser). The completion file ends up owned by an arbitrary UID from the archive, not root, which triggers compinit's ownership security check.

## Fix / Workaround

Update zinit to a version that passes `--no-same-owner` to `tar` during extraction as root (fixed in PR #557).

```zsh
zinit self-update
```

As a temporary workaround, run `compaudit` to identify the offending files and fix ownership:

```zsh
compaudit
chown root:root <file listed by compaudit>
chmod go-w <file listed by compaudit>
```

Or suppress the check (not recommended in production):

```zsh
compinit -u
```
