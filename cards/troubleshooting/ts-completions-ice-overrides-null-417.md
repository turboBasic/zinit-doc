---
id: ts-completions-ice-overrides-null-417
title: completions ice forces completion install even when as"null" is set globally
category: troubleshooting
tags: [completion, ice, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/417
related: [ts-completions-ice-overrides-asnull-417]
---

## Summary
When `default-ice` is set to `as'null'` (to suppress sourcing and completions by default), individual plugins that do provide completions need the `completions` ice to override the default and re-enable completion installation.

## Symptom
With `zinit default-ice as'null'` set globally, plugins that provide `_*` completion files have their completions silently skipped. Tab completion for those tools does not work.

## Cause
`as'null'` implies `nocompletions`. The `completions` ice was added (PR #417) as a way to explicitly re-enable completion detection and installation for individual plugins that are otherwise loaded with `as'null'`.

## Fix / Workaround
Add the `completions` ice to plugins that should have their completions installed despite a global `as'null'` default:

```zsh
zinit default-ice as'null' lucid wait

# This plugin's completions will be installed despite default as'null':
zi ice completions
zi light user/tool-with-completions

# Without the completions ice, completions would be silently skipped:
zi light user/tool-without-completions
```

## Examples

```zsh
# Example: go-jira-cli has completions that should be installed
zi ice from"gh-r" completions
zi light go-jira/jira
```

## Caveats
The `completions` ice requires zinit version that includes PR #417. Earlier versions have no way to override `as'null'`'s suppression of completion management.
