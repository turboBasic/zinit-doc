---
id: ts-prezto-migration
title: Migrating from Prezto to zinit snippets
category: troubleshooting
tags: [snippet, migration, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/377
related: [ts-omz-migration-snippets]
---

## Summary

Prezto modules can be loaded as zinit snippets using `PZTM::` shorthand. Multi-file modules need `svn` ice; modules with external dependencies need `atclone` to fetch them.

## Question / Problem

Users migrating from Prezto want to load individual modules without the full Prezto framework.

## Answer / Solution

Zinit provides shorthands for Prezto:

| Shorthand | Expands to |
|-----------|-----------|
| `PZT::` | `https://github.com/sorin-ionescu/prezto/tree/master/` |
| `PZTM::` | `https://github.com/sorin-ionescu/prezto/tree/master/modules/` |

**Single-file or simple modules:**

```zsh
zinit snippet PZTM::environment
zinit snippet PZTM::terminal
```

**Multi-file modules** (require `svn` to clone the subdirectory):

```zsh
zinit ice svn
zinit snippet PZTM::docker

zinit ice svn
zinit snippet PZTM::git
```

**Modules without a standard entry point** (no `*.plugin.zsh`, `init.zsh`, or `*.zsh-theme`):

```zsh
zinit ice svn as"null"
zinit snippet PZTM::archive
```

**Modules with external dependencies** (e.g. completion module needs zsh-completions):

```zsh
zinit ice \
    atclone"git clone --recursive https://github.com/zsh-users/zsh-completions.git external" \
    blockf \
    svn
zinit snippet PZTM::completion
```

## Caveats

Prezto `zstyle` settings can still be used alongside zinit snippets — zinit does not replace zstyle, it just manages loading. Set any required `zstyle ':prezto:*'` options before sourcing the module.
