import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { Callout } from "@/components/artifacts/Callout";

export default function FutureStatePage() {
  return (
    <PageContent>
      <PageHeader
        eyebrow="Overview · Future State"
        title="Future State"
        titleAccent="Future"
        description="The target state is not a single CRM replacing everything. It is a SEIU Core Platform supported by shared infrastructure and connected to specialized domain applications — each with clear ownership and boundaries."
        meta={[
          { label: "Status", value: "Target" },
          { label: "Horizon", value: "Stages 1–6" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      {/* Target state domain map */}
      <div className="mb-12 animate-fade-up">
        <svg
          role="img"
          aria-label="Target-state domain model and dependency architecture"
          viewBox="0 0 700 500"
          width="100%"
        >
          <defs>
            <marker id="fs-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="rgba(0,0,0,0.25)" />
            </marker>
          </defs>

          {/* SEIU Core Platform container */}
          <rect x="0" y="0" width="700" height="350" rx="8" fill="#411175" fillOpacity="0.025" stroke="#411175" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="5 4" />
          <text x="14" y="18" fontFamily="'DM Mono', monospace" fontSize="9" fill="#411175" fillOpacity="0.5">SEIU CORE PLATFORM</text>

          {[
            { n: 1, name: "Administrative Registry", desc: "Registry · Dues · Taxonomy", x: 14, y: 30, w: 200 },
            { n: 2, name: "Identity", desc: "Canonical person · Crosswalks", x: 232, y: 30, w: 200 },
            { n: 3, name: "IdP / SSO", desc: "Auth · MFA · Tokens · SSO", x: 450, y: 30, w: 234 },
            { n: 4, name: "Event Backbone", desc: "Transport · Fan-out · Retry", x: 14, y: 135, w: 200 },
            { n: 5, name: "Member Intelligence", desc: "Lifecycle · Scoring · Nudges", x: 232, y: 135, w: 200 },
            { n: 6, name: "Workflow & Case", desc: "Casework · Tasks · Queues", x: 450, y: 135, w: 234 },
          ].map(({ n, name, desc, x, y, w }, i) => (
            <g key={n} style={{ animation: "fade-up 0.35s ease both", animationDelay: `${i * 60}ms` }}>
              <rect x={x + 6} y={y + 26} width={w - 12} height={74} rx="6" fill="#ffffff" stroke="rgba(65,17,117,0.15)" strokeWidth="1" />
              <rect x={x + 14} y={y + 34} width="24" height="22" rx="4" fill="#411175" fillOpacity="0.08" />
              <text x={x + 26} y={y + 49} textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="10" fontWeight="500" fill="#411175">{n}</text>
              <text x={x + 46} y={y + 49} fontFamily="'Work Sans', system-ui, sans-serif" fontSize="12" fontWeight="500" fill="#000000">{name}</text>
              <text x={x + 46} y={y + 64} fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.3)">{desc}</text>
            </g>
          ))}

          {/* Domain applications row */}
          <g style={{ animation: "fade-up 0.35s ease both", animationDelay: "360ms" }}>
            <rect x="14" y="243" width="200" height="90" rx="6" fill="#ffffff" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
            <text x="26" y="264" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.3)">LAYER 7</text>
            <text x="26" y="280" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="12" fontWeight="500" fill="#000000">Applications & Nodes</text>
            <text x="26" y="296" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.3)">Mobile · WF · TC · My65+</text>
            <text x="26" y="314" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.25)">Consume core · Emit events</text>
          </g>

          {/* Content domain */}
          <g style={{ animation: "fade-up 0.35s ease both", animationDelay: "420ms" }}>
            <rect x="232" y="243" width="452" height="90" rx="6" fill="#ffffff" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
            <text x="244" y="264" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.3)">LAYER 8</text>
            <text x="244" y="280" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="12" fontWeight="500" fill="#000000">Content & Publishing</text>
            <text x="244" y="296" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.3)">Strapi · Editorial content · Campaigns · Projections</text>
            <text x="244" y="314" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.25)">Pure content layer — not auth, not policy, not workflow</text>
          </g>

          {/* Integration model label */}
          <rect x="0" y="370" width="700" height="120" rx="8" fill="#ffffff" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
          <text x="14" y="392" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.25)">INTEGRATION MODEL</text>
          {[
            { phase: "Phase 1", desc: "Direct integration — webhooks", x: 14 },
            { phase: "Phase 2", desc: "Function/adapter layer with fan-out", x: 238 },
            { phase: "Phase 3", desc: "Event-driven architecture", x: 462 },
          ].map(({ phase, desc, x }, i) => (
            <g key={phase} style={{ animation: "fade-up 0.35s ease both", animationDelay: `${480 + i * 60}ms` }}>
              <rect x={x} y={400} width={210} height={78} rx="5" fill="#EEEEEE" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
              <text x={x + 10} y={422} fontFamily="'DM Mono', monospace" fontSize="9" fontWeight="500" fill="#411175">{phase}</text>
              <text x={x + 10} y={440} fontFamily="'Work Sans', system-ui, sans-serif" fontSize="11" fill="rgba(0,0,0,0.6)">{desc}</text>
              {i < 2 && (
                <line x1={x + 215} y1={440} x2={x + 232} y2={440} stroke="rgba(0,0,0,0.2)" strokeWidth="1" markerEnd="url(#fs-arrow)" />
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* SEIU Core Platform */}
      <section className="mb-10 animate-fade-up" style={{ animationDelay: "60ms" }}>
        <SectionLabel number="01" label="SEIU Core Platform" />
        <p className="text-sm font-light text-black/60 leading-relaxed mb-4">
          In the final end state, several core domains may be delivered on the same underlying institutional platform. That platform should be called the <strong className="font-medium text-black">SEIU Core Platform</strong> — not simply "the CRM."
        </p>
        <Callout variant="accent">
          <strong>Why not "the CRM":</strong> The full target state is broader than CRM. It includes administrative registry and dues responsibilities, canonical identity, workflow and case management, and lifecycle intelligence/orchestration. <strong>Member Intelligence Domain</strong> is the part most closely aligned with CRM semantics, but it is only one layer of eight.
        </Callout>
      </section>

      {/* Domain ownership table */}
      <section className="mb-10 animate-fade-up" style={{ animationDelay: "120ms" }}>
        <SectionLabel number="02" label="Domain ownership model" />
        <div className="border border-black/10 rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 bg-grey px-3.5 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-black/30">Layer</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-black/30">Owns</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-black/30">Does not own</span>
          </div>
          {[
            {
              layer: "1 · Administrative Registry",
              owns: "Member registry, dues, employer taxonomy, finance workflows",
              notown: "Authentication, editorial, lifecycle orchestration",
            },
            {
              layer: "2 · Identity",
              owns: "Canonical person record, crosswalks, merge/reconciliation",
              notown: "Auth credentials, dues truth, lifecycle scoring",
            },
            {
              layer: "3 · IdP / SSO",
              owns: "Authentication, MFA, tokens, session trust",
              notown: "Roles as business source of truth, lifecycle intelligence",
            },
            {
              layer: "4 · Event Backbone",
              owns: "Event transport, fan-out, delivery/retry, observability",
              notown: "Business data, workflows, application state",
            },
            {
              layer: "5 · Member Intelligence",
              owns: "Lifecycle state, engagement, cohorts, triggers, scoring",
              notown: "Raw finance truth, authentication, editorial, deep domain workflows",
            },
            {
              layer: "6 · Workflow & Case",
              owns: "Cases, tasks, queues, assignments, audit logs, grievance cases",
              notown: "Canonical identity, registry truth, lifecycle scoring",
            },
            {
              layer: "7 · Applications & Nodes",
              owns: "Domain-specific workflows, node UI/UX, operational state",
              notown: "Canonical identity, institution-wide orchestration",
            },
            {
              layer: "8 · Content & Publishing",
              owns: "Editorial content, projections, publishing workflows",
              notown: "Workflow data, auth, canonical identity",
            },
          ].map((row, i) => (
            <div
              key={row.layer}
              className="grid grid-cols-3 px-3.5 py-3 border-b border-black/6 hover:bg-black/2 last:border-0"
            >
              <span className="font-mono text-[10px] text-purple-power pr-3">{row.layer}</span>
              <span className="text-sm font-light text-black/60 pr-3 leading-snug">{row.owns}</span>
              <span className="text-sm font-light text-black/40 leading-snug">{row.notown}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Implementation stages */}
      <section className="mb-10 animate-fade-up" style={{ animationDelay: "180ms" }}>
        <SectionLabel number="03" label="Implementation sequence" />
        <div className="flex flex-col gap-0">
          {[
            {
              stage: "Stage 1",
              title: "Establish foundations",
              desc: "Domain boundaries finalized, identity model finalized, IdP selected and stood up, initial integration contracts defined, event backbone strategy agreed.",
            },
            {
              stage: "Stage 2",
              title: "Introduce canonical identity and shared auth",
              desc: "Canonical person model introduced, IdP integrated with initial surfaces, mobile app auth begins transition away from Strapi-mediated auth.",
            },
            {
              stage: "Stage 3",
              title: "Introduce member intelligence and workflow foundations",
              desc: "Relationship state tracking begins, campaign/prospect onboarding flows connected, workflow/case architecture begins replacing scattered ticketing logic.",
            },
            {
              stage: "Stage 4",
              title: "Expand node integrations",
              desc: "Training Centre systems emit lifecycle events, WorkersFirst and My65+ integrations deepen, Strapi content projections mature.",
            },
            {
              stage: "Stage 5",
              title: "Administrative migration",
              desc: "Registry, dues, and admin functions progressively shift from Unionware to the new administrative domain.",
            },
            {
              stage: "Stage 6",
              title: "Mature target state",
              desc: "Event-driven ecosystem is dominant, Strapi functions purely in content/publishing scope, Member Intelligence becomes the institutional orchestration layer.",
            },
          ].map(({ stage, title, desc }, i) => (
            <div key={stage} className="relative flex gap-6 pb-6">
              <div className="flex flex-col items-center">
                <div className="w-[34px] h-[34px] rounded-full bg-grey border border-black/12 flex items-center justify-center font-mono text-[10px] text-black/30 flex-shrink-0 z-10">
                  {i + 1}
                </div>
                {i < 5 && <div className="w-px flex-1 bg-black/10 mt-1" />}
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] text-purple-power">{stage}</span>
                </div>
                <p className="text-sm font-medium text-black mb-1">{title}</p>
                <p className="text-sm font-light text-black/50 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageContent>
  );
}
