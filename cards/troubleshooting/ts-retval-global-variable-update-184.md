---
id: ts-retval-global-variable-update-184
title: retval global variable pollution during non-parallel zinit update
category: troubleshooting
tags: [troubleshooting, git]
source: https://github.com/zdharma-continuum/zinit/issues/184
related: []
---

## Summary

In non-parallel `zinit update`, the `retval` variable was declared at global scope, leaking into the shell environment and potentially clobbering any user variable with the same name.

## Symptom

After running `zinit update` (non-parallel), a `retval` variable appears in the shell environment unexpectedly, or an existing `retval` variable is overwritten.

## Cause

The autoload function that runs non-parallel updates declared `retval` without `local`, making it a global. Parallel update paths already used a local variable; the non-parallel path was inconsistent.

## Fix / Workaround

Update zinit to a version that includes PR #184. The fix declares `retval` as `local` in the non-parallel update path.
