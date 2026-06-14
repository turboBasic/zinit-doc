---
id: has
title: "has"
category: ices
tags: [ice, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [if, load, wait]
---

## Summary

`has''` loads a plugin or snippet only when the specified command is available in
`$PATH`. It is a convenience shorthand for a common `if''` pattern.

## Syntax / Usage

```zsh
zi ice has"git"
zi ice has"docker"
```

## Details

The value is a command name. Zinit checks `$PATH` for its existence at load time. If
the command is not found, the plugin is skipped.

`has''` is equivalent to `if'(( $+commands[<cmd>] ))'` but more readable.

Works with both plugins and snippets.

## Examples

```zsh
# Load git-related helpers only when git is installed
zi ice has"git" wait lucid
zi light user/git-helpers

# Load kubectl completion only when kubectl is available
zi ice has"kubectl" as"completion"
zi snippet https://raw.githubusercontent.com/.../kubectl_completion.zsh
```

## See Also

- if
- load
