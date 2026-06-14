---
id: ts-snippet-force-flag-broken-746
title: "zinit snippet -f does not force re-download — cache not bypassed"
category: troubleshooting
tags: [troubleshooting, snippet, installation]
source: https://github.com/zdharma-continuum/zinit/issues/746
related: []
---

## Summary

`zinit snippet -f <URL>` is documented to bypass the cache and re-download the snippet, but instead it errors out with garbled output (`Setting up snippet: opt_-f,--force -f`), treating `-f` as part of the URL.

## Symptom

```
Setting up snippet: opt_-f,--force -f
```

The snippet is not re-downloaded. The cached version continues to be used.

## Cause

Argument parsing for the `-f`/`--force` flag in the `snippet` subcommand is broken; the flag is being concatenated into the snippet identifier rather than parsed as an option.

## Fix / Workaround

No fix available as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/746

Workarounds:
1. Use `zinit delete <URL>` to remove the cached snippet, then source `.zshrc` again to re-download.
2. Manually delete the cached file from `~/.local/share/zinit/snippets/` and restart the shell.
3. Use `zinit update <URL>` which correctly triggers a fresh download.

## Caveats

The snippet cache is stored in `ZINIT[SNIPPETS_DIR]` (default: `~/.local/share/zinit/snippets/`), not in `~/.cache/zinit`. `rm -rf ~/.cache/zinit` has no effect on snippet caching.
