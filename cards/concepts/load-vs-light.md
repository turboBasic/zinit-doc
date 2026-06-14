---
id: load-vs-light
title: load vs light
category: concepts
tags: [plugin, performance]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [plugin-report, ice-modifiers-overview, turbo-mode]
---

## Summary

`zinit load` enables full investigation (tracking all shell changes for reporting and unloading); `zinit light` skips investigation for a slightly faster load with no ability to report or unload.

## Details

Both commands clone and source a plugin identically. The difference is in what Zinit does around the source call:

**`zinit load {plg-spec}`**
- Wraps the source call with hooks that record every alias, function, bindkey, zle widget, zstyle, completion, variable, and `$PATH`/`$FPATH` modification the plugin makes.
- Data is stored per-plugin and accessible via `zinit report`.
- Plugin can later be unloaded with `zinit unload`, which reverses all recorded changes.
- Slightly slower due to the monitoring overhead.

**`zinit light {plg-spec}`**
- No monitoring. Plugin is sourced directly.
- Faster startup because no shadowing functions are set up.
- `zinit report` returns no data; `zinit unload` is not available.
- Accepts `-b` flag (`zinit light -b`) to shadow `bindkey` calls only, enabling `bindmap` ice remapping while keeping everything else uninstrumented.

**`light-mode` ice** applies `light`-style loading when using the `for`-syntax, where there is no explicit `load`/`light` subcommand per plugin.

Use `load` when you are exploring an unfamiliar plugin, debugging, or need unload capability. Use `light` for stable, trusted plugins in production dotfiles where startup speed matters.

## Examples

```zsh
# Full investigation — can report and unload
zinit load zdharma-continuum/history-search-multi-word

# No investigation — faster, no report/unload
zinit light zsh-users/zsh-autosuggestions

# Light with bindkey tracking only (enables bindmap)
zinit light -b zsh-users/zsh-autosuggestions

# for-syntax with light-mode ice
zinit for \
    light-mode \
  zsh-users/zsh-autosuggestions \
    light-mode \
  zdharma-continuum/fast-syntax-highlighting

# Check what load recorded
zinit report zdharma-continuum/history-search-multi-word

# Unload (only works for plugins loaded with `load`)
zinit unload zdharma-continuum/history-search-multi-word
```
