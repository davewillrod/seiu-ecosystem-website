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
import { StatCallout } from "@/components/artifacts/StatCallout";
import { CodeBlock } from "@/components/artifacts/CodeBlock";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "boundaries", label: "Boundaries" },
  { id: "integration", label: "Integration" },
  { id: "transition", label: "Transition" },
];

export default function EventBackbonePage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <PageContent>
      <PageHeader
        eyebrow="Layer 4 · Event Backbone"
        title="Event Backbone"
        titleAccent="Backbone"
        description="The shared integration layer responsible for transporting state-change events across the ecosystem reliably and without tight coupling. The connective tissue between all eight layers."
        meta={[
          { label: "Layer", value: "4 of 8" },
          { label: "Status", value: "Finalized" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === "overview" && (
        <div className="animate-fade-up">
          {/* Fan-out diagram */}
          <svg
            role="img"
            aria-label="Event Backbone — producer to consumer fan-out architecture"
            viewBox="0 0 700 380"
            width="100%"
            className="mb-10"
          >
            <defs>
              <marker id="eb-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="rgba(0,0,0,0.25)" />
              </marker>
            </defs>

            {/* Producers column */}
            <text x="14" y="18" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.25)">PRODUCERS</text>
            {[
              "Administrative Registry",
              "Identity Domain",
              "IdP / SSO",
              "Applications & Nodes",
              "Workflow & Case",
            ].map((producer, i) => {
              const y = 28 + i * 58;
              return (
                <g key={producer} style={{ animation: "fade-up 0.35s ease both", animationDelay: `${i * 50}ms` }}>
                  <rect x="14" y={y} width="180" height="42" rx="5" fill="#ffffff" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
                  <text x="24" y={y + 26} fontFamily="'Work Sans', system-ui, sans-serif" fontSize="11" fontWeight="500" fill="#000000">{producer}</text>
                  <line x1="194" y1={y + 21} x2="270" y2={y + 21} stroke="rgba(0,0,0,0.15)" strokeWidth="1" markerEnd="url(#eb-arrow)" />
                </g>
              );
            })}

            {/* Event Backbone */}
            <g style={{ animation: "fade-up 0.4s ease both", animationDelay: "60ms" }}>
              <rect x="278" y="20" width="154" height="316" rx="8" fill="#411175" fillOpacity="0.06" stroke="#411175" strokeOpacity="0.25" strokeWidth="1.5" />
              <text x="355" y="60" textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="13" fontWeight="600" fill="#411175">Event</text>
              <text x="355" y="80" textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="13" fontWeight="600" fill="#411175">Backbone</text>
              {[
                "Fan-out",
                "Retry",
                "Dead-letter",
                "Ordering",
                "Observability",
                "At-least-once",
              ].map((cap, i) => (
                <g key={cap}>
                  <circle cx="296" cy={116 + i * 30} r="2.5" fill="#411175" fillOpacity="0.4" />
                  <text x="306" y={120 + i * 30} fontFamily="'DM Mono', monospace" fontSize="9" fill="#411175" fillOpacity="0.6">{cap}</text>
                </g>
              ))}
            </g>

            {/* Consumers column */}
            <text x="452" y="18" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.25)">CONSUMERS</text>
            {[
              "Member Intelligence",
              "Identity Domain",
              "Workflow & Case",
              "Content & Publishing",
              "Analytics / Reporting",
            ].map((consumer, i) => {
              const y = 28 + i * 58;
              return (
                <g key={consumer} style={{ animation: "fade-up 0.35s ease both", animationDelay: `${250 + i * 50}ms` }}>
                  <line x1="432" y1={y + 21} x2="452" y2={y + 21} stroke="rgba(0,0,0,0.15)" strokeWidth="1" markerEnd="url(#eb-arrow)" />
                  <rect x="452" y={y} width="234" height="42" rx="5" fill="#ffffff" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
                  <text x="462" y={y + 26} fontFamily="'Work Sans', system-ui, sans-serif" fontSize="11" fontWeight="500" fill="#000000">{consumer}</text>
                </g>
              );
            })}
          </svg>

          <div className="grid grid-cols-3 gap-6 mb-10">
            <StatCallout value="3" label="Integration maturity phases" />
            <StatCallout value="∞" label="Fan-out — any subscriber, no producer coupling" />
            <StatCallout value="ALO" label="At-least-once delivery default" />
          </div>

          <section className="mb-10">
            <SectionLabel number="01" label="Why the backbone exists" />
            <p className="text-sm font-light text-black/60 leading-relaxed mb-4">
              Without a backbone, the ecosystem degrades into point-to-point integrations, duplicated business logic across systems, fragile orchestration embedded in application code, and poor observability of what changed, when, and why.
            </p>
            <Callout variant="accent">
              <strong>Core rule:</strong> Producers publish events about changes inside their own domain. Consumers decide what the event means for their own domain. The producer never embeds the consumer's reaction logic.
            </Callout>
          </section>

          <section className="mb-10">
            <SectionLabel number="02" label="Events vs APIs" />
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-grey rounded-lg p-4">
                <p className="font-mono text-[10px] text-purple-power uppercase tracking-wider mb-2">Use the Event Backbone when</p>
                <div className="flex flex-col gap-1.5">
                  {[
                    "A state change occurred",
                    "Multiple systems may need to react",
                    "Asynchronous propagation is acceptable",
                    "Decoupling is strategically important",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-purple-power flex-shrink-0" />
                      <span className="text-sm font-light text-black/60">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-grey rounded-lg p-4">
                <p className="font-mono text-[10px] text-black/30 uppercase tracking-wider mb-2">Use APIs when</p>
                <div className="flex flex-col gap-1.5">
                  {[
                    "An immediate synchronous read is required",
                    "A user-facing request needs a direct answer",
                    "A system needs current operational data",
                    "Transactional consistency is required",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-black/20 flex-shrink-0" />
                      <span className="text-sm font-light text-black/60">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === "boundaries" && (
        <div className="animate-fade-up">
          <Callout variant="accent" className="mb-6">
            <strong>Owns:</strong> Event transport, publish/subscribe routing, delivery/retry mechanics, dead-letter handling, topic/queue structure, event envelope standards, shared event security and transport policies, observability of event movement through the system.
          </Callout>

          <Callout className="mb-6">
            <strong>Does not own:</strong> Canonical identity, member registry truth, lifecycle intelligence, workflow execution, content publishing logic, application authorization, or domain-specific business logic. It is a transport and integration layer — not a business domain.
          </Callout>

          <SectionLabel number="01" label="Domain event catalog" />
          <DataTable
            headers={["Domain", "Events emitted"]}
            rows={[
              ["Administrative Registry", "member.created · member.updated · member.status_changed · member.reactivated · dues.processed"],
              ["Identity", "person.created · identity.linked · identity.merged · person.reactivated"],
              ["IdP / SSO", "auth.account.created · auth.login.succeeded · auth.account.disabled"],
              ["Member Intelligence", "lifecycle.updated · cohort.entered · risk.score_changed · nudge.triggered"],
              ["Workflow & Case", "case.created · case.assigned · case.updated · case.closed · grievance.opened"],
              ["Applications & Nodes", "credential.completed · workersfirst.shift.completed · my65plus.enrolled · training.enrollment.started"],
            ]}
            className="mb-6"
          />

          <SectionLabel number="02" label="Good vs bad events" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-mono text-[10px] text-purple-power uppercase tracking-wider mb-3">Good events represent</p>
              {["A state change", "A completed action", "A business milestone", "A workflow transition", "An identity linkage or merge"].map((item) => (
                <div key={item} className="flex items-center gap-2 py-1.5 border-b border-black/6">
                  <span className="w-1 h-1 rounded-full bg-purple-power flex-shrink-0" />
                  <span className="text-sm font-light text-black/70">{item}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="font-mono text-[10px] text-black/30 uppercase tracking-wider mb-3">Bad events are</p>
              {["Low-level implementation noise", "Generic logging messages", "Duplicated status pings", "Events with no stable domain meaning"].map((item) => (
                <div key={item} className="flex items-center gap-2 py-1.5 border-b border-black/6">
                  <span className="w-1 h-1 rounded-full bg-black/20 flex-shrink-0" />
                  <span className="text-sm font-light text-black/50">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "integration" && (
        <div className="animate-fade-up">
          <section className="mb-10">
            <SectionLabel number="01" label="Standard event envelope" />
            <CodeBlock>{`{
  "event_id":      "uuid",
  "event_type":    "member.reactivated",
  "event_version": 1,
  "occurred_at":   "2026-04-22T20:00:00Z",
  "producer":      "administrative_registry",
  "entity_type":   "member",
  "entity_id":     "12345",
  "correlation_id": "uuid-or-workflow-id",
  "causation_id":   "uuid-or-previous-event-id",
  "payload": {
    "member_id":      "12345",
    "status":         "active",
    "reactivated_at": "2026-04-22T20:00:00Z"
  }
}`}</CodeBlock>
          </section>

          <section className="mb-10">
            <SectionLabel number="02" label="Reliability patterns" />
            <DataTable
              headers={["Pattern", "Purpose", "Where required"]}
              rows={[
                ["Transactional outbox", "Prevents state changes committing without event publication", "Administrative Registry (mandatory)"],
                ["Idempotent consumers", "Safe handling of duplicate at-least-once delivery", "All consumers"],
                ["Dead-letter queues", "Captures failed messages for inspection and replay", "All topics"],
                ["Replay support", "Rebuild projections or recover consumers after outages", "Critical event streams"],
                ["Ordering guarantees", "Per-entity ordering where sequence matters", "Identity events, lifecycle transitions"],
              ]}
              className="mb-6"
            />
          </section>

          <section className="mb-10">
            <SectionLabel number="03" label="Platform options" />
            <DataTable
              headers={["Platform", "Best fit when", "Trade-offs"]}
              rows={[
                ["AWS SNS + SQS", "SEIU standardizes on AWS; wants simplicity and low ops overhead", "Less powerful replay; queue-per-consumer fan-out pattern"],
                ["Kafka / managed Kafka", "High event volume; advanced stream processing; replay-heavy architecture", "Higher operational and architectural weight"],
                ["Google Pub/Sub", "GCP-oriented stack", "Less natural if the rest of the stack is AWS/Node-oriented"],
              ]}
            />
          </section>
        </div>
      )}

      {activeTab === "transition" && (
        <div className="animate-fade-up">
          <section className="mb-10">
            <SectionLabel number="01" label="Integration maturity phases" />
            <FlowSteps
              steps={[
                {
                  title: "Phase 1 — Direct integration (webhooks)",
                  body: "Systems integrate via direct webhooks. Producer and consumer are tightly coupled. Acceptable for early-stage integrations where speed matters and the coupling is explicitly temporary.",
                },
                {
                  title: "Phase 2 — Function/adapter layer",
                  body: "Integration adapters introduce transformation, validation, and fan-out. Producers no longer need to know all downstream consumers. Legacy systems like Unionware can emit events without deep rework.",
                },
                {
                  title: "Phase 3 — Shared event backbone",
                  body: "Producers publish domain events directly into the backbone. Consumers subscribe independently. At-least-once delivery, dead-letter handling, and observability are operational.",
                },
                {
                  title: "Phase 4 — Mature event platform",
                  body: "Contract governance, replay support, schema registry, richer stream processing where justified. Ecosystem-wide consistency in event publication and consumption.",
                },
              ]}
            />
          </section>

          <section className="mb-6">
            <SectionLabel number="02" label="Open questions" />
            <div className="flex flex-col gap-3">
              <Flag>
                <strong>Platform selection</strong>
                Which cloud/platform environment should anchor the backbone operationally — AWS SNS/SQS, Kafka, or something else? This decision should be made before Phase 3 begins.
              </Flag>
              <Flag>
                <strong>Schema registry timing</strong>
                Should SEIU adopt a formal schema registry early, or later once the number of contracts grows? Early governance prevents naming inconsistencies that are painful to retrofit.
              </Flag>
              <Flag>
                <strong>Outbox requirements in Phase 1</strong>
                Which events are operationally critical enough to require outbox-style guarantees from day one? Administrative Registry events are the obvious candidate.
              </Flag>
            </div>
          </section>
        </div>
      )}
    </PageContent>
  );
}
