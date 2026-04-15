# Content & Frontend — Strategic Research Document

## WS-03 · Research Reference

**Last updated:** April 2026
**Status:** Active — decisions finalized, open questions noted
**Companion artifacts:** Content Operations Model, Frontend Architecture

---

## Purpose

This document is the knowledge base for all content architecture and frontend decisions in the SEIU ecosystem. It records what was decided, why, what was rejected, and what remains open. Claude Code should read this document when building or revising any WS-03 artifact page.

---

## 1. The Content Problem

SEIU's content needs are more complex than a typical union or nonprofit because content must serve multiple distinct audiences across multiple platforms simultaneously:

- **Existing members** via the mobile app (grievance support, union communications, member services)
- **Prospective members and the public** via the master marketing site (advocacy, campaigns, programs, news)
- **Home Care prospects** via campaign microsites (targeted acquisition, My65+ enrollment, intake forms)
- **Training Centre learners** via Training Centre platforms (programs, credentials, pathways)
- **WorkersFirst users** via the WorkersFirst platform (shift opportunities, placements)

The challenge is not just multiple consumers — it is that the same content entity (e.g. "programs") may need to appear on the master site as a marketing showcase, in the Training Centre as an operational enrollment surface, and in the mobile app as a member benefit. Maintaining separate records for each context creates fragmentation and editorial debt. The architecture must support one canonical record serving multiple consumers differently. This prevents duplicating records or creating editorial drift.

---

## 2. Strapi as the Content Hub

### Decision

Strapi (self-hosted, Community Edition) is retained and extended as the central content hub for all editorial and reference content across the ecosystem.

### Reasoning

- **Already in production.** Strapi is live at `console.seiuhealthcare.ca`, has an established editorial team with existing workflows, and has content already published through it. Replacing it introduces migration cost and risk with no clear benefit.
- **Self-hosted advantage.** The instance runs on SEIU's own infrastructure (confirmed Community Edition, not Strapi Cloud — identified by custom subdomain on own domain rather than `*.strapiapp.com`). This means data sovereignty, no per-seat or per-API-call pricing, and full customization capability via plugins and custom controllers.
- **Cost at scale.** SEIU's content needs will reach tens of thousands of records across multiple content types. Managed SaaS alternatives (Contentful, Hygraph) price aggressively at this volume. Self-hosted Strapi's cost is infrastructure only.
- **Customization depth.** Strapi's plugin architecture and custom controller/service model gives the development team flexibility for multi-channel, multi-locale content delivery that managed platforms constrain.
- **Scalability is sufficient.** Strapi is a Node.js application that scales horizontally behind a load balancer with PostgreSQL at the database layer. Performance concerns at multi-consumer scale are solved by placing Cloudflare as a CDN layer in front of the instance — not by replacing Strapi.

### What was considered and rejected

- **Contentful:** Superior editorial UX for non-technical users, but pricing at SEIU's content volume becomes prohibitive. Also cloud-only, which conflicts with data sovereignty requirements for member-adjacent content.
- **Sanity:** Strong real-time content API and excellent editorial experience. Rejected primarily due to migration cost from Strapi and the developer-heavy schema definition model. May be revisited if Strapi's editorial UX becomes a significant operational friction point.
- **Hygraph (GraphQL-native):** Well-suited for multi-consumer architectures but cloud-only and adds GraphQL complexity without sufficient justification over Strapi's REST API for current use cases.
- **Custom CMS:** Ruled out entirely. Building and maintaining a content management system from scratch diverts engineering capacity from the CRM and SSO work that has higher strategic priority.

### Infrastructure requirement (immediate action)

Strapi may currently be self-hosted without a CDN (To be confirmed). **Cloudflare must be placed in front of the Strapi instance before content volume scales.** This is a non-optional infrastructure task. Without it, multi-consumer API traffic during campaigns will degrade performance. The Strapi server provider (likely DigitalOcean or AWS. To be confirmed) needs to be confirmed to properly configure Cloudflare origin rules.

### Strapi Scope (Critical Clarification)

Strapi is:
✔ Content management system
✔ Content distribution layer

Strapi is NOT:
✘ Identity provider
✘ Not long-term integration backbone, but currently performs limited integration roles
✘ System of record for operational or transactional data

---

## 3. Content Model

