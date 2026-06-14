---
id: ts-ghr-macos-dmg-not-selected-250
title: gh-r on macOS does not download .dmg releases
category: troubleshooting
tags: [binary, ice, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/250
related: []
---

## Summary

On macOS, `gh-r` failed to select `.dmg` release assets because the macOS pattern did not include the `.dmg` extension. Tools that publish only `.dmg` macOS releases were silently not downloaded.

## Symptom

On macOS, `zinit` with `from"gh-r"` downloads nothing for releases that provide only `.dmg` assets (e.g. KeePassXC, Alacritty).

## Cause

The internal macOS asset-matching pattern in `gh-r` did not include `.dmg` as a recognized extension.

## Fix / Workaround

Update zinit to a version that includes PR #250. The fix adds `.dmg` to the macOS `gh-r` pattern.

If on an older version, use `bpick` to manually select the `.dmg` asset:

```zsh
zinit ice from"gh-r" bpick"*.dmg"
zinit light keepassxc/keepassxc
```
