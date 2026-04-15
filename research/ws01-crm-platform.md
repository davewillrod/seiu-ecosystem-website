# CRM & Platform — Strategic Research Document

## WS-01 · Research Reference

**Last updated:** April 2026
**Status:** Active — foundational decisions made, significant open questions remain
**Companion artifacts:** Unified data model (pending), SSO & identity architecture (pending), Node integration map (pending), CRM agency brief (pending)

---

## Purpose

This document is the knowledge base for all CRM, identity, and platform integration decisions in the SEIU ecosystem. It records what has been established, the reasoning behind each decision, what remains open, and the constraints that shape the work. Claude Code should read this document when building any WS-01 artifact page.

---

## 1. The Core Problem

SEIU Healthcare currently operates across **eight disconnected platforms** and **five separate login environments**. A member who touches the Training Centre, WorkersFirst, My65+, and the mobile app is treated as four different people. There is no unified member record, no cross-node trigger logic, and no system capable of routing a member intelligently from one ecosystem node to the next.

The consequences are structural and economic:

- Full acquisition cost paid independently at each node for the same person
- Lifetime value of multi-node engagement is unrealized because nodes don't communicate
- Political wins (like the April 2026 WSIB expansion) open acquisition windows that the current infrastructure cannot absorb at scale
- Attrition that a functioning engagement health system would catch goes undetected until the member is already gone

The CRM is not a technology preference. It is the prerequisite for the ecosystem to function as a connected system rather than a collection of unrelated services. It is the system required to unify identity, lifecycle state, and cross-node intelligence.

---

## 2. The Existing Platform Landscape

Understanding the current state of each node is essential before defining the target architecture.

### Unionware (existing CRM/ERP)

- Current system of record for all member data
- Holds 350,000+ records (includes historical/inactive members)
- **Data quality is highly inconsistent** — many rows have missing fields
- Only field guaranteed non-null across all records: **member ID** (Finance-assigned, never duplicated)
- Email is a secondary identifier — used for mobile app 2FA, but absent on many older/inactive records
- SIN (Social Insurance Number) is stored but masked, handled exclusively by Finance
- Member creation is Finance-controlled: triggered by dues reports from employers, or by MSC intake forwarded to Finance
- **The mobile app does not create member records** — it authenticates existing members using a pre-issued member ID + email 2FA via Strapi middleware
- Unionware also holds a contacts/potential members table for prospects — managed by MSC/Finance, not by digital systems

### Strapi (content middleware)

- Self-hosted Node.js application at `console.seiuhealthcare.ca`
- Currently handles two jobs: content publishing (editorial layer for mobile app) and auth handoff between mobile app and Unionware
- In the target architecture, auth is removed from Strapi's responsibility entirely — the IdP takes over
- Content publishing role is retained and extended (see WS-03 research doc)

### Mobile app

- Fully owned and operated by SEIU
- Auth flow: member enters email → Strapi validates against Unionware → 2FA confirmation → session established
- Content served from Strapi
- In target architecture: auth migrates to IdP; Strapi retains content delivery role

### Training Centre (partially live)

- Uses MySIS as its own CRM/student information system
- Canvas LMS for hosting modules and learning content
- Microsoft suite (education licensing) for productivity
- **Governance is unsettled** — the Training Centre operator has been drifting from union priorities; this must be resolved before integration can be scoped (see WS-04)
- Not yet fully live — significant changes anticipated

### WorkersFirst

- Live web and mobile application
- Dedicated backend and auth system — **not connected to Unionware**
- Members active only in WorkersFirst carry a specific Unionware status: "Inactive M Active A"
- Auth system will need rework to accept IdP tokens (SSO migration)
- Node audit required to determine backend stack and API surface

### My65+

- Live web and mobile application
- Dedicated backend and auth system — **not connected to Unionware**
- Federal government investment of $29.9M backing the platform
- $1,000 enrollment bonus and up to $3,000 annual matching contributions for eligible homecare workers
- **Highest priority node for the Home Care campaign** — the enrollment bonus is the primary conversion mechanism for newly reachable homecare workers
- May carry regulatory or data residency constraints given federal funding — must be assessed in WS-3 audit before SSO migration is scoped
- Auth system will need rework to accept IdP tokens (SSO migration)

