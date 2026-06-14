---
id: ts-zinit-version-command-440
title: Checking which version of zinit is installed
category: troubleshooting
tags: [troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/440
related: []
---

## Summary

As of PR #440, zinit includes a `version` subcommand. For older zinit installs, version information must be retrieved manually from the git log.

## Symptom

Users debugging issues need to know which version of zinit is running to determine if a bug fix applies to their installation.

## Fix / Workaround

With a current zinit installation:

```zsh
zinit version
# Output: zinit v3.7.0-508-g59975d70 (linux-gnu_x86_64)
```

On older versions without the `version` subcommand, check the git log:

```zsh
# Get the most recent tag and commit
git -C "${ZINIT[BIN_DIR]:-$HOME/.local/share/zinit/zinit.git}" describe --tags --long

# Or just the last commit hash and date
git -C "${ZINIT[BIN_DIR]:-$HOME/.local/share/zinit/zinit.git}" log --oneline -1
```

To update to the latest version:

```zsh
zinit self-update
zinit version
```

## Caveats

The `version` output format mimics `zsh --version` and includes the platform. When reporting bugs, always include the `zinit version` output and `zsh --version` output.
