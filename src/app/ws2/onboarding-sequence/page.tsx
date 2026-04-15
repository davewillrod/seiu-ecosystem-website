import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { Callout } from "@/components/artifacts/Callout";
import { Badge } from "@/components/artifacts/Badge";

export default function OnboardingSequencePage() {
  return (
    <PageContent>
      <PageHeader
        eyebrow="WS-02 · Home Care"
        title="60-Day Onboarding Sequence"
        titleAccent="Onboarding Sequence"
        description="CRM trigger logic, communication cadence, conversion checkpoints, and suppression rules for the automated 60-day journey from first campaign touchpoint to full ecosystem engagement."
        meta={[
          { label: "Audience", value: "Technical agency · Frameworks & Co." },
          { label: "Status", value: "In progress" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      <section className="mb-12 animate-fade-up">
        <SectionLabel number="01" label="Coming soon" />
        <Callout variant="accent">
          This artifact is currently being drafted. The onboarding sequence maps
          the full 60-day automated journey — CRM trigger logic, communication
          cadence by persona type, conversion checkpoints, and suppression rules.
          It will be published once the Phase 0 CRM infrastructure decisions are
          confirmed.
        </Callout>
        <div className="mt-5 bg-grey border border-black/10 rounded-xl p-5">
          <p className="font-mono text-[10px] text-black/30 uppercase tracking-widest mb-3">
            Planned sections
          </p>
          <ul className="space-y-2">
            {[
              "Day 0 — First contact: campaign touchpoint, IdP account creation, CRM prospect record",
              "Day 1 — Membership offer: email sequence, WSIB win hook, representation value",
              "Day 2–3 — My65+ enrollment: $1,000 bonus offer, mobile-optimized flow",
              "Day 7 — Confirmation & welcome: membership confirmed, My65+ enrolled",
              "Day 14 — Engagement check: open/click signal, suppression rules if no response",
              "Day 30 — Training Centre pathway: PSW / IEN pathway offer (contingent on My65+)",
              "Day 45 — WorkersFirst introduction: shift marketplace, placement offer",
              "Day 60 — 60-day review: engagement score, at-risk flag if below threshold",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm font-light text-black/40">
                <Badge variant="muted">{`D${i === 0 ? "0" : i < 2 ? "1" : i < 3 ? "2" : i < 4 ? "7" : i < 5 ? "14" : i < 6 ? "30" : i < 7 ? "45" : "60"}`}</Badge>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageContent>
  );
}
