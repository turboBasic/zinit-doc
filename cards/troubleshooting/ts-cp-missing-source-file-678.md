---
id: ts-cp-missing-source-file-678
title: "cp ice fails silently when source file does not exist"
category: troubleshooting
tags: [ice, troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/678
related: [ts-mv-cp-global-var-warning-699]
---

## Summary

When the `cp` ice specifies a source file pattern that matches nothing, zinit silently proceeds without the copy rather than reporting an error, leaving the plugin in an incomplete state.

## Symptom

A plugin that uses the `cp` ice to install a file (e.g. a man page or completion) appears to install successfully, but the destination file is missing. No error is shown.

## Cause

The `cp` ice code did not check whether the source file existed before attempting the copy. When the source was absent (e.g. due to a version change in the upstream repo), the operation was a no-op.

## Fix / Workaround

Update zinit (fixed in PR #679, which adds a file existence check before the copy):

```zsh
zinit self-update
```

To diagnose a broken install, inspect the plugin directory:

```zsh
zinit cd username/plugin
ls -la
```

If the expected file is absent, trigger a reinstall:

```zsh
zinit delete username/plugin
exec zsh
```
