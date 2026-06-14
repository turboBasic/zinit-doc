---
id: ts-zinit-update-broken-507
title: "zinit update produces no output and returns exit code 1"
category: troubleshooting
tags: [troubleshooting, git]
source: https://github.com/zdharma-continuum/zinit/issues/507
related: []
---

## Summary

`zinit update` and `zinit update --all --parallel` silently fail and return exit code 1 after a bad commit was introduced to the zinit codebase.

## Symptom

```
λ  zinit update --all --parallel
λ  zinit update
(no output, exit code 1)
```

The first run may complete but subsequent calls produce nothing.

## Cause

A regression in the update command logic caused it to exit early without producing output or updating plugins.

## Fix / Workaround

Update zinit to the version containing the fix from PR #508:

```zsh
# Pull manually since zinit update itself is broken
git -C "${ZINIT[BIN_DIR]}" pull
exec zsh
```

Then verify:

```zsh
zinit update
```

## Caveats

This was a transient regression affecting a specific version window. If `zinit update` is broken, a direct `git pull` in the zinit bin directory is the only recovery path.
