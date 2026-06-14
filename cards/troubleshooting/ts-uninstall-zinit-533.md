---
id: ts-uninstall-zinit-533
title: How to uninstall zinit
category: troubleshooting
tags: [installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/533
related: []
---

## Summary
Zinit does not have a built-in uninstall command. Removing it requires deleting the zinit home directory and removing the sourcing block from `.zshrc`.

## Question / Problem
The documentation does not describe how to uninstall zinit, and `zinit delete --all` removes plugins but not zinit itself.

## Answer / Solution
To fully remove zinit:

1. Remove the zinit home directory (contains zinit source, plugins, snippets, and completions):
   ```zsh
   rm -rf "${ZINIT[HOME_DIR]:-$HOME/.local/share/zinit}"
   ```

2. Remove the zinit bootstrap block from `~/.zshrc`. The block looks like:
   ```zsh
   ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
   [ ! -d $ZINIT_HOME ] && mkdir -p "$(dirname $ZINIT_HOME)"
   [ ! -d $ZINIT_HOME/.git ] && git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
   source "${ZINIT_HOME}/zinit.zsh"
   autoload -Uz _zinit
   (( ${+_comps} )) && _comps[zinit]=_zinit
   ```

3. Restart the shell.

## Caveats
If zinit was installed to a custom `ZINIT[HOME_DIR]`, delete that directory instead of the default path. Binaries installed to `$ZPFX` (`~/.local/share/zinit/polaris`) will also be removed when the zinit home is deleted.