### UnionSavings

- Member discount and perks platform
- Ambient retention layer — keeps the SEIU relationship present between significant life events
- Lower integration priority than other nodes

---

## 3. CRM Platform Strategy

### Decision

No CRM platform has been selected.

The correct approach is:
→ Evaluate multiple CRM architectures against SEIU-specific requirements.

---

### Evaluation Categories

#### Option A — Enterprise CRM (Salesforce, Dynamics)

**Strengths:**

- Mature ecosystem
- Built-in automation tools
- Scalable infrastructure

**Weaknesses:**

- Rigid data models
- Expensive at scale (Enterprise CRM cost is primarily driven by internal user licensing and feature tiers, not by the number of member records. However, large-scale data storage, API usage, and marketing automation can introduce additional costs at SEIU’s scale.)
- Requires heavy customization to model lifecycle intelligence
- Event-driven patterns are not native (must be layered)

**Fit for SEIU:**

- Viable, but requires significant abstraction layers

---

#### Option B — Composable / Hybrid CRM (Recommended Direction)

CRM =:

- Core database (Postgres / managed)
- Event layer
- Workflow / Rules engine
- Custom services

**Strengths:**

- Full control of data model
- Matches ecosystem complexity
- Aligns with event-driven architecture

**Weaknesses:**

- Requires engineering investment
- Slower initial velocity & delivery
- Requires strong governance

**Fit for SEIU:**

- Best long-term alignment with ecosystem complexity and intelligence goals

---

### Option C — Hybrid CRM (Enterprise Core + Custom Layer)

Example:
• Salesforce (core records)
• Custom services (events, intelligence, orchestration)

Strengths:
• Faster initial deployment than full custom
• Flexibility where needed
• Reduces vendor lock-in risk

Weaknesses:
• Architectural complexity
• Requires careful boundary definition

Fit for SEIU:
• Strong pragmatic option (realistic path)

---

#### Option D — Lightweight CRM + Custom Layer

Example:

- HubSpot + custom services

**Strengths:**

- Fast to deploy
- Lower initial cost

**Weaknesses:**

- Cannot support complex lifecycle orchestration
- Breaks under multi-node ecosystem logic
- Poor long-term scalability

**Fit for SEIU:**

- Not viable long-term

---

### Final Position

The CRM is not a tool decision — it is an architecture decision.

The chosen platform must support:

- unified identity resolution
- event-driven integration
- complex lifecycle state tracking
- cross-node intelligence

---

## 3.1 Event-Driven Architecture

All system integrations follow an event-driven model.

### Definition

An event-driven architecture is a model where systems emit events representing state changes, and other systems react to those events independently.

### Why

- Prevent tight coupling
- Enable independent node evolution
- Support CRM intelligence layer

### Strategic Importance

The event layer enables:
• cross-node coordination
• real-time lifecycle updates
• intelligence signals (risk, opportunity)
• future AI/analytics capabilities

### Example Flow

Canvas or MySIS (Training Centre) → emits:
`credential.completed`

CRM:

- updates member state
- triggers WorkersFirst nudge

### Core Components

#### Event Producers

    •	Training Centre (e.g., credential completion)
    •	WorkersFirst (e.g., shift completion)
    •	My65+ (e.g., enrollment)
    •	Campaign systems (e.g., lead capture)

#### Event Broker (Backbone)

Examples:
• AWS SNS/SQS
• Kafka
• Pub/Sub

Responsibilities:
• Receive events
• Distribute to subscribers
• Ensure reliability and retry

#### Event Consumers

    •	CRM (primary intelligence layer)
    •	Strapi (content projection updates)
    •	Analytics systems
    •	Future AI systems

### Relationship to WS-03 (content system)

    •	WS-03 defines how content systems consume events
    •	WS-01 defines how lifecycle and intelligence systems react to events

Both use the same event backbone.

## 4. Identity Architecture

### The core identity problem

