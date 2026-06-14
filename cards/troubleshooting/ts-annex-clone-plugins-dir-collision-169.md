---
id: ts-annex-clone-plugins-dir-collision-169
title: "Clone failed: destination path already exists and is not an empty directory"
category: troubleshooting
tags: [annex, installation, troubleshooting, migration]
source: https://github.com/zdharma-continuum/zinit/discussions/169
related: []
---

## Summary
A `fatal: destination path … already exists and is not an empty directory` error during annex installation means zinit is trying to clone into a path that already holds content, usually from a previous partial install or name collision.

## Question / Problem
After following the migration guide, loading annexes from `zdharma-continuum` produced:

```
fatal: destination path '/root/.local/share/zinit/plugins' already exists and is not an empty directory.
Clone failed (code: 128).
/root/.zshrc:78: no such file or directory: zdharma-continuum/zinit-annex-readurl
```

## Answer / Solution
The plugins directory itself (`zinit/plugins`) was being used as the clone destination, indicating the `ZINIT[PLUGINS_DIR]` path or the repo spec was malformed. Steps to resolve:

1. Verify `ZINIT[HOME_DIR]` is set correctly before sourcing `zinit.zsh`.
2. Remove any leftover partial directories: `rm -rf ~/.local/share/zinit/plugins/zdharma-continuum*`
3. Ensure you are using the correct annex names with the `zinit-annex-` prefix:

```zsh
zinit light-mode for \
    zdharma-continuum/zinit-annex-readurl \
    zdharma-continuum/zinit-annex-bin-gem-node \
    zdharma-continuum/zinit-annex-patch-dl \
    zdharma-continuum/zinit-annex-rust
```

4. Reload the shell.

## Caveats
Running zinit as root changes `$HOME` to `/root`, so plugin directories land under `/root/.local/share/zinit`. Permissions on `/root` may prevent git from creating subdirectories; ensure the zinit home directory is writable.
