---
id: ts-glance-broken-pygmentize-488
title: zinit glance produces no output or errors due to pygmentize flag changes
category: troubleshooting
tags: [command, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/488
related: []
---

## Summary

`zinit glance <plugin>` (which pretty-prints a plugin's source file using `pygmentize`) produces no output or fails with an error after `pygmentize` changed its accepted flags in newer versions. Fixed in PR #488.

## Symptom

Running `zinit glance some/plugin` produces no syntax-highlighted output, or prints an error from `pygmentize` about unrecognized options.

## Cause

The `glance` subcommand passes flags to `pygmentize` to control output format and style. Newer versions of `pygmentize` (part of the Pygments package) changed or removed some of these flags, causing the invocation to fail silently or with an error. PR #488 updated the flags to use long-form options compatible with current Pygments versions.

## Fix / Workaround

Update zinit to get the corrected `pygmentize` invocation:

```zsh
zinit self-update
```

If updating is not possible, use an alternative syntax viewer:

```zsh
# Use bat (if installed) as a manual alternative
bat "$(zinit resolve some/plugin)"

# Or source-highlight
source-highlight -o STDOUT -i "$(zinit resolve some/plugin)"
```

## Caveats

`zinit glance` requires either `pygmentize`, `source-highlight`, or `highlight` to be installed and on `$PATH`. The command is purely for interactive inspection and does not affect plugin loading.
