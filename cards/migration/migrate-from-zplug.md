---
id: migrate-from-zplug
title: Migrate from Zplug
category: migration
tags: [migration, plugin, ice]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [plugins-vs-snippets, ice-modifiers-overview, load-vs-light, turbo-mode]
---

## Summary

Zplug tags map one-to-one to Zinit ice modifiers; replace `zplug <repo>, tag:value` with `zi ice tag"value"; zi load <repo>`.

## Syntax / Usage

```zsh
# Zplug
zplug <repo/plugin>, tag1:<option1>, tag2:<option2>

# Zinit equivalent
zi ice tag1"<option1>" tag2"<option2>"
zi load <repo/plugin>
```

## Details

**Complete tag mapping:**

| Zplug tag | Zinit ice |
|---|---|
| `as` | `as` |
| `use` | `pick`, `src`, `multisrc` |
| `ignore` | _(no equivalent)_ |
| `from` | `from` |
| `at` | `ver` |
| `rename-to` | `mv`, `cp` |
| `dir` | `pick` with rename |
| `if` | `if` |
| `hook-build` | `atclone`, `atpull` |
| `hook-load` | `atload` |
| `frozen` | _(no equivalent)_ |
| `on` | _(no equivalent)_ |
| `defer` | `wait` |
| `lazy` | `autoload` |
| `depth` | `depth` |

The `defer` → `wait` mapping is especially valuable: Zplug's `defer` was limited, while Zinit's `wait` supports numeric delays, conditions, and prompt-reset, giving much finer control over deferred loading.

**Migration steps:**

1. Remove `source ~/.zplug/init.zsh` and `zplug load` / `zplug check` calls.
2. Replace each `zplug` declaration with `zi ice <ices>; zi load <repo>` using the tag map above.
3. Remove tags with no Zinit equivalent (`ignore`, `frozen`, `on`).
4. Use `zi light` instead of `zi load` for plugins that don't need reporting.

## Examples

```zsh
# Old Zplug
source ~/.zplug/init.zsh
zplug "zsh-users/zsh-autosuggestions"
zplug "zsh-users/zsh-syntax-highlighting", defer:2
zplug "junegunn/fzf-bin", from:gh-r, as:command, rename-to:fzf, use:"*linux*amd64*"
zplug "sorin-ionescu/prezto", use:init.zsh, hook-build:"ln -s $ZPLUG_HOME/repos/sorin-ionescu/prezto ~/.zprezto"
zplug "mafredri/zsh-async", from:github, use:async.zsh
zplug load

# New Zinit
zi light zsh-users/zsh-autosuggestions

zi ice wait"2" lucid
zi light zsh-users/zsh-syntax-highlighting

zi ice from"gh-r" as"program" mv"fzf-* -> fzf" bpick"*linux*amd64*"
zi light junegunn/fzf-bin

zi ice pick"async.zsh"
zi light mafredri/zsh-async

# Prezto module as snippet
zi snippet PZTM::environment
```

## Caveats / Common Mistakes

- `zplug check` (verify plugins are installed) has no direct Zinit equivalent; Zinit auto-installs on load.
- Zplug's `frozen` (skip updates) can be approximated by not running `zinit update` for that plugin, but there is no declarative ice for it.
