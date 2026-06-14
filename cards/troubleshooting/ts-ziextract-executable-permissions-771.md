---
id: ts-ziextract-executable-permissions-771
title: "ziextract incorrectly marks non-binary files as executable"
category: troubleshooting
tags: [binary, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/771
related: [ts-double-extraction-gh-r-761]
---

## Summary

After extracting a `gh-r` archive, `ziextract` uses `file(1)` to detect executables and sets `+x` on files containing Python syntax or other script-like content — including documentation and libraries — because `file(1)` reports content type, not intended execute permission.

## Symptom

After installing a plugin from GitHub Releases, non-executable files (documentation, `.py` helper scripts, library `.jar` files) get `+x` permission set. This can confuse subsequent operations and cause unexpected behavior.

## Cause

The auto-detect-executables feature used `file(1)` output to guess which files should be `+x`. `file(1)` labels files by content, not by whether they should be executable. A file containing valid Python syntax triggers a "Python script" label regardless of its intended purpose.

## Fix / Workaround

Update zinit to a version that trusts archive permissions instead of `file(1)` heuristics (fixed in PR #771):

```zsh
zinit self-update
```

The fix preserves the `+x` bits that were set in the original archive rather than re-deriving them.
