---
id: ts-ghr-wrong-arch-linux-431
title: gh-r downloads wrong CPU architecture binary on Linux
category: troubleshooting
tags: [ice, binary, git, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/431
related: [ts-ghr-selects-wrong-arch-225]
---

## Summary

When using `from"gh-r"` on Linux (especially ARM or x86_64 machines with unusual MACHTYPE/CPUTYPE values), zinit downloads a binary for the wrong CPU architecture, causing `zsh: exec format error` when the binary is run.

## Symptom

The download proceeds but runs the wrong architecture variant:

```
Downloading BurntSushi/ripgrep…
(Requesting `ripgrep-13.0.0-arm-unknown-linux-gnueabihf.tar.gz'…)
```

Then at runtime:

```
zsh: exec format error: rg
```

On ARM64 / aarch64 instances, zinit may pick `amd64` builds. On x86_64 it may pick ARM builds.

## Cause

Zinit infers the target architecture from `$MACHTYPE` (compile-time) and `$CPUTYPE` (runtime). When Zsh is a universal binary or is compiled for a different target than the running CPU (e.g. Rosetta, or a cross-compiled build), `$MACHTYPE` does not reflect the actual hardware. A bug in the arch-detection ordering caused `arch` command failures or incorrect precedence (fixed in releases after PR #457/#461/#444).

## Fix / Workaround

1. Update zinit to get the architecture detection fix:

```zsh
zinit self-update
```

2. If the issue persists, explicitly specify the asset with `bpick`:

```zsh
zinit ice from"gh-r" as"program" bpick"*x86_64*linux*"
zinit light BurntSushi/ripgrep
```

3. On ARM64 Linux (aarch64), use:

```zsh
zinit ice from"gh-r" as"program" bpick"*aarch64*linux*"
zinit light BurntSushi/ripgrep
```

## Caveats

The `arch` command is not available on all systems. The fix moves CPU detection to use `$CPUTYPE` before `$MACHTYPE` and avoids calling the external `arch` binary.
