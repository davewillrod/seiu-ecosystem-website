# IdP / SSO Domain Strategy

## Purpose

Defines the Identity Provider (IdP) domain as the centralized
authentication layer responsible for secure login, session management,
and cross-application SSO across the SEIU ecosystem.

------------------------------------------------------------------------

## 1. Domain Overview

The IdP domain answers:

> "Has this user successfully authenticated, and can they be trusted?"

It provides: - Secure authentication (login, MFA) - Session/token
management - Single Sign-On (SSO) across all nodes - A consistent
authentication experience across the ecosystem

It does **not** define who a person is --- that remains the
responsibility of the Identity Domain.

------------------------------------------------------------------------

## 2. Core Responsibilities

### Owns

-   Authentication (login, password, MFA)
-   Session lifecycle
-   Token issuance (JWT / access tokens)
-   SSO across applications
-   Account credential management

### Does NOT Own

-   Person identity (Identity Domain)
-   Membership authority (Administrative Registry)
-   Lifecycle logic (Member Intelligence)
-   Authorization/business rules (application backends)

------------------------------------------------------------------------

## 3. Current State

### Fragmented Authentication

-   Mobile app uses custom auth flow via backend + Strapi
-   Strapi mediates authentication and authorization rules
-   Unionware used for validation of membership
-   No centralized SSO
-   Each node manages its own login/session model

### Key Issues

-   No unified login experience
-   Tight coupling between auth and business logic
-   Difficult cross-node user journeys
-   High friction onboarding
-   Inconsistent security practices

------------------------------------------------------------------------

## 4. Target State

### Centralized IdP

All applications authenticate through a single IdP:

Flow: 1. User logs in via IdP 2. IdP issues token (JWT) 3. Application
receives token 4. Backend validates token 5. Backend resolves person via
Identity Domain

### SSO Experience

-   One login across:
    -   Mobile app
    -   WorkersFirst
    -   My65+
    -   Training Centre
    -   Future applications

------------------------------------------------------------------------

## 5. Token Design

Tokens should contain minimal, stable claims:

Recommended claims: - sub (IdP subject) - person_id (from Identity
Domain) - email - optional: high-level role indicators

Avoid: - complex business logic - dynamic lifecycle state - large
payloads

------------------------------------------------------------------------

## 6. Integration Model

### IdP → Identity Domain

-   Maps sub ↔ person_id

### IdP → Applications

-   Provides tokens
-   Applications validate tokens

### IdP → Event Backbone

Optional: - login events - account creation events

------------------------------------------------------------------------

## 7. Migration Strategy

### Phase 1

-   Introduce IdP for new users (prospects)
-   Maintain legacy auth for existing flows

### Phase 2

-   Integrate mobile app with IdP
-   Begin replacing Strapi auth layer

### Phase 3

-   Expand to other nodes (WorkersFirst, My65+, Training Centre)

### Phase 4

-   Full SSO across ecosystem
-   Legacy auth systems retired

Pattern: Strangler migration

------------------------------------------------------------------------

## 8. Relationship to Other Domains

  Domain         Relationship
  -------------- ------------------------------------
  Identity       Resolves person_id
  Registry       Validates membership context
  Intelligence   Consumes login signals
  Workflow       Links cases to authenticated users
  Content        Uses claims for personalization

------------------------------------------------------------------------

## 9. Security Considerations

-   MFA required for sensitive roles
-   Strong password policies
-   Role-based access enforced downstream
-   Audit logging of authentication events
-   Session expiration and refresh token management

------------------------------------------------------------------------

## 10. Technology Stack Considerations

### Recommended IdP Providers

-   Auth0
-   Okta

### Why Managed IdP

-   Security best practices
-   Reduced operational overhead
-   Built-in MFA and compliance
-   Scalable SSO support

### Backend Integration

-   JWT validation libraries
-   Public key verification (JWKS)
-   Middleware-based auth validation

### Not Recommended

-   Building custom auth system
-   Storing credentials internally
-   Embedding auth in application backends

------------------------------------------------------------------------

## 11. Key Principles

-   IdP handles authentication only
-   Identity Domain defines personhood
-   Authorization is distributed
-   Tokens are lightweight and stable
-   SSO is mandatory across nodes

------------------------------------------------------------------------

## 12. Next Steps

-   Select IdP provider
-   Define token/claims structure
-   Integrate with Identity Domain
-   Begin mobile app migration
-   Establish auth middleware standards
