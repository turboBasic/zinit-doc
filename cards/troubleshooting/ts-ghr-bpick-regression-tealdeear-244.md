---
id: ts-ghr-bpick-regression-tealdeear-244
title: bpick stops working for assets without OS/arch token after regex change
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/244
related: [ts-ghr-bpick-regression-243, ts-ghr-bpick-asset-filtered-before-bpick-385]
---

## Summary
A regex change in April broke `bpick` for GitHub release assets whose filenames contain no OS or architecture substring (e.g. `completions_zsh`). The pre-filter removed those assets before `bpick` could match them.

## Symptom
After an April zinit update:

```
Didn't find correct Github release-file to download, try adapting bpick-ICE (the current bpick is: completions_zsh).
```

Previously worked. The `completions_zsh` asset for `dbrgn/tealdeer` is still present on the release page.

## Cause
A change to the `gh-r` asset-filtering regex added stricter OS/arch matching that inadvertently excluded assets without OS/arch tokens in their filenames. Fixed in PR #244 by modifying the regex to not drop assets that have no recognized OS/arch pattern.

## Fix / Workaround
Update zinit to include PR #244 (`zinit self-update`).

For older versions, provide an OS/arch hint in `bpick` so the asset passes the pre-filter:

```zsh
zi ice from"gh-r" as"completion" bpick"completions_zsh" mv"completions_zsh -> _tldr" pick"_tldr"
zi light dbrgn/tealdeer
```

If that still fails, use `ghapi` ice to skip platform pre-filtering entirely:

```zsh
zi ice from"gh-r" ghapi as"completion" bpick"completions_zsh" mv"completions_zsh -> _tldr" pick"_tldr"
zi light dbrgn/tealdeer
```
