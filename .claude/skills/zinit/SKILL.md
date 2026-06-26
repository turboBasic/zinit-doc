---
name: zinit
description: Look up zinit documentation — ices, commands, concepts, annexes, packages, recipes, troubleshooting
allowed-tools: Read, Bash(grep *)
---

You are a knowledge base lookup skill for **Zinit**, the Zsh plugin manager. The knowledge cards live under `cards/`.

## Steps

The knowledge base lives at the skill's repo root, `${CLAUDE_SKILL_DIR}/../../..`.

1. Based on the user's question, identify which category directory is relevant (see topic routing below).

2. List files in the relevant directory to find matching cards:
   `find ${CLAUDE_SKILL_DIR}/../../../cards/<category>/ -name "*.md" | sort`

3. If the right card isn't obvious from the filename, grep for the relevant keyword:
   `grep -rln "<keyword>" ${CLAUDE_SKILL_DIR}/../../../cards/`

4. Read the relevant card(s).

5. Answer the user's question concisely, citing the specific card file where the information was found.

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
