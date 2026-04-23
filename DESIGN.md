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
- **Restraint with intention** — the yellow accent is a highlight tool, not a theme color; use it sparingly. Restraint does not mean timid — it means every choice is deliberate
- **Flat surfaces** — no shadows, no gradients, no decorative effects
- **Hairline borders** — `1px` or `0.5px` borders only; nothing heavier
- **Progressive disclosure** — use accordions, tabs, tooltips, and expandables to handle dense or nested information. Never flatten complex content into walls of text when a structured interactive component would serve the reader better
- **Diagrams over descriptions** — when a concept is structural, spatial, or sequential, a well-crafted SVG diagram communicates faster and more memorably than prose. Architectural relationships, layer stacks, data flows, and dependency models should always be visualized, not just described
- **Considered composition** — pages should have a deliberate rhythm: an opening visual or diagram to anchor the concept, structured sections with clear hierarchy, and interactive components to manage density. A page that is simply a list of text blocks with section labels is not finished

### What "restraint" means here

Restraint means: no gradients, no shadows, no decorative flourishes, no color outside the token system.

Restraint does **not** mean:
- Avoiding SVG diagrams (they are encouraged and expected for architectural content)
- Keeping every section as plain prose (use tabs, accordions, and visual components)
- Making every page look identical
- Defaulting to the simplest possible implementation

A page can be visually sophisticated and still feel restrained. The goal is precision and intentionality, not minimalism for its own sake.
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

## Page Composition

Every page should have a deliberate visual rhythm. Follow these composition rules:

### Overview pages (architecture-overview.md derived)

1. **PageHeader** — eyebrow, title with accent, description, meta
2. **Opening diagram** — a full-width SVG that visualizes the core concept of the page (e.g. layer stack on Future State, platform map on Current State). This is required, not optional.
3. **Sections with SectionLabel** — organized prose and component content
4. **StatCallout clusters** — surface key numbers early (e.g. "8 platforms", "350,000+ records")
5. **Callout blocks** — for principles, guiding rules, or important framing statements

### Layer pages (domain strategy docs derived)

Layer pages are the most content-dense pages on the site. They must use a **TabBar** to organize content. Do not render all content in a single scrolling page.

**Required tab structure for every layer page:**

| Tab | Contents |
|-----|----------|
| **Overview** | Opening diagram + what this layer owns + role in the ecosystem |
| **Boundaries** | What it owns vs. does not own; domain separation rules |
| **Integration** | How it connects to other layers; event contracts; API surface |
| **Transition** | Migration path; current-state gap; open questions |

The **Overview tab** must always open with an SVG diagram. Remaining tabs may use prose, DataTable, FlowSteps, Accordion, or Callout components as appropriate for the content.

### Composition anti-patterns to avoid

- A page that is only `SectionLabel` + prose paragraphs with no visual elements
- A layer page that doesn't use tabs
- Diagrams used as decoration rather than as communication of a specific architectural concept
- StatCallouts used for non-numeric content
- Accordions used for content that doesn't have natural nesting or that users need to see all of at once
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

Use Tailwind's built-in animate utilities only. No Framer Motion, no GSAP, no external animation libraries.

### Page load

Staggered fade-up on main content blocks and diagram elements.

```tsx
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

### SVG diagram animation

SVG elements may use CSS animations for entry effects. Apply via `style` attribute with `animationDelay`:

```tsx
// Nodes fade in staggered
<g style={{ animation: 'fade-up 0.4s ease both', animationDelay: '100ms' }}>

// Connector lines draw in using stroke-dasharray
@keyframes draw-line {
  from { stroke-dashoffset: 200; }
  to   { stroke-dashoffset: 0; }
}
.animate-draw { animation: draw-line 0.6s ease both; }
```

Keep animations purposeful: entry animations only. No looping, no hover physics, no particle effects.

---

## Interactive Components

These components require `'use client'` in Next.js App Router since they use `useState`. Keep them composable and styled exclusively with Tailwind tokens.

### TabBar

Used to bucket layer page content into logical views (e.g. Overview / Boundaries / Integration / Migration).

```tsx
'use client'

interface Tab { id: string; label: string }
interface TabBarProps { tabs: Tab[]; children: (activeId: string) => React.ReactNode }

// Tab strip styling
<div className="flex border-b border-black/10 mb-8 gap-0">
  {tabs.map(tab => (
    <button
      key={tab.id}
      onClick={() => setActive(tab.id)}
      className={cn(
        'font-mono text-[11px] uppercase tracking-widest px-4 py-2.5 border-b-2 -mb-px transition-colors',
        active === tab.id
          ? 'border-purple-power text-purple-power'
          : 'border-transparent text-black/30 hover:text-black/60'
      )}
    >
      {tab.label}
    </button>
  ))}
</div>
```

### Accordion

Used for collapsible content: open questions, detailed sub-items, nested specifications.

```tsx
// Trigger
<button className="w-full flex items-center justify-between py-3 text-sm font-medium text-black text-left">
  <span>{title}</span>
  <ChevronDown className={cn('w-3.5 h-3.5 text-black/30 transition-transform', open && 'rotate-180')} />
