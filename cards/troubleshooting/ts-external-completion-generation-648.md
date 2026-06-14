---
id: ts-external-completion-generation-648
title: Generating shell completions from a command and registering them with zinit
category: troubleshooting
tags: [completion, ice, snippet]
source: https://github.com/zdharma-continuum/zinit/discussions/648
related: []
---

## Summary
Tools like `rye` that provide a `self completion -s zsh` subcommand can have their completions generated at install time using `atclone`/`atpull` and loaded as a completion snippet.

## Question / Problem
The user wanted the zinit equivalent of the OMZ pattern for `rye`, which generates its completion to `$ZSH_CUSTOM/plugins/rye/_rye`.

## Answer / Solution
Generate the completion file into the plugin directory at clone time using `atclone`/`atpull`, then let zinit detect and install the `_rye` file:

```zsh
zinit ice id-as"rye-completion" as"completion" \
    atclone"rye self completion -s zsh > _rye" \
    atpull"%atclone" \
    has"rye"
zinit light zdharma-continuum/null
```

Key elements:
- `id-as"rye-completion"` gives the null plugin a unique name.
- `as"completion"` tells zinit this stanza installs a completion.
- `atclone"rye self completion -s zsh > _rye"` generates the file.
- `atpull"%atclone"` re-generates on update.
- `has"rye"` gates loading on `rye` being in `$PATH`.

## Caveats
The `rye` binary must already be in `$PATH` when `atclone` runs. If `rye` is itself managed by zinit, load it in a prior stanza without `wait` so it is available before this completion-generation step.
