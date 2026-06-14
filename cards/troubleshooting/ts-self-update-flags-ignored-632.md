---
id: ts-self-update-flags-ignored-632
title: "zinit self-update ignores --help, --quiet, --no-pager flags"
category: troubleshooting
tags: [command, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/633
related: []
---

## Summary

Older versions of `zinit self-update` did not recognize `--help`, `--quiet`, or `--no-pager` flags, causing them to be silently ignored.

## Symptom

Running `zinit self-update --quiet` still prints full output. Running `zinit self-update --help` shows no help text or errors.

## Cause

The `self-update` subcommand did not call the option-parsing logic, so flags passed to it were not processed.

## Fix / Workaround

Upgrade to a version that includes the fix for issue #632/#633. After the fix, `self-update` accepts:

```zsh
zinit self-update --help      # show usage
zinit self-update --quiet     # suppress output
zinit self-update --no-pager  # disable pager for output
```

On older versions, there is no workaround — flags are ignored and the full update output is always shown.
