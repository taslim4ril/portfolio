# Fonts - PP Neue Montreal

The site uses **PP Neue Montreal** (by Pangram Pangram), self-hosted from the
`.otf` files in this folder:

```
PPNeueMontreal-Thin.otf     → weight 100–300
PPNeueMontreal-Book.otf     → weight 400 (regular)
PPNeueMontreal-Medium.otf   → weight 500 / 600
PPNeueMontreal-Bold.otf     → weight 700–900
```

The `@font-face` rules live in `app/globals.css`.

## Optional: optimize to .woff2

`.otf` works everywhere but is larger than `.woff2`. To slim things down,
convert each file (e.g. https://transfonter.org or `fonttools`), drop the
`.woff2` versions here, and update the `src` URLs + `format("woff2")` in
`app/globals.css`.
