# Identity Domain Strategy

## Purpose

Defines the Identity Domain as the canonical layer responsible for
resolving and maintaining personhood across the SEIU ecosystem,
independent of any single system, application, or identifier.

---

## 1. Domain Overview

The Identity Domain exists to answer one question reliably:

> "Who is this person across the entire ecosystem?"

It establishes a **canonical person record** and maintains mappings
between:

- Administrative records (Unionware / future registry)
- IdP accounts
- Application-specific user IDs (WorkersFirst, My65+, Training Centre,
  etc.)

This domain is foundational for: - SSO enablement - CRM / Member
Intelligence accuracy - Cross-node lifecycle orchestration

---

## 2. Core Responsibilities

### Owns

- Canonical person record
- External identifier crosswalks
- Identity reconciliation (merge, dedupe, linking)
- Reactivation continuity
- Person role/context bindings (member, prospect, staff, etc.)

### Does NOT Own

- Authentication (IdP)
- Membership authority (Administrative Registry)
- Lifecycle intelligence (Member Intelligence Domain)
- Content or publishing (Strapi)

---

## 3. Current State

### Fragmentation Reality

A single person may exist as:

- Unionware member record (member_id)
- WorkersFirst user account
- My65+ account
- Training Centre (MySIS / Canvas) user
- Mobile app user session

These identities are:

- Not reliably linked
- Not centrally resolved
- Not consistently deduplicated

### Key Constraints

- Member ID exists only after Finance-controlled creation
- Email is inconsistent across records
- Some nodes operate completely independently

---

## 4. Target State

### Canonical Identity Model

The Identity Domain introduces a **canonical person entity**:

**Person** - person_id (system-generated, immutable) - primary_email -
status (prospect, active_member, inactive, staff, etc.) - created_at -
updated_at

### Identifier Crosswalk

Each person maps to multiple identifiers:

**Identity Map** - person_id - system (unionware, idp, workersfirst,
my65plus, canvas, etc.) - external_id - status - linked_at

This enables:

- One person → many system identities
- Stable reconciliation across all nodes

---

## 5. Identity Resolution Model

### Resolution Inputs

- Email (primary)
- Member ID (authoritative when present)
- System-specific identifiers

### Matching Strategy

1.  **Exact match (member_id)**
    - Highest confidence
2.  **Email match**
    - Medium confidence (requires validation)
3.  **Heuristic / assisted match**
    - Manual or semi-automated reconciliation

### Merge Rules

- Preserve all identifiers
- Maintain audit trail
- Never overwrite authoritative IDs
- Support reversible merges (soft merge model)

---

## 6. Lifecycle States

A person can exist in multiple states:

- Prospect (no member_id)
- Active Member
- Inactive Member
- Reactivated Member
- WorkersFirst-only participant
- Training Centre learner
- Staff (internal user)

### Key Principle

> Identity state is not the same as membership state.

Membership state belongs to the Administrative Registry. Identity Domain
reflects **person context across systems**.

---

## 7. Relationship to IdP

### Separation of Concerns

Authentication is owned by the IdP
Person identity is owned by the Identity Domain

### Integration Model

- IdP stores auth account (subject ID)
- Identity Domain links person_id ↔ IdP subject
- Tokens may carry person_id as a claim

### Key Rule

> IdP does not define who a person is --- it only proves they are
> authenticated.

---

## 8. Integration Model

### Current

- No centralized identity layer
- Point-to-point identity assumptions

### Transitional

- Identity service introduced
- Webhook-driven linking from systems

### Target

- Event-driven identity updates

Events: - person.created - identity.linked - identity.merged -
person.reactivated

---

## 9. Reactivation & Continuity

### Problem

Rejoining members may: - Receive new system accounts - Lose continuity
with past data

### Solution

- Preserve person_id permanently
- Link new member_id to existing person_id
- Maintain historical relationships

Flow: Finance reactivates member → event emitted → identity domain links
new state → continuity preserved

---

## 10. Data Model (Expanded)

**Person** - person_id (UUID) - primary_email - secondary_emails
(array) - status - created_at

**Identity Map** - id - person_id - system - external_id - metadata
(JSON) - linked_at

**Merge Log** - merge_id - source_person_id - target_person_id -
reason - timestamp

---

## 11. Migration Strategy

### Phase 1 --- Shadow Identity Layer

- Create person records from active members (email + member_id)
- Build identity mappings

### Phase 2 --- Node Linking

- Connect WorkersFirst, My65+, Training Centre
- Backfill identity maps

### Phase 3 --- Full Adoption

- All systems rely on person_id
- IdP tokens include canonical identity reference

### Pattern

Strangler approach --- no big bang replacement.

---

## 12. Relationship to Other Domains

Domain Relationship

---

Administrative Registry Provides member_id linkage
IdP Provides authentication
Member Intelligence Consumes person-level data
Workflow Anchors cases to person_id
Content Uses identity claims for targeting

---

## 13. Key Principles

- person_id is the canonical identifier
- Identity is independent of membership
- No system owns identity except this domain
- All identifiers are mapped, not replaced
- Merges are reversible and auditable

---

## 14. Technology Stack Considerations

