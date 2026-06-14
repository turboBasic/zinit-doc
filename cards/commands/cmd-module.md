---
id: cmd-module
title: "zi module"
category: commands
tags: [command, installation, performance]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-self-update, cmd-zstatus]
---

## Summary

Manage the binary Zsh module shipped with Zinit. Use `zi module help` to see available subcommands for building, installing, and testing the module.

## Syntax / Usage

```zsh
zi module {subcommand}
zi module help
```

## Details

The Zinit Zsh module is a compiled C extension (hosted separately at `https://github.com/zdharma-continuum/zinit-module`) that provides additional performance features. The `module` command handles build and install operations for this binary module. Run `zi module help` to see the full list of subcommands available for the installed version.

## Examples

```zsh
# See available module subcommands
zi module help
```

## See Also

- cmd-self-update
- cmd-zstatus
