"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { TabBar } from "@/components/ui/TabBar";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { Callout } from "@/components/artifacts/Callout";
import { DataTable } from "@/components/artifacts/DataTable";
import { FlowSteps } from "@/components/artifacts/FlowSteps";
import { Flag } from "@/components/artifacts/Flag";
import { CodeBlock } from "@/components/artifacts/CodeBlock";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "boundaries", label: "Boundaries" },
  { id: "integration", label: "Integration" },
  { id: "transition", label: "Transition" },
];

export default function WorkflowCasePage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <PageContent>
      <PageHeader
        eyebrow="Layer 6 · Workflow & Case"
        title="Workflow & Case"
        titleAccent="Case"
        description="The operational layer responsible for internal processes, member service interactions, and sensitive representation cases. Casework, tasks, queues, audit trails, and grievance handling."
        meta={[
          { label: "Layer", value: "6 of 8" },
          { label: "Status", value: "Finalized" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === "overview" && (
        <div className="animate-fade-up">
          {/* Case lifecycle diagram */}
          <svg
            role="img"
            aria-label="Workflow & Case domain — three case classes and lifecycle flow"
            viewBox="0 0 700 320"
            width="100%"
            className="mb-10"
          >
            <defs>
              <marker id="wf-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="rgba(0,0,0,0.25)" />
              </marker>
            </defs>

            {/* Three case types */}
            <text x="14" y="18" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.25)">CASE CLASSES</text>
            {[
              { label: "Internal Operational", sub: "MSC↔Finance · data corrections · classification tasks", color: "#411175", alpha: 0.06 },
              { label: "Member Service", sub: "Support requests · onboarding assistance · access issues", color: "#000000", alpha: 0.04 },
              { label: "Grievance / Representation", sub: "Formal grievances · sensitive disputes · restricted access", color: "#b91c1c", alpha: 0.05 },
            ].map(({ label, sub, color, alpha }, i) => (
              <g key={label} style={{ animation: "fade-up 0.35s ease both", animationDelay: `${i * 60}ms` }}>
                <rect x="14" y={28 + i * 78} width="220" height="66" rx="6"
                  fill={color} fillOpacity={alpha}
                  stroke={color} strokeOpacity="0.18" strokeWidth="1"
                />
                <text x="26" y={55 + i * 78} fontFamily="'Work Sans', system-ui, sans-serif" fontSize="12" fontWeight="500" fill="#000000">{label}</text>
                <text x="26" y={71 + i * 78} fontFamily="'DM Mono', monospace" fontSize="8.5" fill="rgba(0,0,0,0.35)">{sub}</text>
                <line x1="234" y1={61 + i * 78} x2="294" y2={61 + i * 78} stroke="rgba(0,0,0,0.15)" strokeWidth="1" markerEnd="url(#wf-arrow)" />
              </g>
            ))}

            {/* Case lifecycle flow */}
            <text x="302" y="18" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.25)">CASE LIFECYCLE</text>
            {[
              { stage: "Created", y: 40 },
              { stage: "Assigned", y: 90 },
              { stage: "In Progress", y: 140 },
              { stage: "Escalated", y: 190 },
              { stage: "Resolved", y: 240 },
              { stage: "Closed", y: 290 },
            ].map(({ stage, y }, i, arr) => (
              <g key={stage} style={{ animation: "fade-up 0.35s ease both", animationDelay: `${200 + i * 40}ms` }}>
                <circle cx="348" cy={y} r="18" fill="#ffffff" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
                <text x="348" y={y + 4} textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="9.5" fill="#000000">{stage}</text>
                {i < arr.length - 1 && (
                  <line x1="348" y1={y + 18} x2="348" y2={arr[i + 1].y - 18} stroke="rgba(0,0,0,0.1)" strokeWidth="1" markerEnd="url(#wf-arrow)" />
                )}
              </g>
            ))}

            {/* Case components */}
            <text x="440" y="18" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.25)">CASE COMPONENTS</text>
            {[
              "person_id (from Identity)",
              "member_id (optional, from Registry)",
              "Case type + priority",
              "Assigned team / user",
              "Tasks and subtasks",
              "Notes and attachments",
              "Full audit event log",
              "SLA tracking (where applicable)",
            ].map((comp, i) => (
              <g key={comp} style={{ animation: "fade-up 0.35s ease both", animationDelay: `${400 + i * 30}ms` }}>
                <rect x="440" y={28 + i * 36} width="246" height="28" rx="4" fill="#ffffff" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
                <circle cx="454" cy={42 + i * 36} r="2.5" fill="#411175" fillOpacity="0.3" />
                <text x="464" y={46 + i * 36} fontFamily="'Work Sans', system-ui, sans-serif" fontSize="10.5" fill="rgba(0,0,0,0.6)">{comp}</text>
              </g>
            ))}
          </svg>

          <section className="mb-10">
            <SectionLabel number="01" label="Core question this layer answers" />
            <Callout variant="accent" className="mb-4">
              <strong>"How does work get done across the organization?"</strong>
            </Callout>
            <p className="text-sm font-light text-black/60 leading-relaxed mb-4">
              SEIU's future-state architecture cannot neglect operational workflows and case handling. These responsibilities currently exist in fragmented form across Unionware and operational practices. The Workflow & Case Management Domain provides a dedicated, properly bounded home for them.
            </p>
          </section>

          <section className="mb-10">
            <SectionLabel number="02" label="Grievance case privacy requirements" />
            <Callout>
              <strong>Grievance and representation cases require stronger controls.</strong> Restricted access on a need-to-know basis, stricter audit trails, data segregation where appropriate, and higher privacy standards. The shared casework foundation is used, but grievance cases are treated as a more sensitive class throughout.
            </Callout>
          </section>
        </div>
      )}

      {activeTab === "boundaries" && (
        <div className="animate-fade-up">
          <Callout variant="accent" className="mb-6">
            <strong>Owns:</strong> Case lifecycle (create → assign → resolve), tasks, queues, assignments, internal operational workflows (MSC ↔ Finance, data corrections), member support interactions, grievance/representation cases, notes, attachments, audit logs, escalation handling.
          </Callout>

          <Callout className="mb-6">
            <strong>Does not own:</strong> Canonical identity (Identity Domain), official registry truth (Administrative Registry), lifecycle intelligence or scoring (Member Intelligence), authentication (IdP), editorial content (Strapi).
          </Callout>

          <SectionLabel number="01" label="Workflow classes" />
          <DataTable
            headers={["Class", "Examples", "Access level"]}
            rows={[
              ["Internal Operational", "MSC↔Finance handoffs, member data corrections, identity review tasks, taxonomy normalization", "Standard staff access"],
              ["Member Service", "Support inquiries, profile correction requests, helpdesk/access requests, onboarding assistance", "Support team access"],
              ["Grievance / Representation", "Grievance intake, dispute handling, sensitive representation matters", "Restricted — need-to-know only"],
            ]}
            className="mb-6"
          />

          <SectionLabel number="02" label="Signal boundary with Member Intelligence" />
          <p className="text-sm font-light text-black/60 leading-relaxed mb-3">
            Member Intelligence may consume <em>status signals</em> from Workflow & Case — but never raw sensitive case content.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-grey rounded-lg p-4">
              <p className="font-mono text-[10px] text-purple-power uppercase tracking-wider mb-2">Signals Intelligence can receive</p>
              {["Case opened", "Case closed", "Case escalated", "Support friction signal"].map((s) => (
                <div key={s} className="flex items-center gap-2 py-1 border-b border-black/6">
                  <span className="w-1 h-1 rounded-full bg-purple-power flex-shrink-0" />
                  <span className="text-sm font-light text-black/60">{s}</span>
                </div>
              ))}
            </div>
            <div className="bg-grey rounded-lg p-4">
              <p className="font-mono text-[10px] text-black/30 uppercase tracking-wider mb-2">Must stay in Workflow domain</p>
              {["Grievance narrative content", "Case notes and attachments", "Sensitive representation details", "Staff assignment history"].map((s) => (
                <div key={s} className="flex items-center gap-2 py-1 border-b border-black/6">
                  <span className="w-1 h-1 rounded-full bg-black/20 flex-shrink-0" />
                  <span className="text-sm font-light text-black/50">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "integration" && (
        <div className="animate-fade-up">
          <section className="mb-10">
            <SectionLabel number="01" label="Data model" />
            <CodeBlock>{`case {
  case_id, person_id,      // anchored to Identity Domain
  member_id (optional),    // from Administrative Registry
  type: "internal" | "member_service" | "grievance",
  status, priority, created_at
}

case_task { task_id, case_id, assigned_to, status }
case_note { note_id, case_id, content, created_at }
case_assignment { assignment_id, case_id, team_or_user }
case_event_log { event_id, case_id, action, timestamp }`}</CodeBlock>
          </section>

          <section className="mb-10">
            <SectionLabel number="02" label="Domain events emitted" />
            <DataTable
              headers={["Event", "Consumed by"]}
              rows={[
                ["case.created", "Member Intelligence (friction signal), Analytics"],
                ["case.assigned", "Internal routing systems, Analytics"],
                ["case.updated", "Analytics"],
                ["case.closed", "Member Intelligence (resolution signal), Analytics"],
                ["grievance.opened", "Member Intelligence (signal only — no content)", "Restricted event payload"],
              ]}
              className="mb-6"
            />
          </section>

          <section className="mb-10">
            <SectionLabel number="03" label="Inputs consumed" />
            <DataTable
              headers={["Source", "What it provides"]}
              rows={[
                ["Identity Domain", "person_id — anchors every case to a canonical person"],
                ["Administrative Registry", "member_id and membership context for grounding cases"],
                ["Member Intelligence", "Lifecycle signals that may trigger follow-up case creation (optional)"],
                ["IdP / SSO", "Authenticates staff users accessing the workflow system"],
              ]}
            />
          </section>
        </div>
      )}

      {activeTab === "transition" && (
        <div className="animate-fade-up">
          <section className="mb-10">
            <SectionLabel number="01" label="Migration sequence" />
            <FlowSteps
              steps={[
                {
                  title: "Phase 1 — Introduce new case model",
                  body: "Stand up the new Workflow & Case domain alongside Unionware. Mirror basic workflows from Unionware's existing ticketing/case system. Begin creating new cases in the new domain for non-sensitive workflows.",
                },
                {
                  title: "Phase 2 — Internal and service workflows",
                  body: "Build internal operational workflows (MSC ↔ Finance, data corrections). Begin handling member support cases. Connect to Identity Domain for person_id anchoring.",
                },
                {
                  title: "Phase 3 — Grievance handling",
                  body: "Introduce grievance and representation case handling carefully. Enforce the security model — restricted access, audit controls, data segregation. Staff training required before production deployment.",
                },
                {
                  title: "Phase 4 — Full migration",
                  body: "Fully migrate all workflow and case responsibilities from Unionware. Decommission Unionware's workflow and ticketing functions. Workflow & Case domain becomes the single operational workflow layer.",
                },
              ]}
            />
          </section>

          <section className="mb-6">
            <SectionLabel number="02" label="Open questions" />
            <div className="flex flex-col gap-3">
              <Flag>
                <strong>RBAC model design</strong>
                The role-based access control model — especially for grievance cases — requires careful design before implementation. Need-to-know access rules must be explicit and auditable.
              </Flag>
              <Flag>
                <strong>Case type taxonomy</strong>
                The detailed taxonomy of case types and workflow classes within each category must be defined with input from MSC, Finance, and representation staff before schema design begins.
              </Flag>
            </div>
          </section>
        </div>
      )}
    </PageContent>
  );
}
