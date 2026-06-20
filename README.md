# SMR Computer Services — Website

Marketing site for **SMR Computer Services**, a sole-proprietor IT consultancy serving the Greater
Toronto Area. Built as a static site with [Astro](https://astro.build/) and TypeScript.

Live at **[smrcomputers.ca](https://smrcomputers.ca)**.

## Tech stack

- **Astro** (static output) + **TypeScript** (strict)
- **ESLint** + **Prettier** for linting & formatting
- **mise** for tool-version management, **pnpm** for packages

## Getting started

Tool versions are pinned in `mise.toml`. With [mise](https://mise.jdx.dev/) installed:

```bash
mise install      # install pinned node + pnpm
pnpm install      # install dependencies
pnpm dev          # start the dev server (http://localhost:4321)
```

## Scripts

| Command         | Description                                     |
| --------------- | ----------------------------------------------- |
| `pnpm dev`      | Start the local dev server                      |
| `pnpm build`    | Build the static site to `dist/`                |
| `pnpm preview`  | Preview the production build locally            |
| `pnpm lint`     | Run ESLint and check Prettier formatting        |
| `pnpm lint:fix` | Auto-fix ESLint issues and format with Prettier |
| `pnpm format`   | Format all files with Prettier                  |

## Editing content

Most business details — name, contact email, region, and the list of services — live in
[`src/data/site.ts`](src/data/site.ts). Update values there to change them across the whole site.

## Project structure

```text
public/              static assets (logo, favicon, robots.txt)
src/
  components/        UI sections (Header, Hero, Services, About, Contact, Footer)
  data/site.ts       business info + services (single source of truth)
  layouts/Layout.astro   base HTML shell, meta tags, fonts, structured data
  pages/index.astro  the single-page site
  styles/global.css  design tokens & base styles
```

## Deployment

The site builds to fully static files in `dist/`, ready to serve from any Linux web host
(nginx, Apache, Caddy). Build with:

```bash
pnpm build
```

Then deploy the contents of `dist/` to the web root.
