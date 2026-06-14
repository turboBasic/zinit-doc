---
id: ts-completions-ice-overrides-asnull-417
title: Completions not installed when using as'null' default-ice
category: troubleshooting
tags: [completion, ice, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/417
related: []
---

## Summary

When `as'null'` is set as a default ice (e.g. via `zinit default-ice`), completion detection is disabled globally. Individual plugins that provide completions need the `completions` ice to override this and re-enable completion installation.

## Symptom

Setting global defaults for gh-r downloads:

```zsh
zinit default-ice --quiet as'null' from"gh-r" lbin'!' lucid nocompile
```

Then loading a CLI tool that ships a completion file — the completion is never installed. `zinit csearch` shows no completions for the plugin.

## Cause

`as'null'` is a shorthand for `pick"/dev/null" nocompletions`. The `nocompletions` portion globally disables completion detection. Plugins loaded under this default ice do not have their completion files installed.

## Fix / Workaround

Add the `completions` ice to individual plugins that should have their completions installed. The `completions` ice explicitly overrides `nocompletions` (and `as'null'`):

```zsh
zinit default-ice --quiet as'null' from"gh-r" lbin'!' lucid nocompile

# completions ice re-enables completion detection for this plugin
zinit ice completions
zinit light some-org/jira-cli
```

Or override the default-ice entirely for that plugin:

```zsh
zinit ice as"null" from"gh-r" lbin'!' lucid nocompile completions
zinit light some-org/jira-cli
```

## Caveats

The `completions` ice was added specifically to handle this use case (PR #417). Update zinit if this ice is not recognized.
