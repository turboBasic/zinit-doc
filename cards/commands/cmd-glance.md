---
id: cmd-glance
title: "Command: zi glance"
category: commands
tags: [command, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-edit, cmd-cd, cmd-changes]
---

## Summary

Display a syntax-highlighted view of a plugin's source file in the terminal, using `pygmentize`, `source-highlight`, or `highlight` if available.

## Syntax / Usage

```zsh
zi glance {plg-spec}
```

## Details

Locates the plugin's main file (using the same `pick` logic as load time) and pipes it through a syntax highlighter to render it in the terminal. Falls back gracefully if no highlighter is installed, in which case the raw source is displayed. Useful for quickly reviewing a plugin's code without opening an editor.

## Examples

```zsh
zi glance zsh-users/zsh-autosuggestions
```

## See Also

- cmd-edit
- cmd-cd
- cmd-changes
