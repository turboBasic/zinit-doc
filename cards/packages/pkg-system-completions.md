---
id: pkg-system-completions
title: "system-completions"
category: packages
tags: [package, completion, installation]
source: https://github.com/zdharma-continuum/zinit-packages
related: [pkg-overview]
---

## Summary

Brings the stock Zsh system completions (the ones shipped with your installed Zsh version) under zinit's control, making them manageable and reloadable via zinit commands.

## Syntax / Usage

```zsh
zi pack for system-completions
```

One profile: `default`.

## Details

- Provides: system Zsh completion functions registered with zinit via `zinit creinstall`; non-completion functions copied to `$ZPFX/funs` and added to `fpath`.
- Profile ices: `git`, `as"completion"`, `nocompile`, `lucid`, `run-atpull`, `atclone` (copies non-`_*` functions from `$ZPFX/share/zsh/$ZSH_VERSION/functions/` to `$ZPFX/funs`; runs `zinit creinstall -q $ZPFX/share/zsh/$ZSH_VERSION/functions`), `atpull"%atclone"`, `atload` (removes system zsh fpath entries and re-adds `$ZPFX/funs`).
- `run-atpull` ensures the `atclone` hook runs on every `zi update`, keeping completions in sync after a Zsh upgrade.
- This package does not clone any external repo — it operates on the already-installed system Zsh files.

## Examples

```zsh
zi pack for system-completions
```

## Caveats / Common Mistakes

- If `$ZPFX/share/zsh/$ZSH_VERSION/functions/` does not exist (e.g. Zsh installed outside `$ZPFX`), the `atclone` hook silently copies nothing.

## See Also

- [pkg-overview](pkg-overview.md) — how `zi pack` works
