---
id: ts-snippet-install-script-avoid
title: Why you should not use zinit snippet for install scripts
category: troubleshooting
tags: [snippet, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/341
related: [ts-eval-hook-external-tool]
---

## Summary

`zinit snippet` sources remote files as zsh scripts. Using it to run an installer script (like NordVPN's `install.sh`) will hang or break the shell because installer scripts are designed for interactive execution, not for being sourced.

## Question / Problem

A user tried to manage a NordVPN installation via zinit:

```zsh
zinit snippet https://downloads.nordcdn.com/apps/linux/install.sh
```

The terminal hung and would not exit.

## Answer / Solution

`zinit snippet` downloads and **sources** the URL as a zsh file. Installer scripts typically:
- Use `sudo` and prompt for a password
- Fork child processes that do not inherit the zsh session cleanly
- Exit with `exit 0`, which terminates the parent shell when sourced

**Do not use `zinit snippet` for installer scripts.**

For tools that have a zinit-compatible install pattern, use `as"program"` with `atclone` instead:

```zsh
# Install a tool that needs a custom install script at clone time
zinit ice as"program" \
    atclone"./install.sh --prefix=$ZPFX" \
    atpull"%atclone" \
    pick"$ZPFX/bin/tool-binary"
zinit light user/repo
```

For tools distributed only as installer scripts with no GitHub repo, install them manually outside zinit and use zinit only for the post-install shell integration (completions, env init).

## Caveats

`zinit snippet` with `as"null"` (to avoid sourcing) still downloads and stores the file but does not source it — this is not useful for installer scripts since the download itself is not the install action.
