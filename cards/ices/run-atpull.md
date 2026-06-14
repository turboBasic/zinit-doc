---
id: run-atpull
title: "Ice: run-atpull''"
category: ices
tags: [ice, git, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [atpull, atclone, reset]
---

## Summary

`run-atpull` forces the `atpull''` hook to run on every `zinit update`, even when
there are no new commits to download.

## Syntax / Usage

```zsh
zi ice run-atpull
```

## Details

Normally `atpull''` is skipped when `zinit update` finds no new commits. `run-atpull`
overrides this gate so the hook always fires. It is a flag ice — it takes no value.

Useful when the hook performs actions that must happen unconditionally (e.g. regenerating
a compiled cache, re-running a configuration script).

## Examples

```zsh
# Always re-run the generation script even if the repo did not change
zi ice atclone"./gen.sh > output.zsh" atpull"%atclone" run-atpull src"output.zsh"
zi light some/plugin
```

## See Also

- atpull
- atclone
