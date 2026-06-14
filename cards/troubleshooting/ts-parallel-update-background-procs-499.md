---
id: ts-parallel-update-background-procs-499
title: zinit update --parallel leaves background processes after completion
category: troubleshooting
tags: [troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/499
related: []
---

## Summary
`zinit update --parallel` spawns background jobs that may not be fully reaped before the shell prompt returns, leaving them as zombies visible in `jobs`. This is a known behavior, not a data loss issue.

## Question / Problem
After `zinit update --parallel`, running `fg` or `jobs` showed lingering background processes. The user asked if this was normal.

## Answer / Solution
This is expected behavior. Zinit's parallel update uses zsh background jobs to update multiple plugins concurrently. The parent shell may return the prompt before all child jobs are fully reaped by the OS.

The background jobs complete on their own; running `wait` after `zinit update --parallel` will wait for all background jobs to finish:

```zsh
zinit update --parallel && wait
```

Alternatively, run the parallel update inside a subshell so the background jobs are scoped to it:

```zsh
(zinit update --parallel 40)
```

The number after `--parallel` controls the concurrency level (default is unset, meaning zinit picks a value; setting `40` runs up to 40 concurrent updates).

## Caveats
Running `zinit update --parallel` in a tmux pane or inside another shell and then exiting that shell will also clean up the background processes. The lingering processes are harmless.
