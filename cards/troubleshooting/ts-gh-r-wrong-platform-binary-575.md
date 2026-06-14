---
id: ts-gh-r-wrong-platform-binary-575
title: gh-r downloads wrong platform binary (Windows or Linux on macOS) instead of erroring
category: troubleshooting
tags: [troubleshooting, binary, installation]
source: https://github.com/zdharma-continuum/zinit/issues/575
related: [ts-gh-r-arm-raspberry-352]
---

## Summary

When `from"gh-r"` cannot find a release asset matching the current platform, it falls back to downloading the closest partial match (e.g. Linux binary on macOS, Windows .exe on Linux) rather than failing with an error.

## Symptom

On macOS, `eza-community/eza` (which only has Linux and Windows binaries) installs a Windows or Linux binary. The binary does not execute and produces errors like `(eval):1: exec format error`.

## Cause

The asset-selection heuristic in zinit's `gh-r` logic scores candidates against platform/arch strings and picks the highest-scoring one, even when no candidate actually matches the current platform. There is no hard failure when the best match is still a mismatch.

## Fix / Workaround

No fix available as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/575

Workarounds:
1. Use `bpick` to explicitly select the correct asset, or confirm the release has an asset for your platform before installing.
2. If the project has no binary for your platform, use the source-based installation path (`atclone"make install"`) instead of `gh-r`.
3. Check installed binaries with `file $(which binary)` to detect format mismatches.

## See Also

- ts-gh-r-arm-raspberry-352
