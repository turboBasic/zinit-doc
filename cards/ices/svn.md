---
id: svn
title: "Ice: svn''"
category: ices
tags: [ice, snippet, installation]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [pick, blockf, as]
---

## Summary

`svn` downloads a snippet using the Subversion protocol, which enables checking out an
entire subdirectory from a GitHub repository — something the default HTTPS single-file
download cannot do.

## Syntax / Usage

```zsh
zi ice svn
zi snippet OMZP::gitfast
```

## Details

GitHub supports SVN access to repositories, and Zinit exploits this to download whole
subdirectories as snippets. This is essential for Oh-My-Zsh plugins or Prezto modules
that span multiple files.

After SVN checkout, the `pick''` ice selects which file to source. Default auto-detected
files are `*.plugin.zsh`, `init.zsh`, and `*.zsh-theme`.

Does not work with plugins (only snippets).

## Examples

```zsh
# OMZ plugin that requires multiple files
zi ice svn
zi snippet OMZP::gitfast

# Prezto module
zi ice svn
zi snippet PZTM::git

# SVN + as"null" for modules without a recognizable init file
zi ice svn as"null"
zi snippet PZTM::archive
```

## See Also

- pick
- blockf
- as
