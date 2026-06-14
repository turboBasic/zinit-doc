---
id: ts-completion-symlinks-nfs-absolute-path-677
title: Completion symlinks break on NFS/shared homes — absolute real paths used instead of relative
category: troubleshooting
tags: [troubleshooting, completion, installation]
source: https://github.com/zdharma-continuum/zinit/issues/677
related: []
---

## Summary

Zinit creates completion symlinks using the real absolute path of the plugin directory. On NFS or networked home setups where the home directory is mounted at different paths on different machines (but aliased to `/home/user`), the symlinks point to a machine-specific mount path that does not exist on other machines.

## Symptom

Completions work on one machine but not others sharing the same home directory. `ls ~/.local/share/zinit/completions/` shows symlinks pointing to `/mnt/nfs_mount/user/home/...` instead of a path relative to `$HOME`.

## Cause

Zinit resolves symlinks to real paths (`realpath`) when creating completion entries. If the home directory is itself a symlink to a machine-specific mount point, the resolved path is not portable across machines.

## Fix / Workaround

No fix available as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/677

Workaround: after a zinit install/update run, regenerate the completion symlinks by running `zinit creinstall` for each plugin, or by manually re-symlinking using relative paths. Alternatively, set `ZINIT[COMPLETIONS_DIR]` to a path inside `$HOME` (not a real-path resolution) and recreate symlinks from that location.

## Caveats

This only affects users with NFS/network-mounted homes where the mount path differs per machine.
