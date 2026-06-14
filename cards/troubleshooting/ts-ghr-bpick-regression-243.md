---
id: ts-ghr-bpick-regression-243
title: bpick ice stops matching after zinit update (regression)
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/243
related: [ts-ghr-bpick-no-assets-476]
---

## Summary

A working `bpick` configuration breaks after updating zinit, reporting "Didn't find correct Github release-file to download". A change to the gh-r asset filtering logic in April 2022 inadvertently tightened the asset name matching regex, excluding filenames that don't follow OS/arch naming conventions.

## Symptom

After `zinit self-update`, a previously working `bpick` fails:

```
Downloading dbrgn/tealdeer…
Didn't find correct Github release-file to download, try adapting bpick-ICE
(the current bpick is: completions_zsh).
```

## Cause

A regex change introduced in the asset pre-filtering step excluded files whose names didn't contain OS or architecture keywords. Assets like `completions_zsh` (which have no OS/arch component) were filtered out before `bpick` even had a chance to match them. Fixed in PR #244.

## Fix / Workaround

1. Update zinit to get the fix:

```zsh
zinit self-update
```

2. If on an older release, add explicit OS hints or use `mv`+`pick` as a workaround:

```zsh
zinit ice as"completion" from"gh-r" id-as"dbrgn/_tealdeer" bpick"completions_zsh" \
    mv"completions_zsh -> _tldr" pick"_tldr" reset
zinit light dbrgn/tealdeer
```

## Caveats

Assets without OS/arch keywords in their filename (e.g. pure completion files, changelogs, checksums) may still be filtered by some versions of zinit's pre-selection logic. Use `mv` + `pick` when `bpick` alone is not enough to link the file correctly.
