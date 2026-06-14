---
id: ts-help-flag-unknown-subcommand-593
title: "zinit --help produces Unknown subcommand error"
category: troubleshooting
tags: [troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/593
related: []
---

## Summary

Running `zinit --help` produces `ERROR: Unknown subcommand: --help` instead of displaying help text, because the `--help` flag was not recognized.

## Symptom

```
$ zinit --help
ERROR: Unknown subcommand: `--help` (it should be one of, e.g.: `load`, `snippet`, `update`, `delete`, ...)
```

## Cause

The zinit command dispatcher did not handle `--help` as an alias for the `help` subcommand. Only `zinit help` and `zinit -h` worked.

## Fix / Workaround

Update zinit (fixed in PR #597):

```zsh
zinit self-update
```

All three forms now work:

```zsh
zinit help
zinit -h
zinit --help
```
