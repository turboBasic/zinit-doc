---
id: ts-atclone-not-rerun-on-update-172
title: atclone-generated files missing after zinit update
category: troubleshooting
tags: [ice, installation, troubleshooting, git]
source: https://github.com/zdharma-continuum/zinit/issues/172
related: []
---

## Summary

After running `zinit update`, files that `atclone` was supposed to generate (e.g. shell init scripts, completion files) are gone and the plugin breaks. The `atclone` ice only runs on first install; the equivalent `atpull` ice must be set to re-run it on updates.

## Symptom

After `zinit update`, the plugin directory is missing generated files:

```
ls -la .zinit/plugins/starship---starship
# only: starship binary + ._zinit dir — no init.zsh, no _starship completion
```

Running the binary then fails with "no such file or directory" for the generated script.

## Cause

`atclone` runs only on initial clone. On subsequent `zinit update` calls, only `atpull` is executed. If `atpull` is not set, the generated files are wiped by the update process but never recreated.

## Fix / Workaround

Add `atpull"%atclone"` to repeat the `atclone` ice on every update:

```zsh
zinit ice as"command" from"gh-r" \
  atclone"./starship init zsh > init.zsh; ./starship completions zsh > _starship" \
  atpull"%atclone" \
  src"init.zsh"
zinit light starship/starship
```

The `%atclone` token is a shorthand that repeats exactly what `atclone` does.

## See Also

Refer to the ice execution order: `atinit` → `atpull!` → `make!!` → `mv` → `cp` → `make!` → `atclone`/`atpull` → `make` → (source) → `src` → `atload`.
