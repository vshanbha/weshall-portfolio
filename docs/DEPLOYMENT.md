# Deployment Guide

This guide covers deployment scenarios for the We shall build portfolio site.

## Environment Variables

The site uses three environment variables for configuration:

| Variable | Purpose | Example Values |
|----------|---------|----------------|
| `SITE_URL` | Full site URL (used for canonical URLs, OG images, sitemap) | `http://localhost:4321`, `https://vshanbha.github.io/weshall-portfolio`, `https://weshall.build` |
| `BASE_PATH` | Base path for routing (use `/` for root, `/subpath` for subdirectory) | `/`, `/weshall-portfolio` |
| `PLAYWRIGHT_BASE_URL` | Base URL for E2E tests | `http://localhost:4321`, `https://vshanbha.github.io/weshall-portfolio` |

## Deployment Scenarios

### Scenario 1: Local Development (localhost:4321)

**Setup:**

1. Copy a deployment template:
   ```bash
   cp .env.gh-pages .env
   ```

2. Edit `.env` and update `SITE_URL` to `http://localhost:4321`:
   ```bash
   SITE_URL=http://localhost:4321
   BASE_PATH=/
   PLAYWRIGHT_BASE_URL=http://localhost:4321
   ```

3. Start development server:
   ```bash
   pnpm dev
   ```

Site will be available at http://localhost:4321

**Testing:**

```bash
pnpm test:e2e
```

### Scenario 2: GitHub Pages (vshanbha.github.io/weshall-portfolio)

**GitHub Actions Deployment:**

The GitHub Actions workflow (`.github/workflows/deploy.yml`) sets environment variables directly:

```yaml
- run: pnpm build
  env:
    SITE_URL: 'https://vshanbha.github.io/weshall-portfolio'
    BASE_PATH: '/weshall-portfolio'
```

No `.env` file is needed in CI/CD. Deployment happens automatically on push to `main`.

**Local Testing:**

To test the GitHub Pages scenario locally:

1. Copy the template:
   ```bash
   cp .env.gh-pages .env
   ```

2. Build and preview:
   ```bash
   pnpm build
   pnpm preview
   ```

Site will be available at http://localhost:4321/weshall-portfolio

### Scenario 3: Custom Domain (weshall.build)

**When Ready:**

1. Update GitHub Actions workflow with new URLs:
   ```yaml
   - run: pnpm build
     env:
       SITE_URL: 'https://weshall.build'
       BASE_PATH: '/'
   ```

2. Update `.env.production` template (already configured)

3. Configure GitHub Pages custom domain in repository settings:
   - Go to Settings → Pages
   - Enter custom domain: `weshall.build`
   - Save

4. Deploy (automatic on push to `main`)

**Local Testing:**

```bash
cp .env.production .env
pnpm build
pnpm preview
```

## Verifying the Deployment

After a push to `main`, the GitHub Actions workflow deploys to GitHub Pages. To confirm the live site has the latest build:

### Method 1: Check the Deployed Commit (source of truth)

```bash
gh api repos/vshanbha/weshall-portfolio/deployments \
  | jq '.[0] | {sha, ref, environment}'
```

The latest deployment's `sha` should match the commit on `main`.

### Method 2: Compare Build Asset Hashes

Astro generates deterministic content-hashed filenames under `/_astro/` (e.g. `page.BraL6W9_.js`). If the hashes match between a local build and the live site, the same build is deployed.

1. Build locally:
   ```bash
   pnpm build
   ```

2. Pick any asset from the live page source and compare:
   ```bash
   # live asset hash
   curl -s https://weshall.build/en/ | grep -o '/_astro/[a-zA-Z0-9._-]*' | sort -u

   # local asset hash
   ls dist/_astro/
   ```

3. Asset filenames match → same build. If they differ → local and deployed builds are out of sync.

Note: Asset hashes only change when the content of that asset changes. A deployment with no source changes may produce identical hashes — that's expected and correct.

### Method 3: Check the GitHub Actions Run

```bash
gh run view <run-id> --json headSha,conclusion,status
```

The `headSha` should match the latest commit on `main` and `conclusion` should be `success`.

## Environment File Management

### Files in Repository

- `.env.gh-pages` - GitHub Pages deployment template (committed)
- `.env.production` - Custom domain deployment template (committed)

### Files NOT in Repository

- `.env` - Local development environment (gitignored, contains actual values)

### Workflow

1. **Templates are documentation**: `.env.gh-pages` and `.env.production` serve as living documentation of required variables
2. **Local development**: Copy a template to `.env` and modify as needed
3. **CI/CD**: GitHub Actions sets variables directly in the workflow
4. **No secrets**: All variables are public configuration, no sensitive data

## Troubleshooting

### 404 Errors on Subpath Deployments

If you see 404 errors when deploying to a subpath (e.g., `/weshall-portfolio`):

1. Check that `BASE_PATH` is set correctly in your environment
2. Verify the GitHub Actions workflow has both `SITE_URL` and `BASE_PATH` set
3. Ensure all internal links use relative paths or the base path utility

### Navigation Links Not Working

The Velocity template has hardcoded navigation links that don't include the base path. This causes 404s in subpath deployments.

**Current Status**: Navigation links need to be fixed in the template. This is a known issue that will be addressed when moving to a proper domain (weshall.build).

### Environment Variables Not Loading

If environment variables are not being picked up:

1. Restart the dev server: `pnpm dev`
2. Check that `.env` file exists and has correct format (no quotes around values)
3. Verify variable names are spelled correctly

## Configuration Files

The following files use environment variables:

- `astro.config.mjs` - Uses `SITE_URL` and `BASE_PATH`
- `src/config/site.config.ts` - Uses `SITE_URL`
- `playwright.config.ts` - Uses `PLAYWRIGHT_BASE_URL`

All files have sensible defaults for local development, so you can run `pnpm dev` without a `.env` file.
