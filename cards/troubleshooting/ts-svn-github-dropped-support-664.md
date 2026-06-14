---
id: ts-svn-github-dropped-support-664
title: "SVN-based snippets fail after GitHub dropped SVN support"
category: troubleshooting
tags: [snippet, ice, installation, troubleshooting, migration]
source: https://github.com/zdharma-continuum/zinit/issues/664
related: [ts-omzp-multi-file-svn-481]
---

## Summary

As of January 8, 2024, GitHub removed SVN support. Any snippet using `zinit ice svn` to download OMZ or other GitHub-hosted multi-file plugins now fails to connect.

## Symptom

```
Setting up snippet: OMZ::plugins/git
==> Downloading OMZ::plugins/git (with Subversion)
svn: E170013: Unable to connect to a repository at URL 'https://github.com/ohmyzsh/ohmyzsh/trunk/plugins/git'
svn: E160013: '/ohmyzsh/ohmyzsh/trunk/plugins/git' path not found
```

## Cause

GitHub officially sunset SVN support. The `svn` ice relied on GitHub's SVN bridge to download entire subdirectories as snippets. That bridge no longer exists.

## Fix / Workaround

For OMZ plugins that consist of a single `.zsh` file, use the direct URL without `svn`:

```zsh
# Before (broken)
zinit ice svn
zinit snippet OMZP::git

# After — single-file plugins
zinit snippet OMZP::git
```

For multi-file OMZ plugins, clone the entire plugin as a regular zinit plugin using `load` or `light`:

```zsh
# Load a multi-file OMZ plugin by cloning ohmyzsh and picking the subdirectory
zinit ice pick"plugins/aliases/aliases.plugin.zsh" \
            atclone"git sparse-checkout set plugins/aliases" \
            cloneopts"--sparse --filter=blob:none"
zinit load ohmyzsh/ohmyzsh
```

Alternatively, use the `atclone` ice to fetch only the needed files after cloning the repo.

## Caveats

There is no drop-in replacement for the SVN multi-file download path for GitHub. Each multi-file plugin requires a per-plugin workaround.
