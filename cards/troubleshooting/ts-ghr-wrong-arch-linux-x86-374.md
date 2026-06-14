---
id: ts-ghr-wrong-arch-linux-x86-374
title: gh-r downloads ARM 32-bit binary instead of x86_64 on Ubuntu
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/374
related: [ts-ghr-wrong-arch-x86-linux-456, ts-ghr-wrong-arch-linux-431]
---

## Summary
On Ubuntu x86_64 systems, `from"gh-r"` selects ARM 32-bit binaries (e.g. `arm-unknown-linux-musleabihf`) instead of x86_64 binaries, resulting in an unexecutable binary.

## Symptom
Running the downloaded binary fails:

```
zsh: exec format error: bat
```

Inspecting the download reveals an ARM variant was chosen, for example:
`bat-v0.22.1-arm-unknown-linux-musleabihf.tar.gz` instead of the `x86_64-unknown-linux-musl` variant.

## Cause
The `gh-r` asset filter did not consistently prioritize CPU architecture before OS pattern, causing ARM assets that happened to match the OS prefix to be selected first. Fixed in PR #461.

## Fix / Workaround
Update zinit to include PR #461 (`zinit self-update`).

As a temporary workaround, use `bpick` to force the correct asset:

```zsh
zi ice from"gh-r" as"command" bpick"*x86_64*linux*"
zi light sharkdp/bat
```

Delete and re-install affected plugins after updating:

```zsh
zinit delete sharkdp/bat
zinit load sharkdp/bat
```
