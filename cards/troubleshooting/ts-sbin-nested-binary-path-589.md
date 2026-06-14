---
id: ts-sbin-nested-binary-path-589
title: "sbin not finding binary: archive unpacks into a versioned subdirectory"
category: troubleshooting
tags: [binary, ice, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/589
related: []
---

## Summary
When a GitHub release archive unpacks into a versioned subdirectory (e.g. `atuin-v17.0.1-x86_64-unknown-linux-gnu/`), `sbin"atuin"` will not find the binary because it only looks in the plugin root. Use a glob to match across subdirectories.

## Question / Problem
After installing `atuinsh/atuin` with `bpick "atuin*linux-gnu.tar.gz" sbin "atuin"`, the binary was not found. The plugin directory contained only `atuin-v17.0.1-x86_64-unknown-linux-gnu/` with the binary inside.

```zsh
zinit ice as"program" from"gh-r" \
    bpick "atuin*linux-gnu.tar.gz" \
    sbin "atuin"
zinit light atuinsh/atuin
```

## Answer / Solution
Use `**/atuin` in the `sbin` ice to search recursively for the binary:

```zsh
zinit ice as"null" from"gh-r" \
    bpick "atuin*linux-gnu.tar.gz" \
    sbin "**/atuin"
zinit light atuinsh/atuin
```

Or flatten the archive with the `extract"!"` ice (one level of directory stripping):

```zsh
zinit ice as"null" from"gh-r" \
    bpick "atuin*linux-gnu.tar.gz" \
    extract"!" \
    sbin "atuin"
zinit light atuinsh/atuin
```

## Caveats
The `**` glob in `sbin` requires the `zinit-annex-bin-gem-node` annex. Without it, `sbin` is not available at all. Confirm the annex is loaded before using `sbin`.
