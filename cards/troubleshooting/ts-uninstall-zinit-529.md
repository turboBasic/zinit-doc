---
id: ts-uninstall-zinit-529
title: "How to completely uninstall zinit"
category: troubleshooting
tags: [installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/529
related: []
---

## Summary

There is no built-in `zinit uninstall` command. Removing zinit requires manually deleting its files and the lines added to `.zshrc`.

## Symptom

The user cannot find uninstall instructions in the documentation.

## Fix / Workaround

1. Remove the zinit home directory (contains zinit itself, all plugins, and snippets):

```zsh
rm -rf "${ZINIT[HOME_DIR]:-${XDG_DATA_HOME:-$HOME/.local/share}/zinit}"
```

2. Remove the lines zinit added to `~/.zshrc`. They look like:

```zsh
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
[ ! -d $ZINIT_HOME ] && mkdir -p "$(dirname $ZINIT_HOME)"
[ ! -d $ZINIT_HOME/.git ] && git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
source "${ZINIT_HOME}/zinit.zsh"
autoload -Uz _zinit
(( ${+_comps} )) && _comps[zinit]=_zinit
```

3. Restart the shell:

```zsh
exec zsh
```

## Caveats

This removes all plugins and their cached data. Any tools installed via `from'gh-r'` or `make` ices to `$ZPFX` will also be deleted if `$ZPFX` is inside `ZINIT[HOME_DIR]`. Check `$ZPFX` before deleting.
