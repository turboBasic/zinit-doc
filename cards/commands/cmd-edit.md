---
id: cmd-edit
title: "Command: zi edit"
category: commands
tags: [command, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-cd, cmd-glance, cmd-create]
---

## Summary

Open a plugin's main file in `$EDITOR`. A quick way to inspect or patch a plugin's source without navigating to its directory manually.

## Syntax / Usage

```zsh
zi edit {plg-spec}
```

## Details

Resolves the plugin's directory, finds its main sourced file (following the same `pick` logic Zinit uses at load time), and opens it with the editor defined in the `$EDITOR` environment variable. If `$EDITOR` is unset, the behavior is system-dependent.

## Examples

```zsh
# Edit zsh-autosuggestions main file
zi edit zsh-users/zsh-autosuggestions
```

## See Also

- cmd-cd
- cmd-glance
- cmd-create
