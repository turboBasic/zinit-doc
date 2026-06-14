---
id: ts-configure-hook-warning-686
title: "Warning: ∞zinit-configure-hook returned with 1 when configure ice not intended"
category: troubleshooting
tags: [ice, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/686
related: []
---

## Summary
Passing `configure''` (empty value) to a plugin that has no `./configure` script, or passing it alongside a build system that is not supported, causes zinit's configure hook to fail with exit code 1.

## Question / Problem
The user tried to install `pyenv/pyenv-virtualenv` with:

```zsh
zinit depth=1 light-mode lucid as'none' nocompletions nocompile id-as'pyenv/virtualenv' configure'' for pyenv/pyenv-virtualenv
```

This produced:

```
Warning: ∞zinit-configure-hook hook returned with 1
```

## Answer / Solution
The `configure''` ice with an empty value is still a truthy assignment — it causes zinit to attempt `./configure`. For plugins that do not use autotools or a supported build system, omit the `configure` ice entirely:

```zsh
zinit depth=1 light-mode lucid as'null' nocompletions nocompile id-as'pyenv/virtualenv' for \
    pyenv/pyenv-virtualenv
```

If the intention was to use `configure` only if the script exists, there is no built-in conditional for that — instead use `atclone` to run the configure script manually with an existence check:

```zsh
zinit ice atclone"[[ -f configure ]] && ./configure || true"
```

## Caveats
`as"none"` is not a valid value; use `as"null"` (which is a defined shorthand for `pick"/dev/null" nocompletions`). Invalid `as` values may silently fall through to default behavior.
