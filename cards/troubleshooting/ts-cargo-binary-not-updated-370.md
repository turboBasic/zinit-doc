---
id: ts-cargo-binary-not-updated-370
title: Cargo-installed binaries not rebuilt on zinit update
category: troubleshooting
tags: [binary, annex, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/370
related: []
---

## Summary
When using `z-a-rust` to install Cargo crates via zinit, `zi update` does not rebuild them unless the plugin directory is deleted, because zinit skips the `cargo install` step if no new git commits are detected.

## Question / Problem
The user installed `fd`, `bat`, and `rg` via the `cargo''` ice and found that `zi update` updated the plugin record but did not re-run `cargo install` to pick up newer crate versions:

```zsh
zinit ice id-as'nullcargo' cargo'fd <- !E:fd-find -> fd;rg <- !E:ripgrep -> rg;!E:bat -> bat'
zinit load zdharma-continuum/null
```

## Answer / Solution
The `zdharma-continuum/null` pseudo-plugin has no real git history to pull, so zinit sees "no new commits" and skips the hook. To force a rebuild:

1. Delete the plugin directory to trigger a fresh install:
   ```zsh
   zinit delete nullcargo
   zinit load zdharma-continuum/null  # re-specify ices first
   ```

2. Or use `run-atpull` ice to always re-run hooks regardless of new commits:
   ```zsh
   zinit ice id-as'nullcargo' run-atpull \
       cargo'fd <- !E:fd-find -> fd;rg <- !E:ripgrep -> rg;!E:bat -> bat'
   zinit load zdharma-continuum/null
   ```

## Caveats
`run-atpull` will re-run `cargo install` on every `zi update`, which can be slow. Consider setting this only for packages you actively want to keep at the latest crate version.
