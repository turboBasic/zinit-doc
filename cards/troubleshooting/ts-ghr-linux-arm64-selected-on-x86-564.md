---
id: ts-ghr-linux-arm64-selected-on-x86-564
title: "gh-r selects arm64 binary on x86_64 GNU/Linux system"
category: troubleshooting
tags: [binary, troubleshooting, installation, git]
source: https://github.com/zdharma-continuum/zinit/issues/564
related: [ts-ghr-wrong-arch-linux-539.md]
---

## Summary

On x86_64 GNU/Linux systems, the `gh-r` asset selection regex could match an arm64 asset before the x86_64 asset, causing the wrong binary to be downloaded.

## Symptom

After `zinit load --from gh-r user/plugin`, the installed binary crashes or reports a wrong CPU type. Running `file ~/.local/share/zinit/plugins/user---plugin/binary` shows `aarch64` instead of `x86-64`.

## Cause

The `gh-r` regex for Linux architecture detection could match `x86_64` release assets that also had `aarch64` or `arm64` strings earlier in the asset list. The regex needed to be anchored more precisely to avoid selecting GNU arm64 binaries on x86_64 systems.

## Fix / Workaround

Upgrade to a version that includes the fix for issues #539 and #564, which tighten the Linux architecture regex.

If you are on an affected version, use `bpick` to explicitly select the correct asset:

```zsh
zinit ice from"gh-r" as"program" bpick"*linux*x86_64*"
zinit load user/plugin
```

Avoid patterns that match multiple architectures unless you use negative lookahead via `bpick` exclusion.

## See Also

- ts-ghr-wrong-arch-linux-539.md
