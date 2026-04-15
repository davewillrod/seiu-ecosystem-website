# Architecture Principles — SEIU Ecosystem

## WS-00 · Foundational Layer

**Last updated:** April 2026  
**Status:** Foundational — governs all workstreams  
**Applies to:** WS-01 (CRM & Platform), WS-03 (Content & Frontend), and all future workstreams  

---

## Purpose

This document defines the core architectural principles governing the SEIU ecosystem.

It establishes:
- system boundaries and ownership  
- integration philosophy  
- identity model  
- data flow rules  
- long-term evolution strategy  

All workstreams must align with these principles.

---

# 1. Core Architectural Philosophy

The SEIU ecosystem is not a monolithic platform.

> It is a coordinated system of specialized services, connected through shared identity, events, and controlled data flows.

Each system:
- owns a clearly defined domain  
- exposes its state through events or APIs  
- avoids duplicating responsibilities  

---

# 2. System of Record & Ownership Model

Each domain has a single authoritative system.

---

## Identity Provider (Auth0 / Okta)

**Owns:**
- Authentication (login, sessions)
- Credential validation
- Token issuance

**Does NOT own:**
- Member profile data  
- Roles / permissions  
- Business logic  

---

## CRM (Lifecycle & Intelligence Layer)

**Owns:**
- Unified member profile (aggregated view)
- Lifecycle state (prospect → active → engaged → at-risk)
- Cross-node relationships
- Engagement signals and scoring
- Trigger and nudge logic

**Does NOT own:**
- Authentication  
- Editorial content  
- Domain-specific operational workflows  

---

## Strapi (Content System)

**Owns:**
- Editorial content  
- Editorial projections of operational entities  
- Structured reference content  

**Does NOT own:**
- Workflow / transactional data  
- Integration orchestration (long-term)  
- Authentication  

---

## Operational Systems (Domain Systems)

Includes:
- Training Centre (MySIS / Canvas)
- WorkersFirst
- My65+

**Own:**
- Domain-specific workflows and state  
- Operational data (training progress, job placements, etc.)

**Do NOT own:**
- Cross-system orchestration  
- Global member lifecycle state  
- Content publishing  

---

## Unionware (Administrative System of Record)

**Owns:**
- Dues processing and financial records  
- Official member registry  
- Historical archive  

**Does NOT own (target state):**
- Authentication  
- Lifecycle intelligence  
- Cross-system orchestration  

---

# 3. Identity & Authorization Model

---

## Identity Principle

> Authentication is centralized. Authorization is distributed.

---

### Authentication

- Handled exclusively by the IdP  
- All applications trust IdP-issued tokens  

---

### Authorization

- Determined by CRM and application logic  
- Based on:
  - lifecycle state  
  - roles  
  - context  

---

### Key Rule

> Roles and permissions are NOT stored in the IdP.

---

# 4. Integration Philosophy

---

## Core Principle

> Systems do not call each other directly for business logic.  
> They communicate through events or controlled interfaces.

---

## Integration Evolution Model

The architecture evolves in three stages:

---

### Phase 1 — Direct Integration (Webhooks)

System → Webhook → Consumer

- Simple
- Fast to implement
- Acceptable short-term coupling

---

### Phase 2 — Function-Based Integration

System → Serverless Function → Multiple Consumers

- Centralized logic
- Validation and transformation
- Reduced coupling

---

### Phase 3 — Event-Driven Architecture (Target State)

System → Event Bus → Subscribers

- Fully decoupled systems  
- Multi-system fan-out  
- Real-time synchronization  

---

## Event Model

Events represent state changes:

Examples:
- member.created
- credential.completed
- shift.completed
- my65plus.enrolled

---

## Event Consumers

- CRM (primary intelligence layer)  
- Strapi (content updates where required)  
- Analytics / AI systems  

---

# 5. Content & Data Flow Rules

---

## Content Flow

Strapi → Frontends

- Strapi is the publishing source  
- Frontends consume content  

---

## Operational Data Flow

Operational Systems → Events → CRM

- CRM aggregates and interprets state  

---

## Editorial Projection Flow

Operational System → Strapi (draft) → Publish → Frontend

- Strapi controls publishing  
- Operational systems do not publish directly  

---

## Key Rule

> Workflow data is never treated as content.

---

# 6. System Boundaries (Non-Negotiable)

---

## CRM does NOT replace:

- Learning systems (Canvas)  
- Job platforms (WorkersFirst)  
- Financial systems (dues processing)  
- Content systems (Strapi)  

---

## CRM MAY absorb (long-term, case-by-case):

- Ticketing / support workflows  
- Communication systems  
- Engagement analytics  
- Lightweight workflows  

---

## Guiding Principle

> Systems are not merged by default.  
> Consolidation only occurs where it reduces complexity without compromising domain integrity.

---

# 7. Migration & Evolution Strategy

---

## Strangler Pattern

Legacy systems are replaced incrementally:

- New systems introduced alongside existing ones  
- Traffic gradually redirected  
- No “big bang” migration  

---

## Unionware Strategy

- Remains system of record for dues and historical data  
- CRM operates in parallel  
- Migration of financial systems is a future phase, not current scope  

---

# 8. Long-Term Architecture Vision

---

## Target State

- Event-driven ecosystem  
- Unified identity layer  
- CRM as intelligence engine  
- Strapi as content hub  
- Domain systems operating independently  

---

## Strategic Outcome

The ecosystem evolves into:

> A coordinated intelligence platform capable of:
- real-time member lifecycle management  
- cross-system orchestration  
- data-driven engagement and decision-making  

---

# Final Principle

> The architecture prioritizes clarity of ownership, controlled integration, and long-term adaptability over short-term convenience.

All system decisions must align with this principle.
