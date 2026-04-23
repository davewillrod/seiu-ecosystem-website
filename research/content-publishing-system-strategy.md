# Content Publishing System (Strapi) Strategy

## Purpose

Defines the Content Publishing System as the centralized layer
responsible for managing, structuring, and distributing **editorial and
marketing content** across the SEIU ecosystem.

This domain is anchored by **Strapi (headless CMS)** and supports:

- Master marketing site (primary public presence)
- Campaign microsites
- Cross-platform editorial content delivery
- Content projections into applications
- Analytics-enabled content strategy

It is **not** responsible for operational application data or business
logic.

---

## 1. Domain Overview

This domain answers:

> "How is content created, managed, and distributed across the
> ecosystem?"

It provides:

- editorial content management
- campaign publishing
- structured content delivery
- content reuse across channels
- analytics-informed content strategy

---

## 2. Core Responsibilities

### Owns

- Editorial content (articles, news, programs, campaigns)
- Marketing pages and site structure
- Campaign microsites
- Content schemas and models
- Content delivery APIs
- Content projections into applications
- Content-level analytics instrumentation

### Does NOT Own

- Authentication (IdP)
- Identity (Identity Domain)
- Membership data (Administrative Registry)
- Lifecycle logic (Member Intelligence)
- Operational application data (Applications layer)

---

## 3. Current State

### Fragmented Content & Frontend Ecosystem

The current content and frontend layer is fragmented across multiple tools and inconsistent patterns:

#### Marketing & Microsites

- Primary marketing presence built on **WordPress**
- Campaign microsites are deployed inconsistently, with no standardized tooling or deployment model
- No shared component system or reusable frontend patterns
- No unified design system across campaigns or marketing surfaces

#### Design & Development Pipeline

- No formalized design system (tokens, components, patterns)
- No consistent Figma → frontend implementation pipeline
- Each campaign or site effectively starts from scratch
- Heavy reliance on agency (Frameworks) for all design changes
- Limited internal ability to scale frontend development

#### Strapi Usage

- Strapi exists as a content source, but:
  - content types are inconsistently modeled
  - editorial vs operational boundaries are blurred
  - some logic (auth/policy) has leaked into Strapi usage (especially via mobile app)

#### Application Integration

- Mobile app consumes Strapi content but mixes:
  - content
  - access rules
  - backend logic
- WorkersFirst and Training Centre operate independently with minimal content integration

---

### Key Issues

- No centralized content architecture across consumers
- No design system or component reuse across marketing surfaces
- High dependency on agency for even minor changes
- Content duplication and editorial drift
- Strapi partially misused as middleware
- Weak analytics standardization across surfaces
- No consistent campaign deployment model

---

## 4. Target State

### Strapi as Pure Content Layer

Strapi becomes:

- canonical source of editorial content
- structured content provider for all surfaces
- campaign content engine
- content projection system

### Content Surfaces

#### 1. Master Marketing Site

- primary domain (SEO + brand)
- pulls content dynamically from Strapi
- acts as content hub

#### 2. Campaign Microsites

- fast-launch campaign pages
- powered by Strapi content models
- optionally hosted via Webflow or Next.js

#### 3. Applications

- mobile app
- WorkersFirst
- Training Centre
- My65+

Applications consume: - editorial content - program information -
announcements

But NOT: - business logic - authorization rules

---

## 5. Content Model

The content model is structured into four distinct domains to prevent overlap between editorial, operational, and workflow responsibilities.

### 5.1 Editorial Content (Primary)

Human-authored, publishable content:

- Articles
- Events
- Campaigns
- FAQs
- Petitions
- Surveys
- Generic content pages

These are:

- reusable
- multi-channel
- owned by Strapi

---

### 5.2 Editorial Projections of Operational Domains

Operational systems expose content that requires editorial representation.

Includes:

- Programs (Training Centre)
- Opportunities (WorkersFirst)

Model:

- Operational system = source of truth
- Strapi = editorial layer

**Critical rule:**
Operational → Strapi only (one-way sync)

Strapi never writes back to operational systems.

---

### 5.3 Reference Content

Structured supporting content:

- Taxonomies (sector, unit, region)
- Grievance types
- Ticket categories
- Collective agreements

Characteristics:

- structured
- reused across systems
- sometimes permissioned

---

### 5.4 Workflow / Application Data (NOT Strapi)

Transactional data:

- submissions
- RSVPs
- grievances
- user actions
- system logs

These belong to:

- Workflow Domain
- Applications
- Administrative systems

---

### Key Principle: Consumer Flags

Each Strapi record includes consumer flags indicating where it should appear:

- mobile
- marketing site
- campaigns
- apps

This allows:

> One canonical content record → multiple surfaces

No duplication.

---

## 6. Operational vs Editorial Content

### Editorial (Strapi)

- human-authored
- marketing-driven
- reusable across channels

### Operational (Applications)

