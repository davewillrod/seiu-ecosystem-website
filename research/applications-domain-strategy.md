# Applications / Domain Systems Strategy

## Purpose

Defines the Applications / Domain Systems layer as the set of
user-facing and operational applications that deliver functionality to
members, staff, and external participants across the SEIU ecosystem.

These systems consume identity, registry, intelligence, and workflow
capabilities to deliver real-world experiences.

---

## 1. Domain Overview

This layer answers:

> "How do users actually interact with SEIU services and experiences?"

It includes:

- Mobile App (primary member interface)
- WorkersFirst
- Training Centre (Vubiz → Canvas evolution)
- My65+
- Future Member Web App
- Other future vertical applications

These systems are **execution and experience layers**, not sources of
institutional truth.

---

## 2. Core Responsibilities

### Owns

- User interfaces (mobile/web)
- Domain-specific workflows (e.g., job search, training, retirement
  tools)
- UX personalization (based on inputs from Intelligence)
- Local domain data (non-authoritative)
- Event emission for user activity

### Does NOT Own

- Authentication (IdP)
- Person identity (Identity Domain)
- Membership authority (Administrative Registry)
- Cross-domain orchestration logic (Member Intelligence)
- Core workflow processing (Workflow Domain)

---

## 3. Current State

### Fragmented Application Landscape

#### Mobile App

- Custom backend
- Strapi involvement
- MySQL shadow database synced from Unionware
- Partial logic embedded in backend

#### WorkersFirst

- Separate backend + auth
- Not fully integrated with SEIU identity

#### Training Centre

- Vubiz (current LMS)
- Canvas (future direction)
- Independent user systems (MySIS)

#### My65+

- Separate platform
- Independent authentication and data

### Key Issues

- No shared identity layer
- No SSO
- Duplicate accounts across systems
- Limited cross-app coordination
- Inconsistent UX patterns
- Embedded business logic inside apps

---

## 4. Target State

### Unified Application Model

All applications:

- Authenticate via IdP
- Resolve users via Identity Domain (`person_id`)
- Consume lifecycle signals from Member Intelligence
- Emit events into the Event Backbone
- Delegate workflow handling to Workflow Domain when needed

---

## 5. Architectural Role

Applications are:

- **consumers of core platform capabilities**
- **producers of engagement events**
- **execution environments for user experiences**

They should remain:

- lightweight
- decoupled
- replaceable

---

## 6. Application Types

### 1. Member-Facing Applications

- Mobile App
- Member Web App (future)
- My65+
- WorkersFirst Mobile App
- Training Centre interfaces

### 2. Business Platforms

- WorkersFirst Web App (for employers)

### 3. Staff-Facing Interfaces

- Admin panels (may overlap with workflow domain tools)

---

## 7. Integration Model

### Inputs (consumes)

- IdP → authentication
- Identity → person_id resolution
- Registry → membership context
- Intelligence → lifecycle + eligibility signals
- Workflow → case/task context

### Outputs (emits)

- engagement events (logins, actions, completions)
- domain-specific events (training completed, shift worked)

---

## 8. Event Responsibilities

Applications must emit meaningful events such as:

- login activity
- feature usage
- milestone completion
- errors/friction signals

These power:

- lifecycle modeling
- cohort assignment
- nudging/orchestration

---

## 9. UX, Personalization, and Application Logic

Applications should:

- consume shared context from the core platform where appropriate
- render UI conditionally based on:
  - eligibility signals
  - lifecycle stage
  - cohort membership
  - domain-specific operational state
- enforce their own final authorization and access rules
- own their own operational business logic and operational data models

Applications should NOT:

- reimplement ecosystem-wide lifecycle logic
- duplicate cross-domain intelligence rules
- become independent sources of canonical identity or membership truth
- embed institution-wide orchestration logic that should live in shared domains

### 9.1 WorkersFirst

Should own:

- who can view/apply for shifts
- shift eligibility rules
- employer/worker matching logic
- placement workflow logic
- local operational content like opportunities, schedules, statuses

### 9.2 Training Centre

Should own:

- enrollment flows
- course/module access
- program progression rules
- LMS-facing permissions
- learner-facing operational data

### 9.3 My65+

Should own:

- account workflows
- eligibility to view or act on retirement-related features
- contribution flow rules
- financial-product-specific operational logic

### 9.4 Mobile app

Should own:

- member-facing UX logic
- which operational modules are available
- access to core member-service features
- local workflow handling for app-specific interactions

---

## 10. Technology Stack Considerations

Although most of the consumer applications are already built, these considerations pertain to any new apps that may arise.

### Frontend

- React Native (mobile)
- Next.js (web)

### Backend

- Node.js / TypeScript services
- API layer consuming core platform

### Data

- Minimal local storage
- Cache where necessary
- Avoid becoming source of truth

### Integration

- REST / GraphQL APIs for reads
- Event emission for writes/actions

---

## 11. Migration Strategy

### Phase 1

- Stabilize current apps
- Introduce IdP for new flows

### Phase 2

- Integrate Identity Domain
- Remove duplicate auth systems

### Phase 3

- Connect to Member Intelligence
- Begin event emission

### Phase 4

- Full SSO + orchestration
- Remove legacy coupling

---

## 12. Key Principles

- Applications are **consumers, not owners of truth**
- Logic belongs in core domains, not apps
- Events are emitted for all meaningful actions
- UX is driven by data, not hardcoded rules
- Systems must be replaceable

---

## 13. Open Questions

- Mobile app backend refactor timeline
- WorkersFirst integration depth
- LMS transition strategy (Vubiz → Canvas)
- Member Web App scope

---

## 14. Next Steps

- Define standard API contracts
- Define event emission standards for apps
- Begin IdP integration planning
- Align mobile app architecture with target model
