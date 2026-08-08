# Changelog

## [v0.3.0] - 2026-08-06

### Bug Fixes

- Resolve SEO audit #23: BlogPosting JSON-LD `/undefined/` URL, hreflang pointing to blog index, sitemap duplicate entries, breadcrumb terminal URL ([`5f68ef1`](https://github.com/vshanbha/weshall-portfolio/commit/5f68ef1))
- Remove duplicate `<link rel="canonical">` from BaseLayout.astro ([`64a9616`](https://github.com/vshanbha/weshall-portfolio/commit/64a9616))
- Use `siteConfig.url` consistently instead of `Astro.site` across SEO.astro, [...slug].astro, BlogLayout.astro ([`64a9616`](https://github.com/vshanbha/weshall-portfolio/commit/64a9616))
- Change `og:locale` from `en_US` to `en_GB` ([`64a9616`](https://github.com/vshanbha/weshall-portfolio/commit/64a9616))
- Add `/sitemap.xml` redirect to `/sitemap-index.xml` via Astro config ([`a241a7b`](https://github.com/vshanbha/weshall-portfolio/commit/a241a7b))
- Eliminate visible 'Redirecting' flash on locale routes ([`d3a598c`](https://github.com/vshanbha/weshall-portfolio/commit/d3a598c))
- Align trailing slashes and breadcrumb schema URLs ([`ac40af1`](https://github.com/vshanbha/weshall-portfolio/commit/ac40af1))
- Restore de/hi/mr locale stubs with type-safe suppression ([`cf976d5`](https://github.com/vshanbha/weshall-portfolio/commit/cf976d5))
- Resolve pre-existing lint and type errors blocking validation gate ([`4e2c288`](https://github.com/vshanbha/weshall-portfolio/commit/4e2c288))

### Features

- Add git hooks: pre-commit validation, post-commit agentic review, pre-push E2E gate ([`9d15bd5`](https://github.com/vshanbha/weshall-portfolio/commit/9d15bd5))
- Add review-agent wrapper for opencode/claude/codex ([`b3a5f5b`](https://github.com/vshanbha/weshall-portfolio/commit/b3a5f5b))

### Tests

- Add E2E coverage for BlogPosting URL, hreflang, canonical count, og:locale, breadcrumbs ([`08b8409`](https://github.com/vshanbha/weshall-portfolio/commit/08b8409), [`5fb33bc`](https://github.com/vshanbha/weshall-portfolio/commit/5fb33bc))
- Add build-output tests for sitemap canonical URLs and redirect page ([`3664230`](https://github.com/vshanbha/weshall-portfolio/commit/3664230))

### Chores

- Add `agents.md` commandment #5: preserve half-done work ([`1ccffe2`](https://github.com/vshanbha/weshall-portfolio/commit/1ccffe2))
- Add TODO comments to widened locale types ([`c1d5f5b`](https://github.com/vshanbha/weshall-portfolio/commit/c1d5f5b))
- Update workflow diagram for pre-push branch gate ([`10cd31b`](https://github.com/vshanbha/weshall-portfolio/commit/10cd31b))

### Commits

`5fb33bc` - test: add E2E assertions for canonical tag count and og:locale
`64a9616` - fix: resolve remaining SEO audit items from #23
`3664230` - test: add build-output test for /sitemap.xml redirect (H1)
`a241a7b` - fix: add /sitemap.xml redirect via Astro config (H1)
`d3a598c` - fix: transparent locale redirect — eliminate visible 'Redirecting' message
`ac40af1` - fix: harden sitemap tests, align trailing slashes and breadcrumb schema URLs
`08b8409` - test: add E2E coverage for SEO fixes and harden sitemap filter
`5f68ef1` - fix: resolve SEO audit issues #23

## [v0.2.1] - 2026-07-25

### Content

- Publish bye-bye-wordpress-part-1 article ([`d6e2c24`](https://github.com/vshanbha/weshall-portfolio/commit/d6e2c24))
- Publish run-further-than-a-marathon article ([`a6982c7`](https://github.com/vshanbha/weshall-portfolio/commit/a6982c7))
- Publish oops-i-deleted-it-again article ([`bcc146b`](https://github.com/vshanbha/weshall-portfolio/commit/bcc146b))

### Bug Fixes

- Article #2, Split Hero, redirect fixes, legal pages under [lang] ([`d5ec129`](https://github.com/vshanbha/weshall-portfolio/commit/d5ec129))
- E2E tests for root-level 301 redirects ([`4df5319`](https://github.com/vshanbha/weshall-portfolio/commit/4df5319))
- Fix root-level 404s: Astro redirects config, move legal pages under [lang] ([`d1f4608`](https://github.com/vshanbha/weshall-portfolio/commit/d1f4608))

### Commits

`d6e2c24` - v0.2.1: publish bye-bye-wordpress-part-1
`d5ec129` - v0.2.1: Article #2, Split Hero, redirect fixes, legal pages under [lang], E2E tests
`4df5319` - Add E2E tests for root-level 301 redirects
`d1f4608` - Fix root-level 404s: Astro redirects config, move legal pages under [lang]/

## [v0.2.0] - 2026-07-24

### Content

- Publish how-this-site-was-built-with-astro article ([`23bf3bf`](https://github.com/vshanbha/weshall-portfolio/commit/23bf3bf))

### Chores

- Bump version to 0.2.0 for Astro 7 upgrade and new article ([`bc9c6e9`](https://github.com/vshanbha/weshall-portfolio/commit/bc9c6e9))

### Commits

`bc9c6e9` - chore: bump version to 0.2.0 for Astro 7 upgrade and new article
`23bf3bf` - publish: how-this-site-was-built-with-astro article

## [v0.1.2] - 2026-07-20

### Bug Fixes

- Remove meta refresh tags from redirect stubs (use JS-only redirect) ([`4f6b086`](https://github.com/vshanbha/weshall-portfolio/commit/4f6b086))
- Align sitemap and i18n config to single locale (en), fixes hreflang conflicts ([`4f6b086`](https://github.com/vshanbha/weshall-portfolio/commit/4f6b086))
- Remove duplicate `<title>` from redirect stubs ([`4f6b086`](https://github.com/vshanbha/weshall-portfolio/commit/4f6b086))
- Homepage title now reads "We Shall Build — Build What Matters — We Shall Build" ([`4f6b086`](https://github.com/vshanbha/weshall-portfolio/commit/4f6b086))
- CTA button props passed explicitly at call sites ([`4f6b086`](https://github.com/vshanbha/weshall-portfolio/commit/4f6b086))

### Features

- Add `llms.txt` for AI crawler discoverability ([`4f6b086`](https://github.com/vshanbha/weshall-portfolio/commit/4f6b086))

### Commits

`4f6b086` - SEO audit fixes: remove meta refresh, align sitemap to single locale, fix homepage title, add llms.txt, pass CTA via props

## [v0.1.1] - 2026-07-20

### Content

- First blog article: ZeroClaw setup guide ([`060019a`](https://github.com/vshanbha/weshall-portfolio/commit/060019a))
- Article hero image, style guide polish ([`11cca30`](https://github.com/vshanbha/weshall-portfolio/commit/11cca30))

### Features

- About page (v8) with origin, career arc, speaking, articles ([`07b5aee`](https://github.com/vshanbha/weshall-portfolio/commit/07b5aee))
- Home page (v2) with brand-led hero and engagement story cards ([`07b5aee`](https://github.com/vshanbha/weshall-portfolio/commit/07b5aee))
- Services page with sounding board CTA ([`80c534c`](https://github.com/vshanbha/weshall-portfolio/commit/80c534c))
- Contact page redesign (LinkedIn + Upwork) ([`f05a612`](https://github.com/vshanbha/weshall-portfolio/commit/f05a612))
- Compliance pages: `/impressum`, `/datenschutz` ([`9aadfac`](https://github.com/vshanbha/weshall-portfolio/commit/9aadfac))

### Bug Fixes

- Hero heading sizing (Tailwind Preflight h1 reset) ([`cede637`](https://github.com/vshanbha/weshall-portfolio/commit/cede637))
- Story card href cleanup (404 links removed) ([`ecfb498`](https://github.com/vshanbha/weshall-portfolio/commit/ecfb498))
- Sounding board session duration: 60-min only across all locales ([`3f39350`](https://github.com/vshanbha/weshall-portfolio/commit/3f39350))
- BlogLayout image type narrowed to match content layer ([`3f39350`](https://github.com/vshanbha/weshall-portfolio/commit/3f39350))

### Chores

- GitHub comment policy for public repo ([`9aadfac`](https://github.com/vshanbha/weshall-portfolio/commit/9aadfac))
- Article publishing conventions in `agents.md` ([`060019a`](https://github.com/vshanbha/weshall-portfolio/commit/060019a))
- Branching policy for blog content exports ([`24ae86f`](https://github.com/vshanbha/weshall-portfolio/commit/24ae86f))

### Commits

`24ae86f` - docs: add feature/article branch policy for blog content exports
`d56cad8` - dark logo png for use at places where svg is not supported
`1480949` - fix: TypeScript errors, home page stub, and template type issues
`80c534c` - update nav.config.ts: replace stale Work/Approach with Services
`f05a612` - feat: contact page redesign, shortened story cards, mobile header fix
`060019a` - zeroclaw: first article export + agents.md publishing conventions
`9aadfac` - Launch prep: compliance pages, story card links removed, GitHub comment policy
`84cf2b4` - test: E2E coverage for impressum, datenschutz, and footer legal links
`cede637` - fix: hero heading sizing on all locales
`0edddb6` - refactor: adopt Velocity-standard i18n routing
`ecfb498` - remove dead story card href fields
`04d4f21` - QA round: language selector styling, translation clean-up, contact page reorg
`c07b0aa` - Update E2E tests: remove de/hi/mr locale tests
`d58ce56` - Blog: remove site name from article title, render hero image in article header
`c3e23d9` - more updates to troubleshooting
`11cca30` - Polish ZeroClaw article per style guide
`88e1bb9` - fix: sounding board session duration (60-min only), article image type
`3f39350` - fix: sounding board session duration, article image type
