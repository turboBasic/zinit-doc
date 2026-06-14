---
id: ts-zi-alias-parse-error-473
title: "Parse error: defining function based on alias 'zi' near '()'"
category: troubleshooting
tags: [troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/473
related: []
---

## Summary

On shell startup, zinit prints `(eval):25: defining function based on alias 'zi'` and `parse error near '()'`. This occurs when `zi` is defined as an alias before zinit tries to create a function named `zi`.

## Symptom

```
(eval):25: defining function based on alias `zi'
(eval):25: parse error near `()'
```

Appears on every new shell. Introduced in a zinit version after v3.7.0.

## Cause

Zinit creates a function called `zi` as part of its initialization. If `zi` is already defined as an alias (e.g. by the user or by zoxide), zsh rejects function creation with that name. The alias takes precedence and the function definition fails to parse.

## Fix / Workaround

**Option 1:** Prevent zinit from creating the `zi` alias by setting `ZINIT[NO_ALIASES]=1` before sourcing zinit:

```zsh
typeset -A ZINIT
ZINIT[NO_ALIASES]=1
source "${ZINIT_HOME}/zinit.zsh"
```

**Option 2:** Remove the conflicting alias before sourcing zinit:

```zsh
unalias zi 2>/dev/null
source "${ZINIT_HOME}/zinit.zsh"
```

**Option 3:** If using zoxide, initialize it after zinit so zoxide's `zi` alias does not exist yet when zinit loads.

## Caveats

Reverting to zinit tag v3.7.0 avoids the error but is not recommended for new installations.
