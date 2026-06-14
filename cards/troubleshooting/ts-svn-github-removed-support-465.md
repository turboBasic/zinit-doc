---
id: ts-svn-github-removed-support-465
title: SVN-based snippets broken after GitHub removed Subversion support
category: troubleshooting
tags: [snippet, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/465
related: [ts-omzp-svn-multifile-651]
---

## Summary

GitHub removed SVN (Subversion) support in January 2023. Zinit's `svn` ice relies on GitHub's Subversion bridge to clone subdirectories of a repository (e.g. OMZ or Prezto plugin directories). All configurations using `svn` ice targeting GitHub-hosted repos are permanently broken.

## Symptom

Loading Prezto modules or OMZ plugins that require `svn` ice fails with network errors, authentication errors, or:

```
svn: E170013: Unable to connect to a repository
```

Or the snippet directory remains empty/stale after `zinit update`.

## Cause

GitHub's Subversion bridge (which allowed `svn checkout https://github.com/owner/repo/trunk/subdir`) was shut down. Zinit's `svn` ice uses this mechanism to download a subdirectory of a GitHub repository as a snippet.

## Fix / Workaround

For single-file OMZ snippets, `svn` is not needed — load the specific file directly:

```zsh
# Instead of:
zi ice svn; zi snippet OMZP::gitfast

# Load the specific init file:
zi snippet OMZP::gitfast/gitfast.plugin.zsh
```

For Prezto modules that require multiple files, clone the full repository with `pick` to select the init file:

```zsh
# Instead of:
# zinit ice svn; zinit snippet PZTM::environment

# Clone the full Prezto repo and pick specific modules
zinit ice depth"1" pick"modules/environment/init.zsh"
zinit light sorin-ionescu/prezto
```

Or use `atclone` to clone a nested dependency:

```zsh
zi ice wait lucid depth"1" as"null" \
  atclone"git clone --depth=1 https://github.com/sorin-ionescu/prezto.git external" \
  atpull"%atclone"
zi light zdharma-continuum/null   # placeholder

# Then source from external/
zi ice pick"external/modules/environment/init.zsh"
zi snippet PZTM::environment
```

For OMZ plugins that require the full directory, clone the plugin directory directly via git:

```zsh
# Instead of:
# zinit ice svn; zinit snippet OMZP::gitfast

# Use the full OMZ repo with pick
zinit ice \
    atclone"git clone --depth=1 https://github.com/ohmyzsh/ohmyzsh.git ." \
    atpull"%atclone" \
    pick"plugins/gitfast/gitfast.plugin.zsh"
zinit light ohmyzsh/ohmyzsh
```

## Caveats

- This is a permanent change. SVN-based loading will never work again with GitHub-hosted repositories. All `svn` ice usage targeting GitHub must be migrated.
- The `atclone`/full-repo workaround is heavier than `svn` because it clones the full framework repository. Use `depth"1"` to minimize the clone size.
- Single-file OMZ plugins that were loaded with `svn` only because they live in a subdirectory can often be loaded without `svn` by using their direct raw URL.
