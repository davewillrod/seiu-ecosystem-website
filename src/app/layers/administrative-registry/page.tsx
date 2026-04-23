"use client";

import { useState } from "react";
import { Database } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { TabBar } from "@/components/ui/TabBar";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { Callout } from "@/components/artifacts/Callout";
import { DataTable } from "@/components/artifacts/DataTable";
import { FlowSteps } from "@/components/artifacts/FlowSteps";
import { Flag } from "@/components/artifacts/Flag";
import { StatCallout } from "@/components/artifacts/StatCallout";
import { CodeBlock } from "@/components/artifacts/CodeBlock";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "boundaries", label: "Boundaries" },
  { id: "integration", label: "Integration" },
  { id: "transition", label: "Transition" },
];

export default function AdministrativeRegistryPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <PageContent>
      <PageHeader
        eyebrow="Layer 1 · Administrative Registry"
        title="Administrative Registry"
        titleAccent="Registry"
        description="The authoritative institutional layer for membership, dues, employer taxonomy, and finance-controlled administrative truth. Currently centered in Unionware; transitioning to a purpose-built registry domain."
        meta={[
          { label: "Layer", value: "1 of 8" },
          { label: "Status", value: "Finalized" },
          { label: "Date", value: "April 2026" },
        ]}
        icon={<Database size={20} />}
      />

      <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === "overview" && (
        <div className="animate-fade-up">
          {/* Diagram */}
          <svg
            role="img"
            aria-label="Administrative Registry layer — current to target state transition"
            viewBox="0 0 700 300"
            width="100%"
            className="mb-10"
          >
            <defs>
              <marker id="ar-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="rgba(0,0,0,0.3)" />
              </marker>
            </defs>

            {/* Unionware — current */}
            <g style={{ animation: "fade-up 0.35s ease both", animationDelay: "0ms" }}>
              <rect x="14" y="20" width="250" height="220" rx="8" fill="#EEEEEE" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
              <text x="26" y="44" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.3)">CURRENT STATE</text>
              <rect x="26" y="56" width="226" height="170" rx="6" fill="#ffffff" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
              <text x="139" y="82" textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="13" fontWeight="600" fill="#000000">Unionware</text>
              {[
                "350,000+ member records",
                "Dues & financial records",
                "Finance-controlled creation",
                "Employer/unit taxonomy",
                "Historical archives",
                "Ticketing & case workflows",
              ].map((item, i) => (
                <g key={item}>
                  <circle cx="40" cy={100 + i * 20} r="2.5" fill="rgba(0,0,0,0.2)" />
                  <text x="50" y={104 + i * 20} fontFamily="'Work Sans', system-ui, sans-serif" fontSize="10.5" fill="rgba(0,0,0,0.5)">{item}</text>
                </g>
              ))}
            </g>

            {/* Arrow */}
            <g style={{ animation: "fade-up 0.35s ease both", animationDelay: "120ms" }}>
              <line x1="270" y1="130" x2="330" y2="130" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" markerEnd="url(#ar-arrow)" />
              <text x="300" y="118" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.3)">STRANGLER</text>
              <text x="300" y="148" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.3)">PATTERN</text>
            </g>

            {/* New Registry — target */}
            <g style={{ animation: "fade-up 0.35s ease both", animationDelay: "240ms" }}>
              <rect x="336" y="20" width="350" height="220" rx="8" fill="#411175" fillOpacity="0.04" stroke="#411175" strokeOpacity="0.2" strokeWidth="1" />
              <text x="350" y="44" fontFamily="'DM Mono', monospace" fontSize="9" fill="#411175" fillOpacity="0.6">TARGET STATE</text>
              <text x="511" y="80" textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="13" fontWeight="600" fill="#411175">Administrative Registry Domain</text>
              {[
                ["Members", "member_id · status · join_date · employer"],
                ["Employers", "employer_id · name · sector_id"],
                ["Units", "unit_id · employer_id · classification"],
                ["Dues Ledger", "transaction_id · member_id · amount · period"],
              ].map(([entity, fields], i) => (
                <g key={entity as string}>
                  <rect x="350" y={98 + i * 34} width="320" height="28" rx="4" fill="#ffffff" stroke="rgba(65,17,117,0.1)" strokeWidth="0.5" />
                  <text x="362" y={116 + i * 34} fontFamily="'Work Sans', system-ui, sans-serif" fontSize="11" fontWeight="500" fill="#000000">{entity}</text>
                  <text x="462" y={116 + i * 34} fontFamily="'DM Mono', monospace" fontSize="8.5" fill="rgba(0,0,0,0.3)">{fields}</text>
                </g>
              ))}
            </g>
          </svg>

          <div className="grid grid-cols-3 gap-6 mb-10">
            <StatCallout value="350k+" label="Records in Unionware today" />
            <StatCallout value="24h" label="Current batch sync interval" />
            <StatCallout value="5" label="Migration phases to retirement" />
          </div>

          <section className="mb-10">
            <SectionLabel number="01" label="What this layer owns" />
            <p className="text-sm font-light text-black/60 leading-relaxed mb-4">
              The Administrative Registry Domain is the institutional authority for membership, dues, and administrative truth. It currently lives in Unionware and is transitioning to a purpose-built registry domain built on PostgreSQL with explicit event emission.
            </p>
            <Callout variant="accent">
              <strong>Key principle:</strong> The registry is authoritative for status, not behavior. It tells the ecosystem who is officially a member — the intelligence and workflow layers determine what to do about it.
            </Callout>
          </section>

          <section className="mb-10">
            <SectionLabel number="02" label="Technology direction" />
            <p className="text-sm font-light text-black/60 leading-relaxed mb-3">
              The domain should be built as a transactionally reliable relational domain — closer to a modern administrative platform than a CMS or conventional CRM.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Primary database", value: "PostgreSQL — mature relational model, strong transactional guarantees" },
                { label: "Service layer", value: "TypeScript / Node.js — ecosystem-aligned, developer familiarity" },
                { label: "ORM pattern", value: "Prisma or Drizzle — explicit schema control preferred over rapid CRUD" },
                { label: "Event emission", value: "Transactional outbox pattern — prevents state changes without corresponding events" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-grey rounded-lg p-4">
                  <p className="font-mono text-[10px] text-black/30 uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-sm font-light text-black/70 leading-snug">{value}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === "boundaries" && (
        <div className="animate-fade-up">
          <Callout variant="accent" className="mb-6">
            <strong>Owns:</strong> Official member registry, dues processing, employer/unit/sector taxonomies, Finance-controlled member creation and reactivation, privileged administrative verification artifacts, long-term administrative truth for official membership status.
          </Callout>

          <DataTable
            headers={["Domain question", "Answer lives here", "Not here"]}
            rows={[
              ["Is this person officially a member?", "Administrative Registry", "Identity Domain"],
              ["What is their dues status?", "Administrative Registry", "Member Intelligence"],
              ["Who is their employer?", "Administrative Registry", "Applications"],
              ["Are they logged in?", "IdP / SSO", "Administrative Registry"],
              ["What should happen next for them?", "Member Intelligence", "Administrative Registry"],
              ["What content should they see?", "Content & Publishing", "Administrative Registry"],
            ]}
            className="mb-6"
          />

          <SectionLabel number="01" label="Non-negotiable boundaries" />
          <div className="flex flex-col gap-3 mb-6">
            {[
              "Member ID remains Finance-controlled — no self-serve member creation",
              "The registry holds administrative truth, not behavioral logic",
              "Dues records are Finance-adjacent and require strict access controls",
              "Events are the only integration mechanism for downstream consumers",
              "No duplication of operational logic from other domains",
            ].map((rule) => (
              <div key={rule} className="flex items-start gap-3 py-2.5 border-b border-black/6">
                <span className="w-1 h-1 rounded-full bg-purple-power mt-2 flex-shrink-0" />
                <span className="text-sm font-light text-black/70">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "integration" && (
        <div className="animate-fade-up">
          <section className="mb-10">
            <SectionLabel number="01" label="Integration evolution" />
            <FlowSteps
              steps={[
                {
                  title: "Phase 1 — Batch sync and direct queries",
                  body: "Unionware currently provides data via 24-hour batch synchronization and direct queries. The mobile app maintains a MySQL shadow layer synchronized from Unionware.",
                },
                {
                  title: "Phase 2 — Webhook and adapter layer",
                  body: "Thin adapters wrap Unionware to emit webhooks. Function-based integration adapters handle transformation, validation, and fan-out to multiple consumers without requiring Unionware to know about them.",
                },
                {
                  title: "Phase 3 — Event backbone integration",
                  body: "The new Administrative Registry Domain publishes domain events directly into the shared Event Backbone. All downstream consumers subscribe independently.",
                },
              ]}
            />
          </section>

          <section className="mb-10">
            <SectionLabel number="02" label="Domain events emitted" />
            <CodeBlock>{`{
  "event_type": "member.reactivated",
  "event_version": 1,
  "occurred_at": "2026-04-22T20:00:00Z",
  "producer": "administrative_registry",
  "entity_type": "member",
  "entity_id": "12345",
  "payload": {
    "member_id": "12345",
    "status": "active",
    "reactivated_at": "2026-04-22T20:00:00Z",
    "employer_id": "emp_001",
    "unit_id": "unit_042"
  }
}`}</CodeBlock>
          </section>

          <section className="mb-10">
            <SectionLabel number="03" label="Downstream consumers" />
            <DataTable
              headers={["Consumer", "Events consumed", "What it does with them"]}
              rows={[
                ["Identity Domain", "member.created, member.reactivated", "Links person_id ↔ member_id, maintains continuity"],
                ["Member Intelligence", "member.status_changed, dues.processed", "Updates lifecycle state, triggers cohort logic"],
                ["Workflow & Case", "member.created, member.reactivated", "Opens follow-up tasks if data is incomplete"],
                ["IdP / SSO", "member.created", "Provides context for auth account creation"],
                ["Analytics", "All registry events", "Records institutional event stream for reporting"],
              ]}
            />
          </section>
        </div>
      )}

      {activeTab === "transition" && (
        <div className="animate-fade-up">
          <section className="mb-10">
            <SectionLabel number="01" label="Migration sequence — strangler pattern" />
            <FlowSteps
              steps={[
                {
                  title: "Extract identity linkage",
                  body: "Decouple identity from Unionware. Introduce the canonical Identity Domain that maps Unionware member_id to a stable person_id. Unionware remains authoritative.",
                },
                {
                  title: "Introduce event outputs",
                  body: "Build thin outward-facing adapters that emit Unionware state changes as domain events. Begin publishing member.created, member.updated, member.status_changed.",
                },
                {
                  title: "Build new registry services",
                  body: "Stand up the PostgreSQL-backed Administrative Registry Domain in parallel. Begin replicating Unionware data into the new registry with event-driven sync.",
                },
                {
                  title: "Migrate workflows",
                  body: "Gradually shift Finance workflows, member creation flows, dues processing, and employer taxonomy stewardship to the new domain. Redirect downstream consumers.",
                },
                {
                  title: "Retire Unionware",
                  body: "Once the new registry is operationally complete and all consuming systems have migrated, decommission Unionware's administrative role.",
                },
              ]}
            />
          </section>

          <section className="mb-6">
            <SectionLabel number="02" label="Open questions" />
            <div className="flex flex-col gap-3">
              <Flag>
                <strong>Unionware API capability</strong>
                What webhook or API capabilities does Unionware expose today? This determines whether a thin adapter is feasible or whether CDC-style capture is required.
              </Flag>
              <Flag>
                <strong>Data cleanup strategy</strong>
                The employer taxonomy inconsistencies and missing email records require a deliberate data quality program before the new registry can serve as the primary truth.
              </Flag>
              <Flag>
                <strong>Employer taxonomy normalization</strong>
                Thousands of job classifications exist due to employer variation. A normalization strategy and governance model are required before migration begins.
              </Flag>
            </div>
          </section>
        </div>
      )}
    </PageContent>
  );
}
