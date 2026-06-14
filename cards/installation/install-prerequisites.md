---
id: install-prerequisites
title: Zinit Prerequisites
category: installation
tags: [installation, git]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [install-curl, install-manual]
---

## Summary

Zinit requires Zsh and Git; some features additionally need `curl`, `subversion`, and standard POSIX utilities.

## Syntax / Usage

```zsh
# Check Zsh version
zsh --version

# Check Git
git --version
```

## Details

**Required:**

- **Zsh** — Zinit is a Zsh plugin manager and runs only inside Zsh. No minimum version is stated in the README, but a reasonably modern version (5.1+) is expected for features like associative arrays and `zle`.
- **Git** — required to clone plugins and update them. Zinit uses `git clone`, `git pull`, and `git fetch` internally.

**Required for specific features:**

- **`curl`** — needed for the automatic install script and for downloading snippet files from URLs. Most snippet and `gh-r` workflows also rely on it.
- **`subversion` (svn)** — required when the `svn` ice modifier is used to download a subdirectory of a GitHub repository as a snippet.

**Optional / enhancing:**

- **`tree`** — used by `zinit list-snippets` to display the snippet tree in a formatted view.
- **`pygmentize` or `source-highlight`** — used by `zinit glance` to syntax-highlight a plugin's source.
- GNU coreutils utilities (`mv`, `cp`, `find`) are used internally; BSD variants work but GNU versions are preferred on macOS.

## Examples

```zsh
# Verify all core prerequisites
zsh --version
git --version
curl --version

# Verify svn (needed only if using svn ice)
svn --version
```
