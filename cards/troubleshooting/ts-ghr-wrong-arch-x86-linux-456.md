---
id: ts-ghr-wrong-arch-x86-linux-456
title: gh-r downloads ARM binary on x86_64 Linux when `arch` command is missing
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/456
related: [ts-ghr-wrong-arch-linux-431, ts-ghr-wrong-arch-macos-287]
---

## Summary
On x86_64 Linux systems, `from"gh-r"` downloads the wrong CPU architecture when the `arch` command is absent, because zinit falls back to compile-time `$MACHTYPE` ordering that placed ARM before x86_64 in the filter.

## Symptom
Running a binary installed via `from"gh-r"` fails with `zsh: exec format error: rg`. Zinit reports no error during download. Inspecting the download reveals an ARM variant (e.g. `ripgrep-13.0.0-arm-unknown-linux-gnueabihf.tar.gz`) was selected instead of the x86_64 one.

Additionally, the error `.zi::get-architecture:3: command not found: arch` may appear during the update.

## Cause
The `gh-r` asset filter applied OS (`linux-gnu`) before CPU architecture (`amd64|x86_64|x64`). When multiple assets matched the OS pattern, the first match (ARM) was chosen. The `arch` command absence exposed a secondary fallback that returned a wrong type. Fixed in zinit PR #457 and #461 by reordering filters to prioritize CPU architecture first.

## Fix / Workaround
Update zinit to a version that includes PR #461 (`zinit self-update`). As a temporary workaround, use `bpick` to explicitly select the correct asset:

```zsh
zi ice from"gh-r" as"command" bpick"*x86_64*linux*"
zi light BurntSushi/ripgrep
```

## Caveats
The fix requires zinit version after commit that landed PR #461. The `arch` command may be absent on minimal container images; installing `coreutils` resolves the secondary failure.
