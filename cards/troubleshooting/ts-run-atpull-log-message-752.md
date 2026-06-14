---
id: ts-run-atpull-log-message-752
title: "run-atpull log message is confusing when no new commits exist"
category: troubleshooting
tags: [ice, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/752
related: []
---

## Summary

When `run-atpull` ice is set (or `--urge` is used) and no new commits were downloaded, Zinit's log message was grammatically awkward and used a nearly invisible dark gray color.

## Symptom

After updating a plugin with `run-atpull` ice when already up to date, the status message is hard to read on dark terminal themes and the wording doesn't clearly explain what happened.

## Cause

The original message `"Continuing with the update because 'run-atpull'' ice given"` used `{msg3}` color (`#38;5;238m`) which is unreadable on dark backgrounds, and it didn't explicitly state that no new commits were found.

## Fix / Workaround

Upgrade to a version that includes the fix for issue #752. The improved message explicitly states that no new commits were found while still explaining why the update proceeds.

As a reminder, `run-atpull` causes the `atpull` hook to run even when there are no new commits:

```zsh
zinit ice run-atpull atpull'./build.sh'
zinit load user/plugin
```

With this ice, `./build.sh` runs on every `zinit update`, not only when new commits are pulled.