</button>

// Panel
<div className={cn('text-sm font-light text-black/50 leading-relaxed pb-3', !open && 'hidden')}>
  {children}
</div>

// Divider between items
<div className="border-t border-black/8" />
```

### Tooltip

Used for inline definitions, acronym expansions, and contextual notes.

```tsx
// Wrapper — relative positioning
<span className="relative group cursor-help border-b border-dashed border-black/20">
  {trigger}
  <span className="absolute bottom-full left-0 mb-2 w-56 bg-white border border-black/12 rounded-lg px-3 py-2.5 text-xs font-light text-black/60 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-none">
    {content}
  </span>
</span>
```

### ExpandableCard

Used for node/system entries where a summary row expands to full detail.

```tsx
// Collapsed state — summary row
<div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-black/2 transition-colors">
  <div className="flex items-center gap-3">
    <Badge variant="purple">{layer}</Badge>
    <span className="text-sm font-medium text-black">{title}</span>
  </div>
  <ChevronDown className={cn('w-3.5 h-3.5 text-black/30 transition-transform', open && 'rotate-180')} />
</div>

// Expanded panel
<div className="px-4 pb-4 pt-1 border-t border-black/8 text-sm font-light text-black/50 leading-relaxed">
  {children}
</div>
```

### StatCallout (key number / metric highlight)

Used to surface important numbers, counts, or thresholds as scannable highlights.

```tsx
// Usage: highlight "350,000+ records" or "8 disconnected platforms"
<div className="inline-flex flex-col gap-0.5">
  <span className="font-mono text-3xl font-bold text-purple-power leading-none">{value}</span>
  <span className="font-mono text-[10px] uppercase tracking-widest text-black/30">{label}</span>
</div>
```

---

## Diagrams & Visual Communication

SVG diagrams are a first-class design element in this site. They are not decorative — they are the primary vehicle for communicating architectural structure, system relationships, layer dependencies, and data flow.

**When to use a diagram:** any time a concept has spatial structure, a dependency order, a flow of events, or a set of relationships. If you are writing a paragraph that describes how systems connect to each other, that paragraph should be a diagram instead.

### Diagram design rules

- All diagrams are inline SVG — no external image files, no canvas, no D3
- Use design tokens for all colors — reference as inline hex equivalents of tokens only (token names are not available inside SVG)
  - `purple-power` → `#411175`
  - `purple-mid` → `#6612B5`
  - `purple-light` → `#B063FF`
  - `yellow` → `#F9FF26`
  - `grey` → `#EEEEEE`
  - `black/10` → `rgba(0,0,0,0.1)`
- All text in diagrams: Work Sans via `font-family="'Work Sans', system-ui, sans-serif"` or DM Mono for labels via `font-family="'DM Mono', monospace"`
- Stroke weights: `1` for standard borders, `1.5` for emphasis, `0.5` for subtle guides — never heavier
- No drop shadows. No fills with gradients. Flat fills only.
- Connector lines: straight or right-angled only (no bezier curves unless expressing a genuine flow, not a hierarchy)
- Diagrams should fade-up on page load using the `animate-fade-up` pattern, with individual elements staggered

### Layer stack diagram pattern

Used on Overview / Future State to show the 8-layer dependency model. Layers stack vertically, numbered, with labels and brief descriptors.

```tsx
// Each row — Layer N
<g style={{ animation: 'fade-up 0.35s ease both', animationDelay: `${n * 60}ms` }}>
  {/* Layer number pill */}
  <rect x="0" y={y} width="28" height="20" rx="4" fill="#411175" fillOpacity="0.08" />
  <text x="14" y={y + 13} textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="9" fill="#411175">
    {n}
  </text>
  {/* Layer name */}
  <text x="38" y={y + 13} fontFamily="'Work Sans', system-ui" fontSize="12" fontWeight="500" fill="#000000">
    {name}
  </text>
  {/* Connector to next layer */}
  <line x1="14" y1={y + 20} x2="14" y2={y + 32} stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
</g>
```

### Flow diagram pattern

Used for event flows, data flows, migration sequences. Left-to-right, nodes connected by arrows.

```tsx
// Node box
<rect x={x} y={y} width="120" height="40" rx="6" fill="#ffffff" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
<text x={x + 60} y={y + 24} textAnchor="middle" fontFamily="'Work Sans', system-ui" fontSize="11" fontWeight="500" fill="#000000">
  {label}
</text>

// Arrow connector
<line x1={x1} y1={cy} x2={x2 - 8} y2={cy} stroke="rgba(0,0,0,0.2)" strokeWidth="1" markerEnd="url(#arrow)" />

// Arrow marker definition (in <defs>)
<defs>
  <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
    <path d="M0,0 L0,6 L6,3 z" fill="rgba(0,0,0,0.3)" />
  </marker>
</defs>
```

### Relationship / node map pattern

