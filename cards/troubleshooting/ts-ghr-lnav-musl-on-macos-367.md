---
id: ts-ghr-lnav-musl-on-macos-367
title: gh-r downloads musl Linux binary instead of macOS binary
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/367
related: [ts-ghr-wrong-arch-macos-287, ts-ghr-wrong-arch-linux-431]
---

## Summary

On macOS, zinit downloads a `musl-64bit` Linux binary instead of the macOS variant. This occurs when the release filenames use non-standard OS name conventions (e.g. `osx` instead of `darwin` or `macos`).

## Symptom

```
Downloading tstack/lnav…
(Requesting `lnav-0.11.0-musl-64bit.zip'…)
```

Expected: `lnav-0.11.0-macos-64bit.zip` or similar Darwin binary.

## Cause

Zinit's macOS detection pattern matched `darwin` and `macos` but not `osx`. When the only macOS asset uses `osx` in its name (e.g. `lnav-x.y.z-os-x-64bit.zip`), no macOS asset matched and zinit fell back to a generic Linux binary. Fixed in PR #368 by adding `os-x` to the darwin pattern.

## Fix / Workaround

Update zinit to get the expanded macOS pattern:

```zsh
zinit self-update
```

If still affected, use explicit `bpick` with the exact macOS asset name:

```zsh
zinit ice from"gh-r" as"program" bpick"*macos*"
zinit light tstack/lnav
```

## Caveats

Release asset naming is inconsistent across GitHub projects. When automatic architecture detection fails, `bpick` with a project-specific pattern is the most reliable solution.
