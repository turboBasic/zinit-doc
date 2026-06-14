---
id: ts-times-flag-actual-time-223
title: Show plugin load moments alongside load times with "zinit times -a"
category: troubleshooting
tags: [command, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/223
related: []
---

## Summary

`zinit times` shows how long each plugin took to load, but not when during startup it was loaded. The `-a` flag adds load moment (offset from shell start) to the output.

## Symptom

`zinit times` output lacks the relative start offset, making it hard to understand the overall startup timeline.

## Fix / Workaround

Pass the `-a` flag to see both the load moment and load duration:

```zsh
zinit times -a
```

## Examples

```zsh
$ zi times -a
Plugin loading times:
 -229 ms     7 ms - p10k-instant-prompt
 -220 ms     7 ms - zdharma-continuum/zinit-annex-bin-gem-node
 -215 ms     5 ms - zdharma-continuum/zinit-annex-default-ice
 -127 ms    47 ms - romkatv/powerlevel10k
  -80 ms    36 ms - archey
```

The first column is the load moment (negative offset from shell ready), the second is the load duration.
