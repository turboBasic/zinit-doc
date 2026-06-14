---
id: pkg-github-issues-srv
title: "Package: github-issues-srv"
category: packages
tags: [package, plugin, git, installation]
source: https://github.com/zdharma-continuum/zinit-packages
related: [pkg-overview, pkg-github-issues]
---

## Summary

Loads the `zdharma-continuum/zsh-github-issues` repository as a background service that polls GitHub for new issues and writes results to a cache log, which the `github-issues` package reads for notifications.

## Syntax / Usage

```zsh
zi pack for github-issues-srv
```

One profile: `default`.

## Details

- Provides: a persistent background service (`service"GIT"`) that continuously monitors configured GitHub repositories and writes new issue titles to `~/.cache/zsh-github-issues/new_titles.log`.
- Profile ices: `git`, `lucid`, `service"GIT"`, `pick"zsh-github-issues.service.zsh"`, `atpull"%atclone"`.
- The `service` ice (from the `zinit-annex-service` annex) runs the picked script as a long-running background process managed by zinit.
- Must be paired with the `github-issues` package, which reads the log file and fires `notify` events.

## Examples

```zsh
# Load the service alongside the display plugin
zi pack for github-issues-srv
zi pack for github-issues
```

## Caveats / Common Mistakes

- Requires the `zinit-annex-service` annex to be loaded for the `service` ice to work.
- Without `github-issues` loaded, the service runs but notifications are never displayed.

## See Also

- [pkg-github-issues](pkg-github-issues.md) — the notification display plugin
- [pkg-overview](pkg-overview.md) — how `zi pack` works
