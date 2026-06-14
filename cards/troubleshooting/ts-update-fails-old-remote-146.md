---
id: ts-update-fails-old-remote-146
title: zinit update fails because remote still points to old zdharma repo
category: troubleshooting
tags: [installation, troubleshooting, git, migration]
source: https://github.com/zdharma-continuum/zinit/issues/146
related: []
---

## Summary

`zinit update` or `zinit self-update` fails with a git authentication error or "repository not found" because the zinit git remote still points to the deleted `zdharma/zinit` repository rather than `zdharma-continuum/zinit`.

## Symptom

```
remote: Support for password authentication was removed on August 13, 2021.
fatal: 'https://github.com/zdharma/zinit.git/' ...
```

Or a plain `fatal: repository 'https://github.com/zdharma/zinit.git/' not found`.

## Cause

After the original `zdharma/zinit` repository was deleted and the project moved to `zdharma-continuum/zinit`, any installation that cloned from the old URL retains the stale remote. Git cannot reach the repo.

## Fix / Workaround

Update the remote in the zinit installation directory:

```zsh
# Default install path; adjust if ZINIT[BIN_DIR] is customised
cd "${ZINIT[BIN_DIR]:-${HOME}/.local/share/zinit/zinit.git}"
git remote set-url origin https://github.com/zdharma-continuum/zinit.git
cd -
zinit self-update
```

Do the same for any plugin that still points at old `zdharma/*` repos:

```zsh
zinit status --all  # shows plugins with stale remotes
```

## Caveats

Plugin configs in `.zshrc` that reference `zdharma/` prefixes should also be updated to `zdharma-continuum/` to avoid re-cloning from dead URLs on fresh installs.
