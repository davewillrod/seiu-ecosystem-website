# Event Backbone Strategy

## Purpose

Defines the Event Backbone as the shared integration layer responsible
for transporting state-change events across the SEIU ecosystem in a
reliable, decoupled, and scalable way.

This domain exists so that specialized systems do **not** need to embed
each other's business logic or maintain brittle point-to-point
integrations. It is the connective tissue between:

-   Administrative Registry
-   Identity
-   IdP / SSO
-   Member Intelligence
-   Workflow & Case Management
-   Strapi / Content
-   Domain applications such as the mobile app, WorkersFirst, My65+, and
    Training Centre systems

This document is intentionally focused on the **shared event layer
itself**. It does not redefine the internal processing logic of Member
Intelligence, Workflow, or other domains. Those domains consume and emit
events through this backbone, but they do not own it.

------------------------------------------------------------------------

## 1. Domain Overview

The Event Backbone answers one question:

> "How do systems communicate state changes without becoming tightly
> coupled to each other?"

It provides:

-   shared event transport
-   decoupled publish/subscribe communication
-   reliable fan-out to multiple consumers
-   retry and failure-handling patterns
-   delivery guarantees appropriate to institutional workflows
-   a standard event envelope and contract model
-   a migration path from today's webhooks and batch syncs to a more
    mature event-driven ecosystem

It does **not** define business truth. It does **not** replace APIs
where synchronous reads are required. It does **not** replace domain
logic inside producing or consuming systems.

------------------------------------------------------------------------

## 2. Why the Event Backbone Exists

SEIU's ecosystem is intentionally composed of multiple specialized
domains and node applications. That architecture only works if those
systems can remain independent while still reacting to one another.

Without a backbone, the ecosystem degrades into one or more of the
following:

-   point-to-point integrations
-   duplicated business logic across systems
-   direct system-to-system dependencies
-   fragile orchestration embedded in application code
-   slow batch synchronization for workflows that should be
    near-real-time
-   poor observability of what changed, when, and why

The Event Backbone exists to prevent that.

It allows:

-   the Administrative Registry to emit member and employer changes
-   the Identity Domain to emit person-linkage and merge events
-   the IdP to emit authentication/account events where useful
-   node applications to emit engagement and operational signals
-   Workflow & Case Management to emit service-state signals
-   Member Intelligence to consume those signals and emit downstream
    actions
-   Strapi and other consumers to update projections without owning
    producer logic

------------------------------------------------------------------------

## 3. Current State

SEIU is **not** starting from zero, but the current integration model is
fragmented and inconsistent.

## 3.1 Current-state patterns

Across the ecosystem today, integration takes multiple forms:

-   real-time validation against Unionware in specific flows
-   24-hour batch synchronization into shadow data layers
-   direct webhooks in isolated places
-   Strapi acting as both content layer and partial middleware
-   point-to-point logic embedded in individual systems
-   manual handoffs and administrative correction steps

Examples already observed include:

-   the mobile app stack maintaining a MySQL shadow layer synchronized
    from Unionware on a 24-hour batch cycle
-   partial event-like behavior via webhooks for training completion and
    survey interactions
-   Strapi-mediated logic in the mobile context
-   node-specific auth systems and data stores that do not yet
    participate in a shared institutional event model

## 3.2 Current-state issues

The current state creates several architectural problems:

### Coupling

Producer systems often need to know too much about their consumers.

### Inconsistency

Some workflows are near-real-time, others are daily batch, others are
manual.

### Hidden logic

Business reactions are often buried inside application-specific code or
middleware.

### Weak fan-out

A single state change often needs to update multiple downstream systems,
but the current approach does not handle this cleanly.

### Limited observability

There is no shared, institutionally visible stream of state changes
across the ecosystem.

------------------------------------------------------------------------

## 4. Target State

The target state is a **shared institutional event layer** that all
major domains and node systems can publish to and subscribe from.

## 4.1 Core target-state characteristics

The Event Backbone should be:

-   **shared** across the ecosystem
-   **asynchronous by default** for state-change propagation
-   **durable** enough for institutional workflows
-   **observable** with monitoring, retry, and dead-letter handling
-   **contract-driven** with explicit event schemas
-   **idempotent-friendly** so consumers can safely handle duplicate
    delivery
-   **evolution-friendly** so systems can be replaced without breaking
    downstream consumers

## 4.2 What target-state event flow looks like

Example:

