---
id: ts-times-load-moments-153
title: zinit times -a shows both plugin load duration and load moment
category: troubleshooting
tags: [performance, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/153
related: []
---

## Summary

`zinit times -a` prints both the moment at which each plugin started loading (relative to shell start) and the duration it took, giving a complete picture of startup timing.

## Symptom

Running `zinit times` without flags shows only load durations. Users trying to understand *when* in the startup sequence a plugin loads (e.g., which plugin is delaying the prompt) cannot tell from duration alone.

## Cause

Not a bug. The `-a` flag was contributed to expose both metrics simultaneously. Without it, only durations are shown.

## Fix / Workaround

Use the appropriate flag:

```zsh
zinit times       # load durations only
zinit times -m    # load moments only (relative to shell start)
zinit times -s    # durations in seconds
zinit times -a    # both duration and moment
```

Example output from `zinit times -a`:

```
Plugin loading times:
 -229 ms     7 ms - p10k-instant-prompt
 -220 ms     7 ms - zdharma-continuum/zinit-annex-bin-gem-node
  101 ms    33 ms - momo-la
```

The first column is the load moment (negative = before prompt), the second is the load duration.

## Caveats

Negative load moments indicate the plugin loaded before the first prompt was drawn (i.e., during synchronous startup). Positive values indicate Turbo-mode loads that fired after the prompt appeared.
