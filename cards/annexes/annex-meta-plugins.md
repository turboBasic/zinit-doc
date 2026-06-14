---
id: annex-meta-plugins
title: "meta-plugins"
category: annexes
tags: [annex, plugin, package, installation]
source: https://github.com/zdharma-continuum/zinit-annex-meta-plugins
related: [annex-unscope]
---

## Summary

meta-plugins lets you install curated groups of related plugins with a single label and automatically applies optimised ice lists for each member, removing the need to track individual plugin ices or plugin names.

## Details

- **Problem it solves:** Collecting and maintaining individual plugin invocations across machines is tedious. A meta-plugin groups related plugins under one name and manages their ices transparently.

- **Key capabilities:**
  - One label installs multiple plugins with pre-tuned ices
  - Dependency handling: selecting a meta-plugin can automatically pull in required toolchains (e.g., `console-tools` pulls in `rust-toolchain` for source-built tools)
  - `skip'plg-1 plg-2'` ice lets you exclude specific sub-plugins from a group
  - Source-build variants exist alongside binary variants (e.g., `fuzzy` vs `fuzzy-src`)

- **Available meta-plugins (selection):**
  - `annexes` — core zdharma-continuum annexes (unscope, patch-dl, rust, submods, bin-gem-node, as-monitor)
  - `annexes+con` — `annexes` plus zinit-console
  - `zsh-users` — zsh-syntax-highlighting, zsh-autosuggestions, zsh-completions
  - `zsh-users+fast` — fast-syntax-highlighting, zsh-autosuggestions, zsh-completions
  - `console-tools` — fd, bat, hexyl, hyperfine, vivid, exa, ripgrep, tig
  - `fuzzy` — fzf, fzy, skim, peco (binary packages)
  - `fuzzy-src` — same tools built from source
  - `sharkdp` — fd, bat, hexyl, hyperfine, vivid
  - `ext-git` — git-recall, git-open, git-recent, git-my, git-quick-stats, git-now, git-extras, forgit
  - `zdharma` — fast-syntax-highlighting, history-search-multi-word, zsh-diff-so-fancy
  - `rust-utils` — rust-toolchain, cargo-extensions
  - `prezto` — PZTM::archive, PZTM::directory, PZTM::utility
  - `developer` — github-issues, molovo tools, gitignore, tig

- **Install:**
  ```zsh
  zinit light zdharma-continuum/zinit-annex-meta-plugins
  ```

## Examples

```zsh
# Install 22 plugins across three groups in one line
zinit for annexes zsh-users+fast console-tools fuzzy

# Skip specific sub-plugins you don't want
zinit skip'ripgrep fd' for console-tools

# Install all annexes at once
zinit for annexes
```

## Caveats / Common Mistakes

- The meta-plugin `console-tools` may trigger a Rust toolchain install if source-built tools are included; this takes significant time on first run.
- Sub-plugin ices are managed by the annex — do not mix manual ices on a `for` call targeting a meta-plugin unless you understand the override precedence.