SEIU's member creation model is Finance-controlled, not self-serve. Member records originate from dues reports processed by Finance, or from MSC intake forwarded to Finance. The mobile app does not create members — it authenticates existing ones using a pre-issued member ID.

This means an IdP-first model (where the IdP is the root identity source) cannot simply be stood up and seeded from a clean list. The IdP must be reconciled with Unionware's existing member records and Finance's member creation workflow.

### Key identity concepts

**Member ID:** Assigned by Finance at member creation. The only guaranteed non-null field in Unionware. Never reissued to new members — even inactive records permanently hold their member ID. This prevents collision in any new system.

**Email:** Secondary identifier. Used for mobile app 2FA. Missing on many older/inactive records. The practical key for IdP seeding of the active member population.

**SIN:** Stored in Unionware, handled exclusively by Finance. Never migrated to the new CRM or IdP in the current architecture. Will eventually move to the new system when Finance's dues processing workflow migrates.

### Identity resolution vs. authentication federation

These are two different problems that must be separated:

**Authentication federation (full SSO):** Every node delegates login to a central IdP. A user clicks "sign in" anywhere and gets routed through Auth0 or Okta. Requires touching every node's auth system.

**Identity resolution:** The CRM has a reliable way to say "the Canvas user with ID X is the same person as the My65+ account with ID Y." Can be established through a master identity index seeded from Unionware exports without requiring every node to have migrated its login system yet.

Phase 0 and Phase 1 require identity resolution. Full authentication federation is achieved progressively as each node migrates to IdP tokens.

### IdP platform

Auth0 or Okta — both are viable. Selection deferred to the technical agency scoping conversation, but the decision criteria are:

- Native SAML/OIDC support (required for Canvas integration)
- Bulk user import capability (required for seeding 50k+ active member records)
- Custom claims support (required for CRM-derived lifecycle claims in tokens)
- Canadian data residency option (preferred given member data sensitivity)

### Identity vs Authorization (Explicit)

- IdP handles authentication only
- CRM and applications handle authorization

Roles are NOT stored in IdP.

---

## 5. Member Population Tiering

### Active member population (Phase 1 IdP seeding priority)

Estimated 50,000+ records with both a member ID and a valid email address. This includes:

- Standard active members across all sectors
- WorkersFirst-only members with Unionware status "Inactive M Active A" — still active in the ecosystem, just in a different membership state

These 50,000+ records constitute the IdP seeding scope for Phase 1. They are bulk-exported from Unionware, email-matched, and IdP accounts created with member ID stored as a custom claim.

### Active members without valid email (Phase 2 — operational catchup)

Not bulk-seeded. IdP account created when the member makes contact with MSC or engages with any digital touchpoint. MSC is prompted to collect email on every member interaction going forward.

### Historical / inactive records (archive — no action)

300,000+ records. No IdP accounts created proactively. Unionware remains the permanent historical archive. If a member reactivates, Finance updates Unionware status and a reactivation webhook triggers IdP account creation on demand.

### Net new Home Care prospects (Phase 0)

Not Unionware members yet — they are prospects. Phase 0 creates IdP accounts for them at first campaign touchpoint. When they convert to membership, Finance creates the Unionware record from the dues report. The IdP account is then linked to the new member ID via webhook.

### Reactivation flow

Finance updates member status in Unionware → Unionware emits reactivation webhook → IdP creates or re-enables account using member ID + email → if no email on file, MSC notified to collect it before digital access granted → CRM record created or linked from archive.

---

## 6. Phased Architecture

### Why iterative is the only viable approach

A 12-month "big bang" CRM deployment is not appropriate for SEIU's situation because:

- The Home Care campaign is live now and cannot wait for full infrastructure
- WorkersFirst and My65+ node audit findings will change Phase 2 scope in ways we can't fully predict today
- The Training Centre governance question must be resolved before Training Centre integration can be scoped
- Unionware data quality issues make a single-pass migration impossible

The iterative approach allows the Home Care campaign to run on functional (if incomplete) infrastructure while deeper integrations are built progressively. Integration evolves in parallel with the WS-03 integration model (webhooks → functions → event backbone), with the CRM becoming the primary consumer of ecosystem events in later phases.

