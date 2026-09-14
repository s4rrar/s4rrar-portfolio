# AL-Hassan Sarrar — Portfolio

A high-performance personal portfolio built with Next.js 16 App Router, React 19, TypeScript, and the Once UI design system. Features an interactive HTML5 canvas background, multi-language internationalization with full RTL support (English, Arabic, Hebrew), dynamic GitHub project showcase, and Apple-inspired design foundations.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Available Scripts](#available-scripts)
- [Configuration & Customization](#configuration--customization)
  - [Personal Information and Content](#personal-information-and-content)
  - [Theme, Fonts, and Routes](#theme-fonts-and-routes)
  - [Internationalization (i18n & RTL)](#internationalization-i18n--rtl)
  - [Password-Protected Routes](#password-protected-routes)
- [Interactive Background Engine](#interactive-background-engine)
- [Formatting and Linting](#formatting-and-linting)
- [Deployment](#deployment)
- [Contact](#contact)

---

## Overview

This repository contains the source code for the personal portfolio of AL-Hassan Sarrar (Software Engineer). It is engineered for optimal performance, accessibility, responsive typography, and subtle micro-interactions across desktop and mobile devices.
---

## Key Features

- **Next.js 16 App Router & Turbopack**: Built on React 19 and Next.js 16 for rapid server-side rendering, streaming, and fast local development.
- **Multilingual & RTL Support**: Native localization for English (`en`), Arabic (`ar`), and Hebrew (`he`) with automated text direction flipping (`ltr`/`rtl`), localized fonts (Tajawal, Rubik), and client persistence through cookies and `localStorage`.
- **Interactive Canvas Background**: Custom particle engine with organic Brownian motion, ambient glowing orbs with mouse parallax, and desktop cursor spotlight/tracking ring. Automatically suppressed on mobile and touch devices, with full support for `prefers-reduced-motion`.
- **Once UI Design System**: Clean typography, responsive layouts, optical letter-spacing, and accessible color tokens with dynamic theme switching (Dark, Light, and System).
- **Dynamic GitHub Projects**: Automatically retrieves public repositories from GitHub API with fallback handling, filtering forks and sorting by stars.
- **Protected Routes**: Built-in authentication guard for confidential client case studies and portfolio pieces requiring password verification.
- **MDX & Case Study Support**: Integrated Markdown/MDX parser for documentation and long-form project breakdowns.
- **SEO & Metadata**: Dynamic Open Graph images, structured schema data, auto-generated `sitemap.xml`, and `robots.txt`.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript (Strict Mode)
- **Design System**: `@once-ui-system/core`
- **Styling**: Sass / SCSS Modules, CSS Custom Properties
- **Typography**: Next.js Font Optimization (Geist, Geist Mono, Tajawal, Rubik)
- **Code Health & Formatting**: Biome, ESLint, lint-staged

---

## Project Structure

```text
s4rrar-portfolio/
├── public/                     # Static assets, icons, and metadata images
├── src/
│   ├── app/                    # Next.js App Router pages and layouts
│   │   ├── about/              # About page route
│   │   ├── api/                # API routes (auth checks, password validation)
│   │   ├── layout.tsx          # Root layout with theme and font initialization
│   │   ├── not-found.tsx       # Custom 404 page
│   │   ├── page.tsx            # Home page route
│   │   ├── robots.ts           # Robots.txt generator
│   │   └── sitemap.ts          # XML Sitemap generator
│   ├── components/             # Reusable UI components
│   │   ├── about/              # About page specific components (TableOfContents)
│   │   ├── work/               # Project and work components (Projects, cards)
│   │   ├── Header.tsx          # Sticky navigation header
│   │   ├── Footer.tsx          # Site footer with social links
│   │   ├── InteractiveBackground.tsx # HTML5 Canvas background animation
│   │   ├── LanguageSwitcher.tsx # Multi-language switcher dropdown
│   │   ├── RouteGuard.tsx      # Password protection barrier
│   │   └── ThemeToggle.tsx     # Theme switcher (Dark / Light)
│   ├── i18n/                   # Localization dictionaries and provider
│   │   ├── LanguageProvider.tsx# Context provider for active locale
│   │   ├── ar.ts               # Arabic dictionary
│   │   ├── en.ts               # English dictionary
│   │   └── he.ts               # Hebrew dictionary
│   ├── resources/              # Primary content and system configuration
│   │   ├── content.tsx         # Personal profile, bio, history, and links
│   │   ├── once-ui.config.ts   # Design tokens, routes, fonts, and effects
│   │   └── custom.css          # Custom animations, glassmorphism, and scrollbars
│   ├── types/                  # TypeScript interfaces and type definitions
│   └── utils/                  # Utility functions (MDX parsing, date formatting)
├── biome.json                  # Biome formatter and linter configuration
├── next.config.mjs             # Next.js configuration
├── package.json                # Dependencies and npm scripts
└── tsconfig.json               # TypeScript compiler configuration
```

---

## Getting Started

### Prerequisites

Ensure the following tools are installed on your machine:

- Node.js 18.17.0 or later (Node.js 20+ recommended)
- npm 9+ or pnpm / yarn

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/s4rrar/s4rrar-portfolio.git
cd s4rrar-portfolio
npm install
```

### Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Configure the environment variables in `.env.local`:

```env
# Password used to unlock routes listed in protectedRoutes
PAGE_ACCESS_PASSWORD=your_secure_password_here
```

### Running Locally

Start the development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Starts the Next.js development server with Turbopack |
| `npm run build` | Builds the production bundle |
| `npm run start` | Runs the compiled production build locally |
| `npm run biome-write` | Formats and automatically applies Biome fixes across the project |
| `npm run export` | Performs a static export of the project |
| `npm run lint` | Runs Next.js ESLint checks |

---

## Configuration & Customization

The codebase is organized so that personal content and design system tokens are decoupled from component logic.

### Personal Information and Content

Edit `src/resources/content.tsx` to update:

- **Person**: Full name, title, bio, email, avatar image, and spoken languages.
- **Social Links**: GitHub, LinkedIn, Telegram, Instagram, and email links.
- **Home Page**: Title, headline, description, and featured links.
- **About Page**: Biography, work experience history, education, and technical skills.

### Theme, Fonts, and Routes

Edit `src/resources/once-ui.config.ts` to configure:

- **Theme & Palette**: Brand, accent, and neutral color styles (`solid`, `surface`, `border`).
- **Fonts**: Typography assignments for heading, body, label, and code fonts.
- **Routes**: Enable or disable specific pages (`/`, `/about`).
- **Effects**: Background dots, gradient opacity, grid overlays, and cursor masks.

### Internationalization (i18n & RTL)

Translations are located under `src/i18n/`:

- `src/i18n/en.ts`: English strings.
- `src/i18n/ar.ts`: Arabic strings (rendered in RTL with Tajawal font).
- `src/i18n/he.ts`: Hebrew strings (rendered in RTL with Rubik font).

To use translated strings inside any client component:

```tsx
"use client";

import { useTranslation } from "@/i18n";

export function ExampleComponent() {
  const { t } = useTranslation();
  return <p>{t.home.description}</p>;
}
```

### Password-Protected Routes

To require password authentication on specific routes:

1. Register the route in `src/resources/once-ui.config.ts`:
   ```ts
   const protectedRoutes: ProtectedRoutesConfig = {
     "/work/automate-design-handovers-with-a-figma-to-code-pipeline": true,
   };
   ```
2. Set the `PAGE_ACCESS_PASSWORD` variable in your `.env.local` file or deployment hosting platform.
3. The `RouteGuard` component intercepts access and presents a secure authentication prompt before rendering protected content.

---

## Interactive Background Engine

The background effect is powered by an HTML5 Canvas component (`src/components/InteractiveBackground.tsx`):

- **Desktop Experience**:
  - Soft floating gradient orbs with depth-based parallax.
  - Particle physics with connection lines and cursor repulsion.
  - Ambient radial spotlight and smooth cursor tracking ring.
- **Mobile & Touch Optimization**:
  - Automatically suppresses cursor spotlight, tracking rings, and touch-drag artifacts on mobile viewports (`<= 768px`) or touch-primary devices (`hover: none`).
  - Reduced particle density to preserve battery life and maintain 60 FPS performance.
- **Accessibility**:
  - Respects the `prefers-reduced-motion` media query by freezing animations to a single static ambient frame.

---

## Formatting and Linting

The repository uses **Biome** as its primary formatter and linter:

- 2-space indentation, 100-character line width, double quotes.
- Pre-commit hooks run automatically via `lint-staged`.
- To format the entire project manually:
  ```bash
  npm run biome-write
  ```

---

## Deployment

### Vercel (Recommended)

The easiest way to deploy this Next.js app is using the Vercel Platform:

1. Push your code to a GitHub repository.
2. Import the project on [Vercel](https://vercel.com/new).
3. Set the `PAGE_ACCESS_PASSWORD` environment variable in the Vercel Project Settings.
4. Deploy.

---

## Contact

- **Author**: AL-Hassan Sarrar
- **Email**: [s4rrar@protonmail.com](mailto:s4rrar@protonmail.com)
- **GitHub**: [github.com/s4rrar](https://github.com/s4rrar)
- **LinkedIn**: [linkedin.com/in/s4rrar](https://www.linkedin.com/in/s4rrar)
- **Telegram**: [t.me/s4rrar](https://t.me/s4rrar)
