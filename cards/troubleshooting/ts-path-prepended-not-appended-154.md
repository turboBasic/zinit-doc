---
id: ts-path-prepended-not-appended-154
title: Zinit prepends directories to PATH — user's custom PATH prefix gets overridden
category: troubleshooting
tags: [troubleshooting, installation, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/154
related: []
---

## Summary

Zinit adds plugin bin directories (e.g. `$ZPFX/bin`) to the beginning of `$PATH`. Users who rely on having a custom directory at the front of `$PATH` (for wrapper binaries) find their wrappers shadowed by zinit-managed binaries.

## Symptom

A custom directory at the start of `$PATH` is no longer first after sourcing zinit. Wrapper scripts in that directory are shadowed by plugin-installed binaries.

## Cause

Zinit prepends `$ZPFX/bin` and other managed directories to `$PATH` unconditionally. There is no option to append instead of prepend.

## Fix / Workaround

No fix available as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/154

Workaround: re-prepend your custom directory after sourcing zinit:

```zsh
source "${ZINIT_HOME}/zinit.zsh"
path=("/path/to/my/wrappers" $path)
```

Or use the `ZINIT[NO_ALIASES]` and avoid `$ZPFX/bin` by setting a custom `$ZPFX`:

```zsh
export ZPFX="$HOME/.local"  # use a path where /bin is already in your PATH order
```
