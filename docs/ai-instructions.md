# AI Instructions — zinit-doc

## Project Overview

This repository is a Knowledge Base for AI harnesses about **Zinit**, the plugin manager
for Zsh. The primary deliverable is a collection of ~500 Knowledge Cards covering every
aspect of Zinit: ices, commands, concepts, annexes, packages, recipes, and real-world
troubleshooting patterns extracted from issues and discussions.

The Knowledge Cards are the sole output. This is not a code project — there are no
executables, no tests, no build step.

---

## Tech Stack

- **Format:** YAML front-matter + Markdown body (one `.md` file per card)
- **Consumption:** Designed for both RAG/vector-search and direct context injection
- **Tooling:** AI agents generating cards from source materials listed below

---

## Source Materials

All card content must be derived exclusively from these authoritative sources:

| Source           | URL                                                                          | Notes                                   |
| ---------------- | ---------------------------------------------------------------------------- | --------------------------------------- |
| Source code      | https://github.com/zdharma-continuum/zinit                                   | Ground truth for all behavior           |
| README / docs    | https://github.com/zdharma-continuum/zinit/blob/main/README.md               | Primary reference                       |
| Wiki             | https://zdharma-continuum.github.io/zinit/wiki/INTRODUCTION/                 | Extended documentation                  |
| Issues (tickets) | https://github.com/zdharma-continuum/zinit/issues                            | Bug patterns, edge cases, workarounds   |
| Discussions      | https://github.com/zdharma-continuum/zinit/discussions                       | Community patterns, Q&A                 |
| Packages         | https://github.com/zdharma-continuum/zinit-packages                          | Curated command sets for specific tasks |
| Recipes          | https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs | Real-world plugin configs               |
| Annexes          | https://github.com/zdharma-continuum/zinit/wiki/Zinit-related-projects       | Extensions providing new ices           |

Do not invent behavior. If a claim cannot be traced to one of the above sources, omit it.

---

## Project Structure

```text
zinit-doc/
├── CLAUDE.md                    ← entry point, references this file
├── docs/
│   └── ai-instructions.md       ← this file — single source of truth for all AI tools
├── cards/                       ← all Knowledge Cards live here
│   ├── ices/                    ← ice modifiers (wait'', lucid, from'gh-r', etc.)
│   ├── commands/                ← zi commands (load, light, snippet, update, etc.)
│   ├── concepts/                ← architecture and concepts (turbo mode, annexes, etc.)
│   ├── annexes/                 ← per-annex cards
│   ├── packages/                ← zinit-packages cards
│   ├── recipes/                 ← popular program recipes
│   ├── troubleshooting/         ← patterns from issues and discussions
│   ├── installation/            ← install, bootstrap, update, uninstall flows
│   └── migration/               ← migration from other plugin managers
└── .editorconfig
```

---

## Knowledge Card Schema

Every card is a single `.md` file with this exact YAML front-matter:

```yaml
---
id: <kebab-case-unique-identifier>
title: <human-readable title>
category: <ices | commands | concepts | annexes | packages | recipes | troubleshooting | installation | migration>
tags: [<tag1>, <tag2>, ...]
source: <URL of the primary source this card is derived from>
related: [<id-of-related-card>, ...]
---
```

Followed by a Markdown body with this structure:

```markdown
## Summary

One or two sentences: what this is and why it matters.

## Syntax / Usage

(omit for concept-only cards)
Code block showing the canonical form.

## Details

Prose explanation. Cover behavior, defaults, constraints, interactions with other ices/commands.
Keep to what is true and sourced — no speculation.

## Examples

Concrete, copy-pasteable zi invocations or config snippets. At least one example per card.

## Caveats / Common Mistakes

(omit if none documented in sources)
Known footguns, version-specific behavior, order-sensitivity, etc.

## See Also

(omit if no related cards yet)
Bulleted list of related card ids.
```

---

## Card Generation Rules

1. **One concept per card.** If a topic requires 300+ words of body text, split it.
2. **Narrow scope.** Each ice, each command flag, each annex gets its own card.
3. **Source every claim.** The `source:` field in front-matter must point to where the
   information was found. For multi-source cards, put the most authoritative source.
4. **Extract from issues/discussions with care.** When deriving cards from tickets or
   discussions, validate against source code or docs before asserting behavior. Mark
   version-specific or workaround content explicitly in Caveats.
5. **Recipes become cards.** Each recipe for a popular program becomes one card in
   `cards/recipes/`. Title format: `Recipe: <program-name>`.
6. **Annexes become cards.** Each annex gets at minimum one card in `cards/annexes/`
   covering what it does and the ices it adds.
7. **No duplication.** Before creating a card, check if an existing card already covers
   the concept. Prefer adding a `See Also` link to extending a duplicate.
8. **Tags must be consistent.** Use existing tags before inventing new ones. Core tag
   vocabulary: `ice`, `command`, `turbo`, `annex`, `package`, `recipe`, `snippet`,
   `plugin`, `git`, `binary`, `completion`, `lazy-loading`, `troubleshooting`,
   `installation`, `migration`, `performance`.
9. **IDs are permanent.** Once a card is committed, its `id` must not change (other
   cards reference it). Titles and content may be updated.
10. **File naming:** `<id>.md` — exactly matches the front-matter `id` field.

---

## AI Behaviour Guidelines

- Read the source materials before generating cards. Do not rely on training-data
  knowledge of Zinit — the project has had forks, renames, and breaking changes.
- When processing issues or discussions, extract the **pattern** (symptom + cause +
  fix), not the conversation transcript.
- Prefer concrete Zsh snippets in Examples over prose descriptions of usage.
- The `related` field should link cards that a user would naturally navigate between —
  not every tangentially related card.
- When unsure whether something belongs in `ices/` vs `concepts/`, ask: is it something
  you write after `zi load`? If yes, it's an ice.
