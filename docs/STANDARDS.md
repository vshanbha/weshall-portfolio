# Project Standards & Best Practices

The full text of the project's standards that [`AGENTS.md`](../AGENTS.md)
defers to. AGENTS.md is injected into every session and stays lean; this is
the standards document it points to — read both before starting any task.
Section headings are kept identical to their former AGENTS.md names so
checklists and cross-references (Gate B, skills, docs) keep working.

## Operational Principles

- **AI Safety:** AI agents may draft components, propose styling, and suggest content structure. They must NOT deploy directly, alter production configuration, or bypass human review.
- **Data Integrity:** Agents MUST NOT delete, move, rename, or otherwise modify files or directory structures without explicit, prior user approval for each specific action.
- **Shell Command Integrity:** All shell commands must be executed independently. Do not chain commands using operators like `&&`, `;`, `||`, or pipes `|` when multiple distinct actions are involved. Each command must be proposed and approved separately.
- **No Secrets in Code:** Never commit environment variables, API keys, or secrets. Use `.env` (gitignored) and reference `.env.example` for documentation.
- **Locale Integrity:** When modifying translation files (`src/i18n/translations/*.ts`), existing translations in non-English locales (de, hi, mr) must be preserved. Never replace a language-specific translation with English text. If new content needs to be added to a locale file and no translation exists, add the English text as a placeholder AND flag it in a comment (e.g. `// TODO: translate`). For brand names that appear in all locales, transliterate into the target script (e.g. Devanagari for hi/mr) rather than keeping Roman script. See [`docs/LOCALES.md`](LOCALES.md) for the current locale state (hi/mr are aspirational) and the language-activation checklist.
- **String Integrity:** All user-facing strings must come from the translation bundles via `t()` / `useTranslations()` (`@/i18n`) — never hardcoded in a page or component; the string equivalent of the colours/design-tokens rule. Redirect shims and the 404 page included. For a new string, add the key to `src/i18n/translations/en.ts` first — `satisfies SiteStrings` then names every locale file that needs it, and non-English placeholders get `// TODO: translate` per Locale Integrity. The shim/404 clause is machine-guarded by `tests/build/shim-strings.test.ts`; the rest is enforced at review and in the SEO/i18n audit. Branding constants (the site name in `src/config/site.config.ts`) are configuration, not prose.

## Astro Technical Standards (Iron Laws)

These are **mandatory** for all agents working on this project:

| Law                        | Rule                                                                                                           |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Zero-JS by Default**     | Use `.astro` components for static content. Framework components (React, Svelte) only for interactive islands. |
| **Strictly Typed Content** | Content Collections must use Zod schemas via `defineCollection()`. Never skip schema validation.               |
| **Intentional Hydration**  | Always specify `client:*` directives explicitly. Never rely on defaults.                                       |
| **Image Optimisation**     | Never use raw `<img>` tags. Always use `<Image />` from `astro:assets`.                                        |
| **No Untyped Content**     | Never use `Astro.glob()`. Always use `getCollection()` from `astro:content`.                                   |
| **Typed Environment**      | Use `astro:env` for type-safe environment variables. Never use `process.env`.                                  |

Full reference: `factory/skills/astro-specialist/references/technical-standards.md` — the private `factory/` vault at the workspace root, outside this repo.

## Conventions

- **Language:** Use British and Indian English (e.g., 'Modelling', 'Analysed', 'Harmonise') in all user-facing content. Avoid American English spellings.
- **Source Attribution:** When referencing external sources, provide direct, clickable links/URLs. Validate links before presenting.
- **Component Naming:** Follow Velocity patterns — PascalCase for component files, colocated with `.tsx` extension.
- **Styling:** Use Tailwind CSS v4 utility classes. Do not hardcode colours — use design tokens from `src/styles/tokens/`.
- **TypeScript:** Strict mode (`astro/tsconfigs/strict`). Use the `@/` path alias for imports from `src/`.
- **Imports:** Use path aliases — `import { Button } from '@/components/ui'` rather than relative paths.
