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
│   └── assets/             ← logos, images (copied from ~/code/seiu/assets)
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
│   │   │   └── SplitModel.tsx      ← two-node split with arrow
│   │   └── ui/
│   │       └── Divider.tsx
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
  └── Home

WS-1 · CRM & Platform
  ├── Unified data model
  ├── SSO & identity architecture
  ├── Node integration map
  └── CRM agency brief

WS-2 · Home Care
  ├── Phase 1 campaign brief
  ├── Worker personas
  └── 60-day onboarding sequence

WS-3 · Content & Frontend
  ├── Content operations model
  └── Frontend architecture

WS-4 · Governance
  ├── Training Centre governance brief
  ├── Ecosystem investment case
  └── Phased programme roadmap
```

Each nav item has: `label`, `href`, `status` (`live` | `soon`), `workstream`, `audience` (array).

---

## Design System

**See `DESIGN.md` for the full reference.** Summary:

- Light mode only — no dark mode toggle
- Background: `#EEEEEE` (Grey), cards on `#FFFFFF`
- Primary: `#411175` (Purple Power)
- Accent: `#F9FF26` (Yellow) — used sparingly for highlight moments
- All type in Work Sans (all roles, varying weights) or DM Mono (labels, code, eyebrows)
- Tailwind custom colors are defined in `tailwind.config.ts` — always use design tokens, never raw hex values in components

---

## Component Conventions

- All components are **functional React with TypeScript**
- Use Tailwind utility classes exclusively — no inline styles, no CSS modules
- Keep components **dumb and composable** — no data fetching inside components
- Artifact page data lives in the page file itself as a typed constant — not in a database or CMS
- Use `cn()` utility (from `clsx` + `tailwind-merge`) for conditional class composition
- All interactive elements must have appropriate `aria-` attributes
- Animate with Tailwind's `animate-` utilities only — no Framer Motion unless explicitly requested

---

## Artifact Page Pattern

Every artifact page follows this structure:

```tsx
// src/app/[workstream]/[artifact]/page.tsx

import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
// ... other artifact components

export default function ArtifactPage() {
  return (
    <PageContent>
      <PageHeader
        eyebrow="WS-03 · Content & Frontend"
        title="Frontend Architecture"
        titleAccent="Architecture"
        description="..."
        meta={[
          { label: "Audience", value: "Frameworks & Co. · Technical team" },
          { label: "Status", value: "Finalized" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      <section className="mb-12">
        <SectionLabel number="01" label="Three distinct frontend contexts" />
        {/* section content */}
      </section>

      {/* additional sections */}
    </PageContent>
  );
}
```

---

## Content Guidelines

- Artifact content is static — written directly in page files as typed data structures or JSX
- Do not invent content — refer to `DESIGN.md` and the research docs in `~/code/seiu/research/` for source material
- If a section's content is not yet defined, render a placeholder card with `status: 'soon'` styling
- All dates default to April 2026 unless specified

---

## What NOT to Do

- Do not add `useEffect` for data fetching — content is static
- Do not install animation libraries (Framer Motion, GSAP, etc.) without instruction
- Do not use arbitrary Tailwind values (e.g. `w-[347px]`) — use the spacing scale
- Do not create new color values outside the design token system in `tailwind.config.ts`
- Do not add a dark mode toggle — light mode only
- Do not use `<img>` tags — use `next/image` with proper `alt` text
- Do not hardcode navigation in page files — always import from `src/lib/nav.ts`

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

Strategic context for all artifacts is organized into scoped research documents. **Always read the relevant research doc before writing any artifact content.** Do not rely on the monolithic ecosystem-breakdown.md for specific decisions — the research docs contain the actual decisions, reasoning, and open questions.

### Research documents

| File                                | Covers                                                                                                    | Status  | Active |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------- | ------- | ------ |
| `research/ws01-crm-platform.md`     | CRM architecture, identity/SSO, Unionware migration, phased rollout, node integrations                    | Active  |
| `research/ws03-content-frontend.md` | Strapi content hub, content type registry, split model, frontend contexts, campaign microsites, analytics |
| `research/ws02-home-care.md`        | Home Care campaign strategy, worker personas, My65+ priority, three-phase campaign                        | Pending |
| `research/ws04-governance.md`       | Training Centre governance, investment case, programme roadmap                                            | Pending |

### Primary source

```
~/code/seiu/ecosystem-website/resources/ecosystem-breakdown.md
```

The original strategic brief. Use for ecosystem-level context, node descriptions, weighted connection logic, and the political/advocacy background. The workstream research docs take precedence for specific technical and strategic decisions within their domain.

### Secondary source

```
~/code/seiu/ecosystem-website/resources/ws00-architecture-principles.md
```

This is the high level architecture guideline that governs the individual research documents. Always reference this for general architectural strategy & rules.

### Rule

If a research doc exists for the workstream you are working in, read it first. If the research doc and ecosystem-breakdown.md conflict, the research doc is more current and takes precedence.
