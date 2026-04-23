"use client";

import { useState } from "react";
import { Layers } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { TabBar } from "@/components/ui/TabBar";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { Callout } from "@/components/artifacts/Callout";
import { DataTable } from "@/components/artifacts/DataTable";
import { FlowSteps } from "@/components/artifacts/FlowSteps";
import { Flag } from "@/components/artifacts/Flag";
import { ExpandableCard } from "@/components/ui/ExpandableCard";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "boundaries", label: "Boundaries" },
  { id: "integration", label: "Integration" },
  { id: "transition", label: "Transition" },
];

export default function ApplicationsNodesPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <PageContent>
      <PageHeader
        eyebrow="Layer 7 · Applications & Nodes"
        title="Applications & Nodes"
        titleAccent="Nodes"
        description="The execution and experience layer — user-facing and operational applications that deliver functionality to members, staff, and external participants. Consumers of core platform capabilities; producers of engagement events."
        meta={[
          { label: "Layer", value: "7 of 8" },
          { label: "Status", value: "Finalized" },
          { label: "Date", value: "April 2026" },
        ]}
        icon={<Layers size={20} />}
      />

      <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === "overview" && (
        <div className="animate-fade-up">
          {/* Ecosystem node map */}
          <svg
            role="img"
            aria-label="Applications & Nodes — ecosystem node map with core platform relationships"
            viewBox="0 0 700 400"
            width="100%"
            className="mb-10"
          >
            <defs>
              <marker id="an-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="rgba(0,0,0,0.2)" />
              </marker>
            </defs>

            {/* Core Platform — center */}
            <g style={{ animation: "fade-up 0.4s ease both", animationDelay: "0ms" }}>
              <circle cx="350" cy="200" r="64" fill="#411175" fillOpacity="0.06" stroke="#411175" strokeOpacity="0.3" strokeWidth="1.5" />
              <text x="350" y="190" textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="12" fontWeight="600" fill="#411175">SEIU Core</text>
              <text x="350" y="207" textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="12" fontWeight="600" fill="#411175">Platform</text>
              <text x="350" y="224" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="8.5" fill="#411175" fillOpacity="0.5)">IdP · Identity · Registry</text>
              <text x="350" y="238" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="8.5" fill="#411175" fillOpacity="0.5)">Intelligence · Events</text>
            </g>

            {/* Application nodes */}
            {[
              { label: "Mobile App", sub: "React Native", cx: 120, cy: 80, delay: 80 },
              { label: "WorkersFirst", sub: "Shift & placement", cx: 580, cy: 80, delay: 140 },
              { label: "Training Centre", sub: "Canvas · MySIS", cx: 80, cy: 310, delay: 200 },
              { label: "My65+", sub: "Retirement savings", cx: 570, cy: 316, delay: 260 },
              { label: "Member Web App", sub: "Future · app.seiu.ca", cx: 350, cy: 38, delay: 320 },
            ].map(({ label, sub, cx, cy, delay }) => {
              const dx = cx - 350;
              const dy = cy - 200;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const nx = dx / dist;
              const ny = dy / dist;
              const lx1 = 350 + nx * 66;
              const ly1 = 200 + ny * 66;
              const lx2 = cx - nx * 40;
              const ly2 = cy - ny * 40;
              return (
                <g key={label} style={{ animation: "fade-up 0.35s ease both", animationDelay: `${delay}ms` }}>
                  <line x1={lx1} y1={ly1} x2={lx2} y2={ly2} stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
                  <circle cx={cx} cy={cy} r="38" fill="#ffffff" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
                  <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="10.5" fontWeight="500" fill="#000000">{label}</text>
                  <text x={cx} y={cy + 12} textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="8" fill="rgba(0,0,0,0.3)">{sub}</text>
                </g>
              );
            })}

            {/* Legend */}
            <text x="350" y="382" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.2)">APPLICATIONS CONSUME CORE PLATFORM · EMIT EVENTS INTO BACKBONE</text>
          </svg>

          <section className="mb-10">
            <SectionLabel number="01" label="Architectural role" />
            <Callout variant="accent" className="mb-4">
              <strong>Applications are consumers, not owners of truth.</strong> Logic belongs in core domains, not apps. Systems must be replaceable. Events are emitted for all meaningful actions.
            </Callout>
            <p className="text-sm font-light text-black/60 leading-relaxed">
              In the target state, all applications authenticate via the IdP, resolve users via the Identity Domain using person_id, consume lifecycle signals from Member Intelligence, emit events into the Event Backbone, and delegate workflow handling to the Workflow domain when needed.
            </p>
          </section>

          <section className="mb-10">
            <SectionLabel number="02" label="Node profiles" />
            <div className="flex flex-col gap-2">
              <ExpandableCard label="Mobile App" title="Primary member interface — React Native · Node.js · Strapi">
                <p className="mb-2">The most operationally mature node. Currently includes its own backend, MySQL shadow layer, and Strapi-driven content/auth logic. In target state: authenticates via IdP, resolves person_id from Identity Domain, emits engagement events into the backbone.</p>
                <p><strong className="font-medium text-black">Current coupling to extract:</strong> Strapi-mediated auth and policy segmentation. Mobile app should own UX logic and emit events — not enforce ecosystem-wide policy.</p>
              </ExpandableCard>
              <ExpandableCard label="WorkersFirst" title="Shift access and workforce placement platform">
                <p className="mb-2">Currently operates with its own backend and dedicated auth system. Handles shift eligibility, employer/worker matching, and placement workflows.</p>
                <p><strong className="font-medium text-black">Target integration:</strong> SSO via IdP, person_id resolution, lifecycle signals from Member Intelligence for eligibility, event emission for shift.completed and stable_placement.achieved milestones.</p>
              </ExpandableCard>
              <ExpandableCard label="Training Centre" title="Multi-system learning environment — Canvas · MySIS · Vubiz transition">
                <p className="mb-2">Not a single system — a node supported by MySIS (student information), Canvas (LMS), and Vubiz (current LMS under renegotiation). Governance is not fully settled.</p>
                <p><strong className="font-medium text-black">Integration target:</strong> Emit credential.completed and enrollment.started events. Receive lifecycle signals from Member Intelligence for training pathway nudges. Governance timeline must be confirmed before deep integration scoping.</p>
              </ExpandableCard>
              <ExpandableCard label="My65+" title="Retirement savings — federal funding · enrollment bonus structure">
                <p className="mb-2">Strategically critical due to federal investment and Home Care acquisition opportunity. Enrollment bonus and matching structure make it the highest-priority immediate value lever.</p>
                <p><strong className="font-medium text-black">Integration note:</strong> Auth and data integration require special care due to possible compliance or residency implications. Emit my65plus.enrolled milestone. Receive eligibility signals from Member Intelligence.</p>
              </ExpandableCard>
              <ExpandableCard label="Member Web App" title="Future authenticated web experience — app.seiuhealthcare.ca">
                <p>Not yet built. Will serve as the primary authenticated web experience for members — parallel to the mobile app. Should be designed from scratch with IdP, Identity Domain, and Member Intelligence as first-class integrations.</p>
              </ExpandableCard>
            </div>
          </section>
        </div>
      )}

      {activeTab === "boundaries" && (
        <div className="animate-fade-up">
          <Callout variant="accent" className="mb-6">
            <strong>Owns:</strong> User interfaces (mobile/web), domain-specific workflows (shift search, training, retirement tools), UX personalization based on inputs from Intelligence, local domain data (non-authoritative), event emission for user activity.
          </Callout>

          <Callout className="mb-6">
            <strong>Does not own:</strong> Authentication (IdP), person identity (Identity Domain), membership authority (Administrative Registry), cross-domain orchestration logic (Member Intelligence), core workflow processing (Workflow domain).
          </Callout>

          <SectionLabel number="01" label="Node-specific domain ownership" />
          <DataTable
            headers={["Node", "Owns", "Does not own"]}
            rows={[
              ["WorkersFirst", "Shift eligibility rules, employer/worker matching, placement workflow, operational scheduling data", "Canonical identity, institution-wide lifecycle logic, cross-node orchestration"],
              ["Training Centre", "Enrollment flows, course/module access, program progression rules, LMS permissions, learner operational data", "Member registry truth, cross-domain intelligence, canonical identity"],
              ["My65+", "Account workflows, eligibility to view retirement features, contribution flow rules, financial-product logic", "Canonical identity, lifecycle scoring, administrative membership truth"],
              ["Mobile App", "Member-facing UX logic, available operational modules, access to core member-service features, local app interactions", "Ecosystem-wide policy, cross-node orchestration, canonical identity"],
            ]}
          />
        </div>
      )}

      {activeTab === "integration" && (
        <div className="animate-fade-up">
          <section className="mb-10">
            <SectionLabel number="01" label="What applications consume" />
            <DataTable
              headers={["Source", "What the app receives", "Used for"]}
              rows={[
                ["IdP / SSO", "JWT with sub + person_id", "Authenticated identity for every request"],
                ["Identity Domain", "person_id resolution, crosswalk lookups", "Linking local app user to canonical person"],
                ["Administrative Registry", "Membership context (status, employer, unit)", "Eligibility gates and feature access"],
                ["Member Intelligence", "Lifecycle stage, cohort membership, nudge events, eligibility signals", "UX personalization, in-app prompts"],
                ["Workflow & Case", "Case/task context where relevant", "Staff and member service interactions"],
              ]}
              className="mb-6"
            />
          </section>

          <section className="mb-10">
            <SectionLabel number="02" label="What applications emit" />
            <DataTable
              headers={["Event class", "Examples", "Consumed by"]}
              rows={[
                ["Engagement events", "login, feature_used, content_viewed", "Member Intelligence — scoring and lifecycle"],
                ["Domain milestones", "credential.completed, shift.completed, my65plus.enrolled", "Member Intelligence, Analytics"],
                ["Friction signals", "onboarding_abandoned, form_error", "Member Intelligence, Workflow (optional)"],
              ]}
              className="mb-6"
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
                  title: "Phase 1 — Stabilize current apps",
                  body: "Audit current backends for each node. Identify all auth systems, shadow data layers, and embedded business logic. Introduce IdP for new user flows without disrupting existing auth.",
                },
                {
                  title: "Phase 2 — Identity Domain integration",
                  body: "Connect each node to the Identity Domain. Remove duplicate auth systems as SSO matures. All apps resolve person_id as their canonical user reference.",
                },
                {
                  title: "Phase 3 — Member Intelligence connection",
                  body: "Apps begin consuming lifecycle signals and eligibility data from Member Intelligence. Engagement events are emitted into the Event Backbone. Nudge delivery from Intelligence to apps is activated.",
                },
                {
                  title: "Phase 4 — Full SSO and legacy removal",
                  body: "Full SSO is operational across all nodes. Legacy coupling and shadow data layers are removed. Each app is a clean consumer of core platform capabilities.",
                },
              ]}
            />
          </section>

          <section className="mb-6">
            <SectionLabel number="02" label="Open questions" />
            <div className="flex flex-col gap-3">
              <Flag>
                <strong>Mobile app backend refactor timeline</strong>
                The mobile app backend needs audit before the IdP migration can be scoped. The shadow MySQL layer and Strapi policy logic must be explicitly mapped before extraction design begins.
              </Flag>
              <Flag>
                <strong>Training Centre governance</strong>
                Training Centre integration scoping should be deferred until governance of the node's institutional ownership is settled. Architectural assumptions must preserve flexibility until then.
              </Flag>
              <Flag>
                <strong>WorkersFirst integration depth</strong>
                WorkersFirst's dedicated backend requires an audit before integration depth can be scoped. Preliminary assumption: thin adapter for IdP + event emission, deeper integration deferred.
              </Flag>
              <Flag>
                <strong>LMS transition (Vubiz → Canvas)</strong>
                Vubiz is under renegotiation. Canvas is the intended direction. Integration planning should target Canvas as the canonical LMS and treat Vubiz as transitional.
              </Flag>
            </div>
          </section>
        </div>
      )}
    </PageContent>
  );
}
