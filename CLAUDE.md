# SEIU Healthcare — Ecosystem Architecture Website

## Claude Code Project Instructions

---

## Project Overview

This is a client-facing deliverable site built for SEIU Healthcare by Frameworks & Co. It documents the architecture, strategy, and technical decisions behind SEIU's ecosystem transformation — from fragmented platforms to a unified member lifecycle system.

The site is a multi-page artifact viewer. Each page is a self-contained strategic document (an "artifact") organized into four workstreams. It is deployed on Vercel as a static React app.

**Primary audiences:** SEIU executive team, technical agency, Frameworks & Co.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v3 with a custom design token configuration
- **Language:** TypeScript
- **Deployment:** Vercel (static export or standard Next.js deployment)
- **Fonts:** Loaded via `next/font/google` — Work Sans (all weights), DM Mono
- **Icons:** Lucide React only — no other icon libraries

Do not introduce additional dependencies without explicit instruction. Keep the stack minimal.

---

## Repository Structure

```
ecosystem-website/
├── CLAUDE.md               ← this file
├── DESIGN.md               ← design system reference
├── public/
│   ├── assets/             ← general images
│   └── logos/              ← entity logos (filename = entity name, e.g. strapi.svg)
├── src/
│   ├── app/
│   │   ├── layout.tsx      ← root layout with nav + font loading
│   │   ├── page.tsx        ← home / index page
│   │   ├── globals.css     ← Tailwind base + any global overrides
│   │   └── [workstream]/
│   │       └── [artifact]/
│   │           └── page.tsx
│   ├── components/
│   │   ├── nav/
│   │   │   ├── SiteNav.tsx         ← sidebar navigation
│   │   │   └── NavSection.tsx      ← nav section with label + items
│   │   ├── layout/
│   │   │   ├── PageHeader.tsx      ← eyebrow + title + desc + meta
│   │   │   └── PageContent.tsx     ← max-width wrapper + padding
│   │   ├── artifacts/
│   │   │   ├── SectionLabel.tsx    ← numbered section label with rule
│   │   │   ├── ArtifactCard.tsx    ← card on the home page index
│   │   │   ├── DataTable.tsx       ← styled table component
│   │   │   ├── Callout.tsx         ← callout / highlight box
│   │   │   ├── Flag.tsx            ← open question / warning item
│   │   │   ├── FlowSteps.tsx       ← numbered vertical flow
│   │   │   ├── Badge.tsx           ← small label badge
│   │   │   ├── CodeBlock.tsx       ← monospace code display
│   │   │   ├── SplitModel.tsx      ← two-node split with arrow
│   │   │   └── StatCallout.tsx     ← key number / metric highlight
│   │   └── ui/
│   │       ├── Divider.tsx
│   │       ├── TabBar.tsx          ← tab strip (required on layer pages)
│   │       ├── Accordion.tsx       ← collapsible content
│   │       ├── Tooltip.tsx         ← inline definition tooltip
│   │       └── ExpandableCard.tsx  ← summary + expandable detail row
│   ├── lib/
│   │   └── nav.ts          ← navigation structure definition (single source of truth)
│   └── types/
│       └── index.ts        ← shared TypeScript types
└── tailwind.config.ts      ← design tokens (colors, fonts, spacing)
```

---

## Navigation Structure

Navigation is defined in `src/lib/nav.ts` as the single source of truth. The sidebar renders from this config. Do not hardcode nav items in components.

```
Overview
  ├── Overview          ← ecosystem architecture overview (from architecture-overview.md)
  ├── Current State     ← current-state system landscape (from architecture-overview.md §2)
  ├── Future State      ← target-state domain model (from architecture-overview.md §3)
  └── Roadmap           ← coming soon (will derive from architecture-roadmap.md when available)

Layers
  ├── Administrative Registry   ← Layer 1 (from administrative-registry-domain-strategy.md)
  ├── Identity                  ← Layer 2 (from identity-domain-strategy.md)
  ├── IdP / SSO                 ← Layer 3 (from idp-sso-domain-strategy.md)
  ├── Event Backbone            ← Layer 4 (from event-backbone-strategy.md)
  ├── Member Intelligence       ← Layer 5 (from member-intelligence-domain-strategy.md)
  ├── Workflow & Case           ← Layer 6 (from workflow-case-domain-strategy.md)
  ├── Applications & Nodes      ← Layer 7 (from applications-domain-strategy.md)
  └── Content & Publishing      ← Layer 8 (from content-publishing-system-strategy.md)
```

Each nav item has: `label`, `href`, `status` (`live` | `soon`), `section` (`overview` | `layers`), `layerNumber` (number, layers only).

### Section and routing conventions

- Overview pages live at `/overview/[slug]` — e.g. `/overview/current-state`, `/overview/future-state`
- Layer pages live at `/layers/[slug]` — e.g. `/layers/administrative-registry`, `/layers/event-backbone`
- The Roadmap page renders with `status: 'soon'` until `architecture-roadmap.md` is available

### Layer ordering

