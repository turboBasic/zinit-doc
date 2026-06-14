---
id: bindmap
title: "Ice: bindmap''"
category: ices
tags: [ice, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [trackbinds]
---

## Summary

`bindmap''` remaps key bindings set by a plugin at load time, without modifying the
plugin source. It intercepts `bindkey` calls and substitutes the specified key sequences.

## Syntax / Usage

```zsh
zi ice bindmap"KeyA -> KeyB; KeyC -> KeyD"
# Semicolons separate multiple remaps; spaces around -> are required
zi ice bindmap"^R -> ^T; ^A -> ^B"
```

## Details

`bindmap''` holds semicolon-separated `Key(s)A -> Key(s)B` pairs. When the plugin calls
`bindkey`, Zinit intercepts each call and replaces the source key with the target key
where a mapping matches.

This ice requires that the plugin is loaded with `zinit load` (investigating enabled),
or with `trackbinds` ice when using `zinit light`.

Does not work with snippets.

## Examples

```zsh
# Remap plugin's Ctrl-R to Ctrl-T and Ctrl-A to Ctrl-B
zi ice bindmap"^R -> ^T; ^A -> ^B"
zi load some/plugin-with-bindings
```

## Caveats / Common Mistakes

- Without `trackbinds`, `bindmap''` has no effect when the plugin is loaded with
  `zi light`.

## See Also

- trackbinds
