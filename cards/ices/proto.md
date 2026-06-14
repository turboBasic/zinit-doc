---
id: proto
title: "Ice: proto''"
category: ices
tags: [ice, git, plugin, installation]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [from, cloneopts]
---

## Summary

`proto''` overrides the protocol used for `git clone`. The default is `https`; use this
ice to switch to `ssh`, `git`, or other supported protocols.

## Syntax / Usage

```zsh
zi ice proto"ssh"
zi ice proto"git"
zi ice proto"ftp"
zi ice proto"ftps"
zi ice proto"rsync"
```

## Details

Supported protocol values: `git`, `ftp`, `ftps`, `ssh`, `rsync`, and the default
`https`.

Does not work with snippets.

## Examples

```zsh
# Clone via SSH (useful for private repos or SSH-keyed GitHub access)
zi ice proto"ssh"
zi load user/private-plugin
```

## See Also

- from
- cloneopts
