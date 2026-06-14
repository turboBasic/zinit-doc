---
id: ts-update-triggers-self-update-676
title: "zinit update --all runs self-update instead of updating plugins"
category: troubleshooting
tags: [troubleshooting, command, installation]
source: https://github.com/zdharma-continuum/zinit/issues/676
related: []
---

## Summary

Running `zinit update --all --parallel 30 --reset --quiet` from `.zshrc` triggers `[self-update]` instead of updating plugins and snippets.

## Symptom

```
[self-update] updating zinit repository
[self-update] fetching latest changes from main branch
```

Expected behavior: update all plugins and snippets (not zinit itself).

## Cause

Under investigation. Likely a flag-parsing issue where certain flag combinations cause the `update` subcommand to fall through to `self-update` logic. Possibly the `--reset` flag is being misinterpreted.

## Fix / Workaround

No fix available as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/676

Workaround: run plugin updates and self-update as separate commands:

```zsh
zinit self-update
zinit update --all --parallel --quiet
```

Avoid placing `zinit update` in `.zshrc` as it runs on every shell open; prefer a dedicated alias or scheduled cron/launchd job instead.
