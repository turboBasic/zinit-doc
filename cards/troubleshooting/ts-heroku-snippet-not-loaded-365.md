---
id: ts-heroku-snippet-not-loaded-365
title: "Snippet not loaded (heroku) warning when using id-as with extract"
category: troubleshooting
tags: [snippet, ice, binary, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/365
related: []
---

## Summary
The `Snippet not loaded (heroku)` message appears when a snippet is referenced before it has been loaded due to turbo timing, or when the `id-as` nickname does not match how zinit tracks the snippet internally.

## Question / Problem
The user installed the Heroku CLI binary via a direct URL with `extract` and `sbin`, then loaded the OMZ heroku plugin snippet. The binary loaded fine but the OMZ snippet showed `Snippet not loaded (heroku)`.

```zsh
zi lucid light-mode wait'[[ -n ${ZLAST_COMMANDS[(r)her*]} ]]' extract"!-" id-as"heroku" \
  nocompile sbin'*bin/heroku->heroku' for \
  "https://cli-assets.heroku.com/heroku-linux-x64.tar.gz"

zi lucid ice wait'[[ -n ${ZLAST_COMMANDS[(r)her*]} ]]'
zi snippet "OMZ::plugins/heroku/heroku.plugin.zsh"
```

## Answer / Solution
The warning is cosmetic — it means zinit's internal snippet tracker has not yet registered the OMZ heroku snippet at the moment the status display runs, likely because turbo has not fired yet. The snippet loads and works correctly once the `wait` condition is met.

To suppress the warning, ensure the OMZ snippet is loaded without turbo or is explicitly tracked. Also, `mv"bin/node -> bin/node.BAK"` can be used to prevent the vendored node binary from shadowing the system node:

```zsh
zi lucid light-mode wait'[[ -n ${ZLAST_COMMANDS[(r)her*]} ]]' extract"!-" id-as"heroku" \
  nocompile sbin'*bin/heroku->heroku' mv"bin/node -> bin/node.BAK" for \
  "https://cli-assets.heroku.com/heroku-linux-x64.tar.gz"
```

## Caveats
`Snippet not loaded` is only a status display issue, not a load failure. Check actual functionality before troubleshooting further.
