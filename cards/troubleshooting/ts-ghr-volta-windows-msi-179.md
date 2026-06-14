---
id: ts-ghr-volta-windows-msi-179
title: gh-r downloads Windows MSI instead of macOS tarball
category: troubleshooting
tags: [binary, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/179
related: []
---

## Summary

On macOS, `from"gh-r"` selected the Windows `.msi` installer for `volta-cli/volta` instead of the macOS tarball. This is a specific instance of the broader gh-r OS-detection bug where release assets with non-standard OS descriptors (e.g. `macos` instead of `darwin`) confuse the auto-picker.

## Symptom

```
Downloading volta-cli/volta…
(Requesting `volta-1.0.5-windows-x86_64.msi'…)
ziextract: WARNING: didn't recognize the archive type of `volta-1.0.5-windows-x86_64.msi'
```

## Cause

The gh-r regex did not recognise `macos` as an alias for Darwin. When no macOS asset matched, the picker fell through to the first available asset, which happened to be the Windows MSI.

## Fix / Workaround

Update zinit (`zinit self-update`) — PR #67 added `macos` as a valid Darwin release descriptor; PR #171 and #235 further hardened the logic.

On an older version, override with `bpick`:

```zsh
zinit ice wait lucid as"program" from"gh-r" bpick"*macos*"
zinit light volta-cli/volta
```

## Caveats

Projects using `macos` (lowercase), `Darwin`, or `apple-darwin` in their release filenames may each need different `bpick` patterns. Check the Releases page to confirm the exact naming.
