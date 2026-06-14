---
id: sh-emulation
title: "sh / bash / ksh / csh"
category: ices
tags: [ice, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [aliases, subst]
---

## Summary

The shell-emulation ices (`sh`, `bash`, `ksh`, `csh` — and their `!`-prefixed
variants) source the plugin or snippet in a sticky shell-emulation context so that
functions defined within it also execute under that emulation.

## Syntax / Usage

```zsh
zi ice sh          # emulate sh; functions get sticky sh emulation
zi ice bash        # emulate bash (also disables SH_GLOB for Bash regexes)
zi ice ksh         # emulate ksh
zi ice csh         # emulate csh

# ! variants: apply additional options less critical for portability
zi ice !sh
zi ice !bash
zi ice !ksh
zi ice !csh
```

## Details

Each ice sets up the corresponding Zsh emulation mode before sourcing the plugin and
makes that mode _sticky_: every function declared during sourcing will also execute
under that emulation when called later.

`bash`/`!bash` additionally disables the `SH_GLOB` option, which allows Bash-style
extended regular expressions to work.

The `!` variant enables some additional options that are technically not needed for
compatibility but which the strict emulation mode would otherwise suppress.

Works with both plugins and snippets.

## Examples

```zsh
# Load a bash script that uses bashisms
zi ice bash
zi snippet ~/scripts/bash-tool.sh

# Load a ksh plugin with full sticky emulation
zi ice ksh
zi light user/ksh-plugin
```

## See Also

- aliases
- subst
