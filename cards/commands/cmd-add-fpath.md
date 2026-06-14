---
id: cmd-add-fpath
title: "Command: zi add-fpath / zi fpath"
category: commands
tags: [command, plugin, completion]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-load, cmd-creinstall, cmd-completions]
---

## Summary

Add a plugin's directory (or a subdirectory of it) to `$fpath` without loading or sourcing the plugin. Use this to expose completions or autoload functions without running any plugin code.

## Syntax / Usage

```zsh
zi add-fpath [-f|--front] {plg-spec} [subdirectory]
zi fpath     [-f|--front] {plg-spec} [subdirectory]
```

- `-f` / `--front` — prepend the directory to `$fpath` instead of appending.
- `subdirectory` — optional path segment appended to the plugin directory. Useful when completions live in a `completions/` or `functions/` subdirectory.
- `{plg-spec}` can be an absolute path, so regular non-plugin directories can also be added.

## Details

Resolves the plugin spec to a local directory path and adds it (or a subdirectory) to `$fpath`. Does not source any files. The change is immediate for the current session but is not automatically replayed on the next shell start — place the call in `.zshrc` to make it persistent. Only works with plugins, not snippets.

## Examples

```zsh
# Add plugin's root directory to fpath
zi add-fpath zsh-users/zsh-completions

# Add a completions/ subdirectory, prepended to fpath
zi add-fpath --front some-user/some-plugin completions

# Add an absolute local path
zi add-fpath /home/user/my-functions
```

## Caveats / Common Mistakes

This command does not install symlinks into `$ZINIT[COMPLETIONS_DIR]` — it directly modifies `$fpath`. Use `zi creinstall` instead if you want Zinit to manage the completion symlinks in the standard way.

## See Also

- cmd-load
- cmd-creinstall
- cmd-completions
