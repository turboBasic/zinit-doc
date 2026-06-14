---
id: service
title: "Ice: service''"
category: ices
tags: [ice, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [as]
---

## Summary

`service` marks a plugin or snippet as a Zinit service — a process that runs in the
background in a single Zsh instance across all open shells.

## Syntax / Usage

```zsh
zi ice service
zi light zdharma-continuum/zservice-transfer.sh
```

## Details

Services are managed by Zinit's service subsystem. Only one instance of a given service
runs at a time across all Zsh sessions. The service can be controlled via `zinit srv
{service-id} [stop|start|restart|next|quit]`.

See the [zservice-* repositories](https://github.com/orgs/zdharma-continuum/repositories?q=zservice-)
for available service plugins.

## Examples

```zsh
zi ice service
zi light zdharma-continuum/zservice-transfer.sh
```

## See Also

- as
