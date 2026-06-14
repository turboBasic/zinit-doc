---
id: ts-ziextract-permission-denied-root-556
title: "ziextract fails with permission error when run as root"
category: troubleshooting
tags: [installation, troubleshooting, binary]
source: https://github.com/zdharma-continuum/zinit/issues/557
related: []
---

## Summary

`ziextract` fails with a permission error when Zinit is used as root because the extraction logic did not account for root's different permission model.

## Symptom

Running `ziextract` (or any ice that triggers archive extraction) as the root user produces a permission-denied error and extraction fails.

## Cause

The extraction helper did not handle the case where the current user is root. On Linux, `unzip` and similar tools may behave differently under root, and the ownership checks inside `ziextract` were not root-aware.

## Fix / Workaround

Upgrade Zinit to a version that includes the fix for issue #556/#557. The fix adds a root-user check inside `ziextract`.

If upgrading is not possible, avoid running Zinit-managed extractions as root. Instead, install as a regular user or pre-extract archives manually before Zinit processes them.

## Caveats

Running Zinit as root is generally discouraged. If you must use root, test with the latest Zinit version first.
