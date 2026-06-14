---
id: as
title: "Ice: as''"
category: ices
tags: [ice, command, completion, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [pick, from, nocompletions, sbin, fbin]
---

## Summary

`as''` changes how Zinit treats the loaded plugin or snippet — as a program added to
`$PATH`, as a completion file, or as null (no sourcing, no completions).

## Syntax / Usage

```zsh
zi ice as"program"     # also: as"command"
zi ice as"completion"
zi ice as"null"
```

## Details

Three values are supported:

- `as"program"` (alias `as"command"`): the plugin directory (or the file selected by
  `pick''`) is added to `$PATH` instead of being sourced. Use `pick''` to point at the
  specific binary when the repo contains multiple executables.

- `as"completion"`: treats the plugin or snippet as a completion-only resource. Zinit
  looks for underscore-prefixed files (`_*`) and installs them as completions. Useful
  for single-file completion snippets.

- `as"null"`: shorthand for `pick"/dev/null" nocompletions`. Disables both sourcing
  and completion installation. Handy when a plugin is used purely for its side-effects
  via `atclone''`/`atload''` hooks, or when using `sbin''` to expose binaries without
  sourcing anything.

## Examples

```zsh
# Binary from GitHub Releases added to $PATH
zi ice from"gh-r" as"program"
zi light junegunn/fzf

# Single-file completion snippet
zi ice as"completion"
zi snippet OMZP::docker/_docker

# Load git extensions without sourcing anything
zi as'null' lucid sbin wait'1' for \
  Fakerr/git-recall \
  tj/git-extras
```

## Caveats / Common Mistakes

- `as"program"` and `pick''` are complementary: `as"program"` adds the directory to
  `$PATH`; `pick''` selects which file within that directory to expose.
- `as"null"` disables completions — add `completions` ice to re-enable them if needed.

## See Also

- pick
- from
- sbin
- nocompletions
