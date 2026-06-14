---
id: ts-zplugin-compat-removed-52
title: zplugin compatibility shims removed — update config to use zinit
category: troubleshooting
tags: [migration, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/52
related: []
---

## Summary

The zplugin compatibility files (`zplugin.zsh`, `zplugin-install.zsh`, `zplugin-side.zsh`, `zplugin-autoload.zsh`) were removed in zinit 4.0. Configurations that source these files or call `zplugin` directly will break after updating.

## Symptom

After updating zinit, the shell fails to start with errors like:

```
/path/to/zinit/zplugin.zsh: no such file or directory
```

Or `zplugin` commands are not found.

## Cause

Backward compatibility with the original `zplugin` name was removed as part of the 4.0 major release. All users are expected to have migrated to the `zinit` command.

## Fix / Workaround

Replace all `zplugin` references in `.zshrc` with `zinit` (or the `zi` alias):

```zsh
# Old
zplugin ice wait lucid
zplugin light zsh-users/zsh-autosuggestions

# New
zinit ice wait lucid
zinit light zsh-users/zsh-autosuggestions
```

Also remove any direct `source` calls to `zplugin.zsh` and update to source `zinit.zsh` instead.

## Caveats

The `zi` short alias is available by default. Set `ZINIT[NO_ALIASES]=1` before sourcing zinit if you do not want aliases created.
