---
id: cmd-recently
title: "zi recently"
category: commands
tags: [command, plugin, git]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-list-plugins, cmd-status, cmd-update]
---

## Summary

Show plugins that have been updated (had new commits) recently. Accepts a human-readable time specification to define the recency window.

## Syntax / Usage

```zsh
zi recently [time-spec]
```

- `time-spec` — a human-readable duration, e.g. `1 month`, `2 days`, `3 weeks`. Defaults to a short recent window if omitted.

## Details

Checks each plugin directory's git log and lists those that received new commits within the specified time range. Useful for staying aware of which tools have been actively updated without manually checking each repository. The time spec follows a natural-language format where number and unit can be combined.

## Examples

```zsh
# Show plugins updated in the last month
zi recently 1 month

# Show plugins updated in the last 2 days
zi recently 2 days

# Show plugins updated in the last week
zi recently 1 week
```

## See Also

- cmd-list-plugins
- cmd-status
- cmd-update
