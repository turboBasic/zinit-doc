---
id: ts-clist-symlink-infinite-loop-143
title: zinit clist hangs or errors on relative symlinks in completions directory
category: troubleshooting
tags: [completion, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/143
related: []
---

## Summary

`zinit clist` (completions list) could hang in an infinite loop or error when the completions directory contained a relative symlink pointing outside a plugin directory, or a symlink that resolved to a non-readable file.

## Symptom

Running `zinit clist` or `zinit completions` hangs indefinitely, or exits with an error about a missing file, when the `$ZINIT[COMPLETIONS_DIR]` contains unusual symlinks.

## Cause

The `zinit clist` code assumed all symlinks in the completions directory were absolute and resolved to a file inside a plugin subdirectory. Two edge cases caused failures:
1. A symlink that resolved to a non-readable or missing file was not checked before use.
2. A relative symlink to a path outside the plugin tree caused the plugin-ID extraction loop to iterate infinitely.

## Fix / Workaround

Update zinit — the fix adds a readable-file check and guards against the infinite loop:

```zsh
zinit self-update
```

As an immediate workaround, identify and remove stale or unusual symlinks from the completions directory:

```zsh
# List all symlinks in the completions dir
ls -la "${ZINIT[COMPLETIONS_DIR]:-${HOME}/.local/share/zinit/completions}"

# Remove any dangling symlinks
zinit cclear
```

## Caveats

The `link` ice creates relative symlinks for local snippets; ensure those symlink targets still exist after filesystem changes.
