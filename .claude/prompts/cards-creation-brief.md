# Cards Collection — User Brief

Original prompt given to start the knowledge base generation project.

## How the plan was produced

There was no separate plan document. After receiving this brief, Claude asked three
clarifying questions (card format, consumption method, scope) and then requested the
source URLs. Once those were provided, Claude immediately scaffolded the repo and wrote
`docs/ai-instructions.md` — that file **is** the plan. It encodes the card schema,
category structure, generation rules, tag vocabulary, and source material index.

---

This project is a Knowledge Base for AI harnesses about Zinit bootstrap manager for Zsh.

**High-level goal:** create Knowledge Base for AI Harnesses about Zinit.

**Low-level implementation:** create ~500 Knowledge Cards about Zinit.

Source materials:

- Source code: https://github.com/zdharma-continuum/zinit
- Tickets (collect and convert to knowledge cards): https://github.com/zdharma-continuum/zinit/issues
- Discussions (collect and convert to knowledge cards): https://github.com/zdharma-continuum/zinit/discussions
- Docs: https://github.com/zdharma-continuum/zinit/blob/main/README.md
- Wiki: https://zdharma-continuum.github.io/zinit/wiki/INTRODUCTION/
- Packages (curated sets of commands for specific tasks): https://github.com/zdharma-continuum/zinit-packages
- Recipes for popular programs: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
- List of Zinit annexes (extensions which provide new ices): https://github.com/zdharma-continuum/zinit/wiki/Zinit-related-projects

I want AI to automate this process.
