---
id: ts-ghr-apple-silicon-arm-linux-74
title: gh-r picks Linux ARM binary on Apple Silicon Mac instead of x86_64 Darwin
category: troubleshooting
tags: [binary, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/74
related: []
---

## Summary

On Apple Silicon Macs (M1/M2), `from"gh-r"` may download Linux ARM binaries rather than the correct macOS x86_64 or arm64 tarball. The confusion arises because `$CPUTYPE=arm64` matches ARM patterns for both Linux and Darwin.

## Symptom

Rust-compiled tools such as `ripgrep`, `fd`, `bat`, `git-delta` fail to run after installation because the wrong binary variant was downloaded.

## Cause

Zsh on Apple Silicon reports `CPUTYPE=arm64` and `OSTYPE=darwin*`. The gh-r selection logic used to match `arm` in `$CPUTYPE` against release assets without first confirming the OS is Darwin, causing it to pick `*linux*arm*` assets over `*darwin*` ones.

On Homebrew-installed zsh the values may differ from `/bin/zsh`:

| Shell | CPUTYPE | MACHTYPE | OSTYPE |
|---|---|---|---|
| Homebrew zsh | arm64 | arm | darwin21.1.0 |
| /bin/zsh | arm64 | x86_64 | darwin21.0 |

## Fix / Workaround

Update zinit (`zinit self-update`) — the detection logic was improved in PRs #171 and #235.

Use explicit `bpick` to disambiguate:

```zsh
# For native Apple Silicon (arm64) binaries:
zinit ice from"gh-r" as"program" bpick"*apple-darwin*"
zinit light sharkdp/fd

# Force x86_64 (Rosetta) if no native arm64 release exists:
zinit ice from"gh-r" as"program" bpick"*x86_64-apple-darwin*"
zinit light sharkdp/fd
```

## Caveats

Many projects only publish `x86_64-apple-darwin` binaries that run via Rosetta 2 on Apple Silicon. Native `aarch64-apple-darwin` or `arm64-apple-darwin` assets are increasingly available but not universal.
