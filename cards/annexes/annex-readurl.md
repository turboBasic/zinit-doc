---
id: annex-readurl
title: "Annex: readurl"
category: annexes
tags: [annex, ice, binary, snippet, installation]
source: https://github.com/zdharma-continuum/zinit-annex-readurl
related: [annex-patch-dl]
---

## Summary

readurl extends Zinit snippets to automatically discover and download the latest version of a file whose download URL is hosted on a webpage, using the `dlink` and `dlink0` ices plus a special `as'readurl|…'` value.

## Details

- **Problem it solves:** Download URLs for versioned releases (e.g., `fzf-0.42.0-linux_amd64.tgz`) change with every release. readurl scrapes the release page, extracts the current version, and constructs the correct download URL automatically.

- **Works only with snippets**, not with plugins.

- **New ices:**
  - `dlink'{URL-pattern-with-%VERSION%}'` — the download URL pattern; `%VERSION%` is replaced with the version found on the page
  - `dlink0'{URL-pattern}'` — for a two-level download page (e.g., HashiCorp-style): points to an intermediate page listing the actual download links; supports `!` prefix to sort matched URLs/versions, and `~%filter-regex%` suffix to exclude unwanted matches
  - `as'readurl'` / `as'readurl|command'` / `as'readurl|completion'` / `as'readurl|null'` — activates readurl processing; the part after `|` has the same meaning as a normal `as''` value

- **Shorthand without `dlink`:** Append `++rest-of-download-url` to the snippet URL to skip the `dlink` ice when the download URL differs from the page URL by only a few path segments; use extra `+` characters to strip conflicting sections.

- **Install:**
  ```zsh
  zinit light zdharma-continuum/z-a-readurl
  ```

## Examples

```zsh
# Auto-download latest fzf for Linux from GitHub releases page
zinit for \
    as'readurl|command' \
    dlink'/junegunn/fzf-bin/releases/download/%VERSION%/fzf-%VERSION%-linux_amd64.tgz' \
    extract \
    id-as'fzf' \
  https://github.com/junegunn/fzf-bin/releases/

# Two-level page (HashiCorp terraform)
zinit for \
    as'readurl|command' \
    dlink0'/terraform/%VERSION%/' \
    dlink'/terraform/%VERSION%/terraform_%VERSION%_linux_386.zip' \
    extract \
    id-as'terraform' \
  http://releases.hashicorp.com/terraform/

# Sort + filter unwanted URLs (OpenShift client)
zinit for \
    as'readurl|command' \
    dlink'openshift-client-windows-%VERSION%.zip' \
    dlink0'!%VERSION%~%(stable|latest|fast|candidate).*%' \
    id-as'ocp' \
  https://mirror.openshift.com/pub/openshift-v4/clients/ocp/

# Pulumi — readurl|null with sbin for the binary
zi for \
    as'readurl|null' \
    dlink'https://get.pulumi.com/releases/sdk/pulumi-%VERSION%-linux-x64.tar.gz' \
    extract'!' \
    id-as'pulumi' \
    sbin'pulumi*' \
  https://www.pulumi.com/docs/get-started/install/versions/
```

## Caveats / Common Mistakes

- readurl only works with `snippet` invocations (or the `for` syntax pointing at an HTTP URL), not with `plugin` loads.
- The `dlink0` ice is only needed when the release download link is listed on a secondary page, not directly on the URL you pass to Zinit.
- Prepend `!` to `dlink` or `dlink0` to sort matched URLs when the page does not list versions newest-first.
