import { PageHeader } from "@/components/layout/PageHeader";
import { PageContent } from "@/components/layout/PageContent";
import { SectionLabel } from "@/components/artifacts/SectionLabel";
import { DataTable } from "@/components/artifacts/DataTable";
import { Callout } from "@/components/artifacts/Callout";
import { Badge } from "@/components/artifacts/Badge";
import { Flag } from "@/components/artifacts/Flag";
import { Divider } from "@/components/ui/Divider";
import { Accordion } from "@/components/ui/Accordion";

export default function ContentOperationsPage() {
  return (
    <PageContent>
      <PageHeader
        eyebrow="WS-03 · Content & Frontend"
        title="Content Operations Model"
        titleAccent="Operations Model"
        description="Strapi as the central content hub — content type registry, multi-consumer publishing architecture, editorial ownership model, and the integration evolution model from webhooks to event-driven."
        meta={[
          { label: "Audience", value: "Frameworks & Co. · Technical agency" },
          { label: "Status", value: "Finalized" },
          { label: "Date", value: "April 2026" },
        ]}
      />

      {/* Section 1: Strapi decision */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="01" label="The Strapi decision" />
        <Callout variant="accent" className="mb-5">
          Strapi (self-hosted, Community Edition) is retained and extended as
          the central content hub for all editorial and reference content across
          the ecosystem. This is not a default — it is a{" "}
          <strong>deliberate architectural choice</strong> made against evaluated
          alternatives.
        </Callout>
        <div className="space-y-2">
          {[
            { reason: "Already in production", detail: "Live at console.seiuhealthcare.ca with established editorial workflows and published content. Replacing it introduces migration cost with no clear benefit." },
            { reason: "Self-hosted advantage", detail: "Data sovereignty, no per-seat or per-API-call pricing, full customization via plugins and custom controllers. Cost is infrastructure only." },
            { reason: "Cost at scale", detail: "SEIU's content needs will reach tens of thousands of records across multiple types. Managed SaaS alternatives (Contentful, Hygraph) price aggressively at this volume." },
            { reason: "Horizontal scalability", detail: "Node.js behind a load balancer with PostgreSQL. Performance at multi-consumer scale is solved by Cloudflare CDN — not by platform migration." },
          ].map((item) => (
            <div key={item.reason} className="flex gap-3 bg-white border border-black/10 rounded-lg p-3.5">
              <span className="text-purple-power font-mono text-[10px] mt-0.5">✓</span>
              <div>
                <p className="text-xs font-medium text-black mb-0.5">{item.reason}</p>
                <p className="text-xs font-light text-black/50 leading-snug">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="font-mono text-[10px] text-black/25 uppercase tracking-wider mb-2">Considered and rejected</p>
          <div className="flex flex-wrap gap-2">
            {["Contentful (pricing at scale + cloud-only)", "Sanity (migration cost + developer-heavy)", "Hygraph (GraphQL complexity + cloud-only)", "Custom CMS (engineering opportunity cost)"].map((r) => (
              <span key={r} className="font-mono text-[10px] text-black/30 line-through">{r}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Strapi scope */}
      <section className="mb-12 animate-fade-up" style={{ animationDelay: "60ms" }}>
        <SectionLabel number="02" label="Strapi scope boundaries" />
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-power/5 border border-purple-power/20 rounded-xl p-5">
            <p className="font-mono text-[10px] text-purple-power uppercase tracking-wide mb-3">Strapi IS</p>
            <ul className="space-y-2">
              {["Content management system", "Content distribution layer", "Editorial publishing source", "Multi-consumer API hub"].map((item) => (
                <li key={item} className="text-xs font-light text-black/60 flex items-start gap-1.5">
                  <span className="text-purple-power">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-grey/50 border border-black/10 rounded-xl p-5">
            <p className="font-mono text-[10px] text-black/30 uppercase tracking-wide mb-3">Strapi is NOT</p>
            <ul className="space-y-2">
              {["Identity provider", "Integration orchestration backbone (long-term)", "System of record for operational data", "Workflow or transactional engine"].map((item) => (
                <li key={item} className="text-xs font-light text-black/40 flex items-start gap-1.5">
                  <span className="text-black/30">✕</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Flag title="Immediate infrastructure action required">
          Cloudflare must be placed in front of the Strapi instance before content
          volume scales. Without it, multi-consumer API traffic during campaigns will
          degrade performance. The Strapi server provider (likely DigitalOcean or AWS)
          needs to be confirmed to properly configure Cloudflare origin rules.
        </Flag>
      </section>

      {/* Section 3: Content model */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="03" label="Content type registry" />
        <p className="text-sm font-light text-black/50 leading-relaxed mb-4">
          Four content domains. Strapi currently contains a mix — the target architecture separates these explicitly.
        </p>
        <Accordion
          items={[
            {
              title: "Editorial Content — Primary objects",
              content: (
                <div>
                  <p className="text-sm font-light text-black/50 leading-relaxed mb-3">
                    Publishable entities whose core purpose is communication. Owned and managed by the editorial team.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Articles", "Events", "Campaigns", "FAQs", "Generic Content", "Petitions", "Surveys", "UnionSavings Offers", "Loyalty Rewards"].map(ct => (
                      <Badge key={ct} variant="purple">{ct}</Badge>
                    ))}
                  </div>
                </div>
              ),
            },
            {
              title: "Editorial Projections — Operational domains",
              content: (
                <div>
                  <p className="text-sm font-light text-black/50 leading-relaxed mb-3">
                    Entities operational at their core but requiring editorial representation across channels. These have{" "}
                    <strong className="text-black font-medium">editorial attributes</strong> (rich text, imagery, SEO) in Strapi{" "}
                    and <strong className="text-black font-medium">operational attributes</strong> (enrollment, availability) in the domain backend.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {["Programs (Training Centre)", "Opportunities (WorkersFirst)"].map(ct => (
                      <Badge key={ct} variant="yellow">{ct}</Badge>
                    ))}
                  </div>
                  <Callout>
                    <strong>Sync direction:</strong> Operational backend → Strapi only. Editorial changes in Strapi never touch the operational backend. All synced records are unpublished by default — editorial approval required before publishing.
                  </Callout>
                </div>
              ),
            },
            {
              title: "Reference Content — Operationally aligned",
              content: (
                <div>
                  <p className="text-sm font-light text-black/50 leading-relaxed mb-3">
                    Structured content supporting operational workflows. Not itself transactional.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Grievance Type", "Ticket Category", "Collective Agreement", "SEIU Files", "Sector taxonomy", "Unit taxonomy", "Location taxonomy"].map(ct => (
                      <Badge key={ct} variant="muted">{ct}</Badge>
                    ))}
                  </div>
                </div>
              ),
            },
            {
              title: "Workflow / Application Data — Not content",
              content: (
                <div>
                  <p className="text-sm font-light text-black/50 leading-relaxed mb-3">
                    Transactional, stateful, user-driven data. Currently in Strapi — should be evaluated for migration to dedicated operational systems as the CRM matures.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Petition Submissions", "Survey Submissions", "Event RSVPs", "Grievances", "User Profiles", "Loyalty Points", "Audit Logs"].map(ct => (
                      <Badge key={ct} variant="soon">{ct}</Badge>
                    ))}
                  </div>
                  <p className="font-mono text-[10px] text-black/30 mt-3">
                    Workflow data represents system state. It is not part of the content publishing model.
                  </p>
                </div>
              ),
            },
          ]}
        />
      </section>

      <Divider />

      {/* Section 4: Multi-consumer model */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="04" label="Multi-consumer architecture" />
        <Callout className="mb-5">
          Each Strapi content record includes <strong>consumer targeting flags</strong> — a multi-select field specifying which consumers should receive this content. One canonical record serves multiple surfaces without duplication.
        </Callout>
        <DataTable
          columns={[
            { key: "consumer", label: "Consumer" },
            { key: "pattern", label: "Integration pattern" },
            { key: "auth", label: "Auth context" },
          ]}
          rows={[
            {
              consumer: "Mobile app",
              pattern: "Primary consumer — news, events, campaigns, programs",
              auth: "IdP token (member ID + lifecycle claims)",
            },
            {
              consumer: "Master site (seiuhealthcare.ca)",
              pattern: "ISR — revalidation webhook on Strapi publish",
              auth: "Public (server-side rendering)",
            },
            {
              consumer: "Campaign microsites (Framer)",
              pattern: "Direct REST API at request time — no middleware",
              auth: "API token (server-side function)",
            },
            {
              consumer: "CRM (future)",
              pattern: "Content template delivery for member communications",
              auth: "Machine-to-machine (M2M token)",
            },
            {
              consumer: "Training Centre",
              pattern: "Webhook sync (program data) — read only",
              auth: "Strapi API token (scoped)",
            },
            {
              consumer: "WorkersFirst",
              pattern: "Webhook sync (opportunity data) — read only",
              auth: "Strapi API token (scoped)",
            },
          ]}
        />
      </section>

      {/* Section 5: Integration evolution */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="05" label="Integration evolution model" />
        <div className="space-y-3">
          {[
            {
              phase: "Phase 1",
              label: "Direct webhook integration",
              pattern: "Operational System → Webhook → Strapi",
              desc: "Simple, fast to implement. Acceptable short-term coupling. Establishes system boundaries quickly with minimal infrastructure overhead.",
              badge: "purple" as const,
            },
            {
              phase: "Phase 2",
              label: "Function-based integration",
              pattern: "Operational System → Serverless Function → Multiple Consumers",
              desc: "Thin serverless function layer between systems. Centralizes integration logic, enables routing to Strapi + CRM simultaneously, introduces validation and transformation. Reduces coupling.",
              badge: "muted" as const,
            },
            {
              phase: "Phase 3",
              label: "Event-driven architecture (target state)",
              pattern: "System → Event Bus → Subscribers",
              desc: "Fully decoupled. Multi-system fan-out from a single event. Real-time synchronization. Foundation for analytics and intelligence systems. Strapi becomes a content consumer and publisher, not an integration hub.",
              badge: "soon" as const,
            },
          ].map((phase) => (
            <div key={phase.phase} className="bg-white border border-black/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant={phase.badge}>{phase.phase}</Badge>
                  <p className="text-xs font-medium text-black">{phase.label}</p>
                </div>
              </div>
              <p className="font-mono text-[10px] text-black/30 mb-2">{phase.pattern}</p>
              <p className="text-sm font-light text-black/50 leading-relaxed">{phase.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: Open questions */}
      <section className="mb-12 animate-fade-up">
        <SectionLabel number="06" label="Open questions" />
        <div className="space-y-3">
          <Flag title="Locale / language requirements">
            Does any content need French or other languages, given Ontario's healthcare workforce demographics — particularly for IEN and Home Care worker populations? This affects Strapi's i18n plugin configuration and locale variants per content type.
          </Flag>
          <Flag title="Strapi role & permissions model">
            Who are the distinct editor roles — SEIU communications team, Training Centre staff, WorkersFirst team, Frameworks agency? Each needs appropriately scoped Strapi access. Required before governance can be enforced.
          </Flag>
          <Flag title="Training Centre and WorkersFirst webhook capability">
            The split model for Programs and Opportunities depends on both backends supporting outbound webhooks. Must be confirmed during WS-3 node audits. If either backend cannot emit webhooks, a polling-based fallback sync must be designed.
          </Flag>
        </div>
      </section>
    </PageContent>
  );
}
