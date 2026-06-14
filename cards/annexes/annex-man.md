---
id: annex-man
title: "man"
category: annexes
tags: [annex, plugin]
source: https://github.com/zdharma-continuum/zinit-annex-man
related: []
---

## Summary

zinit-annex-man automatically generates man pages for installed plugins and snippets — both from their README.md files (via `ronn`) and as code-documentation pages (via `zshelldoc`) — and provides the `zman` command to view them.

## Details

- **Problem it solves:** Plugin README files and source code documentation are not accessible as man pages by default. This annex hooks into plugin clone and update events to generate and register manpages on the fly.

- **Capabilities added:**
  - README-based manpages generated using [ronn](https://github.com/rtomayko/ronn)
  - Code-documentation manpages generated using [zshelldoc](https://github.com/zdharma-continuum/zshelldoc)
  - `zman` command to view either type of page

- **Dependencies:** `ruby` (with `gem`), `ruby-dev`, `tree`, and `zshelldoc` must be installed before loading this annex.

- **Install:**
  ```zsh
  zinit light zdharma-continuum/zinit-annex-man
  ```

## Examples

```zsh
# View the README-based manpage for a plugin
zman zinit-annex-man

# View the code-documentation manpage for a plugin (use full plugin name)
zman -c zdharma-continuum/zinit-annex-man
```

## Caveats / Common Mistakes

- All dependencies (`ruby`, `ruby-dev`, `tree`, `zshelldoc`) must be present before loading the annex, or manpage generation will silently fail.
- Manpages are generated at clone and update time; plugins installed before the annex is loaded will not have pages until they are updated.
