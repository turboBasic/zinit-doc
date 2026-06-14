---
id: ts-omzp-snippet-needs-resource-656
title: Some OMZP snippets only work after manually re-sourcing .zshrc
category: troubleshooting
tags: [troubleshooting, snippet, turbo, lazy-loading]
source: https://github.com/zdharma-continuum/zinit/issues/656
related: []
---

## Summary

Certain OMZ plugins (e.g. `OMZP::man`) do not become active on the first shell open when loaded via zinit, but work correctly after `source ~/.zshrc` is run manually.

## Symptom

`ESC+man` (the `man` plugin shortcut) does nothing in a fresh shell. After `source ~/.zshrc`, the shortcut works. The plugin `OMZP::sudo` loads correctly under the same configuration.

## Cause

Under investigation. Likely a plugin-loading order issue where the `man` plugin registers a ZLE widget that is not available until after `compinit` runs, or the zle widget setup requires a second pass. May be related to turbo-mode timing.

## Fix / Workaround

No fix available as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/656

Try these workarounds:
1. Load the plugin without turbo mode (remove `wait`) to ensure synchronous loading.
2. Use `atload"zle -N zman; bindkey '^[m' zman"` if the plugin sets up ZLE widgets, to rebind after load.
3. Add `zinit cdreplay -q` after `compinit` to ensure all deferred setup runs.
