---
id: cmd-snippet
title: "zi snippet"
category: commands
tags: [command, snippet, installation, migration]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-load, cmd-light, cmd-ice, cmd-cdreplay, cmd-update]
---

## Summary

Source a local or remote file directly by URL. Use this to load single-file scripts, Oh My Zsh library files, Prezto modules, or any raw Zsh file without treating it as a full plugin repository.

## Syntax / Usage

```zsh
zi snippet [-f] {url|shorthand}
```

- `-f` — force redownload, bypass the local cache.

Supported shorthands (expand to raw GitHub URLs automatically):

| Shorthand | Expands to |
|-----------|-----------|
| `OMZ::` | `https://github.com/ohmyzsh/ohmyzsh/raw/master/` |
| `OMZL::` | OMZ `lib/` |
| `OMZP::` | OMZ `plugins/` |
| `OMZT::` | OMZ `themes/` |
| `PZT::` | `https://github.com/sorin-ionescu/prezto/tree/master/` |
| `PZTM::` | Prezto `modules/` |

## Details

Downloaded snippets are cached in `$ZINIT[SNIPPETS_DIR]` (default: `~/.local/share/zinit/snippets`). On subsequent shell starts Zinit sources from the cache rather than re-fetching. Use `-f` or `zi update {URL}` to refresh the cache. When using the `svn` ice, an entire subdirectory can be cloned via Subversion (useful for multi-file OMZ plugins). The `as"completion"` ice tells Zinit to treat the sourced file as a completion function rather than a script to source.

## Examples

```zsh
# Raw URL
zi snippet https://gist.githubusercontent.com/hightemp/5071909/raw/

# Oh My Zsh library and plugin
zi snippet OMZL::git.zsh
zi snippet OMZP::git

# Oh My Zsh theme
zi snippet OMZT::robbyrussell

# Prezto module
zi snippet PZTM::environment

# Multi-file OMZ plugin via SVN
zi ice svn
zi snippet OMZP::gitfast

# Single-file completion snippet
zi ice as"completion"
zi snippet OMZP::docker/_docker
```

## Caveats / Common Mistakes

Shorthands like `svn` and `cloneopts` do not work with snippets — they are plugin-only ices. If a snippet silently loads stale content, use `-f` to force a fresh download.

## See Also

- cmd-load
- cmd-ice
- cmd-cdreplay
- cmd-update
