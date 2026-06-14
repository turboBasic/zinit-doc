---
id: ts-delete-multiple-plugins-494
title: zinit delete only accepts one plugin at a time
category: troubleshooting
tags: [command, troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/494
related: [ts-zinit-delete-no-args-239]
---

## Summary

In older versions of zinit, `zinit delete` only accepted a single plugin or snippet argument. Attempting to pass multiple arguments had no effect or produced an error. As of PR #494, `zinit delete` accepts multiple arguments.

## Symptom

```zsh
# Old behavior: only the first argument is deleted
zinit delete OMZL::key-bindings.zsh r-darwish/topgrade zdharma-continuum/fast-syntax-highlighting
# Only OMZL::key-bindings.zsh gets deleted; others are silently ignored
```

## Cause

The original `delete` subcommand parsed only the first positional argument. PR #494 refactored the argument parsing to iterate over all provided arguments, enabling multi-target deletion. The PR also improved `--all` and `--clean` flag handling and removes broken symlinks after deletion.

## Fix / Workaround

Update zinit to get multi-argument `delete` support:

```zsh
zinit self-update
```

Then delete multiple plugins in one command:

```zsh
zinit delete OMZL::key-bindings.zsh r-darwish/topgrade zdharma-continuum/fast-syntax-highlighting
```

On older versions, delete plugins one at a time:

```zsh
zinit delete OMZL::key-bindings.zsh
zinit delete r-darwish/topgrade
zinit delete zdharma-continuum/fast-syntax-highlighting
```

## Caveats

`--all` and `--clean` are mutually exclusive flags. `--all` removes every plugin and snippet; `--clean` removes only plugins and snippets that are not currently loaded. Using `--all` also removes snippets, not just plugins.
