# SEIU Healthcare — Design System Reference

## DESIGN.md

Read this file before writing any component, page, or style. All design decisions originate here.

---

## Aesthetic Direction

**Editorial precision meets institutional weight.**

This is a client-facing strategic document site — not a marketing site, not a dashboard, not a portfolio. The aesthetic should feel like a well-designed intelligence brief: authoritative, considered, and easy to read for long periods. Think high-quality financial or legal publishing, not SaaS product UI.

Key principles:

- **Generous whitespace** — content breathes; nothing is cramped
- **Typography-first** — hierarchy is established through type, not color or decoration
- **Restraint** — the yellow accent is a highlight tool, not a theme color; use it sparingly
- **Flat surfaces** — no shadows, no gradients, no decorative effects
- **Hairline borders** — `1px` or `0.5px` borders only; nothing heavier
- **Progressive Disclosure** -Utilize accordians, tabs, modals, tooltips, and expandables to articulate dense or nested information

---

## Color Palette

Defined in `tailwind.config.ts` as custom tokens. **Always use token names, never raw hex.**

| Token          | Hex       | Usage                                                    |
| -------------- | --------- | -------------------------------------------------------- |
| `purple-power` | `#411175` | Primary — nav active states, headings, primary badges    |
| `purple-mid`   | `#6612B5` | Hover states, secondary purple moments                   |
| `purple-light` | `#B063FF` | Light purple fills, subtle backgrounds                   |
| `yellow`       | `#F9FF26` | Accent — hero highlights, key numbers, active indicators |
| `grey`         | `#EEEEEE` | Page background, secondary surfaces                      |
| `white`        | `#FFFFFF` | Card surfaces, nav background                            |
| `black`        | `#000000` | Primary text                                             |

### Semantic usage

**Page background:** `bg-grey` (`#EEEEEE`)
**Card / nav / content surfaces:** `bg-white`
**Primary text:** `text-black`
**Secondary text:** `text-black/50` or `text-black/40`
**Tertiary / labels:** `text-black/30`
**Borders:** `border-black/10` (hairline), `border-black/20` (emphasis)
**Primary accent:** `text-purple-power`, `bg-purple-power`
**Highlight accent:** `bg-yellow`, `text-yellow` — use rarely and deliberately

### Badge color system

| Variant  | Background          | Text                | Border                   |
| -------- | ------------------- | ------------------- | ------------------------ |
| `purple` | `bg-purple-power/8` | `text-purple-power` | `border-purple-power/20` |
| `yellow` | `bg-yellow/20`      | `text-black`        | `border-yellow/40`       |
| `muted`  | `bg-black/5`        | `text-black/50`     | `border-black/10`        |
| `live`   | `bg-purple-power/8` | `text-purple-power` | `border-purple-power/20` |
| `soon`   | `bg-black/5`        | `text-black/30`     | `border-black/8`         |

---

## Typography

### Font families

Work Sans is the sole typeface across all roles — matching the SEIU logo. Different weights establish hierarchy within a single family. DM Mono is retained exclusively for labels, eyebrows, code blocks, and monospaced UI elements.

```ts
// tailwind.config.ts
fontFamily: {
  sans: ['var(--font-work-sans)', 'system-ui', 'sans-serif'],
  mono: ['var(--font-dm-mono)', 'monospace'],
}
```

Load via `next/font/google` in `src/app/layout.tsx`:

```tsx
import { Work_Sans, DM_Mono } from "next/font/google";

const workSans = Work_Sans({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
});
```

Apply variables to the `<html>` element:

```tsx
<html className={`${workSans.variable} ${dmMono.variable}`}>
```

### Weight system

| Weight          | Tailwind class     | Role                                       |
| --------------- | ------------------ | ------------------------------------------ |
| 300 Light       | `font-light`       | Body copy, descriptions, intro text        |
| 400 Regular     | `font-normal`      | Table cells, nav items, general UI text    |
| 500 Medium      | `font-medium`      | Card titles, step titles, section headings |
| 600 SemiBold    | `font-semibold`    | Page subtitles, emphasis within body       |
| 700 Bold        | `font-bold`        | Page titles, hero display text             |
| 700 Bold Italic | `font-bold italic` | Title accent word (replaces serif italic)  |

### Type scale

