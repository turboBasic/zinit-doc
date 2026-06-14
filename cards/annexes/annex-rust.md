---
id: annex-rust
title: "rust"
category: annexes
tags: [annex, ice, binary, command, installation]
source: https://github.com/zdharma-continuum/zinit-annex-rust
related: [annex-bin-gem-node]
---

## Summary

zinit-annex-rust installs Rust (via `rustup`) and Cargo crates locally inside plugin directories, then creates shim scripts in `$ZPFX/bin` to expose the installed binaries without modifying the global Rust installation.

## Details

- **Problem it solves:** Installing Rust crates globally pollutes the system Cargo/rustup installation and makes per-project or per-tool isolation impossible. This annex scopes Rust and each crate inside the plugin directory.

- **New ices:**
  - `rustup` — installs Rust (rustup + cargo) locally into the plugin directory; sets `$RUSTUP_HOME` and `$CARGO_HOME` to point inside the directory
  - `cargo'…'` — installs one or more crates and optionally creates shims; syntax:
    ```
    cargo'[binary-name <-] [!][c|N|E|O:]{crate-name} [-> shim-name]; …'
    ```
    Flags: `!` creates a shim in `$ZPFX/bin`; `c` cd into plugin dir before running; `N`/`E`/`O` redirect stdout+stderr / stderr / stdout to `/dev/null`. Multiple crates separated by `;`.

- **Shim structure:** Each shim sets `$RUSTUP_HOME` and `$CARGO_HOME` to the plugin directory, prepends the plugin's `bin/` to `$PATH`, and calls the binary via its embedded absolute path.

- **Install:**
  ```zsh
  zinit light zdharma-continuum/zinit-annex-rust
  ```

## Examples

```zsh
# Install Rust locally + lsd crate + shim
zinit ice rustup cargo'!lsd'
zinit load zdharma-continuum/null

# exa crate exposed as 'ls'
zi ice rustup cargo'!exa -> ls'
zi load zdharma-continuum/null

# Multiple crates, no shims (use pick + as"command" to add to $PATH instead)
zinit ice rustup cargo'exa;lsd' as"command" pick"bin/(exa|lsd)"
zinit load zdharma-continuum/null

# exa with stderr suppressed
zinit ice rustup cargo'!E:exa'
zinit load zdharma-continuum/null

# Global Rust install in turbo mode, exported for subsequent cargos
zi ice \
    id-as"rust" \
    wait"0" \
    lucid \
    rustup \
    as"command" \
    pick"bin/rustc" \
    atload='export CARGO_HOME=$PWD RUSTUP_HOME=$PWD/rustup'
zi load zdharma-continuum/null

# Subsequent crate that waits for $CARGO_HOME and $RUSTUP_HOME to be set
zi for \
    wait='[[ -v CARGO_HOME && -v RUSTUP_HOME ]]' \
    id-as'rust-exa' \
    cargo'!exa' \
  zdharma-continuum/null
```

## Caveats / Common Mistakes

- When using a global Rust install (exported via `atload`), subsequent `cargo''` ices must omit `rustup` and use a `wait` condition that checks `$CARGO_HOME`/`$RUSTUP_HOME` are set, or crates will try to install their own Rust.
- First-time installation downloads the full Rust toolchain and compiles crates from source — this takes several minutes.
- The `!` flag on `cargo` creates a shim; without it the binary is compiled but not exposed on `$PATH`.
