---
id: ts-fnm-install-env-completions
title: Installing fnm from GitHub releases with env init and completions
category: troubleshooting
tags: [binary, ice, completion, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/240
related: [ts-eval-hook-external-tool, ts-gh-r-binary-install]
---

## Summary

`fnm` (Fast Node Manager) can be installed from GitHub releases with zinit. The env init script is generated at clone time via `atclone` and sourced on every shell start. Completions require a separate snippet.

## Question / Problem

A user wanted to install `fnm` from `gh-r`, generate the env init script once (not on every shell start), and also set up zsh completions from `fnm completions --shell zsh`.

## Answer / Solution

**Part 1 — Install binary and cache env init:**

```zsh
zinit ice from'gh-r' sbin'fnm' nocompile \
    atclone'./fnm env --use-on-cd > fnmenv.zsh' \
    atpull"%atclone" \
    src"fnmenv.zsh"
zinit light Schniz/fnm
```

- `from'gh-r'` downloads the latest release binary
- `sbin'fnm'` creates a shim (requires `zinit-annex-bin-gem-node`)
- `atclone'./fnm env --use-on-cd > fnmenv.zsh'` generates the init script once
- `atpull"%atclone"` regenerates it on updates
- `src"fnmenv.zsh"` sources the cached init on every shell start
- `nocompile` skips zsh compilation of the binary

**Part 2 — Completions:**

Use the same `atclone` pattern to generate and cache completions:

```zsh
zinit ice from'gh-r' sbin'fnm' nocompile \
    atclone'./fnm env --use-on-cd > fnmenv.zsh; ./fnm completions --shell zsh > _fnm' \
    atpull"%atclone" \
    src"fnmenv.zsh" \
    as"completion" pick"_fnm"
zinit light Schniz/fnm
```

Or load completions as a separate snippet after the binary install:

```zsh
zinit ice id-as"fnm-completions" as"completion" \
    atclone"fnm completions --shell zsh > _fnm" \
    atpull"%atclone" pick"_fnm"
zinit snippet zdharma-continuum/null
```

## Caveats

`sbin` requires the `zinit-annex-bin-gem-node` annex. Without it, use `as"program"` and `pick"fnm"` instead.
