---
id: link
title: "link"
category: ices
tags: [ice, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [id-as]
---

## Summary

`link` causes a local snippet to be symlinked into the Zinit snippets directory rather
than copied. This keeps the local source file in sync automatically.

## Syntax / Usage

```zsh
zi ice link
zi snippet /path/to/local/file.zsh
```

## Details

For local file snippets (non-URL), Zinit normally copies the file into its snippets
cache. With `link`, a symlink is created instead. Changes to the source file are
immediately reflected without needing to update the snippet.

Uses relative symlinks when `realpath` version 8.23 or later is available.

Does not apply to URL-based snippets. Does not work with plugins.

## Examples

```zsh
# Symlink a local dotfiles script rather than copying it
zi ice link
zi snippet ~/dotfiles/zsh/aliases.zsh
```

## See Also

- id-as
