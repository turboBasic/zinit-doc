---
id: recipe-hugo
title: "Hugo"
category: recipes
tags: [recipe, binary, command, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs the Hugo static site generator from a GitHub release binary and adds it to `$PATH`.

## Syntax / Usage

```zsh
zi for \
    as"program" \
    from"gh-r" \
  @gohugoio/hugo
```

## Details

- `from'gh-r'` — downloads the release archive from GitHub Releases.
- `as'program'` — adds the extracted binary to `$PATH` instead of sourcing it as a plugin.

No shim or annex is required for this recipe; `as'program'` with Zinit's built-in PATH management is sufficient.

## Examples

```zsh
zi for \
    as"program" \
    from"gh-r" \
  @gohugoio/hugo
```
