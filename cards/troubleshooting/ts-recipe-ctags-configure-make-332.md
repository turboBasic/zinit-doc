---
id: ts-recipe-ctags-configure-make-332
title: "Recipe: install universal-ctags from source using configure and make ices"
category: troubleshooting
tags: [ice, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/332
related: []
---

## Summary

`universal-ctags` (and similar autotools projects) can be built from source directly via zinit using the `configure` and `make` ices, without manual cloning or build steps.

## Examples

Install `universal-ctags` from source:

```zsh
zinit id-as null configure'#' make'install' \
  for universal-ctags/ctags
```

The `configure'#'` ice runs `./configure` with no extra flags. `make'install'` runs `make install` after the build. `id-as null` suppresses the default plugin ID display.

## Caveats

`universal-ctags` benefits from `pcre` support compiled in. Ensure `libpcre2` (or `libpcre`) development headers are installed before building if you need regex support in ctags language definitions.
