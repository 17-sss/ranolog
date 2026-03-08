# AGENTS.md

## Project Overview

- Ranolog is a personal blog built with Next.js Pages Router, TypeScript, React 18, and Emotion.
- The site has three main sections: Blog, Projects, and Resume.
- Content is stored in `docs/` as Markdown or MDX and rendered into static pages.

## Setup Commands

- Prefer `yarn` in this repository. A committed `yarn.lock` is present, so avoid mixing package managers unless explicitly requested.
- Install dependencies: `yarn install`
- Start the development server: `yarn dev`
- Build for production: `yarn build`
- Build with bundle analysis: `yarn build:analyze`
- Start the production server: `yarn start`
- Run lint checks: `yarn lint`
- Start Storybook on port `6006`: `yarn storybook`
- Build Storybook: `yarn build-storybook`
- Run the interactive frontmatter generator: `yarn docsmaker`
- Generate `sitemap.xml` and `robots.txt` after a build: `yarn postbuild`

## Testing Instructions

- There is no dedicated `test` script in `package.json`; run Jest directly when needed.
- Run tests: `jest --config jest.config.js`
- Allow empty test matches: `jest --config jest.config.js --passWithNoTests`
- For most code changes, run at least `yarn lint`.
- Pre-commit checks are enforced with Husky and `lint-staged`.
- Staged `src/**/*.{js,jsx,ts,tsx}` files are auto-checked with `prettier --write`, `eslint --fix`, and Jest.

## Architecture

- `pages/` uses the Next.js pages router.
- Page files use `*.page.tsx`, `*.page.ts`, `*.page.jsx`, or `*.page.js` as configured in `next.config.js`.
- Dynamic routes use the `[id]` convention.
- Route-specific code is organized by domain under `src/blog`, `src/projects`, `src/resume`, and `src/main`.
- Shared UI and utilities live under `src/shared/`.
- Common folders inside `src/shared/` include `components`, `hooks`, `functions`, `styles`, `theme`, and `types`.
- Document loading, sorting, and MDX serialization are handled in `src/lib/docs.ts`.
- Source documents live in `docs/posts`, `docs/projects`, and `docs/resumes`.
- Site-wide metadata, footer data, comments configuration, and resume file selection are defined in `ranolog.config.ts`.
- Environment-specific URL and domain values come from `.env.local`.

## Code Style And Conventions

- TypeScript is configured with `strict: true`; preserve type safety when making changes.
- Use the existing Emotion and `styled-system` approach instead of introducing a new styling system.
- Reuse theme tokens from `src/shared/theme/index.ts` rather than hardcoding design values.
- Respect the repository import order rule: `react` first, then built-in or external packages, then internal aliases (`@root/*`, `@src/*`), then sibling, parent, and index imports.
- Keep blank lines between import groups and maintain alphabetical ordering within groups.
- Path aliases are defined in `tsconfig.json`: `@root/*` points to the repository root and `@src/*` points to `src/*`.

## Content And MDX Rules

- Markdown and MDX documents should include the expected frontmatter fields such as `id`, `subject`, `date`, and `summary` where applicable.
- `date` may be either a string or an object shaped like `{ start: string; end?: string }`.
- The file name without the `.md` or `.mdx` extension becomes the document `id`.
- MDX rendering relies on shared components such as `Typography`, `CustomCode`, `Divider`, and `MdxImage`.
- When changing document rendering behavior, inspect both `src/lib/docs.ts` and the shared markdown-related components in `src/shared/components/`.

## Operational Notes

- Shared components are documented in Storybook.
- SEO metadata and page-level defaults are centralized in `ranolog.config.ts` and `src/shared/components/SeoHead`.
- If you change routing, static content loading, or SEO behavior, verify the impact across `next.config.js`, `src/lib/docs.ts`, `ranolog.config.ts`, and the relevant page components.
