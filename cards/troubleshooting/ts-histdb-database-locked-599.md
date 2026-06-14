---
id: ts-histdb-database-locked-599
title: "zsh-histdb 'database is locked' error on first command after shell start"
category: troubleshooting
tags: [plugin, turbo, troubleshooting, lazy-loading]
source: https://github.com/zdharma-continuum/zinit/issues/599
related: []
---

## Summary

The `zsh-histdb` plugin (SQLite-backed history) produces a "database is locked" error on the first command executed in a new shell when loaded with Turbo mode, because multiple Zsh instances try to open the database simultaneously at startup.

## Symptom

```
Error: stepping, database is locked (5)
History database ~/.histdb/zsh-history.db is using an older schema () and will be updated to version 2.
```

Appears only on the first command or pipeline after shell start. Does not recur in the same session.

## Cause

When Zinit loads `zsh-histdb` asynchronously (Turbo mode) and multiple Zsh instances start at the same time (e.g., opening several tabs at once), all instances try to write to the SQLite database concurrently. SQLite's default locking causes the "database is locked" error.

## Fix / Workaround

Load `zsh-histdb` without Turbo (synchronously) to avoid the race condition:

```zsh
# Load synchronously — avoid wait'' for histdb
zinit load larkery/zsh-histdb
```

Or add a small delay:

```zsh
zinit ice wait"1"
zinit load larkery/zsh-histdb
```

The error is cosmetic for most users — history is still recorded after the initial error.

## Caveats

This is a SQLite concurrency issue, not a Zinit bug. The `zsh-histdb` project has its own tracking for this class of problem.
