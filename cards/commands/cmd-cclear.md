---
id: cmd-cclear
title: "Command: zi cclear"
category: commands
tags: [command, completion, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-completions, cmd-creinstall, cmd-csearch]
---

## Summary

Clear stray and improper completions from Zinit's completions directory. Use this to fix broken or dangling completion symlinks.

## Syntax / Usage

```zsh
zi cclear
```

No arguments.

## Details

Removes completion symlinks in `$ZINIT[COMPLETIONS_DIR]` that point to files which no longer exist (dangling symlinks) or that are otherwise invalid. This is a maintenance command that keeps the completions directory tidy. After running it, use `zi creinstall` on affected plugins to restore their completions.

## Examples

```zsh
# Clean up stray completions
zi cclear
```

## See Also

- cmd-completions
- cmd-creinstall
- cmd-csearch
