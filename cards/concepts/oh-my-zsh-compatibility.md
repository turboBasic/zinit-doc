---
id: oh-my-zsh-compatibility
title: Oh My Zsh Compatibility
category: concepts
tags: [snippet, plugin, completion]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [plugins-vs-snippets, prezto-compatibility, completions-management, ice-modifiers-overview]
---

## Summary

Zinit loads Oh My Zsh libraries, plugins, and themes as snippets using `OMZ::`, `OMZL::`, `OMZP::`, and `OMZT::` shorthands, without requiring the full OMZ framework to be installed.

## Details

Zinit provides URL shorthands that expand to raw GitHub paths inside the OMZ repository:

| Shorthand | Expands to |
|---|---|
| `OMZ::` | `https://github.com/ohmyzsh/ohmyzsh/raw/master/` |
| `OMZL::` | `…/lib/` |
| `OMZP::` | `…/plugins/` |
| `OMZT::` | `…/themes/` |

**Libraries** are single `.zsh` files and load directly as snippets.

**Plugins** that consist of a single file also load as plain snippets. Plugins that span a subdirectory (e.g. `gitfast`, `osx`) require `zi ice svn` to download the whole directory via Subversion.

**Themes** typically require the OMZ `git` library to be loaded first, and many also need the OMZ `async_prompt` library. Most themes also require `setopt promptsubst`. Because OMZ plugins call `compdef`, run `zi cdclear -q` after loading the git plugin to avoid carrying its completions into the rest of the session.

**Single-file completions** (files whose names start with `_`) must be loaded with `zi ice as"completion"`.

Zinit's implementation is not OMZ-specific; it does not embed or depend on the OMZ framework — it simply downloads and sources the files.

## Examples

```zsh
# OMZ libraries
zi snippet OMZL::git.zsh
zi snippet OMZL::async_prompt.zsh

# OMZ plugin — single file
zi snippet OMZP::git
zi cdclear -q   # drop git plugin's compdefs if unwanted

# OMZ theme
setopt promptsubst
zi snippet OMZT::robbyrussell

# Multi-file plugin via SVN
zi ice svn
zi snippet OMZP::gitfast

# Single-file completion from a plugin directory
zi ice as"completion"
zi snippet OMZP::docker/_docker

# External theme (not in OMZ repo) — load as a plugin
zi snippet OMZL::git.zsh
zi snippet OMZP::git
zi cdclear -q
setopt promptsubst
zi light NicoSantangelo/Alpharized

# Multiple OMZ plugins at once
zi snippet OMZP::dotenv
zi snippet OMZP::rake
zi snippet OMZP::rbenv
```

## Caveats / Common Mistakes

- OMZ themes that show git info will print errors (`command not found: git_prompt_status`) if `OMZL::git.zsh` is not loaded first.
- Do not set `ZSH_THEME` — that variable is consumed by the OMZ framework which is not present. Source the theme file directly instead.
- `promptsubst` must be set before loading a theme, otherwise the prompt renders as a literal string (e.g. `$(build_prompt)`).
