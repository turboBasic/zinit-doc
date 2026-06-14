---
id: wait
title: "Ice: wait''"
category: ices
tags: [ice, turbo, lazy-loading, performance]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [lucid, turbo-mode, ice-order]
---

## Summary

`wait''` defers plugin loading until after the shell prompt is first displayed, enabling
turbo mode. It is the primary mechanism for achieving fast shell startup with Zinit.

## Syntax / Usage

```zsh
zi wait'' light zsh-users/zsh-syntax-highlighting

# Wait N seconds (float) after prompt
zi wait'1' light some/plugin

# Wait for a condition: zsh event or arbitrary expression
zi wait'[[ -n $TMUX ]]' light some/plugin
```

## Details

When `wait''` is set, the plugin is loaded asynchronously after the first prompt is
rendered. The empty string `wait''` is equivalent to `wait'0'` — zero-second defer,
meaning "as soon as the prompt is shown."

The value can be:
- An integer or float: seconds to wait after the prompt
- A zsh conditional expression in `[[...]]`: loading is deferred until the expression
  is true, checked on each `precmd` hook
- An event name prefixed with `!`: loading triggers on that zsh event

Order of loading among `wait''` plugins is determined by the order they appear in the
config and by their wait value.

`wait''` is the defining feature of **turbo mode**. Without it, all plugins load
synchronously before the first prompt.

## Examples

```zsh
# Typical turbo block: defer syntax highlighting and autosuggestions
zi wait'' lucid light zsh-users/zsh-syntax-highlighting
zi wait'' lucid light zsh-users/zsh-autosuggestions

# Load only inside tmux sessions
zi wait'[[ -n $TMUX ]]' lucid light tmux/plugin
```

## Caveats / Common Mistakes

- Plugins that set key bindings (e.g. fzf tab completion) must have their bindings
  re-applied after loading; use the `atload''` ice for this.
- Completions added by a `wait''`-deferred snippet may not be available until the next
  prompt cycle; pair with `lucid` to suppress the loading message.
- Avoid `wait''` on plugins that define functions needed during `.zshrc` evaluation
  (e.g. theme loading). Those should load synchronously.

## See Also

- lucid
- turbo-mode
- atload
