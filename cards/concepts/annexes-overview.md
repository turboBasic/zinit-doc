---
id: annexes-overview
title: Annexes Overview
category: concepts
tags: [annex, plugin, command, binary]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [ice-modifiers-overview, zinit-home-directory, plugin-report]
---

## Summary

Annexes are Zinit extensions loaded as plugins that add new commands, URL preprocessors, post-install hooks, and other capabilities to the plugin manager itself.

## Details

An annex is a regular plugin that Zinit recognizes as an extension and integrates deeply. Once loaded, an annex can:

- Add new subcommands to the `zinit` command.
- Register URL preprocessors that transform plugin/snippet URLs before fetching (used by `zinit-annex-readurl` to derive download URLs from web pages automatically).
- Register post-install and post-update hooks that run transparently after cloning or updating.
- Expose new ices (e.g. `sbin`, `fbin`, `gem`, `node`, `pip`, `rustup` from the Bin-Gem-Node annex).

Annexes are maintained in the `zdharma-continuum` GitHub organization. The four commonly used default annexes are:

| Annex                      | Purpose                                                           |
| -------------------------- | ----------------------------------------------------------------- |
| `zinit-annex-readurl`      | Auto-derive download URLs from web pages                          |
| `zinit-annex-bin-gem-node` | Install binaries, Ruby gems, Node packages, Rust crates via shims |
| `zinit-annex-patch-dl`     | Download and apply patches before building                        |
| `zinit-annex-rust`         | Install and manage Rust toolchain and crates                      |

Annexes are loaded the same way as plugins, typically with `light-mode` to skip reporting overhead.

## Examples

```zsh
# Load the four default annexes
zinit light-mode for \
  zdharma-continuum/zinit-annex-readurl \
  zdharma-continuum/zinit-annex-bin-gem-node \
  zdharma-continuum/zinit-annex-patch-dl \
  zdharma-continuum/zinit-annex-rust

# Using sbin ice from bin-gem-node annex to install a shim
zi as'null' lucid sbin wait'1' for \
  Fakerr/git-recall \
  paulirish/git-open
```

## See Also

- `zinit-home-directory` for where annex data is stored.
