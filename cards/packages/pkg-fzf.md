---
id: pkg-fzf
title: "Package: fzf"
category: packages
tags: [package, binary, command, completion, ice, annex]
source: https://github.com/zdharma-continuum/zinit-packages
related: [pkg-overview, pkg-fzy]
---

## Summary

Installs fzf (junegunn/fzf), the command-line fuzzy finder, along with shell completions and optional key-bindings. Multiple profiles cover source builds, pre-built binaries, and `bin-gem-node` shim variants.

## Syntax / Usage

```zsh
zi pack for junegunn/fzf
zi pack"<profile>" for junegunn/fzf
```

Available profiles: `default`, `default+keys`, `bgn`, `bgn+keys`, `binary`, `binary+keys`, `bgn-binary`, `bgn-binary+keys`.

## Details

- Provides: `fzf` and `fzf-tmux` binaries in `$ZPFX/bin`, man pages in `$ZPFX/man/man1`, and `_fzf_completion` completion file.
- `default` profile ices: `as"command"`, `depth"1"`, `nocompile`, `lucid`, `id-as"junegunn/fzf"`, `atclone` (runs `make install` via Go), `atpull"%atclone"`, `pick"$ZPFX/bin/fzf(|-tmux)"`.
- `+keys` variants additionally set `src"shell/key-bindings.zsh"` to source fzf key-bindings into the shell.
- `bgn`/`bgn-binary` variants use `sbin` instead of `pick` and require the `bin-gem-node` annex; these avoid modifying `PATH` directly.
- `binary`/`bgn-binary` variants download a pre-built release from GitHub Releases (`from"gh-r"`) instead of compiling.
- Requires for source profiles: `go`, `make`, `cp`. Requires for binary profiles: `cp` (and `dl` annex for `+keys` variants).

## Examples

```zsh
# Build from source, add key-bindings
zi pack"default+keys" for junegunn/fzf

# Pre-built binary, no key-bindings, bgn shim
zi pack"bgn-binary" for junegunn/fzf

# Pre-built binary with key-bindings
zi pack"bgn-binary+keys" for junegunn/fzf
```

## Caveats / Common Mistakes

- Source profiles require Go to be in PATH at install time; they will fail silently if `go` is missing.
- The `bgn` family requires `zdharma-continuum/zinit-annex-bin-gem-node` to be loaded first.

## See Also

- [pkg-fzy](pkg-fzy.md) — alternative fuzzy finder
- [pkg-overview](pkg-overview.md) — how `zi pack` works
