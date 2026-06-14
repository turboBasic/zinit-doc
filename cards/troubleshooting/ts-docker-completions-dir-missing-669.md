---
id: ts-docker-completions-dir-missing-669
title: "tee: no such file or directory: zinit/completions/_docker"
category: troubleshooting
tags: [completion, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/669
related: []
---

## Summary
The `tee: no such file or directory` error for zinit completions means the zinit completions cache directory does not exist yet. This is usually a fresh install where zinit has not yet created its directory structure.

## Question / Problem
After a fresh Ubuntu install, loading a zinit docker completion snippet produced:

```
tee: /home/user/.cache/zinit/completions/_docker: No such file or directory
```

## Answer / Solution
The `~/.cache/zinit/completions` (or `~/.local/share/zinit/completions`) directory is created by zinit on first load, but the error suggests zinit was not sourced before the completion installation was attempted.

Ensure the zinit init block runs before any plugin/snippet loads:

```zsh
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
[ ! -d $ZINIT_HOME ] && mkdir -p "$(dirname $ZINIT_HOME)"
[ ! -d $ZINIT_HOME/.git ] && git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
source "${ZINIT_HOME}/zinit.zsh"  # ← this creates directory structure
```

If the directory still does not exist after sourcing, create it manually:

```zsh
mkdir -p "${ZINIT[COMPLETIONS_DIR]:-$HOME/.local/share/zinit/completions}"
```

Then re-run `exec zsh`.

## Caveats
On some systems the `ZINIT_HOME` and `ZINIT[COMPLETIONS_DIR]` may differ. Check `echo $ZINIT[COMPLETIONS_DIR]` to find where zinit expects the completions directory.
