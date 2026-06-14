---
id: ts-ghr-wrong-arch-macos-287
title: gh-r downloads x86_64 binary instead of arm64 on Apple Silicon Mac
category: troubleshooting
tags: [ice, binary, git, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/287
related: [ts-ghr-wrong-arch-linux-431, ts-ghr-selects-wrong-arch-225]
---

## Summary

On Apple Silicon (M1/M2) Macs, zinit downloads the `darwin_amd64` binary from GitHub releases instead of the `darwin_arm64` build. This happens because Zsh is compiled as a universal binary whose `$MACHTYPE` is reported as `x86_64`.

## Symptom

The wrong architecture is downloaded silently:

```
(Requesting `fzf-0.30.0-darwin_amd64.zip'…)
```

Expected:

```
(Requesting `fzf-0.30.0-darwin_arm64.zip'…)
```

## Cause

Zinit used `$MACHTYPE` (compile-time architecture) before `$CPUTYPE` (runtime architecture). When Zsh is a universal binary or is run under Rosetta, `$MACHTYPE` returns `x86_64` even on arm64 hardware. Fixed in PR #304 and further refined in PRs #444/#461.

## Fix / Workaround

1. Update zinit (the fix is included in current main):

```zsh
zinit self-update
```

2. Delete and re-download the incorrectly installed plugin:

```zsh
zinit delete junegunn/fzf
# restart shell to re-trigger download
```

3. As a fallback, force the correct asset with `bpick`:

```zsh
zinit ice from"gh-r" bpick"*darwin_arm64*"
zinit light junegunn/fzf
```
