---
id: ts-ghr-musl-system-selection-269
title: gh-r selects musl build on glibc Linux or vice versa
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/269
related: [ts-ghr-wrong-arch-linux-431, ts-ghr-lnav-musl-on-macos-367]
---

## Summary

On standard glibc Linux systems, zinit sometimes downloads a `musl` build. Conversely, on Alpine Linux (musl-based), zinit may download a glibc build. This happens when the libc variant detection logic does not account for musl-based systems.

## Symptom

On a standard Ubuntu x86_64 system:

```
(Requesting `bat-v0.22.1-arm-unknown-linux-musleabihf.tar.gz'…)
```

The binary then fails with format errors or libc mismatch errors.

## Cause

The gh-r asset selection pattern matched musl assets before glibc ones on some architectures. PR #269 added explicit musl detection to prefer musl builds on musl-based systems and glibc builds on glibc systems.

## Fix / Workaround

Update zinit:

```zsh
zinit self-update
```

Force the correct variant with `bpick`:

```zsh
# For glibc Linux (standard Ubuntu, Debian, Fedora, etc.)
zinit ice from"gh-r" as"program" pick"bat/bat" bpick"*x86_64-unknown-linux-gnu.tar.gz"
zinit light sharkdp/bat

# For Alpine Linux or other musl systems
zinit ice from"gh-r" as"program" pick"bat/bat" bpick"*x86_64-unknown-linux-musl.tar.gz"
zinit light sharkdp/bat
```

To detect musl automatically:

```zsh
if ldd /bin/sh 2>&1 | grep -q musl; then
  zinit ice bpick"*musl*"
else
  zinit ice bpick"*linux-gnu*"
fi
zinit ice from"gh-r" as"program"
zinit light sharkdp/bat
```

## Caveats

Not all projects publish separate musl and glibc builds. Statically linked musl binaries often work on both glibc and musl systems.
