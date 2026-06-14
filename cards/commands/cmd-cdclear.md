---
id: cmd-cdclear
title: "zi cdclear"
category: commands
tags: [command, completion, migration]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-cdreplay, cmd-cdlist]
---

## Summary

Clear the list of intercepted `compdef` calls, discarding any completions captured so far. Use this to ignore completions registered by plugins loaded before this point.

## Syntax / Usage

```zsh
zi cdclear [-q]
```

- `-q` — quiet, suppress output.

## Details

Empties the array that holds intercepted `compdef` calls. Any completions captured up to this point will not be replayed by `zi cdreplay`. This is the recommended approach when migrating from Oh My Zsh and you want to ignore the completions provided by OMZ plugins (e.g., the `git` plugin) while keeping completions from plugins loaded afterward. The `zicdclear` function is the hook-safe equivalent for use inside `atload` or `atinit` ices.

## Examples

```zsh
# Load OMZ git plugin but discard its completions
zi snippet OMZL::git.zsh
zi snippet OMZP::git
zi cdclear -q  # forget completions from above

# Continue loading other plugins whose completions you DO want
zi load some/other-plugin
autoload -Uz compinit
compinit
zi cdreplay -q
```

## See Also

- cmd-cdreplay
- cmd-cdlist
