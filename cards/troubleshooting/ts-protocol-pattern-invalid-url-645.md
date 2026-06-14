---
id: ts-protocol-pattern-invalid-url-645
title: "Zinit accepts invalid protocol prefixes in plugin URLs"
category: troubleshooting
tags: [git, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/645
related: []
---

## Summary

The URL protocol validation regex in Zinit's plugin setup was too permissive and matched strings like `fgit://` or `ghttps://` as valid protocols, causing confusing failures when invalid URLs were used.

## Symptom

Passing a plugin spec with a malformed protocol (e.g. a typo like `fgit://github.com/user/repo`) does not produce an immediate error — Zinit attempts to proceed and fails at the git clone stage with a less obvious error.

## Cause

The protocol pattern `(|ftp(|s)|git|http(|s)|rsync|ssh)` was simplified incorrectly in a previous refactor, allowing partial matches.

## Fix / Workaround

Upgrade to a version that includes the fix for issue #645, which tightens the protocol regex to exactly match: `ftp`, `ftps`, `git`, `http`, `https`, `rsync`, `ssh`.

Valid `proto` ice values are:

```zsh
zinit ice proto"ssh"    # use SSH instead of HTTPS
zinit ice proto"git"    # use git:// protocol
zinit load user/plugin
```

Avoid non-standard protocol strings — they will not work and may fail silently on older versions.
