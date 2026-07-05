---
name: accessibility
description: Use when building or auditing accessible components, pages, or interfaces. Covers WCAG 2.2 AA compliance, ARIA patterns, keyboard navigation, screen reader testing, and colour contrast for the Velocity project.
---

# Accessibility

## Overview

This skill ensures all components and pages meet **WCAG 2.2 AA** compliance. Velocity components are built accessible by default — maintain and extend these patterns. Accessibility is not optional; it is a core quality requirement.

## Quick Reference

| Task | Command |
|------|---------|
| Run axe audit | `npx @axe-core/cli http://localhost:4321` |
| Run Lighthouse a11y | Lighthouse tab in Chrome DevTools |
| Keyboard test | Tab through page manually |
| Screen reader test | Use VoiceOver (Mac) or NVDA (Windows) |

## WCAG 2.2 AA Requirements

### Perceivable

| Criterion | Requirement |
|-----------|-------------|
| 1.1.1 Text Alternatives | All images have `alt` text; decorative images use `alt=""` |
| 1.3.1 Info and Relationships | Use semantic HTML: `<nav>`, `<main>`, `<header>`, `<footer>`, `<article>` |
| 1.4.1 Use of Colour | Colour is never the only way to convey information |
| 1.4.3 Contrast Minimum | Text: 4.5:1 ratio; large text: 3:1 |
| 1.4.11 Non-text Contrast | UI components: 3:1 against adjacent colours |

### Operable

| Criterion | Requirement |
|-----------|-------------|
| 2.1.1 Keyboard | All interactive elements reachable and operable via keyboard |
| 2.4.1 Bypass Blocks | Skip navigation link provided |
| 2.4.3 Focus Order | Logical tab order matching visual layout |
| 2.4.7 Focus Visible | Clear focus indicator on all interactive elements |
| 2.5.5 Target Size | Click targets: minimum 44x44 CSS pixels |

### Understandable

| Criterion | Requirement |
|-----------|-------------|
| 3.1.1 Language of Page | `lang` attribute on `<html>` |
| 3.2.1 On Focus | No unexpected context changes on focus |
| 3.3.1 Error Identification | Form errors clearly described in text |
| 3.3.2 Labels or Instructions | All form inputs have associated labels |

### Robust

| Criterion | Requirement |
|-----------|-------------|
| 4.1.2 Name, Role, Value | Custom components expose correct ARIA roles and properties |

## Component Accessibility Patterns

### Buttons

```astro
---
interface Props {
  label: string;
  variant?: string;
  disabled?: boolean;
}
---

<button 
  type="button"
  aria-label={label}
  disabled={disabled}
  class="..."
>
  {label}
</button>
```

### Navigation

```astro
<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/blog">Blog</a></li>
  </ul>
</nav>
```

### Forms

```astro
<div class="field">
  <label for="email">Email address</label>
  <input 
    type="email" 
    id="email" 
    name="email"
    aria-required="true"
    aria-invalid={hasError}
    aria-describedby={hasError ? 'email-error' : undefined}
  />
  {hasError && (
    <p id="email-error" role="alert">Please enter a valid email</p>
  )}
</div>
```

### Modals / Dialogs

```astro
<dialog 
  aria-labelledby="dialog-title"
  aria-describedby="dialog-desc"
>
  <h2 id="dialog-title">Confirm action</h2>
  <p id="dialog-desc">This cannot be undone.</p>
  <button autofocus>Close</button>
</dialog>
```

### Images

```astro
<!-- Informative image -->
<Image src={chart} alt="Sales increased 40% from January to March" />

<!-- Decorative image -->
<Image src={divider} alt="" role="presentation" />
```

## Keyboard Navigation

### Requirements

- **All interactive elements** must be reachable via Tab
- **Focus order** must match visual layout (left-to-right, top-to-bottom)
- **Focus must never be trapped** (unless it's a modal — then Escape closes it)
- **Skip navigation link** must be first focusable element
- **Enter/Space** activates buttons and links
- **Escape** closes dropdowns, modals, dialogs

### Focus Management

```css
/* Custom focus styles (Velocity uses these) */
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

/* Never remove focus outlines */
:focus {
  outline: none; /* BAD — never do this */
}
```

## Colour and Contrast

### Velocity Themes

Both `default` and `midnight` themes are designed for contrast compliance:

- **Default theme:** neutral grays + International Orange — meets 4.5:1 on white
- **Midnight theme:** deep purple + electric violet — meets 4.5:1 on dark

### Checking Contrast

```bash
# Use Chrome DevTools
1. Open DevTools → Elements
2. Click the colour swatch next to a CSS colour
3. Check the contrast ratio display
4. Target: 4.5:1 for normal text, 3:1 for large text
```

### Rules

- **Never use colour alone** to convey meaning (add icons, text, or patterns)
- **Test with colour blindness simulators** (Chrome DevTools → Rendering → Emulate vision deficiencies)
- **Ensure focus indicators** have sufficient contrast against backgrounds

## Testing Checklist

### Automated Testing

- [ ] No axe-core errors (`npx @axe-core/cli`)
- [ ] Lighthouse accessibility score ≥ 90
- [ ] No TypeScript errors related to ARIA attributes

### Manual Testing

- [ ] Tab through entire page — logical order, no traps
- [ ] Skip navigation link works
- [ ] All form inputs have visible labels
- [ ] Error messages are announced to screen readers
- [ ] Images have appropriate alt text
- [ ] Colour is not the only information carrier
- [ ] Focus indicator visible on all interactive elements
- [ ] Modal focus is trapped and Escape closes it

### Screen Reader Testing

- [ ] Page title is descriptive
- [ ] Headings form a logical hierarchy (h1 → h2 → h3)
- [ ] Landmarks are correctly identified (nav, main, aside)
- [ ] Dynamic content is announced via `aria-live` or `role="alert"`
- [ ] Form validation errors are associated with inputs

## Common Accessibility Issues

| Issue | Fix |
|-------|-----|
| Missing alt text | Add descriptive `alt` to all informative images |
| No label on input | Use `<label for="id">` or `aria-label` |
| Low contrast text | Increase font weight or darken background |
| Focus not visible | Use `:focus-visible` with clear outline |
| Click target too small | Increase padding to meet 44x44px minimum |
| Keyboard trap | Ensure Escape closes modals, no infinite tab loops |
| Missing lang attribute | Add `lang="en"` to `<html>` |
