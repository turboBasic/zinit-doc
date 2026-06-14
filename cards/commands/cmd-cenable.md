---
id: cmd-cenable
title: "Command: zi cenable"
category: commands
tags: [command, completion]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-cdisable, cmd-completions, cmd-creinstall]
---

## Summary

Re-enable a completion that was previously disabled with `zi cdisable`. Restores the symlink so the completion is active for `compinit`.

## Syntax / Usage

```zsh
zi cenable {cname}
```

`{cname}` is the completion name without the leading underscore (e.g., `git` for `_git`).

## Details

Re-creates the symlink in `$ZINIT[COMPLETIONS_DIR]` for the named completion. After running `cenable`, you may need to run `compinit` again (or open a new shell) for the completion to become active in the current session.

## Examples

```zsh
# Re-enable the _git completion
zi cenable git

# Re-enable docker completion
zi cenable docker
```

## See Also

- cmd-cdisable
- cmd-completions
- cmd-creinstall
