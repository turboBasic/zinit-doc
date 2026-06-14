---
id: ts-compinit-insecure-compaudit-558
title: "compinit insecure directories warning cannot be silenced"
category: troubleshooting
tags: [completion, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/558
related: [ts-compinit-insecure-root-556]
---

## Summary

Even after adding `compinit -u` to `.zshrc`, insecure directory warnings from `compinit` persist because zinit internally calls `compinit` again (via `zicompinit`) without the `-u` flag.

## Symptom

```
zsh compinit: insecure directories, run compaudit for list.
```

Appears on shell startup even though `-u` was passed to the user's `compinit` call.

## Cause

When using Turbo mode with `atload'zicompinit'`, `zicompinit` runs `autoload -Uz compinit; compinit` without forwarding any options. The user's `-u` flag is not passed to zinit's internal call.

## Fix / Workaround

Pass options through `ZINIT[COMPINIT_OPTS]`:

```zsh
# Before sourcing zinit or before zicompinit runs
declare -A ZINIT
ZINIT[COMPINIT_OPTS]="-u"
```

Or fix the underlying ownership issue instead of suppressing the warning:

```zsh
compaudit | xargs chmod g-w,o-w
```

Or skip security checks entirely (less secure):

```zsh
ZINIT[COMPINIT_OPTS]="-u"
```

## Caveats

Using `-u` suppresses a real security check. The recommended fix is to correct directory ownership and permissions as reported by `compaudit`.
