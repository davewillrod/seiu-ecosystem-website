# SEIU Ecosystem Architecture Overview

## Foundational Strategy Document

**Last updated:** April 2026  
**Status:** Foundational — governs all workstreams  
**Replaces:** `ws00-architecture-principles.md`  
**Applies to:** all present and future workstreams, including identity, administrative registry, member intelligence, workflow/case management, content/frontend, SSO/IdP, and node integration

---

## Purpose

This document defines the foundational architecture for the SEIU ecosystem.

It establishes:

- the current-state system landscape
- the target-state domain model
- system boundaries and ownership
- the layered dependency model
- data, identity, and workflow principles
- the integration evolution strategy
- the migration approach from the current fragmented stack to the future institutional platform

This document is intentionally high-level and strategic. It is detailed enough to anchor all downstream workstreams, but it does not attempt to fully specify each domain. Deeper design for each layer should live in its own dedicated strategy document.

---

# 1. Strategic Thesis

SEIU's digital future should not be designed as a single monolithic platform. It should be designed as a **coordinated institutional ecosystem** made up of specialized systems connected through shared identity, controlled data flows, and event-driven integration.

The ecosystem exists to serve a worker across multiple stages of life and work:

- prospecting and organizing
- membership and representation
- training and credentialing
- shift access and workforce placement
- retirement savings
- ambient member engagement
- support, casework, and operational service workflows

The architectural objective is not to collapse every function into one application. The objective is to make the ecosystem operate like **one institution**, while preserving clean domain boundaries.

That means the target state is:

- **one canonical person identity** across the ecosystem
- **one shared authentication plane**
- **one institutional administrative truth** for registry and dues
- **one member intelligence layer** for lifecycle, orchestration, and signals
- **one workflow/case domain** for operational casework and service handling
- **one content system** for editorial publishing and projections
- **independent domain applications** for specialized operational workflows
- **an event backbone** that coordinates the entire system without tight coupling

---

# 2. Current State Overview

SEIU currently operates as a connected institution in strategy, but as a fragmented system landscape in execution.

The ecosystem spans multiple platforms, multiple login environments, multiple data stores, and multiple operational models. A worker who touches the Training Centre, WorkersFirst, My65+, and the mobile app may still be treated as different people in different systems. This fragmentation limits personalization, creates duplicate acquisition costs, breaks continuity across touchpoints, and prevents the ecosystem from operating as a unified member lifecycle system.

## 2.1 Current-state architectural characteristics

The current state is defined by the following realities:

- **Eight or more disconnected platforms** and **five separate login environments** are active across the ecosystem.
- **Unionware** remains the administrative system of record for member registry, dues-related administration, and historical member records.
- **Strapi** is live and already central to the ecosystem, but today it plays a broader role than a normal CMS.
- The **mobile app stack** includes its own backend, its own MySQL shadow layer, and Strapi-driven access/content logic.
- **WorkersFirst** and **My65+** operate with dedicated backends and dedicated auth systems that are not natively connected to Unionware.
- The **Training Centre** spans multiple systems, including both current and transitional learning/education platforms.
- Data quality across the administrative base is inconsistent, especially around employer classifications, job classifications, and email completeness.
- Integration exists today in scattered forms — direct queries, batch synchronization, webhooks, and point-to-point logic — but not yet as a formal event backbone.

## 2.2 Current-state platforms and responsibilities

### 2.2.1 Unionware

Unionware is the current administrative system of record.

It currently owns or holds:

- official member registry data
- dues-related records and financial administration
- historical member records and inactive archives
- finance-controlled member creation workflows
- masked SIN handling under Finance control
- member status changes and related institutional records
- ticketing & case workflows

Key realities:

- It contains **350,000+ records**, including historical and inactive members.
- Data quality is inconsistent.
- The **member ID** is the only field treated as universally present and institutionally authoritative.
- Email is important operationally, but is incomplete across the full population.
- Member creation is **Finance-controlled**, not self-serve.
- Unionware is not fit to serve as the long-term intelligence layer for a multi-node ecosystem.

### 2.2.2 Mobile app stack

The mobile app is live and fully operational, and is already one of the most important digital surfaces in the ecosystem.

Current mobile app architecture includes:

- React Native application
- Node.js backend services
- Strapi 5.0 CMS
- MySQL database shadow layer
- AWS infrastructure with **three environments**: development, staging, production
- **CloudFront CDN** in front of the stack
- managed by Channel One Media

