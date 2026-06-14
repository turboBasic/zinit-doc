---
id: ts-ziextract-non-executable-false-warning-737
title: ziextract emits spurious warning when downloaded file is not executable (e.g. man page)
category: troubleshooting
tags: [troubleshooting, binary, installation]
source: https://github.com/zdharma-continuum/zinit/issues/737
related: []
---

## Summary

When `from"gh-r"` downloads a non-archive, non-executable file (such as a man page), `ziextract` correctly skips extraction but then warns that no executables were found in the result — even though the file is valid and functioned correctly otherwise.

## Symptom

A warning like `ziextract: WARNING: no executable found after extraction` appears when installing a release asset that is not a binary (e.g. a `.1` man file). The install proceeds and `lman` links the file correctly; the warning is a false positive.

## Cause

`ziextract` post-extraction check requires at least one executable file. It does not differentiate between intentional non-executable assets (man pages, config files) and broken archives.

## Fix / Workaround

No fix available as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/737

The warning is cosmetic — the asset is still installed correctly. You can suppress output with `lucid` or `silent` ice. If the false positive is disruptive, use `bpick` to target only the binary asset and load the man page with a separate `zinit snippet` call.
