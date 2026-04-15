import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { Callout } from "@/components/artifacts/Callout";
import { Badge } from "@/components/artifacts/Badge";

export default function InvestmentCasePage() {
  return (
    <PageContent>
      <PageHeader
        eyebrow="WS-04 · Governance"
        title="Ecosystem Investment Case"
        titleAccent="Investment Case"
        description="The economic argument for the ecosystem infrastructure investment — lifetime value modelling, acquisition cost multipliers, attrition prevention economics, and the compounding return on connected nodes."
        meta={[
          { label: "Audience", value: "SEIU executive" },
          { label: "Status", value: "In progress" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      <section className="mb-12 animate-fade-up">
        <SectionLabel number="01" label="The economic logic" />
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            {
              stat: "2–3×",
              label: "Lifetime value multiplier",
              detail: "Multi-node members generate 2–3× more lifetime value than single-node members",
            },
            {
              stat: "~$0",
              label: "Marginal cross-node cost",
              detail: "Every acquisition event in a connected ecosystem touches multiple nodes at near-zero marginal cost per subsequent conversion",
            },
            {
              stat: "37 yrs",
              label: "Relationship horizon",
              detail: "A homecare PSW entering at 28 and retiring at 65 — touching five entities, each with its own economic return",
            },
            {
              stat: "8 → 1",
              label: "Platform consolidation",
              detail: "From eight disconnected platforms and five login environments to a single unified member record",
            },
          ].map((item) => (
            <div key={item.stat} className="bg-white border border-black/10 rounded-xl p-5">
              <p className="text-3xl font-bold text-purple-power mb-1">{item.stat}</p>
              <p className="text-xs font-medium text-black mb-1">{item.label}</p>
              <p className="text-xs font-light text-black/40 leading-snug">{item.detail}</p>
            </div>
          ))}
        </div>
        <Callout variant="accent">
          The CRM infrastructure investment is not a technology cost. It is an{" "}
          <strong>acquisition efficiency engine</strong>, a{" "}
          <strong>lifetime value multiplier</strong>, an{" "}
          <strong>attrition prevention system</strong>, and the operational
          backbone of the Home Care campaign — all at once.
        </Callout>
      </section>

      <section className="mb-12 animate-fade-up" style={{ animationDelay: "60ms" }}>
        <SectionLabel number="02" label="Coming soon" />
        <div className="bg-grey border border-black/10 rounded-xl p-5">
          <p className="font-mono text-[10px] text-black/30 uppercase tracking-widest mb-3">
            Planned sections
          </p>
          <ul className="space-y-2">
            {[
              "Full lifetime value model — dues revenue, cross-node value, political activism returns",
              "Acquisition cost analysis — current state (siloed) vs. connected ecosystem",
              "Attrition prevention economics — cost of detectable vs. undetected churn",
              "Home Care cohort modelling — 29,000 reachable workers, conversion rate scenarios",
              "Infrastructure investment breakdown — CRM, IdP, Strapi, frontend",
              "Break-even analysis and ROI timeline",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm font-light text-black/40">
                <Badge variant="muted">{String(i + 1).padStart(2, "0")}</Badge>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageContent>
  );
}