| Role            | Size              | Weight          | Font        | Notes                                             |
| --------------- | ----------------- | --------------- | ----------- | ------------------------------------------------- |
| Page title      | `text-4xl` (36px) | `font-bold`     | `font-sans` | Accent word: `font-bold italic text-purple-power` |
| Hero title      | `text-5xl` (48px) | `font-bold`     | `font-sans` | Home page only                                    |
| Section heading | `text-xl`         | `font-semibold` | `font-sans` |                                                   |
| Card title      | `text-sm`         | `font-medium`   | `font-sans` |                                                   |
| Body            | `text-sm` (14px)  | `font-light`    | `font-sans` |                                                   |
| Body emphasis   | `text-sm`         | `font-medium`   | `font-sans` |                                                   |
| Label / eyebrow | `text-[10px]`     | `font-medium`   | `font-mono` | Uppercase, tracked                                |
| Caption / meta  | `text-xs` (11px)  | `font-normal`   | `font-mono` |                                                   |
| Code            | `text-xs`         | `font-normal`   | `font-mono` |                                                   |

### Title accent pattern

The italic accent on page titles uses Work Sans 700 italic in `purple-power` — no serif typeface needed:

```tsx
// PageHeader title rendering
<h1 className="text-4xl font-bold leading-tight">
  Frontend{" "}
  <em className="font-bold italic text-purple-power not-italic">
    Architecture
  </em>
</h1>

// Note: use `not-italic` on the parent if browser default italicises <em>,
// then re-apply italic explicitly on the accent span via font-bold italic classes
```

### Line heights

- Page / hero titles: `leading-tight` (1.1)
- Body copy: `leading-relaxed` (1.625)
- Card descriptions: `leading-snug` (1.375)
- Labels: `leading-none`
- Table cells: `leading-snug` (1.375)

---

## Spacing System

Use Tailwind's default spacing scale. Key values:

| Purpose                      | Value                        |
| ---------------------------- | ---------------------------- |
| Page horizontal padding      | `px-14` (56px)               |
| Page vertical padding top    | `pt-14` (56px)               |
| Page vertical padding bottom | `pb-24` (96px)               |
| Section gap                  | `mb-12` (48px)               |
| Card internal padding        | `p-5` (20px) or `p-6` (24px) |
| Card small internal padding  | `p-4` (16px)                 |
| Component gap                | `gap-3` (12px)               |
| Section label margin bottom  | `mb-4` (16px)                |

**Max content width:** `max-w-3xl` (768px) — never wider on artifact pages.

---

## Layout

### Overall structure

```
┌─────────────┬──────────────────────────────────────┐
│             │                                      │
│  SiteNav    │  PageContent                         │
│  (fixed)    │  (scrollable, margin-left: nav-width)│
│  248px      │  max-width: 768px, padded            │
│             │                                      │
└─────────────┴──────────────────────────────────────┘
```

**Nav width:** `w-[248px]` fixed sidebar
**Page content offset:** `ml-[248px]`

### SiteNav internal layout

```
Nav brand (agency + client name)
──────────────────────────────
NavSection: Overview
NavSection: WS-1 · CRM & Platform
NavSection: WS-2 · Home Care
NavSection: WS-3 · Content & Frontend
NavSection: WS-4 · Governance
──────────────────────────────
Nav footer (date + confidential)
```

### Nav item states

```tsx
// Default
className = "text-black/40 hover:text-black hover:bg-black/4";

// Active
className =
  "text-purple-power bg-purple-power/6 border-l-2 border-purple-power font-normal";

// Disabled (coming soon)
className = "text-black/20 pointer-events-none cursor-default";
```

---

## Component Specifications

### PageHeader

```tsx
interface PageHeaderProps {
  eyebrow: string; // e.g. "WS-03 · Content & Frontend"
  title: string; // full title text
  titleAccent?: string; // substring to render in italic purple
  description: string;
  meta: { label: string; value: string }[];
}
```

- Eyebrow: `font-mono text-[10px] uppercase tracking-widest text-black/30`
- Eyebrow has a `before:` pseudo element: `2px wide, 20px tall, bg-purple-power`
- Title: `font-sans font-bold text-4xl leading-tight`
- Title accent (the key word): `font-bold italic text-purple-power`
- Description: `text-sm font-light text-black/50 leading-relaxed max-w-xl`
- Meta row: `font-mono text-[11px] text-black/30` separated by `·` dots
- Bottom border: `border-b border-black/10`

### SectionLabel

```tsx
interface SectionLabelProps {
  number: string; // "01", "02", etc.
  label: string;
}
```

- Full width flex row with a trailing rule line
- Number: `font-mono text-[10px] text-purple-power`
- Label: `font-mono text-[10px] uppercase tracking-widest text-black/30`
- Trailing rule: `flex-1 h-px bg-black/10`

