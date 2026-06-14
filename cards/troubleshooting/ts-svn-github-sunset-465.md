---
id: ts-svn-github-sunset-465
title: SVN-based Prezto/OMZ snippets break after GitHub SVN deprecation
category: troubleshooting
tags: [snippet, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/465
related: []
---

## Summary

Zinit's `svn` ice relies on GitHub's Subversion bridge to clone subdirectories of a repository (e.g. OMZ or Prezto plugin directories). GitHub announced the removal of SVN support in January 2024. Configurations using `svn` for OMZ/Prezto plugins will stop working.

## Symptom

After GitHub removed SVN support, snippets using `zinit ice svn` fail to clone or update:

```
svn: E170013: Unable to connect to a repository
```

Or the snippet directory remains empty/stale after `zinit update`.

## Cause

GitHub's Subversion bridge (which allowed `svn checkout https://github.com/owner/repo/trunk/subdir`) was shut down. Zinit's `svn` ice uses this mechanism to download a subdirectory of a GitHub repository as a snippet.

## Fix / Workaround

For Prezto modules, use the full git repository with `pick` to select the init file:

```zsh
# Instead of:
# zinit ice svn; zinit snippet PZTM::environment

# Clone the full Prezto repo and pick specific modules
zinit ice svn as"null" \
    atclone"git clone --depth=1 https://github.com/sorin-ionescu/prezto.git ." \
    atpull"%atclone" \
    pick"modules/environment/init.zsh"
zinit light sorin-ionescu/prezto
```

For OMZ plugins that require the full directory, clone the plugin directory directly via git:

```zsh
# Instead of:
# zinit ice svn; zinit snippet OMZP::gitfast

# Use the full OMZ repo with multisrc or pick
zinit ice \
    atclone"git clone --depth=1 https://github.com/ohmyzsh/ohmyzsh.git ." \
    atpull"%atclone" \
    pick"plugins/gitfast/gitfast.plugin.zsh"
zinit light ohmyzsh/ohmyzsh
```

## Caveats

The workaround is heavier than `svn` because it clones the full framework repository. Use `depth"1"` to minimize the clone size. Single-file OMZ plugins that were loaded with `svn` only because they live in a subdirectory can often be loaded without `svn` by using their direct raw URL.
