---
id: pkg-ls-colors
title: "ls_colors"
category: packages
tags: [package, plugin, completion, installation]
source: https://github.com/zdharma-continuum/zinit-packages
related: [pkg-overview, pkg-dircolors-material]
---

## Summary

Applies the trapd00r/LS_COLORS theme — a comprehensive `LS_COLORS` definition for GNU `ls` and `exa` — and wires it into the Zsh completion system automatically.

## Syntax / Usage

```zsh
zi pack for trapd00r/LS_COLORS
zi pack"<profile>" for trapd00r/LS_COLORS
```

Available profiles: `default`, `no-zsh-completion`, `no-dir-color-swap`.

## Details

- Provides: `LS_COLORS` environment variable and a `clrs.zsh` file sourced at shell start, plus `zstyle ':completion:*:default' list-colors` wired to `$LS_COLORS` (default and `no-dir-color-swap` profiles only).
- `default` profile ices: `git`, `reset`, `nocompile"!"`, `lucid`, `atclone` (runs `dircolors` to generate `clrs.zsh`; replaces the `DIR` color with `38;5;63;1` bold-blue), `atpull"%atclone"`, `pick"clrs.zsh"`, `atload` (sets `zstyle` for completion colors).
- `no-zsh-completion` profile: same build as `default` but omits the `atload` `zstyle` hook — useful if you configure completion colors elsewhere.
- `no-dir-color-swap` profile: skips the `sed` DIR replacement so the upstream directory color is used unchanged; still sets the `zstyle` completion hook.
- On macOS, the `atclone` script prefixes `dircolors` and `sed` with `g` (i.e. `gdircolors`, `gsed`) to use GNU coreutils.

## Examples

```zsh
# Full install with completion colors
zi pack for trapd00r/LS_COLORS

# Install without touching completion colors
zi pack"no-zsh-completion" for trapd00r/LS_COLORS
```

## Caveats / Common Mistakes

- On macOS, GNU coreutils must be installed (`brew install coreutils`); the package detects their absence and prepends `g` to `dircolors`/`sed`, but if they are missing the `atclone` hook silently produces no `clrs.zsh`.

## See Also

- [pkg-dircolors-material](pkg-dircolors-material.md) — alternative Material Design color theme
- [pkg-overview](pkg-overview.md) — how `zi pack` works
