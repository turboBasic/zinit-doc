---
id: ts-extract-skipped-on-update-780
title: "extract ice not applied during zinit update for gh-r plugins"
category: troubleshooting
tags: [ice, binary, troubleshooting, git]
source: https://github.com/zdharma-continuum/zinit/issues/780
related: [ts-ghr-no-assets-found-736]
---

## Summary

When `extract'!'` (or `extract'!!'`) is combined with `from'gh-r'`, running `zinit update` downloads a new release archive but does not extract it, leaving a raw `.tar.gz` or `.zip` in the plugin directory instead of the binary.

## Symptom

After `zinit update`, the expected executable is missing from the plugin directory and replaced by an unextracted archive file. The plugin appears broken until manually re-installed.

## Cause

PR #761 fixed double-extraction during installs by removing an inline extraction call, but accidentally removed extraction from the update path as well. The `∞zinit-extract-hook` that should run at `!atclone-pre` during updates was not triggered.

## Fix / Workaround

Update zinit to a version containing the fix from PR #780:

```zsh
zinit self-update
```

To recover a broken plugin without reinstalling:

```zsh
zinit delete username/repo
zinit load username/repo   # or re-source .zshrc
```

## Caveats

This bug was introduced by PR #761 (which itself fixed a different double-extraction bug). Both are fixed in the same release cycle.
