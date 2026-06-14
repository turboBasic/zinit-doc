---
id: ts-reinstall-uninstall-zinit-446
title: How to fully uninstall or reinstall zinit
category: troubleshooting
tags: [troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/446
related: []
---

## Summary

There is no built-in `zinit uninstall` command. Removing zinit requires deleting its directories manually and reverting `.zshrc` changes. This covers the full cleanup procedure.

## Symptom

User wants to remove zinit entirely (e.g. to switch to another plugin manager, or to do a clean reinstall to fix persistent errors like stale completion symlinks).

## Fix / Workaround

**Uninstall zinit completely:**

```zsh
# 1. Remove zinit's working directories
rm -rf "${ZINIT[HOME_DIR]:-$HOME/.local/share/zinit}"

# 2. Remove the zinit source from .zshrc
#    Delete the lines that source zinit.zsh and set up ZINIT_HOME
```

**Reinstall zinit (after uninstalling):**

```zsh
# Automatic reinstall
bash -c "$(curl --fail --show-error --silent --location \
  https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)"
```

Or manually:

```zsh
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
mkdir -p "$(dirname $ZINIT_HOME)"
git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
```

Then re-source `.zshrc` or start a new shell:

```zsh
exec zsh
```

**Fix specific errors without full reinstall:**

For stale completion errors:

```zsh
zinit cclear
find "${ZINIT[COMPLETIONS_DIR]:-$HOME/.local/share/zinit/completions}" -xtype l -delete
exec zsh
```

## Caveats

`rm -rf` is irreversible. Ensure `$ZINIT[HOME_DIR]` points to the correct directory before deleting. The default is `~/.local/share/zinit`.
