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

export default function IdentityPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <PageContent>
      <PageHeader
        eyebrow="Layer 2 · Identity"
        title="Identity Domain"
        titleAccent="Identity"
        description="The canonical layer responsible for resolving and maintaining personhood across the SEIU ecosystem — independent of any single system, application, or identifier."
        meta={[
          { label: "Layer", value: "2 of 8" },
          { label: "Status", value: "Finalized" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === "overview" && (
        <div className="animate-fade-up">
          {/* Diagram — node map showing person_id as hub */}
          <svg
            role="img"
            aria-label="Identity Domain — canonical person_id as hub with spokes to all ecosystem systems"
            viewBox="0 0 700 380"
            width="100%"
            className="mb-10"
          >
            {/* Central hub */}
            <g style={{ animation: "fade-up 0.4s ease both", animationDelay: "0ms" }}>
              <circle cx="350" cy="190" r="52" fill="#411175" fillOpacity="0.07" stroke="#411175" strokeOpacity="0.3" strokeWidth="1.5" />
              <text x="350" y="184" textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="13" fontWeight="600" fill="#411175">Identity</text>
              <text x="350" y="200" textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="13" fontWeight="600" fill="#411175">Domain</text>
              <text x="350" y="216" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="9" fill="#411175" fillOpacity="0.5">person_id</text>
            </g>

            {/* Satellite nodes */}
            {[
              { label: "Unionware", sub: "member_id", cx: 120, cy: 80, delay: 60 },
              { label: "IdP / SSO", sub: "sub (subject)", cx: 350, cy: 40, delay: 120 },
              { label: "WorkersFirst", sub: "wf_user_id", cx: 580, cy: 80, delay: 180 },
              { label: "Mobile App", sub: "mobile session", cx: 100, cy: 310, delay: 240 },
              { label: "Training Centre", sub: "canvas / mysis id", cx: 350, cy: 352, delay: 300 },
              { label: "My65+", sub: "my65_account", cx: 600, cy: 310, delay: 360 },
            ].map(({ label, sub, cx, cy, delay }) => {
              const dx = cx - 350;
              const dy = cy - 190;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const nx = dx / dist;
              const ny = dy / dist;
              const lx1 = 350 + nx * 54;
              const ly1 = 190 + ny * 54;
              const lx2 = cx - nx * 36;
              const ly2 = cy - ny * 36;
              return (
                <g key={label} style={{ animation: "fade-up 0.35s ease both", animationDelay: `${delay}ms` }}>
                  <line x1={lx1} y1={ly1} x2={lx2} y2={ly2} stroke="rgba(0,0,0,0.1)" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx={cx} cy={cy} r="34" fill="#ffffff" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
                  <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="10.5" fontWeight="500" fill="#000000">{label}</text>
                  <text x={cx} y={cy + 12} textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="8" fill="rgba(0,0,0,0.3)">{sub}</text>
                </g>
              );
            })}

            <text x="350" y="390" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.2)">ALL IDENTIFIERS MAP TO A SINGLE STABLE person_id</text>
          </svg>

          <section className="mb-10">
            <SectionLabel number="01" label="Core question this layer answers" />
            <Callout variant="accent" className="mb-4">
              <strong>"Who is this person across the entire ecosystem?"</strong>
            </Callout>
            <p className="text-sm font-light text-black/60 leading-relaxed mb-4">
              The Identity Domain establishes a canonical person record and maintains mappings between administrative records (Unionware / future registry), IdP accounts, and application-specific user IDs across all nodes.
            </p>
            <p className="text-sm font-light text-black/60 leading-relaxed">
              Without this layer, SSO enablement, Member Intelligence accuracy, and cross-node lifecycle orchestration are all impossible. A person exists in multiple systems as multiple unconnected records — this domain resolves them.
            </p>
          </section>

          <section className="mb-10">
            <SectionLabel number="02" label="Canonical person model" />
            <CodeBlock>{`// Person — canonical record
{
  person_id:       "uuid (system-generated, immutable)",
  primary_email:   "string",
  status:          "prospect | active_member | inactive | staff | ...",
  created_at:      "timestamp"
}

// Identity Map — crosswalk table
{
  person_id:    "uuid (FK to Person)",
  system:       "unionware | idp | workersfirst | my65plus | canvas | ...",
  external_id:  "string",
  linked_at:    "timestamp",
  metadata:     "JSON (optional system-specific context)"
}

// Merge Log — auditable history
{
  merge_id:           "uuid",
  source_person_id:   "uuid",
  target_person_id:   "uuid",
  reason:             "string",
  timestamp:          "timestamp"
}`}</CodeBlock>
          </section>

          <section className="mb-10">
            <SectionLabel number="03" label="Identity resolution strategy" />
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  confidence: "High",
                  method: "Exact member_id match",
                  desc: "Most authoritative. Member ID is Finance-controlled and institutionally unique.",
                },
                {
                  confidence: "Medium",
                  method: "Email match",
                  desc: "Requires validation. Email is often present but not guaranteed across all records.",
                },
                {
                  confidence: "Review",
                  method: "Heuristic / assisted",
                  desc: "Ambiguous cases routed to manual or semi-automated reconciliation queue.",
                },
              ].map(({ confidence, method, desc }) => (
                <div key={method} className="bg-grey rounded-lg p-4">
                  <p className="font-mono text-[10px] text-purple-power uppercase tracking-wider mb-1">{confidence}</p>
                  <p className="text-sm font-medium text-black mb-1">{method}</p>
                  <p className="text-sm font-light text-black/50 leading-snug">{desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === "boundaries" && (
        <div className="animate-fade-up">
          <Callout variant="accent" className="mb-6">
            <strong>Owns:</strong> Canonical person record, external identifier crosswalks across all nodes and systems, identity reconciliation (merge, dedupe, linking), reactivation continuity, and person role/context bindings (member, prospect, staff, etc.).
          </Callout>

          <SectionLabel number="01" label="Key identity principle" />
          <Callout className="mb-6">
            <strong>Identity state is not the same as membership state.</strong> Membership state belongs to the Administrative Registry. The Identity Domain reflects person context across systems — a prospect can have an identity record before they ever become a member.
          </Callout>

          <DataTable
            headers={["Responsibility", "Owner", "Notes"]}
            rows={[
              ["Canonical person record", "Identity Domain", "person_id is the stable institutional identifier"],
              ["Authentication credentials", "IdP / SSO", "IdP owns auth — Identity Domain links person_id ↔ idp_subject"],
              ["Official membership status", "Administrative Registry", "Is someone a member? — Registry answers this"],
              ["Lifecycle scoring", "Member Intelligence", "What should happen next? — Intelligence answers this"],
              ["Merge / reconciliation tooling", "Identity Domain", "Soft merges, auditable, reversible"],
              ["Content targeting", "Content & Publishing", "Identity provides claims; Strapi uses them optionally"],
            ]}
            className="mb-6"
          />

          <SectionLabel number="02" label="Lifecycle states a person can hold" />
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              "Prospect (no member_id)",
              "Active Member",
              "Inactive Member",
              "Reactivated Member",
              "WorkersFirst-only participant",
              "Training Centre learner",
              "My65+ participant",
              "Staff (internal user)",
            ].map((state) => (
              <span key={state} className="font-mono text-[10px] px-2 py-0.5 rounded-sm border bg-purple-power/8 text-purple-power border-purple-power/20">
                {state}
              </span>
            ))}
          </div>

          <SectionLabel number="03" label="Merge principles" />
          <div className="flex flex-col gap-2">
            {[
              "Preserve all identifiers — never discard external IDs",
              "Maintain full audit trail of all merge operations",
              "Never overwrite authoritative IDs (member_id, IdP subject)",
              "Support reversible merges — soft merge model only",
              "Ambiguous cases always go to human review queue",
            ].map((rule) => (
              <div key={rule} className="flex items-center gap-3 py-2 border-b border-black/6">
                <span className="w-1 h-1 rounded-full bg-purple-power flex-shrink-0" />
                <span className="text-sm font-light text-black/70">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "integration" && (
        <div className="animate-fade-up">
          <section className="mb-10">
            <SectionLabel number="01" label="Events emitted by Identity Domain" />
            <DataTable
              headers={["Event", "Triggered when", "Key consumers"]}
              rows={[
                ["person.created", "New canonical person record established", "Member Intelligence, Workflow"],
                ["identity.linked", "External ID linked to person_id", "Member Intelligence, Analytics"],
                ["identity.merged", "Two person records merged into one", "All consumers — idempotency required"],
                ["person.reactivated", "Rejoining member linked to existing record", "Registry, Intelligence, Workflow"],
              ]}
              className="mb-6"
            />
          </section>

          <section className="mb-10">
            <SectionLabel number="02" label="IdP relationship" />
            <p className="text-sm font-light text-black/60 leading-relaxed mb-4">
              The Identity Domain is not the IdP and must not overload the IdP into being the canonical identity store. Auth0 or Okta handles authentication; the Identity Domain handles personhood.
            </p>
            <CodeBlock>{`// IdP token — minimal stable claims
{
  "sub":       "auth0|abc123",   // IdP subject (not person_id)
  "person_id": "uuid",           // injected from Identity Domain
  "email":     "member@seiu.ca",
  "iat":       1714000000,
  "exp":       1714003600
}

// Application backend resolves full context
// by calling Identity Domain API with person_id`}</CodeBlock>
          </section>

          <section className="mb-10">
            <SectionLabel number="03" label="Relationship to other domains" />
            <DataTable
              headers={["Domain", "Relationship"]}
              rows={[
                ["Administrative Registry", "Provides member_id linkage via member.created events"],
                ["IdP / SSO", "Provides auth subject; Identity Domain maps person_id ↔ subject"],
                ["Member Intelligence", "Consumes person-level data and identity events for lifecycle tracking"],
                ["Workflow & Case", "Anchors cases to person_id for cross-system continuity"],
                ["Content & Publishing", "Identity claims optionally used for content targeting"],
              ]}
            />
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
                  title: "Phase 1 — Shadow identity layer",
                  body: "Create person records from active members using email and member_id as seed data. Build initial identity maps linking person_id to Unionware member_id. No production systems depend on this yet.",
                },
                {
                  title: "Phase 2 — Node linking",
                  body: "Connect WorkersFirst, My65+, and Training Centre to the Identity Domain. Backfill identity maps via webhook-driven linking events. Resolve initial duplicates.",
                },
                {
                  title: "Phase 3 — Full adoption",
                  body: "All systems rely on person_id as the canonical reference. IdP tokens carry person_id as a claim. Downstream systems resolve identity through the Identity Domain API rather than direct identifier lookup.",
                },
              ]}
            />
          </section>

          <section className="mb-6">
            <SectionLabel number="02" label="Open questions" />
            <div className="flex flex-col gap-3">
              <Flag>
                <strong>Email normalization strategy</strong>
                Shared emails, corporate email aliases, and missing emails across older records create edge cases. A validation and normalization strategy must be defined before the identity layer seeds from Unionware.
              </Flag>
              <Flag>
                <strong>Conflict resolution rules</strong>
                What happens when two person records have the same email but different member IDs? Rules for deterministic vs. manual resolution must be agreed before node linking begins.
              </Flag>
              <Flag>
                <strong>Staff identity handling</strong>
                Internal staff users need identity records, but the model for staff vs. member identity context must be explicitly defined and governed.
              </Flag>
            </div>
          </section>
        </div>
      )}
    </PageContent>
  );
}
