---
id: ts-zinit-module-separate-repo-68
title: zinit C module moved to separate repository
category: troubleshooting
tags: [installation, migration, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/68
related: []
---

## Summary

The zinit C module (`zsh/zmodules`) was moved out of the main zinit repository into its own repository at `zdharma-continuum/zinit-module`. Configurations or scripts that referenced the module at the old path will break.

## Symptom

`zinit module build` fails because the `zmodules/` directory no longer exists in the zinit source tree. Or, a manually built module binary cannot be found at the previously documented path.

## Cause

The module is an optional binary extension that does not require zinit to be installed. Hosting it in the main repo was unnecessarily complex. It now lives in `https://github.com/zdharma-continuum/zinit-module`.

## Fix / Workaround

Use `zinit module build` — it automatically clones from the new repository and builds the module:

```zsh
zinit module build
```

After a successful build, add the `zmodload` line to `.zshrc`:

```zsh
module_path+=("${ZINIT[BIN_DIR]:h}/zinit-module/Src")
zmodload zdharma_continuum/zinit
```

## Caveats

The module is optional and most users do not need it. It provides performance improvements for certain operations but is not required for normal zinit usage.
