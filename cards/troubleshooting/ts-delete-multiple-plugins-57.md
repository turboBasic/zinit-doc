---
id: ts-delete-multiple-plugins-57
title: zinit delete only accepts one plugin at a time
category: troubleshooting
tags: [command, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/57
related: []
---

## Summary

`zinit delete` does not accept multiple plugin specs in a single invocation. Attempting to pass several names deletes only the first or errors out.

## Symptom

```zsh
zinit delete -y plugin1 plugin2 plugin3
```

Only `plugin1` is deleted, or the command errors on the additional arguments.

## Cause

The `delete` subcommand was designed to operate on a single plugin or snippet spec, or the special flags `--all` and `--clean`. Multiple positional arguments are not supported.

## Fix / Workaround

Delete plugins one at a time:

```zsh
zinit delete -y plugin1
zinit delete -y plugin2
zinit delete -y plugin3
```

Or use a loop:

```zsh
for p in plugin1 plugin2 plugin3; do
  zinit delete -y "$p"
done
```

To remove all plugins and snippets at once:

```zsh
zinit delete --all
```

To remove only plugins not currently loaded:

```zsh
zinit delete --clean
```

## Caveats

`--all` is destructive and removes all zinit-managed data. Use `--clean` for a safer purge of orphaned entries.
