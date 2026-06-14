---
id: ts-installer-sh-bad-substitution-217
title: Installer fails with "Bad substitution" when run with sh
category: troubleshooting
tags: [installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/217
related: []
---

## Summary

Running the zinit install command with `sh -c "$(curl ...)"` fails immediately with `Bad substitution` because the installer uses bash-specific syntax (`${VAR//foo/bar}`) that is not available in POSIX `sh`.

## Symptom

```
sh: 210: Bad substitution
```

The installation aborts with no further output.

## Cause

The installer script `scripts/install.sh` uses bash parameter expansion (`${variable//pattern/replacement}`) which is not POSIX-compatible. When the system's `/bin/sh` is `dash` (common on Ubuntu/Debian) or another strict POSIX shell, this syntax fails.

## Fix / Workaround

Use `bash` explicitly to invoke the installer:

```zsh
bash -c "$(curl --fail --show-error --silent --location https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)"
```

The documentation was updated in PR #218 to use `bash -c` rather than `sh -c`.
