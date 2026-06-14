---
id: ts-locale-overridden-by-zinit-732
title: zinit-autoload.zsh overrides system locale to en_US.UTF-8
category: troubleshooting
tags: [troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/732
related: []
---

## Summary

`zinit-autoload.zsh` sets `LC_ALL` or a similar locale variable to `en_US.UTF-8`, overriding whatever locale the user or system had configured.

## Symptom

After sourcing zinit, locale-sensitive tools (date formatting, sorting, man page encoding) behave as if `LANG=en_US.UTF-8` even when the system locale is different (e.g. `de_DE.UTF-8`, `ja_JP.UTF-8`).

## Cause

Zinit sets locale variables internally to ensure consistent behavior, but does not restore them after its initialization completes. The exact variable and assignment location in `zinit-autoload.zsh` has not been pinpointed in the issue.

## Fix / Workaround

No fix available as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/732

Workaround: re-assert your locale after sourcing zinit:

```zsh
source "${ZINIT_HOME}/zinit.zsh"
export LANG=de_DE.UTF-8
export LC_ALL=de_DE.UTF-8
```
