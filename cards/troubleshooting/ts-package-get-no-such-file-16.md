---
id: ts-package-get-no-such-file-16
title: .zinit-get-package "no such file or directory" for temp file on macOS
category: troubleshooting
tags: [package, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/16
related: []
---

## Summary

On macOS, `zinit pack` fails with `.zinit-get-package: no such file or directory: /var/folders/.../tmp.XXXXX` because the `mktemp` call inside `.zinit-get-package` used a Linux-specific `--tmpdir` flag not available on BSD `mktemp`.

## Symptom

```
.zinit-get-package:25: no such file or directory: /var/folders/jv/mdqy177n7sxbpqvqr55_9pwh0000gn/T/tmp.b9qfOmzv
Error: the package `fzf` couldn't be found.
```

## Cause

The internal package-download function used `mktemp` with GNU-specific arguments. On macOS (BSD `mktemp`), the temp file path is constructed differently, causing the subsequent file operations to fail.

Additionally, early versions of the `zdharma-continuum` fork had the wrong package URL (`zinit-package-*` instead of `zsh-package-*`), so even after the `mktemp` fix, packages could not be found.

## Fix / Workaround

Update zinit (`zinit self-update`) — both the `mktemp` compatibility fix and the correct package URL were applied in the early PRs (#10, #65).

After updating, verify that pack commands work:

```zsh
zinit pack for fzf
```

## Caveats

The `pack` ice requires `jq` (added as a hard dependency in PR #116). Ensure `jq` is installed and in `$PATH` before using pack-based installations.
