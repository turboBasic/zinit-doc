---
id: show-and-tell-multiple-git-extensions-bgn
title: "Show & Tell: Multiple git extension tools loaded in turbo with sbin shims"
category: concepts
tags: [binary, annex, turbo, git, performance]
source: https://github.com/zdharma-continuum/zinit/discussions/391
related: [ts-tmux-binary-bgn-shim, ts-cargo-binary-update]
---

## Summary

A concise pattern from the zinit README for loading multiple git extension tools from GitHub in turbo mode, 1 second after the prompt, using the `zinit-annex-bin-gem-node` `sbin` ice for shim creation.

## Details

Key points:
- `as'null'` disables script sourcing (these are command-line tools, not zsh plugins)
- `sbin` creates shims in `$ZPFX/bin` (automatically in PATH)
- `lucid` suppresses the "Loaded" message
- `wait'1'` defers loading to 1 second after prompt, keeping startup fast
- Tools without special config are just listed by their `user/repo`
- Tools needing post-install steps use `atload` or `make` ices per-entry in the `for` block

## Examples

```zsh
zi as'null' lucid sbin wait'1' for \
    Fakerr/git-recall \
    davidosomething/git-my \
    iwata/git-now \
    paulirish/git-open \
    paulirish/git-recent \
        atload'export _MENU_THEME=legacy' \
    arzzen/git-quick-stats \
        make'install' \
    tj/git-extras \
        make'GITURL_NO_CGITURL=1' \
        sbin'git-url;git-guclone' \
    zdharma-continuum/git-url
```

Target install directory is `$ZPFX` (`~/.local/share/zinit/polaris` by default, which is prepended to `$PATH`).

## See Also

- The `zinit-annex-bin-gem-node` annex documentation for the full `sbin` spec.
