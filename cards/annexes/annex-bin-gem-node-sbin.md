---
id: annex-bin-gem-node-sbin
title: "Ice: sbin (bin-gem-node)"
category: annexes
tags: [ice, binary, command, annex]
source: https://github.com/zdharma-continuum/zinit-annex-bin-gem-node
related: [annex-bin-gem-node]
---

## Summary

`sbin` is the primary ice from the bin-gem-node annex. It creates a shim script in `$ZPFX/bin` that forwards execution to a binary inside a plugin directory, keeping `$PATH` clean.

## Details

- **Problem it solves:** Each plugin loaded as `as"command"` appends its directory to `$PATH`. With `sbin`, all shims live in a single `$ZPFX/bin` entry (already on `$PATH`), so no additional directories accumulate.

- **How shims work:** The generated script is a small `#!/usr/bin/env zsh` wrapper that calls the binary via its embedded absolute path. This means the shim works from any Zsh script, not just interactive sessions (unlike `fbin`-created functions).

- **Syntax:**
  ```
  sbin'[{g|n|c|N|E|O}:]{path-to-binary}[ -> {name-of-the-script}]'
  ```
  Flags: `g` set `$GEM_HOME`, `n` set `$NODE_PATH`, `c` cd into plugin dir before running, `N`/`E`/`O` redirect stdout+stderr / stderr / stdout to `/dev/null`.

- **`!` modifier:** Prefix the value with `!` (e.g., `sbin"!fzf"`) to generate a shim with shebang `#!/usr/bin/env -S zsh -fd`, which skips all RC files. This cuts 100–200 ms from startup for CLI tools that don't need `.zshrc`.

- **Empty ice:** When no value is provided, `sbin` auto-resolves the binary name from (in order): `id_as` trailing segment, plugin name, snippet URL trailing segment, or the alphabetically first executable file.

- **Cygwin:** On Cygwin, `sbin` additionally creates a `.cmd` Windows batch script alongside the standard shim, enabling calls from Windows Run or batch scripts.

## Examples

```zsh
# Basic shim for fzf downloaded from GitHub releases
zinit ice from"gh-r" sbin"fzf"
zinit load junegunn/fzf-bin

# Fast shim — skip RC files on every invocation
zinit ice from"gh-r" sbin"!fzf"
zinit load junegunn/fzf-bin

# Rename the shim
zinit ice from"gh-r" sbin"fzf -> myfzf"
zinit load junegunn/fzf-bin

# Multiple binaries from one plugin
zinit ice from"gh-r" sbin"bin/pk;bin/gp"
zinit load peco/peco

# Empty sbin — auto-detects the binary
zinit ice from"gh-r" sbin
zinit load junegunn/fzf-bin
```

## Caveats / Common Mistakes

- Use `sbin` (not `fbin`) when the command needs to work in non-interactive scripts or cron jobs.
- Avoid `!` if the binary depends on shell configuration from `.zshrc` or `.zshenv`, or if launched from a GUI app that requires those environment variables.
- For simple binaries with no subprocess or sourcing needs, consider `lbin` from `zinit-annex-binary-symlink` which uses symlinks instead of shim scripts.

## See Also

- [annex-bin-gem-node](annex-bin-gem-node.md)
