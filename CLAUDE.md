# juandiegoperezarias

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
src/pages/<Name>/       Route-level views (see the route table below)
src/components/<Name>/  Reusable UI (Navbar, Footer)
src/styles/             Global SCSS partials
src/hooks/              Shared hooks, one `.js` file each (no folder, no styles)
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

A component reaches the Sass variables by relative path —
`@use '../../styles/variables' as v;`. The bare `@use 'variables'` that
`main.scss` uses only resolves because that file already sits inside
`src/styles/`; from a page or component folder it fails the build.

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

## Language

The site is Spanish; the code is English. Every string a visitor can read is in
Spanish — headings, nav labels, body copy, page titles, meta descriptions, and
`.sr-only` text meant for screen readers. Everything a developer reads stays in
English: folder names, component names, variables, CSS class names and comments.
So the page whose heading reads "Biografía" is `pages/Biography/Biography.jsx`
styling `.biography`, and the two are not expected to match.

URL paths are the exception that follows the copy, not the code, because the
visitor reads them: `/biografia`, not `/about`. Slugs are unaccented and
hyphenated (`/foto-galeria`) — an accent or `ñ` in a URL gets percent-escaped and
turns unreadable the moment it is copied or shared.

The name is written **Perez, never Pérez**, everywhere in the project. The
unaccented spelling is deliberate, so don't add the accent even in Spanish copy.

## Routes

| Path | Component | Nav label |
| --- | --- | --- |
| `/` | `Home` | Inicio |
| `/biografia` | `Biography` | Biografía |
| `/foto-galeria` | `PhotoGallery` | Foto Galería |
| `/foto-ensayo` | `PhotoEssay` | Foto Ensayo |
| `/libros` | `Books` | Libros |
| `/videos` | `Videos` | Videos |
| `/exposiciones` | `Exhibitions` | Exposiciones |
| `/historias` | `Stories` | Historias |
| `/contacto` | `Contact` | Contacto |
| `*` | `NotFound` | — |

`Navbar.jsx` holds one `links` array feeding both the desktop row and the mobile
overlay, so a new route is added to the nav in one place. All nine links sit at
the top level; there is no dropdown.

## Page metadata

Every page calls `usePageMeta(title, description)` as its first statement, so no
two routes share a title or a description. Add the call to any new page.

`index.html` holds the site-level title and description. Nothing is prerendered,
so those static tags are all a crawler or social scraper that doesn't run JS ever
sees; `usePageMeta` rewrites them in place once React mounts. Don't render React
19's native `<title>` or `<meta>` from a component — React appends rather than
replaces, so the document would end up with two of each, which its own docs call
undefined behavior.

## Deployment

Netlify, configured by `netlify.toml` in the repo root rather than through the
Netlify dashboard, so deploy settings are version-controlled and reviewable in a
pull request. Production builds from `main`; `dev` and open pull requests each
get their own preview URL.

Routing is client-side, so `netlify.toml` rewrites every path that isn't a real
file to `index.html`. New routes therefore need no deploy change, and the rule
must not be duplicated as a `public/_redirects` file.

**Not yet built:** the Netlify project exists and is live at
`juandiegoperezarias.netlify.app`, but it is **not connected to this repository**.
The deploy currently online was uploaded by hand, so it is a frozen snapshot that
does not change when you push — and there are no branch or pull request previews,
because those only exist for a repo-linked project. Connecting it is a browser
step in Netlify (Site configuration → Build & deploy → Link repository); the build
command and publish directory come from `netlify.toml` and should be left blank
there.

## Search engines

The canonical origin is `https://juandiegoperezarias.netlify.app`, the Netlify
subdomain. **Planned, not yet built:** a custom domain. Attaching one means
rewriting every `<loc>` in `sitemap.xml` and the `Sitemap:` line in
`robots.txt` — a sitemap that lists a different host than the one serving it
is ignored outright.

`robots.txt` and `sitemap.xml` live in `public/`, which Vite copies to the root of
`dist/` untouched. They resolve in production because Netlify serves a real file
before it applies the SPA rewrite, so the catch-all never swallows them.

The sitemap lists every indexable route as an absolute URL, which the sitemap
spec requires — a relative path in it is silently ignored. It is maintained by
hand, so **a new route needs a `<url>` entry** alongside its addition to
`main.jsx` and to the `links` array in `Navbar.jsx`. It deliberately carries no
`<lastmod>`, `<changefreq>` or `<priority>`: the first goes stale into a lie, and
Google ignores the other two.

## Git workflow

Never commit to `main`. Branch off `dev` using `<type>/<short-description>`
(`feat/projects-grid`, `fix/nav-overflow`, `docs/add-claude-md`), then open a pull
request into `dev` on GitHub. `main` holds stable released code only.

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/):
`<type>(<scope>): <imperative subject>` — for example
`feat(blog): add pagination to post list`. Types: `feat`, `fix`, `docs`, `style`,
`refactor`, `perf`, `test`, `build`, `ci`, `chore`. Subject stays lowercase,
imperative, no trailing period.
