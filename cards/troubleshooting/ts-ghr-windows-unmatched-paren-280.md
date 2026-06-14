---
id: ts-ghr-windows-unmatched-paren-280
title: gh-r fails to match Windows releases due to unmatched "(" in patterns
category: troubleshooting
tags: [binary, troubleshooting, ice]
source: https://github.com/zdharma-continuum/zinit/issues/280
related: []
---

## Summary

On systems targeting Windows binaries via `gh-r`, release assets are not selected because the internal Windows glob patterns contained an unmatched `(`, causing a zsh pattern syntax error.

## Symptom

`zinit` with `from"gh-r"` and a Windows target silently skips Windows release assets, or zsh reports a pattern syntax error during `gh-r` asset selection.

## Cause

The `gh-r` Windows pattern strings were missing a closing `(` — the pattern was syntactically invalid and did not match any assets.

## Fix / Workaround

Update zinit to a version that includes PR #280. The fix adds the missing `(` to all affected Windows patterns.

## Caveats

This primarily affects users who explicitly set a Windows OS target for `gh-r` (e.g., cross-platform dotfiles, WSL scenarios where a Windows binary is desired).
