---
id: ts-plugins-dir-already-exists-clone-error
title: "Clone failed: destination path already exists and is not an empty directory"
category: troubleshooting
tags: [troubleshooting, installation, annex]
source: https://github.com/zdharma-continuum/zinit/discussions/169
related: [ts-migration-zdharma-continuum]
---

## Summary

A clone failure with "destination path already exists and is not an empty directory" when loading annexes usually means the plugins directory itself is being targeted instead of a plugin subdirectory — typically caused by a corrupted or partial zinit install.

## Question / Problem

After following the migration guide, a user got:

```
fatal: destination path '/root/.local/share/zinit/plugins' already exists and is not an empty directory.
Clone failed (code: 128).
/root/.zshrc:78: no such file or directory: zdharma-continuum/zinit-annex-readurl
```

for every annex in:

```zsh
zinit light-mode for \
    zdharma-continuum/zinit-annex-readurl \
    zdharma-continuum/zinit-annex-bin-gem-node \
    zdharma-continuum/zinit-annex-patch-dl \
    zdharma-continuum/zinit-annex-rust
```

## Answer / Solution

Zinit clones each plugin into `$ZINIT[PLUGINS_DIR]/<user>---<repo>`. If it instead tries to clone into the plugins directory root, it means zinit's internal path resolution is broken — usually because `$ZINIT[HOME_DIR]` or `$ZINIT[PLUGINS_DIR]` is not set correctly.

Steps to fix:

1. Confirm the plugins directory exists and is a directory (not a file):
   ```zsh
   ls -la ~/.local/share/zinit/
   ```

2. If the `plugins` entry is a file rather than a directory, remove it:
   ```zsh
   rm ~/.local/share/zinit/plugins
   ```

3. Make sure zinit is sourced before any `zinit` calls and that `$ZINIT_HOME` points to the `.git` clone:
   ```zsh
   ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
   source "${ZINIT_HOME}/zinit.zsh"
   ```

4. Reload the shell: `exec zsh`

## Caveats

- Old installations used `~/.zinit/bin/` as the path. If migrating from the old zdharma org, the paths changed. Do not mix old and new path conventions in the same `.zshrc`.
- Running zinit as root changes `$HOME` to `/root`, so plugin directories land under `/root/.local/share/zinit`. Permissions on `/root` may prevent git from creating subdirectories; ensure the zinit home directory is writable.
- If partial clone directories remain from a previous failed attempt, remove them before retrying: `rm -rf ~/.local/share/zinit/plugins/zdharma-continuum*`
