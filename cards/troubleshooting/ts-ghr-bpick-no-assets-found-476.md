---
id: ts-ghr-bpick-no-assets-found-476
title: bpick glob matches no release assets despite assets being present
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/476
related: [ts-ghr-bpick-regression-243, ts-ghr-bpick-no-assets-476]
---

## Summary
`bpick` with a glob pattern (e.g. `*.deb`) reports "bpick ice found no release assets" even when matching assets exist on the GitHub release page.

## Symptom
Two errors appear in sequence:

```
[gh-r] Error: bpick ice found no release assets. To fix, modify the bpick glob pattern *.deb
[gh-r] Error: No GitHub release assets found for v7.3.2
```

The plugin or binary is not downloaded despite the asset being visible on the GitHub release page.

## Cause
The `bpick` pattern filtering runs after zinit's automatic OS/arch pre-filtering removes assets it does not recognize as matching the current platform. If the asset filename does not contain OS or arch strings that zinit's pattern recognizes (e.g. a generic `.deb` package), it is removed before `bpick` can evaluate it.

## Fix / Workaround
Use `ghapi` ice to disable automatic platform filtering and let `bpick` evaluate all available assets:

```zsh
zi ice from"gh-r" as"program" ghapi bpick"*.deb"
zi light powershell/powershell
```

Alternatively, combine `bpick` with a more specific pattern that includes an OS/arch token zinit can recognize, then passes the `bpick` check:

```zsh
zi ice from"gh-r" as"program" bpick"*linux*x86_64*.deb"
zi light powershell/powershell
```

## Quality Notes

Related: `ts-ghr-bpick-no-assets-476` covers a different cause of the same error — the `bpick` glob not matching the exact asset filename (e.g. `*.deb` not matching `powershell_7.3.2-1.deb_amd64.deb`). That card focuses on inspecting the GitHub API to get exact filenames. This card covers the case where the asset exists and the glob would match, but OS/arch pre-filtering removes it before `bpick` runs.
