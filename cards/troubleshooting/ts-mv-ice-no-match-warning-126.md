---
id: ts-mv-ice-no-match-warning-126
title: mv ice silently does nothing when glob pattern matches no files
category: troubleshooting
tags: [ice, installation, troubleshooting, binary]
source: https://github.com/zdharma-continuum/zinit/issues/126
related: []
---

## Summary

When the `mv` ice glob pattern does not match any file in the downloaded plugin/snippet directory, the rename silently does nothing — no error, no warning, and no renamed file. After PR #126, zinit emits a warning and lists the available files to help fix the pattern.

## Symptom

On older zinit: a binary is downloaded but not renamed, so commands referencing the renamed path fail silently.

After PR #126 fix:

```
Warning: mv ice didn't match any file. [DOES_NOT_EXIST* -> fd]
Available files: fd-v8.3.0-x86_64-unknown-linux-musl/
```

## Cause

The `mv` ice uses a glob to find the source file. If the release archive extracts to a subdirectory (e.g. `fd-v8.3.0-x86_64.../fd`) but the glob is `fd* -> fd` (expecting `fd` at the top level), no match occurs and the rename is silently skipped.

## Fix / Workaround

Update zinit (`zinit self-update`) to get the warning that lists available files.

Adjust the `mv` ice pattern to match the actual extracted structure. For deeply nested binaries, use `**` globbing or the `sbin` annex ice instead:

```zsh
# If binary is in a subdirectory:
zinit ice from"gh-r" as"command" mv"fd-*/fd -> fd"
zinit light sharkdp/fd

# Or use sbin from zinit-annex-bin-gem-node:
zinit ice from"gh-r" sbin"**/fd"
zinit light sharkdp/fd
```

## Caveats

The `mv` ice runs after extraction. If the archive extracts into a subdirectory (common for GitHub releases), the glob must account for that subdirectory prefix.
