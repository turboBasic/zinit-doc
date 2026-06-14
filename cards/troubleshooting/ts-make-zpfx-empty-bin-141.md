---
id: ts-make-zpfx-empty-bin-141
title: "tj/git-extras: $ZPFX/bin is empty after install"
category: troubleshooting
tags: [ice, binary, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/141
related: []
---

## Summary
When installing build-from-source tools with `make"PREFIX=$ZPFX"`, the `$ZPFX/bin` directory is empty if zinit has not yet created it or if the ice syntax is malformed.

## Question / Problem
The user followed the recommended pattern for `tj/git-extras` but found `$ZPFX/bin` empty after installation:

```zsh
zinit ice as"program" pick"$ZPFX/bin/git-*" src"etc/git-extras-completion.zsh" make"PREFIX=$ZPFX"
zinit light tj/git-extras
```

## Answer / Solution
Ensure `$ZPFX` is set (it defaults to `~/.local/share/zinit/polaris`) and that `$ZPFX/bin` exists before install. Zinit creates `$ZPFX` but may not pre-create subdirectories. The canonical working configuration is:

```zsh
zinit ice as"program" pick"$ZPFX/bin/git-*" src"etc/git-extras-completion.zsh" make"PREFIX=$ZPFX"
zinit light tj/git-extras
```

If `$ZPFX/bin` remains empty:
1. Delete the plugin directory to force a clean reinstall: `zinit delete tj/git-extras`
2. Re-source `.zshrc` or restart the shell.
3. Check that `make` is available and that the Makefile's `install` target honors `PREFIX`.

## Caveats
`$ZPFX/bin` is automatically prepended to `$PATH` by zinit. If the directory does not exist yet when `$PATH` is set, commands installed there later in the session will still be found on the next shell start.