Strapi currently contains a mix of content and application data. The target architecture separates these into four domains.

### 3.1 Editorial Content (Primary Objects)

Editorial content represents publishable entities whose core purpose is communication.
Includes:
• Articles
• Events
• Campaigns
• FAQs
• Generic Content
• Petitions
• Surveys
• UnionSavings Offers
• Loyalty Rewards

#### Editorial Content with Attached Interaction Workflows

Some editorial content types generate downstream interaction data.
Event
• Editorial fields: title, description, location, time
• Derived workflow data:
• Event RSVP
• Event Attendance
• Event Audit Log

Petition
• Editorial fields: messaging, CTA
• Derived workflow data:
• Petition Submissions

Survey
• Editorial fields: form URL, structure
• Derived workflow data:
• Survey Submissions

### 3.2 Editorial Projections of Operational Domains

These entities are operational at their core but require editorial representation across channels.

Includes:
• Programs (Training Centre)
• Opportunities (WorkersFirst)

Operational Truth belongs to Domain System (eg. Training Centre), Editorial Representation belongs to Strapi.

Programs and Opportunities occupy a structurally different position from pure editorial content types. They have:

- **Editorial attributes** — descriptions, imagery, rich text, SEO metadata — that benefit from Strapi's authoring environment
- **Operational attributes** — enrollment capacity, scheduling, shift availability, eligibility rules — that belong in the operational backend of the Training Centre or WorkersFirst respectively

**Decision:** Strapi owns the editorial representation. The operational backend owns the transactional reality. A webhook-triggered sync keeps shared fields (name, description, active/inactive status) aligned.

**Sync direction:** Operational backend → Strapi only. Editorial changes in Strapi never touch the operational backend. This prevents CMS editors from accidentally modifying operational data.

**Prerequisite:** Both the Training Centre backend and WorkersFirst backend must support outbound webhooks. This is an integration requirement.

#### Synchronization Model

    •	Operational system → Strapi (via webhook)
    •	Sync creates/updates unpublished records
    •	Editorial team completes content
    •	Content is manually published

Operational systems never publish directly to frontend surfaces.

### 3.3 Reference Content (Operationally Aligned)

Reference content supports operational workflows but is not itself transactional.

Includes:
• Grievance Type
• Ticket Category
• Collective Agreement
• SEIU Files
• Taxonomies (Sector, Unit, Location)

Characteristics:
• Structured
• Sometimes permissioned
• Used by operational systems
• May be displayed to users

### 3.4 Workflow / Application Data

Transactional, stateful, or user-driven data.

Includes:
Submissions
• Petition Submissions
• Survey Submissions
• Contact Us Submitted

Event Interactions
• Event RSVP
• Event Attendance
• Event Audit Log

Grievance System
• Grievance
• Grievance Submitted

User & Engagement Data
• User
• User Profile
• User Device
• Saved Item
• Post Like

Loyalty System
• Loyalty Point Activity
• Loyalty User Point
• Loyalty Submission

Transactions
• Order
• Order Address
• Transaction

System Logs
• Audit logs
• Sessions
• Reads

Workflow data represents system state and is not part of the content publishing model.

### Key architectural principle: consumer targeting flags

Each Strapi content record includes consumer targeting flags — a multi-select field specifying which consumers should receive this content. Consumers filter their API queries by these flags. This means one canonical record serves multiple surfaces without duplication. Editorial teams do not manage separate records per channel.

### 4. Content Synchronization & Publishing Model

#### 4.1 Editorial Publishing Flow

Editor → Strapi → Publish → Frontends
• Strapi is the source of truth
• Publishing is controlled via editorial workflow

#### 4.2 Operational → Editorial Projection Flow

Operational System → Webhook → Strapi (draft)
→ Editorial Review → Publish → Frontends

Critical Rules
• All synced records are unpublished by default
• Editorial approval is required before publishing
• Strapi acts as the publishing control layer

### 4.3 Campaign Content Architecture

#### Decision

Campaigns are a Strapi content type with a `redirect_type` field that determines how the campaign surfaces across the ecosystem. Two patterns are supported:

**Pattern A — Internal article page**
Campaign renders as an article or landing page within `seiuhealthcare.ca`. No external deployment. The Strapi record carries `redirect_type: "internal"` and `internal_slug` pointing to the route within the master site.

