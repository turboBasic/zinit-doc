---
id: ts-at-prefix-repo-spec-662
title: "@ prefix in zinit repo spec: what it means"
category: troubleshooting
tags: [ice, plugin, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/662
related: []
---

## Summary
The `@` prefix in a zinit repo spec (e.g. `@sharkdp/fd`) disables zinit's completion auto-detection for that plugin. Without `@`, zinit may try to source completion files; with `@`, it treats the repo as a binary-only install.

## Question / Problem
The wiki showed two forms for the same plugin:
- `@sharkdp/fd`
- `sharkdp/fd`

The user asked what the difference was.

## Answer / Solution
The `@` prefix tells zinit to treat the plugin as a "command" (binary) plugin and skip auto-detection of plugin scripts. It is equivalent to adding `pick"/dev/null"` — zinit will not try to source any `.zsh` or `.plugin.zsh` files from the repo.

Use `@` when:
- The repo contains only a binary (no zsh plugin files).
- You are using `sbin`, `as"null"`, or similar binary-management ices.
- You want to suppress the "no plugin script found" warning.

Example where both forms work identically when combined with `as"null"`:

```zsh
zinit as"null" from"gh-r" sbin"**/fd" @sharkdp/fd  # explicit: skip script detection
zinit as"null" from"gh-r" sbin"**/fd" sharkdp/fd   # as"null" already disables sourcing
```

## Caveats
When `as"null"` is used, the `@` prefix is redundant because `as"null"` already sets `pick"/dev/null"`. The `@` form is more useful when `as"null"` is omitted but script detection should still be skipped.
