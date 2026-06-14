---
id: ts-ghr-volta-macos-270
title: gh-r downloads wrong Volta CLI binary on macOS (Intel and Apple Silicon)
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/270
related: [ts-ghr-wrong-arch-macos-287]
---

## Summary

Loading `volta-cli/volta` via `from"gh-r"` selects the wrong binary on both Intel and Apple Silicon Macs. The issue was that Volta's release assets use non-standard naming that zinit's arch detection did not handle.

## Symptom

On macOS, zinit downloads a Linux or wrong-architecture Volta binary:

```
Downloading volta-cli/volta…
(Requesting `volta-1.1.0-linux.tar.gz'…)
```

## Cause

Volta releases use asset names like `volta-x.y.z-macos.tar.gz` (without explicit arch). Zinit's macOS/darwin pattern matching did not match `macos` as a Darwin indicator in all versions. Fixed in the darwin pattern improvements (PRs #368, #269, #444).

## Fix / Workaround

Update zinit:

```zsh
zinit self-update
zinit delete volta-cli/volta
exec zsh
```

Or specify the asset explicitly with `bpick`:

```zsh
# Intel Mac
zinit ice from"gh-r" as"program" bpick"*macos.tar.gz"
zinit light volta-cli/volta

# Apple Silicon (if volta publishes arm64 builds)
zinit ice from"gh-r" as"program" bpick"*macos-aarch64.tar.gz"
zinit light volta-cli/volta
```

Check `https://github.com/volta-cli/volta/releases` for the exact asset names.
