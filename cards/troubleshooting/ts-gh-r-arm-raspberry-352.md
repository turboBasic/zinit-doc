---
id: ts-gh-r-arm-raspberry-352
title: gh-r selects darwin/macOS binary on ARM Raspberry Pi (armv7l)
category: troubleshooting
tags: [troubleshooting, binary, installation]
source: https://github.com/zdharma-continuum/zinit/issues/352
related: [ts-gh-r-wrong-platform-binary-575]
---

## Summary

On Raspbian running in 32-bit mode (armv7l), `from"gh-r"` selects a Darwin (macOS) binary instead of the ARM Linux binary. The scoring heuristic misidentifies the platform.

## Symptom

```
Downloading direnv/direnv…
(Requesting `direnv.darwin-amd64'…)
(eval):1: exec format error
```

The installed binary fails to execute.

## Cause

Raspbian 32-bit reports `armv7l` as the architecture. The `gh-r` heuristic may not correctly map `armv7l` to `linux-arm` and instead scores `darwin` higher due to partial string matching.

## Fix / Workaround

Use `bpick` to explicitly select the correct ARM Linux binary:

```zsh
zinit from"gh-r" as"program" bpick"direnv.linux-arm" \
    mv"direnv.linux-arm -> direnv" \
    atclone'./direnv hook zsh > zhook.zsh' atpull'%atclone' \
    pick"direnv" src="zhook.zsh" for \
        direnv/direnv
```

## See Also

- ts-gh-r-wrong-platform-binary-575
