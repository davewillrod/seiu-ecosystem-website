# SEIU Internal Operations Portal

## 1. Purpose

The SEIU Internal Operations Portal is a unified web-based application designed to give staff a single, cohesive interface to manage members, operations, and programs across the entire ecosystem.

While SEIU’s systems are modular underneath, this portal ensures:

> Staff experience one system — even though the architecture is distributed.

---

## 2. What This System Replaces

Current system:
- Windows desktop application
- VPN (Fortinet)
- tightly coupled logic

Limitations:
- hard to extend
- poor integration
- limited cross-system visibility

---

## 3. What This System Becomes

- secure web application
- browser-based (desktop-first)
- SSO + MFA
- integrates all systems

---

## 4. Core Concept

> One interface for staff — multiple systems underneath

---

## 5. Key Capabilities

### Member & Person Search
- name, email, member ID, phone

### Person 360 Profile
- identity links
- membership data
- lifecycle state
- application usage
- cases

### Administrative Registry
- create/update members
- employer/unit assignment

### Identity Resolution
- merge duplicates
- resolve mismatches

### Workflow & Cases
- support tickets
- grievances (restricted)
- internal tasks

### Campaign & Intake
- view campaign leads
- track conversion to My65+

### Member Intelligence
- lifecycle stage
- engagement signals
- recommendations

### Program Visibility
- My65+
- WorkersFirst
- Training Centre

---

## 6. How It Works

Reads:
- portal aggregates data from multiple systems

Writes:
- portal sends updates to domain services (not databases)

---

## 7. Security Model

### Authentication
- SSO
- MFA

### Authorization (Roles)

| Role | Access |
|------|------|
| General Staff | basic access |
| MSC | member service + workflows |
| Finance | dues + sensitive data |
| Grievance Staff | restricted case access |
| IT | full technical + system-level access |
| Admin | full system access |

### Data Protection
- restricted fields
- audit logs

### VPN
- optional for sensitive roles
- replaced by modern security stack

---

## 8. Benefits

- unified experience
- scalable system
- improved data quality

---

## 9. Architecture Alignment

Integrates:
- Identity
- Registry
- Intelligence
- Workflow
- Applications
- Content

---

## 10. Principle

> The portal unifies the experience — not the architecture.

---

## 11. Future Potential

- AI insights
- automation
- predictive analytics
