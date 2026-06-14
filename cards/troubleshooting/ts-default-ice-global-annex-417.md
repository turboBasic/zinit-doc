---
id: ts-default-ice-global-annex-417
title: Using default-ice to set shared ices for multiple gh-r plugins
category: troubleshooting
tags: [ice, binary, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/417
related: [ts-completions-ice-overrides-null-417]
---

## Summary

`zinit default-ice` sets ices that apply to all subsequent `zinit load`/`zinit light`/`zinit snippet` calls until reset. This is useful when many plugins share a common set of ices (e.g. all gh-r programs), but ices that disable functionality (like `nocompletions`) propagate globally and need per-plugin overrides.

## Symptom

Typing out the same ices for every `gh-r` binary download is repetitive:

```zsh
zinit ice as"null" from"gh-r" lbin"!" lucid nocompile
zinit light tool1/foo

zinit ice as"null" from"gh-r" lbin"!" lucid nocompile
zinit light tool2/bar
```

## Fix / Workaround

Use `zinit default-ice` to set the shared ices once:

```zsh
# Requires zinit-annex-default-ice or built-in support
zinit default-ice --quiet as'null' from"gh-r" lbin'!' lucid nocompile

# Now each plugin load automatically gets the default ices
zinit light tool1/foo
zinit light tool2/bar

# Override for a specific plugin that needs completions
zinit ice completions
zinit light tool3/baz

# Reset defaults when done
zinit default-ice --reset
```

## Examples

```zsh
zinit default-ice --quiet as'null' from"gh-r" lbin'!' lucid nocompile

zinit for \
    sbin'fzf'    junegunn/fzf \
    sbin'rg'     BurntSushi/ripgrep \
    completions  sbin'bat' sharkdp/bat
```

## Caveats

`default-ice` is a feature of `zinit-annex-default-ice`. Check if the annex is loaded before using it. When using `as'null'`, completions are disabled globally — add `completions` ice explicitly for plugins that ship completion files.

## Quality Notes

Related: `ts-completions-ice-overrides-null-417` covers the specific problem of completions being silently skipped when `as'null'` is set as a default ice, and how the `completions` ice overrides it.
