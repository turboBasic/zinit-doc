---
id: cmd-zstatus
title: "Command: zi zstatus"
category: commands
tags: [command, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-status, cmd-times, cmd-self-update]
---

## Summary

Display a brief statistics summary for your Zinit installation: version, paths, number of plugins and snippets loaded, and other runtime information.

## Syntax / Usage

```zsh
zi zstatus
```

No arguments.

## Details

Prints a snapshot of the current Zinit session: the Zinit version, key directory paths (`BIN_DIR`, `HOME_DIR`, `PLUGINS_DIR`, `SNIPPETS_DIR`, `COMPLETIONS_DIR`), count of loaded plugins and snippets, and whether the module is loaded. Useful as a quick health-check and to confirm which paths Zinit is using after customizing `$ZINIT` hash entries.

## Examples

```zsh
zi zstatus
```

## See Also

- cmd-status
- cmd-times
- cmd-self-update
