---
id: ts-completions-not-active-until-update-726
title: Completions from zsh-completions or OMZ lib not active until zinit update is run
category: troubleshooting
tags: [troubleshooting, completion, turbo, lazy-loading]
source: https://github.com/zdharma-continuum/zinit/issues/726
related: []
---

## Summary

Tab completion from `zsh-users/zsh-completions` or `OMZ::lib/completion.zsh` does not function in a fresh shell. Running `zinit update` sometimes (not always) fixes it for the current session.

## Symptom

Typing `cd sk<TAB>` does not complete to `cd Desktop`. Menu-selection mode (arrow-key completion menu) also fails. After `zinit update` the completions may start working, but the fix is not reliable.

## Cause

Under investigation. Likely a race condition in turbo-mode loading: completions are registered after `compinit` runs, so `$fpath` additions or `compdef` calls made by turbo-loaded plugins are not seen by the initial `compinit`. This is the standard turbo + completions setup issue — `cdreplay` and deferred `compinit` are required.

## Fix / Workaround

Follow the recommended turbo + completions pattern. Run `compinit` inside the `atload` of the last completion-related plugin, and replay recorded `compdef` calls:

```zsh
zinit lucid wait for \
    atload"zicompinit; zicdreplay" \
    blockf \
  zsh-users/zsh-completions
```

If loading `OMZ::lib/completion.zsh` as a snippet, ensure it loads before `compinit` or use `blockf` to prevent it from polluting `$fpath` directly.

## See Also

Track https://github.com/zdharma-continuum/zinit/issues/726
