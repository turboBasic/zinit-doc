---
id: blockf
title: "Ice: blockf''"
category: ices
tags: [ice, completion, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [nocompletions, completions, atinit]
---

## Summary

`blockf` prevents a plugin from modifying `$fpath` directly, letting Zinit manage
completions instead. Use it when a plugin tries to add completion directories to
`$fpath` in the traditional way.

## Syntax / Usage

```zsh
zi ice blockf
```

## Details

Some plugins append their completion directories to `$fpath` at load time. Zinit has
its own completion management system and typically does not need those `$fpath` entries.
`blockf` intercepts and cancels those `$fpath` additions, preventing unnecessary
duplication or conflicts.

Zinit still detects and installs the plugin's completion files through its own
mechanism.

`blockf` is a flag ice — it takes no value. It is particularly important when loading
Prezto modules or other plugins that bundle completions.

## Examples

```zsh
# Prezto completion module: block fpath additions, let zinit manage completions
zi ice blockf svn \
      atclone"git clone --recursive https://github.com/zsh-users/zsh-completions.git external"
zi snippet PZTM::completion

# Standard turbo completion setup
zi ice wait lucid atload"zicompinit; zicdreplay" blockf
zi light zsh-users/zsh-completions
```

## See Also

- nocompletions
- completions
- atinit
