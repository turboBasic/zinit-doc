---
id: annex-bin-gem-node
title: "Annex: bin-gem-node"
category: annexes
tags: [annex, binary, command, package, ice]
source: https://github.com/zdharma-continuum/zinit-annex-bin-gem-node
related: [annex-bin-gem-node-sbin, annex-rust]
---

## Summary

bin-gem-node (BGN) lets you expose binaries, Ruby gems, Node modules, and Python packages from plugin directories without polluting `$PATH`. It creates shim scripts or wrapper functions that forward calls to the real binary using an embedded absolute path.

## Details

- **Problem it solves:** Loading many binary plugins via `as"command"` appends every plugin directory to `$PATH`, making it long and slow to scan. BGN keeps `$PATH` clean by writing a single shim into `$ZPFX/bin` (already on `$PATH`) or creating a Zsh wrapper function.

- **New ices:**
  - `sbin` — creates a shim script in `$ZPFX/bin`; preferred over `fbin` for most use cases; prefix with `!` to start zsh with `-fd` (no RC files, faster startup)
  - `fbin` — creates a Zsh wrapper function (lives only in the current session); supports flags `g` (set `$GEM_HOME`), `n` (set `$NODE_PATH`), `p` (set `$VIRTUALENV`), `c` (cd into plugin dir), `N`/`E`/`O` (redirect output)
  - `gem` — installs a Ruby gem locally into the plugin directory with `$GEM_HOME` set; optionally creates a wrapper function
  - `node` — installs a Node module locally with `$NODE_PATH` set; optionally creates a wrapper function
  - `pip` — installs a Python package into a local virtualenv with `$VIRTUALENV` set; optionally creates a wrapper function
  - `fmod` — wraps an existing shell function to run with `$GEM_HOME`/`$NODE_PATH`/`cd` context
  - `fsrc` / `ferc` — creates a function that sources a script on each invocation (`ferc` uses `eval "$(<file)"` instead of `source`)

- **Additional command:** `zinit shim-list` — lists shims stored in `$ZPFX/bin` with options `-c`, `-i`, `-o`, `-s`, `-t`

- **Install:**
  ```zsh
  zinit light zdharma-continuum/zinit-annex-bin-gem-node
  ```

## Examples

```zsh
# Install fzf from GitHub releases; create a shim instead of adding to $PATH
zinit ice from"gh-r" sbin"fzf"
zinit load junegunn/fzf-bin

# Shim with no RC files loaded (faster for CLI tools)
zinit ice from"gh-r" sbin"!fzf"
zinit load junegunn/fzf-bin

# Install a Ruby gem locally and expose its binary
zinit ice gem'!asciidoctor'
zinit load zdharma-continuum/null

# Install a Node module and expose the binary (binary name differs from module name)
zi for \
    as'null' \
    id-as'remark' \
    node'remark <- !remark-cli -> remark; remark-man' \
  @zdharma-continuum/null

# Install a Python package locally and expose it
zi for \
    as'null' \
    id-as'ansible' \
    pip'ansible <- !ansible -> ansible; ansible-lint' \
  @zdharma-continuum/null
```

## Caveats / Common Mistakes

- `fbin`-created functions exist only in the live Zsh session; use `sbin` if the command must be callable from scripts.
- The `!` prefix on `sbin` skips `.zshrc`/`.zshenv` — do not use it if the binary depends on shell configuration or when calling from a GUI launcher that needs environment variables from `.zshenv`.
- `sbin` can be left empty; it will auto-detect the binary name from `id_as`, plugin name, snippet URL, or the alphabetically first executable.

## See Also

- [annex-bin-gem-node-sbin](annex-bin-gem-node-sbin.md)
- [annex-rust](annex-rust.md)
