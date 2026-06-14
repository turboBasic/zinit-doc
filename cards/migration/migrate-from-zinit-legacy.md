---
id: migrate-from-zinit-legacy
title: Migrate from Legacy Zinit (zdharma → zdharma-continuum)
category: migration
tags: [migration, git, installation]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [install-curl, install-manual, install-verify, annexes-overview]
---

## Summary

After the original `zdharma` organization was deleted, Zinit moved to `zdharma-continuum`. Existing users must update remote URLs and rename references in their dotfiles to receive updates.

## Syntax / Usage

```zsh
# Update the git remote in $ZINIT[BIN_DIR]
cd $ZINIT[BIN_DIR] \
  && git remote set-url origin https://github.com/zdharma-continuum/zinit.git \
  && git fetch origin \
  && git branch -m master main \
  && git branch -u origin/main main \
  && git remote set-head origin -a \
  && cd -
```

## Details

When `@psprint` deleted the original `zdharma` organization, any dotfiles referencing `zdharma/`, `Zsh-Packages/`, or `zinit-zsh/` began failing with git errors and stopped receiving updates. The community fork lives at `zdharma-continuum`.

**Three-step migration:**

**Step 1 — Update dotfiles.** Change all occurrences of `zdharma`, `Zsh-Packages`, and `zinit-zsh` to `zdharma-continuum` in `.zshrc`, `.zprofile`, and any other config files. Also rename the old short annex names to their new full names:

| Old name | New name |
|---|---|
| `z-a-readurl` | `zinit-annex-readurl` |
| `z-a-bin-gem-node` | `zinit-annex-bin-gem-node` |
| `z-a-bin-rust` | `zinit-annex-rust` |
| `z-a-patch-dl` | `zinit-annex-patch-dl` |

The four default annexes should now be loaded as:

```zsh
zinit light-mode for \
  zdharma-continuum/zinit-annex-readurl \
  zdharma-continuum/zinit-annex-bin-gem-node \
  zdharma-continuum/zinit-annex-patch-dl \
  zdharma-continuum/zinit-annex-rust
```

**Step 2 — Fix the git remote.** Update the remote URL of the Zinit installation itself (see Syntax/Usage above).

**Step 3 — Reinstall plugins.** Delete all cached plugins and reinstall them so they clone from the new organization:

```zsh
zinit delete --all --yes && exec zsh
```

**Automated sed approach** for step 1 (review results carefully before applying):

```bash
find . -name '.git*' -type d -prune -name '.idea*' -type d -prune -o -type f -print0 | \
  xargs -0 sed -i \
    -e 's@(zdharma|Zsh-Packages|zinit-zsh)/@zdharma-continuum/@' \
    -e 's@/z-a-readurl@/zinit-annex-readurl@' \
    -e 's@/z-a-bin-gem-node@/zinit-annex-bin-gem-node@' \
    -e 's@/z-a-bin-rust@/zinit-annex-rust@' \
    -e 's@/z-a-patch-dl@/zinit-annex-patch-dl@'
```

Note: the `sed -i` above uses a regex with alternation (`(a|b|c)`). On macOS with BSD `sed`, this will fail; use `gsed` (GNU sed from Homebrew) or run the substitutions separately.

## Examples

```zsh
# Full migration sequence
# 1. Edit dotfiles to replace zdharma → zdharma-continuum

# 2. Fix git remote
cd $ZINIT[BIN_DIR]
git remote set-url origin https://github.com/zdharma-continuum/zinit.git
git fetch origin
git branch -m master main
git branch -u origin/main main
git remote set-head origin -a
cd -

# 3. Reinstall all plugins
zinit delete --all --yes && exec zsh

# Alternatively, reinstall Zinit entirely
rm -rf "${XDG_DATA_HOME:-$HOME/.local/share}/zinit"
bash -c "$(curl --fail --show-error --silent --location \
  https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)"
exec zsh
```

## Caveats / Common Mistakes

- The automated `sed` command uses ERE alternation syntax (`(a|b|c)`). macOS BSD `sed` does not support this without `-E`; even with `-E` the behaviour differs. Use `gsed` on macOS or run each substitution as a separate `sed -e` invocation.
- After deleting all plugins (`zinit delete --all --yes`), the next `exec zsh` will reinstall them automatically based on the updated `.zshrc`.
