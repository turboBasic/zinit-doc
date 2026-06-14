---
id: ts-snippet-only-loads-once-646
title: "zi snippet OMZP::git loads correctly only on first install"
category: troubleshooting
tags: [snippet, completion, troubleshooting, migration]
source: https://github.com/zdharma-continuum/zinit/discussions/646
related: []
---

## Summary
If an OMZ plugin snippet appears to work only on first download and fails on subsequent shells, the most common cause is `compinit` running before zinit replays the cached snippet's compdefs.

## Question / Problem
`zi snippet OMZP::git` worked when first downloaded but stopped providing completions in subsequent shells. The issue did not occur with `zplug`.

## Answer / Solution
The snippet is cached correctly, but its `compdef` calls need to be replayed after `compinit`. Ensure `zinit cdreplay` runs after `compinit`:

```zsh
zinit snippet OMZP::git

autoload -Uz compinit
compinit
zinit cdreplay -q
```

In turbo mode, `zicdreplay` inside the `atload` hook of the last completion plugin handles this:

```zsh
zinit for \
    atload"zicompinit; zicdreplay" \
    blockf \
    lucid wait \
  zsh-users/zsh-completions
```

Also ensure there is no stale `.zcompdump` that predates zinit managing the completions:
```zsh
rm ~/.zcompdump* && exec zsh
```

## Caveats
OMZ plugins that define completions with `compdef` require `cdreplay` to re-run those definitions after `compinit` is called. Without `cdreplay`, zinit's intercepted `compdef` calls are never replayed and completions from OMZ plugins are absent.
