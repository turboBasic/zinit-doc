---
id: cmd-bindkeys
title: "Command: zi bindkeys"
category: commands
tags: [command, plugin, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-report, cmd-list-plugins]
---

## Summary

List all bindkeys set up by each loaded plugin. Use this to audit key bindings and identify conflicts between plugins.

## Syntax / Usage

```zsh
zi bindkeys
```

No arguments.

## Details

Iterates over all plugins loaded with `zi load` and prints the bindkey registrations each one made, as recorded during investigation. Output is grouped per plugin. This is a subset of the information shown by `zi report` but focused exclusively on key bindings, making it easier to spot conflicts or unexpected overwrites when multiple plugins bind the same keys.

## Examples

```zsh
zi bindkeys
```

## Caveats / Common Mistakes

Only plugins loaded with `zi load` (investigation enabled) have binding data. Plugins loaded with `zi light` (without `-b`) do not appear in the output.

## See Also

- cmd-report
- cmd-list-plugins
