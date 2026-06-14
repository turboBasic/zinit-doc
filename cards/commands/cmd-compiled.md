---
id: cmd-compiled
title: "Command: zi compiled"
category: commands
tags: [command, plugin, performance]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-compile, cmd-uncompile]
---

## Summary

List all plugins that currently have compiled `.zwc` bytecode files. Use this to audit which plugins benefit from compilation.

## Syntax / Usage

```zsh
zi compiled
```

No arguments.

## Details

Scans the plugins directory and reports which plugin directories contain `.zwc` compiled files. This is a read-only inspection command. It does not compile or modify anything.

## Examples

```zsh
zi compiled
```

## See Also

- cmd-compile
- cmd-uncompile
