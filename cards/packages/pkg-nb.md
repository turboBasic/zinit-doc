---
id: pkg-nb
title: "nb"
category: packages
tags: [package, binary, command, completion, annex, installation]
source: https://github.com/zdharma-continuum/zinit-packages
related: [pkg-overview]
---

## Summary

Installs `nb` (xwmx/nb), a single-script CLI note-taking, bookmarking, and archiving tool, along with its Zsh completion file.

## Syntax / Usage

```zsh
zi pack for xwmx/nb
```

One profile: `default`.

## Details

- Provides: `nb` binary shim (via `sbin"nb"`) and `_nb` completion (linked from `etc/nb-completion.zsh`).
- Profile ices: `as"completion"`, `sbin"nb"`, `nocompile`, `depth"3"`, `atclone"ln -sfv etc/nb-completion.zsh _nb"`. Requires the `bin-gem-node` annex and `bash`.
- `as"completion"` causes zinit to register the repo as a completion source; the symlinked `_nb` file is the completion function.
- `depth"3"` limits the git clone depth to reduce download size.

## Examples

```zsh
zi pack for xwmx/nb
```

## Caveats / Common Mistakes

- `nb` is a bash script; `bash` must be available at runtime.
- Requires the `bin-gem-node` annex for the `sbin` ice.

## See Also

- [pkg-overview](pkg-overview.md) — how `zi pack` works
