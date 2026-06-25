# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A web-based autism screening platform (AQ-50, RAADS-R, ADOS-2 info, M-CHAT, SRS). Despite the Express-looking `src/`, **the deployed app is 100% static and client-side** — there is no running backend. `src/index.js` is an intentional no-op stub; the real backend logic (`TestEngine`, `AutismAssessment`) runs in the browser. Test questions in `TestEngine.js` are truncated placeholders, not the full clinical instruments.

## Commands

- `npm run dev` / `npm start` — copies `assets/`→`public/assets/` and `src/`→`public/src/`, then serves `public/` on port 3000 via live-server
- `npm test` — Jest; `npm run test:watch` for watch mode
- run a single test file: `npx jest tests/aq50.test.js`; single test: `npx jest -t "name"`
- `npm run lint` — ESLint over `src/` and `tests/`
- `npm run build` — wipes and rebuilds `dist/` from `public/* + assets/ + src/`
- `npm run serve` — serve the built `dist/` on port 5000

## Architecture: how a static site runs "backend" code

The whole point of this codebase is making CommonJS backend classes run in a browser with no server. Three pieces make it work, all wired in `public/index.html`:

1. **CommonJS shim** (inline `<script>` in `index.html`): defines `window.module`/`window.require` before loading `src/core/TestEngine.js` and `src/assessment/AutismAssessment.js`, then hoists each `module.exports` onto `window.TestEngine` / `window.AutismAssessment`. This is why the `src/` files can keep `module.exports = ...` and `require(...)` and still load in the browser.
2. **API mock** (`assets/api-mock.js`): monkey-patches `window.fetch`. Any URL containing `api/` is handled in-process by a `new AutismAssessment()` instance instead of hitting the network. So `app.js` can call `fetch('/api/assessment/start')` etc. and it transparently routes to the local class. To add/change an endpoint, edit the `apiPath` dispatch in this file — it mirrors the REST routes documented in `docs/api.md`.
3. **Frontend** (`assets/app.js`): the `AutismTestsApp` SPA — navigation, i18n, rendering, and the `fetch('/api/...')` calls that the mock intercepts. Has its own `getLocalTests()` fallback list independent of `TestEngine`.

Data model: assessments are sessions held in an in-memory `Map` (`AutismAssessment.sessions`). Nothing persists — a page reload loses all state. Each test type has its own scoring + interpretation method pair in `TestEngine.js` (e.g. `calculateAQScore`/`interpretAQScore`); `calculateScore()` dispatches by test `id` then falls back to test `type`.

## Critical gotcha: duplicated source trees

`assets/` and `src/` are the **source of truth**. `public/assets/`, `public/src/`, and `dist/` are **generated copies** that `npm run dev`/`build` regenerate (dev copies `assets/`→`public/assets/` and `src/`→`public/src/`; build copies `assets/` and `src/` last into `dist/`, so `assets/` always wins). Most of these are gitignored (`dist/`, `public/src/`, `public/assets/`) — **except two legacy files still tracked: `public/assets/app.js` and `public/assets/styles.css`**. That stale tracked copy is why several past commits exist purely to re-sync `assets/app.js` → `public/assets/app.js`. When you edit `assets/app.js` or `assets/styles.css`, copy the change into the matching `public/assets/` file too (or run `npm run dev`) so the tracked copy doesn't drift. `public/index.html` is itself tracked and edited directly — it is not generated.

## Deployment

`.github/workflows/deploy.yml` runs on push to `main`: lint → test → `npm run build` → upload `dist/` → deploy to GitHub Pages. The Pages source must be set to "GitHub Actions" in repo settings. Because Pages serves from a subpath (`/autism-tests/`), keep asset references in `index.html` **relative** (`assets/...`, `src/...`), never root-absolute (`/assets/...`). The `fetch('/api/...')` root-absolute paths are fine because the mock intercepts them before any network request.

## Conventions

ESLint is strict and enforced in CI: 4-space indentation, semicolons required, single quotes, `no-unused-vars` is an error. New assessment tools are added via `registerTest()` in `TestEngine.js` plus a scoring branch in `calculateScore()`; wire the UI through `app.js`. UI strings are bilingual (en/de) in the `getTranslations()` map in `app.js` and `data-i18n` attributes in `index.html`.
