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

## Testing

End-to-end smoke tests (Playwright) build the site and check the rendered page across desktop
and mobile viewports:

```bash
pnpm test:e2e
```

## Deployment

Pushing to `main` deploys automatically — no manual steps. The [`CI`](.github/workflows/ci.yml)
workflow:

1. **Builds & gates** — installs deps, runs `pnpm lint` (astro check + ESLint + Prettier),
   `pnpm build`, and the Playwright `pnpm test:e2e` suite. The deploy only runs if all of these
   pass.
2. **Ships the build** — on `main`, the tested `dist/` is rsynced over SSH to the server into a
   timestamped release dir (`releases/<git-sha>`), hardlinking unchanged files from the live
   release to save bandwidth.
3. **Swaps atomically** — a `current` symlink is repointed to the new release in one `mv`, so the
   site is served by [Caddy](https://caddyserver.com/) from `current/` with zero downtime and no
   reload. The five most recent releases are kept for instant rollback.

```text
/var/www/smrcomputers.ca/site/
  releases/<git-sha>/   each deploy
  current -> releases/<git-sha>   atomic symlink; Caddy's web root
```

**Rollback:** repoint `current` at a previous release dir — no rebuild, no Caddy reload.

### Required repository secrets

The deploy job authenticates with a dedicated SSH key (the `deploy` user on the server):

| Secret        | Value                                            |
| ------------- | ------------------------------------------------ |
| `SSH_HOST`    | server hostname / IP                             |
| `SSH_USER`    | `deploy`                                         |
| `SSH_KEY`     | private SSH key authorized for the `deploy` user |
| `DEPLOY_PATH` | `/var/www/smrcomputers.ca/site`                  |
| `SSH_PORT`    | _(optional, defaults to `22`)_                   |
