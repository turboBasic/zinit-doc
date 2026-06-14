---
id: cmd-compinit
title: "Command: zi compinit"
category: commands
tags: [command, completion]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-cdreplay, cmd-creinstall, cmd-cclear]
---

## Summary

Refresh installed completions by re-running the completion system initialization. A convenience wrapper around `autoload compinit; compinit`.

## Syntax / Usage

```zsh
zi compinit
```

No arguments.

## Details

Calls `autoload -Uz compinit; compinit` to reinitialize the Zsh completion system. This rebuilds the completion cache (`.zcompdump`) and makes any newly installed completions available without starting a new shell. Equivalent to the `zicompinit` helper function used inside ice hooks. Use this interactively after installing new completions with `zi creinstall`.

## Examples

```zsh
# After installing new completions, refresh the system
zi creinstall some-user/some-plugin
zi compinit
```

## Caveats / Common Mistakes

Running `compinit` multiple times in a session has a performance cost. For Turbo mode setups, prefer calling `zicompinit` inside an `atinit` or `atload` hook on the last completion-related plugin rather than calling this command interactively.

## See Also

- cmd-cdreplay
- cmd-creinstall
- cmd-cclear
