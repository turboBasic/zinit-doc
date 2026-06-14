---
id: ts-homebrew-completions-fpath
title: Adding Homebrew completion paths to fpath on macOS
category: troubleshooting
tags: [completion, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/109
related: [ts-compinit-turbo-mode, ts-blockf-zsh-completions]
---

## Summary

On macOS with Homebrew, completions for brew-installed tools live outside the default fpath. Adding those directories to `$fpath` before compinit is the correct approach alongside zinit.

## Question / Problem

A user on an M1 Mac asked whether manually extending `$fpath` with Homebrew completion directories is the recommended way to handle completions for Homebrew-installed tools when using zinit.

## Answer / Solution

Yes — extending `$fpath` directly is appropriate for system-level completions that are not managed by zinit plugins. Add the Homebrew completion paths before calling `compinit` (or before the `atinit"zicompinit"` hook fires):

```zsh
fpath+=( /usr/local/share/zsh/site-functions /opt/homebrew/share/zsh/site-functions )
```

On Apple Silicon the relevant path is `/opt/homebrew/share/zsh/site-functions`; on Intel Macs it is `/usr/local/share/zsh/site-functions`. Including both covers both architectures.

For completions that come from GitHub-hosted plugins, use zinit's own completion management (`blockf`, `creinstall`, `as"completion"`) instead of fpath manipulation.

## Examples

```zsh
# At the top of .zshrc, before sourcing zinit or calling compinit
fpath+=( /usr/local/share/zsh/site-functions /opt/homebrew/share/zsh/site-functions )

# Then load zinit and plugins normally
source "${ZINIT_HOME}/zinit.zsh"

zinit wait lucid for \
    atinit"zicompinit; zicdreplay" \
    zdharma-continuum/fast-syntax-highlighting \
    blockf atpull'zinit creinstall -q .' \
    zsh-users/zsh-completions
```

## Caveats

`zinit blockf` prevents plugins from adding their own fpath entries. Use it with `zsh-completions` so zinit manages those completions. Do not use `blockf` if the plugin's completions should come from its own fpath entry.
