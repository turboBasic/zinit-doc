---
id: atpull
title: "Ice: atpull''"
category: ices
tags: [ice, git, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [atclone, atload, atinit, make, run-atpull, reset]
---

## Summary

`atpull''` runs a shell command after updating a plugin — but only when new commits
were downloaded. Use `run-atpull` to run it unconditionally on every update.

## Syntax / Usage

```zsh
zi ice atpull"<shell-code>"

# Re-run whatever atclone'' specified
zi ice atpull"%atclone"

# Run BEFORE mv/cp and before git pull (prefix with !)
zi ice atpull"!<shell-code>"
```

## Details

By default, `atpull''` runs after `git pull` completes (and after `mv''`/`cp''`). If
the value starts with `!`, it runs before `mv''`/`cp''` and before `git pull`/`svn
update`.

The special token `%atclone` in the value is replaced with the contents of the
`atclone''` ice, providing a convenient way to keep clone and pull behavior in sync.

`atpull''` is skipped entirely when there are no new commits to download. Use
`run-atpull` ice alongside it to override this behavior.

## Examples

```zsh
# Mirror atclone on update (common pattern)
zi ice as"command" from"gh-r" \
      atclone"./starship init zsh > init.zsh" \
      atpull"%atclone" src"init.zsh"
zi light starship/starship

# Run ./configure before git pull (using ! prefix)
zi ice atpull"!./configure" make
zi light vim/vim
```

## Caveats / Common Mistakes

- `atpull''` is skipped if there are no new commits. If your hook must always run on
  `zinit update`, add `run-atpull` ice.

## See Also

- atclone
- run-atpull
- reset
- make
