---
id: ts-jenv-plugin-enable-atclone
title: Enabling jenv plugins before jenv loads (e.g. export plugin for JAVA_HOME)
category: troubleshooting
tags: [ice, plugin, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/486
related: [ts-eval-hook-external-tool]
---

## Summary

To enable jenv plugins (like the `export` plugin that sets `JAVA_HOME`) before jenv's init script runs, enable the plugin first via `jenv enable-plugin` in `atclone`, then regenerate the init script so it includes the plugin's source line.

## Question / Problem

A user managed jenv with zinit using `atclone` to generate an init script. The `export` plugin (needed for `JAVA_HOME`) must be enabled in jenv first, but the init script is generated before the plugin is enabled.

Config:

```zsh
zinit as'null' wait lucid \
    atinit'export JENV_ROOT="$PWD"' \
    atclone'JENV_ROOT="$PWD" ./libexec/jenv init - > zjenv.zsh' \
    atpull"%atclone" src"zjenv.zsh" nocompile'!' sbin"bin/jenv" \
    for jenv/jenv
```

The generated `zjenv.zsh` does not include the export plugin source line until the plugin is manually enabled.

## Answer / Solution

Enable the jenv plugin as part of the `atclone` command, before generating the init script:

```zsh
zinit as'null' wait lucid \
    atinit'export JENV_ROOT="$PWD"' \
    atclone'
        JENV_ROOT="$PWD" ./libexec/jenv init - > zjenv.zsh
        JENV_ROOT="$PWD" ./bin/jenv enable-plugin export
        JENV_ROOT="$PWD" ./libexec/jenv init - > zjenv.zsh
    ' \
    atpull"%atclone" \
    src"zjenv.zsh" \
    nocompile'!' \
    sbin"bin/jenv" \
    for jenv/jenv
```

The `atclone` block runs `jenv init` twice: once to bootstrap, enable the export plugin, then again to regenerate the init script with the export plugin's source line included.

## Caveats

`atclone` only runs on first install. If you need to re-enable after changing jenv state, delete the plugin directory and reload to trigger `atclone` again, or manually run the enable commands inside the plugin directory.
