---
id: ts-local-plugin-atclone-missing-750
title: "Local plugins do not run atclone for one-time setup"
category: troubleshooting
tags: [plugin, ice, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/750
related: []
---

## Summary

Local plugins (specified by absolute path) are sourced directly on every shell start without an install phase, so `atclone` hooks never run. This prevents declarative one-time setup (e.g. installing completions) for local plugins.

## Symptom

A completion file or other setup artifact managed by `atclone` is never created when the plugin is specified by an absolute local path. The user must write workarounds using `atload` with manual flag files to detect the first-run condition.

## Cause

Zinit's install phase (which triggers `atclone`) runs only for remote plugins. Local plugins are loaded as-is without a distinct install step.

## Fix / Workaround

Use a manual flag-file guard in `atload` to simulate a one-time installation:

```zsh
zinit ice atload'[[ -f ~/.zinit_local_installed ]] || { ./install.sh && touch ~/.zinit_local_installed }'
zinit load /path/to/local/plugin
```

For completions specifically, install them manually once:

```zsh
zinit creinstall /path/to/local/plugin
```

## Caveats

A native one-time install phase for local plugins was proposed (issue #750) but not yet implemented. The flag-file workaround is the documented interim approach.
