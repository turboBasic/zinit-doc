---
id: ts-fnm-env-without-install-681
title: Loading fnm environment and completions without installing fnm via zinit
category: troubleshooting
tags: [ice, completion, snippet, lazy-loading]
source: https://github.com/zdharma-continuum/zinit/discussions/681
related: []
---

## Summary
When `fnm` is installed externally (e.g. via Cargo), zinit can still manage its shell integration and completions using a null plugin with `atclone`/`atpull` to generate and source the required scripts.

## Question / Problem
The user had fnm installed via Cargo and wanted zinit to handle the shell env initialization (`fnm env --use-on-cd --shell zsh`) and completions (`fnm completions --shell zsh`) without also installing the binary.

## Answer / Solution
Use a null plugin to run the generation commands and source the result:

```zsh
zinit ice id-as"fnm-init" has"fnm" \
    atclone"fnm env --use-on-cd --shell zsh > fnm-env.zsh; fnm completions --shell zsh > _fnm" \
    atpull"%atclone" \
    src"fnm-env.zsh" \
    nocompile
zinit light zdharma-continuum/null
```

Key points:
- `has"fnm"` prevents loading if fnm is not in `$PATH`.
- `atclone` generates both scripts once.
- `atpull"%atclone"` regenerates them on `zinit update`.
- `src"fnm-env.zsh"` sources the env init on every shell start.
- `_fnm` is detected as a completion by zinit.

## Caveats
`atclone` runs only during the first install. If fnm is updated and the env output changes format, run `zinit update --reset fnm-init` to force regeneration.