**Pattern B — External microsite**
Campaign has a dedicated microsite on a custom domain. The Strapi record carries `redirect_type: "external"` and `external_url`. The master site's campaign CTA links to the external URL. The microsite optionally pulls campaign content and related news from Strapi via API.

#### Key Strapi campaign fields

`title`, `redirect_type`, `internal_slug`, `external_url`, `hero_image`, `summary`, `rich_body`, `consumer_flags`, `related_news` (relation), `published_at`, `locale`

#### Reasoning

Embedding redirect logic in Strapi as a field means editorial teams control campaign routing without developer involvement. Changing where a campaign CTA points is an editorial action, not a code deployment.

### 4.4 Integration Evolution Model

The current ecosystem does not yet have a formalized integration architecture. The target state is not implemented in a single step, but evolves through progressively more decoupled layers.

#### Phase 1 — Direct Webhook Integration (Initial Implementation)

Operational systems (e.g. Training Centre, WorkersFirst) emit webhooks directly to Strapi.

Pattern:
Operational System → Webhook → Strapi

Purpose:
• Enable editorial projections (Programs, Opportunities)
• Establish system boundaries quickly
• Minimal infrastructure overhead

Limitations:
• Tight coupling between systems
• No shared integration layer
• No support for multi-system routing
• Limited validation and transformation capability

#### Phase 2 — Function-Based Integration Layer (Decoupling Layer)

A thin serverless function layer is introduced between systems.

Pattern:
Operational System → Serverless Function → Multiple Consumers (Strapi, CRM, etc.)

Purpose:
• Centralize integration logic
• Enable routing to multiple systems
• Introduce validation, transformation, and security controls
• Decouple operational systems from direct dependencies

Example:
Training Centre → Function → Strapi (content projection)
→ CRM (future lifecycle tracking)

Key Principle:
Functions act as controlled orchestration points without introducing heavy infrastructure.

#### Phase 3 — Event-Driven Architecture (Target State)

The ecosystem evolves toward an event-driven model where systems emit domain events to a shared event backbone.

Pattern:
System → Event Bus → Multiple Subscribers

Example:
Training Centre emits program.created
→ Strapi updates editorial projection
→ CRM updates member lifecycle data
→ Analytics systems record activity

Capabilities:
• Multi-system fan-out from a single event
• Real-time synchronization across platforms
• Decoupled system evolution
• Foundation for analytics and intelligence systems

#### Strategic Importance

The event-driven model enables SEIU to evolve into an intelligence-driven platform by:
• capturing cross-system activity signals
• enabling real-time personalization and engagement
• supporting future analytics and AI use cases

#### Role of Strapi Across Phases

Phase 1: Direct webhook receiver
Phase 2: Consumer via function layer
Phase 3: Subscriber to event streams

In final state, Strapi is a content consumer and publisher, not an integration hub.

#### Guiding Principle

The integration model prioritizes:

1. Simplicity in early phases
2. Controlled decoupling through functions
3. Long-term scalability through event-driven architecture

## 5. Strapi's Role Across Multiple Consumers

### Decision

Strapi serves as a multi-channel content hub with distinct API endpoints per consumer. Each consumer queries its relevant content types using consumer flags as filters.

### Consumers and their Strapi relationship

**Mobile app**
Primary Strapi consumer. Receives news, events, campaigns, programs (editorial), UnionSavings offers, member communications. Auth context (member ID, lifecycle claims) comes from the IdP token — Strapi validates the token signature and uses the claims for content personalization without managing auth itself.

**Master marketing site (seiuhealthcare.ca)**
Consumes Strapi via ISR (Incremental Static Regeneration in Next.js). On publish, Strapi fires a revalidation webhook, Next.js regenerates the affected pages. Content editors publish in Strapi; the master site reflects changes without a full rebuild.

**Campaign microsites (Framer)**
Query Strapi directly at request time via REST API. No sync middleware. Content updates in Strapi appear on microsites without redeployment. Optionally evolving toward function layer.

**Training Centre**
Receives events (via Strapi) and emits program data to Strapi (via webhook sync). Does not query Strapi for operational data.

**WorkersFirst**
Emits opportunity data to Strapi (via webhook sync). Does not query Strapi for operational data.

**CRM (future)**
Will receive member communication content from Strapi as a delivery payload. CRM triggers the delivery; Strapi holds the content template. Long-term, the CRM may own member communications directly.

