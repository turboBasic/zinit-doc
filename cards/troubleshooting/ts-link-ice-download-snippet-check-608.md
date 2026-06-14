---
id: ts-link-ice-download-snippet-check-608
title: "link ice not checked properly in snippet download function"
category: troubleshooting
tags: [ice, snippet, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/608
related: []
---

## Summary

The `link` ice was not checked correctly in the `.zinit-download-snippet` function, causing local snippets to be copied instead of symlinked even when `link` ice was specified.

## Symptom

When using `zinit ice link` with a local snippet path, Zinit copies the file to the snippets directory instead of creating a symlink. Changes to the source file are not reflected without running `zinit update`.

## Cause

A missing check for the `link` ice value inside `.zinit-download-snippet` caused the function to always fall through to the copy path.

## Fix / Workaround

Upgrade to a version that includes the fix for issue #608.

On older versions, avoid `link` ice and instead update local snippets by running `zinit update {snippet-id}` after modifying the source file, or source the file directly without Zinit managing it:

```zsh
# Direct source — always uses latest version, no caching
source ~/path/to/my-snippet.zsh
```

## Caveats

The `link` ice only applies to local file snippets (not URL-based ones) and does not work with plugins.
