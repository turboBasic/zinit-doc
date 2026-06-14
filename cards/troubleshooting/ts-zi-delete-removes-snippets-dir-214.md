---
id: ts-zi-delete-removes-snippets-dir-214
title: zi delete without arguments deletes the snippets directory
category: troubleshooting
tags: [command, troubleshooting, snippet]
source: https://github.com/zdharma-continuum/zinit/issues/214
related: []
---

## Summary

Running `zi delete` (or `zinit delete`) without specifying a plugin or snippet defaults to deleting the snippets directory rather than doing nothing or showing help. This is a destructive default that silently removes all downloaded snippets.

## Symptom

Running `zinit delete` with no arguments removes `$ZINIT[SNIPPETS_DIR]` without warning or confirmation.

## Cause

The `delete` subcommand lacked a guard for the no-argument case, so it fell through to a code path that operated on the snippets directory as a default target.

## Fix / Workaround

Always pass an explicit target to `zinit delete`:

```zsh
zinit delete user/plugin          # delete a specific plugin
zinit delete https://url/snippet  # delete a specific snippet
zinit delete --clean              # delete plugins/snippets not currently loaded
zinit delete --all                # delete everything (use with caution)
```

If the snippets directory was accidentally deleted, restore it:

```zsh
mkdir -p "${ZINIT[SNIPPETS_DIR]:-${HOME}/.local/share/zinit/snippets}"
exec zsh  # re-sources .zshrc, zinit will re-download missing snippets
```

## Caveats

Snippets are re-downloaded automatically on next shell start if their load commands are in `.zshrc`. Plugins are also re-cloned if referenced but missing.
