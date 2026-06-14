---
id: ts-bindmap-multi-key-binding-733
title: bindmap only remaps the first key when a plugin binds multiple keys in one bindkey call
category: troubleshooting
tags: [troubleshooting, ice, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/733
related: []
---

## Summary

When a plugin calls `bindkey` with multiple key-sequence/widget pairs in a single invocation, zinit's `bindmap` ice only inspects the first pair and ignores the rest, so remapping any key beyond the first has no effect.

## Symptom

Using `bindmap"\\e[1;2C -> hold"` with a plugin like `marlonrichert/zsh-edit` that binds several keys at once (e.g. `bindkey '^[f' forward-shell-word '^[[1;3C' forward-shell-word ...`) remaps only `^[f` successfully. All other sequences in the same `bindkey` call are not remapped.

## Cause

The `bindmap` tracking code iterates over recorded `bindkey` calls but only processes the first key-action pair per call, not all pairs when multiple are specified on one line.

## Fix / Workaround

No fix available as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/733

Workaround: after the plugin loads, manually call `bindkey` in `atload''` to set the desired bindings, overriding whatever the plugin set:

```zsh
zinit ice trackbinds atload'bindkey "^[[1;2C" my-widget'
zinit light marlonrichert/zsh-edit
```