Current mobile app authentication and data flow:

- member enters SEIU member ID / associated credentials
- system validates member identity against Unionware in real time
- email match against Unionware profile is required
- MFA / OTP is used
- session is established after successful validation

Current mobile app data architecture:

- a **shadow layer in MySQL** stores limited PII and union-related data
- the shadow layer is synchronized from Unionware on a **24-hour batch sync**
- Unionware changes such as deletions and employer changes are reflected into the mobile-side data layer
- public / unauthenticated users only receive general news content, not personalized member experiences

Current mobile app business-logic reality:

- Strapi is not functioning only as a CMS
- Strapi currently handles **content delivery and authorization rules**
- access is controlled by attributes such as **job function, employer, and bargaining unit**
- Strapi also manages documents, events, surveys, training materials, and loyalty-related engagement logic

Current integration notes:

- SurveyMonkey cross-referencing exists
- Vubiz is currently part of the mobile/app ecosystem context and is under renegotiation
- event check-in flows use QR/barcode scanning patterns
- RingCentral chatbot replacement is underway
- event-driven patterns already exist in partial form through webhooks and points logic

Current architectural implications:

- the mobile app already contains a meaningful shadow identity/state layer
- Strapi is functioning as both content system and policy/segmentation layer
- simply “replacing auth in Strapi” is not enough; policy extraction is also required

### 2.2.3 Strapi

Strapi is already in production and is strategically important.

Current Strapi role:

- editorial content publishing
- content delivery to the mobile app
- limited middleware/auth handoff role between the mobile app and Unionware
- authorization/segmentation logic in the mobile ecosystem today

Current characteristics:

- self-hosted
- Community Edition
- running at `console.seiuhealthcare.ca`
- already used by SEIU editorial teams
- strategically retainable due to data sovereignty, cost profile, and customization flexibility

Current architectural issue:

- Strapi's current role is broader than its desired long-term role
- in target state, Strapi should not remain the long-term home of authentication or institutional policy logic

### 2.2.4 Training Centre

The Training Centre is not a single system today; it is a node supported by multiple systems.

Current / near-current components include:

- **MySIS** as student information / education administration system
- **Canvas** as LMS for modules and learning content
- **Vubiz** as the current LMS/platform in parts of the ecosystem context and under renegotiation
- Microsoft education tooling/productivity stack

This means the current-state architecture must explicitly recognize both:

- **Vubiz** as part of the live/current Training Centre-adjacent learning environment
- **Canvas** as part of the intended and emerging Training Centre digital architecture

Governance note:

- Training Centre governance is not fully settled and remains important to integration scoping
- architectural integration assumptions should preserve flexibility until governance is finalized

### 2.2.5 WorkersFirst

WorkersFirst is live with:

- marketing site
- web/mobile application
- dedicated backend
- dedicated auth system
- dedicated operational data model

Key realities:

- not natively integrated with Unionware as a primary runtime system
- creates identity reconciliation problems in some cases
- dedicated backend stack requires audit for final integration design
- operationally important as a shift/placement engine, not just a content surface

### 2.2.6 My65+

My65+ is live with:

- dedicated web/mobile application
- dedicated backend and auth system
- significant strategic importance due to the federal funding and Home Care opportunity

Key realities:

- backed by a large federal investment
- enrollment bonus and matching structure make it the highest-priority immediate value lever in Home Care acquisition
- auth and data integration require special care due to possible compliance or residency implications

### 2.2.7 UnionSavings

UnionSavings functions as an ambient retention layer.

It is strategically lighter than the other nodes, but still important as:

- a digital engagement touchpoint
- a retention signal source
- a lower-friction reason for members to stay digitally connected to SEIU over time

### 2.2.8 Current frontend landscape

The current and planned frontend ecosystem spans multiple presentation contexts:

- mobile app for existing members
- master marketing site
- campaign microsites
- future member web app
- node-native frontends for WorkersFirst, My65+, and Training Centre applications

The content/frontend strategy already points toward:

- Strapi as shared content hub
- Next.js for the master site
- Framer for campaign microsites by default
- a future separate authenticated web app at `app.seiuhealthcare.ca`

## 2.3 Current-state pain points

The architectural issues that matter most are:

### Identity fragmentation

- the same human can exist as multiple unconnected records across platforms
- WorkersFirst can introduce member-number mismatch issues
- rejoining members may lose continuity with prior institutional history if not reconciled
- staff/member/prospect distinctions are not yet formalized in a canonical identity model

