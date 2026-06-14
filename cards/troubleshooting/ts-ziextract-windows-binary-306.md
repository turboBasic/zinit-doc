---
id: ts-ziextract-windows-binary-306
title: ziextract fails for Windows binaries (.exe) downloaded on non-Windows systems
category: troubleshooting
tags: [troubleshooting, binary, installation]
source: https://github.com/zdharma-continuum/zinit/issues/306
related: [ts-gh-r-wrong-platform-binary-575]
---

## Summary

When `from"gh-r"` selects a Windows executable (`.exe`) on a non-Windows system, `ziextract` attempts to run it as an installer (`/S` flag) via Wine/cygpath, which fails. The real problem is that `gh-r` selected the wrong binary for the platform.

## Symptom

```
ziextract: WARNING: extraction of the archive 'jq-win32.exe' had problems.
++→zinit-extract:2> cygpath -w /home/user/.local/share/zinit/plugins/stedolan---jq
+→zinit-extract:2> ./jq-win32.exe /S
```

## Cause

`gh-r` asset selection chose a Windows binary because no Linux/macOS binary was detected or the scoring heuristic picked the `.exe`. Then `ziextract` attempted to run it as a self-extracting archive.

## Fix / Workaround

Use `bpick` to restrict asset selection to the correct platform binary:

```zsh
zinit ice from"gh-r" as"program" bpick"jq-linux*"
zinit light stedolan/jq
```

On macOS:

```zsh
zinit ice from"gh-r" as"program" bpick"jq-osx*" mv"jq-* -> jq"
zinit light stedolan/jq
```

## See Also

- ts-gh-r-wrong-platform-binary-575
