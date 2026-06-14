---
id: pkg-github-issues
title: "Package: github-issues"
category: packages
tags: [package, plugin, git, installation]
source: https://github.com/zdharma-continuum/zinit-packages
related: [pkg-overview, pkg-github-issues-srv]
---

## Summary

Loads the `zdharma-continuum/zsh-github-issues` plugin, which subscribes to GitHub repositories and displays new-issue notifications under the shell prompt using zinit's `notify` ice.

## Syntax / Usage

```zsh
zi pack for github-issues
zi pack"compact-message" for github-issues
```

Available profiles: `default`, `compact-message`.

## Details

- Provides: in-prompt GitHub issue notifications via the `notify` ice; requires `github-issues-srv` (the companion service package) to be loaded for data collection.
- `default` profile ices: `git`, `lucid`, `on-update-of"~/.cache/zsh-github-issues/new_titles.log"`, `notify"New issue: $NOTIFY_MESSAGE"`, `atpull"%atclone"`.
- `compact-message` profile: identical ices but `notify` value is just `"$NOTIFY_MESSAGE"` (no `"New issue: "` prefix).
- The `on-update-of` ice triggers the notification check whenever the `new_titles.log` cache file changes (written by the `github-issues-srv` service).

## Examples

```zsh
# Notifications with "New issue:" prefix
zi pack for github-issues

# Notifications with compact message only
zi pack"compact-message" for github-issues
```

## Caveats / Common Mistakes

- This package only handles display; the `github-issues-srv` package must also be loaded to poll GitHub and write the log file.

## See Also

- [pkg-github-issues-srv](pkg-github-issues-srv.md) — companion service that polls GitHub
- [pkg-overview](pkg-overview.md) — how `zi pack` works
