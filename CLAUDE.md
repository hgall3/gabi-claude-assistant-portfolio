# gabi-claude-assistant-portfolio

Personal portfolio site. React 19 + Vite, styled with SCSS. No TypeScript — plain `.jsx`.

## Commands

```bash
npm run dev      # local dev server
npm run build    # production build to dist/
npm run lint     # eslint
npm run preview  # serve the production build locally
```

## Structure

```
src/pages/<Name>/       Route-level views (Home, About, Blog, Contact)
src/components/<Name>/  Reusable UI (Navbar, Footer)
src/styles/             Global SCSS partials
```

Every page and component lives in its own folder holding a matching `.jsx` and
`.scss` file — `Navbar/Navbar.jsx` alongside `Navbar/Navbar.scss`. Follow this
pattern for anything new; don't add loose files directly under `components/`.

## Styling

SCSS, not CSS-in-JS. The split between the two token files is deliberate and
easy to get wrong:

- **`_variables.scss`** holds Sass-only values (`$bp-md`, `$space`). They resolve
  at build time and emit no CSS, so any number of component files can `@use` it
  for free.
- **`_theme.scss`** holds design tokens as CSS custom properties, so they can
  respond to dark mode — Sass variables can't, since they're gone before any
  media query runs. This file **emits CSS**, so it must be used exactly once:
  only `main.scss` pulls it in.

Component `.scss` files must never `@use 'theme'` — that would duplicate the
custom property block in the bundle. Custom properties resolve at runtime and are
globally available, so `var(--color-border)` just works anywhere.

Use the existing tokens rather than hardcoding colors or spacing.

Typography is set globally in `_typography.scss` — Playfair Display for `h1`–`h3`,
Work Sans for `h4`–`h6` and body copy. Sizes are `rem` (never `px`, which ignores
the user's browser font-size setting) and line heights are unitless ratios so they
hold when a size steps up at the breakpoint. Components should rely on the base
element styles rather than restating font sizes.

Fonts are **self-hosted** through [`@fontsource`](https://fontsource.org) packages,
never loaded from a CDN — a Google Fonts `<link>` would expose every visitor to a
third-party request. Each weight is imported individually at the top of `App.jsx`
(`@fontsource/work-sans/latin-600.css`), so a weight used in SCSS without a
matching import there renders as a browser-synthesised approximation rather than
the real cut. Add the import alongside any new weight.

Layout is **mobile-first**: breakpoints are only ever used with `min-width`, so
`$bp-md: 1024px` is the width at which the desktop layout takes over, not a
ceiling for the mobile one.

Dark mode comes from `prefers-color-scheme` in `_theme.scss`. Any new color token
needs a value in both the `:root` block and the dark media query.

**Planned, not yet built:** a manual light/dark toggle will be added, so the theme
will eventually come from an explicit user choice as well as the OS setting. Keep
new color work expressed as custom properties in `_theme.scss` rather than
hardcoded values, so the toggle can swap them later without touching components.
A broader visual design direction is also still to come — the current styling is a
working baseline, not a finished system.

`main.scss` is imported once, at the top of `App.jsx`. Its `@use` order matters:
tokens first, then base styles that consume them.

## Deployment

Netlify, configured by `netlify.toml` in the repo root rather than through the
Netlify dashboard, so deploy settings are version-controlled and reviewable in a
pull request. Production builds from `main`; `dev` and open pull requests each
get their own preview URL.

Routing is client-side, so `netlify.toml` rewrites every path that isn't a real
file to `index.html`. New routes therefore need no deploy change, and the rule
must not be duplicated as a `public/_redirects` file.

**Planned, not yet built:** the Netlify site is not connected to the repository
yet, so nothing deploys on push so far.

## Git workflow

Never commit to `main`. Branch off `dev` using `<type>/<short-description>`
(`feat/projects-grid`, `fix/nav-overflow`, `docs/add-claude-md`), then open a pull
request into `dev` on GitHub. `main` holds stable released code only.

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/):
`<type>(<scope>): <imperative subject>` — for example
`feat(blog): add pagination to post list`. Types: `feat`, `fix`, `docs`, `style`,
`refactor`, `perf`, `test`, `build`, `ci`, `chore`. Subject stays lowercase,
imperative, no trailing period.
