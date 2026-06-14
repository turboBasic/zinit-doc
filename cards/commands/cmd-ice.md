---
id: cmd-ice
title: "zi ice"
category: commands
tags: [command, ice, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-load, cmd-light, cmd-snippet, cmd-recall]
---

## Summary

Attach ice modifiers to the immediately following `zi` command. Ice modifiers are one-shot options that melt after use — they apply to exactly one subsequent `load`, `light`, `snippet`, or `update` call.

## Syntax / Usage

```zsh
zi ice <ice-spec> [<ice-spec> ...]
```

Multiple ices can be specified in a single call, separated by spaces. Ice values use the `key"value"` or `key'value'` quoting style (no `=` sign).

## Details

Ice modifiers persist to disk in the plugin or snippet's `._zinit/` subdirectory so they are reapplied on updates even when the plugin is not being reloaded interactively. They cover cloning options (`depth`, `from`, `ver`, `proto`), file selection (`pick`, `src`, `multisrc`), conditional loading (`wait`, `if`, `has`, `load`, `unload`), post-clone/update hooks (`atclone`, `atpull`, `atload`, `atinit`, `make`), output control (`lucid`, `silent`, `notify`), completion handling (`blockf`, `nocompletions`, `as"completion"`), and many more. See the Ice Modifiers reference for the full list.

## Examples

```zsh
# Load after 1 second (Turbo mode), suppress "Loaded" message
zi ice wait"1" lucid
zi load zsh-users/zsh-autosuggestions

# Clone only the latest commit, add to PATH as a program
zi ice depth"1" as"program" pick"bin/fzf"
zi light junegunn/fzf

# Run make after clone and pull
zi ice make"install PREFIX=$ZPFX"
zi light tj/git-extras

# Combination of multiple ices in one call
zi ice from"gh-r" as"program" mv"docker* -> docker-compose" bpick"*linux*"
zi load docker/compose
```

## Caveats / Common Mistakes

Each `zi ice` call is consumed by the very next `zi` command. If you add another line between `zi ice` and the load command, the ice is lost. Do not use `=` between key and value — use `key"value"` style.

## See Also

- cmd-load
- cmd-light
- cmd-snippet
- cmd-recall
