---
id: ts-update-parallel
title: Updating all plugins in parallel with zinit update --parallel
category: troubleshooting
tags: [performance, git]
source: https://github.com/zdharma-continuum/zinit/discussions/344
related: [ts-self-update-master-branch, ts-update-hook-not-found-errors]
---

## Summary

`zinit update --parallel` updates all plugins and snippets concurrently, significantly reducing update time compared to sequential updates.

## Question / Problem

Running `zinit update --all` on a large number of plugins can take a long time because plugins are updated sequentially. A faster approach is needed.

## Answer / Solution

```zsh
# Update all plugins and snippets in parallel (default job count)
zinit update --parallel

# Increase the number of concurrent jobs
zinit update --parallel 40
```

The default parallel job count is reasonable for most systems. Increase it on machines with fast I/O and good network.

**Other update commands:**

```zsh
# Update only zinit itself
zinit self-update

# Update a specific plugin
zinit update user/plugin

# Update a specific snippet
zinit update https://example.com/script.zsh

# Update all (sequential)
zinit update --all

# Quiet update
zinit update -q --all
```

## Caveats

Running many parallel git fetches can trigger GitHub rate limiting. If you see API rate limit errors, reduce the parallelism or wait a few minutes between updates. The `--parallel` flag is most beneficial for large setups (20+ plugins).
