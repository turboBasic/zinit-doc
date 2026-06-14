---
id: plugin-report
title: Plugin Reports and Session Tracking
category: concepts
tags: [plugin, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [load-vs-light, zsh-startup-order, ice-modifiers-overview]
---

## Summary

`zinit report` tracks everything a plugin modifies — aliases, functions, bindkeys, completions, variables, `$PATH`/`$FPATH` — and `zinit times` shows per-plugin load durations, making it easy to audit and debug a plugin setup.

## Details

When a plugin is loaded with `zinit load` (not `zinit light`), Zinit enters investigation mode and records all changes the plugin makes to the shell environment:

- Aliases defined/modified
- Functions defined
- Bindkeys registered (`bindkey` calls)
- Zle widgets created
- Zstyles set
- Completions installed
- Variables set
- `$PATH` and `$FPATH` entries added

This data is stored per-plugin and can be retrieved at any time with `zinit report {plugin}` or `zinit report --all`. It is also used by `zinit unload` to undo a plugin's effects.

**Session tracking** (`dtrace`/`dstart`, `dstop`, `dreport`, `dunload`) works similarly but for interactive commands run in the current shell session rather than for a specific plugin.

**Load times** are available via `zinit times [-s] [-m] [-a]`:

- `-s` — display times in seconds
- `-m` — show the moment each plugin was loaded (wall-clock time from shell start)
- `-a` — show both times and loading moments

**Statistics** overview: `zinit zstatus` prints a brief summary of the Zinit installation (version, plugin count, etc.).

**Other reporting commands:**

- `zinit list-plugins [keyword]` — list loaded plugins, optionally filtered.
- `zinit list-snippets` — list cached snippets (requires `tree`).
- `zinit recently [time-spec]` — show plugins updated recently (e.g. `zinit recently 1 week`).
- `zinit status {plg-spec}` — git status for a plugin or svn status for a snippet.
- `zinit bindkeys` — show bindkeys registered by all plugins.

## Examples

```zsh
# Load with full reporting enabled
zinit load zdharma-continuum/history-search-multi-word

# View the report
zinit report zdharma-continuum/history-search-multi-word

# View reports for all plugins
zinit report --all

# See load times
zinit times

# Show times in seconds with loading moments
zinit times -s -m

# Trace an interactive session
zinit dtrace
# ... run some commands ...
zinit dstop
zinit dreport

# Unload a plugin (reverting its environment changes)
zinit unload zdharma-continuum/history-search-multi-word
```

## Caveats / Common Mistakes

- `zinit light` loads a plugin without any investigation, so `zinit report` will show no data for it and `zinit unload` will not work.
- `zinit unload` can only revert changes that were recorded during `load`; changes made by external processes or the interactive session itself are not tracked.