### Data quality constraints

- inconsistent employer classifications
- thousands of job classifications due to employer variation
- missing email values for many members, especially older records
- inconsistent records across historical administrative data

### Policy logic fragmentation

- Strapi currently contains mobile access rules and segmentation logic
- the ecosystem does not yet have a clean target-state policy architecture

### Integration fragility

- point-to-point logic and batch synchronization limit agility
- not every system is currently capable of webhook-driven synchronization
- not every node is yet prepared for SSO migration

### Current-state scalability constraints

- mobile stack is operationally sound for Ontario-scale usage but current logic does not generalize cleanly to broader multi-node orchestration
- Strapi currently carries responsibilities that should be split across future domains
- current-state architecture is too tightly bound to present system boundaries to serve as the permanent institutional model

---

# 3. Target-State Overview

The target state is **not** a single CRM replacing everything.

The target state is a **SEIU Core Platform** supported by shared infrastructure and connected to specialized domain applications.

This target state separates the ecosystem into clear domains with clear ownership.

## 3.1 Core target-state domains

### 3.1.1 Administrative Registry Domain

This domain becomes the institutional administrative authority currently centered in Unionware.

It owns:

- official member registry
- dues processing and related ledgers/workflows
- finance-controlled member creation and reactivation workflows
- employer, bargaining unit, sector, and related canonical taxonomies
- privileged administrative verification artifacts
- long-term administrative truth for official membership status

This domain is the conceptual **layer 1 administrative truth** in the target architecture.

### 3.1.2 Identity Domain

This domain owns canonical personhood across the ecosystem.

It owns:

- canonical person record
- external identifier crosswalks across all nodes and systems
- person-to-auth linkage
- merge, reconciliation, and reactivation continuity
- person role/context bindings (member, prospect, staff, etc.)

It does **not** replace the IdP.
It does **not** replace the administrative registry.
It resolves who a person is across the institutional stack.

### 3.1.3 Identity Provider (IdP)

The IdP is the shared authentication plane.

It owns:

- authentication
- MFA
- login/session lifecycle
- token issuance
- trustable session identity

It does **not** own:

- lifecycle intelligence
- business authorization logic
- editorial content
- canonical administrative truth

### 3.1.4 Event Backbone

The event backbone is a first-class architectural layer, not an implementation detail.

It exists to:

- receive events from producing systems
- distribute events to subscribing systems
- decouple producers from consumers
- support retries, reliability, and fan-out
- become the connective tissue of the ecosystem

This is the backbone that eventually coordinates:

- administrative events
- identity events
- node lifecycle events
- workflow/case events
- analytics and future intelligence signals

### 3.1.5 Member Intelligence Domain

This domain replaces the earlier over-broad use of the term “CRM layer.”

It owns:

- relationship state across the ecosystem
- lifecycle state tracking
- engagement scoring
- cohort onboarding
- trigger and nudge logic
- next-best-action orchestration
- risk and opportunity signals
- cross-node intelligence

This domain is what was previously being called the CRM layer, but **Member Intelligence Domain** is a more accurate architectural label.

### 3.1.6 Workflow & Case Management Domain

This is a distinct institutional domain and should not be neglected.

It owns:

- internal operational workflows
- support and inquiry workflows
- member service workflows
- sensitive grievance / representation cases
- tasks, queues, assignments, notes, attachments, and audit logs
- escalation and SLA-like operational handling

This domain should support multiple classes of workflow while preserving stronger controls for sensitive grievance/representation cases.

### 3.1.7 Domain Applications / Node Systems

These remain specialized operational systems.

Examples include:

- Training Centre systems
- WorkersFirst
- My65+
- mobile app and future member app
- other institutional node applications over time

They continue to own their domain-specific workflows and operational state.
They do not become secondary shells of a giant monolith.

### 3.1.8 Content & Publishing Domain (Strapi)

Strapi remains as the content system.

It owns:

- editorial content
- editorial projections of operational entities
- structured reference content
- publishing workflows for content surfaces

It does **not** remain the long-term owner of authentication or institutional authorization logic.
Its target-state role is content, publishing, and content projection.

## 3.2 Functional dependency model (target state)

The clearest conceptual model for the target state is a downstream dependency stack.

### Layer 1 — Administrative authority

- Administrative Registry Domain

### Layer 2 — Canonical identity

- Identity Domain

