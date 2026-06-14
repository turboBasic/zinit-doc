---
id: ts-local-plugin-create
title: Creating and loading a local (non-GitHub) plugin
category: troubleshooting
tags: [plugin, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/113
related: [ts-zinit-hash-custom-paths]
---

## Summary

Use `zinit create _local/myplugin` to scaffold a local plugin in the zinit plugins directory that is not connected to GitHub. Load it with `zinit load _local/myplugin`.

## Question / Problem

A user wants to keep personal shell functions and aliases in a zinit-managed plugin without publishing to GitHub, so they can use zinit's reporting and unloading features.

## Answer / Solution

Create a local plugin scaffold:

```zsh
zinit create myplugin   # creates in $ZINIT[PLUGINS_DIR]/_local---myplugin
```

The `_local` namespace is special — zinit will not attempt to clone it from GitHub. Navigate to the plugin directory and add your shell code:

```zsh
zinit cd myplugin   # cd into _local---myplugin directory
```

Create `myplugin.plugin.zsh` (zinit auto-sources files matching `*.plugin.zsh`):

```zsh
# ~/.local/share/zinit/plugins/_local---myplugin/myplugin.plugin.zsh
alias myalias='echo hello'
my_function() { echo "my function"; }
```

Load it in `.zshrc`:

```zsh
zinit load _local/myplugin    # loads with reporting (zinit report, zinit unload)
# or
zinit light _local/myplugin   # loads without reporting
```

## Examples

To use an absolute path instead of the `_local` convention:

```zsh
zinit load $HOME/my-scripts    # absolute path, any directory
```

## Caveats

If you specify a username other than `_local`, zinit will attempt to create a corresponding GitHub repository. Use `_local` explicitly to prevent this.
