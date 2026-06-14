---
id: ts-atpull-repeat-atclone
title: Using atpull'%atclone' to repeat the clone hook on updates
category: troubleshooting
tags: [ice, git, binary]
source: https://github.com/zdharma-continuum/zinit/discussions/240
related: [ts-eval-hook-external-tool, ts-fnm-install-env-completions]
---

## Summary

`atpull'%atclone'` is a special value that tells zinit to re-run the `atclone` command verbatim when updating a plugin. Use it whenever the `atclone` command generates a file that should be regenerated on updates.

## Question / Problem

Users often need to run a command once at install time (via `atclone`) and again after updates (via `atpull`). Duplicating the command in both ices is error-prone.

## Answer / Solution

`atpull'%atclone'` is a macro that expands to whatever is in `atclone`. It ensures the two hooks always stay in sync:

```zsh
# Both hooks run the same command
zinit ice \
    atclone'./tool init zsh > init.zsh' \
    atpull'%atclone' \
    src'init.zsh'
zinit light some/tool
```

If instead you want `atpull` to run a different command that references `atclone`:

```zsh
# Run atclone content, then something extra
zinit ice \
    atclone'./configure --prefix=$ZPFX' \
    atpull'%atclone; make install'
zinit light some/compiled-tool
```

## Examples

Common patterns using `atpull'%atclone'`:

```zsh
# starship prompt
zinit ice as"command" from"gh-r" \
    atclone"./starship init zsh > init.zsh; ./starship completions zsh > _starship" \
    atpull"%atclone" src"init.zsh"
zinit light starship/starship

# direnv
zinit ice as"program" make'!' \
    atclone'./direnv hook zsh > zhook.zsh' \
    atpull'%atclone' src"zhook.zsh"
zinit light direnv/direnv

# LS_COLORS
zinit ice atclone"dircolors -b LS_COLORS > c.zsh" \
    atpull'%atclone' pick"c.zsh" nocompile'!'
zinit light trapd00r/LS_COLORS
```

## Caveats

`atpull` hooks only run when there are new git commits to download (unless `run-atpull` ice is also set). If an update produces no new commits, `atpull'%atclone'` will not re-run.
