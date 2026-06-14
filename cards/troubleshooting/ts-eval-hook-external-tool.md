---
id: ts-eval-hook-external-tool
title: Caching eval output for externally-installed tools with atclone/atpull
category: troubleshooting
tags: [ice, turbo, snippet, lazy-loading]
source: https://github.com/zdharma-continuum/zinit/discussions/123
related: [ts-direnv-pattern, ts-fnm-install]
---

## Summary

For tools installed outside zinit (e.g. via pipx) that require an `eval` call on every shell start, you can cache the eval output to a file using `atclone` and source it with `src`, avoiding the slow runtime eval.

## Question / Problem

A user had `nox` (installed via pipx) whose completion required:

```zsh
autoload -U bashcompinit; bashcompinit
eval "$(register-python-argcomplete nox)"
```

Running `register-python-argcomplete` on every shell start is slow. The user wanted to cache the output the way the direnv wiki example does, but using a snippet rather than a zinit-managed clone.

## Answer / Solution

Use `atclone` to generate the cached init file once, `atpull'%atclone'` to regenerate it on update, and `src` to source it. Combine with `if` to guard against the tool not being present.

The key insight: when using this pattern with a local snippet, zinit still runs `atclone`/`atpull` hooks in the snippet's cache directory. Point `src` at the generated file.

```zsh
zinit wait lucid light-mode \
    if"builtin command -v nox > /dev/null 2>&1" \
    atinit"autoload -U bashcompinit; bashcompinit" \
    atclone"register-python-argcomplete nox > zhook.zsh" \
    atpull"%atclone" \
    src"zhook.zsh" \
    as"null" \
    id-as"nox-completion" \
    for zdharma-continuum/null
```

Using `zdharma-continuum/null` (an empty repo) as the target lets you attach all the ices without needing a real snippet file.

## Examples

The same pattern applies to any tool with a slow init command:

```zsh
# direnv (official wiki pattern)
zinit ice as"program" make'!' \
    atclone'./direnv hook zsh > zhook.zsh' \
    atpull'%atclone' src"zhook.zsh"
zinit light direnv/direnv

# jenv
zinit as'null' wait lucid \
    atinit'export JENV_ROOT="$PWD"' \
    atclone'JENV_ROOT="$PWD" ./libexec/jenv init - > zjenv.zsh' \
    atpull"%atclone" src"zjenv.zsh" nocompile'!' sbin"bin/jenv" \
    for jenv/jenv
```

## Caveats

`atclone` only runs once (at initial clone). If the externally-installed tool is updated and its init output changes, run `zinit update <id-as>` or manually delete the plugin directory to force re-generation.
