---
id: ice-order
title: "Ice Execution Order"
category: concepts
tags: [ice, turbo, performance]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [atclone, atpull, atinit, atload, wait, turbo-mode]
---

## Summary

Zinit executes ice hooks in a fixed sequence during plugin/snippet installation and
loading. Knowing this order determines where to place setup logic and whether a hook
runs once (clone only) or on every load.

## Details

The full sequence, as documented by Zinit, is:

```
atinit -> atpull! -> make!! -> mv -> cp -> make! -> atclone/atpull -> make -> (plugin script loading) -> src -> multisrc -> atload
```

### What each position means

| Position | Ice(s)                    | When it runs                                                              |
| -------- | ------------------------- | ------------------------------------------------------------------------- |
| 1        | `atinit`                  | Every load, before anything else — before the plugin is sourced           |
| 2        | `atpull!`                 | Update only (new commits present), before `mv`/`cp` and before `git pull` |
| 3        | `make!!`                  | Every load, before `mv`/`cp`                                              |
| 4        | `mv`                      | Clone + update (new commits only)                                         |
| 5        | `cp`                      | Clone + update (new commits only), after `mv`                             |
| 6        | `make!`                   | Every load, after `mv`/`cp` but before `atclone`/`atpull`                 |
| 7        | `atclone`                 | First install only                                                        |
| 7        | `atpull`                  | Update only (new commits present), after `git pull`                       |
| 8        | `make`                    | Clone + update, after `atclone`/`atpull`                                  |
| 9        | *(plugin script loading)* | The plugin file(s) selected by `pick` are sourced                         |
| 10       | `src`                     | After main script load                                                    |
| 11       | `multisrc`                | After `src`                                                               |
| 12       | `atload`                  | Last — after all sourcing is complete                                     |

### First install vs. update

- `atclone` runs only on the first `git clone` / initial download.
- `atpull` (without `!`) runs only when `zinit update` downloads new commits.
- `atpull!` (with `!` prefix) runs before `mv`/`cp` and before `git pull`, also only
  when new commits are present.
- `atinit` and `atload` run on **every load** regardless of whether the plugin was
  just cloned, updated, or merely loaded from cache.
- Use `run-atpull` alongside `atpull` to force it to run even when no new commits
  were downloaded.

### The `%atclone` shorthand

Setting `atpull"%atclone"` replaces `atpull`'s value with whatever `atclone` contains,
keeping clone and pull behavior in sync without duplicating the command.

## Examples

```zsh
# atinit fires before sourcing; atload fires after
zi ice wait lucid atinit"zicompinit; zicdreplay" atload"bindkey '^P' autosuggest-accept"
zi light zsh-users/zsh-autosuggestions

# atclone runs make! before atclone (make! is step 6, atclone is step 7)
zi ice as"program" make'!' atclone'./direnv hook zsh > zhook.zsh' atpull'%atclone' src"zhook.zsh"
zi light direnv/direnv

# build at clone, repeat at pull, source the generated file
zi ice as"command" from"gh-r" \
      atclone"./starship init zsh > init.zsh; ./starship completions zsh > _starship" \
      atpull"%atclone" src"init.zsh"
zi light starship/starship
```

## See Also

- atclone
- atpull
- atinit
- atload
- turbo-mode
