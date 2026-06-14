---
id: cmd-self-update
title: "Command: zi self-update"
category: commands
tags: [command, installation, performance]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-update, cmd-zstatus]
---

## Summary

Update and recompile Zinit itself. Run this after installing Zinit or whenever you want to pull the latest Zinit source.

## Syntax / Usage

```zsh
zi self-update
```

No arguments or flags.

## Details

Zinit pulls the latest commits from its own git repository (cloned at `$ZINIT[BIN_DIR]`, default: `~/.local/share/zinit/zinit.git`), then recompiles its Zsh source files to `.zwc` bytecode for faster loading. This is also the recommended first command to run immediately after a fresh installation to ensure the compiled form is up to date.

## Examples

```zsh
# After initial install, compile Zinit
zi self-update

# Routine update of Zinit itself
zi self-update
```

## See Also

- cmd-update
- cmd-zstatus
