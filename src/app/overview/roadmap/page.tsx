import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { Callout } from "@/components/artifacts/Callout";
import { Divider } from "@/components/ui/Divider";

export default function RoadmapPage() {
  return (
    <PageContent>
      <PageHeader
        eyebrow="Overview · Roadmap"
        title="Programme Roadmap"
        titleAccent="Roadmap"
        description="A detailed, system-aware execution plan for evolving SEIU's ecosystem into a unified platform. Homecare-prioritized — build the growth engine first, systematically replace legacy dependencies."
        meta={[
          { label: "Version", value: "v4" },
          { label: "Status", value: "Active" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      {/* Gantt timeline */}
      <div className="mb-12 animate-fade-up">
        <svg
          role="img"
          aria-label="Programme roadmap Gantt chart — 7 phases over 48 weeks"
          viewBox="0 0 700 330"
          width="100%"
        >
          {/* Week axis labels */}
          {[0, 8, 16, 20, 24, 28, 32, 40, 48].map((w) => {
            const x = 134 + (w / 48) * 552;
            return (
              <g key={w}>
                <line x1={x} y1="14" x2={x} y2="302" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                <text x={x} y="10" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="8" fill="rgba(0,0,0,0.25)">
                  w{w}
                </text>
              </g>
            );
          })}

          {/* Phase bars */}
          {([
            { label: "Phase 1", sub: "Demand Capture", start: 0, end: 8, y: 26 },
            { label: "Phase 2", sub: "Content & Distribution", start: 8, end: 16, y: 66 },
            { label: "Phase 3", sub: "Lifecycle & Orchestration", start: 16, end: 28, y: 106 },
            { label: "Phase 4", sub: "WorkersFirst & Training", start: 20, end: 32, y: 146 },
            { label: "Phase 5", sub: "Workflow Domain", start: 24, end: 36, y: 186 },
            { label: "Phase 6", sub: "Unionware Transition", start: 28, end: 44, y: 226 },
            { label: "Phase 7", sub: "Mobile Full Refactor", start: 32, end: 48, y: 266 },
          ] as const).map(({ label, sub, start, end, y }, i) => {
            const xStart = 134 + (start / 48) * 552;
            const width = ((end - start) / 48) * 552;
            return (
              <g key={label} style={{ animation: "fade-up 0.35s ease both", animationDelay: `${i * 50}ms` }}>
                {/* Phase label */}
                <text x="0" y={y + 14} fontFamily="'DM Mono', monospace" fontSize="8.5" fontWeight="500" fill="#411175">{label}</text>
                <text x="0" y={y + 25} fontFamily="'DM Mono', monospace" fontSize="7.5" fill="rgba(0,0,0,0.3)">{sub}</text>
                {/* Bar */}
                <rect x={xStart} y={y} width={width} height="28" rx="4"
                  fill="#411175" fillOpacity={0.06 + i * 0.01}
                  stroke="#411175" strokeOpacity="0.2" strokeWidth="1"
                />
                {/* Week range inside bar */}
                <text x={xStart + 6} y={y + 17} fontFamily="'DM Mono', monospace" fontSize="8" fill="#411175" fillOpacity="0.7">
                  w{start}–w{end}
                </text>
              </g>
            );
          })}

          {/* Today marker */}
          <line x1="134" y1="14" x2="134" y2="302" stroke="#411175" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="136" y="10" fontFamily="'DM Mono', monospace" fontSize="7.5" fill="#411175" fillOpacity="0.6">now</text>
        </svg>
        <p className="font-mono text-[10px] text-black/25 text-center mt-1">
          Phases overlap intentionally — parallel execution where dependencies allow
        </p>
      </div>

      {/* Business priority */}
      <section className="mb-12 animate-fade-up" style={{ animationDelay: "60ms" }}>
        <SectionLabel number="01" label="Business priority" />

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Strategic funnel */}
          <div>
            <p className="font-mono text-[10px] text-black/30 uppercase tracking-widest mb-3">Core strategic funnel — Homecare</p>
            <div className="flex flex-col gap-0">
              {[
                { n: 1, step: "Campaign", detail: "Microsite / marketing surface" },
                { n: 2, step: "Intake", detail: "Form submission captured" },
                { n: 3, step: "Identity", detail: "person_id created or resolved" },
                { n: 4, step: "My65+ conversion", detail: "Primary conversion node" },
                { n: 5, step: "Lifecycle orchestration", detail: "Nudges, engagement, signals" },
                { n: 6, step: "Expansion", detail: "WorkersFirst + Training Centre" },
              ].map(({ n, step, detail }, i, arr) => (
                <div key={step} className="relative flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-purple-power/8 border border-purple-power/20 flex items-center justify-center flex-shrink-0 z-10">
                      <span className="font-mono text-[9px] text-purple-power">{n}</span>
                    </div>
                    {i < arr.length - 1 && <div className="w-px flex-1 bg-black/10 my-0.5" />}
                  </div>
                  <div className="pb-2.5">
                    <p className="text-sm font-medium text-black leading-none mt-0.5">{step}</p>
                    <p className="font-mono text-[10px] text-black/35 mt-0.5">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Priority order */}
          <div>
            <p className="font-mono text-[10px] text-black/30 uppercase tracking-widest mb-3">Priority order</p>
            <div className="flex flex-col gap-0">
              {[
                { n: 1, item: "My65+", note: "Primary conversion driver" },
                { n: 2, item: "Intake", note: "Microsites + master site" },
                { n: 3, item: "Identity", note: "Prospect-first person_id" },
                { n: 4, item: "IdP", note: "Auth0 — centralized auth" },
                { n: 5, item: "Mobile App", note: "Primary distribution channel" },
                { n: 6, item: "Event Backbone", note: "Integration infrastructure" },
                { n: 7, item: "WorkersFirst / Training Centre", note: "Phase 4 expansion" },
                { n: 8, item: "Unionware replacement", note: "Longer-term — strangler pattern" },
              ].map(({ n, item, note }) => (
                <div key={item} className="flex items-baseline gap-3 py-1.5 border-b border-black/6">
                  <span className="font-mono text-[10px] text-purple-power w-4 flex-shrink-0">{n}</span>
                  <span className="text-sm font-medium text-black">{item}</span>
                  <span className="font-mono text-[9px] text-black/30 ml-auto">{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Callout variant="accent">
          <strong>Core principle:</strong> Build the Homecare growth engine first (My65+), while systematically replacing legacy dependencies — Unionware, Strapi misuse, and fragmented app auth.
        </Callout>
      </section>

      <Divider />

      {/* Phase 1 */}
      <section className="mb-12 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <div className="flex items-center gap-3 mb-1">
          <SectionLabel number="02" label="Phase 1 — Demand Capture & Conversion Engine" />
        </div>
        <p className="font-mono text-[10px] text-black/30 mb-6">Weeks 0 – 8 · Critical path</p>

        <div className="grid grid-cols-2 gap-4">

          <PhaseCard
            title="Marketing & Microsites"
            tag="Critical"
            current="WordPress-based marketing — no reusable system or standardized deployment."
            tasks={[
              "Define microsite architecture — Framer (default), Next.js (advanced campaigns)",
              "Build campaign template system with reusable sections and consistent CTA structure",
              "Standardize form structure: name, email, phone, interest, campaign_id, UTM capture",
            ]}
          />

          <PhaseCard
            title="Intake Layer"
            tag="Microsite → Platform"
            tasks={[
              "Build serverless intake API",
              "Validate and normalize all form inputs",
              "Store in intake database (PostgreSQL)",
              "Attach metadata: UTM, campaign_id, source",
              "Ensure all microsites POST to intake layer — not Strapi",
            ]}
          />

          <PhaseCard
            title="Identity — Prospect-first"
            tasks={[
              "Create person table (person_id, primary_email, status, created_at)",
              "Create identity mapping table (person_id ↔ system ↔ external_id)",
              "Implement email-based lookup with create-or-resolve logic",
              "Connect intake layer → identity domain",
            ]}
          />

          <PhaseCard
            title="IdP — Auth0"
            tasks={[
              "Configure Auth0 tenant",
              "Define JWT claims: sub, person_id",
              "Build middleware: token validation + claims extraction",
            ]}
          />

          <PhaseCard
            title="My65+ — Primary Conversion Node"
            tag="Highest priority"
            tasks={[
              "Replace current auth with IdP (Auth0)",
              "Map existing My65+ accounts → person_id",
              "Implement enrollment flow with analytics tracking",
              "Emit events: my65plus.enrolled, account.created",
            ]}
          />

          <PhaseCard
            title="Mobile App — Early Alignment"
            current="Strapi-influenced auth, MySQL shadow DB synced from Unionware."
            tasks={[
              "Add IdP login support alongside existing auth",
              "Begin person_id integration",
              "Do not refactor entire backend yet — additive only",
            ]}
          />

          <PhaseCard
            title="Event Backbone — MVP"
            tasks={[
              "Implement SNS/SQS or equivalent managed messaging",
              "Define standard event envelope (event_id, type, version, occurred_at, producer, payload)",
              "Build publisher utility for initial producers",
            ]}
          />

        </div>
      </section>

      <Divider />

      {/* Phase 2 */}
      <section className="mb-12 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <SectionLabel number="03" label="Phase 2 — Content System & Distribution" />
        <p className="font-mono text-[10px] text-black/30 mb-6">Weeks 8 – 16</p>

        <div className="grid grid-cols-2 gap-4">

          <PhaseCard
            title="Strapi — Content System Stabilization"
            tasks={[
              "Clean content models: separate editorial, projections, and reference content types",
              "Remove auth logic and workflow logic from Strapi",
              "Add consumer flags to all content records (mobile, marketing site, campaigns, apps)",
              "Enforce structured schemas across all content types",
            ]}
          />

          <PhaseCard
            title="Master Site — Next.js"
            tasks={[
              "Build SSR master site (seiuhealthcare.ca)",
              "Integrate Strapi content API",
              "Implement ISR caching for performance",
            ]}
          />

          <PhaseCard
            title="Microsite System — Framer"
            tasks={[
              "Finalize Framer campaign templates",
              "Integrate intake forms into all microsite templates",
              "Standardize deployment process and domain configuration",
            ]}
          />

          <PhaseCard
            title="Analytics"
            tasks={[
              "Implement single GTM container across all surfaces",
              "Unify GA4 property with cross-domain tracking enabled",
              "Ensure UTM capture flows through intake to backend",
              "Send analytics events → Event Backbone for lifecycle signals",
            ]}
          />

        </div>
      </section>

      <Divider />

      {/* Phase 3 */}
      <section className="mb-12 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <SectionLabel number="04" label="Phase 3 — Lifecycle & Orchestration" />
        <p className="font-mono text-[10px] text-black/30 mb-6">Weeks 16 – 28</p>

        <div className="grid grid-cols-2 gap-4">

          <PhaseCard
            title="Member Intelligence"
            tasks={[
              "Build event ingestion service — consume signals from all producers",
              "Store engagement signals per person_id",
              "Define lifecycle states: prospect, onboarding, active, at-risk, inactive, reactivated",
              "Build rule engine — initial triggers: My65+ eligibility, onboarding nudges",
            ]}
          />

          <PhaseCard
            title="Mobile App Expansion"
            tasks={[
              "Consume lifecycle signals from Member Intelligence",
              "Render personalized UI based on eligibility and cohort data",
              "Integrate nudge delivery — in-app prompts and push triggers",
            ]}
          />

        </div>
      </section>

      <Divider />

      {/* Phase 4 */}
      <section className="mb-12 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <SectionLabel number="05" label="Phase 4 — WorkersFirst & Training Centre" />
        <p className="font-mono text-[10px] text-black/30 mb-6">Weeks 20 – 32 · Overlaps Phase 3</p>

        <div className="grid grid-cols-2 gap-4">

          <PhaseCard
            title="WorkersFirst"
            tasks={[
              "Integrate IdP — replace dedicated auth system",
              "Map WorkersFirst accounts → person_id via Identity Domain",
              "Emit events: shift.completed, placement.created",
            ]}
          />

          <PhaseCard
            title="Training Centre"
            tasks={[
              "Build LMS adapter (targeting Canvas as the canonical LMS)",
              "Emit events: enrollment.started, credential.completed",
            ]}
          />

        </div>
      </section>

      <Divider />

      {/* Phase 5 */}
      <section className="mb-12 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <SectionLabel number="06" label="Phase 5 — Workflow Domain" />
        <p className="font-mono text-[10px] text-black/30 mb-6">Weeks 24 – 36 · Overlaps Phases 3–4</p>

        <div className="grid grid-cols-1 gap-4">
          <PhaseCard
            title="Workflow & Case Management"
            tasks={[
              "Build case system — internal operational, member service, and grievance case types",
              "Route support inquiries → Workflow domain (not ad hoc inboxes or Unionware)",
              "Route intake applications → Workflow where manual review is required",
              "Integrate with intake layer for new contact/application cases",
            ]}
          />
        </div>
      </section>

      <Divider />

      {/* Phase 6 */}
      <section className="mb-12 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <SectionLabel number="07" label="Phase 6 — Unionware Transition" />
        <p className="font-mono text-[10px] text-black/30 mb-6">Weeks 28 – 44 · Overlaps Phases 4–7</p>

        <div className="mb-4">
          <p className="font-mono text-[10px] text-black/30 uppercase tracking-widest mb-2">Unionware current role</p>
          <div className="flex gap-4">
            {["Source of truth for member_id", "Dues and financial records", "Employer data and taxonomy"].map((r) => (
              <div key={r} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-black/25 flex-shrink-0" />
                <span className="text-sm font-light text-black/50">{r}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <PhaseCard
            title="Unionware Adapter & Registry Migration"
            tasks={[
              "Build thin adapter layer around Unionware — minimal invasive change to internals",
              "Emit events: member.created, member.updated, member.status_changed",
              "Stand up new Administrative Registry Domain in parallel (PostgreSQL)",
              "Begin incremental data migration — identity linkage first, then registry, then dues",
              "Gradually shift registry ownership — Unionware becomes read-through only",
              "Retire Unionware administrative role once new registry is operationally complete",
            ]}
          />
        </div>
      </section>

      <Divider />

      {/* Phase 7 */}
      <section className="mb-12 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <SectionLabel number="08" label="Phase 7 — Mobile App Full Refactor" />
        <p className="font-mono text-[10px] text-black/30 mb-6">Weeks 32 – 48 · Final dependency cleanup</p>

        <div className="grid grid-cols-1 gap-4">
          <PhaseCard
            title="Mobile App — Legacy Dependency Removal"
            current="MySQL shadow DB synced from Unionware, Strapi-mediated auth logic, embedded policy segmentation."
            tasks={[
              "Remove MySQL shadow database — replace with direct API reads from canonical domains",
              "Remove Strapi dependency for business logic — content only",
              "Replace custom auth with IdP fully — no residual Strapi auth path",
              "Consume identity from Identity Domain API",
              "Consume member context from Administrative Registry and Member Intelligence APIs",
            ]}
          />
        </div>
      </section>

      <Divider />

      {/* Final state */}
      <section className="mb-12 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <SectionLabel number="09" label="Final state" />
        <div className="grid grid-cols-2 gap-3">
          {[
            { system: "Strapi", role: "Content-only — editorial, campaigns, projections. No auth, no policy, no workflow logic." },
            { system: "Microsites", role: "Campaign engines — fast-launch surfaces with standardized intake and analytics." },
            { system: "Mobile App", role: "Primary engagement layer — clean consumer of IdP, Identity, Intelligence, and content APIs." },
            { system: "My65+", role: "Conversion anchor for the Homecare strategic funnel — SSO-integrated, event-emitting." },
            { system: "Event Backbone", role: "Primary integration layer — all cross-domain state changes flow through it." },
            { system: "Unionware", role: "Deprecated — replaced by the Administrative Registry Domain." },
          ].map(({ system, role }) => (
            <div key={system} className="bg-white border border-black/10 rounded-lg p-4">
              <p className="font-mono text-[10px] text-purple-power uppercase tracking-wider mb-1.5">{system}</p>
              <p className="text-sm font-light text-black/60 leading-snug">{role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline summary table */}
      <section className="mb-10 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <SectionLabel number="10" label="Timeline summary" />
        <div className="border border-black/10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-grey">
                <th className="px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-wider text-black/30 text-left">Phase</th>
                <th className="px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-wider text-black/30 text-left">Focus</th>
                <th className="px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-wider text-black/30 text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Phase 1", "Demand Capture & Conversion Engine", "0 – 8 weeks"],
                ["Phase 2", "Content System & Distribution", "8 – 16 weeks"],
                ["Phase 3", "Lifecycle & Orchestration", "16 – 28 weeks"],
                ["Phase 4", "WorkersFirst & Training Centre", "20 – 32 weeks"],
                ["Phase 5", "Workflow Domain", "24 – 36 weeks"],
                ["Phase 6", "Unionware Transition", "28 – 44 weeks"],
                ["Phase 7", "Mobile App Full Refactor", "32 – 48 weeks"],
              ].map(([phase, focus, duration], i, arr) => (
                <tr key={phase} className={`hover:bg-black/[0.02] ${i < arr.length - 1 ? "border-b border-black/[0.06]" : ""}`}>
                  <td className="px-3.5 py-3 font-mono text-[10px] text-purple-power">{phase}</td>
                  <td className="px-3.5 py-3 text-sm font-medium text-black">{focus}</td>
                  <td className="px-3.5 py-3 font-mono text-[10px] text-black/40">{duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PageContent>
  );
}

function PhaseCard({
  title,
  tag,
  current,
  tasks,
}: {
  title: string;
  tag?: string;
  current?: string;
  tasks: string[];
}) {
  return (
    <div className="bg-white border border-black/10 rounded-xl p-5">
      <div className="flex items-start justify-between gap-2 mb-3">
        <p className="text-sm font-medium text-black leading-snug">{title}</p>
        {tag && (
          <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-sm border bg-purple-power/8 text-purple-power border-purple-power/20 flex-shrink-0">
            {tag}
          </span>
        )}
      </div>
      {current && (
        <div className="mb-3 pb-3 border-b border-black/6">
          <p className="font-mono text-[9px] uppercase tracking-wider text-black/25 mb-1">Current</p>
          <p className="text-xs font-light text-black/40 leading-snug">{current}</p>
        </div>
      )}
      <ul className="flex flex-col gap-1.5">
        {tasks.map((task) => (
          <li key={task} className="flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-purple-power/40 flex-shrink-0 mt-1.5" />
            <span className="text-xs font-light text-black/60 leading-snug">{task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