### The scalability question (resolved)

Early architectural discussion raised the question of whether Strapi could handle multiple consumers at scale. The conclusion: Strapi's horizontal scalability is sufficient at SEIU's projected content API load. The correct operational investment is a CDN layer (Cloudflare) for caching, not a platform migration. The editorial UX limitations of Strapi at high content-type complexity are a governance problem, not a technology problem — solved by content architecture discipline and designated content ownership, not by switching platforms.

---

## 6. Frontend Contexts — Three Distinct Applications

### Decision

Three frontend contexts are defined. They share Strapi as a content source but are architecturally independent applications with different stacks, audiences, and deployment pipelines.

### Context 1: seiuhealthcare.ca — Master brand marketing site

**Stack:** Next.js (App Router) consuming Strapi via ISR. Deployed on Vercel.

**Decision rationale:**

- Frameworks & Co. involvement is required for all design changes regardless of scope — this is a brand constraint, not a technical one. The primary argument for visual builders (Webflow, Framer) is enabling non-developer edits; that argument doesn't apply here.
- Next.js provides maximum design flexibility with no platform constraints, which is appropriate given the institutional significance of the master site.
- ISR enables content editors to publish from Strapi without triggering full rebuilds, while maintaining static performance.
- Next.js App Router creates a natural evolution path toward `app.seiuhealthcare.ca` (future member web-app) on the same stack and potentially the same monorepo.

**Rejected alternatives:**

- Webflow: Visual builder advantage neutralized by Frameworks involvement requirement. Webflow + Strapi also creates a dual content path risk (Webflow CMS and Strapi holding different versions of the same content).
- Framer: More appropriate for campaign microsites than institutional marketing sites. Limited layout flexibility for complex editorial pages.

### Context 2: Campaign microsites — Custom domains

**Stack:** Framer as default. Custom React/Next.js permitted per campaign where complexity warrants.
**Cadence:** Monthly.
**Execution:** Frameworks & Co. designs and deploys.
**Domain:** Custom domain per campaign (e.g. `homecarewin.ca`).

**Decision rationale — Framer over Webflow:**

- Framer queries Strapi directly via REST API at request time. No sync middleware required.
- Webflow requires Zapier (or equivalent) to sync published content changes from Strapi to Webflow's internal CMS. This introduces an operational dependency — a third-party service that must be maintained, monitored, and paid for — at a monthly campaign cadence. This is unnecessary friction.
- Both Framer and Webflow have mature Figma integration pipelines, so the design handoff advantage is a wash.
- Framer's component model and layout approach aligns more closely with how a design agency works.

**Decision rationale — Custom domains over subdomains:**

- Custom domains (e.g. `homecarewin.ca`) give campaigns independent brand identity, which is valuable for paid media (cleaner URLs in ad creative and landing page destinations).
- Prevents "polluting" the root `seiuhealthcare.ca` domain with informational touchpoints that aren't part of the master brand experience.
- Trade-off: DNS management overhead per campaign at monthly cadence. Mitigated by a documented standard operating procedure in the campaign launch checklist.

**Framer microsite standard — what is standardized:**

- Strapi API connection pattern (same token scope, same filtering convention)
- Form submission endpoint (serverless function → Strapi leads collection now, CRM ingestion API when live)
- GTM container (same container ID, injected via Framer custom code project settings)
- Cookie consent banner (standard Framer component — required per custom domain)
- DNS pattern (Cloudflare proxied, SSL auto-provisioned)

**What is fully flexible per campaign:**

- All visual design — typography, colour, layout, imagery, motion
- Strapi content queries
- Form fields beyond the standard baseline
- Custom domain name
- Tooling — Framer is default, not mandatory

**Form submission architecture:**
Framer posts to a serverless function (Vercel Edge Function or Cloudflare Worker). The function holds the Strapi API token server-side and forwards the payload to a Strapi leads collection. This prevents client-side API token exposure. When the CRM is live, only the function's destination URL changes — Framer and the form are untouched. Standard lead fields: `campaign_slug`, `source_domain`, `utm_source`, `utm_medium`, `utm_campaign`, `sector`, `consent` (boolean + timestamp), `name`, `email`.

### Context 3: app.seiuhealthcare.ca — Future member web-app

