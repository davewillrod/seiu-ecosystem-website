# Workflow & Case Management Domain Strategy

## Purpose

Defines the Workflow & Case Management Domain as the operational layer
responsible for managing internal processes, member service
interactions, and sensitive representation cases (e.g., grievances).

------------------------------------------------------------------------

## 1. Domain Overview

This domain answers:

> "How does work get done across the organization?"

It manages: - Internal operational workflows - Member support cases -
Grievance / representation cases - Task assignment, queues, and
escalation - Audit trails and institutional processing

------------------------------------------------------------------------

## 2. Core Responsibilities

### Owns

-   Case lifecycle (create → assign → resolve)
-   Tasks, queues, assignments
-   Internal workflows (MSC ↔ Finance, etc.)
-   Member support interactions
-   Grievance / representation cases
-   Notes, attachments, audit logs

### Does NOT Own

-   Identity (Identity Domain)
-   Membership truth (Administrative Registry)
-   Lifecycle intelligence (Member Intelligence)
-   Authentication (IdP)

------------------------------------------------------------------------

## 3. Current State

### Unionware Dependency

-   Workflow, ticketing, and grievance handling live in Unionware
-   Processes are tightly coupled to member records
-   Limited flexibility and integration
-   No unified cross-domain workflow orchestration

### Key Issues

-   Limited automation
-   Poor visibility across workflows
-   Difficult integration with modern systems
-   Hard to scale support and operations

------------------------------------------------------------------------

## 4. Target State

### Unified Case Model

All workflows operate on a shared case framework:

Case types: - Internal operational - Member service - Grievance /
representation

Each case contains: - person_id (from Identity) - optional member_id
(from Registry) - case type - status - assigned team - tasks - notes and
attachments

------------------------------------------------------------------------

## 5. Workflow Classes

### Internal Operational

-   Data corrections
-   Identity reconciliation
-   Employer classification tasks

### Member Service

-   Support requests
-   Onboarding assistance
-   Account access issues

### Grievance / Representation

-   Formal grievances
-   Sensitive disputes
-   Representation workflows

Grievance cases require: - restricted access - stricter audit controls -
higher privacy standards

------------------------------------------------------------------------

## 6. Data Model (High-Level)

**case** - case_id - person_id - type - status - priority - created_at

**case_task** - task_id - case_id - assigned_to - status

**case_note** - note_id - case_id - content - created_at

**case_assignment** - assignment_id - case_id - team/user

**case_event_log** - event_id - case_id - action - timestamp

------------------------------------------------------------------------

## 7. Integration Model

### Inputs (consumes)

-   Identity Domain → person_id
-   Registry → member context
-   Member Intelligence → signals (optional)

### Outputs (emits)

-   case.created
-   case.updated
-   case.closed
-   grievance.opened

Consumed by: - Member Intelligence (signals only) - Analytics/reporting

------------------------------------------------------------------------

## 8. Relationship to Other Domains

  Domain         Relationship
  -------------- -----------------------------
  Identity       Anchors cases to person_id
  Registry       Provides membership context
  Intelligence   Consumes case signals
  IdP            Authenticates staff users
  Content        May provide reference info

------------------------------------------------------------------------

## 9. Security & Privacy

Especially for grievance cases:

-   Role-based access control
-   Need-to-know visibility
-   Full audit trails
-   Data segregation where required

------------------------------------------------------------------------

## 10. Technology Stack Considerations

### Core Database

-   PostgreSQL (recommended)

### Workflow Engine Options

-   Temporal (advanced orchestration)
-   Queue + worker (BullMQ, SQS, etc.)

### Backend

-   Node.js (TypeScript)
-   Python (workflow-heavy environments)

### Internal Tools

-   Next.js admin UI
-   Retool (early phase)

### Storage

-   S3 or equivalent for attachments

------------------------------------------------------------------------

## 11. Migration Strategy

### Phase 1

-   Introduce new case model
-   Mirror basic workflows from Unionware

### Phase 2

-   Build internal workflows (MSC, Finance)
-   Begin handling support cases

### Phase 3

-   Introduce grievance handling carefully
-   Enforce security model

### Phase 4

-   Fully migrate workflows
-   Decommission Unionware workflow usage

------------------------------------------------------------------------

## 12. Key Principles

-   Cases are anchored to person_id
-   Workflows are auditable
-   Sensitive data is restricted
-   Domain remains independent from registry and intelligence

------------------------------------------------------------------------

## 13. Next Steps

-   Define case types and workflows in detail
-   Design RBAC model
-   Implement case schema
-   Build initial internal tooling
