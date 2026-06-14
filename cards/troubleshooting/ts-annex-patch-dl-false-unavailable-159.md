---
id: ts-annex-patch-dl-false-unavailable-159
title: False error "zinit-annex-patch-dl is unavailable" on shell start
category: troubleshooting
tags: [annex, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/159
related: []
---

## Summary

A spurious error message reporting that `zinit-annex-patch-dl` is unavailable was printed on shell startup even when the annex was correctly installed.

## Symptom

```
Error: annex 'zinit-annex-patch-dl' is unavailable
```

Appears at shell startup despite the annex being present in `$ZINIT[HOME_DIR]/plugins`.

## Cause

A false-negative availability check in zinit's annex detection logic incorrectly reported the annex as missing.

## Fix / Workaround

Update zinit — the availability check was corrected in the release that closed issue #159:

```zsh
zinit self-update
```

If the error persists after updating, reinstall the annex:

```zsh
zinit delete zdharma-continuum/zinit-annex-patch-dl
zinit light zdharma-continuum/zinit-annex-patch-dl
```

## Caveats

This was a reporting bug only; the annex itself functioned correctly despite the error message.
