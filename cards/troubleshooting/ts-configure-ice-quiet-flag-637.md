---
id: ts-configure-ice-quiet-flag-637
title: "configure ice runs with --quiet by default, suppressing useful output"
category: troubleshooting
tags: [ice, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/637
related: []
---

## Summary

The `configure` ice previously passed `--quiet` to `./configure` by default, hiding output that could be useful for diagnosing build failures.

## Symptom

When a `configure`-based build fails silently, there is no output from `./configure` to identify the cause even with verbose ice options.

## Cause

The `configure` ice had a hardcoded `--quiet` flag that suppressed `./configure` stdout. This made debugging build failures difficult.

## Fix / Workaround

Upgrade to a version that includes the fix for issue #637, which removes the default `--quiet` flag.

On older versions, force verbose output by passing an explicit flag that overrides quiet mode via `atclone`:

```zsh
zinit ice atclone'./configure --prefix=$ZPFX' atpull'%atclone' make
zinit load user/plugin
```

This bypasses the `configure` ice entirely and gives full output.
