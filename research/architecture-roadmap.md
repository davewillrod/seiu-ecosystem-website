# SEIU Ecosystem Architecture Roadmap (Comprehensive & Homecare-Prioritized)

**Version:** v4  
**Last Updated:** April 2026  

---

# 1. Purpose

This roadmap defines a **detailed, system-aware execution plan** for evolving SEIU’s ecosystem into a unified platform.

It explicitly incorporates:
- My65+ (primary business driver)
- WorkersFirst
- Training Centre (Vubiz → Canvas)
- Mobile App (existing + migration)
- Strapi (content system)
- WordPress → Microsite transition
- Unionware (legacy core system)

---

# 2. Business Priority

## Core Strategic Funnel (Homecare)

1. Campaign (microsite / marketing)
2. Intake (form submission)
3. Identity (person_id creation)
4. My65+ conversion
5. Lifecycle orchestration
6. Expansion into WF + TC

### Priority Order

1. My65+
2. Intake (microsites + master site)
3. Identity
4. IdP
5. Mobile App (distribution channel)
6. Event Backbone
7. WorkersFirst / Training Centre
8. Unionware replacement (longer-term)

---

# 3. Phase 1 — Demand Capture & Conversion Engine (0–8 weeks)

## 3.1 Marketing + Microsites (CRITICAL)

### Current
- WordPress-based marketing
- no reusable system

### Tasks
- Define microsite architecture:
  - Framer (default)
  - Next.js (advanced cases)

- Build campaign template system:
  - reusable sections
  - consistent CTA structure

- Standardize form structure:
  - name, email, phone, interest
  - campaign_id
  - UTM capture

---

## 3.2 Intake Layer (Microsite → Platform)

### Tasks
- Build serverless intake API
- Validate + normalize inputs
- Store in intake database (Postgres)

- Attach metadata:
  - UTM
  - campaign
  - source

- Ensure:
  - all microsites POST to intake layer (NOT Strapi)

---

## 3.3 Identity (Prospect-first)

### Tasks
- Create `person` table
- Create identity mapping table

- Implement:
  - email-based lookup
  - create-or-resolve logic

- Connect intake → identity

---

## 3.4 IdP (Auth0)

### Tasks
- Configure tenant
- Define JWT:
  - sub
  - person_id

- Build middleware:
  - token validation
  - claims extraction

---

## 3.5 My65+ (Primary Conversion Node)

### Tasks
- Replace auth with IdP
- Map accounts → person_id

- Implement:
  - enrollment flow
  - analytics tracking

- Emit:
  - my65plus.enrolled
  - account.created

---

## 3.6 Mobile App (Early Alignment)

### Current
- Strapi-influenced auth
- MySQL shadow DB

### Tasks
- Add IdP login support
- begin person_id integration
- do NOT refactor entire backend yet

---

## 3.7 Event Backbone (MVP)

### Tasks
- Implement SNS/SQS (or equivalent)
- Define envelope
- Build publisher utility

---

# 4. Phase 2 — Content System & Distribution (8–16 weeks)

## 4.1 Strapi (Content System Stabilization)

### Tasks
- Clean content models:
  - editorial
  - projections
  - reference content

- Remove:
  - auth logic
  - workflow logic

- Add:
  - consumer flags
  - structured schemas

---

## 4.2 Master Site (Next.js)

### Tasks
- Build SSR site
- integrate Strapi API
- implement ISR caching

---

## 4.3 Microsite System (Framer)

### Tasks
- finalize templates
- integrate intake forms
- standardize deployment

---

## 4.4 Analytics

### Tasks
- implement GTM
- unify GA4 property
- ensure cross-domain tracking

- send events → event backbone

---

# 5. Phase 3 — Lifecycle & Orchestration (16–28 weeks)

## Member Intelligence

### Tasks
- build ingestion service
- store engagement signals
- define lifecycle states

- build rule engine:
  - My65+ triggers
  - onboarding nudges

---

## Mobile App Expansion

### Tasks
- consume lifecycle signals
- render personalized UI
- integrate nudges

---

# 6. Phase 4 — WorkersFirst & Training Centre (20–32 weeks)

## WorkersFirst

### Tasks
- integrate IdP
- map to person_id
- emit:
  - shift.completed
  - placement.created

---

## Training Centre

### Tasks
- build LMS adapter
- emit:
  - enrollment.started
  - credential.completed

---

# 7. Phase 5 — Workflow Domain (24–36 weeks)

### Tasks
- build case system
- route:
  - support → workflow
  - applications → workflow

- integrate with intake

---

# 8. Phase 6 — Unionware Transition (28–44 weeks)

## Current Role
- source of truth for:
  - member_id
  - dues
  - employer data

## Tasks
- build adapter layer
- emit events:
  - member.created
  - member.updated

- gradually:
  - migrate registry out

---

# 9. Phase 7 — Mobile App Full Refactor (32–48 weeks)

### Tasks
- remove MySQL shadow DB
- remove Strapi dependency for logic
- use:
  - IdP
  - Identity
  - APIs

---

# 10. Final State

- Strapi = content-only
- Microsites = campaign engines
- Mobile = primary engagement layer
- My65+ = conversion anchor
- Event backbone = integration layer
- Unionware = deprecated

---

# 11. Timeline Summary

| Phase | Duration |
|------|--------|
| Phase 1 | 0–8 weeks |
| Phase 2 | 8–16 weeks |
| Phase 3 | 16–28 weeks |
| Phase 4 | 20–32 weeks |
| Phase 5 | 24–36 weeks |
| Phase 6 | 28–44 weeks |
| Phase 7 | 32–48 weeks |

---

# 12. Core Principle

> Build the Homecare growth engine first (My65+), while systematically replacing legacy dependencies (Unionware, Strapi misuse, fragmented apps).
