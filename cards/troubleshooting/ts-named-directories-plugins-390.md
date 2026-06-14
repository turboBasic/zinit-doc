---
id: ts-named-directories-plugins-390
title: Navigate to plugin directories using named directories (~plugin-name)
category: troubleshooting
tags: [plugin, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/390
related: []
---

## Summary

Zinit can register each loaded plugin's directory as a Zsh named directory, allowing `~pluginname` as a shorthand for the full plugin path. Without this setup, users must run `zinit cd plugin-name` (with tab completion) to enter a plugin directory.

## Symptom

Navigating to a plugin's directory requires typing or tab-completing the full path or using `zinit cd`:

```zsh
cd ~/.local/share/zinit/plugins/junegunn---fzf   # tedious
zinit cd fzf                                       # works but verbose
```

## Cause

Zsh supports named directories: when a variable is assigned a directory path and is exported with `hash -d`, `~varname` expands to that path. Zinit does not register these by default.

## Fix / Workaround

Add a snippet to `.zshrc` (after zinit loads plugins) that registers all plugin directories as named directories:

```zsh
# Register all zinit plugin dirs as named directories
zinit as'null' nocd id-as'_named-dirs' atload'
  for _dir in $ZINIT[PLUGINS_DIR]/*(N/); do
    hash -d "${${_dir:t}/---//}=${_dir}"
  done
  unset _dir
' for zdharma-continuum/null 2>/dev/null || true
```

Or add the hash block directly in `.zshrc` after `exec zsh` / after plugins load:

```zsh
# After all plugins are loaded
for _dir in $ZINIT[PLUGINS_DIR]/*(N/); do
  hash -d "${${_dir:t}/---//}=${_dir}"
done
unset _dir
```

Then navigate using the named directory:

```zsh
pushd ~fzf
# /home/user/.local/share/zinit/plugins/junegunn---fzf
ls ~fzf
```

## Caveats

Plugin directory names use `---` as the separator between user and repo (e.g. `junegunn---fzf`). The substitution `${name/---//}` converts that to `junegunn/fzf`. If two plugins from different users share the same repo name, only one named directory will be registered. Tab completion for `~` named dirs works with `setopt AUTO_CD` and standard Zsh completion.
