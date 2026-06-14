---
id: pkg-dircolors-material
title: "dircolors-material"
category: packages
tags: [package, plugin, completion, installation]
source: https://github.com/zdharma-continuum/zinit-packages
related: [pkg-overview, pkg-ls-colors]
---

## Summary

Applies the zpm-zsh/material-colors dircolors theme — a Material Design-inspired `LS_COLORS` set — and optionally wires it into Zsh completion.

## Syntax / Usage

```zsh
zi pack for zpm-zsh/material-colors
zi pack"<profile>" for zpm-zsh/material-colors
```

Available profiles: `default`, `no-color-swaps`, `no-zsh-completion`, `minimal`.

## Details

- Provides: `LS_COLORS` environment variable sourced from a generated `colors.zsh`, and `zstyle ':completion:*:default' list-colors` hook (default, no-color-swaps profiles).
- `default` profile ices: `git`, `reset`, `nocompile"!"`, `lucid`, `atclone` (patches `01-base.dircolors` to swap the DIR color to `38;5;63;1` bold-blue, then runs `dircolors` over all `dircolors/*.dircolors` files to produce `colors.zsh`), `atpull"%atclone"`, `pick"colors.zsh"`, `atload` (sets `zstyle` completion colors).
- `no-color-swaps` profile: skips the DIR patch; otherwise identical to `default` including the `zstyle` hook.
- `no-zsh-completion` profile: applies the DIR swap but omits the `atload` `zstyle` line.
- `minimal` profile: no DIR swap, no `atload` hook — only generates and sources `colors.zsh`.
- On macOS, `dircolors` is prefixed with `g` if the system `dircolors` is absent.

## Examples

```zsh
# Full install with Material colors and completion hook
zi pack for zpm-zsh/material-colors

# Minimal: just set LS_COLORS, no completion wiring
zi pack"minimal" for zpm-zsh/material-colors
```

## See Also

- [pkg-ls-colors](pkg-ls-colors.md) — trapd00r LS_COLORS theme (alternative)
- [pkg-overview](pkg-overview.md) — how `zi pack` works
