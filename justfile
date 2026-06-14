site := "site"
cf_project := "zinit-doc"

# List available recipes
default:
    @just --list

# Install site dependencies
install:
    cd {{site}} && mise exec -- npm install

# Start local dev server with hot reload
dev:
    cd {{site}} && mise exec -- npm run dev

# Build the static site into site/dist/
build:
    cd {{site}} && mise exec -- npm run build

# Preview the production build locally
preview: build
    cd {{site}} && mise exec -- npm run preview

# Deploy to Cloudflare Pages (production branch)
publish: build
    mise exec -- wrangler pages deploy {{site}}/dist --project-name {{cf_project}} --branch main

# Remove build artifacts
clean:
    rm -rf {{site}}/dist {{site}}/.astro
