# zinit-doc site

Static documentation site built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).
Reads card content directly from `../cards/` via symlinks — no duplication.

## Local development

Prerequisites: Node 26, Just, Wrangler — all managed by `mise` from the repo root.

```sh
# From repo root
mise install          # install Node, just, wrangler
just install          # install npm dependencies (first time only)
just dev              # start dev server at http://localhost:4321
just build            # production build → site/dist/
just preview          # build + serve production output locally
just clean            # remove site/dist/ and site/.astro/
```

## Cloudflare Pages setup (one-time)

### 1. Authenticate wrangler

```sh
wrangler login
```

This opens a browser to authorize your Cloudflare account.

### 2. Create the Pages project

```sh
wrangler pages project create zinit-doc
```

Choose **Direct Upload** when prompted (not Git integration — publishing is handled
via `just publish`).

### 3. Set the custom domain

In the [Cloudflare Pages dashboard](https://dash.cloudflare.com):

1. Open the `zinit-doc` project → **Custom domains** → **Set up a custom domain**
2. Enter `zinit.turbobasic.dev` (or `turbobasic.dev` for the apex)
3. Cloudflare adds the DNS record automatically since the domain is already managed here

### 4. (Optional) Set the production branch alias

Wrangler deploys with `--branch main` which Cloudflare Pages maps to the production
URL. No extra config needed.

## Publishing

```sh
just publish          # build + deploy to Cloudflare Pages
```

This runs `wrangler pages deploy site/dist --project-name zinit-doc --branch main`.
The deployment URL is printed at the end. The custom domain updates within seconds.

## Project layout

```text
site/
├── astro.config.mjs         # Starlight config, sidebar, Vite settings
├── src/
│   ├── components/
│   │   └── MarkdownContent.astro  # renders tags, source, related links
│   ├── content/
│   │   └── docs/            # symlinks → ../../cards/<category>/
│   ├── content.config.ts    # Astro content collection schema
│   └── pages/
│       ├── index.astro      # splash home page
│       └── tags/
│           ├── index.astro  # all-tags listing
│           └── [tag].astro  # per-tag card listing
└── dist/                    # build output (gitignored)
```
