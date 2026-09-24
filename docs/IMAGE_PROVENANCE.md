# Image provenance and AI disclosure

Technical implementation of the AI transparency requirements for weshall.build
(EU AI Act Article 50): visible disclosure of AI-generated images, machine-readable
provenance metadata, publishing principles, and the checks that keep them honest.

A passing check proves that the disclosure, metadata and structured data are present
and consistent. **It is not a legal audit.**

## Source of truth

Provenance lives in article frontmatter as a typed `imageProvenance` object
(`src/content.config.ts`):

```yaml
imageProvenance:
  kind: ai-generated
  disclosure: AI-generated illustration
  system: ChatGPT
  createdOn: 2026-06-21
  sourceUrl: https://ai.gopubby.com/oops-i-deleted-it-again-f6495ae4706b
```

Rules:

- Only known, truthful values. Never write `unknown`, `optional` or similar
  placeholders — omit the key instead.
- `systemVersion` is written only when it can be verified (the marathon hero
  records `gpt-image` / `2.0` from its C2PA manifest).
- `prompt` is written only after it has been approved for publication. No prompt
  is currently published.
- `digitalSourceType` is always `trainedAlgorithmicMedia`; it is not stored in
  frontmatter.

Everything else derives from this object: the visible caption, the IPTC/XMP
metadata, the JSON-LD image caption, and the CI checks.

## What reaches the site

| Surface                   | Where                                                                                                                      |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Visible caption           | `ArticleHero` caption, falling back to `imageProvenance.disclosure`                                                        |
| IPTC Photo Metadata (XMP) | every delivered asset in `dist/_astro/`                                                                                    |
| C2PA                      | existing manifest on the marathon hero, preserved as-is                                                                    |
| JSON-LD                   | `BlogPosting` (publishing principles, image caption/credit) and a separate `WebPage` (`reviewedBy`, publishing principles) |
| Statement                 | `/en/about` section `#editorial-standards`                                                                                 |
| Footer link               | "AI use in publishing", shared by every footer layout                                                                      |

## Build step

`pnpm build` runs `astro build && node scripts/image-provenance.mjs`.

Astro/Sharp re-encodes images during the build, so the WebP renditions browsers
load through `srcset` carry no metadata. The script runs **after** `astro build`
and stamps the delivered files in `dist/`, then reads every value back. It fails
the build if ExifTool is missing, if a marked article has no delivered assets, or
if any value cannot be verified.

### Tools

| Tool       | Version         | macOS                                                              | Debian/Ubuntu                            |
| ---------- | --------------- | ------------------------------------------------------------------ | ---------------------------------------- |
| ExifTool   | 13.55           | `brew install exiftool`                                            | `apt-get install libimage-exiftool-perl` |
| `c2patool` | 0.28.0 (pinned) | [GitHub release](https://github.com/contentauth/c2patool/releases) | same, `x86_64-unknown-linux-gnu`         |

CI pins both versions in `.github/workflows/ci.yml`.

### Adding another AI-generated image

1. Confirm the image really is AI-generated. Screenshots, diagrams, SVGs and
   sourced photographs are not marked.
2. Add `imageProvenance` to the article frontmatter with known values only.
3. Run `pnpm build`. The delivered assets are stamped automatically.
4. Run `pnpm validate`. The provenance tests fail until disclosure, metadata and
   JSON-LD all line up.

## Deliberate limitations

- **No legacy IPTC IIM.** Both current images are PNG/WebP. Their IPTC Photo
  Metadata is written as XMP (Iptc4xmpCore, Iptc4xmpExt, photoshop, dc), which is
  the standard carrier for these fields in those formats. ExifTool warns that IPTC
  IIM in PNG is non-standard, so it is not written.
- **Files that carry a C2PA manifest are never modified.** Adding any chunk
  invalidates the manifest's asset hash. The marathon hero therefore keeps its
  original manifest on the PNG (including `og:image`), while its WebP renditions
  carry IPTC/XMP. Provenance is present on both delivered forms.
- **Publisher signing of the Oops hero is deferred.** It has no C2PA manifest yet;
  it carries IPTC/XMP, the visible caption and JSON-LD instead. A tripwire test
  records the current state and must be updated when a manifest is added.
- **Certificate trust warnings on the existing manifest are pre-existing.**
  `signingCredential.untrusted` and `signingCredential.invalid` come from the
  original signing certificate, not from this work. The check asserts that the
  claim signature validates and that `assertion.dataHash.mismatch` is absent —
  i.e. the manifest still describes the file it is attached to.
- **No rights statement is asserted.** `CopyrightNotice` and `WebStatementOfRights`
  are omitted: no canonical rights URL exists for these images, and asserting
  rights over third-party or generated material would be a fabrication.
- **The prompt and its writer are not published.** `AIPromptInformation` and
  `AIPromptWriterName` are written only once a prompt is approved and its writer
  recorded.

## Audited assets

Every image referenced by published content, reviewed for this work:

| Asset | Used by | Nature | Marked as AI-generated |
|--------|---------|--------|------------------------|
| `forrest_monument_valley.png` | *Run Further Than a Marathon* hero | Generated (`gpt-image` 2.0, C2PA manifest) | Yes |
| `oops-i-deleted-it-again-hero.png` | *Oops, I Deleted It Again* hero | Generated (ChatGPT, publisher records) | Yes |
| `sufiya-sufi-et-hero.jpg` | *Run Further Than a Marathon* inline | Sourced press photograph, attributed | No |
| `zeroclaw-personal-ai-assistant-hero.png` | *ZeroClaw* hero | Application screenshot | No |
| `bye-bye-wordpress-part-1.webp` | *Bye Bye WordPress* hero | PageSpeed report screenshot | No |
| `weshall-pagespeed-desktop.png`, `-mobile.png` | *How this site was built* | PageSpeed report screenshots | No |
| `how-to-choose-your-next-tech-stack-hero.svg` | *Choose your next tech stack* hero | Hand-authored diagram | No |
| `solr-zookeeper-hero.svg` | *Solr/ZooKeeper scaling* hero | Hand-authored diagram | No |

Two published articles have no hero image. `public/` holds branding assets only.
Social (`/og/...`) images are rendered from text at build time, not generated by
an AI system, and are not marked.

Screenshots, diagrams, SVGs and sourced photographs are deliberately not marked:
there is no evidence they were AI-generated.

## Checks

`pnpm validate` runs lint, `astro check`, the build (including the provenance
step) and `tests/build/`, which covers:

- visible disclosure on every marked article;
- the editorial-standards statement and its anchor;
- the footer link on PageLayout, MarketingLayout and BlogLayout pages;
- JSON-LD shape: two simple objects, no `@graph`, `publishingPrinciples`,
  `reviewedBy` as an inline `Person`, image caption and credit;
- IPTC/XMP on every delivered asset, or an intact C2PA manifest;
- C2PA integrity for the existing manifest;
- frontmatter hygiene (no placeholder values).