### Layer 3 — Authentication plane

- IdP

### Layer 4 — Event coordination

- Event Backbone

### Layer 5 — Member intelligence and orchestration

- Member Intelligence Domain

### Layer 6 — Specialized applications and node systems

- mobile app / future member app / Training Centre systems / WorkersFirst / My65+ / other operational systems

### Layer 7 — Content and publishing

- Strapi and frontend content delivery consumers

This order reflects **dependency and trust flow**, not strategic importance. A higher-numbered layer is not “less important”; it is simply more downstream.

## 3.3 Platform packaging vs functional layering

In the final end state, several core domains may be delivered on the same underlying institutional platform.

That future platform should be referred to as the:

> **SEIU Core Platform**

not simply “the CRM.”

Why:

- the full target state is broader than CRM
- it includes administrative registry/dues responsibilities
- it includes canonical identity
- it includes workflow/case management
- it includes lifecycle intelligence/orchestration

So:

- **SEIU Core Platform** = umbrella institutional platform
- **Member Intelligence Domain** = the part most closely aligned with “CRM” semantics

---

# 4. Domain Ownership and Non-Negotiable Boundaries

## 4.1 Administrative Registry Domain

**Owns:**

- official member registry
- dues processing
- finance workflows
- employer/unit/sector taxonomy stewardship
- privileged finance-controlled verification artifacts (eg. SIN handling)

**Does not own:**

- authentication
- editorial publishing
- cross-node lifecycle orchestration
- generalized content targeting

## 4.2 Identity Domain

**Owns:**

- canonical person record
- external identifier mapping
- merge/reactivation continuity
- person-to-auth-account linkage
- role/context bindings

**Does not own:**

- authentication credentials
- finance/dues truth
- lifecycle scoring
- content publishing

## 4.3 IdP

**Owns:**

- authentication
- credential validation
- token issuance
- session trust

**Does not own:**

- roles as the institutional business source of truth
- lifecycle intelligence
- editorial content
- finance/admin truth

## 4.4 Event Backbone

**Owns:**

- event receipt and distribution
- fan-out and decoupling
- delivery/retry infrastructure
- standardized event transport

**Does not own:**

- source-of-truth business data
- business workflows
- application-specific state

## 4.5 Member Intelligence Domain

**Owns:**

- lifecycle state
- engagement state
- cohort onboarding
- trigger logic
- orchestration logic
- risk and opportunity scoring

**Does not own:**

- raw finance/admin truth
- authentication
- editorial publishing
- deep domain-specific operational workflows

## 4.6 Workflow & Case Management Domain

**Owns:**

- case records
- task/queue/assignment structures
- internal operational workflows
- support and inquiry flows
- grievance/representation cases
- operational audit trails

**Does not own:**

- canonical identity
- official registry truth
- general lifecycle scoring
- editorial content

## 4.7 Domain Applications / Node Systems

**Own:**

- operational domain state
- node-specific workflows
- node-native UI/UX
- domain logic specific to the service provided

**Do not own:**

- canonical institutional identity
- institution-wide lifecycle orchestration
- generalized content publishing

## 4.8 Strapi / Content Domain

**Owns:**

- editorial content
- editorial projections of operational entities
- reference content
- publishing workflows and consumer-targeted content distribution

**Does not own:**

- workflow/transactional data
- long-term institutional policy engine
- authentication
- canonical identity

---

# 5. Identity, Authentication, and Authorization Principles

## 5.1 Core principle

> Authentication is centralized. Authorization is distributed.

This remains a foundational rule.

## 5.2 Authentication

Authentication is handled exclusively by the IdP.
All participating applications trust IdP-issued tokens.

## 5.3 Authorization

Authorization is determined by the combination of:

- administrative truth where relevant
- identity context
- member intelligence state
- application/domain logic

The target-state model is not:

- all policy in the IdP
- all policy in Strapi
- all policy in one giant shared service

Instead:

- **IdP** provides trusted auth/session identity
- **Member Intelligence** provides shared lifecycle/eligibility/segmentation context
- **application backends** enforce final domain-specific access and action rules
- **content systems** may use claims/context for filtering content presentation, but are not the long-term institutional policy authority

## 5.4 Roles and permissions

Roles and permissions are **not** stored as the institutional business source of truth inside the IdP.

They may appear in tokens as controlled claims when needed, but the IdP is not the authoritative home of business authorization.

## 5.5 Canonical identity principle

