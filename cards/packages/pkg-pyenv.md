---
id: pkg-pyenv
title: "Package: pyenv"
category: packages
tags: [package, command, binary, annex, installation]
source: https://github.com/zdharma-continuum/zinit-packages
related: [pkg-overview]
---

## Summary

Installs pyenv (pyenv/pyenv) for managing multiple Python versions, initialising it automatically via a generated `zpyenv.zsh` shim sourced on every shell start.

## Syntax / Usage

```zsh
zi pack for pyenv/pyenv
zi pack"bgn" for pyenv/pyenv
```

Available profiles: `default`, `bgn`.

## Details

- Provides: `pyenv` binary via `pick` (default) or `sbin` shim (bgn), and a generated `zpyenv.zsh` init script sourced at startup.
- `default` profile ices: `as"command"`, `pick"bin/pyenv"`, `nocompile"!"`, `lucid`, `atclone"PYENV_ROOT=\"$PWD\" ./libexec/pyenv init - > zpyenv.zsh"`, `atpull"%atclone"`, `atinit"export PYENV_ROOT=\"$PWD\""`, `src"zpyenv.zsh"`.
- `bgn` profile ices: `as"null"`, `sbin"bin/pyenv"`, `nocompile"!"`, `lucid`, same `atclone`/`atpull`/`atinit`/`src` as default. Requires the `bin-gem-node` annex.
- `PYENV_ROOT` is set to the zinit plugin directory (not `~/.pyenv`); this is intentional and keeps pyenv self-contained under zinit's data directory.

## Examples

```zsh
# Standard install — pyenv on PATH via pick
zi pack for pyenv/pyenv

# bgn annex shim variant
zi pack"bgn" for pyenv/pyenv
```

## Caveats / Common Mistakes

- `PYENV_ROOT` points to the zinit clone directory, not `~/.pyenv`. Code that hardcodes `~/.pyenv` will not find shims.
- Requires `bash` to be available (used by pyenv's libexec scripts).

## See Also

- [pkg-overview](pkg-overview.md) — how `zi pack` works