**Stack:** Separate Next.js application. Authenticated via IdP (SSO). Independent codebase and deployment pipeline from the master site.

**Status:** Not in current scope. Noted here to ensure the master site architecture doesn't close off this evolution path.

**Key principle:** The master site (`seiuhealthcare.ca`) and the member app (`app.seiuhealthcare.ca`) are never the same codebase, even if they share a monorepo or design system. They are different products serving different audiences with different auth requirements.

## 6.1 Frontend Composition Model

### Layered Architecture

| Layer        | Stack         | Purpose                   |
| ------------ | ------------- | ------------------------- |
| Marketing    | React/Next.js | Brand + SEO               |
| Campaigns    | Framer        | Acquisition               |
| Applications | React/Next.js | Authenticated experiences |

### Data Sources

- Strapi → content
- APIs → operational data
- IdP → auth

## 6.2 Performance Strategy

- Next.js ISR for content pages
- CDN (Cloudflare) caching
- API response caching

## 6.3 SEO Strategy

- Server-side rendering (Next.js)
- Structured content (Strapi)
- Clean URL architecture

---

## 7. Analytics & Tracking

### Decision

Single GTM container and single GA4 property across all frontend contexts.

### Implementation

- One GTM container ID deployed on every surface — master site and all Framer microsites. Injected via `next/google-tag-manager` on the master site; via Framer's custom code field on microsites.
- One GA4 property. Each campaign custom domain added as a cross-domain measurement target in GA4 data stream settings.
- Cross-domain linking configured so users moving between a campaign microsite and `seiuhealthcare.ca` are tracked as a single session.
- UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`) passed through to form submission payloads, closing the attribution loop between paid media spend and lead capture.

### Recurring operational checklist items (per microsite launch)

1. Add new campaign domain to GA4 cross-domain configuration
2. Deploy cookie consent banner (required per custom domain — not shared across domain groups as they would be on subdomains)
3. Verify GTM container firing correctly on new domain
4. Confirm form submission UTM passthrough working end-to-end

---

## 8. Open Questions

These items are unresolved and must be answered before the corresponding work can be completed.

**Locale / language requirements**
Does any content need to be published in French or other languages, given Ontario's healthcare workforce demographics — particularly for IEN and Home Care worker populations? This affects Strapi's i18n plugin configuration and whether locale variants are needed per content type. Must be decided before content modelling begins.

**Strapi role & permissions model**
Who are the distinct editor roles — SEIU communications team, Training Centre staff, WorkersFirst team, Frameworks agency? Each needs appropriately scoped Strapi access. Required before governance can be enforced across content types.

**Content approval authority per content type**
Who is the final publisher for each content type? Is approval centralized (one comms team approves everything) or distributed (TC staff approve programs, comms approves news)? Must be documented as part of the Strapi permissions model.

**Strapi server infrastructure**
The hosting provider for the self-hosted Strapi instance needs to be confirmed (likely DigitalOcean or AWS EC2). This determines Cloudflare origin configuration and available scaling headroom.

**Training Centre and WorkersFirst webhook capability**
The split model for Programs and Opportunities depends on both backends supporting outbound webhooks. This must be confirmed during the WS-3 node audits. If either backend cannot emit webhooks, a polling-based fallback sync must be designed instead.

---

## 9. Key Decisions Summary

| Decision                       | Outcome                                                    | Date       |
| ------------------------------ | ---------------------------------------------------------- | ---------- |
| Content hub platform           | Strapi (self-hosted, retain and extend)                    | April 2026 |
| Master site stack              | Next.js consuming Strapi via ISR                           | April 2026 |
| Campaign microsite tool        | Framer (default), custom permitted per campaign            | April 2026 |
| Microsite content source       | Strapi direct API, no sync middleware                      | April 2026 |
| Domain strategy for microsites | Custom domains per campaign                                | April 2026 |
| Analytics                      | Single GTM container + GA4 property, cross-domain          | April 2026 |
| Form destination               | Serverless function → Strapi now, CRM ingestion later      | April 2026 |
| Programs / Opportunities model | Split (editorial in Strapi, operational in backend)        | April 2026 |
| Strapi CDN                     | Cloudflare — immediate infrastructure action required      | April 2026 |
| Future member web-app          | Separate Next.js app, separate codebase, IdP-authenticated | April 2026 |
