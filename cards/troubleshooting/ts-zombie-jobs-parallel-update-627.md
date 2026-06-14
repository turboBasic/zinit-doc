---
id: ts-zombie-jobs-parallel-update-627
title: "zinit update --parallel leaves zombie background processes"
category: troubleshooting
tags: [troubleshooting, command, performance]
source: https://github.com/zdharma-continuum/zinit/issues/627
related: []
---

## Summary

After `zinit update --parallel` completes, orphaned child processes are left running. These can be observed via `fg` or `jobs`. A fix PR (#675) has been opened but not merged.

## Symptom

After running `zinit update --parallel`, running `jobs` shows leftover background processes. They can be foregrounded with `fg`. Shell exit in a nested shell is needed to fully clean up.

## Cause

The parallel update spawns background subshells that are not properly waited on or reaped when the update finishes. The job control cleanup logic is incomplete.

## Fix / Workaround

A fix is under review in PR #675. Track https://github.com/zdharma-continuum/zinit/issues/627

Workaround: run updates inside a subshell so zombies are cleaned up on subshell exit:

```zsh
(zinit update --parallel)
```

Or avoid `--parallel` and use sequential updates:

```zsh
zinit update --all
```
