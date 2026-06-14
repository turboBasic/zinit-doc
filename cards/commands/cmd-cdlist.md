---
id: cmd-cdlist
title: "zi cdlist"
category: commands
tags: [command, completion, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-cdreplay, cmd-cdclear]
---

## Summary

Show the list of `compdef` calls that have been intercepted and are waiting to be replayed. Use this to inspect what completions have been captured before `compinit` ran.

## Syntax / Usage

```zsh
zi cdlist
```

No arguments.

## Details

Displays the contents of the array where Zinit stores intercepted `compdef` calls. Each entry is a `compdef` invocation recorded before `compinit` was available. This is a read-only inspection command — it does not execute or clear the list. Useful for debugging missing completions or verifying that specific plugins' `compdef` calls were captured correctly.

## Examples

```zsh
# Inspect captured compdefs after loading plugins
zi snippet OMZP::git
zi cdlist  # see what git plugin registered
```

## See Also

- cmd-cdreplay
- cmd-cdclear