The ecosystem requires a stable canonical person identifier independent of:

- member ID
- app-specific user IDs
- historical system identifiers

The canonical identity layer must support:

- prospects
- members
- reactivated/rejoining members
- WorkersFirst-only participants
- Training Centre learners
- My65+ participants
- staff/internal users where appropriate

The canonical person record is distinct from:

- IdP subject/account
- administrative member record
- application-specific user IDs

---

# 6. Workflow & Case Management Principles

## 6.1 Why this domain exists

SEIU's future-state architecture cannot neglect operational workflows and case handling.

These responsibilities currently exist in fragmented form across administrative systems and operational practices. The target architecture needs a dedicated domain for them.

## 6.2 Workflow classes

The target state should support at least three workflow classes:

### Internal operational workflows

Examples:

- MSC to Finance handoffs
- member data correction workflows
- identity review/reconciliation tasks
- taxonomy normalization tasks
- back-office service operations

### Member service workflows

Examples:

- support inquiries
- profile correction requests
- access/helpdesk requests
- onboarding assistance
- general service follow-up

### Grievance / representation cases

Examples:

- grievance intake
- dispute handling
- sensitive representation matters

These should use a shared casework foundation, but grievance/representation cases must be treated as a more sensitive case class with stronger access boundaries.

## 6.3 Workflow data and the intelligence domain

Member Intelligence may consume **status signals** from workflow/case systems, but it should not become a dumping ground for raw sensitive case content.

Principle:

- workflow/case domain emits controlled signals
- Member Intelligence consumes minimal necessary service-state indicators
- sensitive grievance content remains within the workflow/case domain and tightly governed access paths

---

# 7. Content and Frontend Principles

## 7.1 Strapi remains the content hub

Strapi is retained and extended as the central content hub for editorial and reference content across the ecosystem.

Reasons include:

- already in production
- self-hosted control and data sovereignty
- favorable cost profile at SEIU scale
- customization flexibility
- sufficient scalability when supported by CDN/caching strategy

## 7.2 Strapi target-state scope

Strapi is:

- content management system
- content distribution layer
- editorial projection layer for selected operational entities

Strapi is not:

- the long-term IdP
- the long-term institutional policy engine
- the workflow/case system
- the administrative registry system

## 7.3 Frontend composition principles

The frontend ecosystem is intentionally multi-context:

- master site (`seiuhealthcare.ca`) as institutional marketing/property
- campaign microsites as acquisition surfaces
- future member web app (`app.seiuhealthcare.ca`) as authenticated application context
- node-native applications where needed

Current directional decisions remain sound:

- Next.js for the master site
- Framer by default for campaign microsites
- separate authenticated app stack for member web experiences
- shared content source through Strapi
- CDN, ISR, and API caching as core frontend performance strategies

## 7.4 Operational vs editorial data

The rule remains:

> Workflow data is never treated as content.

Operational systems may project certain entities into Strapi for editorial publication, but operational systems remain the source of truth for operational state.

---

# 8. Integration Philosophy

## 8.1 Core principle

> Systems do not call each other directly for business logic unless there is a clearly justified short-term transitional reason. The target model is controlled integration through events and bounded interfaces.

This principle remains foundational.

## 8.2 Integration evolution model

The previously defined progression still holds and should remain explicit.

### Phase 1 — Direct Integration (Webhooks)

Pattern:
`System -> Webhook -> Consumer`

Use when:

- speed matters
- coupling is acceptable temporarily
- producer and consumer are well understood
- the ecosystem needs to move before a full event backbone is in place

### Phase 2 — Function-Based Integration

Pattern:
`System -> Serverless Function / Integration Adapter -> Multiple Consumers`

Use when:

- validation/transformation is needed
- a source system should not know all downstream consumers
- security controls and routing need to be centralized
- legacy systems require thin outward adapters

### Phase 3 — Event-Driven Architecture

Pattern:
`Producer -> Event Backbone -> Subscribers`

Target capabilities:

- full decoupling
- multi-consumer fan-out
- retry and reliability controls
- real-time lifecycle updates
- support for analytics and future AI systems

## 8.3 Event model

Events represent state changes, not generic API activity.

Examples include:

- `member.created`
- `member.updated`
- `member.reactivated`
- `credential.completed`
- `shift.completed`
- `my65plus.enrolled`
- `case.created`
- `grievance.filed`

## 8.4 Event consumers

The target event consumers include:

