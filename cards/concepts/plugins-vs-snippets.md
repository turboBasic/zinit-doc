---
id: plugins-vs-snippets
title: Plugins vs Snippets
category: concepts
tags: [plugin, snippet, git]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [load-vs-light, github-syntax, oh-my-zsh-compatibility, prezto-compatibility]
---

## Summary

Plugins are Git repositories cloned from GitHub (or other hosts); snippets are single files sourced by direct URL or via shorthand aliases. Choosing between them depends on whether the content lives in a full repo or a standalone file.

## Details

**Plugins** are loaded with `zinit load` or `zinit light`. Zinit clones the repository with `git clone` and sources the appropriate entry-point file (matching `*.plugin.zsh`, `init.zsh`, or `*.zsh-theme`). Plugins are stored under `$ZINIT[PLUGINS_DIR]` and can be updated with `zinit update`.

**Snippets** are loaded with `zinit snippet`. Zinit downloads the file and caches it locally under `$ZINIT[SNIPPETS_DIR]`. Subsequent loads use the cache; pass `-f` to force a fresh download. Snippets support several URL shorthands:

| Shorthand | Expands to |
|---|---|
| `OMZ::` | `https://github.com/ohmyzsh/ohmyzsh/raw/master/` |
| `OMZL::` | `…/lib/` |
| `OMZP::` | `…/plugins/` |
| `OMZT::` | `…/themes/` |
| `PZT::` | `https://github.com/sorin-ionescu/prezto/tree/master/` |
| `PZTM::` | `…/modules/` |

When a snippet requires multiple files from a subdirectory, add `zi ice svn` to download the directory via Subversion rather than a single file.

Key behavioural differences:

- Several ices (`depth`, `from`, `bpick`, `ver`, `proto`, `cloneopts`, `pullopts`, `bindmap`, `trackbinds`, `wrap-track`) **do not work with snippets** because there is no Git repo involved.
- `svn` and `link` ices **do not work with plugins**.
- Snippets are cached; plugins are full clones — snippets are lighter for single-file content from known URLs.

## Examples

```zsh
# Plugin — full Git repo, load with reporting
zinit load zdharma-continuum/history-search-multi-word

# Plugin — fast load, no reporting
zinit light zsh-users/zsh-autosuggestions

# Snippet — raw URL
zinit snippet https://gist.githubusercontent.com/hightemp/5071909/raw/

# Snippet — OMZ shorthand
zinit snippet OMZL::git.zsh
zinit snippet OMZP::git
zinit snippet OMZT::robbyrussell

# Snippet — Prezto shorthand
zinit snippet PZTM::environment

# Multi-file snippet (subdirectory via SVN)
zi ice svn
zi snippet OMZP::gitfast

# Single-file completion snippet
zi ice as"completion"
zi snippet OMZP::docker/_docker
```

## Caveats / Common Mistakes

- Using `zi snippet OMZP::git` loads a single `git.plugin.zsh`; if the plugin contains multiple files or an `_*` completion, use `svn` or `as"completion"` as appropriate.
- Snippet cache is not automatically invalidated on remote changes; run `zinit update {URL}` or `zinit update --all` to refresh.