### ArtifactCard (home page only)

```tsx
interface ArtifactCardProps {
  workstream: string;
  title: string;
  description: string;
  audience: string[];
  status: "live" | "soon";
  href?: string;
}
```

- Live cards: `bg-white border border-black/10 rounded-xl hover:border-purple-power/30 hover:-translate-y-px transition-all`
- Pending cards: `bg-grey/50 border border-black/6 rounded-xl opacity-60 pointer-events-none`
- Arrow icon (live only): top-right, `text-black/20 group-hover:text-purple-power group-hover:translate-x-0.5 group-hover:-translate-y-0.5`

### Badge

```tsx
interface BadgeProps {
  variant: "purple" | "yellow" | "muted" | "live" | "soon";
  children: React.ReactNode;
}
```

All badges: `font-mono text-[10px] px-2 py-0.5 rounded-sm border`

### DataTable

- Wrapper: `border border-black/10 rounded-xl overflow-hidden`
- Header: `bg-grey font-mono text-[10px] uppercase tracking-wider text-black/30 px-3.5 py-2.5`
- Cells: `px-3.5 py-3 text-sm text-black/60 border-b border-black/6 leading-snug`
- Last row: no bottom border
- Row hover: `hover:bg-black/2`
- Name cell (first column): `font-medium text-black`

### Callout

```tsx
interface CalloutProps {
  variant?: "default" | "accent";
  children: React.ReactNode;
}
```

- Default: `bg-grey border border-black/10 rounded-lg px-4 py-3.5 text-sm text-black/50 leading-relaxed`
- Accent: `bg-purple-power/5 border border-purple-power/20 rounded-lg`
- `strong` inside callout: `text-black font-medium`
- Accent `strong`: `text-purple-power`

### Flag (open question)

- `bg-white border-y border-r border-black/10 border-l-2 border-l-red-500/60 rounded-r-lg px-4 py-2.5`
- `strong`: `text-black font-medium block mb-0.5`
- Body text: `text-sm text-black/50 leading-relaxed`

### FlowSteps

Each step: grid with `36px` left column for the number circle, `1px` vertical line between steps.

- Number circle: `w-[34px] h-[34px] rounded-full bg-grey border border-black/12 font-mono text-[11px] text-black/30`
- Connecting line: `absolute left-[17px] top-[34px] bottom-0 w-px bg-black/10`
- Step title: `text-sm font-medium text-black`
- Step body: `text-sm font-light text-black/50 leading-relaxed`

### CodeBlock

- `bg-grey border border-black/12 rounded-lg px-3.5 py-2.5 font-mono text-xs leading-7`
- `.key` class: `text-purple-power`
- `.val` class: `text-purple-mid`
- `.comment` class: `text-black/25 italic`

### Divider

- `border-t border-black/10 my-9`

---

## Animation

Use Tailwind's built-in animate utilities only.

Page load: staggered fade-up on main content blocks.

```tsx
// Utility classes to add to sections
'animate-fade-up'

// Define in globals.css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fade-up {
  animation: fade-up 0.35s ease both;
}

// Stagger via style prop
style={{ animationDelay: '60ms' }}
style={{ animationDelay: '120ms' }}
style={{ animationDelay: '180ms' }}
```

No Framer Motion. No GSAP. No other animation libraries.

---

## tailwind.config.ts Reference

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "purple-power": "#411175",
        "purple-mid": "#6612B5",
        "purple-light": "#B063FF",
        yellow: "#F9FF26",
        grey: "#EEEEEE",
      },
      fontFamily: {
        sans: ["var(--font-work-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      maxWidth: {
        content: "768px",
      },
      width: {
        nav: "248px",
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## SEIU Brand Notes

- **Never** use the yellow accent as a background for large areas — it is a highlight only
- The purple palette carries institutional authority — use `purple-power` for primary UI chrome
- The logo lives in `public/assets/` — always use `next/image` with appropriate `alt="SEIU Healthcare"`
- **Work Sans is the SEIU brand typeface** — it is used in the logo. Do not introduce any other sans-serif or serif typeface. All hierarchy is established through weight variation within Work Sans.
- The title accent pattern (bold italic `text-purple-power` on the key word in each page title) is a deliberate typographic signature — maintain it consistently across all artifact page titles
- The nav brand treatment: agency name (`Frameworks & Co.`) small and muted above the client name (`SEIU Healthcare`) in Work Sans — the `Healthcare` portion in `text-purple-power`
- DM Mono is the only secondary typeface permitted — restricted to labels, eyebrows, code blocks, meta information, and badge text