This section is intentionally directional, not final. The Identity Domain is a cross-cutting institutional layer responsible for canonical person resolution, external identifier crosswalks, merge/reconciliation logic, and continuity across systems and time.

It should be designed for:

- canonical identity durability
- careful relational mapping
- auditable merges and linkages
- interoperability with the IdP, Administrative Registry, Member Intelligence, and Workflow/Case domains
- eventual ecosystem-wide lookup and resolution services

### Recommended Direction

#### Core persistence layer

**PostgreSQL** is the strongest default recommendation for the Identity Domain.

Why:

- identity resolution is fundamentally relational
- the domain needs strong support for:
  - one-to-many identifier mappings
  - merge logs
  - role/context bindings
  - temporal validity windows
  - auditability
- PostgreSQL handles structured identity graphs and crosswalk tables very well without requiring an actual graph database at this stage

The Identity Domain should begin with explicit relational modelling rather than jumping to more exotic identity technologies.

#### Service layer / identity API

This domain should likely be implemented as a dedicated service or strongly bounded module with its own API surface.

Directional stack options:

- **TypeScript / Node.js**
- **Python**
- **Java / Kotlin** if stronger enterprise identity/service patterns are preferred

Current directional preference:

- **TypeScript / Node.js** is likely the most pragmatic fit if the broader SEIU platform stack leans that way
- **Python** is viable if matching/reconciliation logic becomes more data-heavy
- **Java/Kotlin** is viable if SEIU chooses a more formally enterprise identity-service posture

#### API style

The Identity Domain will likely need:

- synchronous lookup APIs
- asynchronous event-driven update handling
- controlled merge/reconciliation commands

Likely API patterns:

- REST for most service interactions
- event subscriptions/publications for ecosystem updates
- internal admin/service commands for merges and identity review

### Matching and Resolution Layer

Identity matching will likely start rules-based and may become more sophisticated over time.

#### Early-stage recommendation

Start with a **rules-based resolution engine**, using:

- exact identifier matching
- deterministic email matching where appropriate
- controlled linkage rules
- manual review workflows for ambiguous cases

This is the correct starting point for a domain with institutional and operational sensitivity.

#### Later-stage evolution

If needed, the domain could evolve to include:

- confidence scoring
- assisted matching heuristics
- review queues for ambiguous identity cases

But the early architecture should avoid introducing unnecessary complexity too early.

### Relationship to the IdP

The Identity Domain is **not** the IdP and should not be implemented by trying to overload Auth0/Okta into being the canonical identity store.

Recommended pattern:

- IdP remains external/shared authentication plane
- Identity Domain stores canonical `person_id`
- Identity Domain maps `person_id` ↔ `idp_subject`

That means the stack likely includes:

- **Auth0 or Okta** for authentication
- a custom Identity Domain service + database for canonical personhood

### Event Integration

The Identity Domain should both consume and emit events.

It will likely consume:

- member created/reactivated events
- new account creation events
- node-level account linking events

It will likely emit:

- `person.created`
- `identity.linked`
- `identity.merged`
- `person.reactivated`

This makes it a natural participant in the Event Backbone.

Recommended technical patterns:

- event consumer workers
- transactional writes + event publication
- idempotent handling of repeated inbound identity events

### Internal Review / Reconciliation Tooling

This domain will almost certainly require internal tooling for:

- ambiguous identity review
- manual merges
- reactivation handling
- rejoin continuity review
- audit history inspection

Directional options:

- custom internal UI built in **Next.js**
- interim internal tooling using **Retool** or equivalent
- hybrid approach

A hybrid approach is again likely most pragmatic.

### Optional Future Enhancements

These are not required from day one, but may become useful:

#### Search layer

- PostgreSQL is likely enough initially
- **OpenSearch / Elasticsearch** may become useful if staff need fuzzy search across many identity attributes and historical aliases

#### Graph representation

A graph database is **not recommended as a starting point**.
The identity problem here is better approached first as:

- canonical person table
- identifier mapping tables
- merge logs
- relationship bindings

A graph model can be reconsidered later only if the complexity truly justifies it.

### Not Recommended as the Core Identity Foundation

The following are weak choices for the long-term identity foundation:

- using the IdP itself as the canonical person store
- embedding identity resolution logic entirely inside the CRM/intelligence layer with no domain boundary
- using a CMS or low-code platform as the canonical identity source
- using app-specific user tables as the ecosystem identity layer

### Strategic Recommendation

The Identity Domain should be built as a **strongly bounded canonical identity service**, most likely centered on:

- **PostgreSQL**
- a custom service/API layer
- event-driven synchronization with surrounding domains
- explicit linkage to the IdP rather than IdP overreach
- controlled internal tooling for merges and reconciliation

It should start simple, deterministic, and auditable — and only become more sophisticated where real institutional complexity demands it.

---

## 14. Open Questions

- Email normalization and validation strategy
- Conflict resolution rules (duplicate emails, shared emails)
- Staff identity handling model
- External partner identity handling

---

## 15. Next Steps

- Define identity API surface
- Define merge/reconciliation workflows
- Align IdP claims structure
- Begin Unionware export for seeding
