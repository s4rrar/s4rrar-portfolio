# @s4rrar/portfolio — Next.js 16 App Router

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint (`next/core-web-vitals`) |
| `npm run export` | Static export |
| `npm run biome-write` | Format all files with Biome |

`lint-staged` runs on pre-commit: `biome check --write` + `biome format --write` on staged `.js,.jsx,.ts,.tsx,.json`.

## Formatting & linting

- **Formatter: Biome** (space, 2 indent, 100 width, double quotes). NOT Prettier.
- **Linter: ESLint** (`next/core-web-vitals`) for Next.js rules + **Biome** (recommended rules) on staged files.
- Run formatter before committing: `npm run biome-write`.

## TypeScript

- `strict: true`, `@/*` maps to `./src/*`.
- `typescript.ignoreBuildErrors: true` in next.config — TS errors **do not** block `next build`. Biome lint still catches issues in CI-like checks.

## No test framework

No test runner, config, or test files exist. Skip testing tasks.

## Architecture

- **Pages**: `src/app/` (Next.js App Router).
- **Components**: `src/components/` (SCSS modules alongside `.tsx`).
- **i18n**: `src/i18n/` — `en`, `ar`, `he`. `ar`/`he` are RTL. Locale persisted in `localStorage` + cookie. Use `useTranslation()` from `LanguageProvider` for translated strings.
- **Content & config**: `src/resources/content.tsx` (person, social, home, about) + `src/resources/once-ui.config.ts` (theme, fonts, effects, routes, protected routes). These are the primary config files to modify.
- **Types**: `src/types/` — separate `config.types.ts` and `content.types.ts`.
- **UI**: `@once-ui-system/core` components. Sass modern compiler for SCSS.

## Password-protected routes

- Routes flagged in `once-ui.config.ts` `protectedRoutes` require a password.
- Env var: `PAGE_ACCESS_PASSWORD` (see `.env.example`).
- Auth flow: client calls `/api/check-auth` (GET), then `/api/authenticate` (POST with `{ password }`).

## GitHub Projects

`src/components/work/Projects.tsx` fetches `https://api.github.com/users/{username}/repos` (no token — subject to rate limiting). Filters out forks, sorts by stars.

## OpenCode skills

26 agent skills in `.opencode/skills/`. The `using-agent-skills` skill discovers which to invoke.

## Build output

Ignore patterns in `.gitignore`: `/.next/`, `/out/`, `.env*.local`, `next-env.d.ts`.
