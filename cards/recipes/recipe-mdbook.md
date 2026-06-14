---
id: recipe-mdbook
title: "Recipe: mdBook"
category: recipes
tags: [recipe, binary, command, completion, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs `mdbook` (a Markdown-to-book tool similar to Gitbook) from a GitHub release binary and generates its Zsh completion file on clone.

## Syntax / Usage

```zsh
zi for \
  as'completions' \
  atclone'mdbook completions zsh > _mdbook' \
  sbin \
  @rust-lang/mdBook
```

## Details

- `as'completions'` — marks the plugin as providing a completion file rather than a script to source.
- `atclone'mdbook completions zsh > _mdbook'` — generates the `_mdbook` Zsh completion file after the initial download.
- `sbin` — creates a shim for the binary with the name derived from the repository (requires `zinit-annex-bin-gem-node`).

Note: `from'gh-r'` is not explicitly set here; Zinit defaults to GitHub. The release binary must already be present in the plugin directory for `mdbook completions` to run; ensure the binary is in the downloaded archive.

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zi for \
  as'completions' \
  atclone'mdbook completions zsh > _mdbook' \
  sbin \
  @rust-lang/mdBook
```
