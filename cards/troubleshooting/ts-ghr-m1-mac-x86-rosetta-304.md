---
id: ts-ghr-m1-mac-x86-rosetta-304
title: gh-r downloads x86_64 binary on M1 Mac when running under Rosetta
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/304
related: [ts-ghr-wrong-arch-macos-287, ts-ghr-wrong-arch-linux-431]
---

## Summary
On Apple Silicon (M1/M2) Macs, when Zsh is a universal binary running under Rosetta, zinit reads `$MACHTYPE` (compile-time, x86_64) instead of `$CPUTYPE` (runtime, arm64) and downloads the x86_64 binary instead of the native arm64 one.

## Symptom
`from"gh-r"` downloads an `amd64` or `x86_64` binary on an M1 Mac, even though native arm64 assets are available:

```
fzf-0.30.0-darwin_amd64.zip  ← downloaded
fzf-0.30.0-darwin_arm64.zip  ← expected
```

## Cause
Homebrew installs a universal `zsh` binary that reports `x86_64` for `$MACHTYPE` when under Rosetta emulation, while `$CPUTYPE` correctly reports `arm64`. Zinit was using `$MACHTYPE` exclusively; PR #304 changed it to prefer runtime-detected `$CPUTYPE`.

## Fix / Workaround
Update zinit to a version that includes PR #304 (`zinit self-update`). The fix uses `$CPUTYPE` (runtime) before `$MACHTYPE` (compile-time) for architecture detection.

After updating, delete and reinstall affected plugins:

```zsh
zinit delete junegunn/fzf
zinit load junegunn/fzf
```

If updating is not immediately possible, force the correct asset with `bpick`:

```zsh
zi ice from"gh-r" as"command" bpick"*darwin*arm64*"
zi light junegunn/fzf
```
