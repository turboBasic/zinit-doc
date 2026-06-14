---
id: ts-git-alias-breaks-update-643
title: "zinit update fails when git is aliased to a non-standard wrapper"
category: troubleshooting
tags: [git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/643
related: []
---

## Summary

When `git` is aliased (e.g. to `bit` or another wrapper), `zinit update` and `zinit version` fail because some git invocations in zinit lacked the `command` prefix to bypass aliases.

## Symptom

`zinit update <plugin>` or `zinit version` errors out or produces unexpected output when `git` is aliased to a wrapper that does not behave identically to git.

## Cause

Most git calls in zinit used `command git` to bypass shell aliases, but a few missed locations called bare `git`. When `git` is aliased to something like `bit`, those calls fail.

## Fix / Workaround

Update zinit (fixed in PR #643, which added `command` before the missing git invocations):

```zsh
zinit self-update
```

As a temporary workaround, unalias `git` before running zinit commands:

```zsh
(unalias git 2>/dev/null; zinit update)
```

Or define the alias only for interactive use, not in the function context.
