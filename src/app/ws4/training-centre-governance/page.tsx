import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { Callout } from "@/components/artifacts/Callout";
import { Badge } from "@/components/artifacts/Badge";

export default function TrainingCentreGovernancePage() {
  return (
    <PageContent>
      <PageHeader
        eyebrow="WS-04 · Governance"
        title="Training Centre Governance Brief"
        titleAccent="Governance Brief"
        description="Institutional alignment, operator accountability, and the case for why the Training Centre must remain a permanent integrated SEIU institution — not an externalized career college."
        meta={[
          { label: "Audience", value: "SEIU executive" },
          { label: "Status", value: "In progress" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      <section className="mb-12 animate-fade-up">
        <SectionLabel number="01" label="Why this matters" />
        <div className="bg-purple-power text-white rounded-xl p-6 mb-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
            The irreducible argument
          </p>
          <p className="text-base font-semibold leading-snug mb-2">
            Externalize the Training Centre and you externalize the pipeline.
          </p>
          <p className="text-sm font-light text-white/70 leading-relaxed">
            An external Training Centre is a school. It produces graduates. An SEIU Training Centre is the ecosystem's primary member pipeline at the moment of highest conversion potential — career entry and transition. Every PSW graduate, every IEN pathway completor, every leadership program participant is a compounding asset for SEIU's political power, workforce placement capability, and lifetime member value.
          </p>
        </div>
        <Callout variant="accent">
          The Training Centre operator has been{" "}
          <strong>drifting from union priorities</strong>. The question of whether
          the Training Centre remains a permanent internal SEIU institution or is
          externalized is live and unsettled. This must be resolved by executive
          decision before Training Centre node integration can be properly scoped.
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
              "Governance framework — accountability structure and SEIU oversight model",
              "The externalization argument — surface logic, why it fails under the network model",
              "Training Centre economic contribution — lifetime value, WorkersFirst volume, political activism",
              "Target volume — 1,000+ learners/year, 5,000+ cumulative completions through 2028",
              "Integration dependencies — what governance resolution unblocks in WS-01",
              "Executive decision framework — criteria, options, recommended path",
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
