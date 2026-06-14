---
id: from
title: "Ice: from''"
category: ices
tags: [ice, git, installation, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [ver, as, bpick, proto]
---

## Summary

`from''` specifies the source host or service from which a plugin is cloned. It is
required when fetching binary releases from GitHub Releases (`gh-r`) or loading from
non-default Git forges.

## Syntax / Usage

```zsh
# GitHub Releases (binary downloads)
zi ice from"gh-r"
zi load junegunn/fzf

# Alternate forge short names
zi ice from"gl"    # GitLab
zi ice from"bb"    # Bitbucket
zi ice from"nb"    # NotABug
zi ice from"gh"    # GitHub (explicit, same as default)

# Full domain (e.g. self-hosted GitHub Enterprise)
zi ice from"git.corp.example.com"
```

## Details

The default value is `github` (short: `gh`), so `from''` is only needed when deviating
from GitHub plugin loading.

The special value `gh-r` (alias `github-rel`) instructs Zinit to download from the
GitHub Releases page rather than cloning the repository. This is typically paired with
`as"program"` and optionally `bpick''` to select the right release asset.

Other supported short names: `github` / `gh`, `github-rel` / `gh-r`, `gitlab` / `gl`,
`bitbucket` / `bb`, `notabug` / `nb`.

Does not work with snippets.

## Examples

```zsh
# Download fzf binary from GitHub Releases
zi ice from"gh-r" as"program"
zi light junegunn/fzf

# Rename the downloaded asset and select the Linux build
zi ice from"gh-r" as"program" mv"docker* -> docker-compose" bpick"*linux*"
zi load docker/compose

# Load a plugin from GitLab
zi ice from"gl"
zi load user/plugin
```

## See Also

- ver
- bpick
- as
- proto
