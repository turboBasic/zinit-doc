---
id: turbo-mode
title: Turbo Mode
category: concepts
tags: [turbo, performance, lazy-loading]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [ice-modifiers-overview, zsh-startup-order, completions-management]
---

## Summary

Turbo mode defers plugin and snippet loading until after the first prompt is drawn, yielding 50–80% faster Zsh startup. It is activated by the `wait` ice modifier.

## Details

Without Turbo mode every plugin is sourced synchronously during `.zshrc` evaluation, blocking the prompt. With `wait''` (or `wait"0"`), Zinit schedules the load to happen asynchronously after the prompt appears. The shell becomes interactive immediately, and plugins load in the background within milliseconds.

`wait` accepts several forms:

- `wait` / `wait"0"` — load on the next event loop tick after the prompt.
- `wait"2"` — load 2 seconds after the prompt.
- `wait"[[ condition ]]"` / `wait"(( expr ))"` — load when the condition becomes true.
- `wait"!..."` — load and reset the prompt afterwards (so prompt plugins display correctly).

Because loaded plugins may print output below the prompt, the companion `lucid` ice suppresses the "Loaded …" confirmation message to keep the terminal clean.

Zinit is documented as the only plugin manager that provides Turbo mode, with benchmarks showing startup times up to 5× faster when many plugins are used. Performance gains become more pronounced as the number of deferred plugins grows.

## Examples

```zsh
# Minimal — load on next tick after prompt
zinit ice wait
zinit load zdharma-continuum/history-search-multi-word

# Load 2 seconds after prompt
zinit ice wait"2"
zinit load zdharma-continuum/history-search-multi-word

# Quiet load — suppress "Loaded …" message
zinit ice wait lucid
zinit load zdharma-continuum/history-search-multi-word

# Turbo with prompt reset (needed for prompt/theme plugins)
zinit ice wait"!" lucid
zinit load romkatv/powerlevel10k

# Snippet also supports Turbo
zinit ice wait
zinit snippet https://gist.githubusercontent.com/hightemp/5071909/raw/

# for-syntax with turbo and lucid
zinit lucid wait for \
  zsh-users/zsh-autosuggestions \
  zdharma-continuum/fast-syntax-highlighting
```

## Caveats / Common Mistakes

- Completions loaded in Turbo mode require a different `compinit` pattern — call `zicompinit` and `zicdreplay` inside an `atinit` or `atload` hook on the last completion-related plugin rather than calling `compinit` directly in `.zshrc`. See [completions-management](completions-management.md).
- Prompt/theme plugins loaded with `wait` must use `wait"!"` or `reset-prompt` ice so that the prompt re-renders after the plugin loads.
- Setting `ZINIT[OPTIMIZE_OUT_DISK_ACCESSES]=1` can shave ~10 ms more but skips the existence check — only safe after all plugins are already installed.
