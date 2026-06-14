---
id: ts-gh-r-update-not-fetching-new-release-606
title: "zinit update does not download new gh-r release — reports 'already up to date'"
category: troubleshooting
tags: [troubleshooting, binary, git, command]
source: https://github.com/zdharma-continuum/zinit/issues/606
related: [ts-ver-file-blocks-update-441]
---

## Summary

When a new GitHub release is published for a plugin installed with `from"gh-r"` and `ver"stable"`, `zinit update` reports the binary is already up to date even though a newer version exists.

## Symptom

```
Binary release already up to date (version: 0.9.1)
```

The installed version remains outdated despite a newer release being available.

## Cause

Zinit caches the installed version in `._zinit/ver`. If the version tag in the cache matches the resolved tag from GitHub, zinit skips re-downloading. For `ver"stable"` this means it compares the stored tag against the latest stable tag — when the comparison logic fails or the cache is stale, the update is skipped. Related to issue #441 where the `._zinit/ver` file blocks updates.

## Fix / Workaround

Force a re-download by resetting the plugin:

```zsh
zinit delete --yes neovim/neovim
zinit load neovim/neovim  # re-installs from scratch
```

Or use the `--reset` flag to wipe local state before updating:

```zsh
zinit update --reset neovim/neovim
```

## See Also

- ts-ver-file-blocks-update-441
