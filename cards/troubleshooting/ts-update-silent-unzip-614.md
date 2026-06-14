---
id: ts-update-silent-unzip-614
title: "ziextract produces verbose unzip output during plugin update"
category: troubleshooting
tags: [binary, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/614
related: []
---

## Summary

The `ziextract` helper called `unzip` without suppressing its output, causing noisy extraction logs to appear during plugin install and update.

## Symptom

Installing or updating a plugin that uses `extract` ice or `ziextract` prints verbose `unzip` output like file listings to the terminal.

## Cause

The `unzip` call inside `ziextract` lacked the `-q` (quiet) flag.

## Fix / Workaround

Upgrade to a version that includes the fix for issue #614, which silences `unzip` output inside `ziextract`.

On older versions, the verbose output is cosmetic only. If it is disruptive, redirect it:

```zsh
zinit ice extract atclone'ziextract >/dev/null 2>&1'
zinit load user/plugin
```

Or use `silent` ice to suppress all output from the plugin load:

```zsh
zinit ice silent extract
zinit load user/plugin
```
