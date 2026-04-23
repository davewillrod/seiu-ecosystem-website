# Administrative Registry Domain Strategy

## Purpose

Defines the Administrative Registry Domain as the institutional
authority for membership, dues, and administrative truth within the SEIU
ecosystem.

---

## 1. Domain Overview

The Administrative Registry Domain is the authoritative system
responsible for:

- Official member registry
- Dues processing and financial records
- Employer, unit, and sector taxonomies
- Membership status lifecycle (active, inactive, reactivated)
- Finance-controlled member creation

This domain replaces the current over-reliance on Unionware as a
monolithic administrative system, while preserving its role during
transition.

---

## 2. Current State

### System of Record: Unionware

Unionware currently owns:

- 350,000+ member records
- Member ID (primary identifier)
- Dues and financial workflows
- Member creation (Finance-controlled)
- Historical archive

### Key Issues

- Data quality inconsistencies
- Missing emails across many records
- No real-time integration capabilities
- Tight coupling to legacy workflows

---

## 3. Target State

### Core Responsibilities

The Administrative Registry Domain will own:

- Canonical membership record
- Dues ledger and financial state
- Employer/unit taxonomy governance
- Membership lifecycle transitions
- Administrative verification artifacts

### Non-Responsibilities

- Authentication (IdP)
- Identity resolution (Identity Domain)
- Lifecycle orchestration (Member Intelligence)
- Content publishing (Strapi)

---

## 4. Data Model (High-Level)

### Core Entities

**Members** - member_id (authoritative) - status - join_date -
sector_id - employer_id - unit_id

**Employers** - employer_id - name - sector_id

**Units** - unit_id - employer_id - classification

**Dues Ledger** - transaction_id - member_id - amount - period - status

---

## 5. Integration Model

### Current

- Batch sync (24h)
- Direct queries

### Transitional

- Webhooks from Unionware
- Function-based adapters

### Target

- Event-driven architecture

Events: - member.created - member.updated - member.reactivated

---

## 6. Migration Strategy

### Strangler Pattern

- Introduce new registry alongside Unionware
- Sync data incrementally
- Gradually shift ownership

### Phases

1.  Extract identity linkage
2.  Introduce event outputs
3.  Build new registry services
4.  Migrate workflows
5.  Retire Unionware

---

## 7. Relationship to Other Domains

Domain Relationships:

Identity Receives member_id linkage
IdP Uses registry for validation context
Intelligence Consumes status changes
Workflow Uses registry for case grounding
Content Reads reference data

---

## 8. Key Principles

- Member ID remains Finance-controlled
- Registry is authoritative for status, not behavior
- No duplication of operational logic
- Events are the integration mechanism

---

## 9. Technology Stack Considerations

This section is intentionally directional, not final. The Administrative Registry Domain has stricter requirements than most other domains in the ecosystem because it is responsible for official institutional records, dues-related workflows, employer/unit taxonomy stewardship, and finance-adjacent administrative truth.

The recommended stack should prioritize:

- data integrity and auditability
- transactional reliability
- strong relational modelling
- controlled access and role separation
- interoperability with the Identity Domain, Workflow & Case Management Domain, and Event Backbone
- long-term maintainability by a serious engineering team

### Recommended Direction

#### Primary database

**PostgreSQL** is the strongest default recommendation for the Administrative Registry Domain.

Why:

- mature relational model
- strong transactional guarantees
- excellent support for structured institutional records
- robust indexing and constraint support
- audit-friendly schema design
- strong ecosystem for reporting, CDC, and event integration

This domain is fundamentally registry- and ledger-like in nature. That strongly favors a relational database over document-oriented alternatives.

#### Service layer / backend

A custom service layer is the preferred direction, likely built with one of:

- **TypeScript / Node.js**
- **Python**
- **Java / Kotlin** if a more enterprise-heavy implementation path is chosen

Current directional preference:

- **TypeScript / Node.js** is likely the most ecosystem-aligned choice given the broader SEIU stack direction and likely agency/developer familiarity.
- **Python** is viable where workflow-heavy admin tooling or data-processing-heavy patterns become more prominent.
- **Java/Kotlin** is viable if the registry/admin domain is treated as a more enterprise-grade transactional core and SEIU chooses a heavier internal platform posture.

#### ORM / data access

Viable options include:

- **Prisma** for fast TypeScript-based development, especially where developer velocity is important
- **Drizzle** for more explicit SQL-oriented control in TypeScript
- **SQLAlchemy** if Python is chosen
- lower-level SQL/data-access patterns where strong control is preferred over ORM abstraction

For this domain, explicit schema control is more important than rapid CRUD convenience.

#### Event emission / integration

The Administrative Registry Domain should not become a point-to-point integration hub. It should emit well-defined events into the Event Backbone.

Directional options:

- direct event publication from the service layer
- transactional outbox pattern
- change-data-capture (CDC) pattern in later maturity stages

The **transactional outbox pattern** is a strong recommendation for this domain because it reduces the risk of administrative truth changing without corresponding event emission.

#### Workflow / job handling

Administrative workflows will include:

- import jobs
- classification normalization
- reconciliation tasks
- finance/admin processing steps
- migration utilities

Directional options:

- **Temporal** for durable workflow orchestration
- queue-based worker pattern using **BullMQ**, **SQS**, or equivalent
- internal job runners for simpler early-phase tasks

If the broader platform becomes highly workflow-driven, **Temporal** is strategically attractive. If the initial implementation is lighter-weight, queue + worker patterns are sufficient.

#### Admin interface / internal tooling

This domain will likely require internal staff interfaces for:

- member record review
- employer/unit/taxonomy stewardship
- exception handling
- finance/admin review tasks
- migration and reconciliation workflows

Directional options:

- custom internal admin UI built in **Next.js**
- internal tools layer using **Retool** or similar for interim workflows
- hybrid approach: rapid internal tooling early, custom UI later

A hybrid approach is likely the most pragmatic:

- use operational tooling to accelerate internal workflows in earlier phases
- replace critical paths with custom interfaces where needed over time

### Viable Supporting Components

#### Search / reporting

For administrative lookup and internal search:

- PostgreSQL native search may be sufficient initially
- **OpenSearch / Elasticsearch** may become useful later for advanced internal lookup, audit exploration, or reporting workloads

#### File/document storage

For finance/admin attachments and registry-adjacent documents:

- **AWS S3** or equivalent object storage is the most likely fit
- documents should be metadata-linked to registry records, not embedded in core relational tables

#### Secrets / security infrastructure

Given the sensitivity of registry and finance-related workflows:

- managed secrets infrastructure should be used
- strong audit logging and role separation are mandatory
- production access should be tightly restricted

### Not Recommended as the Core Registry Foundation

The following are not strong fits as the primary technology foundation for the Administrative Registry Domain:

- **NoSQL/document databases** as the core system of record
- generic low-code workflow tools as the long-term administrative core
- embedding this domain directly into Strapi or another CMS
- overloading a marketing/CRM platform to behave like a finance-grade registry system

### Strategic Recommendation

The Administrative Registry Domain should be built as a **transactionally reliable relational domain**, most likely centered on:

- **PostgreSQL**
- a custom service layer
- explicit event emission into the Event Backbone
- internal operational tooling for staff workflows
- strong schema governance from day one

This domain should feel closer to a **modern administrative platform** than to a content system or a conventional CRM.

---

## 10. Open Questions

- Unionware API/webhook capability
- Data cleanup strategy
- Employer taxonomy normalization

---

## 11. Next Steps

- Define detailed schema
- Validate integration with IdP
- Begin Unionware adapter design
