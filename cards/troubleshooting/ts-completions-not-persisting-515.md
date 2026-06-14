---
id: ts-completions-not-persisting-515
title: Plugin completions installed but not available in new shell sessions
category: troubleshooting
tags: [completion, troubleshooting, turbo]
source: https://github.com/zdharma-continuum/zinit/discussions/515
related: []
---

## Summary
Completions installed by zinit plugins are only active after `compinit` is called. If `compinit` runs before the plugin's completion file is registered, new shells will not see the completions until `zinit compinit` is run manually or the config is corrected.

## Question / Problem
After installing a plugin with completions (starship), completions worked in the current shell but were absent in every new shell. `zinit completions` confirmed the completion was installed. Manually running `zinit compinit` in the new shell fixed it.

## Answer / Solution
The fix is to ensure `compinit` runs after all completion-defining plugins have loaded. In turbo mode, use `zicompinit` inside an `atload` hook on the last completion plugin:

```zsh
zinit for \
    atload"zicompinit; zicdreplay" \
    blockf \
    lucid \
    wait \
  zsh-users/zsh-completions
```

Without turbo mode, load all plugins first, then call `compinit`:

```zsh
zinit light starship/starship
# ... other plugins ...
autoload -Uz compinit
compinit
zinit cdreplay -q
```

## Caveats
If a system-level `compinit` call (e.g. from `/etc/zshrc` on Ubuntu) runs before zinit's plugins load, it will not see zinit-managed completions. Disable the system `compinit` in `~/.zshenv` with `skip_global_compinit=1`.
