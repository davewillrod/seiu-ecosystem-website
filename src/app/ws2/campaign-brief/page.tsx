import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { Callout } from "@/components/artifacts/Callout";
import { Badge } from "@/components/artifacts/Badge";
import { FlowSteps } from "@/components/artifacts/FlowSteps";
import { Divider } from "@/components/ui/Divider";
import { DataTable } from "@/components/artifacts/DataTable";

export default function CampaignBriefPage() {
  return (
    <PageContent>
      <PageHeader
        eyebrow="WS-02 · Home Care"
        title="Phase 1 Campaign Brief"
        titleAccent="Campaign Brief"
        description="The WSIB acquisition window — strategy, urgency, three-phase campaign arc, and the infrastructure requirements for converting 29,000 newly reachable homecare workers into long-term SEIU members."
        meta={[
          { label: "Audience", value: "SEIU executive · Frameworks & Co." },
          { label: "Status", value: "Active — Phase 1 launching" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      {/* Section 1: The moment */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="01" label="The WSIB breach" />
        <div className="bg-purple-power text-white rounded-xl p-6 mb-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
            April 8, 2026
          </p>
          <p className="text-xl font-bold leading-tight mb-3">
            29,000 newly reachable workers.
            <br />
            Pre-built trust. The window is open now.
          </p>
          <p className="text-sm font-light text-white/70 leading-relaxed">
            The Ontario government announced mandatory WSIB coverage for
            approximately 29,000 workers in privately operated residential care
            facilities, retirement homes, and group homes. This is the conclusion
            of a decade of SEIU advocacy. It is not the conclusion of SEIU's home
            care strategy — it is the breach in the wall.
          </p>
        </div>
        <Callout variant="accent">
          The WSIB win is an <strong>acquisition window</strong>, not just a policy
          victory. Workers in newly covered settings now associate SEIU with a
          concrete benefit delivered on their behalf before they have paid a
          single dollar in dues. The trust is pre-built. The campaign converts
          that moment into durable sector ownership.
        </Callout>
      </section>

      {/* Section 2: Why now */}
      <section className="mb-12 animate-fade-up" style={{ animationDelay: "60ms" }}>
        <SectionLabel number="02" label="The competitive window" />
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            {
              stat: "29,000",
              label: "Newly reachable workers",
              detail: "Privately operated residential care, retirement homes, group homes",
            },
            {
              stat: "$1,000",
              label: "My65+ enrollment bonus",
              detail: "Federal government funded. Most powerful immediate financial offer in the stack.",
            },
            {
              stat: "$29.9M",
              label: "Federal My65+ investment",
              detail: "Up to $3,000 annually in dollar-for-dollar matching contributions",
            },
            {
              stat: "40%",
              label: "Annual sector turnover",
              detail: "Home care workers have historically had no pension access. My65+ changes that.",
            },
          ].map((item) => (
            <div key={item.stat} className="bg-white border border-black/10 rounded-xl p-5">
              <p className="text-3xl font-bold text-purple-power mb-1">{item.stat}</p>
              <p className="text-xs font-medium text-black mb-1">{item.label}</p>
              <p className="text-xs font-light text-black/40 leading-snug">{item.detail}</p>
            </div>
          ))}
        </div>
        <Callout>
          Other unions will follow. The window to be the defining institutional
          presence in Ontario's home care sector is open now, and it will not stay
          open indefinitely.{" "}
          <strong>The political tailwind is live. The credibility is unmatched.</strong>{" "}
          The question is entirely whether the operational infrastructure can absorb
          the momentum.
        </Callout>
      </section>

      {/* Section 3: Three-phase campaign */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="03" label="Three-phase campaign arc" />
        <div className="space-y-4">
          {[
            {
              phase: "Phase 1",
              timeframe: "Now — 60 days",
              title: "Immediate outreach & first conversion",
              badge: "yellow" as const,
              items: [
                "Campaign microsite live on custom domain (e.g. homecarewin.ca)",
                "Paid social targeting workers in newly covered settings",
                "WSIB announcement as primary hook — lead with the win",
                "First CTA: membership inquiry / contact capture",
                "Second beat (24–48hr): My65+ enrollment offer + $1,000 bonus",
                "MSC and community organizers enabled with campaign materials",
              ],
            },
            {
              phase: "Phase 2",
              timeframe: "60–180 days",
              title: "Sustained narrative & paid acquisition",
              badge: "purple" as const,
              items: [
                "Ongoing paid acquisition across social and search",
                "Worker story content — real home care workers speaking to the WSIB win",
                "Employer partnership outreach in targeted sectors",
                "Training Centre PSW and IEN pathways positioned as career ladder",
                "My65+ savings milestone communications to enrolled members",
                "Grievance and representation wins amplified to new prospects",
              ],
            },
            {
              phase: "Phase 3",
              timeframe: "180 days+",
              title: "Structural market dominance",
              badge: "muted" as const,
              items: [
                "Training Centre credential infrastructure extended into home care settings",
                "WorkersFirst placement volume in home care sector increases",
                "My65+ penetration deepens across the new member cohort",
                "Political sequencing continues — next legislative priority identified",
                "SEIU becomes the defining institutional presence in Ontario home care",
              ],
            },
          ].map((phase) => (
            <div key={phase.phase} className="bg-white border border-black/10 rounded-xl overflow-hidden">
              <div className="px-5 py-3.5 border-b border-black/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant={phase.badge}>{phase.phase}</Badge>
                  <span className="font-mono text-[10px] text-black/30">{phase.timeframe}</span>
                </div>
                <p className="text-xs font-medium text-black">{phase.title}</p>
              </div>
              <div className="px-5 py-4">
                <ul className="space-y-2">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm font-light text-black/50">
                      <span className="w-1 h-1 rounded-full bg-black/20 flex-shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* Section 4: Infrastructure requirements */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="04" label="Infrastructure requirements" />
        <p className="text-sm font-light text-black/50 leading-relaxed mb-4">
          The campaign cannot run at full effectiveness without these platform capabilities. Phase 0 CRM work directly enables Phase 1 campaign execution.
        </p>
        <DataTable
          columns={[
            { key: "requirement", label: "Requirement" },
            { key: "phase", label: "Phase" },
            { key: "status", label: "Status" },
          ]}
          rows={[
            {
              requirement: "IdP tenant stood up — clean canonical identity from first touchpoint",
              phase: "Phase 0",
              status: <Badge variant="yellow">Hard gate</Badge>,
            },
            {
              requirement: "Campaign contact ingestion pipeline — landing page → CRM prospect record",
              phase: "Phase 0",
              status: <Badge variant="purple">In scope</Badge>,
            },
            {
              requirement: "My65+ enrollment webhook — fires on account creation",
              phase: "Phase 0",
              status: <Badge variant="soon">Negotiation required</Badge>,
            },
            {
              requirement: "2-step automated onboarding: membership offer → My65+ prompt",
              phase: "Phase 0",
              status: <Badge variant="purple">In scope</Badge>,
            },
            {
              requirement: "Campaign microsite (Framer) + custom domain",
              phase: "Phase 1",
              status: <Badge variant="purple">Frameworks & Co.</Badge>,
            },
            {
              requirement: "Cross-domain analytics (GTM + GA4) with UTM passthrough",
              phase: "Phase 1",
              status: <Badge variant="purple">In scope</Badge>,
            },
          ]}
        />
      </section>

      {/* Section 5: First conversion sequence */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="05" label="First conversion sequence" />
        <FlowSteps
          steps={[
            {
              title: "Campaign touchpoint — lead capture",
              body: "Worker sees paid social or hears about WSIB win through community. Visits homecarewin.ca. Submits name + email + consent. Serverless function creates CRM prospect record tagged with campaign source, sector, geographic region.",
              note: "IdP account created at this moment",
            },
            {
              title: "Immediate: Membership offer",
              body: "Within 24 hours. Email from SEIU welcoming the worker, explaining what union representation means for them specifically as a home care worker, and extending a membership offer. Lead with the WSIB win. Establish what SEIU has already done for this population.",
            },
            {
              title: "24–48hr: My65+ enrollment offer",
              body: "Second beat. $1,000 enrollment bonus and up to $3,000 in annual matching contributions. Mobile-optimized enrollment flow. This is the most powerful immediate financial offer in the acquisition stack — it should feel like a gift, not a sales pitch.",
              note: "Highest-priority technical dependency",
            },
            {
              title: "30 days: Training Centre pathway",
              body: "Contingent on My65+ enrollment confirmation. If enrolled, surface the PSW certificate or IEN pathway as the next step in the career ladder. Position as the credential that opens doors to better placements and higher wages.",
            },
            {
              title: "60 days: WorkersFirst introduction",
              body: "After membership and My65+ are confirmed. WorkersFirst positioning: better shifts, better employers, better career trajectory. This is the economic utility layer — concrete income improvement, not institutional messaging.",
            },
          ]}
        />
      </section>
    </PageContent>
  );
}
