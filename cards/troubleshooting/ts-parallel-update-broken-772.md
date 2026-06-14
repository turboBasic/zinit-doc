---
id: ts-parallel-update-broken-772
title: "zinit update --parallel falls through to sequential update"
category: troubleshooting
tags: [troubleshooting, performance]
source: https://github.com/zdharma-continuum/zinit/issues/772
related: []
---

## Summary

`zinit update --parallel` silently degrades to sequential updates because a `local -A OPTS` declaration inside `.zinit-update-or-status-all()` shadows the caller's `OPTS` associative array that holds the `--parallel` flag.

## Symptom

Running `zinit update --parallel` updates plugins one after another (sequentially) using the plain update visual style instead of the parallel progress display. Update speed is several times slower than expected.

## Cause

A refactor introduced `local -A OPTS` inside the update function to silence self-update output. This re-declaration shadowed the caller's `OPTS` hash (populated by `.zinit-parse-opts` with `opt_-p,--parallel=1`), so the parallel check always evaluated to false.

## Fix / Workaround

Update zinit to a version containing the fix from PR #774:

```zsh
zinit self-update
```

The fix saves and restores the quiet key rather than redeclaring the entire `OPTS` array as local.

## Caveats

This regression was introduced by commit 95ba7d1d and affects all versions between that commit and the PR #774 fix.
