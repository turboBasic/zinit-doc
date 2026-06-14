---
id: ts-ghr-wrong-arch-linux-539
title: "gh-r downloads aarch64 binary on x86_64 Linux"
category: troubleshooting
tags: [binary, installation, troubleshooting, git]
source: https://github.com/zdharma-continuum/zinit/issues/539
related: [ts-ghr-selects-wrong-arch-225]
---

## Summary

On x86_64 GNU/Linux systems, `from'gh-r'` auto-selection picks the `aarch64` release asset instead of `x86_64` because the architecture-matching regex did not properly exclude ARM patterns when no `bpick` is specified.

## Symptom

A plugin installs silently but the binary fails to execute with "wrong ELF class" or "exec format error". Inspection shows the installed binary is `aarch64-unknown-linux-gnu` despite the host being `x86_64`.

## Cause

The `gh-r` asset-selection regex on Linux matched `aarch64` assets before `x86_64` ones when both appeared in the release page. The regex lacked an exclusion for `aarch64` when selecting for `x86_64`.

## Fix / Workaround

Update zinit (fixed in PR #564):

```zsh
zinit self-update
```

As an immediate workaround, use `bpick` to explicitly select the correct asset:

```zsh
zinit ice from'gh-r' bpick'*x86_64*linux*gnu*'
zinit load denisidoro/navi
```

## Examples

```zsh
# Explicit bpick workaround for musl vs gnu ambiguity
zinit ice from'gh-r' bpick'*x86_64*linux*musl*'
zinit load denisidoro/navi
```