1.  Administrative Registry records a member reactivation
2.  Registry publishes `member.reactivated`
3.  Event Backbone fans out to subscribers
4.  Identity consumes event and links the person correctly
5.  Member Intelligence updates lifecycle state
6.  Workflow Domain may open a follow-up task if email is missing
7.  Analytics/reporting records the event
8.  Any future subscriber can react without the Registry needing to know
    about it

This is the institutional pattern the backbone exists to enable.

------------------------------------------------------------------------

## 5. Responsibilities and Boundaries

## 5.1 Owns

The Event Backbone owns:

-   event transport
-   publish/subscribe routing
-   delivery/retry mechanics
-   dead-letter handling
-   topic or queue structure
-   event envelope standards
-   shared event security and transport policies
-   observability of event movement through the system

## 5.2 Does NOT own

The Event Backbone does **not** own:

-   canonical identity
-   member registry truth
-   lifecycle intelligence
-   workflow execution
-   content publishing logic
-   application authorization
-   domain-specific business logic

It is a **transport and integration layer**, not a business domain.

## 5.3 Relationship to APIs

Events are not a complete replacement for APIs.

Use the Event Backbone when: - a state change occurred - multiple
systems may need to react - asynchronous propagation is acceptable or
preferred - decoupling is strategically important

Use APIs when: - an immediate synchronous read is required - a
user-facing request needs a direct answer - a system needs current
operational data rather than historical state-change propagation

The ecosystem should use **events for propagation** and **APIs for
direct reads**.

------------------------------------------------------------------------

## 6. Event Model

## 6.1 What counts as an event

An event should represent something meaningful that happened in a
domain.

Good events represent: - a state change - a completed action - a
business milestone - a workflow transition - an identity linkage or
merge

Bad events are: - low-level implementation noise - generic logging
messages - duplicated "status ping" records - events that contain no
stable domain meaning

## 6.2 Examples of domain events

### Administrative Registry

-   `member.created`
-   `member.updated`
-   `member.status_changed`
-   `member.reactivated`
-   `member.taxonomy_changed`
-   `dues.processed`

### Identity

-   `person.created`
-   `identity.linked`
-   `identity.merged`
-   `person.reactivated`

### IdP / SSO

-   `auth.account.created`
-   `auth.login.succeeded`
-   `auth.account.disabled`

### Member Intelligence

-   `lifecycle.updated`
-   `cohort.entered`
-   `risk.score_changed`
-   `opportunity.identified`
-   `nudge.triggered`

### Workflow & Case Management

-   `case.created`
-   `case.assigned`
-   `case.updated`
-   `case.closed`
-   `grievance.opened`

### Node applications

-   `credential.completed`
-   `training.enrollment.started`
-   `workersfirst.shift.completed`
-   `workersfirst.stable_placement.achieved`
-   `my65plus.enrolled`

------------------------------------------------------------------------

## 7. Producer and Consumer Model

## 7.1 Producers

A producer is any system that publishes domain events because something
meaningful happened in its own boundary.

Examples: - Administrative Registry publishes member and dues events -
Identity publishes linkage and merge events - WorkersFirst publishes
placement/shift milestones - Training systems publish credential and
enrollment events - My65+ publishes enrollment and savings milestones -
Workflow publishes case-state signals

### Producer rule

> A producer publishes events about changes inside its own domain.\
> It does not publish events on behalf of another domain.

That keeps ownership clean.

## 7.2 Consumers

A consumer is any system that subscribes to relevant events and reacts
inside its own boundary.

Examples: - Identity consumes `member.created` - Member Intelligence
consumes almost all cross-domain lifecycle signals - Workflow may
consume signals that require human follow-up - Strapi may consume
selected content-projection or reference-content changes - analytics
systems consume broad event streams for reporting

### Consumer rule

> A consumer decides what the event means for its own domain.\
> The producer does not embed the consumer's reaction logic.

That is the core decoupling principle.

------------------------------------------------------------------------

## 8. Event Contract Standards

## 8.1 Standard envelope

Every event should follow a common envelope structure.

Suggested envelope:

``` json
{
  "event_id": "uuid",
  "event_type": "member.reactivated",
  "event_version": 1,
  "occurred_at": "2026-04-22T20:00:00Z",
  "producer": "administrative_registry",
  "entity_type": "member",
  "entity_id": "12345",
  "correlation_id": "uuid-or-workflow-id",
  "causation_id": "uuid-or-previous-event-id",
  "payload": {
    "member_id": "12345",
    "status": "active",
    "reactivated_at": "2026-04-22T20:00:00Z"
  }
}
```

