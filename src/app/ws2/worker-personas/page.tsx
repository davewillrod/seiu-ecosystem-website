import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { Callout } from "@/components/artifacts/Callout";
import { Badge } from "@/components/artifacts/Badge";
import { Divider } from "@/components/ui/Divider";

export default function WorkerPersonasPage() {
  const personas = [
    {
      name: "Maria",
      archetype: "The Newly Protected Worker",
      age: "38",
      setting: "Privately operated retirement home",
      context:
        "Maria has worked in a retirement home for six years. She knew she had no WSIB coverage if she was hurt on the job — she accepted it as the reality of her sector. The WSIB announcement is the first time she has seen a concrete political win delivered for workers like her. She's cautious but open.",
      primaryNeed: "Proof that SEIU delivers before she commits",
      barrierToEntry: "Skepticism — she's heard promises before",
      ecosystemEntry: "Campaign microsite → membership offer",
      primaryConversion: "My65+ enrollment (the $1,000 bonus is tangible proof)",
      journeyPath: ["Home Care (WSIB win)", "→ Membership", "→ My65+", "→ Training Centre (6+ months)"],
      messagingHook: "We fought for your WSIB coverage. Here's what we're building next.",
      tags: ["Retirement home", "6 years experience", "No prior union"],
    },
    {
      name: "Priya",
      archetype: "The IEN Pathway Candidate",
      age: "31",
      setting: "Group home / community settings",
      context:
        "Priya is an internationally educated nurse navigating Ontario's credentialing system. She's been working as a PSW while completing her IEN pathway. She's sophisticated, motivated, and clear-eyed about what she needs — a credential pathway that doesn't require her to leave the workforce, and a placement engine that will move her into better roles as her credentials improve.",
      primaryNeed: "Career ladder with no dead ends",
      barrierToEntry: "Time — she's already managing work, study, and family",
      ecosystemEntry: "Training Centre IEN pathway → WorkersFirst",
      primaryConversion: "Full membership (as a bridge toward stable employment)",
      journeyPath: ["Training Centre (IEN)", "→ WorkersFirst placements", "→ Full membership", "→ My65+"],
      messagingHook: "Your credentials. Your career. Your rights — from day one.",
      tags: ["IEN pathway", "Group home", "High career mobility"],
    },
    {
      name: "Sandra",
      archetype: "The Experienced Lifer",
      age: "52",
      setting: "Home care (multi-employer, irregular hours)",
      context:
        "Sandra has been doing home care for 15 years, rotating across multiple employers, never with stable hours or a pension. She's seen the sector long enough to be deeply skeptical of promises — but the WSIB news and the My65+ $1,000 bonus are concrete. She's not looking for a community. She's looking for money and protection.",
      primaryNeed: "Retirement security she can actually trust",
      barrierToEntry: "Cynicism built over 15 years of sector instability",
      ecosystemEntry: "My65+ enrollment bonus → membership offer",
      primaryConversion: "My65+ (financial) + membership (protection)",
      journeyPath: ["My65+ (enrollment bonus)", "→ Membership", "→ WorkersFirst stability", "→ Training Centre (optional)"],
      messagingHook: "You've been building other people's security for 15 years. This is yours.",
      tags: ["15 years experience", "Multi-employer", "Pension access gap"],
    },
    {
      name: "Aisha",
      archetype: "The New Entrant",
      age: "24",
      setting: "Group home / residential care",
      context:
        "Aisha just completed her PSW certificate and is entering the workforce for the first time. She chose home care because she believes in the work — but she's entering a sector she knows is unstable. She's digitally fluent, mobile-first, and her peer network is her primary information source. The WSIB news landed in her social feed before she heard about it anywhere else.",
      primaryNeed: "First job + a sense that her work is valued and protected",
      barrierToEntry: "Low — she's open, new, and forming affiliations",
      ecosystemEntry: "Training Centre (PSW) → WorkersFirst → membership",
      primaryConversion: "WorkersFirst placement (immediate economic utility)",
      journeyPath: ["Training Centre (PSW)", "→ WorkersFirst (first placement)", "→ Membership", "→ My65+ (later)"],
      messagingHook: "Start here. Build from here. We'll be with you the whole way.",
      tags: ["New entrant", "PSW certified", "Mobile-first", "High openness"],
    },
  ];

  return (
    <PageContent>
      <PageHeader
        eyebrow="WS-02 · Home Care"
        title="Worker Personas"
        titleAccent="Personas"
        description="Four core homecare worker archetypes entering the SEIU ecosystem via the Home Care campaign — with journey paths, messaging hooks, barriers to entry, and primary conversion priorities."
        meta={[
          { label: "Audience", value: "SEIU executive · Frameworks & Co." },
          { label: "Status", value: "Active" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      <section className="mb-12 animate-fade-up">
        <SectionLabel number="01" label="Persona context" />
        <Callout variant="accent" className="mb-5">
          These personas represent the primary archetypes entering the SEIU
          ecosystem through the Home Care campaign. The campaign must speak to
          all four — but the <strong>sequencing of messages</strong> and the{" "}
          <strong>primary conversion mechanism</strong> differ meaningfully by
          archetype.
        </Callout>
      </section>

      <section className="mb-12 animate-fade-up" style={{ animationDelay: "60ms" }}>
        <SectionLabel number="02" label="Persona profiles" />
        <div className="space-y-6">
          {personas.map((p, i) => (
            <div
              key={p.name}
              className="bg-white border border-black/10 rounded-xl overflow-hidden animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-black/10 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-base font-bold text-black">{p.name}</p>
                    <span className="font-mono text-[10px] text-black/30">
                      {p.age}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-purple-power uppercase tracking-wide">
                    {p.archetype}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {p.tags.map((t) => (
                    <Badge key={t} variant="muted">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="px-5 py-4">
                <p className="text-sm font-light text-black/50 leading-relaxed mb-4">
                  {p.context}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="font-mono text-[10px] text-black/25 uppercase tracking-wider mb-1">
                      Primary need
                    </p>
                    <p className="text-xs font-medium text-black">
                      {p.primaryNeed}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-black/25 uppercase tracking-wider mb-1">
                      Barrier to entry
                    </p>
                    <p className="text-xs font-medium text-black">
                      {p.barrierToEntry}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-black/25 uppercase tracking-wider mb-1">
                      Ecosystem entry
                    </p>
                    <p className="text-xs font-medium text-black">
                      {p.ecosystemEntry}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-black/25 uppercase tracking-wider mb-1">
                      Primary conversion
                    </p>
                    <p className="text-xs font-medium text-black">
                      {p.primaryConversion}
                    </p>
                  </div>
                </div>

                {/* Journey path */}
                <div className="mb-4">
                  <p className="font-mono text-[10px] text-black/25 uppercase tracking-wider mb-2">
                    Journey path
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {p.journeyPath.map((step, j) => (
                      <span
                        key={j}
                        className={`font-mono text-[10px] ${
                          step.startsWith("→")
                            ? "text-black/20"
                            : "bg-grey px-2 py-0.5 rounded text-black/60"
                        }`}
                      >
                        {step}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Messaging hook */}
                <div className="bg-purple-power/5 border border-purple-power/20 rounded-lg px-4 py-3">
                  <p className="font-mono text-[10px] text-purple-power/60 uppercase tracking-wider mb-1">
                    Messaging hook
                  </p>
                  <p className="text-sm font-medium text-purple-power italic">
                    "{p.messagingHook}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      <section className="mb-12 animate-fade-up">
        <SectionLabel number="03" label="Conversion priority by persona" />
        <Callout>
          The CRM must route each persona into the correct onboarding sequence from
          first contact. The sequencing differs:{" "}
          <strong>Maria and Sandra lead with My65+ (financial proof)</strong>.{" "}
          <strong>Priya leads with the credential pathway (career logic)</strong>.{" "}
          <strong>Aisha leads with WorkersFirst (immediate economic utility)</strong>.
          Getting this wrong creates the premature nudge failure mode.
        </Callout>
      </section>
    </PageContent>
  );
}
