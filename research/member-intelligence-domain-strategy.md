# Member Intelligence Domain Strategy

## Purpose

Defines the Member Intelligence Domain as the lifecycle and
orchestration layer that understands each person's relationship with
SEIU and determines what should happen next (journeys, nudges,
eligibility signals, and segmentation).

---

## 1. Domain Overview

The Member Intelligence Domain answers:

> "Given who this person is and what has happened, what should we do
> next?"

It provides: - Unified lifecycle state - Engagement tracking across
nodes - Segmentation and cohorting - Triggering of next-best actions
(nudges) - Risk/opportunity scoring

It is the functional successor to what is commonly called "CRM," but is
more accurately an **intelligence and orchestration layer**.

---

## 2. Core Responsibilities

### Owns

- Lifecycle state (prospect → member → inactive → reactivated, etc.)
- Engagement signals (events from apps/nodes)
- Cohorts and segments
- Trigger rules and nudge generation
- Risk/opportunity scoring

### Does NOT Own

- Authentication (IdP)
- Person identity (Identity Domain)
- Official membership truth (Administrative Registry)
- Case execution (Workflow & Case Management)
- Content storage (Strapi)

---

## 3. Current State

### Fragmented Intelligence

- No unified lifecycle view per person
- Engagement data scattered across nodes (mobile, WorkersFirst, TC,
  etc.)
- Limited or no cross-node orchestration
- Campaigns and programs operate in silos

### Consequences

- Inconsistent member experiences
- Missed engagement opportunities
- Poor visibility into journeys and outcomes
- Limited ability to scale initiatives like Home Care onboarding

---

## 4. Target State

### Unified Lifecycle Model

Each `person_id` has a continuously updated lifecycle profile:

- stage (prospect, onboarding, active, at-risk, inactive, reactivated)
- attributes (sector, employer, role, region)
- engagement signals (logins, completions, interactions)
- derived states (eligible_for_program_X, at_risk_of_churn, etc.)

### Orchestration Engine

Based on lifecycle + events:

- evaluate rules
- determine next-best-actions
- emit nudge/trigger events to applications

---

## 5. Data Model (High-Level)

### Core Entities

**lifecycle_state** - id - person_id - state_type - value -
effective_at - ended_at

**engagement_signal** - id - person_id - source (mobile, WF, TC, etc.) -
event_type - payload (JSON) - timestamp

**cohort_membership** - id - person_id - cohort_name - joined_at -
exited_at

**trigger_rule** - id - name - condition_definition -
action_definition - active

**nudge_event** - id - person_id - trigger_rule_id - destination
(mobile, WF, email, etc.) - payload - created_at - delivered_at

---

## 6. Integration Model

### Inputs (consumes)

- Identity Domain:
  - person_id linkage
- Administrative Registry:
  - member status changes
  - employer/unit updates
- Applications / Nodes:
  - engagement events
  - usage/activity signals
- Workflow Domain:
  - support signals (opened/closed cases, friction)

### Outputs (emits)

- nudge.triggered
- cohort.entered
- lifecycle.updated
- risk.score_changed
- opportunity.identified

These are consumed by: - Mobile app - WorkersFirst - My65+ - Training
Centre - Workflow domain (for follow-up tasks)

---

## 7. Lifecycle Modeling

### Example Lifecycle Stages

- Prospect
- Onboarding (pre-member)
- Active Member
- Engaged Member
- At-Risk Member
- Inactive Member
- Reactivated Member

### Key Principle

> Lifecycle state is derived, not manually set.

It is computed from: - registry signals - engagement signals - workflow
signals

---

## 8. Nudge / Trigger Engine

### Function

Evaluates: - lifecycle state - engagement patterns - eligibility signals

Produces: - contextual prompts/actions delivered via applications

### Examples

- "Complete your training pathway"
- "You are eligible for My65+"
- "New shifts available nearby"
- "Finish your onboarding"

### Design Principles

- event-driven
- idempotent
- explainable (rules can be audited)
- configurable (not hard-coded)

---

## 9. Relationship to Other Domains

Domain Relationship

---

Identity Anchored on person_id
Registry Consumes official status
IdP Consumes login/auth signals
Workflow Consumes service signals
Content Uses Strapi to deliver content payloads
Applications Primary delivery surfaces for nudges

---

## 10. Technology Stack Considerations

### Core Database

**PostgreSQL**

Why: - structured lifecycle + event data - joins across identity and
signals - supports JSON for flexible payloads

### Event Backbone Integration

The Member Intelligence Domain consumes events from the shared ecosystem Event Backbone.

It requires its own event-consumption and processing capabilities, such as:

- consumer workers / subscribers
- lifecycle projection updaters
- rule-evaluation processors
- nudge generation/dispatch workers

Depending on scale and complexity, these may operate directly against the shared backbone or use an internal queue/worker model for downstream processing.

The selection of Kafka, SNS/SQS, Pub/Sub, or another messaging platform belongs to the Event Backbone strategy, not to the Member Intelligence Domain itself.

### Processing Layer

- TypeScript (Node.js) or Python services
- Worker-based architecture for rule evaluation

### Rule Engine

Options: - custom rule evaluation engine (recommended initially) -
later: Temporal or workflow engine if complexity increases

### Storage Patterns

- append-only event tables for engagement signals
- derived tables for lifecycle state
- materialized views for fast reads

### Not Recommended

- overloading a marketing automation tool as the core intelligence
  layer
- embedding orchestration logic inside each application
- relying solely on batch processing

---

## 11. Migration Strategy

### Phase 1 --- Foundation

- establish event ingestion (from mobile, WF, TC, etc.)
- build basic lifecycle state model

### Phase 2 --- Initial Intelligence

- define key lifecycle stages
- implement basic trigger rules
- deliver simple nudges

### Phase 3 --- Expansion

- integrate more nodes
- introduce scoring (risk/opportunity)
- refine segmentation

### Phase 4 --- Full Orchestration

- real-time event processing
- advanced rule engine
- cross-node journey orchestration

Pattern: iterative, event-driven evolution

---

## 12. Key Principles

- person_id is the anchor
- lifecycle is derived, not owned by a single system
- intelligence is centralized, execution is distributed
- events are the source of truth for behavior
- rules must be auditable and explainable

---

## 13. Open Questions

- event schema standardization
- real-time vs near-real-time processing requirements
- rule engine complexity vs maintainability trade-offs
- how much intelligence should be exposed to applications vs kept
  internal

---

## 14. Next Steps

- define event schema contracts
- design lifecycle state model in detail
- implement ingestion pipeline
- align with Identity + Registry events
- build initial trigger/nudge framework
