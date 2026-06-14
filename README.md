# zinit-doc

A structured Knowledge Base about [Zinit][zinit-repo] — the flexible Zsh plugin manager.
Contains 574 Knowledge Cards covering every documented aspect of Zinit: ice modifiers,
commands, architecture concepts, annexes, packages, recipes, and real-world troubleshooting
patterns extracted from the full issue and discussion history.

Intended as a reference corpus for AI harnesses (RAG pipelines, context injection) and
as a browsable human reference.

---

## Card categories

| Category                    | Cards | Description                                                    |
| --------------------------- | ----- | -------------------------------------------------------------- |
| [ices][dir-ices]            | 56    | Ice modifiers (`wait''`, `lucid`, `from''`, `as''`, …)         |
| [commands][dir-commands]    | 47    | `zi` subcommands (`load`, `light`, `snippet`, `update`, …)     |
| [concepts][dir-concepts]    | 20    | Architecture, turbo mode, completions, OMZ compat, patterns    |
| [annexes][dir-annexes]      | 11    | Annex overview cards + per-annex ice documentation             |
| [packages][dir-packages]    | 22    | `zi pack` — curated package cards                              |
| [recipes][dir-recipes]      | 38    | Ready-to-use configs for popular CLI programs                  |
| [installation][dir-install] | 5     | Install, verify, and uninstall flows                           |
| [migration][dir-migration]  | 4     | Migrating from Oh-My-Zsh, Antigen, Zplug                       |
| [troubleshooting][dir-ts]   | 371   | Bug patterns, workarounds, and Q&A from issues and discussions |

---

## Card format

Every card is a Markdown file with YAML front-matter:

```yaml
---
id: wait
title: "Ice: wait''"
category: ices
tags: [ice, turbo, lazy-loading, performance]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [lucid, turbo-mode, ice-order]
---
```

Followed by structured sections: **Summary**, **Syntax / Usage**, **Details**,
**Examples**, and optional **Caveats / Common Mistakes** and **See Also**.

---

## Site

The cards are also published as a browsable site at `https://zinit.turbobasic.dev`.
See [`site/README.md`][site-readme] for build, development, and deployment instructions.

---

## For AI harnesses

See [`docs/ai-instructions.md`][ai-instructions] for the full card schema, generation
rules, tag vocabulary, and source material index. That file is the single source of truth
for all AI tooling working with this repository.

---

## Zinit project links

| Resource      | URL                                           |
| ------------- | --------------------------------------------- |
| Source code   | [zdharma-continuum/zinit][zinit-repo]         |
| README / docs | [zinit README][zinit-readme]                  |
| Wiki          | [Zinit Wiki][zinit-wiki]                      |
| Issues        | [GitHub Issues][zinit-issues]                 |
| Discussions   | [GitHub Discussions][zinit-discussions]       |
| Packages      | [zinit-packages][zinit-packages]              |
| Recipes       | [Recipes for popular programs][zinit-recipes] |
| Annexes       | [Zinit-related projects][zinit-annexes]       |

---

<!-- reference-style links -->
[zinit-repo]:        https://github.com/zdharma-continuum/zinit
[zinit-readme]:      https://github.com/zdharma-continuum/zinit/blob/main/README.md
[zinit-wiki]:        https://zdharma-continuum.github.io/zinit/wiki/INTRODUCTION/
[zinit-issues]:      https://github.com/zdharma-continuum/zinit/issues
[zinit-discussions]: https://github.com/zdharma-continuum/zinit/discussions
[zinit-packages]:    https://github.com/zdharma-continuum/zinit-packages
[zinit-recipes]:     https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
[zinit-annexes]:     https://github.com/zdharma-continuum/zinit/wiki/Zinit-related-projects
[ai-instructions]:   docs/ai-instructions.md
[site-readme]:       site/README.md
[dir-ices]:          cards/ices/
[dir-commands]:      cards/commands/
[dir-concepts]:      cards/concepts/
[dir-annexes]:       cards/annexes/
[dir-packages]:      cards/packages/
[dir-recipes]:       cards/recipes/
[dir-install]:       cards/installation/
[dir-migration]:     cards/migration/
[dir-ts]:            cards/troubleshooting/
