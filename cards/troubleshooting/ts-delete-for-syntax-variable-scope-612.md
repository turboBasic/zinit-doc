---
id: ts-delete-for-syntax-variable-scope-612
title: "zinit delete uses wrong plugin names when using for-syntax"
category: troubleshooting
tags: [troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/612
related: [ts-delete-leaves-stale-state-622]
---

## Summary

When plugins are loaded with the `for`-syntax, running `zinit delete` used incorrect variable values (from the last iteration) instead of per-plugin values, deleting the wrong plugin or failing.

## Symptom

Using `zinit delete` after loading multiple plugins with `for`-syntax results in the wrong plugin being deleted, or all deletions targeting the last plugin in the `for` block.

## Cause

Variable scope was not properly isolated in the `delete` command's loop when processing `for`-syntax plugin lists. The loop variable leaked between iterations.

## Fix / Workaround

Update zinit (fixed in PR #612):

```zsh
zinit self-update
```

As a workaround, delete plugins individually by their full name:

```zsh
zinit delete @antonmedv/fx
zinit delete @sharkdp/bat
```

## Examples

```zsh
# This loading pattern exposed the bug
zinit from'gh-r' for \
  sbin'fx*->fx'  @antonmedv/fx \
  sbin'bat->bat' @sharkdp/bat

# Workaround: delete individually
zinit delete @antonmedv/fx
```
