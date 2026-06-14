---
id: local-plugins
title: Local (Non-GitHub) Plugins
category: concepts
tags: [plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [zinit-home-directory, plugins-vs-snippets, load-vs-light]
---

## Summary

Zinit can load plugins from the local filesystem using absolute paths or the `_local` user convention, enabling development and testing of plugins without publishing them to GitHub.

## Details

Two approaches exist for local plugins:

**Absolute path:** pass a full filesystem path to `zinit load`. Zinit treats the directory as a plugin and sources the appropriate entry file.

**`create` subcommand with `_local` user:** running `zinit create _local/myplugin` scaffolds a plugin skeleton inside `$ZINIT[PLUGINS_DIR]/_local---myplugin`. Zinit recognizes the `_local` prefix as a signal that no GitHub remote should be created. To enter the plugin directory afterwards, use `zinit cd myplugin` (the `_local` prefix is optional in `cd`).

If a non-`_local` user name is specified with `create`, Zinit will also set up a GitHub repository and configure the remote accordingly.

Local plugins support all ices and can be loaded with `load` (with reporting) or `light` (without).

## Examples

```zsh
# Load from an absolute path
zinit load /home/user/projects/my-zsh-plugin

# Scaffold a local plugin
zinit create _local/my-utils
# → creates $ZINIT[PLUGINS_DIR]/_local---my-utils/

# Load the scaffolded plugin
zinit load _local/my-utils

# Navigate into the plugin directory
zinit cd my-utils   # _local prefix optional

# Install completions stored locally
zinit creinstall %HOME/my_completions
```

## Caveats / Common Mistakes

- Local plugins loaded via absolute path are not tracked with `zinit update --all`; updates must be managed manually.
- The `_local` user name is a Zinit convention, not a filesystem requirement. The plugin directory must still exist and contain a valid entry file.
