---
id: atclone
title: "atclone"
category: ices
tags: [ice, git, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [atpull, atload, atinit, make, nocd, run-atpull]
---

## Summary

`atclone''` runs a shell command once, immediately after a plugin or snippet is cloned
for the first time. It is the primary hook for one-time post-install setup.

## Syntax / Usage

```zsh
zi ice atclone"<shell-code>"
zi ice atclone"./configure --prefix=$ZPFX"
zi ice atclone"make install"
```

## Details

The code is executed within the plugin's directory (unless `nocd''` is set). It runs
only on first clone, not on subsequent updates — use `atpull''` (or `atpull"%atclone"`)
to repeat the action on updates.

The special value `atpull"%atclone"` causes `atpull''` to re-run whatever `atclone''`
specified, making update behavior mirror clone behavior.

Order of execution: `atinit` -> `atpull!` -> `make'!!'` -> `mv` -> `cp` -> `make!` ->
`atclone`/`atpull` -> `make` -> `(plugin script loading)` -> `src` -> `multisrc` ->
`atload`.

## Examples

```zsh
# Generate init.zsh and completions at clone time, repeat at pull time
zi ice as"command" from"gh-r" \
      atclone"./starship init zsh > init.zsh; ./starship completions zsh > _starship" \
      atpull"%atclone" src"init.zsh"
zi light starship/starship

# Build LS_COLORS database at clone time
zi ice atclone"dircolors -b LS_COLORS > c.zsh" atpull'%atclone' pick"c.zsh" nocompile'!'
zi light trapd00r/LS_COLORS

# Clone an external repo during Prezto module install
zi ice atclone"git clone --recursive https://github.com/zsh-users/zsh-completions.git external" \
       blockf svn
zi snippet PZTM::completion
```

## See Also

- atpull
- atload
- atinit
- make
- run-atpull
