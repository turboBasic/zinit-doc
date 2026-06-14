---
id: ts-zsh-autocomplete-stray-file-523
title: zsh-autocomplete creates garbage-named file in working directory when used with zinit
category: troubleshooting
tags: [troubleshooting, plugin, completion]
source: https://github.com/zdharma-continuum/zinit/issues/523
related: []
---

## Summary

A strangely-named file (e.g. `$'\374'$'\227'$'\374'$'\233'$'\374'`) is created in the current working directory when using `zsh-autocomplete` loaded via zinit, with a long history file, and the terminal in 256-color mode.

## Symptom

An unexpected file with a garbled multibyte name appears in `$PWD`. The issue only occurs when all three conditions are met simultaneously: zinit loads `zsh-autocomplete`, the history file is long, and the terminal reports 256-color capability.

## Cause

The `zsh-autocomplete` maintainer identified this as a zinit issue, not a plugin bug. The interaction between zinit's plugin loading mechanism, the history subsystem, and the terminal color code handling produces a corrupted output that is interpreted as a filename. Exact root cause is under investigation.

## Fix / Workaround

No fix available as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/523

Workarounds (any one of these breaks the reproduction):
1. Truncate the history file.
2. Use a terminal that reports fewer than 256 colors.
3. Use a different completion framework instead of `zsh-autocomplete`.
4. Load `zsh-autocomplete` without turbo mode.

## Caveats

This is a very specific combination of conditions. Most users will not encounter it.
