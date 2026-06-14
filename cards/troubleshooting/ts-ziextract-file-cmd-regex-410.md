---
id: ts-ziextract-file-cmd-regex-410
title: ziextract fails to detect executables when file(1) output differs by system
category: troubleshooting
tags: [binary, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/410
related: [ts-ziextract-executable-permissions-771]
---

## Summary

`ziextract`'s executable-detection logic used a regex matched against `file(1)` output to identify binaries. On systems where `file(1)` includes extra descriptors in its output (e.g. "ELF 64-bit LSB executable, x86-64, version 1 (GNU/Linux)"), the regex did not match, so extracted binaries were not made executable.

## Symptom

After installing a `from"gh-r"` binary, the downloaded file is present but not executable:

```
zsh: permission denied: rg
```

Or the binary is installed but `$PATH` lookup fails because the file lacks the execute bit.

## Cause

The regex in `ziextract` matched specific, fixed patterns from `file(1)` output. Different OS versions and `file` implementations produce different output strings. The regex was not general enough to cover all variants, causing the execute-bit to not be set on some systems. Fixed in PR #410 by making the regex disregard system-specific parts of `file` output.

## Fix / Workaround

Update zinit to get the corrected `ziextract` regex:

```zsh
zinit self-update
```

As a manual workaround, set the execute bit explicitly using `atclone` and `atpull`:

```zsh
zinit ice from"gh-r" as"program" \
    atclone"chmod +x *" \
    atpull"%atclone"
zinit light user/mytool
```

Or use `sbin` from `zinit-annex-bin-gem-node`, which handles permissions automatically.

## Caveats

The `file(1)` command output varies between GNU and BSD implementations, and between Linux distributions. Systems with an unusual `file` output format may still need an explicit `atclone"chmod +x ..."` as a belt-and-suspenders measure even on current zinit versions.
