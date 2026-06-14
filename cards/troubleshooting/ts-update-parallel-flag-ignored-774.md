---
id: ts-update-parallel-flag-ignored-774
title: "zinit update --parallel falls through to sequential code path"
category: troubleshooting
tags: [command, troubleshooting, performance]
source: https://github.com/zdharma-continuum/zinit/issues/774
related: []
---

## Summary

`zinit update --parallel` silently runs sequentially after a refactor introduced a `local -A OPTS` declaration that shadowed the caller's OPTS array containing the `--parallel` flag.

## Symptom

Running `zinit update --parallel` or `zinit update --parallel 40` completes without error but does not run parallel jobs — updates proceed one at a time.

## Cause

A `local -A OPTS` declaration inside `.zinit-update-or-status-all()` shadows the caller's associative array that was populated by `.zinit-parse-opts` with `opt_-p,--parallel=1`. The parallel check always evaluates to false.

## Fix / Workaround

Upgrade to a version that includes the fix (commit after #774 merged). The fix saves and restores only the quiet key rather than redeclaring the entire `OPTS` hash:

```zsh
local _saved_quiet=${OPTS[opt_-q,--quiet]:-0}
OPTS[opt_-q,--quiet]=1
# ... self-update call ...
OPTS[opt_-q,--quiet]=$_saved_quiet
```

As a workaround on unfixed versions, run individual plugin updates manually or use `zinit update --all` without `--parallel`.
