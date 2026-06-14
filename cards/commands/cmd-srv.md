---
id: cmd-srv
title: "Command: zi srv"
category: commands
tags: [command, annex]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-load, cmd-ice]
---

## Summary

Control a background service plugin — start, stop, restart, advance to the next Zsh instance, or quit it entirely. Services are plugins loaded with the `service` ice modifier.

## Syntax / Usage

```zsh
zi srv {service-id} [cmd]
```

Available commands:

| cmd | Effect |
|-----|--------|
| `start` | Start the service |
| `stop` | Stop the service |
| `restart` | Restart the service |
| `next` | Move the service to a different Zsh instance |
| `quit` | Terminate the service |

## Details

Services are plugins or snippets that run as long-lived background processes, managed by Zinit across Zsh instances. Only one Zsh instance runs a given service at a time. The `service` ice modifier marks a plugin as a service at load time. `srv` provides runtime control over that lifecycle.

## Examples

```zsh
# Stop a running service
zi srv my-service stop

# Restart a service
zi srv my-service restart

# Move service to another Zsh shell instance
zi srv my-service next
```

## See Also

- cmd-load
- cmd-ice
