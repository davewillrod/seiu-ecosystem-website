import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { Callout } from "@/components/artifacts/Callout";
import { Badge } from "@/components/artifacts/Badge";
import { DataTable } from "@/components/artifacts/DataTable";

export default function ProgrammeRoadmapPage() {
  return (
    <PageContent>
      <PageHeader
        eyebrow="WS-04 · Governance"
        title="Phased Programme Roadmap"
        titleAccent="Programme Roadmap"
        description="Cross-workstream delivery sequencing from Phase 0 through Phase 3 — milestones, dependencies, and the phased timeline for moving from fragmented infrastructure to a connected, intelligence-driven ecosystem."
        meta={[
          { label: "Audience", value: "SEIU executive · Technical agency" },
          { label: "Status", value: "In progress" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      <section className="mb-12 animate-fade-up">
        <SectionLabel number="01" label="Programme overview" />
        <Callout variant="accent" className="mb-5">
          A 12-month "big bang" CRM deployment is not appropriate for SEIU's
          situation. The iterative approach allows the{" "}
          <strong>Home Care campaign to run on functional infrastructure</strong>{" "}
          while deeper integrations are built progressively.
        </Callout>
        <DataTable
          columns={[
            { key: "phase", label: "Phase" },
            { key: "timeline", label: "Timeline" },
            { key: "goal", label: "Goal" },
            { key: "status", label: "Status" },
          ]}
          rows={[
            {
              phase: "Phase 0",
              timeline: "Weeks 1–8",
              goal: "Home Care viable core — unblock campaign",
              status: <Badge variant="yellow">Active</Badge>,
            },
            {
              phase: "Phase 1",
              timeline: "Weeks 8–20",
              goal: "Identity layer + Training Centre SSO",
              status: <Badge variant="purple">Planned</Badge>,
            },
            {
              phase: "Phase 2",
              timeline: "Weeks 20–36",
              goal: "WorkersFirst + My65+ full integration",
              status: <Badge variant="muted">Pending audits</Badge>,
            },
            {
              phase: "Phase 3",
              timeline: "Weeks 28–40",
              goal: "Intelligence layer — nudge engine + risk scoring",
              status: <Badge variant="soon">Future</Badge>,
            },
          ]}
        />
      </section>

      <section className="mb-12 animate-fade-up" style={{ animationDelay: "60ms" }}>
        <SectionLabel number="02" label="Coming soon" />
        <div className="bg-grey border border-black/10 rounded-xl p-5">
          <p className="font-mono text-[10px] text-black/30 uppercase tracking-widest mb-3">
            Planned sections
          </p>
          <ul className="space-y-2">
            {[
              "Detailed Phase 0 scope — IdP setup, contact pipeline, My65+ webhook negotiation",
              "Phase 1 dependencies — Unionware/IdP architecture decision gate",
              "Phase 2 gating conditions — WorkersFirst and My65+ node audit findings",
              "Cross-workstream dependency map — WS-01, WS-02, WS-03, WS-04 sequencing",
              "Resource and agency allocation across phases",
              "Risk register — open questions that could change phase scope",
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
