---
id: ts-ghr-cpu-arch-filter-order-323
title: gh-r uses compile-time MACHTYPE before runtime CPUTYPE for arch detection
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/323
related: [ts-ghr-m1-mac-x86-rosetta-304, ts-ghr-wrong-arch-linux-431]
---

## Summary
Zinit's `gh-r` architecture detection formerly used `$MACHTYPE` (set at compile time) before `$CPUTYPE` (set at runtime). On Apple Silicon Macs with a universal `zsh` binary running under Rosetta, this caused x86_64 binaries to be downloaded instead of native arm64.

## Symptom
On an M1/M2 Mac, `from"gh-r"` downloads `darwin_amd64` assets instead of `darwin_arm64`, even though native arm64 builds are available.

## Cause
`$MACHTYPE` reflects the architecture for which zsh was compiled. A universal binary's `$MACHTYPE` can be `x86_64` when running on arm64 hardware under Rosetta. `$CPUTYPE` reflects the actual runtime CPU. PR #323 and later PR #304 changed detection to prefer `$CPUTYPE`.

## Fix / Workaround
Update zinit to include PR #304 (`zinit self-update`).

For older zinit versions, force the correct architecture with `bpick`:

```zsh
zi ice from"gh-r" as"command" bpick"*darwin*arm64*"
zi light junegunn/fzf
```

Or set the architecture explicitly via an environment variable before sourcing zinit (not officially supported, but effective):

```zsh
# In .zshrc before sourcing zinit:
CPUTYPE=arm64
```
