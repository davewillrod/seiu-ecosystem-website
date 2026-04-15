import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { DataTable } from "@/components/artifacts/DataTable";
import { Callout } from "@/components/artifacts/Callout";
import { Badge } from "@/components/artifacts/Badge";
import { Divider } from "@/components/ui/Divider";
import { Accordion } from "@/components/ui/Accordion";

export default function CRMAgencyBriefPage() {
  return (
    <PageContent>
      <PageHeader
        eyebrow="WS-01 · CRM & Platform"
        title="CRM Agency Brief"
        titleAccent="Agency Brief"
        description="Technical brief for the CRM agency scoping engagement — architecture requirements, platform evaluation, five core capabilities, and the open questions that need resolution before platform selection."
        meta={[
          { label: "Audience", value: "Technical agency" },
          { label: "Status", value: "Active — CRM selection in progress" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      {/* Section 1: Position */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="01" label="The CRM is an architecture decision" />
        <div className="bg-purple-power text-white rounded-xl p-6 mb-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
            Strategic position
          </p>
          <p className="text-base font-semibold leading-snug mb-2">
            The CRM is not a tool decision.
            <br />
            It is an architecture decision.
          </p>
          <p className="text-sm font-light text-white/70 leading-relaxed">
            The chosen platform must natively support unified identity resolution,
            event-driven integration, complex lifecycle state tracking, and
            cross-node intelligence. A platform that cannot do these things at the
            data model level will require abstraction layers that compound over time
            into technical debt that undermines the ecosystem's core value.
          </p>
        </div>
      </section>

      {/* Section 2: Platform options */}
      <section className="mb-12 animate-fade-up" style={{ animationDelay: "60ms" }}>
        <SectionLabel number="02" label="Platform evaluation" />
        <Accordion
          items={[
            {
              title: "Option A — Enterprise CRM (Salesforce, Dynamics)",
              content: (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="font-mono text-[10px] text-purple-power uppercase tracking-wide mb-1.5">Strengths</p>
                      <ul className="space-y-1">
                        {["Mature ecosystem", "Built-in automation tools", "Scalable infrastructure"].map(s => (
                          <li key={s} className="text-xs font-light text-black/50 flex items-start gap-1.5">
                            <span className="text-purple-power mt-0.5">+</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-red-500/60 uppercase tracking-wide mb-1.5">Weaknesses</p>
                      <ul className="space-y-1">
                        {["Rigid data models", "Expensive at scale (internal user licensing)", "Requires heavy customization for lifecycle intelligence", "Event-driven patterns not native"].map(s => (
                          <li key={s} className="text-xs font-light text-black/50 flex items-start gap-1.5">
                            <span className="text-red-400 mt-0.5">−</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Callout>
                    <strong>Fit for SEIU:</strong> Viable but requires significant abstraction layers. Not the optimal long-term architecture match.
                  </Callout>
                </div>
              ),
            },
            {
              title: "Option B — Composable / Hybrid CRM (Recommended direction)",
              content: (
                <div className="space-y-3">
                  <p className="text-sm font-light text-black/50 leading-relaxed">
                    CRM = core database (Postgres/managed) + event layer + workflow/rules engine + custom services.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="font-mono text-[10px] text-purple-power uppercase tracking-wide mb-1.5">Strengths</p>
                      <ul className="space-y-1">
                        {["Full control of data model", "Matches ecosystem complexity", "Aligns with event-driven architecture"].map(s => (
                          <li key={s} className="text-xs font-light text-black/50 flex items-start gap-1.5">
                            <span className="text-purple-power mt-0.5">+</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-red-500/60 uppercase tracking-wide mb-1.5">Weaknesses</p>
                      <ul className="space-y-1">
                        {["Requires engineering investment", "Slower initial velocity", "Requires strong governance"].map(s => (
                          <li key={s} className="text-xs font-light text-black/50 flex items-start gap-1.5">
                            <span className="text-red-400 mt-0.5">−</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Callout variant="accent">
                    <strong>Best long-term alignment</strong> with ecosystem complexity and intelligence goals.
                  </Callout>
                </div>
              ),
            },
            {
              title: "Option C — Hybrid (Enterprise core + Custom layer)",
              content: (
                <div className="space-y-3">
                  <p className="text-sm font-light text-black/50 leading-relaxed">
                    Example: Salesforce (core records) + custom services (events, intelligence, orchestration).
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="font-mono text-[10px] text-purple-power uppercase tracking-wide mb-1.5">Strengths</p>
                      <ul className="space-y-1">
                        {["Faster initial deployment", "Flexibility where needed", "Reduces vendor lock-in risk"].map(s => (
                          <li key={s} className="text-xs font-light text-black/50 flex items-start gap-1.5">
                            <span className="text-purple-power mt-0.5">+</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-red-500/60 uppercase tracking-wide mb-1.5">Weaknesses</p>
                      <ul className="space-y-1">
                        {["Architectural complexity", "Requires careful boundary definition"].map(s => (
                          <li key={s} className="text-xs font-light text-black/50 flex items-start gap-1.5">
                            <span className="text-red-400 mt-0.5">−</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Callout>
                    <strong>Strong pragmatic option.</strong> May be the realistic path given timeline pressure from the Home Care campaign.
                  </Callout>
                </div>
              ),
            },
            {
              title: "Option D — Lightweight CRM + Custom layer (Not viable)",
              content: (
                <div className="space-y-3">
                  <p className="text-sm font-light text-black/50 leading-relaxed">
                    Example: HubSpot + custom services.
                  </p>
                  <Callout>
                    <strong>Not viable long-term.</strong> Cannot support complex lifecycle orchestration, breaks under multi-node ecosystem logic, poor long-term scalability. Fast to deploy — but the technical debt is proportional to how hard you push it.
                  </Callout>
                </div>
              ),
            },
          ]}
        />
      </section>

      {/* Section 3: Five capabilities */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="03" label="Five required capabilities" />
        <p className="text-sm font-light text-black/50 leading-relaxed mb-5">
          In dependency order. The CRM must support all five. A platform that does not natively model capabilities 1 and 2 requires custom engineering that becomes the system's permanent ceiling.
        </p>
        <div className="space-y-3">
          {[
            {
              n: "01",
              title: "Unified member record",
              detail: "One record per person aggregating relationship state across all nodes. Requires master identity system — unique identifier persisting across all platforms, deduplication on email match, merging of new activity into existing records.",
            },
            {
              n: "02",
              title: "Relationship state tracking",
              detail: "Dynamic tracking of member lifecycle stage across all nodes. Not just contact data — current state, engagement level, proximity to next conversion moment. Requires defined state taxonomy and a rules engine updating state in real time from incoming node events.",
            },
            {
              n: "03",
              title: "Intelligent nudge engine",
              detail: "Every weighted connection translated into trigger logic. Multi-conditional rules: state X AND engagement signal Y AND time elapsed Z. Channel selection, timing controls, suppression rules, A/B testing hooks.",
            },
            {
              n: "04",
              title: "Risk and opportunity signals",
              detail: "Engagement health scores calculated continuously. High-risk records surfaced for re-engagement before attrition. High-opportunity records flagged for leadership development and political activism pathways.",
            },
            {
              n: "05",
              title: "Cohort onboarding at scale",
              detail: "Rapid ingestion of large contact cohorts from campaign acquisition. Bulk deduplication against existing records. Immediate routing into appropriate onboarding sequences. Must handle thousands of new contacts without degrading existing member journey management.",
            },
          ].map((cap) => (
            <div key={cap.n} className="flex gap-4 bg-white border border-black/10 rounded-xl p-5">
              <span className="font-mono text-[11px] text-purple-power flex-shrink-0 mt-0.5">{cap.n}</span>
              <div>
                <p className="text-sm font-medium text-black mb-1">{cap.title}</p>
                <p className="text-sm font-light text-black/50 leading-relaxed">{cap.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* Section 4: Decisions summary */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="04" label="Key decisions summary" />
        <DataTable
          columns={[
            { key: "decision", label: "Decision" },
            { key: "outcome", label: "Outcome" },
            { key: "confidence", label: "Confidence" },
          ]}
          rows={[
            {
              decision: "CRM platform",
              outcome: "Not yet selected — evaluation in progress",
              confidence: <Badge variant="soon">Open</Badge>,
            },
            {
              decision: "Architecture pattern",
              outcome: "Event bus + iterative node integration",
              confidence: <Badge variant="purple">Decided</Badge>,
            },
            {
              decision: "IdP approach",
              outcome: "Auth0 or Okta — selection pending",
              confidence: <Badge variant="muted">Directional</Badge>,
            },
            {
              decision: "Unionware role",
              outcome: "Retained as dues/archive system of record",
              confidence: <Badge variant="purple">Decided</Badge>,
            },
            {
              decision: "Member ID authority",
              outcome: "Finance / Unionware — never the new CRM",
              confidence: <Badge variant="purple">Decided</Badge>,
            },
            {
              decision: "SIN handling",
              outcome: "Stays in Unionware — not migrated in current scope",
              confidence: <Badge variant="purple">Decided</Badge>,
            },
            {
              decision: "Phase 0 hard gate",
              outcome: "IdP tenant stood up (2–3 weeks)",
              confidence: <Badge variant="purple">Decided</Badge>,
            },
            {
              decision: "My65+ priority",
              outcome: "Highest-priority node for Home Care campaign",
              confidence: <Badge variant="purple">Decided</Badge>,
            },
            {
              decision: "Strapi auth role",
              outcome: "Retired when mobile app migrates to IdP (Phase 1)",
              confidence: <Badge variant="purple">Decided</Badge>,
            },
          ]}
        />
      </section>
    </PageContent>
  );
}