The 8 layers follow the dependency and trust-flow order defined in `architecture-overview.md §3.2`. This order must be preserved in the nav, in any layer index pages, and in any visual diagrams. Layer numbers are institutional — do not reorder them for aesthetic reasons.

---

## Design System

**Read `DESIGN.md` in full before writing any component, page, or style.** All design decisions originate there. What follows is a summary — `DESIGN.md` is authoritative.

- Light mode only — no dark mode toggle
- Background: `grey` (`#EEEEEE`), cards/nav on `white` (`#FFFFFF`)
- Primary: `purple-power` (`#411175`) — nav chrome, headings, badges, active states
- Accent: `yellow` (`#F9FF26`) — sparingly, for highlight moments only
- Type: Work Sans exclusively (all roles, weight-based hierarchy) + DM Mono for labels, eyebrows, badges, code
- Always use design token names in Tailwind classes — never raw hex values in components

### Mandatory pre-work rule

Before writing **any** new component or page, read `DESIGN.md`. This is not optional. The file contains the full component spec, interactive component patterns, diagram patterns, animation rules, and page composition guidance that determine whether output looks considered or generated.
---

## Component Conventions

- All components are **functional React with TypeScript**
- Use Tailwind utility classes exclusively — no inline styles, no CSS modules
- Keep components **dumb and composable** — no data fetching inside components
- Artifact page data lives in the page file itself as a typed constant — not in a database or CMS
- Use `cn()` utility (from `clsx` + `tailwind-merge`) for conditional class composition
- All interactive elements must have appropriate `aria-` attributes

### Interactive components

Interactive components (`TabBar`, `Accordion`, `Tooltip`, `ExpandableCard`, `StatCallout`) require `'use client'` at the top of the file. See `DESIGN.md` for full styling specs on each.

- `TabBar` — required on all layer pages to organize content into tabs (Overview / Boundaries / Integration / Transition)
- `Accordion` — for collapsible nested content, open questions, sub-item lists
- `Tooltip` — for inline definitions and acronym expansions
- `ExpandableCard` — for node/system entries with summary + detail
- `StatCallout` — for surfacing key numbers as scannable highlights

### SVG diagrams

Diagrams are inline SVG rendered in React — not image files. See `DESIGN.md §Diagrams & Visual Communication` for the full pattern library (layer stack, flow, node map). Every layer page's Overview tab must open with an SVG diagram. Overview pages must include at least one diagram.

### Animation

CSS-only animations via `animate-fade-up` utility defined in `globals.css`. SVG elements may use inline `style` with `animation` for staggered entry. No Framer Motion, no GSAP, no external libraries.
---

## Artifact Page Pattern

Every artifact page follows this base structure:

```tsx
// src/app/[section]/[slug]/page.tsx

import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { SectionLabel } from "@/components/artifacts/SectionLabel";

export default function ArtifactPage() {
  return (
    <PageContent>
      <PageHeader
        eyebrow="Layer 4 · Event Backbone"
        title="Event Backbone"
        titleAccent="Backbone"
        description="..."
        meta={[
          { label: "Layer", value: "4 of 8" },
          { label: "Status", value: "Finalized" },
          { label: "Date", value: "April 2026" },
        ]}
      />
      {/* page body */}
    </PageContent>
  );
}
```

---

## Layer Page Pattern

Layer pages are the most detailed pages in the site. They follow a specific structure that differs from overview pages.

**Every layer page must:**
1. Open with a `PageHeader` with the correct `eyebrow` format: `"Layer N · [Name]"`
2. Use a `TabBar` to organize content — never render everything as a single scroll
3. Open the Overview tab with an SVG diagram before any prose
4. Use `SectionLabel`, `Callout`, `DataTable`, `FlowSteps`, `Accordion` within tabs as appropriate

```tsx
'use client'

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { TabBar } from "@/components/ui/TabBar";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { Callout } from "@/components/artifacts/Callout";
// ... other components

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'boundaries', label: 'Boundaries' },
  { id: 'integration', label: 'Integration' },
  { id: 'transition', label: 'Transition' },
];

export default function LayerPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <PageContent>
      <PageHeader
        eyebrow="Layer 5 · Member Intelligence"
        title="Member Intelligence"
        titleAccent="Intelligence"
        description="Relationship state, lifecycle tracking, and cross-node orchestration."
        meta={[
          { label: "Layer", value: "5 of 8" },
          { label: "Status", value: "Finalized" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'overview' && (
        <div className="animate-fade-up">
          {/* SVG diagram — required, comes first */}
          <svg role="img" aria-label="Member Intelligence layer diagram" viewBox="0 0 700 300" width="100%" className="mb-10">
            {/* diagram content */}
          </svg>

          <section className="mb-10">
            <SectionLabel number="01" label="What this layer owns" />
            {/* content */}
          </section>
        </div>
      )}

      {activeTab === 'boundaries' && (
        <div className="animate-fade-up">
          {/* boundaries content */}
        </div>
      )}

      {/* remaining tabs */}
    </PageContent>
  );
}
```

### Tab content guidelines

