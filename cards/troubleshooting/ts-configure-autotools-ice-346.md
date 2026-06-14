---
id: ts-configure-autotools-ice-346
title: configure ice simplifies Autotools build workflows
category: troubleshooting
tags: [ice, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/346
related: [ts-configure-ice-prefix-zpfx-334, ts-configure-ice-build-systems-351]
---

## Summary
Before the `configure''` ice existed, compiling Autotools projects required a verbose `atclone'./configure --prefix=$ZPFX' atpull'%atclone'` pattern. The `configure''` ice replaces this pattern with a single ice modifier.

## Symptom
Users copying Autotools build recipes from documentation may encounter the verbose pattern:

```zsh
zi ice atclone"./configure --prefix=$ZPFX" atpull"%atclone" make
zi light user/project
```

This is equivalent to but more verbose than the `configure''` ice.

## Fix / Workaround
Replace the verbose pattern with the `configure''` ice (available in recent zinit versions):

```zsh
# Equivalent but cleaner
zi configure make for user/project

# With autogen.sh first (# flag)
zi configure"#" make for user/project

# With custom configure arguments
zi configure"--without-gtk" make for user/project

# configure before make! (! flag)
zi configure"!" make for user/project
```

The `configure''` ice automatically passes `--prefix=$ZPFX` when using Autotools.

## Examples

```zsh
# Build and install universal-ctags
zi id-as configure make"install" for universal-ctags/ctags

# Build PCRE2 with autogen
zi configure"#" make"install" for PCRE2Project/pcre2
```
