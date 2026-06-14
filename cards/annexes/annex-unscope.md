---
id: annex-unscope
title: "Annex: unscope"
category: annexes
tags: [annex, plugin, installation]
source: https://github.com/zdharma-continuum/zinit-annex-unscope
related: [annex-meta-plugins]
---

## Summary

unscope lets you load plugins by short nicknames or unscoped names (without the `user/` prefix) by resolving them against a curated static mapping or, with the `ghapi` ice, by querying the GitHub API ranked by stars.

## Details

- **Problem it solves:** Typing full `user/repo` IDs for well-known plugins is verbose. unscope lets you write `zinit load fzf` or `zinit for zsh-autosuggestions` and have the full ID resolved automatically.

- **Resolution order:**
  1. Static mapping table (curated list of common short names → full IDs, see below)
  2. GitHub API query for `*/{name}` sorted by forks (requires `ghapi` ice; first tries ≥10 forks, then ≥2, then 0)
  3. Resolved ID is stored on disk for future use without re-querying

- **New ice:**
  - `ghapi` — enables the live GitHub API lookup for names not found in the static mapping; omit it to use only the static table

- **New subcommand:** `zinit scope {name}` — translates a short name or unscoped ID to its full `user/repo` form

- **Static mapping highlights (selection):**
  - `bgn`, `bin-gem-node` → `zdharma-continuum/zinit-annex-bin-gem-node`
  - `rust` → `zdharma-continuum/zinit-annex-rust`
  - `patch-dl` → `zdharma-continuum/zinit-annex-patch-dl`
  - `submods` → `zdharma-continuum/zinit-annex-submods`
  - `f-sy-h`, `fsh` → `zdharma-continuum/fast-syntax-highlighting`
  - `autosug`, `z-asug` → `zsh-users/zsh-autosuggestions`
  - `z-sy-h` → `zsh-users/zsh-syntax-highlighting`
  - `fd`, `bat`, `exa` → their respective sharkdp/ogham repos
  - `null` → `zdharma-continuum/null`

- **Install** (load early so preceding calls also benefit):
  ```zsh
  zinit light-mode for zdharma-continuum/zinit-annex-unscope
  ```

## Examples

```zsh
# Use a static short name
zinit load fsh

# Use ghapi to resolve an unscoped name dynamically
zinit ice ghapi
zinit load some-popular-plugin

# Check what a short name resolves to
zinit scope bgn
# → zdharma-continuum/zinit-annex-bin-gem-node
```

## Caveats / Common Mistakes

- Load this annex as early as possible in `.zshrc`; `zinit` calls before it is loaded will not have short names resolved.
- The maintainers advise using fully-qualified plugin names for security: an API-resolved name is only as trustworthy as the GitHub search result. See the linked security issue in the source repo.
- `ghapi` lookups require network access at shell startup; avoid for latency-sensitive configurations.

## See Also

- [annex-meta-plugins](annex-meta-plugins.md)
