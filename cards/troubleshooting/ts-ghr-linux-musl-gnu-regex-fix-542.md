---
id: ts-ghr-linux-musl-gnu-regex-fix-542
title: "gh-r selects musl binary on GNU/Linux system"
category: troubleshooting
tags: [binary, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/542
related: [ts-ghr-musl-system-selection-269.md, ts-ghr-wrong-arch-linux-539.md]
---

## Summary

On x86_64 GNU/Linux systems, the `gh-r` asset-selection regex could match a `musl` binary instead of the GNU one when both were present in a release, causing linking errors at runtime.

## Symptom

A binary installed via `from"gh-r"` fails to run with errors like:

```
error while loading shared libraries: libc.so.6: cannot open shared object file
```

Or the binary executes but produces unexpected behavior due to musl vs glibc differences.

## Cause

The `gh-r` architecture filter did not distinguish between `musl` and `gnu` flavors of Linux x86_64 assets when both were present. The wrong variant was selected based on sort order of asset names.

## Fix / Workaround

Upgrade to a version that includes the fix for issues #539 and #542, which improve musl/GNU discrimination.

If you are on a musl-based system (Alpine, Void Linux musl variant), use `bpick` to explicitly select the musl variant:

```zsh
zinit ice from"gh-r" as"program" bpick"*musl*"
zinit load user/repo
```

On GNU/Linux (Ubuntu, Fedora, Debian, Arch), explicitly exclude musl:

```zsh
zinit ice from"gh-r" as"program" bpick"*linux*gnu*"
zinit load user/repo
```

## See Also

- ts-ghr-musl-system-selection-269.md