## 8.2 Why the envelope matters

It standardizes:

-   tracing
-   retries
-   contract versioning
-   monitoring
-   cross-domain debugging
-   downstream processing

## 8.3 Versioning

Every event contract should be versioned.

Principles: - event versions should be explicit - producers should avoid
breaking changes where possible - consumers should be able to tolerate
older/newer events during transition periods - schema evolution should
be governed, not ad hoc

------------------------------------------------------------------------

## 9. Delivery Semantics

## 9.1 Delivery expectation

The backbone should be designed around:

> **at-least-once delivery** as the realistic default

This is usually the most practical and reliable choice for institutional
systems.

That means consumers must be designed to be:

-   idempotent
-   tolerant of duplicates
-   safe to retry

## 9.2 Ordering

Not all events need global ordering.

Ordering should be guaranteed only where it matters, typically within: -
a given entity - a given workflow stream - a given partitioning key

Trying to enforce unnecessary global ordering creates avoidable
complexity.

## 9.3 Retry and dead-letter handling

The backbone should support:

-   automatic retries for transient failures
-   dead-letter queues/topics for poison messages
-   operational visibility into failed delivery
-   replay or reprocessing workflows where appropriate

------------------------------------------------------------------------

## 10. Reliability and Operational Patterns

## 10.1 Idempotency

All important consumers should use idempotency keys or equivalent
processing controls so the same event does not cause duplicate side
effects.

Examples: - do not create duplicate person links from repeated
`member.reactivated` - do not send the same nudge twice from duplicate
event delivery - do not open multiple identical follow-up tasks from one
repeated workflow event

## 10.2 Outbox pattern

For critical producer systems, especially institutional systems such as
the Administrative Registry, the **transactional outbox pattern** is
strongly recommended.

Why: - prevents state changes from committing without corresponding
event publication - reduces inconsistency between source-of-truth data
and emitted events - is especially important for registry/admin truth
and finance-adjacent changes

## 10.3 Replay

The ecosystem should eventually support controlled replay of selected
event streams for: - rebuilding projections - debugging integration
issues - recovering consumers after outages - reprocessing after bug
fixes

Replay should be governed carefully, not treated as an ad hoc operation.

------------------------------------------------------------------------

## 11. Security and Governance

## 11.1 Security principles

The Event Backbone must not become an ungoverned data exhaust.

Security requirements include:

-   producer authentication
-   subscriber authentication/authorization
-   least-privilege topic/queue access
-   encryption in transit
-   secure secret handling
-   auditability of event publication and subscription

## 11.2 Data minimization

Events should carry the **minimum payload necessary** for consumers to
react appropriately.

Do not publish raw sensitive data unless it is operationally required
and governed.

Examples: - Member Intelligence may need a grievance-opened signal, but
not full grievance narrative content - consumers should fetch additional
data through controlled APIs only when appropriate

## 11.3 Governance model

The backbone should have explicit governance for:

-   event naming conventions
-   schema registration/versioning
-   producer ownership
-   consumer ownership
-   retention windows
-   replay permissions
-   deprecation of old event contracts

This should eventually be documented in an event contract registry or
integration catalog.

------------------------------------------------------------------------

## 12. Relationship to Other Domains

  ---------------------------------------------------------------------------
  Domain           Relationship to Event Backbone
  ---------------- ----------------------------------------------------------
  Administrative   Produces official membership and admin events
  Registry         

  Identity         Consumes registry signals and emits person/linkage events

  IdP / SSO        Emits auth events where useful; consumed by downstream
                   systems

  Member           Major consumer of ecosystem signals; emits orchestration
  Intelligence     outputs

  Workflow & Case  Consumes/produces service-state and case-state signals
  Management       

  Strapi / Content Consumes selected projection-worthy events; not a general
                   orchestration hub

  Domain           Major producers of operational and engagement events
  Applications     
  ---------------------------------------------------------------------------

------------------------------------------------------------------------

## 13. Technology Stack Considerations

This section is directional, not final. The Event Backbone is a
platform-level concern, not a domain-specific app feature.

### Recommended direction

The backbone should be built using **shared messaging infrastructure**
chosen at the platform level.

Viable options include:

-   **AWS SNS + SQS**
-   **Kafka / managed Kafka**
-   **Google Pub/Sub**
-   another managed event/messaging platform with strong durability and
    operational visibility

### Recommended bias

