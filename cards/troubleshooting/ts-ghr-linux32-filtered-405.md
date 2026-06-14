---
id: ts-ghr-linux32-filtered-405
title: gh-r incorrectly filters out 32-bit Linux assets on 64-bit systems
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/405
related: [ts-ghr-wrong-arch-linux-431]
---

## Summary

On 64-bit Linux, zinit's gh-r logic incorrectly excluded all assets containing "linux32" or "i386" patterns but in some versions the regex also accidentally excluded valid 64-bit assets. Fixed in PRs #405 and #414.

## Symptom

A `from"gh-r"` download fails or selects an unexpected asset on a standard 64-bit Linux system, even though a correct `linux-amd64` or `linux_x86_64` asset exists in the release.

## Cause

The regex used to filter out 32-bit assets was overly broad in some versions, inadvertently excluding 64-bit assets whose names contained patterns also present in 32-bit asset names. Iterative fixes were applied in PRs #405 and #414.

## Fix / Workaround

Update zinit to get the corrected filtering logic:

```zsh
zinit self-update
```

If the issue persists, specify the asset explicitly:

```zsh
zinit ice from"gh-r" as"program" bpick"*linux*x86_64*"
zinit light some-project/tool
```

## Caveats

The gh-r asset selection has gone through multiple fix iterations. If running an old version of zinit, multiple architecture-related bugs may be present simultaneously. Updating to the latest version is strongly recommended before debugging specific asset selection issues.
