---
id: ts-zitheme-color-theme-445
title: Changing zinit output color theme with ZITHEME
category: troubleshooting
tags: [installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/445
related: []
---

## Summary

Zinit's status and log messages use a default color scheme. The `ZITHEME` variable (introduced in PR #445) allows switching to an alternative built-in color theme. Without it, users who want different colors had no supported way to change them.

## Symptom

Zinit output colors clash with a terminal colorscheme or the user prefers a different palette. There is no obvious variable to change the colors.

## Cause

Zinit's message colors are controlled by entries in the `ZINIT` hash (e.g. `ZINIT[col-file]`, `ZINIT[col-msg]`, etc.). PR #445 extracted the default color assignments into a `share/themes/default.zsh` file and added two additional themes (`blue` and `gold`), selectable via the `ZITHEME` variable.

## Fix / Workaround

Set `ZITHEME` before sourcing zinit:

```zsh
# Available themes: default, blue, gold
ZITHEME=blue

source "${ZINIT_HOME}/zinit.zsh"
```

To use a custom theme, set the relevant `ZINIT` hash fields directly before sourcing zinit:

```zsh
declare -A ZINIT
ZINIT[col-msg]=$'\e[32m'     # green for messages
ZINIT[col-error]=$'\e[31m'   # red for errors
ZINIT[col-file]=$'\e[33m'    # yellow for file names
# ... set other fields as needed
source "${ZINIT_HOME}/zinit.zsh"
```

## Caveats

`ZITHEME` support requires zinit version that includes PR #445. On older versions, the theme files do not exist and the variable has no effect. Direct `ZINIT` hash field overrides work on any version that supports the hash-based configuration.
