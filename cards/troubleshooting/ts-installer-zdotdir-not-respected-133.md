---
id: ts-installer-zdotdir-not-respected-133
title: Installer appends to $HOME/.zshrc instead of $ZDOTDIR/.zshrc
category: troubleshooting
tags: [installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/133
related: [ts-installer-zdotdir-not-respected-119]
---

## Summary

When `$ZDOTDIR` is set to a custom location (e.g. `~/.config/zsh`), the zinit installer script writes the bootstrap lines to `$HOME/.zshrc` instead of `$ZDOTDIR/.zshrc`, leaving the actual config file untouched.

## Symptom

After running the installer with `$ZDOTDIR` set, zinit initialisation code appears in `~/.zshrc` rather than in `$ZDOTDIR/.zshrc`. Zinit is not loaded on shell startup.

On some versions, the installer fails with:

```
sh: 214: cannot create /home/username/.zsh: Is a directory
```

## Cause

The install script computed the zshrc path as `${ZDOTDIR:-$HOME}` without appending `/.zshrc`, resulting in the directory path being used as the target file.

## Fix / Workaround

This was fixed in PR #120 (for the path computation bug) and PR #218 (for the `sh` vs `bash` issue).

After updating, run the installer with `bash`:

```bash
bash -c "$(curl --fail --show-error --silent --location https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)"
```

If already installed but with wrong placement, manually add the bootstrap lines to `$ZDOTDIR/.zshrc`:

```zsh
# Add to $ZDOTDIR/.zshrc
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
[ ! -d "$ZINIT_HOME" ] && mkdir -p "$(dirname "$ZINIT_HOME")"
[ ! -d "$ZINIT_HOME/.git" ] && git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
source "${ZINIT_HOME}/zinit.zsh"
```

## See Also

- ts-installer-zdotdir-not-respected-119