Used for ecosystem node maps, integration relationship diagrams. Central node with radiating connections.

```tsx
// Central node — emphasized
<circle cx={cx} cy={cy} r="36" fill="#411175" fillOpacity="0.06" stroke="#411175" strokeWidth="1" />
<text x={cx} y={cy + 4} textAnchor="middle" fontFamily="'Work Sans', system-ui" fontSize="11" fontWeight="600" fill="#411175">
  {name}
</text>

// Satellite node
<circle cx={sx} cy={sy} r="28" fill="#ffffff" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />

// Connection line
<line x1={cx} y1={cy} x2={sx} y2={sy} stroke="rgba(0,0,0,0.1)" strokeWidth="1" strokeDasharray="3 3" />
```

### Diagram sizing

- Full-width diagrams (ecosystem maps, layer stacks): `width="100%"` with a fixed `viewBox`
- Inline / column diagrams: `max-w-lg` container with responsive SVG
- Standard diagram height: `viewBox="0 0 700 400"` for landscape, `viewBox="0 0 400 600"` for portrait stacks
- Always set `role="img"` and `aria-label` on the `<svg>` element
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

---

## Logos & Asset Usage

### Available logos

Logo files live in `public/logos/`. Before placing any logo, check what files exist by scanning that directory. File names correspond to the entity they represent (e.g. `unionware.svg`, `canvas.svg`, `worksfirst.svg`, `my65plus.svg`, `strapi.svg`, `seiu.svg`). Always use the actual filename — do not guess or fabricate paths.

### Usage rules

- Always use `next/image` — never `<img>`
- Set meaningful `alt` text describing the entity, not just its name (e.g. `alt="Unionware — administrative system of record"`)
- Logos appear in: node map diagrams, system relationship diagrams, integration tables, and the nav brand area
- In SVG diagrams, logos can be embedded via `<image>` with an `href` pointing to the public path: `href="/logos/strapi.svg"`
- Size logos proportionally — do not stretch. Use `width` + `height` with matching aspect ratio, or `objectFit="contain"` in `next/image`
- Never apply color tints or filters to logos — render them as-is
- On `grey` or `white` backgrounds, logos should sit without additional background treatment unless the logo itself requires a container for legibility

### When to use logos

Use logos when a specific named system or platform is being referenced visually:

- **Node map / ecosystem diagrams** — each node circle or box should carry the relevant logo if one exists
- **Integration tables** — a small logo beside the system name adds immediate visual recognition
- **Current State page** — platform entries benefit from logos to ground abstract system names
- **Layer pages** — the Integration tab may reference external systems that have logos

Do not use logos decoratively or in body prose. Logos are wayfinding and recognition elements, not illustration.

---

## Icons

Lucide React is the only permitted icon library. Import individual icons only — no wildcard imports.

```tsx
import { Database, Shield, Zap, GitBranch, Users, Workflow, Layers, FileText } from "lucide-react";
```

### Icon sizing

| Context | Size class | Stroke |
|---------|-----------|--------|
| Section header companion | `w-4 h-4` | default (1.5) |
| Tab label companion | `w-3.5 h-3.5` | default |
| Inline body reference | `w-3.5 h-3.5` | default |
| Diagram node icon | `w-5 h-5` | 1.5 |
| StatCallout companion | `w-4 h-4` | default |
| Nav item | `w-3.5 h-3.5` | default |

### Icon color

- Default: `text-black/30`
- Active / emphasis: `text-purple-power`
- Inside a colored badge or callout: inherit from context
- Never use yellow on icons — yellow is a background accent only

### When to use icons

Icons should aid navigation and scanning — they are not decoration. Use them:

- **SectionLabel** — a small icon beside the section number/label helps readers orient quickly in tab-heavy pages. Keep it optional and contextual, not applied mechanically to every section
- **Tab labels** — pairing a small icon with the tab name (Overview, Boundaries, Integration, Transition) makes tabs scannable and gives the UI a more considered feel
- **StatCallout** — an icon above or beside the number provides immediate semantic meaning
- **DataTable name column** — a small icon beside a system or entity name aids recognition
- **Callout blocks** — an icon in the top-left of a callout signals its type (info, warning, principle)
- **Nav items** — optional but effective for the section-level labels (Overview, Layers)

Do not use icons as pure decoration, in body paragraphs, or as substitutes for missing content.

### Suggested icon mapping

These are starting suggestions — use judgment based on context:

| Entity / concept | Icon |
|-----------------|------|
| Administrative Registry | `Database` |
| Identity | `Fingerprint` |
| IdP / SSO | `Shield` |
| Event Backbone | `Zap` |
| Member Intelligence | `Users` |
| Workflow & Case | `Workflow` |
| Applications / Nodes | `Layers` |
| Content & Publishing | `FileText` |
| Integration / connection | `GitBranch` |
| Migration / transition | `ArrowRight` |
| Warning / open question | `AlertTriangle` |
| Principle / rule | `BookOpen` |
| Status / live | `CheckCircle` |
| Coming soon | `Clock` |