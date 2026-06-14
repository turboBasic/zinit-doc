---
id: ts-arch-binary-missing-synology-585
title: "command not found: arch during gh-r update on Synology or NixOS"
category: troubleshooting
tags: [binary, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/585
related: []
---

## Summary

On systems without GNU coreutils (Synology NAS, NixOS, some minimal Linux installations), every `gh-r` plugin update prints `command not found: arch` because zinit called the `arch` binary to determine CPU architecture.

## Symptom

```
Updating sharkdp/fd
.zinit-get-latest-gh-r-url-part:37: command not found: arch

[gh-r] latest version (v8.7.1) already installed
```

The error appears for every `gh-r` plugin but updates still proceed with the previously cached version.

## Cause

Zinit used the external `arch` command (part of GNU coreutils) to determine machine architecture. Systems like Synology NAS do not ship this binary.

## Fix / Workaround

Update zinit to a version that uses the `$MACHTYPE` zsh variable instead of the `arch` binary (fixed in PR #588):

```zsh
zinit self-update
```

No configuration change is required; the fix is internal.
