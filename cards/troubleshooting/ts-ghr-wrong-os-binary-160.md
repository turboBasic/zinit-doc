---
id: ts-ghr-wrong-os-binary-160
title: gh-r selects Darwin binary on Linux (or vice versa) without bpick
category: troubleshooting
tags: [binary, installation, troubleshooting, git]
source: https://github.com/zdharma-continuum/zinit/issues/160
related: []
---

## Summary

When `bpick` is not specified, zinit's automatic gh-r asset selection can pick a release artifact for the wrong OS — for example downloading a Darwin (macOS) tarball on a Manjaro/Linux system, or selecting a Linux binary on macOS.

## Symptom

```
Downloading derailed/k9s…
(Requesting `k9s_Darwin_x86_64.tar.gz'…)
ziextract: Unpacking the files from: `k9s_Darwin_x86_64.tar.gz'…
```

The downloaded binary is for a different operating system and will not execute.

## Cause

The bpick regex used to auto-detect the OS from `$OSTYPE`/`$MACHTYPE` had edge cases where patterns matched Darwin asset names on Linux hosts (and vice versa). This affected releases where filenames include both `linux` and `darwin` substrings or use non-standard OS descriptors.

## Fix / Workaround

Update zinit (`zinit self-update`) — multiple fixes were shipped in PRs #158, #162, #171, #235.

As a reliable workaround for any release with ambiguous naming, specify `bpick` explicitly:

```zsh
# Linux example
zinit ice from"gh-r" as"program" bpick"*Linux*x86_64*"
zinit light derailed/k9s

# macOS example
zinit ice from"gh-r" as"program" bpick"*Darwin*"
zinit light derailed/k9s
```

## Caveats

The `bpick` glob is case-sensitive and matched against the full asset filename. Check the GitHub Releases page for the exact naming convention used by each project.
