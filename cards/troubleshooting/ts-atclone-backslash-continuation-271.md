---
id: ts-atclone-backslash-continuation-271
title: atclone ice fails with "no such file or directory" when using backslash line continuation
category: troubleshooting
tags: [ice, troubleshooting, snippet]
source: https://github.com/zdharma-continuum/zinit/issues/271
related: []
---

## Summary

An `atclone` ice value that spans multiple lines using shell backslash-continuation (`\` at end of line) causes a "no such file or directory" error. The ice value is treated as a filename rather than a command string.

## Symptom

```
zinit ice as"command" from"gh-r" \
    atclone"./starship init zsh > init.zsh; ./starship completions zsh > _starship" \
    atpull"%atclone" src"init.zsh"
zinit light starship/starship
```

Error reported:

```
no such file or directory: atclone./starship init zsh > init.zsh; ./starship completions zsh > _starship
```

## Cause

When the `zinit ice` command is split across multiple lines with backslash continuation in a `.zshrc`, the line continuation may concatenate the next line's content directly onto the previous token without a separator, merging the ice name and its value. The exact behavior depends on the quoting style and shell parsing context.

## Fix / Workaround

Keep multi-ice declarations on a single line, or use the `for`-syntax which handles multi-line declarations cleanly:

```zsh
# Single line (safe)
zinit ice as"command" from"gh-r" atclone"./starship init zsh > init.zsh; ./starship completions zsh > _starship" atpull"%atclone" src"init.zsh"
zinit light starship/starship
```

Or use the for-syntax:

```zsh
zinit for \
    as"command" \
    from"gh-r" \
    atclone"./starship init zsh > init.zsh; ./starship completions zsh > _starship" \
    atpull"%atclone" \
    src"init.zsh" \
  starship/starship
```

## Caveats

The backslash continuation in the `zinit ice` call works differently than standard shell multiline syntax. When in doubt, use the `for`-syntax or keep the entire ice specification on one line.
