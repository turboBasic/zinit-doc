---
id: install-uninstall
title: Uninstall Zinit
category: installation
tags: [installation]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [install-curl, install-manual, zinit-home-directory]
---

## Summary

Removing Zinit requires deleting its home directory and removing the bootstrap lines from `.zshrc`; plugins and snippets cached there are also deleted in the process.

## Syntax / Usage

```zsh
# Remove all plugins and snippets managed by Zinit
zinit delete --all --yes

# Then remove Zinit's directory entirely
rm -rf "${XDG_DATA_HOME:-$HOME/.local/share}/zinit"
```

## Details

Zinit stores everything under `$ZINIT[HOME_DIR]` (default: `~/.local/share/zinit`). A clean removal involves:

1. **Optional: delete managed plugins/snippets first** — `zinit delete --all --yes` removes all plugin and snippet data from disk through Zinit's own cleanup path.
2. **Delete the directory** — `rm -rf ~/.local/share/zinit` (or `$ZINIT[HOME_DIR]` if overridden) removes Zinit itself, all plugins, snippets, completions, and the polaris prefix.
3. **Clean `.zshrc`** — remove the bootstrap lines added by the installer or manually. Typically three to four lines starting with `ZINIT_HOME=` and ending with `source "${ZINIT_HOME}/zinit.zsh"`.
4. **Reload the shell** — `exec zsh` to start a clean session.

If you installed via the curl script, the three lines appended to `.zshrc` are:

```zsh
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
[ ! -d $ZINIT_HOME ] && mkdir -p "$(dirname $ZINIT_HOME)" && git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
source "${ZINIT_HOME}/zinit.zsh"
```

Remove those lines (and any plugin declarations you added) from `.zshrc`.

## Examples

```zsh
# Step 1: delete all managed data via zinit
zinit delete --all --yes

# Step 2: remove the home directory
rm -rf "${XDG_DATA_HOME:-$HOME/.local/share}/zinit"

# Step 3: edit .zshrc to remove bootstrap lines, then reload
exec zsh
```

## Caveats / Common Mistakes

- If you set a custom `$ZINIT[HOME_DIR]`, delete that directory, not the default path.
- `zinit delete --clean` (without `--all`) only removes plugins/snippets that are not currently loaded — use `--all` for a complete purge.