- system-generated
- domain-specific
- tied to workflows and actions

Example:
News article: Strapi
Training course data: LMS / TC
Shift listing: WorkersFirst
Retirement account: My65+

Strapi may **reference or display** operational content, but does not
own it.

---

## 7. Content Projection Model

Strapi can project content into applications via:

- API consumption
- pre-rendered feeds
- curated content bundles

Example: - "Home Care onboarding content" displayed in mobile app -
campaign messaging shown across multiple surfaces

Key principle:

> Content is authored once and distributed everywhere.

---

## 8. Integration Model

### Inputs

- Content authors (staff)
- Campaign teams
- program owners

### Outputs

- APIs for applications
- feeds for marketing sites
- content projections for apps

### Event Backbone Interaction

Strapi may:

- emit events like:
  - content.published
  - campaign.updated
- consume limited events for projection triggers (eg. programs & opportunities that are published)

But it is NOT an orchestration engine.

---

## 9. Marketing & Microsite Strategy

### Master Marketing Site

- Built using **Next.js**
- Consumes Strapi via ISR
- Serves as:
  - primary brand hub
  - SEO surface
  - content aggregation layer

Key characteristics:

- full design flexibility
- content-driven rendering
- tightly controlled UX

---

### Campaign Microsites

- Default stack: **Framer**
- Optional: custom Next.js for complex campaigns
- Each campaign deployed on **custom domain**

Benefits:

- fast launch cycles
- clean campaign branding
- independent optimization

---

### Design System Requirement (Critical)

The ecosystem currently lacks a unified design system.

Target state must introduce:

- Figma-based design tokens
- shared component libraries
- reusable patterns across:
  - master site
  - microsites
  - applications

Without this, campaign velocity and brand consistency will not scale.

---

## 10. Analytics & Tracking

### Core Decision

- Single GTM container across all surfaces
- Single GA4 property
- Cross-domain tracking enabled

---

### Implementation

- GTM injected into:
  - Next.js master site
  - Framer microsites
- GA4 configured with:
  - cross-domain tracking
  - unified session handling

---

### Attribution Model

UTMs captured at entry and passed through:

- form submissions
- backend ingestion layer
- eventual CRM / intelligence systems

---

### Key Signals Captured

- page views
- engagement events
- campaign interactions
- form submissions
- CTA clicks

---

### Integration with Architecture

Analytics events feed into:

- Event Backbone
- Member Intelligence Domain

This enables:

- lifecycle modeling
- cohort assignment
- campaign optimization

---

### Operational Checklist (per campaign)

- register domain in GA4
- verify GTM firing
- validate UTM capture
- confirm form pipeline
- deploy cookie consent

---

## 11. Technology Stack Considerations

### CMS

- Strapi (primary)

### Frontend

- Next.js (recommended)
- Framer (for rapid marketing/campaign use)

### APIs

- REST / GraphQL from Strapi

### CDN

- CloudFront or equivalent

### Analytics

- Segment / RudderStack (event collection)
- GA4 or equivalent (marketing analytics)
- event backbone integration

---

## 12. Migration Strategy

### Phase 1— Centralize content and standardize publishing

- centralize editorial content in Strapi
- reduce duplication across marketing surfaces
- define content models and consumer flags
- introduce serverless intake endpoints for microsite and campaign form submissions
- allow temporary routing of selected lightweight submissions through interim systems where needed, but avoid making Strapi the long-term system of record for lead/workflow data

### Phase 2— Integrate master site and formalize intake flows

- integrate master site with Strapi
- standardize content schemas and publishing workflows
- route campaign and microsite submissions through a shared intake layer
- begin routing prospect/lead submissions into Identity + Member Intelligence flows
- route support/inquiry forms into Workflow & Case Management patterns where appropriate

### Phase 3— Mature campaign/microsite operating model

- migrate microsites to reusable Framer and/or Next.js patterns
- standardize analytics, attribution, and UTM propagation
- formalize submission routing by form type:
- prospect/lead → Identity + Member Intelligence
- support/inquiry → Workflow
- campaign/event interactions → appropriate domain + event emission
- connect intake flows to the Event Backbone where useful

### Phase 4— Finalize Strapi as content-only system

- remove remaining business logic and non-editorial workflow responsibilities from Strapi
- keep Strapi as the canonical editorial content and publishing layer
- ensure meaningful submissions are owned by the appropriate core domains, not by the CMS
- use Strapi for content, campaign structure, and editorial projections only

---

## 13. Key Principles

- Strapi is a content system, not a business logic engine
- editorial and operational data must remain separate
- content is reusable across surfaces
- marketing and campaign velocity is critical
- analytics must inform content strategy

---

## 14. Open Questions

- Webflow vs Next.js long-term split
- content governance model
- localization strategy
- microsite hosting standardization

---

## 15. Next Steps

- refine content models
- align Strapi schemas with applications
- define analytics event taxonomy
- build master site integration
- establish microsite templates
