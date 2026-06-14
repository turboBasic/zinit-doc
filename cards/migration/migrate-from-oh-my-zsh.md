---
id: migrate-from-oh-my-zsh
title: Migrate from Oh My Zsh
category: migration
tags: [migration, snippet, plugin, completion]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [oh-my-zsh-compatibility, plugins-vs-snippets, completions-management]
---

## Summary

Replace `plugins=(...)` and `ZSH_THEME=` in your `.zshrc` with equivalent `zi snippet OMZP::` and `zi snippet OMZT::` calls, loading only what you actually use.

## Syntax / Usage

```zsh
# OMZ shorthands
zinit snippet OMZ::<path>   # raw path from repo root
zinit snippet OMZL::<file>  # lib/<file>
zinit snippet OMZP::<name>  # plugins/<name>
zinit snippet OMZT::<name>  # themes/<name>
```

## Details

Oh My Zsh stores libraries in `lib/`, plugins in `plugins/`, and themes in `themes/`. Zinit's shorthands map directly to those paths via raw GitHub URLs, so no OMZ installation is required.

**Migration strategy:**

1. Remove the OMZ bootstrap (`source $ZSH/oh-my-zsh.sh`, `ZSH=...`, etc.) from `.zshrc`.
2. Replace `ZSH_THEME="name"` with explicit snippet loads (see examples).
3. Replace each entry in `plugins=(...)` with a `zi snippet OMZP::` call.
4. Add `setopt promptsubst` if loading a theme.
5. Load `OMZL::git.zsh` and `OMZL::async_prompt.zsh` before any theme that references OMZ git functions.

**Plugins with multiple files** need `zi ice svn` to download the whole subdirectory. Examples: `gitfast`, `osx`.

**Single-file completions** (files starting with `_`) need `zi ice as"completion"`. Examples: `docker/_docker`, `fd/_fd`.

**After loading the git plugin**, run `zi cdclear -q` if you don't want its completions to interfere with others.

## Examples

```zsh
# Old OMZ .zshrc
ZSH_THEME="robbyrussell"
plugins=(git dotenv rake rbenv ruby)

# New Zinit .zshrc
zi snippet OMZL::git.zsh
zi snippet OMZL::async_prompt.zsh
zi snippet OMZP::git
zi cdclear -q        # drop git plugin compdefs if desired

setopt promptsubst
zi snippet OMZT::robbyrussell

zi snippet OMZP::dotenv
zi snippet OMZP::rake
zi snippet OMZP::rbenv
zi snippet OMZP::ruby

# Multi-file plugin
zi ice svn
zi snippet OMZP::gitfast

# Completion-only plugin
zi ice as"completion"
zi snippet OMZP::docker/_docker

# External theme not in OMZ
zi snippet OMZL::git.zsh
zi snippet OMZP::git
zi cdclear -q
setopt promptsubst
zi light NicoSantangelo/Alpharized
```

## Caveats / Common Mistakes

- Themes will show `command not found: git_prompt_status` if `OMZL::git.zsh` is not loaded first.
- Do not keep `ZSH_THEME=` set — it is consumed by the OMZ framework which is no longer present.
- `setopt promptsubst` must appear before the theme snippet; without it, the prompt renders as `$(build_prompt)` literally.
