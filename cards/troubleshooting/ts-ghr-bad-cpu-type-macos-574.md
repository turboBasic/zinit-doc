---
id: ts-ghr-bad-cpu-type-macos-574
title: "gh-r downloads x86_64 binary on Apple Silicon Mac"
category: troubleshooting
tags: [binary, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/574
related: [ts-ghr-selects-wrong-arch-225, ts-ghr-wrong-arch-linux-539]
---

## Summary

On Apple Silicon (M1/M2) Macs, `from'gh-r'` auto-selection downloads the `x86_64` (Intel) binary instead of the `arm64`/`aarch64` binary, resulting in a "bad CPU type in executable" error when running under Rosetta or an outright failure without it.

## Symptom

```
(Requesting `jq-osx-amd64'…)
```

The binary installs but fails to run natively on Apple Silicon:

```
bad CPU type in executable: jq
```

## Cause

The architecture detection logic incorrectly identified Apple Silicon as `x86_64` in some cases, or the release-asset selection regex preferred the Intel variant. The `MACHTYPE` or `uname -m` output may return `x86_64` when running under Rosetta.

## Fix / Workaround

Use `bpick` to explicitly select the ARM64 binary:

```zsh
zinit ice from'gh-r' bpick'*arm64*' as'command'
zinit light jqlang/jq
```

Or for tools that name their macOS ARM builds differently:

```zsh
zinit ice from'gh-r' bpick'*macos*aarch64*' as'command'
zinit light some/tool
```

Update zinit to take advantage of improved architecture detection:

```zsh
zinit self-update
```

## Caveats

When running a Rosetta-translated terminal, `uname -m` returns `x86_64` even on Apple Silicon. Open a native ARM64 terminal (e.g. native Terminal.app) for correct auto-detection.
