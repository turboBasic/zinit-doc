---
id: notify
title: "Ice: notify''"
category: ices
tags: [ice, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [lucid, silent]
---

## Summary

`notify''` prints a custom message under the prompt after a plugin or snippet finishes
loading. On failure it always prints a warning with the return code.

## Syntax / Usage

```zsh
zi ice notify"message to show"
zi ice notify"!always show this"   # ! prefix: show even on success
zi ice notify""                    # empty: only notify on failure
```

## Details

When loading succeeds, the message is shown under the prompt. When loading fails, a
warning message and return code are shown regardless of what the ice value is.

If the value starts with `!`, the message is shown unconditionally (always, not only
on success).

An empty value (`notify""`) causes Zinit to stay silent on success but still warn on
failure.

## Examples

```zsh
# Print a message when a slow plugin finishes loading
zi ice wait lucid notify"my-plugin ready"
zi light user/my-plugin

# Only alert on errors
zi ice wait notify""
zi light user/might-fail-plugin
```

## See Also

- lucid
- silent
