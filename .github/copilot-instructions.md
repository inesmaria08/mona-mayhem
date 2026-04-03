---
name: Mona Mayhem workspace instructions
description: "Use when assisting contributors in this Astro workshop project: project orientation, build/dev tasks, and Astro best practices."
---

# Mona Mayhem Workspace Instructions

## Project overview
- **Name**: Mona Mayhem
- **Type**: Retro arcade workshop site for GitHub contribution comparison
- **Stack**: Astro v5 (+ @astrojs/node), Node.js, static pages + API route for `/api/contributions/[username]`
- **Main assets**:
  - `src/pages/index.astro` (home UI)
  - `src/pages/api/contributions/[username].ts` (user contributions API)
  - `astro.config.mjs`, `package.json`, `tsconfig.json`
  - workshop content: `workshop/**/*.md` (learning exercises; ignore for runtime logic)

## Build/Dev commands
- `npm install` (install deps)
- `npm run dev` (local dev server)
- `npm run build` (production build)
- `npm run preview` (serve built output)
- `npm run astro` (Astro CLI shortcut)

## Astro best practices for this repo
- Keep logic minimal in page components; prefer dedicated API route for GitHub queries (`src/pages/api/...`)
- Use `astro` data loading and plain `.astro` + components over heavy client-side frameworks
- Ensure all new routes are under `src/pages`; static assets under `public`
- Use declarative styling and accessible components (retro pixel fonts are visual, but ARIA + keyboard nav still important)
- Avoid adding unneeded server adapters; this project uses `@astrojs/node` in `package.json`

## Contribution guidance (workshop style)
- Focus on incremental PRs: implement a small feature, document intent, run `npm run dev` and test UI flow
- Keep existing content + markdown workshop steps untouched unless updating docs or exercises
- Code should be safe in the workshop context: no GitHub API keys committed; use public/non-authenticated graph endpoints through API route

## Kickoff prompts for Copilot agents
- "Add a new stats card to the contributions page using existing layout styles."
- "Refactor `/api/contributions/[username]` to cache results for 1 minute and return clear errors."
- "Optimize loading state in `src/pages/index.astro` for slow GitHub responses."
