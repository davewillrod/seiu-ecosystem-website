import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { Callout } from "@/components/artifacts/Callout";
import { StatCallout } from "@/components/artifacts/StatCallout";

export default function EcosystemOverviewPage() {
  return (
    <PageContent>
      <PageHeader
        eyebrow="Overview · Architecture"
        title="Ecosystem Architecture"
        titleAccent="Architecture"
        description="The SEIU ecosystem is designed as a coordinated institutional platform — not a monolith. Specialized domains connected through shared identity, controlled data flows, and event-driven integration."
        meta={[
          { label: "Status", value: "Foundational" },
          { label: "Governs", value: "All workstreams" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      {/* Layer stack diagram */}
      <div className="mb-12 animate-fade-up">
        <svg
          role="img"
          aria-label="SEIU Ecosystem — 8-layer dependency stack"
          viewBox="0 0 700 520"
          width="100%"
          className="mb-2"
        >
          <defs>
            <marker id="arrow-down" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L3,6 L6,0 z" fill="rgba(0,0,0,0.2)" />
            </marker>
          </defs>

          {[
            { n: 1, name: "Administrative Registry", desc: "Membership truth · Dues · Employer taxonomy", delay: 0 },
            { n: 2, name: "Identity", desc: "Canonical person · Crosswalks · Reconciliation", delay: 60 },
            { n: 3, name: "IdP / SSO", desc: "Authentication · MFA · Token issuance · SSO", delay: 120 },
            { n: 4, name: "Event Backbone", desc: "Event transport · Fan-out · Retry · Observability", delay: 180 },
            { n: 5, name: "Member Intelligence", desc: "Lifecycle state · Scoring · Orchestration", delay: 240 },
            { n: 6, name: "Workflow & Case", desc: "Casework · Tasks · Queues · Grievance handling", delay: 300 },
            { n: 7, name: "Applications & Nodes", desc: "Mobile · WorkersFirst · Training · My65+", delay: 360 },
            { n: 8, name: "Content & Publishing", desc: "Editorial hub · Campaign publishing · Strapi", delay: 420 },
          ].map(({ n, name, desc, delay }, i) => {
            const y = i * 58 + 10;
            return (
              <g key={n} style={{ animation: "fade-up 0.35s ease both", animationDelay: `${delay}ms` }}>
                {/* Row background */}
                <rect x="0" y={y} width="700" height="48" rx="6" fill="#ffffff" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
                {/* Layer number pill */}
                <rect x="12" y={y + 10} width="28" height="28" rx="5" fill="#411175" fillOpacity="0.08" stroke="#411175" strokeOpacity="0.15" strokeWidth="0.5" />
                <text x="26" y={y + 28} textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="11" fontWeight="500" fill="#411175">{n}</text>
                {/* Layer name */}
                <text x="56" y={y + 20} fontFamily="'Work Sans', system-ui, sans-serif" fontSize="13" fontWeight="500" fill="#000000">{name}</text>
                {/* Layer desc */}
                <text x="56" y={y + 36} fontFamily="'DM Mono', monospace" fontSize="9.5" fill="rgba(0,0,0,0.3)">{desc}</text>
                {/* Dependency arrow — except last */}
                {i < 7 && (
                  <line x1="26" y1={y + 48} x2="26" y2={y + 56} stroke="rgba(0,0,0,0.15)" strokeWidth="1" markerEnd="url(#arrow-down)" />
                )}
              </g>
            );
          })}

          {/* Label */}
          <text x="690" y="30" textAnchor="end" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.2)">DEPENDENCY FLOWS DOWNWARD</text>
        </svg>
        <p className="font-mono text-[10px] text-black/25 text-center">
          Layer ordering reflects dependency and trust flow — not strategic importance
        </p>
      </div>

      {/* Stats */}
      <div
        className="grid grid-cols-3 gap-6 mb-12 animate-fade-up"
        style={{ animationDelay: "60ms" }}
      >
        <StatCallout value="350k+" label="Member records in Unionware" />
        <StatCallout value="8" label="Ecosystem layers" />
        <StatCallout value="5" label="Separate login environments today" />
      </div>

      {/* Strategic thesis */}
      <section className="mb-10 animate-fade-up" style={{ animationDelay: "120ms" }}>
        <SectionLabel number="01" label="Strategic thesis" />
        <p className="text-sm font-light text-black/60 leading-relaxed mb-4">
          SEIU's digital future is not a single monolithic platform. It is a <strong className="font-medium text-black">coordinated institutional ecosystem</strong> — specialized systems connected through shared identity, controlled data flows, and event-driven integration.
        </p>
        <p className="text-sm font-light text-black/60 leading-relaxed mb-4">
          The ecosystem exists to serve a worker across multiple stages of life and work: prospecting and organizing, membership and representation, training and credentialing, shift access and workforce placement, retirement savings, and ambient member engagement.
        </p>
        <Callout variant="accent">
          <strong>The architectural objective</strong> is not to collapse every function into one application. The objective is to make the ecosystem operate like <strong>one institution</strong>, while preserving clean domain boundaries.
        </Callout>
      </section>

      {/* What the target state is */}
      <section className="mb-10 animate-fade-up" style={{ animationDelay: "180ms" }}>
        <SectionLabel number="02" label="Target state in one sentence per domain" />
        <div className="flex flex-col gap-2">
          {[
            { label: "One canonical person identity", across: "across the entire ecosystem" },
            { label: "One shared authentication plane", across: "for all applications and nodes" },
            { label: "One institutional administrative truth", across: "for registry and dues" },
            { label: "One member intelligence layer", across: "for lifecycle, orchestration, and signals" },
            { label: "One workflow/case domain", across: "for operational casework and service handling" },
            { label: "One content system", across: "for editorial publishing and projections" },
            { label: "Independent domain applications", across: "for specialized operational workflows" },
            { label: "An event backbone", across: "that coordinates the system without tight coupling" },
          ].map(({ label, across }) => (
            <div key={label} className="flex items-baseline gap-3 py-2.5 border-b border-black/6">
              <span className="text-sm font-medium text-black">{label}</span>
              <span className="text-sm font-light text-black/40">{across}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Identity separation */}
      <section className="mb-10 animate-fade-up" style={{ animationDelay: "240ms" }}>
        <SectionLabel number="03" label="Separation of identity concerns" />
        <p className="text-sm font-light text-black/60 leading-relaxed mb-4">
          The four identity-adjacent questions are answered by four different domains. Conflating them is the root cause of most current-state complexity.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { q: "Are they a member?", domain: "Administrative Registry", n: 1 },
            { q: "Who is this person across systems?", domain: "Identity Domain", n: 2 },
            { q: "Are they logged in?", domain: "IdP / SSO", n: 3 },
            { q: "What should we do with them?", domain: "Member Intelligence", n: 5 },
          ].map(({ q, domain, n }) => (
            <div key={q} className="bg-white border border-black/10 rounded-lg p-4">
              <p className="font-mono text-[10px] text-black/30 mb-2">{q}</p>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-sm bg-purple-power/8 border border-purple-power/15 flex items-center justify-center">
                  <span className="font-mono text-[9px] text-purple-power">{n}</span>
                </span>
                <span className="text-sm font-medium text-black">{domain}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guiding principles */}
      <section className="mb-10 animate-fade-up" style={{ animationDelay: "300ms" }}>
        <SectionLabel number="04" label="Guiding principles" />
        <div className="flex flex-col gap-0">
          {[
            "The ecosystem is coordinated, not monolithic.",
            "Administrative truth, identity, intelligence, workflow/case, and content are separate domains.",
            "Authentication is centralized; authorization is distributed.",
            "Canonical identity is independent of any one application or member ID.",
            "Workflow/case data is not content; sensitive grievance data requires stronger boundaries.",
            "Strapi remains the content hub, not the long-term policy or auth engine.",
            "The event backbone is a first-class architectural layer.",
            "Legacy systems are strangled incrementally, not replaced in a big bang.",
            "System consolidation only happens where it reduces complexity without collapsing domain integrity.",
            "All future workstreams should inherit their boundaries from this document.",
          ].map((p, i) => (
            <div key={i} className="flex items-baseline gap-4 py-2.5 border-b border-black/6">
              <span className="font-mono text-[10px] text-purple-power flex-shrink-0 w-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-light text-black/70">{p}</span>
            </div>
          ))}
        </div>
      </section>
    </PageContent>
  );
}