### Phase 0 — Home Care viable core (Weeks 1–8)

**Goal:** Unblock the Home Care campaign with minimum viable infrastructure.

**What is built:**

- IdP tenant stood up (Auth0 or Okta) — this is the one true hard gate for Phase 0
- New Home Care prospect contacts enroll via IdP from day one — clean canonical identity from first touchpoint
- My65+ enrollment webhook — fires when a Home Care prospect creates a My65+ account, carries email, creates or matches a prospect record in the CRM
- Basic campaign contact ingestion pipeline — landing page form submission → CRM prospect record created → tagged with source, sector, geographic region
- Two-step automated onboarding sequence: membership offer → My65+ enrollment prompt (fired 24–48 hours after initial contact)
- Interim prospect records managed in Salesforce (not Unionware) — when a prospect converts to membership, Finance creates the Unionware record as usual; CRM prospect record is then linked to the new member ID

**What is explicitly NOT in Phase 0:**

- Full SSO across existing nodes — deferred
- Canvas / MySIS integration — deferred to Phase 1
- WorkersFirst full integration — deferred to Phase 2
- Unionware data migration for existing members — runs in parallel, not a Phase 0 gate
- Nudge rules engine — deferred to Phase 3

**The My65+ webhook is the single most important technical dependency for Phase 0.** Without it, the membership → My65+ sequence cannot be automated. This requires a conversation with the My65+ technical team immediately. Even if the webhook cannot be delivered immediately, Phase 0 can launch with a manual interim process — but the webhook should be treated as the highest-priority technical negotiation of the entire programme.

**The IdP is the only true hard gate.** Setting up the IdP tenant (2–3 weeks of infrastructure work) is what allows new Home Care contacts to enroll with clean canonical identity from day one. Everything else in "pre-build" runs in parallel with Phase 0, not before it.

### Phase 1 — Identity layer + Training Centre (Weeks 8–20)

**Goal:** SSO goes live for the nodes SEIU fully controls. First cross-node journey activated.

**What is built:**

- SSO identity provider fully configured (was started in Phase 0 for new contacts; now extended to existing members)
- 50k+ active members bulk-seeded into IdP from Unionware export
- Mobile app auth migrated from Strapi/Unionware flow to IdP tokens — Strapi's auth role retired
- Canvas configured as SAML/OIDC service provider against IdP
- MySIS user records migrated to IdP — canonical IDs assigned
- Training Centre → WorkersFirst trigger activated (weight 70) — credential completion events from Canvas now carry verified canonical member ID and fire CRM state updates
- Training Centre → membership conversion trigger activated (weight 60)

**Gate for Phase 1:** Unionware/IdP architecture decision must be made during Phase 0. Three options:

- Option A: IdP bridges to Unionware (Unionware remains identity root)
- Option B: Parallel identity index with sync (recommended — clean separation of CRM intelligence from dues administration)
- Option C: Unionware as a node (most aggressive, most disruptive)
  Option B is the recommended path but requires confirming Unionware data quality for the active member population.

**Why Training Centre before WorkersFirst/My65+ in Phase 1:**
SEIU has full control over the Training Centre (Canvas, MySIS). No third-party backend negotiation required. Canvas has native SAML support. This makes it the lowest-risk SSO migration and proves the pattern before tackling the more complex third-party backends.

### Phase 2 — WorkersFirst + My65+ full integration (Weeks 20–36)

**Goal:** Third-party node backends migrated to SSO. Placement and retirement data flowing into unified member record. Full trigger reliability across the highest-value conversion journeys.

**What is built:**

- WorkersFirst auth system migrated to IdP token validation (scope depends on audit findings)
- Shift event schema implemented — shift completion, tenure threshold, stable placement events flow to CRM
- WorkersFirst → membership conversion triggers activated (weight 50)
- My65+ auth system migrated to IdP token validation (scope depends on audit findings and federal compliance assessment)
- My65+ savings milestone events flow to CRM
- My65+ → membership conversion trigger activated (weight 55)

