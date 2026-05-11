# claude-chronicles

A blog of wild conversations with Claude. Built with [Astro](https://astro.build), deployed to GitHub Pages.

Live: <https://HexSleeves.github.io/claude-chronicles/>

---

## Local dev

```bash
pnpm install
pnpm dev          # http://localhost:4321/claude-chronicles/
```

Other scripts:

```bash
pnpm build        # static build to ./dist
pnpm preview      # serve ./dist locally (use this to catch base-path bugs)
pnpm check        # type-check + content-collection schema check
```

> The dev URL includes `/claude-chronicles/` because the site is configured for
> a GitHub Pages project subpath. Don't strip it — links in the app rely on
> `import.meta.env.BASE_URL`.

## Writing a conversation

Create `src/content/conversations/<slug>.mdx`:

```mdx
---
title: "Some wild title"
description: "One-line description for the card and meta tags."
date: 2026-05-12
model: opus           # opus | sonnet | haiku | mixed
tags: ["audit-loop"]
heat: 5               # 1..5 — your self-rated wildness
---

import Turn from "../../components/Turn.astro";

Intro prose here, totally normal MDX.

<Turn speaker="me">
What I said.
</Turn>

<Turn speaker="claude" model="opus-4.7">
What Claude said. Markdown, code, lists, anything goes.
</Turn>

A reflection paragraph at the end.
```

Schema-enforced: try a typo in the frontmatter and `pnpm dev` will tell you exactly
which post and which field. See `src/content.config.ts`.

## Deploy

Push to `main`. GitHub Actions runs `.github/workflows/deploy.yml`, which:

1. Builds with Astro (`withastro/action@v3`)
2. Uploads `./dist` as a Pages artifact
3. Publishes via `actions/deploy-pages@v4`

One-time setup in the repo:

- **Settings → Pages → Source:** `GitHub Actions`
- The first push to `main` triggers the deploy.

## What's mine to design

Three spots are intentionally left for taste-driven decisions (search for
`TODO(you):` in the source):

1. **`src/components/Turn.astro`** — the visual personality of "Me vs Claude".
2. **`src/components/FlameHero.astro`** — the homepage flame animation curve.
3. **`src/components/PostMeta.astro`** — how the `heat: 1..5` rating renders.

Everything else (routing, schema, deploy) is mechanical.
