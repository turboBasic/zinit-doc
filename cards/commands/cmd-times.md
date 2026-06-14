---
id: cmd-times
title: "Command: zi times"
category: commands
tags: [command, performance, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-zstatus, cmd-report, cmd-list-plugins]
---

## Summary

Print load times for each plugin and snippet. Use this to identify slow-loading plugins and guide Turbo mode tuning.

## Syntax / Usage

```zsh
zi times [-a] [-m] [-s]
```

- `-s` — print times in seconds (default is milliseconds).
- `-m` — show the loading moment (timestamp relative to shell start) for each plugin.
- `-a` — show both load times and loading moments.

## Details

Records are gathered at load time — each plugin's elapsed sourcing time is stored in memory. `times` reads that data and presents it per plugin/snippet. Turbo-loaded plugins show the time of their deferred load, not the time of shell startup. Sorting is not applied automatically; results appear in load order.

## Examples

```zsh
# Show load times (ms) in load order
zi times

# Show times in seconds
zi times -s

# Show times and loading moments
zi times -a
```

## See Also

- cmd-zstatus
- cmd-report
- cmd-list-plugins
