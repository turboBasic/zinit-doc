---
id: ts-fnm-atclone-env-src-240
title: Installing fnm with environment setup and completions via zinit
category: troubleshooting
tags: [binary, ice, completion, turbo]
source: https://github.com/zdharma-continuum/zinit/discussions/240
related: []
---

## Summary
`fnm` requires generating both an env init script and a completions file at install time using `atclone`/`atpull`, then sourcing the generated init script with `src`.

## Question / Problem
The user successfully installed `fnm` and wanted confirmation the pattern was correct, and also asked how to generate shell completions from a command's output (`fnm completions --shell zsh`).

## Answer / Solution
The confirmed working pattern for fnm:

```zsh
zinit ice from'gh-r' sbin'fnm' nocompile \
    atclone'./fnm env --use-on-cd > fnmenv.zsh; ./fnm completions --shell zsh > _fnm' \
    atpull"%atclone" \
    src"fnmenv.zsh"
zinit light Schniz/fnm
```

Key points:
- `atclone` generates `fnmenv.zsh` (the env init output) and `_fnm` (the completions file) right after the binary is downloaded.
- `atpull"%atclone"` re-generates both files on every update.
- `src"fnmenv.zsh"` sources the generated init script so `fnm` environments are active.
- `_fnm` is named with a leading `_` so zinit detects and installs it as a completion.

## Caveats
The generated `fnmenv.zsh` contains the path to the fnm binary at the time of generation. If the plugin directory changes (e.g. after a `zinit delete` + reinstall), `atpull` must re-run. Use `zinit update --reset Schniz/fnm` to force a full regeneration.
