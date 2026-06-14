---
id: ts-ghr-bpick-no-assets-476
title: bpick ice finds no release assets from gh-r
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/476
related: []
---

## Summary

When using `from"gh-r"` with a `bpick` glob, zinit reports "No GitHub release assets found" even though the release page shows matching assets. This happens when the bpick pattern does not match any filename in the release.

## Symptom

```
[gh-r] Error: bpick ice found no release assets. To fix, modify the bpick glob pattern *.deb
[gh-r] Error: No GitHub release assets found for v7.3.2
```

## Cause

The `bpick` pattern is matched against the exact filenames in the GitHub releases API response. If the pattern uses a glob that does not match any filename (e.g. `*.deb` when the actual asset is `powershell_7.3.2-1.deb_amd64.deb`), no asset is selected and zinit aborts the download.

## Fix / Workaround

Inspect the actual release asset filenames first:

```zsh
# Check the API to see exact asset names for the latest release
curl -s https://api.github.com/repos/powershell/powershell/releases/latest \
  | grep '"name"' | grep -v '"tag_name"'
```

Then adjust `bpick` to match the exact filename pattern:

```zsh
zinit ice from"gh-r" as"program" bpick"*amd64.deb"
zinit light powershell/powershell
```

Use `*` wildcards broadly enough to cover the full filename, or use a negation pattern (`^*import*`) to exclude unwanted assets.

## Caveats

The `bpick` glob is matched against the full asset filename, not a substring. A pattern like `*.deb` requires the filename to end in `.deb`, which fails if the actual name is `powershell_7.3.2-1.deb_amd64.deb`.
