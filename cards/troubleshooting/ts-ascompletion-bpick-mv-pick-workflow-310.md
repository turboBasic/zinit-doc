---
id: ts-ascompletion-bpick-mv-pick-workflow-310
title: as"completion" with gh-r download requires both mv and pick to work
category: troubleshooting
tags: [ice, completion, binary, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/310
related: [ts-ascompletion-bpick-needs-mv-pick-310]
---

## Summary
When using `as"completion"` together with `from"gh-r"` and `bpick` to download a completion file from GitHub releases, the completion is not installed unless both `mv` (to rename to `_name`) and `pick` (to point zinit at the file) ices are also specified.

## Symptom
With `as"completion" from"gh-r" bpick"completions_zsh"`, the completion file is downloaded but not linked into zinit's completions directory. Tab completion for the tool does not work.

## Cause
`as"completion"` triggers zinit's completion management only when `pick` points to a file starting with `_`. The downloaded file name (`completions_zsh`) does not start with `_`, so zinit does not recognize it as a completion file. The `mv` ice must rename it, and `pick` must reference the renamed file.

## Fix / Workaround
Always combine `as"completion"` + `from"gh-r"` + `bpick` with explicit `mv` and `pick`:

```zsh
zi ice from"gh-r" as"completion" \
       bpick"completions_zsh" \
       mv"completions_zsh -> _tldr" \
       pick"_tldr"
zi light dbrgn/tealdeer
```

The `pick` value must start with `_` for zinit to treat it as a completion file when `as"completion"` is set.

## Examples

```zsh
# Full working recipe for tealdeer completions from gh-r
zi ice from"gh-r" as"completion" bpick"completions_zsh" mv"completions_zsh -> _tldr" pick"_tldr"
zi light dbrgn/tealdeer
```
