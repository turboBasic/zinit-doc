---
id: ts-omz-migration-snippets
title: Migrating from oh-my-zsh to zinit snippets
category: troubleshooting
tags: [snippet, migration, plugin, completion]
source: https://github.com/zdharma-continuum/zinit/discussions/363
related: [ts-ohmyzsh-zinit-coexistence, ts-omz-lib-git-zsh-load, ts-omz-theme-git-errors]
---

## Summary

Oh-my-zsh plugins and libraries can be loaded via zinit's shorthand URIs (`OMZL::`, `OMZP::`, `OMZT::`) without installing OMZ itself. Single-file plugins load directly; multi-file plugins need `svn` ice.

## Question / Problem

Users migrating from oh-my-zsh want to use individual OMZ plugins without the full OMZ framework overhead.

## Answer / Solution

Zinit provides shorthands that expand to raw GitHub URLs for the OMZ repository:

| Shorthand | Expands to |
|-----------|-----------|
| `OMZ::` | `https://github.com/ohmyzsh/ohmyzsh/raw/master/` |
| `OMZL::` | `https://github.com/ohmyzsh/ohmyzsh/raw/master/lib/` |
| `OMZP::` | `https://github.com/ohmyzsh/ohmyzsh/raw/master/plugins/` |
| `OMZT::` | `https://github.com/ohmyzsh/ohmyzsh/raw/master/themes/` |

**Single-file plugins** (most plugins):

```zsh
zinit snippet OMZP::git
zinit snippet OMZP::dotenv
zinit snippet OMZP::rbenv
```

**Multi-file plugins** (need `svn` to clone the subdirectory):

```zsh
zinit ice svn
zinit snippet OMZP::gitfast

zinit ice svn
zinit snippet OMZP::osx
```

**Single-file completion snippets**:

```zsh
zinit ice as"completion"
zinit snippet OMZP::docker/_docker

zinit ice as"completion"
zinit snippet OMZP::fd/_fd
```

**Library files** (must include the `.zsh` extension):

```zsh
zinit snippet OMZL::git.zsh
zinit snippet OMZL::history.zsh
zinit snippet OMZL::completion.zsh
```

**Themes**:

```zsh
# Load required libs first, then theme
zinit snippet OMZL::git.zsh
zinit snippet OMZL::async_prompt.zsh
zinit snippet OMZP::git
zinit cdclear -q          # discard completions from git plugin

setopt promptsubst
zinit snippet OMZT::robbyrussell
```

## Caveats

`zinit cdclear -q` forgets all `compdef` calls collected up to that point. Use it after loading OMZ's git plugin if you don't want its completions to override your own git completions.