- Member Intelligence Domain
- Identity Domain where relevant
- Strapi for content projections where appropriate
- analytics systems
- future AI/reporting systems
- workflow/case systems where event-driven handoff is relevant

---

# 9. Migration and Transition Strategy

## 9.1 Strangler Pattern

The strangler pattern remains the correct migration philosophy.

SEIU should not attempt a big-bang replacement.

Instead:

- new domains are introduced alongside existing systems
- traffic and responsibility are shifted incrementally
- stable event contracts are introduced early
- legacy functionality is retired gradually

This is especially important because:

- the Home Care opportunity is live now
- node audits are still in progress for several systems
- Unionware data quality makes one-pass migration unrealistic
- Training Centre governance and toolchain transition remain active realities

## 9.2 Unionware transition principle

Unionware remains in place during transition as the current administrative system of record.

The target-state replacement path is:

1. decouple identity from Unionware
2. introduce shared authentication through the IdP
3. establish event outputs from the administrative layer
4. stand up the new core domains in parallel
5. gradually shift registry, dues, finance workflows, and related casework into the new administrative domain
6. retire Unionware only once the replacement administrative truth is operationally complete

## 9.3 Thin adapters over deep rework

For legacy systems that must participate during transition, the preferred approach is:

- thin outward-facing adapters
- webhook or event emission layers
- minimal invasive change to legacy internals unless strategically necessary

This principle is especially relevant to:

- Unionware
- existing mobile app auth/Strapi integration
- legacy LMS/platform contexts

---

# 10. High-Level Implementation Sequence

This document is not the detailed roadmap for every domain, but the high-level sequence should remain directionally clear.

## Stage 1 — Establish foundations

- target-state domain boundaries finalized
- identity model finalized
- IdP selected and stood up
- initial integration contracts defined
- event backbone strategy agreed

## Stage 2 — Introduce canonical identity and shared auth

- canonical person model introduced
- IdP integrated with initial surfaces
- member/staff/prospect identity handling clarified
- mobile app auth begins transition away from Strapi-mediated auth

## Stage 3 — Introduce member intelligence and workflow foundations

- relationship state tracking begins
- campaign/prospect onboarding flows are connected
- workflow/case architecture begins to replace scattered ticketing/case logic
- controlled workflow signals begin feeding the intelligence layer

## Stage 4 — Expand node integrations

- Training Centre systems emit lifecycle-relevant events
- WorkersFirst and My65+ integrations deepen
- Strapi content projections mature
- member-facing cross-node experiences become feasible

## Stage 5 — Administrative migration

- registry/dues/admin functions progressively shift from Unionware to the new administrative domain
- finance-controlled workflows are rebuilt where necessary
- historical and active-state transition strategies are completed

## Stage 6 — Mature target state

- event-driven ecosystem is dominant integration model
- Strapi functions purely in content/publishing scope
- Member Intelligence becomes the institutional orchestration layer
- administrative truth no longer depends on Unionware

---

# 11. Guiding Principles (Final)

1. **The ecosystem is coordinated, not monolithic.**
2. **Administrative truth, identity, intelligence, workflow/case management, and content are separate domains.**
3. **Authentication is centralized; authorization is distributed.**
4. **Canonical identity is independent of any one application or member ID.**
5. **Workflow/case data is not content, and sensitive grievance data requires stronger boundaries.**
6. **Strapi remains the content hub, not the long-term policy or auth engine.**
7. **The event backbone is a first-class architectural layer.**
8. **Legacy systems are strangled incrementally, not replaced in a big bang.**
9. **System consolidation only happens where it reduces complexity without collapsing domain integrity.**
10. **All future workstreams should inherit their boundaries from this document.**

---

## 12. Separation of Identity Concerns

Concern 1: “Are they a member?”
Domain: Administrative Registry

Concern 2: “Who is this person across systems?”
Domain: Identity

Concern 3: “Are they logged in?”
Domain: IdP

Concern 4: “What should we do with them?”
Domain: Member Intelligence

---

# 13. What This Document Governs Next

This overview document should now serve as the base reference for dedicated downstream strategy documents, including:

- Administrative Registry Domain strategy
- Identity Domain strategy
- IdP / SSO strategy
- Member Intelligence Domain strategy
- Workflow & Case Management strategy
- Content & Frontend strategy
- node-by-node integration strategies
- event backbone and event contract strategy

This document is the base architecture reference. Deeper domain-specific design should move into those dedicated documents.
