---
id: prezto-compatibility
title: Prezto Compatibility
category: concepts
tags: [snippet, plugin, completion]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [plugins-vs-snippets, oh-my-zsh-compatibility, ice-modifiers-overview]
---

## Summary

Zinit loads Prezto modules as snippets using `PZT::` and `PZTM::` shorthands, without requiring the full Prezto framework.

## Details

Prezto shorthands:

| Shorthand | Expands to |
|---|---|
| `PZT::` | `https://github.com/sorin-ionescu/prezto/tree/master/` |
| `PZTM::` | `…/modules/` |

Simple modules that contain an `init.zsh` entry point load directly. Modules that span multiple files require `zi ice svn` to clone the whole subdirectory.

Modules that have no standard entry file (`*.plugin.zsh`, `init.zsh`, `*.zsh-theme`) need `as"null"` ice to disable Zinit's auto-sourcing heuristic.

Modules with external Git dependencies need `atclone` to perform an additional clone, combined with `blockf` to prevent unwanted `$FPATH` pollution.

## Examples

```zsh
# Simple modules via PZTM shorthand
zi snippet PZTM::environment
zi snippet PZTM::terminal

# Multi-file modules via SVN
zi ice svn
zi snippet PZTM::docker

zi ice svn
zi snippet PZTM::git

# Module with no standard entry file
zi ice svn as"null"
zi snippet PZTM::archive

# Module with external dependency (zsh-completions)
zi ice \
  atclone"git clone --recursive https://github.com/zsh-users/zsh-completions.git external" \
  blockf \
  svn
zi snippet PZTM::completion

# Raw URL syntax alternative
zi snippet https://github.com/sorin-ionescu/prezto/blob/master/modules/environment/init.zsh
```

## Caveats / Common Mistakes

- Prezto `zstyle ':prezto:load' pmodule ...` directives are not processed by Zinit — load each module explicitly as a snippet instead.
- `blockf` is recommended whenever a module tries to add its own entries to `$FPATH` to let Zinit manage completions cleanly.