**Key risk:** My65+ has federal government investment attached — there may be regulatory or data residency constraints on how member identity is stored and federated through a central SSO provider. This must be surfaced in the WS-3 audit before Phase 2 scope is confirmed. If constraints exist, a compliance-preserving alternative architecture must be designed.

### Phase 3 — Intelligence layer (Weeks 28–40)

**Goal:** Full nudge engine live. Risk scoring and opportunity signals operational. Ecosystem fully connected.

**What is built:**

- Engagement health scoring model — behavioral indicators, risk thresholds, opportunity signals
- Attrition risk model — leading indicators of member drift surfaced before attrition occurs
- Opportunity signal dashboard — high-engagement members flagged for leadership development, political activism pathways
- UnionSavings engagement feed — engagement drop-off as a leading attrition indicator
- Full nudge rules engine — every weighted connection from the ecosystem connection map translated into CRM trigger logic
- A/B testing framework for nudge content and timing
- Strapi content personalization hooks — CRM-derived lifecycle claims passed into IdP tokens, Strapi uses claims to filter content

---

## 7. The Trigger and Nudge Architecture

### Weighted connection map (from ecosystem-breakdown.md)

Every relationship between ecosystem nodes has a direction, a weight, a trigger event, and a business logic rule. The CRM operationalizes these as trigger rules. Key connections:

| Connection                        | Weight | Trigger event                                                            |
| --------------------------------- | ------ | ------------------------------------------------------------------------ |
| Training Centre → WorkersFirst    | 70     | Credential completion event from Canvas LMS                              |
| WorkersFirst → Training Centre    | 30     | Shift tenure threshold crossed                                           |
| Training Centre → Full membership | 60     | Program completion percentage threshold                                  |
| WorkersFirst → Full membership    | 50     | Three pathways: stable placement, tenure/volume threshold, employer type |
| Home Care → Full membership       | 80     | Campaign acquisition event (highest priority)                            |
| Home Care → My65+                 | 75     | Second beat of Home Care onboarding (24–48hr after membership offer)     |
| Home Care → Training Centre       | 45     | 30–60 days post-membership, contingent on My65+ enrollment               |
| Home Care → WorkersFirst          | 40     | After membership and My65+ confirmed                                     |
| My65+ → Full membership           | 55     | My65+ enrollment event for non-member contact                            |
| UnionSavings → All nodes          | 15     | Engagement drop-off signal (ambient, triggers re-engagement)             |

### Nudge failure modes to avoid

- **Premature nudging:** Conversion prompt arrives before the member has experienced enough value from the current node to trust the next one
- **Repetitive nudging:** Same prompt fires repeatedly without response, becomes noise. Implement suppression rules and response tracking.
- **Irrelevant nudging:** Prompt triggered by incomplete state data that misreads where the member actually is in her journey. Requires robust state taxonomy.

---

## 8. CRM Capabilities Required

The CRM is not a monolithic replacement for all systems. It is the coordination and intelligence layer across specialized systems. Five core capabilities, in dependency order:

### Capability 1: Unified member record

One record per person aggregating relationship state across all nodes. Requires master member identity system — unique identifier persisting across all platforms, deduplication on email match, merging of new activity into existing records.

### Capability 2: Relationship state tracking

Dynamic tracking of member lifecycle stage across all nodes. Not just contact data — current state, engagement level, proximity to next conversion moment. Requires a defined state taxonomy and a rules engine that updates state in real time based on incoming node events.

### Capability 3: Intelligent nudge engine

Every weighted connection translated into trigger logic. Multi-conditional rules: state X AND engagement signal Y AND time elapsed Z. Channel selection, timing controls, suppression rules, A/B testing hooks.

### Capability 4: Risk and opportunity signals

Engagement health scores calculated continuously. High-risk records surfaced for re-engagement before attrition. High-opportunity records surfaced for leadership development and political activism pathways. Dashboard for the teams responsible for acting on signals.

### Capability 5: Cohort onboarding at scale

Rapid ingestion of large contact cohorts from campaign acquisition. Bulk deduplication against existing records. Immediate routing into appropriate onboarding sequences. Must handle thousands of new contacts in a compressed timeframe without degrading individual journey management for existing members.