| Tab | Lead with | Then use |
|-----|-----------|----------|
| Overview | SVG diagram | SectionLabel + prose, StatCallout, Callout |
| Boundaries | Callout (what it owns) | DataTable (owns vs. does not own), Callout (accent) |
| Integration | FlowSteps or flow SVG | CodeBlock (event contracts), DataTable (consumers) |
| Transition | FlowSteps (migration sequence) | Flag (open questions), Callout |
---

## Content Guidelines

- Artifact content is static — written directly in page files as typed data structures or JSX
- Do not invent content — always derive from the architecture documents listed in the Research Reference section
- If a page's content is not yet defined (e.g. Roadmap), render a placeholder card with `status: 'soon'` styling
- Overview pages derive exclusively from `architecture-overview.md` — do not pull domain-specific detail into them
- Layer pages derive from their corresponding domain strategy doc, with `architecture-overview.md` as the governing frame
- All dates default to April 2026 unless specified

---

## What NOT to Do

### Data & architecture
- Do not add `useEffect` for data fetching — content is static
- Do not hardcode navigation in page files — always import from `src/lib/nav.ts`
- Do not create new color values outside the design token system in `tailwind.config.ts`
- Do not use raw hex values in Tailwind classes — use token names only

### Dependencies & libraries
- Do not install animation libraries (Framer Motion, GSAP, etc.)
- Do not install UI component libraries (shadcn, Radix, Headless UI, etc.) — build from scratch per `DESIGN.md`
- Do not introduce additional dependencies without explicit instruction

### Visual & layout
- Do not use arbitrary Tailwind values (e.g. `w-[347px]`) — use the spacing scale
- Do not add a dark mode toggle — light mode only
- Do not use `<img>` tags — use `next/image` with proper `alt` text; see `DESIGN.md §Logos & Asset Usage` for logo placement rules
- Do not use external SVG files for diagrams — all diagrams are inline SVG in React
- Do not use gradients, drop shadows, or decorative fills — flat surfaces only
- Do not use any typeface other than Work Sans and DM Mono

### Design quality
- Do not write a layer page without a TabBar — unstructured single-scroll layer pages are not acceptable
- Do not write any page without at least one diagram if the content is architectural or structural
- Do not write prose descriptions of system relationships that could instead be a diagram
- Do not flatten complex nested content into plain lists when Accordion or ExpandableCard would serve better
---

## Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Type check
npm run type-check

# Build for production
npm run build

# Deploy (via Vercel CLI)
vercel --prod
```

---

## Git Conventions

- Branch from `main` for each new artifact or feature
- Commit messages: `feat(artifact): add frontend architecture page`
- Do not commit build artifacts or `.env` files
- `public/assets/` is gitignored for binary assets over 1MB — reference via URL instead

---

## Research Reference

Strategic context for all pages is organized into scoped architecture documents. **Always read the relevant source doc before writing any page content.** Do not rely on `ecosystem-breakdown.md` for specific technical decisions — the architecture documents contain the actual decisions, reasoning, and open questions.

### Architecture documents

| File                                        | Covers                                                                                       | Drives                          |
| ------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------- |
| `architecture-overview.md`                  | Full ecosystem architecture: current state, target state, layered dependency model, migration strategy, guiding principles | All Overview pages + layer context |
| `administrative-registry-domain-strategy.md` | Layer 1 — administrative truth, member registry, dues, Unionware transition                  | `/layers/administrative-registry` |
| `identity-domain-strategy.md`               | Layer 2 — canonical person model, identifier crosswalks, merge/reconciliation logic          | `/layers/identity`              |
| `idp-sso-domain-strategy.md`                | Layer 3 — shared authentication plane, MFA, token issuance, SSO                             | `/layers/idp-sso`               |
| `event-backbone-strategy.md`                | Layer 4 — event-driven integration, producers/consumers, reliability, event contracts        | `/layers/event-backbone`        |
| `member-intelligence-domain-strategy.md`    | Layer 5 — relationship state, lifecycle tracking, engagement scoring, orchestration          | `/layers/member-intelligence`   |
| `workflow-case-domain-strategy.md`          | Layer 6 — operational casework, grievance handling, queues, SLAs                            | `/layers/workflow-case`         |
| `applications-domain-strategy.md`           | Layer 7 — node systems (Training Centre, WorkersFirst, My65+, mobile app)                   | `/layers/applications-nodes`    |
| `content-publishing-system-strategy.md`     | Layer 8 — Strapi content hub, editorial publishing, content projections, frontend delivery   | `/layers/content-publishing`    |

### Governing strategy source

```
ecosystem-breakdown.md
```

The original strategic brief. Use for ecosystem-level context, node descriptions, political/advocacy background, and member lifecycle framing. Does not supersede the architecture documents for technical or domain-specific decisions.

### Rule

Always read the relevant domain strategy doc before writing a layer page. If a domain strategy doc and `ecosystem-breakdown.md` conflict, the domain strategy doc is more current and takes precedence. `architecture-overview.md` governs all documents — if any domain doc conflicts with it, flag the discrepancy rather than silently resolving it.
