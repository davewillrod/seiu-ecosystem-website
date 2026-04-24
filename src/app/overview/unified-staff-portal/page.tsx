import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { Callout } from "@/components/artifacts/Callout";
import { DataTable } from "@/components/artifacts/DataTable";

export default function UnifiedStaffPortalPage() {
  return (
    <PageContent>
      <PageHeader
        eyebrow="Overview · Staff Portal"
        title="Unified Staff Portal"
        titleAccent="Staff Portal"
        description="A single browser-based application giving SEIU staff cohesive control over members, operations, and programs — while the architecture remains modular and distributed underneath."
        meta={[
          { label: "Type", value: "Internal Application" },
          { label: "Users", value: "Staff · Internal" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      {/* Architecture diagram */}
      <div className="mb-12 animate-fade-up">
        <svg
          role="img"
          aria-label="Unified Staff Portal — portal surface over distributed architecture layers"
          viewBox="0 0 700 310"
          width="100%"
        >
          <defs>
            <marker id="sp-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="rgba(0,0,0,0.2)" />
            </marker>
          </defs>

          {/* Portal surface */}
          <g style={{ animation: "fade-up 0.35s ease both", animationDelay: "0ms" }}>
            <rect x="14" y="14" width="672" height="68" rx="8" fill="#411175" fillOpacity="0.07" stroke="#411175" strokeOpacity="0.3" strokeWidth="1.5" />
            <text x="26" y="32" fontFamily="'DM Mono', monospace" fontSize="9" fill="#411175" fillOpacity="0.5">STAFF WEB APPLICATION — BROWSER BASED · SSO + MFA</text>
            <text x="350" y="52" textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="14" fontWeight="600" fill="#411175">Unified Staff Portal</text>
            <text x="350" y="68" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="9" fill="#411175" fillOpacity="0.45">Member Search · Person 360 · Admin · Workflows · Intelligence</text>
          </g>

          {/* Portal → Auth line */}
          <line x1="350" y1="82" x2="350" y2="106" stroke="rgba(65,17,117,0.25)" strokeWidth="1.5" markerEnd="url(#sp-arrow)" />

          {/* IdP/SSO authentication box */}
          <g style={{ animation: "fade-up 0.35s ease both", animationDelay: "80ms" }}>
            <rect x="260" y="106" width="180" height="48" rx="6" fill="#ffffff" stroke="#411175" strokeOpacity="0.2" strokeWidth="1" />
            <text x="350" y="126" textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="12" fontWeight="500" fill="#000000">IdP / SSO</text>
            <text x="350" y="142" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.35)">Auth · MFA · Token issuance</text>
          </g>

          {/* Fan-out lines from auth to domain boxes */}
          {[66, 180, 294, 408, 522, 636].map((cx, i) => (
            <line
              key={i}
              x1="350"
              y1="154"
              x2={cx}
              y2="202"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="1"
              strokeDasharray="3 2"
              markerEnd="url(#sp-arrow)"
            />
          ))}

          {/* Domain layer boxes */}
          {[
            { n: "L1", name: "Registry", desc: "Members · Dues", x: 14 },
            { n: "L2", name: "Identity", desc: "Persons · Links", x: 128 },
            { n: "L5", name: "Intelligence", desc: "Lifecycle · Signals", x: 242 },
            { n: "L6", name: "Workflow", desc: "Cases · Tasks", x: 356 },
            { n: "L7", name: "Applications", desc: "My65+ · WF · TC", x: 470 },
            { n: "L8", name: "Content", desc: "Strapi · Editorial", x: 584 },
          ].map(({ n, name, desc, x }, i) => (
            <g key={n} style={{ animation: "fade-up 0.35s ease both", animationDelay: `${160 + i * 40}ms` }}>
              <rect x={x} y="202" width="104" height="78" rx="6" fill="#ffffff" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
              {/* Badge centered at top */}
              <rect x={x + 38} y="211" width="28" height="16" rx="3" fill="#411175" fillOpacity="0.07" />
              <text x={x + 52} y="223" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="9" fill="#411175">{n}</text>
              {/* Name and desc centered below badge */}
              <text x={x + 52} y="242" textAnchor="middle" fontFamily="'Work Sans', system-ui, sans-serif" fontSize="11" fontWeight="500" fill="#000000">{name}</text>
              <text x={x + 52} y="258" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.3)">{desc}</text>
            </g>
          ))}

          {/* Footer note */}
          <text x="350" y="298" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="9" fill="rgba(0,0,0,0.2)">Staff experience one system — architecture remains distributed</text>
        </svg>
      </div>

      {/* Section 01: What it replaces */}
      <section className="mb-10 animate-fade-up" style={{ animationDelay: "60ms" }}>
        <SectionLabel number="01" label="What it replaces" />
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-grey/60 border border-black/8 rounded-xl p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-black/30 mb-3">Current</p>
            <div className="flex flex-col gap-2">
              {[
                "Windows desktop application",
                "VPN requirement (Fortinet)",
                "Tightly coupled logic",
                "Hard to extend or integrate",
                "Limited cross-system visibility",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-black/20 flex-shrink-0" />
                  <span className="text-sm font-light text-black/50">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-black/10 rounded-xl p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-purple-power/60 mb-3">Target</p>
            <div className="flex flex-col gap-2">
              {[
                "Secure browser-based web application",
                "SSO + MFA — no VPN for most roles",
                "Writes through domain services, not databases",
                "Extensible and modular by design",
                "Unified cross-system visibility",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-purple-power flex-shrink-0" />
                  <span className="text-sm font-light text-black/60">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: Core capabilities */}
      <section className="mb-10 animate-fade-up" style={{ animationDelay: "120ms" }}>
        <SectionLabel number="02" label="Core capabilities" />
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              title: "Member & Person Search",
              desc: "Search by name, email, member ID, or phone. Unified lookup across identity sources and administrative records.",
            },
            {
              title: "Person 360 Profile",
              desc: "Identity links, membership data, lifecycle state, application usage, and open cases — all in one view.",
            },
            {
              title: "Administrative Registry",
              desc: "Create and update members, assign employer and bargaining unit, manage dues status and financial records.",
            },
            {
              title: "Identity Resolution",
              desc: "Merge duplicate records, resolve identity mismatches, and maintain crosswalk integrity across systems.",
            },
            {
              title: "Workflow & Cases",
              desc: "Support tickets, grievance cases (access-restricted), internal tasks, and operational queue management.",
            },
            {
              title: "Campaign & Intake",
              desc: "View campaign leads and intake submissions. Track conversion events through to My65+ enrollment.",
            },
            {
              title: "Member Intelligence",
              desc: "Lifecycle stage, engagement signals, and next-action recommendations surfaced for staff decision-making.",
            },
            {
              title: "Program Visibility",
              desc: "Status across My65+, WorkersFirst, and Training Centre — observable from a single authenticated session.",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-white border border-black/10 rounded-xl p-4">
              <p className="text-sm font-medium text-black mb-1.5 leading-snug">{title}</p>
              <p className="text-xs font-light text-black/50 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 03: Security & roles */}
      <section className="mb-10 animate-fade-up" style={{ animationDelay: "180ms" }}>
        <SectionLabel number="03" label="Security & roles" />
        <p className="text-sm font-light text-black/60 leading-relaxed mb-4">
          All staff authenticate via SSO and MFA through the shared IdP layer. Authorization is role-based — access is scoped to operational need. Sensitive fields (SIN, grievance details, financial records) are access-restricted and audit-logged.
        </p>
        <DataTable
          headers={["Role", "Access scope"]}
          rows={[
            ["General Staff", "Basic member lookup and profile view"],
            ["MSC (Member Service)", "Member service workflows, case creation, intake tracking"],
            ["Finance", "Dues administration, financial records, masked SIN access"],
            ["Grievance Staff", "Restricted grievance case access only"],
            ["IT", "Full technical and system-level access"],
            ["Admin", "Full system access across all modules"],
          ]}
        />
        <div className="mt-4">
          <Callout variant="default">
            <strong>VPN scope:</strong> VPN access is optional and limited to roles requiring elevated security. For most staff, SSO + MFA replaces the Fortinet VPN requirement entirely.
          </Callout>
        </div>
      </section>

      {/* Section 04: Architecture alignment */}
      <section className="mb-10 animate-fade-up" style={{ animationDelay: "240ms" }}>
        <SectionLabel number="04" label="Architecture alignment" />
        <p className="text-sm font-light text-black/60 leading-relaxed mb-4">
          The portal is a consumer of the ecosystem — not a new layer within it. It reads from domain services and writes through them; it never connects directly to domain databases. This preserves domain ownership boundaries while enabling unified staff workflows.
        </p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { layer: "L1 · Administrative Registry", role: "Create and update members, employer assignment, dues management" },
            { layer: "L2 · Identity", role: "Person lookup, duplicate resolution, crosswalk management" },
            { layer: "L3 · IdP / SSO", role: "All staff authentication — token issuance and session management" },
            { layer: "L4 · Event Backbone", role: "Real-time signal consumption for live status and activity feeds" },
            { layer: "L5 · Member Intelligence", role: "Lifecycle state, engagement scores, and next-action surface" },
            { layer: "L6 · Workflow & Case", role: "Case creation, queue management, grievance access (restricted)" },
            { layer: "L7 · Applications & Nodes", role: "Program status visibility across My65+, WorkersFirst, Training Centre" },
            { layer: "L8 · Content & Publishing", role: "Campaign and intake lead visibility for staff tracking conversion" },
          ].map(({ layer, role }) => (
            <div key={layer} className="flex flex-col gap-1 py-3 px-4 bg-white border border-black/8 rounded-lg">
              <span className="font-mono text-[10px] text-purple-power">{layer}</span>
              <span className="text-xs font-light text-black/55 leading-snug">{role}</span>
            </div>
          ))}
        </div>
        <Callout variant="accent">
          <strong>Core principle:</strong> The portal unifies the experience — not the architecture. Each domain layer retains full ownership of its data and logic. The portal is the staff-facing lens over a distributed system.
        </Callout>
      </section>

      {/* Section 05: Future potential */}
      <section className="mb-10 animate-fade-up" style={{ animationDelay: "300ms" }}>
        <SectionLabel number="05" label="Future potential" />
        <div className="flex flex-col gap-2">
          {[
            {
              title: "AI-assisted insights",
              desc: "Surface predictive analytics and member risk signals directly in the staff workflow — powered by Member Intelligence layer data.",
            },
            {
              title: "Workflow automation",
              desc: "Trigger routine administrative tasks automatically based on lifecycle events, reducing manual staff workload.",
            },
            {
              title: "Predictive analytics",
              desc: "Identify at-risk members, forecast engagement drop-off, and recommend outreach timing based on historical patterns.",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="flex items-start gap-3 py-3 px-4 bg-white border border-black/8 rounded-lg">
              <span className="w-1 h-1 rounded-full bg-purple-power/40 flex-shrink-0 mt-2" />
              <div>
                <p className="text-sm font-medium text-black mb-0.5">{title}</p>
                <p className="text-xs font-light text-black/50 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageContent>
  );
}
