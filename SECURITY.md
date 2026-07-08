# Security Policy

## Overview

This document defines privacy and security rules for the We shall build portfolio project. The portfolio is public-facing; the factory project is always private.

## Data Classification

| Data Type | Portfolio (Public) | Factory (Private) |
|-----------|-------------------|-------------------|
| Business email | ✅ Allowed | ✅ Allowed |
| Personal email | ❌ Never | ⚠️ Internal only |
| Phone number | ❌ Never | ⚠️ Internal only |
| Physical address | ❌ Never | ⚠️ Internal only |
| API keys / tokens | ❌ Never (use env vars) | ❌ Never |
| CV / personal documents | ❌ Never | ✅ Allowed |
| Public profiles (GitHub, LinkedIn) | ✅ Allowed | ✅ Allowed |

## Rules for Portfolio Project

### Never commit:
- Personal email addresses (use `contact@weshall.build`)
- Phone numbers
- Physical addresses
- Private API keys or tokens
- Internal URLs or credentials
- CVs, personal documents, or private observations

### Always use:
- Environment variables (`.env`) for sensitive configuration
- Business contact information only
- Public social profiles only

### Before pushing:
- Verify no personal data in `site.config.ts`
- Check `.env` is in `.gitignore`
- Review `git diff` for accidental exposure

## Factory Project

- Always private (contains CVs, personal documents, private syntheses)
- Never merge factory content to portfolio without explicit human review
- Content export requires the Manual Export Gate protocol

## Reporting

If you discover exposed private data, contact the repository owner immediately.
