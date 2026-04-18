# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Rohan Yadav, built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS 4**. Uses **static export** (`output: "export"`) for deployment to GitHub Pages — no server needed in production.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Build static export to out/
npm run lint     # Run ESLint (Next.js core-web-vitals + TypeScript rules)
```

## Architecture

- **Single-page app** with hash-based navigation (#home, #about, #projects, #contact)
- **All components use `"use client"`** — client-side rendering only
- **Static export**: `next.config.ts` sets `output: "export"` and `images.unoptimized: true` (image optimization requires a server)
- **Tailwind CSS 4** configured via `@tailwindcss/postcss` plugin — no separate tailwind.config file; theme is in `globals.css`
- **Dark theme**: background `#0a0a0a`, text `#ededed`
- **Path alias**: `@/*` maps to `./src/*`

### Current Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Homepage — single page with 4 sections
│   └── globals.css      # Tailwind import + global styles
├── components/
│   └── Navbar.tsx       # Responsive nav with glass-morphism + mobile sidebar (Framer Motion)
└── lib/                 # Empty — intended for constants/utilities
```

### Key Libraries

- **Framer Motion** — animations, scroll-triggered effects, spring physics
- **Lucide React** — icon library

## Deployment

Pushes to `master` trigger GitHub Actions (`.github/workflows/deploy.yml`):
1. `npm ci` → `npm run build` → uploads `out/` to GitHub Pages
2. Requires Node.js 20