Given the likely shape of the SEIU ecosystem, a strong practical bias
is:

-   start with a **managed cloud-native messaging stack**
-   avoid overengineering too early
-   choose an option that supports:
    -   fan-out
    -   retries
    -   dead-letter handling
    -   operational monitoring
    -   secure multi-service integration

### Platform selection guidance

#### AWS SNS + SQS

Strong fit if SEIU standardizes heavily on AWS and wants: -
straightforward fan-out - good operational simplicity - low ops
overhead - queue semantics that work well for institutional service
integrations

#### Kafka / managed Kafka

Strong fit if SEIU expects: - high event volume - more advanced
stream-processing needs - replay-heavy architecture - stronger
event-stream centrality as the platform matures

Kafka is powerful, but it also introduces more operational and
architectural weight.

#### Google Pub/Sub

Viable if the broader platform is GCP-oriented, but likely less natural
if the rest of the stack trends AWS/Node-oriented.

### Supporting technical patterns

Regardless of platform choice, the backbone will likely also require:

-   event consumer workers
-   producer libraries or adapters
-   schema validation layer
-   dead-letter handling
-   observability tooling
-   possibly a schema registry or event contract catalog over time

### Not recommended

The following are not strong long-term choices for the shared backbone:

-   relying only on direct webhooks as the permanent integration model
-   point-to-point custom integrations between every pair of systems
-   embedding integration orchestration inside Strapi
-   building an entirely custom message broker when strong managed
    options already exist

### Strategic recommendation

The Event Backbone should begin as a **shared managed messaging layer**
with strong operational visibility and evolve toward a more mature event
platform as the ecosystem deepens.

The most important early decision is not "maximum sophistication." It is
choosing a platform that is:

-   reliable
-   observable
-   secure
-   easy enough to adopt across domains
-   compatible with gradual migration from today's webhook-heavy state

------------------------------------------------------------------------

## 14. Migration Strategy

The Event Backbone should be introduced iteratively, not via a big-bang
replatforming effort.

## Phase 1 --- Direct integration and webhook era

Pattern: `System -> Webhook -> Consumer`

This remains acceptable for early-stage integration where speed matters
and coupling is tolerable.

Use cases: - early content projection - fast campaign launch support -
initial node integrations

## Phase 2 --- Function/adaptor layer

Pattern:
`System -> Integration Adapter / Function -> Multiple Consumers`

This introduces: - transformation - validation - fan-out - decoupling
from direct consumer awareness

This is especially useful for: - legacy systems - Unionware adapters -
systems not yet capable of publishing directly into the backbone

## Phase 3 --- Shared event backbone becomes primary path

Pattern: `Producer -> Event Backbone -> Subscribers`

At this stage: - producers publish domain events into the backbone -
consumers subscribe independently - the backbone becomes the default
propagation path for cross-domain state changes

## Phase 4 --- Mature event platform

Capabilities: - contract governance - replay support - durable
observability - richer stream processing where justified -
ecosystem-wide consistency in event publication and consumption

------------------------------------------------------------------------

## 15. Key Principles

1.  The Event Backbone is a **shared platform layer**, not a business
    domain.
2.  Producers publish events about their own state changes only.
3.  Consumers own their own reaction logic.
4.  Events propagate change; APIs serve direct reads.
5.  At-least-once delivery with idempotent consumers is the right
    default.
6.  The backbone must support retries, dead-letter handling, and
    observability.
7.  Sensitive data should be minimized in event payloads.
8.  Contract governance is mandatory as the ecosystem matures.
9.  The backbone should evolve from today's webhook-heavy state, not
    attempt a disruptive big-bang replacement.
10. This layer exists to preserve independence between domains while
    making the ecosystem act like one institution.

------------------------------------------------------------------------

## 16. Open Questions

-   Which cloud/platform environment should anchor the backbone
    operationally?
-   How much replay capability is required in early phases versus later
    maturity?
-   Which systems can publish directly versus requiring adapters?
-   What event retention windows are appropriate by event class?
-   Should SEIU adopt a formal schema registry early, or later once the
    number of contracts grows?
-   Which events are operationally critical enough to require
    outbox-style guarantees in phase one?

------------------------------------------------------------------------

## 17. Next Steps

-   choose the initial backbone platform direction
-   define naming conventions and envelope standard
-   identify first-wave producers and consumers
-   define the initial high-priority event contracts
-   decide where adapters/functions are required for legacy systems
-   establish monitoring, retry, and dead-letter patterns before broad
    rollout
