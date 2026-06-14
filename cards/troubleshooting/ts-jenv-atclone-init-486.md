---
id: ts-jenv-atclone-init-486
title: Installing jenv with zinit and enabling plugins before init runs
category: troubleshooting
tags: [ice, plugin, turbo, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/486
related: []
---

## Summary
When using `atclone` to generate a jenv init script, jenv plugins (like `export`) must be enabled before the init script is generated, so the generated `zjenv.zsh` includes the plugin's PATH/env modifications.

## Question / Problem
The user's jenv setup worked but did not export `JAVA_HOME` because the `export` jenv plugin was enabled after the init script was generated:

```zsh
zinit as'null' wait lucid atinit'export JENV_ROOT="$PWD"' \
    atclone'JENV_ROOT="$PWD" ./libexec/jenv init - > zjenv.zsh' \
    atpull"%atclone" src"zjenv.zsh" nocompile'!' sbin"bin/jenv" for \
        jenv/jenv
```

## Answer / Solution
Enable the jenv `export` plugin inside the `atclone` command before running `jenv init -`:

```zsh
zinit as'null' wait lucid atinit'export JENV_ROOT="$PWD"' \
    atclone'JENV_ROOT="$PWD" ./libexec/jenv enable-plugin export;
            JENV_ROOT="$PWD" ./libexec/jenv init - > zjenv.zsh' \
    atpull"%atclone" src"zjenv.zsh" nocompile'!' sbin"bin/jenv" for \
        jenv/jenv
```

This ensures the generated `zjenv.zsh` contains the export plugin's shims path and `JAVA_HOME` setup.

## Caveats
`atclone` runs only once (on first install). To re-generate `zjenv.zsh` after changing jenv plugins, delete the plugin directory and re-install, or run `zinit update --reset jenv/jenv` to trigger `atpull` (which mirrors `atclone` via `%atclone`).
