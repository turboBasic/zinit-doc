---
id: ts-git-extras-zpfx-make
title: tj/git-extras ZPFX bin directory is empty after install
category: troubleshooting
tags: [binary, ice, installation, git]
source: https://github.com/zdharma-continuum/zinit/discussions/141
related: [ts-zpfx-prefix-install, ts-make-ice-order]
---

## Summary

When installing `tj/git-extras` with `make"PREFIX=$ZPFX"`, the `$ZPFX/bin` directory stays empty if the `make` ice alone is used without the correct target. The `make` ice must run the `install` target.

## Question / Problem

A user followed the recommended snippet:

```zsh
zinit ice as"program" pick"$ZPFX/bin/git-*" src"etc/git-extras-completion.zsh" make"PREFIX=$ZPFX"
zinit light tj/git-extras
```

but found `$ZPFX/bin` empty after loading.

## Answer / Solution

The `make` ice by default runs `make` with no target. For `git-extras`, the install target must be specified explicitly:

```zsh
zinit ice as"program" pick"$ZPFX/bin/git-*" src"etc/git-extras-completion.zsh" make"install PREFIX=$ZPFX"
zinit light tj/git-extras
```

Note `make"install PREFIX=$ZPFX"` — the word `install` comes first, then the variable assignment.

## Examples

Full working recipe from the README:

```zsh
# Scripts built at install (there's single default make target, "install",
# and it constructs scripts by `cat'ing a few files).
zinit ice as"program" pick"$ZPFX/bin/git-*" make"PREFIX=$ZPFX"
zinit light tj/git-extras
```

With completion sourcing:

```zsh
zinit ice as"program" pick"$ZPFX/bin/git-*" \
    src"etc/git-extras-completion.zsh" \
    make"install PREFIX=$ZPFX"
zinit light tj/git-extras
```

## Caveats

- `pick"$ZPFX/bin/git-*"` selects files from the install prefix, not the plugin clone directory. The file will not exist until `make install` has run at least once. On first load zinit runs `make` then sources the `pick` target, so the sequence is correct as long as the `install` target is named.
- `$ZPFX` defaults to `~/.local/share/zinit/polaris`. Zinit creates `$ZPFX` but may not pre-create subdirectories. If `$ZPFX/bin` remains empty after install, force a clean reinstall: `zinit delete tj/git-extras`, then re-source `.zshrc`.
- `$ZPFX/bin` is automatically prepended to `$PATH` by zinit. If the directory does not exist yet when `$PATH` is set, commands installed there later in the session will be found on the next shell start.
