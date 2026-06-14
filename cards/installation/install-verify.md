---
id: install-verify
title: Verify Zinit Installation
category: installation
tags: [installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [install-curl, install-manual, plugin-report]
---

## Summary

After installing Zinit, verify the installation by checking that the `zinit` command is available, running `zinit zstatus`, and confirming that `zinit self-update` completes without error.

## Syntax / Usage

```zsh
zinit zstatus
zinit self-update
zinit --version   # or: zinit version
```

## Details

**Immediate verification after install:**

1. Reload the shell: `exec zsh`
2. Run `zinit zstatus` — prints a summary of the Zinit installation (version, plugin count, paths). If the command is not found, the bootstrap lines were not written to `.zshrc` or the shell was not reloaded.
3. Run `zinit self-update` — updates Zinit to the latest commit and compiles it. A successful run means git access to the Zinit repo works and the install directory is writable.

**Checking the install directory:**

```zsh
ls $ZINIT_HOME        # should contain zinit.zsh and related files
ls $ZINIT_HOME/.git   # should exist (confirms it's a git repo)
```

**Verifying completions for `zinit` itself:**

```zsh
zinit compinit        # refresh completions
zinit --<TAB>         # should show completion candidates
```

**Checking that plugins load:**

```zsh
zinit light zsh-users/zsh-autosuggestions
zinit list-plugins    # should show zsh-autosuggestions
```

## Examples

```zsh
# After first install
exec zsh
zinit zstatus
zinit self-update

# Manual directory check
ls "${XDG_DATA_HOME:-$HOME/.local/share}/zinit/zinit.git"

# Confirm a plugin loaded
zinit load zdharma-continuum/history-search-multi-word
zinit list-plugins
zinit report zdharma-continuum/history-search-multi-word
```

## Caveats / Common Mistakes

- `zinit: command not found` after install usually means `.zshrc` was not reloaded (`exec zsh`) or the bootstrap lines were not appended correctly.
- If `zinit self-update` fails with a git error, check that the remote URL points to `https://github.com/zdharma-continuum/zinit.git` — not the old `zdharma` organization. See [migrate-from-zinit-legacy](../migration/migrate-from-zinit-legacy.md).
