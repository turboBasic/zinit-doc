---
id: ts-gh-clone-https-auth-failure-655
title: "GitHub clone fails: Authentication failed for HTTPS URL"
category: troubleshooting
tags: [installation, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/655
related: []
---

## Summary
Zinit clones plugins via HTTPS by default. When GitHub deprecated password authentication, HTTPS clones that relied on passwords started failing. The fix is to use SSH or configure a credential helper with a personal access token.

## Question / Problem
Cloning a plugin produced:

```
remote: Support for password authentication was removed on August 13, 2021.
fatal: Authentication failed for 'https://github.com/Aloxx/fzf-tab/'
```

The user's SSH key worked for normal git operations but zinit was using HTTPS.

## Answer / Solution
Option 1 — Use SSH for zinit clones via git URL rewriting:

```zsh
git config --global url."git@github.com:".insteadOf "https://github.com/"
```

Option 2 — Use the `proto"ssh"` ice per plugin:

```zsh
zinit ice proto"ssh"
zinit light Aloxx/fzf-tab
```

Option 3 — Configure a credential helper (GitHub CLI):

```zsh
gh auth login
gh auth setup-git
```

After any of these, retry zinit:
```zsh
zinit delete Aloxx/fzf-tab
zinit light Aloxx/fzf-tab
```

## Caveats
The git URL rewrite option affects all git operations globally, not only zinit. Ensure this is acceptable before applying it.
