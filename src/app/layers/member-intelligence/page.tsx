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

export default function MemberIntelligencePage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <PageContent>
      <PageHeader
        eyebrow="Layer 5 · Member Intelligence"
        title="Member Intelligence"
        titleAccent="Intelligence"
        description="The lifecycle and orchestration layer that understands each person's relationship with SEIU and determines what should happen next — journeys, nudges, eligibility signals, and segmentation."
        meta={[
          { label: "Layer", value: "5 of 8" },
          { label: "Status", value: "Finalized" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === "overview" && (
        <div className="animate-fade-up">
          {/* Intelligence flow diagram */}
          <svg
            role="img"
            aria-label="Member Intelligence — signal inputs to lifecycle engine to nudge outputs"
            viewBox="0 0 700 340"
            width="100%"
            className="mb-10"
          >
            <defs>
              <marker id="mi-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="rgba(0,0,0,0.25)" />
              </marker>
            </defs>

            {/* Inputs */}
            <text x="14" y="18" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.25)">SIGNAL INPUTS</text>
            {[
              { label: "Registry Events", sub: "member status changes" },
              { label: "Identity Events", sub: "person linkage" },
              { label: "Auth Events", sub: "login signals" },
              { label: "App Events", sub: "usage, completions" },
              { label: "Workflow Signals", sub: "case service state" },
            ].map(({ label, sub }, i) => {
              const y = 28 + i * 52;
              return (
                <g key={label} style={{ animation: "fade-up 0.35s ease both", animationDelay: `${i * 50}ms` }}>
                  <rect x="14" y={y} width="168" height="38" rx="5" fill="#ffffff" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
                  <text x="24" y={y + 21} fontFamily="'Work Sans', system-ui, sans-serif" fontSize="11" fontWeight="500" fill="#000000">{label}</text>
                  <text x="24" y={y + 34} fontFamily="'DM Mono', monospace" fontSize="8.5" fill="rgba(0,0,0,0.3)">{sub}</text>
                  <line x1="182" y1={y + 19} x2="260" y2={y + 19} stroke="rgba(0,0,0,0.15)" strokeWidth="1" markerEnd="url(#mi-arrow)" />
                </g>
              );
            })}

            {/* Intelligence Engine */}
            <g style={{ animation: "fade-up 0.4s ease both", animationDelay: "80ms" }}>
              <rect x="268" y="20" width="174" height="284" rx="8" fill="#411175" fillOpacity="0.06" stroke="#411175" strokeOpacity="0.25" strokeWidth="1.5" />
              <text x="355" y="58" textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="13" fontWeight="600" fill="#411175">Member</text>
              <text x="355" y="76" textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="13" fontWeight="600" fill="#411175">Intelligence</text>
              {[
                "Lifecycle state",
                "Engagement scoring",
                "Cohort assignment",
                "Trigger rules",
                "Next-best-action",
                "Risk scoring",
                "Opportunity signals",
              ].map((cap, i) => (
                <g key={cap}>
                  <circle cx="286" cy={110 + i * 28} r="2" fill="#411175" fillOpacity="0.4" />
                  <text x="296" y={114 + i * 28} fontFamily="'DM Mono', monospace" fontSize="9" fill="#411175" fillOpacity="0.6">{cap}</text>
                </g>
              ))}
            </g>

            {/* Outputs */}
            <text x="462" y="18" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.25)">NUDGE OUTPUTS</text>
            {[
              { label: "Mobile App", sub: "in-app nudges" },
              { label: "WorkersFirst", sub: "shift eligibility" },
              { label: "My65+", sub: "enrollment prompts" },
              { label: "Training Centre", sub: "pathway prompts" },
              { label: "Email / Push", sub: "campaign triggers" },
            ].map(({ label, sub }, i) => {
              const y = 28 + i * 52;
              return (
                <g key={label} style={{ animation: "fade-up 0.35s ease both", animationDelay: `${300 + i * 50}ms` }}>
                  <line x1="442" y1={y + 19} x2="462" y2={y + 19} stroke="rgba(0,0,0,0.15)" strokeWidth="1" markerEnd="url(#mi-arrow)" />
                  <rect x="462" y={y} width="224" height="38" rx="5" fill="#ffffff" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
                  <text x="474" y={y + 21} fontFamily="'Work Sans', system-ui, sans-serif" fontSize="11" fontWeight="500" fill="#000000">{label}</text>
                  <text x="474" y={y + 34} fontFamily="'DM Mono', monospace" fontSize="8.5" fill="rgba(0,0,0,0.3)">{sub}</text>
                </g>
              );
            })}
          </svg>

          <section className="mb-10">
            <SectionLabel number="01" label="Core question this layer answers" />
            <Callout variant="accent" className="mb-4">
              <strong>"Given who this person is and what has happened, what should we do next?"</strong>
            </Callout>
            <p className="text-sm font-light text-black/60 leading-relaxed mb-4">
              The Member Intelligence Domain is the functional successor to what is commonly called "CRM." But it is more accurately an intelligence and orchestration layer. It consumes signals from across the ecosystem, maintains a unified lifecycle view per person, and determines and dispatches next-best-actions.
            </p>
            <Callout>
              <strong>Key principle:</strong> Lifecycle state is derived, not manually set. It is computed from registry signals, engagement signals, and workflow signals — not entered by a staff member into a form.
            </Callout>
          </section>

          <section className="mb-10">
            <SectionLabel number="02" label="Lifecycle stages" />
            <div className="flex flex-wrap gap-2 mb-4">
              {["Prospect", "Onboarding (pre-member)", "Active Member", "Engaged Member", "At-Risk Member", "Inactive Member", "Reactivated Member"].map((stage) => (
                <span key={stage} className="font-mono text-[10px] px-2 py-0.5 rounded-sm border bg-purple-power/8 text-purple-power border-purple-power/20">
                  {stage}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <SectionLabel number="03" label="Nudge examples" />
            <div className="grid grid-cols-2 gap-3">
              {[
                { trigger: "Eligible for My65+", action: "Prompt to enroll — delivered via mobile app" },
                { trigger: "Training pathway incomplete", action: "Complete your credential — in-app notification" },
                { trigger: "Shifts available nearby", action: "WorkersFirst — new opportunities" },
                { trigger: "At-risk of churn", action: "Re-engagement campaign — email sequence" },
                { trigger: "Onboarding incomplete", action: "Finish your onboarding — push notification" },
                { trigger: "Stable placement achieved", action: "WorkersFirst milestone — loyalty signal" },
              ].map(({ trigger, action }) => (
                <div key={trigger} className="bg-grey rounded-lg p-4">
                  <p className="font-mono text-[10px] text-black/30 uppercase tracking-wider mb-1">Trigger</p>
                  <p className="text-sm font-medium text-black mb-1">{trigger}</p>
                  <p className="text-sm font-light text-black/50">{action}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === "boundaries" && (
        <div className="animate-fade-up">
          <Callout variant="accent" className="mb-6">
            <strong>Owns:</strong> Lifecycle state across the ecosystem, engagement signals, cohorts and segments, trigger rules and nudge generation, risk/opportunity scoring, cross-node orchestration logic.
          </Callout>

          <Callout className="mb-6">
            <strong>Does not own:</strong> Authentication (IdP), person identity (Identity Domain), official membership truth (Administrative Registry), case execution (Workflow & Case Management), content storage (Strapi), or deep domain-specific operational workflows within node applications.
          </Callout>

          <SectionLabel number="01" label="Data model (high-level)" />
          <CodeBlock>{`lifecycle_state {
  id, person_id, state_type, value,
  effective_at, ended_at
}

engagement_signal {
  id, person_id, source ("mobile" | "workersfirst" | "training" | ...),
  event_type, payload (JSON), timestamp
}

cohort_membership {
  id, person_id, cohort_name, joined_at, exited_at
}

trigger_rule {
  id, name, condition_definition,
  action_definition, active
}

nudge_event {
  id, person_id, trigger_rule_id,
  destination ("mobile" | "workersfirst" | "email" | ...),
  payload, created_at, delivered_at
}`}</CodeBlock>
        </div>
      )}

      {activeTab === "integration" && (
        <div className="animate-fade-up">
          <section className="mb-10">
            <SectionLabel number="01" label="Inputs — what it consumes" />
            <DataTable
              headers={["Source", "Signal type", "What Intelligence does with it"]}
              rows={[
                ["Administrative Registry", "member.status_changed, dues.processed", "Updates lifecycle stage, triggers cohort logic"],
                ["Identity Domain", "person.created, identity.linked", "Seeds lifecycle record, anchors person_id"],
                ["IdP / SSO", "auth.login.succeeded", "Records engagement signal, updates last-seen"],
                ["Mobile App", "feature usage, content interactions", "Engagement scoring, in-app nudge triggers"],
                ["WorkersFirst", "shift.completed, stable_placement.achieved", "Lifecycle milestones, opportunity scoring"],
                ["Training Centre", "credential.completed, enrollment.started", "Training pathway state, eligibility updates"],
                ["My65+", "my65plus.enrolled", "Retirement savings lifecycle milestone"],
                ["Workflow & Case", "case.created, case.closed", "Service friction signals, support state indicators"],
              ]}
              className="mb-6"
            />
          </section>

          <section className="mb-10">
            <SectionLabel number="02" label="Outputs — what it emits" />
            <DataTable
              headers={["Event", "Consumed by"]}
              rows={[
                ["nudge.triggered", "Mobile app, WorkersFirst, My65+, email systems"],
                ["cohort.entered", "Analytics, campaign systems, content targeting"],
                ["lifecycle.updated", "Analytics, Workflow (for follow-up task triggers)"],
                ["risk.score_changed", "Workflow (churn-risk cases), Analytics"],
                ["opportunity.identified", "WorkersFirst, Training Centre, My65+"],
              ]}
              className="mb-6"
            />
          </section>

          <section className="mb-10">
            <SectionLabel number="03" label="Workflow / case domain signal boundary" />
            <Callout>
              <strong>Important boundary:</strong> Workflow & Case Management may emit <em>status signals</em> to Member Intelligence (case opened, case closed, friction detected), but Member Intelligence should never receive raw sensitive case content. Grievance narrative content must remain within the Workflow domain under tightly governed access controls.
            </Callout>
          </section>
        </div>
      )}

      {activeTab === "transition" && (
        <div className="animate-fade-up">
          <section className="mb-10">
            <SectionLabel number="01" label="Migration phases" />
            <FlowSteps
              steps={[
                {
                  title: "Phase 1 — Foundation",
                  body: "Establish event ingestion pipeline from mobile app, WorkersFirst, and Training Centre. Build basic lifecycle state model. person_id is the anchor for all records.",
                },
                {
                  title: "Phase 2 — Initial intelligence",
                  body: "Define key lifecycle stages. Implement basic trigger rules for highest-priority use cases (Home Care onboarding, My65+ enrollment eligibility). Deliver simple nudges via mobile app.",
                },
                {
                  title: "Phase 3 — Expansion",
                  body: "Integrate more nodes. Introduce risk and opportunity scoring. Refine segmentation and cohort logic. Connect email and push systems to nudge outputs.",
                },
                {
                  title: "Phase 4 — Full orchestration",
                  body: "Real-time event processing. Advanced rule engine. Cross-node journey orchestration. Member Intelligence becomes the institutional orchestration layer for the ecosystem.",
                },
              ]}
            />
          </section>

          <section className="mb-6">
            <SectionLabel number="02" label="Open questions" />
            <div className="flex flex-col gap-3">
              <Flag>
                <strong>Event schema standardization</strong>
                Before Phase 1 can begin, engagement event schemas must be agreed across the mobile app, WorkersFirst, and Training Centre. Inconsistent schemas create downstream cleaning costs.
              </Flag>
              <Flag>
                <strong>Real-time vs near-real-time requirements</strong>
                Which lifecycle transitions require sub-second processing, and which can tolerate 15–60 second delays? This drives backbone platform and consumer architecture decisions.
              </Flag>
              <Flag>
                <strong>Rule engine complexity</strong>
                Custom rule evaluation is recommended initially. If the trigger logic grows complex, Temporal or a workflow engine should be considered — but premature use of these adds operational weight.
              </Flag>
            </div>
          </section>
        </div>
      )}
    </PageContent>
  );
}
