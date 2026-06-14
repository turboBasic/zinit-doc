---
id: ver
title: "Ice: ver''"
category: ices
tags: [ice, git, binary, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [from, depth]
---

## Summary

`ver''` selects a specific version (tag, branch, or `latest`) when downloading binary
releases from GitHub Releases (`from"gh-r"`) or when checking out a plugin at a
specific branch or tag.

## Syntax / Usage

```zsh
zi ice from"gh-r" ver"latest"      # explicit latest (same as omitting ver)
zi ice from"gh-r" ver"v1.2.3"      # specific release tag
zi ice ver"main"                    # checkout a branch
zi ice ver"abranch"                 # any branch or tag name
```

## Details

When used with `from"gh-r"`, `ver''` picks the GitHub Release to download. The default
(when `ver` is omitted) is `latest`.

When used with regular plugins (git clone), `ver''` specifies the branch or tag to
check out. This is equivalent to the `at` tag in Zplug.

Does not work with snippets.

## Examples

```zsh
# Pin fzf to a specific release
zi ice from"gh-r" as"program" ver"0.42.0"
zi light junegunn/fzf

# Load a plugin from a non-default branch
zi ice ver"develop"
zi load some/plugin
```

## See Also

- from
- depth
