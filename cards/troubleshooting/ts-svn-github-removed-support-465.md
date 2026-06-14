---
id: ts-svn-github-removed-support-465
title: SVN-based snippets broken after GitHub removed Subversion support
category: troubleshooting
tags: [snippet, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/465
related: [ts-svn-github-sunset-465, ts-omzp-svn-multifile-651]
---

## Summary
GitHub removed SVN (Subversion) support in January 2023, breaking zinit snippets that used `svn` ice to clone multi-file OMZ/Prezto plugin directories.

## Symptom
Loading Prezto modules or OMZ plugins that require `svn` ice fails with network errors, authentication errors, or the svn client refusing to connect to GitHub.

## Cause
GitHub announced and executed the sunset of Subversion support. All `svn+https://github.com/...` URLs no longer work.

## Fix / Workaround
For single-file OMZ snippets, `svn` is not needed — load the specific file directly:

```zsh
# Instead of:
zi ice svn; zi snippet OMZP::gitfast

# Load the specific init file:
zi snippet OMZP::gitfast/gitfast.plugin.zsh
```

For Prezto modules that require multiple files, clone the entire Prezto repository and source from the local clone:

```zsh
zi ice wait lucid depth"1" as"null" \
  atclone"git clone --depth=1 https://github.com/sorin-ionescu/prezto.git external" \
  atpull"%atclone"
zi light zdharma-continuum/null   # placeholder

# Then source from external/
zi ice pick"external/modules/environment/init.zsh"
zi snippet PZTM::environment
```

Alternatively, use `cloneopts` and a regular plugin load for Prezto modules:

```zsh
zi ice depth"1" pick"modules/git/init.zsh"
zi light sorin-ionescu/prezto
```

## Caveats
This is a permanent change. SVN-based loading will never work again with GitHub-hosted repositories. All `svn` ice usage targeting GitHub must be migrated.
