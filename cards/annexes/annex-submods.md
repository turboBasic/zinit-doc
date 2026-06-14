---
id: annex-submods
title: "Annex: submods"
category: annexes
tags: [annex, ice, git, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit-annex-submods
related: []
---

## Summary

submods adds a `submods` ice that instructs Zinit to clone an additional GitHub repository into a specified subdirectory of the plugin or snippet directory at install time, and to keep it updated on `zinit update`.

## Details

- **Problem it solves:** Some Prezto and Oh-My-Zsh modules require external plugins to be placed in an `external/` subdirectory. Without this annex, those submodule-style dependencies must be managed manually outside of Zinit.

- **New ice:**
  - `submods'{user}/{plugin} -> {output-directory}'` — clones `github.com/{user}/{plugin}` into `{output-directory}` relative to the parent plugin/snippet directory; automatically updated when `zinit update` is run

- **Install:**
  ```zsh
  zinit light zinit-zsh/zinit-annex-submods
  ```

## Examples

```zsh
# Load Prezto autosuggestions module, pulling in the required external plugin
zinit ice svn submods'zsh-users/zsh-autosuggestions -> external'
zinit snippet PZTM::autosuggestions

# Using for syntax
zi submods'zsh-users/zsh-autosuggestions -> external' for PZTM::autosuggestions

# OMZ history-substring-search via Prezto, pulling the actual plugin
zi submods"zsh-users/zsh-history-substring-search -> external" svn for OMZP::history-substring-search

# OMZ completion lib with zsh-completions as the external dep
zi submods"zsh-users/zsh-completions -> external" for OMZL::completion.zsh
```