---

## 9. Unionware Migration Principles

- **Unionware is not being replaced — it is being complemented.** Unionware continues as the system of record for dues administration, bargaining unit assignments, and historical member records. The new CRM owns member lifecycle intelligence.
- **Option B architecture (recommended):** New CRM has its own identity store seeded from Unionware. A sync keeps dues/status fields aligned between the two systems. Unionware's data model does not constrain the CRM's data model.
- **Member ID generation stays in Unionware / Finance.** The CRM stores member ID as a foreign key reference. It never generates member IDs.
- **SIN stays in Unionware** until Finance's dues processing workflow migrates to the new system (future phase, not current scope).
- **Historical records stay in Unionware.** 300k+ inactive records are not migrated. Unionware is the permanent archive.
- **Data quality reality:** Unionware records are highly inconsistent. A clean migration of the full 350k record set is not feasible as a pre-launch exercise. The approach is tiered seeding: active members with email first (est. 50k+), operational catchup for the rest over time.

## 9.1 Migration Strategy — Strangler Pattern

Unionware is not replaced in a single phase.

Instead:

- New systems introduced alongside
- Traffic gradually redirected
- Legacy functionality retired incrementally

---

## 10. Open Questions

These are unresolved and block downstream work.

**Training Centre governance (blocks Phase 1 scoping)**
The Training Centre operator has been drifting from union priorities. The question of whether the Training Centre remains a permanent internal SEIU institution or is externalized is live and unsettled. This must be resolved by executive decision before the Training Centre node integration can be properly scoped. See WS-04 research doc.

**WorkersFirst node audit (blocks Phase 2 scoping)**
Backend stack, auth system, data schema, API availability, and SSO migration complexity are unknown. The audit is the first step of Phase 2 planning.

**My65+ node audit + federal compliance assessment (blocks Phase 2 scoping)**
Backend stack, auth system, and enrollment flow need to be assessed. Additionally, the federal government investment in My65+ may create regulatory constraints on identity federation that must be understood before SSO migration can be designed.

**Unionware/IdP architecture decision (must be made during Phase 0)**
Option A (IdP bridges to Unionware), Option B (parallel identity index with sync), or Option C (Unionware as node). This decision gates the Phase 1 design. It requires input from whoever manages Unionware day-to-day and an honest assessment of Unionware's webhook/API capability.

**My65+ webhook delivery timeline**
The single most important technical dependency for Phase 0. The My65+ team needs to be engaged immediately to determine feasibility and timeline.

**CRM vendor and technical agency selection**
No CRM platform is currently recommended. The technical agency scoping conversation will either confirm custom, or Salesforce, Dynamics, etc. or surface a better-fit alternative. This conversation should be briefed with the WS-01 CRM agency brief artifact once drafted.

**Active member email coverage**
The 50k+ estimate for active members with valid email addresses is directional. The actual count from a Unionware export will determine Phase 1 IdP seeding scope and timeline.

---

## 11. Key Decisions Summary

| Decision             | Outcome                                            | Confidence  | Date       |
| -------------------- | -------------------------------------------------- | ----------- | ---------- |
| CRM platform         | Not yet selected — evaluation in progress          | Open        | April 2026 |
| Architecture pattern | Event bus + iterative node integration             | Decided     | April 2026 |
| IdP approach         | Auth0 or Okta — selection pending                  | Directional | April 2026 |
| Unionware role       | Retained as dues/archive system of record          | Decided     | April 2026 |
| Member ID authority  | Finance / Unionware — never the new CRM            | Decided     | April 2026 |
| SIN handling         | Stays in Unionware — not migrated in current scope | Decided     | April 2026 |
| Phase 0 hard gate    | IdP tenant stood up (2–3 weeks)                    | Decided     | April 2026 |
| My65+ priority       | Highest-priority node for Home Care campaign       | Decided     | April 2026 |
| Historical records   | Stay in Unionware — no migration                   | Decided     | April 2026 |
| Strapi auth role     | Retired when mobile app migrates to IdP (Phase 1)  | Decided     | April 2026 |
