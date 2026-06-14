---
id: ts-arch-binary-missing-machtype-588
title: "'arch' command not found on NixOS, Synology, or systems without GNU coreutils"
category: troubleshooting
tags: [binary, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/588
related: [ts-arch-binary-missing-synology-585.md]
---

## Summary

Zinit used the `arch` binary to detect CPU architecture, but `arch` is not available on systems without GNU coreutils (Synology NAS, NixOS, Alpine, etc.), causing failures when selecting `gh-r` binaries.

## Symptom

Errors like `arch: command not found` or incorrect binary selection when loading plugins with `from"gh-r"` on non-standard Linux systems.

## Cause

Zinit called the external `arch` command rather than using Zsh's built-in `$MACHTYPE` variable, which is always available.

## Fix / Workaround

Upgrade Zinit to a version that includes the fix for issue #588, which replaces `arch` with `$MACHTYPE`.

As a workaround on older versions, create a shim:

```zsh
# Add before sourcing zinit if `arch` is missing
if ! command -v arch &>/dev/null; then
  arch() { echo "$MACHTYPE" }
fi
```

## See Also

- ts-arch-binary-missing-synology-585.md
