# Changelog

## [v0.3.4] - 2026-10-06

Security-only patch: dependency advisory reduction from 8 to 1.

`pnpm audit` against the `v0.3.3` lockfile reports 8 (2 critical, 3 high,
3 moderate); GitHub's alert view splits the same 8 as 2/2/4, classifying
`source-map-js` as moderate rather than high. Both agree on the total.

That figure reads higher than the "38 to 4" recorded in v0.3.3. The advisory
database had grown since — `tinypool`, `source-map-js` and
`postcss-selector-parser` were not flagged when those overrides landed — so a
later audit of the same lockfile reported 7, and GitHub reported 8. Nothing
regressed; the count was re-measured against a newer database.

### Security

- Bump `vitest` 3.2.6 → 5.0.3, clearing `vitest`, `@vitest/mocker` and `tinypool` — including both critical `tinypool` advisories ([`8af54c2`](https://github.com/vshanbha/weshall-portfolio/commit/8af54c2))
- Resolve patched `http-cache-semantics` 4.2.0 → 4.3.0, `source-map-js` 1.2.1 → 1.2.2 and `postcss-selector-parser` 7.1.4 → 7.1.6 ([`dc5b4dc`](https://github.com/vshanbha/weshall-portfolio/commit/dc5b4dc))

One advisory survives: `braces`, with no upstream fix — `3.0.3` is `latest` on
npm — and a lint-time devDependency that never reaches the published site.

### Bug Fixes

- Correct the `http-cache-semantics` claim in `SECURITY.md`, which had recorded it as unfixable on npm's `<0.0.0` advisory metadata ([`f833010`](https://github.com/vshanbha/weshall-portfolio/commit/f833010))

### Docs

- Drop the advisories vitest 5.0.3 resolved ([`5c15d47`](https://github.com/vshanbha/weshall-portfolio/commit/5c15d47))
- Name the full `braces` dependency chain and date both advisory checks ([`47a52e6`](https://github.com/vshanbha/weshall-portfolio/commit/47a52e6), [`910f0b8`](https://github.com/vshanbha/weshall-portfolio/commit/910f0b8))

### Commits

`dc4aaa6` - chore: bump version to 0.3.4
`5c68008` - fix(changelog): apply Gate B findings to the v0.3.4 entry
`438d0f0` - chore: release v0.3.4 changelog
`910f0b8` - docs(security): date the http-cache-semantics verification
`47a52e6` - docs(security): name the braces dependency chain and date the advisory check
`5c15d47` - docs(security): drop the vitest advisories, now resolved by vitest 5.0.3
`f833010` - docs(security): correct the http-cache-semantics claim and restate the advisory set
`dc5b4dc` - chore(deps): resolve patched http-cache-semantics, source-map-js, postcss-selector-parser
`8af54c2` - chore(deps): bump @vitest/mocker

## [v0.3.3] - 2026-10-05

### Features

- Record AI image provenance in a typed frontmatter object ([`f163c6c`](https://github.com/vshanbha/weshall-portfolio/commit/f163c6c))
- Surface AI publishing transparency to readers and machines ([`46e80a7`](https://github.com/vshanbha/weshall-portfolio/commit/46e80a7))
- Stamp IPTC/XMP provenance onto delivered images after build ([`503a30f`](https://github.com/vshanbha/weshall-portfolio/commit/503a30f))
- Enforce the editorial review gate in the content schema ([`66f35e6`](https://github.com/vshanbha/weshall-portfolio/commit/66f35e6))
- Home page story and testimonial sections, About page beliefs, locale translations ([`f951a0b`](https://github.com/vshanbha/weshall-portfolio/commit/f951a0b))
- Publish approved testimonial as the fifth home page client tab ([`b9ff8f4`](https://github.com/vshanbha/weshall-portfolio/commit/b9ff8f4))
- Promote _What I believe_ to an H2 section and link the companion article from the accordion ([`081be39`](https://github.com/vshanbha/weshall-portfolio/commit/081be39))

### Bug Fixes

- Clear the four WCAG 2.2 AA violations reported by axe ([`a282408`](https://github.com/vshanbha/weshall-portfolio/commit/a282408))
- Rename the About _What I do_ section to _How I build_ ([`5262b4b`](https://github.com/vshanbha/weshall-portfolio/commit/5262b4b))
- Collapse the commandments under _How I build_ by default in dormant locales ([`d4d7e3c`](https://github.com/vshanbha/weshall-portfolio/commit/d4d7e3c))
- Remove the hardcoded English _Read more_ fallback from Accordion ([`11f9d5f`](https://github.com/vshanbha/weshall-portfolio/commit/11f9d5f))
- Remove em dashes from commandments and quote attributions for ai-tells compliance ([`342f0c0`](https://github.com/vshanbha/weshall-portfolio/commit/342f0c0), [`b00d8f0`](https://github.com/vshanbha/weshall-portfolio/commit/b00d8f0), [`ddfed79`](https://github.com/vshanbha/weshall-portfolio/commit/ddfed79), [`a2570ff`](https://github.com/vshanbha/weshall-portfolio/commit/a2570ff))
- Fix grammar in the Ourish quote across dormant locales ([`c07bd3e`](https://github.com/vshanbha/weshall-portfolio/commit/c07bd3e), [`fec7011`](https://github.com/vshanbha/weshall-portfolio/commit/fec7011))
- Restore the Jcon talk and mentoring entries to the About speaking section ([`8cd0b3a`](https://github.com/vshanbha/weshall-portfolio/commit/8cd0b3a))

### Security

- Override transitive packages carrying known advisories — `pnpm audit` from 38 to 4 at release time ([`ae2e474`](https://github.com/vshanbha/weshall-portfolio/commit/ae2e474))
- Document the remaining advisories with GHSA links in `SECURITY.md` ([`2586146`](https://github.com/vshanbha/weshall-portfolio/commit/2586146))

### Tests

- Add axe WCAG 2.2 AA checks to the E2E suite, including the 404 page ([`6cd69d5`](https://github.com/vshanbha/weshall-portfolio/commit/6cd69d5), [`d5e2b10`](https://github.com/vshanbha/weshall-portfolio/commit/d5e2b10))
- Add blocking image provenance checks and build-output tests ([`fbf7399`](https://github.com/vshanbha/weshall-portfolio/commit/fbf7399))
- Extract JSON-LD blocks without a tag-matching regex ([`76c1e09`](https://github.com/vshanbha/weshall-portfolio/commit/76c1e09))
- Keep `astro preview` in the foreground so the Playwright webServer check succeeds ([`5d43e01`](https://github.com/vshanbha/weshall-portfolio/commit/5d43e01))
- Update the stale About page regex to _How I build_ ([`98ca202`](https://github.com/vshanbha/weshall-portfolio/commit/98ca202))
- Drop the C2PA tripwire and record the signing decision ([`c9a0bab`](https://github.com/vshanbha/weshall-portfolio/commit/c9a0bab))

### CI/CD

- Gate deployment on the Validate workflow ([`dbf6978`](https://github.com/vshanbha/weshall-portfolio/commit/dbf6978))
- Install a pinned ExifTool in the deploy build, kept inside its source tree ([`620c61c`](https://github.com/vshanbha/weshall-portfolio/commit/620c61c), [`7fe3d7a`](https://github.com/vshanbha/weshall-portfolio/commit/7fe3d7a))

### Chores

- Bump the `npm_and_yarn` group: `astro` 7.1.0 → 7.2.8, `js-yaml` 4.3.0 → 4.3.2, `svgo` 4.0.2 → 4.1.0 ([`32d5c64`](https://github.com/vshanbha/weshall-portfolio/commit/32d5c64))
- Raise `sharp` to ^0.35.4 to satisfy the Astro 7.2.8 minimum ([`c2db45e`](https://github.com/vshanbha/weshall-portfolio/commit/c2db45e))
- Add a PR template recording the Gate B review ([`701baad`](https://github.com/vshanbha/weshall-portfolio/commit/701baad))
- Migrate OpenCode configuration to V2 ([`b22fb94`](https://github.com/vshanbha/weshall-portfolio/commit/b22fb94))
- Move the commandments under _What I do_, collapse by default, update testimonials ([`8fe41a0`](https://github.com/vshanbha/weshall-portfolio/commit/8fe41a0))

### Docs

- Document how to run the Gate B review agent ([`33ce8ee`](https://github.com/vshanbha/weshall-portfolio/commit/33ce8ee))
- Correct the review-agent guidance against the reviewer's findings ([`f3a4e5e`](https://github.com/vshanbha/weshall-portfolio/commit/f3a4e5e))
- Close the review-agent guidance contradictions ([`2357f4a`](https://github.com/vshanbha/weshall-portfolio/commit/2357f4a))
- Use current OpenCode V2 names and settle the Gate B wording ([`7e7bda8`](https://github.com/vshanbha/weshall-portfolio/commit/7e7bda8))
- Fix the Prettier regression and the shell/permission ambiguity ([`bde06b2`](https://github.com/vshanbha/weshall-portfolio/commit/bde06b2))
- Record where the provenance note's Oops hero values come from ([`a42211c`](https://github.com/vshanbha/weshall-portfolio/commit/a42211c))
- Correct two claims the re-review caught in the provenance note ([`08cf195`](https://github.com/vshanbha/weshall-portfolio/commit/08cf195))
- Correct the Accordion JSDoc for the href/linkText contract ([`56b4592`](https://github.com/vshanbha/weshall-portfolio/commit/56b4592))

### Commits

`2586146` - docs(security): record the four advisories with no upstream fix
`ae2e474` - chore(deps): override transitive packages with known advisories
`314ee7d` - docs(skill): tighten the deploy verification wording
`84298ea` - docs(skill): correct the deploy trigger in the release runbook
`cc4a5a2` - docs(skill): reconcile release-pr ordering with the dev-first release flow
`e66fa6f` - docs(changelog): record the v0.3.3 version bump commit
`dbd28ff` - chore: bump version to 0.3.3
`a494925` - fix(changelog): move 547fd2e and 817eb66 into the v0.3.1 commits list
`c0a685d` - fix(changelog): correct commit attribution and backfill omissions
`87633e6` - chore: release v0.3.3 changelog, backfill v0.3.1 and v0.3.2
`5d43e01` - test(e2e): keep astro preview in foreground for Playwright
`c2db45e` - chore(deps): raise sharp to ^0.35.4 for astro 7.2.8 minimum
`b9ff8f4` - feat(home): publish approved BauAI testimonial as fifth client tab (factory issue #14)
`8cd0b3a` - Restore Jcon talk and mentoring entries to About speaking section (factory issue #5)
`32d5c64` - chore(deps): bump the npm_and_yarn group across 1 directory with 3 updates
`bde06b2` - docs: fix the Prettier regression and the shell/permission ambiguity
`7e7bda8` - docs: use current OpenCode V2 names and settle the Gate B wording
`2357f4a` - docs: close the review-agent guidance contradictions
`f3a4e5e` - docs: correct the review-agent guidance against the reviewer's findings
`33ce8ee` - docs: document how to run the Gate B review agent
`08cf195` - docs: correct two claims the re-review caught in the provenance note
`a42211c` - docs: record where the Oops hero's provenance values come from
`d5e2b10` - test: include the 404 page in the axe scan
`6cd69d5` - test: add axe WCAG 2.2 AA checks to the e2e suite
`a282408` - fix(a11y): clear the four WCAG 2.2 AA violations axe reports
`c9a0bab` - test: drop the C2PA tripwire and record the signing decision
`dbf6978` - ci: gate deployment on the Validate workflow
`76c1e09` - test: extract JSON-LD blocks without a tag-matching regex
`7fe3d7a` - ci: keep ExifTool inside its source tree so Image::ExifTool resolves
`620c61c` - ci: install pinned ExifTool in the deploy build
`701baad` - docs: add a PR template with a recorded Gate B review
`66f35e6` - feat(content): enforce the editorial review gate in the schema
`fbf7399` - test: add blocking provenance checks, CI workflow and docs
`503a30f` - feat: stamp IPTC/XMP provenance onto delivered images after build
`46e80a7` - feat: surface AI publishing transparency to readers and machines
`f163c6c` - feat(content): record AI image provenance in a typed frontmatter object
`b22fb94` - opencode migrated to v2
`56b4592` - docs: correct Accordion JSDoc for href/linkText contract
`11f9d5f` - fix: remove hardcoded English 'Read more' fallback from Accordion
`081be39` - feat: promote What I believe to H2 section + link companion article from accordion
`98ca202` - test: update stale About page regex to 'How I build'
`5262b4b` - fix: rename About 'What I do' section to 'How I build'
`d4d7e3c` - fix: collapse commandments in dormant locales, rename E2E test
`8fe41a0` - refactor: move commandments under What I do, collapse by default, update testimonials
`fec7011` - fix: grammar in Ourish quote across dormant locales
`c07bd3e` - fix: grammar in Ourish quote — 'is delivering' → 'in delivering'
`ddfed79` - fix: replace em dash in Ourish role across all dormant locale files
`a2570ff` - fix: replace em dash in Ourish testimonial role with comma
`342f0c0` - fix: remove remaining em dashes from quote attributions in commandments
`b00d8f0` - fix: remove em dashes from What I Believe commandments (ai-tells compliance)
`f951a0b` - session: home page stories + testimonials, about page beliefs, translations, opencode config
`5059b41` - chore: bump version to 0.3.2

## [v0.3.2] - 2026-08-28

### Bug Fixes

- Replace the em-dash with a dash separator in page titles and remove the duplicate site name ([`13fdb81`](https://github.com/vshanbha/weshall-portfolio/commit/13fdb81))
- Simplify title construction and add the missing tagline translations for de/hi/mr ([`9daaf32`](https://github.com/vshanbha/weshall-portfolio/commit/9daaf32))

### Chores

- Bump `sharp` to ^0.35.1 and fix E2E to run against the production build ([`71bbabb`](https://github.com/vshanbha/weshall-portfolio/commit/71bbabb))
- Change the planning model to MiMo V2.5 ([`9a6d093`](https://github.com/vshanbha/weshall-portfolio/commit/9a6d093))

### Commits

`9daaf32` - fix: simplify title construction, add missing tagline translations for de/hi/mr
`13fdb81` - fix: replace em-dash with dash separator in page titles, remove duplicate site name
`9a6d093` - chore: change planning model to MiMo V2.5
`845d10d` - publishing date of article modified since this is a republishing of an old article
`71bbabb` - fix(deps): bump sharp to ^0.35.1, fix e2e to run against production build

## [v0.3.1] - 2026-08-17

### Bug Fixes

- Resolve SEO audit #27 findings: hreflang trailing slash, absolute image URLs, publisher logo, title typo, redirect shim metadata ([`f83e5da`](https://github.com/vshanbha/weshall-portfolio/commit/f83e5da))
- Remove the dead `SearchAction` code from the WebSite schema ([`feb75aa`](https://github.com/vshanbha/weshall-portfolio/commit/feb75aa))
- Add a desktop scorecard image and captions to the _How this site was built_ article ([`006bcb0`](https://github.com/vshanbha/weshall-portfolio/commit/006bcb0))
- Fix frontmatter to match the portfolio schema ([`019bb1e`](https://github.com/vshanbha/weshall-portfolio/commit/019bb1e))
- Remove an orphaned `<hr>` in the marathon article ([`8dd8f51`](https://github.com/vshanbha/weshall-portfolio/commit/8dd8f51))
- Restore frontmatter `image` fields for blog list cards ([`49f6ab7`](https://github.com/vshanbha/weshall-portfolio/commit/49f6ab7))
- Wire `heroCaption` through the content schema ([`e39f917`](https://github.com/vshanbha/weshall-portfolio/commit/e39f917))
- Clean up `heroCaption` per code review ([`17f4627`](https://github.com/vshanbha/weshall-portfolio/commit/17f4627))

### Features

- Accurate reading time from word count, with caption unit tests ([`d475ba8`](https://github.com/vshanbha/weshall-portfolio/commit/d475ba8))

- Move the standard CTA to BlogLayout and add a `caption` prop to ArticleHero ([`8f04d87`](https://github.com/vshanbha/weshall-portfolio/commit/8f04d87))
- Add the standard CTA to all articles ([`30946be`](https://github.com/vshanbha/weshall-portfolio/commit/30946be))
- Convert 4 articles from MD to MDX for inline image captions ([`5144f9f`](https://github.com/vshanbha/weshall-portfolio/commit/5144f9f))
- Use the Image component in MDX bodies, avoiding duplicate hero images ([`15fd40c`](https://github.com/vshanbha/weshall-portfolio/commit/15fd40c))
- Convert remaining markdown images to the Image component ([`3cc9317`](https://github.com/vshanbha/weshall-portfolio/commit/3cc9317))

### Content

- Add the tech stack selection article and cross-pollinate tags ([`8e2cbdd`](https://github.com/vshanbha/weshall-portfolio/commit/8e2cbdd))
- Add a short eulogy article with a cross-link ([`fd87359`](https://github.com/vshanbha/weshall-portfolio/commit/fd87359))
- Add the Solr/Zookeeper scaling article ([`1eafd91`](https://github.com/vshanbha/weshall-portfolio/commit/1eafd91))
- Mark 3 articles as featured ([`0efcc3f`](https://github.com/vshanbha/weshall-portfolio/commit/0efcc3f))
- Add the custom domain CNAME ([`d1b622d`](https://github.com/vshanbha/weshall-portfolio/commit/d1b622d))
- Republish an article and correct its publishing date ([`547fd2e`](https://github.com/vshanbha/weshall-portfolio/commit/547fd2e))
- Remove numbers from image captions ([`817eb66`](https://github.com/vshanbha/weshall-portfolio/commit/817eb66))

### Tests

- Add an E2E test for the blog article CTA ([`f054c8c`](https://github.com/vshanbha/weshall-portfolio/commit/f054c8c))
- Add a hero caption negative test ([`7c56a93`](https://github.com/vshanbha/weshall-portfolio/commit/7c56a93))
- Update the caption test to match the revised text ([`0947425`](https://github.com/vshanbha/weshall-portfolio/commit/0947425))

### Chores

- Bump `sharp` in the `npm_and_yarn` group ([`2a8c651`](https://github.com/vshanbha/weshall-portfolio/commit/2a8c651))
- Add the `@/` path alias to the Vitest config ([`d91eb75`](https://github.com/vshanbha/weshall-portfolio/commit/d91eb75), [`87ddab0`](https://github.com/vshanbha/weshall-portfolio/commit/87ddab0))

### Commits

`8e2cbdd` - Add tech stack selection article + cross-pollinate tags
`fd87359` - feat: add SO eulogy short article (Medium cross-link)
`5144f9f` - refactor: convert 4 articles from MD to MDX for inline image captions
`15fd40c` - fix: use Image component in MDX bodies, avoid duplicate hero images
`3cc9317` - fix: convert remaining markdown images to Image component
`30946be` - content: add standard CTA to all articles
`8f04d87` - refactor: move CTA to BlogLayout, add caption prop to ArticleHero
`49f6ab7` - fix: restore frontmatter image fields for blog list cards
`1eafd91` - Add Solr/Zookeeper scaling article (Type B from Medium)
`0efcc3f` - Mark 3 articles as featured
`019bb1e` - Fix frontmatter to match portfolio schema
`d1b622d` - Create CNAME
`547fd2e` - new article re-published
`817eb66` - removed numbers from image captions
`f83e5da` - fix(seo): resolve audit #27 findings — hreflang trailing slash, absolute image URLs, publisher logo, title typo, redirect shim metadata
`feb75aa` - fix(seo): remove dead SearchAction code from WebSite schema
`006bcb0` - fix(content): add desktop scorecard image and captions to how-this-site-was-built article
`e39f917` - feat: wire heroCaption through content schema, add positive test
`17f4627` - fix: clean up heroCaption per code review
`d475ba8` - feat: accurate reading time from word count, caption unit tests
`f054c8c` - test: add E2E test for blog article CTA
`7c56a93` - test: add hero caption negative test
`0947425` - fix: update caption test to match revised text
`8dd8f51` - fix: remove orphaned hr in marathon article
`87ddab0` - fix: add @/ path alias to vitest config for test imports
`d91eb75` - chore: add @/ path alias to vitest config
`2a8c651` - chore(deps): bump sharp in the npm_and_yarn group across 1 directory
`fc40caf` - chore: release v0.3.1

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
