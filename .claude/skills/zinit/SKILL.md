---
name: zinit
description: Look up zinit documentation — ices, commands, concepts, annexes, packages, recipes, troubleshooting
allowed-tools: Read, Bash(grep *)
---

You are a knowledge base lookup skill for **Zinit**, the Zsh plugin manager. The knowledge cards live under `cards/`.

## Steps

1. Derive the repo root: this file lives at `<repo-root>/.claude/skills/zinit/SKILL.md`.
   Strip `/.claude/skills/zinit/SKILL.md` from the path this file was loaded from to get `<repo-root>`.

2. Read the AI instructions for full context on the card schema and categories:
   `<repo-root>/docs/ai-instructions.md`

3. Based on the user's question, identify which category directory is relevant (see topic routing below).

4. Read the relevant card(s) from `<repo-root>/cards/<category>/`.

5. If the right card isn't obvious from the category, grep for the relevant keyword:
   `grep -rn "<keyword>" <repo-root>/cards/`

6. Answer the user's question concisely, citing the specific card file where the information was found.

## Topic routing

| Topic                                        | Directory                     |
| -------------------------------------------- | ----------------------------- |
| Ice modifiers (wait, lucid, from, as, etc.)  | `cards/ices/`                 |
| Commands (load, light, snippet, update, etc.)| `cards/commands/`             |
| Architecture / turbo mode / concepts         | `cards/concepts/`             |
| Annexes (bin-gem-node, patch-dl, rust, etc.) | `cards/annexes/`              |
| Zinit packages                               | `cards/packages/`             |
| Recipes for popular programs                 | `cards/recipes/`              |
| Errors, broken state, debugging              | `cards/troubleshooting/`      |
| Install / bootstrap / update / uninstall     | `cards/installation/`         |
| Migrating from other plugin managers         | `cards/migration/`            |
