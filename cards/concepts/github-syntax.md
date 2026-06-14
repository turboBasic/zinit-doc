---
id: github-syntax
title: GitHub Shorthand Syntax
category: concepts
tags: [plugin, git]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [plugins-vs-snippets, ice-modifiers-overview, load-vs-light]
---

## Summary

Zinit accepts `user/repo` shorthand for GitHub plugins and supports branch/tag/commit pinning via the `ver` ice, keeping `.zshrc` concise.

## Details

When a plugin spec contains a `/`, Zinit treats it as `{github-user}/{repo-name}` and constructs the clone URL as `https://github.com/{user}/{repo}.git`. No protocol or domain prefix is needed for GitHub.

**Pinning a version:** use the `ver` ice to specify a branch, tag, or commit SHA:

```zsh
zinit ice ver"v1.2.3"
zinit load some/repo
```

`ver"latest"` (the default) always fetches the latest default branch.

**Other hosts:** use the `from` ice to clone from GitLab (`gl`), Bitbucket (`bb`), Notabug (`nb`), GitHub Releases (`gh-r`), or any full domain:

```zsh
zinit ice from"gl"
zinit load user/repo   # clones from gitlab.com

zinit ice from"gh-r" as"program"
zinit light junegunn/fzf   # downloads latest GitHub Release binary
```

**Protocol:** defaults to `https`. Override with `proto` ice (e.g. `proto"ssh"`).

## Examples

```zsh
# Standard GitHub shorthand
zinit light zsh-users/zsh-autosuggestions

# Specific tag
zinit ice ver"v0.7.0"
zinit light zsh-users/zsh-autosuggestions

# Specific branch
zinit ice ver"develop"
zinit light zdharma-continuum/fast-syntax-highlighting

# Binary release from GitHub Releases
zinit ice from"gh-r" as"program"
zinit light junegunn/fzf

# GitLab repo
zinit ice from"gl"
zinit load user/my-zsh-plugin

# Shallow clone to save bandwidth
zinit ice depth"1"
zinit light romkatv/powerlevel10k
```
