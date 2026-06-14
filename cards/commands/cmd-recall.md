---
id: cmd-recall
title: "zi recall"
category: commands
tags: [command, ice, plugin, snippet, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-ice, cmd-load, cmd-status]
---

## Summary

Fetch the saved ice modifiers for a plugin or snippet and reconstruct the `zi ice ...` command that would reproduce the current configuration. Useful for inspecting what ices were applied at install time.

## Syntax / Usage

```zsh
zi recall {plg-spec}|{URL}
```

## Details

Ice modifiers are persisted to the `._zinit/` subdirectory inside each plugin or snippet's directory on disk. `recall` reads that data and prints the equivalent `zi ice ...` command. This lets you verify exactly which ices Zinit will use when updating or reinstalling the resource, without having to inspect the raw files manually.

## Examples

```zsh
# See what ices were saved for a plugin
zi recall zsh-users/zsh-autosuggestions

# See ices for a snippet
zi recall OMZP::git
```

## See Also

- cmd-ice
- cmd-load
- cmd-status
