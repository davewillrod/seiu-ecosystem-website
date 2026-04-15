import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { DataTable } from "@/components/artifacts/DataTable";
import { Callout } from "@/components/artifacts/Callout";
import { Badge } from "@/components/artifacts/Badge";
import { Divider } from "@/components/ui/Divider";
import { EcosystemDiagram } from "./EcosystemDiagram";

export default function NodeIntegrationMapPage() {
  return (
    <PageContent>
      <PageHeader
        eyebrow="WS-01 · CRM & Platform"
        title="Node Integration Map"
        titleAccent="Integration Map"
        description="Every relationship between SEIU's seven ecosystem nodes — directional weights, trigger events, CRM integration requirements, and the business logic rules governing each connection."
        meta={[
          { label: "Audience", value: "SEIU executive · Technical agency · Frameworks & Co." },
          { label: "Status", value: "Finalized" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      {/* Section 1: Overview */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="01" label="The network model" />
        <Callout variant="accent" className="mb-5">
          The ecosystem is not a portfolio of independent products. It is a{" "}
          <strong>gravity-based network</strong> — every node has relationships
          with every other node. Those relationships are bidirectional and
          weighted. None are zero. None flow only one way.
        </Callout>
        <p className="text-sm font-light text-black/50 leading-relaxed mb-4">
          Seven nodes. Every pair connected. Weight represents conversion
          priority and strategic urgency — not likelihood of success, but the
          designed strength of the pull between nodes given where a worker is in
          her lifecycle. The CRM operationalizes every weighted connection as
          trigger logic.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { node: "Master Brand", role: "Gravitational centre & acquisition engine" },
            { node: "Mobile App", role: "Existing member daily touchpoint" },
            { node: "Training Centre", role: "Career entry & credential pipeline" },
            { node: "WorkersFirst", role: "Shift marketplace & placement engine" },
            { node: "My65+", role: "Retirement security platform" },
            { node: "UnionSavings", role: "Ambient retention layer" },
            { node: "Home Care", role: "Urgent growth frontier" },
          ].map((n) => (
            <div
              key={n.node}
              className="bg-white border border-black/10 rounded-lg p-3.5"
            >
              <p className="text-xs font-medium text-black mb-1">{n.node}</p>
              <p className="font-mono text-[10px] text-black/30 leading-snug">
                {n.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Visual diagram */}
      <section className="mb-12 animate-fade-up" style={{ animationDelay: "60ms" }}>
        <SectionLabel number="02" label="Ecosystem connection diagram" />
        <EcosystemDiagram />
      </section>

      {/* Section 3: Weighted connection table */}
      <section className="mb-12 animate-fade-up" style={{ animationDelay: "120ms" }}>
        <SectionLabel number="03" label="Weighted connection map" />
        <DataTable
          columns={[
            { key: "connection", label: "Connection" },
            { key: "weight", label: "Weight" },
            { key: "trigger", label: "Trigger event" },
            { key: "crm", label: "CRM action" },
          ]}
          rows={[
            {
              connection: "Home Care → Full membership",
              weight: <Badge variant="yellow">80</Badge>,
              trigger: "Campaign acquisition event",
              crm: "Membership offer sequence initiated",
            },
            {
              connection: "Home Care → My65+",
              weight: <Badge variant="yellow">75</Badge>,
              trigger: "24–48hr after membership offer",
              crm: "My65+ enrollment prompt (2nd beat)",
            },
            {
              connection: "Training Centre → WorkersFirst",
              weight: <Badge variant="purple">70</Badge>,
              trigger: "Credential completion event (Canvas)",
              crm: "WorkersFirst nudge + profile unlock",
            },
            {
              connection: "My65+ → Full membership",
              weight: <Badge variant="purple">55</Badge>,
              trigger: "My65+ enrollment (non-member)",
              crm: "Membership conversion sequence",
            },
            {
              connection: "Training Centre → Full membership",
              weight: <Badge variant="purple">60</Badge>,
              trigger: "Program completion ≥ threshold",
              crm: "Membership offer triggered",
            },
            {
              connection: "WorkersFirst → Full membership",
              weight: <Badge variant="muted">50</Badge>,
              trigger: "Stable placement / tenure threshold",
              crm: "Full membership conversion prompt",
            },
            {
              connection: "Home Care → Training Centre",
              weight: <Badge variant="muted">45</Badge>,
              trigger: "30–60 days post-membership + My65+",
              crm: "Training Centre pathway surfaced",
            },
            {
              connection: "Home Care → WorkersFirst",
              weight: <Badge variant="muted">40</Badge>,
              trigger: "After membership + My65+ confirmed",
              crm: "WorkersFirst profile created",
            },
            {
              connection: "WorkersFirst → Training Centre",
              weight: <Badge variant="muted">30</Badge>,
              trigger: "Shift tenure threshold crossed",
              crm: "Credential upgrade prompt",
            },
            {
              connection: "UnionSavings → All nodes",
              weight: <Badge variant="muted">15</Badge>,
              trigger: "Engagement drop-off signal",
              crm: "Re-engagement sequence triggered",
            },
          ]}
        />
        <p className="font-mono text-[10px] text-black/25 mt-2">
          Weight scale: 80 = highest urgency · 15 = ambient. All connections are bidirectional — weights shown are for the primary direction.
        </p>
      </section>

      <Divider />

      {/* Section 4: Key flows */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="04" label="Priority conversion journeys" />
        <div className="space-y-4">
          {[
            {
              label: "Home Care → Membership → My65+",
              weight: "80 / 75",
              description:
                "The highest-urgency journey in the network. WSIB win creates 29,000 newly reachable workers. First offer: union representation. Second offer (24–48hr): My65+ enrollment + $1,000 federal bonus. The federal bonus is the most powerful immediate financial offer in the acquisition stack.",
              phase: "Phase 0",
            },
            {
              label: "Training Centre → WorkersFirst → Membership",
              weight: "70 / 50",
              description:
                "Career entry arc. PSW graduate receives WorkersFirst placement prompt at credential completion. Shift activity feeds CRM state. Stable placement triggers membership conversion. This is the primary designed journey for newly entering healthcare workers.",
              phase: "Phase 1",
            },
            {
              label: "WorkersFirst → Training Centre",
              weight: "30",
              description:
                "Counter-flow: active shift workers who have reached a tenure plateau receive credential upgrade prompts from the Training Centre. Lower weight reflects softer conversion probability — the worker is already earning, so the pull is advisory rather than urgent.",
              phase: "Phase 2",
            },
            {
              label: "UnionSavings → Re-engagement",
              weight: "15",
              description:
                "Ambient layer. Engagement drop in UnionSavings is a leading attrition signal. CRM detects drop-off and initiates a re-engagement sequence across whichever primary node the member is most active in.",
              phase: "Phase 3",
            },
          ].map((journey) => (
            <div
              key={journey.label}
              className="bg-white border border-black/10 rounded-xl p-5"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-medium text-black">{journey.label}</p>
                <div className="flex gap-2 flex-shrink-0 ml-4">
                  <Badge variant="purple">{journey.weight}</Badge>
                  <Badge variant="muted">{journey.phase}</Badge>
                </div>
              </div>
              <p className="text-sm font-light text-black/50 leading-relaxed">
                {journey.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Nudge failure modes */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="05" label="Nudge failure modes" />
        <p className="text-sm font-light text-black/50 leading-relaxed mb-4">
          The trigger architecture must account for three structural failure patterns that undermine conversion without appearing to fail.
        </p>
        <div className="space-y-3">
          {[
            {
              title: "Premature nudging",
              body: "Conversion prompt arrives before the member has experienced enough value from the current node to trust the next one. Solution: minimum engagement thresholds per node before cross-node prompts fire.",
            },
            {
              title: "Repetitive nudging",
              body: "Same prompt fires repeatedly without response, becomes noise and erodes trust. Solution: suppression rules and response tracking — unresponsive contacts exit the active sequence after N triggers.",
            },
            {
              title: "Irrelevant nudging",
              body: "Prompt triggered by incomplete state data that misreads where the member is in her journey. Solution: robust state taxonomy with explicit handling for ambiguous or incomplete member state.",
            },
          ].map((fm) => (
            <div
              key={fm.title}
              className="bg-white border-y border-r border-black/10 border-l-2 border-l-red-500/60 rounded-r-lg px-4 py-3"
            >
              <strong className="text-black font-medium block mb-0.5 text-sm">
                {fm.title}
              </strong>
              <p className="text-sm text-black/50 leading-relaxed">{fm.body}</p>
            </div>
          ))}
        </div>
      </section>
    </PageContent>
  );
}
