---
id: ts-migration-zdharma-to-zdharma-continuum-28
title: Migrating from zdharma/zinit to zdharma-continuum/zinit
category: troubleshooting
tags: [installation, migration, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/28
related: []
---

## Summary

After the original `zdharma/zinit` repository was deleted, users with existing installations need to update their git remote and optionally their `.zshrc` to point to the new `zdharma-continuum/zinit` repository.

## Symptom

`zinit self-update` fails, hangs, or reports that the remote repository does not exist. The local clone still references the deleted `zdharma/zinit` remote.

## Cause

The original `zdharma` GitHub account was deleted. The project moved to the `zdharma-continuum` organization. Existing clones have a stale remote URL.

## Fix / Workaround

Update the git remote inside the zinit installation directory (typically `~/.local/share/zinit/zinit.git`):

```zsh
git -C "${ZINIT[BIN_DIR]:-${HOME}/.local/share/zinit/zinit.git}" \
  remote set-url origin https://github.com/zdharma-continuum/zinit.git
```

Then run a self-update to confirm:

```zsh
zinit self-update
```

Also update any plugin specs in `.zshrc` that reference the old `zdharma/` namespace to use `zdharma-continuum/` instead.

## Caveats

GitHub does not redirect the deleted `zdharma` account's repositories, so there is no automatic fallback. The remote URL must be corrected manually.
